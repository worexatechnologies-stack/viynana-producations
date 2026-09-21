import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: [
    "192.168.1.9",
    "192.168.1.5",
    "192.168.1.7",
    "192.168.1.14",
    "192.168.1.22",
    "172.17.192.1",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com',
      }
    ],
  },
};

export default nextConfig;
