'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import type { Period } from '../origen.types';

const labels = {
    es: { skill: '+ Competencia:', stack: '+ Stack:', sector: '+ Sector:' },
    en: { skill: '+ Skill:', stack: '+ Stack:', sector: '+ Sector:' }
};

export const PeriodSection = React.memo(function PeriodSection({
    period,
    sectionRef,
    rm,
}: {
    period: Period;
    sectionRef: (el: HTMLElement | null) => void;
    rm: boolean | null;
}) {
    const locale = useLocale();
    const l = labels[locale as 'es' | 'en'] ?? labels.es;
    const hasNew = period.newSkills.length + period.newStack.length + period.newSectors.length > 0;

    return (
        <section
            ref={sectionRef}
            id={`period-${period.id}`}
            className="py-12 md:py-16 border-b border-symbolic-600/10"
        >
            <motion.div
                initial={rm ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-3xl"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-baseline gap-3">
                        <span className="font-display text-sm font-bold uppercase tracking-[0.15em] text-symbolic-600">
                            {period.year}
                        </span>
                        <span className="font-body text-sm font-semibold text-deep-500">
                            {period.label}
                        </span>
                    </div>

                    <p className="font-body text-base md:text-lg leading-relaxed text-deep-900 opacity-90 max-w-2xl">
                        {period.description}
                    </p>

                    {hasNew && (
                        <div className="mt-6 p-5 rounded-lg border border-symbolic-500/10 bg-white/50 backdrop-blur-sm flex flex-col gap-4">
                            {period.newSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-deep-400 min-w-[110px]">
                                        {l.skill}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {period.newSkills.map(s => (
                                            <span key={s} className="font-body text-xs px-3 py-1 rounded-full bg-symbolic-50 border border-symbolic-200/50 text-symbolic-700 font-semibold transition-all hover:bg-symbolic-100">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {period.newStack.length > 0 && (
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-deep-400 min-w-[110px]">
                                        {l.stack}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {period.newStack.map(s => (
                                            <span key={s} className="font-body text-xs px-3 py-1 rounded-full bg-deep-100 border border-deep-200/50 text-deep-700 font-semibold transition-all hover:bg-deep-200">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {period.newSectors.length > 0 && (
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-deep-400 min-w-[110px]">
                                        {l.sector}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {period.newSectors.map(s => (
                                            <span key={s} className="font-body text-xs px-3 py-1 rounded-full bg-creative-50 border border-creative-200 text-creative-800 font-semibold transition-all hover:bg-creative-100">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
});
