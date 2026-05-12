
import React from 'react';
import { motion } from 'framer-motion';
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
    <div className={`relative card-hover rounded-2xl p-6 lg:p-8 shadow-lg flex flex-col h-full transition duration-200 ease-out ${recommended ? 'bg-symbolic-700 text-white shadow-xl' : 'bg-white border border-deep-100'}`}>
        {recommended && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-creative-400 text-deep-900 px-3 py-1 rounded-full text-sm font-semibold z-10">RECOMENDADO</div>}

        {icon && (
            <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-white/10 border border-white/10">
                    {icon}
                </div>
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
            <div className={`text-3xl font-bold ${recommended ? 'text-creative-300' : 'text-symbolic-600'}`}>{price}</div>
            <div className={`text-sm ${recommended ? 'text-symbolic-200' : 'text-deep-500'}`}>Inversión estimada</div>
        </div>
        <button
            type="button"
            onClick={() => {
                trackEvent('select_service_package', { packageName: title });
                onButtonClick(title);
            }}
            className={`mt-6 self-center w-max text-center font-semibold py-3 px-8 rounded-full transition duration-200 ease-out shadow-lg hover:shadow-xl [@media(hover:hover)]:hover:scale-105 active:scale-95 ${recommended ? 'bg-creative-500 hover:bg-creative-600 text-deep-900' : 'bg-symbolic-600 hover:bg-symbolic-700 text-white'}`}
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
        <section id="servicios" className="py-16 lg:py-24 bg-deep-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-fluid-section font-display font-bold text-center mb-16 text-deep-800">
                    Niveles de Intervención
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mb-16">
                    <ServiceCard 
                        title="PRESENCIA"
                        subtitle="Tu marca existe y se distingue."
                        price="$150 - $250 USD"
                        description={["Un logo construido desde lo que hace única a tu empresa, con todo lo que necesitas para usarlo bien: paleta, tipografía, manual de marca y el análisis completo de lo que representa."]}
                        onButtonClick={onPackageSelect}
                        icon={<Icon name="services-presencia" size={48} className="text-symbolic-600" />}
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
                        icon={<Icon name="services-autoridad" size={48} className="text-creative-400" />}
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
                        onButtonClick={onPackageSelect}
                        icon={<Icon name="services-legado" size={48} className="text-deep-800" />}
                    />

                </div>
                <p className="text-lg text-center max-w-3xl mx-auto text-deep-800 leading-relaxed">
                    No compres &quot;diseño bonito&quot;. Invierte en <strong>mitigación de riesgo</strong>. Una marca débil te cuesta clientes todos los días. Elige la profundidad estratégica que tu facturación merece.
                </p>

                {/* ── CONSTRUCCIÓN DIGITAL ── */}
                <div className="mt-20 pt-16 border-t border-deep-200">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-deep-900/5 text-deep-500 text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                            Construcción Digital
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-display font-bold text-deep-800 mb-4">
                            Del símbolo a la experiencia
                        </h3>
                        <p className="text-lg text-deep-600 max-w-2xl mx-auto">
                            La identidad es el punto de partida. También construyo el espacio digital donde vive.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                        {/* Página Web */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-deep-100 flex flex-col gap-4">
                            <span className="text-xs font-bold tracking-widest text-symbolic-600 uppercase">Página Web</span>
                            <h4 className="text-2xl font-display font-bold text-deep-800">Tu marca, con domicilio en internet.</h4>
                            <p className="text-deep-700 leading-relaxed flex-grow">
                                Landing pages, sitios corporativos y portfolios. Diseñados para convertir, construidos con Next.js y optimizados para velocidad y posicionamiento.
                                No son plantillas: cada sitio refleja la identidad que construimos juntos.
                            </p>
                            <div>
                                <div className="text-2xl font-bold text-symbolic-600">$200 – $800 USD</div>
                                <div className="text-sm text-deep-500">Inversión estimada</div>
                            </div>
                            <button
                                type="button"
                                onClick={() => onPackageSelect('Página Web')}
                                className="self-start mt-2 font-semibold py-3 px-8 rounded-full bg-symbolic-600 hover:bg-symbolic-700 text-white transition duration-200 ease-out shadow-lg [@media(hover:hover)]:hover:scale-105 active:scale-95"
                            >
                                Conversar sobre mi sitio
                            </button>
                        </div>

                        {/* Web App */}
                        <div className="bg-deep-900 rounded-2xl p-8 shadow-xl border border-deep-700 flex flex-col gap-4 text-white">
                            <span className="text-xs font-bold tracking-widest text-creative-400 uppercase">Web App</span>
                            <h4 className="text-2xl font-display font-bold text-white">Cuando necesitas un sistema, no solo una vitrina.</h4>
                            <p className="text-deep-300 leading-relaxed flex-grow">
                                Aplicaciones con autenticación, base de datos en tiempo real, lógica de negocio y paneles de gestión.
                                Gamificación, reservas, roles de usuario, notificaciones push.
                                Stack: React · Next.js · Firebase · TypeScript · Vercel.
                            </p>
                            <div>
                                <div className="text-2xl font-bold text-creative-400">$2,000 – $5,000 USD</div>
                                <div className="text-sm text-deep-400">Inversión estimada · según alcance</div>
                            </div>
                            <a
                                href="#portafolio"
                                className="text-xs text-creative-400 hover:text-creative-300 transition-colors underline underline-offset-2"
                            >
                                Ver caso real: TommyBox →
                            </a>
                            <button
                                type="button"
                                onClick={() => onPackageSelect('Web App')}
                                className="self-start mt-2 font-semibold py-3 px-8 rounded-full bg-creative-500 hover:bg-creative-400 text-deep-900 transition duration-200 ease-out shadow-lg [@media(hover:hover)]:hover:scale-105 active:scale-95"
                            >
                                Conversar sobre mi app
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
