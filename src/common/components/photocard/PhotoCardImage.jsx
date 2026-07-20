import Image from "next/image";
import { cardStyle, saleTypeColor, saleTypeText } from "./PhotoCard.constants";

export default function PhotoCardImage({
  imageUrl,
  status,
  saleType,
  style = cardStyle,
}) {
  return (
    <div className={style.image}>
      {status === "SOLD_OUT" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
          <Image src="/soldout.svg" fill alt="품절" />
        </div>
      )}
      {saleTypeText[saleType] && status !== "SOLD_OUT" && (
        <div
          className={`absolute z-10 bg-black/50 ${style.badge} ${saleTypeColor[saleType]}`}>
          {saleTypeText[saleType]}
        </div>
      )}
      <Image src={imageUrl} fill alt="포토카드" className="object-cover" />
    </div>
  );
}
