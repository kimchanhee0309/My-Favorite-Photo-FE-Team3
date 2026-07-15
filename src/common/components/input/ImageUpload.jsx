"use client";

import { useId, useRef, useState } from "react";

export default function ImageUpload({
  label = "이미지 업로드",
  error,
  disabled,
  className = "",
  id,
  onChange,
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (onChange) onChange(file);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onChange) onChange(null);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {label && (
        <label className="typo-16-regular lg:typo-20-regular text-white">
          {label}
        </label>
      )}

      <div className={`flex items-center gap-[10px] ${className}`}>
        <div
          className={`flex h-[55px] flex-1 items-center justify-between rounded-sm border bg-black px-5 
            transition-colors md:w-[330px] lg:h-[60px] lg:w-[370px]
            ${error ? "border-red" : "border-gray-200"}
            ${disabled ? "opacity-40" : ""}`}>
          <span
            className={`typo-14-light lg:typo-16-light truncate ${
              fileName ? "text-white" : "text-gray-200"
            }`}>
            {fileName || "이미지 업로드"}
          </span>

          {fileName && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-200 hover:text-white typo-16-light shrink-0 ml-2">
              X
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled}
          className={`h-[55px] shrink-0 rounded-sm border border-main bg-black px-4 
            typo-14-regular lg:typo-16-regular text-main transition-colors hover:bg-main/10
            md:w-[100px] lg:h-[60px] lg:w-[140px]
            ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}>
          파일 선택
        </button>
      </div>

      <input
        type="file"
        id={inputId}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {error && (
        <p className="typo-14-light lg:typo-16-light text-red">{error}</p>
      )}
    </div>
  );
}
