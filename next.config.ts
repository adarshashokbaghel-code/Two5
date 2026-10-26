import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/research/daily", destination: "/research/memory-visual", permanent: true },
      { source: "/research/versus", destination: "/research/numbers", permanent: true },
    ];
  },
};

export default nextConfig;
