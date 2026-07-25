"use client";

import { useState } from "react";
import { PrimaryButton } from "@/common/components";
import SellPhotocardModal from "@/features/shopListing/components/SellPhotocardModal";

export default function MobileSellButton() {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  return (
    <>
      <PrimaryButton
        thickness="thin"
        size="S"
        className="fixed inset-x-0 bottom-3.75 z-10 mx-auto h-[55px] w-[345px] md:hidden"
        onClick={() => setIsSellModalOpen(true)}>
        나의 포토카드 판매하기
      </PrimaryButton>
      <SellPhotocardModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
    </>
  );
}