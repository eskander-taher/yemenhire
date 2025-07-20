"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import myAxios from "@/lib/myAxios";
import apiBase from "@/lib/apiBase";

interface Job {
	_id: string;
	title: string;
	description?: string;
	documents?: string[];
	// add other fields as needed
}

const fetchJob = async (id: string): Promise<Job> => {
	const res = await myAxios.get(`/jobs/${id}`);
	return res.data;
};

export default function JobDetailsPage() {
	const params = useParams();
	const id = params?.id as string;
	const { data, isLoading, error } = useQuery<Job, Error>({
		queryKey: ["job", id],
		queryFn: () => fetchJob(id),
		enabled: !!id,
	});

	if (isLoading) return <div className="text-center py-8">Loading...</div>;
	if (error) return <div className="text-center text-red-500 py-8">Error loading job</div>;
	if (!data) return <div className="text-center py-8">Job not found</div>;

	return (
		<div className="max-w-2xl mx-auto py-8">
			<div className="bg-white rounded-xl shadow p-6">
				<h1 className="text-2xl font-bold mb-2">{data.title}</h1>
				<p className="text-gray-700 mb-4">{data.description}</p>
				{data.documents && data.documents.length > 0 && (
					<div className="mt-6">
						<h3 className="font-semibold mb-2">Documents:</h3>
						<ul className="space-y-2">
							{data.documents.map((doc) => (
								<li key={doc}>
									<a
										href={`${apiBase}/download/${doc}`}
										download={doc}
										className="text-blue-600 hover:underline"
									>
										{doc}
									</a>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
