"use client";

import { useId } from "react";

export default function Textarea({
  label,
  error,
  disabled,
  className = "",
  id,
  ...props
}) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-[10px]">
      {label && (
        <label
          htmlFor={textareaId}
          className="typo-16-regular lg:typo-20-regular text-white">
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        disabled={disabled}
        className={`w-[345px] resize-none rounded-xs border bg-gray-500 px-3 py-5 
          transition-colors md:w-[440px] lg:w-[520px] h-[180px]
          typo-14-light lg:typo-16-light text-white outline-none 
          placeholder:text-gray-200 disabled:cursor-not-allowed
          ${error ? "border-red" : "border-gray-200"}
          ${disabled ? "opacity-40" : ""}
          ${className}`}
        {...props}
      />

      {error && (
        <p className="typo-14-light lg:typo-16-light text-red">{error}</p>
      )}
    </div>
  );
}
