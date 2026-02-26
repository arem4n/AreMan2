"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';

const mapImages = [
    {
        src: "https://i.postimg.cc/vmqwxwrJ/Chile.png",
        alt: "Mapa de Chile",
        id: "chile"
    },
    {
        src: "https://i.postimg.cc/xdxVNVGD/Los_lagos.png",
        alt: "Región de Los Lagos",
        id: "los-lagos"
    },
    {
        src: "https://i.postimg.cc/0NW1K1YB/Puerto_Montt.png",
        alt: "Puerto Montt",
        id: "puerto-montt"
    }
];

export const BackToSouth = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeState, setActiveState] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) {
            setActiveState(0);
        } else if (latest < 0.66) {
            setActiveState(1);
        } else {
            setActiveState(2);
        }
    });

    return (
        <section
            ref={containerRef}
            className="min-h-[300vh] bg-deep-900 relative flex flex-col md:flex-row"
        >
            {/* Sticky Map Container - Left Side on Desktop */}
            <div className="sticky top-0 h-screen w-full md:w-1/2 flex items-center justify-center overflow-hidden z-0">
                <div className="relative w-full h-full flex items-center justify-center p-8 md:p-16">
                    {/* Render all images, control opacity based on state */}
                    {mapImages.map((img, index) => (
                        <motion.div
                            key={img.id}
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeState === index ? 1 : 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                           <div className="relative w-full h-full max-w-[500px] max-h-[800px]">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-contain"
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                           </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scrollable Text Container - Right Side on Desktop */}
            <div className="w-full md:w-1/2 flex flex-col relative z-10">

                {/* Section 1: Chile */}
                <div className="h-screen flex flex-col justify-center px-8 md:px-16 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false, amount: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                            La vuelta al sur.
                        </h2>
                        <p className="text-xl md:text-2xl text-deep-200 font-light leading-relaxed">
                            En 2022 volví a Chile.
                        </p>
                    </motion.div>
                </div>

                {/* Section 2: Los Lagos */}
                <div className="h-screen flex flex-col justify-center px-8 md:px-16">
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                         viewport={{ once: false, amount: 0.5 }}
                    >
                        <p className="text-xl md:text-2xl text-deep-200 font-light leading-relaxed">
                            A la Región de Los Lagos.
                        </p>
                    </motion.div>
                </div>

                {/* Section 3: Puerto Montt */}
                <div className="h-screen flex flex-col justify-center px-8 md:px-16">
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                         viewport={{ once: false, amount: 0.5 }}
                    >
                        <p className="text-xl md:text-2xl text-deep-200 font-light leading-relaxed">
                            A Puerto Montt. Al lugar del que me había ido.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
