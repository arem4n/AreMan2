"use client";

import React from 'react';
import { useLoading } from '@/components/LoadingContext';
import { BackArrowIcon } from '@/components/icons/CodexIcons';
import Footer from '@/components/Footer';
import { TheMoment } from '@/components/origen/TheMoment';
import { CinemaConfirmed } from '@/components/origen/CinemaConfirmed';
import { TheRupture } from '@/components/origen/TheRupture';
import { BackToSouth } from '@/components/origen/BackToSouth';
import { TheMethod } from '@/components/origen/TheMethod';
import { WhyItMatters } from '@/components/origen/WhyItMatters';

export default function OrigenPage() {
    const { customNavigate } = useLoading();

    return (
        <div
            className="min-h-screen font-body text-deep-100 overflow-x-hidden selection:bg-symbolic-500/30 bg-deep-900"
        >
            {/* Minimal Header / Back Button */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => customNavigate('/')}
                    className="pointer-events-auto flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 text-white p-3 rounded-full hover:bg-white/10 transition-all group"
                    aria-label="Volver al Inicio"
                >
                    <BackArrowIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="hidden md:inline ml-2 text-sm font-bold uppercase tracking-widest">Volver</span>
                </button>
            </nav>

            <main className="relative z-10">
                <TheMoment />
                <CinemaConfirmed />
                <TheRupture />
                <BackToSouth />
                <TheMethod />
                <WhyItMatters />
            </main>

            <Footer />
        </div>
    );
}
