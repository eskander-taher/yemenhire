export default function BookmarksPage() {
	const savedJobs = [
		{
			id: 1,
			title: "Software Engineer",
			company: "Tech Solutions Yemen",
			location: "Sana'a",
			type: "Full-time",
			salary: "$2,000 - $3,500",
			savedDate: "2024-01-10",
			description:
				"We are looking for a skilled software engineer to join our growing team...",
		},
		{
			id: 2,
			title: "Data Analyst",
			company: "Financial Services Ltd",
			location: "Sana'a",
			type: "Full-time",
			salary: "$1,800 - $2,500",
			savedDate: "2024-01-08",
			description: "Analyze financial data and create reports for business decisions...",
		},
		{
			id: 3,
			title: "UI/UX Designer",
			company: "Digital Agency",
			location: "Aden",
			type: "Contract",
			salary: "$2,000 - $3,000",
			savedDate: "2024-01-05",
			description:
				"Create beautiful and functional user interfaces for web and mobile applications...",
		},
	];

	const savedTenders = [
		{
			id: 1,
			title: "Construction of Primary School in Sana'a",
			organization: "Ministry of Education",
			location: "Sana'a",
			budget: "$500,000 - $750,000",
			deadline: "2024-02-15",
			savedDate: "2024-01-12",
			category: "Construction",
		},
		{
			id: 2,
			title: "IT Infrastructure Development",
			organization: "Yemen Telecom",
			location: "Multiple Cities",
			budget: "$1,000,000 - $1,500,000",
			deadline: "2024-03-01",
			savedDate: "2024-01-10",
			category: "Technology",
		},
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
				<p className="mt-2 text-gray-600">Your saved jobs and tenders</p>
			</div>

			{/* Tabs */}
			<div className="mb-8">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8">
						<button className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
							Saved Jobs ({savedJobs.length})
						</button>
						<button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
							Saved Tenders ({savedTenders.length})
						</button>
					</nav>
				</div>
			</div>

			{/* Saved Jobs */}
			<div className="space-y-6">
				<h2 className="text-xl font-semibold text-gray-900">Saved Jobs</h2>
				{savedJobs.map((job) => (
					<div
						key={job.id}
						className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
					>
						<div className="flex justify-between items-start">
							<div className="flex-1">
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									{job.title}
								</h3>
								<p className="text-gray-600 mb-2">{job.company}</p>
								<p className="text-gray-500 text-sm mb-3">{job.description}</p>
								<div className="flex flex-wrap gap-2 mb-4">
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
										{job.location}
									</span>
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
										{job.type}
									</span>
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
										{job.salary}
									</span>
								</div>
								<p className="text-sm text-gray-500">Saved on {job.savedDate}</p>
							</div>
							<div className="text-right space-y-2">
								<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
									Apply Now
								</button>
								<button className="block w-full bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors">
									Remove
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Saved Tenders */}
			<div className="mt-12 space-y-6">
				<h2 className="text-xl font-semibold text-gray-900">Saved Tenders</h2>
				{savedTenders.map((tender) => (
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
							</div>
							<div className="text-right">
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
									Open
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
							<p className="text-sm text-gray-500">Saved on {tender.savedDate}</p>
							<div className="space-x-2">
								<button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
									View Details
								</button>
								<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
									Submit Bid
								</button>
								<button className="bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors">
									Remove
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Empty State */}
			{savedJobs.length === 0 && savedTenders.length === 0 && (
				<div className="text-center py-12">
					<svg
						className="mx-auto h-12 w-12 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
						/>
					</svg>
					<h3 className="mt-2 text-sm font-medium text-gray-900">No bookmarks yet</h3>
					<p className="mt-1 text-sm text-gray-500">
						Start saving jobs and tenders to see them here.
					</p>
					<div className="mt-6">
						<a
							href="/jobs"
							className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
						>
							Browse Jobs
						</a>
						<a
							href="/tenders"
							className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
						>
							Browse Tenders
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
