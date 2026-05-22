'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ModalData } from '../origen.types';

const SKILLS = [
  { label: 'Identidad de marca', percentage: 80, body: 'No es diseñar un logo. Es definir qué es real y único en tu empresa antes de que la máquina dibuje una sola línea. Sin eso, todo lo que viene después es decoración.' },
  { label: 'Narrativa estratégica', percentage: 90, body: 'Las empresas que no saben contar su historia dejan que otros la cuenten por ellas. Construyo el relato que hace que tu cliente entienda en segundos por qué vos y no otro.' },
  { label: 'Desarrollo de software', percentage: 70, body: 'Identificar qué es tu empresa es la mitad. La otra mitad es construir los sistemas que lo operacionalizan. Plataformas, automatizaciones, herramientas internas — en semanas, no en meses.' },
  { label: 'Automatización de procesos', percentage: 60, body: 'El trabajo que tu equipo hace manualmente y que consume tiempo sin agregar valor es el primer problema que resuelvo. Si se puede sistematizar, se sistematiza.' },
  { label: 'Formación corporativa', percentage: 40, body: 'De nada sirve implementar IA en una empresa si el equipo no sabe cómo operar con ella. Capacito equipos para que el sistema funcione sin que yo tenga que estar presente.' }
];

const SECTORS = [
  { label: 'Fitness / Entrenamiento funcional', body: 'Construí TommyBox — plataforma completa de gestión para un box de entrenamiento funcional. Reservas, gamificación, analítica, feedback con IA. Desde cero, en producción con atletas reales.' },
  { label: 'Consultoría ERP', body: 'Rediseñé la identidad y presencia digital de SouthSoft, consultora de sistemas ERP para empresas del sur de Chile. Identidad, web y automatización de contenido para redes sociales.' },
  { label: 'Seguridad privada', body: 'Landing page de captación para agencia de seguridad en Puerto Montt. Con proyección de cotizador inteligente y plataforma interna de gestión de guardias y turnos como siguiente fase.' },
  { label: 'Retail y operaciones', body: 'Herramientas operativas para equipos de venta — trackers dinámicos, assets comerciales, generación de contenido para campañas. Construidas desde adentro, con experiencia real de piso de ventas.' },
  { label: 'Inmobiliario', body: 'Identidad de marca para Albornoz Propiedades bajo metodología LogoCodeX™. Símbolo con doble lectura: estructura arquitectónica e inicial integrada. Posicionamiento en un mercado donde todas las inmobiliarias se ven iguales.' },
  { label: 'Acuicultura / Tecnología', body: 'Identidad para OST Tech — software de mantenimiento para salmoneras. Engranaje orgánico que fusiona mecánica industrial con fluidez acuática. La S de Stormasen vive dentro del mecanismo como el alma dentro de la máquina.' },
  { label: 'Consultoría IT / Ingeniería', body: 'Identidad para BM3 Servicios — empresa familiar de consultoría IT e ingeniería. Triqueta celta con tratamiento isométrico industrial. Tres elementos entrelazados que representan la familia, las iniciales y la solidez estructural simultáneamente.' }
];

const STACK_GROUPS = [
  {
    category: 'Desarrollo',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    tools: ['React', 'Next.js', 'Firebase', 'Vercel', 'Tailwind CSS', 'Replicate'],
    body: 'El stack técnico con el que construyo productos reales. No frameworks de demo — herramientas que están corriendo en producción ahora mismo.'
  },
  {
    category: 'Inteligencia Artificial',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>,
    tools: ['Claude', 'Gemini', 'ChatGPT', 'DeepSeek', 'Perplexity', 'Llama', 'Copilot', 'Kimi', 'Grok'],
    body: 'No uso una sola IA. Orquesto múltiples modelos según lo que cada tarea necesita. Eso es lo que permite velocidad y calidad simultáneamente.'
  },
  {
    category: 'Creativo',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.02245 19.1672 5.08514 19.4144 5.01313 19.6354L4.5 21.2C4.38283 21.558 4.70782 21.897 5.06873 21.7968L7.00977 21.2576C7.22896 21.1968 7.46555 21.2581 7.6322 21.4135C8.89764 21.7963 10.3703 22 12 22z" /></svg>,
    tools: ['Adobe Suite', 'Canva', 'Midjourney', 'DALL-E', 'Runway', 'Affinity', 'Sora', 'Veo', 'LTX', 'ElevenLabs', 'HeyGen', 'Nano Banana Pro'],
    body: 'La capa visual no es accesoria. Es donde la identidad se vuelve tangible. Estas herramientas son el puente entre el concepto y lo que el cliente ve.'
  }
];

