
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientWrapper from '@/components/ClientWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LogoCodeX™: Branding Estratégico para Startups | AREM4N',
  description: 'LogoCodeX™: Metodología de branding que integra semiótica, arquetipos junguianos y narrativa estratégica. Creamos símbolos vivos para startups, no plantillas vacías. Puerto Montt, Chile.',
  keywords: [
    'branding estratégico',
    'diseño de logos',
    'LogoCodeX',
    'semiótica visual',
    'arquetipos de marca',
    'identidad visual',
    'Puerto Montt',
    'Chile',
    'diseño heráldico',
    'símbolos corporativos'
  ],
  metadataBase: new URL('https://areman.vercel.app'),
  alternates: {
    canonical: '/',
  },
  other: {
    'geo.region': 'CL-LL',
    'geo.placename': 'Puerto Montt',
    'geo.position': '-41.4693;-72.9424',
    'ICBM': '-41.4693, -72.9424',
  },
  openGraph: {
    title: 'AREM4N | Soberanía Visual & Branding Estratégico',
    description: 'LogoCodeX™: Metodología de branding que integra semiótica, arquetipos junguianos y narrativa estratégica.',
    url: 'https://areman.vercel.app',
    siteName: 'AREM4N',
    images: [
      {
        url: 'https://i.postimg.cc/d3wtGXNk/IMG_20250728_180701_596.webp',
        width: 1200,
        height: 630,
        alt: 'Metodología LogoCodeX de AREM4N',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AREM4N | Soberanía Visual & Branding Estratégico',
    description: 'LogoCodeX™: Metodología de branding que integra semiótica, arquetipos junguianos y narrativa estratégica.',
    creator: '@arem4n',
    images: ['https://i.postimg.cc/d3wtGXNk/IMG_20250728_180701_596.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://i.postimg.cc" />
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ClientWrapper>{children}</ClientWrapper>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "AREM4N",
              "description": "Diseño de identidad visual estratégica con metodología LogoCodeX™",
              "url": "https://areman.vercel.app",
              "logo": "https://i.postimg.cc/Tw57pbrX/retouch-2025082016164562.png",
              "image": "https://i.postimg.cc/Tw57pbrX/retouch-2025082016164562.png",
              "founder": {
                "@type": "Person",
                "name": "Sergio Arellano Manque",
                "jobTitle": "Diseñador Audiovisual & Estratega de Marca"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Puerto Montt",
                "addressRegion": "Los Lagos",
                "addressCountry": "CL"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Chile"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contacto@arem4n.com",
                "contactType": "Customer Service"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Branding Estratégico",
              "provider": {
                "@type": "ProfessionalService",
                "name": "AREM4N"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Diagnóstico Semiótico",
                  "description": "Análisis arquetípico y simbólico de identidad de marca",
                  "priceCurrency": "USD",
                  "price": "150-250"
                },
                {
                  "@type": "Offer",
                  "name": "Arquitectura de Marca",
                  "description": "Sistema visual completo con motion graphics",
                  "priceCurrency": "USD",
                  "price": "400-600"
                },
                {
                  "@type": "Offer",
                  "name": "Soberanía Visual",
                  "description": "Identidad transmedia con video corporativo y manual exhaustivo",
                  "priceCurrency": "USD",
                  "price": "900-1500"
                }
              ]
            }
          `}
        </script>
      </body>
    </html>
  );
}
