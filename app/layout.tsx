
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientWrapper from '@/components/ClientWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AREM4N | Branding Estratégico con LogoCodex™ | Puerto Montt, Chile',
  description: 'LogoCodex™: Metodología de branding que integra semiótica visual, arquetipos junguianos y narrativa estratégica. Diseño de identidad visual para startups en Puerto Montt, Chile. No plantillas, símbolos vivos.',
  keywords: ['branding estratégico', 'diseño de logos', 'LogoCodex', 'semiótica visual', 'arquetipos de marca', 'identidad visual', 'Puerto Montt', 'Chile', 'diseño heráldico', 'símbolos corporativos', 'startup branding'],
  authors: [{ name: 'Sergio Arellano Manque (AreMan)' }],
  creator: 'Sergio Arellano Manque (AreMan)',
  publisher: 'AREM4N',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://areman.vercel.app/',
  },
  openGraph: {
    type: 'website',
    siteName: 'AREM4N',
    title: 'AREM4N | Soberanía Visual & Branding Estratégico',
    description: 'LogoCodex™: Metodología que integra semiótica, arquetipos y narrativa para crear símbolos vivos, no plantillas vacías. Puerto Montt, Chile.',
    url: 'https://areman.vercel.app/',
    images: [
      {
        url: 'https://i.postimg.cc/Tw57pbrX/retouch-2025082016164562.png',
        width: 1200,
        height: 630,
        alt: 'Logo AREM4N - Cuervo heráldico con alas desplegadas',
      },
    ],
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@arem4n',
    title: 'AREM4N | Soberanía Visual & Branding Estratégico',
    description: 'LogoCodex™: Símbolos vivos para startups. Semiótica + Arquetipos + Narrativa. Puerto Montt, Chile.',
    images: ['https://i.postimg.cc/Tw57pbrX/retouch-2025082016164562.png'],
  },
  icons: [
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
  ],
  manifest: '/site.webmanifest',
  other: {
    'geo.region': 'CL-LL',
    'geo.placename': 'Puerto Montt',
    'geo.position': '-41.4693;-72.9424',
    'ICBM': '-41.4693, -72.9424',
    'copyright': '© 2025 AREM4N',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://i.postimg.cc" />
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
