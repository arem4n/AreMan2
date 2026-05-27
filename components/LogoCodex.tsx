import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SemioticsIcon, LayersIcon, ArchetypeIcon, BookIcon, GridIcon, HomeIcon, BackArrowIcon } from './icons/CodexIcons';
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
import { Icon } from './icons/Icons';

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
        case 'osttech-software':
            return <OstTechCaseStudy />;
        case 'albornoz-propiedades':
            return <AlbornozCaseStudy />;
        case 'southsoft-consultoria':
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
    const tabsRef = useRef<HTMLDivElement>(null);
    const [showBackToTabs, setShowBackToTabs] = useState(false);

    useEffect(() => {
        const el = tabsRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            setShowBackToTabs(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        }, { threshold: 0 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const scrollToTabs = () => {
        document.getElementById('casos-de-estudio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="bg-deep-50 font-body relative">
            {/* Floating Home Button */}
            <button
                onClick={() => navigateTo('#inicio')}
                className="fixed bottom-6 left-6 z-[99] flex items-center justify-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white font-semibold py-3 px-5 rounded-full shadow-xl hover:shadow-2xl [@media(hover:hover)]:hover:scale-105 active:scale-95 transition duration-200 ease-out animate-fade-in-up"
                style={{ animationDelay: '200ms' }}
                aria-label="Volver al Inicio"
            >
                <HomeIcon className="w-5 h-5" />
                <span className="hidden sm:inline ml-2">Volver a Inicio</span>
            </button>

            {/* Floating Back-to-Tabs Button */}
            <button
                onClick={scrollToTabs}
                className={`fixed bottom-6 right-6 z-[99] flex items-center justify-center gap-2 bg-gradient-to-r from-symbolic-600 to-deep-700 text-white font-semibold py-3 px-5 rounded-full shadow-xl hover:shadow-2xl [@media(hover:hover)]:hover:scale-105 active:scale-95 transition-all duration-300 ease-out
                    ${showBackToTabs ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                aria-label="Volver a selección de casos"
            >
                <Icon name="ui-chevron-right" size={16} className="-rotate-90" />
                <span className="hidden sm:inline text-sm">Casos de estudio</span>
            </button>

            <>
                {/* SECCIÓN 1: Hero */}
                <section id="logocodex" className="text-center pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-deep-800 to-deep-900 text-white relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 animate-fade-in-up">
                        <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-deep-200 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                            Portafolio de Identidad Visual
                        </span>
                        <h2 className="text-4xl lg:text-7xl font-display font-bold mb-4 text-creative-400">
                            LogoCodeX™
                        </h2>
                        <p className="text-lg lg:text-xl text-deep-200 leading-relaxed max-w-3xl mx-auto">
                            Cada proyecto aquí fue construido con el método LogoCodeX™ —{' '}
                            <span className="text-white font-medium">un sistema de codificación simbólica que convierte un logotipo en un activo de marca</span>{' '}
                            con capas de significado cultural, arquetípico y narrativo.
                        </p>
                        <div className="mt-8 inline-block px-6 py-3 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md">
                            <span className="font-mono text-creative-300">Símbolo Vivo = Memoria Cultural + Narrativa + Evolución</span>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: Traducción de valor */}
                <section className="py-12 bg-creative-50 border-b border-creative-100">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-creative-200 text-creative-800 text-xs font-bold tracking-widest uppercase mb-4">
                            ¿Por qué esto importa para tu facturación?
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-deep-800 mb-4">
                            No es filosofía, es Mitigación de Riesgo
                        </h3>
                        <p className="text-deep-700 leading-relaxed mb-0 max-w-2xl mx-auto">
                            El cerebro humano decide en <strong>0.05 segundos</strong> si confía en tu marca o la descarta. Si tu imagen es genérica (plantilla), eres invisible. <strong>LogoCodeX™</strong> es la ingeniería que asegura que tu marca sea percibida como autoridad instantánea, justificando tus precios premium y creando lealtad tribal.
                        </p>
                    </div>
                </section>

                {/* SECCIÓN 3: El Origen del Método */}
                <section id="introduccion" className="py-16 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl lg:text-4xl font-display font-bold text-deep-800 mb-6">
                                    El Origen del Método
                                </h2>
                                <p className="text-deep-700 leading-relaxed mb-6">
                                    LogoCodeX™ nace como respuesta a una crisis: la abundancia de logotipos estéticamente correctos pero <strong>emocionalmente vacíos</strong>.
                                </p>
                                <p className="text-deep-700 leading-relaxed mb-6">
                                    La proliferación de plantillas genéricas ha llevado a que muchas marcas se diferencien solo por color o tipografía, careciendo de un núcleo simbólico capaz de sostener una narrativa a largo plazo.
                                </p>
                                <div className="bg-deep-50 p-6 rounded-xl border-l-4 border-symbolic-600">
                                    <p className="text-deep-800 font-medium italic">
                                        &quot;La premisa es radical: Tu diseño no solo debe ser atractivo, debe activar una cadena de asociaciones culturales, emocionales y narrativas en la memoria colectiva.&quot;
                                    </p>
                                </div>
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

                {/* SECCIÓN 4: Los 3 Pilares Teóricos */}
                <section id="pilares" className="py-16 lg:py-24 bg-deep-50">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-center mb-16 text-deep-800">
                            Los 3 Pilares Teóricos
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-deep-100 hover:shadow-xl transition duration-200 ease-out group">
                                <div className="w-16 h-16 bg-symbolic-50 rounded-2xl flex items-center justify-center mb-6 text-symbolic-600 group-hover:bg-symbolic-600 group-hover:text-white transition-colors duration-300">
                                    <SemioticsIcon />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-3 text-deep-800">1. Semiótica Visual</h3>
                                <p className="text-deep-600 mb-4 text-sm font-semibold uppercase tracking-wide opacity-70">Peirce &amp; Barthes</p>
                                <p className="text-deep-700 leading-relaxed">
                                    Entendemos cómo funcionan los signos. Usamos el modelo triádico (Ícono, Índice, Símbolo) y los niveles de Barthes (Denotación, Connotación, Mito) para asegurar que el mensaje se lea con la intención correcta.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-deep-100 hover:shadow-xl transition duration-200 ease-out group">
                                <div className="w-16 h-16 bg-creative-50 rounded-2xl flex items-center justify-center mb-6 text-creative-600 group-hover:bg-creative-500 group-hover:text-deep-900 transition-colors duration-300">
                                    <ArchetypeIcon />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-3 text-deep-800">2. Psicología Arquetípica</h3>
                                <p className="text-deep-600 mb-4 text-sm font-semibold uppercase tracking-wide opacity-70">Jung &amp; Pearson</p>
                                <p className="text-deep-700 leading-relaxed">
                                    Conectamos con patrones universales del inconsciente colectivo. Definimos si tu marca es un &quot;Héroe&quot;, un &quot;Creador&quot; o un &quot;Sabio&quot; para generar identificación inmediata y emocional.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-deep-100 hover:shadow-xl transition duration-200 ease-out group">
                                <div className="w-16 h-16 bg-deep-50 rounded-2xl flex items-center justify-center mb-6 text-deep-600 group-hover:bg-deep-600 group-hover:text-white transition-colors duration-300">
                                    <BookIcon />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-3 text-deep-800">3. Narrativa Estratégica</h3>
                                <p className="text-deep-600 mb-4 text-sm font-semibold uppercase tracking-wide opacity-70">El Mito de Marca</p>
                                <p className="text-deep-700 leading-relaxed">
                                    Transformamos un signo gráfico en una historia. Aseguramos la coherencia entre el símbolo, la promesa de la marca y su contexto cultural.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 5: El Libro de los Símbolos */}
                <section id="herramienta" className="py-16 bg-deep-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 text-creative-400">
                            <BookIcon />
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">
                            El Libro de los Símbolos
                        </h2>
                        <p className="text-xl text-deep-200 mb-8">
                            El corazón operativo de LogoCodeX™. No es un banco de imágenes, es un <strong>repositorio vivo de significados</strong>.
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left max-w-2xl mx-auto">
                            <p className="text-deep-100 mb-4">Cada entrada en nuestro sistema contiene:</p>
                            <ul className="space-y-3 text-sm md:text-base font-mono text-creative-300">
                                <li><span className="text-symbolic-400 mr-2">&gt;</span>Origen Histórico (Mitos, religiones, arte)</li>
                                <li><span className="text-symbolic-400 mr-2">&gt;</span>Connotaciones Positivas (Transformación, poder)</li>
                                <li><span className="text-symbolic-400 mr-2">&gt;</span>Connotaciones Negativas (Riesgos culturales)</li>
                                <li><span className="text-symbolic-400 mr-2">&gt;</span>Arquetipo Asociado (¿Quién usa este símbolo?)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 6: Metodología */}
                <section id="metodologia" className="py-16 lg:py-24 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-center mb-16 text-deep-800">
                            Metodología: El Proceso de 6 Pasos
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { step: 1, title: 'Anclaje de Identidad', desc: 'Definimos la intención profunda más allá del producto.' },
                                { step: 2, title: 'Definición de Arquetipo', desc: 'Selección del rol psicológico (Héroe, Sabio, etc.)' },
                                { step: 3, title: 'Mapeo de Símbolos', desc: 'Investigación en el Libro de Símbolos y filtrado cultural.' },
                                { step: 4, title: 'Traducción Visual', desc: 'Transformación de conceptos en formas, colores y ritmos.' },
                                { step: 5, title: 'Iteración y Validación', desc: 'Test de coherencia semiótica y ajustes.' },
                                { step: 6, title: 'Integración Narrativa', desc: 'Desarrollo del storytelling donde el logo es protagonista.' },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4 items-start p-6 bg-deep-50 rounded-xl border border-deep-100">
                                    <span className="flex-shrink-0 w-10 h-10 bg-symbolic-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        {item.step}
                                    </span>
                                    <div>
                                        <h4 className="text-xl font-bold text-deep-800 mb-2">{item.title}</h4>
                                        <p className="text-deep-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 7: Casos de Estudio */}
                <section id="casos-de-estudio" className="py-16 lg:py-24 bg-gradient-to-br from-deep-100 to-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-center mb-6 text-deep-800">
                            El Código en Acción: Casos de Estudio
                        </h2>
                        <p className="text-lg text-deep-700 text-center max-w-3xl mx-auto mb-12">
                            Selecciona un proyecto para ver una disección completa bajo la lente del Manual LogoCodeX™.
                        </p>

                        <div ref={tabsRef} className="flex flex-wrap justify-center gap-3 mb-12">
                            {portfolioProjects.map(project => (
                                <button
                                    key={project.slug}
                                    onClick={() => onSelectSlug(project.slug)}
                                    className={`px-5 py-2.5 font-semibold rounded-full text-sm transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-symbolic-500
                                        ${selectedSlug === project.slug
                                            ? 'bg-symbolic-600 text-white shadow-md'
                                            : 'bg-white text-deep-600 hover:bg-deep-100 shadow-sm border border-deep-200'
                                        }`}
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

                {/* SECCIÓN 8: CTA */}
                <section className="py-16 lg:py-24">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-deep-800 mb-6">
                            ¿Tu marca es soberana o genérica?
                        </h2>
                        <p className="text-lg text-deep-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                            El Manual LogoCodeX™ es la herramienta práctica para evitar la irrelevancia. Juntos, podemos desvelar tu historia única y traducirla en un símbolo que nadie más podría reclamar.
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
            </>
        </div>
    );
};

export default LogoCodex;
