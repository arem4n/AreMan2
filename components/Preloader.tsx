import React from 'react';

interface PreloaderProps {
    isHiding: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isHiding }) => {
    return (
        <div id="preloader" className={isHiding ? 'preloader-hiding' : ''}>
            <div className="preloader-container">
                <div className="preloader-spinner"></div>
                <div
                    className="preloader-logo"
                    role="img"
                    aria-label="Logotipo de AREM4N"
                ></div>
            </div>
        </div>
    );
};

export default Preloader;