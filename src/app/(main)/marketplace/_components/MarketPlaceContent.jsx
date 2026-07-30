"use client";

import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";
import OriginCard from "@/common/components/photocard/OriginCard";
import Spinner from "@/common/components/spinner/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import MobileSellButton from "./MobileSellButton";
import { useAuth } from "@/providers/AuthProvider";
import { useInfiniteShopListings } from "@/features/shopListing/shopListing.queries";

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
  } = useInfiniteShopListings(Object.fromEntries(searchParams));

  const items = marketItems?.pages.flatMap((page) => page.data.items) ?? [];

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
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
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
        const isPriority = index < 6;
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
              grade={item.ownership.photocard.grade}
              imageUrl={item.ownership.photocard.imageUrl}
              priority={isPriority}
              nickname={item.user.nickname}
            />
          </div>
        );
      })}
      {isFetchingNextPage && <Spinner className="col-span-full" />}
      <MobileSellButton />
    </div>
  );
}
