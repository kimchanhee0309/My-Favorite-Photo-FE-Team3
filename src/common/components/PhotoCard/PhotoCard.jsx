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
  },
};

export default function PhotoCard({ grade, size = "L", state, ...props }) {
  const config = SIZE_CONFIG[size];

  return (
    <div
      className={`flex flex-col border border-gray-400 rounded-0.5 border-bg-gray-500 ${config.container}`}>
      <Image
        src="/default.jpg"
        width={config.image.width}
        height={config.image.height}
        alt="포토카드"
        style={{ width: config.image.width, height: config.image.height }}
        className="bg-amber-50 object-cover"
      />
      <div className="flex flex-col gap-2.5">
        <p className={config.title}>카드 제목</p>
        <div
          className={`flex justify-between border-b border-gray-400 ${config.divider}`}>
          <div className="flex gap-2.5">
            <p className={`${config.labelLight} `}>Grade</p>
            <p className={`text-gray-400 ${config.labelRegular}`}>|</p>
            <p className={`text-gray-300 ${config.labelRegular}`}>Genre</p>
          </div>
          <p
            className={`text-white ${config.labelRegular} underline underline-offset-2 decoration-0`}>
            설명
          </p>
        </div>
        <div className="flex justify-between">
          <p className={`${config.labelLight} text-gray-300`}>가격</p>
          <p className={`${config.valueRegular} text-white`}>0 P</p>
        </div>
        <div className="flex justify-between">
          <p className={`${config.labelLight} text-gray-300`}>수량</p>
          <p className={`${config.valueRegular} text-white`}>1</p>
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
