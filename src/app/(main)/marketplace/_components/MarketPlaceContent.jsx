"use client";

import { PrimaryButton } from "@/common/components";
import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";
import OriginCard from "@/common/components/photocard/OriginCard";
import { useRouter } from "next/navigation";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasNextpage = visibleCount < dummyCardData.length;
  const isLogin = false;
  const router = useRouter();

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextpage) {
        setVisibleCount((prev) => prev + 15);
      }
    },
  });

  const cardClick = (card) => {
    if (card.status === "SOLD_OUT") return;
    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    router.push(`/marketplace/${card.id}`);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDummyCardData(
      [...onSaleCards, ...soldOutCards].sort(() => Math.random() - 0.5),
    );
  }, []);
  return (
    <div className="grid grid-cols-[repeat(2,max-content)] justify-center gap-1.25 md:mt-5 md:mb-27.5 md:gap-5 lg:mt-15 lg:mb-35 lg:grid-cols-[repeat(3,max-content)] lg:gap-20">
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => router.push("/login")}
        title="로그인이 필요합니다"
        message={
          <>
            로그인 하시겠습니까?
            <br />
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </>
        }
        confirmLabel="확인"
      />
      {dummyCardData.slice(0, visibleCount).map((card, idx, arr) => {
        const isLastItem = arr.length - 1 === idx;
        return isLastItem ? (
          <div
            ref={ref}
            key={card.id}
            onClick={() => cardClick(card)}
            className={`${card.status === "SOLD_OUT" ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <OriginCard {...card} />
          </div>
        ) : (
          <div
            key={card.id}
            onClick={() => cardClick(card)}
            className={`${card.status === "SOLD_OUT" ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <OriginCard {...card} />
          </div>
        );
      })}
      <PrimaryButton
        size="S"
        className="fixed inset-x-0 bottom-3.75 z-10 mx-auto w-86 py-4.25 md:hidden">
        나의 포토카드 판매하기
      </PrimaryButton>
    </div>
  );
}
