"use client";

import { useState } from "react";
import UserMenuList from "./UserMenuList";

export default function DesktopUserMenu({ user, menuItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="font-[BaskinRobbins] text-[18px] text-gray-200 font-normal cursor-pointer">
        {user.nickname}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full right-0 mt-3 z-50 w-65 bg-gray-500 py-5">
            <UserMenuList
              user={user}
              menuItems={menuItems}
              onItemClick={() => setIsOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}
