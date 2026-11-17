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
    // `isLoading` solo es true mientras una navegación de `customNavigate`
    // está en curso (muestra la barra de progreso). La carga inicial no lo
    // activa: el HTML del servidor se ve de inmediato.
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // usePathname from next-intl strips locale prefix — '/' for home in any locale
    const pathname = usePathname();

    // La navegación terminó cuando cambia la ruta.
    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    // Red de seguridad: si la ruta nunca cambia (navegación cancelada o
    // fallida), la barra no puede quedarse encendida para siempre.
    useEffect(() => {
        if (!isLoading) return;
        const fallback = setTimeout(() => setIsLoading(false), 8000);
        return () => clearTimeout(fallback);
    }, [isLoading]);

    const customNavigate = useCallback(async (url: string) => {
        if (url.startsWith('#')) {
            if (pathname === '/') {
                const element = document.getElementById(url.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                // Si el elemento no existe (ej. ancla con typo, o contenido condicional
                // aún no montado), no hay nada más que hacer: sin este return, el código
                // caía al flujo de navegación de más abajo y terminaba llamando a
                // router.push('#el-hash'), una URL sin path que no tiene sentido.
                return;
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

        router.prefetch(url as any);
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
