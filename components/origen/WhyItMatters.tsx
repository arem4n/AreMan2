import React from 'react';

export const WhyItMatters = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-white text-deep-900">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-deep-800 mb-12">
                    Por qué importa.
                </h2>

                <p className="text-xl md:text-2xl font-light text-deep-600 leading-relaxed max-w-3xl mx-auto">
                    No construí LogoCodeX™ para diferenciarme en el mercado.
                </p>

                <p className="text-xl md:text-2xl font-light text-deep-600 leading-relaxed max-w-3xl mx-auto">
                    Lo construí porque no encontré ningún método que respondiera la pregunta que más me importaba:
                </p>

                <div className="bg-deep-50 p-8 rounded-2xl border border-deep-200 shadow-sm max-w-2xl mx-auto">
                    <p className="text-2xl md:text-3xl font-display font-bold text-symbolic-600 italic">
                        ¿Cómo se hace visible lo que una empresa es realmente?
                    </p>
                </div>

                <p className="text-xl text-deep-700 leading-relaxed">
                    Esa pregunta sigue siendo el centro de cada proyecto que tomo.
                </p>

                <div className="h-16"></div> {/* Spacer */}

                <p className="text-lg md:text-xl font-medium text-creative-600">
                    Si llegaste hasta acá, probablemente es la misma pregunta que te trajo aquí.
                </p>

                <div className="mt-12">
                    <a
                        href="/#contacto"
                        className="inline-block bg-symbolic-600 hover:bg-symbolic-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                        Solicitar Auditoría de Identidad
                    </a>
                </div>
            </div>
        </section>
    );
};
