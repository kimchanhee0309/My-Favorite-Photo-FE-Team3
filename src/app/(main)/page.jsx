"use client";

import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/common/components/button/PrimaryButton";

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col items-center overflow-hidden bg-black pb-20">
      <section className="relative mb-1 flex w-full flex-col items-center pt-20 md:pt-[100px] lg:pt-[125px]">
        <div className="absolute top-0 left-1/2 z-0 h-[412px] w-[343px] -translate-x-1/2 md:h-[722px] md:w-[679px] lg:top-[13px] lg:h-[1088px] lg:w-[1798px]">
          <Image
            src="/landing-bg-sm.png"
            alt="배경"
            fill
            sizes="100vw"
            className="display-mobile-only object-cover"
            priority
          />
          <Image
            src="/landing-bg-md.png"
            alt="배경"
            fill
            sizes="100vw"
            className="display-tablet-only object-cover"
            priority
          />
          <Image
            src="/landing-bg-lg.png"
            alt="배경"
            fill
            sizes="100vw"
            className="display-desktop-only object-cover"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-3 lg:mb-5">
            <Image
              src="/logo.png"
              alt="최애의 포토"
              width={139}
              height={25}
              className="h-[25px] w-[139px] object-contain"
              priority
            />
          </div>

          <h1 className="typo-24-bold md:typo-32-bold lg:typo-40-bold text-white">
            구하기 어려웠던
            <br />
            <span className="text-main">나의 최애</span>가 여기에!
          </h1>

          <Link href="/marketplace" className="mt-8 md:mt-10 lg:mt-[50px]">
            <PrimaryButton
              thickness="thin"
              className="!typo-16-bold h-[55px] w-[226px]">
              최애 찾으러 가기
            </PrimaryButton>
          </Link>
        </div>

        <div className="relative z-10 mt-[50px] w-full max-w-[375px] md:mt-[70px] md:max-w-[744px] lg:mt-[100px] lg:max-w-[1917px]">
          <Image
            src="/landing-1-sm.png"
            alt="마켓플레이스"
            width={375}
            height={199}
            className="display-mobile-only h-auto w-full"
            priority
          />
          <Image
            src="/landing-1-md.png"
            alt="마켓플레이스"
            width={744}
            height={352}
            className="display-tablet-only h-auto w-full"
            priority
          />
          <Image
            src="/landing-1-lg.png"
            alt="마켓플레이스"
            width={1917}
            height={765}
            className="display-desktop-only h-auto w-full"
            priority
          />
        </div>
      </section>

      <section className="mb-[3px] flex w-full justify-center">
        <Image
          src="/landing-2-sm.png"
          alt="포인트 거래"
          width={375}
          height={440}
          className="display-mobile-only h-auto w-full max-w-[375px]"
        />
        <Image
          src="/landing-2-md.png"
          alt="포인트 거래"
          width={744}
          height={707}
          className="display-tablet-only h-auto w-full max-w-[744px]"
        />
        <Image
          src="/landing-2-lg.png"
          alt="포인트 거래"
          width={1920}
          height={800}
          className="display-desktop-only h-auto w-full max-w-[1920px]"
        />
      </section>

      <section className="mb-[133px] flex w-full justify-center">
        <Image
          src="/landing-3-sm.png"
          alt="실시간 알림"
          width={375}
          height={519}
          className="display-mobile-only h-auto w-full max-w-[375px]"
        />
        <Image
          src="/landing-3-md.png"
          alt="실시간 알림"
          width={744}
          height={776}
          className="display-tablet-only h-auto w-full max-w-[744px]"
        />
        <Image
          src="/landing-3-lg.png"
          alt="실시간 알림"
          width={1920}
          height={800}
          className="display-desktop-only h-auto w-full max-w-[1920px]"
        />
      </section>

      <section className="flex w-full justify-center">
        <Image
          src="/landing-4-sm.png"
          alt="랜덤 상자"
          width={375}
          height={390}
          className="display-mobile-only h-auto w-full max-w-[375px]"
        />
        <Image
          src="/landing-4-md.png"
          alt="랜덤 상자"
          width={744}
          height={667}
          className="display-tablet-only h-auto w-full max-w-[744px]"
        />
        <Image
          src="/landing-4-lg.png"
          alt="랜덤 상자"
          width={1920}
          height={900}
          className="display-desktop-only h-auto w-full max-w-[1920px]"
        />
      </section>

      <section className="mt-20 flex w-full flex-col items-center justify-center lg:mt-[100px]">
        <div className="mb-[30px] overflow-hidden rounded-[4px] shadow-2xl lg:mb-[50px]">
          <Image
            src="/Rectangle 52.png"
            alt="포토카드 예시"
            width={104}
            height={151}
            className="h-auto w-[104px]"
          />
        </div>

        <h2 className="typo-24-bold md:typo-28-bold mb-8 text-center text-white lg:mb-10">
          나의 최애를 지금 찾아보세요!
        </h2>

        <Link href="/marketplace">
          <PrimaryButton
            thickness="thin"
            className="!typo-16-bold h-[55px] w-[226px]">
            최애 찾으러 가기
          </PrimaryButton>
        </Link>
      </section>
    </div>
  );
}
