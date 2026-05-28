"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from '@/navigation';
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
    // usePathname from next-intl strips locale prefix — '/' for home in any locale
    const pathname = usePathname();

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [pathname]);

    const customNavigate = useCallback(async (url: string) => {
        if (url.startsWith('#')) {
            if (pathname === '/') {
                const element = document.getElementById(url.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            } else {
                setIsLoading(true);
                sessionStorage.setItem(STORAGE_KEYS.scrollToSection, url);
                router.push('/');
                return;
            }
        }

        const targetPath = url.split('#')[0].split('?')[0];
        if (targetPath === pathname) {
            if (url.includes('#')) {
                const hash = url.split('#')[1];
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
            return;
        }

        setIsLoading(true);

        await Promise.all([
            new Promise(resolve => setTimeout(resolve, 500)),
            Promise.resolve(router.prefetch(url as any)),
        ]);

        router.push(url as any);
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
