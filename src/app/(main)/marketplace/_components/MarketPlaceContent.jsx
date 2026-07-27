"use client";

import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";
import OriginCard from "@/common/components/photocard/OriginCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import MobileSellButton from "./MobileSellButton";
import { useAuth } from "@/providers/AuthProvider";

export default function MarketPlaceContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: marketItems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isPending,
    error,
  } = useInfiniteQuery({
    //searchParams를 그대로 queryKey에 넣으면 URLSearchParams 값이 내부적으로 저장되어있어서 빈 객체로 나온다
    queryKey: ["marketplace", "items", searchParams.toString()],
    queryFn: async ({ pageParam }) => {
      const url = pageParam
        ? `${process.env.NEXT_PUBLIC_API_URL}/shop-listings?cursor=${pageParam}&${searchParams}`
        : `${process.env.NEXT_PUBLIC_API_URL}/shop-listings?${searchParams}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("마켓리스트 조회 실패");
      const result = await res.json();
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

  const cardClick = (item) => {
    if (item.status === "SOLD_OUT") return;
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }
    router.push(`/marketplace/${item.id}`);
  };

  if (isError) {
    return (
      <>
        <p className="text-red flex justify-center">{error.message}</p>
        <MobileSellButton />
      </>
    );
  }

  if (isPending) {
    return (
      <>
        <p className="flex justify-center">
          마켓플레이스 데이터 불러오는 중...
        </p>
        <MobileSellButton />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <p className="flex justify-center">해당하는 데이터가 없습니다</p>
        <MobileSellButton />
      </>
    );
  }

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
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return (
          <div
            key={item.id}
            ref={isLastItem ? ref : undefined}
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
        );
      })}
      {isFetchingNextPage && (
        <div className="col-span-full flex animate-spin justify-center">
          <Image src="/spinner.svg" width={50} height={50} alt="" />
        </div>
      )}
      <MobileSellButton />
    </div>
  );
}
