import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { jobsApi, type Job, type JobsResponse } from "@/lib/api";

export const useJobs = (
  params: {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    city?: string;
    organization?: string;
    category?: string;
    type?: string;
  } = {},
  options?: UseQueryOptions<JobsResponse, Error>
) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => jobsApi.getJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    ...options,
  });
};

export const useJob = (id: string, options?: UseQueryOptions<Job, Error>) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsApi.getJob(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    ...options,
  });
};

export const useRelatedJobs = (
  currentJob: Job,
  options?: UseQueryOptions<JobsResponse, Error>
) => {
  return useQuery({
    queryKey: [
      "relatedJobs",
      currentJob._id,
      currentJob.category,
      currentJob.location,
      currentJob.organization,
    ],
    queryFn: async () => {
      // First try to get jobs from the same category
      let relatedJobs = await jobsApi.getJobs({
        category: currentJob.category,
        limit: 6, // Get more to filter out current job
      });

      // Filter out the current job
      let filteredJobs = relatedJobs.jobs.filter(
        (job) => job._id !== currentJob._id
      );

      // If we don't have enough jobs from the same category, add jobs from the same city
      if (filteredJobs.length < 4) {
        const cityJobs = await jobsApi.getJobs({
          city: currentJob.location,
          limit: 6,
        });
        const cityFilteredJobs = cityJobs.jobs.filter(
          (job) =>
            job._id !== currentJob._id &&
            !filteredJobs.some((existingJob) => existingJob._id === job._id)
        );
        filteredJobs = [...filteredJobs, ...cityFilteredJobs];
      }

      // If still not enough, add jobs from the same organization
      if (filteredJobs.length < 4) {
        const orgJobs = await jobsApi.getJobs({
          organization: currentJob.organization,
          limit: 6,
        });
        const orgFilteredJobs = orgJobs.jobs.filter(
          (job) =>
            job._id !== currentJob._id &&
            !filteredJobs.some((existingJob) => existingJob._id === job._id)
        );
        filteredJobs = [...filteredJobs, ...orgFilteredJobs];
      }

      // Return only the first 4 jobs
      return {
        ...relatedJobs,
        jobs: filteredJobs.slice(0, 4),
        total: filteredJobs.length,
      };
    },
    enabled: !!currentJob._id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    ...options,
  });
};
