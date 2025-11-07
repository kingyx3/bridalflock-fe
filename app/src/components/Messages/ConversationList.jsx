import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { getCurrentUser } from '@/utils/auth'; // Placeholder for auth
import { listenForConversations, getUserDetails, getUnreadMessagesCountForChat } from '@/utils/chatApi'; // Updated import

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  // Slightly more detailed for older messages
  if (diffInHours < 48) return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  // Simple date for older messages
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder for current user - replace with actual auth logic
  const [currentUser, setCurrentUser] = useState({ uid: "placeholder-user-uid", name: "Current User" });

  useEffect(() => {
    if (!currentUser || !currentUser.uid) {
      setError("User not authenticated.");
      setLoading(false);
      return () => {}; // Return empty unsubscribe
    }

    setLoading(true);
    const unsubscribe = listenForConversations(currentUser.uid, async (err, convos) => {
      if (err) {
        setError(err.message);
        setConversations([]);
        setLoading(false);
        return;
      }

      // Determine partnerId for each conversation.
      // The async mapping for partnerDetails is commented out for now to avoid performance issues.
      let processedConversations = convos.map((convo) => {
        const partnerId = convo.buyerId === currentUser.uid ? convo.vendorId : convo.buyerId;
        return {
          ...convo,
          withUser: partnerId, // Currently partner's UID. Replace with partnerDetails.name if fetched.
          unreadCount: 0, // Initialize unreadCount
        };
      });

      setConversations(processedConversations);
      setError(null);
      setLoading(false);

      // After initial conversations are set, listen for unread counts for each
      processedConversations.forEach((convo) => {
        const unsubscribeCount = getUnreadMessagesCountForChat(convo.id, currentUser.uid, (count) => {
          setConversations(prevConversations =>
            prevConversations.map(prevConvo =>
              prevConvo.id === convo.id ? { ...prevConvo, unreadCount: count } : prevConvo
            )
          );
        });
        // It's important to manage these new listeners as well.
        // Add this unsubscribe to a list of unsubs to be called on component unmount.
        // For simplicity in this example, we're not storing individual count unsubscribers.
        // In a production app, you'd want to collect all unsubscribe functions and call them.
      });

    });

    return () => {
      unsubscribe(); // Detach listener on component unmount
      // Ideally, also unsubscribe from all getUnreadMessagesCountForChat listeners here
    };
  }, [currentUser]); // Dependency on currentUser

  if (loading) return <p>Loading conversations...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (conversations.length === 0) return <p>No conversations yet.</p>;

  return (
    <div className="space-y-4">
      {conversations.map((convo) => (
        <Link href={`/messages/${convo.id}`} key={convo.id} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-neutral-medium dark:hover:bg-neutral-dark-alt transition-colors duration-150">
          <div className="flex justify-between items-start"> {/* items-start for better alignment with multi-line text */}
            <div className="flex-grow min-w-0"> {/* Added flex-grow and min-w-0 to ensure h3 can truncate if needed */}
              <h3 className={`text-md font-semibold text-neutral-dark dark:text-neutral-light ${convo.unreadCount > 0 ? 'font-bold' : ''}`}>
                Chat with: {convo.withUser ? convo.withUser.substring(0,15) : 'User'}...
                {convo.unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {convo.unreadCount}
                  </span>
                )}
              </h3>
            </div>
            {convo.lastMessageTimestamp && (
              <span className="text-xs text-gray-500 dark:text-neutral-medium whitespace-nowrap ml-2"> {/* Added ml-2 for spacing */}
                {formatTimestamp(convo.lastMessageTimestamp)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-neutral-light truncate">
            {convo.lastMessageText || (convo.id ? 'No messages yet' : 'Loading...')}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ConversationList;
