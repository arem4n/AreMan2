'use client';
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { portfolioProjects } from '../../constants';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/CodexIcons';

const SubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12 text-deep-800">{children}</h2>
);
const SubSubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl lg:text-3xl font-display font-bold mt-8 mb-6 text-deep-800">{children}</h3>
);

const Block: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-deep-100 mb-8 ${className}`}>
        {children}
    </div>
);
const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const uiStrings = {
    es: {
        notFoundTitle: 'Caso de Estudio no Encontrado',
        notFoundBody: 'El proyecto que buscas no existe o el análisis detallado no está disponible.',
        comingSoon: 'El análisis detallado para este proyecto estará disponible pronto.',
        gallery: 'Galería del Proyecto',
        prevImage: 'Imagen anterior',
        nextImage: 'Siguiente imagen',
    },
    en: {
        notFoundTitle: 'Case Study Not Found',
        notFoundBody: 'The project you are looking for does not exist or the detailed analysis is not available.',
        comingSoon: 'The detailed analysis for this project will be available soon.',
        gallery: 'Project Gallery',
        prevImage: 'Previous image',
        nextImage: 'Next image',
    }
};

interface GenericCaseStudyProps {
    slug: string;
}

const GenericCaseStudy: React.FC<GenericCaseStudyProps> = ({ slug }) => {
    const locale = useLocale();
    const ui = uiStrings[locale as 'es' | 'en'] ?? uiStrings.es;

    const project = portfolioProjects.find(p => p.slug === slug);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = useCallback(() => {
        if (project) {
            setCurrentIndex(prev => (prev + 1) % project.galleryImages.length);
        }
    }, [project]);

    const prevImage = useCallback(() => {
        if (project) {
            setCurrentIndex(prev => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
        }
    }, [project]);

    if (!project) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-deep-100 text-center min-h-[300px] flex flex-col justify-center items-center">
                <h2 className="text-3xl font-display font-bold text-deep-800 mb-4">{ui.notFoundTitle}</h2>
                <p className="text-deep-600">{ui.notFoundBody}</p>
            </div>
        );
    }

    const { caseStudy, galleryImages, title } = project;

    if (!caseStudy.sections || caseStudy.sections.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-deep-100 text-center min-h-[300px] flex flex-col justify-center items-center">
                <h2 className="text-3xl font-display font-bold text-deep-800 mb-4">{title}</h2>
                <p className="text-deep-600 max-w-xl">{caseStudy.description}</p>
                <p className="text-deep-500 mt-4 italic">{ui.comingSoon}</p>
            </div>
        );
    }

    return (
        <div className="font-body">
            <header className="text-center mb-16">
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-deep-800 mb-4">
                    {caseStudy.title || title}
                </h1>
                <p className="text-lg text-deep-600 max-w-2xl mx-auto">{caseStudy.subtitle || caseStudy.description}</p>
            </header>

            <section>
                {caseStudy.sections?.map((section, index) => (
                    <React.Fragment key={index}>
                        <Block>
                            <SubSectionTitle>{section.title}</SubSectionTitle>
                            {section.content}
                            {section.subsections?.map((subsection, subIndex) => (
                                <div key={`sub-${subIndex}`}>
                                    <SubSubSectionTitle>{subsection.title}</SubSubSectionTitle>
                                    {subsection.content}
                                </div>
                            ))}
                            {section.table && section.table.rows.length > 0 && (
                                <div className="mt-8">
                                    <div className='overflow-x-auto my-8'>
                                        <table className='w-full text-left border-collapse'>
                                            <thead>
                                                <tr>
                                                    {section.table.headers.map(header => (
                                                        <th key={header} className='border-b-2 border-deep-200 p-4 font-display text-deep-800'>
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section.table.rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex} className='border-b border-deep-100'>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex} className='p-4 text-deep-800 align-top'>
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </Block>
                        {index < (caseStudy.sections?.length || 0) - 1 && <Hr />}
                    </React.Fragment>
                ))}

                {galleryImages.length > 0 && (
                    <div className="my-16">
                        <SubSectionTitle>{ui.gallery}</SubSectionTitle>
                        <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-white p-2">
                            <div className="relative w-full aspect-video">
                                {galleryImages.map((image, index) => (
                                    <div
                                        key={`${title}-gallery-${index}`}
                                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                            {galleryImages.length > 1 && <>
                                <button onClick={prevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-symbolic-600/60 hover:bg-symbolic-600 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-symbolic-500 transition-all duration-300 z-20" aria-label={ui.prevImage}>
                                    <ChevronLeftIcon />
                                </button>
                                <button onClick={nextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-symbolic-600/60 hover:bg-symbolic-600 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-symbolic-500 transition-all duration-300 z-20" aria-label={ui.nextImage}>
                                    <ChevronRightIcon />
                                </button>
                            </>}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default GenericCaseStudy;
