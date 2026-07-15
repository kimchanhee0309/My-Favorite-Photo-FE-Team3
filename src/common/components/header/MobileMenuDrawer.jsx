"use client";

import Link from "next/link";

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  user,
  menuItems,
  onLogout,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 block md:hidden">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.80)] transition-opacity"
        onClick={onClose}
      />

      <div className="absolute top-0 left-0 w-65 h-full bg-gray-500 shadow-[0_0_20px_0_rgba(0,0,0,0.20)] pt-10 pb-5 flex flex-col justify-between">
        <div>
          <div className="flex w-65 h-20.75 flex-col justify-center items-center gap-5">
            <div className="flex w-55 h-15.75 flex-col items-start gap-5 shrink-0">
              <p className="typo-18-bold text-white">
                안녕하세요, {user.name}님!
              </p>
              <div className="flex items-center justify-between w-full">
                <span className="typo-12-light text-gray-300">보유 포인트</span>
                <span className="typo-12-regular text-main">
                  {user.point.toLocaleString()} P
                </span>
              </div>
            </div>
          </div>

          <svg
            width="260"
            height="1"
            viewBox="0 0 260 1"
            fill="none"
            className="block mt-5">
            <path opacity="0.5" d="M0 0.5H260" stroke="#5A5A5A" />
          </svg>

          <nav className="flex flex-col w-27.5 h-21.75 gap-3.75 whitespace-nowrap ml-5 mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="typo-14-bold text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={onLogout}
          type="button"
          className="text-left typo-14-regular text-gray-400 select-none cursor-pointer ml-5">
          로그아웃
        </button>
      </div>
    </div>
  );
}
