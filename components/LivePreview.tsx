import React from 'react';

interface LivePreviewProps {
    src: string;
    title: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ src, title }) => {
    return (
        <section className="w-full max-w-[1200px] aspect-[3/4] md:aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] mx-auto my-16 bg-deep-50 relative group">
            <div className="absolute inset-0 bg-deep-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                 <span className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold border border-white/20">
                     Interactúa con el sitio
                 </span>
            </div>
            <iframe
                src={src}
                loading="lazy"
                className="w-full h-full border-0 relative z-0"
                title={title}
                sandbox="allow-scripts allow-same-origin allow-popups"
            />
        </section>
    );
};
