/* eslint-disable react/no-unescaped-entities */

import React from 'react';

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

const ImageDisplay: React.FC<{ src: string, alt: string, caption: string }> = ({ src, alt, caption }) => (
    <figure className="my-8">
        <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-50" />
        <figcaption className="text-center text-sm text-deep-600 mt-2 italic">{caption}</figcaption>
    </figure>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const Bm3CaseStudy: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                BM3 SERVICIOS
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                Ingeniería Estructural Hecha Marca
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Fusión de simbología celta, ingeniería tridimensional y unidad familiar.</p>
        </header>

        <Block>
            <SectionTitle>1. BRIEFING Y CONTEXTO</SectionTitle>
            <P><Strong>Cliente:</Strong> Marcelo España (Empresa familiar de consultoría IT/Ingeniería).</P>
            <P><Strong>Nombre:</Strong> BM (iniciales hijos) + 3 (integrantes: padre, madre, hijo) + Servicios.</P>
            <P><Strong>Solicitud Especial:</Strong> Integrar simbología celta para honrar las raíces culturales, pero aplicado a un contexto de ingeniería moderna.</P>
        </Block>

        <Hr />
        
        <SectionTitle>2. LA SOLUCIÓN: TRIQUETA ESTRUCTURAL</SectionTitle>
        <Block>
            <SubSectionTitle>Modernización Ancestral</SubSectionTitle>
            <P>La base es la <Strong>Triqueta Celta</Strong> (símbolo de tres puntas entrelazadas). Sin embargo, para alejarlo del esoterismo y acercarlo a la ingeniería, se aplicó un tratamiento tridimensional de &quot;cinta plegada&quot;.</P>
            <UL>
                <li><Strong>Tridimensionalidad:</Strong> Aporte estratégico del diseñador. Representa estructura, volumen y tangibilidad. Dice &quot;construye cosas reales y sólidas&quot;.</li>
                <li><Strong>Interconexión:</Strong> Las cintas no se cortan, fluyen infinitamente. Representa la sinergia del equipo familiar.</li>
            </UL>
             <ImageDisplay src="/images/bm3-main.webp" alt="Isotipo BM3" caption="Triqueta celta con tratamiento isométrico industrial." />

            <SubSectionTitle>Tipomorfología Oculta (Easter Egg)</SubSectionTitle>
            <P>El logo premia la observación detenida con una triple lectura (B + M + 3):</P>
            <UL>
                <li><Strong>Letra B (8/10):</Strong> El contorno superior y los bucles laterales sugieren la forma de una B mayúscula.</li>
                <li><Strong>Letra M (7/10):</Strong> Las tres puntas inferiores y los arcos forman las patas de una M.</li>
                <li><Strong>Número 3 (10/10):</Strong> La lectura más directa. Tres puntas, tres personas, tres dimensiones.</li>
            </UL>
        </Block>
        
        <Hr />
        
        <SectionTitle>3. ARQUETIPOS Y SIMBOLISMO</SectionTitle>
        <Block>
            <UL>
                <li><Strong>Unidad Familiar:</Strong> Tres elementos entrelazados que dependen uno del otro para mantener la estructura. Si quitas uno, el nudo se deshace.</li>
                <li><Strong>El Sabio/Anciano (Arquetipo Primario):</Strong> Uso de sabiduría ancestral (celta) aplicada a problemas modernos.</li>
                <li><Strong>El Constructor (Arquetipo Secundario):</Strong> La solidez visual y el volumen isométrico proyectan capacidad técnica y estabilidad.</li>
            </UL>
        </Block>
    </section>
);

export default Bm3CaseStudy;
