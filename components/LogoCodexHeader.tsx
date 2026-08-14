import React, { useState, useEffect, useRef } from 'react';

interface LogoCodexHeaderProps {
    navigateTo: (hash: string) => void;
}

const navLinks = [
    { href: "#fundamentos", label: "1. Fundamentos" },
    { href: "#proceso", label: "2. Proceso" },
    { href: "#manifiesto", label: "3. Manifiesto (AreMan)" },
    { href: "#puente", label: "4. El Puente (arem4n)" },
    { href: "#otros-casos", label: "5. Otros Casos" },
];

const LogoCodexHeader: React.FC<LogoCodexHeaderProps> = ({ navigateTo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(prev => !prev);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.documentElement.classList.add('modal-open');
        } else {
            document.documentElement.classList.remove('modal-open');
            const timer = setTimeout(() => setIsVisible(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

     useEffect(() => {
        if (!isOpen || !menuRef.current) return;

        const focusableElements = menuRef.current.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled])'
        ) as NodeListOf<HTMLElement>;

        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) { 
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        const currentMenuRef = menuRef.current;
        currentMenuRef.addEventListener('keydown', handleKeyDown);
        firstElement?.focus();

        return () => {
            currentMenuRef?.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, isVisible]);


    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        
        if (href.startsWith('#') && href !== '#inicio') {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // A short delay helps the menu close animation finish before the page transitions.
            setTimeout(() => {
                navigateTo(href);
            }, 300);
        }
        toggleMenu();
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className={`elegant-menu-button ${isOpen ? 'active' : ''}`}
                aria-label="Abrir Menú de LogoCodex"
                aria-expanded={isOpen}
            >
                <div className="menu-lines"></div>
            </button>
            
            {isVisible && (
                <div 
                    ref={menuRef}
                    className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] 
                    bg-gradient-to-br from-[rgba(30,41,59,0.95)] via-[rgba(71,85,105,0.9)] to-[rgba(204,31,114,0.85)] backdrop-blur-2xl
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    onClick={(e) => { if (e.target === e.currentTarget) toggleMenu(); }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="logocodex-menu-title"
                >
                    <div className="text-center max-w-[600px] px-8 py-12">
                        <h2 id="logocodex-menu-title" className={`text-deep-800 text-4xl md:text-5xl font-display font-bold mb-12 transition-all duration-600 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}>Menú LogoCodex™</h2>
                        <nav>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {navLinks.map((link, index) => (
                                     <li key={link.href} 
                                         className={`transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
                                         style={{ transitionDelay: `${isOpen ? index * 50 + 100 : 0}ms` }}
                                     >
                                        <a 
                                            href={link.href} 
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="block p-4 text-white text-lg font-medium rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg transition-all duration-300 ease-in-out hover:bg-symbolic-600/50 hover:border-symbolic-500 hover:-translate-y-0.5"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                         <div 
                            className={`mt-10 pt-6 border-t border-white/20 transition-all duration-600 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
                            style={{ transitionDelay: `${isOpen ? (navLinks.length * 50 + 100) : 0}ms` }}
                        >
                            <a 
                                href="#inicio"
                                onClick={(e) => handleLinkClick(e, '#inicio')}
                                className="inline-block p-4 text-white text-lg font-medium rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg transition-all duration-300 ease-in-out hover:bg-creative-500/50 hover:border-creative-400 hover:-translate-y-0.5"
                            >
                                Volver al Inicio
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoCodexHeader;