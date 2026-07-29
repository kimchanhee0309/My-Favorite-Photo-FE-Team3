import Image from "next/image";
import { cardStyle, saleTypeColor, saleTypeText } from "./PhotoCard.constants";

export default function PhotoCardImage({
  imageUrl,
  status,
  saleType,
  style = cardStyle,
  priority = false,
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
      <Image
        src={imageUrl}
        fill
        sizes="(max-width: 743px) 150px, (max-width: 1479px) 300px, 360px"
        alt="포토카드"
        className="object-cover"
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
