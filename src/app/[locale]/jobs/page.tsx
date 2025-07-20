"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import myAxios from "@/lib/myAxios";

interface Job {
	_id: string;
	title: string;
	// add other fields as needed
}
interface JobsResponse {
	jobs: Job[];
	total: number;
	page: number;
	limit: number;
}

const fetchJobs = async (page: number): Promise<JobsResponse> => {
	const res = await myAxios.get(`/jobs?page=${page}`);
	return res.data;
};

const deleteJob = async (id: string) => {
	const res = await myAxios.delete(`/jobs/${id}`);
	return res.data;
};

export default function JobsPage() {
	const [page, setPage] = useState(1);
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery<JobsResponse, Error>({
		queryKey: ["jobs", page],
		queryFn: () => fetchJobs(page),
		gcTime: 0,
		staleTime: 0,
		refetchOnWindowFocus: false,
		retry: 1,
	});
	const mutation = useMutation({
		mutationFn: deleteJob,
		onSuccess: () => {
			toast.success("Job deleted");
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
		},
		onError: () => toast.error("Failed to delete job"),
	});

	if (isLoading) return <div className="text-center py-8">Loading...</div>;
	if (error) return <div className="text-center text-red-500 py-8">Error loading jobs</div>;
	if (!data) return <div className="text-center py-8">No jobs found</div>;

	return (
		<div className="max-w-3xl mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Jobs</h1>
			</div>
			<ul className="space-y-4">
				{data.jobs.map((job) => (
					<li
						key={job._id}
						className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
					>
						<Link
							href={`/jobs/${job._id}`}
							className="font-medium text-blue-700 hover:underline"
						>
							{job.title}
						</Link>
					</li>
				))}
			</ul>
			<div className="flex justify-center items-center gap-4 mt-8">
				<button
					onClick={() => setPage((p) => Math.max(1, p - 1))}
					disabled={page === 1}
					className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
				>
					{"<"}
				</button>
				<span className="font-semibold"> {page}</span>
				<button
					onClick={() => setPage((p) => (data.jobs.length === data.limit ? p + 1 : p))}
					disabled={data.jobs.length < data.limit}
					className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
				>
					{">"}
				</button>
			</div>
		</div>
	);
}
