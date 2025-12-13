
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/Icons';

// Helpers for consistent styling within the case study
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

const UL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ul className="list-disc list-inside space-y-2 text-deep-800 mb-4">{children}</ul>
);

const OL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 text-deep-800 mb-4">{children}</ol>
);

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <strong className="font-semibold text-deep-800">{children}</strong>
);

const Quote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <blockquote className="border-l-4 border-symbolic-300 pl-4 italic text-deep-600 my-6">
        {children}
    </blockquote>
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

const ImageDisplay: React.FC<{ src: string, alt: string, caption: string }> = ({ src, alt, caption }) => (
    <div className="my-8">
        <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover" />
        <p className="text-center text-sm text-deep-600 mt-2 italic">{caption}</p>
    </div>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const ImagePlaceholder: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`my-8 w-full h-64 bg-deep-100 border-2 border-dashed border-deep-300 rounded-lg flex items-center justify-center ${className || ''}`}>
        <span className="text-deep-400 font-semibold">Placeholder for Image</span>
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
    {
        icon: <StickerIcon />,
        title: '2D Físico',
        status: 'realizado_plural' as const,
        details: [
            { label: 'Formato', value: 'Stickers adhesivos' },
            { label: 'Material', value: 'Vinilo impreso' },
            { label: 'Función', value: 'Distribución familiar' },
        ]
    },
    {
        icon: <StampIcon />,
        title: '2.5D Relieve',
        status: 'realizado' as const,
        details: [
            { label: 'Formato', value: 'Sello/timbre en relieve' },
            { label: 'Material', value: 'Caucho/resina' },
            { label: 'Función', value: 'Sellado de documentos' },
        ]
    },
    {
        icon: <MedalIcon />,
        title: '2.5D Medallón',
        status: 'proyectado' as const,
        details: [
            { label: 'Formato', value: 'Relieve circular pétreo' },
            { label: 'Material', value: 'Piedra/cerámica' },
            { label: 'Función', value: 'Escudo heráldico para colgar' },
        ]
    },
    {
        icon: <CubeIcon />,
        title: '3D Escultura',
        status: 'proyectado' as const,
        details: [
            { label: 'Formato', value: 'Diorama en base de madera' },
            { label: 'Material', value: 'Resina/yeso/madera' },
            { label: 'Función', value: 'Tótem ceremonial familiar' },
        ]
    },
    {
        icon: <ImageIcon />,
        title: 'Hiperrealismo',
        status: 'realizado' as const,
        details: [
            { label: 'Formato', value: 'Cuadro enmarcado' },
            { label: 'Material', value: 'Impresión Giclée/lienzo' },
            { label: 'Función', value: 'Obra de arte narrativa' },
        ]
    }
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
    
    const slideWidth = 280;
    const radius = (slideWidth / 2) / Math.tan(Math.PI / totalItems);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    }, []);

    const goToSlide = (index: number) => {
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
             <div 
                className="relative w-full h-[320px] cursor-grab active:cursor-grabbing" 
                style={{ perspective: '1200px' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div 
                  className="absolute w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)',
                    transform: `rotateY(-${currentIndex * angle}deg)`
                  }}
                >
                  {items.map((item, index) => {
                    const badge = getStatusBadge(item.status);
                    const isVisible = Math.abs((currentIndex % totalItems + totalItems) % totalItems - index) <= 1 ||
                                      Math.abs((currentIndex % totalItems + totalItems) % totalItems - index) >= totalItems - 1;

                    return (
                      <div 
                        key={index}
                        className="absolute flex flex-col p-6 bg-white rounded-2xl shadow-xl border border-deep-100 transition-opacity duration-300"
                        style={{
                          width: `${slideWidth}px`,
                          top: '50%',
                          left: '50%',
                          margin: `-${140}px 0 0 -${slideWidth/2}px`,
                          transform: `rotateY(${index * angle}deg) translateZ(${radius}px)`,
                          backfaceVisibility: 'hidden',
                          opacity: isVisible ? 1 : 0.4,
                        }}
                      >
                         <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="text-symbolic-600">{item.icon}</div>
                                <h4 className="text-lg font-display font-bold text-deep-800">{item.title}</h4>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badge.className}`}>
                                {badge.text}
                            </span>
                        </div>
                        <ul className="space-y-2 text-sm flex-grow mt-2">
                            {item.details.map(detail => (
                                <li key={detail.label} className="flex flex-col">
                                    <Strong>{detail.label}:</Strong>
                                    <span className="text-deep-700">{detail.value}</span>
                                </li>
                            ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
            </div>
            <div className="relative w-full max-w-xs flex justify-between items-center mt-4">
                <button 
                    onClick={prevSlide}
                    className="bg-white text-deep-700 p-2 rounded-full shadow-md hover:bg-deep-100 transition-all z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-symbolic-500"
                    aria-label="Anterior dimensión"
                >
                    <ChevronLeftIcon />
                </button>
                <div className="flex justify-center space-x-2">
                    {items.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-symbolic-500 ${effectiveIndex === index ? 'bg-symbolic-600 scale-125' : 'bg-deep-200 hover:bg-deep-300'}`}
                            aria-label={`Ir a la dimensión ${index + 1}`}
                        />
                    ))}
                </div>
                <button 
                    onClick={nextSlide}
                    className="bg-white text-deep-700 p-2 rounded-full shadow-md hover:bg-deep-100 transition-all z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-symbolic-500"
                    aria-label="Siguiente dimensión"
                >
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
};


