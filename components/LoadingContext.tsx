"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { STORAGE_KEYS } from '@/lib/storageKeys';

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    customNavigate: (url: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Initial load preloader — se apaga cuando el browser termina de cargar
    useEffect(() => {
        if (document.readyState === 'complete') {
            setIsLoading(false);
        } else {
            const handleLoad = () => setIsLoading(false);
            window.addEventListener('load', handleLoad, { once: true });
            const fallback = setTimeout(() => setIsLoading(false), 2000);
            return () => {
                window.removeEventListener('load', handleLoad);
                clearTimeout(fallback);
            };
        }
    }, []);

    // Ensure preloader hides after navigation
    useEffect(() => {
        // We set a small delay to allow the new page to render before fading out
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [pathname]);

    const customNavigate = useCallback(async (url: string) => {
        // Handle internal hash links
        if (url.startsWith('#')) {
            if (pathname === '/') {
                const element = document.getElementById(url.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            } else {
                // If we are on a different page, we need to go home first
                setIsLoading(true);
                sessionStorage.setItem(STORAGE_KEYS.scrollToSection, url);
                router.push('/');
                return;
            }
        }

        // Avoid showing preloader if we are already on the target path
        const targetPath = url.split('#')[0].split('?')[0];
        if (targetPath === pathname) {
            // If there's a hash, let the browser handle it or scroll manually
            if (url.includes('#')) {
                const hash = url.split('#')[1];
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
            return;
        }

        // External or different page navigation
        setIsLoading(true);

        // Minimum wait time of 500ms for "scenic presence"
        await Promise.all([
            new Promise(resolve => setTimeout(resolve, 500)),
            Promise.resolve(router.prefetch(url))
        ]);

        router.push(url);
    }, [router, pathname]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, customNavigate }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
