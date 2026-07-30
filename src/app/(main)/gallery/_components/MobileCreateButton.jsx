"use client";

import { PrimaryButton } from "@/common/components";
import { useGetCreatePhotocardCount } from "@/features/photocard/photocard.queries";
import { useRouter } from "next/navigation";

export default function MobileCreateButton() {
  const router = useRouter();
  const {
    data: createCardCount,
    isPending,
    isError,
  } = useGetCreatePhotocardCount();

  const isLimitReached =
    !isPending && !isError && createCardCount.data.remaining === 0;

  return (
    <PrimaryButton
      thickness="thin"
      size="S"
      disabled={isPending || isError || isLimitReached}
      className="fixed inset-x-0 bottom-3.75 z-10 mx-auto h-[55px] w-[345px] disabled:cursor-not-allowed md:hidden"
      onClick={() => router.push("/gallery/create")}>
      포토카드 생성하기
      {!isPending &&
        !isError &&
        ` (${createCardCount.data.remaining}/${createCardCount.data.limit})`}
    </PrimaryButton>
  );
}
