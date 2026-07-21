import Image from "next/image";

export default function PointResultModalContent({ point }) {
  return (
    <div className="m-auto mx-[38px] mt-[15px] mb-[42px] flex flex-col items-center justify-center text-center md:mx-[43px] md:mt-[23px] md:mb-[78px] lg:mt-[18px]">
      <h1 className="typo-brand-30-regular lg:typo-brand-46 text-main md:typo-brand-36-regular">
        <span className="text-white">랜덤</span>포인트
      </h1>
      <div className="mt-[31px] mb-[16.21px] md:mt-[23px] md:mb-[22.88px] lg:mt-8 lg:mb-[24.88px]">
        <Image
          src="/earned_point.png"
          alt="포인트 획득"
          width={340}
          height={324}
          quality={100}
          className="h-[228.791px] w-60 object-contain md:h-[324.121px] md:w-85"
        />
      </div>
      <div className="typo-24-bold md:typo-28-bold lg:typo-32-bold mb-[27px] text-white md:mb-5">
        <span className="text-main">{point?.toLocaleString()}P</span> 획득!
      </div>
      <div className="typo-16-regular flex h-11 w-[158px] flex-col justify-center gap-1.5 text-center whitespace-nowrap md:h-auto md:w-full md:flex-row md:gap-[10px]">
        <span className="text-gray-300">다음 기회까지 남은 시간</span>
        <span className="text-main">59분 59초</span>
      </div>
    </div>
  );
}
