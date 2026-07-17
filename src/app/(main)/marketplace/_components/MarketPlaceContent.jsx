"use client";

import OriginCard from "@/common/components/photocard/OriginCard";
import { useEffect, useState } from "react";

const dummyOnSaleData = {
  imageUrl: "/default.png",
  title: "테스트 제목",
  grade: "COMMON",
  genre: "LANDSCAPE",
  description: "설명",
  pricePerUnit: 4,
  remainingQuantity: 3,
  quantity: 5,
  status: "ON_SALE",
};

const dummySoldOutData = {
  imageUrl: "/default.png",
  title: "테스트 제목",
  grade: "COMMON",
  genre: "LANDSCAPE",
  description: "설명",
  pricePerUnit: 4,
  remainingQuantity: 0,
  quantity: 5,
  status: "SOLD_OUT",
};

const onSaleCards = Array.from({ length: 15 }, (_, i) => ({
  ...dummyOnSaleData,
  id: `onsale-${i}`,
}));

const soldOutCards = Array.from({ length: 15 }, (_, i) => ({
  ...dummySoldOutData,
  id: `soldout-${i}`,
}));

// const dummyCardData = [...onSaleCards, ...soldOutCards].sort(
//   () => Math.random() - 0.5,
// );

export default function MarketPlaceContent() {
  const [visibleCount, setVisibleCount] = useState(15);
  const [dummyCardData, setDummyCardData] = useState([
    ...onSaleCards,
    ...soldOutCards,
  ]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDummyCardData(
      [...onSaleCards, ...soldOutCards].sort(() => Math.random() - 0.5),
    );
  }, []);
  return (
    <div className="grid grid-cols-[repeat(2,max-content)] justify-center gap-1.25 lg:grid-cols-[repeat(3,max-content)] lg:gap-5">
      {dummyCardData.slice(0, visibleCount).map((card) => (
        <OriginCard key={card.id} {...card} />
      ))}
    </div>
  );
}
