
'use client';

import React, { useState, useEffect } from 'react';
import { useTransitionContext } from '@/context/TransitionContext';

const Preloader: React.FC = () => {
    const { isTransitioning } = useTransitionContext();
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 1200); // Duration of the initial preloader

        return () => clearTimeout(timer);
    }, []);

    const isVisible = isInitialLoading || isTransitioning;

    return (
        <div
            id="preloader"
            className={`preloader-transition ${isVisible ? 'visible' : 'hidden'}`}
        >
            <div className="preloader-container">
                <div className="preloader-spinner"></div>
                <div className="preloader-logo"></div>
            </div>
        </div>
    );
};

export default Preloader;
