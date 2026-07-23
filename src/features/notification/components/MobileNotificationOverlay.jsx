"use client";
import { useRouter } from "next/navigation";
import NotificationList from "./NotificationList";

export default function MobileNotificationOverlay({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  //TODO: 알림 클릭시 상세 페이지 라우팅되도록 API 구현 후 연결
  return (
    <div className="fixed inset-x-0 top-20 bottom-0 z-30 overflow-hidden bg-gray-500 md:hidden">
      <NotificationList
        variant="mobile"
        onItemClick={(targetUrl) => {
          if (targetUrl) {
            router.replace(targetUrl);
          } else {
            onClose();
          }
        }}
      />
    </div>
  );
}
