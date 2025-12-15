
'use client';

import { ReactNode } from 'react';
import { TransitionProvider } from '@/context/TransitionContext';
import { usePathname } from 'next/navigation';
import PageTransitionPreloader from './PageTransitionPreloader';

export default function ClientWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname(); // Using a client hook makes this a client component

    // The actual state logic for the preloader is now inside TransitionProvider,
    // but we can add any other client-side logic here if needed.

    return (
        <TransitionProvider>
            <PageTransitionPreloader />
            {children}
        </TransitionProvider>
    );
}
