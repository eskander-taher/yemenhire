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

const fetchJobs = async (): Promise<JobsResponse> => {
	const res = await myAxios.get(`/jobs`);
	return res.data;
};

export default function JobsPage() {
	const { data, isLoading, error } = useQuery<JobsResponse, Error>({
		queryKey: ["jobs"],
		queryFn: () => fetchJobs(),
	});

	if (isLoading) return <div className="text-center py-8">Loading...</div>;
	if (error) return <div className="text-center text-red-500 py-8">Error loading jobs</div>;

	return (
		<div className="max-w-3xl mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Jobs</h1>
			</div>
			<ul className="space-y-4">
				{data?.jobs.map((job) => (
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
		</div>
	);
}
