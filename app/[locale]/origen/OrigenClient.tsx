"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useReducedMotion, AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useLoading } from '@/components/LoadingContext';
import { useMenu } from '@/hooks/useMenu';
import Header from '@/components/Header';
import ElegantMenu from '@/components/ElegantMenu';
import Footer from '@/components/Footer';
import { HTimeline } from './components/HTimeline';
import { VTimeline } from './components/VTimeline';
import { Modal } from './components/Modal';
import { PeriodSection } from './components/PeriodSection';
import { DashboardSection } from './components/DashboardSection';
import { CTASection } from './components/CTASection';
import type { Period, ModalData } from './origen.types';

const PERIODS_ES: Period[] = [
  {
    id: 'infancia',
    year: 'Infancia',
    label: 'Puerto Montt',
    description: 'Deportes desde la infancia. Fútbol y básquetbol — aprender a operar en equipo y en individual antes de saber que eso era una habilidad.',
    newSkills: [],
    newStack: [],
    newSectors: []
  },
  {
    id: 'p2001',
    year: '2001–2005',
    label: 'Liceo Comercial de Puerto Montt',
    description: 'Técnico en Ventas. Adolescencia, música — guitarra y batería. Los primeros años entendiendo que vender no es convencer, es entender qué necesita el otro.',
    newSkills: ['Formación en ventas'],
    newStack: [],
    newSectors: []
  },
  {
    id: 'p2006',
    year: '2006–2008',
    label: 'INACAP — Gastronomía Internacional',
    description: 'La gastronomía enseña que la experiencia completa vale más que cualquier ingrediente por separado. Todo tiene que integrarse en algo que el cliente siente coherente.',
    newSkills: ['Narrativa estratégica (base)'],
    newStack: [],
    newSectors: []
  },
  {
    id: 'p2009',
    year: '2009–2016',
    label: 'Buenos Aires, formación',
    description: 'Diseño de Imagen y Sonido en la Universidad de Buenos Aires. Casi una década aprendiendo que cada elemento en pantalla tiene que justificar su existencia.',
    newSkills: ['Identidad de marca', 'Narrativa estratégica'],
    newStack: ['Adobe Suite', 'Canva'],
    newSectors: []
  },
  {
    id: 'p2016',
    year: '2016',
    label: 'Subsuelo Cultural — UBA',
    description: 'Coordinación del espacio cultural del centro de estudiantes. Logística, contabilidad, comunicación, gestión de talleristas, contacto con bandas, cartelería y control de caja — todo simultáneo.',
    newSkills: ['Formación corporativa', 'Automatización de procesos (versión analógica)'],
    newStack: [],
    newSectors: ['Cultural']
  },
  {
    id: 'p2018',
    year: '2018–2019',
    label: 'Cursos Autogestivos — UBA',
    description: 'Gestión de cursos creados en base a necesidades no cubiertas por la universidad. Contabilidad, mensualidades, coordinación con profesores, creación de nuevos cursos. Referente del Subsuelo para quienes llegaron después.',
    newSkills: ['Formación corporativa (consolida)'],
    newStack: [],
    newSectors: ['Educación']
  },
  {
    id: 'p2022',
    year: '2022',
    label: 'Vuelta a Chile — LogoCodeX™',
    description: 'De regreso a Puerto Montt con años de práctica y una pregunta: ¿cómo se hace visible lo que una empresa es realmente? La respuesta fue LogoCodeX™.',
    newSkills: ['Identidad de marca (consolida)', 'Narrativa estratégica (consolida)'],
    newStack: ['Midjourney', 'Figma', 'Adobe Suite completo'],
    newSectors: ['Inmobiliario (Albornoz)', 'Consultoría IT/Ingeniería (BM3)', 'Acuicultura/Tecnología (OST Tech)']
  },
  {
    id: 'p2024',
    year: '2025–2026',
    label: 'AREM4N escala',
    description: 'El sistema de identidad no alcanzaba. Los clientes necesitaban el software que operacionalizara lo que construimos juntos. TommyBox fue el primero.',
    newSkills: ['Desarrollo de software', 'Automatización de procesos'],
    newStack: ['React', 'Next.js', 'Firebase', 'Vercel', 'Tailwind CSS', 'Replicate', 'Claude', 'Gemini', 'ChatGPT', 'DeepSeek', 'Perplexity'],
    newSectors: ['Fitness/Entrenamiento funcional (TommyBox)', 'Consultoría ERP (SouthSoft)', 'Seguridad privada']
  },
  {
    id: 'p2026',
    year: '2026',
    label: '2026',
    description: 'Dashboard completo. Identidad, software y automatización como un sistema único.',
    newSkills: [],
    newStack: [],
    newSectors: [],
    isDashboard: true
  }
];

