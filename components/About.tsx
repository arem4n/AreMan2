import React from 'react';
import { useLoading } from './LoadingContext';

const About: React.FC = () => {
    const { customNavigate } = useLoading();

    return (
        <section id="origen" className="py-16 lg:py-24 bg-gradient-to-br from-symbolic-50 to-white overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-symbolic-100 text-symbolic-600 text-xs font-bold tracking-widest uppercase mb-4">
                    Origen
                </span>
                <h2 className="text-3xl lg:text-6xl font-display font-bold text-deep-800 mb-8 leading-tight">
                    {"\"No estudié diseño gráfico. Estudié cine.\""}
                </h2>
                <p className="text-lg md:text-xl text-deep-700 leading-relaxed mb-10 max-w-2xl mx-auto">
                    Y eso cambió todo. Descubrí que las marcas funcionan como personajes: necesitan conflicto y resolución. Durante 10 años diseñé en los márgenes hasta que la IA me ayudó a sistematizar mi intuición en un método propio.
                </p>
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