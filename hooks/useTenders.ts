import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { tendersApi, type Tender, type TendersResponse } from "@/lib/api";

export const useTenders = (
  params: {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    city?: string;
    organization?: string;
    category?: string;
  } = {},
  options?: UseQueryOptions<TendersResponse, Error>
) => {
  return useQuery({
    queryKey: ["tenders", params],
    queryFn: () => tendersApi.getTenders(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    ...options,
  });
};

export const useTender = (
  id: string,
  options?: UseQueryOptions<Tender, Error>
) => {
  return useQuery({
    queryKey: ["tender", id],
    queryFn: () => tendersApi.getTender(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    ...options,
  });
};
