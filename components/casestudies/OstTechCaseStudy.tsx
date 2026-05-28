'use client';
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { useLocale } from 'next-intl';

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

const content = {
    es: {
        headerTitle: 'El Alma en la Máquina',
        headerSub: 'Software de Mantenimiento para Salmoneras: Fusionando la mecánica industrial con la fluidez orgánica.',
        s1Title: '1. BRIEFING Y DESAFÍO',
        s1ClientLabel: 'Cliente:', s1Client: 'Omar Stormasen.',
        s1IndustryLabel: 'Industria:', s1Industry: 'Acuicultura / Tecnología (Software de mantenimiento).',
        s1ChallengeLabel: 'El Reto:', s1Challenge: 'El cliente dio libertad creativa total ("algo representativo"). El desafío era evitar los clichés tecnológicos genéricos y crear una identidad que representara tanto la robustez industrial como la identidad personal del fundador.',
        s2Title: '2. ANÁLISIS VISUAL',
        s2Sub1: 'Isotipo: El Engranaje Orgánico',
        s2Li1Label: 'El Engranaje ("O"):', s2Li1: ' Una rueda dentada sólida que representa la maquinaria industrial, la automatización y la letra O de Omar.',
        s2Li2Label: 'La Curva ("S"):', s2Li2: ' Una forma fluida y blanca dentro del engranaje. Representa la S de Stormasen, pero también el movimiento, el agua y la vida orgánica.',
        s2Li3Label: 'Movimiento Implícito:', s2Li3: ' La forma de la S sugiere que el engranaje está girando. Un engranaje estático es maquinaria rota; uno girando es producción viva.',
        s2Caption: 'Fusión de la mecánica industrial con la fluidez orgánica.',
        s3Title: '3. ANÁLISIS SEMIÓTICO PROFUNDO',
        s3Sub1: 'La Metáfora del Mantenimiento',
        s3P1: 'El engranaje simboliza el sistema complejo de una salmonera: si un diente falla, todo colapsa. El software OST es el "aceite" inteligente que mantiene el sistema en movimiento perpetuo.',
        s3QuoteBold: 'El Alma en la Máquina:', s3QuoteRest: " El engranaje es la tecnología fría e impersonal. La 'S' curva en el centro es el toque humano, la personalización y la identidad de Omar dentro del sistema. Representa la intervención experta que previene el caos.",
        s3Sub2: 'Coherencia Industrial',
        s3Li4Label: 'Azul Degradado:', s3Li4: ' Conexión directa con el agua y el entorno marino de las salmoneras.',
        s3Li5Label: 'S Curva:', s3Li5: ' Evoca el movimiento de los peces y las olas, integrando la naturaleza biológica del negocio con la estructura mecánica.',
        s4Title: '4. ARQUETIPOS JUNGUIANOS ACTIVADOS',
        s4Li1Label: '1. El Mago/Ingeniero (Primario):', s4Li1: ' Dominio de sistemas complejos. El poder de controlar la maquinaria mediante el conocimiento (software).',
        s4Li2Label: '2. El Guardián (Secundario):', s4Li2: ' El mantenimiento preventivo es protección. La marca cuida que la producción no se detenga.',
        s4Li3Label: '3. El Independiente (Terciario):', s4Li3: ' La fuerte presencia de las iniciales (O+S) marca la diferencia frente a corporaciones anónimas.',
        s5Title: '5. INTEGRACIÓN DE MARCA EN SOFTWARE',
        s5P: 'Las siguientes imágenes son referencias visuales para demostrar la aplicación del logotipo. No representan un diseño de interfaz (UI) realizado por mí, sino la integración del isotipo como sello de identidad dentro de las plataformas digitales existentes del cliente.',
        s5Caption1: 'Referencia de aplicación del isotipo en entorno móvil.',
        s5Caption2: 'Referencia de integración del logo en software de escritorio.',
    },
    en: {
        headerTitle: 'The Soul in the Machine',
        headerSub: 'Salmon Farm Maintenance Software: Fusing industrial mechanics with organic fluidity.',
        s1Title: '1. BRIEFING & CHALLENGE',
        s1ClientLabel: 'Client:', s1Client: 'Omar Stormasen.',
        s1IndustryLabel: 'Industry:', s1Industry: 'Aquaculture / Technology (Maintenance software).',
        s1ChallengeLabel: 'The Challenge:', s1Challenge: 'The client gave full creative freedom ("something representative"). The challenge was to avoid generic tech clichés and create an identity representing both industrial robustness and the personal identity of the founder.',
        s2Title: '2. VISUAL ANALYSIS',
        s2Sub1: 'Logotype: The Organic Gear',
        s2Li1Label: 'The Gear ("O"):', s2Li1: " A solid gear wheel representing industrial machinery, automation and Omar's initial O.",
        s2Li2Label: 'The Curve ("S"):', s2Li2: " A fluid white shape inside the gear. Represents Stormasen's S, but also movement, water and organic life.",
        s2Li3Label: 'Implied Motion:', s2Li3: ' The S shape suggests the gear is rotating. A static gear is broken machinery; a rotating one is live production.',
        s2Caption: 'Fusion of industrial mechanics with organic fluidity.',
        s3Title: '3. DEEP SEMIOTIC ANALYSIS',
        s3Sub1: 'The Maintenance Metaphor',
        s3P1: 'The gear symbolizes the complex system of a salmon farm: if one tooth fails, everything collapses. OST software is the intelligent "oil" that keeps the system in perpetual motion.',
        s3QuoteBold: 'The Soul in the Machine:', s3QuoteRest: " The gear is cold, impersonal technology. The curved 'S' at the center is the human touch — Omar's personalization and identity inside the system. It represents the expert intervention that prevents chaos.",
        s3Sub2: 'Industrial Coherence',
        s3Li4Label: 'Gradient Blue:', s3Li4: ' Direct connection to water and the marine environment of salmon farms.',
        s3Li5Label: 'Curved S:', s3Li5: " Evokes the movement of fish and waves, integrating the biological nature of the business with the mechanical structure.",
        s4Title: '4. JUNGIAN ARCHETYPES ACTIVATED',
        s4Li1Label: '1. The Magician/Engineer (Primary):', s4Li1: ' Mastery of complex systems. The power to control machinery through knowledge (software).',
        s4Li2Label: '2. The Guardian (Secondary):', s4Li2: ' Preventive maintenance is protection. The brand ensures production never stops.',
        s4Li3Label: '3. The Independent (Tertiary):', s4Li3: ' The strong presence of the initials (O+S) differentiates the brand from anonymous corporations.',
        s5Title: '5. BRAND INTEGRATION IN SOFTWARE',
        s5P: 'The following images are visual references demonstrating logo application. They do not represent a UI design created by me, but rather the integration of the logotype as an identity seal within the client\'s existing digital platforms.',
        s5Caption1: 'Reference for logotype application in a mobile environment.',
        s5Caption2: 'Reference for logo integration in desktop software.',
    }
};

