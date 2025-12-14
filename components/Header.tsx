
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '../analytics';
import Link from 'next/link';

interface HeaderProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#servicios", label: "Servicios" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#proceso", label: "Proceso" },
    { href: "/logocodex", label: "LogoCodex" },
    { href: "#contacto", label: "Contacto" },
];

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {

    const handleNavClick = (href: string) => {
        if (href.startsWith('/')) {
            trackEvent('navigate_to_logocodex', { from: 'header_nav' });
        }
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className={`elegant-menu-button md:hidden ${isMenuOpen ? 'active' : ''}`}
                aria-label="Abrir Menú"
                aria-expanded={isMenuOpen}
            >
                <div className="menu-lines"></div>
            </button>
            
            <motion.header 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center pointer-events-none"
            >
                <div className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 rounded-full px-2 py-2 flex items-center gap-6 transition-all duration-300 hover:bg-white/90 hover:shadow-xl">
                    <Link
                        href="#inicio" 
                        onClick={() => handleNavClick('#inicio')}
                        className="flex items-center cursor-pointer pl-4 pr-2 group"
                    >
                        <motion.img 
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            src="https://i.postimg.cc/d3wtGXNk/IMG_20250728_180701_596.webp" 
                            alt="Logotipo de AREM4N" 
                            className="h-10 w-auto" 
                        />
                        <span className="sr-only">AREM4N</span>
                    </Link>

                    <nav className="flex items-center gap-1 pr-2">
                        {navLinks.map(link => (
                            <Link
                                key={link.href} 
                                href={link.href} 
                                onClick={() => handleNavClick(link.href)}
                                className="relative px-4 py-2 rounded-full text-sm font-medium text-deep-600 transition-colors hover:text-deep-900 group"
                            >
                                <span className="relative z-10">{link.label}</span>
                                <span className="absolute inset-0 bg-deep-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center -z-0"></span>
                            </Link>
                        ))}
                        
                        <Link
                            href="#contacto"
                            onClick={() => handleNavClick('#contacto')}
                            className="ml-2 px-5 py-2 rounded-full bg-symbolic-600 text-white text-sm font-bold shadow-md hover:bg-symbolic-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Auditar
                        </Link>
                    </nav>
                </div>
            </motion.header>
        </>
    );
};

export default Header;
