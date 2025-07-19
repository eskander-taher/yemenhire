export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[40vh]">
			<div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
			<div className="text-blue-700 font-semibold text-lg">Loading jobs...</div>
		</div>
	);
}
