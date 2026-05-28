
import React, { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon, Icon, IconName } from './icons/Icons';

const IconWrapper: React.FC<{ name: IconName, isSelected: boolean, className?: string }> = ({ name, isSelected, className }) => (
    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 shadow-sm transition-all duration-500 ${isSelected ? 'bg-symbolic-600 text-white scale-110' : 'bg-symbolic-100 text-symbolic-600'} ${className}`}>
        <Icon name={name} size={24} strokeWidth={1.75} />
    </div>
);

type DeliverableKey = 'logo' | 'manual' | 'motion' | 'cromatico' | 'tipografia' | 'mockups' | 'iconografia' | 'social';

const deliverableIcons: { name: IconName; key: DeliverableKey }[] = [
    { name: 'deliverable-logo', key: 'logo' },
    { name: 'deliverable-manual', key: 'manual' },
    { name: 'deliverable-motion', key: 'motion' },
    { name: 'deliverable-cromatico', key: 'cromatico' },
    { name: 'deliverable-tipografia', key: 'tipografia' },
    { name: 'deliverable-mockups', key: 'mockups' },
    { name: 'deliverable-iconografia', key: 'iconografia' },
    { name: 'deliverable-social', key: 'social' },
];

const DeliverableCard: React.FC<{
    name: IconName;
    title: string;
    description: string;
    isSelected: boolean;
    onClick: () => void;
}> = ({ name, title, description, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={`flex-shrink-0 w-[280px] md:w-[320px] snap-center rounded-2xl p-8 border shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full
        ${isSelected
            ? 'bg-deep-50 border-symbolic-500 ring-2 ring-symbolic-200 transform scale-105'
            : 'bg-white border-deep-100 hover:shadow-2xl hover:-translate-y-2'}`}
    >
        <div className="mb-2 transition-transform duration-300">
            <IconWrapper name={name} isSelected={isSelected} />
        </div>
        <h4 className={`font-display font-bold text-xl mb-3 ${isSelected ? 'text-symbolic-700' : 'text-deep-800'}`}>{title}</h4>
        <p className={`text-sm leading-relaxed ${isSelected ? 'text-deep-800 font-medium' : 'text-deep-600'}`}>{description}</p>
    </div>
);

const Deliverables: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const t = useTranslations('Deliverables');

    const scroll = useCallback((direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 340;
            const newScrollLeft = direction === 'left'
                ? current.scrollLeft - scrollAmount
                : current.scrollLeft + scrollAmount;
            current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }
    }, []);

    const handleCardClick = (index: number) => {
        setSelectedIdx(prev => prev === index ? null : index);
    };

    return (
        <section id="entregables" className="py-16 lg:py-24 bg-deep-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="max-w-[1920px] mx-auto px-4 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block py-1 px-3 rounded-full bg-symbolic-100 text-symbolic-600 text-xs font-bold tracking-widest uppercase mb-4 border border-symbolic-200"
                    >
                        {t('tag')}
                    </motion.span>
                    <h2 className="text-3xl lg:text-5xl font-display font-bold text-deep-800 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-deep-600 max-w-3xl mx-auto">{t('subtitle')}</p>
                    <p className="text-sm text-symbolic-400 mt-2 italic">{t('hint')}</p>
                </div>

                <div className="relative group max-w-7xl mx-auto">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-deep-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-deep-50 hidden md:flex items-center justify-center border border-deep-100"
                        aria-label={t('prevAriaLabel')}
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-deep-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-deep-50 hidden md:flex items-center justify-center border border-deep-100"
                        aria-label={t('nextAriaLabel')}
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 px-4 scrollbar-hide items-stretch"
                        style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
                    >
                        {deliverableIcons.map((item, index) => (
                            <DeliverableCard
                                key={index}
                                name={item.name}
                                title={t(`${item.key}.title` as any)}
                                description={t(`${item.key}.description` as any)}
                                isSelected={selectedIdx === index}
                                onClick={() => handleCardClick(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center text-deep-400 text-sm mt-[-1rem] md:hidden animate-pulse">
                    {t('mobileHint')} &rarr;
                </div>
            </div>
        </section>
    );
};

export default Deliverables;
