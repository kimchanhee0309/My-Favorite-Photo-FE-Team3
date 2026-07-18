"use client";

import { ModalProvider } from "./ModalProvider";
import QueryProvider from "./QueryProvider";

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <ModalProvider>{children}</ModalProvider>
    </QueryProvider>
  );
}
