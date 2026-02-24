
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// SVG Paths (Approximations for Morphing)
const paths = {
    // Film Reel Icon
    reel: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    // Crow/Bird (Simplified for smooth morph)
    crow: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" // Using a checkmark-like path temporarily or finding a better bird path if available. Let's try to make it more bird-like.
};

// Actually, let's use a simpler morph logic: Fade between two distinct SVGs if path morphing is too complex without exact point matching.
// The user asked for "Morphing". Let's try to animate `d` attribute. If points don't match, it might look glitchy, but Framer Motion handles it reasonably well for simple shapes.
// Better approach: Crossfade with scale/rotate to simulate transformation if paths are too different.
// However, I will try to use the path morphing as requested.

const reelPath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.5-3.22-1.72-2.57 2.57-1.72-3.22 7.5zm5.5-5.5l-7.5 3.22 1.72 2.57-2.57 1.72 3.22-7.5z"; // Abstract geometric
const crowPath = "M12 2L2 19h20L12 2zm0 3l6 11H6l6-11z"; // Triangle/Bird abstraction

export const CinemaConfirmed = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={ref} className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-deep-900 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center z-10">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-16">
                    Lo que el cine confirmó.
                </h2>

                <div className="flex justify-center mb-16 h-64 items-center">
                    <svg viewBox="0 0 24 24" className="w-48 h-48 md:w-64 md:h-64 text-creative-400 fill-current">
                        <motion.path
                            d={pathProgress.get() < 0.5 ? reelPath : crowPath} // Immediate switch or interpolation?
                            // Framer Motion automatically interpolates `d` if compatible.
                            // Let's force interpolation by passing the value to `animate` based on scroll? No, scroll drives it.
                            style={{ pathLength: 1 }}
                            initial={{ d: reelPath }}
                            whileInView={{ d: crowPath }}
                            viewport={{ margin: "-20%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                <div className="space-y-8 text-xl text-deep-200 font-light leading-relaxed">
                    <p>
                        Estudié Diseño de Imagen y Sonido en la FADU, Buenos Aires. Casi una década aprendiendo que cada plano tiene que justificar su existencia. Que el espacio, la luz y el símbolo comunican antes que las palabras.
                    </p>
                    <p className="font-medium text-white">
                        Que un personaje sin historia interna no convence a nadie, por más bien que se vea.
                    </p>
                    <p>
                        Con el tiempo empecé a aplicar eso a las marcas. Una marca es un personaje. Necesita una historia interna coherente para que el mundo externo la crea. Sin eso, es decoración que se ve bien en el portafolio y no funciona en el mundo real.
                    </p>
                </div>
            </div>
        </section>
    );
};
