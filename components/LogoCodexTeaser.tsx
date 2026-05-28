'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '../analytics';
import { Icon, IconName } from './icons/Icons';

interface LogoCodexTeaserProps {
    navigateTo: (path: string) => void;
}

const pillarIcons: { icon: IconName; number: string; titleKey: string; descKey: string }[] = [
    { icon: 'codex-semiotica', number: '01', titleKey: 'pillar01Title', descKey: 'pillar01Desc' },
    { icon: 'codex-arquetipos', number: '02', titleKey: 'pillar02Title', descKey: 'pillar02Desc' },
    { icon: 'codex-narrativa', number: '03', titleKey: 'pillar03Title', descKey: 'pillar03Desc' },
];

const LogoCodexTeaser: React.FC<LogoCodexTeaserProps> = ({ navigateTo }) => {
    const t = useTranslations('LogoCodexTeaser');

    const handleCta = () => {
        trackEvent('navigate_to_logocodex', { from: 'home_teaser' });
        navigateTo('/portafolio');
    };

    return (
        <section className="py-24 lg:py-40 bg-deep-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
                <span className="text-[20rem] font-display font-bold tracking-tighter text-white leading-none">LC</span>
            </div>

            <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
                <div className="mb-16 lg:mb-20">
                    <span className="inline-block px-4 py-1.5 bg-symbolic-600/20 border border-symbolic-500/30 text-symbolic-300 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                        {t('tag')}
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-display font-bold text-creative-400 leading-none tracking-tight mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl lg:text-2xl text-deep-200 max-w-2xl leading-relaxed">
                        {t.rich('description', {
                            strong: (chunks) => <strong className="text-white">{chunks}</strong>
                        })}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {pillarIcons.map((p) => (
                        <div
                            key={p.number}
                            className="group p-8 rounded-2xl border border-deep-700 bg-deep-800/50 hover:border-symbolic-500/50 hover:bg-deep-800 transition-all duration-300"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-deep-700 rounded-xl mb-6 text-creative-400 group-hover:text-symbolic-400 transition-colors duration-300">
                                <Icon name={p.icon} size={28} />
                            </div>
                            <span className="block font-mono text-deep-500 text-xs font-bold mb-3 uppercase tracking-widest">
                                {p.number} / {t('pillar')}
                            </span>
                            <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-creative-300 transition-colors duration-300">
                                {t(p.titleKey as any)}
                            </h3>
                            <p className="text-deep-400 text-sm leading-relaxed">{t(p.descKey as any)}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <button
                        onClick={handleCta}
                        className="inline-flex items-center gap-3 bg-symbolic-600 hover:bg-symbolic-500 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-xl shadow-symbolic-900/50 hover:shadow-symbolic-700/40 hover:scale-105"
                    >
                        {t('cta')}
                        <Icon name="ui-arrow-right" size={20} />
                    </button>
                    <span className="text-deep-500 text-sm">{t('ctaSub')}</span>
                </div>
            </div>
        </section>
    );
};

export default LogoCodexTeaser;
