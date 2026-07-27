import { apiClient } from "@/common/api/client";

export function updateMyProfileApi(data) {
  return apiClient("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function getUserProfileApi(userId) {
  return apiClient(`/users/${userId}`, {
    method: "GET",
  });
}
