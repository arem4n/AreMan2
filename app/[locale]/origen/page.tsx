import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import OrigenClient from './OrigenClient';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    return {
        title: t('origenTitle'),
        description: t('origenDescription'),
    };
}

export default function OrigenPage({ params }: { params: { locale: string } }) {
    setRequestLocale(params.locale);
    return <OrigenClient />;
}
