import Image from "next/image";
import { cardStyle } from "./PhotoCard.constants";
import PhotoCardImage from "./PhotoCardImage";
import PhotoCardInfo from "./PhotoCardInfo";

export default function MyCard({
  imageUrl,
  title,
  grade,
  genre,
  description,
  minPrice,
  quantity,
}) {
  return (
    <div
      className={`rounded-0.5 flex flex-col border border-gray-400 bg-gray-500 ${cardStyle.container}`}>
      <PhotoCardImage imageUrl={imageUrl} />

      <div className="flex flex-col gap-2.5">
        <PhotoCardInfo
          title={title}
          grade={grade}
          genre={genre}
          description={description}
        />
        <div className="flex justify-between">
          <p className={`${cardStyle.labelLight} text-gray-300`}>가격</p>
          <p className={`${cardStyle.valueRegular} text-white`}>{minPrice} P</p>
        </div>
        <div className="flex justify-between">
          <p className={`${cardStyle.labelLight} text-gray-300`}>수량</p>
          <p className={`${cardStyle.valueRegular} text-white`}>{quantity}</p>
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
