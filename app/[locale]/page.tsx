import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import HomePageClient from './HomePageClient';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    const isEs = locale === 'es';

    return {
        title: t('homeTitle'),
        description: t('homeDescription'),
        openGraph: {
            title: t('homeOgTitle'),
            description: t('homeOgDescription'),
            url: 'https://arem4n.com',
            siteName: 'AREM4N',
            images: [
                {
                    url: '/images/og-arem4n.webp',
                    width: 1200,
                    height: 630,
                    alt: t('homeOgTitle'),
                },
            ],
            locale: isEs ? 'es_CL' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('homeOgTitle'),
            description: t('homeOgDescription'),
            images: ['/images/og-arem4n.webp'],
        },
    };
}

const faqSchemaEs = {
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
                text: 'Requiere una colaboración profunda durante la Fase 1 (Diagnóstico Semiótico). Mi método LogoCodeX™ no funciona con formularios genéricos; necesito extraer la visión fundamental de los fundadores para codificarla en la identidad visual.',
            },
        },
        {
            '@type': 'Question',
            name: '¿Trabajan con cualquier tipo de empresa o rubro?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sí. El método LogoCodeX™ no depende del rubro, depende de que haya algo real que contar.',
            },
        },
        {
            '@type': 'Question',
            name: '¿Qué incluye exactamente la entrega de la Fase 3?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No entregamos archivos sueltos. Entregamos un ecosistema funcional con versiones vectoriales, sistemas cromáticos, motion graphics y Manual de Marca.',
            },
        },
        {
            '@type': 'Question',
            name: '¿Cómo integran la Inteligencia Artificial en el proceso?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A través de mi pilar de "Creatividad Expandida". Uso modelos de IA avanzados para acelerar diagnósticos, generar iteraciones complejas y testear aplicaciones en tiempo récord.',
            },
        },
    ],
};

export default function HomePage({ params }: { params: { locale: string } }) {
    setRequestLocale(params.locale);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaEs) }}
            />
            <HomePageClient />
        </>
    );
}
