
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../analytics';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';
import type { PortfolioProject } from '../types';
import { useRouter } from 'next/navigation';

interface ProjectModalProps {
    project: PortfolioProject;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onRequestProject?: (projectName: string) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onNext, onPrev, onRequestProject }) => {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);
    const [mounted, setMounted] = useState(false);

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
        setTimeout(() => {
            router.push(`/logocodex/${project.slug}`);
        }, 300);
    };

    const handleRequestClick = () => {
        if (onRequestProject) {
            trackEvent('request_project_like_this', { project: project.title });
            onRequestProject(`Referencia: Proyecto ${project.title}`);
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const images = (project.galleryImages && project.galleryImages.length > 0)
        ? project.galleryImages
        : [{ src: project.mainImg, alt: project.altText }];

    const validIndex = (currentImageIndex >= 0 && currentImageIndex < images.length) ? currentImageIndex : 0;

    const nextImage = () => {
        if (currentImageIndex === images.length - 1) {
            onNext();
        } else {
            setDirection(1);
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (currentImageIndex === 0) {
            onPrev();
        } else {
            setDirection(-1);
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) nextImage();
        if (isRightSwipe) prevImage();
    };

    const modalContent = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-full z-50 flex justify-between items-center p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
                <div className="text-white/90 text-sm font-medium tracking-widest uppercase">
                    {validIndex + 1} / {images.length}
                </div>
                <button
                    onClick={onClose}
                    className="text-white bg-black/20 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-full p-3 transition-all duration-300 transform hover:scale-110 group"
                    aria-label="Cerrar Galería"
                >
                    <CloseIcon className="w-8 h-8" />
                </button>
            </div>

            <div className="flex-grow relative flex items-center justify-center w-full overflow-hidden"
                 onTouchStart={onTouchStart}
                 onTouchMove={onTouchMove}
                 onTouchEnd={onTouchEnd}
            >
                 <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-6 z-40 p-4 rounded-full bg-black/40 hover:bg-black/60 text-white transition hidden md:block hover:scale-110"
                >
                    <ChevronLeftIcon className="w-10 h-10" />
                </button>

                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={validIndex}
                        custom={direction}
                        initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -1000 : 1000, opacity: 0 }}
                        transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                        className="absolute w-full h-full flex items-center justify-center p-4 pb-24 md:p-8 md:pb-8"
                    >
                        <img
                            src={images[validIndex].src}
                            alt={images[validIndex].alt}
                            loading="lazy"
                            className="max-w-full max-h-full object-contain drop-shadow-2xl"
                            draggable={false}
                        />
                    </motion.div>
                </AnimatePresence>

                <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-6 z-40 p-4 rounded-full bg-black/40 hover:bg-black/60 text-white transition hidden md:.block hover:scale-110"
                >
                    <ChevronRightIcon className="w-10 h-10" />
                </button>
            </div>

            <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 p-6 text-white w-full z-50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-display font-bold mb-1 truncate">{project.title}</h3>
                        <p className="text-white/60 text-sm">{project.clientName} - {project.clientRole}</p>
                        <div className="mt-2 text-white/80 text-sm italic hidden lg:block max-w-xl">
                           <p dangerouslySetInnerHTML={{ __html: project.testimonial.substring(0, 120) + (project.testimonial.length > 120 ? "..." : "") }}></p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                        <div className="flex gap-2 order-1">
                             <button onClick={onPrev} className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition flex items-center">
                                <ChevronLeftIcon className="w-5 h-5 mr-1" /> Anterior Proyecto
                            </button>
                            <button onClick={onNext} className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition flex items-center">
                                Siguiente Proyecto <ChevronRightIcon className="w-5 h-5 ml-1" />
                            </button>
                        </div>

                        <div className="flex gap-3 order-2 w-full lg:w-auto">
                            <button
                                onClick={handleRequestClick}
                                className="flex-1 lg:flex-none px-5 py-2.5 rounded-full bg-transparent border border-white/30 hover:bg-white/10 text-white text-sm font-medium transition whitespace-nowrap"
                            >
                                Quiero algo así
                            </button>
                            <a
                                href={`/logocodex/${project.slug}`}
                                onClick={handleAnalysisClick}
                                className="flex-1 lg:flex-none text-center px-5 py-2.5 rounded-full bg-symbolic-600 hover:bg-symbolic-700 text-white font-bold text-sm transition shadow-lg shadow-symbolic-600/30 whitespace-nowrap"
                            >
                                Ver Caso de Estudio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (!mounted) return null;
    return ReactDOM.createPortal(modalContent, document.body);
};

export default ProjectModal;
