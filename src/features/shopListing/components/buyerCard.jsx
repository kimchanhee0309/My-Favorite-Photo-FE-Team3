import GradeBadge from "@/features/photocard/components/gradeBadge";
import PriceInfo from "./priceinfo";
import Stepper from "@/common/components/Stepper/Stepper";
import PrimaryButton from "@/common/components/button/Primarybutton";

export default function BuyerCard({
  grade,
  genre,
  nickname,
  description,
  price,
  remaining,
  total,
  quantity,
  onQuantityChange,
  onBuy,
}) {
  const totalPrice = price * quantity;

  return (
    <div className="flex flex-col gap-[40px] lg:gap-[80px]">
      <div className="flex w-[345px] flex-col items-start gap-[30px] md:w-[342px] lg:w-[440px]">
        <GradeBadge
          grade={grade}
          genre={genre}
          nickname={nickname}
          className="w-full"
        />

        <div className="h-px w-full bg-gray-400" />

        <p className="typo-16-regular lg:typo-18-regular text-gray-200">
          {description}
        </p>

        <div className="h-px w-full bg-gray-400" />

        <PriceInfo
          price={price}
          remaining={remaining}
          total={total}
          className="w-full"
        />

        <div className="h-px w-full bg-gray-400" />

        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <span className="typo-18-regular lg:typo-20-regular text-white">
              구매수량
            </span>
            <Stepper
              value={quantity}
              min={1}
              max={remaining}
              onChange={onQuantityChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="typo-18-regular lg:typo-20-regular text-white">
              총 가격
            </span>
            <span>
              <span className="typo-20-regular lg:typo-24-regular font-bold text-white">
                {totalPrice} P
              </span>
              <span className="typo-18-regular lg:typo-20-regular text-gray-300">
                {" "}
                ({quantity}장)
              </span>
            </span>
          </div>
        </div>
      </div>

      <PrimaryButton
        thickness="thick"
        size={{ base: "S", md: "M", lg: "L" }}
        onClick={onBuy}
        className="w-[345px] h-[75px] md:w-[342px] lg:w-[440px] lg:h-[80px]">
        포토카드 구매하기
      </PrimaryButton>
    </div>
  );
}