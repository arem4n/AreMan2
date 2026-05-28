'use client';
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useCallback, useRef } from 'react';
import { useLocale } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';

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
        <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover" />
        <figcaption className="text-center text-sm text-deep-600 mt-2 italic">{caption}</figcaption>
    </figure>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const TransmediaBlock: React.FC<{
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    isReversed?: boolean;
}> = ({ title, subtitle, description, imageSrc, isReversed = false }) => (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center mb-16 last:mb-0`}>
        <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-deep-100 group">
                <img src={imageSrc} alt={title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">{subtitle}</span>
                </div>
            </div>
        </div>
        <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-symbolic-600"></span>
                <span className="text-symbolic-600 font-bold tracking-wider text-sm uppercase">{subtitle}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-deep-800 mb-4">{title}</h3>
            <p className="text-deep-700 leading-relaxed text-lg">{description}</p>
        </div>
    </div>
);

const content = {
    es: {
        headerSubtitle: 'AreMan - Escudo Heráldico',
        headerTitle: 'El Manifiesto: Anatomía de un Legado',
        headerSub: 'Análisis exhaustivo del escudo heráldico "AreMan" mediante las 5 capas de lectura del Manual LogoCodeX™.',
        s1Title: '1. BRIEFING Y CONTEXTO',
        s1ProjectLabel: 'Proyecto:', s1Project: 'AreMan - Escudo Heráldico de linaje familiar.',
        s1NatureLabel: 'Naturaleza:', s1Nature: 'Identidad genealógica y ancestral (no comercial).',
        s1ChallengeLabel: 'Desafío:', s1Challenge: 'Crear un escudo que unifique dos linajes culturalmente distintos en un solo símbolo coherente, fusionando la herencia hispana (Arellano) con la mapuche (Manque).',
        s1Caption: 'El escudo final: Síntesis de Cóndor, Montaña y Árbol.',
        s2Title: '2. ANÁLISIS DE CAPAS SEMIÓTICAS',
        s2Intro: 'Según la metodología LogoCodeX™, este diseño revela su significado en 5 niveles de profundidad progresiva:',
        s2Sub1: 'Capa 1: Lectura Heráldica (2 segundos)',
        s2P1: 'Reconocimiento visual instantáneo. Vemos un escudo con un cóndor en posición "displayant" (alas desplegadas) sobre una montaña negra. La simetría bilateral perfecta y el contraste blanco/negro comunican inmediatamente: autoridad, orden, nobleza y tradición.',
        s2Sub2: 'Capa 2: Lectura Biográfica (30 segundos)',
        s2P2: 'Contexto personal familiar. El espectador informado reconoce los apellidos:',
        s2Li1Label: 'Manque (Mapudungun):', s2Li1: ' Significa Cóndor.',
        s2Li2Label: 'Arellano (Español):', s2Li2: ' Topónimo de lugar elevado/montañoso.',
        s2Li3Label: 'Árbol:', s2Li3: ' Representa el árbol genealógico familiar.',
        s2Sub3: 'Capa 3: Lectura Tipomórfica (2 minutos)',
        s2P3: 'Descubrimiento de letras ocultas (Easter Egg). Los símbolos naturales funcionan como tipografía:',
        s2Li4Label: "La Montaña es una 'A':", s2Li4: " El triángulo forma una A mayúscula perfecta (Arellano). Integración 10/10.",
        s2Li5Label: "El Cóndor sugiere una 'M':", s2Li5: ' Las alas extendidas y el cuerpo forman conceptualmente la letra M (Manque).',
        s2Li6Label: 'A + M = AreMan:', s2Li6: ' El nombre está escrito en "código natural".',
        s2Sub4: 'Capa 4: Lectura Simbólica (5 minutos)',
        s2P4: 'Conexión con la cosmovisión andina y heráldica europea:',
        s2Li7Label: 'Cóndor:', s2Li7: ' Mensajero sagrado entre el cielo (Wenu Mapu) y la tierra. Psicopompo que guía a los ancestros.',
        s2Li8Label: 'Montaña:', s2Li8: ' Axis Mundi (Eje del mundo). Punto de conexión cielo-tierra y fundamento inamovible.',
        s2Li9Label: 'Árbol Invertido:', s2Li9: ' El espacio negativo revela que las raíces están en la memoria (la piedra negra), pero la copa crece hacia la luz (el futuro).',
        s2Sub5: 'Capa 5: Lectura Mítica (Reflexión Profunda)',
        s2MythTitle: 'El Mito: "Lo Celestial Emerge de lo Terrestre"',
        s2MythPre: 'El escudo es un ',
        s2MythBold1: 'Koan Visual',
        s2MythMid: '. Narra que el espíritu (Cóndor) no desciende del cielo, sino que ',
        s2MythBold2: 'nace de la montaña',
        s2MythPost: '. La materia (piedra/montaña) se espiritualiza y se hace vuelo. Representa la dualidad integrada perfectamente: somos hijos de la tierra sólida (Arellano) pero tenemos un destino espiritual elevado (Manque). Es un mandato de identidad: mantener las raíces firmes para poder volar alto.',
        s3Title: '3. ARQUETIPOS JUNGUIANOS ACTIVADOS',
        s3Li1Label: '1. El Ancestro/Sabio (Primario):', s3Li1: ' Sabiduría acumulada. La montaña es el "abuelo geológico" que ha visto pasar siglos.',
        s3Li2Label: '2. El Guardián del Umbral (Secundario):', s3Li2: ' El cóndor vigila límites. Las alas desplegadas protegen el territorio familiar de intrusos.',
        s3Li3Label: '3. El Buscador (Terciario):', s3Li3: ' El diseño responde a la pregunta del Huérfano: "¿Quién soy?". El escudo otorga una respuesta sólida de pertenencia.',
        s4Title: '4. EXPANSIÓN TRANSMEDIA: EL SÍMBOLO VIVO',
        s4Intro: 'Para verificar la potencia del símbolo, lo sometimos a una prueba de estrés dimensional. Un LogoCodex™ real debe sobrevivir y prosperar cuando salta del vector plano a la realidad física.',
        tm1Title: 'Codificación Cotidiana',
        tm1Subtitle: 'Nivel 1: Físico (2D)',
        tm1Desc: 'El símbolo se integra en el uso diario. El timbre de goma y los stickers permiten marcar pertenencias, transformando objetos comunes en propiedad del linaje. Es la primera capa de apropiación territorial.',
        tm2Title: 'Permanencia Histórica',
        tm2Subtitle: 'Nivel 2: Relieve (2.5D)',
        tm2Desc: 'Al llevar el diseño a un medallón pétreo en relieve, activamos la memoria ancestral. La luz y la sombra ahora dibujan el símbolo, no la tinta. Esto evoca lápidas, escudos de armas en castillos y monedas antiguas. Valida la atemporalidad del diseño.',
        tm3Title: 'Mundo Habitable',
        tm3Subtitle: 'Nivel 3: Escultórico (3D)',
        tm3Desc: 'El diorama rompe la cuarta pared. Ya no es una representación, es un lugar. El cóndor vuela sobre una montaña real. El árbol tiene volumen. Demuestra que el logotipo no es un dibujo plano, sino una ventana a un mundo narrativo tridimensional.',
        tm4Title: 'El Mito Revelado',
        tm4Subtitle: 'Nivel 4: Hiperrealismo',
        tm4Desc: 'La visión final. Una composición cinematográfica que muestra cómo el símbolo se vería si existiera en la realidad. Es la máxima expresión de la narrativa: el momento exacto en que el espíritu (Cóndor) toca la materia (Montaña).',
    },
    en: {
        headerSubtitle: 'AreMan - Heraldic Shield',
        headerTitle: 'The Manifesto: Anatomy of a Legacy',
        headerSub: 'Exhaustive analysis of the "AreMan" heraldic shield through the 5 reading layers of the LogoCodeX™ Manual.',
        s1Title: '1. BRIEFING & CONTEXT',
        s1ProjectLabel: 'Project:', s1Project: 'AreMan - Family Lineage Heraldic Shield.',
        s1NatureLabel: 'Nature:', s1Nature: 'Genealogical and ancestral identity (non-commercial).',
        s1ChallengeLabel: 'Challenge:', s1Challenge: 'Create a shield that unifies two culturally distinct lineages into a single coherent symbol, fusing Hispanic (Arellano) heritage with Mapuche (Manque) heritage.',
        s1Caption: 'The final shield: Synthesis of Condor, Mountain and Tree.',
        s2Title: '2. SEMIOTIC LAYER ANALYSIS',
        s2Intro: 'According to the LogoCodeX™ methodology, this design reveals its meaning in 5 levels of progressive depth:',
        s2Sub1: 'Layer 1: Heraldic Reading (2 seconds)',
        s2P1: 'Instant visual recognition. We see a shield with a condor in "displayant" position (wings spread) above a black mountain. Perfect bilateral symmetry and white/black contrast immediately communicate: authority, order, nobility and tradition.',
        s2Sub2: 'Layer 2: Biographical Reading (30 seconds)',
        s2P2: 'Personal family context. The informed viewer recognizes the surnames:',
        s2Li1Label: 'Manque (Mapudungun):', s2Li1: ' Means Condor.',
        s2Li2Label: 'Arellano (Spanish):', s2Li2: ' Toponym of an elevated/mountainous place.',
        s2Li3Label: 'Tree:', s2Li3: ' Represents the family genealogical tree.',
        s2Sub3: 'Layer 3: Typomorphic Reading (2 minutes)',
        s2P3: 'Discovery of hidden letters (Easter Egg). The natural symbols function as typography:',
        s2Li4Label: "The Mountain is an 'A':", s2Li4: ' The triangle forms a perfect capital A (Arellano). Integration 10/10.',
        s2Li5Label: "The Condor suggests an 'M':", s2Li5: ' The extended wings and body conceptually form the letter M (Manque).',
        s2Li6Label: 'A + M = AreMan:', s2Li6: ' The name is written in "natural code".',
        s2Sub4: 'Layer 4: Symbolic Reading (5 minutes)',
        s2P4: 'Connection with Andean cosmology and European heraldry:',
        s2Li7Label: 'Condor:', s2Li7: ' Sacred messenger between the sky (Wenu Mapu) and the earth. A psychopomp that guides the ancestors.',
        s2Li8Label: 'Mountain:', s2Li8: ' Axis Mundi (World Axis). The sky-earth connection point and immovable foundation.',
        s2Li9Label: 'Inverted Tree:', s2Li9: ' The negative space reveals that roots lie in memory (the black stone), but the crown grows toward the light (the future).',
        s2Sub5: 'Layer 5: Mythic Reading (Deep Reflection)',
        s2MythTitle: 'The Myth: "The Celestial Emerges from the Earthly"',
        s2MythPre: 'The shield is a ',
        s2MythBold1: 'Visual Koan',
        s2MythMid: '. It narrates that the spirit (Condor) does not descend from the sky — it ',
        s2MythBold2: 'is born from the mountain',
        s2MythPost: '. Matter (stone/mountain) spiritualizes itself and becomes flight. It represents perfectly integrated duality: we are children of solid earth (Arellano) but we have an elevated spiritual destiny (Manque). It is an identity mandate: keep the roots firm so you can fly high.',
        s3Title: '3. JUNGIAN ARCHETYPES ACTIVATED',
        s3Li1Label: '1. The Ancestor/Sage (Primary):', s3Li1: ' Accumulated wisdom. The mountain is the "geological grandfather" who has witnessed centuries pass.',
        s3Li2Label: '2. The Threshold Guardian (Secondary):', s3Li2: ' The condor watches over limits. The spread wings protect the family territory from intruders.',
        s3Li3Label: '3. The Seeker (Tertiary):', s3Li3: ' The design answers the Orphan\'s question: "Who am I?". The shield grants a solid answer of belonging.',
        s4Title: '4. TRANSMEDIA EXPANSION: THE LIVING SYMBOL',
        s4Intro: 'To verify the power of the symbol, we subjected it to a dimensional stress test. A real LogoCodex™ must survive and thrive when it leaps from the flat vector to physical reality.',
        tm1Title: 'Everyday Encoding',
        tm1Subtitle: 'Level 1: Physical (2D)',
        tm1Desc: 'The symbol integrates into daily use. The rubber stamp and stickers allow marking belongings, transforming common objects into lineage property. It is the first layer of territorial appropriation.',
        tm2Title: 'Historical Permanence',
        tm2Subtitle: 'Level 2: Relief (2.5D)',
        tm2Desc: 'By bringing the design to a stone relief medallion, we activate ancestral memory. Light and shadow now draw the symbol, not ink. This evokes gravestones, coats of arms on castle walls and ancient coins. It validates the timelessness of the design.',
        tm3Title: 'Inhabitable World',
        tm3Subtitle: 'Level 3: Sculptural (3D)',
        tm3Desc: 'The diorama breaks the fourth wall. It is no longer a representation — it is a place. The condor flies over a real mountain. The tree has volume. It proves that the logotype is not a flat drawing, but a window into a three-dimensional narrative world.',
        tm4Title: 'The Myth Revealed',
        tm4Subtitle: 'Level 4: Hyperrealism',
        tm4Desc: 'The final vision. A cinematic composition showing how the symbol would look if it existed in reality. It is the ultimate expression of the narrative: the exact moment the spirit (Condor) touches matter (Mountain).',
    }
};

const Arem4nCaseStudy: React.FC = () => {
    const locale = useLocale();
    const c = content[locale as 'es' | 'en'] ?? content.es;

    return (
        <section>
            <header className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">{c.headerSubtitle}</h2>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">{c.headerTitle}</h1>
                <p className="text-lg text-deep-600 max-w-2xl mx-auto">{c.headerSub}</p>
            </header>

            <Block>
                <SectionTitle>{c.s1Title}</SectionTitle>
                <P><Strong>{c.s1ProjectLabel}</Strong> {c.s1Project}</P>
                <P><Strong>{c.s1NatureLabel}</Strong> {c.s1Nature}</P>
                <P><Strong>{c.s1ChallengeLabel}</Strong> {c.s1Challenge}</P>
                <ImageDisplay src="/images/arem4n-escudo-final.webp" alt="Escudo heráldico de AreMan" caption={c.s1Caption} />
            </Block>

            <Hr />

            <SectionTitle>{c.s2Title}</SectionTitle>
            <Block>
                <P>{c.s2Intro}</P>

                <SubSectionTitle>{c.s2Sub1}</SubSectionTitle>
                <P>{c.s2P1}</P>

                <SubSectionTitle>{c.s2Sub2}</SubSectionTitle>
                <P>{c.s2P2}</P>
                <UL>
                    <li><Strong>{c.s2Li1Label}</Strong>{c.s2Li1}</li>
                    <li><Strong>{c.s2Li2Label}</Strong>{c.s2Li2}</li>
                    <li><Strong>{c.s2Li3Label}</Strong>{c.s2Li3}</li>
                </UL>

                <SubSectionTitle>{c.s2Sub3}</SubSectionTitle>
                <P>{c.s2P3}</P>
                <UL>
                    <li><Strong>{c.s2Li4Label}</Strong>{c.s2Li4}</li>
                    <li><Strong>{c.s2Li5Label}</Strong>{c.s2Li5}</li>
                    <li><Strong>{c.s2Li6Label}</Strong>{c.s2Li6}</li>
                </UL>

                <SubSectionTitle>{c.s2Sub4}</SubSectionTitle>
                <P>{c.s2P4}</P>
                <UL>
                    <li><Strong>{c.s2Li7Label}</Strong>{c.s2Li7}</li>
                    <li><Strong>{c.s2Li8Label}</Strong>{c.s2Li8}</li>
                    <li><Strong>{c.s2Li9Label}</Strong>{c.s2Li9}</li>
                </UL>

                <SubSectionTitle>{c.s2Sub5}</SubSectionTitle>
                <Quote>
                    <P className="font-bold text-xl text-deep-700">{c.s2MythTitle}</P>
                    <P>
                        {c.s2MythPre}<Strong>{c.s2MythBold1}</Strong>{c.s2MythMid}<Strong>{c.s2MythBold2}</Strong>{c.s2MythPost}
                    </P>
                </Quote>
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

            <Hr />

            <SectionTitle>{c.s4Title}</SectionTitle>
            <Block className="bg-gradient-to-b from-white to-deep-50">
                <P className="mb-12 text-center max-w-3xl mx-auto">{c.s4Intro}</P>

                <TransmediaBlock
                    title={c.tm1Title}
                    subtitle={c.tm1Subtitle}
                    description={c.tm1Desc}
                    imageSrc="/images/arem4n-escudo-wood-mockup.webp"
                />

                <TransmediaBlock
                    title={c.tm2Title}
                    subtitle={c.tm2Subtitle}
                    description={c.tm2Desc}
                    imageSrc="/images/arem4n-escudo-wax-mockup.webp"
                    isReversed
                />

                <TransmediaBlock
                    title={c.tm3Title}
                    subtitle={c.tm3Subtitle}
                    description={c.tm3Desc}
                    imageSrc="/images/arem4n-escudo-shield-mockup.webp"
                />

                <TransmediaBlock
                    title={c.tm4Title}
                    subtitle={c.tm4Subtitle}
                    description={c.tm4Desc}
                    imageSrc="/images/arem4n-escudo-ring-mockup.webp"
                    isReversed
                />
            </Block>
        </section>
    );
};

export default Arem4nCaseStudy;
