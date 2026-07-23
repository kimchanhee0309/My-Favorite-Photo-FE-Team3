"use client";

import Image from "next/image";
import Link from "next/link";
import SignupForm from "./_components/SignupForm";

export default function SignupPage() {
  return (
    <div className="layout-container flex min-h-[calc(100vh-80px)] flex-col items-center justify-center pt-10 pb-20">
      <div className="mb-20">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="최애의 포토"
            width={331}
            height={60}
            priority={true}
            className="h-[35px] w-[189px] object-contain md:h-[60px] md:w-[331px]"
          />
        </Link>
      </div>

      <div className="flex w-[345px] flex-col md:w-[440px] lg:w-[520px]">
        <SignupForm />

        <div className="mt-10 flex items-center justify-center gap-2.5">
          <span className="typo-14-regular lg:typo-16-regular text-white">
            이미 최애의포토 회원이신가요?
          </span>
          <Link
            href="/login"
            className="!text-main typo-14-regular lg:typo-16-regular underline underline-offset-4 transition-opacity hover:opacity-90">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
