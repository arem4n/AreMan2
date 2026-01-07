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
                source: '/logocodex/osttech-cybersecurity',
                destination: '/logocodex/osttech-software-mantenimiento',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
