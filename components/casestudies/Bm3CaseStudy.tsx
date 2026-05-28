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

const ImageDisplay: React.FC<{ src: string, alt: string, caption: string }> = ({ src, alt, caption }) => (
    <figure className="my-8">
        <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-50" />
        <figcaption className="text-center text-sm text-deep-600 mt-2 italic">{caption}</figcaption>
    </figure>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const content = {
    es: {
        headerTitle: 'Ingeniería Estructural Hecha Marca',
        headerSub: 'Fusión de simbología celta, ingeniería tridimensional y unidad familiar.',
        s1Title: '1. BRIEFING Y CONTEXTO',
        s1ClientLabel: 'Cliente:', s1Client: 'Marcelo España (Empresa familiar de consultoría IT/Ingeniería).',
        s1NombreLabel: 'Nombre:', s1Nombre: 'BM (iniciales hijos) + 3 (integrantes: padre, madre, hijo) + Servicios.',
        s1RequestLabel: 'Solicitud Especial:', s1Request: 'Integrar simbología celta para honrar las raíces culturales, pero aplicado a un contexto de ingeniería moderna.',
        s2Title: '2. LA SOLUCIÓN: TRIQUETA ESTRUCTURAL',
        s2Sub1: 'Modernización Ancestral',
        s2P1Pre: 'La base es la ', s2P1Bold: 'Triqueta Celta', s2P1Post: ' (símbolo de tres puntas entrelazadas). Sin embargo, para alejarlo del esoterismo y acercarlo a la ingeniería, se aplicó un tratamiento tridimensional de "cinta plegada".',
        s2Li1Label: 'Tridimensionalidad:', s2Li1: ' Aporte estratégico del diseñador. Representa estructura, volumen y tangibilidad. Dice "construye cosas reales y sólidas".',
        s2Li2Label: 'Interconexión:', s2Li2: ' Las cintas no se cortan, fluyen infinitamente. Representa la sinergia del equipo familiar.',
        s2Caption: 'Triqueta celta con tratamiento isométrico industrial.',
        s2Sub2: 'Tipomorfología Oculta (Easter Egg)',
        s2P2: 'El logo premia la observación detenida con una triple lectura (B + M + 3):',
        s2Li3Label: 'Letra B (8/10):', s2Li3: ' El contorno superior y los bucles laterales sugieren la forma de una B mayúscula.',
        s2Li4Label: 'Letra M (7/10):', s2Li4: ' Las tres puntas inferiores y los arcos forman las patas de una M.',
        s2Li5Label: 'Número 3 (10/10):', s2Li5: ' La lectura más directa. Tres puntas, tres personas, tres dimensiones.',
        s3Title: '3. ARQUETIPOS Y SIMBOLISMO',
        s3Li1Label: 'Unidad Familiar:', s3Li1: ' Tres elementos entrelazados que dependen uno del otro para mantener la estructura. Si quitas uno, el nudo se deshace.',
        s3Li2Label: 'El Sabio/Anciano (Arquetipo Primario):', s3Li2: ' Uso de sabiduría ancestral (celta) aplicada a problemas modernos.',
        s3Li3Label: 'El Constructor (Arquetipo Secundario):', s3Li3: ' La solidez visual y el volumen isométrico proyectan capacidad técnica y estabilidad.',
    },
    en: {
        headerTitle: 'Structural Engineering Made Brand',
        headerSub: 'Fusion of Celtic symbolism, three-dimensional engineering and family unity.',
        s1Title: '1. BRIEFING & CONTEXT',
        s1ClientLabel: 'Client:', s1Client: 'Marcelo España (Family IT/Engineering consultancy).',
        s1NombreLabel: 'Name:', s1Nombre: "BM (children's initials) + 3 (members: father, mother, son) + Services.",
        s1RequestLabel: 'Special Request:', s1Request: 'Integrate Celtic symbolism to honor cultural roots, applied to a modern engineering context.',
        s2Title: '2. THE SOLUTION: STRUCTURAL TRIQUETRA',
        s2Sub1: 'Ancestral Modernization',
        s2P1Pre: 'The foundation is the ', s2P1Bold: 'Celtic Triquetra', s2P1Post: ' (three-pointed interlaced symbol). To distance it from esotericism and bring it closer to engineering, a three-dimensional "folded ribbon" treatment was applied.',
        s2Li1Label: 'Three-dimensionality:', s2Li1: ' Strategic contribution from the designer. Represents structure, volume and tangibility. Says "builds real, solid things".',
        s2Li2Label: 'Interconnection:', s2Li2: " The ribbons don't cut — they flow infinitely. Represents the synergy of the family team.",
        s2Caption: 'Celtic triquetra with industrial isometric treatment.',
        s2Sub2: 'Hidden Typomorphology (Easter Egg)',
        s2P2: 'The logo rewards careful observation with a triple reading (B + M + 3):',
        s2Li3Label: 'Letter B (8/10):', s2Li3: ' The upper outline and lateral loops suggest the shape of a capital B.',
        s2Li4Label: 'Letter M (7/10):', s2Li4: ' The three lower points and arcs form the legs of an M.',
        s2Li5Label: 'Number 3 (10/10):', s2Li5: ' The most direct reading. Three points, three people, three dimensions.',
        s3Title: '3. ARCHETYPES & SYMBOLISM',
        s3Li1Label: 'Family Unity:', s3Li1: ' Three interlaced elements that depend on each other to maintain structure. Remove one and the knot unravels.',
        s3Li2Label: 'The Sage/Elder (Primary Archetype):', s3Li2: ' Ancestral (Celtic) wisdom applied to modern problems.',
        s3Li3Label: 'The Builder (Secondary Archetype):', s3Li3: ' Visual solidity and isometric volume project technical capability and stability.',
    }
};

const Bm3CaseStudy: React.FC = () => {
    const locale = useLocale();
    const c = content[locale as 'es' | 'en'] ?? content.es;

    return (
        <section>
            <header className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">BM3 SERVICIOS</h2>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">{c.headerTitle}</h1>
                <p className="text-lg text-deep-600 max-w-2xl mx-auto">{c.headerSub}</p>
            </header>

            <Block>
                <SectionTitle>{c.s1Title}</SectionTitle>
                <P><Strong>{c.s1ClientLabel}</Strong> {c.s1Client}</P>
                <P><Strong>{c.s1NombreLabel}</Strong> {c.s1Nombre}</P>
                <P><Strong>{c.s1RequestLabel}</Strong> {c.s1Request}</P>
            </Block>

            <Hr />

            <SectionTitle>{c.s2Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s2Sub1}</SubSectionTitle>
                <P>{c.s2P1Pre}<Strong>{c.s2P1Bold}</Strong>{c.s2P1Post}</P>
                <UL>
                    <li><Strong>{c.s2Li1Label}</Strong>{c.s2Li1}</li>
                    <li><Strong>{c.s2Li2Label}</Strong>{c.s2Li2}</li>
                </UL>
                <ImageDisplay src="/images/bm3-main.webp" alt="Isotipo BM3" caption={c.s2Caption} />

                <SubSectionTitle>{c.s2Sub2}</SubSectionTitle>
                <P>{c.s2P2}</P>
                <UL>
                    <li><Strong>{c.s2Li3Label}</Strong>{c.s2Li3}</li>
                    <li><Strong>{c.s2Li4Label}</Strong>{c.s2Li4}</li>
                    <li><Strong>{c.s2Li5Label}</Strong>{c.s2Li5}</li>
                </UL>
            </Block>

            <Hr />

            <SectionTitle>{c.s3Title}</SectionTitle>
            <Block>
                <UL>
                    <li><Strong>{c.s3Li1Label}</Strong>{c.s3Li1}</li>
                    <li><Strong>{c.s3Li2Label}</Strong>{c.s3Li2}</li>
                    <li><Strong>{c.s3Li3Label}</Strong>{c.s3Li3}</li>
                </UL>
            </Block>
        </section>
    );
};

export default Bm3CaseStudy;
