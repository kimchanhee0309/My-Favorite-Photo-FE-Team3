import GradeCard from "./GradeCard";
import { genreLabelMap } from "./genreLabelMap";

export default function GradeCardBadge({
  grade,
  genre,
  minPrice,
  nickname,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col gap-[5px] lg:flex-row lg:items-center lg:gap-2.5 ${className}`}>
      <div className="flex items-center gap-2.5">
        <GradeCard grade={grade} size={{ base: "S", md: "L" }} />
        <span className="typo-10-regular md:typo-16-regular text-gray-400">
          |
        </span>
        <span className="typo-10-regular md:typo-16-regular text-gray-300">
          {genreLabelMap[genre]}
        </span>
        <span className="typo-16-regular hidden text-gray-400 lg:inline">
          |
        </span>
      </div>

      <div className="flex items-center justify-between lg:flex-1">
        <span className="flex items-center gap-[5px]">
          <span className="typo-10-regular md:typo-16-regular text-white">
            {minPrice} P
          </span>
          <span className="typo-10-regular md:typo-16-regular text-gray-300">
            에 구매
          </span>
        </span>
        {nickname && (
          <span className="typo-10-regular md:typo-16-regular text-white underline">
            {nickname}
          </span>
        )}
      </div>
    </div>
  );
}
