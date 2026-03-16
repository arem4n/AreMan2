import React from 'react';

export const TheMoment = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 max-w-4xl mx-auto">
            <div className="space-y-12 text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-12">
                    El momento que cambió cómo veo todo.
                </h2>

                <p className="text-xl text-deep-200 leading-relaxed font-light">
                    Hay un momento en la carrera donde dejás de ver imágenes y empezás a leerlas.
                </p>

                <p className="text-xl text-deep-200 leading-relaxed font-light">
                    Para mí fue cuando entendí que todo comunica con intención, aunque el autor quiera desaparecer. Que detrás de cada imagen, cada palabra, cada símbolo, hay una decisión que dice algo más de lo que parece.
                </p>

                <p className="text-3xl md:text-5xl font-display font-bold text-creative-400 leading-tight py-8">
                    No existe la comunicación neutral. Solo existe la comunicación consciente y la inconsciente.
                </p>

                <p className="text-xl text-deep-200 leading-relaxed font-light">
                    Y que la diferencia entre las dos es enorme.
                </p>

                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-lg md:text-xl text-deep-100 italic">
                        &quot;Eso me hizo ver las marcas de otra manera. Una marca no es un logo. Es un sistema de decisiones que comunica algo constantemente, quiera o no. La pregunta no es si tu marca está diciendo algo. La pregunta es si está diciendo lo que quieres decir.&quot;
                    </p>
                </div>
            </div>
        </section>
    );
};
