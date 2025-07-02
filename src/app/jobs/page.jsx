export default function JobsPage() {
	const jobs = [
		{
			id: 1,
			title: "Software Engineer",
			company: "Tech Solutions Yemen",
			location: "Sana'a",
			type: "Full-time",
			salary: "$2,000 - $3,500",
			posted: "2 days ago",
			description:
				"We are looking for a skilled software engineer to join our growing team...",
		},
		{
			id: 2,
			title: "Marketing Manager",
			company: "Global Marketing Co.",
			location: "Aden",
			type: "Full-time",
			salary: "$1,800 - $2,800",
			posted: "1 week ago",
			description:
				"Experienced marketing professional needed to lead our regional campaigns...",
		},
		{
			id: 3,
			title: "Project Coordinator",
			company: "Development NGO",
			location: "Taiz",
			type: "Contract",
			salary: "$1,500 - $2,200",
			posted: "3 days ago",
			description: "Coordinate humanitarian projects in the Taiz region...",
		},
		{
			id: 4,
			title: "Accountant",
			company: "Financial Services Ltd",
			location: "Sana'a",
			type: "Part-time",
			salary: "$1,200 - $1,800",
			posted: "5 days ago",
			description: "Experienced accountant for small business clients...",
		},
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
				<p className="mt-2 text-gray-600">Find your next career opportunity in Yemen</p>
			</div>

			{/* Search and Filters */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div>
						<label
							htmlFor="search"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Search Jobs
						</label>
						<input
							type="text"
							id="search"
							placeholder="Job title, company, or keywords"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
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
							htmlFor="type"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Job Type
						</label>
						<select
							id="type"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">All Types</option>
							<option value="full-time">Full-time</option>
							<option value="part-time">Part-time</option>
							<option value="contract">Contract</option>
							<option value="internship">Internship</option>
						</select>
					</div>
					<div className="flex items-end">
						<button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
							Search Jobs
						</button>
					</div>
				</div>
			</div>

			{/* Job Listings */}
			<div className="space-y-6">
				{jobs.map((job) => (
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
							</div>
							<div className="text-right">
								<p className="text-sm text-gray-500 mb-2">{job.posted}</p>
								<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
									Apply Now
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
