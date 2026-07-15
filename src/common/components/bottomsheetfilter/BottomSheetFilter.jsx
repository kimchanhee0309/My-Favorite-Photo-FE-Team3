"use client";

import Image from "next/image";
import { PrimaryButton } from "..";
import { useState } from "react";
import {
  INITIAL_SELECTED_OPTIONS,
  optionTextMap,
  tabText,
  TAB_ORDER,
} from "./BottomSheetFilter.constants";
import { gradeColor } from "../photocard/PhotoCard.constants";

export default function BottomSheetFilter({ filterOptions }) {
  const orderedTabs = TAB_ORDER.filter((tab) => tab in filterOptions);
  const [selectedTab, setSelectedTab] = useState("grade");
  const [selectedOptions, setSelectedOptions] = useState(
    INITIAL_SELECTED_OPTIONS,
  );

  const toggleOption = (itemName) => {
    setSelectedOptions((prev) => {
      const currentList = prev[selectedTab];
      const nextList = currentList.includes(itemName)
        ? currentList.filter((name) => name !== itemName)
        : [...currentList, itemName];
      return { ...INITIAL_SELECTED_OPTIONS, [selectedTab]: nextList };
    });
  };

  return (
    <div className="flex flex-col w-full border-none rounded-t-2xl bg-[#1B1B1B] px-2 py-4 h-120">
      <header className="flex items-center justify-center relative">
        <h2 className="text-[16px] text-gray-400 font-medium">필터</h2>
        <button className="absolute right-1">
          <Image src="/close.svg" width={13} height={13} alt="" />
        </button>
      </header>
      <ul className="flex px-6 gap-6">
        {orderedTabs.map((tabName) => (
          <li key={tabName}>
            {selectedTab !== tabName ? (
              <button
                className="px-4 py-4 typo-14-regular text-gray-400 "
                onClick={() => setSelectedTab(tabName)}>
                {tabText[tabName]}{" "}
                {!!selectedOptions[tabName].length &&
                  selectedOptions[tabName].length}
              </button>
            ) : (
              <button
                className="px-4 py-4 text-[14px] font-medium text-white border-b border-white"
                onClick={() => setSelectedTab(tabName)}>
                {tabText[tabName]}{" "}
                {!!selectedOptions[tabName].length &&
                  selectedOptions[tabName].length}
              </button>
            )}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {filterOptions[selectedTab].map((item) => (
          <li key={item.name}>
            <button
              className={`px-8 py-4 flex justify-between w-full ${selectedOptions[selectedTab].includes(item.name) && "bg-gray-500"}`}
              onClick={() => toggleOption(item.name)}>
              <span
                className={`${selectedTab === "grade" && gradeColor[item.name]} typo-14-regular`}>
                {optionTextMap[selectedTab]?.[item.name] ?? item.name}
              </span>
              <span>{item.count}개</span>
            </button>
          </li>
        ))}
      </ul>
      <footer className="flex px-3 gap-3 w-full justify-between mt-auto mb-6">
        <button
          className="px-3.75 py-3.75"
          onClick={() => setSelectedOptions(INITIAL_SELECTED_OPTIONS)}>
          <Image src="/reset.svg" width={24} height={25} alt="" />
        </button>
        <PrimaryButton thickness="thin" size="S" className="flex-1 py-4.25">
          n개 포토보기
        </PrimaryButton>
      </footer>
    </div>
  );
}
