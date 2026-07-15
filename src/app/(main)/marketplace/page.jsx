"use client";

import SellerCard from "@/features/shopListing/components/SellerCard";

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-10">
      <SellerCard
        grade="LEGENDARY"
        genre="인물"
        nickname="cho-zzang"
        description="우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다. 우리집 앞마당 포토카드입니다."
        pricePerUnit={1000000}
        remainingQuantity={7}
        quantity={10}
        wishGrade="RARE"
        wishGenre="풍경"
        wishDescription="포근포근한 여름 풍경, 눈이 많이 내린 겨울 풍경 사진에 관심이 많습니다."
        onEdit={() => alert("수정하기 클릭")}
        onDelist={() => alert("판매 내리기 클릭")}
      />
    </div>
  );
}
