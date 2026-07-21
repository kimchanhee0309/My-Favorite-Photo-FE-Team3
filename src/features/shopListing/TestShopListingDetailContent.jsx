"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  useDeleteShopListing,
  usePurchaseShopListing,
  useShopListing,
  useShopListingExchanges,
} from "./shopListing.queries";

import {
  useAcceptExchange,
  useCreateExchangeOffer,
  useRejectExchange,
} from "../exchange/exchange.queries";

function mapShopListing(shopListing) {
  const photocard = shopListing?.ownership?.photocard;
  const seller = shopListing?.user;

  return {
    id: shopListing?.id,
    userId: shopListing?.userId,
    ownership: shopListing?.ownership,

    name: photocard?.name ?? "",
    imageUrl: photocard?.imageUrl ?? "",
    grade: photocard?.grade ?? "",
    genre: photocard?.genre ?? "",
    description: photocard?.description ?? "",
    minPrice: photocard?.minPrice ?? 0,

    nickname: seller?.nickname ?? "",
    pricePerUnit: shopListing?.pricePerUnit ?? 0,
    quantity: shopListing?.quantity ?? 0,
    remainingQuantity: shopListing?.remainingQuantity ?? 0,
    status: shopListing?.status ?? "",

    wishGrade: shopListing?.wishGrade ?? "",
    wishGenre: shopListing?.wishGenre ?? "",
    wishDescription: shopListing?.wishDescription ?? "",
  };
}

function mapExchange(exchange) {
  const photocard = exchange?.photocard;
  const proposer = exchange?.proposer;

  return {
    id: exchange.id,
    status: exchange.status,
    offeredQuantity: exchange.offeredQuantity,

    name: photocard?.name ?? "",
    imageUrl: photocard?.imageUrl ?? "",
    grade: photocard?.grade ?? "",
    genre: photocard?.genre ?? "",
    minPrice: photocard?.minPrice ?? 0,

    nickname: proposer?.nickname ?? "",
    message: exchange?.message ?? "",
  };
}

