
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeIcon } from './icons/CodexIcons';
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

            const rect = tabsContainer.getBoundingClientRect();
            // Show button if the tabs container is scrolled out of view (top < 0)
            // and we are further down the page
            if (rect.bottom < 0) {
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
            // Scroll slightly above the tabs for better context
            const yOffset = -100;
            const y = tabsContainer.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    
    return (
        <div className="bg-deep-50 min-h-screen font-body relative">
             {/* Floating Return to Tabs Button */}
             <AnimatePresence>
                {showReturnButton && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
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
                <header id="inicio" className="text-center pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-deep-800 to-deep-900 text-white relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 animate-fade-in-up">
                        <h1 className="text-4xl lg:text-7xl font-display font-bold mb-4 text-creative-400">
                            El mecanismo detrás de la identidad
                        </h1>
                         <div className="mt-8 inline-block px-6 py-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md">
                            <span className="font-mono text-creative-300">LogoCodeX™</span>
                        </div>
                    </div>
                </header>

                <section id="introduccion" className="py-16 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <p className="text-deep-700 leading-relaxed mb-6 text-lg">
                                    La mayoría de los procesos de diseño parten de referencias visuales. <strong className="text-deep-900">LogoCodeX™</strong> parte de otra pregunta:
                                </p>
                                <blockquote className="border-l-4 border-symbolic-600 pl-4 italic text-deep-800 text-xl font-display mb-6">
                                    ¿Qué es esta empresa realmente, y cómo se hace visible esa esencia?
                                </blockquote>
                                <p className="text-deep-700 leading-relaxed mb-4">
                                    Para responderla trabaja tres cosas en simultáneo:
                                </p>
                                <ul className="list-disc list-inside space-y-3 text-deep-700 mb-6">
                                    <li>Símbolos que comunican antes de que el cliente los piense.</li>
                                    <li>Conexiones instintivas e intuitivas con las personas correctas.</li>
                                    <li>Una historia interna que hace que todos los cabos se conecten.</li>
                                </ul>
                                <p className="text-deep-700 leading-relaxed font-bold mb-8">
                                    El resultado no es un logo bonito. Es una marca que el fundador muestra con orgullo porque siente que lo representa de verdad.
                                </p>
                                <button
                                    onClick={() => navigateTo('/origen')}
                                    className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Conocer la metodología completa →
                                </button>
                            </div>
                            <div className="md:w-1/2 bg-deep-900 p-8 rounded-2xl border border-deep-700 shadow-2xl text-white">
                                <h3 className="text-xl font-bold text-creative-400 mb-4">Diferencia Fundamental</h3>
                                <ul className="space-y-6">
                                    <li className="border-b border-white/10 pb-4">
                                        <span className="block text-sm text-deep-400 uppercase tracking-wider mb-1">Logo Tradicional</span>
                                        <span className="text-lg">Elemento gráfico estático que identifica.</span>
                                    </li>
                                    <li>
                                        <span className="block text-sm text-symbolic-400 uppercase tracking-wider mb-1">Símbolo Vivo (LogoCodeX)</span>
                                        <ul className="list-disc list-inside text-deep-200 space-y-2 mt-2">
                                            <li><strong>Activa memoria cultural:</strong> Conecta con experiencias preexistentes.</li>
                                            <li><strong>Genera capas:</strong> Lectura inmediata (denotación) y oculta (mito).</li>
                                            <li><strong>Construye narrativa:</strong> Es un personaje en la historia de la marca.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="casos-de-estudio" className="py-16 lg:py-24 bg-gradient-to-br from-deep-100 to-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-center mb-6 text-deep-800">
                            El Código en Acción: Casos de Estudio
                        </h2>
                        <p className="text-lg text-deep-700 text-center max-w-3xl mx-auto mb-12">
                            Selecciona un proyecto para ver una disección completa bajo la lente del Manual LogoCodeX™.
                        </p>
                        
                        <div id="case-study-tabs" className="flex flex-wrap justify-center gap-3 mb-12 scroll-mt-32">
                            {portfolioProjects.map(project => (
                                <button
                                    key={project.slug}
                                    onClick={() => onSelectSlug(project.slug)}
                                    className={`px-5 py-2.5 font-semibold rounded-full text-sm transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-symbolic-500
                                        ${selectedSlug === project.slug 
                                            ? 'bg-symbolic-600 text-white shadow-md' 
                                            : 'bg-white text-deep-600 hover:bg-deep-100 shadow-sm border border-deep-200'
                                        }`
                                    }
                                >
                                    {project.title}
                                </button>
                            ))}
                        </div>
                        
                        <div className="max-w-4xl mx-auto">
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

                 <section className="py-16 lg:py-24">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-deep-800 mb-6">
                            ¿Tu marca es soberana o genérica?
                        </h2>
                        <p className="text-lg text-deep-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                            El Manual LogoCodeX™ es la herramienta práctica para evitar la irrelevancia. Juntos, puedo desvelar tu historia única y traducirla en un símbolo que nadie más podría reclamar.
                        </p>
                        <button
                            onClick={() => {
                                trackEvent('navigate_to_contact', { from: 'logocodex_cta' });
                                navigateTo('#contacto');
                            }}
                            className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                        >
                            Solicitar Auditoría de Identidad
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LogoCodex;
