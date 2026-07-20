"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "@/common/components/input/Input";

export default function LoginPage() {
  return (
    <div className="layout-container flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pt-10 pb-20">
      <div className="mb-12">
        <Image
          src="/logo.png"
          alt="최애의 포토"
          width={220}
          height={60}
          priority={true}
          className="object-contain w-[150px] md:w-[180px] lg:w-[220px] h-auto"
        />
      </div>

      <div className="flex flex-col gap-6 w-[345px] md:w-[440px] lg:w-[520px]">
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

        <div className="flex flex-col gap-3 mt-2">
          <button
            type="button"
            className="flex justify-center items-center gap-2.5 w-full h-[55px] lg:h-[60px] bg-main text-black typo-16-bold rounded-sm hover:opacity-90 transition-opacity cursor-pointer">
            로그인
          </button>

          <button
            type="button"
            onClick={() => (window.location.href = "https://google.com")}
            className="flex justify-center items-center gap-3 w-full h-[55px] lg:h-[60px] bg-white border border-gray-300 text-black typo-16-bold rounded-sm hover:bg-gray-100 transition-colors cursor-pointer">
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

        <div className="mt-4 flex justify-center items-center gap-2.5">
          <span className="typo-16-regular text-white">
            최애의 포토가 처음이신가요?
          </span>
          <Link
            href="/signup"
            className="typo-16-regular !text-main underline underline-offset-4 hover:opacity-90 transition-opacity">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
