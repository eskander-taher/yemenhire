export default function DashboardPage() {
	const stats = [
		{ name: "Applications Submitted", value: "12", change: "+2", changeType: "positive" },
		{ name: "Jobs Saved", value: "8", change: "+1", changeType: "positive" },
		{ name: "Tenders Bidded", value: "5", change: "0", changeType: "neutral" },
		{ name: "Profile Views", value: "24", change: "+8", changeType: "positive" },
	];

	const recentApplications = [
		{
			id: 1,
			jobTitle: "Software Engineer",
			company: "Tech Solutions Yemen",
			status: "Under Review",
			appliedDate: "2024-01-10",
		},
		{
			id: 2,
			jobTitle: "Marketing Manager",
			company: "Global Marketing Co.",
			status: "Interview Scheduled",
			appliedDate: "2024-01-08",
		},
		{
			id: 3,
			jobTitle: "Project Coordinator",
			company: "Development NGO",
			status: "Application Received",
			appliedDate: "2024-01-05",
		},
	];

	const savedJobs = [
		{
			id: 1,
			title: "Data Analyst",
			company: "Financial Services Ltd",
			location: "Sana'a",
			salary: "$1,800 - $2,500",
		},
		{
			id: 2,
			title: "UI/UX Designer",
			company: "Digital Agency",
			location: "Aden",
			salary: "$2,000 - $3,000",
		},
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
				<p className="mt-2 text-gray-600">
					Welcome back! Here's an overview of your activity.
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{stats.map((stat) => (
					<div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">{stat.name}</p>
								<p className="text-2xl font-bold text-gray-900">{stat.value}</p>
							</div>
							<div
								className={`flex items-center text-sm ${
									stat.changeType === "positive"
										? "text-green-600"
										: stat.changeType === "negative"
										? "text-red-600"
										: "text-gray-500"
								}`}
							>
								<span>{stat.change}</span>
								{stat.changeType === "positive" && (
									<svg
										className="w-4 h-4 ml-1"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Recent Applications */}
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
						<a
							href="/applications"
							className="text-blue-600 hover:text-blue-700 text-sm font-medium"
						>
							View All
						</a>
					</div>
					<div className="space-y-4">
						{recentApplications.map((application) => (
							<div
								key={application.id}
								className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
							>
								<div>
									<h3 className="font-medium text-gray-900">
										{application.jobTitle}
									</h3>
									<p className="text-sm text-gray-600">{application.company}</p>
									<p className="text-xs text-gray-500">
										Applied: {application.appliedDate}
									</p>
								</div>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										application.status === "Interview Scheduled"
											? "bg-green-100 text-green-800"
											: application.status === "Under Review"
											? "bg-yellow-100 text-yellow-800"
											: "bg-gray-100 text-gray-800"
									}`}
								>
									{application.status}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Saved Jobs */}
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold text-gray-900">Saved Jobs</h2>
						<a
							href="/bookmarks"
							className="text-blue-600 hover:text-blue-700 text-sm font-medium"
						>
							View All
						</a>
					</div>
					<div className="space-y-4">
						{savedJobs.map((job) => (
							<div key={job.id} className="p-4 border border-gray-200 rounded-lg">
								<h3 className="font-medium text-gray-900">{job.title}</h3>
								<p className="text-sm text-gray-600">{job.company}</p>
								<div className="flex items-center justify-between mt-2">
									<span className="text-sm text-gray-500">{job.location}</span>
									<span className="text-sm font-medium text-gray-900">
										{job.salary}
									</span>
								</div>
								<div className="mt-3 flex space-x-2">
									<button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
										Apply Now
									</button>
									<button className="text-sm text-gray-500 hover:text-gray-700">
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="mt-8 bg-white rounded-lg shadow-md p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
						<svg
							className="w-5 h-5 text-gray-400 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
						Post a Job
					</button>
					<button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
						<svg
							className="w-5 h-5 text-gray-400 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						Submit Tender
					</button>
					<button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
						<svg
							className="w-5 h-5 text-gray-400 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						Update Profile
					</button>
				</div>
			</div>
		</div>
	);
}
