/* eslint-disable react/no-unescaped-entities */
import React from 'react';

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

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const ImagePlaceholder: React.FC<{ className?: string, key?: string | number }> = ({ className, key }) => (
    <div key={key} className={`my-8 w-full h-64 bg-deep-100 border-2 border-dashed border-deep-300 rounded-lg flex items-center justify-center ${className || ''}`}>
        <span className='text-deep-400 font-semibold'>Placeholder for Image</span>
    </div>
);


const CaseStudyArem4nProfessional: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                arem4n
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                Marca Personal Freelance de Transformación Creativa
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Un autorretrato simbólico que fusiona claridad, tecnología y la chispa de la inspiración.</p>
        </header>

        <Block>
            <SubSectionTitle>1. BRIEFING DEL PROYECTO</SubSectionTitle>
            <P><Strong>Proyecto:</Strong> arem4n - Marca personal freelance.</P>
            <P><Strong>Naturaleza:</Strong> Identidad comercial para servicios creativos profesionales (diseño, branding, audiovisual, IA).</P>
            
            <SubSubSectionTitle>Contexto y Desafíos Estratégicos</SubSubSectionTitle>
            <P>"arem4n" es la identidad profesional de Sergio Arellano Manque, creada para distinguirse del escudo heráldico familiar "AreMan". Mientras que "AreMan" es un legado, "arem4n" es una promesa comercial.</P>
            <UL>
                <li><Strong>Diferenciación:</Strong> Crear una marca moderna y tecnológica que no se confunda con la heráldica tradicional.</li>
                <li><Strong>Memorabilidad:</Strong> El nombre "arem4n" usa leetspeak (el '4' por la 'a') para ser memorable y apelar a un público digital y de startups.</li>
                <li><Strong>Claridad Conceptual:</Strong> El logo debía encapsular la propuesta de valor: un proceso creativo que es a la vez estratégico (estructurado) e inspirador (mágico).</li>
            </UL>
            <ImagePlaceholder />
        </Block>

        <Hr />
        
        <SectionTitle>2. ANÁLISIS LOGOCODEX™</SectionTitle>
        <Block>
            <SubSectionTitle>Nivel 1: Denotación (Lo que se ve)</SubSectionTitle>
            <P>Un cuervo blanco estilizado de perfil, con el número 4 integrado en su ala. El cuervo sostiene una pequeña chispa de energía amarilla en su pico.</P>
            <ImagePlaceholder />
            
            <SubSectionTitle>Nivel 2: Connotación (Lo que significa culturalmente)</SubSectionTitle>
            <UL>
                <li><Strong>Cuervo (Raven):</Strong> Símbolo universal de inteligencia, misterio, magia y mensajería. En la mitología nórdica, los cuervos de Odín (Pensamiento y Memoria) traen conocimiento. Su color blanco invierte el arquetipo oscuro, connotando claridad, revelación y una "página en blanco" para crear.</li>
                <li><Strong>Número 4:</Strong> Representa estabilidad, estructura, orden y el mundo material. Su integración en el ala del cuervo significa que la creatividad ("el vuelo") está fundamentada en un proceso sólido y estratégico.</li>
                <li><Strong>Chispa de Energía:</Strong> Simboliza la inspiración, la "gran idea", la innovación y la energía vital que inicia un proyecto. Es el catalizador que el "mensajero" (el cuervo) entrega.</li>
            </UL>
            <ImagePlaceholder />

            <SubSectionTitle>Nivel 3: Mito (El relato profundo de la marca)</SubSectionTitle>
            <Quote>
                <P className="font-bold text-xl text-deep-700">El Mito: El Mensajero de la Chispa Creativa</P>
                <P>"arem4n" no es solo un diseñador; es <Strong>el mensajero que trae la chispa de una nueva visión.</Strong> El cuervo, con su sabiduría, encuentra la idea fundamental (la chispa) y, con su vuelo estructurado (el 4 en el ala), la entrega al cliente para darle forma en el mundo real. Es la promesa de transformar una idea abstracta en una identidad visual concreta y poderosa.</P>
            </Quote>
            <ImagePlaceholder />
        </Block>
        
        <Hr />
        
        <SectionTitle>3. DISEÑO Y SISTEMA VISUAL</SectionTitle>
        <Block>
            <SubSectionTitle>Geometría y Composición</SubSectionTitle>
            <P>El diseño se basa en formas geométricas limpias y curvas fluidas. El cuervo está orientado hacia la derecha, simbolizando el futuro y el progreso. La integración del "4" no es meramente decorativa; su estructura angular contrasta con las curvas del cuerpo, creando un equilibrio visual entre lo orgánico y lo construido.</P>
            <ImagePlaceholder />

            <SubSectionTitle>Paleta de Colores</SubSectionTitle>
             <P>La paleta refuerza la identidad dual de la marca:</P>
            <UL>
                <li><Strong>Blanco y Negro (o Deep-900):</Strong> Contraste máximo que denota claridad, profesionalismo y sofisticación. Funciona como el lienzo principal.</li>
                <li><Strong>Amarillo Creativo (Creative-400):</Strong> Es el color de la chispa. Un acento vibrante que representa la energía, las ideas, la iluminación y el valor. Es el único punto de color, atrayendo toda la atención.</li>
            </UL>
            <ImagePlaceholder />
        </Block>
        
        <Hr />

        <SectionTitle>4. ARQUETIPOS JUNGUIANOS ACTIVADOS</SectionTitle>
        <Block>
            <UL>
                <li><Strong>1. El Mago (Primario):</Strong> Transforma la visión en realidad. La "chispa" es el acto mágico de la creación, y el cuervo es el familiar que lo asiste. Este arquetipo promete resultados transformadores.</li>
                <li><Strong>2. El Sabio (Secundario):</Strong> El número 4 y la figura del cuervo como portador de conocimiento posicionan a la marca como un guía estratégico, no solo un ejecutor. Promete un proceso basado en la sabiduría y el análisis.</li>
                <li><Strong>3. El Creador (Terciario):</Strong> La esencia de la marca es la creación de algo nuevo. El logo es un manifiesto de la capacidad de dar forma a la inspiración y construir identidades desde cero.</li>
            </UL>
            <ImagePlaceholder />
        </Block>

    </section>
);

export default CaseStudyArem4nProfessional;