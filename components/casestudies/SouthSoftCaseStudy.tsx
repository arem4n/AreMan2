/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { LivePreview } from '../LivePreview';

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
        {src.endsWith('.mp4') ? (
             <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-50 p-4 pointer-events-none"
            >
                <source src={src} type="video/mp4" />
                Tu navegador no soporta videos.
            </video>
        ) : (
            <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg object-cover bg-deep-50" />
        )}
        <figcaption className="text-center text-sm text-deep-600 mt-2 italic">{caption}</figcaption>
    </figure>
);

const Hr = () => <hr className="my-12 border-t-2 border-dashed border-deep-200" />;

const SouthSoftCaseStudy: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                SOUTHSOFT
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                Consultoría Tecnológica &amp; Filosofía Kaizen
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Código binario con raíces patagónicas y evolución constante.</p>
        </header>

        <Block>
            <SectionTitle>1. BRIEFING Y CO-CREACIÓN</SectionTitle>
            <P><Strong>Cliente:</Strong> Francisco Arellano (CEO South Soft Chile SpA).</P>
            <P><Strong>Contexto:</Strong> Consultoría IT e implementación de ERP.</P>
            <P><Strong>Filosofía:</Strong> Kaizen (&quot;Mejora Continua&quot;). La creencia de que todo sistema es perfectible y evolutivo.</P>
             <Quote>
                <P>&quot;Todo se puede resolver... todo tiene un proceso de evolución.&quot; - Francisco Arellano.</P>
            </Quote>
            <P>El concepto nació de una co-creación: el cliente propuso la idea abstracta de un infinito formado por una S cortada. El desafío fue materializar esa visión con precisión técnica.</P>
        </Block>

        <Hr />
        
        <SectionTitle>2. ANÁLISIS VISUAL Y SEMIÓTICO</SectionTitle>
        <Block>
            <SubSectionTitle>Tipomorfología de Triple Función</SubSectionTitle>
            <P>El isotipo es una pieza de ingeniería visual que cumple tres funciones simultáneas (Éxito 10/10):</P>
            <UL>
                <li><Strong>1. S de &quot;South&quot;:</Strong> La mitad superior (Azul). Referencia al origen geográfico y orgullo regional.</li>
                <li><Strong>2. S de &quot;Soft&quot;:</Strong> La mitad inferior (Gris). Referencia a la industria tecnológica.</li>
                <li><Strong>3. Símbolo de Infinito (∞):</Strong> Al rotar la S o verla como un 8 continuo, representa el ciclo sin fin de la mejora continua (Kaizen).</li>
            </UL>
    <ImageDisplay src="/images/southsoft-logo.png" alt="Logo SouthSoft" caption="La S cortada como símbolo de infinito y dualidad." />

            <SubSectionTitle>La Metáfora de la Dualidad</SubSectionTitle>
            <P>El corte horizontal exacto divide el logo en dos mundos que se complementan:</P>
            <UL>
                <li><Strong>Arriba (Azul Navy):</Strong> South / Geografía / Origen / Estabilidad.</li>
                <li><Strong>Abajo (Gris Tecnológico):</Strong> Soft / Tecnología / Futuro / Neutralidad.</li>
            </UL>
            <P>Juntos, forman un todo: una empresa tecnológica con raíces profundas.</P>
        </Block>
        
        <Hr />

        <SectionTitle>3. COMPORTAMIENTO DIGITAL (MOTION)</SectionTitle>
        <Block>
            <P>La filosofía Kaizen no es estática; es movimiento perpetuo. El logotipo cobra vida en entornos digitales, donde el ciclo infinito se manifiesta visualmente, demostrando que la mejora nunca se detiene.</P>
            <ImageDisplay 
                src="/images/southsoft-loop.mp4"
                alt="Motion Graphics SouthSoft"
                caption="Dinámica del Infinito: Representación visual del ciclo de mejora continua."
            />
        </Block>

        <Hr />

        <SectionTitle>4. ARQUETIPOS JUNGUIANOS ACTIVADOS</SectionTitle>
        <Block>
            <UL>
                <li><Strong>1. El Sabio/Mentor (Primario):</Strong> El azul profundo y el infinito transmiten conocimiento acumulado y guía experta en procesos complejos.</li>
                <li><Strong>2. El Creador/Artesano (Secundario):</Strong> La precisión del corte y la construcción geométrica hablan de soluciones a medida, no de productos enlatados.</li>
                <li><Strong>3. El Explorador (Terciario):</Strong> La filosofía de &quot;mejora infinita&quot; implica una búsqueda constante de nuevas fronteras tecnológicas.</li>
            </UL>
        </Block>

        <Hr />

        <SectionTitle>5. EXPERIENCIA EN VIVO (LIVE PREVIEW)</SectionTitle>
        <Block>
            <P>Para validar la funcionalidad y escalabilidad del diseño, implementamos un prototipo en vivo del sitio web de Southsoft, en donde la identidad cobra vida en el entorno final del usuario.</P>
        </Block>
        <LivePreview src="https://southsoft.cl" title="Southsoft Live Preview" />

        <Hr />

        <SectionTitle>6. VALIDACIÓN Y TESTIMONIO</SectionTitle>
        <Block>
            <P>La identidad se aplica en todos los puntos de contacto, transmitiendo profesionalismo desde el primer correo.</P>
            <ImageDisplay src="/images/southsoft-signature.jpg" alt="Pie de firma SouthSoft" caption="Aplicación corporativa real: Pie de firma de correo electrónico." />
            
            <Quote>
                <P>&quot;Trabajar con Sergio fue una experiencia muy agradable y fluida. Interpretó muy bien mi percepción de una empresa de tecnología en constante movimiento y la plasmó impecablemente en un logo que muestra las iniciales de mi empresa y el símbolo de infinito. Recomiendo el trabajo de Sergio, toda vez que sus creaciones tienen peso simbólico por lo que son <Strong>mucho más que un logo, una historia sintetizada</Strong>.&quot; - Francisco Arellano.</P>
            </Quote>
            <P>Este testimonio valida el núcleo de la metodología LogoCodeX™: la capacidad de condensar la narrativa completa de una empresa (Historia Sintetizada) en un símbolo funcional, superando la mera decoración estética.</P>
        </Block>
    </section>
);

export default SouthSoftCaseStudy;
