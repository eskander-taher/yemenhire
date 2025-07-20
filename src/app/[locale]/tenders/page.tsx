"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import myAxios from "@/lib/myAxios";

interface Tender {
	_id: string;
	title: string;
	// add other fields as needed
}
interface TendersResponse {
	tenders: Tender[];
	total: number;
	page: number;
	limit: number;
}

const fetchTenders = async (page: number): Promise<TendersResponse> => {
	const res = await myAxios.get(`/tenders?page=${page}`);
	return res.data;
};

const deleteTender = async (id: string) => {
	const res = await myAxios.delete(`/tenders/${id}`);
	return res.data;
};

export default function TendersPage() {
	const [page, setPage] = useState(1);
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery<TendersResponse, Error>({
		queryKey: ["tenders", page],
		queryFn: () => fetchTenders(page),
		gcTime: 0,
		staleTime: 0,
		refetchOnWindowFocus: false,
		retry: 1,
	});
	const mutation = useMutation({
		mutationFn: deleteTender,
		onSuccess: () => {
			toast.success("Tender deleted");
			queryClient.invalidateQueries({ queryKey: ["tenders"] });
		},
		onError: () => toast.error("Failed to delete tender"),
	});

	if (isLoading) return <div className="text-center py-8">Loading...</div>;
	if (error) return <div className="text-center text-red-500 py-8">Error loading tenders</div>;
	if (!data) return <div className="text-center py-8">No tenders found</div>;

	return (
		<div className="max-w-3xl mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Tenders</h1>
			</div>
			<ul className="space-y-4">
				{data.tenders.map((tender) => (
					<li
						key={tender._id}
						className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
					>
						<Link
							href={`/tenders/${tender._id}`}
							className="font-medium text-blue-700 hover:underline"
						>
							{tender.title}
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
					Prev
				</button>
				<span className="font-semibold">Page {page}</span>
				<button
					onClick={() => setPage((p) => (data.tenders.length === data.limit ? p + 1 : p))}
					disabled={data.tenders.length < data.limit}
					className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	);
}
