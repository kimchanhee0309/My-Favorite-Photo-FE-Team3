import { cardStyle, genreText, gradeColor } from "./PhotoCard.constants";

export default function PhotoCardInfo({ title, grade, genre, description }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className={cardStyle.title}>{title}</p>
      <div className={`border-b border-gray-400 ${cardStyle.divider} ${cardStyle.dividerRow}`}>
        <div className="flex gap-2.5">
          <p className={`${cardStyle.labelLight} ${gradeColor[grade]}`}>
            {grade}
          </p>
          <p className={`text-gray-400 ${cardStyle.labelRegular}`}>|</p>
          <p className={`text-gray-300 ${cardStyle.labelRegular}`}>
            {genreText[genre]}
          </p>
        </div>
        <p
          className={`text-white ${cardStyle.labelRegular} underline underline-offset-2 decoration-0 truncate pl-2`}>
          {description}
        </p>
      </div>
    </div>
  );
}
