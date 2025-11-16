import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStateProvider } from '../../context/StateContext';
import BaseLayout from '@/components/BaseLayout';

const ChatPage = () => {
  const router = useRouter();
  const { chatId } = router.query;
  const [{ isSeller }] = useStateProvider();

  useEffect(() => {
    if (chatId) {
      // Redirect to the appropriate role-based chat page
      const chatPath = isSeller ? `/seller/messages/${chatId}` : `/buyer/messages/${chatId}`;
      router.replace(chatPath);
    }
  }, [chatId, isSeller, router]);

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <p>Redirecting to your chat...</p>
      </div>
    </BaseLayout>
  );
};

export default ChatPage;
