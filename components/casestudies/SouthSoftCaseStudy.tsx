'use client';
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { useLocale } from 'next-intl';
import { BrowserMockup } from '../BrowserMockup';

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
        {src.endsWith('.mp4') ? (
            <video
                autoPlay loop muted playsInline
                className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-50 p-4 pointer-events-none"
            >
                <source src={src} type="video/mp4" />
            </video>
        ) : (
            <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-50" />
        )}
        <figcaption className="text-center text-sm text-deep-600 mt-2 italic">{caption}</figcaption>
    </figure>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const content = {
    es: {
        headerTitle: 'Consultoría Tecnológica & Filosofía Kaizen',
        headerSub: 'Código binario con raíces patagónicas y evolución constante.',
        s1Title: '1. BRIEFING Y CO-CREACIÓN',
        s1ClientLabel: 'Cliente:', s1Client: 'Francisco Arellano (CEO South Soft Chile SpA).',
        s1ContextLabel: 'Contexto:', s1Context: 'Consultoría IT e implementación de ERP.',
        s1PhilosophyLabel: 'Filosofía:', s1Philosophy: 'Kaizen ("Mejora Continua"). La creencia de que todo sistema es perfectible y evolutivo.',
        s1Quote: '"Todo se puede resolver... todo tiene un proceso de evolución." - Francisco Arellano.',
        s1P2: 'El concepto nació de una co-creación: el cliente propuso la idea abstracta de un infinito formado por una S cortada. El desafío fue materializar esa visión con precisión técnica.',
        s2Title: '2. ANÁLISIS VISUAL Y SEMIÓTICO',
        s2Sub1: 'Tipomorfología de Triple Función',
        s2P1: 'El isotipo es una pieza de ingeniería visual que cumple tres funciones simultáneas (Éxito 10/10):',
        s2Li1Label: '1. S de "South":', s2Li1: ' La mitad superior (Azul). Referencia al origen geográfico y orgullo regional.',
        s2Li2Label: '2. S de "Soft":', s2Li2: ' La mitad inferior (Gris). Referencia a la industria tecnológica.',
        s2Li3Label: '3. Símbolo de Infinito (∞):', s2Li3: ' Al rotar la S o verla como un 8 continuo, representa el ciclo sin fin de la mejora continua (Kaizen).',
        s2Caption: 'La S cortada como símbolo de infinito y dualidad.',
        s2Sub2: 'La Metáfora de la Dualidad',
        s2P2: 'El corte horizontal exacto divide el logo en dos mundos que se complementan:',
        s2Li4Label: 'Arriba (Azul Navy):', s2Li4: ' South / Geografía / Origen / Estabilidad.',
        s2Li5Label: 'Abajo (Gris Tecnológico):', s2Li5: ' Soft / Tecnología / Futuro / Neutralidad.',
        s2P3: 'Juntos, forman un todo: una empresa tecnológica con raíces profundas.',
        s3Title: '3. COMPORTAMIENTO DIGITAL (MOTION)',
        s3P: 'La filosofía Kaizen no es estática; es movimiento perpetuo. El logotipo cobra vida en entornos digitales, donde el ciclo infinito se manifiesta visualmente, demostrando que la mejora nunca se detiene.',
        s3Caption: 'Dinámica del Infinito: Representación visual del ciclo de mejora continua.',
        s4Title: '4. ARQUETIPOS JUNGUIANOS ACTIVADOS',
        s4Li1Label: '1. El Sabio/Mentor (Primario):', s4Li1: ' El azul profundo y el infinito transmiten conocimiento acumulado y guía experta en procesos complejos.',
        s4Li2Label: '2. El Creador/Artesano (Secundario):', s4Li2: ' La precisión del corte y la construcción geométrica hablan de soluciones a medida, no de productos enlatados.',
        s4Li3Label: '3. El Explorador (Terciario):', s4Li3: ' La filosofía de "mejora infinita" implica una búsqueda constante de nuevas fronteras tecnológicas.',
        conversionTag: 'CASO DE ESTUDIO / INGENIERÍA DE CONVERSIÓN',
        conversionTitle: 'Soberanía Visual en Sistemas Complejos',
        conversionBody: 'Para la consultora B2B South Soft, el reto fue inyectar una identidad visual ágil dentro del ecosistema rígido de un ERP (Odoo). A través de diseño orientado a la conversión, transformé una infraestructura técnica en un embudo de ventas impecable, listo para captar clientes reales sin perder integración de datos.',
        s6Title: '6. VALIDACIÓN Y TESTIMONIO',
        s6P: 'La identidad se aplica en todos los puntos de contacto, transmitiendo profesionalismo desde el primer correo.',
        s6Caption: 'Aplicación corporativa real: Pie de firma de correo electrónico.',
        s6QuotePre: '"Trabajar con Sergio fue una experiencia muy agradable y fluida. Interpretó muy bien mi percepción de una empresa de tecnología en constante movimiento y la plasmó impecablemente en un logo que muestra las iniciales de mi empresa y el símbolo de infinito. Recomiendo el trabajo de Sergio, toda vez que sus creaciones tienen peso simbólico por lo que son ',
        s6QuoteBold: 'mucho más que un logo, una historia sintetizada',
        s6QuotePost: '." - Francisco Arellano.',
        s6P2: 'Este testimonio valida el núcleo de la metodología LogoCodeX™: la capacidad de condensar la narrativa completa de una empresa (Historia Sintetizada) en un símbolo funcional, superando la mera decoración estética.',
    },
    en: {
        headerTitle: 'Technology Consulting & Kaizen Philosophy',
        headerSub: 'Binary code with Patagonian roots and constant evolution.',
        s1Title: '1. BRIEFING & CO-CREATION',
        s1ClientLabel: 'Client:', s1Client: 'Francisco Arellano (CEO South Soft Chile SpA).',
        s1ContextLabel: 'Context:', s1Context: 'IT consulting and ERP implementation.',
        s1PhilosophyLabel: 'Philosophy:', s1Philosophy: 'Kaizen ("Continuous Improvement"). The belief that every system is improvable and evolutionary.',
        s1Quote: '"Everything can be solved... everything has a process of evolution." - Francisco Arellano.',
        s1P2: 'The concept was born from co-creation: the client proposed the abstract idea of an infinity symbol formed by a cut S. The challenge was to materialize that vision with technical precision.',
        s2Title: '2. VISUAL & SEMIOTIC ANALYSIS',
        s2Sub1: 'Triple-Function Typomorphology',
        s2P1: 'The logotype is a piece of visual engineering that fulfills three simultaneous functions (10/10 success):',
        s2Li1Label: '1. S for "South":', s2Li1: ' The upper half (Blue). Reference to geographic origin and regional pride.',
        s2Li2Label: '2. S for "Soft":', s2Li2: ' The lower half (Grey). Reference to the technology industry.',
        s2Li3Label: '3. Infinity Symbol (∞):', s2Li3: ' By rotating the S or reading it as a continuous 8, it represents the endless cycle of continuous improvement (Kaizen).',
        s2Caption: 'The cut S as an infinity symbol and duality.',
        s2Sub2: 'The Duality Metaphor',
        s2P2: 'The exact horizontal cut divides the logo into two complementary worlds:',
        s2Li4Label: 'Top (Navy Blue):', s2Li4: ' South / Geography / Origin / Stability.',
        s2Li5Label: 'Bottom (Tech Grey):', s2Li5: ' Soft / Technology / Future / Neutrality.',
        s2P3: 'Together, they form a whole: a tech company with deep roots.',
        s3Title: '3. DIGITAL BEHAVIOR (MOTION)',
        s3P: 'Kaizen philosophy is not static; it is perpetual motion. The logotype comes alive in digital environments, where the infinite cycle manifests visually, demonstrating that improvement never stops.',
        s3Caption: 'The Infinite Dynamics: Visual representation of the cycle of continuous improvement.',
        s4Title: '4. JUNGIAN ARCHETYPES ACTIVATED',
        s4Li1Label: '1. The Sage/Mentor (Primary):', s4Li1: ' The deep blue and infinity convey accumulated knowledge and expert guidance in complex processes.',
        s4Li2Label: '2. The Creator/Craftsman (Secondary):', s4Li2: ' The precision of the cut and the geometric construction speak of custom solutions, not off-the-shelf products.',
        s4Li3Label: '3. The Explorer (Tertiary):', s4Li3: ' The "infinite improvement" philosophy implies a constant search for new technological frontiers.',
        conversionTag: 'CASE STUDY / CONVERSION ENGINEERING',
        conversionTitle: 'Visual Sovereignty in Complex Systems',
        conversionBody: 'For B2B consultancy South Soft, the challenge was injecting an agile visual identity into the rigid ecosystem of an ERP (Odoo). Through conversion-oriented design, I transformed a technical infrastructure into an impeccable sales funnel, ready to capture real clients without losing data integration.',
        s6Title: '6. VALIDATION & TESTIMONIAL',
        s6P: 'The identity applies across all touchpoints, conveying professionalism from the first email.',
        s6Caption: 'Real corporate application: Email signature footer.',
        s6QuotePre: '"Working with Sergio was a very pleasant and fluid experience. He interpreted my vision of a technology company in constant motion very well and captured it impeccably in a logo that shows my company\'s initials and the infinity symbol. I recommend Sergio\'s work, since his creations carry symbolic weight, making them ',
        s6QuoteBold: 'much more than a logo — a synthesized story',
        s6QuotePost: '." - Francisco Arellano.',
        s6P2: 'This testimonial validates the core of the LogoCodeX™ methodology: the ability to condense the complete narrative of a company (Synthesized Story) into a functional symbol, surpassing mere aesthetic decoration.',
    }
};

