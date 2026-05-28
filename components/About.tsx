import React from 'react';
import { useTranslations } from 'next-intl';
import { useLoading } from './LoadingContext';

const About: React.FC = () => {
    const { customNavigate } = useLoading();
    const t = useTranslations('About');

    return (
        <section id="origen" className="py-16 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-symbolic-100 text-symbolic-600 text-xs font-bold tracking-widest uppercase mb-4">
                    {t('tag')}
                </span>
                <h2 className="text-fluid-section font-display font-bold text-deep-800 mb-8">
                    {t('headline')}
                </h2>
                <div className="text-lg md:text-xl text-deep-700 leading-relaxed mb-10 max-w-3xl mx-auto space-y-6 text-left md:text-center">
                    <p>{t('p1')}</p>
                    <p>{t('p2')}</p>
                    <p>
                        <strong className="text-symbolic-600">LogoCodeX™</strong>{' '}{t('p3')}
                    </p>
                    <p className="text-deep-500 text-base">{t('byline')}</p>
                </div>
                <button
                    onClick={() => customNavigate('/origen')}
                    className="inline-flex items-center text-symbolic-600 font-bold text-lg hover:text-symbolic-700 transition-colors group"
                >
                    {t('cta')}
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </button>
            </div>
        </section>
    );
};

export default About;
