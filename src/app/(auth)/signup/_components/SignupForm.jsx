"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/common/components/input/Input";
import PrimaryButton from "@/common/components/button/PrimaryButton";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let errorMsg = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errorMsg =
        value && !emailRegex.test(value)
          ? "올바른 이메일 형식이 아닙니다."
          : "";
    } else if (name === "password") {
      errorMsg = value && value.length < 8 ? "8자 이상 입력해 주세요." : "";

      if (formData.passwordConfirm && value !== formData.passwordConfirm) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, passwordConfirm: "" }));
      }
    } else if (name === "passwordConfirm") {
      errorMsg =
        value && value !== formData.password
          ? "비밀번호가 일치하지 않습니다."
          : "";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 제출 데이터:", formData);
  };

  const isValid =
    formData.email &&
    formData.nickname &&
    formData.password.length >= 8 &&
    formData.password === formData.passwordConfirm &&
    !errors.email &&
    !errors.password &&
    !errors.passwordConfirm;

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="flex flex-col gap-[34px]">
        <div className="flex flex-col gap-[10px]">
          <label
            htmlFor="email"
            className="typo-16-regular lg:typo-18-regular text-white">
            이메일
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={formData.email}
            onChange={handleChange}
            error={errors.email || undefined}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            htmlFor="nickname"
            className="typo-16-regular lg:typo-18-regular text-white">
            닉네임
          </label>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            htmlFor="password"
            className="typo-16-regular lg:typo-18-regular text-white">
            비밀번호
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="8자 이상 입력해 주세요"
            value={formData.password}
            onChange={handleChange}
            error={errors.password || undefined}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            htmlFor="passwordConfirm"
            className="typo-16-regular lg:typo-18-regular text-white">
            비밀번호 확인
          </label>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            value={formData.passwordConfirm}
            onChange={handleChange}
            error={errors.passwordConfirm || undefined}
          />
        </div>
      </div>

      <div className="mt-11 flex flex-col gap-3">
        <PrimaryButton
          type="submit"
          disabled={!isValid}
          thickness="thin"
          size={{ base: "S", md: "M", lg: "L" }}
          className={`h-[55px] w-full lg:h-[60px] ${
            !isValid
              ? "!bg-main !border-main cursor-not-allowed !text-black"
              : "hover:opacity-90"
          }`}>
          가입하기
        </PrimaryButton>

        <button
          type="button"
          onClick={() => (window.location.href = "https://google.com")}
          className="typo-16-regular lg:typo-18-regular flex h-[55px] w-full cursor-pointer items-center justify-center gap-3 rounded-sm border border-gray-300 bg-white text-black transition-colors hover:bg-gray-100 lg:h-[60px]">
          <Image
            src="/Frame.png"
            alt="Google Logo"
            width={22}
            height={22}
            className="h-[22px] w-[22px] shrink-0 object-contain"
          />
          Google로 시작하기
        </button>
      </div>
    </form>
  );
}
