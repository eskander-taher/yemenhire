"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import myAxios from "@/lib/myAxios";
import { useRef } from "react";

export default function CreateTenderPage() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const res = await myAxios.post("/tenders", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return res.data;
		},
		onSuccess: () => {
			toast.success("Tender created");
			router.push("/tenders");
		},
		onError: () => toast.error("Failed to create tender"),
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(formRef.current!);
		mutation.mutate(formData);
	};

	return (
		<div className="max-w-xl mx-auto py-8">
			<div className="bg-white rounded-xl shadow p-6">
				<h1 className="text-2xl font-bold mb-4">Create Tender</h1>
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					className="space-y-4"
				>
					<div>
						<label className="block font-medium mb-1">Title</label>
						<input
							name="title"
							placeholder="Title"
							required
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Description</label>
						<textarea
							name="description"
							placeholder="Description"
							required
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Location</label>
						<input
							name="location"
							placeholder="Location"
							required
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Organization</label>
						<input
							name="organization"
							placeholder="Organization"
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Deadline</label>
						<input
							name="deadline"
							type="date"
							placeholder="Deadline"
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Category</label>
						<input
							name="category"
							placeholder="Category"
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Contact Email</label>
						<input
							name="contactEmail"
							type="email"
							placeholder="Contact Email"
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Documents</label>
						<input name="documents" type="file" multiple className="w-full" />
					</div>
					<button
						type="submit"
						disabled={mutation.isPending}
						className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
}
