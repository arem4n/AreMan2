'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLoading } from '@/components/LoadingContext';
import { useMenu } from '@/hooks/useMenu';
import Header from '@/components/Header';
import ElegantMenu from '@/components/ElegantMenu';
import { BackArrowIcon } from '@/components/icons/CodexIcons';
import { useLocalizedHref, isPlainLeftClick } from '@/hooks/useLocalizedHref';

/**
 * Marco de cada caso de estudio: la misma cabecera y menú del resto del sitio
 * (quien llega desde Google o un enlace compartido ve de inmediato de quién es
 * la página), un enlace de vuelta al portafolio dentro del flujo y el cierre
 * con la llamada a la acción. `customNavigate` ya resuelve los enlaces `#seccion`
 * desde fuera de la portada.
 */
export default function CaseStudyLayout({ children }: React.PropsWithChildren) {
    const { customNavigate } = useLoading();
    const { isMenuOpen, toggleMenu } = useMenu();
    const t = useTranslations('CaseStudyLayout');
    const localizedHref = useLocalizedHref();

    return (
        <div className="bg-deep-50 min-h-screen font-body overflow-x-hidden">
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={customNavigate} />
            <ElegantMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={customNavigate} />

            <main className="max-w-4xl mx-auto px-4 pt-24 pb-16 md:pt-32 lg:pb-24">
                <a
                    href={localizedHref('/portafolio')}
                    onClick={(e) => {
                        if (!isPlainLeftClick(e)) return;
                        e.preventDefault();
                        customNavigate('/portafolio');
                    }}
                    className="inline-flex items-center gap-2 mb-8 py-2 pr-3 text-sm font-semibold text-symbolic-700 hover:text-symbolic-600 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-symbolic-600"
                >
                    <BackArrowIcon className="w-4 h-4" />
                    {t('backButton')}
                </a>

                {children}

                <section className="text-center bg-symbolic-700 text-white p-10 rounded-2xl shadow-xl mt-16">
                    <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">{t('ctaTitle')}</h2>
                    <p className="text-lg text-symbolic-100 max-w-3xl mx-auto leading-relaxed">
                        {t('ctaDescription')}
                    </p>
                    <a
                        href={localizedHref('/#contacto')}
                        onClick={(e) => {
                            if (!isPlainLeftClick(e)) return;
                            e.preventDefault();
                            customNavigate('#contacto');
                        }}
                        className="mt-8 inline-block bg-creative-500 hover:bg-creative-600 text-deep-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl"
                    >
                        {t('ctaButton')}
                    </a>
                </section>
            </main>
        </div>
    );
}
