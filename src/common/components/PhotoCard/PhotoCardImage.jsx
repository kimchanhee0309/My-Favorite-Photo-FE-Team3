import Image from "next/image";
import React from "react";
import {
  cardStyle,
  saleTypeColor,
  saleTypeText,
} from "./PhotoCard.constants";

export default function PhotoCardImage({ card }) {
  return (
    <div className={cardStyle.image}>
      {card.status === "SOLD_OUT" && (
        <div className="z-10 absolute inset-0 bg-black/70 flex items-center justify-center">
          <Image src="/soldout.svg" fill alt="품절" />
        </div>
      )}
      {saleTypeText[card.saleType] && card.status !== "SOLD_OUT" && (
        <div
          className={`absolute bg-black/50 z-10 ${cardStyle.badge} ${saleTypeColor[card.saleType]}`}>
          {saleTypeText[card.saleType]}
        </div>
      )}
      <Image src={card.imageUrl} fill alt="포토카드" className="object-cover" />
    </div>
  );
}
