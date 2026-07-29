"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Dropdown({
  variant = "sort",
  options = [],
  value,
  onChange,
  onClick,
  placeholder = "선택",
  className = "",
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

  const VARIANT_STYLES = {
    sort:
      "flex items-center justify-between border border-gray-200 rounded-xs bg-black text-white " +
      "w-[130px] h-[35px] px-3.5 py-2.5 " +
      "md:w-[140px] md:h-[45px] md:px-4 md:py-3 " +
      "lg:w-[180px] lg:h-[50px] lg:px-5 lg:py-3",
    text: "inline-flex items-center gap-2.5 text-gray-200",
    icon: "flex items-center justify-center w-9 h-9 border border-gray-200 rounded-xs bg-black",
  };

  const TEXT_STYLES = {
    sort: "typo-12-regular md:typo-14-regular lg:typo-16-regular",
    text: "typo-14-bold lg:typo-16-bold",
  };

  const baseClass = "transition-colors cursor-pointer outline-none";
  const variantClass = VARIANT_STYLES[variant] || "";
  const textClass = `whitespace-nowrap ${TEXT_STYLES[variant] || ""}`.trim();

  const triggerClasses = `${baseClass} ${variantClass} ${className}`.trim();

  const menuMarginClass = variant === "text" ? "mt-[18px]" : "mt-1";

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
            className="h-6 w-6"
          />
        ) : (
          <>
            <span className={textClass}>{value || placeholder}</span>
            <Image
              src={isOpen ? "/arrow-up.png" : "/arrow-down.png"}
              alt={isOpen ? "목록 닫기" : "목록 열기"}
              width={24}
              height={24}
              className="h-6 w-6 shrink-0"
            />
          </>
        )}
      </button>

      {isOpen && options.length > 0 && (
        <ul
          className={`absolute top-full left-0 z-50 flex min-w-full flex-col items-start gap-4 rounded-xs border border-gray-200 bg-black px-5 py-4 whitespace-nowrap shadow-lg ${menuMarginClass}`}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={`${TEXT_STYLES[variant]} w-full cursor-pointer text-left text-white transition-colors hover:text-gray-200`}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
