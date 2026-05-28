"use client";

import { useState, useCallback, useEffect } from 'react';
import { useLoading } from '@/components/LoadingContext';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { useMenu } from '@/hooks/useMenu';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import ElegantMenu from '@/components/ElegantMenu';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import WhyChooseMe from '@/components/WhyChooseMe';
import Process from '@/components/Process';
import Deliverables from '@/components/Deliverables';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import LogoCodexTeaser from '@/components/LogoCodexTeaser';

export default function HomePageClient() {
    const { isMenuOpen, toggleMenu } = useMenu();
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const { customNavigate } = useLoading();
    const t = useTranslations('HomePage');

    useEffect(() => {
        const scrollToSection = sessionStorage.getItem(STORAGE_KEYS.scrollToSection);
        if (scrollToSection) {
            sessionStorage.removeItem(STORAGE_KEYS.scrollToSection);
            const id = scrollToSection.startsWith('#') ? scrollToSection.substring(1) : '';
            if (id) {
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            }
        }
    }, []);

    const handleContactIntent = (intent: string) => {
        setSelectedPackage(intent);
        customNavigate('#contacto');
    };

    const clearSelectedPackage = useCallback(() => setSelectedPackage(null), []);

    return (
        <div className="bg-white">
            <a
                href="#inicio"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-symbolic-600 focus:text-white focus:rounded-lg focus:font-semibold"
            >
                {t('skipContent')}
            </a>
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={customNavigate} />
            <ElegantMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={customNavigate} />
            <main>
                <Hero navigateTo={customNavigate} />
                <About />
                <Services onPackageSelect={handleContactIntent} />
                <LogoCodexTeaser navigateTo={customNavigate} />
                <Portfolio onRequestProject={handleContactIntent} navigateTo={customNavigate} />
                <WhyChooseMe />
                <Process />
                <Deliverables />
                <FAQ />
                <Contact selectedPackage={selectedPackage} clearSelectedPackage={clearSelectedPackage} />
                <Newsletter />
                <Footer />
            </main>
        </div>
    );
}
