
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-deep-900 text-deep-400 py-8 text-center">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-2xl font-display font-bold text-symbolic-500 mb-2">AREM4N</div>
                <p className="text-sm mb-4">&quot;Cada símbolo cuenta una historia. Cada diseño tiene alma. Cada marca puede trascender.&quot;</p>
                <p className="text-sm font-light text-creative-400 font-semibold mb-2">Sergio Arellano</p>
                <p className="text-sm font-light">- AreMan, {currentYear}</p>
                <p className="text-sm mt-4">&copy; {currentYear} AREM4N - Diseño Simbólico & Narrativa Visual</p>
            </div>
        </footer>
    );
};

export default Footer;
