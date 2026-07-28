"use client";

import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "@/features/notification/notification.api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children, userId }) {
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await getNotifications();
      const notificationList = response?.data?.notifications || [];

      setNotifications(notificationList);
      setHasUnread(
        notificationList.some((notification) => !notification.isRead),
      );
    } catch (error) {
      console.error("알림 목록 조회 실패:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    fetchNotifications();

    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userId, fetchNotifications]);

  async function handleRead(id) {
    const targetNotification = notifications.find(
      (notification) => notification.id === id,
    );
    if (targetNotification?.isRead) return;

    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? {
            ...notification,
            isRead: true,
          }
        : notification,
    );
    setNotifications(updatedNotifications);
    setHasUnread(
      updatedNotifications.some((notification) => !notification.isRead),
    );

    try {
      await markAsRead(id);
    } catch (error) {
      console.error("읽음 처리 실패:", error);
      fetchNotifications();
    }
  }

  async function handleReadAll() {
    if (!hasUnread) return;

    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
    setHasUnread(false);

    try {
      await markAllAsRead();
    } catch (error) {
      console.error("전체 읽음 처리 실패:", error);
      fetchNotifications();
    }
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, hasUnread, handleRead, handleReadAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification은 NotificationProvider 안에서 사용해야 합니다.",
    );
  }
  return context;
}
