
'use client';

import React from 'react';
import { useLoading } from '@/components/LoadingContext';
import { BackArrowIcon } from '@/components/icons/CodexIcons';
import { STORAGE_KEYS } from '@/lib/storageKeys';

// FIX: Changed props type to React.PropsWithChildren to correctly handle `children` prop from a Server Component.
export default function CaseStudyLayout({ children }: React.PropsWithChildren) {
    const { customNavigate } = useLoading();

    const navigateTo = (path: string) => {
        if (path.startsWith('#')) {
            sessionStorage.setItem(STORAGE_KEYS.scrollToSection, path);
            customNavigate('/');
        } else {
            customNavigate(path);
        }
    };
    
    return (
         <div className="bg-deep-50 min-h-screen font-body overflow-x-hidden">
             <button
                onClick={() => customNavigate('/portafolio')}
                className="fixed bottom-6 right-6 z-[99] flex items-center justify-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white font-semibold py-3 px-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up"
                style={{ animationDelay: '900ms' }}
                aria-label="Volver a LogoCodex"
            >
                <BackArrowIcon className="w-5 h-5" />
                <span className="hidden sm:inline ml-2">Volver a LogoCodex</span>
            </button>
            
            <main className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
                {children}

                <section className="text-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white p-10 rounded-2xl shadow-xl animate-fade-in-up mt-16" style={{ animationDelay: '400ms' }}>
                    <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">¿Listo para codificar tu propia identidad?</h2>
                    <p className="text-lg text-symbolic-100 max-w-3xl mx-auto leading-relaxed">
                        No dejes que tu marca sea un &quot;average&quot; de la industria. Apliquemos el sistema LogoCodex™ para construir una identidad soberana.
                    </p>
                     <button
                        onClick={() => navigateTo('#contacto')}
                        className="mt-8 inline-block bg-creative-500 hover:bg-creative-600 text-deep-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        Solicitar Auditoría de Proyecto
                    </button>
                </section>
            </main>
        </div>
    );
}
