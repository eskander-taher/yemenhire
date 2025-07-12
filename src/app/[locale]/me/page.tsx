"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Me() {
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/");
		} catch (err) {
			console.error("Error logging out:", err);
		}
	};

	if (!user) {
		return (
			<div className="min-h-[80vh] flex items-center justify-center">
				<div className="text-center">
					<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<span className="text-4xl">🔒</span>
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
					<p className="text-gray-600 mb-6">Please log in to view your profile.</p>
					<a
						href="/login"
						className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
					>
						Go to Login
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Profile Header */}
			<div className="bg-white rounded-2xl shadow-xl p-8">
				<div className="flex items-center space-x-6">
					<div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
						<span className="text-2xl text-white font-bold">
							{user.username.charAt(0).toUpperCase()}
						</span>
					</div>
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
						<p className="text-gray-600">@{user.username}</p>
					</div>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid md:grid-cols-3 gap-6">
				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Applications</p>
							<p className="text-2xl font-bold text-gray-900">12</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<span className="text-xl">📝</span>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Interviews</p>
							<p className="text-2xl font-bold text-gray-900">3</p>
						</div>
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<span className="text-xl">🎯</span>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Saved Jobs</p>
							<p className="text-2xl font-bold text-gray-900">8</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<span className="text-xl">⭐</span>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="bg-white rounded-2xl shadow-xl p-8">
				<h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
				<div className="grid md:grid-cols-2 gap-4">
					<button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
								<span className="text-lg">🔍</span>
							</div>
							<div>
								<p className="font-medium text-gray-900">Search Jobs</p>
								<p className="text-sm text-gray-600">Find new opportunities</p>
							</div>
						</div>
						<span className="text-gray-400">→</span>
					</button>

					<button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
								<span className="text-lg">📄</span>
							</div>
							<div>
								<p className="font-medium text-gray-900">Update Profile</p>
								<p className="text-sm text-gray-600">Edit your information</p>
							</div>
						</div>
						<span className="text-gray-400">→</span>
					</button>
				</div>
			</div>

			{/* Logout Section */}
			<div className="bg-red-50 border border-red-200 rounded-xl p-6">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-red-900">Account</h3>
						<p className="text-red-700">Sign out of your account</p>
					</div>
					<button
						onClick={handleLogout}
						className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	);
}
