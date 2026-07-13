import Image from "next/image";

const SIZE_CONFIG = {
  L: {
    container: "p-10 gap-6 w-110",
    divider: "pb-4",
    title: "typo-22-bold",
    labelLight: "typo-16-light",
    labelRegular: "typo-16-regular",
    valueRegular: "typo-18-regular",
    image: { width: 360, height: 270 },
    showLogo: true,
    logo: { width: 100, height: 18 },
    soldOutIcon: { width: 230, height: 230 },
  },
  M: {
    container: "p-5 gap-6 w-85",
    divider: "pb-4",
    title: "typo-22-bold",
    labelLight: "typo-16-light",
    labelRegular: "typo-16-regular",
    valueRegular: "typo-18-regular",
    image: { width: 300, height: 210 },
    showLogo: true,
    logo: { width: 100, height: 18 },
    soldOutIcon: { width: 200, height: 200 },
  },
  S: {
    container: "p-2 gap-3 w-42.5",
    divider: "pb-3",
    title: "typo-14-bold",
    labelLight: "typo-10-light",
    labelRegular: "typo-10-regular",
    valueRegular: "typo-10-regular",
    image: { width: 150, height: 100 },
    showLogo: false,
    soldOutIcon: { width: 112, height: 112 },
  },
};

export default function PhotoCard({ size = "L", card, showStatusBadge }) {
  const config = SIZE_CONFIG[size];

  return (
    <div
      className={`flex flex-col border border-gray-400 rounded-0.5 border-bg-gray-500 ${config.container}`}>
      <div className="relative">
        {card.status === "SOLD_OUT" && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Image
              src="/soldout.svg"
              width={config.soldOutIcon.width}
              height={config.soldOutIcon.height}
              alt="품절"
            />
          </div>
        )}
        <Image
          src={card.imageUrl}
          width={config.image.width}
          height={config.image.height}
          alt="포토카드"
          style={{ width: config.image.width, height: config.image.height }}
          className="bg-amber-50 object-cover"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p className={config.title}>{card.title}</p>
        <div
          className={`flex justify-between border-b border-gray-400 ${config.divider}`}>
          <div className="flex gap-2.5">
            <p className={`${config.labelLight} `}>{card.grade}</p>
            <p className={`text-gray-400 ${config.labelRegular}`}>|</p>
            <p className={`text-gray-300 ${config.labelRegular}`}>
              {card.genre}
            </p>
          </div>
          <p
            className={`text-white ${config.labelRegular} underline underline-offset-2 decoration-0`}>
            {card.description}
          </p>
        </div>
        <div className="flex justify-between">
          <p className={`${config.labelLight} text-gray-300`}>가격</p>
          <p className={`${config.valueRegular} text-white`}>
            {card.pricePerUnit} P
          </p>
        </div>
        <div className="flex justify-between">
          <p className={`${config.labelLight} text-gray-300`}>수량</p>
          <p className={`${config.valueRegular} text-white`}>
            {card.remainingQuantity}
          </p>
        </div>
      </div>
      {config.showLogo && (
        <Image
          src="/photocardlogo.svg"
          width={config.logo.width}
          height={config.logo.height}
          alt="포토카드로고"
          className="self-center"
        />
      )}
    </div>
  );
}
