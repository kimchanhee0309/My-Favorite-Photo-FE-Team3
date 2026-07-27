"use client";

import Image from "next/image";
import { PrimaryButton } from "..";
import { useState } from "react";
import { Drawer } from "vaul";
import {
  INITIAL_SELECTED_OPTIONS,
  optionTextMap,
  tabText,
  TAB_ORDER,
  TAB_RESET_TARGET,
} from "./BottomSheetFilter.constants";
import { gradeColor } from "../photocard/PhotoCard.constants";

export default function BottomSheetFilter({
  filterOptions,
  onClose,
  onFilter,
  isOpen,
}) {
  const orderedTabs = TAB_ORDER.filter((tab) => tab in filterOptions);
  const [selectedTab, setSelectedTab] = useState("grade");
  const [selectedOptions, setSelectedOptions] = useState(
    INITIAL_SELECTED_OPTIONS,
  );

  const toggleOption = (itemName) => {
    setSelectedOptions((prev) => {
      const currentList = prev[selectedTab];
      const nextList = currentList.includes(itemName) ? [] : [itemName];

      const next = { ...prev, [selectedTab]: nextList };

      const tabToReset = TAB_RESET_TARGET[selectedTab];
      if (tabToReset && nextList.length > 0) {
        next[tabToReset] = [];
      }

      return next;
    });
  };

  const getSelectedCount = () => {
    const hasSelection = Object.values(selectedOptions).some(
      (list) => list.length > 0,
    );
    if (!hasSelection) {
      return Object.values(filterOptions).reduce((acc, cur) => {
        const innerSum = cur.reduce((innerAcc, innercur) => {
          return innerAcc + innercur.count;
        }, 0);
        return acc + innerSum;
      }, 0);
    }

    return Object.keys(filterOptions).reduce((acc, tab) => {
      const tabSum = filterOptions[tab].reduce((innerAcc, item) => {
        return selectedOptions[tab]?.includes(item.name)
          ? innerAcc + item.count
          : innerAcc;
      }, 0);
      return acc + tabSum;
    }, 0);
  };

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedOptions(INITIAL_SELECTED_OPTIONS);
          onClose();
        }
      }}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 flex h-120 w-full flex-col rounded-t-2xl border-none bg-[#1B1B1B] px-2 py-4">
          <header className="relative flex items-center justify-center">
            <h2 className="text-[16px] font-medium text-gray-400">필터</h2>
            <button
              className="absolute right-1"
              onClick={() => {
                setSelectedOptions(INITIAL_SELECTED_OPTIONS);
                onClose();
              }}>
              <Image src="/close.svg" width={13} height={13} alt="" />
            </button>
          </header>
          <ul className="flex gap-6 px-6">
            {orderedTabs.map((tabName) => (
              <li key={tabName}>
                {selectedTab !== tabName ? (
                  <button
                    className="typo-14-regular px-4 py-4 text-gray-400"
                    onClick={() => setSelectedTab(tabName)}>
                    {tabText[tabName]}{" "}
                    {selectedOptions[tabName].length
                      ? selectedOptions[tabName].length
                      : ""}
                  </button>
                ) : (
                  <button
                    className="border-b border-white px-4 py-4 text-[14px] font-medium text-white"
                    onClick={() => setSelectedTab(tabName)}>
                    {tabText[tabName]}{" "}
                    {selectedOptions[tabName].length
                      ? selectedOptions[tabName].length
                      : ""}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <ul className="flex flex-1 flex-col overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent">
            {filterOptions[selectedTab].map((item) => {
              const isSelected = selectedOptions[selectedTab].includes(
                item.name,
              );
              const selectedTextClass = isSelected
                ? "text-white"
                : "text-gray-400";

              return (
                <li key={item.name}>
                  <button
                    className={`flex w-full justify-between px-8 py-4 ${isSelected && "bg-gray-500"}`}
                    onClick={() => toggleOption(item.name)}>
                    <span
                      className={`typo-14-regular ${
                        selectedTab === "grade"
                          ? gradeColor[item.name]
                          : selectedTextClass
                      }`}>
                      {optionTextMap[selectedTab]?.[item.name] ?? item.name}
                    </span>
                    <span className={`typo-14-regular ${selectedTextClass}`}>
                      {item.count}개
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <footer className="mt-auto mb-6 flex w-full justify-between gap-3 px-3">
            <button
              className="px-3.75 py-3.75"
              onClick={() => setSelectedOptions(INITIAL_SELECTED_OPTIONS)}>
              <Image src="/reset.svg" width={24} height={25} alt="" />
            </button>
            <PrimaryButton
              thickness="thin"
              size="S"
              className="flex-1 py-4.25"
              onClick={() => onFilter(selectedOptions)}>
              {getSelectedCount()}개 포토보기
            </PrimaryButton>
          </footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
