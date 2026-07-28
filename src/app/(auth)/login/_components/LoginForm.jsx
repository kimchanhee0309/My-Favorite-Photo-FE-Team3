"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/common/components/input/Input";
import { useAuth } from "@/providers/AuthProvider";
import { loginApi } from "@/features/auth/auth.api";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const router = useRouter();
  const { refetchMe } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email:
          value && !emailRegex.test(value)
            ? "올바른 이메일 형식이 아닙니다."
            : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginApi(formData);
      await refetchMe();
      router.push("/");
    } catch (error) {
      alert(error.message || "로그인에 실패했습니다.");
    }
  };

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    window.location.href = `${baseUrl}/auth/google`;
  };

  const isValid = formData.email && formData.password && !errors.email;

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="flex flex-col gap-4">
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
            htmlFor="password"
            className="typo-16-regular lg:typo-18-regular text-white">
            비밀번호
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={!isValid}
          className={`bg-main typo-16-bold lg:typo-18-bold flex h-[55px] w-full items-center justify-center gap-2.5 rounded-sm text-black lg:h-[60px] ${!isValid ? "cursor-not-allowed" : "cursor-pointer transition-opacity hover:opacity-90"}`}>
          로그인
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="typo-16-regular lg:typo-18-regular flex h-[55px] w-full cursor-pointer items-center justify-center gap-3 rounded-sm border border-gray-300 bg-white text-black transition-colors hover:bg-gray-100 lg:h-[60px]">
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
  );
}