const SouthSoftCaseStudy: React.FC = () => {
    const locale = useLocale();
    const c = content[locale as 'es' | 'en'] ?? content.es;

    return (
        <section>
            <header className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">SOUTHSOFT</h2>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-deep-800 mb-4">{c.headerTitle}</h1>
                <p className="text-lg text-deep-600 max-w-2xl mx-auto">{c.headerSub}</p>
            </header>

            <Block>
                <SectionTitle>{c.s1Title}</SectionTitle>
                <P><Strong>{c.s1ClientLabel}</Strong> {c.s1Client}</P>
                <P><Strong>{c.s1ContextLabel}</Strong> {c.s1Context}</P>
                <P><Strong>{c.s1PhilosophyLabel}</Strong> {c.s1Philosophy}</P>
                <Quote><P>{c.s1Quote}</P></Quote>
                <P>{c.s1P2}</P>
            </Block>

            <Hr />

            <SectionTitle>{c.s2Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s2Sub1}</SubSectionTitle>
                <P>{c.s2P1}</P>
                <UL>
                    <li><Strong>{c.s2Li1Label}</Strong>{c.s2Li1}</li>
                    <li><Strong>{c.s2Li2Label}</Strong>{c.s2Li2}</li>
                    <li><Strong>{c.s2Li3Label}</Strong>{c.s2Li3}</li>
                </UL>
                <ImageDisplay src="/images/southsoft-logo.webp" alt="Logo SouthSoft" caption={c.s2Caption} />

                <SubSectionTitle>{c.s2Sub2}</SubSectionTitle>
                <P>{c.s2P2}</P>
                <UL>
                    <li><Strong>{c.s2Li4Label}</Strong>{c.s2Li4}</li>
                    <li><Strong>{c.s2Li5Label}</Strong>{c.s2Li5}</li>
                </UL>
                <P>{c.s2P3}</P>
            </Block>

            <Hr />

            <SectionTitle>{c.s3Title}</SectionTitle>
            <Block>
                <P>{c.s3P}</P>
                <ImageDisplay
                    src="/images/southsoft-loop.mp4"
                    alt="Motion Graphics SouthSoft"
                    caption={c.s3Caption}
                />
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

            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
                <span className="text-xs font-bold tracking-[0.2em] text-creative-500 uppercase mb-4 block">
                    {c.conversionTag}
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-deep-800 mb-6 max-w-3xl">
                    {c.conversionTitle}
                </h2>
                <p className="text-lg md:text-xl text-deep-500 leading-relaxed max-w-2xl mx-auto mb-6">
                    {c.conversionBody}
                </p>
            </div>

            <BrowserMockup src="https://southsoft.cl" label="southsoft.cl" iframeMobileAspect="9/16" />

            <Hr />

            <SectionTitle>{c.s6Title}</SectionTitle>
            <Block>
                <P>{c.s6P}</P>
                <ImageDisplay src="/images/southsoft-signature.webp" alt="Pie de firma SouthSoft" caption={c.s6Caption} />
                <Quote>
                    <P>{c.s6QuotePre}<Strong>{c.s6QuoteBold}</Strong>{c.s6QuotePost}</P>
                </Quote>
                <P>{c.s6P2}</P>
            </Block>
        </section>
    );
};

export default SouthSoftCaseStudy;
