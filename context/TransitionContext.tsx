
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TransitionContextType {
    isTransitioning: boolean;
    handleTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const useTransitionContext = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransitionContext must be used within a TransitionProvider');
    }
    return context;
};

import { usePathname } from 'next/navigation';

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const pathname = usePathname();
    const previousPathname = React.useRef(pathname);

    React.useEffect(() => {
        if (previousPathname.current !== pathname) {
            setIsTransitioning(true);
            const timer = setTimeout(() => {
                previousPathname.current = pathname;
                setIsTransitioning(false);
            }, 800); // Animation duration

            return () => clearTimeout(timer);
        }
    }, [pathname]);

    const handleTransition = (href: string) => {
        if (pathname !== href) {
            setIsTransitioning(true);
        }
    };

    return (
        <TransitionContext.Provider value={{ isTransitioning, handleTransition }}>
            {children}
        </TransitionContext.Provider>
    );
};
