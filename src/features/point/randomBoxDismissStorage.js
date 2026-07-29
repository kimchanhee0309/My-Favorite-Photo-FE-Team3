import { STORAGE_KEY_PREFIX } from "./constants";

function getKey(userId) {
  return `${STORAGE_KEY_PREFIX}:${userId}`;
}

export function isDismissedForCycle(userId, lastBoxClaimedAt) {
  if (typeof window === "undefined" || !userId) return false;

  const dismissedAt = localStorage.getItem(getKey(userId));
  return dismissedAt === String(lastBoxClaimedAt);
}

export function markDismissedForCycle(userId, lastBoxClaimedAt) {
  if (typeof window === "undefined" || !userId) return;

  localStorage.setItem(getKey(userId), String(lastBoxClaimedAt));
}
