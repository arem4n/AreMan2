'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Screenshot {
    src: string;
    alt: string;
}

interface BrowserMockupProps {
    src: string;
    label?: string;
    className?: string;
    screenshots?: Screenshot[];
    autoInterval?: number;
    screenshotAspect?: string;
}

const ChromeBar: React.FC<{ label: string; href: string }> = ({ label, href }) => (
    <div className="bg-[#EBEBEB] border-b border-deep-200 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        <div className="flex-1 min-w-0 bg-white rounded-md px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <svg className="w-3 h-3 text-deep-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
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

const ScreenshotCarousel: React.FC<{ screenshots: Screenshot[]; src: string; autoInterval: number; aspect: string }> = ({
    screenshots,
    src,
    autoInterval,
    aspect,
}) => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => setActive(i => (i + 1) % screenshots.length), [screenshots.length]);
    const prev = useCallback(() => setActive(i => (i - 1 + screenshots.length) % screenshots.length), [screenshots.length]);

    useEffect(() => {
        if (paused || screenshots.length <= 1) return;
        const t = setInterval(next, autoInterval);
        return () => clearInterval(t);
    }, [paused, next, screenshots.length, autoInterval]);

    return (
        <div
            className="w-full bg-deep-900 overflow-hidden relative group"
            style={{ aspectRatio: aspect }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {screenshots.map((shot, i) => (
                <img
                    key={i}
                    src={shot.src}
                    alt={shot.alt}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}

            {/* Prev / Next arrows */}
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

            {/* Dot indicators */}
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

            {/* Visit link */}
            <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
            >
                Visitar plataforma →
            </a>

            {/* Screen label */}
            <div className="absolute bottom-8 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded text-white/80 text-xs">
                    {screenshots[active].alt}
                </span>
            </div>
        </div>
    );
};

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
    src,
    label,
    className = '',
    screenshots,
    autoInterval = 3000,
    screenshotAspect = '16/10',
}) => (
    <div className={`rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-deep-200 my-8 ${className}`}>
        <ChromeBar label={label || src} href={src} />

        {screenshots && screenshots.length > 0 ? (
            <ScreenshotCarousel screenshots={screenshots} src={src} autoInterval={autoInterval} aspect={screenshotAspect} />
        ) : (
            <div className="w-full aspect-[16/10] bg-white overflow-hidden relative group">
                <div className="absolute inset-0 bg-deep-900/40 flex items-center justify-center opacity-100 group-hover:opacity-0 pointer-events-auto group-hover:pointer-events-none transition-opacity duration-300 z-10 cursor-pointer">
                    <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/20">
                        Pasa el cursor para interactuar
                    </span>
                </div>
                <iframe
                    src={src}
                    loading="lazy"
                    className="w-full h-full border-0"
                    title={label || src}
                    sandbox="allow-scripts allow-same-origin allow-popups"
                />
            </div>
        )}
    </div>
);
