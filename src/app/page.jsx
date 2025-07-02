import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-white">
			{/* Hero Section */}
			<div className="relative bg-gradient-to-r from-blue-600 to-blue-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
					<div className="text-center">
						<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
							Find Your Next Opportunity in Yemen
						</h1>
						<p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
							Discover jobs, tenders, and business opportunities across Yemen. Connect
							with employers and grow your career or business.
						</p>
						<div className="mt-10 flex justify-center space-x-4">
							<Link
								href="/jobs"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50"
							>
								Browse Jobs
							</Link>
							<Link
								href="/tenders"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
							>
								View Tenders
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
							Everything you need to succeed
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Comprehensive platform for job seekers, businesses, and contractors
						</p>
					</div>

					<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
								<svg
									className="w-6 h-6 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
									/>
								</svg>
							</div>
							<h3 className="mt-4 text-lg font-medium text-gray-900">
								Job Opportunities
							</h3>
							<p className="mt-2 text-gray-600">
								Find the perfect job from top employers across Yemen. Filter by
								location, industry, and experience level.
							</p>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
								<svg
									className="w-6 h-6 text-green-600"
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
							</div>
							<h3 className="mt-4 text-lg font-medium text-gray-900">
								Government Tenders
							</h3>
							<p className="mt-2 text-gray-600">
								Access government tenders and procurement opportunities. Stay
								updated with the latest bidding processes.
							</p>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
								<svg
									className="w-6 h-6 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<h3 className="mt-4 text-lg font-medium text-gray-900">
								Business Networking
							</h3>
							<p className="mt-2 text-gray-600">
								Connect with professionals, businesses, and contractors. Build your
								network and grow your opportunities.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="bg-blue-600">
				<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
							Ready to get started?
						</h2>
						<p className="mt-4 text-lg text-blue-100">
							Join thousands of users who have found opportunities through YemenAd
						</p>
						<div className="mt-8 flex justify-center space-x-4">
							<Link
								href="/register"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
							>
								Create Account
							</Link>
							<Link
								href="/advertise"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
							>
								Post Opportunity
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
