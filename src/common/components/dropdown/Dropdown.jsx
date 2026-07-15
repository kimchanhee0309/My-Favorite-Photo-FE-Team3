"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Dropdown({
  variant = "sort",
  size = "L",
  options = [],
  value,
  onChange,
  onClick,
  placeholder = "선택",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (option) => {
    if (onChange) onChange(option);
    setIsOpen(false);
  };

  const handleTriggerClick = (e) => {
    if (options.length > 0) setIsOpen((prev) => !prev);
    if (onClick) onClick(e);
  };

  let triggerClasses = "transition-colors ";
  let textClasses = "whitespace-nowrap ";

  if (variant === "sort") {
    triggerClasses +=
      "flex items-center justify-between border border-gray-200 rounded-xs bg-black text-white ";
    if (size === "L") {
      triggerClasses += "w-[180px] h-[50px] px-5 py-[13px]";
      textClasses += "typo-16-regular";
    } else if (size === "M") {
      triggerClasses += "w-[140px] h-[45px] px-[15px] py-[10px]";
      textClasses += "typo-14-regular";
    } else if (size === "S") {
      triggerClasses += "w-[130px] h-[35px] px-[15px] py-[10px]";
      textClasses += "typo-12-regular";
    }
  } else if (variant === "text") {
    triggerClasses += "inline-flex items-center gap-[10px] ";
    textClasses += "text-gray-200  ";
    if (size === "L") textClasses += "typo-16-bold";
    else if (size === "M") textClasses += "typo-14-bold";
  } else if (variant === "icon") {
    triggerClasses +=
      "flex items-center justify-center w-[35px] h-[35px] border border-gray-200 rounded-xs bg-black";
  }

  const menuTopClass =
    variant === "text" ? "top-[calc(100%+18px)]" : "top-[calc(100%+4px)]";

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleTriggerClick}
        className={triggerClasses}>
        {variant === "icon" ? (
          <Image
            src="/filter.png"
            alt="필터"
            width={24}
            height={24}
            className="h-[24px] w-[24px]"
          />
        ) : (
          <>
            <span className={textClasses}>{value || placeholder}</span>
            <Image
              src={isOpen ? "/arrow-up.png" : "/arrow-down.png"}
              alt={isOpen ? "목록 닫기" : "목록 열기"}
              width={24}
              height={24}
              className="h-[24px] w-[24px] shrink-0"
            />
          </>
        )}
      </button>

      {isOpen && options.length > 0 && (
        <ul
          className={`absolute left-0 z-50 flex min-w-full flex-col items-start gap-[15px] 
          whitespace-nowrap rounded-xs border border-gray-200 bg-black px-5 py-[15px] shadow-lg ${menuTopClass}`}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="cursor-pointer text-[14px] text-white transition-colors hover:text-gray-200 lg:text-[16px]">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
