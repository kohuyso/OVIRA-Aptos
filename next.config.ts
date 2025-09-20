import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    eslint: { ignoreDuringBuilds: true },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://131.153.202.197:8124/:path*',
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
        ],
    },
};

export default nextConfig;
