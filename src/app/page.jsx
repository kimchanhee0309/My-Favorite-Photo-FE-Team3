import PhotoCard from "@/common/components/PhotoCard/PhotoCard";

export default function page() {
  const mockCard = {
    title: "테스트 제목",
    grade: "COMMON",
    genre: "TRAVEL",
    description: "테스트 설명",
    pricePerUnit: 5,
    quantity: 5,
    remainingQuantity: 3,
    status: "SOLD_OUT",
    imageUrl: "/default.jpg",
  };
  return <PhotoCard card={mockCard} />;
}
