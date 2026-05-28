'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { TLNode } from './TLNode';
import type { Period } from '../origen.types';

export function HTimeline({
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
    const ariaLabel = locale === 'en' ? 'Horizontal timeline' : 'Línea de tiempo horizontal';

    return (
        <motion.nav
            aria-label={ariaLabel}
            animate={rm ? undefined : {
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="hidden md:flex items-center justify-between sticky top-[80px] z-30 px-20 py-4 bg-deep-50/95 backdrop-blur-sm border-b border-symbolic-600/10 shadow-sm"
            style={{ pointerEvents: visible ? 'auto' : 'none' }}
        >
            <div className="absolute left-[102px] right-[102px] top-[38px] h-[2px] bg-deep-200 z-0" />

            <motion.div
                className="absolute left-[102px] top-[38px] h-[2px] bg-symbolic-600 z-0 origin-left"
                style={{ width: 'calc(100% - 204px)' }}
                animate={{ scaleX: active / (periods.length - 1) }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            />

            {periods.map((p, i) => (
                <TLNode key={p.id} period={p} isActive={active === i} onClick={() => onNode(i)} rm={rm} orientation="h" />
            ))}
        </motion.nav>
    );
}
