import PrimaryButton from "@/common/components/button/PrimaryButton";
import GradeBadge from "@/features/photocard/components/GradeDetailBadge";

export default function ExchangeWishSection({ listing, onExchange }) {
  return (
    <div className="mt-[120px] flex flex-col items-start gap-[30px] self-center w-[345px] md:w-[704px] lg:w-[1480px]">
      <div className="flex w-full flex-col gap-[10px] md:gap-[20px]">
        <div className="flex w-full items-center justify-between">
          <h2 className="typo-24-regular font-bold md:typo-32-bold lg:typo-40-bold text-white">
            교환 희망 정보
          </h2>
          <PrimaryButton
            thickness="thin"
            size={{ md: "M", lg: "L" }}
            onClick={onExchange}
            className="hidden md:block md:h-[60px] md:w-[342px] lg:w-[440px]"
          >
            포토카드 교환하기
          </PrimaryButton>
        </div>
        <div className="h-[2px] w-full bg-gray-100" />
      </div>

      <div className="flex w-full flex-col items-start gap-[10px]">
        <p className="typo-18-bold lg:typo-24-regular text-gray-200 lg:font-bold">
          {listing.wishDescription}
        </p>
        <GradeBadge
          grade={listing.wishGrade}
          genre={listing.wishGenre}
          className="w-full"
        />
      </div>

      <PrimaryButton
        thickness="thin"
        size={{ base: "S", md: "M", lg: "L" }}
        onClick={onExchange}
        className="mt-10 h-[55px] w-[345px] md:hidden"
      >
        포토카드 교환하기
      </PrimaryButton>
    </div>
  );
}