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

const content = {
    es: {
        headerTitle: 'Branding Comercial con Tipomorfología Adaptativa',
        headerSub: 'Validación emocional y codificación geográfica en el Sur de Chile.',
        s1Title: '1. BRIEFING Y DESAFÍO',
        s1ClientLabel: 'Cliente:', s1Client: 'Patricia Albornoz (Emprendimiento unipersonal).',
        s1LocationLabel: 'Ubicación:', s1Location: 'Puerto Montt, Sur de Chile.',
        s1GoalLabel: 'Objetivo:', s1Goal: 'Crear una identidad que proyectara confianza inmediata en un mercado saturado, capturando la esencia geográfica (verde, lluvia, naturaleza) para diferenciarse de los genéricos corporativos (rojo/azul).',
        s2Title: '2. ANÁLISIS DEL ISOTIPO MULTICAPA',
        s2Sub1: 'Nivel 1: Simbolismo Icónico (Lo que ves)',
        s2Li1Label: 'La Casa:', s2Li1: ' Forma arquetípica con techo triangular pronunciado (funcional para la lluvia sureña). Ventana de 4 paneles que simboliza luz, transparencia y hogar.',
        s2Li2Label: 'Los Árboles:', s2Li2: ' Una corona orgánica que "abraza" la casa. Comunica "propiedades en entornos naturales" y protección.',
        s2Li3Label: 'El Color:', s2Li3: ' Verde oliva/musgo. Un tono terroso real, no digital, que conecta con la vegetación húmeda de la zona.',
        s2Sub2: 'Nivel 2: Tipomorfología Avanzada (Lo oculto)',
        s2P2: 'El diseño integra las iniciales de la marca mediante una estructura inteligente:',
        s2Li4Label: 'La Letra "A" (10/10):', s2Li4: ' La estructura completa de la casa forma una "A" mayúscula sólida.',
        s2Li5Pre: 'La Letra "P" (9.5/10):', s2Li5Mid: 'asimetría intencional', s2Li5Post: ' El lado izquierdo de la casa forma una "P". Esto se logra mediante una  (el soporte derecho es más corto) y el refuerzo visual de la curvatura de los árboles.',
        s2Caption: 'Integración de A+P en la estructura de la casa y el árbol.',
        s3Title: '3. ESTRATEGIA ARQUETÍPICA Y TRANSMEDIA',
        s3Sub1: 'Arquetipos Junguianos',
        s3Li6Label: '1. El Cuidador (Primario):', s3Li6: ' Seguridad, calidez, protección. Los árboles abrazando la casa dicen "aquí te cuidamos".',
        s3Li7Label: '2. El Sabio Local (Secundario):', s3Li7: ' Conocimiento profundo del territorio. El color específico demuestra que no es una franquicia genérica, sino un experto local.',
        s3Li8Label: '3. El Inocente (Terciario):', s3Li8: ' Honestidad y simplicidad. La casa arquetípica genera confianza inmediata.',
        s3Sub2: 'Sistema Transmedia: El Recorrido del Cliente',
        s3P3: 'La identidad no se queda en el logo; se despliega en objetos físicos que guían la experiencia del cliente desde el primer contacto hasta la firma.',
        card1Title: 'Tarjeta de Presentación',
        card1Desc: 'Diseño polisémico. El anverso traza un "Camino Diagonal" desde el logo al contacto. El reverso revela un "Ojo Experto" formado por el QR y una hoja.',
        card2Title: 'Carpeta de Oficio',
        card2Desc: 'Objeto de larga duración entregado en la firma de escrituras. Su diseño vertical refuerza la confianza y profesionalismo en el momento clave.',
        card3Title: 'Pendón de Escritorio',
        card3Desc: 'Elemento de branding vertical para punto de venta o feria, manteniendo la consistencia visual y autoridad de marca.',
        card4Title: 'Oficina Corporativa',
        card4Desc: 'Aplicación ambiental del logotipo, creando un espacio de trabajo que respira la identidad de la marca.',
        card5Title: 'Señalética (Venta y Arriendo)',
        card5Desc: 'Foco de aislamiento. El logo en blanco puro sobre fondo verde texturizado actúa como un faro visual, legible a gran distancia en el entorno urbano y rural.',
        s4Title: '4. VALIDACIÓN DEL CLIENTE',
        s4Quote: '"Excelente trabajo personalizado, pudimos ir definiendo cada detalle y supiste interpretar a la perfección cada idea ligada a una emoción. Muchas gracias por tu trabajo." - Patricia Albornoz.',
        s4P: 'Este testimonio público es la validación definitiva del método LogoCodeX™: trascender lo estético para codificar valores emocionales reales que el cliente siente como propios.',
    },
    en: {
        headerTitle: 'Commercial Branding with Adaptive Typomorphology',
        headerSub: 'Emotional validation and geographic encoding in Southern Chile.',
        s1Title: '1. BRIEFING & CHALLENGE',
        s1ClientLabel: 'Client:', s1Client: 'Patricia Albornoz (Solo entrepreneur).',
        s1LocationLabel: 'Location:', s1Location: 'Puerto Montt, Southern Chile.',
        s1GoalLabel: 'Goal:', s1Goal: 'Create an identity that projected immediate trust in a saturated market, capturing the geographic essence (green, rain, nature) to stand apart from generic corporate brands (red/blue).',
        s2Title: '2. MULTI-LAYER LOGOTYPE ANALYSIS',
        s2Sub1: 'Level 1: Iconic Symbolism (What you see)',
        s2Li1Label: 'The House:', s2Li1: ' Archetypal shape with a pronounced triangular roof (functional for southern rain). A 4-panel window symbolizing light, transparency and home.',
        s2Li2Label: 'The Trees:', s2Li2: ' An organic crown that "embraces" the house. Communicates "properties in natural environments" and protection.',
        s2Li3Label: 'The Color:', s2Li3: ' Olive/moss green. An earthy, non-digital tone that connects with the humid vegetation of the region.',
        s2Sub2: 'Level 2: Advanced Typomorphology (The hidden)',
        s2P2: "The design integrates the brand's initials through an intelligent structure:",
        s2Li4Label: 'Letter "A" (10/10):', s2Li4: ' The complete structure of the house forms a solid capital "A".',
        s2Li5Pre: 'Letter "P" (9.5/10):', s2Li5Mid: 'intentional asymmetry', s2Li5Post: ' The left side of the house forms a "P". This is achieved through  (the right support is shorter) and the visual reinforcement of the tree curvature.',
        s2Caption: 'Integration of A+P in the house structure and tree.',
        s3Title: '3. ARCHETYPAL & TRANSMEDIA STRATEGY',
        s3Sub1: 'Jungian Archetypes',
        s3Li6Label: '1. The Caregiver (Primary):', s3Li6: ' Security, warmth, protection. The trees embracing the house say "we take care of you here".',
        s3Li7Label: '2. The Local Sage (Secondary):', s3Li7: " Deep knowledge of the territory. The specific color proves it's not a generic franchise, but a local expert.",
        s3Li8Label: '3. The Innocent (Tertiary):', s3Li8: ' Honesty and simplicity. The archetypal house generates immediate trust.',
        s3Sub2: 'Transmedia System: The Client Journey',
        s3P3: 'The identity does not stop at the logo; it unfolds across physical objects that guide the client experience from first contact to signing.',
        card1Title: 'Business Card',
        card1Desc: 'Polysemic design. The front traces a "Diagonal Path" from the logo to contact info. The back reveals an "Expert Eye" formed by the QR and a leaf.',
        card2Title: 'Presentation Folder',
        card2Desc: 'Long-lasting object delivered at deed signing. Its vertical design reinforces trust and professionalism at the key moment.',
        card3Title: 'Desktop Banner',
        card3Desc: 'Vertical branding element for a point of sale or trade fair, maintaining visual consistency and brand authority.',
        card4Title: 'Corporate Office',
        card4Desc: "Environmental application of the logotype, creating a workspace that breathes the brand's identity.",
        card5Title: 'Signage (For Sale & For Rent)',
        card5Desc: 'Isolation focus. The logo in pure white on a textured green background acts as a visual beacon, legible from a great distance in urban and rural environments.',
        s4Title: '4. CLIENT VALIDATION',
        s4Quote: '"Excellent personalized work, we were able to define every detail and you perfectly interpreted every idea tied to an emotion. Many thanks for your work." - Patricia Albornoz.',
        s4P: 'This public testimonial is the ultimate validation of the LogoCodeX™ method: transcending aesthetics to encode real emotional values that the client feels as their own.',
    }
};

