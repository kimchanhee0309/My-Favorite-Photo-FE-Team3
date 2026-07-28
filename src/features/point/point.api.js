import { apiClient } from "@/common/api/client";

export async function getPointInfo() {
  const response = await apiClient("/points/me");
  return response.data;
}

export async function claimRandomBox() {
  const response = await apiClient("/points/random-box", {
    method: "POST",
  });
  return response.data;
}
