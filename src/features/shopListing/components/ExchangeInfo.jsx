import Image from 'next/image';
import GradeBadge from '@/features/photocard/components/GradeBadge';

export default function ExchangeInfo({ grade, genre, description, className = '' }) {
  return (
    <div className={`flex flex-col items-start gap-[30px] ${className}`}>
      <div className="flex w-full flex-col gap-[10px]">
        <div className="flex items-center gap-2">
          <Image
            src="/exchange.png"
            alt=""
            width={28}
            height={28}
            className="h-[22px] w-[22px] lg:h-[28px] lg:w-[28px]"
          />
          <span className="typo-22-bold lg:typo-28-bold text-white">
            교환 희망 정보
          </span>
        </div>
        <div className="h-[2px] w-full bg-gray-100" />
      </div>

      <div className="flex w-full flex-col items-start gap-[10px]">
        <GradeBadge grade={grade} genre={genre} className="w-full" />
        <p className="typo-16-regular lg:typo-18-regular text-gray-200">
          {description}
        </p>
      </div>
    </div>
  );
}