const OstTechCaseStudy: React.FC = () => {
    const locale = useLocale();
    const c = content[locale as 'es' | 'en'] ?? content.es;

    return (
        <section>
            <header className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">OST TECH</h2>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">{c.headerTitle}</h1>
                <p className="text-lg text-deep-600 max-w-2xl mx-auto">{c.headerSub}</p>
            </header>

            <Block>
                <SectionTitle>{c.s1Title}</SectionTitle>
                <P><Strong>{c.s1ClientLabel}</Strong> {c.s1Client}</P>
                <P><Strong>{c.s1IndustryLabel}</Strong> {c.s1Industry}</P>
                <P><Strong>{c.s1ChallengeLabel}</Strong> {c.s1Challenge}</P>
            </Block>

            <Hr />

            <SectionTitle>{c.s2Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s2Sub1}</SubSectionTitle>
                <UL>
                    <li><Strong>{c.s2Li1Label}</Strong>{c.s2Li1}</li>
                    <li><Strong>{c.s2Li2Label}</Strong>{c.s2Li2}</li>
                    <li><Strong>{c.s2Li3Label}</Strong>{c.s2Li3}</li>
                </UL>
                <ImageDisplay src="/images/ost-tech-hero.webp" alt="Isotipo OstTech" caption={c.s2Caption} />
            </Block>

            <Hr />

            <SectionTitle>{c.s3Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s3Sub1}</SubSectionTitle>
                <P>{c.s3P1}</P>
                <Quote>
                    <P><Strong>{c.s3QuoteBold}</Strong>{c.s3QuoteRest}</P>
                </Quote>

                <SubSectionTitle>{c.s3Sub2}</SubSectionTitle>
                <UL>
                    <li><Strong>{c.s3Li4Label}</Strong>{c.s3Li4}</li>
                    <li><Strong>{c.s3Li5Label}</Strong>{c.s3Li5}</li>
                </UL>
            </Block>

            <Hr />

            <SectionTitle>{c.s4Title}</SectionTitle>
            <Block>
                <UL>
                    <li><Strong>{c.s4Li1Label}</Strong>{c.s4Li1}</li>
                    <li><Strong>{c.s4Li2Label}</Strong>{c.s4Li2}</li>
                    <li><Strong>{c.s4Li3Label}</Strong>{c.s4Li3}</li>
                </UL>
            </Block>

            <Hr />

            <SectionTitle>{c.s5Title}</SectionTitle>
            <Block>
                <P>{c.s5P}</P>
                <ImageDisplay src="/images/osttech-mobile-mockup.webp" alt="Mockup App Móvil OstTech" caption={c.s5Caption1} />
                <ImageDisplay src="/images/osttech-desktop-mockup.webp" alt="Mockup Desktop OstTech" caption={c.s5Caption2} />
            </Block>
        </section>
    );
};

export default OstTechCaseStudy;
