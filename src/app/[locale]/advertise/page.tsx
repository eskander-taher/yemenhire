"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import myAxios from "@/lib/myAxios";
import { toast } from "react-toastify";

export default function OpportunityForm() {
	const t = useTranslations("OpportunityForm");
	const router = useRouter();
	const [postType, setPostType] = useState("job");

	// Tailwind utility class for input
	// You can move this to a global style file if preferred
	// or use shadcn/ui input components
	const input = `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`;

	const mutation = useMutation({
		mutationFn: async (formData: any) => {
			const res = await myAxios.post("/api/post-opportunity", formData);
			return res;
		},
		onError: (error) => {
			console.error("Error submitting form:", error);
			toast.error(t("errorMessage"));
		},
		onSuccess: () => {
			toast.success(t("successMessage"));
			router.push("/thank-you");
		},
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.target));
		data.postType = postType;
		mutation.mutate(data);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-3xl mx-auto bg-white shadow p-6 rounded-xl space-y-4 text-gray-800"
			dir="auto"
		>
			<h2 className="text-2xl font-bold text-blue-700 text-center">{t("title")}</h2>
			<p className="text-center text-gray-500">{t("subtitle")}</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<input
					required
					name="contactName"
					placeholder={t("contactName")}
					className={input}
				/>
				<input
					required
					name="companyName"
					placeholder={t("companyName")}
					className={input}
				/>
				<input
					required
					name="email"
					type="email"
					placeholder={t("email")}
					className={input}
				/>
				<input required name="phone" placeholder={t("phone")} className={input} />
				<input
					required
					name="address"
					placeholder={t("address")}
					className={input + "md:col-span-2"}
				/>
				<input
					name="website"
					placeholder={t("website")}
					className={input + "md:col-span-2"}
				/>
			</div>

			<div>
				<label className="block font-medium text-sm mb-2">{t("postLabel")}</label>
				<div className="flex gap-4">
					{["job", "tender", "both"].map((type) => (
						<button
							key={type}
							type="button"
							onClick={() => setPostType(type)}
							className={clsx(
								"flex-1 py-2 px-4 rounded-lg border text-center",
								postType === type
									? "bg-blue-600 text-white"
									: "bg-white border-gray-300 text-gray-700"
							)}
						>
							{t(type)}
						</button>
					))}
				</div>
			</div>

			<textarea
				name="additionalInfo"
				placeholder={t("additionalInfo")}
				className={input + "h-28"}
			/>

			<button
				type="submit"
				disabled={mutation.isPending}
				className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700"
			>
				{mutation.isPending ? t("submitting") : t("submit")}
			</button>
		</form>
	);
}
