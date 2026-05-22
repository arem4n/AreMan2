'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ModalData } from '../origen.types';

export function Modal({
  title,
  body,
  onClose,
  rm,
}: {
  title: string;
  body: string;
  onClose: () => void;
  rm: boolean | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('modal-open');
    containerRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!containerRef.current) return;
        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === containerRef.current) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={containerRef}
        tabIndex={-1}
        initial={rm ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-lg bg-white rounded-xl p-6 md:p-8 border border-symbolic-600 shadow-xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-deep-200 bg-white hover:bg-deep-50 text-deep-500 hover:text-deep-700 transition-colors cursor-pointer"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          ×
        </button>
        <h2
          id="modal-title"
          className="font-display text-xl font-bold uppercase tracking-wide text-symbolic-600 mb-4 pr-6"
        >
          {title}
        </h2>
        <p className="font-body text-sm md:text-base leading-relaxed text-deep-900 opacity-90">
          {body}
        </p>
      </motion.div>
    </motion.div>
  );
}

export { AnimatePresence };
export type { ModalData };
