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

const SubSubSectionTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <h4 className={`text-xl font-display font-bold mt-8 mb-4 text-symbolic-700 ${className}`}>{children}</h4>
);

const Block: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-deep-100 mb-8 ${className}`}>
        {children}
    </div>
);

const P: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <p className={`text-deep-800 leading-relaxed mb-4 ${className}`}>{children}</p>
);

const UL: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <ul className={`list-disc list-inside space-y-2 text-deep-800 mb-4 ${className}`}>{children}</ul>
);

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <strong className="font-semibold text-deep-800">{children}</strong>
);

const Quote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <blockquote className="border-l-4 border-symbolic-300 pl-4 italic text-deep-600 my-6">
        {children}
    </blockquote>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const ImageDisplay: React.FC<{ src: string, alt: string, caption: string, imgKey?: string | number }> = ({ src, alt, caption, imgKey }) => (
    <figure key={imgKey} className="my-8">
        {src.endsWith('.mp4') ? (
             <video autoPlay loop muted playsInline className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-800 p-4">
                <source src={src} type="video/mp4" />
            </video>
        ) : (
            <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-800 p-4" />
        )}
        <figcaption className="text-center text-sm text-deep-600 mt-2 italic">{caption}</figcaption>
    </figure>
);

const content = {
    es: {
        headerTitle: 'Marca Personal Freelance de Transformación Creativa',
        headerSub: 'Un autorretrato simbólico que fusiona claridad, tecnología y la chispa de la inspiración.',
        s1Sub: '1. BRIEFING DEL PROYECTO',
        s1ProjectLabel: 'Proyecto:', s1Project: 'arem4n - Marca personal freelance.',
        s1NatureLabel: 'Naturaleza:', s1Nature: 'Identidad comercial para servicios creativos profesionales (diseño, branding, audiovisual, IA).',
        s1ContextTitle: 'Contexto y Desafíos Estratégicos',
        s1ContextP: '"arem4n" es la identidad profesional de Sergio Arellano Manque, creada para distinguirse del escudo heráldico familiar "AreMan". Mientras que "AreMan" es un legado, "arem4n" es una promesa comercial.',
        s1Li1Label: 'Diferenciación:', s1Li1: ' Crear una marca moderna y tecnológica que no se confunda con la heráldica tradicional.',
        s1Li2Label: 'Memorabilidad:', s1Li2: " El nombre \"arem4n\" usa leetspeak (el '4' por la 'a') para ser memorable y apelar a un público digital y de startups.",
        s1Li3Label: 'Claridad Conceptual:', s1Li3: ' El logo debía encapsular la propuesta de valor: un proceso creativo que es a la vez estratégico (estructurado) e inspirador (mágico).',
        s1Caption: "El logotipo final de la marca profesional 'arem4n'.",
        s2Title: '2. ANÁLISIS LOGOCODEX™',
        s2Sub1: 'Nivel 1: Denotación (Lo que se ve)',
        s2P1: 'Un cuervo blanco estilizado de perfil, con el número 4 integrado en su ala. El cuervo sostiene una pequeña chispa de energía amarilla en su pico.',
        s2Sub2: 'Nivel 2: Connotación (Lo que significa culturalmente)',
        s2Li4Label: 'Cuervo (Raven):', s2Li4: ' Símbolo universal de inteligencia, misterio, magia y mensajería. En la mitología nórdica, los cuervos de Odín (Pensamiento y Memoria) traen conocimiento. Su color blanco invierte el arquetipo oscuro, connotando claridad, revelación y una "página en blanco" para crear.',
        s2Li5Label: 'Número 4:', s2Li5: ' Representa estabilidad, estructura, orden y el mundo material. Su integración en el ala del cuervo significa que la creatividad ("el vuelo") está fundamentada en un proceso sólido y estratégico.',
        s2Li6Label: 'Chispa de Energía:', s2Li6: ' Simboliza la inspiración, la "gran idea", la innovación y la energía vital que inicia un proyecto. Es el catalizador que el "mensajero" (el cuervo) entrega.',
        s2Sub3: 'Nivel 3: Mito (El relato profundo de la marca)',
        s2QuoteTitle: 'El Mito: El Mensajero de la Chispa Creativa',
        s2QuoteBody: '"arem4n" no es solo un diseñador; es ',
        s2QuoteBold: 'el mensajero que trae la chispa de una nueva visión.',
        s2QuoteRest: ' El cuervo, con su sabiduría, encuentra la idea fundamental (la chispa) y, con su vuelo estructurado (el 4 en el ala), la entrega al cliente para darle forma en el mundo real. Es la promesa de transformar una idea abstracta en una identidad visual concreta y poderosa.',
        s3Title: '3. DISEÑO Y SISTEMA VISUAL',
        s3Sub1: 'Geometría y Composición',
        s3P1: 'El diseño se basa en formas geométricas limpias y curvas fluidas. El cuervo está orientado hacia la derecha, simbolizando el futuro y el progreso. La integración del "4" no es meramente decorativa; su estructura angular contrasta con las curvas del cuerpo, creando un equilibrio visual entre lo orgánico y lo construido.',
        s3Sub2: 'Paleta de Colores',
        s3P2: 'La paleta refuerza la identidad dual de la marca:',
        s3Li7Label: 'Blanco y Negro (o Deep-900):', s3Li7: ' Contraste máximo que denota claridad, profesionalismo y sofisticación. Funciona como el lienzo principal.',
        s3Li8Label: 'Amarillo Creativo (Creative-400):', s3Li8: ' Es el color de la chispa. Un acento vibrante que representa la energía, las ideas, la iluminación y el valor. Es el único punto de color, atrayendo toda la atención.',
        s4Title: '4. ARQUETIPOS JUNGUIANOS ACTIVADOS',
        s4Li1Label: '1. El Mago (Primario):', s4Li1: ' Transforma la visión en realidad. La "chispa" es el acto mágico de la creación, y el cuervo es el familiar que lo asiste. Este arquetipo promete resultados transformadores.',
        s4Li2Label: '2. El Sabio (Secundario):', s4Li2: ' El número 4 y la figura del cuervo como portador de conocimiento posicionan a la marca como un guía estratégico, no solo un ejecutor. Promete un proceso basado en la sabiduría y el análisis.',
        s4Li3Label: '3. El Creador (Terciario):', s4Li3: ' La esencia de la marca es la creación de algo nuevo. El logo es un manifiesto de la capacidad de dar forma a la inspiración y construir identidades desde cero.',
    },
    en: {
        headerTitle: 'Freelance Personal Brand for Creative Transformation',
        headerSub: 'A symbolic self-portrait that fuses clarity, technology and the spark of inspiration.',
        s1Sub: '1. PROJECT BRIEFING',
        s1ProjectLabel: 'Project:', s1Project: 'arem4n - Freelance personal brand.',
        s1NatureLabel: 'Nature:', s1Nature: 'Commercial identity for professional creative services (design, branding, audiovisual, AI).',
        s1ContextTitle: 'Context & Strategic Challenges',
        s1ContextP: '"arem4n" is the professional identity of Sergio Arellano Manque, created to differentiate from the family heraldic shield "AreMan". While "AreMan" is a legacy, "arem4n" is a commercial promise.',
        s1Li1Label: 'Differentiation:', s1Li1: ' Create a modern, technological brand that cannot be confused with traditional heraldry.',
        s1Li2Label: 'Memorability:', s1Li2: " The name \"arem4n\" uses leetspeak ('4' for 'a') to be memorable and appeal to a digital and startup audience.",
        s1Li3Label: 'Conceptual Clarity:', s1Li3: " The logo had to encapsulate the value proposition: a creative process that is both strategic (structured) and inspiring (magical).",
        s1Caption: "The final logotype of the 'arem4n' professional brand.",
        s2Title: '2. LOGOCODEX™ ANALYSIS',
        s2Sub1: 'Level 1: Denotation (What you see)',
        s2P1: 'A stylized white raven in profile, with the number 4 integrated into its wing. The raven holds a small yellow energy spark in its beak.',
        s2Sub2: 'Level 2: Connotation (Cultural meaning)',
        s2Li4Label: 'Raven:', s2Li4: " Universal symbol of intelligence, mystery, magic and messaging. In Norse mythology, Odin's ravens (Thought and Memory) bring knowledge. Its white color inverts the dark archetype, connoting clarity, revelation and a \"blank page\" for creation.",
        s2Li5Label: 'Number 4:', s2Li5: ' Represents stability, structure, order and the material world. Its integration into the raven\'s wing means creativity ("flight") is grounded in a solid, strategic process.',
        s2Li6Label: 'Energy Spark:', s2Li6: ' Symbolizes inspiration, the "big idea", innovation and the vital energy that starts a project. It is the catalyst the "messenger" (the raven) delivers.',
        s2Sub3: 'Level 3: Myth (The deep brand narrative)',
        s2QuoteTitle: 'The Myth: The Messenger of the Creative Spark',
        s2QuoteBody: '"arem4n" is not just a designer; it is ',
        s2QuoteBold: 'the messenger that brings the spark of a new vision.',
        s2QuoteRest: ' The raven, with its wisdom, finds the fundamental idea (the spark) and, with its structured flight (the 4 in the wing), delivers it to the client to give it shape in the real world. It is the promise of transforming an abstract idea into a concrete, powerful visual identity.',
        s3Title: '3. DESIGN & VISUAL SYSTEM',
        s3Sub1: 'Geometry & Composition',
        s3P1: 'The design is built on clean geometric shapes and fluid curves. The raven faces right, symbolizing the future and progress. The integration of the "4" is not merely decorative; its angular structure contrasts with the body\'s curves, creating a visual balance between the organic and the constructed.',
        s3Sub2: 'Color Palette',
        s3P2: 'The palette reinforces the dual identity of the brand:',
        s3Li7Label: 'White & Black (or Deep-900):', s3Li7: ' Maximum contrast that denotes clarity, professionalism and sophistication. Functions as the main canvas.',
        s3Li8Label: 'Creative Yellow (Creative-400):', s3Li8: " The spark's color. A vibrant accent representing energy, ideas, illumination and value. The single color point — it commands all attention.",
        s4Title: '4. JUNGIAN ARCHETYPES ACTIVATED',
        s4Li1Label: '1. The Magician (Primary):', s4Li1: ' Transforms vision into reality. The "spark" is the magical act of creation, and the raven is the familiar that assists it. This archetype promises transformative results.',
        s4Li2Label: '2. The Sage (Secondary):', s4Li2: ' The number 4 and the raven as a knowledge carrier position the brand as a strategic guide, not just an executor. It promises a process grounded in wisdom and analysis.',
        s4Li3Label: '3. The Creator (Tertiary):', s4Li3: ' The essence of the brand is the creation of something new. The logo is a manifesto of the capacity to shape inspiration and build identities from scratch.',
    }
};

const Arem4nProfessionalCaseStudy: React.FC = () => {
    const locale = useLocale();
    const c = content[locale as 'es' | 'en'] ?? content.es;

    return (
        <section>
            <header className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">arem4n</h2>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-deep-800 mb-4">{c.headerTitle}</h1>
                <p className="text-lg text-deep-600 max-w-2xl mx-auto">{c.headerSub}</p>
            </header>

            <Block>
                <SubSectionTitle>{c.s1Sub}</SubSectionTitle>
                <P><Strong>{c.s1ProjectLabel}</Strong> {c.s1Project}</P>
                <P><Strong>{c.s1NatureLabel}</Strong> {c.s1Nature}</P>

                <SubSubSectionTitle>{c.s1ContextTitle}</SubSubSectionTitle>
                <P>{c.s1ContextP}</P>
                <UL>
                    <li><Strong>{c.s1Li1Label}</Strong>{c.s1Li1}</li>
                    <li><Strong>{c.s1Li2Label}</Strong>{c.s1Li2}</li>
                    <li><Strong>{c.s1Li3Label}</Strong>{c.s1Li3}</li>
                </UL>
                <ImageDisplay
                    imgKey="img-main"
                    src="/images/arem4n-professional-brand-logo.webp"
                    alt="Logotipo de arem4n"
                    caption={c.s1Caption}
                />
            </Block>

            <Hr />

            <SectionTitle>{c.s2Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s2Sub1}</SubSectionTitle>
                <P>{c.s2P1}</P>

                <SubSectionTitle>{c.s2Sub2}</SubSectionTitle>
                <UL>
                    <li><Strong>{c.s2Li4Label}</Strong>{c.s2Li4}</li>
                    <li><Strong>{c.s2Li5Label}</Strong>{c.s2Li5}</li>
                    <li><Strong>{c.s2Li6Label}</Strong>{c.s2Li6}</li>
                </UL>

                <SubSectionTitle>{c.s2Sub3}</SubSectionTitle>
                <Quote>
                    <P className="font-bold text-xl text-deep-700">{c.s2QuoteTitle}</P>
                    <P>{c.s2QuoteBody}<Strong>{c.s2QuoteBold}</Strong>{c.s2QuoteRest}</P>
                </Quote>
            </Block>

            <Hr />

            <SectionTitle>{c.s3Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s3Sub1}</SubSectionTitle>
                <P>{c.s3P1}</P>

                <SubSectionTitle>{c.s3Sub2}</SubSectionTitle>
                <P>{c.s3P2}</P>
                <UL>
                    <li><Strong>{c.s3Li7Label}</Strong>{c.s3Li7}</li>
                    <li><Strong>{c.s3Li8Label}</Strong>{c.s3Li8}</li>
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
        </section>
    );
};

export default Arem4nProfessionalCaseStudy;
