"use client";
import { useRouter } from "next/navigation";
import NotificationList from "./NotificationList";

export default function MobileNotificationOverlay({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-20 bottom-0 z-30 overflow-hidden bg-gray-500 md:hidden">
      <NotificationList
        variant="mobile"
        onItemClick={(item) => {
          console.log("클릭한 알림 전체 데이터:", item);
          if (item?.targetId) {
            router.push(`/marketplace/${item.targetId}`);
          } else {
            console.log("이 알림에는 이동할 targetId가 없습니다!");
            onClose?.();
          }
        }}
      />
    </div>
  );
}
