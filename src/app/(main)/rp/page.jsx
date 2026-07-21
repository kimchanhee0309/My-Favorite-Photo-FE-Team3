"use client";

import { useModal } from "@/providers/ModalProvider";
import PointSelectionModalContent from "@/features/point/components/PointSelectionModalContent";
import PointResultModalContent from "@/features/point/components/PointResultModalContent";

export default function MainPage() {
  const { openModal } = useModal();

  const handleOpenPointModal = () => {
    openModal(<PointSelectionModalContent onNext={handleOpenResultModal} />);
  };

  const handleOpenResultModal = (earnedPoint) => {
    openModal(<PointResultModalContent point={earnedPoint} />);
  };

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8">
      <h1 className="typo-brand-40 mb-6 font-bold text-white">
        🎰 랜덤 포인트 중간 시연
      </h1>
      <button
        onClick={handleOpenPointModal}
        className="cursor-pointer rounded border border-gray-300 bg-white px-6 py-3 font-bold text-black transition-colors hover:bg-gray-100">
        랜덤 포인트 뽑기
      </button>
    </div>
  );
}
