"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "@/features/auth/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMeApi,
    retry: false,
  });

  const user = data?.data ?? null;

  const value = {
    user,
    isLoggedIn: Boolean(user),
    isPending,
    isError,
    refetchMe: refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다.");
  }

  return context;
}
