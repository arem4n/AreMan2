
'use client';

import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Portfolio from './Portfolio';
import Process from './Process';
import Contact from './Contact';
import Footer from './Footer';
import LogoCodexCTA from './LogoCodexCTA';
import AnimatedSectionWrapper from './AnimatedSectionWrapper';
import WhyChooseMe from './WhyChooseMe';
import ROI from './ROI';
import Deliverables from './Deliverables';
import FAQ from './FAQ';
import Newsletter from './Newsletter';
import ElegantMenu from './ElegantMenu';

const HomePageClient: React.FC = () => {
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const handlePackageSelect = (packageName: string) => {
        setSelectedPackage(packageName);
        const contactElement = document.getElementById('contacto');
        if (contactElement) {
            contactElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const clearSelectedPackage = () => {
        setSelectedPackage(null);
    };

    return (
        <>
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <ElegantMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <main>
                <AnimatedSectionWrapper>
                    <Hero onPackageSelect={handlePackageSelect} />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <About />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <WhyChooseMe />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <Services onPackageSelect={handlePackageSelect} />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <Portfolio />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <ROI />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <Process />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <Deliverables />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <LogoCodexCTA />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <FAQ />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <Contact selectedPackage={selectedPackage} clearSelectedPackage={clearSelectedPackage} />
                </AnimatedSectionWrapper>
                <AnimatedSectionWrapper>
                    <Newsletter />
                </AnimatedSectionWrapper>
            </main>
            <Footer />
        </>
    );
};

export default HomePageClient;
