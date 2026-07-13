import { apiClient } from "@/common/api/client";

export function createExchangeOffer(shopListingId, data) {
  return apiClient(`/shop-listings/${shopListingId}/exchanges`, {
    method: "POST",
    body: JSON.stringify({
      photocardId: data.photocardId,
      offeredQuantity: Number(data.offeredQuantity || 1),
    }),
  });
}

export function getReceivedExchanges() {
  return apiClient("/exchanges/received");
}

export function getSentExchanges() {
  return apiClient("/exchanges/sent");
}

export function acceptExchange(exchangeId) {
  return apiClient(`/exchanges/${exchangeId}/accept`, {
    method: "PATCH",
  });
}

export function rejectExchange(exchangeId) {
  return apiClient(`/exchanges/${exchangeId}/reject`, {
    method: "PATCH",
  });
}
