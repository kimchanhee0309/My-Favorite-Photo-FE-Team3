import { cardStyle, genreText, gradeColor } from "./PhotoCard.constants";

export default function PhotoCardHeader({ card }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className={cardStyle.title}>{card.title}</p>
      <div
        className={`border-b border-gray-400 ${cardStyle.divider} ${card.purchaseText ? cardStyle.dividerRowWithPurchase : cardStyle.dividerRow}`}>
        <div className="flex gap-2.5">
          <p className={`${cardStyle.labelLight} ${gradeColor[card.grade]}`}>
            {card.grade}
          </p>
          <p className={`text-gray-400 ${cardStyle.labelRegular}`}>|</p>
          <p className={`text-gray-300 ${cardStyle.labelRegular}`}>
            {genreText[card.genre]}
          </p>
          {card.purchaseText && (
            <>
              <p
                className={`hidden text-gray-400 lg:block ${cardStyle.labelRegular}`}>
                |
              </p>
              <p
                className={`hidden text-gray-300 lg:block ${cardStyle.labelRegular}`}>
                {card.purchaseText}
              </p>
            </>
          )}
        </div>
        {card.purchaseText ? (
          <div className="flex justify-between">
            <p className={`text-gray-300 lg:hidden ${cardStyle.labelRegular}`}>
              {card.purchaseText}
            </p>
            <p
              className={`text-white ${cardStyle.labelRegular} underline underline-offset-2 decoration-0 truncate pl-2`}>
              {card.description}
            </p>
          </div>
        ) : (
          <p
            className={`text-white ${cardStyle.labelRegular} underline underline-offset-2 decoration-0 truncate pl-2`}>
            {card.description}
          </p>
        )}
      </div>
    </div>
  );
}
