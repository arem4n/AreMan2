import React from 'react';
import { useLoading } from './LoadingContext';

const About: React.FC = () => {
    const { customNavigate } = useLoading();

    return (
        <section id="origen" className="py-16 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-symbolic-100 text-symbolic-600 text-xs font-bold tracking-widest uppercase mb-4">
                    Origen
                </span>
                <h2 className="text-fluid-section font-display font-bold text-deep-800 mb-8">
                    {"No estudié diseño gráfico. Estudié cine."}
                </h2>
                <div className="text-lg md:text-xl text-deep-700 leading-relaxed mb-10 max-w-3xl mx-auto space-y-6 text-left md:text-center">
                    <p>
                        En cine aprendí algo que la mayoría de los diseñadores no sabe: toda imagen transmite algo, quieras o no. El vacío también comunica. La omisión también es una decisión.
                    </p>
                    <p>
                        Con el tiempo entendí que las marcas tienen el mismo problema. Y que resolverlo no termina en un logo — termina en los sistemas que hacen que ese logo funcione en el mundo real.
                    </p>
                    <p>
                        <strong className="text-symbolic-600">LogoCodeX™</strong> es el método. El software es la consecuencia.
                    </p>
                    <p className="text-deep-500 text-base">
                        — Sergio Arellano, Puerto Montt · Chile
                    </p>
                </div>
                <button
                    onClick={() => customNavigate('/origen')}
                    className="inline-flex items-center text-symbolic-600 font-bold text-lg hover:text-symbolic-700 transition-colors group"
                >
                    Leer la historia completa
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </button>
            </div>
        </section>
    );
};

export default About;