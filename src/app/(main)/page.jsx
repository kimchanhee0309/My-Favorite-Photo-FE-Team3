import PhotoCard from "@/common/components/PhotoCard/PhotoCard";

export default function page() {
  const mockCard = {
    title: "테스트 제목",
    grade: "COMMON",
    genre: "TRAVEL",
    description: "테스트 설명",
    pricePerUnit: 5,
    // quantity: 5,
    // remainingQuantity: 3,
    status: "ON_SALE",
    imageUrl: "/default.png",
    saleType: "SALE",
    quantityText: "3 / 5", //실제로는 quantity와 remainingQuantity활용해 작성
    quantityLabel: "잔여",
    // purchaseText: "4 P 에 구매",
  };
  return <PhotoCard card={mockCard} />;
}
