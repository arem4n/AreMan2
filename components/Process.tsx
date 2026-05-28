
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Icon, IconName } from './icons/Icons';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

const itemVariantsReduced = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
};

const ProcessStep = ({
    icon, number, title, description, reduced
}: {
    icon: IconName; number: number; title: string; description: string; reduced: boolean;
}) => (
    <motion.div
        variants={reduced ? itemVariantsReduced : itemVariants}
        className="text-center relative z-10 flex flex-col items-center group"
    >
        <div className="relative mb-5 flex items-end justify-center w-24 h-20">
            <span className="absolute inset-0 flex items-center justify-center text-[5.5rem] font-display font-extrabold leading-none text-symbolic-100 select-none group-hover:text-symbolic-200 transition-colors duration-300">
                0{number}
            </span>
            <div className="relative z-10 mb-1 text-symbolic-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon name={icon} size={26} />
            </div>
        </div>
        <h4 className="font-display font-bold text-deep-800 text-lg mb-3">{title}</h4>
        <p className="text-sm text-deep-500 max-w-[200px] mx-auto leading-relaxed">{description}</p>
    </motion.div>
);

const Process: React.FC = () => {
    const shouldReduce = useReducedMotion();
    const t = useTranslations('Process');

    return (
        <section id="proceso" className="py-16 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-5xl mx-auto px-4">
                <motion.h2
                    initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={shouldReduce ? { duration: 0.3 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-fluid-section font-display font-bold text-center mb-20 text-deep-800"
                >
                    {t('title')}
                </motion.h2>

                <div className="relative">
                    <div className="absolute inset-x-0 top-9 hidden md:block px-16">
                        <div className="h-px bg-deep-200/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={shouldReduce ? { duration: 0 } : { duration: 1.5, ease: "easeInOut" }}
                                className="h-full bg-symbolic-200 w-full"
                            />
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial={shouldReduce ? 'visible' : 'hidden'}
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-4 gap-12 relative z-10"
                    >
                        <ProcessStep reduced={!!shouldReduce} icon="process-diagnostico" number={1} title={t('step1Title')} description={t('step1Desc')} />
                        <ProcessStep reduced={!!shouldReduce} icon="process-construccion" number={2} title={t('step2Title')} description={t('step2Desc')} />
                        <ProcessStep reduced={!!shouldReduce} icon="process-revision" number={3} title={t('step3Title')} description={t('step3Desc')} />
                        <ProcessStep reduced={!!shouldReduce} icon="process-entrega" number={4} title={t('step4Title')} description={t('step4Desc')} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Process;
