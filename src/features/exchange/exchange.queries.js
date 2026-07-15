import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptExchange,
  cancelExchange,
  createExchangeOffer,
  getReceivedExchanges,
  getSentExchanges,
  rejectExchange,
} from "./exchange.api";

import { SHOP_LISTING_QUERY_KEYS } from "../shopListing/shopListing.queries";

export const EXCHANGE_QUERY_KEYS = {
  all: ["exchanges"],
  sent: (params) => ["exchanges", "sent", params],
  received: (params) => ["exchanges", "received", params],
};

export function useSentExchanges(params) {
  return useQuery({
    queryKey: EXCHANGE_QUERY_KEYS.sent(params),
    queryFn: () => getSentExchanges(params),
  });
}

export function useReceivedExchanges(params) {
  return useQuery({
    queryKey: EXCHANGE_QUERY_KEYS.received(params),
    queryFn: () => getReceivedExchanges(params),
  });
}

export function useCreateExchangeOffer(shopListingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createExchangeOffer(shopListingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SHOP_LISTING_QUERY_KEYS.detail(shopListingId),
      });
      queryClient.invalidateQueries({ queryKey: EXCHANGE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useAcceptExchange(shopListingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptExchange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SHOP_LISTING_QUERY_KEYS.detail(shopListingId),
      });
      queryClient.invalidateQueries({
        queryKey: SHOP_LISTING_QUERY_KEYS.exchanges(shopListingId),
      });
      queryClient.invalidateQueries({ queryKey: EXCHANGE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["ownerships"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useRejectExchange(shopListingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectExchange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SHOP_LISTING_QUERY_KEYS.exchanges(shopListingId),
      });
      queryClient.invalidateQueries({ queryKey: EXCHANGE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useCancelExchange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelExchange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXCHANGE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
