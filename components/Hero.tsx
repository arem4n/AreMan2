
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
                        Tu competencia también tiene un logo...
                    </h1>
                    <p className="text-xl lg:text-3xl font-display text-white mb-8 max-w-4xl mx-auto italic opacity-90">
                         Probablemente se parece al tuyo.
                    </p>
                    <p className="text-base md:text-lg text-deep-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        <strong className="text-creative-400">LogoCodeX™</strong> no parte del diseño. Parte de entender qué hace única a tu empresa, y después lo hace visible.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a 
                        href="#contacto" 
                        onClick={handleContactClick}
                        className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-symbolic-400"
                    >
                        Solicitar Auditoría
                    </a>
                    <a 
                        href="/origen" // Updated link based on "Descubrir LogoCodeX™" usually leading to the method/origin page
                         onClick={(e) => { e.preventDefault(); navigateTo('/origen'); }}
                        className="inline-block bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/30 hover:border-white"
                    >
                        Descubrir LogoCodeX™
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
