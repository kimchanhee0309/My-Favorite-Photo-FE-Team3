import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/common/components/button/PrimaryButton";

export default function NotFound() {
  return (
    <div className="layout-container flex min-h-screen flex-col items-center justify-center gap-10 pt-10 pb-20 text-center">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="최애의 포토"
          width={331}
          height={60}
          priority
          className="h-[35px] w-[189px] object-contain md:h-[60px] md:w-[331px]"
        />
      </Link>

      <div className="flex flex-col items-center gap-2.5">
        <Image
          src="/404.gif"
          alt="404"
          width={498}
          height={332}
          unoptimized
          className="h-auto w-[220px] md:w-[300px]"
        />
        <p className="typo-18-bold lg:typo-20-bold text-white">
          페이지를 찾을 수 없어요
        </p>
        <p className="typo-14-regular lg:typo-16-regular text-gray-300">
          입력하신 주소가 정확한지 다시 확인해 주세요.
        </p>
      </div>

      <Link href="/">
        <PrimaryButton
          thickness="thin"
          size={{ base: "S", md: "M", lg: "L" }}
          className="h-[55px] w-[220px] md:w-[260px]">
          홈으로 돌아가기
        </PrimaryButton>
      </Link>
    </div>
  );
}