const AlbornozCaseStudy: React.FC = () => {
    const locale = useLocale();
    const c = content[locale as 'es' | 'en'] ?? content.es;

    return (
        <section>
            <header className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-deep-800">ALBORNOZ PROPIEDADES</h2>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-deep-800 mb-4">{c.headerTitle}</h1>
                <p className="text-lg text-deep-600 max-w-2xl mx-auto">{c.headerSub}</p>
            </header>

            <Block>
                <SectionTitle>{c.s1Title}</SectionTitle>
                <P><Strong>{c.s1ClientLabel}</Strong> {c.s1Client}</P>
                <P><Strong>{c.s1LocationLabel}</Strong> {c.s1Location}</P>
                <P><Strong>{c.s1GoalLabel}</Strong> {c.s1Goal}</P>
            </Block>

            <Hr />

            <SectionTitle>{c.s2Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s2Sub1}</SubSectionTitle>
                <UL>
                    <li><Strong>{c.s2Li1Label}</Strong>{c.s2Li1}</li>
                    <li><Strong>{c.s2Li2Label}</Strong>{c.s2Li2}</li>
                    <li><Strong>{c.s2Li3Label}</Strong>{c.s2Li3}</li>
                </UL>

                <SubSectionTitle>{c.s2Sub2}</SubSectionTitle>
                <P>{c.s2P2}</P>
                <UL>
                    <li><Strong>{c.s2Li4Label}</Strong>{c.s2Li4}</li>
                    <li><Strong>{c.s2Li5Pre}</Strong> {c.s2Li5Post.replace('  ', ' ')}</li>
                </UL>
                <ImageDisplay src="/images/albornoz-main.webp" alt="Isotipo Albornoz Propiedades" caption={c.s2Caption} />
            </Block>

            <Hr />

            <SectionTitle>{c.s3Title}</SectionTitle>
            <Block>
                <SubSectionTitle>{c.s3Sub1}</SubSectionTitle>
                <UL>
                    <li><Strong>{c.s3Li6Label}</Strong>{c.s3Li6}</li>
                    <li><Strong>{c.s3Li7Label}</Strong>{c.s3Li7}</li>
                    <li><Strong>{c.s3Li8Label}</Strong>{c.s3Li8}</li>
                </UL>

                <SubSectionTitle>{c.s3Sub2}</SubSectionTitle>
                <P className="mb-6">{c.s3P3}</P>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-deep-50 p-4 rounded-xl">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                            <img src="/images/albornoz-tarjeta.webp" alt="Tarjeta de Presentación Mockup" className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-deep-800 mb-2">{c.card1Title}</h4>
                        <P className="text-sm">{c.card1Desc}</P>
                    </div>

                    <div className="bg-deep-50 p-4 rounded-xl">
                        <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                            <img src="/images/albornoz-carpeta.webp" alt="Carpeta de Oficio Mockup" className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-deep-800 mb-2">{c.card2Title}</h4>
                        <P className="text-sm">{c.card2Desc}</P>
                    </div>

                    <div className="bg-deep-50 p-4 rounded-xl">
                        <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                            <img src="/images/albornoz-pendon.webp" alt="Pendón de Escritorio" className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-deep-800 mb-2">{c.card3Title}</h4>
                        <P className="text-sm">{c.card3Desc}</P>
                    </div>

                    <div className="bg-deep-50 p-4 rounded-xl">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                            <img src="/images/albornoz-oficina.webp" alt="Oficina con Logotipo" className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-deep-800 mb-2">{c.card4Title}</h4>
                        <P className="text-sm">{c.card4Desc}</P>
                    </div>

                    <div className="md:col-span-2 bg-deep-50 p-4 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="aspect-[4/5] md:aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                                <img src="/images/albornoz-vende.webp" alt="Letrero Se Vende" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-[4/5] md:aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                                <img src="/images/albornoz-arrienda.webp" alt="Letrero Se Arrienda" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h4 className="font-bold text-deep-800 mb-2">{c.card5Title}</h4>
                        <P className="text-sm">{c.card5Desc}</P>
                    </div>
                </div>
            </Block>

            <Hr />

            <Block>
                <SectionTitle>{c.s4Title}</SectionTitle>
                <Quote>
                    <P>{c.s4Quote}</P>
                </Quote>
                <P>{c.s4P}</P>
            </Block>
        </section>
    );
};

export default AlbornozCaseStudy;
