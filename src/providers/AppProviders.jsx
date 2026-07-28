"use client";

import { ModalProvider } from "./ModalProvider";
import QueryProvider from "./QueryProvider";
import { AuthProvider, useAuth } from "./AuthProvider";
import { RandomBoxModalProvider } from "./RandomBoxModalProvider";
import { NotificationProvider } from "./NotificationProvider";

function AuthDependentProviders({ children }) {
  const { user, isLoggedIn } = useAuth();
  const userId = isLoggedIn ? user?.id : undefined;

  return (
    <NotificationProvider userId={userId}>
      <RandomBoxModalProvider userId={userId}>
        {children}
      </RandomBoxModalProvider>
    </NotificationProvider>
  );
}

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ModalProvider>
          <AuthDependentProviders>{children}</AuthDependentProviders>
        </ModalProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
