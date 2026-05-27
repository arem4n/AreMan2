'use client';

import { motion } from 'framer-motion';
import { TLNode } from './TLNode';
import type { Period } from '../origen.types';

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
  return (
    <motion.nav
      aria-label="Línea de tiempo vertical"
      animate={rm ? undefined : {
        x: visible ? 0 : -160,
        opacity: visible ? 1 : 0
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="md:hidden fixed left-4 z-30 flex flex-col gap-1.5"
      style={{
        top: 'calc(50% + 40px)',
        y: '-50%',
        pointerEvents: visible ? 'auto' : 'none'
      }}
    >
      <div className="absolute left-[15px] top-[16px] bottom-[16px] w-[2px] z-0 bg-deep-200" />

      <motion.div
        className="absolute left-[15px] top-[16px] w-[2px] bg-symbolic-600 z-0 origin-top"
        style={{ height: 'calc(100% - 32px)' }}
        animate={{ scaleY: active / (periods.length - 1) }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      />

      {periods.map((p, i) => (
        <div key={p.id} className="relative z-10 flex items-center gap-2 pr-4">
          <TLNode period={p} isActive={active === i} onClick={() => onNode(i)} rm={rm} orientation="v" />
          <span
            className={`font-display text-xs font-bold uppercase transition-colors duration-300 ${
              active === i ? 'text-symbolic-600 opacity-100 font-extrabold' : 'text-deep-500 opacity-80'
            }`}
            style={{ whiteSpace: 'nowrap', minWidth: '55px' }}
          >
            {p.year}
          </span>
        </div>
      ))}
    </motion.nav>
  );
}
