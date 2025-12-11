
import React from 'react';
import { trackEvent } from '../analytics';
import Link from 'next/link';

const LogoCodexCTA: React.FC = () => {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-deep-800 to-deep-900 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-creative-400 mb-6">
                    El Mecanismo Único detrás de la Identidad
                </h2>
                <p className="text-lg text-deep-200 leading-relaxed mb-8 max-w-2xl mx-auto">
                    La diferencia entre un "diseño bonito" y una marca inolvidable es el sistema que la construye. <strong>LogoCodex™</strong> no es solo teoría; es el protocolo que garantiza que tu marca no se pierda en el ruido digital.
                </p>
                <Link
                    href="/logocodex"
                    onClick={() => {
                        trackEvent('navigate_to_logocodex', { from: 'cta_section' });
                    }}
                    className="inline-block bg-creative-500 hover:bg-creative-600 text-deep-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                    Conocer la Metodología LogoCodex™
                </Link>
            </div>
        </section>
    );
};

export default LogoCodexCTA;
