"use client";

import Link from "next/link";
import Image from "next/image";
import { HamburgerIcon, BackIcon, BellIcon } from "./Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MobileNotificationOverlay from "@/features/notification/components/MobileNotificationOverlay";

export default function MobileGnb({
  currentState,
  pageTitle,
  hasUnreadNotification,
  onMenuOpen,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //주소창에 ?modal=notification이 있는지 확인
  const isNotificationOpen = searchParams.get("modal") === "notification";

  const handleOpenNotification = () => {
    router.push(`${pathname}?modal=notification`, { scroll: false });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <header className="sticky top-0 z-40 block h-20 w-full bg-black text-gray-200 select-none md:hidden">
        <div className="layout-container relative flex h-full items-center justify-between">
          {(currentState === "login" || currentState === "logout") &&
            !isNotificationOpen && (
              <>
                <button
                  onClick={onMenuOpen}
                  className="absolute left-5 flex h-5.5 w-5.5 cursor-pointer items-center justify-center"
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
                      className="h-[15px] w-[83px] object-contain"
                      priority
                    />
                  </Link>
                </div>

                <div className="absolute right-5 flex h-full items-center">
                  {currentState === "login" ? (
                    <button
                      onClick={handleOpenNotification}
                      className="relative flex h-5.5 w-5.5 cursor-pointer items-center justify-center"
                      aria-label="알림 확인"
                      type="button">
                      <BellIcon />
                      {hasUnreadNotification && (
                        <span className="bg-red absolute top-0 right-0 h-2 w-2 rounded-full" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="text-[14px] font-medium text-gray-200">
                      로그인
                    </Link>
                  )}
                </div>
              </>
            )}

          {(currentState === "secondary" || isNotificationOpen) && (
            <>
              <button
                onClick={handleBack}
                className="absolute left-5 flex h-5.5 w-5.5 cursor-pointer items-center justify-center"
                aria-label="뒤로 가기"
                type="button">
                <BackIcon />
              </button>

              <div className="mx-auto block">
                {(pageTitle || isNotificationOpen) && (
                  <h1 className="text-center font-[BaskinRobbins] text-[20px] leading-normal font-normal tracking-[-0.6px] text-white">
                    {isNotificationOpen ? "알림" : pageTitle}
                  </h1>
                )}
              </div>

              <div className="absolute right-5 h-5.5 w-5.5" />
            </>
          )}
        </div>
      </header>

      <MobileNotificationOverlay isOpen={isNotificationOpen} />
    </>
  );
}
