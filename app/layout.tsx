
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AREM4N | Soberanía Visual & Branding Estratégico',
  description: 'Consultora de estrategia de marca y diseño visual dirigida por Sergio (AreMan). Especialistas en identidad corporativa para startups mediante la metodología LogoCodex™ y desarrollo web en Next.js. Desde Puerto Montt para el mundo.',
  keywords: [
    'AREM4N',
    'LogoCodeX',
    'Soberanía Visual',
    'Branding Estratégico',
    'Diseño de Identidad Corporativa',
    'Consultoría de Marca Chile',
    'Desarrollo Web Next.js',
    'Vibe Coding',
    'Semiótica de Marca',
    'Arquetipos Junguianos'
  ],
  openGraph: {
    title: 'AREM4N | Soberanía Visual',
    description: 'Tu Startup merece más que una plantilla vacía. Descubre la metodología LogoCodeX™.',
    url: 'https://arem4n.com',
    siteName: 'AREM4N Consultoría',
    images: [
      {
        url: 'https://arem4n.vercel.app/tu-imagen-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AREM4N - Estrategia y Diseño',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AREM4N | Soberanía Visual',
    description: 'Ingeniería de diseño y estrategia de marca para fundadores.',
    creator: '@arem4n',
    images: ['https://arem4n.vercel.app/tu-imagen-og.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Script id="json-ld-arem4n" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://arem4n.com/#sergio",
                  "name": "Sergio Arellano",
                  "alternateName": "AreMan",
                  "jobTitle": "Design Engineer & Brand Strategist",
                  "url": "https://arem4n.com",
                  "sameAs": [
                    "https://www.instagram.com/arem4n",
                    "https://www.behance.net/arem4n",
                    "https://github.com/arem4n"
                  ],
                  "knowsAbout": ["Branding", "Semiótica", "Next.js", "LogoCodeX", "Jungian Archetypes"]
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://arem4n.com/#organization",
                  "name": "AREM4N",
                  "description": "Consultora de Soberanía Visual y Branding Estratégico.",
                  "founder": { "@id": "https://arem4n.com/#sergio" },
                  "areaServed": "Global",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Puerto Montt",
                    "addressRegion": "Los Lagos",
                    "addressCountry": "CL"
                  },
                  "brand": {
                    "@type": "Brand",
                    "name": "LogoCodeX™",
                    "description": "Metodología propietaria de construcción de identidad basada en semiótica y arquetipos."
                  },
                  "priceRange": "$$$"
                }
              ]
            }
          `}
        </Script>
      </body>
    </html>
  );
}
