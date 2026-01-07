
'use client';

import React from 'react';
import TransitionLink from '../TransitionLink';
import { BackArrowIcon } from '../icons/CodexIcons';

export const CaseStudyNav: React.FC = () => {
    return (
        <>
            <TransitionLink
                href="/logocodex"
                className="hidden md:flex fixed bottom-6 right-6 z-[1020] items-center justify-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white font-semibold py-3 px-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up"
                style={{ animationDelay: '900ms' }}
                aria-label="Volver a LogoCodex"
            >
                <BackArrowIcon className="w-5 h-5" />
                <span className="ml-2">Volver a LogoCodex</span>
            </TransitionLink>

            <div className="md:hidden fixed bottom-0 left-0 w-full z-[1020] bg-white/95 backdrop-blur-md border-t border-deep-200 p-4 shadow-2xl flex justify-between items-center animate-fade-in-up">
                <TransitionLink
                    href="/logocodex"
                    className="text-deep-600 hover:text-deep-800 p-2"
                    aria-label="Volver"
                >
                    <BackArrowIcon className="w-6 h-6" />
                </TransitionLink>
                <TransitionLink
                    href="/#contacto"
                    className="bg-symbolic-600 text-white font-bold text-sm py-2.5 px-6 rounded-full shadow-lg active:scale-95 transition-transform"
                >
                    Quiero un resultado así
                </TransitionLink>
            </div>
        </>
    );
};
