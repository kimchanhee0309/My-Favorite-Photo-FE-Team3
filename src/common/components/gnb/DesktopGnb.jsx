"use client";

import Link from "next/link";
import Image from "next/image";
import { BellIcon, GiftIcon } from "./Icons";
import DesktopUserMenu from "./DesktopUserMenu";
import NotificationList from "@/features/notification/components/NotificationList";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DesktopGnb({
  isLoggedIn,
  user,
  menuItems,
  hasUnreadNotification,
  onLogout,
  onOpenPointModal,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 hidden h-20 w-full bg-black text-gray-200 select-none md:block md:h-17.5 lg:h-20">
      <div className="relative h-full">
        <div className="absolute flex items-center justify-between md:top-5.75 md:right-10 md:left-10 lg:top-6.75 lg:right-55 lg:left-55">
          <div className="flex items-center">
            <Link
              href={isLoggedIn ? "/marketplace" : "/"}
              className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="최애의 포토 로고"
                width={139}
                height={25}
                quality={100}
                className="object-contain md:h-5 md:w-27.75 lg:h-[25px] lg:w-[139px]"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center justify-center gap-7.5">
                <div className="flex items-center gap-7.5">
                  <button
                    type="button"
                    onClick={onOpenPointModal}
                    className="group flex cursor-pointer items-center gap-1.5 transition-opacity hover:opacity-85"
                    aria-label="포인트 상자 열기">
                    <div className="relative flex h-5.5 w-5.5 items-center justify-center text-white">
                      <GiftIcon />
                    </div>
                    <span className="typo-14-bold text-white">
                      {user.points.toLocaleString()} P
                    </span>
                  </button>

                  <div className="relative flex items-center">
                    <button
                      className="relative flex h-5.5 w-5.5 cursor-pointer items-center justify-center text-white transition hover:opacity-85"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      aria-label="알림 확인"
                      type="button">
                      <BellIcon />
                      {hasUnreadNotification && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                      )}
                    </button>

                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        <div className="absolute top-6 right-0 z-50 overflow-hidden">
                          <NotificationList
                            variant="desktop"
                            onItemClick={(item) => {
                              if (item?.targetId) {
                                router.push(`/marketplace/${item.targetId}`);
                              } else {
                                setIsNotificationOpen(false);
                              }
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <DesktopUserMenu user={user} menuItems={menuItems} />
                </div>

                <span className="typo-14-regular text-center text-gray-400 select-none">
                  |
                </span>

                <button
                  onClick={onLogout}
                  type="button"
                  className="typo-14-regular cursor-pointer text-right text-gray-400 transition hover:text-white">
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
