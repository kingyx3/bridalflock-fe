import React, { useState, useEffect, useCallback } from 'react';
import { ref as dbRef, onValue, off } from 'firebase/database';
import { database } from '../../utils/firebaseConfig';
import { getMessages, markAsRead, addMessage as sendMessageApi } from '../../utils/chatApi'; // Added addMessage as sendMessageApi
import MessageList from './MessageList';
import MessageInput from './MessageInput';

// Modified ChatWindow props: added isPageDisplay
const ChatWindow = ({ chatId, currentUserUid, onClose, isPageDisplay = false }) => {
  const [messages, setMessages] = useState([]);
  const [chatMetadata, setChatMetadata] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [chatPartnerName, setChatPartnerName] = useState('Chat');
  const [sendMessageError, setSendMessageError] = useState(''); // Optional: For displaying send errors in ChatWindow

  useEffect(() => {
    if (!chatId || !currentUserUid) {
      setError('Missing chat ID or user information.');
      setMessages([]);
      setChatMetadata(null);
      setIsLoading(false);
      setIsLoadingMetadata(false);
      setIsLoadingMessages(false);
      return;
    }

    // Reset state for new chat
    setError('');
    setMessages([]);
    setChatMetadata(null);
    setChatPartnerName('Chat');
    setIsLoading(true);
    setIsLoadingMetadata(true);
    setIsLoadingMessages(true);

    let metadataRef;
    // messagesQueryRef will be handled by getMessages from chatApi
    // let messagesQueryRef;

    try {
      metadataRef = dbRef(database, `chats/${chatId}/metadata`);
      // messagesQueryRef = query(dbRef(database, `chats/${chatId}/messages`), orderByChild('timestamp')); // Handled by chatApi.getMessages
    } catch (e) {
      console.error("Error creating Firebase references:", e);
      setError("Invalid chat ID format or issue creating chat reference.");
      setIsLoading(false);
      setIsLoadingMetadata(false);
      setIsLoadingMetadata(false); // Keep this for metadata
      setIsLoadingMessages(false); // Keep this for messages initial state
      return;
    }

    const metadataListener = onValue(
      metadataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const meta = snapshot.val();
          setChatMetadata(meta);
          if (meta.buyerId && meta.vendorId) {
            setChatPartnerName(currentUserUid === meta.buyerId ? 'Chat with Vendor' : 'Chat with Buyer');
          }
        } else {
          setError('Chat details not found or access denied.');
          setChatMetadata(null);
        }
        setIsLoadingMetadata(false);
      },
      (err) => {
        console.error('Error fetching chat metadata:', err);
        setError('Failed to load chat details.');
        setChatMetadata(null);
        setIsLoadingMetadata(false);
      }
    );

    // Use getMessages from chatApi for messages
    const unsubscribeMessages = getMessages(chatId, (loadedMessages, err) => {
      if (err) {
        console.error('Error fetching messages via chatApi:', err);
        setError('Failed to load messages.');
        setMessages([]); // Clear messages on error
      } else {
        setMessages(loadedMessages);
      }
      setIsLoadingMessages(false);
    });

    return () => {
      if (metadataRef) {
        off(metadataRef, 'value', metadataListener);
      }
      if (unsubscribeMessages && typeof unsubscribeMessages === 'function') {
        unsubscribeMessages(); // Call the unsubscribe function returned by getMessages
      }
    };
  }, [chatId, currentUserUid]);

  useEffect(() => {
    if (!isLoadingMetadata && !isLoadingMessages) {
      setIsLoading(false);
    }
  }, [isLoadingMetadata, isLoadingMessages]);

  // useEffect for marking messages as read
  useEffect(() => {
    if (!messages || messages.length === 0 || !currentUserUid || !chatId || !chatMetadata) {
      return;
    }

    // Ensure current user is part of this chat based on metadata before trying to update read status
    const isCurrentUserBuyer = chatMetadata.buyerId === currentUserUid;
    const isCurrentUserVendor = chatMetadata.vendorId === currentUserUid;

    if (!isCurrentUserBuyer && !isCurrentUserVendor) {
        // console.warn("Mark as read: Current user is not a participant in this chat according to metadata.");
        return;
    }

    messages.forEach(message => {
      if (message.recipientId === currentUserUid && !message.isRead) {
        // Use markAsRead from chatApi
        markAsRead(chatId, message.id, currentUserUid)
          .then(() => {
            // console.log(`Message ${message.id} marked as read via chatApi.`);
            // No need to update local state here, as getMessages listener will handle it
          })
          .catch(error => {
            console.error(`Failed to mark message ${message.id} as read via chatApi:`, error);
          });
      }
    });
  }, [messages, currentUserUid, chatId, chatMetadata]); // Added chatMetadata to dependencies

  const handleSendMessageInWindow = async (messageData) => {
    if (!chatId) {
      console.error("ChatWindow: chatId is missing, cannot send message.");
      setSendMessageError("Chat ID is missing. Cannot send message."); // Update error state
      throw new Error("Chat ID is missing."); // Throw error to be caught by MessageInput if needed
    }
    setSendMessageError(''); // Clear previous errors
    try {
      await sendMessageApi(chatId, messageData.text, messageData.senderId, messageData.recipientId);
      // console.log("Message sent successfully from ChatWindow.");
      // MessageInput clears its own text. UI updates for sent status can be handled here or in MessageInput.
    } catch (error) {
      console.error("Error sending message from ChatWindow:", error);
      setSendMessageError(error.message || "Failed to send message."); // Update error state
      throw error; // Re-throw error to be caught by MessageInput
    }
  };

  const isChatReadOnly = useCallback(() => {
    if (!chatMetadata || !chatMetadata.orderCompletedAt) return false;
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
    return Date.now() > chatMetadata.orderCompletedAt + twoDaysInMillis;
  }, [chatMetadata]);

  const canDisplayChatContent = !isLoading && chatMetadata && !error;

  // Modified BaseContainer
  const BaseContainer = ({ children, titleOverride, headerBg = 'bg-gray-700' }) => {
    const containerClasses = isPageDisplay
      ? "w-full h-full bg-neutral-light dark:bg-neutral-dark flex flex-col border border-neutral-medium/30 dark:border-neutral-medium" // Page display styles
      : "fixed bottom-4 right-4 w-96 h-[500px] bg-neutral-light dark:bg-neutral-dark shadow-xl rounded-lg flex flex-col border border-neutral-medium/30 dark:border-neutral-medium z-50"; // Original pop-up styles

    return (
      <div className={containerClasses}>
        <header className={`${headerBg === 'bg-red-600' ? 'bg-red-700 text-white' : 'bg-neutral-dark text-neutral-light'} p-3 flex justify-between items-center ${isPageDisplay ? 'rounded-t-lg' : 'rounded-t-lg'}`}>
          <h2 className="font-semibold text-lg">{titleOverride || chatPartnerName}</h2>
          {/* Conditional rendering for onClose button */}
          {(!isPageDisplay || (isPageDisplay && onClose)) && onClose && (
            <button
              onClick={onClose}
              className="text-neutral-medium hover:text-neutral-light text-2xl leading-none focus:outline-none"
            >
              &times;
            </button>
          )}
        </header>
        {children}
      </div>
    );
  };

  if (!chatId || !currentUserUid) {
    // For page display, we might want a different "empty" state or rely on the parent page to handle this.
    // For now, it will use BaseContainer which will adapt.
    return (
      <BaseContainer titleOverride="Chat Window">
        <div className="flex-grow flex flex-col justify-center items-center p-4 bg-neutral-light dark:bg-neutral-dark">
          <p className="text-neutral-dark dark:text-neutral-light text-center">No chat selected. Please select a chat to view messages.</p>
          {/* Conditional onClose rendering is handled by BaseContainer itself */}
          {onClose && !isPageDisplay && ( // Show explicit close button only if pop-up and onClose provided
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-neutral-medium/30 text-neutral-dark dark:bg-neutral-medium dark:text-neutral-light rounded hover:bg-neutral-medium/50 dark:hover:bg-neutral-medium/70"
            >
              Close
            </button>
          )}
        </div>
      </BaseContainer>
    );
  }

  if (isLoading) {
    return (
      <BaseContainer titleOverride="Loading Chat...">
        <div className="flex-grow flex flex-col justify-center items-center p-4 bg-neutral-light dark:bg-neutral-dark">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-3"></div>
          <p className="text-neutral-dark dark:text-neutral-light">Loading chat...</p>
        </div>
      </BaseContainer>
    );
  }

  if (error && !chatMetadata) { // This implies metadata loading failed critically
    return (
      <BaseContainer titleOverride="Chat Error" headerBg="bg-red-600">
        <div className="flex-grow flex flex-col justify-center items-center p-4 bg-neutral-light dark:bg-neutral-dark text-center">
          <p className="text-red-700 dark:text-error">{error}</p>
          <p className="text-sm text-neutral-medium dark:text-neutral-light mt-1">Please try again or select a different chat.</p>
          {onClose && !isPageDisplay && (
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-primary text-primary-darker dark:bg-primary-darker dark:text-white rounded hover:bg-primary-darker dark:hover:bg-primary"
            >
              Close
            </button>
          )}
        </div>
      </BaseContainer>
    );
  }

  // If metadata is null but there's no specific error string, and not loading.
  // This could mean the chat simply doesn't exist or access was denied quietly.
  if (!chatMetadata && !isLoading && !error) {
    return (
      <BaseContainer titleOverride="Chat Unavailable">
        <div className="flex-grow flex flex-col justify-center items-center p-4 bg-neutral-light dark:bg-neutral-dark text-center">
          <p className="text-neutral-dark dark:text-neutral-light">Chat data is not available for this selection.</p>
          {onClose && !isPageDisplay && (
             <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-primary text-primary-darker dark:bg-primary-darker dark:text-white rounded hover:bg-primary-darker dark:hover:bg-primary"
            >
              Close
            </button>
          )}
        </div>
      </BaseContainer>
    );
  }

  // Main content rendering when chat is available
  return (
    <BaseContainer>
      {/* MessageList should ideally fill the available space if BaseContainer is flex-col */}
      <MessageList messages={messages} currentUserUid={currentUserUid} />

      {error && chatMetadata && isLoadingMessages && (
        <div className="p-2 text-center text-xs text-red-700 dark:text-error bg-error/20 dark:bg-red-800/30 border-t border-neutral-medium/30 dark:border-neutral-medium">
          Error loading messages: {error}
        </div>
      )}

      {chatMetadata && (
        isChatReadOnly() ? (
          <div className="p-3 text-center text-sm text-amber-700 dark:text-warning bg-warning/20 dark:bg-amber-800/30 border-t border-amber-300 dark:border-amber-700">
            This chat is read-only. Messaging is closed for this order (2 days after completion).
          </div>
        ) : (
          <MessageInput
            chatId={chatId}
            currentUserUid={currentUserUid}
            chatMetadata={chatMetadata}
            onSendMessage={handleSendMessageInWindow} // Pass the handler
          />
        )
      )}
      {sendMessageError && (
        <div className="p-2 text-center text-xs text-red-700 dark:text-error bg-error/20 dark:bg-red-800/30 border-t border-neutral-medium/30 dark:border-neutral-medium">
          Error sending: {sendMessageError}
        </div>
      )}
    </BaseContainer>
  );
};

export default ChatWindow;
