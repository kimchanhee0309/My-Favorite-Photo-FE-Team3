"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ResultSection from "@/common/components/resultsection/ResultSection";

export default function SellResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("status") === "success";
  const grade = searchParams.get("grade");
  const name = searchParams.get("name");
  const quantity = searchParams.get("quantity");

  return (
    <ResultSection
      isSuccess={isSuccess}
      title="판매 등록"
      message={`[${grade} | ${name}] ${quantity}장 판매 등록에 ${
        isSuccess ? "성공했습니다!" : "실패했습니다."
      }`}
      buttonLabel={isSuccess ? "나의 판매 포토카드에서 확인하기" : "마켓플레이스로 돌아가기"}
      onButtonClick={() => router.push(isSuccess ? "/my-sales" : "/marketplace")}
      onClose={() => router.push("/marketplace")}
    />
  );
}