const PERIODS_EN: Period[] = [
  {
    id: 'infancia',
    year: 'Childhood',
    label: 'Puerto Montt',
    description: 'Sports from childhood. Football and basketball — learning to operate both as a team and individually before knowing that was a skill.',
    newSkills: [],
    newStack: [],
    newSectors: []
  },
  {
    id: 'p2001',
    year: '2001–2005',
    label: 'Liceo Comercial de Puerto Montt',
    description: 'Sales Technician. Adolescence, music — guitar and drums. The first years understanding that selling is not about convincing, it is about understanding what the other person needs.',
    newSkills: ['Sales training'],
    newStack: [],
    newSectors: []
  },
  {
    id: 'p2006',
    year: '2006–2008',
    label: 'INACAP — International Gastronomy',
    description: 'Gastronomy teaches that the complete experience is worth more than any single ingredient. Everything must integrate into something the client feels as coherent.',
    newSkills: ['Strategic narrative (base)'],
    newStack: [],
    newSectors: []
  },
  {
    id: 'p2009',
    year: '2009–2016',
    label: 'Buenos Aires, training',
    description: 'Image and Sound Design at the Universidad de Buenos Aires. Almost a decade learning that every element on screen must justify its existence.',
    newSkills: ['Brand identity', 'Strategic narrative'],
    newStack: ['Adobe Suite', 'Canva'],
    newSectors: []
  },
  {
    id: 'p2016',
    year: '2016',
    label: 'Subsuelo Cultural — UBA',
    description: 'Coordination of the student center cultural space. Logistics, accounting, communication, workshop management, band outreach, signage and cash control — all simultaneously.',
    newSkills: ['Corporate training', 'Process automation (analog)'],
    newStack: [],
    newSectors: ['Cultural']
  },
  {
    id: 'p2018',
    year: '2018–2019',
    label: 'Self-managed Courses — UBA',
    description: 'Management of courses created based on needs not covered by the university. Accounting, tuition collection, teacher coordination, creation of new courses. Reference for the Subsuelo for those who came later.',
    newSkills: ['Corporate training (consolidated)'],
    newStack: [],
    newSectors: ['Education']
  },
  {
    id: 'p2022',
    year: '2022',
    label: 'Return to Chile — LogoCodeX™',
    description: 'Back in Puerto Montt with years of practice and a question: how do you make visible what a company truly is? The answer was LogoCodeX™.',
    newSkills: ['Brand identity (consolidated)', 'Strategic narrative (consolidated)'],
    newStack: ['Midjourney', 'Figma', 'Adobe Suite (full)'],
    newSectors: ['Real estate (Albornoz)', 'IT/Engineering consulting (BM3)', 'Aquaculture/Technology (OST Tech)']
  },
  {
    id: 'p2024',
    year: '2025–2026',
    label: 'AREM4N scales',
    description: 'The identity system was not enough. Clients needed software to operationalize what we built together. TommyBox was the first.',
    newSkills: ['Software development', 'Process automation'],
    newStack: ['React', 'Next.js', 'Firebase', 'Vercel', 'Tailwind CSS', 'Replicate', 'Claude', 'Gemini', 'ChatGPT', 'DeepSeek', 'Perplexity'],
    newSectors: ['Fitness/Functional training (TommyBox)', 'ERP consulting (SouthSoft)', 'Private security']
  },
  {
    id: 'p2026',
    year: '2026',
    label: '2026',
    description: 'Complete dashboard. Identity, software and automation as a single system.',
    newSkills: [],
    newStack: [],
    newSectors: [],
    isDashboard: true
  }
];

const heroStrings = {
  es: { tagline: 'Identidades que justifican lo que cobrás.', status: 'Sistema activo' },
  en: { tagline: 'Identities that justify what you charge.', status: 'System active' }
};

