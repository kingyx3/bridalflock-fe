import React from 'react';
import BaseLayout from '@/components/BaseLayout';
import ConversationList from '@/components/Messages/ConversationList'; // Uncommented

const MessagesPage = () => {
  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Conversations</h1>
        <ConversationList /> {/* Uncommented */}
      </div>
    </BaseLayout>
  );
};

export default MessagesPage;
