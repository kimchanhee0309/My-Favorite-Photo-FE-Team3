"use client";

import { useState } from "react";
import ExchangeCard from "@/features/shopListing/components/ExchangeCard";
import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";

export default function ExchangeOfferSection({
  offers,
  isOwner,
  onAccept,
  onReject,
  onCancel,
}) {
  const [cancelTarget, setCancelTarget] = useState(null);

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    onCancel(cancelTarget.id);
    setCancelTarget(null);
  };

  return (
    <div className="mt-[120px] w-[345px] self-center md:w-[704px] lg:w-[1480px]">
      <div className="flex flex-col gap-4">
        <h2 className="typo-24-regular md:typo-32-bold lg:typo-40-bold font-bold text-white">
          {isOwner ? "교환 제시 목록" : "내가 제시한 교환 목록"}
        </h2>
        <div className="h-[2px] w-full bg-gray-100" />
      </div>

      <div className="mt-[46px] grid grid-cols-2 gap-[5px] md:mt-[48px] md:gap-[20px] lg:mt-[70px] lg:grid-cols-3 lg:gap-[80px]">
        {offers.map((offer) => (
          <ExchangeCard
            key={offer.id}
            {...offer}
            isOwner={isOwner}
            onAccept={() => onAccept(offer.id)}
            onReject={() => onReject(offer.id)}
            onCancel={() => setCancelTarget(offer)}
          />
        ))}
      </div>

      <ConfirmModal
        title="교환 제시 취소"
        message={
          cancelTarget && (
            <>
              <span className="whitespace-nowrap">
                [{cancelTarget.grade} | {cancelTarget.name}]
              </span>
              <br className="lg:hidden" /> 교환 제시를 취소하시겠습니까?
            </>
          )
        }
        confirmLabel="취소하기"
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}