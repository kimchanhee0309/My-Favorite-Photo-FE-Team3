"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BuyerCard from "./components/BuyerCard";
import SellerCard from "./components/SellerCard";
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

export default function TestShopListingDetailContent({ shopListingId }) {
  const router = useRouter();
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const {
    dat: response,
    isLoading,
    isError,
    error,
  } = useShopListing(shopListingId);

  const purchaseMutation = usePurchaseShopListing(shopListingId);
  const deleteMutation = useDeleteShopListing();

  const createExchangeMutation = useCreateExchangeOffer(shopListingId);
  const acceptExchangeMutation = useAcceptExchange(shopListingId);
  const rejectExchangeMutation = useRejectExchange(shopListingId);

  const { data: exchangesResponse, isLoading: isExchangesLoading } =
    useShopListingExchanges(shopListingId);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        불러오는 중...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-red">
        {error.message}
      </main>
    );
  }

  const shopListing = response.data;
  const photocard = shopListing.ownership?.photocard;
  const seller = shopListing.user;

  // 로그인 유저 API 연결되면 실제 로그인 유저 id로 교체
  // 구매자 화면 테스트 : null 유지
  // 판매자 화면 테스트 : shopListing.userId로 임시 변경
  const currentUserId = null;
  const isSeller = currentUserId === shopListing.userId;

  const exchanges =
    exchangesResponse?.data?.items ?? exchangesResponse?.data ?? [];

  const handleBuy = () => {
    const ok = window.confirm(
      `[${photocard?.grade}] ${photocard?.name} ${purchaseQuantity}장을 구매하시겠습니까?`,
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

  const handleCreateExchange = () => {
    const photocardId = window.prompt(
      "교환으로 제시할 내 포토카드 ID를 입력해주세요.\n나중에 모달 완성되면 카드 선택 UI로 대체하기",
    );

    if (!photocardId) return;

    const ok = window.confirm("해당 포토카드로 교환 제안을 보내시겠습니까?");

    if (!ok) return;

    createExchangeMutation.mutate(
      {
        photocardId,
        offeredQuantity: 1,
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

  const handleEdit = () => {
    alert("수정하기는 나중에 수정/모달 페이지와 연결하면 됨");
  };

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <section className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <p className="typo-14-regular mb-10 text-gray-300">마켓플레이스</p>
          <h1 className="typo-28-bold lg:typo-40-bold mb-5 text-white">
            {photocard?.name}
          </h1>

          <div className="mb-10 h-px w-full bg-gray-200" />

          {photocard?.imageUrl ? (
            <img
              src={photocard.imageUrl}
              alt={photocard.name}
              className="w-full max-w-[700px] object-cover"
            />
          ) : (
            <div className="flex h-[400px] w-full max-w-[700px] items-center justify-center bg-gray-500 text-gray-200">
              이미지가 없습니다.
            </div>
          )}
        </div>

        <aside className="shrink-0">
          {isSeller ? (
            <SellerCard
              grade={photocard?.grade}
              genre={photocard?.genre}
              nickname={seller?.nickname}
              description={photocard?.description}
              pricePerUnit={shopListing.pricePerUnit}
              remainingQuantity={shopListing.remainingQuantity}
              quantity={shopListing.quantity}
              wishGrade={shopListing.wishGrade}
              wishGenre={shopListing.wishGenre}
              wishDescription={shopListing.wishDescription}
              onEdit={handleEdit}
              onDelist={handleDelist}
            />
          ) : (
            <div className="flex-col gap-5">
              <BuyerCard
                grade={photocard?.grade}
                genre={photocard?.genre}
                nickname={seller?.nickname}
                description={photocard?.description}
                pricePerUnit={shopListing.pricePerUnit}
                remainingQuantity={shopListing.remainingQuantity}
                quantity={shopListing.quantity}
                purchaseQuantity={purchaseQuantity}
                onQuantityChange={setPurchaseQuantity}
                onBuy={handleBuy}
              />

              <button
                type="button"
                onClick={handleCreateExchange}
                disabled={createExchangeMutation.isPending}
                className="h-[75px] w-[345px] bg-main text-black md:w-[342px] lg:h-[80px] lg:w-[440px]">
                {createExchangeMutation.isPending
                  ? "교환 제안 중..."
                  : "포토카드 교환하기"}
              </button>
            </div>
          )}

          {purchaseMutation.isPending && (
            <p className="typo-14-regular mt-4 text-gray-200">
              구매 처리 중...
            </p>
          )}

          {deleteMutation.isPaused && (
            <p className="typo-14-regular mt-4 text-gray-200">
              판매 내리는 중...
            </p>
          )}
        </aside>
      </section>

      {isSeller && (
        <section className="mx-auto mt-20 max-w-[1200px]">
          <h2 className="typo-28-bold text-white">교환 제시 목록</h2>
          <div className="mt-4 h-px w-full bg-gray-200" />

          {isExchangesLoading ? (
            <p className="mt-10 text-gray-200">교환 제안 불러오는 중...</p>
          ) : exchanges.length === 0 ? (
            <p className="mt-10 text-gray-300">아직 교환 제안이 없습니다.</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {exchanges.map((exchange) => {
                const offeredCard = exchange.photocard;

                return (
                  <article
                    key={exchange.id}
                    className="border border-gray-500 bg-gray-500 p-5">
                    {offeredCard?.imageUrl && (
                      <img
                        src={offeredCard.imageUrl}
                        alt={offeredCard.name}
                        className="h-[180px] w-full object-cover"
                      />
                    )}

                    <h3 className="typo-18-bold mt-5 text-white">
                      {offeredCard?.name}
                    </h3>

                    <p className="typo-14-regular mt-2 text-gray-300">
                      {offeredCard.grade} | {offeredCard.genre} |{" "}
                      {exchange.offeredQuantity}장
                    </p>

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
                          exchange.statue !== "PENDING" ||
                          acceptExchangeMutation.isPending
                        }
                        className="h-[45px] flex-1 bg-main text-black disabled:opacity-50">
                        승인하기
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
