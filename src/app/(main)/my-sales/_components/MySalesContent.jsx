"use client";

import SaleCard from "@/common/components/photocard/SaleCard";
import SoldOutCard from "@/common/components/photocard/SoldOutCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

export default function MySalesContent() {
  const searchParams = useSearchParams();

  const {
    data: mysaleItems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isPending,
    error,
  } = useInfiniteQuery({
    queryKey: ["mysale", "items", searchParams.toString()],
    queryFn: async ({ pageParam }) => {
      const url = pageParam
        ? `${process.env.NEXT_PUBLIC_API_URL}/shop-listings/me?cursor=${pageParam}&${searchParams}`
        : `${process.env.NEXT_PUBLIC_API_URL}/shop-listings/me?${searchParams}`;
      const res = await fetch(url, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("나의 판매 포토카드 조회 실패");
      const result = await res.json();
      return result.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
  });

  const items = mysaleItems?.pages.flatMap((page) => page.items) ?? [];
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isError) {
    return <p className="text-red flex justify-center">{error.message}</p>;
  }

  if (isPending) {
    return (
      <p className="flex justify-center">
        나의 판매 포토카드 데이터 불러오는 중...
      </p>
    );
  }

  if (items.length === 0) {
    return <p className="flex justify-center">해당하는 데이터가 없습니다</p>;
  }

  return (
    <div className="grid grid-cols-[repeat(2,max-content)] justify-center gap-1.25 md:mb-27.5 md:gap-5 lg:mb-35 lg:grid-cols-[repeat(3,max-content)] lg:gap-20">
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const Card = item.status === "ON_SALE" ? SaleCard : SoldOutCard;
        return (
          <div key={item.id} ref={isLastItem ? ref : undefined}>
            <Card
              remainingQuantity={item.remainingQuantity}
              saleType={item.saleType}
              title={item.ownership.photocard.name}
              genre={item.ownership.photocard.genre}
              grade={item.ownership.photocard.grade}
              imageUrl={item.ownership.photocard.imageUrl}
              pricePerUnit={item.pricePerUnit}
              description={item.ownership.photocard.description}
            />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="col-span-full flex animate-spin justify-center">
          <Image src="/spinner.svg" width={50} height={50} alt="" />
        </div>
      )}
    </div>
  );
}
