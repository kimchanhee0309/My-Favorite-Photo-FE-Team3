// 사용법:
// 1) size가 화면 폭과 무관하게 고정이면 문자열로:
//    <PrimaryButton thickness="thin" size="M" className="w-[440px] h-[55px]">확인</PrimaryButton>
//
// 2) size가 화면 폭마다 다르면 객체로 (Figma에서 본 값 그대로):
//    <PrimaryButton
//      thickness="thin"
//      size={{ base: 'S', md: 'M', lg: 'L' }}
//      className="w-[345px] h-[55px] md:w-[440px] lg:w-[520px] lg:h-[60px]"
//    >
//      로그인
//    </PrimaryButton>
//
// width/height는 항상 className으로 직접 지정한다 (Figma 레이아웃 코드값 그대로).
// border-radius: 2px, 색상(default/disabled)은 컴포넌트가 고정으로 책임진다.

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

  // size가 문자열이면 고정 폰트 클래스 하나만 반환
  if (typeof size === 'string') {
    return map[size];
  }

  // size가 객체({ base, md, lg })면 브레이크포인트별 폰트 클래스를 조합
  const { base, md, lg } = size;
  return [
    map[base],
    md ? `md:${map[md]}` : '',
    lg ? `lg:${map[lg]}` : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export default function PrimaryButton({
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
      className={`flex items-center justify-center rounded-xs transition-colors
        ${fontClass} ${borderClass}
        ${disabled
          ? 'bg-gray-400 border-gray-400 text-gray-300'
          : 'bg-main border-main text-black'}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
