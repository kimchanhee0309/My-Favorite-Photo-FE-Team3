import CardInfo from './CardInfo';
import { PrimaryButton, Stepper } from '@/common/components';

export default function BuyerCard({
  grade,
  genre,
  nickname,
  description,
  pricePerUnit,
  remainingQuantity,
  quantity,
  purchaseQuantity,
  onQuantityChange,
  onBuy,
}) {
  const totalPrice = pricePerUnit * purchaseQuantity;

  return (
    <div className="flex flex-col gap-[40px] lg:gap-[80px]">
      <div className="flex flex-col items-start gap-[30px]">
        <CardInfo
          grade={grade}
          genre={genre}
          nickname={nickname}
          description={description}
          pricePerUnit={pricePerUnit}
          remainingQuantity={remainingQuantity}
          quantity={quantity}
          className="w-[345px] md:w-[342px] lg:w-[440px]"
        />

        <div className="h-px w-full bg-gray-400" />

        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <span className="typo-18-regular lg:typo-20-regular text-white">
              구매수량
            </span>
            <Stepper
              value={purchaseQuantity}
              min={1}
              max={remainingQuantity}
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
                {' '}
                ({purchaseQuantity}장)
              </span>
            </span>
          </div>
        </div>
      </div>

      <PrimaryButton
        thickness="thick"
        size={{ base: 'S', md: 'M', lg: 'L' }}
        onClick={onBuy}
        className="w-[345px] h-[75px] md:w-[342px] lg:w-[440px] lg:h-[80px]"
      >
        포토카드 구매하기
      </PrimaryButton>
    </div>
  );
}