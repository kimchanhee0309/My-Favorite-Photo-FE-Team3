"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import ListingHero from "./_components/ListingHero";
import ExchangeWishSection from "./_components/ExchangeWishSection";
import ExchangeOfferSection from "./_components/ExchangeOfferSection";
import ExchangePhotocardModal from "@/features/exchange/components/ExchangePhotocardModal";
import EditListingModal from "@/features/shopListing/components/EditListingModal";
import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";
import {
  useShopListing,
  useShopListingExchanges,
  usePurchaseShopListing,
  useDeleteShopListing,
} from "@/features/shopListing/shopListing.queries";
import {
  mapShopListingToCard,
  mapExchangeToOffer,
} from "@/features/shopListing/shopListing.mapper";

export default function MarketplaceDetailPage() {
  /*  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const isOwner = false;
  const { shopListingId } = useParams();
  const router = useRouter();
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isPurchaseConfirmOpen, setIsPurchaseConfirmOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelistConfirmOpen, setIsDelistConfirmOpen] = useState(false);

  const { mutate: purchaseShopListing, isPending: isPurchasePending } =
    usePurchaseShopListing(shopListingId);
  const { mutate: deleteShopListing, isPending: isDelistPending } =
    useDeleteShopListing();

  const listing = {
    name: "인디쵸",
    imageUrl: "/cho.jpeg",
    grade: "LEGENDARY",
    genre: "PORTRAIT",
    nickname: "문치",
    description: "인디언 cho-zzang 입니다.",
    pricePerUnit: 4000,
    remainingQuantity: 2,
    quantity: 7,
    wishGrade: "RARE",
    wishGenre: "PORTRAIT",
    wishDescription: "아름다운 사람으로 부탁합니다.",
  };

  const [exchangeOffers, setExchangeOffers] = useState([
    {
      id: 1,
      imageUrl: "/cho.jpeg",
      name: "스페인 여행",
      grade: "COMMON",
      genre: "TRAVEL",
      minPrice: 700,
      nickname: isOwner ? "nickname" : "proposer",
      message:
        "스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!",
    },
    {
      id: 2,
      imageUrl: "/cho.jpeg",
      name: "How Far I'll Go",
      grade: "SUPER_RARE",
      genre: "LANDSCAPE",
      minPrice: 400,
      nickname: isOwner ? "nickname" : "proposer",
      message: "여름 바다 풍경 사진과 교환하실래요?",
    },
    {
      id: 3,
      imageUrl: "/cho.jpeg",
      name: "겨울 왕국",
      grade: "RARE",
      genre: "LANDSCAPE",
      minPrice: 500,
      nickname: isOwner ? "nickname" : "proposer",
      message: "눈 오는 풍경 사진이랑 교환하고 싶어요!",
    },
  ]);

  const buildPurchaseResultUrl = (status) => {
    const query = new URLSearchParams({
      status,
      grade: listing.grade,
      name: listing.name,
      quantity: String(purchaseQuantity),
    });
    return `/marketplace/${shopListingId}/purchase-result?${query.toString()}`;
  };

  const handlePurchase = () => {
    purchaseShopListing(
      { quantity: purchaseQuantity },
      {
        onSuccess: () => {
          setIsPurchaseConfirmOpen(false);
          router.push(buildPurchaseResultUrl("success"));
        },
        onError: () => {
          setIsPurchaseConfirmOpen(false);
          router.push(buildPurchaseResultUrl("error"));
        },
      },
    );
  };

  const handleDelist = () => {
    deleteShopListing(shopListingId, {
      onSuccess: () => {
        setIsDelistConfirmOpen(false);
        router.push("/my-sales");
      },
    });
  };
  */

  const { shopListingId } = useParams();
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const {
    data: listingResponse,
    isLoading,
    isError,
    error,
  } = useShopListing(shopListingId);

  const listingRaw = listingResponse?.data;

  const listing = useMemo(() => {
    if (!listingRaw) return null;
    return mapShopListingToCard(listingRaw);
  }, [listingRaw]);

  const isOwner = Boolean(user && listingRaw?.userId === user.id);

  const { data: exchangeResponse } = useShopListingExchanges(shopListingId, {
    enabled: isLoggedIn && isOwner,
  });

  const exchangeOffers = useMemo(() => {
    const rawOffers =
      exchangeResponse?.data?.items ?? listingRaw?.exchanges ?? [];
    return rawOffers.map(mapExchangeToOffer);
  }, [exchangeResponse, listingRaw]);

  const { mutate: purchaseShopListing, isPending: isPurchasePending } =
    usePurchaseShopListing(shopListingId);

  const { mutate: deleteShopListing, isPending: isDelistPending } =
    useDeleteShopListing();

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError) return <p>{error.message}</p>;
  if (!listing) return <p>판매 포토카드를 찾을 수 없습니다.</p>;

  return (
    <div className="layout-container flex flex-col py-10">
      <div className="flex w-[345px] flex-col self-center md:w-[704px] lg:w-[1480px]">
        <p className="md:typo-brand-16 lg:typo-brand-24 hidden text-gray-300 md:mb-10 md:block md:font-normal lg:mb-[60px]">
          마켓플레이스
        </p>

        <div className="flex flex-col gap-2.5 md:gap-5">
          <h1 className="typo-24-regular md:typo-32-bold lg:typo-40-bold font-bold text-white">
            {listing.name}
          </h1>
          <div className="h-[2px] w-full bg-gray-100" />
        </div>
      </div>

      <ListingHero
        listing={listing}
        isOwner={isOwner}
        purchaseQuantity={purchaseQuantity}
        onQuantityChange={setPurchaseQuantity}
        onBuy={() => setIsPurchaseConfirmOpen(true)}
        onEdit={() => setIsEditModalOpen(true)}
        onDelist={() => setIsDelistConfirmOpen(true)}
      />

      {!isOwner && (
        <ExchangeWishSection
          listing={listing}
          onExchange={() => setIsExchangeModalOpen(true)}
        />
      )}

      <ExchangeOfferSection
        shopListingId={shopListingId}
        offers={exchangeOffers}
        isOwner={isOwner}
        onAccept={(id) =>
          setExchangeOffers((prev) => prev.filter((o) => o.id !== id))
        }
        onReject={(id) =>
          setExchangeOffers((prev) => prev.filter((o) => o.id !== id))
        }
        onCancel={(id) =>
          setExchangeOffers((prev) => prev.filter((o) => o.id !== id))
        }
      />

      <ExchangePhotocardModal
        shopListingId={shopListingId}
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
      />

      <ConfirmModal
        title="포토카드 구매"
        message={
          <>
            <span className="whitespace-nowrap">
              [{listing.grade} | {listing.name}]
            </span>
            <br className="lg:hidden" /> {purchaseQuantity}장을
            구매하시겠습니까?
          </>
        }
        confirmLabel="구매하기"
        isOpen={isPurchaseConfirmOpen}
        onClose={() => setIsPurchaseConfirmOpen(false)}
        onConfirm={handlePurchase}
        isPending={isPurchasePending}
      />

      <ConfirmModal
        title="포토카드 판매 내리기"
        message="정말로 판매를 종료하시겠습니까?"
        confirmLabel="판매 내리기"
        isOpen={isDelistConfirmOpen}
        onClose={() => setIsDelistConfirmOpen(false)}
        onConfirm={handleDelist}
        isPending={isDelistPending}
      />

      <EditListingModal
        shopListingId={shopListingId}
        listing={listing}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => alert("수정되었습니다")}
      />
    </div>
  );
}
