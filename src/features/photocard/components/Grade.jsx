import React from "react";

const GRADE_STYLES = {
  common: "border-main text-main",
  rare: "border-blue text-blue",
  super_rare: "border-purple text-purple",
  legendary: "border-pink text-pink",
};

const GRADE_LABELS = {
  common: "COMMON",
  rare: "RARE",
  super_rare: "SUPER RARE",
  legendary: "LEGENDARY",
};

const BASE_SIZE_STYLES =
  "h-[30px] px-2.5 py-1.5 gap-[5px] border typo-12-light";
const TABLET_SIZE_STYLES =
  "md:h-[32px] md:px-2.5 md:py-1.5 md:gap-[5px] md:typo-14-light";
const DESKTOP_SIZE_STYLES =
  "lg:h-[40px] lg:px-5 lg:py-2 lg:gap-2.5 lg:typo-16-light";

const SIZE_STYLES = `${BASE_SIZE_STYLES} ${TABLET_SIZE_STYLES} ${DESKTOP_SIZE_STYLES}`;

export default function Grade({ type = "common", count = 0 }) {
  const currentStyle = GRADE_STYLES[type];
  const currentLabel = GRADE_LABELS[type];

  return (
    <div
      className={`inline-flex items-center justify-center bg-transparent uppercase tracking-wide ${SIZE_STYLES} ${currentStyle}`}>
      <span>{currentLabel}</span>
      <span>{count}장</span>
    </div>
  );
}
