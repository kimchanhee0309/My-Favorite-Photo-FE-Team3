"use client";

import { useState } from "react";
import ExchangeCard from "@/features/shopListing/components/ExchangeCard";
import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";
import {
  useAcceptExchange,
  useRejectExchange,
  useCancelExchange,
} from "@/features/exchange/exchange.queries";

export default function ExchangeOfferSection({
  shopListingId,
  offers,
  isOwner,
  onAccept,
  onReject,
  onCancel,
}) {
  const [cancelTarget, setCancelTarget] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [acceptTarget, setAcceptTarget] = useState(null);

  const { mutate: acceptExchange, isPending: isAcceptPending } =
    useAcceptExchange(shopListingId);
  const { mutate: rejectExchange, isPending: isRejectPending } =
    useRejectExchange(shopListingId);
  const { mutate: cancelExchange, isPending: isCancelPending } =
    useCancelExchange(shopListingId);

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;

    cancelExchange(cancelTarget.id, {
      onSuccess: () => {
        onCancel?.(cancelTarget.id);
        setCancelTarget(null);
      },
    });
  };

  const handleConfirmReject = () => {
    if (!rejectTarget) return;
    rejectExchange(rejectTarget.id, {
      onSuccess: () => {
        onReject?.(rejectTarget.id);
        setRejectTarget(null);
      },
    });
  };

  const handleConfirmAccept = () => {
    if (!acceptTarget) return;
    acceptExchange(acceptTarget.id, {
      onSuccess: () => {
        onAccept?.(acceptTarget.id);
        setAcceptTarget(null);
      },
    });
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
            onAccept={() => setAcceptTarget(offer)}
            onReject={() => setRejectTarget(offer)}
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
        isPending={isCancelPending}
      />

      <ConfirmModal
        title="교환 제시 거절"
        message={
          rejectTarget && (
            <>
              <span className="whitespace-nowrap">
                [{rejectTarget.grade} | {rejectTarget.name}]
              </span>
              <br className="lg:hidden" /> 카드와의 교환을 거절하시겠습니까?
            </>
          )
        }
        confirmLabel="거절하기"
        isOpen={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={handleConfirmReject}
        isPending={isRejectPending}
      />

      <ConfirmModal
        title="교환 제시 승인"
        message={
          acceptTarget && (
            <>
              <span className="whitespace-nowrap">
                [{acceptTarget.grade} | {acceptTarget.name}]
              </span>
              <br className="lg:hidden" /> 카드와의 교환을 승인하시겠습니까?
            </>
          )
        }
        confirmLabel="승인하기"
        isOpen={!!acceptTarget}
        onClose={() => setAcceptTarget(null)}
        onConfirm={handleConfirmAccept}
        isPending={isAcceptPending}
      />
    </div>
  );
}
