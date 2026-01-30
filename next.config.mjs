/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/logocodex',
                destination: '/portafolio',
                permanent: true,
            },
            {
                source: '/logocodex/:slug',
                destination: '/portafolio/:slug',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
