"use client";

import { PrimaryButton } from "@/common/components";
import { useRouter } from "next/navigation";

export default function MobileCreateButton() {
  const router = useRouter();

  return (
    <PrimaryButton
      thickness="thin"
      size="S"
      className="fixed inset-x-0 bottom-3.75 z-10 mx-auto h-[55px] w-[345px] md:hidden"
      onClick={() => router.push("/gallery/create")}>
      포토카드 생성하기
    </PrimaryButton>
  );
}
