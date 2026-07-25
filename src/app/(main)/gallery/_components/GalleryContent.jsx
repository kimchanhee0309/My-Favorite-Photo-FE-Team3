"use client";

import MyCard from "@/common/components/photocard/MyCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import MobileCreateButton from "./MobileCreateButton";

export default function GalleryContent() {
  const searchParams = useSearchParams();

  const {
    data: galleryItems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isPending,
    error,
  } = useInfiniteQuery({
    queryKey: ["gallery", "items", searchParams.toString()],
    queryFn: async ({ pageParam }) => {
      const url = pageParam
        ? `${process.env.NEXT_PUBLIC_API_URL}/ownerships/me?cursor=${pageParam}&${searchParams}`
        : `${process.env.NEXT_PUBLIC_API_URL}/ownerships/me?${searchParams}`;
      const res = await fetch(url, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("마이갤러리 조회 실패");
      const result = await res.json();
      return result.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
  });

  const items = galleryItems?.pages.flatMap((page) => page.items) ?? [];
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isError) {
    return (
      <>
        <p className="text-red flex justify-center">{error.message}</p>
        <MobileCreateButton />
      </>
    );
  }

  if (isPending) {
    return (
      <>
        <p className="flex justify-center">마이갤러리 데이터 불러오는 중...</p>
        <MobileCreateButton />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <p className="flex justify-center">해당하는 데이터가 없습니다</p>
        <MobileCreateButton />
      </>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(2,max-content)] justify-center gap-1.25 md:mb-27.5 md:gap-5 lg:mb-35 lg:grid-cols-[repeat(3,max-content)] lg:gap-20">
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return (
          <div key={item.id} ref={isLastItem ? ref : undefined}>
            <MyCard
              quantity={item.quantity}
              title={item.photocard.name}
              genre={item.photocard.genre}
              description={item.photocard.description}
              grade={item.photocard.grade}
              imageUrl={item.photocard.imageUrl}
              minPrice={item.photocard.minPrice}
            />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="col-span-full flex animate-spin justify-center">
          <Image src="/spinner.svg" width={50} height={50} alt="" />
        </div>
      )}
      <MobileCreateButton />
    </div>
  );
}
