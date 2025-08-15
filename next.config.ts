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
      {
        protocol: 'https',
        hostname: 'developers.google.com',
        port: '',
        pathname: '/identity/images/**',
      },
    ],
  },
};

export default nextConfig;
