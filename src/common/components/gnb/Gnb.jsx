"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { logoutApi } from "@/features/auth/auth.api";
import MobileGnb from "./MobileGnb";
import DesktopGnb from "./DesktopGnb";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { TITLE_MAP, MENU_ITEMS, SECONDARY_PREFIX_PATHS } from "./constants";
import { DUMMY_NOTIFICATIONS } from "@/features/notification/constants.js";
import { useQueryClient } from "@tanstack/react-query";

export default function Gnb({}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //TODO: 알림 기능 구현 후 백엔드 연동시 임시 상태 및 더미데이터 삭제
  const hasUnreadNotification = DUMMY_NOTIFICATIONS.some(
    (noti) => !noti.isRead,
  );

  const checkIsSecondary = () => {
    if (TITLE_MAP[pathname]) return true;

    return SECONDARY_PREFIX_PATHS.some((prefix) => pathname.startsWith(prefix));
  };

  const getPageTitle = () => {
    if (TITLE_MAP[pathname]) return TITLE_MAP[pathname];

    if (pathname.startsWith("/marketplace/") && pathname.endsWith("/edit")) {
      return "수정하기";
    }

    if (pathname.includes("result")) {
      return undefined;
    }

    if (pathname.startsWith("/marketplace/")) {
      return "마켓플레이스";
    }

    return undefined;
  };

  const isSecondary = checkIsSecondary();
  const pageTitle = getPageTitle();

  const currentState = isSecondary
    ? "secondary"
    : isLoggedIn
      ? "login"
      : "logout";

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
      alert("로그아웃에 실패했습니다.");
    } finally {
      queryClient.setQueryData(["auth", "me"], null);

      setIsMobileMenuOpen(false);
      router.push("/");
    }
  };

  return (
    <>
      <MobileGnb
        currentState={currentState}
        pageTitle={pageTitle}
        hasUnreadNotification={hasUnreadNotification}
        onMenuOpen={() => setIsMobileMenuOpen(true)}
        onBack={() => router.back()}
      />

      <DesktopGnb
        isLoggedIn={isLoggedIn}
        user={user}
        menuItems={MENU_ITEMS}
        hasUnreadNotification={hasUnreadNotification}
        onLogout={handleLogout}
      />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        menuItems={MENU_ITEMS}
        onLogout={handleLogout}
      />
    </>
  );
}
