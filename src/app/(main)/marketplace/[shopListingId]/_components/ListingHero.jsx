import Image from "next/image";
import BuyerCard from "@/features/shopListing/components/BuyerCard";
import SellerCard from "@/features/shopListing/components/SellerCard";

export default function ListingHero({
  listing,
  isOwner,
  purchaseQuantity,
  onQuantityChange,
  onBuy,
  onEdit,
  onDelist,
}) {
  return (
    <div className="mt-[26px] flex flex-col items-center gap-20 md:mt-[48px] md:flex-row md:items-start md:justify-center lg:mt-[70px]">
      <div className="relative h-[259px] w-[345px] md:h-[257px] md:w-[342px] lg:h-[720px] lg:w-[960px]">
        <Image
          src={listing.imageUrl}
          alt={listing.name}
          fill
          className="rounded-xs object-cover"
        />
      </div>

      {isOwner ? (
        <SellerCard {...listing} onEdit={onEdit} onDelist={onDelist} />
      ) : (
        <BuyerCard
          {...listing}
          purchaseQuantity={purchaseQuantity}
          onQuantityChange={onQuantityChange}
          onBuy={onBuy}
        />
      )}
    </div>
  );
}