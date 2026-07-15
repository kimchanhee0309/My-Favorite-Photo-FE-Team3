"use client";

import Image from "next/image";
import { PrimaryButton } from "..";

export default function BottomSheetFilter() {
  return (
    <div className="flex flex-col w-full border-none rounded-t-2xl bg-gray-500 px-2.5 py-4 h-120">
      <header className="flex items-center justify-center relative">
        <h2 className="text-[16px] text-gray-400 font-medium">필터</h2>
        <button className="absolute right-1">
          <Image src="/close.svg" width={13} height={13} alt="" />
        </button>
      </header>
      <ul className="flex px-6 gap-6">
        <li>
          <button className="px-4 py-4">등급</button>
        </li>
        <li>
          <button className="px-4 py-4">장르</button>
        </li>
        <li>
          <button className="px-4 py-4">매진 여부</button>
        </li>
      </ul>
      <ul className="flex flex-col">
        <li>
          <button className="px-8 py-4 flex justify-between w-full">
            <span>요소이름</span>
            <span>개수</span>
          </button>
        </li>
      </ul>
      <footer className="flex px-2 gap-3 w-full justify-between mt-auto mb-10">
        <button className="px-3.75 py-3.75">
          <Image src="/reset.svg" width={24} height={25} alt="" />
        </button>
        <PrimaryButton thickness="thin" size="S" className="flex-1 py-4.25">
          n개 포토보기
        </PrimaryButton>
      </footer>
    </div>
  );
}
