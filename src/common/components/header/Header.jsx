"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { HamburgerIcon, BackIcon, BellIcon } from "./Icons";
import { TITLE_MAP, MENU_ITEMS } from "./constants";

export default function Header({}) {
  //TODO Header의 props로 pageTitle 넣기
  const router = useRouter();
  const pathname = usePathname();

  //state - login, logout, secondary
  const [currentState, setCurrentState] = useState("secondary");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //TODO 알림 기능 구현 후 백엔드 연동시 임시 상태 및 더미데이터 삭제
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
  const pageTitle = TITLE_MAP[pathname];

  //TODO 유저 정보 API 연동 후 더미 데이터 삭제
  const dummyUser = {
    name: "문치",
    point: 1540,
  };

  //TODO 로그아웃 API 연동
  const handleLogout = () => {
    setCurrentState("logout");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="w-full h-20 bg-black text-gray-200 sticky top-0 z-40 select-none block md:hidden">
        <div className="layout-container h-full flex items-center justify-between relative">
          {(currentState === "login" || currentState === "logout") && (
            <>
              {/* 좌 - 햄버거 */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="absolute left-5 cursor-pointer w-5.5 h-5.5 flex items-center justify-center"
                aria-label="메뉴 열기"
                type="button">
                <HamburgerIcon />
              </button>

              {/* 가운데 - 로고 */}
              <div className="mx-auto block">
                <Link href="/" className="flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="최애의 포토 로고"
                    width={84}
                    height={16}
                    className="object-contain w-[83.37px] h-[15.12px]"
                  />
                </Link>
              </div>

              {/* 오른쪽 - 알림 아이콘 / 로그인 버튼 */}
              <div className="absolute right-5 flex items-center h-full">
                {currentState === "login" ? (
                  <button
                    className="cursor-pointer relative w-5.5 h-5.5 flex items-center justify-center"
                    aria-label="알림 확인"
                    type="button">
                    <BellIcon />
                    {hasUnreadNotification && (
                      <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red" />
                    )}
                  </button>
                ) : (
                  <Link
                    href="/로그인"
                    className="text-[14px] font-medium text-gray-200">
                    로그인
                  </Link>
                )}
              </div>
            </>
          )}

          {currentState === "secondary" && (
            <>
              {/* 왼쪽 - 뒤로가기 */}
              <button
                onClick={() => router.back()}
                className="absolute left-5 cursor-pointer w-5.5 h-5.5 flex items-center justify-center"
                aria-label="뒤로 가기"
                type="button">
                <BackIcon />
              </button>

              {/* 가운데 - 타이틀 */}
              <div className="mx-auto block">
                {pageTitle && (
                  <h1 className="font-[BaskinRobbins] text-[20px] leading-normal font-normal text-white text-center tracking-[-0.6px]">
                    {pageTitle}
                  </h1>
                )}
              </div>

              {/* 오른쪽 - 레이아웃 정렬 유지용 빈 공간 */}
              <div className="absolute right-5 w-5.5 h-5.5" />
            </>
          )}
        </div>
      </header>

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={dummyUser}
        menuItems={MENU_ITEMS}
        onLogout={handleLogout}
      />
    </>
  );
}
