"use client";

import { useState } from "react";
import { PrimaryButton } from "@/common/components";
import SellPhotocardModal from "@/features/shopListing/components/SellPhotocardModal";
import { useAuth } from "@/providers/AuthProvider";
import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";
import { useRouter } from "next/navigation";

export default function MobileSellButton() {
  const { user } = useAuth();
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <PrimaryButton
        thickness="thin"
        size="S"
        className="fixed inset-x-0 bottom-3.75 z-10 mx-auto h-[55px] w-[345px] md:hidden"
        onClick={() => {
          if (!user) return setIsModalOpen(true);
          return setIsSellModalOpen(true);
        }}>
        나의 포토카드 판매하기
      </PrimaryButton>
      <SellPhotocardModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => router.push("/login")}
        title="로그인이 필요합니다"
        message={
          <>
            로그인 하시겠습니까?
            <br />
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </>
        }
        confirmLabel="확인"
      />
    </>
  );
}
