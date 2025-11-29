import React from 'react';

const About: React.FC = () => {
    return (
        <section id="sobre-mi" className="py-16 lg:py-24 bg-gradient-to-br from-symbolic-50 to-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-deep-800 mb-12">
                    Sobre mí
                </h2>
                <p className="text-lg text-deep-800 leading-relaxed mb-6">
                    Soy Sergio (AreMan), <strong>diseñador audiovisual y de branding especializado en crear identidades visuales desde cero para startups.</strong> Cada proyecto refleja la esencia y visión de la marca, con un <strong>enfoque personalizado, cercano y conceptual.</strong> Trabajo para que tu marca comunique claramente quién eres y qué representas, combinando estética, estrategia y narrativa visual.
                </p>
            </div>
        </section>
    );
};

export default About;