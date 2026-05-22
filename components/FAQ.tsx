
import React, { useState } from 'react';
import { Icon, IconName } from './icons/Icons';
import { ChevronRightIcon } from './icons/Icons';

const faqs: { icon: IconName, question: string, answer: string }[] = [
    {
        icon: 'faq-soberania',
        question: "¿Por qué hablan de \"Soberanía Visual\" y no solo de diseño de logotipos?",
        answer: "Porque un logotipo aislado es solo un adorno. La Soberanía Visual es la construcción de un activo financiero intangible. Diseño sistemas completos basados en arquetipos y semiótica profunda que permiten a tu marca dejar de competir por precio y empezar a liderar por autoridad."
    },
    {
        icon: 'faq-involucramiento',
        question: "¿Cuál es el nivel de involucramiento requerido por parte del fundador?",
        answer: "Requiere una colaboración profunda durante la Fase 1 (Diagnóstico Semiótico). Mi método LogoCodex™ no funciona con formularios genéricos; necesito extraer la visión fundamental de los fundadores para codificarla en la identidad visual. Una vez superada esta fase, asumo el control técnico y arquitectónico."
    },
    {
        icon: 'faq-filtro',
        question: "¿Trabajan con cualquier tipo de empresa o rubro?",
        answer: "Sí. El método LogoCodeX™ no depende del rubro, depende de que haya algo real que contar. He trabajado con tecnología, servicios, gastronomía y más. Lo que sí requiero es compromiso con el proceso: si buscas un diseño rápido sin profundidad, mi forma de trabajar resultará excesiva para eso."
    },
    {
        icon: 'faq-entrega',
        question: "¿Qué incluye exactamente la entrega de la Fase 3?",
        answer: "No entregamos archivos sueltos. Entregamos un ecosistema funcional. Esto incluye versiones vectoriales infinitamente escalables, sistemas cromáticos exactos, motion graphics listos para implementación en código (React/Next.js), iconografía UI personalizada y un Manual de Marca exhaustivo que dicta las reglas absolutas de tu nueva identidad."
    },
    {
        icon: 'faq-ia',
        question: "¿Cómo integran la Inteligencia Artificial en el proceso?",
        answer: "A través de mi pilar de \"Creatividad Expandida\". Uso modelos de IA avanzados para acelerar diagnósticos, generar iteraciones complejas y testear aplicaciones en tiempo récord. Sin embargo, la dirección de arte, la estrategia semiótica y el pulido final de los vectores se mantienen estrictamente bajo control humano para garantizar originalidad absoluta."
    }
];

const FAQItem: React.FC<{ icon: IconName; question: string; answer: string; index: number }> = ({ icon, question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-deep-200">
            <button
                id={`faq-btn-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left focus-visible:outline-none group"
            >
                <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${isOpen ? 'bg-symbolic-600 text-white' : 'bg-deep-100 text-deep-500 group-hover:bg-deep-200'}`}>
                        <Icon name={icon} size={20} />
                    </div>
                    <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-symbolic-600' : 'text-deep-800 group-hover:text-symbolic-600'}`}>
                        {question}
                    </span>
                </div>
                <span className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-90 text-symbolic-600' : 'text-deep-400'}`}>
                    <ChevronRightIcon className="w-6 h-6" />
                </span>
            </button>

            {/* grid-template-rows transition avoids animating height directly (no layout thrash) */}
            <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-btn-${index}`}
                style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    transition: 'grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
                }}
            >
                <div style={{ overflow: 'hidden' }}>
                    <p className="pb-6 text-deep-600 leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-deep-200 text-deep-700 text-xs font-bold tracking-widest uppercase mb-4">
                        Dudas Estratégicas
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-deep-800">
                        Preguntas antes de Iniciar
                    </h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-deep-100 p-6 lg:p-8">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} index={index} icon={faq.icon} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
