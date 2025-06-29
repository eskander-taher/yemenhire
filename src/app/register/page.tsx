import Link from "next/link";

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
						<span className="text-white text-xl font-bold">Y</span>
					</div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create your account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or{" "}
						<Link
							href="/login"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							sign in to your existing account
						</Link>
					</p>
				</div>

				<form className="mt-8 space-y-6" action="#" method="POST">
					{/* Account Type Selection */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							I am a...
						</label>
						<div className="grid grid-cols-2 gap-3">
							<button
								type="button"
								className="flex items-center justify-center px-4 py-3 border-2 border-blue-200 rounded-md hover:border-blue-300 transition-colors"
							>
								<svg
									className="w-5 h-5 text-blue-600 mr-2"
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
								Job Seeker
							</button>
							<button
								type="button"
								className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-md hover:border-gray-300 transition-colors"
							>
								<svg
									className="w-5 h-5 text-gray-600 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/>
								</svg>
								Employer
							</button>
						</div>
					</div>

					{/* Personal Information */}
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									First Name *
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									required
									className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="First name"
								/>
							</div>
							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Last Name *
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									required
									className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Last name"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Email Address *
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								placeholder="Email address"
							/>
						</div>

						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Phone Number
							</label>
							<input
								id="phone"
								name="phone"
								type="tel"
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								placeholder="+967 712 345 678"
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
								name="location"
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							>
								<option value="">Select your location</option>
								<option value="sanaa">Sana'a</option>
								<option value="aden">Aden</option>
								<option value="taiz">Taiz</option>
								<option value="hodeidah">Hodeidah</option>
								<option value="other">Other</option>
							</select>
						</div>
					</div>

					{/* Password */}
					<div className="space-y-4">
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Password *
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								placeholder="Create a password"
							/>
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Confirm Password *
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								placeholder="Confirm your password"
							/>
						</div>
					</div>

					{/* Terms and Conditions */}
					<div className="flex items-center">
						<input
							id="terms"
							name="terms"
							type="checkbox"
							required
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
						<label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
							I agree to the{" "}
							<a href="#" className="text-blue-600 hover:text-blue-500">
								Terms of Service
							</a>{" "}
							and{" "}
							<a href="#" className="text-blue-600 hover:text-blue-500">
								Privacy Policy
							</a>
						</label>
					</div>

					<div className="flex items-center">
						<input
							id="newsletter"
							name="newsletter"
							type="checkbox"
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
						<label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
							I want to receive updates about new jobs and opportunities
						</label>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Create Account
						</button>
					</div>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-50 text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<div>
								<a
									href="#"
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								>
									<svg
										className="w-5 h-5"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
									</svg>
								</a>
							</div>

							<div>
								<a
									href="#"
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								>
									<svg
										className="w-5 h-5"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
