
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const ProcessStep = ({ number, title, description }: { number: number, title: string, description: string }) => (
    <motion.div 
        variants={itemVariants}
        className="text-center relative z-10 bg-white rounded-2xl p-6 shadow-lg border border-symbolic-100 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-xl flex flex-col items-center group"
    >
        <div className="w-12 h-12 flex items-center justify-center bg-symbolic-600 text-white rounded-full mx-auto mb-4 text-xl font-bold relative">
            <span className="relative z-10">{number}</span>
            <div className="absolute inset-0 rounded-full bg-symbolic-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity duration-300"></div>
        </div>
        <h3 className="font-semibold text-deep-800 text-base mb-2 break-words">{title}</h3>
        <p className="text-sm text-deep-600">{description}</p>
    </motion.div>
);

const Process: React.FC = () => {
    return (
        <section id="proceso" className="py-16 lg:py-24 bg-deep-50 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl lg:text-5xl font-display font-bold text-center mb-20 text-deep-800"
                >
                    Proceso de Trabajo
                </motion.h2>
                
                <div className="relative">
                    {/* Animated Connection Line (Desktop only) */}
                    <div className="absolute inset-x-0 top-6 hidden md:block px-16">
                        <div className="h-1 bg-deep-200/50 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="h-full bg-symbolic-300 w-full"
                            />
                        </div>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-4 gap-12 relative z-10"
                    >
                        <ProcessStep number={1} title="Brief y análisis de marca" description="Entendemos visión, objetivos y necesidades de la startup." />
                        <ProcessStep number={2} title="Diseño y desarrollo" description="Logo, branding, motion graphics y video según paquete elegido." />
                        <ProcessStep number={3} title="Revisión colaborativa" description="Trabajamos hasta que el resultado sea perfecto." />
                        <ProcessStep number={4} title="Entrega lista para usar" description="Archivos listos para web, redes y otros medios." />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Process;
