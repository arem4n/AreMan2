
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../analytics';

interface ElegantMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    navigateTo: (hash: string) => void;
}

const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#origen", label: "Origen" },
    { href: "#servicios", label: "Servicios" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#proceso", label: "Proceso" },
    { href: "/portafolio", label: "LogoCodex" },
    { href: "#contacto", label: "Contacto" },
];

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
        transition: {
            y: { type: "spring", stiffness: 300, damping: 24 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { type: "spring", stiffness: 300, damping: 24 }
        }
    }
};

const ElegantMenu: React.FC<ElegantMenuProps> = ({ isOpen, toggleMenu, navigateTo }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
            document.documentElement.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
            document.documentElement.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
            document.documentElement.classList.remove('modal-open');
        };
    }, [isOpen]);


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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className="fixed inset-0 z-[50] flex flex-col items-center justify-center bg-deep-900/95 backdrop-blur-xl"
                    aria-modal="true"
                    role="dialog"
                >
                    <nav className="w-full max-w-lg px-6">
                        <ul className="flex flex-col items-center gap-6">
                            {navLinks.map((link) => (
                                <motion.li key={link.href} variants={itemVariants} className="w-full text-center">
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleLinkClick(e, link.href)}
                                        className="block text-3xl md:text-5xl font-display font-bold text-white hover:text-symbolic-400 transition-colors duration-300 py-2"
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            variants={itemVariants}
                            className="mt-12 pt-8 border-t border-white/10 text-center"
                        >
                            <p className="text-deep-200 mb-4 font-light">¿Hablemos de tu marca?</p>
                            <a
                                href="#contacto"
                                onClick={(e) => handleLinkClick(e, "#contacto")}
                                className="inline-block px-8 py-3 bg-symbolic-600 text-white font-bold rounded-full hover:bg-symbolic-500 transition-colors shadow-lg shadow-symbolic-600/20"
                            >
                                Iniciar Auditoría
                            </a>
                        </motion.div>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ElegantMenu;
