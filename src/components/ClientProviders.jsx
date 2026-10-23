'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
    </AuthProvider>
  );
}
