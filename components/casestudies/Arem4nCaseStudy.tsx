/* eslint-disable react/no-unescaped-entities */

'use client';

import React, { useState, useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';

// Helpers for consistent styling within the case study
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

const ImagePlaceholder: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`my-8 w-full h-64 bg-deep-100 border-2 border-dashed border-deep-300 rounded-lg flex items-center justify-center ${className || ''}`}>
        <span className="text-deep-400 font-semibold">Placeholder for Image</span>
    </div>
);

const Table: React.FC<{ headers: string[], rows: (string | React.ReactNode)[][] }> = ({ headers, rows }) => (
    <div className="overflow-x-auto my-8">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header} className="border-b-2 border-deep-200 p-4 font-display text-deep-800">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-deep-100">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-4 text-deep-800 align-top">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Icons for Transmedia Carousel
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        {children}
    </svg>
);
const VectorIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>;
const StickerIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></IconWrapper>;
const StampIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.75v16.5M19.5 3.75v16.5M8.25 3.75h7.5m-7.5 16.5h7.5m-1.5-13.5l-3.75 3 3.75 3m-3.75-3h12" /></IconWrapper>;
const MedalIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 119 0zM16.5 18.75a9 9 0 00-9 0m9 0h-9m9 0v-2.25m-9 2.25v-2.25m0 0l-3.182-3.182m0 0a2.25 2.25 0 00-3.182 0l-1.909 1.909a2.25 2.25 0 000 3.182l3.182 3.182m-3.182-3.182h9" /></IconWrapper>;
const CubeIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></IconWrapper>;
const ImageIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></IconWrapper>;


// New Component for the Graphic Transmedia Section
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

// Carousel Component (Legacy but kept for structure if needed)
const transmediaItems = [
    {
        icon: <VectorIcon />,
        title: '2D Digital',
        status: 'realizado' as const,
        details: [
            { label: 'Formato', value: 'Archivo vectorial SVG/AI' },
            { label: 'Material', value: 'Código digital' },
            { label: 'Función', value: 'Diseño base, web, papelería' },
        ]
    },
    // ... other items ...
];

const getStatusBadge = (status: 'realizado' | 'realizado_plural' | 'proyectado') => {
    switch (status) {
        case 'realizado':
            return { text: '✅ Realizado', className: 'bg-green-100 text-green-800' };
        case 'realizado_plural':
            return { text: '✅ Realizados', className: 'bg-green-100 text-green-800' };
        case 'proyectado':
            return { text: '💡 Proyectado', className: 'bg-yellow-100 text-yellow-800' };
        default:
            return { text: '', className: '' };
    }
};

const TransmediaCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);
    const minSwipeDistance = 50;

    const items = transmediaItems;
    const totalItems = items.length;
    const angle = 360 / totalItems;
    
    // Calculate radius to position items in a circle
    const slideWidth = 280; // Corresponds to w-72
    const radius = (slideWidth / 2) / Math.tan(Math.PI / totalItems);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1); // We don't use modulo here to allow continuous rotation
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    }, []);

    const goToSlide = (index: number) => {
        // This needs to handle the continuous rotation index
        setCurrentIndex(currentIndex - (currentIndex % totalItems) + index);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
        touchStart.current = null;
        touchEnd.current = null;
    };


    const effectiveIndex = (currentIndex % totalItems + totalItems) % totalItems;

    return (
        <div className="relative w-full flex flex-col items-center" role="region" aria-roledescription="carousel" aria-label="Dimensiones Transmedia">
             {/* Carousel implementation omitted for brevity as per instructions to replace with blocks */}
             {/* This component can be removed or hidden if TransmediaBlock is preferred exclusively */}
        </div>
    );
};


