// TODO: API 연결 후 이 더미 데이터 삭제
const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    message: "기며누님이 [RARE | 우리집 앞마당]을 1장 구매했습니다.",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: 2,
    message:
      "예진쓰님이 [COMMON | 스페인 여행]의 포토카드 교환을 제안했습니다.",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: 3,
    message: "[LEGENDARY | 우리집 앞마당]이 품절되었습니다.",
    time: "1일 전",
    isRead: true,
  },
  {
    id: 4,
    message: "[RARE | How Far I’ll Go] 3장을 성공적으로 구매했습니다.",
    time: "1시간 전",
    isRead: true,
  },
  {
    id: 5,
    message:
      "예진쓰님과의 [COMMON] | 스페인 여행]의 포토카드 교환이 성사되었습니다.",
    time: "1시간 전",
    isRead: true,
  },
  {
    id: 6,
    message:
      "소차니님과의 [COMMON] | 기아 타이거즈]의 포토카드 교환이 성사되었습니다.",
    time: "1시간 전",
    isRead: true,
  },
  {
    id: 7,
    message:
      "소차니님과의 [COMMON] | 기아 타이거즈2]의 포토카드 교환이 성사되었습니다.",
    time: "1시간 전",
    isRead: true,
  },
  {
    id: 8,
    message:
      "소차니님과의 [COMMON] | 기아 타이거즈3]의 포토카드 교환이 성사되었습니다.",
    time: "1시간 전",
    isRead: true,
  },
];

// const DUMMY_NOTIFICATIONS = [];

export default function NotificationList({ onItemClick, variant = "desktop" }) {
  const notificationItems = DUMMY_NOTIFICATIONS;
  const isMobile = variant === "mobile";

  return (
    <div
      className={`flex flex-col overflow-hidden bg-black md:bg-gray-500 ${
        isMobile ? "h-full w-full rounded-none" : "h-[535px] w-75 rounded-xs"
      }`}>
      {notificationItems.length === 0 ? (
        <div className="typo-14-light flex flex-1 items-center justify-center py-12 text-gray-300">
          새로운 알림이 없습니다.
        </div>
      ) : (
        <ul className="flex min-h-0 flex-1 scrollbar-none flex-col overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {notificationItems.map((item) => (
            <li
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className={`flex w-full shrink-0 cursor-pointer flex-col items-start justify-center rounded-t-xs border-b border-gray-400 p-5 transition-colors ${
                item.isRead ? "" : "bg-white/5"
              }`}>
              <div
                className={`flex w-full flex-col items-start gap-2.5 ${isMobile ? "" : "h-[67px]"}`}>
                <p
                  className={`typo-14-light text-left ${isMobile ? "" : "line-clamp-2"} ${item.isRead ? "text-gray-300" : "text-white"}`}>
                  {item.message}
                </p>
                <span className="typo-12-light text-gray-300">{item.time}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
