'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import type { Period } from '../origen.types';

/**
 * Línea de tiempo en móvil: una franja horizontal pegada arriba, con los
 * períodos como botones que se desplazan de lado. Antes era una columna fija
 * a la izquierda que le quitaba un tercio del ancho al texto.
 * (Conserva el nombre del archivo; en escritorio se usa `HTimeline`.)
 */
export function VTimeline({
    periods,
    active,
    onNode,
    rm,
    visible,
}: {
    periods: Period[];
    active: number;
    onNode: (i: number) => void;
    rm: boolean | null;
    visible: boolean;
}) {
    const locale = useLocale();
    const ariaLabel = locale === 'en' ? 'Timeline' : 'Línea de tiempo';
    const listRef = useRef<HTMLOListElement>(null);

    // Mantiene a la vista el período activo sin mover la página.
    useEffect(() => {
        const list = listRef.current;
        const item = list?.children[active] as HTMLElement | undefined;
        if (!list || !item) return;
        const target = item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2;
        list.scrollTo({ left: Math.max(0, target), behavior: rm ? 'auto' : 'smooth' });
    }, [active, rm]);

    return (
        <nav
            aria-label={ariaLabel}
            className={`md:hidden sticky top-0 z-30 bg-deep-50/95 backdrop-blur-sm border-b border-symbolic-600/10 shadow-sm transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {/* pr-20: el botón fijo del menú ocupa la esquina superior derecha */}
            <ol ref={listRef} className="flex gap-2 overflow-x-auto py-3 pl-4 pr-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {periods.map((p, i) => (
                    <li key={p.id} className="flex-shrink-0">
                        <button
                            onClick={() => onNode(i)}
                            aria-current={active === i ? 'step' : undefined}
                            className={`min-h-[40px] px-4 rounded-full border font-display text-sm font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-symbolic-600 ${
                                active === i
                                    ? 'bg-symbolic-600 border-symbolic-600 text-white'
                                    : 'bg-white border-deep-200 text-deep-600'
                            }`}
                        >
                            {p.year}
                        </button>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
