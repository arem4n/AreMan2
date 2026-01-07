
'use client';

import { ReactNode } from 'react';
import { TransitionProvider } from '@/context/TransitionContext';
import { usePathname } from 'next/navigation';
import PageTransitionPreloader from './PageTransitionPreloader';
import InitialPreloader from './InitialPreloader';

import Script from 'next/script';

export default function ClientWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname(); // Using a client hook makes this a client component

    // The actual state logic for the preloader is now inside TransitionProvider,
    // but we can add any other client-side logic here if needed.

    return (
        <TransitionProvider>
            <InitialPreloader />
            <PageTransitionPreloader />
            {children}
            <Script id="schema-professional-service" type="application/ld+json">
                {`
                {
                  "@context": "https://schema.org",
                  "@type": "ProfessionalService",
                  "name": "AREM4N",
                  "alternateName": "AreMan Design",
                  "description": "Diseño de identidad visual estratégica con metodología LogoCodex™. Branding para startups que integra semiótica, arquetipos y narrativa.",
                  "url": "https://areman.vercel.app",
                  "logo": "https://i.postimg.cc/Tw57pbrX/retouch-2025082016164562.png",
                  "image": "https://i.postimg.cc/Tw57pbrX/retouch-2025082016164562.png",
                  "priceRange": "$150 - $1500 USD",
                  "founder": {
                    "@type": "Person",
                    "name": "Sergio Arellano Manque",
                    "alternateName": "AreMan",
                    "jobTitle": "Diseñador Audiovisual & Estratega de Marca",
                    "url": "https://areman.vercel.app",
                    "sameAs": [
                      "https://www.instagram.com/arem4n",
                      "https://www.behance.net/arem4n"
                    ]
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Puerto Montt",
                    "addressRegion": "Los Lagos",
                    "addressCountry": "CL"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "-41.4693",
                    "longitude": "-72.9424"
                  },
                  "areaServed": [
                    {
                      "@type": "Country",
                      "name": "Chile"
                    },
                    {
                      "@type": "Country",
                      "name": "América Latina"
                    }
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "Sergio.areman@gmail.com",
                    "contactType": "Customer Service",
                    "availableLanguage": ["Spanish"]
                  },
                  "serviceType": [
                    "Branding Estratégico",
                    "Diseño de Logos",
                    "Identidad Visual",
                    "Semiótica Visual",
                    "Motion Graphics"
                  ]
                }
                `}
            </Script>
            <Script id="schema-service" type="application/ld+json">
                {`
                {
                  "@context": "https://schema.org",
                  "@type": "Service",
                  "serviceType": "Branding Estratégico",
                  "provider": {
                    "@type": "ProfessionalService",
                    "name": "AREM4N"
                  },
                  "areaServed": {
                    "@type": "Country",
                    "name": "Chile"
                  },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Servicios de Branding LogoCodex™",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Diagnóstico Semiótico",
                          "description": "Análisis arquetípico y simbólico de identidad de marca. Evita la invisibilidad con base estratégica sólida."
                        },
                        "priceCurrency": "USD",
                        "price": "150-250"
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Arquitectura de Marca",
                          "description": "Sistema visual completo con motion graphics. El estándar de autoridad para startups."
                        },
                        "priceCurrency": "USD",
                        "price": "400-600"
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Soberanía Visual",
                          "description": "Dominio de mercado. Video corporativo con narrativa profunda y manual exhaustivo."
                        },
                        "priceCurrency": "USD",
                        "price": "900-1500"
                      }
                    ]
                  }
                }
                `}
            </Script>
            <Script id="schema-breadcrumb" type="application/ld+json">
                {`
                {
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Inicio",
                      "item": "https://areman.vercel.app/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "LogoCodex",
                      "item": "https://areman.vercel.app/logocodex"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Portafolio",
                      "item": "https://areman.vercel.app/#portafolio"
                    }
                  ]
                }
                `}
            </Script>
        </TransitionProvider>
    );
}
