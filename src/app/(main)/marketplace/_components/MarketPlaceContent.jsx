"use client";

import { PrimaryButton } from "@/common/components";
import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";
import OriginCard from "@/common/components/photocard/OriginCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

export default function MarketPlaceContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLogin = false;
  const router = useRouter();

  const {
    data: marketItems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["marketplace", "items"],
    queryFn: async ({ pageParam }) => {
      const url = pageParam
        ? `http://localhost:3001/shop-listings?cursor=${pageParam}`
        : `http://localhost:3001/shop-listings`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("마켓리스트 조회 실패");
      const result = await res.json();
      console.log(result.data);
      return result.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
  });

  const items = marketItems?.pages.flatMap((page) => page.items) ?? [];

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
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
      {items.map((item) => (
        <div
          key={item.id}
          ref={ref}
          onClick={() => cardClick(item)}
          className={`${item.status === "SOLD_OUT" ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <OriginCard
            {...item}
            title={item.ownership.photocard.name}
            genre={item.ownership.photocard.genre}
            description={item.ownership.photocard.description}
            grade={item.ownership.photocard.grade}
            imageUrl={item.ownership.photocard.imageUrl}
          />
        </div>
      ))}
      <PrimaryButton
        size="S"
        className="fixed inset-x-0 bottom-3.75 z-10 mx-auto w-86 py-4.25 md:hidden">
        나의 포토카드 판매하기
      </PrimaryButton>
    </div>
  );
}
