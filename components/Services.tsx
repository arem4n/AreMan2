
import React from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '../analytics';

interface ServiceCardProps {
    title: string;
    price: string;
    description: string[];
    subtitle?: string; // Added subtitle
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

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, subtitle, description, recommended = false, gradientText = false, onButtonClick, icon, animationProps }) => (
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

        <h4 className={`text-2xl font-display font-bold mb-2 ${recommended ? 'text-white' : 'text-deep-800'}`}>{title}</h4>
        {subtitle && (
             <p className={`text-sm font-semibold italic mb-4 ${recommended ? 'text-creative-300' : 'text-symbolic-600'}`}>
                {subtitle}
            </p>
        )}
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
                        title="PRESENCIA"
                        subtitle="Tu marca existe y se distingue."
                        price="$150 - $250 USD"
                        description={["Un logo construido desde lo que hace única a tu empresa, con todo lo que necesitas para usarlo bien: paleta, tipografía, manual de marca y el análisis completo de lo que representa."]}
                        onButtonClick={onPackageSelect}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-symbolic-600">
                                <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                                />
                                <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </svg>
                        }
                        animationProps={{
                            animate: { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] },
                            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                    <ServiceCard 
                        title="AUTORIDAD"
                        subtitle="Tu marca convence antes de que hables."
                        price="$400 - $600 USD"
                        description={[
                            "Todo lo de Presencia, más las aplicaciones reales donde tu marca vive: papelería, redes sociales y motion graphics.",
                            "Una identidad que no solo se ve bien en el archivo. Se ve bien en todas partes.",
                            "Para empresas que ya saben quiénes son y necesitan que el mundo lo vea."
                        ]}
                        recommended
                        onButtonClick={onPackageSelect}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-creative-400">
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                                />
                            </svg>
                        }
                        animationProps={{
                            animate: { y: [0, -10, 0] },
                            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                    <ServiceCard 
                        title="LEGADO"
                        subtitle="Tu marca trasciende el producto."
                        price="$900 - $1,500 USD"
                        description={[
                            "En tres años tu empresa puede haber cambiado de producto, de mercado o de tamaño. Tu marca no debería necesitar rehacerse cada vez.",
                            "Legado construye la identidad que sostiene todos esos cambios: la historia interna de tu empresa, el criterio para comunicarla y el video que la cuenta.",
                            "Para fundadores que no están construyendo un negocio. Están construyendo algo que dure."
                        ]}
                        gradientText
                        onButtonClick={onPackageSelect}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-deep-800">
                                <motion.path
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.263l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                />
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
