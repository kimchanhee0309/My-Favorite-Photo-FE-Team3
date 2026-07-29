"use client";

import UserMenuList from "./UserMenuList";

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
        <UserMenuList user={user} menuItems={menuItems} onItemClick={onClose} />

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
