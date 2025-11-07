import React, { useState } from 'react';
// Removed: ref, push, serverTimestamp from firebase/database
// Removed: database from '../../utils/firebaseConfig'
// No direct Firebase imports needed if onSendMessage handles everything.

const MessageInput = ({ chatId, currentUserUid, chatMetadata, onSendMessage }) => { // Added onSendMessage prop
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    // Client-side validation for contact details
    // Regexps should match those in database rules
    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
    const phoneRegex = /\b\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/i;

    if (emailRegex.test(inputText)) {
      setError('Sharing email addresses is not allowed.');
      return;
    }
    if (phoneRegex.test(inputText)) {
      setError('Sharing phone numbers is not allowed.');
      return;
    }

    // Client-side validation for 2-day rule
    if (!chatMetadata) {
        setError('Chat information is not available. Cannot send message.');
        // This case should ideally be prevented by ChatWindow not rendering MessageInput if metadata is missing
        return;
    }
    if (chatMetadata.orderCompletedAt) {
      const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
      if (Date.now() > chatMetadata.orderCompletedAt + twoDaysInMillis) {
        setError('Messaging is closed for this order (2 days after completion).');
        return;
      }
    } 
    // If orderCompletedAt is null/undefined, messaging is allowed.

    setIsSending(true);
    setError('');

    // Determine recipientId
    if (!chatMetadata || !chatMetadata.buyerId || !chatMetadata.vendorId) {
      setError('Chat metadata is incomplete. Cannot determine recipient.');
      setIsSending(false);
      return;
    }
    const recipientId = chatMetadata.buyerId === currentUserUid ? chatMetadata.vendorId : chatMetadata.buyerId;

    if (recipientId === currentUserUid) {
      setError('Recipient cannot be the same as the sender.');
      // This case should ideally not happen if chatMetadata is correctly structured
      // and currentUserUid is one of the participants.
      setIsSending(false);
      return;
    }

    // Construct only the data needed by onSendMessage callback
    const messagePayload = {
      senderId: currentUserUid,
      recipientId: recipientId,
      text: inputText.trim(),
      // timestamp and isRead will be handled by the API function
    };

    try {
      if (!onSendMessage) {
        setError('Cannot send message: Send handler is missing.');
        setIsSending(false);
        return;
      }
      // Call the passed-in handler
      await onSendMessage(messagePayload);
      setInputText('');
    } catch (err) {
      console.error("Error sending message via onSendMessage:", err);
      // The parent component (ChatWindow) should handle specific errors from the API call.
      // MessageInput can display a generic error or one passed back from the parent if desired.
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-medium/30 dark:border-neutral-medium bg-neutral-light dark:bg-neutral-dark"> {/* Adjusted padding and bg */}
      {error && <p className="text-red-700 dark:text-error text-xs mb-2 px-1">{error}</p>} {/* Adjusted error text size and padding */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            if (error) setError(''); // Clear error when user starts typing
          }}
          placeholder="Type your message..."
          className="flex-grow w-full px-3 py-2 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg shadow-sm bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-neutral-light/70 dark:disabled:bg-neutral-dark/70"
          disabled={isSending}
          onKeyPress={(e) => { // Send on Enter key press
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSendMessage(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={isSending || !inputText.trim()}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-darker text-primary-darker dark:text-white dark:bg-primary-darker dark:hover:bg-primary font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed" // Enhanced disabled state
        >
          {isSending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary-darker dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