const Arem4nCaseStudy: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                AreMan - Escudo Heráldico
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                El Manifiesto: Anatomía de un Legado
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Análisis exhaustivo del escudo heráldico "AreMan" mediante las 5 capas de lectura del Manual LogoCodeX™.</p>
        </header>

        <Block>
            <SectionTitle>1. BRIEFING Y CONTEXTO</SectionTitle>
            <P><Strong>Proyecto:</Strong> AreMan - Escudo Heráldico de linaje familiar.</P>
            <P><Strong>Naturaleza:</Strong> Identidad genealógica y ancestral (no comercial).</P>
            <P><Strong>Desafío:</Strong> Crear un escudo que unifique dos linajes culturalmente distintos en un solo símbolo coherente, fusionando la herencia hispana (Arellano) con la mapuche (Manque).</P>
            <ImageDisplay src="/images/arem4n-escudo-final.webp" alt="Escudo heráldico de AreMan" caption="El escudo final: Síntesis de Cóndor, Montaña y Árbol."/>
        </Block>

        <Hr />
        
        <SectionTitle>2. ANÁLISIS DE CAPAS SEMIÓTICAS</SectionTitle>
        <Block>
            <P>Según la metodología LogoCodeX™, este diseño revela su significado en 5 niveles de profundidad progresiva:</P>
            
            <SubSectionTitle>Capa 1: Lectura Heráldica (2 segundos)</SubSectionTitle>
            <P>Reconocimiento visual instantáneo. Vemos un escudo con un cóndor en posición "displayant" (alas desplegadas) sobre una montaña negra. La simetría bilateral perfecta y el contraste blanco/negro comunican inmediatamente: autoridad, orden, nobleza y tradición.</P>
            
            <SubSectionTitle>Capa 2: Lectura Biográfica (30 segundos)</SubSectionTitle>
            <P>Contexto personal familiar. El espectador informado reconoce los apellidos:</P>
            <UL>
                <li><Strong>Manque (Mapudungun):</Strong> Significa Cóndor.</li>
                <li><Strong>Arellano (Español):</Strong> Topónimo de lugar elevado/montañoso.</li>
                <li><Strong>Árbol:</Strong> Representa el árbol genealógico familiar.</li>
            </UL>
            
            <SubSectionTitle>Capa 3: Lectura Tipomórfica (2 minutos)</SubSectionTitle>
            <P>Descubrimiento de letras ocultas (Easter Egg). Los símbolos naturales funcionan como tipografía:</P>
            <UL>
                <li><Strong>La Montaña es una 'A':</Strong> El triángulo forma una A mayúscula perfecta (Arellano). Integración 10/10.</li>
                <li><Strong>El Cóndor sugiere una 'M':</Strong> Las alas extendidas y el cuerpo forman conceptualmente la letra M (Manque).</li>
                <li><Strong>A + M = AreMan:</Strong> El nombre está escrito en "código natural".</li>
            </UL>

            <SubSectionTitle>Capa 4: Lectura Simbólica (5 minutos)</SubSectionTitle>
            <P>Conexión con la cosmovisión andina y heráldica europea:</P>
            <UL>
                <li><Strong>Cóndor:</Strong> Mensajero sagrado entre el cielo (Wenu Mapu) y la tierra. Psicopompo que guía a los ancestros.</li>
                <li><Strong>Montaña:</Strong> Axis Mundi (Eje del mundo). Punto de conexión cielo-tierra y fundamento inamovible.</li>
                <li><Strong>Árbol Invertido:</Strong> El espacio negativo revela que las raíces están en la memoria (la piedra negra), pero la copa crece hacia la luz (el futuro).</li>
            </UL>

            <SubSectionTitle>Capa 5: Lectura Mítica (Reflexión Profunda)</SubSectionTitle>
             <Quote>
                <P className="font-bold text-xl text-deep-700">El Mito: "Lo Celestial Emerge de lo Terrestre"</P>
                <P>El escudo es un <Strong>Koan Visual</Strong>. Narra que el espíritu (Cóndor) no desciende del cielo, sino que <Strong>nace de la montaña</Strong>. La materia (piedra/montaña) se espiritualiza y se hace vuelo. Representa la dualidad integrada perfectamente: somos hijos de la tierra sólida (Arellano) pero tenemos un destino espiritual elevado (Manque). Es un mandato de identidad: mantener las raíces firmes para poder volar alto.</P>
            </Quote>
        </Block>
        
        <Hr />
        
        <SectionTitle>3. ARQUETIPOS JUNGUIANOS ACTIVADOS</SectionTitle>
        <Block>
            <UL>
                <li><Strong>1. El Ancestro/Sabio (Primario):</Strong> Sabiduría acumulada. La montaña es el "abuelo geológico" que ha visto pasar siglos.</li>
                <li><Strong>2. El Guardián del Umbral (Secundario):</Strong> El cóndor vigila límites. Las alas desplegadas protegen el territorio familiar de intrusos.</li>
                <li><Strong>3. El Buscador (Terciario):</Strong> El diseño responde a la pregunta del Huérfano: "¿Quién soy?". El escudo otorga una respuesta sólida de pertenencia.</li>
            </UL>
        </Block>

        <Hr />

        <SectionTitle>4. EXPANSIÓN TRANSMEDIA: EL SÍMBOLO VIVO</SectionTitle>
        <Block className="bg-gradient-to-b from-white to-deep-50">
            <P className="mb-12 text-center max-w-3xl mx-auto">
                Para verificar la potencia del símbolo, lo sometimos a una prueba de estrés dimensional. Un LogoCodex™ real debe sobrevivir y prosperar cuando salta del vector plano a la realidad física.
            </P>
            
            <TransmediaBlock 
                title="Codificación Cotidiana"
                subtitle="Nivel 1: Físico (2D)"
                description="El símbolo se integra en el uso diario. El timbre de goma y los stickers permiten marcar pertenencias, transformando objetos comunes en propiedad del linaje. Es la primera capa de apropiación territorial."
                imageSrc="/images/arem4n-escudo-wood-mockup.jpg"
            />

            <TransmediaBlock 
                title="Permanencia Histórica"
                subtitle="Nivel 2: Relieve (2.5D)"
                description="Al llevar el diseño a un medallón pétreo en relieve, activamos la memoria ancestral. La luz y la sombra ahora dibujan el símbolo, no la tinta. Esto evoca lápidas, escudos de armas en castillos y monedas antiguas. Valida la atemporalidad del diseño."
                imageSrc="/images/arem4n-escudo-wax-mockup.jpg"
                isReversed
            />

            <TransmediaBlock 
                title="Mundo Habitable"
                subtitle="Nivel 3: Escultórico (3D)"
                description="El diorama rompe la cuarta pared. Ya no es una representación, es un lugar. El cóndor vuela sobre una montaña real. El árbol tiene volumen. Demuestra que el logotipo no es un dibujo plano, sino una ventana a un mundo narrativo tridimensional."
                imageSrc="/images/arem4n-escudo-shield-mockup.jpg"
            />

            <TransmediaBlock 
                title="El Mito Revelado"
                subtitle="Nivel 4: Hiperrealismo"
                description="La visión final. Una composición cinematográfica que muestra cómo el símbolo se vería si existiera en la realidad. Es la máxima expresión de la narrativa: el momento exacto en que el espíritu (Cóndor) toca la materia (Montaña)."
                imageSrc="/images/arem4n-escudo-ring-mockup.jpg"
                isReversed
            />
        </Block>
    </section>
);

export default Arem4nCaseStudy;
