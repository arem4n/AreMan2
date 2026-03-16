"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { useLoading } from '@/components/LoadingContext';
import { BackArrowIcon } from '@/components/icons/CodexIcons';
import { MagneticButton } from '@/components/MagneticButton';
import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

// Staggered Text Reveal
const StaggeredText = ({ text, className = '' }: { text: string, className?: string }) => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
        }
    };

    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={className}
        >
            {text.split(' ').map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-3 mb-2">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

// Scroll Blur Card
const ScrollBlurCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "center center"]
    });

    const blur = useTransform(scrollYProgress, [0, 1], ["blur(12px)", "blur(0px)"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [50 * (index + 1), 0]);

    return (
        <motion.div
            ref={ref}
            style={{ filter: blur, opacity, y }}
            className="p-8 md:p-12 bg-white/50 border border-deep-200/50 rounded-2xl shadow-sm backdrop-blur-sm"
        >
            {children}
        </motion.div>
    );
};

// Typewriter handwriting effect
const HandwritingTypewriter = ({ text }: { text: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <span ref={ref} className="inline-block">
            {text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.03, delay: index * 0.03 }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};


export default function OrigenClient() {
    const { customNavigate } = useLoading();
    const ruptureRef = useRef<HTMLDivElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsDarkMode(entry.isIntersecting);
            },
            { threshold: 0.4, rootMargin: "0px 0px -20% 0px" }
        );

        if (ruptureRef.current) {
            observer.observe(ruptureRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`min-h-screen font-body transition-colors duration-1000 ease-in-out selection:bg-symbolic-500/30 overflow-hidden
                ${isDarkMode ? 'bg-deep-900 text-deep-50' : 'bg-deep-50 text-deep-800'}
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

            <main className="relative w-full max-w-5xl mx-auto px-6 lg:px-12 py-32 md:py-48 flex flex-col gap-y-48 md:gap-y-64">

                {/* 1. Hero / Introducción */}
                <section className="min-h-[60vh] flex flex-col justify-center">
                    <StaggeredText
                        text="Volver."
                        className="text-7xl md:text-8xl lg:text-[8rem] font-display font-bold leading-none tracking-tight mb-8 text-symbolic-600"
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight text-deep-800"
                    >
                        El momento que cambió cómo veo todo.
                    </motion.h1>
                </section>

                {/* 2. El Despertar Visual */}
                <section className="flex flex-col gap-8 md:gap-16">
                    <ScrollBlurCard index={0}>
                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-deep-700">
                            Hay un momento en la carrera donde dejás de ver imágenes y empezás a leerlas.
                        </p>
                    </ScrollBlurCard>

                    <ScrollBlurCard index={1}>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-deep-600">
                            Para mí fue cuando entendí que todo comunica con intención, aunque el autor quiera desaparecer. Que detrás de cada imagen, cada palabra, cada símbolo, hay una decisión que dice algo más de lo que parece.
                        </p>
                    </ScrollBlurCard>

                    <ScrollBlurCard index={2}>
                        <p className="text-2xl md:text-3xl font-bold leading-relaxed text-deep-800">
                            No existe la comunicación neutral. Solo existe la comunicación consciente y la inconsciente.
                        </p>
                    </ScrollBlurCard>

                    <ScrollBlurCard index={3}>
                        <p className="text-2xl md:text-4xl font-display font-medium leading-relaxed text-symbolic-600 italic">
                            Y que la diferencia entre las dos es enorme.
                        </p>
                    </ScrollBlurCard>
                </section>

                {/* 3. La Etapa FADU / Buenos Aires (Efecto Manuscrito) */}
                <section className="py-20 flex flex-col gap-12">
                    <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-deep-100 relative overflow-hidden">
                        {/* Papel texture / grid sutil */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        <div className={`${caveat.className} text-3xl md:text-5xl font-bold leading-relaxed md:leading-loose text-deep-800 max-w-3xl mx-auto relative z-10`}>
                            <p className="mb-8">
                                <HandwritingTypewriter text="Lo que el cine confirmó." />
                            </p>
                            <p className="mb-8">
                                <HandwritingTypewriter text="Estudié Diseño de Imagen y Sonido en la FADU, Buenos Aires. Casi una década aprendiendo que cada plano tiene que justificar su existencia. Que el espacio, la luz y el símbolo comunican antes que las palabras." />
                            </p>
                            <p className="mb-8 text-symbolic-600">
                                <HandwritingTypewriter text="Que un personaje sin historia interna no convence a nadie, por más bien que se vea." />
                            </p>
                            <p>
                                <HandwritingTypewriter text="Con el tiempo empecé a aplicar eso a las marcas. Una marca es un personaje. Necesita una historia interna coherente para que el mundo externo la crea. Sin eso, es decoración que se ve bien en el portafolio pero no funciona en el mundo real." />
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. La Ruptura y La Vuelta al Sur (Modo Oscuro Alto Contraste) */}
                <section ref={ruptureRef} className="min-h-[150vh] flex flex-col pt-32 gap-y-48">
                    {/* La ruptura */}
                    <div className="flex flex-col gap-12 max-w-3xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-display font-bold text-white mb-8"
                        >
                            La ruptura.
                        </motion.h2>
                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-deep-100">
                            Después de casi una década en Buenos Aires llegó un momento en que los marcos disponibles no alcanzaban. No porque fueran incorrectos. Porque mi forma de ver había crecido más allá de ellos.
                        </p>
                        <p className="text-3xl md:text-4xl font-bold leading-relaxed text-creative-400">
                            No podía seguir aplicando sistemas de otros sin traicionarme.
                        </p>
                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-deep-100">
                            Eso me obligó a hacer algo incómodo: construir mi propio sistema desde cero.
                        </p>
                    </div>

                    {/* La Vuelta al Sur */}
                    <div className="flex flex-col gap-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-display font-bold text-white text-right"
                        >
                            La vuelta al sur.
                        </motion.h2>

                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-deep-100 text-right max-w-2xl ml-auto">
                            En 2022 volví a Chile. A Puerto Montt. Al lugar del que me había ido.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-deep-800 border border-deep-700 p-10 md:p-16 rounded-3xl shadow-2xl mt-12"
                        >
                            <span className="text-sm font-bold tracking-widest text-creative-400 uppercase mb-8 block">Puerto Montt, 2022</span>
                            <p className="text-3xl md:text-4xl font-display font-medium leading-relaxed text-white mb-10">
                                Volví siendo otra persona. Con años de práctica, con preguntas propias y con algo que todavía no tenía nombre.
                            </p>
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-deep-200 mb-10">
                                Fue en esa vuelta donde empecé a ver con claridad algo que siempre había operado en mí: que la identidad genuina no se construye de afuera hacia adentro.
                            </p>
                            <p className="text-2xl md:text-3xl font-bold leading-relaxed text-symbolic-400">
                                Se construye al revés. Primero entender qué es real. Después hacerlo visible.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 5. El Cierre y CTA */}
                <section className="min-h-[80vh] flex flex-col justify-center items-center text-center gap-12 mt-20 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-16">Por qué importa.</h2>
                        <p className="text-2xl md:text-3xl font-light text-deep-100 mb-8 max-w-3xl leading-relaxed">
                            No construí LogoCodeX™ para diferenciarme en el mercado.
                        </p>
                        <p className="text-2xl md:text-3xl font-light text-deep-100 mb-16 max-w-3xl leading-relaxed">
                            Lo construí porque no encontré ningún método que respondiera la pregunta que más me importaba:
                        </p>

                        <p className="text-4xl md:text-6xl font-display font-bold text-creative-400 italic mb-20 max-w-4xl leading-tight">
                            ¿Cómo se hace visible lo que una empresa es realmente?
                        </p>

                        <p className="text-xl md:text-2xl font-light text-deep-300 mb-10">
                            Esa pregunta sigue siendo el centro de cada proyecto que tomo.
                        </p>
                        <p className="text-xl md:text-2xl font-medium text-white mb-24">
                            Si llegaste hasta acá, probablemente es la misma pregunta que te trajo aquí.
                        </p>

                        <MagneticButton
                            onClick={() => customNavigate('/#contacto')}
                            className="bg-symbolic-600 hover:bg-symbolic-700 text-white shadow-xl shadow-symbolic-600/20 px-12 py-6 text-xl"
                        >
                            Solicitar Auditoría de Identidad
                        </MagneticButton>
                    </motion.div>
                    {/* NO FOOTER HERE */}
                </section>
            </main>
        </div>
    );
}
