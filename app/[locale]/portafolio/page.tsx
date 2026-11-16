import LogoCodexClient from '@/components/logocodex/LogoCodexClient';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { pageMetadata, SITE_NAME } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    return pageMetadata({
        locale,
        path: '/portafolio',
        title: t('portfolioTitle'),
        description: t('portfolioDescription'),
        ogTitle: `${t('portfolioTitle')} | ${SITE_NAME}`,
    });
}

export default function LogoCodexPage({ params }: { params: { locale: string } }) {
    setRequestLocale(params.locale);
    return <LogoCodexClient />;
}
