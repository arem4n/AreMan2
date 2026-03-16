
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from './icons/Icons';

const faqs = [
    {
        question: "¿Por qué hablan de \"Soberanía Visual\" y no solo de diseño de logotipos?",
        answer: "Porque un logotipo aislado es solo un adorno. La Soberanía Visual es la construcción de un activo financiero intangible. Diseño sistemas completos basados en arquetipos y semiótica profunda que permiten a tu marca dejar de competir por precio y empezar a liderar por autoridad."
    },
    {
        question: "¿Cuál es el nivel de involucramiento requerido por parte del fundador?",
        answer: "Requiere una colaboración profunda durante la Fase 1 (Diagnóstico Semiótico). Mi método LogoCodex™ no funciona con formularios genéricos; necesito extraer la visión fundamental de los fundadores para codificarla en la identidad visual. Una vez superada esta fase, asumo el control técnico y arquitectónico."
    },
    {
        question: "¿Trabajan con cualquier tipo de empresa o rubro?",
        answer: "No. Mi enfoque está diseñado específicamente para startups tecnológicas, ecosistemas de software y fundadores que buscan escalar. Si solo buscas un \"diseño rápido\" para salir del paso, mi ecosistema de trabajo resultará excesivo para tus necesidades."
    },
    {
        question: "¿Qué incluye exactamente la entrega de la Fase 3?",
        answer: "No entregamos archivos sueltos. Entregamos un ecosistema funcional. Esto incluye versiones vectoriales infinitamente escalables, sistemas cromáticos exactos, motion graphics listos para implementación en código (React/Next.js), iconografía UI personalizada y un Manual de Marca exhaustivo que dicta las reglas absolutas de tu nueva identidad."
    },
    {
        question: "¿Cómo integran la Inteligencia Artificial en el proceso?",
        answer: "A través de mi pilar de \"Creatividad Expandida\". Uso modelos de IA avanzados para acelerar diagnósticos, generar iteraciones complejas y testear aplicaciones en tiempo récord. Sin embargo, la dirección de arte, la estrategia semiótica y el pulido final de los vectores se mantienen estrictamente bajo control humano para garantizar originalidad absoluta."
    }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-deep-200">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-symbolic-600' : 'text-deep-800 group-hover:text-symbolic-600'}`}>
                    {question}
                </span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90 text-symbolic-600' : 'text-deep-400'}`}>
                    <ChevronRightIcon className="w-6 h-6" />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-deep-600 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
    return (
        <section className="py-16 bg-deep-50">
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
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
