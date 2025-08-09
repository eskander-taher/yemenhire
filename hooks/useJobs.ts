import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { jobsApi, type Job, type JobsResponse } from "@/lib/api"

export const useJobs = (
  params: {
    page?: number
    limit?: number
    search?: string
    location?: string
    category?: string
    type?: string
  } = {},
  options?: UseQueryOptions<JobsResponse, Error>,
) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => jobsApi.getJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    ...options,
  })
}

export const useJob = (id: string, options?: UseQueryOptions<Job, Error>) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsApi.getJob(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    ...options,
  })
}
