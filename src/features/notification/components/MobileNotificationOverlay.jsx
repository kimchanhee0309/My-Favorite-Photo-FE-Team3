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
