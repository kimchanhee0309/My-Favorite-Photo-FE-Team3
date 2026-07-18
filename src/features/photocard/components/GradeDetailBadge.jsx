import GradeDetail from './GradeDetail';
import { genreLabelMap } from './genreLabelMap';

export default function GradeBadge({ grade, genre, nickname, className = '' }) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2.5 lg:gap-3.75">
        <GradeDetail grade={grade} size={{ base: 'S', lg: 'L' }} />
        <span className="typo-18-bold text-gray-400 lg:typo-24-regular lg:font-bold">|</span>
        <span className="typo-18-bold lg:typo-24-regular lg:font-bold text-gray-300">
          {genreLabelMap[genre]}
        </span>
      </div>

      {nickname && (
        <span className="typo-18-bold lg:typo-24-regular lg:font-bold text-white underline">
          {nickname}
        </span>
      )}
    </div>
  );
}