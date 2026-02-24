
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export const TheMoment = () => {
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
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section ref={ref} className="min-h-screen flex flex-col justify-center items-center px-6 py-24 max-w-4xl mx-auto">
            <motion.div
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="space-y-12 text-center"
            >
                <motion.h2 variants={item} className="text-4xl md:text-6xl font-display font-bold text-white mb-12">
                    El momento que cambió cómo veo todo.
                </motion.h2>

                <motion.p variants={item} className="text-xl text-deep-200 leading-relaxed font-light">
                    Hay un momento en la carrera donde dejás de ver imágenes y empezás a leerlas.
                </motion.p>

                <motion.p variants={item} className="text-xl text-deep-200 leading-relaxed font-light">
                    Para mí fue cuando entendí que todo comunica con intención, aunque el autor quiera desaparecer. Que detrás de cada imagen, cada palabra, cada símbolo, hay una decisión que dice algo más de lo que parece.
                </motion.p>

                <motion.p variants={item} className="text-3xl md:text-5xl font-display font-bold text-creative-400 leading-tight py-8">
                    No existe la comunicación neutral. Solo existe la comunicación consciente y la inconsciente.
                </motion.p>

                <motion.p variants={item} className="text-xl text-deep-200 leading-relaxed font-light">
                    Y que la diferencia entre las dos es enorme.
                </motion.p>

                <motion.div variants={item} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-lg md:text-xl text-deep-100 italic">
                        &quot;Eso me hizo ver las marcas de otra manera. Una marca no es un logo. Es un sistema de decisiones que comunica algo constantemente, quiera o no. La pregunta no es si tu marca está diciendo algo. La pregunta es si está diciendo lo que quieres decir.&quot;
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};
