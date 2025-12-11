"use client";

import { useState, useCallback } from 'react';
import Header from '../components/Header';
import ElegantMenu from '../components/ElegantMenu';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ROI from '../components/ROI';
import LogoCodexCTA from '../components/LogoCodexCTA';
import Portfolio from '../components/Portfolio';
import WhyChooseMe from '../components/WhyChooseMe';
import Process from '../components/Process';
import Deliverables from '../components/Deliverables';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import AnimatedSectionWrapper from '../components/AnimatedSectionWrapper';

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const navigateTo = (path: string) => {
    const element = document.getElementById(path.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactIntent = (intent: string) => {
    setSelectedPackage(intent);
    navigateTo('#contacto');
  };

  const clearSelectedPackage = useCallback(() => setSelectedPackage(null), []);

  return (
    <div className="bg-white">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={navigateTo} />
      <ElegantMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={navigateTo} />
      <main>
        <Hero navigateTo={navigateTo} />
        <AnimatedSectionWrapper><About /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><Services onPackageSelect={handleContactIntent} /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><ROI /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><LogoCodexCTA /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><Portfolio onRequestProject={handleContactIntent} /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><WhyChooseMe /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><Process /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><Deliverables /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><FAQ /></AnimatedSectionWrapper>
        <AnimatedSectionWrapper><Contact selectedPackage={selectedPackage} clearSelectedPackage={clearSelectedPackage} /></AnimatedSectionWrapper>
        <Newsletter />
        <Footer />
      </main>
    </div>
  );
}
