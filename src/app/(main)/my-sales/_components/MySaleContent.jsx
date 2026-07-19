"use client";

import SaleCard from "@/common/components/photocard/SaleCard";
import SoldOutCard from "@/common/components/photocard/SoldOutCard";
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
  status: "ON_SALE",
  saleType: "SALE",
};

const dummyExchangeData = {
  imageUrl: "/default.png",
  title: "테스트 제목",
  grade: "COMMON",
  genre: "LANDSCAPE",
  description: "설명",
  pricePerUnit: 4,
  remainingQuantity: 3,
  status: "ON_SALE",
  saleType: "EXCHANGE",
};

const dummySoldOutData = {
  imageUrl: "/default.png",
  title: "테스트 제목",
  grade: "COMMON",
  genre: "LANDSCAPE",
  description: "설명",
  pricePerUnit: 4,
  remainingQuantity: 0,
  status: "SOLD_OUT",
};

const onSaleCards = Array.from({ length: 10 }, (_, i) => ({
  ...dummyOnSaleData,
  id: `onsale-${i}`,
}));

const exchangeCards = Array.from({ length: 10 }, (_, i) => ({
  ...dummyExchangeData,
  id: `exchange-${i}`,
}));

const soldOutCards = Array.from({ length: 10 }, (_, i) => ({
  ...dummySoldOutData,
  id: `soldout-${i}`,
}));

export default function MySaleContent() {
  const [visibleCount, setVisibleCount] = useState(15);
  const [dummyCardData, setDummyCardData] = useState([
    ...onSaleCards,
    ...soldOutCards,
    ...exchangeCards,
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
      [...onSaleCards, ...soldOutCards, ...exchangeCards].sort(
        () => Math.random() - 0.5,
      ),
    );
  }, []);
  return (
    <div className="grid grid-cols-[repeat(2,max-content)] justify-center gap-1.25 lg:grid-cols-[repeat(3,max-content)] lg:gap-5">
      {dummyCardData.slice(0, visibleCount).map((card, idx, arr) => {
        const isLastItem = arr.length - 1 === idx;
        const Cards = card.status === "ON_SALE" ? SaleCard : SoldOutCard;
        return isLastItem ? (
          <div ref={ref} key={card.id}>
            <Cards {...card} />
          </div>
        ) : (
          <Cards key={card.id} {...card} />
        );
      })}
    </div>
  );
}
