import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { portfolioProjects } from '../constants';
import { trackEvent } from '../analytics';
import ProjectModal from './ProjectModal';
import { useLocalizedHref, isPlainLeftClick } from '@/hooks/useLocalizedHref';

interface PortfolioProps {
    navigateTo: (path: string) => void;
    onRequestProject?: (projectName: string) => void;
}

/** "Corretaje de Propiedades. Confianza y refugio en el sur." → "Corretaje de Propiedades" */
const sectorOf = (description: string) => description.split('.')[0];

/** Algunas citas traen <strong> en los datos; aquí se muestran como texto plano. */
const plainText = (html: string) => html.replace(/<[^>]+>/g, '');

/**
 * Grilla de todos los proyectos. Con 7 proyectos: 3 + 4 en escritorio,
 * 1 ancho + 3 filas de 2 en tablet, una columna en móvil (sin tarjeta huérfana).
 * Cada tarjeta es un enlace real al caso; el clic normal abre el modal.
 */
const Portfolio: React.FC<PortfolioProps> = ({ navigateTo, onRequestProject }) => {
    const t = useTranslations('Portfolio');
    const localizedHref = useLocalizedHref();
    const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

    const openProject = (slug: string) => {
        trackEvent('open_project_modal', { project_slug: slug });
        setSelectedProjectSlug(slug);
    };

    const navigateModalProject = (direction: 'next' | 'prev') => {
        const currentIndex = portfolioProjects.findIndex(p => p.slug === selectedProjectSlug);
        if (currentIndex === -1) return;
        const total = portfolioProjects.length;
        const newIndex = (currentIndex + (direction === 'next' ? 1 : -1) + total) % total;
        setSelectedProjectSlug(portfolioProjects[newIndex].slug);
    };

    const selectedProject = portfolioProjects.find(p => p.slug === selectedProjectSlug);

    return (
        <section id="portafolio" className="py-16 lg:py-24 bg-deep-50 relative z-10">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="max-w-2xl mb-10 lg:mb-14">
                    <h2 className="text-fluid-section font-display font-bold text-deep-800 mb-3">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-deep-600 leading-relaxed">{t('subtitle')}</p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
                    {portfolioProjects.map((project, index) => {
                        const cover = project.coverImg ?? { src: project.mainImg, alt: project.altText };
                        const isPhoto = Boolean(project.coverImg);
                        const span = index === 0
                            ? 'md:col-span-2 lg:col-span-4'
                            : index < 3 ? 'lg:col-span-4' : 'lg:col-span-3';

                        return (
                            <li key={project.slug} className={span}>
                                <a
                                    href={localizedHref(`/portafolio/${project.slug}`)}
                                    aria-label={`${t('viewProject')}: ${project.title}`}
                                    onClick={(e) => {
                                        if (!isPlainLeftClick(e)) return;
                                        e.preventDefault();
                                        openProject(project.slug);
                                    }}
                                    className={`group relative block overflow-hidden rounded-2xl border border-deep-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-symbolic-600 aspect-[4/3] ${index === 0 ? 'md:aspect-[16/9] lg:aspect-[4/3]' : ''}`}
                                >
                                    <Image
                                        src={cover.src}
                                        alt={cover.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                                        className={`transition-transform duration-500 ease-out group-hover:scale-[1.03] ${isPhoto ? 'object-cover' : 'object-contain p-6'}`}
                                    />
                                </a>

                                <div className="mt-4">
                                    <h3 className="text-xl font-display font-bold text-deep-800 leading-tight">{project.title}</h3>
                                    <p className="text-sm text-deep-600 mt-0.5">{sectorOf(project.caseStudy.description)}</p>

                                    {project.testimonial ? (
                                        <figure className="mt-3 border-l-2 border-symbolic-600 pl-3">
                                            <blockquote className="text-sm text-deep-700 italic leading-relaxed">
                                                &ldquo;{plainText(project.testimonial)}&rdquo;
                                            </blockquote>
                                            <figcaption className="mt-1 text-xs text-deep-600">
                                                <span className="font-bold text-deep-800">{project.clientName}</span>, {project.clientRole}
                                            </figcaption>
                                        </figure>
                                    ) : (
                                        <p className="mt-3 text-xs text-deep-600">{project.clientRole}</p>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-12 lg:mt-16">
                    <a
                        href={localizedHref('/portafolio')}
                        onClick={(e) => {
                            if (!isPlainLeftClick(e)) return;
                            e.preventDefault();
                            navigateTo('/portafolio');
                        }}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-deep-300 text-deep-700 font-semibold text-sm hover:border-symbolic-500 hover:text-symbolic-600 hover:bg-symbolic-50 transition-all duration-200"
                    >
                        {t('viewFullPortfolio')}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProjectSlug(null)}
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