export default function OrigenClient() {
  const { customNavigate } = useLoading();
  const { isMenuOpen, toggleMenu } = useMenu();
  const rm = useReducedMotion();
  const locale = useLocale();

  const PERIODS = locale === 'en' ? PERIODS_EN : PERIODS_ES;
  const hero = heroStrings[locale as 'es' | 'en'] ?? heroStrings.es;

  const [activePeriod, setActivePeriod] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const handleOpenModal = useCallback((data: ModalData, e: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = e.currentTarget;
    setModalData(data);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalData(null);
    if (triggerRef.current) {
      const el = triggerRef.current;
      setTimeout(() => { el.focus(); }, 50);
    }
  }, []);

  const sectionRefCallbacks = useMemo(() => {
    return PERIODS.map((_, idx) => (el: HTMLElement | null) => {
      sectionRefs.current[idx] = el;
    });
  }, [PERIODS]);

  const sectionOffsets = useRef<number[]>([]);
  const isScrollingRef = useRef(false);
  const programmaticTargetRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateOffsets = useCallback(() => {
    sectionOffsets.current = sectionRefs.current.map((section) => {
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      return window.scrollY + rect.top;
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateOffsets, 300);
    window.addEventListener('resize', updateOffsets);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateOffsets);
    };
  }, [updateOffsets]);

  useEffect(() => {
    const clearProgrammatic = (e: Event) => {
      if (isScrollingRef.current) return;
      if (e.type === 'mousedown' || e.type === 'pointerdown') {
        const target = e.target as HTMLElement;
        if (target && target.closest('nav[aria-label]')) return;
      }
      programmaticTargetRef.current = null;
    };

    window.addEventListener('wheel', clearProgrammatic, { passive: true });
    window.addEventListener('touchmove', clearProgrammatic, { passive: true });
    window.addEventListener('keydown', clearProgrammatic, { passive: true });
    window.addEventListener('mousedown', clearProgrammatic, { passive: true });

    return () => {
      window.removeEventListener('wheel', clearProgrammatic);
      window.removeEventListener('touchmove', clearProgrammatic);
      window.removeEventListener('keydown', clearProgrammatic);
      window.removeEventListener('mousedown', clearProgrammatic);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const heroHeight = heroRef.current ? heroRef.current.offsetHeight : 0;
      const isHeroVisible = scrollPosition <= (heroHeight - 80);

      let isPastCTA = false;
      if (ctaRef.current) {
        const ctaTop = scrollPosition + ctaRef.current.getBoundingClientRect().top;
        isPastCTA = scrollPosition + windowHeight >= ctaTop + 100;
      }

      setShowTimeline((prev) => {
        const next = !isHeroVisible && !isPastCTA;
        return prev !== next ? next : prev;
      });

      if (programmaticTargetRef.current !== null) return;

      const triggerPoint = 280;
      let currentActive = 0;

      if (windowHeight + scrollPosition >= documentHeight - 100) {
        currentActive = sectionRefs.current.length - 1;
      } else {
        const targetScroll = scrollPosition + triggerPoint;
        for (let i = 0; i < sectionOffsets.current.length; i++) {
          if (targetScroll >= sectionOffsets.current[i]) {
            currentActive = i;
          }
        }
      }

      setActivePeriod((prev) => prev !== currentActive ? currentActive : prev);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToPeriod = useCallback((idx: number) => {
    setActivePeriod(idx);
    isScrollingRef.current = true;
    programmaticTargetRef.current = idx;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    sectionRefs.current[idx]?.scrollIntoView({
      behavior: rm ? 'auto' : 'smooth',
      block: 'start',
    });

    const handleScrollEnd = () => {
      isScrollingRef.current = false;
      window.removeEventListener('scrollend', handleScrollEnd);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };

    window.addEventListener('scrollend', handleScrollEnd, { once: true });

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      window.removeEventListener('scrollend', handleScrollEnd);
    }, 1000);
  }, [rm]);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={customNavigate} />
      <ElegantMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} navigateTo={customNavigate} />
    <div className="min-h-screen bg-deep-50 overflow-x-clip">

      <div ref={heroRef} className="w-full bg-deep-900">
        <div className="pt-36 pb-20 px-6 md:px-8 lg:px-16 max-w-screen-xl mx-auto text-left">
          <motion.div
            initial={rm ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <h1 className="font-display text-fluid-hero font-bold uppercase leading-none tracking-tight text-deep-50">
              SERGIO ARELLANO MANQUE / AREM4N
            </h1>
            <p className="font-body text-base md:text-lg text-deep-100 opacity-80">
              {hero.tagline}
            </p>
            <div className="flex items-center gap-2.5 mt-2">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-green-400 opacity-90">
                {hero.status}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full bg-deep-50 text-deep-900">
        <HTimeline periods={PERIODS} active={activePeriod} onNode={scrollToPeriod} rm={rm} visible={showTimeline} />
        <VTimeline periods={PERIODS} active={activePeriod} onNode={scrollToPeriod} rm={rm} visible={showTimeline} />

        <div className="max-w-screen-xl mx-auto pl-[136px] pr-6 md:px-20 lg:px-24">
          {PERIODS.map((p, i) => {
            if (p.isDashboard) {
              return (
                <DashboardSection
                  key={p.id}
                  sectionRef={sectionRefCallbacks[i]}
                  rm={rm}
                  onOpenModal={handleOpenModal}
                />
              );
            }
            return (
              <PeriodSection
                key={p.id}
                period={p}
                sectionRef={sectionRefCallbacks[i]}
                rm={rm}
              />
            );
          })}

          <div ref={ctaRef}>
            <CTASection navigateTo={customNavigate} rm={rm} />
          </div>
        </div>

        <Footer />

        <AnimatePresence>
          {modalData && (
            <Modal
              title={modalData.title}
              body={modalData.body}
              onClose={handleCloseModal}
              rm={rm}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