const CaseStudyArem4n: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                AreMan - Escudo Heráldico
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                El Manifiesto: Anatomía de un Legado
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Análisis exhaustivo del escudo heráldico "AreMan", la pieza fundacional de la metodología LogoCodeX™.</p>
        </header>

        <Block>
            <SubSectionTitle>1. BRIEFING Y CONTEXTO</SubSectionTitle>
            <P><Strong>Proyecto:</Strong> AreMan - Escudo Heráldico Familiar.</P>
            <P><Strong>Linaje:</Strong> Arellano (paterno, español, simbolismo del árbol) y Manque (materno, mapuche, simbolismo del cóndor).</P>
            <P><Strong>Objetivo:</Strong> Crear un escudo que unifique dos linajes culturalmente distintos en un solo símbolo coherente, representando la fusión de dos mundos en una nueva identidad familiar.</P>
            <ImagePlaceholder />
        </Block>

        <Hr />
        
        <SectionTitle>2. ANÁLISIS LOGOCODEX™</SectionTitle>
        <Block>
            <SubSectionTitle>Nivel 1: Denotación (Lo que se ve)</SubSectionTitle>
            <P>Un cóndor con las alas desplegadas sobre una montaña que contiene un árbol en su espacio negativo. La composición es monocromática, utilizando blanco y negro.</P>
            <ImagePlaceholder />
            <SubSectionTitle>Nivel 2: Connotación (Lo que significa culturalmente)</SubSectionTitle>
            <UL>
                <li><Strong>Cóndor (Manque):</Strong> En la cosmovisión mapuche, el "Manke" es un ave sagrada que representa el mundo superior, la fuerza, la salud y la libertad. Su inclusión honra el linaje materno y su conexión espiritual con la tierra.</li>
                <li><Strong>Árbol (Arellano):</Strong> El apellido Arellano, de origen castellano, tiene una etimología ligada a la palabra "árbol". El árbol simboliza las raíces, la genealogía, la vida y el crecimiento, anclando el linaje paterno en la tierra.</li>
                <li><Strong>Montaña:</Strong> Funciona como un nexo geográfico (la Cordillera de los Andes) y un símbolo de estabilidad, eternidad y el desafío superado (la unión de dos culturas).</li>
            </UL>
            <ImagePlaceholder />
            <SubSectionTitle>Nivel 3: Mito (El relato profundo de la marca)</SubSectionTitle>
             <Quote>
                <P className="font-bold text-xl text-deep-700">El Mito Fundacional: El Cóndor que Protege el Árbol Ancestral</P>
                <P>El escudo narra la historia de una unión. El Cóndor (Manque) no está simplemente posado, sino que <Strong>protege activamente</Strong> la montaña que alberga el Árbol (Arellano). Es un mito de integración: el espíritu del cielo mapuche resguardando las raíces de la tierra europea. La montaña no es una barrera, sino el <Strong>vientre fértil</Strong> donde ambos legados coexisten y se nutren mutuamente. No es una conquista, es una simbiosis.</P>
            </Quote>
            <ImagePlaceholder />
        </Block>
        
        <Hr />
        
        <SectionTitle>3. TIPOMORFOLOGÍA Y ESPACIO NEGATIVO</SectionTitle>
        <Block>
            <P>El uso del espacio negativo es la clave técnica que permite la coexistencia de los símbolos sin saturar el diseño. La montaña no es solo un fondo; su forma está <Strong>deliberadamente esculpida</Strong> para revelar el árbol en su interior. Esta técnica transforma una simple ilustración en un código visual que requiere una "lectura activa", recompensando al observador con el descubrimiento del símbolo oculto.</P>
            <Table 
                headers={["Elemento", "Técnica", "Resultado Simbólico"]}
                rows={[
                    [<Strong>Árbol</Strong>, "Espacio Negativo", "El legado Arellano está 'contenido dentro' de la tierra, es el corazón de la montaña."],
                    [<Strong>Montaña</Strong>, "Forma Positiva", "La base sólida y el entorno que permite que el legado exista."],
                    [<Strong>Cóndor</Strong>, "Forma Positiva Dominante", "El espíritu Manque es el protector visible y la fuerza que corona la identidad."]
                ]}
            />
            <ImagePlaceholder />
        </Block>
        
        <Hr />

        <SectionTitle>4. ARQUETIPOS JUNGUIANOS ACTIVADOS</SectionTitle>
        <Block>
            <UL>
                <li><Strong>1. El Ancestro/Guardián (Primario):</Strong> El cóndor protege el legado familiar, representando la sabiduría y la fuerza de las generaciones pasadas que vigilan a las presentes.</li>
                <li><Strong>2. El Soberano (Secundario):</Strong> La composición heráldica, la postura majestuosa del cóndor y la solidez de la montaña evocan autoridad, responsabilidad y liderazgo familiar.</li>
                <li><Strong>3. El Explorador (Terciario):</Strong> El escudo en sí mismo es el resultado de un viaje de exploración hacia las propias raíces, unificando dos "mundos" (Europa y América) en una nueva identidad.</li>
            </UL>
            <ImagePlaceholder />
        </Block>

        <Hr />

        <SectionTitle>5. ANÁLISIS TRANSMEDIA: DE LO DIGITAL A LO HIPERREAL</SectionTitle>
        <Block>
            <P>El diseño fue concebido para ser "transmedia", es decir, capaz de existir y comunicar su significado en múltiples formatos y dimensiones. Esto demuestra la robustez del concepto, que no depende de un solo medio para ser efectivo.</P>
            <TransmediaCarousel />
        </Block>

    </section>
);

export default CaseStudyArem4n;
