import LogoCodexClient from '@/components/logocodex/LogoCodexClient';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    return {
        title: t('portfolioTitle'),
        description: t('portfolioDescription'),
    };
}

export default function LogoCodexPage({ params }: { params: { locale: string } }) {
    setRequestLocale(params.locale);
    return <LogoCodexClient />;
}
