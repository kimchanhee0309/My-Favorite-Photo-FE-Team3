import NotificationList from "./NotificationList";

export default function MobileNotificationOverlay({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-20 bottom-0 z-30 overflow-hidden bg-gray-500 md:hidden">
      <NotificationList
        variant="mobile"
        onItemClick={() => console.log("모바일 알림 클릭")}
      />
    </div>
  );
}
