
import React from 'react';
import { whiteLogoUrl } from '../constants';

interface HeroProps {
    navigateTo: (hash: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateTo }) => {

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo('#contacto');
    };

    return (
        <section id="inicio" className="bg-gradient-to-br from-deep-800 via-deep-600 to-symbolic-600 py-20 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
                {/* Performance Optimization: Added fetchpriority and decoding sync for LCP */}
                <img 
                    src={whiteLogoUrl} 
                    alt="Logotipo AREM4N" 
                    className="w-40 md:w-48 h-auto mx-auto mb-8 animate-float"
                    // @ts-ignore
                    fetchpriority="high"
                    decoding="sync"
                />
                <div className="animate-float" style={{ animationDelay: '0.5s' }}>
                    <h1 className="text-4xl lg:text-7xl font-display font-bold leading-tight mb-4">
                        Tu Startup merece más que una plantilla vacía.
                    </h1>
                    <p className="text-xl lg:text-2xl font-display text-creative-400 mb-8 max-w-4xl mx-auto">
                        En un mercado saturado de tendencias efímeras, utilizo la metodología <strong className="text-white border-b border-creative-400">LogoCodex™</strong> para inyectar identidad estratégica, semiótica y narrativa a tu marca.
                    </p>
                    <p className="text-sm md:text-base text-deep-100 mb-10 font-mono bg-black/20 inline-block px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                        Estrategia + Semiótica = Identidad Soberana
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a 
                        href="#contacto" 
                        onClick={handleContactClick}
                        className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-symbolic-400"
                    >
                        Solicitar Auditoría de Identidad
                    </a>
                    <a 
                        href="/portafolio"
                        onClick={(e) => { e.preventDefault(); navigateTo('/portafolio'); }}
                        className="inline-block bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/30 hover:border-white"
                    >
                        Descubrir LogoCodex™
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
