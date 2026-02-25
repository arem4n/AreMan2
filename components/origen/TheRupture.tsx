
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AREM4N_BLUE = '#0F172A'; // deep-900
const AREM4N_PINK = '#f472b6'; // creative-400

export const TheRupture = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], [AREM4N_BLUE, AREM4N_PINK, AREM4N_BLUE]); // Transition to Pink then back? Or stay Pink? Prompt says "Final State: Pink for entire section".
    // Wait, prompt says: "Al salir de la sección el fondo vuelve gradualmente al oscuro".
    // So while IN the section it transitions to Pink.

    return (
        <motion.section
            ref={ref}
            style={{ backgroundColor }}
            className="min-h-screen flex flex-col justify-center items-center px-6 py-24 transition-colors duration-500"
        >
            <div className="max-w-4xl mx-auto text-center z-10 space-y-12 mix-blend-difference text-white">
            {/* mix-blend-difference ensures text is visible on both blue and pink if white */}
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-12">
                    La ruptura.
                </h2>

                <p className="text-xl md:text-2xl leading-relaxed font-light">
                    Después de casi una década en Buenos Aires llegó un momento en que los marcos disponibles no alcanzaban. No porque fueran incorrectos. Porque mi forma de ver había crecido más allá de ellos.
                </p>

                <p className="text-xl md:text-2xl leading-relaxed font-bold">
                    No podía seguir aplicando sistemas de otros sin traicionarme.
                </p>

                <p className="text-xl md:text-2xl leading-relaxed font-light">
                    Eso me obligó a hacer algo incómodo: construir mi propio sistema desde cero.
                </p>
            </div>
        </motion.section>
    );
};
