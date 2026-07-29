"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyCard from "@/common/components/photocard/MyCard";
import PrimaryButton from "@/common/components/button/PrimaryButton";
import SecondaryButton from "@/common/components/button/SecondaryButton";
import Textarea from "@/common/components/input/Textarea";
import { useCreateExchangeOffer } from "../exchange.queries";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 744px)");
    const update = () => setIsMobile(!mdQuery.matches);
    update();
    mdQuery.addEventListener("change", update);
    return () => mdQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function ExchangeOfferForm({ shopListingId, card, onCancel }) {
  const [message, setMessage] = useState("");
  const isMobile = useIsMobile();
  const router = useRouter();

  const { mutate: createExchangeOffer, isPending } =
    useCreateExchangeOffer(shopListingId);

  const handleSubmit = () => {
    createExchangeOffer(
      {
        shopListingId,
        data: {
          photocardId: card.photocardId,
          message,
        },
      },
      {
        onSuccess: () => {
          router.push(
            `/marketplace/${shopListingId}/exchange-result?status=success`,
          );
        },
        onError: (error) => {
          console.error(error);
          router.push(
            `/marketplace/${shopListingId}/exchange-result?status=error`,
          );
        },
      },
    );
  };

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <p className="hidden font-['BaskinRobbins'] text-gray-300 md:block md:text-[16px] md:font-normal lg:text-[24px]">
          포토카드 교환하기
        </p>
        <h2 className="border-b-2 border-gray-100 pb-[10px] font-['BaskinRobbins'] text-[24px] leading-normal font-bold text-white md:text-[40px] md:font-normal md:tracking-[-1.2px] lg:text-[40px] lg:font-bold lg:tracking-normal">
          {card.title}
        </h2>
      </div>

      <div className="flex flex-1 flex-col gap-5 md:flex-row">
        <MyCard
          imageUrl={card.imageUrl}
          title={card.title}
          grade={card.grade}
          genre={card.genre}
          description={card.description}
          minPrice={card.minPrice}
          quantity={card.quantity}
          size={isMobile ? "S" : undefined}
        />

        <div className="flex flex-col gap-5">
          <Textarea
            label="교환 제시 내용"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="내용을 입력해 주세요"
            className="h-full md:!w-[342px] lg:!w-[440px]"
          />

          <div className="flex gap-2.5">
            <SecondaryButton
              thickness="thin"
              size={{ base: "S", md: "M", lg: "L" }}
              onClick={onCancel}
              className="h-[55px] flex-1 lg:h-[60px]">
              취소하기
            </SecondaryButton>
            <PrimaryButton
              thickness="thin"
              size={{ base: "S", md: "M", lg: "L" }}
              onClick={handleSubmit}
              disabled={isPending}
              className="h-[55px] flex-1 lg:h-[60px]">
              교환하기
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
