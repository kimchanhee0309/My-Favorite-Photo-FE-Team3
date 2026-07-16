"use client";

import Link from "next/link";
import Image from "next/image";
import { BellIcon } from "./Icons";
import DesktopUserMenu from "./DesktopUserMenu";

export default function DesktopHeader({
  currentState,
  user,
  menuItems,
  hasUnreadNotification,
  onLogout,
}) {
  return (
    <header className="w-full h-20 bg-black text-gray-200 sticky top-0 z-40 select-none hidden md:block md:h-17.5 lg:h-20">
      <div className="relative h-full">
        <div className="absolute flex items-center justify-between md:top-5.75 md:left-10 md:right-10 lg:top-6.75 lg:left-55 lg:right-55">
          <div className="flex items-center">
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="최애의 포토 로고"
                width={139}
                height={25}
                quality={100}
                className="object-contain md:w-27.75 md:h-[20px] lg:w-[139px] lg:h-[25px]"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center">
            {currentState === "login" ? (
              <div className="flex items-center justify-center gap-7.5">
                <div className="flex items-center gap-7.5">
                  <div className="text-gray-200 typo-14-bold">
                    {user.points.toLocaleString()}P
                  </div>

                  <button
                    className="cursor-pointer relative w-5.5 h-5.5 flex items-center justify-center text-white hover:opacity-85 transition"
                    aria-label="알림 확인"
                    type="button">
                    <BellIcon />
                    {hasUnreadNotification && (
                      <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </button>

                  <DesktopUserMenu user={user} menuItems={menuItems} />
                </div>

                <span className="select-none typo-14-regular text-center text-gray-400">
                  |
                </span>

                <button
                  onClick={onLogout}
                  type="button"
                  className="typo-14-regular text-right text-gray-400 hover:text-white transition cursor-pointer">
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-7.5">
                <Link
                  href="/login"
                  className="typo-14-regular font-medium text-gray-200">
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="typo-14-regular font-medium text-gray-200">
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
