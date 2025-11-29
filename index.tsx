
import React, { useState, useEffect, useLayoutEffect, useCallback, useRef, type PropsWithChildren, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import { portfolioProjects } from './constants'; // Imported to get project titles for SEO

// Import all components
import Preloader from './components/Preloader';
import Header from './components/Header';
import ElegantMenu from './components/ElegantMenu';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ROI from './components/ROI'; // Imported ROI
import LogoCodexCTA from './components/LogoCodexCTA';
import Portfolio from './components/Portfolio';
import WhyChooseMe from './components/WhyChooseMe';
import Process from './components/Process';
import Deliverables from './components/Deliverables';
import FAQ from './components/FAQ'; // Imported FAQ
import Contact from './components/Contact';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import LogoCodex from './components/LogoCodex';
import { BackArrowIcon } from './components/icons/CodexIcons';

// Lazy load Case Studies to improve initial load performance (Code Splitting)
const Arem4nCaseStudy = React.lazy(() => import('./components/casestudies/Arem4nCaseStudy'));
const Arem4nProfessionalCaseStudy = React.lazy(() => import('./components/casestudies/Arem4nProfessionalCaseStudy'));
const GenericCaseStudy = React.lazy(() => import('./components/casestudies/GenericCaseStudy'));
const OstTechCaseStudy = React.lazy(() => import('./components/casestudies/OstTechCaseStudy'));
const AlbornozCaseStudy = React.lazy(() => import('./components/casestudies/AlbornozCaseStudy'));
const SouthSoftCaseStudy = React.lazy(() => import('./components/casestudies/SouthSoftCaseStudy'));
const Bm3CaseStudy = React.lazy(() => import('./components/casestudies/Bm3CaseStudy'));
const TommyBoxCaseStudy = React.lazy(() => import('./components/casestudies/TommyBoxCaseStudy'));


type View = 'home' | 'logocodex' | 'case_study';

const AnimatedSectionWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.1
            }
        );

        const currentElement = ref.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </div>
    );
};

const renderCaseStudy = (slug: string) => {
    const CaseStudyComponent = (() => {
        switch (slug) {
            case 'areman-escudo-heraldico':
                return Arem4nCaseStudy;
            case 'arem4n-professional-brand':
                return Arem4nProfessionalCaseStudy;
            case 'osttech-cybersecurity':
                return OstTechCaseStudy;
            case 'albornoz-propiedades':
                return AlbornozCaseStudy;
            case 'southsoft-development':
                return SouthSoftCaseStudy;
            case 'bm3-constructora':
                return Bm3CaseStudy;
            case 'tommybox-training':
                return TommyBoxCaseStudy;
            default:
                return GenericCaseStudy;
        }
    })();

    // Wrap lazy components in Suspense with a mini-loader
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-symbolic-600"></div>
            </div>
        }>
            {slug === 'areman-escudo-heraldico' || 
             slug === 'arem4n-professional-brand' || 
             slug === 'osttech-cybersecurity' || 
             slug === 'albornoz-propiedades' || 
             slug === 'southsoft-development' || 
             slug === 'bm3-constructora' || 
             slug === 'tommybox-training' 
                ? <CaseStudyComponent /> 
                : <GenericCaseStudy slug={slug} />
            }
        </Suspense>
    );
};

