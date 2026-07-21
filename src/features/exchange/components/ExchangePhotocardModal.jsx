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

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose} width={1160} contentMaxWidth={920}>
      {selectedCard ? (
        <ExchangeOfferForm
          shopListingId={shopListingId}
          card={selectedCard}
          onCancel={() => setSelectedCard(null)}
        />
      ) : (
        <ExchangeCardPicker onSelectCard={setSelectedCard} />
      )}
    </CustomModal>
  );
}