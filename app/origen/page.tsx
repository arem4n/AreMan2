"use client";

import React from 'react';
import { useLoading } from '@/components/LoadingContext';
import { BackArrowIcon } from '@/components/icons/CodexIcons';
import Footer from '@/components/Footer';

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

    return (
        <div className="bg-deep-900 min-h-screen font-body text-deep-100 overflow-x-hidden selection:bg-symbolic-500/30">
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

            <main>
                {/* HERO */}
                <section className="min-h-screen flex flex-col justify-center items-center px-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-800 to-deep-900 -z-10"></div>
                    <span className="text-symbolic-500 font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in-up">Biografía</span>
                    <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        ORIGEN
                    </h1>
                    <p className="text-xl md:text-3xl text-deep-300 font-display italic max-w-2xl text-center leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        "No estudié diseño gráfico. Estudié cine. Y eso cambió todo."
                    </p>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                </section>

                {/* ACTO I */}
                <section className="py-24 px-4 max-w-4xl mx-auto border-t border-white/5">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <h2 className="text-symbolic-500 font-display text-2xl font-bold sticky top-24">ACTO I <br/><span className="text-white text-base font-body tracking-wider uppercase opacity-50">La Formación</span></h2>
                        </div>
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-3xl font-display font-bold text-white">El error que se volvió método</h3>
                            <p className="text-lg md:text-xl leading-relaxed text-deep-200">
                                "En la UBA aprendí que cada plano cuenta una historia y que los símbolos activan significados inconscientes. No sabía que estaba aprendiendo a leer identidades. Lo apliqué a marcas, no a películas."
                            </p>
                        </div>
                    </div>
                </section>

                {/* ACTO II */}
                <section className="py-24 px-4 max-w-4xl mx-auto border-t border-white/5">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <h2 className="text-symbolic-500 font-display text-2xl font-bold sticky top-24">ACTO II <br/><span className="text-white text-base font-body tracking-wider uppercase opacity-50">La Sistematización</span></h2>
                        </div>
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-3xl font-display font-bold text-white">Cuando la máquina se volvió espejo</h3>
                            <p className="text-lg md:text-xl leading-relaxed text-deep-200">
                                "En 2024, usé la IA para nombrar lo que ya hacía por intuición. Así nació LogoCodeX™: la sistematización de décadas de práctica. 6 pasos documentados, 48 páginas de manual. La IA no creó el método; la IA me mostró que el método ya existía."
                            </p>
                        </div>
                    </div>
                </section>

                {/* ACTO III */}
                <section className="py-24 px-4 max-w-4xl mx-auto border-t border-white/5">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <h2 className="text-symbolic-500 font-display text-2xl font-bold sticky top-24">ACTO III <br/><span className="text-white text-base font-body tracking-wider uppercase opacity-50">El Presente</span></h2>
                        </div>
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-3xl font-display font-bold text-white">Arquitectura de Identidad</h3>
                            <p className="text-lg md:text-xl leading-relaxed text-deep-200">
                                "Hoy no hago 'logos bonitos'. Construyo narrativas que justifican precios premium y conectan con arquetipos. Si tu startup valora la profundidad sobre la viralidad, hablemos."
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-32 px-4 text-center bg-deep-800 border-t border-white/5">
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
