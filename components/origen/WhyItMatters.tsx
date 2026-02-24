
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export const WhyItMatters = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.8
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section ref={ref} className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-white text-deep-900">
            <motion.div
                className="max-w-4xl mx-auto text-center space-y-12"
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                <motion.h2 variants={item} className="text-4xl md:text-6xl font-display font-bold text-deep-800 mb-12">
                    Por qué importa.
                </motion.h2>

                <motion.p variants={item} className="text-xl md:text-2xl font-light text-deep-600 leading-relaxed max-w-3xl mx-auto">
                    No construí LogoCodeX™ para diferenciarme en el mercado.
                </motion.p>

                <motion.p variants={item} className="text-xl md:text-2xl font-light text-deep-600 leading-relaxed max-w-3xl mx-auto">
                    Lo construí porque no encontré ningún método que respondiera la pregunta que más me importaba:
                </motion.p>

                <motion.div variants={item} className="bg-deep-50 p-8 rounded-2xl border border-deep-200 shadow-sm max-w-2xl mx-auto">
                    <p className="text-2xl md:text-3xl font-display font-bold text-symbolic-600 italic">
                        ¿Cómo se hace visible lo que una empresa es realmente?
                    </p>
                </motion.div>

                <motion.p variants={item} className="text-xl text-deep-700 leading-relaxed">
                    Esa pregunta sigue siendo el centro de cada proyecto que tomo.
                </motion.p>

                <div className="h-16"></div> {/* Spacer */}

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }} // Longer delay for the final line
                    className="text-lg md:text-xl font-medium text-creative-600"
                >
                    Si llegaste hasta acá, probablemente es la misma pregunta que te trajo aquí.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3, duration: 0.5, type: "spring" }}
                    className="mt-12"
                >
                    <a
                        href="/#contacto"
                        className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-subtle"
                    >
                        Solicitar Auditoría de Identidad
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};
