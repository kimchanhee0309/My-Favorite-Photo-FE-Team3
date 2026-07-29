"use client";

import { useNotification } from "@/providers/NotificationProvider";
import { formatNotificationDate } from "@/common/utils/date";

export default function NotificationList({ onItemClick, variant = "desktop" }) {
  const { notifications, handleRead } = useNotification();
  const isMobile = variant === "mobile";

  return (
    <div
      className={`flex scrollbar-none flex-col overflow-hidden bg-black md:bg-gray-500 ${
        isMobile ? "h-full w-full rounded-none" : "h-[535px] w-75 rounded-xs"
      }`}>
      {notifications.length === 0 ? (
        <div className="typo-14-light flex flex-1 items-center justify-center py-12 text-gray-300">
          새로운 알림이 없습니다.
        </div>
      ) : (
        <ul className="flex min-h-0 flex-1 scrollbar-none flex-col overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {notifications.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                handleRead(item.id);
                onItemClick?.(item);
              }}
              className={`flex w-full shrink-0 cursor-pointer flex-col items-start justify-center rounded-t-xs border-b border-gray-400 p-5 transition-colors ${
                item.isRead ? "" : "bg-white/5"
              }`}>
              <div
                className={`flex w-full flex-col items-start gap-2.5 ${isMobile ? "" : "h-[67px]"}`}>
                <p
                  className={`typo-14-light text-left ${isMobile ? "" : "line-clamp-2"} ${item.isRead ? "text-gray-300" : "text-white"}`}>
                  {item.message}
                </p>
                <span className="typo-12-light text-gray-300">
                  {formatNotificationDate(item.createdAt || item.time)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
