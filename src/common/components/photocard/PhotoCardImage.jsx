import Image from "next/image";
import { cardStyle, saleTypeColor, saleTypeText } from "./PhotoCard.constants";

export default function PhotoCardImage({ imageUrl, status, saleType }) {
  return (
    <div className={cardStyle.image}>
      {status === "SOLD_OUT" && (
        <div className="z-10 absolute inset-0 bg-black/70 flex items-center justify-center">
          <Image src="/soldout.svg" fill alt="품절" />
        </div>
      )}
      {saleTypeText[saleType] && status !== "SOLD_OUT" && (
        <div
          className={`absolute bg-black/50 z-10 ${cardStyle.badge} ${saleTypeColor[saleType]}`}>
          {saleTypeText[saleType]}
        </div>
      )}
      <Image src={imageUrl} fill alt="포토카드" className="object-cover" />
    </div>
  );
}
