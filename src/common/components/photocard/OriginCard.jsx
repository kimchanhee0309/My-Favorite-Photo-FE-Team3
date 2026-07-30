import Image from "next/image";
import { cardStyle } from "./PhotoCard.constants";
import PhotoCardImage from "./PhotoCardImage";
import PhotoCardInfo from "./PhotoCardInfo";

export default function OriginCard({
  imageUrl,
  title,
  grade,
  genre,
  description,
  pricePerUnit,
  remainingQuantity,
  quantity,
  status,
  priority,
}) {
  return (
    <div
      className={`rounded-0.5 flex flex-col border border-gray-400 bg-gray-500 ${cardStyle.container}`}>
      <PhotoCardImage imageUrl={imageUrl} status={status} priority={priority} />

      <div className="flex flex-col gap-2.5">
        <PhotoCardInfo
          title={title}
          grade={grade}
          genre={genre}
          description={description}
        />
        <div className="flex justify-between">
          <p className={`${cardStyle.labelLight} text-gray-300`}>가격</p>
          <p className={`${cardStyle.valueRegular} text-white`}>
            {pricePerUnit} P
          </p>
        </div>
        <div className="flex justify-between">
          <p className={`${cardStyle.labelLight} text-gray-300`}>잔여</p>
          <span className={`${cardStyle.valueRegular} flex gap-1`}>
            <p className="text-white">{remainingQuantity}</p>
            <p className="text-gray-300">/ {quantity}</p>
          </span>
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
