"use client";

import Image from "next/image";
import { useId, useState, useRef, useEffect } from "react";

export default function SelectInput({
  label,
  error,
  disabled,
  className = "",
  id,
  options = [],
  value,
  onChange,
  placeholder = "선택해 주세요",
}) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    if (onChange) onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-[10px]" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="typo-16-regular lg:typo-20-regular text-white">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          id={selectId}
          type="button"
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          disabled={disabled}
          className={`flex h-[55px] w-[345px] items-center justify-between rounded-sm border bg-black px-5 
            py-[18px] transition-colors md:w-[440px] lg:h-[60px] lg:w-[520px] text-left
            ${error ? "border-red" : "border-gray-200"}
            ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
            ${className}`}>
          <span
            className={`typo-14-light lg:typo-16-light truncate ${
              value ? "text-white" : "text-gray-200"
            }`}>
            {value || placeholder}
          </span>

          <Image
            src={isOpen ? "/arrow-up.png" : "/arrow-down.png"}
            alt={isOpen ? "목록 닫기" : "목록 열기"}
            width={24}
            height={24}
            className="h-[22px] w-[22px] shrink-0 lg:h-[24px] lg:w-[24px]"
          />
        </button>

        {isOpen && (
          <ul
            className="absolute left-0 top-[calc(100%+4px)] z-50 max-h-[360px] w-full overflow-y-auto 
            rounded-sm border border-gray-200 bg-black shadow-lg">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="cursor-pointer px-5 py-4 typo-14-light lg:typo-16-light text-white 
                transition-colors hover:bg-gray-500">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p className="typo-14-light lg:typo-16-light text-red">{error}</p>
      )}
    </div>
  );
}
