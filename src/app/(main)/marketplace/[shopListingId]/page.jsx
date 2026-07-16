"use client";

import { useState } from "react";
import ListingHero from "./_components/ListingHero";
import ExchangeWishSection from "./_components/ExchangeWishSection";
import ExchangeOfferSection from "./_components/ExchangeOfferSection";

export default function MarketplaceDetailPage() {
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const isOwner = true;

  const listing = {
    name: "인디쵸",
    imageUrl: "/cho.jpeg",
    grade: "LEGENDARY",
    genre: "PORTRAIT",
    nickname: "문치",
    description: "인디언 cho-zzang 입니다.",
    pricePerUnit: 4000,
    remainingQuantity: 2,
    quantity: 7,
    wishGrade: "RARE",
    wishGenre: "PORTRAIT",
    wishDescription: "아름다운 사람으로 부탁합니다.",
  };

  const exchangeOffers = [
    {
      id: 1,
      imageUrl: "/cho.jpeg",
      name: "스페인 여행",
      grade: "COMMON",
      genre: "TRAVEL",
      minPrice: 700,
      nickname: isOwner ? "nickname" : "proposer",
      message:
        "스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!",
    },
    {
      id: 2,
      imageUrl: "/cho.jpeg",
      name: "How Far I'll Go",
      grade: "SUPER_RARE",
      genre: "LANDSCAPE",
      minPrice: 400,
      nickname: isOwner ? "nickname" : "proposer",
      message: "여름 바다 풍경 사진과 교환하실래요?",
    },
    {
      id: 3,
      imageUrl: "/cho.jpeg",
      name: "겨울 왕국",
      grade: "RARE",
      genre: "LANDSCAPE",
      minPrice: 500,
      nickname: isOwner ? "nickname" : "proposer",
      message: "눈 오는 풍경 사진이랑 교환하고 싶어요!",
    },
  ];

  return (
    <div className="layout-container flex flex-col py-10">
      <p className="md:typo-brand-16 lg:typo-brand-24 hidden text-gray-300 md:mb-10 md:block md:font-normal lg:mb-[60px]">
        마켓플레이스
      </p>

      <div className="flex flex-col gap-2.5 md:gap-5">
        <h1 className="typo-24-regular md:typo-32-bold lg:typo-40-bold font-bold text-white">
          {listing.name}
        </h1>
        <div className="h-[2px] w-full bg-gray-100" />
      </div>

      <ListingHero
        listing={listing}
        isOwner={isOwner}
        purchaseQuantity={purchaseQuantity}
        onQuantityChange={setPurchaseQuantity}
        onBuy={() => alert("구매하기")}
        onEdit={() => alert("수정하기")}
        onDelist={() => alert("판매 내리기")}
      />

      {!isOwner && (
        <ExchangeWishSection
          listing={listing}
          onExchange={() => alert("포토카드 교환하기")}
        />
      )}

      {!isOwner && (
        <ExchangeOfferSection
          offers={exchangeOffers}
          isOwner={isOwner}
          onCancel={(id) => alert(`취소 ${id}`)}
        />
      )}

      {isOwner && (
        <ExchangeOfferSection
          offers={exchangeOffers}
          isOwner={isOwner}
          onAccept={(id) => alert(`승인 ${id}`)}
          onReject={(id) => alert(`거절 ${id}`)}
        />
      )}
    </div>
  );
}
