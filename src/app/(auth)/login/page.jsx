"use client";

import Image from "next/image";
import Link from "next/link";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="layout-container flex min-h-[calc(100vh-80px)] flex-col items-center justify-center pt-10 pb-20">
      <div className="mb-12">
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

      <div className="flex w-[345px] flex-col gap-6 md:w-[440px] lg:w-[520px]">
        <LoginForm />

        <div className="mt-4 flex items-center justify-center gap-2.5">
          <span className="typo-14-regular lg:typo-16-regular text-white">
            최애의 포토가 처음이신가요?
          </span>
          <Link
            href="/signup"
            className="text-main typo-14-regular lg:typo-16-regular underline underline-offset-4 transition-opacity hover:opacity-90">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
