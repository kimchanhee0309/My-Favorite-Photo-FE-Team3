export default function PriceInfo({ price, remaining, total, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="typo-18-regular lg:typo-20-regular text-gray-300">가격</span>
        <span className="typo-20-bold lg:typo-24-regular lg:font-bold text-white">
          {price}P
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="typo-18-regular lg:typo-20-regular text-gray-300">잔여</span>
        <span>
          <span className="typo-20-bold lg:typo-24-regular lg:font-bold text-white">
            {remaining}
          </span>
          <span className="typo-20-regular lg:typo-24-regular text-gray-300">
            /{total}
          </span>
        </span>
      </div>
    </div>
  );
}