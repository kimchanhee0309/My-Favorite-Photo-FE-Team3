const BASKIN_SINGLE = {
  62: 'text-[62px] tracking-[-1.86px] font-normal font-["BaskinRobbins"]',
  48: 'text-[48px] tracking-[-1.44px] font-normal font-["BaskinRobbins"]',
  46: 'text-[46px] tracking-[-1.38px] font-normal font-["BaskinRobbins"]',
  40: 'text-[40px] tracking-[-1.2px] font-normal font-["BaskinRobbins"]',
};

const NOTO_SINGLE = {
  40: 'text-[40px] tracking-normal font-bold font-["Noto_Sans_KR"]',
  32: 'text-[32px] tracking-normal font-bold font-["Noto_Sans_KR"]',
  28: 'text-[28px] tracking-normal font-bold font-["Noto_Sans_KR"]',
  24: 'text-[24px] tracking-normal font-bold font-["Noto_Sans_KR"]',
  22: 'text-[22px] tracking-normal font-bold font-["Noto_Sans_KR"]',
};

const BASKIN_RESPONSIVE_STYLE =
  'text-[40px] tracking-[-1.2px] font-normal font-["BaskinRobbins"] ' +
  'md:text-[48px] md:tracking-[-1.44px] md:font-normal md:font-["BaskinRobbins"] ' +
  'lg:text-[62px] lg:tracking-[-1.86px] lg:font-normal lg:font-["BaskinRobbins"]';

const NOTO_RESPONSIVE_STYLE =
  'text-[24px] tracking-normal font-bold font-["Noto_Sans_KR"] ' +
  'md:text-[32px] md:tracking-normal md:font-bold md:font-["Noto_Sans_KR"] ' +
  'lg:text-[40px] lg:tracking-normal lg:font-bold lg:font-["Noto_Sans_KR"]';

const BASE_BORDER = "border-b-2 border-gray-100 w-full";

const BORDER_SINGLE = {
  1480: `${BASE_BORDER} pb-[20px] mb-[20px] max-w-[1480px]`,
  920: `${BASE_BORDER} pb-[20px] mb-[20px] max-w-[920px]`,
  704: `${BASE_BORDER} pb-[20px] mb-[20px] max-w-[704px]`,
  345: `${BASE_BORDER} pb-[10px] mb-[10px] max-w-[345px]`,
};

const BORDER_RESPONSIVE =
  `${BASE_BORDER} pb-[10px] mb-[10px] max-w-full ` +
  `md:pb-[20px] md:mb-[20px] md:max-w-full ` +
  `lg:max-w-[1480px]`;

export default function Title({
  size = "40",
  variant = "1480",
  isBaskin = false,
  rightElement,
  className = "",
  titleClassName = "",
  children,
  ...props
}) {
  let fontClass = "";
  if (size === "responsive") {
    fontClass = isBaskin ? BASKIN_RESPONSIVE_STYLE : NOTO_RESPONSIVE_STYLE;
  } else {
    const singleMap = isBaskin ? BASKIN_SINGLE : NOTO_SINGLE;
    const fallbackSize = isBaskin ? "48" : "32";
    fontClass = singleMap[size] || singleMap[fallbackSize];
  }

  const borderClass =
    variant === "responsive"
      ? BORDER_RESPONSIVE
      : BORDER_SINGLE[variant] || BORDER_SINGLE["1480"];

  return (
    <div className={`${borderClass} ${className}`} {...props}>
      <div className="flex items-center justify-between w-full gap-5">
        <h2 className={`text-white m-0 leading-none ${fontClass} ${titleClassName}`}>
          {children}
        </h2>

        {rightElement && (
          <div className="flex-shrink-0 flex items-center justify-end">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
