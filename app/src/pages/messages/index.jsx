import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStateProvider } from '../../context/StateContext';
import BaseLayout from '@/components/BaseLayout';

const MessagesPage = () => {
  const router = useRouter();
  const [{ isSeller }] = useStateProvider();

  useEffect(() => {
    // Redirect to the appropriate role-based messages page
    const messagesPath = isSeller ? '/seller/messages' : '/buyer/messages';
    router.replace(messagesPath);
  }, [isSeller, router]);

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <p>Redirecting to your messages...</p>
      </div>
    </BaseLayout>
  );
};

export default MessagesPage;
