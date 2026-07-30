import { cardStyle, genreText, gradeColor } from "./PhotoCard.constants";

export default function PhotoCardInfo({
  title,
  grade,
  genre,
  nickname,
  style = cardStyle,
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className={`${style.title} truncate`}>{title}</p>
      <div
        className={`border-b border-gray-400 ${style.divider} ${style.dividerRow}`}>
        <div className="flex gap-2.5">
          <p className={`${style.labelLight} ${gradeColor[grade]}`}>
            {grade === "SUPER_RARE" ? "SUPER RARE" : grade}
          </p>
          <p className={`text-gray-400 ${style.labelRegular}`}>|</p>
          <p className={`text-gray-300 ${style.labelRegular}`}>
            {genreText[genre]}
          </p>
        </div>
        <p
          className={`text-white ${style.labelRegular} truncate pl-2 underline decoration-0 underline-offset-2`}>
          {nickname}
        </p>
      </div>
    </div>
  );
}
