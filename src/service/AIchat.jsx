import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export const AIchat = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'http://localhost:5678/webhook/d138d027-1647-4cc1-8a4e-df9de93eb833/chat', // replace with your actual Chat Trigger URL
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋',
        'My name is Shreyansh. How can I assist you today?'
      ],
      i18n: {
        en: {
          title: 'Hi there! 👋',
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
        },
      },
      enableStreaming: false,
    });
  }, []);

  return (
    <div>
      <div>
      </div>
    </div>
  );
};