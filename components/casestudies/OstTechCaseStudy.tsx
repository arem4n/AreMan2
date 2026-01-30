
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

const OstTechCaseStudy: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                OST TECH
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                El Alma en la Máquina
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Software de Mantenimiento para Salmoneras: Fusionando la mecánica industrial con la fluidez orgánica.</p>
        </header>

        <Block>
            <SectionTitle>1. BRIEFING Y DESAFÍO</SectionTitle>
            <P><Strong>Cliente:</Strong> Omar Stormasen.</P>
            <P><Strong>Industria:</Strong> Acuicultura / Tecnología (Software de mantenimiento).</P>
            <P><Strong>El Reto:</Strong> El cliente dio libertad creativa total ("algo representativo"). El desafío era evitar los clichés tecnológicos genéricos y crear una identidad que representara tanto la robustez industrial como la identidad personal del fundador.</P>
        </Block>

        <Hr />
        
        <SectionTitle>2. ANÁLISIS VISUAL</SectionTitle>
        <Block>
            <SubSectionTitle>Isotipo: El Engranaje Orgánico</SubSectionTitle>
            <UL>
                <li><Strong>El Engranaje ("O"):</Strong> Una rueda dentada sólida que representa la maquinaria industrial, la automatización y la letra O de Omar.</li>
                <li><Strong>La Curva ("S"):</Strong> Una forma fluida y blanca dentro del engranaje. Representa la S de Stormasen, pero también el movimiento, el agua y la vida orgánica.</li>
                <li><Strong>Movimiento Implícito:</Strong> La forma de la S sugiere que el engranaje está girando. Un engranaje estático es maquinaria rota; uno girando es producción viva.</li>
            </UL>
            <ImageDisplay src="/images/ost-tech-hero.png" alt="Isotipo OstTech" caption="Fusión de la mecánica industrial con la fluidez orgánica." />
        </Block>
        
        <Hr />
        
        <SectionTitle>3. ANÁLISIS SEMIÓTICO PROFUNDO</SectionTitle>
        <Block>
            <SubSectionTitle>La Metáfora del Mantenimiento</SubSectionTitle>
            <P>El engranaje simboliza el sistema complejo de una salmonera: si un diente falla, todo colapsa. El software OST es el "aceite" inteligente que mantiene el sistema en movimiento perpetuo.</P>
            <Quote>
                <P><Strong>El Alma en la Máquina:</Strong> El engranaje es la tecnología fría e impersonal. La 'S' curva en el centro es el toque humano, la personalización y la identidad de Omar dentro del sistema. Representa la intervención experta que previene el caos.</P>
            </Quote>
            
            <SubSectionTitle>Coherencia Industrial</SubSectionTitle>
            <UL>
                <li><Strong>Azul Degradado:</Strong> Conexión directa con el agua y el entorno marino de las salmoneras.</li>
                <li><Strong>S Curva:</Strong> Evoca el movimiento de los peces y las olas, integrando la naturaleza biológica del negocio con la estructura mecánica.</li>
            </UL>
        </Block>

        <Hr />

        <SectionTitle>4. ARQUETIPOS JUNGUIANOS ACTIVADOS</SectionTitle>
        <Block>
            <UL>
                <li><Strong>1. El Mago/Ingeniero (Primario):</Strong> Dominio de sistemas complejos. El poder de controlar la maquinaria mediante el conocimiento (software).</li>
                <li><Strong>2. El Guardián (Secundario):</Strong> El mantenimiento preventivo es protección. La marca cuida que la producción no se detenga.</li>
                <li><Strong>3. El Independiente (Terciario):</Strong> La fuerte presencia de las iniciales (O+S) marca la diferencia frente a corporaciones anónimas.</li>
            </UL>
        </Block>

        <Hr />

        <SectionTitle>5. INTEGRACIÓN DE MARCA EN SOFTWARE</SectionTitle>
        <Block>
            <P>Las siguientes imágenes son referencias visuales para demostrar la <strong>aplicación del logotipo</strong>. No representan un diseño de interfaz (UI) realizado por mí, sino la integración del isotipo como sello de identidad dentro de las plataformas digitales existentes del cliente.</P>
            <ImageDisplay src="/images/osttech-mobile-mockup.png" alt="Mockup App Móvil OstTech" caption="Referencia de aplicación del isotipo en entorno móvil." />
            <ImageDisplay src="/images/osttech-desktop-mockup.png" alt="Mockup Desktop OstTech" caption="Referencia de integración del logo en software de escritorio." />
        </Block>
    </section>
);

export default OstTechCaseStudy;
