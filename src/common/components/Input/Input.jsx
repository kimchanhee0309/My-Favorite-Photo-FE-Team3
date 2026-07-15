"use client";

import Image from "next/image";
import { useId, useState } from "react";

export default function Input({
  type = "text",
  label,
  error,
  disabled,
  className = "",
  id,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;

  return (
    <div className="flex flex-col gap-[10px]">
      {label && (
        <label
          htmlFor={inputId}
          className="typo-16-regular lg:typo-20-regular text-white">
          {label}
        </label>
      )}

      <div
        className={`flex h-[55px] w-[345px] items-center gap-[10px] rounded-sm border bg-black px-5
          py-[18px] transition-colors md:w-[440px] lg:h-[60px] lg:w-[520px]
          ${error ? "border-red" : "border-gray-200"}
          ${disabled ? "opacity-40" : ""}
          ${className}`}>
        <input
          id={inputId}
          type={inputType}
          disabled={disabled}
          className="typo-14-light lg:typo-16-light w-full bg-transparent text-white outline-none placeholder:text-gray-200 disabled:cursor-not-allowed"
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            disabled={disabled}
            className="shrink-0 text-gray-200"
            aria-label={
              isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
            }>
            <Image
              src={isPasswordVisible ? "/visible.png" : "/invisible.png"}
              alt=""
              width={24}
              height={24}
              className="h-[22px] w-[22px] lg:h-[24px] lg:w-[24px]"
            />
          </button>
        )}
      </div>

      {error && (
        <p className="typo-14-light lg:typo-16-light text-red">{error}</p>
      )}
    </div>
  );
}
