import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPhotocard,
  getMyPhotocards,
  getPhotocard,
} from "./photocard.api";

export const PHOTOCARD_QUERY_KEYS = {
  all: ["photocards"],
  myList: (params) => ["photocards", "me", params],
  detail: (photocardId) => ["photocards", "detail", photocardId],
};

export function useCreatePhotocard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPhotocard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTOCARD_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["ownerships"] });
    },
  });
}

export function useMyPhotocards(params = {}) {
  return useQuery({
    queryKey: PHOTOCARD_QUERY_KEYS.myList(params),
    queryFn: () => getMyPhotocards(params),
  });
}

export function usePhotocard(photocardId) {
  return useQuery({
    queryKey: PHOTOCARD_QUERY_KEYS.detail(photocardId),
    queryFn: () => getPhotocard(photocardId),
    enabled: Boolean(photocardId),
  });
}