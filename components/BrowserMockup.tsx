'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from './icons/Icons';

interface Screenshot {
    src: string;
    alt: string;
}

interface BrowserMockupProps {
    src: string;
    label?: string;
    className?: string;
    screenshots?: Screenshot[];
    mobileScreenshots?: Screenshot[];
    autoInterval?: number;
    screenshotAspect?: string;
    defaultView?: 'desktop' | 'mobile' | 'auto';
    iframeMobileAspect?: string;
}

const ChromeBar: React.FC<{ label: string; href: string }> = ({ label, href }) => (
    <div className="bg-[#EBEBEB] border-b border-deep-200 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        <div className="flex-1 min-w-0 bg-white rounded-md px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <Icon name="ui-lock" size={12} className="text-deep-400 flex-shrink-0" />
            <span className="text-xs text-deep-500 font-mono truncate select-all">{label}</span>
        </div>
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-deep-400 hover:text-symbolic-600 transition-colors duration-200"
            title="Abrir en nueva pestaña"
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>
    </div>
);

const ScreenshotCarousel: React.FC<{
    screenshots: Screenshot[];
    src: string;
    autoInterval: number;
    aspect: string;
    mobile?: boolean;
}> = ({ screenshots, src, autoInterval, aspect, mobile = false }) => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => setActive(i => (i + 1) % screenshots.length), [screenshots.length]);
    const prev = useCallback(() => setActive(i => (i - 1 + screenshots.length) % screenshots.length), [screenshots.length]);

    useEffect(() => {
        setActive(0);
    }, [screenshots]);

    useEffect(() => {
        if (paused || screenshots.length <= 1) return;
        const t = setInterval(next, autoInterval);
        return () => clearInterval(t);
    }, [paused, next, screenshots.length, autoInterval]);

    const inner = (
        <div
            className={`w-full bg-deep-900 overflow-hidden relative group ${mobile ? '' : ''}`}
            style={{ aspectRatio: aspect }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {screenshots.map((shot, i) => (
                <React.Fragment key={i}>
                    <img
                        src={shot.src}
                        alt={shot.alt}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const placeholder = target.nextElementSibling as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                        }}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <div className="absolute inset-0 items-center justify-center bg-deep-800 text-deep-500 text-sm hidden">
                        Imagen próximamente
                    </div>
                </React.Fragment>
            ))}

            {screenshots.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {screenshots.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {screenshots.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                        />
                    ))}
                </div>
            )}

            <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
            >
                Visitar plataforma →
            </a>

            <div className="absolute bottom-8 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded text-white/80 text-xs">
                    {screenshots[active]?.alt}
                </span>
            </div>
        </div>
    );

    if (mobile) {
        return (
            <div className="bg-deep-900 py-4 flex justify-center">
                <div className="max-w-[280px] w-full rounded-2xl overflow-hidden ring-4 ring-deep-700">
                    {inner}
                </div>
            </div>
        );
    }

    return inner;
};

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
    src,
    label,
    className = '',
    screenshots,
    mobileScreenshots,
    autoInterval = 3000,
    screenshotAspect = '16/10',
    defaultView,
    iframeMobileAspect,
}) => {
    const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
    const [isMobileViewport, setIsMobileViewport] = useState(false);

    useEffect(() => {
        if (defaultView === 'mobile') {
            setView('mobile');
        } else if (defaultView === 'auto' || defaultView === undefined) {
            setView(window.innerWidth < 768 ? 'mobile' : 'desktop');
        }
    }, [defaultView]);

    useEffect(() => {
        const check = () => setIsMobileViewport(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const hasToggle = mobileScreenshots && mobileScreenshots.length > 0;
    const showDesktopScreenshots = screenshots && screenshots.length > 0;
    const showMobileScreenshots = mobileScreenshots && mobileScreenshots.length > 0;

    return (
        <div className={`rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-deep-200 my-8 ${className}`}>
            <ChromeBar label={label || src} href={src} />

            {hasToggle && (
                <div className="flex items-center justify-center gap-2 bg-[#EBEBEB] border-b border-deep-200 py-2">
                    <button
                        onClick={() => setView('desktop')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                            view === 'desktop'
                                ? 'bg-symbolic-600 text-white shadow-sm'
                                : 'text-deep-500 hover:text-deep-700'
                        }`}
                        aria-label="Ver versión escritorio"
                    >
                        <Icon name="ui-monitor" size={14} className="mr-1.5" />
                        Desktop
                    </button>
                    <button
                        onClick={() => setView('mobile')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                            view === 'mobile'
                                ? 'bg-symbolic-600 text-white shadow-sm'
                                : 'text-deep-500 hover:text-deep-700'
                        }`}
                        aria-label="Ver versión móvil"
                    >
                        <Icon name="ui-mobile" size={14} className="mr-1.5" />
                        Mobile
                    </button>
                </div>
            )}

            {showDesktopScreenshots && (!hasToggle || view === 'desktop') && (
                <ScreenshotCarousel
                    screenshots={screenshots}
                    src={src}
                    autoInterval={autoInterval}
                    aspect={screenshotAspect}
                />
            )}

            {showMobileScreenshots && view === 'mobile' && (
                <ScreenshotCarousel
                    screenshots={mobileScreenshots}
                    src={src}
                    autoInterval={autoInterval}
                    aspect="9/19.5"
                    mobile
                />
            )}

            {!showDesktopScreenshots && !showMobileScreenshots && (
                <div
                    className="w-full bg-white overflow-hidden relative group"
                    style={{ aspectRatio: isMobileViewport && iframeMobileAspect ? iframeMobileAspect : '16/10' }}
                >
                    <div className="absolute inset-0 bg-deep-900/40 flex items-center justify-center opacity-100 group-hover:opacity-0 pointer-events-auto group-hover:pointer-events-none transition-opacity duration-300 z-10 cursor-pointer">
                        <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/20">
                            Pasa el cursor para interactuar
                        </span>
                    </div>
                    <iframe
                        src={src}
                        loading="lazy"
                        className="w-full h-full border-0"
                        title={label || 'Vista previa del sitio'}
                        sandbox="allow-scripts allow-popups allow-forms"
                    />
                </div>
            )}
        </div>
    );
};
