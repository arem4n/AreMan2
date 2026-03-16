import React from 'react';

const MockMap = () => {
    return (
        <div className="w-full h-[600px] bg-deep-900 rounded-3xl overflow-hidden relative border border-deep-700 shadow-2xl my-12">
            <div className="absolute inset-0 bg-[#1a202c]">
                {/* Abstract Chile Map SVG - Simplified */}
                <svg viewBox="0 0 400 800" className="w-full h-full opacity-20">
                    <path d="M150,50 Q180,100 160,200 T170,400 T160,600 T180,750" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-400" />
                    {/* Region shape */}
                    <circle cx="170" cy="400" r="30" fill="currentColor" className="text-deep-700/50" />
                </svg>

                {/* Marker: Puerto Montt */}
                <div className="absolute top-[50%] left-[42%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-creative-500 rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-creative-500 rounded-full relative"></div>
                </div>
            </div>

            <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10 max-w-sm z-10">
                <h3 className="text-xl font-bold text-white mb-2">Puerto Montt, 2022</h3>
                <p className="text-sm text-deep-200">Volví siendo otra persona. Con años de práctica, con preguntas propias y con algo que todavía no tenía nombre.</p>
            </div>
        </div>
    );
};

export const BackToSouth = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-deep-900">
            <div className="max-w-5xl mx-auto w-full space-y-12">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                        La vuelta al sur.
                    </h2>
                    <p className="text-xl text-deep-200 font-light max-w-2xl mx-auto">
                        En 2022 volví a Chile. A Puerto Montt. Al lugar del que me había ido.
                    </p>
                </div>

                <MockMap />

                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <p className="text-xl text-deep-200 leading-relaxed font-light">
                        Fue en esa vuelta donde empecé a ver con claridad algo que siempre había operado en mí: que la identidad genuina no se construye de afuera hacia adentro.
                    </p>
                    <p className="text-2xl text-creative-400 font-bold leading-relaxed">
                        Se construye al revés. Primero entender qué es real. Después hacerlo visible.
                    </p>
                </div>
            </div>
        </section>
    );
};
