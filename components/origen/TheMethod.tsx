
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const steps = [
    { title: "Anclaje de Identidad", desc: "Definimos la intención profunda más allá del producto." },
    { title: "Definición de Arquetipo", desc: "Selección del rol psicológico (Héroe, Sabio, etc.)" },
    { title: "Mapeo de Símbolos", desc: "Investigación en el Libro de Símbolos y filtrado cultural." },
    { title: "Traducción Visual", desc: "Transformación de conceptos en formas, colores y ritmos." },
    { title: "Iteración y Validación", desc: "Test de coherencia semiótica y ajustes." },
    { title: "Integración Narrativa", desc: "Desarrollo del storytelling donde el logo es protagonista." }
];

export const TheMethod = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -50 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <section ref={ref} className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-deep-900 text-white relative">
            <div className="absolute top-0 w-full h-full bg-grid opacity-10 pointer-events-none"></div>

            <div className="max-w-5xl mx-auto w-full space-y-16 z-10">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                        El método.
                    </h2>
                    <p className="text-xl text-deep-200 font-light max-w-3xl mx-auto mb-12">
                        En 2024 usé la inteligencia artificial como espejo para sistematizar lo que ya hacía por intuición.
                    </p>
                    <p className="text-2xl text-creative-400 font-bold max-w-2xl mx-auto">
                        No para que la IA diseñara por mí. Para nombrar el proceso que ya existía.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="space-y-6"
                        variants={container}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="flex gap-4 items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-symbolic-500 transition-colors duration-300"
                            >
                                <div className="w-12 h-12 bg-symbolic-600 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                                    <p className="text-sm text-deep-300">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="flex flex-col justify-center items-center text-center space-y-8 p-8 bg-gradient-to-br from-symbolic-900 to-deep-900 rounded-3xl border border-symbolic-700/50 shadow-2xl">
                        <h3 className="text-3xl font-display font-bold text-creative-400">LogoCodeX™</h3>
                        <p className="text-lg text-deep-100 leading-relaxed">
                            No como un framework inventado. Como la sistematización de una forma de diseñar que llevaba años desarrollándose sin nombre.
                        </p>
                        <ul className="text-left text-deep-200 space-y-4 font-mono text-sm">
                            <li className="flex items-center"><span className="text-symbolic-500 mr-2">✓</span> Seis pasos definidos</li>
                            <li className="flex items-center"><span className="text-symbolic-500 mr-2">✓</span> Cuarenta y ocho páginas de manual</li>
                            <li className="flex items-center"><span className="text-symbolic-500 mr-2">✓</span> Metodología Inside-Out</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
