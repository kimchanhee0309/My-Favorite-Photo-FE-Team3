"use client";

import Image from "next/image";

export default function FullScreenModal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black">
      <div className="relative flex h-[60px] w-full shrink-0 items-center px-5 py-[19px]">
        <button type="button" onClick={onClose} aria-label="뒤로가기">
          <Image src="/back.png" alt="" width={22} height={22} />
        </button>
        <h2 className="typo-20-regular tracking-[-0.6px] font-['BaskinRobbins'] absolute left-1/2 -translate-x-1/2 text-white">
          {title}
        </h2>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto">
        <div className="w-[345px] py-6">{children}</div>
      </div>
    </div>
  );
}