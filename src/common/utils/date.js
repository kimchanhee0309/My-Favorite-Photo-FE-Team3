export function formatNotificationDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // 밀리초를 분, 시간, 일 단위로 변환
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return diffMinutes <= 0 ? "방금 전" : `${diffMinutes}분 전`;
  }

  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  if (diffDays < 7) {
    return `${diffDays}일 전`;
  }

  if (diffDays < 28) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}주일 전`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths === 0 ? 1 : diffMonths}개월 전`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears}년 전`;
}
