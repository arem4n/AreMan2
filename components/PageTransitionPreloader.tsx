
'use client';

import React from 'react';

export const PageTransitionPreloader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
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

export default PageTransitionPreloader;
