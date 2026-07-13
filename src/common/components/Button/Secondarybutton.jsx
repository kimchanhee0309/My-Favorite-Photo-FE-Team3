// 사용법:
// 1) size가 고정이면 문자열로:
//    <SecondaryButton thickness="thin" size="M" className="w-[440px] h-[55px]">취소하기</SecondaryButton>
//
// 2) size가 화면 폭마다 다르면 객체로 (Figma에서 본 값 그대로):
//    <SecondaryButton
//      thickness="thick"
//      size={{ base: 'S', md: 'M', lg: 'L' }}
//      className="w-[345px] h-[75px] md:w-[342px] lg:w-[440px] lg:h-[80px]"
//    >
//      판매내리기
//    </SecondaryButton>
//
// width/height는 항상 className으로 직접 지정한다 (Figma 레이아웃 코드값 그대로).
// border-radius: 2px는 컴포넌트가 고정으로 책임진다.

const fontBySize = {
  thick: {
    S: 'typo-18-bold',
    M: 'typo-18-bold',
    L: 'typo-20-bold',
  },
  thin: {
    XS: 'typo-14-bold',
    S: 'typo-16-bold',
    M: 'typo-16-bold',
    L: 'typo-18-bold',
  },
};

function resolveFontClass(thickness, size) {
  const map = fontBySize[thickness];

  if (typeof size === 'string') {
    return map[size];
  }

  const { base, md, lg } = size;
  return [
    map[base],
    md ? `md:${map[md]}` : '',
    lg ? `lg:${map[lg]}` : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export default function SecondaryButton({
  thickness = 'thin',
  size = 'M',
  disabled,
  children,
  className = '',
  ...props
}) {
  const fontClass = resolveFontClass(thickness, size);
  const borderClass = thickness === 'thick' ? 'border-2' : 'border';

  return (
    <button
      disabled={disabled}
      className={`flex items-center justify-center rounded-sm transition-colors
        ${fontClass} ${borderClass}
        bg-black border-gray-100 text-white
        disabled:text-gray-300 disabled:border-gray-400
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}