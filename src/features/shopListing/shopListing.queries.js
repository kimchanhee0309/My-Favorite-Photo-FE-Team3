import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createShopListing,
  deleteShopListing,
  getMyShopListings,
  getShopListing,
  getShopListingExchanges,
  getShopListings,
  purchaseShopListing,
  updateShopListing,
} from "./shopListing.api";

export const SHOP_LISTING_QUERY_KEYS = {
  all: ["shopListings"],
  list: (params) => ["shopListings", "list", params],
  myList: (params) => ["shopListings", "me", params],
  detail: (shopListingId) => ["shopListings", "detail", shopListingId],
  exchanges: (shopListingId) => [
    "shopListings",
    "detail",
    shopListingId,
    "exchanges",
  ],
};

export function useShopListings(params) {
  return useQuery({
    queryKey: SHOP_LISTING_QUERY_KEYS.list(params),
    queryFn: () => getShopListings(params),
  });
}

export function useMyShopListings(params) {
  return useQuery({
    queryKey: SHOP_LISTING_QUERY_KEYS.myList(params),
    queryFn: () => getMyShopListings(params),
  });
}

export function useShopListing(shopListingId) {
  return useQuery({
    queryKey: SHOP_LISTING_QUERY_KEYS.detail(shopListingId),
    queryFn: () => getShopListing(shopListingId),
    enabled: Boolean(shopListingId),
  });
}

export function useShopListingExchanges(shopListingId) {
  return useQuery({
    queryKey: SHOP_LISTING_QUERY_KEYS.exchanges(shopListingId),
    queryFn: () => getShopListingExchanges(shopListingId),
    enabled: Boolean(shopListingId),
  });
}

export function useCreateShopListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShopListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOP_LISTING_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["ownerships"] });
    },
  });
}

export function useUpdateShopListing(shopListingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateShopListing(shopListingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SHOP_LISTING_QUERY_KEYS.detail(shopListingId),
      });
      queryClient.invalidateQueries({ queryKey: SHOP_LISTING_QUERY_KEYS.all });
    },
  });
}

export function useDeleteShopListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteShopListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOP_LISTING_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["ownerships"] });
    },
  });
}

export function usePurchaseShopListing(shopListingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => purchaseShopListing(shopListingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SHOP_LISTING_QUERY_KEYS.detail(shopListingId),
      });
      queryClient.invalidateQueries({ queryKey: SHOP_LISTING_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["ownerships"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useInfiniteShopListings(params = {}) {
  return useInfiniteQuery({
    queryKey: ["shopListings", "infinite", params],
    queryFn: ({ pageParam }) =>
      getShopListings({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
  });
}

export function useInfiniteMyShopListings(params = {}) {
  return useInfiniteQuery({
    queryKey: ["shopListings", "my", "infinite", params],
    queryFn: ({ pageParam }) =>
      getMyShopListings({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
  });
}
