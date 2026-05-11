"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { useLoading } from '@/components/LoadingContext';
import { MagneticButton } from '@/components/MagneticButton';
import Header from '@/components/Header';
import ElegantMenu from '@/components/ElegantMenu';
import Footer from '@/components/Footer';

// Hero stagger — solo para "Volver."
const StaggeredText = ({ text, className = '' }: { text: string, className?: string }) => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
    };
    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
    };
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className={className}>
            {text.split(' ').map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-3 mb-2">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

// Animación blur de scroll — usada una sola vez para la frase filosófica central
const ScrollBlurCard = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "center center"] });
    const blur = useTransform(scrollYProgress, [0, 1], ["blur(12px)", "blur(0px)"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
    return (
        <motion.div
            ref={ref}
            style={{ filter: blur, opacity, y }}
            className="p-8 md:p-14 bg-deep-800/50 border border-deep-700/50 rounded-2xl shadow-xl backdrop-blur-sm"
        >
            {children}
        </motion.div>
    );
};

// Reveal simple al entrar en viewport — reemplaza HandwritingTypewriter
const RevealText = ({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Marcador de capítulo
const ChapterLabel = ({ label }: { label: string }) => (
    <span className="font-mono text-xs tracking-[0.2em] text-creative-400 uppercase block mb-2">
        {label}
    </span>
);

export default function OrigenClient() {
    const { customNavigate } = useLoading();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const navigateTo = (path: string) => { customNavigate(path); };

    return (
        <div className="min-h-screen font-body selection:bg-symbolic-500/30 overflow-hidden bg-deep-900 text-deep-50">
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={navigateTo} />
            <ElegantMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={navigateTo} />

            <main className="relative w-full max-w-4xl mx-auto px-6 lg:px-12 py-32 md:py-48 flex flex-col gap-y-24 md:gap-y-40">

                {/* OPENING */}
                <section className="min-h-[60vh] flex flex-col justify-center">
                    <StaggeredText
                        text="Volver."
                        className="text-7xl md:text-8xl lg:text-[8rem] font-display font-bold leading-none tracking-tight mb-8 text-symbolic-600"
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight text-deep-100"
                    >
                        El momento que cambió cómo veo todo.
                    </motion.h1>
                </section>

                {/* ACTO I — Lo que el cine confirmó */}
                <section className="flex flex-col gap-10 md:gap-14">
                    <ChapterLabel label="Buenos Aires, 2012–2022" />

                    <RevealText className="text-xl md:text-2xl font-light leading-relaxed text-deep-200">
                        Hay un momento en la carrera donde dejás de ver imágenes y empezás a leerlas.
                        Para mí fue cuando entendí que todo comunica con intención, aunque el autor quiera desaparecer.
                        Que detrás de cada imagen, cada palabra, cada símbolo, hay una decisión que dice algo más de lo que parece.
                    </RevealText>

                    <ScrollBlurCard>
                        <p className="text-2xl md:text-3xl font-bold leading-relaxed text-white">
                            No existe la comunicación neutral. Solo existe la comunicación consciente y la inconsciente.
                        </p>
                        <p className="text-2xl md:text-3xl font-display font-medium leading-relaxed text-symbolic-400 italic mt-6">
                            Y que la diferencia entre las dos es enorme.
                        </p>
                    </ScrollBlurCard>

                    <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10">
                        <RevealText>
                            <p className="text-xs font-bold tracking-[0.2em] text-creative-400 uppercase mb-8">
                                Lo que el cine confirmó.
                            </p>
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-deep-100 mb-6">
                                Estudié Diseño de Imagen y Sonido en la FADU, Buenos Aires. Casi una década aprendiendo que cada plano tiene que justificar su existencia. Que el espacio, la luz y el símbolo comunican antes que las palabras.
                            </p>
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-symbolic-300 italic mb-6">
                                Que un personaje sin historia interna no convence a nadie, por más bien que se vea.
                            </p>
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-deep-100">
                                Con el tiempo empecé a aplicar eso a las marcas. Una marca es un personaje. Necesita una historia interna coherente para que el mundo externo la crea. Sin eso, es decoración que se ve bien en el portafolio pero no funciona en el mundo real.
                            </p>
                        </RevealText>
                    </div>
                </section>

                {/* ACTO II — La ruptura */}
                <section className="flex flex-col gap-8 md:gap-10">
                    <motion.h2
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-display font-bold text-white"
                    >
                        La ruptura.
                    </motion.h2>

                    <RevealText className="flex flex-col gap-6 max-w-2xl">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-deep-200">
                            Después de casi una década en Buenos Aires llegó un momento en que los marcos disponibles no alcanzaban. No porque fueran incorrectos. Porque mi forma de ver había crecido más allá de ellos.
                        </p>
                        <p className="text-2xl md:text-3xl font-bold leading-relaxed text-creative-400">
                            No podía seguir aplicando sistemas de otros sin traicionarme.
                        </p>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-deep-200">
                            Eso me obligó a hacer algo incómodo: construir mi propio sistema desde cero.
                        </p>
                    </RevealText>
                </section>

                {/* ACTO III — La vuelta al sur */}
                <section className="flex flex-col gap-8 md:gap-12">
                    <ChapterLabel label="Puerto Montt, 2022" />

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-display font-bold text-white text-right"
                    >
                        La vuelta al sur.
                    </motion.h2>

                    <RevealText className="text-xl md:text-2xl font-light leading-relaxed text-deep-200 text-right max-w-2xl ml-auto">
                        En 2022 volví a Chile. A Puerto Montt. Al lugar del que me había ido.
                    </RevealText>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="border-l-4 border-symbolic-400 pl-8 md:pl-12 py-2 flex flex-col gap-6"
                    >
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-deep-100">
                            Volví siendo otra persona. Con años de práctica, con preguntas propias y con algo que todavía no tenía nombre.
                        </p>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-deep-200">
                            Fue en esa vuelta donde empecé a ver con claridad algo que siempre había operado en mí: que la identidad genuina no se construye de afuera hacia adentro.
                        </p>
                        <p className="text-2xl md:text-3xl font-bold leading-relaxed text-symbolic-300">
                            Se construye al revés. Primero entender qué es real. Después hacerlo visible.
                        </p>
                    </motion.div>
                </section>

                {/* CIERRE */}
                <section className="min-h-[60vh] flex flex-col justify-center items-center text-center gap-12">
                    <RevealText className="flex flex-col items-center gap-8 w-full">
                        <p className="text-xl md:text-2xl font-light text-deep-300 max-w-2xl leading-relaxed">
                            No construí LogoCodeX™ para diferenciarme en el mercado. Lo construí porque no encontré ningún método que respondiera la pregunta que más me importaba:
                        </p>
                        <p className="text-4xl md:text-6xl font-display font-bold text-creative-400 italic max-w-4xl leading-tight">
                            ¿Cómo se hace visible lo que una empresa es realmente?
                        </p>
                        <p className="text-lg md:text-xl font-light text-deep-400 max-w-xl leading-relaxed">
                            Si llegaste hasta acá, probablemente es la misma pregunta que te trajo aquí.
                        </p>
                    </RevealText>

                    <MagneticButton
                        onClick={() => customNavigate('/#contacto')}
                        className="bg-symbolic-600 hover:bg-symbolic-700 text-white shadow-xl shadow-symbolic-600/20 px-12 py-6 text-xl"
                    >
                        Solicitar Auditoría de Identidad
                    </MagneticButton>
                </section>

            </main>
            <Footer />
        </div>
    );
}
