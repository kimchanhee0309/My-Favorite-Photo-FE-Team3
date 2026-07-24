"use client";

import { ModalProvider } from "./ModalProvider";
import QueryProvider from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <ModalProvider>{children}</ModalProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
