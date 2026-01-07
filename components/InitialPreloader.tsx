
'use client';

import React, { useState, useEffect } from 'react';

const InitialPreloader: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1200); // Duration of the initial preloader

        return () => clearTimeout(timer);
    }, []);

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

export default InitialPreloader;
