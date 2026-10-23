'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ChatRoom = dynamic(() => import('../../components/ChatRoom'), {
  ssr: false,
});

export default function TextChatPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading...</div>}>
      <ChatRoom forceMode="text" />
    </Suspense>
  );
}
