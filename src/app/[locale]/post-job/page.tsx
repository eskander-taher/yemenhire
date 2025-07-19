"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import myAxios from "@/lib/myAxios";
import { toast } from "react-toastify";

const initialState = {
	title: "",
	description: "",
	location: "",
	organization: "",
	industry: "",
	positionType: "",
	experience: "",
	closingDate: "",
	salary: "",
};

export default function PostJobPage() {
	const [form, setForm] = useState(initialState);

	const mutation = useMutation({
		mutationFn: async (data: any) => {
			const payload = {
				...data,
				experience: data.experience ? Number(data.experience) : undefined,
				closingDate: data.closingDate ? new Date(data.closingDate) : undefined,
			};
			return myAxios.post("/jobs", payload, { withCredentials: true });
		},
		onSuccess: () => {
			toast.success("Job posted successfully!");
			setForm(initialState);
		},
		onError: (err: any) => {
			toast.error(err?.response?.data?.message || "Failed to post job");
		},
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate(form);
	};

	return (
		<div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
			<h1 className="text-3xl font-bold mb-6 text-center">Post a New Job</h1>
			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
					<label className="block font-medium mb-1">Title *</label>
					<input
						name="title"
						value={form.title}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Description *</label>
					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded min-h-[100px]"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Location *</label>
					<input
						name="location"
						value={form.location}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Organization</label>
					<input
						name="organization"
						value={form.organization}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Industry</label>
					<input
						name="industry"
						value={form.industry}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Position Type</label>
					<input
						name="positionType"
						value={form.positionType}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Experience (years)</label>
					<input
						name="experience"
						type="number"
						min="0"
						value={form.experience}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Closing Date</label>
					<input
						name="closingDate"
						type="date"
						value={form.closingDate}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Salary</label>
					<input
						name="salary"
						value={form.salary}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<button
					type="submit"
					disabled={mutation.isPending}
					className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
				>
					{mutation.isPending ? "Posting..." : "Post Job"}
				</button>
			</form>
		</div>
	);
}
