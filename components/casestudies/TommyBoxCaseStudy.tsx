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

const TommyBoxCaseStudy: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                TOMMYBOX
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                Energía Funcional
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Identidad visual para un espacio de entrenamiento de alto rendimiento.</p>
        </header>

        <Block>
            <SectionTitle>1. BRIEFING Y CONTEXTO</SectionTitle>
            <P><Strong>Cliente:</Strong> Gustavo Arellano Manque.</P>
            <P><Strong>Industria:</Strong> Fitness / Entrenamiento Funcional.</P>
            <P><Strong>Objetivo:</Strong> Crear una marca que transmitiera fuerza, comunidad y profesionalismo, alejándose de la estética agresiva típica de los gimnasios tradicionales (&quot;No pain no gain&quot;) y acercándose a una visión más inteligente y funcional del movimiento.</P>
        </Block>

        <Hr />
        
        <SectionTitle>2. SOLUCIÓN GRÁFICA</SectionTitle>
        <Block>
            <SubSectionTitle>Evolución: De la V1 a la Versión Final</SubSectionTitle>
            <P>El proyecto pasó por una etapa inicial (V1) donde se utilizó una paleta verde y negra, con un enfoque más tradicional. Esta versión sirvió como base para entender que la marca necesitaba más energía y distinción.</P>
            <ImageDisplay src="/images/tommybox-logo-v1.png" alt="Logo Versión 1 TommyBox" caption="Versión 1 (Histórica): Paleta verde/negro, más tradicional." />
            
            <SubSectionTitle>Logotipo y Símbolo (V2 Final)</SubSectionTitle>
            <P>Se desarrolló un imagotipo que combina una tipografía robusta y moderna con un símbolo abstracto que sugiere una &quot;Caja&quot; (Box) abierta y dinámica, cambiando radicalmente a un Azul Eléctrico para diferenciación.</P>
            <UL>
                <li><Strong>La Caja (Box):</Strong> Referencia directa al nombre y al tipo de espacio físico (Box de entrenamiento).</li>
                <li><Strong>Dinamismo:</Strong> Las líneas no son cerradas, sugiriendo movimiento, entrada y salida de energía.</li>
                <li><Strong>Tipografía:</Strong> Sans-serif bold, sólida y legible, para maximizar la visibilidad en aplicaciones físicas (paredes, poleras).</li>
            </UL>
            <ImageDisplay src="/images/tommybox-logo-final.png" alt="Logo TommyBox Final" caption="Isotipo y Logotipo principal final (V2)." />
        </Block>
        
        <Hr />

        <SectionTitle>3. ARQUETIPOS DE MARCA</SectionTitle>
        <Block>
            <UL>
                <li><Strong>1. El Héroe (Primario):</Strong> Superación personal, disciplina y logro de metas físicas.</li>
                <li><Strong>2. El Amigo (Secundario):</Strong> Comunidad, pertenencia a la &quot;tribu&quot; del box. Accesible y motivador.</li>
            </UL>
        </Block>

        <Hr />

        <SectionTitle>4. VISUALIZACIÓN EN CONTEXTO</SectionTitle>
        <Block>
            <P>El diseño no vive solo en pantallas; habita el espacio físico y la indumentaria de la comunidad. La marca se integra en el entorno real donde ocurre la transformación.</P>
            <ImageDisplay src="/images/tommybox-gym.jpg" alt="Gimnasio TommyBox" caption="El espacio físico real donde se desarrolló el método. La identidad visual habita el gimnasio." />
            <ImageDisplay src="/images/tommybox-merch.jpg" alt="Merchandising TommyBox" caption="Aplicación de la marca en indumentaria oficial (Poleras)." />
            <ImageDisplay src="/images/tommybox-color-variations.png" alt="Variaciones de Color TommyBox" caption="Versatilidad del diseño: Adaptación a diferentes colores de indumentaria." />
            <ImageDisplay src="/images/tommybox-water-bottle.jpg" alt="Botella de Agua TommyBox" caption="Extensión de marca: Merchandising funcional para la comunidad." />
        </Block>
    </section>
);

export default TommyBoxCaseStudy;
