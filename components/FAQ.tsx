
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from './icons/Icons';

const faqs = [
    {
        question: "¿Por qué no usar simplemente IA o una plantilla de $50?",
        answer: "La IA (el Águila) trabaja con promedios estadísticos; genera lo que ya existe. Si buscas encajar, úsala. Si buscas destacar y poseer una identidad propia (el Cóndor), necesitas un arquitecto que dirija la herramienta, no que sea usado por ella. LogoCodex™ garantiza que tu marca no sea una alucinación genérica."
    },
    {
        question: "¿Qué pasa si no me gusta la propuesta de diseño?",
        answer: "No diseñamos para tu gusto personal, diseñamos para tu objetivo comercial y tu arquetipo de cliente. Sin embargo, el proceso LogoCodex™ incluye fases de validación (Paso 5) para asegurar que te sientas representado. No hay sorpresas desagradables, solo evolución estratégica."
    },
    {
        question: "¿Cuánto tiempo toma el proceso completo?",
        answer: "La soberanía no se construye en una tarde. Dependiendo del nivel de profundidad (Diagnóstico vs. Arquitectura Completa), el proceso toma entre 2 a 5 semanas. Preferimos hacerlo bien una vez, que hacerlo rápido y mal dos veces."
    },
    {
        question: "¿Entregas los archivos editables?",
        answer: "Absolutamente. En la sección de 'Entregables' verás que recibes el 'Arsenal Completo': Vectores (AI, SVG), manuales y sistemas listos para usar. Eres dueño total de tu propiedad intelectual."
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
