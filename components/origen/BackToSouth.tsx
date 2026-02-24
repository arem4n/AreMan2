
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Mock map component since we don't have a Mapbox token
// Using Framer Motion to simulate zoom/pan
const MockMap = () => {
    const [state, setState] = useState(0); // 0: Chile, 1: Región de los Lagos, 2: Puerto Montt
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20%" });

    useEffect(() => {
        if (isInView) {
            const timer1 = setTimeout(() => setState(1), 1500);
            const timer2 = setTimeout(() => setState(2), 3000);
            return () => { clearTimeout(timer1); clearTimeout(timer2); };
        }
    }, [isInView]);

    const variants = {
        0: { scale: 1, x: 0, y: 0 },
        1: { scale: 3, x: 50, y: -50 }, // Zoom into south
        2: { scale: 8, x: 100, y: -100 } // Zoom into Puerto Montt
    };

    return (
        <div ref={ref} className="w-full h-[500px] bg-deep-900 rounded-3xl overflow-hidden relative border border-deep-700 shadow-2xl">
            <motion.div
                className="absolute inset-0 bg-deep-800 opacity-50"
                animate={variants[state as keyof typeof variants]}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                {/* Simulated Map Content - Abstract Shapes */}
                <svg viewBox="0 0 800 600" className="w-full h-full text-deep-600 fill-current opacity-30">
                    <path d="M350,50 L400,100 L380,200 L420,300 L350,500 Z" /> {/* Chile-ish shape */}
                </svg>
                {/* Markers */}
                {state >= 1 && (
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-symbolic-500 rounded-full"
                    />
                )}
                 {state >= 2 && (
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute top-[60%] left-[60%] w-6 h-6 bg-creative-500 rounded-full border-2 border-white shadow-glow"
                    />
                )}
            </motion.div>

            <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md p-6 rounded-xl border border-white/10 max-w-sm">
                <h3 className="text-xl font-bold text-white mb-2">Puerto Montt, 2022</h3>
                <p className="text-sm text-deep-200">Volví siendo otra persona. Con años de práctica, con preguntas propias y con algo que todavía no tenía nombre.</p>
            </div>
        </div>
    );
};

export const BackToSouth = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-deep-900">
            <div className="max-w-5xl mx-auto w-full space-y-16">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                        La vuelta al sur.
                    </h2>
                    <p className="text-xl text-deep-200 font-light max-w-2xl mx-auto">
                        En 2022 volví a Chile. A Puerto Montt. Al lugar del que me había ido.
                    </p>
                </div>

                <MockMap />

                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <p className="text-xl text-deep-200 leading-relaxed font-light">
                        Fue en esa vuelta donde empecé a ver con claridad algo que siempre había operado en mí: que la identidad genuina no se construye de afuera hacia adentro.
                    </p>
                    <p className="text-2xl text-creative-400 font-bold leading-relaxed">
                        Se construye al revés. Primero entender qué es real. Después hacerlo visible.
                    </p>
                </div>
            </div>
        </section>
    );
};
