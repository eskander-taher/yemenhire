"use client";
import { useState } from "react";

const JOBS = [
	{
		title: "Software Engineer",
		location: "Sana'a, Yemen",
		description: "Develop and maintain web applications. 2+ years experience required.",
	},
	{
		title: "Marketing Specialist",
		location: "Aden, Yemen",
		description: "Plan and execute marketing campaigns. 1+ year experience required.",
	},
	{
		title: "Accountant",
		location: "Hodeidah, Yemen",
		description: "Manage financial records and reports. 3+ years experience required.",
	},
	{
		title: "Project Manager",
		location: "Taiz, Yemen",
		description: "Lead project teams and ensure timely delivery. 5+ years experience required.",
	},
	{
		title: "HR Officer",
		location: "Ibb, Yemen",
		description: "Manage recruitment and employee relations. 2+ years experience required.",
	},
	{
		title: "Graphic Designer",
		location: "Sana'a, Yemen",
		description: "Create visual content for digital platforms. Portfolio required.",
	},
	{
		title: "Sales Executive",
		location: "Aden, Yemen",
		description: "Drive sales and manage client accounts. 2+ years experience required.",
	},
	{
		title: "Customer Support",
		location: "Mukalla, Yemen",
		description: "Assist customers and resolve issues. Good communication skills.",
	},
	{
		title: "Business Analyst",
		location: "Sana'a, Yemen",
		description: "Analyze business processes and recommend improvements.",
	},
	{
		title: "IT Support",
		location: "Aden, Yemen",
		description: "Provide technical support for office staff.",
	},
	{
		title: "Procurement Officer",
		location: "Hodeidah, Yemen",
		description: "Manage purchasing and supplier relations.",
	},
	{
		title: "Content Writer",
		location: "Taiz, Yemen",
		description: "Write and edit content for blogs and social media.",
	},
	{
		title: "Operations Manager",
		location: "Ibb, Yemen",
		description: "Oversee daily operations and logistics.",
	},
	{
		title: "Finance Manager",
		location: "Sana'a, Yemen",
		description: "Manage budgets and financial planning.",
	},
	{
		title: "Legal Advisor",
		location: "Aden, Yemen",
		description: "Provide legal counsel and contract review.",
	},
	{
		title: "Web Developer",
		location: "Mukalla, Yemen",
		description: "Build and maintain company website.",
	},
	{
		title: "Data Analyst",
		location: "Sana'a, Yemen",
		description: "Analyze data and generate reports.",
	},
	{
		title: "PR Specialist",
		location: "Aden, Yemen",
		description: "Manage public relations and media outreach.",
	},
	{
		title: "Logistics Coordinator",
		location: "Hodeidah, Yemen",
		description: "Coordinate shipments and inventory.",
	},
	{
		title: "QA Engineer",
		location: "Taiz, Yemen",
		description: "Test software and ensure quality standards.",
	},
	// Add more jobs as needed
];

const PAGE_SIZE = 5;

export default function JobsPage() {
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(JOBS.length / PAGE_SIZE);
	const jobsToShow = JOBS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	return (
		<div className="space-y-8">
			<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Jobs</h1>
			<p className="text-lg text-gray-600 mb-6">
				Welcome to the Jobs page! Here you can find the latest job opportunities available.
				Browse through the listings and find your next career move.
			</p>
			<div className="grid md:grid-cols-2 gap-6">
				{jobsToShow.map((job, idx) => (
					<div
						key={idx}
						className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow"
					>
						<h2 className="text-xl font-semibold text-blue-700 mb-2">{job.title}</h2>
						<div className="text-sm text-gray-500 mb-2">{job.location}</div>
						<p className="text-gray-700">{job.description}</p>
					</div>
				))}
			</div>
			<div className="flex justify-center items-center gap-2 mt-8">
				<button
					className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold bg-white hover:bg-blue-50 disabled:opacity-50"
					onClick={() => setPage((p) => Math.max(1, p - 1))}
					disabled={page === 1}
				>
					Previous
				</button>
				{[...Array(totalPages)].map((_, i) => (
					<button
						key={i}
						className={`w-9 h-9 rounded-full font-bold border-2 mx-1 transition-colors ${
							page === i + 1
								? "bg-blue-600 text-white border-blue-600 shadow"
								: "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
						}`}
						onClick={() => setPage(i + 1)}
					>
						{i + 1}
					</button>
				))}
				<button
					className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold bg-white hover:bg-blue-50 disabled:opacity-50"
					onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
					disabled={page === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}
