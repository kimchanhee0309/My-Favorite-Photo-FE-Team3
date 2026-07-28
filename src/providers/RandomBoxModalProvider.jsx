"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useModal } from "./ModalProvider.jsx";
import { getPointInfo } from "@/features/point/point.api.js";
import {
  isDismissedForCycle,
  markDismissedForCycle,
} from "@/features/point/randomBoxDismissStorage.js";
import PointSelectionModalContent from "@/features/point/components/PointSelectionModalContent";
import PointResultModalContent from "@/features/point/components/PointResultModalContent";
import usePointTimer from "@/features/point/usePointTimer.js";

const RandomBoxContext = createContext(null);

export function RandomBoxModalProvider({ children, userId }) {
  const { openModal, closeModal } = useModal();
  const [pointInfo, setPointInfo] = useState(null);
  const hasAutoOpenedRef = useRef(false);

  const { canClaim } = usePointTimer(pointInfo?.lastBoxClaimedAt);

  useEffect(() => {
    if (!userId) {
      setTimeout(() => setPointInfo(null), 0);
      return;
    }

    getPointInfo()
      .then(setPointInfo)
      .catch((err) => {
        console.error("포인트 정보 조회 실패:", err);
      });
  }, [userId]);

  function handleDismissEffect() {
    if (userId && pointInfo) {
      markDismissedForCycle(userId, pointInfo.lastBoxClaimedAt);
    }
  }

  function showResultModal(data) {
    setPointInfo((prev) => ({
      ...prev,
      points: data.totalPoints ?? prev?.points,
      lastBoxClaimedAt: data.lastBoxClaimedAt,
    }));

    openModal(
      <PointResultModalContent
        point={data.acquiredPoint}
        lastBoxClaimedAt={data.lastBoxClaimedAt}
      />,
      handleDismissEffect,
    );
  }

  function showSelectionModal() {
    openModal(
      <PointSelectionModalContent
        onNext={showResultModal}
        lastBoxClaimedAt={pointInfo?.lastBoxClaimedAt}
      />,
      handleDismissEffect,
    );
  }

  useEffect(() => {
    if (!userId || !pointInfo) return;

    const isDismissed = isDismissedForCycle(userId, pointInfo.lastBoxClaimedAt);

    if (canClaim && !isDismissed && !hasAutoOpenedRef.current) {
      hasAutoOpenedRef.current = true;
      showSelectionModal();
    }

    if (!canClaim) {
      hasAutoOpenedRef.current = false;
    }
  }, [canClaim, pointInfo, userId]);

  return (
    <RandomBoxContext.Provider
      value={{
        openModal: showSelectionModal,
        closeModal,
        canClaim,
        pointInfo,
      }}>
      {children}
    </RandomBoxContext.Provider>
  );
}

export function useRandomBoxModal() {
  const context = useContext(RandomBoxContext);
  if (!context) {
    throw new Error(
      "useRandomBoxModal은 RandomBoxModalProvider 내부에서 사용해야 합니다.",
    );
  }
  return context;
}
