"use client";

import { PrimaryButton } from "@/common/components";
import OriginCard from "@/common/components/photocard/OriginCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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

export default function MarketPlaceContent() {
  const [visibleCount, setVisibleCount] = useState(15);
  const [dummyCardData, setDummyCardData] = useState([
    ...onSaleCards,
    ...soldOutCards,
  ]);
  const hasNextpage = visibleCount < dummyCardData.length;

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextpage) {
        setVisibleCount((prev) => prev + 15);
      }
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDummyCardData(
      [...onSaleCards, ...soldOutCards].sort(() => Math.random() - 0.5),
    );
  }, []);
  return (
    <div className="grid grid-cols-[repeat(2,max-content)] justify-center gap-1.25 md:mt-5 lg:mt-15 lg:grid-cols-[repeat(3,max-content)] lg:gap-5">
      {dummyCardData.slice(0, visibleCount).map((card, idx, arr) => {
        const isLastItem = arr.length - 1 === idx;
        return isLastItem ? (
          <div ref={ref} key={card.id}>
            <OriginCard {...card} />
          </div>
        ) : (
          <OriginCard key={card.id} {...card} />
        );
      })}
      <PrimaryButton
        size="S"
        className="fixed inset-x-0 bottom-3.75 z-50 mx-auto w-86 py-4.25 md:hidden">
        나의 포토카드 판매하기
      </PrimaryButton>
    </div>
  );
}
