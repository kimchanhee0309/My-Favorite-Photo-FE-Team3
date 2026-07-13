import { apiClient } from "@/common/api/client";

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
