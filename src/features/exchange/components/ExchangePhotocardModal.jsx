"use client";

import { useState } from "react";
import CustomModal from "@/common/components/modal/CustomModal";
import ExchangeCardPicker from "./ExchangeCardPicker";
import ExchangeOfferForm from "./ExchangeOfferForm";

export default function ExchangePhotocardModal({ shopListingId, isOpen, onClose }) {
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
        title="포토카드 교환하기"
      >
        <ExchangeOfferForm
          shopListingId={shopListingId}
          card={selectedCard}
          onCancel={() => setSelectedCard(null)}
        />
      </CustomModal>
    );
  }

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose} width={1160} contentMaxWidth={920}>
      <ExchangeCardPicker onSelectCard={setSelectedCard} />
    </CustomModal>
  );
}