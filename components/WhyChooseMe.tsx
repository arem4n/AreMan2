
import React, { type PropsWithChildren } from 'react';

const Card = ({ title, children }: { title: string } & PropsWithChildren) => (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-deep-100 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl group">
        <h4 className="font-display font-bold text-deep-800 text-2xl mb-4 group-hover:text-symbolic-600 transition-colors">{title}</h4>
        <div className="text-deep-600 leading-relaxed">{children}</div>
    </div>
);

const WhyChooseMe: React.FC = () => {
    return (
        <section id="por-que-elegirme" className="py-16 lg:py-24 bg-gradient-to-br from-symbolic-50 to-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-display font-bold text-deep-800 mb-6">
                        ¿Por qué AREM4N?
                    </h2>
                </div>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card title="Trabajas conmigo, no con una agencia.">
                        <p>No hay equipo detrás interpretando lo que dijiste en una reunión. El equipo soy yo. Cada decisión pasa por mí, desde el primer brief hasta la entrega final. Lo que construyo contigo es lo que se plasma.</p>
                    </Card>
                    <Card title="El método tiene historia, no es improvisación.">
                        <p><strong>LogoCodeX™</strong> no es un framework inventado. Es la sistematización de mi forma natural de diseñar, el proceso que ya aplicaba intuitivamente durante años, puesto en palabras, en pasos y en un sistema replicable. Cada proyecto lo pone a prueba y lo refina.</p>
                    </Card>
                    <Card title="Mi propia marca es la primera prueba.">
                        <p className="mb-4"><strong>AREM4N</strong> es el Proyecto Cero. El primer lugar donde apliqué LogoCodeX™ antes de ofrecérselo a alguien más.</p>
                        <p>Lo que ves en esta página no es decoración. El cuervo, la paleta, la tipografía, el copy, el diseño. Cada decisión pasó por el mismo proceso que voy a aplicar en tu marca.</p>
                        <p className="font-semibold italic mt-2">No te estoy vendiendo algo que no haya probado primero en mí mismo.</p>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseMe;
