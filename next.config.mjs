import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

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
            {
                source: '/portafolio/southsoft-development',
                destination: '/portafolio/southsoft-consultoria',
                permanent: true,
            },
            {
                source: '/portafolio/osttech-cybersecurity',
                destination: '/portafolio/osttech-software',
                permanent: true,
            },
            {
                source: '/portafolio/bm3-constructora',
                destination: '/portafolio/bm3-servicios',
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
