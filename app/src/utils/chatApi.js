import {
  ref,
  query as rtdbQuery, // Renamed to avoid conflict with Firestore query
  orderByChild,
  equalTo,
  get,
  child,
  onValue,
  off,
  push,
  set,
  serverTimestamp,
  update,
  limitToLast,
} from 'firebase/database';
import { database } from './firebaseConfig';

/**
 * Fetches a list of conversations for a given user.
 * A conversation exists if the user is either a buyer or a vendor in the chat metadata.
 *
 * @param {string} userId The UID of the current user.
 * @param {function} callback Function to call with the conversations list or an error.
 * @returns {function} Unsubscribe function to detach the listener.
 */
export const listenForConversations = (userId, callback) => {
  if (!userId) {
    callback(new Error("User ID is required to fetch conversations."), null);
    return () => {};
  }

  const buyerQuery = rtdbQuery(ref(database, 'chats'), orderByChild('metadata/buyerId'), equalTo(userId));
  const vendorQuery = rtdbQuery(ref(database, 'chats'), orderByChild('metadata/vendorId'), equalTo(userId));

  // handleSnapshot processes a single snapshot (either buyer or vendor)
  const handleSnapshot = async (snapshot) => {
    const promises = [];
    snapshot.forEach(chatSnap => {
      const chatId = chatSnap.key;
      const metadata = chatSnap.child('metadata').val();

      if (!metadata) return;

      const orderCompletedAt = metadata.orderCompletedAt;
      const currentTime = Date.now();
      let include = false;
      if (orderCompletedAt) {
        const orderCompletedTime = new Date(orderCompletedAt).getTime();
        if (!isNaN(orderCompletedTime)) {
          include = currentTime <= orderCompletedTime + 48 * 60 * 60 * 1000;
        }
      }

      if (!include) return;

      const messagesRef = ref(database, `chats/${chatId}/messages`);
      const lastMessageQuery = rtdbQuery(messagesRef, orderByChild('timestamp'), limitToLast(1));

      const promise = get(lastMessageQuery)
        .then(msgSnap => {
          let lastMessageText = null;
          let lastMessageTimestamp = null;
          msgSnap.forEach(child => {
            const msg = child.val();
            lastMessageText = msg.text;
            lastMessageTimestamp = msg.timestamp;
          });
          return { id: chatId, ...metadata, lastMessageText, lastMessageTimestamp };
        })
        .catch((err) => {
          console.error(`Error fetching last message for chat ${chatId}:`, err);
          return { id: chatId, ...metadata, lastMessageText: null, lastMessageTimestamp: null };
        });
      promises.push(promise);
    });
    return Promise.all(promises);
  };

  let unsubBuy = () => {};
  let unsubVend = () => {};
  let buyerResults = null;
  let vendorResults = null;
  let buyerError = null;
  let vendorError = null;
  let callbackInvoked = false;

  const attemptToFinalize = () => {
    if (callbackInvoked) return;

    if ((buyerResults !== null || buyerError !== null) && (vendorResults !== null || vendorError !== null)) {
      callbackInvoked = true;

      let finalError = null;
      if (buyerError && vendorError) {
        console.error("Errors from both buyer and vendor listeners:", buyerError, vendorError);
        finalError = buyerError; // Or a new combined error
      } else if (buyerError) {
        finalError = buyerError;
      } else if (vendorError) {
        finalError = vendorError;
      }

      if (finalError) {
        callback(finalError, null);
      } else {
        const combined = [...new Map([...(buyerResults || []), ...(vendorResults || [])].map(item => [item.id, item])).values()];
        combined.sort((a, b) => {
          const tsA = a.lastMessageTimestamp || a.createdAt || 0;
          const tsB = b.lastMessageTimestamp || b.createdAt || 0;
          if (tsB === tsA) {
            return (a.id || "").localeCompare(b.id || "");
          }
          return tsB - tsA;
        });
        callback(null, combined);
      }
    }
  };

  unsubBuy = onValue(buyerQuery, async snapshot => {
    try {
      buyerResults = await handleSnapshot(snapshot);
    } catch (e) {
      console.error("Error processing buyer snapshot:", e);
      buyerError = e;
      buyerResults = [];
    }
    attemptToFinalize();
  }, err => {
    console.error("Error in buyer conversations listener:", err);
    buyerError = err;
    buyerResults = []; // Ensure it's an array so spread operator works
    attemptToFinalize();
  });

  unsubVend = onValue(vendorQuery, async snapshot => {
    try {
      vendorResults = await handleSnapshot(snapshot);
    } catch (e) {
      console.error("Error processing vendor snapshot:", e);
      vendorError = e;
      vendorResults = [];
    }
    attemptToFinalize();
  }, err => {
    console.error("Error in vendor conversations listener:", err);
    vendorError = err;
    vendorResults = []; // Ensure it's an array
    attemptToFinalize();
  });

  return () => {
    unsubBuy();
    unsubVend();
  };
};

export const getUserDetails = async (userId) => {
  if (!userId) return null;
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return { id: snapshot.key, ...snapshot.val() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const addMessage = async (orderId, text, senderId, recipientId) => {
  try {
    const messagesRef = ref(database, `chats/${orderId}/messages`);
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      senderId,
      recipientId,
      text,
      timestamp: serverTimestamp(),
      isRead: false,
    });
    return newMessageRef.key;
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
};

export const getMessages = (orderId, callback) => {
  try {
    const messagesRef = ref(database, `chats/${orderId}/messages`);
    const messagesQuery = rtdbQuery(messagesRef, orderByChild("timestamp"));

    const unsubscribe = onValue(
      messagesQuery,
      (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
          messages.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        callback(messages);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        callback(null, error);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up message listener:", error);
    throw error;
  }
};

export const markAsRead = async (orderId, messageId, currentUserId) => {
  try {
    const messageRef = ref(database, `chats/${orderId}/messages/${messageId}`);
    const messageSnap = await get(messageRef);
    if (messageSnap.exists()) {
      const messageData = messageSnap.val();
      if (messageData.recipientId === currentUserId) {
        await update(messageRef, { isRead: true });
      } else {
        console.warn("markAsRead: currentUserId is not the recipient.");
      }
    }
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

export const getUnreadMessagesCountForChat = (orderId, currentUserId, callback) => {
  try {
    const messagesRef = ref(database, `chats/${orderId}/messages`);
    const unsubscribe = onValue(
      messagesRef,
      (snapshot) => {
        let unreadCount = 0;
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          if (message.recipientId === currentUserId && !message.isRead) {
            unreadCount++;
          }
        });
        callback(unreadCount);
      },
      (error) => {
        console.error("Error fetching unread messages count:", error);
        callback(0, error);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up unread messages count listener:", error);
    throw error;
  }
};

export const getUnreadMessages = async (userId) => {
  console.warn("getUnreadMessages is a placeholder and needs full implementation. UserID:", userId);
  return { messages: [] };
};
