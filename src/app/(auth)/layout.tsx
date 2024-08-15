"use client";
import { useAuth } from '@/services/app/AuthService';
import { useAppSelector } from '@/services/redux/hooks';
import React, { useEffect } from 'react';

export default function GuestAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { checkAuth } = useAuth();
  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated || user === null) {
      checkAuth();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};