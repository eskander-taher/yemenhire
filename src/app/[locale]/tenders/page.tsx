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

const fetchTenders = async (): Promise<TendersResponse> => {
	const res = await myAxios.get(`/tenders`);
	return res.data;
};

export default function TendersPage() {
	const { data, isLoading, error } = useQuery<TendersResponse, Error>({
		queryKey: ["tenders"],
		queryFn: () => fetchTenders(),
	});

	if (isLoading) return <div className="text-center py-8">Loading...</div>;
	if (error) return <div className="text-center text-red-500 py-8">Error loading tenders</div>;

	return (
		<div className="max-w-3xl mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Tenders</h1>
			</div>
			<ul className="space-y-4">
				{data?.tenders.map((tender) => (
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
		</div>
	);
}
