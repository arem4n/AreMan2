
import React from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '../analytics';

interface ServiceCardProps {
    title: string;
    price: string;
    description: string[];
    recommended?: boolean;
    gradientText?: boolean;
    onButtonClick: (title: string) => void;
    icon?: React.ReactNode;
    animationProps?: any;
}

// Safe parser to handle bold text without dangerouslySetInnerHTML
const renderSafeText = (text: string) => {
    const parts = text.split(/(<strong>.*?<\/strong>)/g);
    return parts.map((part, index) => {
        if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
            return <strong key={index}>{part.replace(/<\/?strong>/g, '')}</strong>;
        }
        return <span key={index}>{part}</span>;
    });
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, description, recommended = false, gradientText = false, onButtonClick, icon, animationProps }) => (
    <div className={`relative card-hover rounded-2xl p-6 lg:p-8 shadow-lg flex flex-col h-full transition-all duration-300 ease-in-out ${recommended ? 'bg-gradient-to-r from-symbolic-600 to-deep-700 text-white shadow-xl' : 'bg-white border border-deep-100'}`}>
        {recommended && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-creative-400 text-deep-900 px-3 py-1 rounded-full text-sm font-semibold z-10">RECOMENDADO</div>}

        {icon && (
            <div className="flex justify-center mb-6">
                <motion.div
                    {...animationProps}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                >
                    {icon}
                </motion.div>
            </div>
        )}

        <h4 className={`text-2xl font-display font-bold mb-4 ${recommended ? 'text-white' : 'text-deep-800'}`}>{title}</h4>
        <div className={`text-base mb-6 flex-grow ${recommended ? 'text-symbolic-200' : 'text-deep-800'}`}>
            {description.map((line, index) => (
                <p key={index} className="mb-2 last:mb-0">
                    {renderSafeText(line)}
                </p>
            ))}
        </div>
        <div className="text-right mt-auto">
            <div className={`text-3xl font-bold ${gradientText ? 'text-gradient' : recommended ? 'text-creative-300' : 'text-symbolic-600'}`}>{price}</div>
            <div className={`text-sm ${recommended ? 'text-symbolic-200' : 'text-deep-500'}`}>Inversión estimada</div>
        </div>
        <a 
            href="#contacto" 
            onClick={(e) => {
                e.preventDefault();
                trackEvent('select_service_package', { packageName: title });
                onButtonClick(title);
            }} 
            className={`mt-6 self-center w-max inline-block text-center font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${recommended ? 'bg-creative-500 hover:bg-creative-600 text-deep-900' : 'bg-symbolic-600 hover:bg-symbolic-700 text-white'}`}
        >
            Auditar con este Pack
        </a>
    </div>
);

interface ServicesProps {
    onPackageSelect: (packageName: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onPackageSelect }) => {
    return (
        <section id="servicios" className="py-16 lg:py-24 bg-gradient-to-br from-deep-50 to-symbolic-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-center mb-16 text-deep-800">
                    Niveles de Intervención
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mb-16">
                    <ServiceCard 
                        title="Fase 1: Diagnóstico Semiótico"
                        price="$150 - $250 USD"
                        description={["<strong>Evita la invisibilidad.</strong> No es solo un logo; es la base fundamental para que tu startup no parezca una plantilla. Incluye análisis de arquetipos para asegurar que tu mensaje llegue al cerebro del cliente."]}
                        onButtonClick={onPackageSelect}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-symbolic-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                        animationProps={{
                            animate: { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] },
                            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                    <ServiceCard 
                        title="Fase 2: Arquitectura de Marca"
                        price="$400 - $600 USD"
                        description={["<strong>El estándar de Autoridad.</strong> Diseñamos el sistema completo para que tu marca funcione en todos los canales. Incluye Motion Graphics para captar la atención en segundos. <strong>ROI: Coherencia total y confianza inmediata.</strong>"]}
                        recommended
                        onButtonClick={onPackageSelect}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-creative-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                            </svg>
                        }
                        animationProps={{
                            animate: { y: [0, -10, 0] },
                            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                    <ServiceCard 
                        title="Fase 3: Soberanía Visual"
                        price="$900 - $1,500 USD"
                        description={["<strong>Dominio de Mercado.</strong> Para fundadores que no compiten, sino que lideran. Video corporativo con narrativa profunda y manual de marca exhaustivo. Convertimos tu visión en un activo intangible de alto valor."]}
                        gradientText
                        onButtonClick={onPackageSelect}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-deep-800">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.263l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        }
                        animationProps={{
                            animate: { rotate: 360 },
                            transition: { duration: 10, repeat: Infinity, ease: "linear" }
                        }}
                    />
                </div>
                <p className="text-lg text-center max-w-3xl mx-auto text-deep-800 leading-relaxed">
                    No compres &quot;diseño bonito&quot;. Invierte en <strong>mitigación de riesgo</strong>. Una marca débil te cuesta clientes todos los días. Elige la profundidad estratégica que tu facturación merece.
                </p>
            </div>
        </section>
    );
};

export default Services;
