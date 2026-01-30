"use client";

import { useState, useCallback, useEffect } from 'react';
import { useLoading } from '@/components/LoadingContext';
import Header from '@/components/Header';
import ElegantMenu from '@/components/ElegantMenu';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ROI from '@/components/ROI';
import LogoCodexCTA from '@/components/LogoCodexCTA';
import Portfolio from '@/components/Portfolio';
import WhyChooseMe from '@/components/WhyChooseMe';
import Process from '@/components/Process';
import Deliverables from '@/components/Deliverables';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { customNavigate } = useLoading();

  // Effect to handle scrolling to section after navigation from a different page
  useEffect(() => {
    const scrollToSection = sessionStorage.getItem('scrollToSection');
    if (scrollToSection) {
      sessionStorage.removeItem('scrollToSection');
      const id = scrollToSection.startsWith('#') ? scrollToSection.substring(1) : '';
      if (id) {
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300); // Slight delay to ensure content is rendered
      }
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const navigateTo = (path: string) => {
    customNavigate(path);
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
        <About />
        <Services onPackageSelect={handleContactIntent} />
        <ROI />
        <LogoCodexCTA navigateTo={navigateTo} />
        <Portfolio onRequestProject={handleContactIntent} navigateTo={navigateTo} />
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
