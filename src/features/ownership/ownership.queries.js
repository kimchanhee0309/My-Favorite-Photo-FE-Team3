import { useQuery } from "@tanstack/react-query";
import {
  getMyOwnerships,
  getMyOwnershipsCount,
  getOwnership,
} from "./ownership.api";

export const OWNERSHIP_QUERY_KEYS = {
  all: ["ownerships"],
  myList: (params) => ["ownerships", "me", params],
  myCount: ["ownerships", "me", "count"],
  detail: (ownershipId) => ["ownerships", "detail", ownershipId],
};

export function useMyOwnerships(params = {}) {
  return useQuery({
    queryKey: OWNERSHIP_QUERY_KEYS.myList(params),
    queryFn: () => getMyOwnerships(params),
  });
}

export function useMyOwnershipsCount() {
  return useQuery({
    queryKey: OWNERSHIP_QUERY_KEYS.myCount,
    queryFn: getMyOwnershipsCount,
  });
}

export function useOwnership(ownershipId) {
  return useQuery({
    queryKey: OWNERSHIP_QUERY_KEYS.detail(ownershipId),
    queryFn: () => getOwnership(ownershipId),
    enabled: Boolean(ownershipId),
  });
}
