export default function TendersPage() {
	const tenders = [
		{
			id: 1,
			title: "Construction of Primary School in Sana'a",
			organization: "Ministry of Education",
			location: "Sana'a",
			budget: "$500,000 - $750,000",
			deadline: "2024-02-15",
			posted: "1 week ago",
			description:
				"Construction of a new primary school building with 12 classrooms and administrative offices...",
			category: "Construction",
			status: "Open",
		},
		{
			id: 2,
			title: "Medical Equipment Supply for Central Hospital",
			organization: "Ministry of Health",
			location: "Aden",
			budget: "$200,000 - $300,000",
			deadline: "2024-01-30",
			posted: "3 days ago",
			description:
				"Supply of medical equipment and devices for the central hospital in Aden...",
			category: "Healthcare",
			status: "Open",
		},
		{
			id: 3,
			title: "IT Infrastructure Development",
			organization: "Yemen Telecom",
			location: "Multiple Cities",
			budget: "$1,000,000 - $1,500,000",
			deadline: "2024-03-01",
			posted: "2 weeks ago",
			description:
				"Development and implementation of IT infrastructure across multiple locations...",
			category: "Technology",
			status: "Open",
		},
		{
			id: 4,
			title: "Agricultural Equipment Supply",
			organization: "Ministry of Agriculture",
			location: "Taiz",
			budget: "$150,000 - $250,000",
			deadline: "2024-01-20",
			posted: "5 days ago",
			description: "Supply of modern agricultural equipment and tools for local farmers...",
			category: "Agriculture",
			status: "Closing Soon",
		},
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Tender Opportunities</h1>
				<p className="mt-2 text-gray-600">Government and private sector tenders in Yemen</p>
			</div>

			{/* Search and Filters */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-8">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
					<div>
						<label
							htmlFor="search"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Search Tenders
						</label>
						<input
							type="text"
							id="search"
							placeholder="Tender title or keywords"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="category"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Category
						</label>
						<select
							id="category"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">All Categories</option>
							<option value="construction">Construction</option>
							<option value="healthcare">Healthcare</option>
							<option value="technology">Technology</option>
							<option value="agriculture">Agriculture</option>
							<option value="education">Education</option>
						</select>
					</div>
					<div>
						<label
							htmlFor="location"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Location
						</label>
						<select
							id="location"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">All Locations</option>
							<option value="sanaa">Sana'a</option>
							<option value="aden">Aden</option>
							<option value="taiz">Taiz</option>
							<option value="hodeidah">Hodeidah</option>
						</select>
					</div>
					<div>
						<label
							htmlFor="budget"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Budget Range
						</label>
						<select
							id="budget"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">All Budgets</option>
							<option value="small">Under $100K</option>
							<option value="medium">$100K - $500K</option>
							<option value="large">Over $500K</option>
						</select>
					</div>
					<div className="flex items-end">
						<button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
							Search
						</button>
					</div>
				</div>
			</div>

			{/* Tender Listings */}
			<div className="space-y-6">
				{tenders.map((tender) => (
					<div
						key={tender.id}
						className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
					>
						<div className="flex justify-between items-start mb-4">
							<div className="flex-1">
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									{tender.title}
								</h3>
								<p className="text-gray-600 mb-1">{tender.organization}</p>
								<p className="text-gray-500 text-sm mb-3">{tender.description}</p>
							</div>
							<div className="text-right">
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										tender.status === "Open"
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{tender.status}
								</span>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
							<div>
								<span className="text-sm font-medium text-gray-700">Location:</span>
								<p className="text-sm text-gray-600">{tender.location}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-gray-700">Budget:</span>
								<p className="text-sm text-gray-600">{tender.budget}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-gray-700">Deadline:</span>
								<p className="text-sm text-gray-600">{tender.deadline}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-gray-700">Category:</span>
								<p className="text-sm text-gray-600">{tender.category}</p>
							</div>
						</div>

						<div className="flex justify-between items-center">
							<p className="text-sm text-gray-500">Posted {tender.posted}</p>
							<div className="space-x-2">
								<button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
									View Details
								</button>
								<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
									Submit Bid
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			<div className="mt-8 flex justify-center">
				<nav className="flex items-center space-x-2">
					<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
						Previous
					</button>
					<button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md">
						1
					</button>
					<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
						2
					</button>
					<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
						3
					</button>
					<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
						Next
					</button>
				</nav>
			</div>
		</div>
	);
}
