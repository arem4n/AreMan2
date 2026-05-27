
import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { whiteLogoUrl } from '../constants';

const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const logoItem = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const heroItem = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

interface HeroProps {
    navigateTo: (hash: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
    const shouldReduce = useReducedMotion();
    const initial = shouldReduce ? 'visible' : 'hidden';

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo('#contacto');
    };

    return (
        <section id="inicio" className="bg-deep-900 py-20 lg:py-32 relative overflow-hidden">
            <motion.div
                variants={heroContainer}
                initial={initial}
                animate="visible"
                className="relative max-w-6xl mx-auto px-4 text-center text-white"
            >
                <motion.div variants={logoItem} className="relative w-40 md:w-48 h-16 md:h-20 mx-auto mb-8">
                    <Image
                        src={whiteLogoUrl}
                        alt="Logotipo AREM4N"
                        fill
                        priority
                        sizes="(max-width: 768px) 160px, 192px"
                        className="object-contain"
                    />
                </motion.div>
                <motion.h1 variants={heroItem} className="text-fluid-hero font-display font-bold mb-4">
                    Tu competencia también tiene un logo...
                </motion.h1>
                <motion.p variants={heroItem} className="text-xl lg:text-3xl font-display text-white mb-8 max-w-4xl mx-auto italic opacity-90">
                    Probablemente se parece al tuyo.
                </motion.p>
                <motion.p variants={heroItem} className="text-base md:text-lg text-deep-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                    <strong className="text-creative-400">LogoCodeX™</strong> no parte del diseño. Parte de entender qué hace única a tu empresa, y después lo hace visible.
                </motion.p>
                <motion.div variants={heroItem} className="flex flex-col md:flex-row gap-4 justify-center">
                    <a
                        href="#contacto"
                        onClick={handleContactClick}
                        className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-4 px-8 rounded-full transition duration-200 ease-out shadow-lg hover:shadow-xl hover:scale-[1.03] border border-symbolic-500"
                    >
                        Solicitar Auditoría
                    </a>
                    <a
                        href="/portafolio"
                        onClick={(e) => { e.preventDefault(); navigateTo('/portafolio'); }}
                        className="inline-block bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full transition duration-200 ease-out border border-white/30 hover:border-white/60"
                    >
                        Descubrir LogoCodeX™
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
