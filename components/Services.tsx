import React from 'react';
import { trackEvent } from '../analytics';
import { Icon } from './icons/Icon';

interface ServiceCardProps {
    title: string;
    price: string;
    description: string[];
    subtitle?: string;
    recommended?: boolean;
    onButtonClick: (title: string) => void;
    icon?: React.ReactNode;
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

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, subtitle, description, recommended = false, onButtonClick, icon }) => (
    <div className={`relative card-hover rounded-2xl p-4 lg:p-5 shadow-lg flex flex-col h-full transition duration-200 ease-out ${recommended ? 'bg-symbolic-700 text-white shadow-xl' : 'bg-white border border-deep-100'}`}>
        {recommended && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-creative-400 text-deep-900 px-3 py-1 rounded-full text-xs font-semibold z-10">RECOMENDADO</div>}

        {icon && (
            <div className="flex justify-center mb-3">
                <div className="p-2.5 rounded-full bg-white/10 border border-white/10">
                    {icon}
                </div>
            </div>
        )}

        <h4 className={`text-lg lg:text-xl font-display font-bold mb-1 text-center ${recommended ? 'text-white' : 'text-deep-800'}`}>{title}</h4>
        {subtitle && (
             <p className={`text-xs lg:text-sm font-semibold italic mb-2 text-center ${recommended ? 'text-creative-300' : 'text-symbolic-600'}`}>
                {subtitle}
            </p>
        )}
        <div className={`text-xs lg:text-sm mb-3 flex-grow ${recommended ? 'text-symbolic-200' : 'text-deep-800'}`}>
            {description.map((line, index) => (
                <p key={index} className="mb-1 last:mb-0">
                    {renderSafeText(line)}
                </p>
            ))}
        </div>
        <div className="text-right mt-auto">
            <div className={`text-xl lg:text-2xl font-bold ${recommended ? 'text-creative-300' : 'text-symbolic-600'}`}>{price}</div>
            <div className={`text-[10px] ${recommended ? 'text-symbolic-200' : 'text-deep-500'}`}>Inversión estimada</div>
        </div>
        <button
            type="button"
            onClick={() => {
                trackEvent('select_service_package', { packageName: title });
                onButtonClick(title);
            }}
            className={`mt-4 self-center w-max text-center font-semibold py-2 px-5 text-sm rounded-full transition duration-200 ease-out shadow-lg hover:shadow-xl [@media(hover:hover)]:hover:scale-105 active:scale-95 ${recommended ? 'bg-creative-500 hover:bg-creative-600 text-deep-900' : 'bg-symbolic-600 hover:bg-symbolic-700 text-white'}`}
        >
            Auditar con este Pack
        </button>
    </div>
);

interface ServicesProps {
    onPackageSelect: (packageName: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onPackageSelect }) => {
    return (
        <>
            {/* SECCIÓN 1: NIVELES DE INTERVENCIÓN */}
            <section id="servicios" className="bg-deep-50 py-12 lg:py-20 relative">
                <div className="max-w-6xl mx-auto px-4 w-full flex flex-col">
                    <h2 className="text-fluid-section font-display font-bold text-center mb-8 lg:mb-12 text-deep-800">
                        Niveles de Intervención
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
                        {/* PRESENCIA */}
                        <div className="w-full flex flex-col h-full">
                            <ServiceCard 
                                title="PRESENCIA"
                                subtitle="Tu marca existe y se distingue."
                                price="$150 - $250 USD"
                                description={["Un logo construido desde lo que hace única a tu empresa, con todo lo que necesitas para usarlo bien: paleta, tipografía, manual de marca y el análisis completo de lo que representa."]}
                                onButtonClick={onPackageSelect}
                                icon={<Icon name="services-presencia" size={32} className="text-symbolic-600" />}
                            />
                        </div>
                        
                        {/* AUTORIDAD */}
                        <div className="w-full flex flex-col h-full">
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
                                icon={<Icon name="services-autoridad" size={32} className="text-creative-400" />}
                            />
                        </div>

                        {/* LEGADO */}
                        <div className="w-full flex flex-col h-full">
                            <ServiceCard 
                                title="LEGADO"
                                subtitle="Tu marca trasciende el producto."
                                price="$900 - $1,500 USD"
                                description={[
                                    "En tres años tu empresa puede haber cambiado de producto, de mercado o de tamaño. Tu marca no debería necesitar rehacerse cada vez.",
                                    "Legado construye la identidad que sostiene todos esos cambios: la historia interna de tu empresa, el criterio para comunicarla y el video que la cuenta.",
                                    "Para fundadores que no están construyendo un negocio. Están construyendo algo que dure."
                                ]}
                                onButtonClick={onPackageSelect}
                                icon={<Icon name="services-legado" size={32} className="text-deep-800" />}
                            />
                        </div>
                    </div>

                    <p className="text-sm lg:text-base text-center max-w-3xl mx-auto text-deep-800 leading-relaxed">
                        No compres &quot;diseño bonito&quot;. Invierte en <strong>mitigación de riesgo</strong>. Una marca débil te cuesta clientes todos los días. Elige la profundidad estratégica que tu facturación merece.
                    </p>
                </div>
            </section>

            {/* SECCIÓN 2: CONSTRUCCIÓN DIGITAL */}
            <section id="construccion-digital" className="bg-white border-t border-deep-200 py-12 lg:py-20 relative">
                <div className="max-w-5xl mx-auto px-4 w-full flex flex-col lg:gap-10">
                    <div className="text-center mb-8 lg:mb-12">
                        <span className="inline-block px-4 py-1 bg-deep-900/5 text-deep-500 text-xs font-bold tracking-widest uppercase rounded-full mb-2">
                            Construcción Digital
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-deep-800 mb-1.5">
                            Del símbolo a la experiencia
                        </h3>
                        <p className="text-sm lg:text-base text-deep-600 max-w-2xl mx-auto">
                            La identidad es el punto de partida. También construyo el espacio digital donde vive.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Página Web */}
                        <div className="w-full flex flex-col h-full">
                            <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-lg border border-deep-100 flex flex-col gap-3 h-full justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-widest text-symbolic-600 uppercase">Página Web</span>
                                    <h4 className="text-lg lg:text-xl font-display font-bold text-deep-800">Tu marca, con domicilio en internet.</h4>
                                    <p className="text-deep-700 text-xs lg:text-sm leading-relaxed">
                                        Landing pages, sitios corporativos y portfolios. Diseñados para convertir, construidos con Next.js y optimizados para velocidad y posicionamiento.
                                        No son plantillas: cada sitio refleja la identidad que construimos juntos.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <div>
                                        <div className="text-xl font-bold text-symbolic-600">$200 – $800 USD</div>
                                        <div className="text-xs text-deep-500">Inversión estimada</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onPackageSelect('Página Web')}
                                        className="self-start font-semibold py-2 px-5 text-sm rounded-full bg-symbolic-600 hover:bg-symbolic-700 text-white transition duration-200 ease-out shadow-lg [@media(hover:hover)]:hover:scale-105 active:scale-95"
                                    >
                                        Conversar sobre mi sitio
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Web App */}
                        <div className="w-full flex flex-col h-full">
                            <div className="bg-deep-900 rounded-2xl p-4 lg:p-5 shadow-xl border border-deep-700 flex flex-col gap-3 text-white h-full justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-widest text-creative-400 uppercase">Web App</span>
                                    <h4 className="text-lg lg:text-xl font-display font-bold text-white">Cuando necesitas un sistema, no solo una vitrina.</h4>
                                    <p className="text-deep-300 text-xs lg:text-sm leading-relaxed">
                                        Aplicaciones con autenticación, base de datos en tiempo real, lógica de negocio y paneles de gestión.
                                        Gamificación, reservas, roles de usuario, notificaciones push.
                                        Stack: React · Next.js · Firebase · TypeScript · Vercel.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <div className="flex justify-between items-baseline gap-2 flex-wrap">
                                        <div>
                                            <div className="text-xl font-bold text-creative-400">$2,000 – $5,000 USD</div>
                                            <div className="text-xs text-deep-400">Inversión estimada · según alcance</div>
                                        </div>
                                        <a
                                            href="#portafolio"
                                            className="text-xs text-creative-400 hover:text-creative-300 transition-colors underline underline-offset-2"
                                        >
                                            Ver caso real: TommyBox →
                                        </a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onPackageSelect('Web App')}
                                        className="self-start font-semibold py-2 px-5 text-sm rounded-full bg-creative-500 hover:bg-creative-400 text-deep-900 transition duration-200 ease-out shadow-lg [@media(hover:hover)]:hover:scale-105 active:scale-95"
                                    >
                                        Conversar sobre mi app
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
