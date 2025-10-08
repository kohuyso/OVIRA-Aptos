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
            {
                source: '/v1/api/:path*',
                destination: 'http://131.153.239.187:8125/v1/api/:path*',
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'crypto-images-4545f.web.app',
            },
        ],
    },
};

export default nextConfig;
