import React from 'react';

export const CinemaConfirmed = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-deep-900 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center z-10">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-16">
                    Lo que el cine confirmó.
                </h2>

                <div className="space-y-8 text-xl text-deep-200 font-light leading-relaxed">
                    <p>
                        Estudié Diseño de Imagen y Sonido en la FADU, Buenos Aires. Casi una década aprendiendo que cada plano tiene que justificar su existencia. Que el espacio, la luz y el símbolo comunican antes que las palabras.
                    </p>
                    <p className="font-medium text-white">
                        Que un personaje sin historia interna no convence a nadie, por más bien que se vea.
                    </p>
                    <p>
                        Con el tiempo empecé a aplicar eso a las marcas. Una marca es un personaje. Necesita una historia interna coherente para que el mundo externo la crea. Sin eso, es decoración que se ve bien en el portafolio pero no funciona en el mundo real.
                    </p>
                </div>
            </div>
        </section>
    );
};
