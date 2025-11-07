import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, currentUserUid }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array ensures this runs when messages change

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-grow p-4 overflow-y-auto flex justify-center items-center bg-neutral-light dark:bg-neutral-dark">
        <p className="text-neutral-medium dark:text-neutral-light italic">No messages yet. Start the conversation!</p>
      </div>
    );
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    // Check if timestamp is a number (Firebase RTDB server timestamp) or a Firestore Timestamp object
    const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-neutral-light dark:bg-neutral-dark"> {/* Increased space-y for better separation */}
      {messages.map((msg) => {
        if (!msg || !msg.id) { // Basic validation for message object
          console.warn("Invalid message object:", msg);
          return null; 
        }
        const isCurrentUser = msg.senderId === currentUserUid;
        return (
          <div
            key={msg.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs sm:max-w-sm md:max-w-md px-3 py-2 rounded-lg shadow-md ${ // Slightly adjusted max-width for responsiveness
                isCurrentUser
                  ? 'bg-primary text-primary-darker dark:bg-primary-darker dark:text-white' // Darker blue for better contrast
                  : 'bg-neutral-light border border-neutral-medium/40 text-neutral-dark dark:bg-neutral-medium dark:text-neutral-light dark:border-neutral-dark'
              }`}
            >
              <p className="text-sm break-words">{msg.text}</p> {/* break-words for long text without spaces */}
              {msg.timestamp && (
                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-primary-darker opacity-70 dark:text-white dark:opacity-70' : 'text-neutral-medium opacity-70 dark:text-neutral-light dark:opacity-70'} text-right`}>
                  {formatTimestamp(msg.timestamp)}
                </p>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
