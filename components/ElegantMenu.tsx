
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { trackEvent } from '../analytics';
import { whiteLogoUrl } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';

interface ElegantMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    navigateTo: (hash: string) => void;
}

const menuVariants = {
    open: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
            duration: 0.5
        }
    },
    closed: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: "afterChildren",
            duration: 0.3
        }
    }
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
    closed: {
        y: 30,
        opacity: 0,
        transition: { duration: 0.25, ease: [0.4, 0, 1, 1] }
    }
};

const ElegantMenu: React.FC<ElegantMenuProps> = ({ isOpen, toggleMenu, navigateTo }) => {
    const t = useTranslations();
    const previousFocusRef = useRef<HTMLElement | null>(null);

    const navLinks = [
        { href: "#inicio", label: t('Navigation.inicio') },
        { href: "#origen", label: t('Navigation.origen') },
        { href: "#servicios", label: t('Navigation.servicios') },
        { href: "#portafolio", label: t('Navigation.portafolio') },
        { href: "#proceso", label: t('Navigation.proceso') },
        { href: "/portafolio", label: t('Navigation.logocodex') },
        { href: "#contacto", label: t('Navigation.contacto') },
    ];

    useEffect(() => {
        if (!isOpen) {
            previousFocusRef.current?.focus();
            previousFocusRef.current = null;
            return;
        }

        previousFocusRef.current = document.activeElement as HTMLElement;

        const firstLink = document.querySelector<HTMLAnchorElement>('[data-menu-link]');
        firstLink?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                toggleMenu();
                return;
            }
            if (e.key !== 'Tab') return;

            const focusable = Array.from(
                document.querySelectorAll<HTMLElement>('[data-menu-toggle], [data-menu-link], [data-menu-cta]')
            );
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, toggleMenu]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (href === '/portafolio') {
            trackEvent('navigate_to_logocodex', { from: 'elegant_menu' });
        }
        toggleMenu();
        navigateTo(href);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        key="menu-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.25 } }}
                        exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.5 } }}
                        className="fixed inset-0 z-[1998]"
                        style={{ backgroundColor: '#0f172a' }}
                        aria-hidden="true"
                    />

                    <motion.div
                        key="menu-content"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        id="main-menu-dialog"
                        className="fixed inset-0 z-[1999] flex flex-col items-center justify-center overflow-hidden pt-20 pb-4 md:py-8"
                        aria-modal="true"
                        role="dialog"
                        aria-label={t('ElegantMenu.navLabel')}
                    >
                        <nav className="w-full max-w-lg px-6">
                            <motion.div variants={itemVariants} className="flex justify-center mb-5 md:mb-10">
                                <img
                                    src={whiteLogoUrl}
                                    alt="AREM4N"
                                    className="h-12 md:h-16 w-auto object-contain"
                                />
                            </motion.div>
                            <ul className="flex flex-col items-center gap-2 md:gap-6">
                                {navLinks.map((link) => (
                                    <motion.li key={link.href} variants={itemVariants} className="w-full text-center">
                                        <a
                                            href={link.href}
                                            data-menu-link
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="block text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white hover:text-symbolic-400 transition-colors duration-300 py-1 md:py-2"
                                        >
                                            {link.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.div
                                variants={itemVariants}
                                className="mt-4 md:mt-12 pt-4 md:pt-8 border-t border-white/10 text-center"
                            >
                                <p className="text-deep-200 mb-4 font-light text-sm md:text-base">{t('ElegantMenu.prompt')}</p>
                                <a
                                    href="#contacto"
                                    data-menu-cta
                                    onClick={(e) => handleLinkClick(e, "#contacto")}
                                    className="inline-block px-8 py-3 bg-symbolic-600 text-white font-bold rounded-full hover:bg-symbolic-500 transition-colors shadow-lg shadow-symbolic-600/20 text-sm md:text-base"
                                >
                                    {t('ElegantMenu.cta')}
                                </a>
                                <div className="mt-6">
                                    <LanguageSwitcher className="text-white/60 hover:text-white" />
                                </div>
                            </motion.div>
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ElegantMenu;
