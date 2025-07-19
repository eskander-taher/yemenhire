import { useTranslations } from "next-intl";

export default function HomePage() {
	const t = useTranslations("HomePage");

	return (
		<div className="space-y-16">
			{/* Hero Section */}
			<section className="text-center py-20">
				<div className="max-w-4xl mx-auto">
					<div className="mb-6">
						<span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
							🇾🇪 Yemen&apos;s #1 Platform
						</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
						{t("title")}
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
						Yemen&apos;s largest platform connecting professionals with job
						opportunities and businesses with government tenders. Find your next career
						move or secure your next contract.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-lg">
							Find Jobs
						</button>
						<button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg">
							Browse Tenders
						</button>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white">
				<div className="text-center">
					<h2 className="text-3xl font-bold mb-12">Yemen&apos;s Leading Platform</h2>
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="text-5xl font-bold mb-2">10,000+</div>
							<div className="text-blue-100">Active Jobs</div>
						</div>
						<div>
							<div className="text-5xl font-bold mb-2">5,000+</div>
							<div className="text-blue-100">Government Tenders</div>
						</div>
						<div>
							<div className="text-5xl font-bold mb-2">50,000+</div>
							<div className="text-blue-100">Registered Users</div>
						</div>
						<div>
							<div className="text-5xl font-bold mb-2">1,000+</div>
							<div className="text-blue-100">Companies</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="py-16">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
					<p className="text-xl text-gray-600">
						Comprehensive solutions for both job seekers and businesses
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-8">
					{/* Jobs Section */}
					<div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
						<div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
							<span className="text-3xl">💼</span>
						</div>
						<h3 className="text-2xl font-bold text-gray-900 mb-4">Job Opportunities</h3>
						<p className="text-gray-600 mb-6">
							Access thousands of job opportunities across all sectors in Yemen and
							internationally.
						</p>
						<ul className="space-y-3 text-gray-600">
							<li className="flex items-center">
								<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
								Private sector positions
							</li>
							<li className="flex items-center">
								<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
								Government jobs
							</li>
							<li className="flex items-center">
								<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
								International opportunities
							</li>
							<li className="flex items-center">
								<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
								Remote work options
							</li>
						</ul>
					</div>

					{/* Tenders Section */}
					<div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
						<div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
							<span className="text-3xl">📋</span>
						</div>
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Government Tenders
						</h3>
						<p className="text-gray-600 mb-6">
							Discover and bid on government contracts and tenders across all Yemeni
							governorates.
						</p>
						<ul className="space-y-3 text-gray-600">
							<li className="flex items-center">
								<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
								Construction projects
							</li>
							<li className="flex items-center">
								<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
								IT & Technology services
							</li>
							<li className="flex items-center">
								<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
								Healthcare & Education
							</li>
							<li className="flex items-center">
								<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
								Supply & Procurement
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-gray-50 rounded-3xl">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose YemenHire?</h2>
					<p className="text-xl text-gray-600">
						The most trusted platform for jobs and tenders in Yemen
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">🔍</span>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-3">
							Advanced Search
						</h3>
						<p className="text-gray-600">
							Find exactly what you&apos;re looking for with our powerful search and
							filter system.
						</p>
					</div>

					<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">🔔</span>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-3">
							Smart Notifications
						</h3>
						<p className="text-gray-600">
							Get instant alerts for new jobs and tenders that match your criteria.
						</p>
					</div>

					<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">📱</span>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile First</h3>
						<p className="text-gray-600">
							Access opportunities anywhere with our mobile-optimized platform.
						</p>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white">
				<div className="text-center">
					<h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
					<p className="text-xl mb-8 opacity-90">
						Join thousands of professionals and businesses already using YemenHire
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
							Create Account
						</button>
						<button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
							Learn More
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
