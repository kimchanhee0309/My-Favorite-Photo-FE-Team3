"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Input from "@/common/components/input/Input";
import PrimaryButton from "@/common/components/button/PrimaryButton";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "이메일을 입력해 주세요.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해 주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해 주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "8자 이상 입력해 주세요.";
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(formData);
  };

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
            className="h-auto w-[180px] object-contain md:w-[250px] lg:w-[331px]"
          />
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center">
        <div className="flex w-full flex-col items-center gap-[34px]">
          <Input
            label="이메일"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해 주세요"
            error={errors.email}
          />
          <Input
            label="닉네임"
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해 주세요"
            error={errors.nickname}
          />
          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="8자 이상 입력해 주세요"
            error={errors.password}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            error={errors.passwordConfirm}
          />
        </div>

        <div className="mt-11 flex w-[345px] flex-col items-center md:w-[440px] lg:w-[520px]">
          <PrimaryButton
            type="submit"
            thickness="thin"
            size={{ base: "S", md: "M", lg: "L" }}
            className="h-[55px] w-full lg:h-[60px]">
            가입하기
          </PrimaryButton>

          <button
            type="button"
            onClick={() => (window.location.href = "https://google.com")}
            className="typo-16-bold mt-4 flex h-[55px] w-full items-center justify-center gap-3 rounded-sm border border-gray-300 bg-white text-black transition-colors hover:bg-gray-100 lg:h-[60px]">
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
      </form>

      <div className="mt-10 flex items-center justify-center gap-2.5">
        <span className="typo-16-regular">이미 최애의포토 회원이신가요?</span>
        <Link
          href="/login"
          className="typo-16-regular !text-main underline underline-offset-4 transition-opacity hover:opacity-90">
          로그인하기
        </Link>
      </div>
    </div>
  );
}
