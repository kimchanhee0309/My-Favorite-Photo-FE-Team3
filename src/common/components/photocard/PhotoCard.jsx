import Image from "next/image";
import { cardStyle } from "./PhotoCard.constants";
import PhotoCardHeader from "./PhotoCardHeader";
import PhotoCardImage from "./PhotoCardImage";

export default function PhotoCard({ card }) {
  return (
    <div
      className={`flex flex-col border border-gray-400 rounded-0.5 bg-gray-500 ${cardStyle.container}`}>
      <PhotoCardImage card={card} />

      <div className="flex flex-col gap-2.5">
        <PhotoCardHeader card={card} />
        <div className="flex justify-between">
          <p className={`${cardStyle.labelLight} text-gray-300`}>가격</p>
          <p className={`${cardStyle.valueRegular} text-white`}>
            {card.pricePerUnit} P
          </p>
        </div>
        <div className="flex justify-between">
          <p className={`${cardStyle.labelLight} text-gray-300`}>
            {card.quantityLabel}
          </p>
          <p className={`${cardStyle.valueRegular} text-white`}>
            {card.quantityText}
          </p>
        </div>
      </div>

      <Image
        src="/photocardlogo.svg"
        width={100}
        height={18}
        alt="포토카드로고"
        className={cardStyle.logo}
      />
    </div>
  );
}
