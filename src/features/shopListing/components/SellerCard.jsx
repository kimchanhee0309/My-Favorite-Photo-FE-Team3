import CardInfo from './CardInfo';
import ExchangeInfo from './ExchangeInfo';
import { PrimaryButton, SecondaryButton } from '@/common/components';

export default function SellerCard({
  grade,
  genre,
  nickname,
  description,
  pricePerUnit,
  remainingQuantity,
  quantity,
  wishGrade,
  wishGenre,
  wishDescription,
  onEdit,
  onDelist,
}) {
  return (
    <div className="flex flex-col gap-[60px]">
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

      <div className="flex flex-col gap-[40px] lg:gap-[80px]">
        <ExchangeInfo
          grade={wishGrade}
          genre={wishGenre}
          description={wishDescription}
          className="w-[345px] md:w-[342px] lg:w-[440px]"
        />

        <div className="flex flex-col gap-[20px]">
          <PrimaryButton
            thickness="thick"
            size={{ base: 'S', md: 'M', lg: 'L' }}
            onClick={onEdit}
            className="h-[75px] w-[345px] md:w-[342px] lg:h-[80px] lg:w-[440px]"
          >
            수정하기
          </PrimaryButton>

          <SecondaryButton
            thickness="thick"
            size={{ base: 'S', md: 'M', lg: 'L' }}
            onClick={onDelist}
            className="h-[75px] w-[345px] md:w-[342px] lg:h-[80px] lg:w-[440px]"
          >
            판매 내리기
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}