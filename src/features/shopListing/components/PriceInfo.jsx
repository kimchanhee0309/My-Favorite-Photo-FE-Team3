export default function PriceInfo({ pricePerUnit, remainingQuantity, quantity, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="typo-18-regular lg:typo-20-regular text-gray-300">가격</span>
        <span className="typo-20-bold lg:typo-24-regular lg:font-bold text-white">
          {pricePerUnit}P
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="typo-18-regular lg:typo-20-regular text-gray-300">잔여</span>
        <span>
          <span className="typo-20-bold lg:typo-24-regular lg:font-bold text-white">
            {remainingQuantity}
          </span>
          <span className="typo-20-regular lg:typo-24-regular text-gray-300">
            /{quantity}
          </span>
        </span>
      </div>
    </div>
  );
}