"use client";

import { ModalProvider } from "./ModalProvider";
import QueryProvider from "./QueryProvider";
import { AuthProvider, useAuth } from "./AuthProvider";
import { RandomBoxModalProvider } from "./RandomBoxModalProvider";

function RandomBoxModalProviderWithAuth({ children }) {
  const { user, isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return children;
  }

  return (
    <RandomBoxModalProvider userId={isLoggedIn ? user.id : undefined}>
      {children}
    </RandomBoxModalProvider>
  );
}

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ModalProvider>
          <RandomBoxModalProviderWithAuth>
            {children}
          </RandomBoxModalProviderWithAuth>
        </ModalProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
