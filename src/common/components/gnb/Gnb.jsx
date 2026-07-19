"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MobileGnb from "./MobileGnb";
import DesktopGnb from "./DesktopGnb";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { TITLE_MAP, MENU_ITEMS } from "./constants";
import { DUMMY_NOTIFICATIONS } from "@/features/notification/constants.js";

export default function Gnb({}) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentState, setCurrentState] = useState("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //TODO 알림 기능 구현 후 백엔드 연동시 임시 상태 및 더미데이터 삭제
  const hasUnreadNotification = DUMMY_NOTIFICATIONS.some(
    (noti) => !noti.isRead,
  );
  const pageTitle = TITLE_MAP[pathname];

  //TODO 유저 정보 API 연동 후 더미 데이터 삭제
  const user = { nickname: "문치", points: 1540 };

  //TODO 로그아웃 API 연동
  const handleLogout = () => {
    setCurrentState("logout");
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
