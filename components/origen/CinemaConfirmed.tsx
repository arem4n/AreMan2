
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue } from 'framer-motion';
import { interpolate } from 'flubber';

// SVG Paths
// Reel: Abstract representation of a film reel
const reelPath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.5-3.22-1.72-2.57 2.57-1.72-3.22 7.5zm5.5-5.5l-7.5 3.22 1.72 2.57-2.57 1.72 3.22-7.5z";
// Crow: Abstract bird shape, ideally same number of points but flubber handles interpolation
const crowPath = "M12 2L2 19h20L12 2zm0 3l6 11H6l6-11z";

export const CinemaConfirmed = () => {
    const ref = useRef(null);
    const [pathIndex, setPathIndex] = useState(0);
    const path = useMotionValue(reelPath);

    // We use useScroll to trigger the animation once
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    useEffect(() => {
        // Create the interpolator
        const interpolator = interpolate(reelPath, crowPath, { maxSegmentLength: 2 });

        // Subscribe to scroll changes to trigger animation
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0.5 && pathIndex === 0) {
                setPathIndex(1);
                animate(path, crowPath, {
                    duration: 2,
                    ease: "easeInOut",
                    // Use flubber interpolator for the 'mix' function if framer supported it directly this way,
                    // but framer's `animate` works on values.
                    // For paths, we often need a custom MotionValue update loop or use Framer's `d` animation which handles basic morphs.
                    // Flubber is best used if we manually drive the `d` attribute.
                    // Let's try a simpler approach: animate a progress value 0->1 and map it to the interpolator.
                });
            }
        });
        return unsubscribe;
    }, [scrollYProgress, pathIndex, path]);

    // Alternative: Use a motion value for progress 0 -> 1
    const progress = useMotionValue(0);
    const d = useTransform(progress, [0, 1], [reelPath, crowPath], {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 2 })
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0.4) { // Trigger slightly earlier
                animate(progress, 1, { duration: 2, ease: "easeInOut" });
            }
        });
        return unsubscribe;
    }, [scrollYProgress, progress]);

    return (
        <section ref={ref} className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-deep-900 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center z-10">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-16">
                    Lo que el cine confirmó.
                </h2>

                <div className="flex justify-center mb-16 h-64 items-center">
                    <svg viewBox="0 0 24 24" className="w-48 h-48 md:w-64 md:h-64 text-creative-400 fill-current">
                        <motion.path d={d} />
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
                        Con el tiempo empecé a aplicar eso a las marcas. Una marca es un personaje. Necesita una historia interna coherente para que el mundo externo la crea. Sin eso, es decoración que se ve bien en el portafolio pero no funciona en el mundo real.
                    </p>
                </div>
            </div>
        </section>
    );
};
