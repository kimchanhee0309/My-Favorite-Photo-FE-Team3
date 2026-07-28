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

export function createPhotocard(data) {
  return apiClient("/photocards", {
    method: "POST",
    body: JSON.stringify({
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      genre: data.genre,
      grade: data.grade,
      minPrice: Number(data.minPrice),
      totalQuantity: Number(data.totalQuantity),
    }),
  });
}

export function getMyPhotocards(params = {}) {
  const queryString = createQueryString(params);
  return apiClient(`/photocards/me${queryString}`);
}

export function getPhotocard(photocardId) {
  return apiClient(`/photocards/${photocardId}`);
}
