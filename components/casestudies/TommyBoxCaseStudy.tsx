'use client';
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { useLocale } from 'next-intl';
import { BrowserMockup } from '../BrowserMockup';

const TOMMYBOX_APP_URL = 'https://tommybox.cl';

const SectionTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <h2 className={`text-3xl lg:text-4xl font-display font-bold text-center mb-12 text-deep-800 ${className}`}>{children}</h2>
);

const SubSectionTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <h3 className={`text-2xl lg:text-3xl font-display font-bold mt-8 mb-6 text-deep-800 ${className}`}>{children}</h3>
);

const Block: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-deep-100 mb-8 ${className}`}>
        {children}
    </div>
);

const P: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <p className={`text-deep-800 leading-relaxed mb-4 ${className}`}>{children}</p>
);

const UL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ul className="list-disc list-inside space-y-2 text-deep-800 mb-4">{children}</ul>
);

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <strong className="font-semibold text-deep-800">{children}</strong>
);

const ImageDisplay: React.FC<{ src: string, alt: string, caption: string }> = ({ src, alt, caption }) => (
    <figure className="my-8">
        <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-50" />
        <figcaption className="text-center text-sm text-deep-600 mt-2 italic">{caption}</figcaption>
    </figure>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const content = {
    es: {
        headerTitle: 'Energía Funcional',
        headerSub: 'Identidad visual para un espacio de entrenamiento de alto rendimiento.',
        s1Title: '1. BRIEFING Y CONTEXTO',
        s1ClientLabel: 'Cliente:', s1Client: 'Gustavo Arellano Manque.',
        s1IndustryLabel: 'Industria:', s1Industry: 'Fitness / Entrenamiento Funcional.',
        s1GoalLabel: 'Objetivo:', s1Goal: 'Crear una marca que transmitiera fuerza, comunidad y profesionalismo, alejándose de la estética agresiva típica de los gimnasios tradicionales ("No pain no gain") y acercándose a una visión más inteligente y funcional del movimiento.',
        s2Title: '2. SOLUCIÓN GRÁFICA',
        s2Sub1: 'Evolución: De la V1 a la Versión Final',
        s2P1: 'El proyecto pasó por una etapa inicial (V1) donde se utilizó una paleta verde y negra, con un enfoque más tradicional. Esta versión sirvió como base para entender que la marca necesitaba más energía y distinción.',
        s2Caption1: 'Versión 1 (Histórica): Paleta verde/negro, más tradicional.',
        s2Sub2: 'Logotipo y Símbolo (V2 Final)',
        s2P2: 'Se desarrolló un imagotipo que combina una tipografía robusta y moderna con un símbolo abstracto que sugiere una "Caja" (Box) abierta y dinámica, cambiando radicalmente a un Azul Eléctrico para diferenciación.',
        s2Li1Label: 'La Caja (Box):', s2Li1: ' Referencia directa al nombre y al tipo de espacio físico (Box de entrenamiento).',
        s2Li2Label: 'Dinamismo:', s2Li2: ' Las líneas no son cerradas, sugiriendo movimiento, entrada y salida de energía.',
        s2Li3Label: 'Tipografía:', s2Li3: ' Sans-serif bold, sólida y legible, para maximizar la visibilidad en aplicaciones físicas (paredes, poleras).',
        s2Caption2: 'Isotipo y Logotipo principal final (V2).',
        s3Title: '3. ARQUETIPOS DE MARCA',
        s3Li1Label: '1. El Héroe (Primario):', s3Li1: ' Superación personal, disciplina y logro de metas físicas.',
        s3Li2Label: '2. El Amigo (Secundario):', s3Li2: ' Comunidad, pertenencia a la "tribu" del box. Accesible y motivador.',
        s4Title: '4. VISUALIZACIÓN EN CONTEXTO',
        s4P: 'El diseño no vive solo en pantallas; habita el espacio físico y la indumentaria de la comunidad. La marca se integra en el entorno real donde ocurre la transformación.',
        s4Caption1: 'El espacio físico real donde se desarrolló el método. La identidad visual habita el gimnasio.',
        s4Caption2: 'Aplicación de la marca en indumentaria oficial (Poleras).',
        s4Caption3: 'Versatilidad del diseño: Adaptación a diferentes colores de indumentaria.',
        s4Caption4: 'Extensión de marca: Merchandising funcional para la comunidad.',
        s5Title: '5. LA PLATAFORMA DIGITAL',
        s5P1Pre: 'El logo fue el primer acto. Pero una marca sin herramientas no sostiene una comunidad. Por eso construimos la plataforma que TommyBox necesitaba para operar: ',
        s5P1Bold: 'una web app completa, en producción, usada por clientes reales',
        s5P1Post: '.',
        s5P2: 'El desafío no era técnico, era humano: ¿cómo hacés que alguien vuelva a entrenar mañana, y pasado, y la semana que viene? La respuesta estuvo en diseñar cada función pensando en ese momento de decisión.',
        feat1Tag: 'Reserva de sesiones',
        feat1Body: 'Sin WhatsApp, sin llamadas. El cliente abre la app, ve la semana, elige su horario y confirma en segundos. Gustavo ve su agenda en tiempo real.',
        feat1Tech: 'Firestore en tiempo real · reglas de negocio server-side via Cloud Functions',
        feat2Tag: 'Motor de gamificación',
        feat2Body: 'Cada sesión acumula XP. Cada racha desbloquea insignias. Hay una tabla de líderes mensual. El entrenamiento tiene memoria y recompensa la constancia.',
        feat2Tech: 'Lógica centralizada en constantes compartidas · recálculo autoritativo en el servidor',
        feat3Tag: 'Dos mundos en una plataforma',
        feat3Body: 'Gustavo ve el historial completo, métricas por cliente y controla la agenda. El cliente ve su propio progreso. Misma app, dos realidades completamente distintas.',
        feat3Tech: 'Sistema de roles con rutas protegidas · Google OAuth + email',
        feat4Tag: 'La app que avisa y celebra',
        feat4Body: 'Recordatorios antes de cada sesión. Notificaciones cuando se sube de nivel. Pequeños momentos que refuerzan el hábito sin ser invasivos.',
        feat4Tech: 'Firebase Cloud Messaging · notificaciones push nativas en móvil y desktop',
        engTitle: 'Las decisiones de ingeniería',
        engBodyPre: 'Cada tecnología del stack fue una elección deliberada, no un default. ',
        engBodyPost: ' para deploy continuo y distribución global desde el día uno.',
        engStack: 'React 19 · Firebase (Auth · Firestore · Storage · Cloud Functions Gen 2) · TypeScript · Tailwind CSS · Vercel',
        productionNote: 'Plataforma en producción — explora las vistas principales.',
        altAgendaDesktop: 'Agenda Semanal — Desktop',
        altChampsDesktop: 'Salón de Campeones — Desktop',
        altFeedDesktop: 'Feed de Comunidad — Desktop',
        altPlansDesktop: 'Planes de Entrenamiento — Desktop',
        altAchievDesktop: 'Logros y Gamificación — Desktop',
        altProfileDesktop: 'Mi Perfil — Desktop',
        altAgendaMobile: 'Agenda Semanal — Mobile',
        altChampsMobile: 'Salón de Campeones — Mobile',
        altFeedMobile: 'Feed de Comunidad — Mobile',
        altPlansMobile: 'Planes de Entrenamiento — Mobile',
        altAchievMobile: 'Logros y Gamificación — Mobile',
        altProfileMobile: 'Mi Perfil — Mobile',
    },
    en: {
        headerTitle: 'Functional Energy',
        headerSub: 'Visual identity for a high-performance training space.',
        s1Title: '1. BRIEFING & CONTEXT',
        s1ClientLabel: 'Client:', s1Client: 'Gustavo Arellano Manque.',
        s1IndustryLabel: 'Industry:', s1Industry: 'Fitness / Functional Training.',
        s1GoalLabel: 'Goal:', s1Goal: 'Create a brand that conveyed strength, community and professionalism, moving away from the aggressive aesthetic typical of traditional gyms ("No pain no gain") and embracing a smarter, more functional vision of movement.',
        s2Title: '2. GRAPHIC SOLUTION',
        s2Sub1: 'Evolution: From V1 to the Final Version',
        s2P1: 'The project went through an initial stage (V1) using a green and black palette with a more traditional approach. This version served as a foundation to understand that the brand needed more energy and distinction.',
        s2Caption1: 'Version 1 (Historical): Green/black palette, more traditional.',
        s2Sub2: 'Logotype & Symbol (V2 Final)',
        s2P2: 'An imagotype was developed combining a robust, modern typeface with an abstract symbol suggesting an open, dynamic "Box", radically switching to Electric Blue for differentiation.',
        s2Li1Label: 'The Box:', s2Li1: ' Direct reference to the name and the type of physical space (training box).',
        s2Li2Label: 'Dynamism:', s2Li2: ' The lines are not closed, suggesting movement, energy in and out.',
        s2Li3Label: 'Typography:', s2Li3: ' Bold sans-serif, solid and legible, to maximize visibility in physical applications (walls, jerseys).',
        s2Caption2: 'Final main logotype and isotope (V2).',
        s3Title: '3. BRAND ARCHETYPES',
        s3Li1Label: '1. The Hero (Primary):', s3Li1: ' Personal improvement, discipline and achievement of physical goals.',
        s3Li2Label: '2. The Regular Guy (Secondary):', s3Li2: ' Community, belonging to the box "tribe". Accessible and motivating.',
        s4Title: '4. VISUALIZATION IN CONTEXT',
        s4P: 'The design does not live only on screens; it inhabits the physical space and the community\'s apparel. The brand integrates into the real environment where transformation happens.',
        s4Caption1: 'The real physical space where the method was developed. The visual identity inhabits the gym.',
        s4Caption2: 'Brand application on official apparel (T-shirts).',
        s4Caption3: 'Design versatility: Adaptation to different apparel colors.',
        s4Caption4: 'Brand extension: Functional merchandise for the community.',
        s5Title: '5. THE DIGITAL PLATFORM',
        s5P1Pre: 'The logo was the first act. But a brand without tools cannot sustain a community. That is why we built the platform TommyBox needed to operate: ',
        s5P1Bold: 'a complete web app, in production, used by real clients',
        s5P1Post: '.',
        s5P2: 'The challenge was not technical — it was human: how do you get someone to come back and train tomorrow, and the day after, and the week after? The answer was designing every feature thinking about that decision moment.',
        feat1Tag: 'Session booking',
        feat1Body: 'No WhatsApp, no calls. The client opens the app, sees the week, picks their time and confirms in seconds. Gustavo sees his schedule in real time.',
        feat1Tech: 'Real-time Firestore · server-side business rules via Cloud Functions',
        feat2Tag: 'Gamification engine',
        feat2Body: 'Every session earns XP. Every streak unlocks badges. There is a monthly leaderboard. Training has memory and rewards consistency.',
        feat2Tech: 'Logic centralized in shared constants · authoritative server-side recalculation',
        feat3Tag: 'Two worlds in one platform',
        feat3Body: 'Gustavo sees the full history, per-client metrics and controls the schedule. The client sees their own progress. Same app, two completely different realities.',
        feat3Tech: 'Role-based system with protected routes · Google OAuth + email',
        feat4Tag: 'The app that reminds and celebrates',
        feat4Body: 'Reminders before each session. Notifications when leveling up. Small moments that reinforce the habit without being intrusive.',
        feat4Tech: 'Firebase Cloud Messaging · native push notifications on mobile and desktop',
        engTitle: 'The engineering decisions',
        engBodyPre: 'Every technology in the stack was a deliberate choice, not a default. ',
        engBodyPost: ' for continuous deployment and global distribution from day one.',
        engStack: 'React 19 · Firebase (Auth · Firestore · Storage · Cloud Functions Gen 2) · TypeScript · Tailwind CSS · Vercel',
        productionNote: 'Platform in production — explore the main views.',
        altAgendaDesktop: 'Weekly Schedule — Desktop',
        altChampsDesktop: 'Champions Hall — Desktop',
        altFeedDesktop: 'Community Feed — Desktop',
        altPlansDesktop: 'Training Plans — Desktop',
        altAchievDesktop: 'Achievements & Gamification — Desktop',
        altProfileDesktop: 'My Profile — Desktop',
        altAgendaMobile: 'Weekly Schedule — Mobile',
        altChampsMobile: 'Champions Hall — Mobile',
        altFeedMobile: 'Community Feed — Mobile',
        altPlansMobile: 'Training Plans — Mobile',
        altAchievMobile: 'Achievements & Gamification — Mobile',
        altProfileMobile: 'My Profile — Mobile',
    }
};

const TommyBoxCaseStudy: React.FC = () => {
    const locale = useLocale();
    const c = content[locale as 'es' | 'en'] ?? content.es;

    return (
        <section>
            <header className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">TOMMYBOX</h2>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">{c.headerTitle}</h1>
                <p className="text-lg text-deep-600 max-w-2xl mx-auto">{c.headerSub}</p>
            </header>

            <Block>
                <SectionTitle>{c.s1Title}</SectionTitle>
                <P><Strong>{c.s1ClientLabel}</Strong> {c.s1Client}</P>
                <P><Strong>{c.s1IndustryLabel}</Strong> {c.s1Industry}</P>
                <P><Strong>{c.s1GoalLabel}</Strong> {c.s1Goal}</P>
            </Block>

            <Hr />

            <SectionTitle>{c.s2Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s2Sub1}</SubSectionTitle>
                <P>{c.s2P1}</P>
                <ImageDisplay src="/images/tommybox-logo-v1.webp" alt="Logo Versión 1 TommyBox" caption={c.s2Caption1} />

                <SubSectionTitle>{c.s2Sub2}</SubSectionTitle>
                <P>{c.s2P2}</P>
                <UL>
                    <li><Strong>{c.s2Li1Label}</Strong>{c.s2Li1}</li>
                    <li><Strong>{c.s2Li2Label}</Strong>{c.s2Li2}</li>
                    <li><Strong>{c.s2Li3Label}</Strong>{c.s2Li3}</li>
                </UL>
                <ImageDisplay src="/images/tommybox-logo-final.webp" alt="Logo TommyBox Final" caption={c.s2Caption2} />
            </Block>

            <Hr />

            <SectionTitle>{c.s3Title}</SectionTitle>
            <Block>
                <UL>
                    <li><Strong>{c.s3Li1Label}</Strong>{c.s3Li1}</li>
                    <li><Strong>{c.s3Li2Label}</Strong>{c.s3Li2}</li>
                </UL>
            </Block>

            <Hr />

            <SectionTitle>{c.s4Title}</SectionTitle>
            <Block>
                <P>{c.s4P}</P>
                <ImageDisplay src="/images/tommybox-gym.webp" alt="Gimnasio TommyBox" caption={c.s4Caption1} />
                <ImageDisplay src="/images/tommybox-merch.webp" alt="Merchandising TommyBox" caption={c.s4Caption2} />
                <ImageDisplay src="/images/tommybox-color-variations.webp" alt="Variaciones de Color TommyBox" caption={c.s4Caption3} />
                <ImageDisplay src="/images/tommybox-water-bottle.webp" alt="Botella de Agua TommyBox" caption={c.s4Caption4} />
            </Block>

            <Hr />

            <SectionTitle>{c.s5Title}</SectionTitle>
            <Block>
                <P>{c.s5P1Pre}<Strong>{c.s5P1Bold}</Strong>{c.s5P1Post}</P>
                <P>{c.s5P2}</P>
            </Block>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Block className="mb-0">
                    <p className="text-xs font-semibold tracking-widest text-symbolic-500 uppercase mb-2">{c.feat1Tag}</p>
                    <P className="mb-1">{c.feat1Body}</P>
                    <p className="text-xs text-deep-400 italic">{c.feat1Tech}</p>
                </Block>
                <Block className="mb-0">
                    <p className="text-xs font-semibold tracking-widest text-symbolic-500 uppercase mb-2">{c.feat2Tag}</p>
                    <P className="mb-1">{c.feat2Body}</P>
                    <p className="text-xs text-deep-400 italic">{c.feat2Tech}</p>
                </Block>
                <Block className="mb-0">
                    <p className="text-xs font-semibold tracking-widest text-symbolic-500 uppercase mb-2">{c.feat3Tag}</p>
                    <P className="mb-1">{c.feat3Body}</P>
                    <p className="text-xs text-deep-400 italic">{c.feat3Tech}</p>
                </Block>
                <Block className="mb-0">
                    <p className="text-xs font-semibold tracking-widest text-symbolic-500 uppercase mb-2">{c.feat4Tag}</p>
                    <P className="mb-1">{c.feat4Body}</P>
                    <p className="text-xs text-deep-400 italic">{c.feat4Tech}</p>
                </Block>
            </div>

            <Block>
                <SubSectionTitle className="mt-0">{c.engTitle}</SubSectionTitle>
                <P>
                    {c.engBodyPre}
                    <Strong>React 19 + TypeScript</Strong>
                    {locale === 'es'
                        ? ' porque la interfaz es compleja y los errores en producción son costosos. '
                        : ' because the interface is complex and production errors are costly. '}
                    <Strong>Firebase</Strong>
                    {locale === 'es'
                        ? ' porque necesitábamos tiempo real, auth robusta y funciones serverless sin operar infraestructura. '
                        : ' because we needed real-time data, robust auth and serverless functions without managing infrastructure. '}
                    <Strong>Cloud Functions</Strong>
                    {locale === 'es'
                        ? ' para que la lógica crítica —puntos, insignias, notificaciones— corra en el servidor y no pueda ser manipulada desde el cliente. '
                        : ' so that critical logic — points, badges, notifications — runs on the server and cannot be manipulated from the client. '}
                    <Strong>Vercel</Strong>
                    {c.engBodyPost}
                </P>
                <p className="text-xs text-deep-400 border-t border-deep-100 pt-4 mt-2">{c.engStack}</p>
            </Block>

            <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm font-medium text-deep-400 mb-2 italic">{c.productionNote}</p>
            </div>

            <BrowserMockup
                src={TOMMYBOX_APP_URL}
                label="tommybox.cl"
                autoInterval={3500}
                screenshotAspect="3431/1511"
                defaultView="auto"
                screenshots={[
                    { src: '/images/tommybox-screen-agenda.webp', alt: c.altAgendaDesktop },
                    { src: '/images/tommybox-screen-comunidad.webp', alt: c.altChampsDesktop },
                    { src: '/images/tommybox-screen-feed.webp', alt: c.altFeedDesktop },
                    { src: '/images/tommybox-screen-planes.webp', alt: c.altPlansDesktop },
                    { src: '/images/tommybox-screen-logros.webp', alt: c.altAchievDesktop },
                    { src: '/images/tommybox-screen-perfil.webp', alt: c.altProfileDesktop },
                ]}
                mobileScreenshots={[
                    { src: '/images/tommybox-mobile-agenda.webp', alt: c.altAgendaMobile },
                    { src: '/images/tommybox-mobile-comunidad.webp', alt: c.altChampsMobile },
                    { src: '/images/tommybox-mobile-feed.webp', alt: c.altFeedMobile },
                    { src: '/images/tommybox-mobile-planes.webp', alt: c.altPlansMobile },
                    { src: '/images/tommybox-mobile-logros.webp', alt: c.altAchievMobile },
                    { src: '/images/tommybox-mobile-perfil.webp', alt: c.altProfileMobile },
                ]}
            />
        </section>
    );
};

export default TommyBoxCaseStudy;
