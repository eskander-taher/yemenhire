import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	// Enable static generation for better performance
	output: "standalone",

	// Optimize images
	images: {
		formats: ["image/webp", "image/avif"],
		minimumCacheTTL: 60,
	},

	// Enable compression
	compress: true,


	// Optimize for production
	poweredByHeader: false,

	// Enable HTTP/2 Server Push
	headers: async () => {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					// Cache static assets
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			// Cache API responses
			{
				source: "/api/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=300, s-maxage=300",
					},
				],
			},
		];
	},

	// Optimize webpack
	webpack: (config, { dev, isServer }) => {
		// Optimize for production
		if (!dev && !isServer) {
			config.optimization.splitChunks = {
				chunks: "all",
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			};
		}

		return config;
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
