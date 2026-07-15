"use client";

import { useState } from "react";
import Image from "next/image";
import BuyerCard from "@/features/shopListing/components/BuyerCard";
import SellerCard from "@/features/shopListing/components/SellerCard";
import { PrimaryButton } from "@/common/components";
import GradeBadge from "@/features/photocard/components/GradeBadge";

export default function MarketplaceDetailPage() {
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const isOwner = true;

  const listing = {
    title: "인디쵸",
    imageUrl: "/cho.jpeg",
    grade: "LEGENDARY",
    genre: "PORTRAIT",
    nickname: "문치",
    description: "인디언 cho-zzang 입니다.",
    pricePerUnit: 40000,
    remainingQuantity: 2,
    quantity: 7,
    wishGrade: "RARE",
    wishGenre: "PORTRAIT",
    wishDescription: "아름다운 사람으로 부탁합니다.",
  };

  return (
    <div className="layout-container flex flex-col py-10">
      <p className="md:typo-brand-16 lg:typo-brand-24 hidden text-gray-300 md:mb-10 md:block md:font-normal lg:mb-[60px]">
        마켓플레이스
      </p>

      <div className="flex flex-col gap-2.5 md:gap-5">
        <h1 className="typo-24-regular md:typo-32-bold lg:typo-40-bold font-bold text-white">
          {listing.title}
        </h1>
        <div className="h-[2px] w-full bg-gray-100" />
      </div>

      <div className="mt-[26px] flex flex-col items-center gap-10 md:mt-[48px] md:flex-row md:items-start md:justify-center lg:mt-[70px]">
        <div className="relative h-[259px] w-[345px] md:h-[257px] md:w-[342px] lg:h-[720px] lg:w-[960px]">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="rounded-xs object-cover"
          />
        </div>

        {isOwner ? (
          <SellerCard
            {...listing}
            onEdit={() => alert("수정하기")}
            onDelist={() => alert("판매 내리기")}
          />
        ) : (
          <BuyerCard
            {...listing}
            purchaseQuantity={purchaseQuantity}
            onQuantityChange={setPurchaseQuantity}
            onBuy={() => alert("구매하기")}
          />
        )}
      </div>

      {!isOwner && (
        <div className="mt-[120px] flex w-[345px] flex-col items-start gap-[30px] self-center md:w-[724px] lg:w-[1440px]">
          <div className="flex w-full flex-col gap-[10px] md:gap-[20px]">
            <div className="flex w-full items-center justify-between">
              <h2 className="typo-22-bold lg:typo-28-bold text-white">
                교환 희망 정보
              </h2>

              <PrimaryButton
                thickness="thin"
                size={{ md: "M", lg: "L" }}
                onClick={() => alert("포토카드 교환하기")}
                className="hidden md:block md:h-[60px] md:w-[342px] lg:w-[440px]">
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
            onClick={() => alert("포토카드 교환하기")}
            className="mt-10 h-[55px] w-[345px] md:hidden">
            포토카드 교환하기
          </PrimaryButton>
        </div>
      )}

      {isOwner && (
        <div className="mt-[120px] flex flex-col gap-4">
          <h2 className="typo-22-bold lg:typo-28-bold text-white">
            교환 제시 목록
          </h2>
          <div className="h-px w-full bg-gray-100" />
        </div>
      )}
    </div>
  );
}
