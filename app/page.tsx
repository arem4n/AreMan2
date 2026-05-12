import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'AREM4N | Soberanía Visual & Branding Estratégico',
  description: 'LogoCodeX™: el sistema que construye identidades que justifican precios premium. Presencia, Autoridad, Legado — y las plataformas digitales donde viven.',
  openGraph: {
    title: 'AREM4N | Soberanía Visual',
    description: 'Tu competencia también tiene un logo. Probablemente se parece al tuyo. LogoCodeX™ cambia eso.',
    url: 'https://arem4n.com',
    siteName: 'AREM4N',
    images: [
      {
        url: '/images/og-arem4n.jpg',
        width: 1200,
        height: 630,
        alt: 'AREM4N — Soberanía Visual & Branding Estratégico',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AREM4N | Soberanía Visual',
    description: 'Tu competencia también tiene un logo. Probablemente se parece al tuyo.',
    images: ['/images/og-arem4n.jpg'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Por qué hablan de "Soberanía Visual" y no solo de diseño de logotipos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Porque un logotipo aislado es solo un adorno. La Soberanía Visual es la construcción de un activo financiero intangible. Diseño sistemas completos basados en arquetipos y semiótica profunda que permiten a tu marca dejar de competir por precio y empezar a liderar por autoridad.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es el nivel de involucramiento requerido por parte del fundador?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Requiere una colaboración profunda durante la Fase 1 (Diagnóstico Semiótico). Mi método LogoCodeX™ no funciona con formularios genéricos; necesito extraer la visión fundamental de los fundadores para codificarla en la identidad visual. Una vez superada esta fase, asumo el control técnico y arquitectónico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Trabajan con cualquier tipo de empresa o rubro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El método LogoCodeX™ no depende del rubro, depende de que haya algo real que contar. He trabajado con tecnología, servicios, gastronomía y más. Lo que sí requiero es compromiso con el proceso: si buscas un diseño rápido sin profundidad, mi forma de trabajar resultará excesiva para eso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué incluye exactamente la entrega de la Fase 3?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No entregamos archivos sueltos. Entregamos un ecosistema funcional. Esto incluye versiones vectoriales infinitamente escalables, sistemas cromáticos exactos, motion graphics listos para implementación en código (React/Next.js), iconografía UI personalizada y un Manual de Marca exhaustivo que dicta las reglas absolutas de tu nueva identidad.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo integran la Inteligencia Artificial en el proceso?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A través de mi pilar de "Creatividad Expandida". Uso modelos de IA avanzados para acelerar diagnósticos, generar iteraciones complejas y testear aplicaciones en tiempo récord. Sin embargo, la dirección de arte, la estrategia semiótica y el pulido final de los vectores se mantienen estrictamente bajo control humano para garantizar originalidad absoluta.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient />
    </>
  );
}
