"use client";

import { useState } from "react";
import CustomModal from "@/common/components/modal/CustomModal";
import SellCardPicker from "./SellCardPicker";
import SellListingForm from "./SellListingForm";

export default function SellPhotocardModal({ isOpen, onClose }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClose = () => {
    setSelectedCard(null);
    onClose();
  };

  if (selectedCard) {
    return (
      <CustomModal
        isOpen={isOpen}
        onClose={handleClose}
        width={1160}
        contentMaxWidth={920}
        mobileVariant="fullscreen"
        title="나의 포토카드 판매하기"
      >
        <SellListingForm card={selectedCard} onCancel={() => setSelectedCard(null)} />
      </CustomModal>
    );
  }

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose} width={1160} contentMaxWidth={920}>
      <SellCardPicker onSelectCard={setSelectedCard} />
    </CustomModal>
  );
}