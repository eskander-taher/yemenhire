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
    unoptimized: true, // Temporarily disable optimization to fix the error
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
