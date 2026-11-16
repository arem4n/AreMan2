import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import OrigenClient from './OrigenClient';
import { pageMetadata, SITE_NAME } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    return pageMetadata({
        locale,
        path: '/origen',
        title: t('origenTitle'),
        description: t('origenDescription'),
        ogTitle: `${t('origenTitle')} | ${SITE_NAME}`,
    });
}

export default function OrigenPage({ params }: { params: { locale: string } }) {
    setRequestLocale(params.locale);
    return <OrigenClient />;
}
