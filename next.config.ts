import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add remote image hosts here as you bring in real product / hero photography,
    // e.g. { protocol: "https", hostname: "images.unsplash.com" }
    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
