
import React from 'react';
import { trackEvent } from '../analytics';
import { SmartLink } from './SmartLink';

interface ServiceCardProps {
    title: string;
    price: string;
    description: string[];
    recommended?: boolean;
    gradientText?: boolean;
    onButtonClick: (title: string) => void;
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

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, description, recommended = false, gradientText = false, onButtonClick }) => (
    <div className={`relative card-hover rounded-2xl p-6 lg:p-8 shadow-lg flex flex-col h-full transition-all duration-300 ease-in-out ${recommended ? 'bg-gradient-to-r from-symbolic-600 to-deep-700 text-white shadow-xl' : 'bg-white border border-deep-100'}`}>
        {recommended && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-creative-400 text-deep-900 px-3 py-1 rounded-full text-sm font-semibold z-10">RECOMENDADO</div>}
        <h3 className={`text-2xl font-display font-bold mb-4 mt-4 ${recommended ? 'text-white' : 'text-deep-800'}`}>{title}</h3>
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
        <SmartLink
            href="#contacto" 
            onClick={(e) => {
                e.preventDefault();
                trackEvent('select_service_package', { packageName: title });
                onButtonClick(title);
            }} 
            className={`mt-6 self-center w-max inline-block text-center font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${recommended ? 'bg-creative-500 hover:bg-creative-600 text-deep-900' : 'bg-symbolic-600 hover:bg-symbolic-700 text-white'}`}
        >
            Auditar con este Pack
        </SmartLink>
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
                    />
                    <ServiceCard 
                        title="Fase 2: Arquitectura de Marca"
                        price="$400 - $600 USD"
                        description={["<strong>El estándar de Autoridad.</strong> Diseñamos el sistema completo para que tu marca funcione en todos los canales. Incluye Motion Graphics para captar la atención en segundos. <strong>ROI: Coherencia total y confianza inmediata.</strong>"]}
                        recommended
                        onButtonClick={onPackageSelect}
                    />
                    <ServiceCard 
                        title="Fase 3: Soberanía Visual"
                        price="$900 - $1,500 USD"
                        description={["<strong>Dominio de Mercado.</strong> Para fundadores que no compiten, sino que lideran. Video corporativo con narrativa profunda y manual de marca exhaustivo. Convertimos tu visión en un activo intangible de alto valor."]}
                        gradientText
                        onButtonClick={onPackageSelect}
                    />
                </div>
                <p className="text-lg text-center max-w-3xl mx-auto text-deep-800 leading-relaxed">
                    No compres "diseño bonito". Invierte en <strong>mitigación de riesgo</strong>. Una marca débil te cuesta clientes todos los días. Elige la profundidad estratégica que tu facturación merece.
                </p>
            </div>
        </section>
    );
};

export default Services;
