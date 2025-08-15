import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ssl.gstatic.com',
        port: '',
        pathname: '/calendar/images/**',
      },
    ],
  },
};

export default nextConfig;
