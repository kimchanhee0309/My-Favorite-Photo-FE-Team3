"use client";

import { PrimaryButton } from "@/common/components";
import MyCard from "@/common/components/photocard/MyCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const dummyMyCardData = {
  imageUrl: "/default.png",
  title: "테스트 제목",
  grade: "COMMON",
  genre: "LANDSCAPE",
  description: "설명",
  minPrice: 4,
  quantity: 1,
};

const MyCards = Array.from({ length: 30 }, (_, i) => ({
  ...dummyMyCardData,
  id: i,
}));

export default function GalleryContent() {
  const [visibleCount, setVisibleCount] = useState(15);
  const hasNextpage = visibleCount < MyCards.length;
  const router = useRouter();

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextpage) {
        setVisibleCount((prev) => prev + 15);
      }
    },
  });

  return (
    <div className="grid grid-cols-[repeat(2,max-content)] justify-center gap-1.25 md:mb-27.5 md:gap-5 lg:mb-35 lg:grid-cols-[repeat(3,max-content)] lg:gap-20">
      {MyCards.slice(0, visibleCount).map((card, idx, arr) => {
        const isLastItem = arr.length - 1 === idx;
        return isLastItem ? (
          <div ref={ref} key={card.id}>
            <MyCard {...card} />
          </div>
        ) : (
          <MyCard key={card.id} {...card} />
        );
      })}
      <PrimaryButton
        className="fixed inset-x-0 bottom-10 z-10 mx-auto w-86 py-4.25 md:hidden"
        onClick={() => router.push("/gallery/create")}>
        포토카드 생성하기
      </PrimaryButton>
    </div>
  );
}
