export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[40vh]">
			<div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
			<div className="text-purple-700 font-semibold text-lg">Loading...</div>
		</div>
	);
}
