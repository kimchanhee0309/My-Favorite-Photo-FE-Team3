import Image from "next/image";

export default function RandomBoxButton({
  box,
  isFaded,
  isSubmitting,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={isSubmitting}
      onClick={onClick}
      className="flex h-[75.869px] w-[97.871px] shrink-0 cursor-pointer items-center justify-center transition-all duration-300 md:h-[127.111px] md:w-[164.672px] lg:h-[190.667px] lg:w-[245.96px]">
      <Image
        src={box.src}
        alt={box.alt}
        width={246}
        height={190}
        quality={100}
        className={[
          "h-auto w-24.5 object-contain transition-all duration-300 md:w-[165px] lg:w-61.5",
          !isFaded && "cursor-pointer hover:-translate-y-1 hover:scale-110",
          isFaded ? "scale-95 opacity-30 brightness-50" : "opacity-100",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </button>
  );
}
