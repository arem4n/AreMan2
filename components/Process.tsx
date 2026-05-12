
import React from 'react';
import { motion } from 'framer-motion';
import { Icon, IconName } from './icons/Icons';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
};

const ProcessStep = ({ icon, number, title, description }: { icon: IconName, number: number, title: string, description: string }) => (
    <motion.div
        variants={itemVariants}
        className="text-center relative z-10 flex flex-col items-center group"
    >
        <div className="relative mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-symbolic-100 text-symbolic-600 rounded-2xl mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <Icon name={icon} size={32} />
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center bg-symbolic-600 text-white rounded-full text-xs font-bold shadow-md z-20">
                {number}
            </div>
        </div>
        <h4 className="font-display font-bold text-deep-800 text-lg mb-3">{title}</h4>
        <p className="text-sm text-deep-500 max-w-[200px] mx-auto leading-relaxed">{description}</p>
    </motion.div>
);


const Process: React.FC = () => {
    return (
        <section id="proceso" className="py-16 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-5xl mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-fluid-section font-display font-bold text-center mb-20 text-deep-800"
                >
                    Así trabajo contigo
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
                        <ProcessStep icon="process-diagnostico" number={1} title="Diagnóstico" description="Entiendo qué es real y único en tu empresa antes de diseñar." />
                        <ProcessStep icon="process-construccion" number={2} title="Construcción simbólica" description="Aplicamos LogoCodeX™ para traducir esa esencia en símbolo, paleta y narrativa." />
                        <ProcessStep icon="process-revision" number={3} title="Revisión conjunta" description="Iteramos hasta que sientas que lo que ves te representa de verdad." />
                        <ProcessStep icon="process-entrega" number={4} title="Entrega" description="Todos los archivos listos para usar, con el manual que explica cómo y por qué cada decisión." />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Process;
