import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioProjects } from '../constants';
import { trackEvent } from '../analytics';
import Arem4nCaseStudy from './casestudies/Arem4nCaseStudy';
import Arem4nProfessionalCaseStudy from './casestudies/Arem4nProfessionalCaseStudy';
import GenericCaseStudy from './casestudies/GenericCaseStudy';
import OstTechCaseStudy from './casestudies/OstTechCaseStudy';
import AlbornozCaseStudy from './casestudies/AlbornozCaseStudy';
import SouthSoftCaseStudy from './casestudies/SouthSoftCaseStudy';
import Bm3CaseStudy from './casestudies/Bm3CaseStudy';
import TommyBoxCaseStudy from './casestudies/TommyBoxCaseStudy';

interface LogoCodexProps {
    navigateTo: (hash: string) => void;
    selectedSlug: string;
    onSelectSlug: (slug: string) => void;
}

const renderCaseStudy = (slug: string) => {
    switch (slug) {
        case 'areman-escudo-heraldico':
            return <Arem4nCaseStudy />;
        case 'arem4n-professional-brand':
            return <Arem4nProfessionalCaseStudy />;
        case 'osttech-cybersecurity':
            return <OstTechCaseStudy />;
        case 'albornoz-propiedades':
            return <AlbornozCaseStudy />;
        case 'southsoft-development':
            return <SouthSoftCaseStudy />;
        case 'bm3-constructora':
            return <Bm3CaseStudy />;
        case 'tommybox-training':
            return <TommyBoxCaseStudy />;
        default:
            return <GenericCaseStudy slug={slug} />;
    }
};

