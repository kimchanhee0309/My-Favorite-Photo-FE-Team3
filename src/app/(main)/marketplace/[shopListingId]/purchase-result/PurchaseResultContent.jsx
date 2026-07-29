"use client";

import ResultSection from "@/common/components/resultsection/ResultSection";
import { useRouter, useSearchParams, useParams } from "next/navigation";

export default function PurchaseResultContent() {
  const router = useRouter();
  const { shopListingId } = useParams();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("status") === "success";
  const grade = searchParams.get("grade");
  const name = searchParams.get("name");
  const quantity = searchParams.get("quantity");

  return (
    <ResultSection
      isSuccess={isSuccess}
      title="구매"
      message={`[${grade} | ${name}] ${quantity}장 구매에 ${isSuccess ? "성공했습니다!" : "실패했습니다."}`}
      buttonLabel={isSuccess ? "마이갤러리에서 확인하기" : "마켓플레이스로 돌아가기"}
      onButtonClick={() => router.push(isSuccess ? "/gallery" : "/marketplace")}
      onClose={() => router.push(`/marketplace/${shopListingId}`)}
    />
  );
}