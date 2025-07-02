export default function AdvertisePage() {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Post an Opportunity</h1>
				<p className="mt-2 text-gray-600">
					Share your job openings or tender announcements with thousands of professionals
				</p>
			</div>

			{/* Post Type Selection */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">
					What would you like to post?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<button className="flex items-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-300 transition-colors">
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
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
						<div className="text-left">
							<h3 className="font-medium text-gray-900">Job Opening</h3>
							<p className="text-sm text-gray-600">
								Hire talented professionals for your organization
							</p>
						</div>
					</button>
					<button className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
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
						<div className="text-left">
							<h3 className="font-medium text-gray-900">Tender Announcement</h3>
							<p className="text-sm text-gray-600">
								Invite bids for your projects and contracts
							</p>
						</div>
					</button>
				</div>
			</div>

			{/* Job Posting Form */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-6">Job Details</h2>

				<form className="space-y-6">
					{/* Basic Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label
								htmlFor="jobTitle"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Job Title *
							</label>
							<input
								type="text"
								id="jobTitle"
								required
								placeholder="e.g., Software Engineer"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label
								htmlFor="company"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Company Name *
							</label>
							<input
								type="text"
								id="company"
								required
								placeholder="Your company name"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<label
								htmlFor="location"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Location *
							</label>
							<select
								id="location"
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select Location</option>
								<option value="sanaa">Sana'a</option>
								<option value="aden">Aden</option>
								<option value="taiz">Taiz</option>
								<option value="hodeidah">Hodeidah</option>
								<option value="other">Other</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="jobType"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Job Type *
							</label>
							<select
								id="jobType"
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select Type</option>
								<option value="full-time">Full-time</option>
								<option value="part-time">Part-time</option>
								<option value="contract">Contract</option>
								<option value="internship">Internship</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="salary"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Salary Range
							</label>
							<input
								type="text"
								id="salary"
								placeholder="e.g., $2,000 - $3,500"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					{/* Job Description */}
					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Job Description *
						</label>
						<textarea
							id="description"
							required
							rows={6}
							placeholder="Describe the role, responsibilities, and requirements..."
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Requirements */}
					<div>
						<label
							htmlFor="requirements"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Requirements
						</label>
						<textarea
							id="requirements"
							rows={4}
							placeholder="List the skills, experience, and qualifications required..."
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Contact Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label
								htmlFor="contactEmail"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Contact Email *
							</label>
							<input
								type="email"
								id="contactEmail"
								required
								placeholder="hr@company.com"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label
								htmlFor="contactPhone"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Contact Phone
							</label>
							<input
								type="tel"
								id="contactPhone"
								placeholder="+967 712 345 678"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					{/* Application Deadline */}
					<div>
						<label
							htmlFor="deadline"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Application Deadline
						</label>
						<input
							type="date"
							id="deadline"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Additional Options */}
					<div className="space-y-4">
						<h3 className="text-md font-medium text-gray-900">Additional Options</h3>
						<div className="space-y-3">
							<div className="flex items-center">
								<input
									type="checkbox"
									id="featured"
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="featured"
									className="ml-2 block text-sm text-gray-900"
								>
									Feature this job (appears at the top of search results)
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="urgent"
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="urgent"
									className="ml-2 block text-sm text-gray-900"
								>
									Mark as urgent hiring
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="remote"
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="remote"
									className="ml-2 block text-sm text-gray-900"
								>
									Remote work option available
								</label>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end space-x-4">
						<button
							type="button"
							className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Save Draft
						</button>
						<button
							type="submit"
							className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
						>
							Post Job
						</button>
					</div>
				</form>
			</div>

			{/* Pricing Information */}
			<div className="mt-8 bg-blue-50 rounded-lg p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="text-center">
						<div className="text-2xl font-bold text-blue-600">Free</div>
						<div className="text-sm text-gray-600">Basic job posting</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-blue-600">$50</div>
						<div className="text-sm text-gray-600">Featured job (30 days)</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-blue-600">$100</div>
						<div className="text-sm text-gray-600">Premium package</div>
					</div>
				</div>
			</div>
		</div>
	);
}
