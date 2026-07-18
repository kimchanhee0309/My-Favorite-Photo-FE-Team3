import ExchangeOfferCard from './ExchangeOfferCard';
import PrimaryButton from '@/common/components/button/PrimaryButton';
import SecondaryButton from '@/common/components/button/SecondaryButton';

export default function ExchangeCard({
  imageUrl,
  name,
  grade,
  genre,
  minPrice,
  nickname,
  message,
  isOwner,
  onAccept,
  onReject,
  onCancel,
}) {
  return (
    <div
      className="flex flex-col gap-[20px] rounded-xs border p-[9px] md:gap-[25px] md:p-[19px] lg:gap-[40px] lg:p-[39px]"
      style={{
        borderColor: 'rgba(255, 255, 255, 0.10)',
        backgroundColor: 'var(--color-gray-500)',
      }}
    >
      <ExchangeOfferCard
        imageUrl={imageUrl}
        name={name}
        grade={grade}
        genre={genre}
        minPrice={minPrice}
        nickname={nickname}
        message={message}
      />

      {isOwner ? (
        <div className="flex items-center gap-[5px] md:gap-[20px]">
          <SecondaryButton
            thickness="thin"
            size={{ base: 'XS', md: 'M', lg: 'L' }}
            onClick={onReject}
            className="h-10 w-[72.5px] md:h-[55px] md:w-[141px] lg:h-[66px] lg:w-[170px]"
          >
            <span className="md:hidden">거절</span>
            <span className="hidden md:inline">거절하기</span>
          </SecondaryButton>
          <PrimaryButton
            thickness="thin"
            size={{ base: 'XS', md: 'M', lg: 'L' }}
            onClick={onAccept}
            className="h-10 w-[72.5px] md:h-[55px] md:w-[141px] lg:h-[66px] lg:w-[170px]"
          >
            <span className="md:hidden">승인</span>
            <span className="hidden md:inline">승인하기</span>
          </PrimaryButton>
        </div>
      ) : (
        <SecondaryButton
          thickness="thin"
          size={{ base: 'XS', md: 'M', lg: 'L' }}
          onClick={onCancel}
          className="h-10 w-[150px] md:h-[55px] md:w-[306px] lg:h-[66px] lg:w-[360px]"
        >
          취소하기
        </SecondaryButton>
      )}
    </div>
  );
}