"use client";
import { useEffect, useMemo, useState } from "react";
import { ONEHOUR_IN_MS } from "./constants";

export default function usePointTimer(lastBoxClaimedAt) {
  const targetTime = lastBoxClaimedAt
    ? new Date(lastBoxClaimedAt).getTime() + ONEHOUR_IN_MS
    : null;

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!targetTime) return;
    if (Date.now() >= targetTime) return;

    const timerId = setInterval(() => {
      const currentNow = Date.now();
      setNow(currentNow);

      if (currentNow >= targetTime) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetTime]);

  const { canClaim, leftTimeFormatted } = useMemo(() => {
    if (!targetTime) {
      return { canClaim: true, leftTimeFormatted: "" };
    }

    const timeGap = targetTime - now;

    if (timeGap <= 0) {
      return { canClaim: true, leftTimeFormatted: "" };
    }

    const minutes = Math.floor(timeGap / 60000);
    const seconds = Math.floor((timeGap % 60000) / 1000);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return {
      canClaim: false,
      leftTimeFormatted: `${minutes}분 ${formattedSeconds}초`,
    };
  }, [targetTime, now]);

  return { canClaim, leftTimeFormatted };
}
