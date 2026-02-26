"use client";

import React from 'react';
import { useLoading } from '@/components/LoadingContext';
import { BackArrowIcon } from '@/components/icons/CodexIcons';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import ScrollytellingMap from '@/components/ScrollytellingMap';

const NarrativeCard = ({ title, text, index }: { title: string, text: string, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="glass-card glass-card-hover p-8 md:p-12 rounded-3xl mb-8 group"
    >
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/4">
                <span className="text-symbolic-500 font-display text-4xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                    ACTO {index + 1}
                </span>
                <h3 className="text-white font-display text-xl font-bold tracking-wider uppercase mt-2">
                    {title}
                </h3>
            </div>
            <div className="md:w-3/4">
                <p className="text-deep-100 text-lg md:text-xl leading-relaxed font-light">
                    {text}
                </p>
            </div>
        </div>
    </motion.div>
);

export default function OrigenPage() {
    const { customNavigate } = useLoading();

    const navigateTo = (path: string) => {
        if (path.startsWith('#')) {
            sessionStorage.setItem('scrollToSection', path);
            customNavigate('/');
        } else {
            customNavigate(path);
        }
    };

    const narrative = [
        {
            title: "El error que se volvió método",
            text: "En la UBA aprendí que cada plano cuenta una historia y que los símbolos activan significados inconscientes. No sabía que estaba aprendiendo a leer identidades. Lo apliqué a marcas, no a películas."
        },
        {
            title: "Cuando la máquina se volvió espejo",
            text: "En 2024, usé la IA para nombrar lo que ya hacía por intuición. Así nació LogoCodeX™: la sistematización de décadas de práctica. 6 pasos documentados, 48 páginas de manual. La IA no creó el método; la IA me mostró que el método ya existía."
        },
        {
            title: "Arquitectura de Identidad",
            text: "Hoy no hago 'logos bonitos'. Construyo narrativas que justifican precios premium y conectan con arquetipos. Si tu startup valora la profundidad sobre la viralidad, hablemos."
        }
    ];

    return (
        <div
            className="min-h-screen font-body text-deep-100 overflow-x-hidden selection:bg-symbolic-500/30"
            style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 1) 100%)'
            }}
        >
            {/* Minimal Header / Back Button */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => customNavigate('/')}
                    className="pointer-events-auto flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 text-white p-3 rounded-full hover:bg-white/10 transition-all group"
                    aria-label="Volver al Inicio"
                >
                    <BackArrowIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </button>
            </nav>

            <main className="relative z-10">
                {/* HERO */}
                <section className="pt-32 pb-16 px-4 flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-symbolic-500 font-bold tracking-[0.3em] uppercase mb-4"
                    >
                        Origen
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-9xl font-display font-bold text-white mb-8 text-center"
                    >
                        ORIGEN
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-3xl text-deep-300 font-display italic max-w-2xl text-center leading-relaxed"
                    >
                        {"\"No estudié diseño gráfico. Estudié cine. Y eso cambió todo.\""}
                    </motion.p>
                </section>

                <ScrollytellingMap />

                {/* Narrative Cards Container */}
                <section className="py-20 px-4 max-w-5xl mx-auto">
                    {narrative.map((item, index) => (
                        <NarrativeCard key={index} index={index} title={item.title} text={item.text} />
                    ))}
                </section>

                {/* CTA Final */}
                <section className="py-32 px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">¿Listo para profundizar?</h2>
                    <button
                        onClick={() => navigateTo('#contacto')}
                        className="bg-symbolic-600 hover:bg-symbolic-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-symbolic-600/20"
                    >
                        Iniciar Auditoría
                    </button>
                </section>
            </main>

            <Footer />
        </div>
    );
}
