import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../analytics';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';
import type { PortfolioProject } from '../types';

interface ProjectModalProps {
    project: PortfolioProject;
    onClose: () => void;
    navigateTo: (path: string) => void;
    onNext: () => void;
    onPrev: () => void;
    onRequestProject?: (projectName: string) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, navigateTo, onNext, onPrev, onRequestProject }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [project]);

    const handleAnalysisClick = (e: React.MouseEvent) => {
        e.preventDefault();
        trackEvent('view_case_study', { project_slug: project.slug, from: 'portfolio_modal' });
        onClose();
        navigateTo(`/portafolio/${project.slug}`);
    };

    const handleRequestClick = () => {
        if (onRequestProject) {
            trackEvent('request_project_like_this', { project: project.title });
            onRequestProject(`Referencia: Proyecto ${project.title}`);
            onClose();
        }
    };

    const images = (project.galleryImages && project.galleryImages.length > 0) 
        ? project.galleryImages 
        : [{ src: project.mainImg, alt: project.altText }];

    const validIndex = (currentImageIndex >= 0 && currentImageIndex < images.length) ? currentImageIndex : 0;

    const nextImage = React.useCallback(() => {
        if (currentImageIndex === images.length - 1) {
            // If at end of gallery, go to next PROJECT
            onNext();
        } else {
            setDirection(1);
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
    }, [currentImageIndex, images.length, onNext]);

    const prevImage = React.useCallback(() => {
        if (currentImageIndex === 0) {
            // If at start of gallery, go to prev PROJECT
            onPrev();
        } else {
            setDirection(-1);
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    }, [currentImageIndex, images.length, onPrev]);

    useEffect(() => {
        // Prevent background scrolling completely across platforms (especially iOS Safari)
        const originalBodyPosition = document.body.style.position;
        const originalBodyWidth = document.body.style.width;
        const originalBodyTop = document.body.style.top;
        const originalBodyLeft = document.body.style.left;
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const scrollY = window.scrollY;

        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Target-aware touchmove listener to prevent iOS bounce/scroll leaks,
        // while allowing horizontal scroll on the thumbnails list.
        const handleTouchMove = (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            const isInsideScrollable = target.closest('.overflow-x-auto') !== null;
            if (!isInsideScrollable && e.cancelable) {
                e.preventDefault();
            }
        };

        const modalEl = modalRef.current;
        if (modalEl) {
            modalEl.addEventListener('touchmove', handleTouchMove, { passive: false });
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (modalEl) {
                modalEl.removeEventListener('touchmove', handleTouchMove);
            }
            document.body.style.position = originalBodyPosition;
            document.body.style.width = originalBodyWidth;
            document.body.style.top = originalBodyTop;
            document.body.style.left = originalBodyLeft;
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
            window.scrollTo(0, scrollY);
        };
    }, [onClose, prevImage, nextImage]);

    const modalContent = (
        <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.1, bottom: 0.8 }}
            onDragEnd={(event, info) => {
                // If dragged down past threshold, close the modal
                if (info.offset.y > 150) {
                    onClose();
                }
            }}
            className="fixed inset-0 z-[9999] bg-deep-950/95 backdrop-blur-xl flex flex-col lg:flex-row h-full lg:h-screen overflow-hidden text-white cursor-grab active:cursor-grabbing select-none"
            role="dialog"
            aria-modal="true"
        >
            {/* iOS style Drag Handle indicator on mobile */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full lg:hidden z-[100] pointer-events-none" />

            {/* Close Button - Floating on top right of the whole modal */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[100] text-white bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-full p-2.5 transition duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-black/25 pointer-events-auto"
                aria-label="Cerrar Galería"
            >
                <CloseIcon className="w-6 h-6" />
            </button>

            {/* LEFT / TOP PANEL: Media Area */}
            <div 
                className="relative h-[50vh] lg:h-full lg:w-[65%] xl:w-[70%] shrink-0 bg-deep-950 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5" 
            >
                {/* Floating Image Counter */}
                <div className="absolute top-4 left-4 z-40 bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-[10px] lg:text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                    {validIndex + 1} / {images.length}
                </div>

                {/* Navigation Arrows */}
                <button 
                    onClick={prevImage}
                    className="absolute left-4 z-40 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-md text-white transition hover:scale-105 active:scale-95 hidden lg:block shadow-lg shadow-black/20 pointer-events-auto"
                    aria-label="Imagen Anterior"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>

                <button 
                    onClick={nextImage}
                    className="absolute right-4 z-40 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-md text-white transition hover:scale-105 active:scale-95 hidden lg:block shadow-lg shadow-black/20 pointer-events-auto"
                    aria-label="Siguiente Imagen"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>

                {/* Media Container with Framer Motion */}
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={validIndex}
                        custom={direction}
                        initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -1000 : 1000, opacity: 0 }}
                        transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.5}
                        onDragEnd={(event, info) => {
                            const swipeThreshold = 80;
                            if (info.offset.x > swipeThreshold) {
                                prevImage();
                            } else if (info.offset.x < -swipeThreshold) {
                                nextImage();
                            }
                        }}
                        className="absolute w-full h-full flex items-center justify-center p-6 lg:p-12 cursor-grab active:cursor-grabbing"
                    >
                        {images[validIndex].src.endsWith('.mp4') ? (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="none"
                                aria-label={images[validIndex].alt}
                                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl shadow-black/40 border border-white/5 pointer-events-none"
                            >
                                <source src={images[validIndex].src} type="video/mp4" />
                            </video>
                        ) : (
                            <div className="relative w-full h-full">
                                <Image
                                    src={images[validIndex].src}
                                    alt={images[validIndex].alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 65vw"
                                    className="object-contain rounded-xl"
                                />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT / BOTTOM PANEL: Details Sidebar */}
            <div className="flex-grow flex flex-col justify-between overflow-hidden bg-deep-900/30 backdrop-blur-md lg:h-full lg:w-[35%] xl:w-[30%] pointer-events-auto">
                {/* Non-scrollable details: disabled scrollbars and scroll actions on both desktop & mobile */}
                <div className="flex-1 overflow-hidden p-5 lg:py-8 lg:px-8 flex flex-col justify-between gap-4 lg:gap-6 select-text">
                    {/* Project Header */}
                    <div>
                        <span className="text-[10px] lg:text-xs font-bold tracking-widest text-creative-400 uppercase block mb-1">
                            Proyecto Destacado
                        </span>
                        <h3 className="text-xl lg:text-3xl font-display font-bold text-white mb-1.5 lg:mb-2 leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-white/60 text-xs lg:text-sm font-medium">
                            {project.clientName} &middot; {project.clientRole}
                        </p>
                    </div>

                    {/* Testimonial Quote Card - Extremely compact on mobile */}
                    <div className="relative bg-white/5 border border-white/5 rounded-xl lg:rounded-2xl p-3.5 lg:p-5 flex flex-col gap-2.5 lg:gap-4 overflow-hidden group">
                        {/* Background quotes SVG icon */}
                        <div className="absolute -right-2 -bottom-2 text-white/5 pointer-events-none transform translate-y-1 select-none">
                            <svg width="120" height="96" viewBox="0 0 120 96" fill="currentColor">
                                <path d="M48 0C21.49 0 0 21.49 0 48v48h48V48H24c0-13.25 10.75-24 24-24V0zm72 0c-26.51 0-48 21.49-48 48v48h48V48H96c0-13.25 10.75-24 24-24V0z"/>
                            </svg>
                        </div>
                        
                        {/* Client Info and Avatar */}
                        <div className="flex items-center gap-2.5 lg:gap-3">
                            <div className="relative flex-shrink-0 w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                                {project.clientAvatar ? (
                                    <Image
                                        src={project.clientAvatar}
                                        alt={project.clientName}
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="font-display text-xs lg:text-base font-bold text-white uppercase">
                                        {project.clientName ? project.clientName.charAt(0) : '?'}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h4 className="text-xs lg:text-sm font-bold text-white leading-tight">{project.clientName}</h4>
                                <p className="text-[9px] lg:text-xs text-white/50">{project.clientRole}</p>
                            </div>
                        </div>

                        {/* Testimonial text */}
                        <div className="relative z-10 text-white/90 text-[11px] lg:text-sm italic leading-relaxed font-body">
                           <p>&ldquo;{project.testimonial}&rdquo;</p>
                        </div>
                    </div>

                    {/* Gallery Thumbnails */}
                    {images.length > 1 && (
                        <div className="space-y-1.5 lg:space-y-2">
                            <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-white/30 block">
                                Galería de Imágenes
                            </span>
                            <div className="flex gap-1.5 lg:gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative w-10 h-10 lg:w-14 lg:h-14 rounded-lg overflow-hidden shrink-0 transition duration-200 border-2 ${
                                            idx === validIndex
                                                ? 'border-creative-400 opacity-100 scale-105'
                                                : 'border-transparent opacity-50 hover:opacity-80'
                                        }`}
                                    >
                                        <Image src={img.src} alt={img.alt} fill sizes="56px" className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons - side-by-side on mobile, stacked on desktop */}
                    <div className="flex flex-row lg:flex-col gap-2.5 lg:gap-3 pt-1">
                        <a
                            href={`/portafolio/${project.slug}`}
                            onClick={handleAnalysisClick}
                            className="flex-1 text-center py-2.5 lg:py-3 px-4 lg:px-6 rounded-full bg-symbolic-600 hover:bg-symbolic-700 text-white font-bold text-xs lg:text-sm transition shadow-lg shadow-symbolic-600/20 active:scale-[0.98] duration-200 pointer-events-auto"
                        >
                            Caso de Estudio
                        </a>
                        <button 
                            onClick={handleRequestClick}
                            className="flex-1 py-2.5 lg:py-3 px-4 lg:px-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs lg:text-sm font-medium transition active:scale-[0.98] duration-200 pointer-events-auto"
                        >
                            Quiero algo así
                        </button>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bg-deep-950/60 backdrop-blur-md border-t border-white/5 p-3.5 lg:p-5 flex items-center justify-between shrink-0">
                    <button 
                        onClick={onPrev} 
                        className="px-3.5 py-2 rounded-lg hover:bg-white/5 text-white/80 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 active:scale-95 pointer-events-auto"
                    >
                        <ChevronLeftIcon className="w-4 h-4" /> Anterior
                    </button>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                        Proyectos
                    </span>
                    <button 
                        onClick={onNext} 
                        className="px-3.5 py-2 rounded-lg hover:bg-white/5 text-white/80 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 active:scale-95 pointer-events-auto"
                    >
                        Siguiente <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );

    if (!mounted) return null;
    return ReactDOM.createPortal(modalContent, document.body);
};

export default ProjectModal;