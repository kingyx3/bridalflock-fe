import React from 'react';
import ChatWindow from '../../../../components/Messages/ChatWindow'; // Updated import
import { useRouter } from 'next/router';
import { useStateProvider } from '../../../../context/StateContext'; // Assuming this provides user info

function OrderMessagePage() { // Renamed component for clarity
  const router = useRouter();
  const { orderId } = router.query;
  const [{ userInfo }] = useStateProvider(); // Provides { userInfo, ... }

  // Ensure orderId and userInfo are available before rendering ChatWindow
  if (!orderId || !userInfo || !userInfo.id) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900"> {/* Added background for loading state */}
            {/* Basic loading spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Loading chat details...</p>
        </div>
    ); 
  }

  const handleClose = () => {
    router.back(); // Example close handler
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-800"> {/* Optional: page background */}
      {/* ChatWindow is fixed position and will overlay this page's content. */}
      {/* This container div primarily ensures the page itself has a background and structure if ChatWindow were not fixed. */}
      {/* For a full-page embedded ChatWindow in the future, ChatWindow's own styling would need to change. */}
      
      <ChatWindow
        chatId={orderId}
        currentUserUid={userInfo.id} // Assuming userInfo.id is the UID
        onClose={handleClose}
      />
      
      {/* Example: You could add a subtle page title here if needed, though ChatWindow has its own header */}
      {/* <h1 className="text-center text-xl p-4 text-gray-600 dark:text-gray-400">Order Chat</h1> */}
    </div>
  );
}

export default OrderMessagePage;
