import GradeBadge from '@/features/photocard/components/GradeBadge';
import PriceInfo from './PriceInfo';

export default function CardInfo({ grade, genre, nickname, description, pricePerUnit, remainingQuantity, quantity, className = '' }) {
  return (
    <div className={`flex flex-col items-start gap-[30px] ${className}`}>
      <GradeBadge grade={grade} genre={genre} nickname={nickname} className="w-full" />
      <div className="h-px w-full bg-gray-400" />
      <p className="typo-16-regular lg:typo-18-regular text-gray-200">{description}</p>
      <div className="h-px w-full bg-gray-400" />
      <PriceInfo pricePerUnit={pricePerUnit} remainingQuantity={remainingQuantity} quantity={quantity} className="w-full" />
    </div>
  );
}