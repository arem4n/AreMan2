
import React from 'react';
import { motion, SVGMotionProps } from 'framer-motion';
import { trackEvent } from '../analytics';

interface HeaderProps {
    isMenuOpen: boolean;
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

const Path = (props: SVGMotionProps<SVGPathElement>) => (
    <motion.path
        fill="transparent"
        strokeWidth="2.5" // Slightly thinner for elegance
        stroke="hsl(0, 0%, 18%)" // deep-800 equivalent
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    />
);

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu, navigateTo }) => {

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (href === '/portafolio') {
            trackEvent('navigate_to_logocodex', { from: 'header_nav' });
        }
        navigateTo(href);
    };

    return (
        <>
            {/* Mobile Menu Button - Redesigned with precise geometry */}
            <motion.button
                initial={false}
                animate={isMenuOpen ? "open" : "closed"}
                onClick={toggleMenu}
                className="fixed top-6 right-6 z-[2000] p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg md:hidden border border-white/40"
                aria-label={isMenuOpen ? "Cerrar Menú" : "Abrir Menú"}
                aria-expanded={isMenuOpen}
            >
                 <svg width="24" height="24" viewBox="0 0 24 24">
                    {/* Top line */}
                    <Path
                        variants={{
                            closed: { d: "M 4 6 L 20 6" },
                            open: { d: "M 4 20 L 20 4" }
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Middle line - fades out */}
                    <Path
                        d="M 4 12 L 20 12"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 }
                        }}
                        transition={{ duration: 0.1 }}
                    />

                    {/* Bottom line */}
                    <Path
                        variants={{
                            closed: { d: "M 4 18 L 20 18" },
                            open: { d: "M 4 4 L 20 20" }
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </svg>
            </motion.button>
            
            {/* Desktop Floating Island Header */}
            <motion.header 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center pointer-events-none"
            >
                <div className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 rounded-full px-2 py-2 flex items-center gap-6 transition-all duration-300 hover:bg-white/90 hover:shadow-xl">
                    {/* Logo - Updated to Favicon style */}
                    <a 
                        href="#inicio" 
                        onClick={(e) => handleNavClick(e, '#inicio')} 
                        className="flex items-center cursor-pointer pl-4 pr-2 group"
                    >
                        <motion.img 
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            src="/images/icon.png"
                            alt="Logotipo de AREM4N" 
                            className="h-10 w-10 object-contain"
                        />
                        <span className="sr-only">AREM4N</span>
                    </a>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-1 pr-2">
                        {navLinks.map(link => (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="relative px-4 py-2 rounded-full text-sm font-medium text-deep-600 transition-colors hover:text-deep-900 group"
                            >
                                <span className="relative z-10">{link.label}</span>
                                {/* Hover background pill effect */}
                                <span className="absolute inset-0 bg-deep-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center -z-0"></span>
                            </a>
                        ))}
                        
                        {/* Call to Action in Menu */}
                        <a
                            href="#contacto"
                            onClick={(e) => handleNavClick(e, '#contacto')}
                            className="ml-2 px-5 py-2 rounded-full bg-symbolic-600 text-white text-sm font-bold shadow-md hover:bg-symbolic-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Auditar
                        </a>
                    </nav>
                </div>
            </motion.header>
        </>
    );
};

export default Header;
