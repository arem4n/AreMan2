
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '../LoadingContext';
import LogoCodex from '../LogoCodex';
import { portfolioProjects } from '../../constants';
import Header from '../Header';
import ElegantMenu from '../ElegantMenu';

const LogoCodexClient: React.FC = () => {
    const router = useRouter();
    const { customNavigate } = useLoading();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // SAFE STATE INITIALIZATION: Start with a default, non-window-dependent value.
    const [selectedSlug, setSelectedSlug] = useState('areman-escudo-heraldico');

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // This effect runs ONLY on the client, preventing hydration errors.
    useEffect(() => {
        const getSlugFromHash = () => {
            const hash = window.location.hash.substring(1);
            return portfolioProjects.some(p => p.slug === hash) ? hash : 'areman-escudo-heraldico';
        };

        const initialSlug = getSlugFromHash();
        setSelectedSlug(initialSlug);

        const shouldScroll = sessionStorage.getItem('scrollToCaseStudy') === 'true';
        if (shouldScroll) {
            sessionStorage.removeItem('scrollToCaseStudy');
            setTimeout(() => {
                document.getElementById('casos-de-estudio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        const handleHashChange = () => {
            setSelectedSlug(getSlugFromHash());
        };
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const navigateTo = (path: string) => {
        if (path === '/portafolio' || path === '#logocodex') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const homePageSections = ['inicio', 'sobre-mi', 'servicios', 'portafolio', 'proceso', 'contacto'];
        const id = path.startsWith('#') ? path.substring(1) : '';

        if (homePageSections.includes(id)) {
            sessionStorage.setItem('scrollToSection', path);
            customNavigate('/');
        } else {
            customNavigate(path);
        }
    };

    const handleSelectSlug = (slug: string) => {
        if (slug !== selectedSlug) {
            setSelectedSlug(slug);
            const newUrl = `/portafolio#${slug}`;
            // Use replaceState to avoid polluting browser history for tab-like navigation
            window.history.replaceState(null, '', newUrl);
        }
    };
    
    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isMenuOpen) {
            htmlElement.classList.add('modal-open');
        } else {
            htmlElement.classList.remove('modal-open');
        }
        return () => {
            htmlElement.classList.remove('modal-open');
        };
    }, [isMenuOpen]);

    return (
        <>
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={navigateTo} />
            <ElegantMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={navigateTo} />

            <LogoCodex 
                navigateTo={navigateTo}
                selectedSlug={selectedSlug}
                onSelectSlug={handleSelectSlug}
            />
        </>
    );
};

export default LogoCodexClient;
