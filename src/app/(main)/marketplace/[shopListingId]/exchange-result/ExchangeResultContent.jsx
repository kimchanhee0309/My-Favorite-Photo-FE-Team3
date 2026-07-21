"use client";

import ResultSection from "@/common/components/resultsection/ResultSection";
import { useRouter, useSearchParams, useParams } from "next/navigation";

export default function ExchangeResultContent() {
  const router = useRouter();
  const { shopListingId } = useParams();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("status") === "success";

  return (
    <ResultSection
      isSuccess={isSuccess}
      title="교환 제시"
      message={`포토카드 교환 제시에 ${isSuccess ? "성공했습니다!" : "실패했습니다."}`}
      buttonLabel={isSuccess ? "나의 판매 포토카드에서 확인하기" : "마켓플레이스로 돌아가기"}
      onButtonClick={() => router.push(isSuccess ? "/my-sales" : "/marketplace")}
      onClose={() => router.push(`/marketplace/${shopListingId}`)}
    />
  );
}