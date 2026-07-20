"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "@/common/components/input/Input";

export default function LoginPage() {
  return (
    <div className="layout-container flex min-h-[calc(100vh-80px)] flex-col items-center justify-center pt-10 pb-20">
      <div className="mb-12">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="최애의 포토"
            width={220}
            height={60}
            priority={true}
            className="h-auto w-[150px] object-contain md:w-[180px] lg:w-[220px]"
          />
        </Link>
      </div>

      <div className="flex w-[345px] flex-col gap-6 md:w-[440px] lg:w-[520px]">
        <div className="flex flex-col gap-4">
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>

        <div className="mt-2 flex flex-col gap-3">
          <button
            type="button"
            className="bg-main typo-16-bold flex h-[55px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-sm text-black transition-opacity hover:opacity-90 lg:h-[60px]">
            로그인
          </button>

          <button
            type="button"
            onClick={() => (window.location.href = "https://google.com")}
            className="typo-16-bold flex h-[55px] w-full cursor-pointer items-center justify-center gap-3 rounded-sm border border-gray-300 bg-white text-black transition-colors hover:bg-gray-100 lg:h-[60px]">
            <Image
              src="/Frame.png"
              alt="Google Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            Google로 시작하기
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2.5">
          <span className="typo-16-regular text-white">
            최애의 포토가 처음이신가요?
          </span>
          <Link
            href="/signup"
            className="typo-16-regular !text-main underline underline-offset-4 transition-opacity hover:opacity-90">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
