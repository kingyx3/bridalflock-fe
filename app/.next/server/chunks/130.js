"use strict";
exports.id = 130;
exports.ids = [130];
exports.modules = {

/***/ 5130:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EG": () => (/* binding */ listenForConversations),
/* harmony export */   "Hz": () => (/* binding */ addMessage),
/* harmony export */   "_U": () => (/* binding */ getMessages),
/* harmony export */   "v$": () => (/* binding */ getUnreadMessagesCountForChat),
/* harmony export */   "zJ": () => (/* binding */ markAsRead)
/* harmony export */ });
/* unused harmony exports getUserDetails, getUnreadMessages */
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1208);
/* harmony import */ var _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7211);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_database__WEBPACK_IMPORTED_MODULE_0__, _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__]);
([firebase_database__WEBPACK_IMPORTED_MODULE_0__, _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


/**
 * Fetches a list of conversations for a given user.
 * A conversation exists if the user is either a buyer or a vendor in the chat metadata.
 *
 * @param {string} userId The UID of the current user.
 * @param {function} callback Function to call with the conversations list or an error.
 * @returns {function} Unsubscribe function to detach the listener.
 */ const listenForConversations = (userId, callback)=>{
    if (!userId) {
        callback(new Error("User ID is required to fetch conversations."), null);
        return ()=>{};
    }
    const buyerQuery = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.query)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .database */ .Fs, "chats"), (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.orderByChild)("metadata/buyerId"), (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.equalTo)(userId));
    const vendorQuery = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.query)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .database */ .Fs, "chats"), (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.orderByChild)("metadata/vendorId"), (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.equalTo)(userId));
    // handleSnapshot processes a single snapshot (either buyer or vendor)
    const handleSnapshot = async (snapshot)=>{
        const promises = [];
        snapshot.forEach((chatSnap)=>{
            const chatId = chatSnap.key;
            const metadata = chatSnap.child("metadata").val();
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
            const messagesRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .database */ .Fs, `chats/${chatId}/messages`);
            const lastMessageQuery = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.query)(messagesRef, (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.orderByChild)("timestamp"), (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.limitToLast)(1));
            const promise = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)(lastMessageQuery).then((msgSnap)=>{
                let lastMessageText = null;
                let lastMessageTimestamp = null;
                msgSnap.forEach((child)=>{
                    const msg = child.val();
                    lastMessageText = msg.text;
                    lastMessageTimestamp = msg.timestamp;
                });
                return {
                    id: chatId,
                    ...metadata,
                    lastMessageText,
                    lastMessageTimestamp
                };
            }).catch((err)=>{
                console.error(`Error fetching last message for chat ${chatId}:`, err);
                return {
                    id: chatId,
                    ...metadata,
                    lastMessageText: null,
                    lastMessageTimestamp: null
                };
            });
            promises.push(promise);
        });
        return Promise.all(promises);
    };
    let unsubBuy = ()=>{};
    let unsubVend = ()=>{};
    let buyerResults = null;
    let vendorResults = null;
    let buyerError = null;
    let vendorError = null;
    let callbackInvoked = false;
    const attemptToFinalize = ()=>{
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
                const combined = [
                    ...new Map([
                        ...buyerResults || [],
                        ...vendorResults || []
                    ].map((item)=>[
                            item.id,
                            item
                        ])).values()
                ];
                combined.sort((a, b)=>{
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
    unsubBuy = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.onValue)(buyerQuery, async (snapshot)=>{
        try {
            buyerResults = await handleSnapshot(snapshot);
        } catch (e) {
            console.error("Error processing buyer snapshot:", e);
            buyerError = e;
            buyerResults = [];
        }
        attemptToFinalize();
    }, (err)=>{
        console.error("Error in buyer conversations listener:", err);
        buyerError = err;
        buyerResults = []; // Ensure it's an array so spread operator works
        attemptToFinalize();
    });
    unsubVend = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.onValue)(vendorQuery, async (snapshot)=>{
        try {
            vendorResults = await handleSnapshot(snapshot);
        } catch (e) {
            console.error("Error processing vendor snapshot:", e);
            vendorError = e;
            vendorResults = [];
        }
        attemptToFinalize();
    }, (err)=>{
        console.error("Error in vendor conversations listener:", err);
        vendorError = err;
        vendorResults = []; // Ensure it's an array
        attemptToFinalize();
    });
    return ()=>{
        unsubBuy();
        unsubVend();
    };
};
const getUserDetails = async (userId)=>{
    if (!userId) return null;
    try {
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return {
                id: snapshot.key,
                ...snapshot.val()
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};
const addMessage = async (orderId, text, senderId, recipientId)=>{
    try {
        const messagesRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .database */ .Fs, `chats/${orderId}/messages`);
        const newMessageRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.push)(messagesRef);
        await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.set)(newMessageRef, {
            senderId,
            recipientId,
            text,
            timestamp: (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)(),
            isRead: false
        });
        return newMessageRef.key;
    } catch (error) {
        console.error("Error adding message:", error);
        throw error;
    }
};
const getMessages = (orderId, callback)=>{
    try {
        const messagesRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .database */ .Fs, `chats/${orderId}/messages`);
        const messagesQuery = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.query)(messagesRef, (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.orderByChild)("timestamp"));
        const unsubscribe = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.onValue)(messagesQuery, (snapshot)=>{
            const messages = [];
            snapshot.forEach((childSnapshot)=>{
                messages.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            callback(messages);
        }, (error)=>{
            console.error("Error fetching messages:", error);
            callback(null, error);
        });
        return unsubscribe;
    } catch (error) {
        console.error("Error setting up message listener:", error);
        throw error;
    }
};
const markAsRead = async (orderId, messageId, currentUserId)=>{
    try {
        const messageRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .database */ .Fs, `chats/${orderId}/messages/${messageId}`);
        const messageSnap = await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)(messageRef);
        if (messageSnap.exists()) {
            const messageData = messageSnap.val();
            if (messageData.recipientId === currentUserId) {
                await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)(messageRef, {
                    isRead: true
                });
            } else {
                console.warn("markAsRead: currentUserId is not the recipient.");
            }
        }
    } catch (error) {
        console.error("Error marking message as read:", error);
        throw error;
    }
};
const getUnreadMessagesCountForChat = (orderId, currentUserId, callback)=>{
    try {
        const messagesRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .database */ .Fs, `chats/${orderId}/messages`);
        const unsubscribe = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.onValue)(messagesRef, (snapshot)=>{
            let unreadCount = 0;
            snapshot.forEach((childSnapshot)=>{
                const message = childSnapshot.val();
                if (message.recipientId === currentUserId && !message.isRead) {
                    unreadCount++;
                }
            });
            callback(unreadCount);
        }, (error)=>{
            console.error("Error fetching unread messages count:", error);
            callback(0, error);
        });
        return unsubscribe;
    } catch (error) {
        console.error("Error setting up unread messages count listener:", error);
        throw error;
    }
};
const getUnreadMessages = async (userId)=>{
    console.warn("getUnreadMessages is a placeholder and needs full implementation. UserID:", userId);
    return {
        messages: []
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;