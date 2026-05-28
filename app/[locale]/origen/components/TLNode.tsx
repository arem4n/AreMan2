'use client';

import { useLocale } from 'next-intl';
import type { Period } from '../origen.types';

export function TLNode({
  period,
  isActive,
  onClick,
  rm,
  orientation,
}: {
  period: Period;
  isActive: boolean;
  onClick: () => void;
  rm: boolean | null;
  orientation: 'h' | 'v';
}) {
  const locale = useLocale();
  const goTo = locale === 'en' ? 'Go to' : 'Ir a';
  const isHorizontal = orientation === 'h';
  return (
    <div className={isHorizontal ? 'flex flex-col items-center gap-1.5' : 'flex justify-center'}>
      <button
        onClick={onClick}
        className={isHorizontal
          ? "w-[44px] h-[44px] flex items-center justify-center cursor-pointer relative z-10 focus:outline-none"
          : "w-8 h-8 flex items-center justify-center cursor-pointer relative z-10 focus:outline-none"
        }
        aria-label={`${goTo} ${period.year}`}
        aria-current={isActive ? 'step' : undefined}
        style={{ background: 'transparent', border: 'none', padding: 0 }}
      >
        <span
          className={`block rounded-full border-2 border-solid ${
            isHorizontal ? "w-3.5 h-3.5" : "w-2.5 h-2.5"
          } ${rm ? '' : 'transition-all duration-300 ease-out'} ${
            isActive
              ? 'bg-symbolic-600 border-symbolic-600 scale-[1.3] opacity-100 shadow-[0_0_12px_2px_rgba(219,39,119,0.4)]'
              : `${
                  isHorizontal
                    ? 'bg-white border-deep-300'
                    : 'bg-deep-400 border-deep-500'
                } scale-[0.9] opacity-80 shadow-sm`
          }`}
        />
      </button>

      {isHorizontal && (
        <span
          className={`font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            isActive ? 'text-symbolic-600 scale-105' : 'text-deep-400 opacity-60'
          }`}
          style={{ maxWidth: 90, textAlign: 'center' }}
        >
          {period.year}
        </span>
      )}
    </div>
  );
}
