import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // TODO: Remove for production
  },
  typescript: {
    ignoreBuildErrors: true, // TODO: Remove for production
  },
  // Fix workspace root detection warning
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: false, // ✅ Enable optimization for better performance & SEO
    formats: ['image/avif', 'image/webp'], // Modern formats (70% smaller)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon sizes
    minimumCacheTTL: 60, // Cache images for 60 seconds
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains
      },
    ],
  },
};

export default nextConfig;
