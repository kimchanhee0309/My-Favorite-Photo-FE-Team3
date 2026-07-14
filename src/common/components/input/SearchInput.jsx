'use client';

import Image from 'next/image';

export default function SearchInput({ className = '', ...props }) {
  return (
    <div
      className={`flex h-[45px] w-[290px] items-center gap-[10px] rounded-sm border border-gray-200
        bg-black px-5 py-[11px] transition-colors
        md:w-[200px] lg:h-[50px] lg:w-[320px] lg:py-[13px]
        ${className}`}
    >
      <input
        type="text"
        className="typo-14-regular lg:typo-16-regular min-w-0 flex-1 bg-transparent text-white outline-none placeholder:font-light placeholder:text-gray-200"
        {...props}
      />
      <Image
        src="/search.png"
        alt=""
        width={24}
        height={24}
        className="h-[22px] w-[22px] shrink-0 lg:h-[24px] lg:w-[24px]"
      />
    </div>
  );
}
