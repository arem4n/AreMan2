/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { BrowserMockup } from '../BrowserMockup';

// TODO: Reemplaza esta URL con la URL real del deploy de TommyBox
const TOMMYBOX_APP_URL = 'https://tommybox.cl';

// Helpers for consistent styling
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

const Quote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <blockquote className="border-l-4 border-symbolic-300 pl-4 italic text-deep-600 my-6">
        {children}
    </blockquote>
);

const ImageDisplay: React.FC<{ src: string, alt: string, caption: string }> = ({ src, alt, caption }) => (
    <figure className="my-8">
        <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-50" />
        <figcaption className="text-center text-sm text-deep-600 mt-2 italic">{caption}</figcaption>
    </figure>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const TommyBoxCaseStudy: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                TOMMYBOX
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                Energía Funcional
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Identidad visual para un espacio de entrenamiento de alto rendimiento.</p>
        </header>

        <Block>
            <SectionTitle>1. BRIEFING Y CONTEXTO</SectionTitle>
            <P><Strong>Cliente:</Strong> Gustavo Arellano Manque.</P>
            <P><Strong>Industria:</Strong> Fitness / Entrenamiento Funcional.</P>
            <P><Strong>Objetivo:</Strong> Crear una marca que transmitiera fuerza, comunidad y profesionalismo, alejándose de la estética agresiva típica de los gimnasios tradicionales (&quot;No pain no gain&quot;) y acercándose a una visión más inteligente y funcional del movimiento.</P>
        </Block>

        <Hr />
        
        <SectionTitle>2. SOLUCIÓN GRÁFICA</SectionTitle>
        <Block>
            <SubSectionTitle>Evolución: De la V1 a la Versión Final</SubSectionTitle>
            <P>El proyecto pasó por una etapa inicial (V1) donde se utilizó una paleta verde y negra, con un enfoque más tradicional. Esta versión sirvió como base para entender que la marca necesitaba más energía y distinción.</P>
            <ImageDisplay src="/images/tommybox-logo-v1.png" alt="Logo Versión 1 TommyBox" caption="Versión 1 (Histórica): Paleta verde/negro, más tradicional." />
            
            <SubSectionTitle>Logotipo y Símbolo (V2 Final)</SubSectionTitle>
            <P>Se desarrolló un imagotipo que combina una tipografía robusta y moderna con un símbolo abstracto que sugiere una &quot;Caja&quot; (Box) abierta y dinámica, cambiando radicalmente a un Azul Eléctrico para diferenciación.</P>
            <UL>
                <li><Strong>La Caja (Box):</Strong> Referencia directa al nombre y al tipo de espacio físico (Box de entrenamiento).</li>
                <li><Strong>Dinamismo:</Strong> Las líneas no son cerradas, sugiriendo movimiento, entrada y salida de energía.</li>
                <li><Strong>Tipografía:</Strong> Sans-serif bold, sólida y legible, para maximizar la visibilidad en aplicaciones físicas (paredes, poleras).</li>
            </UL>
            <ImageDisplay src="/images/tommybox-logo-final.png" alt="Logo TommyBox Final" caption="Isotipo y Logotipo principal final (V2)." />
        </Block>
        
        <Hr />

        <SectionTitle>3. ARQUETIPOS DE MARCA</SectionTitle>
        <Block>
            <UL>
                <li><Strong>1. El Héroe (Primario):</Strong> Superación personal, disciplina y logro de metas físicas.</li>
                <li><Strong>2. El Amigo (Secundario):</Strong> Comunidad, pertenencia a la &quot;tribu&quot; del box. Accesible y motivador.</li>
            </UL>
        </Block>

        <Hr />

        <SectionTitle>4. VISUALIZACIÓN EN CONTEXTO</SectionTitle>
        <Block>
            <P>El diseño no vive solo en pantallas; habita el espacio físico y la indumentaria de la comunidad. La marca se integra en el entorno real donde ocurre la transformación.</P>
            <ImageDisplay src="/images/tommybox-gym.jpg" alt="Gimnasio TommyBox" caption="El espacio físico real donde se desarrolló el método. La identidad visual habita el gimnasio." />
            <ImageDisplay src="/images/tommybox-merch.jpg" alt="Merchandising TommyBox" caption="Aplicación de la marca en indumentaria oficial (Poleras)." />
            <ImageDisplay src="/images/tommybox-color-variations.png" alt="Variaciones de Color TommyBox" caption="Versatilidad del diseño: Adaptación a diferentes colores de indumentaria." />
            <ImageDisplay src="/images/tommybox-water-bottle.jpg" alt="Botella de Agua TommyBox" caption="Extensión de marca: Merchandising funcional para la comunidad." />
        </Block>

        <Hr />

        <SectionTitle>5. LA PLATAFORMA DIGITAL</SectionTitle>
        <Block>
            <P>El logo fue el primer acto. Pero una marca sin herramientas no sostiene una comunidad. Por eso construimos la plataforma que TommyBox necesitaba para operar: <Strong>una web app completa, en producción, usada por clientes reales</Strong>.</P>
            <P>El desafío no era técnico, era humano: ¿cómo hacés que alguien vuelva a entrenar mañana, y pasado, y la semana que viene? La respuesta estuvo en diseñar cada función pensando en ese momento de decisión.</P>
        </Block>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Block className="mb-0">
                <p className="text-xs font-semibold tracking-widest text-symbolic-500 uppercase mb-2">Reserva de sesiones</p>
                <P className="mb-1">Sin WhatsApp, sin llamadas. El cliente abre la app, ve la semana, elige su horario y confirma en segundos. Gustavo ve su agenda en tiempo real.</P>
                <p className="text-xs text-deep-400 italic">Firestore en tiempo real · reglas de negocio server-side via Cloud Functions</p>
            </Block>
            <Block className="mb-0">
                <p className="text-xs font-semibold tracking-widest text-symbolic-500 uppercase mb-2">Motor de gamificación</p>
                <P className="mb-1">Cada sesión acumula XP. Cada racha desbloquea insignias. Hay una tabla de líderes mensual. El entrenamiento tiene memoria y recompensa la constancia.</P>
                <p className="text-xs text-deep-400 italic">Lógica centralizada en constantes compartidas · recálculo autoritativo en el servidor</p>
            </Block>
            <Block className="mb-0">
                <p className="text-xs font-semibold tracking-widest text-symbolic-500 uppercase mb-2">Dos mundos en una plataforma</p>
                <P className="mb-1">Gustavo ve el historial completo, métricas por cliente y controla la agenda. El cliente ve su propio progreso. Misma app, dos realidades completamente distintas.</P>
                <p className="text-xs text-deep-400 italic">Sistema de roles con rutas protegidas · Google OAuth + email</p>
            </Block>
            <Block className="mb-0">
                <p className="text-xs font-semibold tracking-widest text-symbolic-500 uppercase mb-2">La app que avisa y celebra</p>
                <P className="mb-1">Recordatorios antes de cada sesión. Notificaciones cuando se sube de nivel. Pequeños momentos que refuerzan el hábito sin ser invasivos.</P>
                <p className="text-xs text-deep-400 italic">Firebase Cloud Messaging · notificaciones push nativas en móvil y desktop</p>
            </Block>
        </div>

        <Block>
            <SubSectionTitle className="mt-0">Las decisiones de ingeniería</SubSectionTitle>
            <P>Cada tecnología del stack fue una elección deliberada, no un default. <Strong>React 19 + TypeScript</Strong> porque la interfaz es compleja y los errores en producción son costosos. <Strong>Firebase</Strong> porque necesitábamos tiempo real, auth robusta y funciones serverless sin operar infraestructura. <Strong>Cloud Functions</Strong> para que la lógica crítica —puntos, insignias, notificaciones— corra en el servidor y no pueda ser manipulada desde el cliente. <Strong>Vercel</Strong> para deploy continuo y distribución global desde el día uno.</P>
            <p className="text-xs text-deep-400 border-t border-deep-100 pt-4 mt-2">React 19 · Firebase (Auth · Firestore · Storage · Cloud Functions Gen 2) · TypeScript · Tailwind CSS · Vercel</p>
        </Block>

        <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm font-medium text-deep-400 mb-2 italic">Plataforma en producción — explora las vistas principales.</p>
        </div>

        <BrowserMockup
            src={TOMMYBOX_APP_URL}
            label="tommybox.cl"
            autoInterval={3500}
            screenshotAspect="3431/1511"
            screenshots={[
                { src: '/images/tommybox-screen-agenda.png', alt: 'Agenda Semanal' },
                { src: '/images/tommybox-screen-comunidad.png', alt: 'Salón de Campeones' },
                { src: '/images/tommybox-screen-feed.png', alt: 'Feed de Comunidad' },
                { src: '/images/tommybox-screen-planes.png', alt: 'Planes de Entrenamiento' },
                { src: '/images/tommybox-screen-logros.png', alt: 'Logros y Gamificación' },
                { src: '/images/tommybox-screen-perfil.png', alt: 'Mi Perfil' },
            ]}
        />
    </section>
);

export default TommyBoxCaseStudy;
