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

const SIZE_STYLES = `
  h-[30px] px-2.5 py-1.5 gap-1.25 border typo-12-light
  min-[744px]:h-[32px] min-[744px]:px-2.5 min-[744px]:py-1.5 min-[744px]:gap-1.25 min-[744px]:typo-14-light
  min-[1200px]:h-[40px] min-[1200px]:px-5 min-[1200px]:py-2 min-[1200px]:gap-2.5 min-[1200px]:typo-16-light
  `;

export default function Grade({ type, count = 0 }) {
  const currentStyle = GRADE_STYLES[type] || GRADE_STYLES.common;
  const currentLabel = GRADE_LABELS[type] || type;

  return (
    <div
      className={`inline-flex items-center justify-center bg-transparent uppercase tracking-wide ${SIZE_STYLES} ${currentStyle}`}>
      <span>{currentLabel}</span>
      <span>{count}장</span>
    </div>
  );
}
