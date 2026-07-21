"use client";

import Image from "next/image";
import { RANDOM_BOXES } from "../constants.js";
import { PrimaryButton } from "@/common/components/index.js";
import { useState } from "react";

export default function PointSelectionModalContent({ onNext }) {
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  const handleBoxClick = (id) => {
    setSelectedBoxId(id);
  };

  const handleConfirm = () => {
    if (!selectedBoxId) return;

    //TODO: 더미데이터 및 임시 확률 로직 제거
    const dummyPoints = [100, 200, 500, 1000, 3000];
    const randomPoint =
      dummyPoints[Math.floor(Math.random() * dummyPoints.length)];
    onNext?.(randomPoint);
  };

  return (
    <div className="m-auto mx-5 mt-[18px] mb-9 flex flex-col items-center justify-center gap-10 lg:mx-21 lg:gap-19">
      <section className="inline-flex flex-col items-center gap-7.5 lg:gap-10">
        <h1 className="typo-brand-30-regular lg:typo-brand-46 text-main md:typo-brand-36-regular">
          <span className="text-white">랜덤</span>포인트
        </h1>
        <span className="typo-16-bold lg:typo-20-bold text-center whitespace-nowrap">
          1시간마다 돌아오는 기회!
          <br /> 랜덤 상자 뽑기를 통해 포인트를 획득하세요!
        </span>
        <div className="typo-14-regular lg:typo-16-regular flex h-[45px] w-[139px] flex-col justify-center gap-[5px] text-center whitespace-nowrap lg:h-auto lg:w-full lg:flex-row lg:gap-2.5">
          <span className="text-gray-300">다음 기회까지 남은 시간</span>
          <span className="text-main">59분 59초</span>
        </div>
      </section>
      <section className="mt-5 flex h-[78.787px] w-[315px] items-start justify-center gap-[15.114px] md:h-33 md:w-[530px] md:items-center md:gap-[25.431px] lg:h-49.5 lg:w-[835.66px] lg:items-center lg:justify-center lg:gap-15">
        {RANDOM_BOXES.map((box) => {
          const isFaded = selectedBoxId !== null && selectedBoxId !== box.id;

          return (
            <button
              type="button"
              key={box.id}
              onClick={() => handleBoxClick(box.id)}
              className={`flex h-[75.869px] w-[97.871px] shrink-0 cursor-pointer items-center justify-center transition-all duration-300 md:h-[127.111px] md:w-[164.672px] lg:h-[190.667px] lg:w-[245.96px]`}>
              <Image
                src={box.src}
                alt={box.alt}
                width={246}
                height={190}
                quality={100}
                className={`h-auto w-24.5 object-contain transition-all duration-300 md:w-[165px] lg:w-61.5 ${!isFaded ? "cursor-pointer hover:-translate-y-1 hover:scale-110" : ""} ${isFaded ? "scale-95 opacity-30 brightness-50" : "opacity-100"} `}
              />
            </button>
          );
        })}
      </section>

      {selectedBoxId !== null && (
        <div className="mt-5 flex h-12 w-full justify-center">
          <PrimaryButton
            thickness="thin"
            size={{ base: "S", md: "M", lg: "L" }}
            onClick={handleConfirm}
            className="typo-16-bold h-[55px] w-75 md:h-[55px] md:w-110 lg:h-15 lg:w-130">
            선택완료
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
