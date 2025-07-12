"use client"
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { FormEvent } from "react";
import type { AxiosError } from "axios";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const router = useRouter();
	const t = useTranslations("AuthForms.login");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage("");
		setIsLoading(true);

		try {
			await login(username, password);
			setMessage(t("success"));
			router.push("/me");
		} catch (err: unknown) {
			if (err && typeof err === "object" && "response" in err) {
				setMessage(
					(err as AxiosError<{ message?: string }>).response?.data?.message || t("error")
				);
			} else {
				setMessage(t("error"));
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-[80vh] flex items-center justify-center">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-xl p-8">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<span className="text-2xl">🔐</span>
						</div>
						<h2 className="text-3xl font-bold text-gray-900">{t("title")}</h2>
						<p className="text-gray-600 mt-2">
							Welcome back! Please sign in to your account.
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								{t("username")}
							</label>
							<input
								id="username"
								type="text"
								placeholder={t("username")}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								{t("password")}
							</label>
							<input
								id="password"
								type="password"
								placeholder={t("password")}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								required
							/>
						</div>

						{/* Message */}
						{message && (
							<div
								className={`p-4 rounded-lg text-sm ${
									message.includes("success")
										? "bg-green-50 text-green-700 border border-green-200"
										: "bg-red-50 text-red-700 border border-red-200"
								}`}
							>
								{message}
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Loading...
								</div>
							) : (
								t("submit")
							)}
						</button>
					</form>

					{/* Footer */}
					<div className="text-center mt-6">
						<p className="text-gray-600">
							Don&apos;t have an account?{" "}
							<Link
								href="/register"
								className="text-blue-600 hover:text-blue-700 font-medium"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
