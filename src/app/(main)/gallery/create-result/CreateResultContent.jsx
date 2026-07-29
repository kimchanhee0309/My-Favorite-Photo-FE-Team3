"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ResultSection from "@/common/components/resultsection/ResultSection";

export default function CreateResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("status") === "success";
  const grade = searchParams.get("grade");
  const name = searchParams.get("name");

  return (
    <ResultSection
      isSuccess={isSuccess}
      title="포토카드 생성"
      message={`[${grade} | ${name}] 포토카드 생성에 ${
        isSuccess ? "성공했습니다!" : "실패했습니다."
      }`}
      buttonLabel={isSuccess ? "마이갤러리에서 확인하기" : "마이갤러리로 돌아가기"}
      onButtonClick={() => router.push("/gallery")}
      onClose={() => router.push("/gallery")}
    />
  );
}