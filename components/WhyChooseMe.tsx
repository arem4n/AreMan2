
import React, { type PropsWithChildren } from 'react';

const Card = ({ title, children }: { title: string } & PropsWithChildren) => (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-deep-100 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl group">
        <h4 className="font-display font-bold text-deep-800 text-2xl mb-4 group-hover:text-symbolic-600 transition-colors">{title}</h4>
        <p className="text-deep-600 leading-relaxed">{children}</p>
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
                    <p className="text-lg text-deep-600 max-w-2xl mx-auto">
                        No soy una agencia que subcontrata ni una IA que alucina. Soy un consultor estratégico que opera en la intersección del arte, la psicología y el negocio.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card title="Anti-Fragilidad Visual">
                        Mientras las tendencias de diseño cambian cada 6 meses, los <strong>símbolos arquetípicos</strong> duran siglos. Construyo identidades diseñadas para sobrevivir a la volatilidad del mercado y ganar valor con el tiempo.
                    </Card>
                    <Card title="Profundidad = Autoridad">
                        Tu cliente sabe cuando una marca es superficial. Mi metodología <strong>LogoCodeX™</strong> inyecta capas de significado (biográfico, cultural, semiótico) que convierten tu logo en una herramienta de venta y autoridad instintiva.
                    </Card>
                    <Card title="Soberanía vs. Plantilla">
                        El mayor riesgo de una startup es parecerse a su competencia. No uso plantillas. Cada trazo es una respuesta directa a tu ADN empresarial, garantizando que seas el <strong>único propietario</strong> de tu narrativa visual.
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseMe;
