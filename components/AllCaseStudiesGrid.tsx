
import React from 'react';
import { portfolioProjects } from '@/constants';
import { BackArrowIcon } from '@/components/icons/CodexIcons';
import TransitionLink from './TransitionLink';

interface AllCaseStudiesGridProps {
    onBack: () => void;
}

const AllCaseStudiesGrid: React.FC<AllCaseStudiesGridProps> = ({ onBack }) => {
    
    return (
        <div className="bg-deep-50 min-h-screen font-body">
            <main className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
                <header className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl lg:text-6xl font-display font-bold text-gradient mb-4">
                        Todos los Casos de Estudio
                    </h1>
                    <p className="text-lg text-deep-800 max-w-3xl mx-auto">
                        Explora cada proyecto en profundidad para entender cómo la metodología LogoCodex™ se aplica para crear identidades visuales únicas y potentes.
                    </p>
                    <button
                        onClick={onBack}
                        className="mt-8 flex items-center justify-center mx-auto bg-white text-deep-700 font-semibold py-3 px-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        <BackArrowIcon className="w-5 h-5" />
                        <span className="ml-2">Volver a la Metodología</span>
                    </button>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioProjects.map((project, index) => (
                        <TransitionLink
                            href={`/logocodex/${project.slug}`}
                            key={project.slug} 
                            className="block bg-white rounded-2xl shadow-lg border border-deep-100 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-xl animate-fade-in-up overflow-hidden group" 
                            style={{ animationDelay: `${100 + index * 50}ms` }}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img src={project.mainImg} alt={project.altText} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>
                                <h3 className="absolute bottom-4 left-4 text-white text-xl font-display font-bold drop-shadow-md">{project.title}</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-deep-600 mb-4 h-20 overflow-hidden text-ellipsis">{project.caseStudy.description}</p>
                                <span className="font-semibold text-symbolic-600 group-hover:text-symbolic-700 transition-colors flex items-center">
                                    Ver análisis completo 
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">&rarr;</span>
                                </span>
                            </div>
                        </TransitionLink>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AllCaseStudiesGrid;
