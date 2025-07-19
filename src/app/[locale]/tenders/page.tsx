"use client";
import { useState } from "react";

const TENDERS = [
	{
		title: "IT Equipment Supply",
		deadline: "2024-07-15",
		description: "Supplying laptops and networking equipment for a local NGO.",
	},
	{
		title: "Office Renovation",
		deadline: "2024-08-01",
		description: "Renovation of administrative offices in Sana'a.",
	},
	{
		title: "Vehicle Rental Services",
		deadline: "2024-07-30",
		description: "Providing rental vehicles for project staff transportation.",
	},
	{
		title: "Medical Supplies",
		deadline: "2024-08-10",
		description: "Supplying medical equipment to hospitals in Aden.",
	},
	{
		title: "School Construction",
		deadline: "2024-09-01",
		description: "Construction of a new school in Taiz.",
	},
	{
		title: "Solar Panel Installation",
		deadline: "2024-07-25",
		description: "Install solar panels for a government building.",
	},
	{
		title: "Catering Services",
		deadline: "2024-08-15",
		description: "Provide catering for a conference in Sana'a.",
	},
	{
		title: "Printing Services",
		deadline: "2024-07-20",
		description: "Printing educational materials for schools.",
	},
	{
		title: "Water Well Drilling",
		deadline: "2024-08-05",
		description: "Drill water wells in rural areas of Ibb.",
	},
	{
		title: "IT Support Contract",
		deadline: "2024-07-28",
		description: "Provide IT support for a government office.",
	},
	{
		title: "Furniture Supply",
		deadline: "2024-08-12",
		description: "Supply office furniture for a new branch.",
	},
	{
		title: "Road Maintenance",
		deadline: "2024-09-10",
		description: "Maintain and repair roads in Hodeidah.",
	},
	{
		title: "Security Services",
		deadline: "2024-07-22",
		description: "Provide security for a public event.",
	},
	{
		title: "Cleaning Services",
		deadline: "2024-08-18",
		description: "Cleaning services for a hospital in Aden.",
	},
	{
		title: "Software Development",
		deadline: "2024-09-05",
		description: "Develop a custom software solution for a ministry.",
	},
	{
		title: "Consultancy Services",
		deadline: "2024-07-27",
		description: "Consultancy for a new infrastructure project.",
	},
	{
		title: "Electrical Works",
		deadline: "2024-08-08",
		description: "Electrical installation for a new building.",
	},
	{
		title: "Transport Services",
		deadline: "2024-07-29",
		description: "Transport goods between governorates.",
	},
	{
		title: "Event Management",
		deadline: "2024-08-20",
		description: "Manage a large-scale public event in Sana'a.",
	},
	{
		title: "Agricultural Supplies",
		deadline: "2024-09-12",
		description: "Supply seeds and fertilizers to farmers.",
	},
	// Add more tenders as needed
];

const PAGE_SIZE = 5;

export default function TendersPage() {
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(TENDERS.length / PAGE_SIZE);
	const tendersToShow = TENDERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	return (
		<div className="space-y-8">
			<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tenders</h1>
			<p className="text-lg text-gray-600 mb-6">
				Welcome to the Tenders page! Explore current tenders and procurement opportunities.
				Stay updated and submit your bids for the latest projects.
			</p>
			<div className="grid md:grid-cols-2 gap-6">
				{tendersToShow.map((tender, idx) => (
					<div
						key={idx}
						className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow"
					>
						<h2 className="text-xl font-semibold text-green-700 mb-2">
							{tender.title}
						</h2>
						<div className="text-sm text-gray-500 mb-2">
							Deadline: {tender.deadline}
						</div>
						<p className="text-gray-700">{tender.description}</p>
					</div>
				))}
			</div>
			<div className="flex justify-center items-center gap-2 mt-8">
				<button
					className="px-4 py-2 rounded-lg border border-green-600 text-green-600 font-semibold bg-white hover:bg-green-50 disabled:opacity-50"
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
								? "bg-green-600 text-white border-green-600 shadow"
								: "bg-white text-green-600 border-green-200 hover:bg-green-50"
						}`}
						onClick={() => setPage(i + 1)}
					>
						{i + 1}
					</button>
				))}
				<button
					className="px-4 py-2 rounded-lg border border-green-600 text-green-600 font-semibold bg-white hover:bg-green-50 disabled:opacity-50"
					onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
					disabled={page === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}
