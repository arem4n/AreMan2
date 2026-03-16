"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLoading } from '@/components/LoadingContext';
import { BackArrowIcon } from '@/components/icons/CodexIcons';
import { MagneticButton } from '@/components/MagneticButton';

// Utility for smooth reveal
const FadeInText = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Scroll Blur Text
const ScrollBlurText = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "center center"]
    });

    const blur = useTransform(scrollYProgress, [0, 1], ["blur(8px)", "blur(0px)"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ filter: blur, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function OrigenClient() {
    const { customNavigate } = useLoading();
    const ruptureRef = useRef<HTMLDivElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Using Intersection Observer to trigger dark mode when "La ruptura" is roughly centered
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If it intersects at least 50%, we consider it entering the main reading zone
                setIsDarkMode(entry.isIntersecting);
            },
            { threshold: 0.5, rootMargin: "0px 0px -20% 0px" } // Trigger when entering the middle
        );

        if (ruptureRef.current) {
            observer.observe(ruptureRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const [isGridVisible, setIsGridVisible] = useState(false);

    return (
        <div
            className={`min-h-screen font-body transition-colors duration-1000 ease-in-out selection:bg-symbolic-500/30
                ${isDarkMode ? 'bg-slate-950 text-neutral-100' : 'bg-neutral-50 text-slate-900'}
            `}
        >
            {/* Minimal Header / Back Button */}
            <nav className="fixed top-0 left-0 w-full p-6 lg:p-10 z-50 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
                <button
                    onClick={() => customNavigate('/')}
                    className="pointer-events-auto flex items-center justify-center bg-transparent border-none text-white hover:text-creative-400 transition-colors group p-2"
                    aria-label="Volver al Inicio"
                >
                    <BackArrowIcon className="w-6 h-6 lg:w-8 lg:h-8 transition-transform group-hover:-translate-x-2" />
                    <span className="hidden md:inline ml-4 text-sm md:text-base font-bold uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-300">
                        Volver
                    </span>
                </button>
            </nav>

            <main className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12 py-32 md:py-48 flex flex-col gap-y-48 md:gap-y-64">

                {/* 1. Hero / Introducción */}
                <section className="min-h-[60vh] flex flex-col justify-center">
                    <motion.h1
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="text-5xl md:text-7xl lg:text-[6rem] font-display font-bold leading-[1.1] tracking-tight mb-8"
                    >
                        El momento<br/>que cambió<br/>cómo veo todo.
                    </motion.h1>
                </section>

                {/* 2. El Despertar Visual */}
                <section className="flex flex-col gap-12 text-xl md:text-3xl font-light leading-relaxed md:leading-[1.6] tracking-wide text-slate-600 dark:text-slate-300 transition-colors duration-1000">
                    <ScrollBlurText>
                        <p className="mb-8">Hay un momento en la carrera donde dejás de ver imágenes y empezás a leerlas.</p>
                        <p className="mb-8">Para mí fue cuando entendí que todo comunica con intención, aunque el autor quiera desaparecer. Que detrás de cada imagen, cada palabra, cada símbolo, hay una decisión que dice algo más de lo que parece.</p>
                        <p className="mb-8 font-medium text-slate-900 dark:text-white transition-colors duration-1000">
                            No existe la comunicación neutral. Solo existe la comunicación consciente y la inconsciente.
                        </p>
                        <p>Y que la diferencia entre las dos es enorme.</p>
                    </ScrollBlurText>
                </section>

                {/* 3. Revelación de Estructura */}
                <section
                    className="relative flex flex-col gap-12 text-lg md:text-2xl font-light leading-relaxed md:leading-[1.8] py-20 transition-colors duration-1000"
                    onMouseEnter={() => setIsGridVisible(true)}
                    onMouseLeave={() => setIsGridVisible(false)}
                >
                    {/* Background Grid Pattern (Revealed on hover) */}
                    <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out -z-10
                            ${isGridVisible ? 'opacity-10 dark:opacity-5' : 'opacity-0'}
                        `}
                        style={{
                            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    ></div>

                    <FadeInText>
                        <blockquote className="border-l-4 border-slate-300 dark:border-slate-700 pl-6 md:pl-10 italic mb-16 text-slate-500 dark:text-slate-400">
                            &quot;Eso me hizo ver las marcas de otra manera. Una marca no es un logo. Es un sistema de decisiones que comunica algo constantemente, quiera o no. La pregunta no es si tu marca está diciendo algo. La pregunta es si está diciendo lo que quieres decir.&quot;
                        </blockquote>
                    </FadeInText>

                    <FadeInText delay={0.2}>
                        <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 text-slate-900 dark:text-white transition-colors duration-1000">Lo que el cine confirmó.</h3>
                        <p className="mb-8">Estudié Diseño de Imagen y Sonido en la FADU, Buenos Aires. Casi una década aprendiendo que cada plano tiene que justificar su existencia. Que el espacio, la luz y el símbolo comunican antes que las palabras.</p>
                        <p className="mb-8 font-medium">Que un personaje sin historia interna no convence a nadie, por más bien que se vea.</p>
                        <p>Con el tiempo empecé a aplicar eso a las marcas. Una marca es un personaje. Necesita una historia interna coherente para que el mundo externo la crea. Sin eso, es decoración que se ve bien en el portafolio pero no funciona en el mundo real.</p>
                    </FadeInText>
                </section>

                {/* 4. La Ruptura (Triggers Dark Mode) */}
                <section ref={ruptureRef} className="min-h-[50vh] flex flex-col justify-center gap-12 text-xl md:text-3xl font-light leading-relaxed md:leading-[1.6]">
                    <FadeInText>
                        <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-display font-bold mb-16 tracking-tight">La ruptura.</h2>
                        <p className="mb-10">Después de casi una década en Buenos Aires llegó un momento en que los marcos disponibles no alcanzaban. No porque fueran incorrectos. Porque mi forma de ver había crecido más allá de ellos.</p>
                        <p className="mb-10 font-bold text-white">No podía seguir aplicando sistemas de otros sin traicionarme.</p>
                        <p>Eso me obligó a hacer algo incómodo: construir mi propio sistema desde cero.</p>
                    </FadeInText>
                </section>

                {/* 5. La Vuelta al Sur */}
                <section className="flex flex-col gap-16 text-lg md:text-2xl font-light leading-relaxed md:leading-[1.8] text-slate-300">
                    <FadeInText>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 text-white">La vuelta al sur.</h2>
                        <p className="mb-10">En 2022 volví a Chile. A Puerto Montt. Al lugar del que me había ido.</p>
                        <p className="mb-10"><span className="font-medium text-white block mb-2">Puerto Montt, 2022.</span> Volví siendo otra persona. Con años de práctica, con preguntas propias y con algo que todavía no tenía nombre.</p>
                        <p className="mb-10">Fue en esa vuelta donde empecé a ver con claridad algo que siempre había operado en mí: que la identidad genuina no se construye de afuera hacia adentro.</p>
                        <p className="font-bold text-2xl md:text-4xl text-white leading-tight">Se construye al revés. Primero entender qué es real. Después hacerlo visible.</p>
                    </FadeInText>
                </section>

                {/* 6. El Cierre y CTA */}
                <section className="min-h-[80vh] flex flex-col justify-center items-center text-center gap-12 mt-20">
                    <FadeInText className="flex flex-col items-center">
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-12">Por qué importa.</h2>
                        <p className="text-xl md:text-2xl font-light text-slate-300 mb-8 max-w-2xl">No construí LogoCodeX™ para diferenciarme en el mercado.</p>
                        <p className="text-xl md:text-2xl font-light text-slate-300 mb-12 max-w-2xl">Lo construí porque no encontré ningún método que respondiera la pregunta que más me importaba:</p>

                        <p className="text-3xl md:text-5xl font-display font-medium text-creative-400 italic mb-16 max-w-3xl leading-tight">¿Cómo se hace visible lo que una empresa es realmente?</p>

                        <p className="text-lg md:text-xl font-light text-slate-400 mb-8">Esa pregunta sigue siendo el centro de cada proyecto que tomo.</p>
                        <p className="text-lg md:text-xl font-medium text-slate-200 mb-20">Si llegaste hasta acá, probablemente es la misma pregunta que te trajo aquí.</p>

                        <div className="mb-32">
                            <MagneticButton
                                onClick={() => customNavigate('/#contacto')}
                                className="bg-white text-slate-950 hover:bg-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                            >
                                Solicitar Auditoría de Identidad
                            </MagneticButton>
                        </div>

                        {/* Footer minimalista de la página */}
                        <div className="flex flex-col gap-8 text-sm md:text-base text-slate-500 font-light tracking-widest uppercase">
                            <p className="text-slate-400">AREM4N</p>
                            <p className="normal-case tracking-normal italic text-slate-400 max-w-md mx-auto">&quot;Cada símbolo cuenta una historia. Cada diseño tiene alma. Cada marca puede trascender.&quot;<br/><span className="block mt-4 not-italic font-medium">Sergio Arellano</span></p>
                            <p className="mt-12 text-xs">AreMan, 2026</p>
                            <div className="flex flex-col gap-2 text-xs text-slate-600 mt-8 border-t border-slate-800 pt-8 w-full max-w-xs mx-auto">
                                <p>© 2026 AREM4N - Diseño Simbólico & Narrativa Visual</p>
                                <p>AREM4N | Soberanía Visual & Branding Estratégico</p>
                            </div>
                        </div>
                    </FadeInText>
                </section>
            </main>
        </div>
    );
}
