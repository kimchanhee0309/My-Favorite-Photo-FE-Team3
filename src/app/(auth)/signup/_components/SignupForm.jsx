"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/common/components/input/Input";
import PrimaryButton from "@/common/components/button/PrimaryButton";
import { signupApi, loginApi } from "@/features/auth/auth.api";
import { useAuth } from "@/providers/AuthProvider";

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

  const router = useRouter();

  const { refetchMe } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email =
          value && !emailRegex.test(value)
            ? "올바른 이메일 형식이 아닙니다."
            : "";
      } else if (name === "nickname") {
        newErrors.nickname =
          value && value.length < 2 ? "닉네임은 2자 이상 입력해 주세요." : "";
      } else if (name === "password") {
        newErrors.password =
          value && value.length < 8 ? "8자 이상 입력해 주세요." : "";
        if (formData.passwordConfirm) {
          newErrors.passwordConfirm =
            value !== formData.passwordConfirm
              ? "비밀번호가 일치하지 않습니다."
              : "";
        }
      } else if (name === "passwordConfirm") {
        newErrors.passwordConfirm =
          value && value !== formData.password
            ? "비밀번호가 일치하지 않습니다."
            : "";
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupApi(formData);

      await loginApi({ email: formData.email, password: formData.password });

      await refetchMe();

      router.push("/marketplace");
    } catch (error) {
      alert(error.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    window.location.href = `${baseUrl}/auth/google`;
  };

  const isValid =
    formData.email &&
    formData.nickname.length >= 2 &&
    formData.password.length >= 8 &&
    formData.password === formData.passwordConfirm &&
    !errors.email &&
    !errors.nickname &&
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
            error={errors.nickname || undefined}
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
          className={`h-[55px] w-full lg:h-[60px] ${!isValid ? "!bg-main !border-main cursor-not-allowed !text-black" : "hover:opacity-90"}`}>
          가입하기
        </PrimaryButton>

        <button
          type="button"
          onClick={handleGoogleLogin}
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
