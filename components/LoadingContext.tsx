"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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

    // Initial load preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
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
        // Handle hash links on the same page
        if (url.startsWith('#') && pathname === '/') {
            const element = document.getElementById(url.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }
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
