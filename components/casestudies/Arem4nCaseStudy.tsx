
'use client';

import React from 'react';

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
            <ImageDisplay src="https://i.postimg.cc/158cFqpp/IMG-20250725-231309-545.webp" alt="Escudo heráldico de AreMan" caption="El escudo final: Síntesis de Cóndor, Montaña y Árbol."/>
        </Block>

        <Hr />
        
        <SectionTitle>2. ANÁLISIS DE CAPAS SEMIÓTICAS</SectionTitle>
        <Block>
            <P>Según la metodología LogoCodeX™, este diseño revela su significado en 5 niveles de profundidad progresiva:</P>
            
            <SubSectionTitle>Capa 1: Lectura Heráldica (2 segundos)</SubSectionTitle>
            <P>Reconocimiento visual instantáneo. Vemos un escudo con un cóndor en posición "displayant" (alas desplegadas) sobre uma montanha negra. La simetría bilateral perfecta y el contraste blanco/negro comunican inmediatamente: autoridad, orden, nobleza y tradición.</P>
            
            <SubSectionTitle>Capa 2: Lectura Biográfica (30 segundos)</SubSectionTitle>
            <P>Contexto personal familiar. El espectador informado reconoce los apellidos:</P>
            <UL>
                <li><strong >Manque (Mapudungun):</strong> Significa Cóndor.</li>
                <li><strong >Arellano (Español):</strong> Topónimo de lugar elevado/montañoso.</li>
                <li><strong >Árbol:</strong> Representa el árbol genealógico familiar.</li>
            </UL>
            
            <SubSectionTitle>Capa 3: Lectura Tipomórfica (2 minutos)</SubSectionTitle>
            <P>Descubrimiento de letras ocultas (Easter Egg). Los símbolos naturais funcionan como tipografía:</P>
            <UL>
                <li><strong >La Montaña es una 'A':</strong> El triángulo forma una A mayúscula perfecta (Arellano). Integración 10/10.</li>
                <li><strong >El Cóndor sugiere una 'M':</strong> Las alas extendidas y el cuerpo forman conceptualmente la letra M (Manque).</li>
                <li><strong >A + M = AreMan:</strong> El nombre está escrito en "código natural".</li>
            </UL>

            <SubSectionTitle>Capa 4: Lectura Simbólica (5 minutos)</SubSectionTitle>
            <P>Conexión con la cosmovisión andina y heráldica europea:</P>
            <UL>
                <li><strong >Cóndor:</strong> Mensajero sagrado entre el cielo (Wenu Mapu) y la tierra. Psicopompo que guía a los ancestros.</li>
                <li><strong >Montaña:</strong> Axis Mundi (Eje del mundo). Punto de conexión cielo-tierra y fundamento inamovible.</li>
                <li><strong >Árbol Invertido:</strong> El espacio negativo revela que las raíces están en la memoria (la piedra negra), pero la copa crece hacia la luz (el futuro).</li>
            </UL>

            <SubSectionTitle>Capa 5: Lectura Mítica (Reflexión Profunda)</SubSectionTitle>
             <Quote>
                <P className="font-bold text-xl text-deep-700">El Mito: "Lo Celestial Emerge de lo Terrestre"</P>
                <P>El escudo es un <strong >Koan Visual</strong>. Narra que el espíritu (Cóndor) no desciende del cielo, sino que <strong >nace de la montaña</strong>. La materia (piedra/montaña) se espiritualiza y se hace vuelo. Representa la dualidad integrada perfectamente: somos hijos de la tierra sólida (Arellano) pero tenemos un destino espiritual elevado (Manque). Es un mandato de identidad: mantener las raíces firmes para poder volar alto.</P>
            </Quote>
        </Block>
        
        <Hr />
        
        <SectionTitle>3. ARQUETIPOS JUNGUIANOS ACTIVADOS</SectionTitle>
        <Block>
            <UL>
                <li><strong >1. El Ancestro/Sabio (Primario):</strong> Sabiduría acumulada. La montaña es el "abuelo geológico" que ha visto pasar siglos.</li>
                <li><strong >2. El Guardián del Umbral (Secundario):</strong> El cóndor vigila límites. Las alas desplegadas protegen el territorio familiar de intrusos.</li>
                <li><strong >3. El Buscador (Terciario):</strong> El diseño responde a la pregunta del Huérfano: "¿Quién soy?". El escudo otorga una respuesta sólida de pertenencia.</li>
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
                imageSrc="https://i.postimg.cc/brRpzLjw/1764016585551.jpg"
            />

            <TransmediaBlock 
                title="Permanencia Histórica"
                subtitle="Nivel 2: Relieve (2.5D)"
                description="Al llevar el diseño a un medallón pétreo en relieve, activamos la memoria ancestral. La luz y la sombra ahora dibujan el símbolo, no la tinta. Esto evoca lápidas, escudos de armas en castillos y monedas antiguas. Valida la atemporalidad del diseño."
                imageSrc="https://i.postimg.cc/W3nCqNsk/1764073757167.jpg"
                isReversed
            />

            <TransmediaBlock 
                title="Mundo Habitable"
                subtitle="Nivel 3: Escultórico (3D)"
                description="El diorama rompe la cuarta pared. Ya no es una representación, es un lugar. El cóndor vuela sobre una montaña real. El árbol tiene volumen. Demuestra que el logotipo no es un dibujo plano, sino una ventana a un mundo narrativo tridimensional."
                imageSrc="https://i.postimg.cc/tT5wnq9V/1764073978948.jpg"
            />

            <TransmediaBlock 
                title="El Mito Revelado"
                subtitle="Nivel 4: Hiperrealismo"
                description="La visión final. Una composición cinematográfica que muestra cómo el símbolo se vería si existiera en la realidad. Es la máxima expresión de la narrativa: el momento exacto en que el espíritu (Cóndor) toca la materia (Montaña)."
                imageSrc="https://i.postimg.cc/prhm0wNQ/1764017630653.jpg"
                isReversed
            />
        </Block>
    </section>
);

export default Arem4nCaseStudy;
