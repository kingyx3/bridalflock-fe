import React from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '@/components/BaseLayout'; // Assuming BaseLayout exists
    import ChatWindow from '@/components/Messages/ChatWindow';
    // import { useAuth } from '@/context/AuthContext'; // Example: if you have an AuthContext

const ChatPage = () => {
  const router = useRouter();
  const { chatId } = router.query;
      // const { currentUser } = useAuth(); // Example
      const currentUserUid = "placeholder-user-uid"; // Replace with actual current user UID from auth state

  if (!chatId) {
    return (
      <BaseLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading chat...</p>
        </div>
      </BaseLayout>
    );
  }
      // if (!currentUser) return <p>Please log in to view chats.</p>; // Example auth check

  return (
    <BaseLayout>
          <div className="container mx-auto px-4 py-8 flex flex-col" style={{ height: 'calc(100vh - 150px)' }}> {/* Adjust height as needed */}
            {/* Removed the h2 title from here as ChatWindow's header can serve this purpose */}
            <ChatWindow
              chatId={chatId}
              currentUserUid={currentUserUid} // Pass the actual UID
              isPageDisplay={true}
              // onClose={() => router.push('/messages')} // Optional: navigate back
            />
      </div>
    </BaseLayout>
  );
};

export default ChatPage;
