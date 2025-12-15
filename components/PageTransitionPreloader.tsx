
'use client';

import React from 'react';
import { useTransitionContext } from '@/context/TransitionContext';

export const PageTransitionPreloader: React.FC = () => {
    const { isTransitioning } = useTransitionContext();

    return (
        <div
            id="preloader"
            className={`preloader-transition ${isTransitioning ? 'visible' : 'hidden'}`}
        >
            <div className="preloader-container">
                <div className="preloader-spinner"></div>
                <div className="preloader-logo"></div>
            </div>
        </div>
    );
};

export default PageTransitionPreloader;
