import React from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '@/components/BaseLayout';
import ChatWindow from '@/components/Messages/ChatWindow';

const BuyerChatPage = () => {
  const router = useRouter();
  const { chatId } = router.query;
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

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8 flex flex-col" style={{ height: 'calc(100vh - 150px)' }}>
        <ChatWindow
          chatId={chatId}
          currentUserUid={currentUserUid}
          isPageDisplay={true}
        />
      </div>
    </BaseLayout>
  );
};

export default BuyerChatPage;
