"use client";

import Link from "next/link";

export default function UserMenuList({ user, menuItems, onItemClick }) {
  return (
    <div>
      <div className="flex w-65 h-20.75 flex-col justify-center items-center gap-5">
        <div className="flex w-55 h-15.75 flex-col items-start gap-5 shrink-0">
          <p className="typo-18-bold text-white">
            안녕하세요, {user.nickname}님!
          </p>
          <div className="flex items-center justify-between w-full">
            <span className="typo-12-light text-gray-300">보유 포인트</span>
            <span className="typo-12-regular text-main">
              {user.points.toLocaleString()} P
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

      <nav className="flex flex-col w-27.5 h-21.75 gap-3.75 whitespace-nowrap ml-5 mt-5">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className="typo-14-bold text-white">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
