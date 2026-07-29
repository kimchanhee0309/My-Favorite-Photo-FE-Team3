import { apiClient } from "@/common/api/client";

function createQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function getMyOwnerships(params = {}) {
  const queryString = createQueryString(params);
  return apiClient(`/ownerships/me${queryString}`);
}

export function getMyOwnershipsCount() {
  return apiClient("/ownerships/me/count");
}

export function getOwnership(ownershipId) {
  return apiClient(`/ownerships/${ownershipId}`);
}
