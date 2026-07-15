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

export function createExchangeOffer(shopListingId, data) {
  return apiClient(`/shop-listings/${shopListingId}/exchanges`, {
    method: "POST",
    body: JSON.stringify({
      photocardId: data.photocardId,
      offeredQuantity: Number(data.offeredQuantity || 1),
    }),
  });
}

export function getReceivedExchanges(params = {}) {
  const queryString = createQueryString(params);

  return apiClient(`/exchanges/received${queryString}`);
}

export function getSentExchanges(params = {}) {
  const queryString = createQueryString(params);
  return apiClient(`/exchanges/sent${queryString}`);
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

export function cancelExchange(exchangeId) {
  return apiClient(`/exchanges/${exchangeId}/cancel`, {
    method: "PATCH",
  });
}
