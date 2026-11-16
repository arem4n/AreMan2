'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLoading } from '@/components/LoadingContext';
import { useLocalizedHref, isPlainLeftClick } from '@/hooks/useLocalizedHref';

export default function LocaleNotFound() {
    const t = useTranslations('NotFound');
    const { customNavigate } = useLoading();
    const localizedHref = useLocalizedHref();

    // Cuando el 404 viene de notFound(), Next 14 responde con un cascarón de
    // error (estado 404 + noindex) y esta página se pinta en el cliente, con el
    // <title> del layout. Lo corregimos aquí.
    useEffect(() => {
        document.title = `${t('metaTitle')} | AREM4N`;
    }, [t]);

    const go = (target: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isPlainLeftClick(e)) return;
        e.preventDefault();
        customNavigate(target);
    };

    return (
        <main className="min-h-screen bg-deep-900 text-white flex items-center justify-center px-6 py-24 font-body">
            <div className="max-w-xl text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-white.webp" alt="AREM4N" className="h-16 w-auto mx-auto mb-10" />
                <p className="font-mono text-xs font-bold tracking-widest uppercase text-creative-300 mb-4">
                    {t('code')}
                </p>
                <h1 className="text-fluid-hero font-display font-bold mb-6">{t('title')}</h1>
                <p className="text-lg text-deep-200 leading-relaxed mb-10">{t('description')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href={localizedHref('/')}
                        onClick={go('/')}
                        className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-4 px-8 rounded-full transition duration-200 ease-out border border-symbolic-500"
                    >
                        {t('ctaHome')}
                    </a>
                    <a
                        href={localizedHref('/portafolio')}
                        onClick={go('/portafolio')}
                        className="inline-block bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full transition duration-200 ease-out border border-white/30 hover:border-white/60"
                    >
                        {t('ctaPortfolio')}
                    </a>
                </div>
            </div>
        </main>
    );
}
