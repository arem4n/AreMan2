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

const AlbornozCaseStudy: React.FC = () => (
    <section>
        <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">
                ALBORNOZ PROPIEDADES
            </h2>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
                Branding Comercial con Tipomorfología Adaptativa
            </h1>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">Validación emocional y codificación geográfica en el Sur de Chile.</p>
        </header>

        <Block>
            <SectionTitle>1. BRIEFING Y DESAFÍO</SectionTitle>
            <P><Strong>Cliente:</Strong> Patricia Albornoz (Emprendimiento unipersonal).</P>
            <P><Strong>Ubicación:</Strong> Puerto Montt, Sur de Chile.</P>
            <P><Strong>Objetivo:</Strong> Crear una identidad que proyectara confianza inmediata en un mercado saturado, capturando la esencia geográfica (verde, lluvia, naturaleza) para diferenciarse de los genéricos corporativos (rojo/azul).</P>
        </Block>

        <Hr />
        
        <SectionTitle>2. ANÁLISIS DEL ISOTIPO MULTICAPA</SectionTitle>
        <Block>
            <SubSectionTitle>Nivel 1: Simbolismo Icónico (Lo que ves)</SubSectionTitle>
            <UL>
                <li><Strong>La Casa:</Strong> Forma arquetípica con techo triangular pronunciado (funcional para la lluvia sureña). Ventana de 4 paneles que simboliza luz, transparencia y hogar.</li>
                <li><Strong>Los Árboles:</Strong> Una corona orgánica que &quot;abraza&quot; la casa. Comunica &quot;propiedades en entornos naturales&quot; y protección.</li>
                <li><Strong>El Color:</Strong> Verde oliva/musgo. Un tono terroso real, no digital, que conecta con la vegetación húmeda de la zona.</li>
            </UL>

            <SubSectionTitle>Nivel 2: Tipomorfología Avanzada (Lo oculto)</SubSectionTitle>
            <P>El diseño integra las iniciales de la marca mediante una estructura inteligente:</P>
            <UL>
                <li><Strong>La Letra &quot;A&quot; (10/10):</Strong> La estructura completa de la casa forma una &quot;A&quot; mayúscula sólida.</li>
                <li><Strong>La Letra &quot;P&quot; (9.5/10):</Strong> El lado izquierdo de la casa forma una &quot;P&quot;. Esto se logra mediante una <strong>asimetría intencional</strong> (el soporte derecho es más corto) y el refuerzo visual de la curvatura de los árboles.</li>
            </UL>
             <ImageDisplay src="/images/albornoz-main.webp" alt="Isotipo Albornoz Propiedades" caption="Integración de A+P en la estructura de la casa y el árbol." />
        </Block>
        
        <Hr />
        
        <SectionTitle>3. ESTRATEGIA ARQUETÍPICA Y TRANSMEDIA</SectionTitle>
        <Block>
             <SubSectionTitle>Arquetipos Junguianos</SubSectionTitle>
             <UL>
                <li><Strong>1. El Cuidador (Primario):</Strong> Seguridad, calidez, protección. Los árboles abrazando la casa dicen &quot;aquí te cuidamos&quot;.</li>
                <li><Strong>2. El Sabio Local (Secundario):</Strong> Conocimiento profundo del territorio. El color específico demuestra que no es una franquicia genérica, sino un experto local.</li>
                <li><Strong>3. El Inocente (Terciario):</Strong> Honestidad y simplicidad. La casa arquetípica genera confianza inmediata.</li>
             </UL>

             <SubSectionTitle>Sistema Transmedia: El Recorrido del Cliente</SubSectionTitle>
             <P className="mb-6">La identidad no se queda en el logo; se despliega en objetos físicos que guían la experiencia del cliente desde el primer contacto hasta la firma.</P>
             
             <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Tarjeta Horizontal */}
                <div className="bg-deep-50 p-4 rounded-xl">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                        <img src="/images/albornoz-tarjeta.webp" alt="Tarjeta de Presentación Mockup" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-deep-800 mb-2">Tarjeta de Presentación</h4>
                    <P className="text-sm">Diseño polisémico. El anverso traza un &quot;Camino Diagonal&quot; desde el logo al contacto. El reverso revela un &quot;Ojo Experto&quot; formado por el QR y una hoja.</P>
                </div>

                {/* Carpeta Vertical */}
                <div className="bg-deep-50 p-4 rounded-xl">
                    <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                        <img src="/images/albornoz-carpeta.webp" alt="Carpeta de Oficio Mockup" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-deep-800 mb-2">Carpeta de Oficio</h4>
                    <P className="text-sm">Objeto de larga duración entregado en la firma de escrituras. Su diseño vertical refuerza la confianza y profesionalismo en el momento clave.</P>
                </div>

                {/* Pendón Vertical */}
                <div className="bg-deep-50 p-4 rounded-xl">
                    <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                        <img src="/images/albornoz-pendon.webp" alt="Pendón de Escritorio" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-deep-800 mb-2">Pendón de Escritorio</h4>
                    <P className="text-sm">Elemento de branding vertical para punto de venta o feria, manteniendo la consistencia visual y autoridad de marca.</P>
                </div>

                {/* Oficina Horizontal */}
                <div className="bg-deep-50 p-4 rounded-xl">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                        <img src="/images/albornoz-oficina.webp" alt="Oficina con Logotipo" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-deep-800 mb-2">Oficina Corporativa</h4>
                    <P className="text-sm">Aplicación ambiental del logotipo, creando un espacio de trabajo que respira la identidad de la marca.</P>
                </div>

                {/* Señalética Mixed */}
                <div className="md:col-span-2 bg-deep-50 p-4 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                         <div className="aspect-[4/5] md:aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <img src="/images/albornoz-vende.webp" alt="Letrero Se Vende" className="w-full h-full object-cover" />
                         </div>
                         <div className="aspect-[4/5] md:aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <img src="/images/albornoz-arrienda.webp" alt="Letrero Se Arrienda" className="w-full h-full object-cover" />
                         </div>
                    </div>
                    <h4 className="font-bold text-deep-800 mb-2">Señalética (Venta y Arriendo)</h4>
                    <P className="text-sm">Foco de aislamiento. El logo en blanco puro sobre fondo verde texturizado actúa como un faro visual, legible a gran distancia en el entorno urbano y rural.</P>
                </div>
             </div>
        </Block>

        <Hr />

        <Block>
            <SectionTitle>4. VALIDACIÓN DEL CLIENTE</SectionTitle>
             <Quote>
                <P>&quot;Excelente trabajo personalizado, pudimos ir definiendo cada detalle y supiste interpretar a la perfección cada idea ligada a una emoción. Muchas gracias por tu trabajo.&quot; - Patricia Albornoz.</P>
            </Quote>
            <P>Este testimonio público es la validación definitiva del método LogoCodeX™: trascender lo estético para codificar valores emocionales reales que el cliente siente como propios.</P>
        </Block>
    </section>
);

export default AlbornozCaseStudy;
