import React, { Suspense } from 'react';
import TransitionLink from '../../../components/TransitionLink';
import type { Metadata } from 'next';
import { portfolioProjects } from '../../../constants';
import { CaseStudyNav } from '../../../components/casestudies/CaseStudyNav';

// Lazy load Case Studies to improve initial load performance (Code Splitting)
const Arem4nCaseStudy = React.lazy(() => import('../../../components/casestudies/Arem4nCaseStudy'));
const Arem4nProfessionalCaseStudy = React.lazy(() => import('../../../components/casestudies/Arem4nProfessionalCaseStudy'));
const GenericCaseStudy = React.lazy(() => import('../../../components/casestudies/GenericCaseStudy'));
const OstTechCaseStudy = React.lazy(() => import('../../../components/casestudies/OstTechCaseStudy'));
const AlbornozCaseStudy = React.lazy(() => import('../../../components/casestudies/AlbornozCaseStudy'));
const SouthSoftCaseStudy = React.lazy(() => import('../../../components/casestudies/SouthSoftCaseStudy'));
const Bm3CaseStudy = React.lazy(() => import('../../../components/casestudies/Bm3CaseStudy'));
const TommyBoxCaseStudy = React.lazy(() => import('../../../components/casestudies/TommyBoxCaseStudy'));
import { BackArrowIcon } from '../../../components/icons/CodexIcons';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const project = portfolioProjects.find(p => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Caso de Estudio no encontrado',
      description: 'Este caso de estudio no parece existir.',
    };
  }

  return {
    title: `Caso de Estudio: ${project.title} | AREM4N`,
    description: project.description || `Un análisis detallado del proyecto ${project.title}.`,
  };
}

const renderCaseStudy = (slug: string) => {
    const isGeneric = ![
        'areman-escudo-heraldico',
        'arem4n-professional-brand',
        'osttech-cybersecurity',
        'albornoz-propiedades',
        'southsoft-development',
        'bm3-constructora',
        'tommybox-training'
    ].includes(slug);

    if (isGeneric) {
        return <GenericCaseStudy slug={slug} />;
    }

    const CaseStudyComponent = (() => {
        switch (slug) {
            case 'areman-escudo-heraldico':
                return Arem4nCaseStudy;
            case 'arem4n-professional-brand':
                return Arem4nProfessionalCaseStudy;
            case 'osttech-cybersecurity':
                return OstTechCaseStudy;
            case 'albornoz-propiedades':
                return AlbornozCaseStudy;
            case 'southsoft-development':
                return SouthSoftCaseStudy;
            case 'bm3-constructora':
                return Bm3CaseStudy;
            case 'tommybox-training':
                return TommyBoxCaseStudy;
            default:
                return () => null; // Should not happen
        }
    })();

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-symbolic-600"></div>
            </div>
        }>
            <CaseStudyComponent />
        </Suspense>
    );
};


export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = params;

  return (
    <div className="bg-deep-50 min-h-screen font-body pb-20 md:pb-0">
        <CaseStudyNav />
        <main className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
            {renderCaseStudy(slug)}
             <section className="text-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white p-10 rounded-2xl shadow-xl animate-fade-in-up mt-16" style={{ animationDelay: '400ms' }}>
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">¿Listo para crear tu propio símbolo?</h2>
                <p className="text-lg text-symbolic-100 max-w-3xl mx-auto leading-relaxed">
                    Si esta forma de abordar el branding resuena contigo, conversemos sobre cómo podemos aplicar la metodología LogoCodex™ para construir el alma de tu marca y evitar la irrelevancia.
                </p>
                 <TransitionLink
                    href="/#contacto"
                    className="mt-8 inline-block bg-creative-500 hover:bg-creative-600 text-deep-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                    Inicia tu Proyecto Simbólico
                </TransitionLink>
            </section>
        </main>
    </div>
  );
}
