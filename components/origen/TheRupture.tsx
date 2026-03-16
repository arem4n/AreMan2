import React from 'react';

export const TheRupture = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-creative-400">
            <div className="max-w-4xl mx-auto text-center z-10 space-y-12 text-white mix-blend-difference">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-12">
                    La ruptura.
                </h2>

                <p className="text-xl md:text-2xl leading-relaxed font-light">
                    Después de casi una década en Buenos Aires llegó un momento en que los marcos disponibles no alcanzaban. No porque fueran incorrectos. Porque mi forma de ver había crecido más allá de ellos.
                </p>

                <p className="text-xl md:text-2xl leading-relaxed font-bold">
                    No podía seguir aplicando sistemas de otros sin traicionarme.
                </p>

                <p className="text-xl md:text-2xl leading-relaxed font-light">
                    Eso me obligó a hacer algo incómodo: construir mi propio sistema desde cero.
                </p>
            </div>
        </section>
    );
};
