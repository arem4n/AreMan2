
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { portfolioProjects, whiteLogoUrl } from '../constants';
import { useLocalizedHref, isPlainLeftClick } from '@/hooks/useLocalizedHref';

interface HeroProps {
    navigateTo: (hash: string) => void;
}

/**
 * Piezas reales que acompañan al titular: marca aplicada, no logotipos sobre
 * blanco. La primera es la imagen más grande de la primera pantalla (LCP), por
 * eso va con `priority` y sin animación de entrada.
 */
const FEATURED = [
    { slug: 'albornoz-propiedades', src: '/images/albornoz-oficina.webp', alt: 'Aplicación en Oficina Corporativa' },
    { slug: 'tommybox-training', src: '/images/tommybox-gym.webp', alt: 'Espacio físico del Gimnasio TommyBox' },
    { slug: 'osttech-software', src: '/images/osttech-mobile.webp', alt: 'Interfaz Móvil: App de Mantenimiento' },
] as const;

/** "Corretaje de Propiedades. Confianza y refugio en el sur." → "Corretaje de Propiedades" */
const sectorOf = (description: string) => description.split('.')[0];

const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
    const t = useTranslations('Hero');
    const localizedHref = useLocalizedHref();

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateTo('#contacto');
    };

    const pieces = FEATURED.flatMap(piece => {
        const project = portfolioProjects.find(p => p.slug === piece.slug);
        return project ? [{ ...piece, project }] : [];
    });

    return (
        <section id="inicio" className="bg-deep-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-24 pb-14 md:pt-32 lg:pb-20 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center text-white">
                <div className="lg:col-span-5 text-center lg:text-left">
                    <div className="relative w-32 md:w-36 h-14 md:h-16 mx-auto lg:mx-0 mb-6">
                        <Image
                            src={whiteLogoUrl}
                            alt={t('logoAlt')}
                            fill
                            sizes="144px"
                            className="object-contain lg:object-left"
                        />
                    </div>
                    <h1 className="font-display font-bold text-[clamp(2.25rem,3.6vw+1rem,3.75rem)] leading-[1.05] tracking-[-0.02em] mb-3">
                        {t('headline')}
                    </h1>
                    <p className="text-xl lg:text-2xl font-display text-white italic opacity-90 mb-6">
                        {t('subheadline')}
                    </p>
                    <p className="text-base md:text-lg text-deep-100 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        <strong className="text-creative-400">LogoCodeX™</strong>{' '}{t('description')}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center lg:justify-start">
                        <a
                            href="#contacto"
                            onClick={handleContactClick}
                            className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold whitespace-nowrap py-4 px-7 rounded-full transition duration-200 ease-out shadow-lg hover:shadow-xl border border-symbolic-500"
                        >
                            {t('ctaPrimary')}
                        </a>
                        <a
                            href={localizedHref('/portafolio')}
                            onClick={(e) => {
                                if (!isPlainLeftClick(e)) return;
                                e.preventDefault();
                                navigateTo('/portafolio');
                            }}
                            className="inline-block bg-transparent hover:bg-white/10 text-white font-semibold whitespace-nowrap py-4 px-7 rounded-full transition duration-200 ease-out border border-white/30 hover:border-white/60"
                        >
                            {t('ctaSecondary')}
                        </a>
                    </div>
                </div>

                <ul aria-label={t('workLabel')} className="lg:col-span-7 grid grid-cols-2 gap-3 lg:gap-4">
                    {pieces.map(({ slug, src, alt, project }, index) => (
                        <li key={slug} className={index === 0 ? 'col-span-2' : ''}>
                            <a
                                href={localizedHref(`/portafolio/${slug}`)}
                                onClick={(e) => {
                                    if (!isPlainLeftClick(e)) return;
                                    e.preventDefault();
                                    navigateTo(`/portafolio/${slug}`);
                                }}
                                className={`group relative block overflow-hidden rounded-2xl bg-deep-800 ring-1 ring-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-creative-400 ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                            >
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    priority={index === 0}
                                    sizes={index === 0 ? '(max-width: 1024px) 100vw, 700px' : '(max-width: 1024px) 50vw, 350px'}
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                />
                                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-900/90 via-deep-900/50 to-transparent px-4 pt-10 pb-3 text-left">
                                    <span className="block font-display font-bold text-lg lg:text-xl leading-tight">{project.title}</span>
                                    <span className={`text-xs lg:text-sm text-deep-100 ${index === 0 ? 'block' : 'hidden sm:block'}`}>{sectorOf(project.caseStudy.description)}</span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Hero;
