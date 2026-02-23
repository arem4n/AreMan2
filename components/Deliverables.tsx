
import React, { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

// Icons defined as React components for reusability with animation props
// We pass `isSelected` to control the animation state
const IconWrapper: React.FC<{ children: React.ReactNode, isSelected: boolean, className?: string }> = ({ children, isSelected, className }) => (
    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 shadow-sm transition-colors duration-500 ${isSelected ? 'bg-symbolic-600 text-white' : 'bg-symbolic-100 text-symbolic-600'} ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            {children}
        </svg>
    </div>
);

// Helper component for animated paths
const AnimatedPath = ({ d, isSelected }: { d: string, isSelected: boolean }) => (
    <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={d}
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={isSelected ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 1, 0], opacity: [0.5, 1, 0.5] }}
        transition={isSelected ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: "linear" }}
    />
);

const LogoIcon = ({ isSelected }: { isSelected: boolean }) => (
    <IconWrapper isSelected={isSelected}>
        <AnimatedPath d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" isSelected={isSelected} />
    </IconWrapper>
);

const ManualIcon = ({ isSelected }: { isSelected: boolean }) => (
    <IconWrapper isSelected={isSelected}>
        <AnimatedPath d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" isSelected={isSelected} />
    </IconWrapper>
);

const AnimationIcon = ({ isSelected }: { isSelected: boolean }) => (
    <IconWrapper isSelected={isSelected}>
        <AnimatedPath d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" isSelected={isSelected} />
    </IconWrapper>
);

const PaletteIcon = ({ isSelected }: { isSelected: boolean }) => (
    <IconWrapper isSelected={isSelected}>
        <AnimatedPath d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.62a8.985 8.985 0 013.362-3.819A8.56 8.56 0 0115.362 5.214z" isSelected={isSelected} />
        <AnimatedPath d="M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" isSelected={isSelected} />
        <AnimatedPath d="M14.25 9.75a.75.75 0 100-1.5.75.75 0 000 1.5z" isSelected={isSelected} />
        <AnimatedPath d="M10.5 9.75a.75.75 0 100-1.5.75.75 0 000 1.5z" isSelected={isSelected} />
    </IconWrapper>
);

const TypographyIcon = ({ isSelected }: { isSelected: boolean }) => (
    <IconWrapper isSelected={isSelected}>
        <AnimatedPath d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" isSelected={isSelected} />
    </IconWrapper>
);

const MockupsIcon = ({ isSelected }: { isSelected: boolean }) => (
    <IconWrapper isSelected={isSelected}>
        <AnimatedPath d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75A2.25 2.25 0 0015.75 1.5h-2.25m-3 15.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" isSelected={isSelected} />
    </IconWrapper>
);

const IconographyIcon = ({ isSelected }: { isSelected: boolean }) => (
    <IconWrapper isSelected={isSelected}>
        <AnimatedPath d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" isSelected={isSelected} />
    </IconWrapper>
);

const SocialIcon = ({ isSelected }: { isSelected: boolean }) => (
    <IconWrapper isSelected={isSelected}>
        <AnimatedPath d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 5.314l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.828a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z" isSelected={isSelected} />
    </IconWrapper>
);


const deliverables = [
    { component: LogoIcon, title: 'Logo Vectorial', description: 'SVG, AI, PNG. Escalabilidad infinita sin pérdida de calidad.' },
    { component: ManualIcon, title: 'Manual de Marca', description: 'La biblia de tu identidad. Reglas de uso, tonos y tipografías.' },
    { component: AnimationIcon, title: 'Motion Graphics', description: 'Tu logo en movimiento. Intros y outros para video.' },
    { component: PaletteIcon, title: 'Sistema Cromático', description: 'Códigos exactos (HEX, RGB, CMYK) para consistencia total.' },
    { component: TypographyIcon, title: 'Tipografía', description: 'Selección de fuentes primarias y secundarias con licencias.' },
    { component: MockupsIcon, title: 'Mockups Reales', description: 'Visualización en productos físicos y entornos digitales.' },
    { component: IconographyIcon, title: 'Set de Iconos', description: 'Lenguaje visual secundario para UI y presentaciones.' },
    { component: SocialIcon, title: 'Kit Social Media', description: 'Plantillas editables para Instagram y LinkedIn.' },
];

const DeliverableCard: React.FC<{
    IconComponent: React.FC<{ isSelected: boolean }>,
    title: string,
    description: string,
    isSelected: boolean,
    onClick: () => void
}> = ({ IconComponent, title, description, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={`flex-shrink-0 w-[280px] md:w-[320px] snap-center rounded-2xl p-8 border shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full
        ${isSelected
            ? 'bg-deep-50 border-symbolic-500 ring-2 ring-symbolic-200 transform scale-105'
            : 'bg-white border-deep-100 hover:shadow-2xl hover:-translate-y-2'}`}
    >
        <div className="mb-2 transition-transform duration-300">
            <IconComponent isSelected={isSelected} />
        </div>
        <h4 className={`font-display font-bold text-xl mb-3 ${isSelected ? 'text-symbolic-700' : 'text-deep-800'}`}>{title}</h4>
        <p className={`text-sm leading-relaxed ${isSelected ? 'text-deep-800 font-medium' : 'text-deep-600'}`}>{description}</p>
    </div>
);


const Deliverables: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const scroll = useCallback((direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 340; // Card width + gap roughly
            const newScrollLeft = direction === 'left' 
                ? current.scrollLeft - scrollAmount 
                : current.scrollLeft + scrollAmount;
            
            current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    }, []);

    const handleCardClick = (index: number) => {
        setSelectedIdx(prev => prev === index ? null : index);
    };

    return (
        <section id="entregables" className="py-16 lg:py-24 bg-gradient-to-b from-deep-50 to-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            <div className="max-w-[1920px] mx-auto px-4 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block py-1 px-3 rounded-full bg-symbolic-100 text-symbolic-600 text-xs font-bold tracking-widest uppercase mb-4 border border-symbolic-200"
                    >
                        El Arsenal de Marca
                    </motion.span>
                    <h2 className="text-3xl lg:text-5xl font-display font-bold text-deep-800 mb-6">
                        Entregables de Alto Valor
                    </h2>
                    <p className="text-lg text-deep-600 max-w-3xl mx-auto">
                        No entrego &quot;archivos&quot;. Entrego activos estratégicos listos para desplegarse en cualquier campo de batalla comercial.
                    </p>
                    <p className="text-sm text-symbolic-400 mt-2 italic">(Haz clic en una tarjeta para activar el entregable)</p>
                </div>
                
                <div className="relative group max-w-7xl mx-auto">
                    {/* Navigation Buttons */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-deep-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-deep-50 hidden md:flex items-center justify-center border border-deep-100"
                        aria-label="Anterior"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-deep-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-deep-50 hidden md:flex items-center justify-center border border-deep-100"
                        aria-label="Siguiente"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>

                    {/* Carousel Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 px-4 scrollbar-hide items-stretch"
                        style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
                    >
                        {deliverables.map((item, index) => (
                            <DeliverableCard 
                                key={index} 
                                IconComponent={item.component}
                                title={item.title} 
                                description={item.description}
                                isSelected={selectedIdx === index}
                                onClick={() => handleCardClick(index)}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Mobile Hint */}
                <div className="text-center text-deep-400 text-sm mt-[-1rem] md:hidden animate-pulse">
                    Desliza para ver más &rarr;
                </div>
            </div>
        </section>
    );
};

export default Deliverables;