const EDUCATION = [
  { title: 'Diseño de Imagen y Sonido', institution: 'Universidad de Buenos Aires', body: 'El cine enseña que cada elemento en pantalla tiene que justificar su existencia. Aplicado a marcas: nada en tu identidad es decoración. Todo comunica con intención o comunica en tu contra.' },
  { title: 'Gastronomía Internacional', institution: 'INACAP', body: 'La gastronomía enseña que la experiencia completa vale más que cualquier ingrediente por separado. Una marca funciona igual — no es el logo, no es el copy, no es el color. Es cómo todo eso se integra en algo que el cliente siente coherente.' },
  { title: 'Técnico en Ventas', institution: 'Liceo Comercial de Puerto Montt', body: 'Sé lo que es estar frente a un cliente con una meta encima. Por eso no diseño identidades que se ven bien en portafolio pero no cierran una venta real.' }
];

const TRAYECTORIA = [
  { year: '2016', label: 'Subsuelo Cultural — UBA', shortDesc: 'Coordinación cultural · Eventos · Logística · Comunicación', body: 'Antes de construir plataformas digitales, coordiné el Subsuelo Cultural de la UBA — espacio de eventos con bandas en vivo, talleres semanales y operación autogestionada. Logística, contabilidad, comunicación, gestión de talleristas, contacto con bandas, cartelería, redes sociales y control de caja — todo simultáneo, todo con resultados reales. No aprendí a operar sistemas complejos con IA. Aprendí antes.' },
  { year: '2018–2019', label: 'Cursos Autogestivos — UBA', shortDesc: 'Gestión educativa · Contabilidad · Creación de oferta · Difusión', body: 'Gestioné los cursos autogestivos del centro de estudiantes — espacios de formación creados en base a necesidades que la universidad no cubría. Contabilidad de alumnos, cobro de mensualidades, coordinación con profesores, creación de nuevos cursos y difusión. Mientras coordinada los cursos, seguía siendo referente del Subsuelo para quienes llegaron después — porque ya había operado el sistema. Lo que aprendí ahí no fue administración — fue identificar qué le falta a un sistema y construir lo que falta. Eso no cambió.' }
];

