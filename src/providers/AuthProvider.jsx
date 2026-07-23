"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
/* import 추가 필요(auth.api에서 ... 작업 완료되면 추가하겠습니다.) */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["auth", "me"],
    /* queryFn: 이곳에 위에 import하는 거 추가하기 */
    retry: false,
  });

  const user = data?.data ?? null;

  const value = {
    user,
    isLoggedIn: Boolean(user),
    isLoading,
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
