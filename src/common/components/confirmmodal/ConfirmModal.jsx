"use client";

import Image from "next/image";
import PrimaryButton from "@/common/components/button/PrimaryButton";

export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  isOpen,
  onClose,
  onConfirm,
  isPending,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative flex h-[291px] w-[345px] flex-col items-center justify-center rounded-xs bg-gray-500 p-[15px] text-center md:h-[291px] md:w-[400px] lg:h-[335px] lg:w-[560px] lg:p-[30px]">
        <button
          onClick={onClose}
          className="absolute top-[15px] right-[15px] cursor-pointer lg:top-[30px] lg:right-[30px]"
          aria-label="모달 닫기">
          <Image src="/close.png" alt="닫기" width={32} height={32} className="h-6 w-6" />
        </button>

        <h2 className="typo-18-bold lg:typo-20-bold text-white">{title}</h2>
        <p className="typo-14-regular lg:typo-16-regular mt-[30px] text-gray-300 lg:mt-[40px]">
          {message}
        </p>

        <PrimaryButton
          thickness="thin"
          size={{ base: "S", md: "M", lg: "L" }}
          onClick={onConfirm}
          disabled={isPending}
          className="mt-[50px] h-[55px] w-[120px] md:mt-[60px] md:w-[140px] lg:h-[60px] lg:w-[170px]">
          {confirmLabel}
        </PrimaryButton>
      </div>
    </div>
  );
}