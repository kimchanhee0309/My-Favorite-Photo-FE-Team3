import Image from 'next/image';
import GradeCardBadge from '@/features/photocard/components/GradeCardBadge';

export default function ExchangeOfferCard({
  imageUrl,
  title,
  grade,
  genre,
  minPrice,
  nickname,
  description,
  className = '',
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="relative h-[112px] w-[150px] md:h-[227px] md:w-[302px] lg:h-[270px] lg:w-[360px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-xs object-cover"
        />
      </div>

      <p className="typo-14-bold md:typo-22-bold mt-[5px] text-white md:mt-[10px]">
        {title}
      </p>

      <GradeCardBadge
        grade={grade}
        genre={genre}
        minPrice={minPrice}
        nickname={nickname}
        className="mt-[5px] md:mt-[10px]"
      />

      <div className="mt-[10px] h-px w-full bg-gray-400 md:mt-[20px]" />

      <p className="typo-10-regular md:typo-16-regular mt-[10px] text-white md:mt-[20px]">
        {description}
      </p>
    </div>
  );
}