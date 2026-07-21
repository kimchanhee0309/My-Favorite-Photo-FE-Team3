"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MobileGnb from "./MobileGnb";
import DesktopGnb from "./DesktopGnb";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { TITLE_MAP, MENU_ITEMS, SECONDARY_PREFIX_PATHS } from "./constants";
import { DUMMY_NOTIFICATIONS } from "@/features/notification/constants.js";

export default function Gnb({}) {
  const router = useRouter();
  const pathname = usePathname();

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

  // TODO: 임시 유저 인증 상태 - 로그인
  const isLoggedIn = true;

  const currentState = isSecondary
    ? "secondary"
    : isLoggedIn
      ? "login"
      : "logout";

  //TODO: 유저 정보 API 연동 후 더미 데이터 삭제
  const user = { nickname: "문치", points: 1540 };

  //TODO: 로그아웃 API 연동
  const handleLogout = () => {
    setIsMobileMenuOpen(false);
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
        currentState={currentState}
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