const SIGNALS = [
  {
    label: 'Guitarra',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-symbolic-600">
        <path d="m16 9.5 3-3" /><path d="M9 22c-1.5 0-3-1-3-3s1.5-3 3-3 3 1 3 3-1.5 3-3 3Z" />
        <path d="M9 16c-1.5 0-3-1.5-3-3.5S7.5 9 9 9c1.6 0 3 1.6 3 3.5S10.5 16 9 16Z" />
        <path d="m14 11.5 6-6" /><path d="M18.5 7 21 4.5" /><path d="M17 5.5 19.5 3" />
      </svg>
    ),
    body: 'Exige disciplina, precisión técnica y un sentido riguroso de la estructura. Es el balance entre la técnica rigurosa y la expresión creativa.'
  },
  {
    label: 'Batería',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-symbolic-600">
        <path d="m2 2 8 8" /><path d="m22 2-8 8" /><ellipse cx="12" cy="9" rx="10" ry="5" />
        <path d="M7 13.4v7.9" /><path d="M12 14v8" /><path d="M17 13.4v7.9" />
        <path d="M2 9v8a10 5 0 0 0 20 0V9" />
      </svg>
    ),
    body: 'El tempo y la base rítmica que sostiene a todo ensamble. Representa la consistencia, la coordinación independiente y la fuerza que da estructura global.'
  },
  {
    label: 'Fútbol',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-symbolic-600">
        <circle cx="12" cy="12" r="10" /><path d="M12 7.5L8.5 10v4l3.5 2.5 3.5-2.5v-4z" />
        <path d="M12 2v5.5" /><path d="M12 22v-5.5" /><path d="M2 12h6.5" /><path d="M22 12h-6.5" />
        <path d="m5.5 5.5 3 2" /><path d="m18.5 5.5-3 2" /><path d="m5.5 18.5 3-2" /><path d="m18.5 18.5-3-2" />
      </svg>
    ),
    body: 'Estrategia colectiva, lectura del espacio y coordinación grupal en tiempo real. Representa la capacidad de operar en equipo hacia un objetivo común.'
  },
  {
    label: 'Básquetbol',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-symbolic-600">
        <circle cx="12" cy="12" r="10" /><path d="M4.9 4.9 Q 10 12 4.9 19.1" />
        <path d="M19.1 4.9 Q 14 12 19.1 19.1" /><path d="M2 12h20" /><path d="M12 2v20" />
      </svg>
    ),
    body: 'Transiciones rápidas, precisión en espacios reducidos y agilidad táctica bajo presión. Representa la adaptabilidad y la toma de decisiones inmediata.'
  },
  {
    label: 'Herencia Mapuche',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-symbolic-600"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
    body: 'Una perspectiva no occidental sobre identidad y territorio. Entiende que la identidad genuina no se construye de afuera hacia adentro.'
  },
  {
    label: 'Años de experiencia en ventas de piso',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-symbolic-600"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    body: 'No es teoría. Es meta encima todos los días, cliente enfrente, cierre real. Eso es lo que diferencia un sistema de identidad que se ve bien en portafolio de uno que funciona cuando hay dinero en juego.'
  },
  {
    label: 'Gastronomía internacional',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-symbolic-600"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>,
    body: 'Los detalles hacen la diferencia. Siempre.'
  },
  {
    label: 'Pensamiento no-linear',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-symbolic-600"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" /><path d="M6 21a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3z" /></svg>,
    body: 'Conecta sistemas, narrativa y tecnología simultáneamente. Ve el problema completo antes de tocar una sola parte.'
  }
];

