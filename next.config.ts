import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        // only allow images under /wikipedia/commons/
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'gateway.tajhotels.com',
        port: '',
        // allow all paths on gateway.tajhotels.com
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        // allow all paths on gateway.tajhotels.com
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        // allow all paths on images.unsplash.com
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
