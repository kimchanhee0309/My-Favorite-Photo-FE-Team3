"use client";

import Link from "next/link";
import Image from "next/image";
import { HamburgerIcon, BackIcon, BellIcon } from "./Icons";

export default function MobileHeader({
  currentState,
  pageTitle,
  hasUnreadNotification,
  onMenuOpen,
  onBack,
}) {
  return (
    <header className="w-full h-20 bg-black text-gray-200 sticky top-0 z-40 select-none block md:hidden">
      <div className="layout-container h-full flex items-center justify-between relative">
        {(currentState === "login" || currentState === "logout") && (
          <>
            <button
              onClick={onMenuOpen}
              className="absolute left-5 cursor-pointer w-5.5 h-5.5 flex items-center justify-center"
              aria-label="메뉴 열기"
              type="button">
              <HamburgerIcon />
            </button>

            <div className="mx-auto block">
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="최애의 포토 로고"
                  width={84}
                  height={16}
                  quality={100}
                  className="object-contain w-[83px] h-[15px]"
                  priority
                />
              </Link>
            </div>

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
            <button
              onClick={onBack}
              className="absolute left-5 cursor-pointer w-5.5 h-5.5 flex items-center justify-center"
              aria-label="뒤로 가기"
              type="button">
              <BackIcon />
            </button>

            <div className="mx-auto block">
              {pageTitle && (
                <h1 className="font-[BaskinRobbins] text-[20px] leading-normal font-normal text-white text-center tracking-[-0.6px]">
                  {pageTitle}
                </h1>
              )}
            </div>

            <div className="absolute right-5 w-5.5 h-5.5" />
          </>
        )}
      </div>
    </header>
  );
}