const LogoCodex: React.FC<LogoCodexProps> = ({ navigateTo, selectedSlug, onSelectSlug }) => {
    const [showReturnButton, setShowReturnButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const tabsContainer = document.getElementById('case-study-tabs');
            if (!tabsContainer) return;

            const tabsRect = tabsContainer.getBoundingClientRect();
            // If the tabs container is completely out of view (scrolled past it)
            if (tabsRect.bottom < 0) {
                setShowReturnButton(true);
            } else {
                setShowReturnButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTabs = () => {
        const tabsContainer = document.getElementById('case-study-tabs');
        if (tabsContainer) {
            // Adding a small offset to ensure the tabs are clearly visible
            const yOffset = -100;
            const y = tabsContainer.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="font-body selection:bg-symbolic-500/30 overflow-hidden">
            <AnimatePresence>
                {showReturnButton && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollToTabs}
                        className="fixed bottom-6 right-6 z-[99] flex items-center justify-center bg-white text-symbolic-600 border border-symbolic-100 font-bold p-4 rounded-full shadow-xl hover:shadow-2xl hover:bg-symbolic-50 transition-all duration-300 group"
                        aria-label="Volver a Casos de Estudio"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span className="sr-only">Volver arriba</span>
                    </motion.button>
                )}
            </AnimatePresence>

            <main>
                {/* SECCIÓN 1: Hero */}
                <header id="inicio" className="text-center pt-32 pb-24 lg:pt-40 lg:pb-32 bg-deep-900 text-white relative flex flex-col items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 animate-fade-in-up">
                        <h1 className="text-5xl lg:text-8xl font-display font-bold mb-6 text-creative-400 tracking-tight">
                            Manual LogoCodeX™
                        </h1>
                        <p className="text-xl md:text-3xl font-light text-white mb-8">
                            Un logo debe operar como un símbolo vivo, no como un adorno gráfico.
                        </p>
                        <div className="mt-8 inline-block px-8 py-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md mb-12">
                            <span className="font-mono text-xl tracking-widest uppercase text-creative-300">Sistema de Codificación Visual Semiótica.</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="px-6 py-2 border border-creative-500/50 rounded-full text-creative-200 text-sm font-medium tracking-wide">
                                Símbolo, Mito y Memoria Colectiva
                            </span>
                            <span className="px-6 py-2 border border-creative-500/50 rounded-full text-creative-200 text-sm font-medium tracking-wide">
                                Narrativa
                            </span>
                            <span className="px-6 py-2 border border-creative-500/50 rounded-full text-creative-200 text-sm font-medium tracking-wide">
                                Ilustración
                            </span>
                        </div>
                    </div>
                </header>

                {/* SECCIÓN 2: Mitigación de Riesgo */}
                <section className="py-24 bg-creative-50">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <span className="inline-block px-4 py-1.5 bg-creative-100 text-creative-800 font-bold text-xs tracking-widest uppercase rounded-full mb-8">
                            ¿POR QUÉ ES RELEVANTE PARA EL EMPRESARIO?
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-900 mb-10">
                            No es Filosofía, es Mitigación de Riesgo
                        </h2>
                        <p className="text-xl leading-relaxed text-deep-700">
                            El cerebro humano decide en 0.05 segundos si confía en tu marca o la descarta. Si tu imagen es genérica o plantea una inmediata sospecha, espantará a tus prospectos que apagan sus mecanismos de compra con objeciones instintivas. Usar patrones milenarios justifica los precios premium y crea lealtad tribal.
                        </p>
                    </div>
                </section>

                {/* SECCIÓN 3: El Origen del Método */}
                <section className="py-24 bg-white">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="lg:w-1/2">
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-900 mb-8">
                                    El Origen del Método
                                </h2>
                                <p className="text-lg leading-relaxed text-deep-700 mb-6">
                                    LogoCodeX™ nace como respuesta a una crisis: la abundancia de logotipos estéticamente correctos pero emocionalmente vacíos.
                                </p>
                                <p className="text-lg leading-relaxed text-deep-700 mb-10">
                                    La proliferación de plantillas genéricas ha llevado a que muchas marcas se diferencien solo por color o tipografía, careciendo de un núcleo simbólico capaz de conectar con narrativa a largo plazo.
                                </p>
                                <blockquote className="border-l-4 border-symbolic-500 pl-6 py-2 italic text-deep-800 text-xl md:text-2xl font-display font-medium">
                                    &quot;La premisa es radical: Tu diseño no solo debe ser atractivo, debe activar una cadena de asociaciones culturales, emocionales y narrativas en la memoria colectiva.&quot;
                                </blockquote>
                            </div>
                            <div className="lg:w-1/2">
                                <div className="bg-deep-900 p-8 md:p-10 rounded-3xl shadow-2xl text-white relative transform hover:-translate-y-2 transition-transform duration-500">
                                    <span className="absolute -top-4 left-8 bg-creative-500 text-deep-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                                        Diferencia Fundamental
                                    </span>

                                    <h3 className="text-sm font-bold text-deep-400 uppercase tracking-widest mb-2 mt-4">LOGO TRADICIONAL</h3>
                                    <p className="text-lg text-white mb-8 border-b border-white/10 pb-8">
                                        Elemento gráfico estético que identifica.
                                    </p>

                                    <h3 className="text-sm font-bold text-symbolic-400 uppercase tracking-widest mb-4">SÍMBOLO LOGOCODEX</h3>
                                    <ul className="space-y-4">
                                        <li className="flex gap-3">
                                            <svg className="w-6 h-6 text-symbolic-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span><strong className="text-white">Activa memoria cultural:</strong> <span className="text-deep-200">Conecta con experiencias preexistentes.</span></span>
                                        </li>
                                        <li className="flex gap-3">
                                            <svg className="w-6 h-6 text-symbolic-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span><strong className="text-white">Genera capas:</strong> <span className="text-deep-200">Lectura inmediata (denotación) y oculta (mito).</span></span>
                                        </li>
                                        <li className="flex gap-3">
                                            <svg className="w-6 h-6 text-symbolic-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span><strong className="text-white">Construye narrativa:</strong> <span className="text-deep-200">Es un personaje en la historia de la marca.</span></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 4: Los 3 Pilares Teóricos */}
                <section className="py-24 bg-deep-50">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-center text-deep-900 mb-16">
                            Los 3 Pilares Teóricos
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-deep-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-14 h-14 bg-symbolic-100 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-symbolic-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-deep-900 mb-4">1. Semiótica Visual <span className="block text-sm font-medium text-deep-500 mt-1">(Público y contexto)</span></h3>
                                <p className="text-deep-700 leading-relaxed">Entendemos cómo funcionan los signos. Usamos el modelo triádico de Peirce (Índice, Símbolo) o los niveles de Barthes (Denotación, Connotación, Mito) para asegurar que el mensaje emita con la intención correcta.</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-deep-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-14 h-14 bg-creative-100 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-creative-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-deep-900 mb-4">2. Psicología Arquetípica <span className="block text-sm font-medium text-deep-500 mt-1">(Alma e Inconsciente)</span></h3>
                                <p className="text-deep-700 leading-relaxed">Abordamos los patrones universales del inconsciente colectivo. Definimos si tu marca es un &apos;Héroe&apos;, un &apos;Creador&apos; o un &apos;Sabio&apos; para generar identificación inmediata y emocional.</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-deep-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-deep-900 mb-4">3. Narrativa Estratégica <span className="block text-sm font-medium text-deep-500 mt-1">(El Viaje del Héroe)</span></h3>
                                <p className="text-deep-700 leading-relaxed">Transformamos un signo gráfico en una historia. Aseguramos la coherencia entre el símbolo, la promesa de la marca y su contexto cultural.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 5: El Libro de los Símbolos */}
                <section className="py-24 bg-deep-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-creative-500 via-deep-900 to-deep-900"></div>
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <div className="w-20 h-20 mx-auto bg-deep-800 rounded-full flex items-center justify-center mb-8 border border-deep-700">
                            <svg className="w-10 h-10 text-creative-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            El Libro de los Símbolos
                        </h2>
                        <p className="text-xl text-deep-300 font-light mb-12 max-w-2xl mx-auto">
                            El corazón operativo de LogoCodeX™. No es un banco de imágenes, es un repositorio vivo de significados.
                        </p>
                        
                        <div className="bg-deep-800 p-8 md:p-12 rounded-3xl border border-deep-700 shadow-2xl text-left max-w-2xl mx-auto">
                            <p className="text-lg font-medium text-creative-400 mb-8">
                                Aplica filtros en nuestro sistema unificado:
                            </p>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <span className="w-8 h-8 rounded-full bg-deep-700 flex items-center justify-center text-creative-400 shrink-0">1</span>
                                    <div><strong className="text-white block mb-1">Origen:</strong><span className="text-deep-300">Nórdico, Celta, Mapuche, Azteca...</span></div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="w-8 h-8 rounded-full bg-deep-700 flex items-center justify-center text-creative-400 shrink-0">2</span>
                                    <div><strong className="text-white block mb-1">Naturaleza:</strong><span className="text-deep-300">Animales (Fuerza/Agilidad), Árboles...</span></div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="w-8 h-8 rounded-full bg-deep-700 flex items-center justify-center text-creative-400 shrink-0">3</span>
                                    <div><strong className="text-white block mb-1">Construcciones:</strong><span className="text-deep-300">Heráldica, Geometría Sagrada...</span></div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="w-8 h-8 rounded-full bg-deep-700 flex items-center justify-center text-creative-400 shrink-0">4</span>
                                    <div><strong className="text-white block mb-1">Arquetipos:</strong><span className="text-deep-300">Innovador, Guardián, Sabio...</span></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 6: Metodología */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-center text-deep-900 mb-16">
                            Metodología: El Proceso de 6 Pasos
                        </h2>

                        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-deep-200 before:to-transparent">
                            {[
                                { title: "Anclaje de Identidad", desc: "Definimos la intención profunda más allá del producto." },
                                { title: "Definición de Arquetipo", desc: "Selección del rol psicológico: Héroe, Sabio, etc." },
                                { title: "Mapeo de Símbolos", desc: "Investigación en el Libro de Símbolos y folklore cultural." },
                                { title: "Traducción Visual", desc: "Transformación de conceptos en formas, colores y ritmos." },
                                { title: "Iteración y Validación", desc: "Test de coherencia semiótica y ajustes." },
                                { title: "Integración Narrativa", desc: "Desarrollo del manual/ley de uso, el logo es protagonista." }
                            ].map((step, idx) => (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-symbolic-500 border-4 border-white text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                                        {idx + 1}
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-deep-100 shadow-sm group-hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-lg text-deep-900 mb-2">{step.title}</h3>
                                        <p className="text-deep-600 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 7: Casos de Estudio */}
                <section id="casos-de-estudio" className="py-24 bg-deep-50">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-900 mb-6">
                                El Código en Acción: Casos de Estudio
                            </h2>
                            <p className="text-xl text-deep-600 font-light max-w-2xl mx-auto">
                                Selecciona un proyecto para ver una disección completa bajo la lente del Método LogoCodeX™.
                            </p>
                        </div>

                        <div id="case-study-tabs" className="flex flex-wrap justify-center gap-3 mb-16 scroll-mt-32">
                            {portfolioProjects.map(project => (
                                <button
                                    key={project.slug}
                                    onClick={() => onSelectSlug(project.slug)}
                                    className={`px-6 py-3 font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 ease-in-out focus:outline-none
                                        ${selectedSlug === project.slug 
                                            ? 'bg-symbolic-600 text-white shadow-lg scale-105'
                                            : 'bg-white text-deep-600 hover:bg-deep-100 shadow-sm border border-deep-200 hover:text-deep-900'
                                        }`
                                    }
                                >
                                    {project.title.replace(' | Caso de Estudio', '')}
                                </button>
                            ))}
                        </div>
                        
                        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-deep-100">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedSlug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                                >
                                    {renderCaseStudy(selectedSlug)}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LogoCodex;
