'use client';

import React from 'react';
import { trackEvent } from '../analytics';

interface LogoCodexTeaserProps {
    navigateTo: (path: string) => void;
}

const pillars = [
    {
        number: '01',
        title: 'Semiótica Visual',
        desc: 'Peirce & Barthes — denotación, connotación, mito.',
    },
    {
        number: '02',
        title: 'Psicología Arquetípica',
        desc: 'Jung & Pearson — el inconsciente colectivo de tu marca.',
    },
    {
        number: '03',
        title: 'Narrativa Estratégica',
        desc: 'El signo gráfico convertido en historia coherente.',
    },
];

const LogoCodexTeaser: React.FC<LogoCodexTeaserProps> = ({ navigateTo }) => {
    const handleCta = () => {
        trackEvent('navigate_to_logocodex', { from: 'home_teaser' });
        navigateTo('/portafolio');
    };

    return (
        <section className="py-24 lg:py-32 bg-deep-900 text-white overflow-hidden relative">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
                <span className="text-[20rem] font-display font-bold tracking-tighter text-white leading-none">LC</span>
            </div>

            <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="mb-16 lg:mb-20">
                    <span className="inline-block px-4 py-1.5 bg-symbolic-600/20 border border-symbolic-500/30 text-symbolic-300 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                        Metodología
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-display font-bold text-creative-400 leading-none tracking-tight mb-6">
                        Manual LogoCodeX™
                    </h2>
                    <p className="text-xl lg:text-2xl text-deep-200 max-w-2xl leading-relaxed">
                        El cerebro humano decide en <strong className="text-white">0.05 segundos</strong> si confía en tu marca. LogoCodeX™ es el sistema que hace esa decisión inevitable.
                    </p>
                </div>

                {/* Pilares */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {pillars.map((p) => (
                        <div
                            key={p.number}
                            className="group p-6 rounded-2xl border border-deep-700 bg-deep-800/50 hover:border-symbolic-500/50 hover:bg-deep-800 transition-all duration-300"
                        >
                            <span className="block font-mono text-symbolic-500 text-sm font-bold mb-3">{p.number}</span>
                            <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-creative-300 transition-colors duration-300">
                                {p.title}
                            </h3>
                            <p className="text-deep-400 text-sm leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <button
                        onClick={handleCta}
                        className="inline-flex items-center gap-3 bg-symbolic-600 hover:bg-symbolic-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl shadow-symbolic-900/50 hover:shadow-symbolic-700/40 hover:scale-105"
                    >
                        Explorar el Manual Completo
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                    <span className="text-deep-500 text-sm">
                        Incluye casos de estudio y metodología completa
                    </span>
                </div>
            </div>
        </section>
    );
};

export default LogoCodexTeaser;
