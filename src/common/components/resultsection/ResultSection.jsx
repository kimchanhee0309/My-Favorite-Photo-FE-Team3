"use client";

import Image from "next/image";
import SecondaryButton from "@/common/components/button/SecondaryButton";

export default function ResultSection({
  isSuccess,
  title,
  message,
  buttonLabel,
  onButtonClick,
  onClose,
}) {
  return (
    <div className="layout-container flex flex-1 items-center justify-center py-10">
      <div className="relative flex w-full flex-col items-center justify-center text-center md:h-[279px] md:w-[550px] lg:h-[370px] lg:w-[850px]">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 hidden cursor-pointer md:block"
          aria-label="닫기">
          <Image src="/close.png" alt="닫기" width={32} height={32} className="h-7 w-7 lg:h-8 lg:w-8" />
        </button>

        <h2 className="font-['BaskinRobbins'] text-[30px] font-bold tracking-[-0.9px] text-white md:text-[36px] md:tracking-[-1.08px] lg:text-[46px] lg:tracking-[-1.38px]">
          {title}{" "}
          <span className={isSuccess ? "text-main" : "text-gray-300"}>
            {isSuccess ? "성공" : "실패"}
          </span>
        </h2>
        <p className="typo-16-bold lg:typo-20-bold mt-[30px] text-white lg:mt-[40px]">
          {message}
        </p>
        <SecondaryButton
          thickness="thin"
          size={{ base: "S", md: "M", lg: "L" }}
          onClick={onButtonClick}
          className="mt-[40px] h-[55px] w-[226px] lg:mt-[60px] lg:h-[60px] lg:w-[440px]">
          {buttonLabel}
        </SecondaryButton>
      </div>
    </div>
  );
}