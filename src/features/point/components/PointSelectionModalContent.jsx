"use client";

import { RANDOM_BOXES } from "../constants.js";
import { PrimaryButton } from "@/common/components/index.js";
import { useState } from "react";
import usePointTimer from "../usePointTimer.js";
import { claimRandomBox } from "../point.api.js";
import PointCooldownNotice from "./PointCooldownNotice.jsx";
import RandomBoxButton from "./RandomBoxButton.jsx";
import { useQueryClient } from "@tanstack/react-query";

export default function PointSelectionModalContent({
  onNext,
  lastBoxClaimedAt,
}) {
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { canClaim, leftTimeFormatted } = usePointTimer(lastBoxClaimedAt);
  const queryClient = useQueryClient();

  function handleBoxClick(id) {
    if (!canClaim) return;
    setSelectedBoxId(id);
  }

  async function handleConfirm() {
    if (!canClaim || !selectedBoxId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const data = await claimRandomBox();

      queryClient.setQueryData(["auth", "me"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            points: data.totalPoints,
            lastBoxClaimedAt: data.lastBoxClaimedAt,
          },
        };
      });

      onNext?.({
        acquiredPoint: data.acquiredPoint,
        totalPoints: data.totalPoints,
        lastBoxClaimedAt: data.lastBoxClaimedAt,
      });
    } catch (error) {
      alert(error.message || "포인트 상자를 열 수 없습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <PointCooldownNotice
          leftTimeFormatted={leftTimeFormatted}
          className="typo-14-regular lg:typo-16-regular flex h-[45px] w-[139px] flex-col justify-center gap-[5px] text-center whitespace-nowrap lg:h-auto lg:w-full lg:flex-row lg:gap-2.5"
        />
      </section>

      <section className="mt-5 flex h-[78.787px] w-[315px] items-start justify-center gap-[15.114px] md:h-33 md:w-[530px] md:items-center md:gap-[25.431px] lg:h-49.5 lg:w-[835.66px] lg:items-center lg:justify-center lg:gap-15">
        {RANDOM_BOXES.map((box) => (
          <RandomBoxButton
            key={box.id}
            box={box}
            isFaded={selectedBoxId !== null && selectedBoxId !== box.id}
            disabled={isSubmitting || !canClaim}
            onClick={() => handleBoxClick(box.id)}
          />
        ))}
      </section>

      {selectedBoxId !== null && (
        <div className="mt-5 flex h-12 w-full justify-center">
          <PrimaryButton
            thickness="thin"
            size={{ base: "S", md: "M", lg: "L" }}
            onClick={handleConfirm}
            disabled={isSubmitting || !canClaim}
            className="typo-16-bold h-[55px] w-75 md:h-[55px] md:w-110 lg:h-15 lg:w-130">
            {isSubmitting ? "뽑는 중..." : "선택완료"}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
