
import React, { type PropsWithChildren } from 'react';
import { Icon, IconName } from './icons/Icons';

interface WhyItemProps {
    icon: IconName;
    number: string;
    title: string;
    className?: string;
}

const WhyItem = ({ icon, number, title, children, className }: WhyItemProps & PropsWithChildren) => (
    <div className={`py-12 lg:py-4 px-6 lg:px-8 group transition-all duration-300 ${className ?? ''}`}>
        <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-deep-100 text-symbolic-600 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <Icon name={icon} size={28} />
            </div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-deep-400 uppercase">
                Etapa {number}
            </span>
        </div>
        <h4 className="font-display font-bold text-deep-900 text-xl lg:text-2xl mb-4 leading-snug group-hover:text-symbolic-600 transition-colors">
            {title}
        </h4>
        <div className="text-deep-600 leading-relaxed text-base">
            {children}
        </div>
    </div>
);

const WhyChooseMe: React.FC = () => {
    return (
        <section id="por-que-elegirme" className="py-20 lg:py-32 bg-deep-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-deep-200 text-deep-700 text-xs font-bold tracking-widest uppercase mb-4">
                        Diferenciación Real
                    </span>
                    <h2 className="text-fluid-section font-display font-bold text-deep-800">
                        ¿Por qué AREM4N?
                    </h2>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-0 divide-y divide-deep-200 lg:divide-y-0 lg:divide-x border-y lg:border-y-0 border-deep-200">
                    <WhyItem icon="why-individual" number="01" title="Trabajas conmigo, no con una agencia." className="lg:pr-10 first:pt-0 lg:pt-4">
                        <p>No hay equipo detrás interpretando lo que dijiste en una reunión. El equipo soy yo. Cada decisión pasa por mí, desde el primer brief hasta la entrega final. Lo que construyo contigo es lo que se plasma.</p>
                    </WhyItem>
                    <WhyItem icon="why-metodo" number="02" title="El método tiene historia, no es improvisación." className="lg:px-10">
                        <p><strong>LogoCodeX™</strong> no es un framework inventado. Es la sistematización de mi forma natural de diseñar, el proceso que ya aplicaba intuitivamente durante años, puesto en palabras, en pasos y en un sistema replicable. Cada proyecto lo pone a prueba y lo refina.</p>
                    </WhyItem>
                    <WhyItem icon="why-prueba" number="03" title="Mi propia marca es la primera prueba." className="lg:pl-10 last:pb-0 lg:pb-4">
                        <p className="mb-3"><strong>AREM4N</strong> es el Proyecto Cero. El primer lugar donde apliqué LogoCodeX™ antes de ofrecérselo a alguien más.</p>
                        <p>Lo que ves en esta página no es decoración. El cuervo, la paleta, la tipografía, el copy, el diseño. Cada decisión pasó por el mismo proceso que voy a aplicar en tu marca.</p>
                        <p className="font-semibold italic mt-3 text-symbolic-600">No te estoy vendiendo algo que no haya probado primero en mí mismo.</p>
                    </WhyItem>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseMe;

