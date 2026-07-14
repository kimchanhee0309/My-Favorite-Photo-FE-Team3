import Image from "next/image";
import Link from "next/link";

const cardStyle = {
  container:
    "p-2 gap-3 w-42.5 md:p-5 md:gap-6 md:w-85 lg:p-10 lg:gap-6 lg:w-110",
  divider: "pb-3 md:pb-4",
  title: "typo-14-bold md:typo-22-bold",
  labelLight: "typo-10-light md:typo-16-light",
  labelRegular: "typo-10-regular md:typo-16-regular",
  valueRegular: "typo-10-regular md:typo-18-regular",
  image:
    "relative w-[150px] h-[100px] md:w-[300px] md:h-[210px] lg:w-[360px] lg:h-[270px]",
  logo: "hidden md:block self-center",
};

const gradeColor = {
  COMMON: "text-main",
  RARE: "text-blue",
  SUPER_RARE: "text-purple",
  LEGENDARY: "text-pink",
};

const saleMethodText = {
  SALE: "판매 중",
  EXCHANGE: "교환 제시 대기 중",
};

const genreText = {
  LANDSCAPE: "풍경",
  PORTRAIT: "인물",
  TRAVEL: "여행",
  ANIMAL: "동물",
  OBJECT: "사물",
  ETC: "기타",
};

export default function PhotoCard({ card }) {
  return (
    <Link
      href="/"
      className={`flex flex-col border border-gray-400 rounded-0.5 border-bg-gray-500 ${cardStyle.container} cursor-pointer`}>
      <div className={cardStyle.image}>
        {card.status === "SOLD_OUT" && (
          <div className=" absolute inset-0 bg-black/70 flex items-center justify-center">
            <Image
              src="/soldout.svg"
              fill
              alt="품절"
              className="object-cover"
            />
          </div>
        )}
        {saleMethodText[card.saleMethod] && (
          <div className="absolute left-2 top-2 bg-black/50 px-2.5">
            {saleMethodText[card.saleMethod]}
          </div>
        )}
        <Image
          src={card.imageUrl}
          fill
          alt="포토카드"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p className={cardStyle.title}>{card.title}</p>
        <div
          className={`flex justify-between border-b border-gray-400 ${cardStyle.divider}`}>
          <div className="flex gap-2.5">
            <p className={`${cardStyle.labelLight} ${gradeColor[card.grade]}`}>
              {card.grade}
            </p>
            <p className={`text-gray-400 ${cardStyle.labelRegular}`}>|</p>
            <p className={`text-gray-300 ${cardStyle.labelRegular}`}>
              {genreText[card.genre]}
            </p>
          </div>
          <p
            className={`text-white ${cardStyle.labelRegular} underline underline-offset-2 decoration-0`}>
            {card.description}
          </p>
        </div>
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
    </Link>
  );
}
