export default function ProfilePage() {
	const userProfile = {
		name: "Ahmed Al-Mansouri",
		email: "ahmed.almansouri@email.com",
		phone: "+967 712 345 678",
		location: "Sana'a, Yemen",
		bio: "Experienced software engineer with 5+ years in web development and mobile applications. Passionate about creating innovative solutions and contributing to Yemen's tech ecosystem.",
		skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
		experience: "5+ years",
		education: "Bachelor's in Computer Science",
		languages: ["Arabic", "English"],
		avatar: "/api/placeholder/150/150",
	};

	const recentActivity = [
		{
			id: 1,
			action: "Applied for Software Engineer position",
			company: "Tech Solutions Yemen",
			date: "2024-01-10",
			status: "Under Review",
		},
		{
			id: 2,
			action: "Saved Marketing Manager job",
			company: "Global Marketing Co.",
			date: "2024-01-08",
			status: "Saved",
		},
		{
			id: 3,
			action: "Submitted bid for IT Infrastructure tender",
			company: "Yemen Telecom",
			date: "2024-01-05",
			status: "Submitted",
		},
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Profile</h1>
				<p className="mt-2 text-gray-600">Manage your account and preferences</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Profile Card */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg shadow-md p-6">
						<div className="text-center mb-6">
							<div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
								<svg
									className="w-12 h-12 text-gray-400"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z" />
								</svg>
							</div>
							<h2 className="text-xl font-semibold text-gray-900">
								{userProfile.name}
							</h2>
							<p className="text-gray-600">{userProfile.location}</p>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>
								<p className="text-sm text-gray-900">{userProfile.email}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Phone
								</label>
								<p className="text-sm text-gray-900">{userProfile.phone}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Experience
								</label>
								<p className="text-sm text-gray-900">{userProfile.experience}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Education
								</label>
								<p className="text-sm text-gray-900">{userProfile.education}</p>
							</div>
						</div>

						<div className="mt-6">
							<button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
								Edit Profile
							</button>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* About Section */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-900">About</h3>
							<button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
								Edit
							</button>
						</div>
						<p className="text-gray-700 mb-4">{userProfile.bio}</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
								<div className="flex flex-wrap gap-2">
									{userProfile.skills.map((skill) => (
										<span
											key={skill}
											className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
							<div>
								<h4 className="text-sm font-medium text-gray-700 mb-2">
									Languages
								</h4>
								<div className="flex flex-wrap gap-2">
									{userProfile.languages.map((language) => (
										<span
											key={language}
											className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
										>
											{language}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Recent Activity */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Recent Activity
						</h3>
						<div className="space-y-4">
							{recentActivity.map((activity) => (
								<div
									key={activity.id}
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
								>
									<div>
										<p className="font-medium text-gray-900">
											{activity.action}
										</p>
										<p className="text-sm text-gray-600">{activity.company}</p>
										<p className="text-xs text-gray-500">{activity.date}</p>
									</div>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											activity.status === "Under Review"
												? "bg-yellow-100 text-yellow-800"
												: activity.status === "Saved"
												? "bg-blue-100 text-blue-800"
												: "bg-green-100 text-green-800"
										}`}
									>
										{activity.status}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Settings */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Account Settings
						</h3>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h4 className="text-sm font-medium text-gray-900">
										Email Notifications
									</h4>
									<p className="text-sm text-gray-600">
										Receive updates about new jobs and tenders
									</p>
								</div>
								<button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
									<span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
								</button>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<h4 className="text-sm font-medium text-gray-900">
										SMS Notifications
									</h4>
									<p className="text-sm text-gray-600">
										Receive SMS alerts for urgent opportunities
									</p>
								</div>
								<button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
									<span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
								</button>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<h4 className="text-sm font-medium text-gray-900">
										Profile Visibility
									</h4>
									<p className="text-sm text-gray-600">
										Allow employers to view your profile
									</p>
								</div>
								<button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
									<span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
