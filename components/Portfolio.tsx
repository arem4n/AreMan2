
"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { portfolioProjects } from '../constants';
import { trackEvent } from '../analytics';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';
import ProjectModal from './ProjectModal';
import TransitionLink from './TransitionLink';

const Portfolio: React.FC = () => {
    const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef<number | null>(null);

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

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

    useEffect(() => {
        if (!isPaused) {
            autoplayRef.current = window.setInterval(() => {
                navigate('next');
            }, 5000);
        }
        return () => {
            if (autoplayRef.current) window.clearInterval(autoplayRef.current);
        };
    }, [isPaused, navigate]);

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
        <section id="portafolio" className="pt-24 lg:pt-32 pb-12 bg-gradient-to-br from-deep-50 to-white overflow-hidden relative z-10">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-center mb-12 lg:mb-16 text-deep-800">
                    Portafolio
                </h2>
                
                <div 
                    className="relative h-auto min-h-[550px] sm:min-h-[600px] md:min-h-[700px] w-full perspective-1000"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <button 
                        onClick={() => navigate('prev')} 
                        className="absolute left-0 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 bg-white/70 text-deep-800 p-2 sm:p-3 lg:p-4 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm border border-deep-100/50"
                        aria-label="Anterior"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button 
                        onClick={() => navigate('next')} 
                        className="absolute right-0 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 bg-white/70 text-deep-800 p-2 sm:p-3 lg:p-4 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm border border-deep-100/50"
                        aria-label="Siguiente"
                    >
                        <ChevronRightIcon />
                    </button>

                    <div className="w-full h-full absolute top-0 left-0 transform-style-3d">
                        {portfolioProjects.map((project, index) => {
                            const total = portfolioProjects.length;
                            let offset = index - activeIndex;
                            if (offset > total / 2) offset -= total;
                            if (offset < -total / 2) offset += total;

                            const isActive = offset === 0;
                            
                            let transform, zIndex, opacity, blur, pointerEvents;

                            if (isActive) {
                                transform = 'translateX(-50%) translateY(-50%) translateZ(0) scale(1)';
                                zIndex = 20;
                                opacity = 1;
                                blur = '0px';
                                pointerEvents = 'auto';
                            } else {
                                const sign = Math.sign(offset);
                                const absOffset = Math.abs(offset);

                                const xTranslate = -50 + sign * (40 + absOffset * 10);
                                const zTranslate = -200 - absOffset * 100;
                                const rotateY = -sign * 20;
                                const scale = 0.8;

                                transform = `translateX(${xTranslate}%) translateY(-50%) translateZ(${zTranslate}px) scale(${scale}) rotateY(${rotateY}deg)`;
                                zIndex = 10 - absOffset;
                                opacity = 0.4;
                                blur = '3px';
                                pointerEvents = 'none';
                            }

                            const isHeroLogo = project.slug === 'areman-escudo-heraldico' || project.slug === 'arem4n-professional-brand';

                            return (
                                <div 
                                    key={project.slug}
                                    className="carousel-card-wrapper absolute top-1/2 left-1/2 w-[90vw] sm:w-[70vw] md:w-[60vw] max-w-[800px] transition-all duration-500 ease-out"
                                    style={{ 
                                        transform, 
                                        zIndex, 
                                        opacity, 
                                        filter: `blur(${blur})`,
                                        pointerEvents: pointerEvents as any
                                    }}
                                >
                                    <div 
                                        onClick={() => isActive && handleProjectClick(project.slug)}
                                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-white border border-deep-100 cursor-pointer group flex flex-col"
                                    >
                                        <div className={`relative w-full aspect-[16/9] flex items-center justify-center overflow-hidden ${isHeroLogo ? 'p-3' : ''}`}>
                                            <img
                                                src={project.mainImg}
                                                alt={project.altText}
                                                loading={isActive ? "eager" : "lazy"}
                                                decoding={isActive ? "sync" : "async"}
                                                className={`absolute w-full h-full transition-transform duration-500 ${isActive ? 'group-hover:scale-105' : ''} ${isHeroLogo ? 'object-contain' : 'object-cover'}`}
                                            />
                                        </div>
                                        <div className={`p-4 sm:p-5 text-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                            <h3 className="text-lg sm:text-xl font-display font-bold text-deep-800 mb-1 truncate">{project.title}</h3>
                                            <p className="text-creative-600 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-2">{project.clientRole}</p>
                                            <p className="text-deep-600 italic text-sm sm:text-base leading-relaxed">
                                                "{project.testimonial}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="text-center text-deep-400 text-sm mt-8 lg:hidden animate-pulse">
                    Desliza o usa las flechas para girar
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={closeModal}
                        onNext={() => navigateModalProject('next')}
                        onPrev={() => navigateModalProject('prev')}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
