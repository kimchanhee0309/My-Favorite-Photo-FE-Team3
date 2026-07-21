"use client";

import { useState } from "react";
import CustomModal from "@/common/components/modal/CustomModal";
import Image from "next/image";
import SaleInfoColumn from "@/features/shopListing/components/SaleInfoColumn";
import { PrimaryButton, SecondaryButton, Textarea } from "@/common/components";
import SelectInput from "@/common/components/input/SelectInput";
import { genreLabelMap } from "@/features/photocard/components/genreLabelMap";
import { useUpdateShopListing } from "@/features/shopListing/shopListing.queries";

const GRADE_OPTIONS = ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"];
const GENRE_LABEL_OPTIONS = Object.values(genreLabelMap);

export default function EditListingModal({
  shopListingId,
  listing,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [saleQuantity, setSaleQuantity] = useState(listing.remainingQuantity);
  const [pricePerUnit, setPricePerUnit] = useState(listing.pricePerUnit);
  const [wishGrade, setWishGrade] = useState(listing.wishGrade);
  const [wishGenre, setWishGenre] = useState(listing.wishGenre);
  const [wishDescription, setWishDescription] = useState(
    listing.wishDescription,
  );

  const { mutate: updateShopListing, isPending } =
    useUpdateShopListing(shopListingId);

  const handleGenreChange = (label) => {
    const code = Object.entries(genreLabelMap).find(
      ([, v]) => v === label,
    )?.[0];
    setWishGenre(code ?? null);
  };

  const handleSubmit = () => {
    updateShopListing(
      { pricePerUnit, wishGrade, wishGenre, wishDescription },
      {
        onSuccess: () => {
          onSuccess?.();
          onClose();
        },
      },
    );
  };

  const wishFields = (
    <>
      <SelectInput
        label="등급"
        options={GRADE_OPTIONS}
        value={wishGrade}
        placeholder="등급을 선택해 주세요"
        onChange={setWishGrade}
        className="md:w-[345px]! lg:h-[55px]! lg:w-[440px]!"
      />
      <SelectInput
        label="장르"
        options={GENRE_LABEL_OPTIONS}
        value={wishGenre ? genreLabelMap[wishGenre] : null}
        placeholder="장르를 선택해 주세요"
        onChange={handleGenreChange}
        className="md:w-[345px]! lg:h-[55px]! lg:w-[440px]!"
      />
    </>
  );

  return (
<CustomModal
  isOpen={isOpen}
  onClose={onClose}
  width={1160}
  contentMaxWidth={920}
  mobileVariant="fullscreen"
  title="수정하기"
>
  <div className="flex h-full flex-col gap-5">
    <p className="hidden font-['BaskinRobbins'] text-[16px] font-normal tracking-[-0.48px] text-gray-300 md:block lg:text-[24px] lg:tracking-[-0.72px]">
      수정하기
    </p>
    <div className="flex flex-col gap-2.5">
      <h2 className="typo-24-bold md:typo-32-bold lg:typo-40-bold border-b-2 border-gray-100 pb-[10px] text-white">
        {listing.name}
      </h2>
    </div>
        <div className="flex flex-col gap-[19px] md:flex-row md:gap-[20px] lg:gap-[40px]">
          <div className="relative h-[259px] w-[345px] shrink-0 overflow-hidden rounded-xs md:h-[257px] md:w-[342px] lg:h-[330px] lg:w-[440px]">
            <Image
              src={listing.imageUrl}
              alt={listing.name}
              fill
              className="object-cover"
            />
          </div>

          <SaleInfoColumn
            grade={listing.grade}
            genre={listing.genre}
            nickname={listing.nickname}
            quantity={saleQuantity}
            maxQuantity={listing.quantity}
            onQuantityChange={setSaleQuantity}
            price={pricePerUnit}
            onPriceChange={setPricePerUnit}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="typo-20-bold lg:typo-24-bold border-b-2 border-gray-100 pb-[10px] text-white">
            교환 희망 정보
          </h3>
        </div>

        <div>
          <div className="hidden items-center gap-[20px] md:flex lg:gap-[40px]">
            {wishFields}
          </div>
          <div className="flex flex-col gap-[34px] md:hidden">{wishFields}</div>

          <div className="mt-[34px] md:mt-[34px] lg:mt-[35px]">
            <Textarea
              label="교환 희망 설명"
              value={wishDescription}
              onChange={(e) => setWishDescription(e.target.value)}
              placeholder="설명을 입력해 주세요"
              className="h-[140px]! w-[340px]! md:h-[124px]! md:w-[704px]! lg:h-[125px]! lg:w-[920px]!"
            />
          </div>

          <div className="mt-[60px] hidden h-px w-full bg-gray-400 lg:block" />

          <div className="mt-[44px] flex gap-2.5 md:mt-[60px] lg:mt-[30px]">
            <SecondaryButton
              thickness="thin"
              size={{ base: "S", md: "M", lg: "L" }}
              onClick={onClose}
              className="h-[55px] flex-1 lg:h-[66px]">
              취소하기
            </SecondaryButton>
            <PrimaryButton
              thickness="thin"
              size={{ base: "S", md: "M", lg: "L" }}
              onClick={handleSubmit}
              disabled={isPending}
              className="h-[55px] flex-1 lg:h-[66px]">
              수정하기
            </PrimaryButton>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
