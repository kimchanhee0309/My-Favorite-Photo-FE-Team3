import Image from "next/image";
import { cardStyle, sizeStyle } from "./PhotoCard.constants";
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
  size,
}) {
  const style = size === "S" ? sizeStyle : cardStyle;

  return (
    <div
      className={`rounded-0.5 flex flex-col border border-gray-400 bg-gray-500 ${style.container}`}>
      <PhotoCardImage imageUrl={imageUrl} style={style} />

      <div className="flex flex-col gap-2.5">
        <PhotoCardInfo
          title={title}
          grade={grade}
          genre={genre}
          description={description}
          style={style}
        />
        <div className="flex justify-between">
          <p className={`${style.labelLight} text-gray-300`}>가격</p>
          <p className={`${style.valueRegular} text-white`}>{minPrice} P</p>
        </div>
        <div className="flex justify-between">
          <p className={`${style.labelLight} text-gray-300`}>수량</p>
          <p className={`${style.valueRegular} text-white`}>{quantity}</p>
        </div>
      </div>

      <Image
        src="/photocardlogo.svg"
        width={100}
        height={18}
        alt="포토카드로고"
        className={style.logo}
      />
    </div>
  );
}
