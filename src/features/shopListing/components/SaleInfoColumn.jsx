"use client";

import GradeBadge from "@/features/photocard/components/GradeDetailBadge";
import Stepper from "@/common/components/Stepper/Stepper";

export default function SaleInfoColumn({
  grade,
  genre,
  nickname,
  quantity,
  maxQuantity,
  onQuantityChange,
  price,
  onPriceChange,
  className = "",
}) {
  return (
    <div
      className={`flex w-[345px] flex-col items-start gap-[30px] md:w-[342px] lg:w-[440px] ${className}`}>
      <GradeBadge
        grade={grade}
        genre={genre}
        nickname={nickname}
        className="w-full"
      />

      <div className="h-px w-full bg-gray-400" />

      <div className="flex w-full flex-col gap-[20px]">
        <div className="flex w-full items-center justify-between">
          <span className="typo-18-regular lg:typo-20-regular text-white">
            총 판매 수량
          </span>
          <div className="flex items-center gap-[15px] lg:gap-[20px]">
            <Stepper
              value={quantity}
              min={1}
              max={maxQuantity}
              onChange={onQuantityChange}
            />
            <div className="flex flex-col items-start">
              <span className="typo-18-bold lg:typo-20-bold text-white">
                /{maxQuantity}
              </span>
              <span className="typo-12-regular lg:typo-14-regular text-gray-200">
                최대 {maxQuantity}장
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="typo-18-regular lg:typo-20-regular text-white">
            장당 가격
          </span>
          <div className="flex h-[45px] w-[202px] items-center justify-between rounded-xs border border-gray-200 bg-gray-500 px-5 py-[9px] lg:h-[50px] lg:w-[245px] lg:py-[13px]">
            <input
              type="text"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              placeholder="숫자만 입력"
              className="typo-14-regular lg:typo-16-regular w-full bg-transparent text-white outline-none placeholder:text-gray-200"
            />
            <span className="typo-18-bold lg:typo-20-bold text-white">P</span>
          </div>
        </div>
      </div>
    </div>
  );
}