const CaseStudyPageWrapper: React.FC<{ slug: string, navigateTo: (path: string) => void }> = ({ slug, navigateTo }) => {
     return (
        <div className="bg-deep-50 min-h-screen font-body pb-20 md:pb-0">
             {/* Desktop Floating Back Button */}
             <button
                onClick={() => navigateTo('#logocodex')}
                className="hidden md:flex fixed bottom-6 right-6 z-[1020] items-center justify-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white font-semibold py-3 px-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up"
                style={{ animationDelay: '900ms' }}
                aria-label="Volver a LogoCodex"
            >
                <BackArrowIcon className="w-5 h-5" />
                <span className="ml-2">Volver a LogoCodex</span>
            </button>

            {/* Mobile Sticky Conversion Bar (Expert Recommendation: Always Accessible CTA) */}
            <div className="md:hidden fixed bottom-0 left-0 w-full z-[1020] bg-white/95 backdrop-blur-md border-t border-deep-200 p-4 shadow-2xl flex justify-between items-center animate-fade-in-up">
                <button 
                    onClick={() => navigateTo('#logocodex')}
                    className="text-deep-600 hover:text-deep-800 p-2"
                    aria-label="Volver"
                >
                    <BackArrowIcon className="w-6 h-6" />
                </button>
                <button 
                    onClick={() => navigateTo('#contacto')}
                    className="bg-symbolic-600 text-white font-bold text-sm py-2.5 px-6 rounded-full shadow-lg active:scale-95 transition-transform"
                >
                    Quiero un resultado así
                </button>
            </div>

            <main className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
                {renderCaseStudy(slug)}
                 <section className="text-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white p-10 rounded-2xl shadow-xl animate-fade-in-up mt-16" style={{ animationDelay: '400ms' }}>
                    <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">¿Listo para crear tu propio símbolo?</h2>
                    <p className="text-lg text-symbolic-100 max-w-3xl mx-auto leading-relaxed">
                        Si esta forma de abordar el branding resuena contigo, conversemos sobre cómo podemos aplicar la metodología LogoCodex™ para construir el alma de tu marca y evitar la irrelevancia.
                    </p>
                     <button
                        onClick={() => navigateTo('#contacto')}
                        className="mt-8 inline-block bg-creative-500 hover:bg-creative-600 text-deep-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        Inicia tu Proyecto Simbólico
                    </button>
                </section>
            </main>
        </div>
    );
};

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPreloaderGone, setIsPreloaderGone] = useState(false);
    const [view, setView] = useState<View>('home');
    const [slug, setSlug] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

    // Dynamic SEO Title Management (Expert Recommendation: Professional Polish)
    useEffect(() => {
        if (view === 'home') {
            document.title = "AREM4N | Soberanía Visual & Branding Estratégico";
        } else if (view === 'logocodex') {
            document.title = "Metodología LogoCodex™ | El Libro de los Símbolos";
        } else if (view === 'case_study' && slug) {
            const project = portfolioProjects.find(p => p.slug === slug);
            if (project) {
                document.title = `Caso de Estudio: ${project.title} | AREM4N`;
            } else {
                document.title = "Caso de Estudio | AREM4N";
            }
        }
    }, [view, slug]);

    // Use useLayoutEffect to handle scrolling before paint, ensuring we start at the top
    useLayoutEffect(() => {
        // 1. Ensure robust scroll behavior on load
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        // Immediately force top scroll
        window.scrollTo(0, 0);

        // 2. Handle Hash Changes & Routing
        const handleHashChange = (e?: HashChangeEvent) => {
            const hash = window.location.hash.slice(1);
            const isInitialLoad = !e; // If no event is passed, it's the initial mount call

            const triggerPreloader = () => {
                setIsLoading(true);
                setIsPreloaderGone(false);
                setTimeout(() => setIsLoading(false), 800); // Shorter duration for navigation
                setTimeout(() => setIsPreloaderGone(true), 1300);
            };

            if (hash.startsWith('logocodex/')) {
                setView('case_study');
                setSlug(hash.replace('logocodex/', ''));
                if (!isInitialLoad) window.scrollTo(0, 0);
            } else if (hash === 'logocodex') {
                if (view !== 'logocodex') triggerPreloader();
                setView('logocodex');
                setSlug('');
                if (!isInitialLoad) window.scrollTo(0, 0);
            } else {
                // Home View logic
                const wasInHome = view === 'home';
                if (!wasInHome) triggerPreloader();
                setView('home');
                setSlug('');
                
                if (isInitialLoad) {
                    window.scrollTo(0, 0);
                    if (hash) {
                         try {
                            history.replaceState(null, '', window.location.pathname + window.location.search);
                        } catch (err) {
                            console.warn('Could not clear URL hash:', err);
                        }
                    }
                } else {
                    // Navigation within home page
                    if (hash) {
                        setTimeout(() => {
                             const element = document.getElementById(hash);
                             if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                             }
                        }, 100);
                    } else {
                         // Just #inicio or empty hash
                        window.scrollTo(0, 0);
                    }
                }
            }
        };

        handleHashChange(); // Run on mount
        window.addEventListener('hashchange', handleHashChange);

        // 3. Initial Preloader (Longer)
        const loadTimer = setTimeout(() => setIsLoading(false), 1800);
        const removeTimer = setTimeout(() => setIsPreloaderGone(true), 2300);
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            clearTimeout(loadTimer);
            clearTimeout(removeTimer);
        };
    }, []); 

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const navigateTo = (path: string) => {
        const performNav = () => {
            window.location.hash = path;
        };

        if (isMenuOpen) {
            toggleMenu();
            setTimeout(performNav, 400); 
        } else {
            performNav();
        }
    };
    
    const handleContactIntent = (intent: string) => {
        setSelectedPackage(intent);
        navigateTo('#contacto');
    };

    const clearSelectedPackage = useCallback(() => setSelectedPackage(null), []);

    useEffect(() => {
        document.documentElement.classList.toggle('modal-open', isMenuOpen);
        return () => {
            document.documentElement.classList.remove('modal-open');
        }
    }, [isMenuOpen]);

    const renderCurrentView = () => {
        switch(view) {
            case 'logocodex':
                return <LogoCodex navigateTo={navigateTo} />;
            case 'case_study':
                 return <CaseStudyPageWrapper slug={slug} navigateTo={navigateTo} />;
            case 'home':
            default:
                return (
                    <div className="bg-white">
                        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={navigateTo} />
                        <ElegantMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={navigateTo} />
                        <main>
                            <Hero navigateTo={navigateTo} />
                            <AnimatedSectionWrapper><About /></AnimatedSectionWrapper>
                            <AnimatedSectionWrapper><Services onPackageSelect={handleContactIntent} /></AnimatedSectionWrapper>
                            {/* Inserted ROI Section Here */}
                            <AnimatedSectionWrapper><ROI /></AnimatedSectionWrapper>
                            <AnimatedSectionWrapper><LogoCodexCTA navigateTo={navigateTo} /></AnimatedSectionWrapper>
                            <AnimatedSectionWrapper><Portfolio navigateTo={navigateTo} onRequestProject={handleContactIntent} /></AnimatedSectionWrapper>
                            <AnimatedSectionWrapper><WhyChooseMe /></AnimatedSectionWrapper>
                            <AnimatedSectionWrapper><Process /></AnimatedSectionWrapper>
                            <AnimatedSectionWrapper><Deliverables /></AnimatedSectionWrapper>
                            {/* Inserted FAQ Section Here */}
                            <AnimatedSectionWrapper><FAQ /></AnimatedSectionWrapper>
                            <AnimatedSectionWrapper><Contact selectedPackage={selectedPackage} clearSelectedPackage={clearSelectedPackage} /></AnimatedSectionWrapper>
                            <Newsletter />
                            <Footer />
                        </main>
                    </div>
                );
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isPreloaderGone && <Preloader isHiding={!isLoading} />}
            </AnimatePresence>
            <div className={`main-content-wrapper ${!isLoading ? 'visible' : ''}`}>
                 {renderCurrentView()}
            </div>
        </>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
