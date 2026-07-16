import ExchangeOfferCard from "./ExchangeOfferCard";
import { PrimaryButton, Stepper } from '@/common/components';

export default function ExchangeCard({
  imageUrl,
  title,
  grade,
  genre,
  minPrice,
  nickname,
  description,
  isOwner,
  onAccept,
  onReject,
  onCancel,
}) {
  return (
    <div className="flex flex-col gap-[20px] md:gap-[25px] lg:gap-[40px]">
      <ExchangeOfferCard
        imageUrl={imageUrl}
        title={title}
        grade={grade}
        genre={genre}
        minPrice={minPrice}
        nickname={nickname}
        description={description}
      />

      {isOwner ? (
        <div className="flex items-center gap-[5px] md:gap-[20px]">
          <SecondaryButton
            thickness="thin"
            size={{ base: "XS", md: "M", lg: "L" }}
            onClick={onReject}
            className="h-10 w-[72.5px] md:h-[55px] md:w-[141px] lg:h-[66px] lg:w-[170px]">
            <span className="md:hidden">거절</span>
            <span className="hidden md:inline">거절하기</span>
          </SecondaryButton>
          <PrimaryButton
            thickness="thin"
            size={{ base: "XS", md: "M", lg: "L" }}
            onClick={onAccept}
            className="h-10 w-[72.5px] md:h-[55px] md:w-[141px] lg:h-[60px] lg:w-[170px]">
            <span className="md:hidden">승인</span>
            <span className="hidden md:inline">승인하기</span>
          </PrimaryButton>
        </div>
      ) : (
        <SecondaryButton
          thickness="thin"
          size={{ base: "XS", md: "M", lg: "L" }}
          onClick={onCancel}
          className="h-10 w-[72.5px] md:h-[55px] md:w-[141px] lg:h-[60px] lg:w-[170px]">
          취소하기
        </SecondaryButton>
      )}
    </div>
  );
}