export const DashboardSection = React.memo(function DashboardSection({
  sectionRef,
  rm,
  onOpenModal,
}: {
  sectionRef: (el: HTMLElement | null) => void;
  rm: boolean | null;
  onOpenModal: (data: ModalData, e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <section
      ref={sectionRef}
      id="period-p2026"
      className="py-12 md:py-16 border-b border-symbolic-600/10"
    >
      <motion.div
        initial={rm ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full"
      >
        <div className="mb-10 max-w-3xl">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-display text-sm font-bold uppercase tracking-[0.15em] text-symbolic-600">
              2026
            </span>
            <span className="font-body text-sm font-semibold text-deep-500">
              Presente
            </span>
          </div>
          <h2 className="font-display text-fluid-section font-bold uppercase text-deep-900 leading-none mb-3">
            Dashboard Completo
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed text-deep-900 opacity-90 max-w-2xl">
            Identidad, software y automatización como un sistema único.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          {/* COMPETENCIAS */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-xl p-6 border border-symbolic-500/10 shadow-sm h-full">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-symbolic-600/70 mb-6">
                Competencias
              </h3>
              <div className="flex flex-col gap-6">
                {SKILLS.map((skill) => (
                  <button
                    key={skill.label}
                    onClick={(e) => onOpenModal({ title: skill.label, body: skill.body }, e)}
                    className="w-full text-left flex flex-col gap-2 group cursor-pointer focus:outline-none"
                    style={{ minHeight: '44px' }}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="font-body text-sm font-semibold text-deep-900 group-hover:text-symbolic-600 transition-colors">
                        {skill.label}
                      </span>
                      <span className="font-display text-sm font-bold text-symbolic-600">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-symbolic-100/50 rounded-full overflow-hidden border border-symbolic-200/20">
                      <motion.div
                        className="h-full bg-gradient-to-r from-symbolic-600 to-creative-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: rm ? 0 : 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTORES */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-xl p-6 border border-symbolic-500/10 shadow-sm h-full">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-symbolic-600/70 mb-6">
                Sectores
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {SECTORS.map((sec) => (
                  <button
                    key={sec.label}
                    onClick={(e) => onOpenModal({ title: sec.label, body: sec.body }, e)}
                    className="font-body text-xs font-semibold px-4 py-2.5 rounded-full border border-symbolic-200 bg-symbolic-50/50 text-deep-800 hover:border-symbolic-500 hover:bg-symbolic-50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
                    style={{ minHeight: '44px' }}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STACK */}
          <div className="md:col-span-12">
            <div className="bg-white rounded-xl p-6 border border-symbolic-500/10 shadow-sm">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-symbolic-600/70 mb-6">
                Stack Tecnológico
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {STACK_GROUPS.map((group) => (
                  <div key={group.category} className="flex flex-col gap-4">
                    <button
                      onClick={(e) => onOpenModal({ title: group.category, body: group.body }, e)}
                      className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
                      style={{ minHeight: '44px' }}
                    >
                      <span className="text-symbolic-500 group-hover:text-symbolic-600 transition-colors">
                        {group.icon}
                      </span>
                      <span className="font-display text-sm font-bold uppercase tracking-wider text-deep-700 group-hover:text-symbolic-600 transition-colors">
                        {group.category}
                      </span>
                    </button>
                    <div className="flex flex-wrap gap-1.5">
                      {group.tools.map((t) => (
                        <span
                          key={t}
                          className="font-body text-xs px-3 py-1.5 rounded-full bg-deep-50 border border-deep-200 text-deep-700 font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FORMACIÓN */}
          <div className="md:col-span-6">
            <div className="bg-white rounded-xl p-6 border border-symbolic-500/10 shadow-sm h-full">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-symbolic-600/70 mb-6">
                Formación
              </h3>
              <div className="flex flex-col">
                {EDUCATION.map((edu, idx) => (
                  <React.Fragment key={edu.title}>
                    <button
                      onClick={(e) => onOpenModal({ title: edu.title, body: edu.body }, e)}
                      className="w-full text-left py-4 flex flex-col gap-1 group cursor-pointer focus:outline-none"
                      style={{ minHeight: '44px' }}
                    >
                      <span className="font-body text-sm font-semibold text-deep-900 group-hover:text-symbolic-600 transition-colors">
                        {edu.title}
                      </span>
                      <span className="font-body text-xs font-medium text-deep-400">
                        {edu.institution}
                      </span>
                    </button>
                    {idx < EDUCATION.length - 1 && (
                      <div className="h-[1px] bg-symbolic-500/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* TRAYECTORIA */}
          <div className="md:col-span-6">
            <div className="bg-white rounded-xl p-6 border border-symbolic-500/10 shadow-sm h-full">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-symbolic-600/70 mb-6">
                Trayectoria
              </h3>
              <div className="flex flex-col gap-4">
                {TRAYECTORIA.map((tray) => (
                  <button
                    key={tray.label}
                    onClick={(e) => onOpenModal({ title: `${tray.label} (${tray.year})`, body: tray.body }, e)}
                    className="w-full text-left flex items-start gap-4 p-4 rounded-lg border border-symbolic-100 bg-symbolic-50/20 hover:border-symbolic-500 hover:bg-symbolic-50/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer focus:outline-none"
                    style={{ minHeight: '44px' }}
                  >
                    <span className="font-display text-sm font-bold text-symbolic-600 mt-0.5 min-w-[75px]">
                      {tray.year}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body text-sm font-bold text-deep-900 group-hover:text-symbolic-600 transition-colors">
                        {tray.label}
                      </span>
                      <span className="font-body text-xs text-deep-400">
                        {tray.shortDesc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SEÑALES */}
          <div className="md:col-span-12">
            <div className="bg-white rounded-xl p-6 border border-symbolic-500/10 shadow-sm">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-symbolic-600/70 mb-6">
                Señales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SIGNALS.map((sig) => (
                  <button
                    key={sig.label}
                    onClick={(e) => onOpenModal({ title: sig.label, body: sig.body }, e)}
                    className="flex items-center gap-4 p-4 rounded-lg border border-symbolic-100 bg-white hover:border-symbolic-500 hover:scale-[1.02] hover:shadow-md active:scale-[0.99] transition-all duration-300 text-left group cursor-pointer focus:outline-none"
                    style={{ minHeight: '44px' }}
                  >
                    <span className="flex-shrink-0">{sig.icon}</span>
                    <span className="font-body text-xs font-bold text-deep-900 group-hover:text-symbolic-600 transition-colors leading-snug">
                      {sig.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
});