export default function TestShopListingDetailContent({
  shopListingId,
  currentUserId,
}) {
  const router = useRouter();
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const {
    data: listingResponse,
    isLoading,
    isError,
    error,
  } = useShopListing(shopListingId);

  const { data: exchangesResponse, isLoading: isExchangesLoading } =
    useShopListingExchanges(shopListingId);

  const purchaseMutation = usePurchaseShopListing(shopListingId);
  const deleteMutation = useDeleteShopListing();

  const createExchangeMutation = useCreateExchangeOffer(shopListingId);
  const acceptExchangeMutation = useAcceptExchange(shopListingId);
  const rejectExchangeMutation = useRejectExchange(shopListingId);

  const shopListing = listingResponse?.data;

  const listing = useMemo(() => {
    if (!shopListing) return null;
    return mapShopListing(shopListing);
  }, [shopListing]);

  const isOwner = Boolean(
    currentUserId && listing?.userId && currentUserId === listing.userId,
  );

  const exchanges = useMemo(() => {
    const rawItems =
      exchangesResponse?.data?.items ?? exchangesResponse?.data ?? [];
    return rawItems.map(mapExchange);
  }, [exchangesResponse]);

  const handleBuy = () => {
    if (!listing) return;

    const ok = window.confirm(
      `[${listing.grade}] ${listing.name} ${purchaseQuantity}장을 구매하시겠습니까?`,
    );

    if (!ok) return;

    purchaseMutation.mutate(
      { quantity: purchaseQuantity },
      {
        onSuccess: () => {
          alert("구매에 성공했습니다.");
        },
        onError: (mutationError) => {
          alert(mutationError.message || "구매에 실패했습니다.");
        },
      },
    );
  };

  const handleDelist = () => {
    const ok = window.confirm("정말로 판매를 내리시겠습니까?");
    if (!ok) return;

    deleteMutation.mutate(shopListingId, {
      onSuccess: () => {
        alert("판매를 내렸습니다.");
        router.push("/my-sales");
      },
      onError: (mutationError) => {
        alert(mutationError.message || "판매 내리기에 실패했습니다.");
      },
    });
  };

  const handleCreateExchange = () => {
    const photocardId = window.prompt(
      "교환으로 제시할 내 포토카드 ID를 입력해주세요",
    );

    if (!photocardId) return;

    const message = window.prompt("교환 제시 내용을 입력해주세요.") ?? "";

    createExchangeMutation.mutate(
      {
        photocardId,
        offeredQuantity: 1,
        message,
      },
      {
        onSuccess: () => {
          alert("교환 제안을 보냈습니다.");
        },
        onError: (mutationError) => {
          alert(mutationError.message || "교환 제안에 실패했습니다.");
        },
      },
    );
  };

  const handleAcceptExchange = (exchangeId) => {
    const ok = window.confirm("이 교환 제안을 승인하시겠습니까?");
    if (!ok) return;

    acceptExchangeMutation.mutate(exchangeId, {
      onSuccess: () => {
        alert("교환 제안을 승인했습니다.");
      },
      onError: (mutationError) => {
        alert(mutationError.message || "교환 승인에 실패했습니다.");
      },
    });
  };

  const handleRejectExchange = (exchangeId) => {
    const ok = window.confirm("이 교환 제안을 거절하시겠습니까?");
    if (!ok) return;

    rejectExchangeMutation.mutate(exchangeId, {
      onSuccess: () => {
        alert("교환 제안을 거절했습니다.");
      },
      onError: (mutationError) => {
        alert(mutationError.message || "교환 거절에 실패했습니다.");
      },
    });
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        불러오는 중...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        {error.message}
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        판매글을 찾을 수 없습니다.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <section className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <p className="typo-14-regular mb-10 text-gray-300">마켓플레이스</p>

          <h1 className="typo-28-bold lg:typo-40-bold mb-5 text-white">
            {listing.name}
          </h1>

          <div className="mb-10 h-px w-full bg-gray-200" />

          {listing.imageUrl ? (
            <img
              src={listing.imageUrl}
              alt={listing.name}
              className="w-full max-w-[700px] object-cover"
            />
          ) : (
            <div className="flex h-[400px] w-full max-w-[700px] items-center justify-center bg-gray-500 text-gray-200">
              이미지가 없습니다.
            </div>
          )}
        </div>

        <aside className="shrink-0">
          <div className="flex flex-col gap-5">
            <div className="w-[345px] border border-gray-400 p-5 md:w-[342px] lg:w-[440px]">
              <p className="typo-18-bold text-white">
                {listing.grade} | {listing.genre}
              </p>

              <p className="typo-16-regular mt-2 text-gray-200">
                판매자: {listing.nickname}
              </p>

              <p className="typo-14-regular mt-5 text-gray-200">
                {listing.description}
              </p>

              <div className="mt-5 flex justify-between">
                <span>가격</span>
                <strong>{listing.pricePerUnit} P</strong>
              </div>

              <div className="mt-2 flex justify-between">
                <span>잔여</span>
                <strong>
                  {listing.remainingQuantity} / {listing.quantity}
                </strong>
              </div>
            </div>

            {isOwner ? (
              <>
                <button
                  type="button"
                  onClick={() => alert("수정 모달 연결 예정")}
                  className="bg-main h-[60px] w-[345px] text-black md:w-[342px] lg:w-[440px]">
                  수정하기
                </button>
                <button
                  type="button"
                  onClick={handleDelist}
                  disabled={deleteMutation.isPending}
                  className="h-[60px] w-[345px] border border-gray-200 text-white disabled:opacity-50 md:w-[342px] lg:w-[440px]">
                  {deleteMutation.isPending
                    ? "판매 내리는 중..."
                    : "판매 내리기"}
                </button>
              </>
            ) : (
              <>
                <div className="flex w-[345px] items-center justify-between md:w-[342px] lg:w-[440px]">
                  <span>구매수량</span>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setPurchaseQuantity((prev) => Math.max(prev - 1, 1))
                      }>
                      -
                    </button>

                    <strong>{purchaseQuantity}</strong>

                    <button
                      type="button"
                      onClick={() =>
                        setPurchaseQuantity((prev) =>
                          Math.min(prev + 1, listing.remainingQuantity),
                        )
                      }>
                      +
                    </button>
                  </div>
                </div>

                <div className="flex w-[345px] justify-between md:w-[342px] lg:w-[440px]">
                  <span>총 가격</span>
                  <strong>{listing.pricePerUnit * purchaseQuantity} P</strong>
                </div>

                <button
                  type="button"
                  onClick={handleBuy}
                  disabled={
                    purchaseMutation.isPending ||
                    listing.status !== "ON_SALE" ||
                    listing.remainingQuantity <= 0
                  }
                  className="bg-main h-[75px] w-[345px] text-black disabled:opacity-50 md:w-[342px] lg:h-[80px] lg:w-[440px]">
                  {purchaseMutation.isPending
                    ? "구매 중..."
                    : "포토카드 구매하기"}
                </button>

                <button
                  type="button"
                  onClick={handleCreateExchange}
                  disabled={createExchangeMutation.isPending}
                  className="border-main text-main h-[75px] w-[345px] border disabled:opacity-50 md:w-[342px] lg:h-[80px] lg:w-[440px]">
                  {createExchangeMutation.isPending
                    ? "교환 제안 중..."
                    : "포토카드 교환하기"}
                </button>
              </>
            )}
          </div>
        </aside>
      </section>

      <section className="mx-auto mt-20 max-w-[1200px]">
        <h2 className="typo-28-bold text-white">
          {isOwner ? "교환 제시 목록" : "교환 희망 정보"}
        </h2>

        <div className="mt-4 h-px w-full bg-gray-200" />

        {!isOwner && (
          <div className="mt-8">
            <p className="text-gray-200">{listing.wishDescription}</p>
            <p className="text-main mt-3">
              {listing.wishGrade} | {listing.wishGenre}
            </p>
          </div>
        )}

        {isOwner && (
          <>
            {isExchangesLoading ? (
              <p className="mt-10 text-gray-200">교환 제안 불러오는 중...</p>
            ) : exchanges.length === 0 ? (
              <p className="mt-10 text-gray-300">아직 교환 제안이 없습니다.</p>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {exchanges.map((exchange) => (
                  <article
                    key={exchange.id}
                    className="border border-gray-500 bg-gray-500 p-5">
                    {exchange.imageUrl && (
                      <img
                        src={exchange.imageUrl}
                        alt={exchange.name}
                        className="h-[180px] w-full object-cover"
                      />
                    )}

                    <h3 className="typo-18-bold mt-5 text-white">
                      {exchange.name}
                    </h3>

                    <p className="typo-14-regular mt-2 text-gray-300">
                      {exchange.grade} | {exchange.genre} |{" "}
                      {exchange.offeredQuantity}장
                    </p>

                    <p className="typo-14-regular mt-2 text-gray-300">
                      제안자: {exchange.nickname}
                    </p>

                    {exchange.message && (
                      <p className="typo-14-regular mt-4 text-gray-200">
                        {exchange.message}
                      </p>
                    )}

                    <p className="typo-14-regular mt-2 text-gray-300">
                      상태: {exchange.status}
                    </p>

                    <div className="mt-6 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleRejectExchange(exchange.id)}
                        disabled={
                          exchange.status !== "PENDING" ||
                          rejectExchangeMutation.isPending
                        }
                        className="h-[45px] flex-1 border border-gray-200 text-white disabled:opacity-50">
                        거절하기
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAcceptExchange(exchange.id)}
                        disabled={
                          exchange.status !== "PENDING" ||
                          acceptExchangeMutation.isPending
                        }
                        className="bg-main h-[45px] flex-1 text-black disabled:opacity-50">
                        승인하기
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
