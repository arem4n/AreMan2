
import React, { useEffect, useState, useRef } from 'react';
import { trackEvent } from '../analytics';

interface ElegantMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    navigateTo: (hash: string) => void;
}

const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#servicios", label: "Servicios" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#proceso", label: "Proceso" },
    { href: "#logocodex", label: "LogoCodex" },
    { href: "#contacto", label: "Contacto" },
];

const ElegantMenu: React.FC<ElegantMenuProps> = ({ isOpen, toggleMenu, navigateTo }) => {
    const [isVisible, setIsVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !menuRef.current) return;

        const focusableElements = menuRef.current.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        ) as NodeListOf<HTMLElement>;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        const currentMenuRef = menuRef.current;
        currentMenuRef.addEventListener('keydown', handleKeyDown);

        // Focus the first element when menu opens
        firstElement?.focus();

        return () => {
            currentMenuRef?.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, isVisible]);


    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        
        if (href === '#logocodex') {
            trackEvent('navigate_to_logocodex', { from: 'elegant_menu' });
        }
        navigateTo(href);
    };

    if (!isVisible) return null;

    return (
        <div 
            ref={menuRef}
            className={`fixed inset-0 z-[1010] flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] 
            bg-gradient-to-br from-[rgba(30,41,59,0.95)] via-[rgba(71,85,105,0.9)] to-[rgba(219,39,119,0.85)] backdrop-blur-2xl
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            onClick={(e) => { if (e.target === e.currentTarget) toggleMenu(); }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
        >
            <div className="text-center max-w-[600px] px-8 py-12">
                <h2 id="menu-title" className={`menu-title text-gradient text-4xl md:text-5xl font-display font-bold mb-12 transition-all duration-600 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}>Navegación</h2>
                <nav>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {navLinks.map((link, index) => (
                             <li key={link.href} 
                                 className={`transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
                                 style={{ transitionDelay: `${isOpen ? index * 50 + 100 : 0}ms` }}
                             >
                                <a 
                                    href={link.href} 
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="block p-4 text-white text-lg font-medium rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg relative overflow-hidden transition-all duration-300 ease-in-out hover:bg-symbolic-600/50 hover:border-symbolic-500 hover:-translate-y-0.5"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div 
                    className={`mt-12 pt-8 border-t border-white/20 transition-all duration-600 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
                    style={{ transitionDelay: `${isOpen ? 600 : 0}ms` }}
                >
                    <p className="text-white/80 text-sm mb-2">¿Listo para transformar tu identidad visual?</p>
                    <p className="mb-1"><a href="https://wa.me/56934973287" target="_blank" rel="noopener noreferrer" className="text-creative-300 hover:text-creative-400 transition-colors">WhatsApp: +56 9 3497 3287</a></p>
                    <p><a href="mailto:contacto@arem4n.com" className="text-creative-300 hover:text-creative-400 transition-colors">contacto@arem4n.com</a></p>
                </div>
            </div>
        </div>
    );
};

export default ElegantMenu;