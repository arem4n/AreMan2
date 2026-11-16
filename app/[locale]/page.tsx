import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import HomePageClient from './HomePageClient';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return pageMetadata({
        locale,
        path: '/',
        title: t('homeTitle'),
        description: t('homeDescription'),
        ogTitle: t('homeOgTitle'),
        ogDescription: t('homeOgDescription'),
    });
}

const FAQ_ITEMS = [1, 2, 3, 4, 5] as const;

export default async function HomePage({ params }: { params: { locale: string } }) {
    setRequestLocale(params.locale);

    // Los datos estructurados salen de los mismos textos que se ven en la
    // sección de preguntas frecuentes (namespace `FAQ`), en el idioma de la
    // página: una sola fuente, y `/en` ya no publica las preguntas en español.
    const t = await getTranslations({ locale: params.locale, namespace: 'FAQ' });
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: params.locale,
        mainEntity: FAQ_ITEMS.map(n => ({
            '@type': 'Question',
            name: t(`q${n}`),
            acceptedAnswer: { '@type': 'Answer', text: t(`a${n}`) },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
            />
            <HomePageClient />
        </>
    );
}
