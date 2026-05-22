import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { portfolioProjects } from '../constants';
import { trackEvent } from '../analytics';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';
import ProjectModal from './ProjectModal';

interface PortfolioProps {
    navigateTo: (path: string) => void;
    onRequestProject?: (projectName: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ navigateTo, onRequestProject }) => {
    const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef<number | null>(null);

    // Touch handling for Swipe
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // --- NAVIGATION LOGIC (Infinite Loop / Moebius) ---
    const navigate = useCallback((direction: 'next' | 'prev') => {
        setActiveIndex(prev => {
            const total = portfolioProjects.length;
            if (direction === 'next') {
                return (prev + 1) % total;
            } else {
                return (prev - 1 + total) % total;
            }
        });
    }, []);

    // --- AUTOPLAY ---
    useEffect(() => {
        if (!isPaused && !selectedProjectSlug) {
            autoplayRef.current = window.setInterval(() => {
                navigate('next');
            }, 5000);
        }
        return () => {
            if (autoplayRef.current) window.clearInterval(autoplayRef.current);
        };
    }, [isPaused, selectedProjectSlug, navigate]);

    // --- TOUCH HANDLERS ---
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
        setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) {
            setIsPaused(false);
            return;
        }

        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                navigate('next');
            } else {
                navigate('prev');
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
        setIsPaused(false);
    };

    // --- MODAL HANDLERS ---
    const handleProjectClick = (slug: string) => {
        trackEvent('open_project_modal', { project_slug: slug });
        setSelectedProjectSlug(slug);
        setIsPaused(true);
    };

    const closeModal = () => {
        setSelectedProjectSlug(null);
        setIsPaused(false);
    };

    const navigateModalProject = (direction: 'next' | 'prev') => {
        const currentIndex = portfolioProjects.findIndex(p => p.slug === selectedProjectSlug);
        if (currentIndex === -1) return;

        let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        const total = portfolioProjects.length;

        if (newIndex >= total) newIndex = 0;
        if (newIndex < 0) newIndex = total - 1;

        setSelectedProjectSlug(portfolioProjects[newIndex].slug);
    };

    const selectedProject = portfolioProjects.find(p => p.slug === selectedProjectSlug);

    return (
        <section id="portafolio" className="py-6 lg:py-8 bg-deep-50 overflow-hidden relative z-10">
            <div className="max-w-[1920px] mx-auto px-4 lg:px-12">
                <h2 className="relative z-[60] text-2xl lg:text-4xl font-display font-bold text-center mb-6 lg:mb-8 text-deep-800">
                    Portafolio
                </h2>

                {/* --- CAROUSEL CONTAINER --- */}
                <div
                    className="relative h-[480px] sm:h-[500px] lg:h-[540px] w-full perspective-1000 overflow-visible mt-6 lg:mt-10"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => navigate('prev')}
                        className="absolute left-4 lg:left-10 top-[40%] -translate-y-1/2 z-50 bg-white/80 text-deep-800 p-3 lg:p-4 rounded-full shadow-xl [@media(hover:hover)]:hover:scale-110 active:scale-95 transition-[transform,box-shadow] duration-200 ease-out backdrop-blur-sm border border-deep-100"
                        aria-label="Proyecto anterior"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={() => navigate('next')}
                        className="absolute right-4 lg:right-10 top-[40%] -translate-y-1/2 z-50 bg-white/80 text-deep-800 p-3 lg:p-4 rounded-full shadow-xl [@media(hover:hover)]:hover:scale-110 active:scale-95 transition-[transform,box-shadow] duration-200 ease-out backdrop-blur-sm border border-deep-100"
                        aria-label="Proyecto siguiente"
                    >
                        <ChevronRightIcon />
                    </button>

                    {/* Stage */}
                    <div className="w-full h-full relative flex justify-center items-center transform-style-3d">
                        {portfolioProjects.map((project, index) => {
                            const total = portfolioProjects.length;

                            // CALCULATE CIRCULAR OFFSET (The "Moebius" Logic)
                            let offset = index - activeIndex;
                            if (offset > total / 2) offset -= total;
                            if (offset < -total / 2) offset += total;

                            const isActive = offset === 0;

                            // CSS class-driven transforms — no JS isMobile detection needed
                            let slideClass = 'carousel-slide-hidden';
                            if (isActive) slideClass = 'carousel-slide-active';
                            else if (offset === -1) slideClass = 'carousel-slide-left';
                            else if (offset === 1) slideClass = 'carousel-slide-right';

                            const isHeroLogo = project.slug === 'areman-escudo-heraldico' || project.slug === 'arem4n-professional-brand' || project.slug === 'southsoft-consultoria';

                            return (
                                <div
                                    key={project.slug}
                                    aria-hidden={!isActive}
                                    className={`carousel-slide-wrapper w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-[540px] ${slideClass}`}
                                >
                                    {/* Card Content */}
                                    <div
                                        onClick={() => isActive && handleProjectClick(project.slug)}
                                        className={`relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-deep-100 aspect-[16/9] flex items-center justify-center cursor-pointer group ${isHeroLogo ? 'p-3' : 'p-0'}`}
                                    >
                                        <Image
                                            src={project.mainImg}
                                            alt={project.altText}
                                            fill
                                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 40vw"
                                            className={`transition-transform duration-300 ease-out ${isActive ? 'group-hover:scale-105' : ''} ${!isHeroLogo ? '!object-cover' : 'object-contain'}`}
                                        />
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end pb-8 items-center z-10">
                                                <span className="text-white text-lg lg:text-xl font-display font-bold mb-2">{project.title}</span>
                                                <span className="px-5 py-1.5 bg-symbolic-600 text-white text-xs font-bold rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Ver Proyecto</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info below card */}
                                    <div className={`mt-3 lg:mt-4 px-4 transition-all duration-700 ease-out transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                        <div className="text-center mb-2">
                                            <h3 className="text-xl lg:text-2xl font-display font-bold text-deep-800 mb-0.5">{project.title}</h3>
                                        </div>

                                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-deep-100/50 shadow-sm flex items-center gap-3.5 max-w-xl mx-auto text-left">
                                            {/* Avatar */}
                                            <div className="relative flex-shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-symbolic-100 border border-symbolic-200/60 flex items-center justify-center overflow-hidden shadow-sm">
                                                {project.clientAvatar ? (
                                                    <Image
                                                        src={project.clientAvatar}
                                                        alt={project.clientName}
                                                        fill
                                                        sizes="44px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <span className="font-display text-sm lg:text-base font-bold text-symbolic-700 uppercase">
                                                        {project.clientName ? project.clientName.charAt(0) : '?'}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Testimonial and Client Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-deep-600 italic text-xs lg:text-sm leading-relaxed">
                                                    &ldquo;{project.testimonial}&rdquo;
                                                </p>
                                                <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
                                                    <span className="font-body text-[10px] lg:text-xs font-bold text-deep-800">{project.clientName}</span>
                                                    <span className="text-[9px] lg:text-xs text-deep-400 font-medium font-body">&middot;</span>
                                                    <span className="font-body text-[9px] lg:text-[10px] text-deep-500 font-medium leading-none">{project.clientRole}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Hint — no animate-pulse (vestibular distraction) */}
                <div className="text-center text-deep-400 text-sm mt-2 lg:hidden">
                    Desliza o usa las flechas para girar
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={closeModal}
                        navigateTo={navigateTo}
                        onNext={() => navigateModalProject('next')}
                        onPrev={() => navigateModalProject('prev')}
                        onRequestProject={onRequestProject}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
