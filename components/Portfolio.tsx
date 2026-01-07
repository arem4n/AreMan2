
"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { portfolioProjects } from '../constants';
import { trackEvent } from '../analytics';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';
import ProjectModal from './ProjectModal';
import { SmartLink } from './SmartLink';

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
        <section id="portafolio" className="py-6 lg:py-8 bg-gradient-to-br from-deep-50 to-white overflow-hidden relative z-10">
            <div className="max-w-[1920px] mx-auto px-4 lg:px-12">
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-center mb-4 lg:mb-6 text-deep-800">
                    Portafolio
                </h2>
                
                <div 
                    className="relative h-[650px] md:h-[700px] w-full perspective-1000 overflow-visible"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <button 
                        onClick={() => navigate('prev')} 
                        className="absolute left-4 lg:left-10 top-[40%] -translate-y-1/2 z-50 bg-white/80 text-deep-800 p-3 lg:p-4 rounded-full shadow-xl hover:scale-110 transition-all backdrop-blur-sm border border-deep-100"
                        aria-label="Anterior"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button 
                        onClick={() => navigate('next')} 
                        className="absolute right-4 lg:right-10 top-[40%] -translate-y-1/2 z-50 bg-white/80 text-deep-800 p-3 lg:p-4 rounded-full shadow-xl hover:scale-110 transition-all backdrop-blur-sm border border-deep-100"
                        aria-label="Siguiente"
                    >
                        <ChevronRightIcon />
                    </button>

                    <div className="w-full h-full relative flex justify-center items-center transform-style-3d">
                        {portfolioProjects.map((project, index) => {
                            const total = portfolioProjects.length;
                            
                            let offset = index - activeIndex;
                            if (offset > total / 2) offset -= total;
                            if (offset < -total / 2) offset += total;

                            const isActive = offset === 0;
                            
                            let transform = '';
                            let zIndex = 0;
                            let opacity = 0;
                            let blur = '0px';
                            let pointerEvents = 'none';

                            if (isActive) {
                                transform = 'translateX(-50%) translateY(-60%) translateZ(0px) scale(1)';
                                zIndex = 20;
                                opacity = 1;
                                blur = '0px';
                                pointerEvents = 'auto';
                            } else if (offset === -1) {
                                transform = 'translateX(-120%) translateY(-60%) translateZ(-150px) scale(0.85)';
                                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                     transform = 'translateX(-130%) translateY(-60%) scale(0.8)';
                                } else {
                                     transform += ' rotateY(25deg)';
                                }
                                zIndex = 10;
                                opacity = 0.5;
                                blur = '2px';
                            } else if (offset === 1) {
                                transform = 'translateX(20%) translateY(-60%) translateZ(-150px) scale(0.85)';
                                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                     transform = 'translateX(30%) translateY(-60%) scale(0.8)';
                                } else {
                                     transform += ' rotateY(-25deg)';
                                }
                                zIndex = 10;
                                opacity = 0.5;
                                blur = '2px';
                            } else {
                                transform = 'translateX(-50%) translateY(-60%) translateZ(-600px) scale(0)';
                                zIndex = 0;
                                opacity = 0;
                            }

                            const isHeroLogo = project.slug === 'areman-escudo-heraldico' || project.slug === 'arem4n-professional-brand';

                            return (
                                <div 
                                    key={project.slug}
                                    className="carousel-card-wrapper absolute top-1/2 left-1/2 w-[85vw] md:w-[60vw] max-w-[900px] transition-all duration-700 ease-out"
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
                                        className={`relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-deep-100 aspect-[16/9] flex items-center justify-center cursor-pointer group ${isHeroLogo ? 'p-3' : 'p-0'}`}
                                    >
                                        <img
                                            src={project.mainImg}
                                            alt={project.altText}
                                            loading="lazy"
                                            className={`w-full h-full transition-transform duration-700 ${isActive ? 'group-hover:scale-105' : ''} ${isHeroLogo ? 'object-contain' : 'object-cover'}`}
                                        />
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end pb-10 items-center">
                                                <span className="text-white text-xl lg:text-2xl font-display font-bold mb-2">{project.title}</span>
                                                <SmartLink
                                                    href={`/logocodex/${project.slug}`}
                                                    className="px-6 py-2 bg-symbolic-600 text-white text-sm font-bold rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 relative z-10"
                                                >
                                                    Ver Caso de Estudio
                                                </SmartLink>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className={`mt-4 lg:mt-6 px-4 text-center transition-all duration-700 ease-out transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-deep-800 mb-2">{project.title}</h3>
                                        <p className="text-creative-600 font-semibold tracking-widest uppercase text-xs lg:text-sm mb-3">{project.clientRole}</p>
                                        
                                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-deep-100/50 shadow-sm">
                                            <p className="text-deep-600 italic max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                                                "{project.testimonial}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className="text-center text-deep-400 text-sm mt-2 lg:hidden animate-pulse">
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
