import { apiClient } from "@/common/api/client";

export async function getNotifications() {
  return apiClient(`/notifications`);
}

export async function markAllAsRead() {
  return apiClient(`/notifications/read-all`, { method: "PATCH" });
}

export async function markAsRead(notificationId) {
  return apiClient(`/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
}
