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

export function getShopListings(params = {}) {
  const queryString = createQueryString(params);

  return apiClient(`/shop-listings${queryString}`);
}

export function getMyShopListings(params = {}) {
  const queryString = createQueryString(params);

  return apiClient(`/shop-listings/me${queryString}`);
}

export function createShopListing(data) {
  return apiClient("/shop-listings", {
    method: "POST",
    body: JSON.stringify({
      ownershipId: data.ownershipId,
      quantity: Number(data.quantity),
      pricePerUnit: Number(data.pricePerUnit),
      wishGrade: data.wishGrade || undefined,
      wishGenre: data.wishGenre || undefined,
      wishDescription: data.wishDescription || undefined,
    }),
  });
}

export function getShopListing(shopListingId) {
  return apiClient(`/shop-listings/${shopListingId}`);
}

export function updateShopListing(shopListingId, data) {
  return apiClient(`/shop-listings/${shopListingId}`, {
    method: "PATCH",
    body: JSON.stringify({
      pricePerUnit: data.pricePerUnit ? Number(data.pricePerUnit) : undefined,
      wishGrade: data.wishGrade || undefined,
      wishGenre: data.wishGenre || undefined,
      wishDescription: data.wishDescription || undefined,
    }),
  });
}

export function deleteShopListing(shopListingId) {
  return apiClient(`/shop-listings/${shopListingId}`, {
    method: "DELETE",
  });
}

export function purchaseShopListing(shopListingId, data) {
  return apiClient(`/shop-listings/${shopListingId}/purchase`, {
    method: "POST",
    body: JSON.stringify({
      quantity: Number(data.quantity),
    }),
  });
}

export function getShopListingExchanges(shopListingId) {
  return apiClient(`/shop-listings/${shopListingId}/exchanges`);
}
