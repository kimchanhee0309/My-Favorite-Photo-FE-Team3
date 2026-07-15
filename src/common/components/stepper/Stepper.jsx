"use client";

import Image from "next/image";

export default function Stepper({
  value,
  min = 1,
  max,
  onChange,
  className = "",
}) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (max === undefined || value < max) onChange(value + 1);
  };

  return (
    <div
      className={`flex h-[45px] w-[144px] items-center justify-between rounded-xs border border-gray-200 bg-black px-3 py-2.5 lg:h-[50px] lg:w-[176px] ${className}`}>
      <button type="button" onClick={handleDecrease} disabled={value <= min}>
        <Image
          src="/minus.png"
          alt="감소"
          width={24}
          height={24}
          className="h-[22px] w-[22px] lg:h-[24px] lg:w-[24px]"
        />
      </button>

      <span className="typo-18-regular text-white lg:typo-20-regular">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={max !== undefined && value >= max}>
        <Image
          src="/plus.png"
          alt="증가"
          width={24}
          height={24}
          className="h-[22px] w-[22px] lg:h-[24px] lg:w-[24px]"
        />
      </button>
    </div>
  );
}
