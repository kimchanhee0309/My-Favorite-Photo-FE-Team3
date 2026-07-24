"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SaleInfoColumn from "@/features/shopListing/components/SaleInfoColumn";
import { PrimaryButton, SecondaryButton, Textarea } from "@/common/components";
import SelectInput from "@/common/components/input/SelectInput";
import { genreLabelMap } from "@/features/photocard/components/genreLabelMap";
import { useCreateShopListing } from "@/features/shopListing/shopListing.queries";

const GRADE_OPTIONS = ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"];
const GENRE_LABEL_OPTIONS = Object.values(genreLabelMap);

export default function SellListingForm({ card, onCancel }) {
  const router = useRouter();
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [wishGrade, setWishGrade] = useState(null);
  const [wishGenre, setWishGenre] = useState(null);
  const [wishDescription, setWishDescription] = useState("");

  const { mutate: createShopListing, isPending } = useCreateShopListing();

  const handleGenreChange = (label) => {
    const code = Object.entries(genreLabelMap).find(([, v]) => v === label)?.[0];
    setWishGenre(code ?? null);
  };

  const buildResultUrl = (status) => {
    const query = new URLSearchParams({
      status,
      grade: card.grade,
      name: card.title,
      quantity: String(saleQuantity),
    });
    return `/marketplace/sell-result?${query.toString()}`;
  };

  const handleSubmit = () => {
    createShopListing(
      {
        ownershipId: card.id,
        quantity: saleQuantity,
        pricePerUnit,
        wishGrade,
        wishGenre,
        wishDescription,
      },
      {
        onSuccess: () => router.push(buildResultUrl("success")),
        onError: () => router.push(buildResultUrl("error")),
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
    <div className="flex h-full flex-col gap-5">
      <p className="hidden font-['BaskinRobbins'] text-[16px] font-normal tracking-[-0.48px] text-gray-300 md:block lg:text-[24px] lg:tracking-[-0.72px]">
        나의 포토카드 판매하기
      </p>
      <div className="flex flex-col gap-2.5">
        <h2 className="typo-24-bold md:typo-32-bold lg:typo-40-bold border-b-2 border-gray-100 pb-[10px] text-white">
          {card.title}
        </h2>
      </div>

      <div className="flex flex-col gap-[19px] md:flex-row md:gap-[20px] lg:gap-[40px]">
        <div className="relative h-[259px] w-[345px] shrink-0 overflow-hidden rounded-xs md:h-[257px] md:w-[342px] lg:h-[330px] lg:w-[440px]">
          <Image src={card.imageUrl} alt={card.title} fill className="object-cover" />
        </div>

        <SaleInfoColumn
          grade={card.grade}
          genre={card.genre}
          nickname={card.description}
          quantity={saleQuantity}
          maxQuantity={card.quantity}
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
        <div className="hidden items-center gap-[20px] md:flex lg:gap-[40px]">{wishFields}</div>
        <div className="flex flex-col gap-[34px] md:hidden">{wishFields}</div>

        <div className="mt-[34px] md:mt-[34px] lg:mt-[35px]">
          <Textarea
            label="교환 희망 설명"
            value={wishDescription}
            onChange={(e) => setWishDescription(e.target.value)}
            placeholder="설명을 입력해 주세요"
            className="h-[140px]! w-[340px]! md:h-[124px]! md:w-[704px]! lg:h-[125px]! lg:w-[902px]!"
          />
        </div>

        <div className="mt-[60px] hidden h-px w-full bg-gray-400 lg:block" />

        <div className="mt-[44px] flex gap-2.5 md:mt-[60px] lg:mt-[30px]">
          <SecondaryButton
            thickness="thin"
            size={{ base: "S", md: "M", lg: "L" }}
            onClick={onCancel}
            className="h-[55px] flex-1 lg:h-[66px]">
            취소하기
          </SecondaryButton>
          <PrimaryButton
            thickness="thin"
            size={{ base: "S", md: "M", lg: "L" }}
            onClick={handleSubmit}
            disabled={isPending}
            className="h-[55px] flex-1 lg:h-[66px]">
            판매하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}