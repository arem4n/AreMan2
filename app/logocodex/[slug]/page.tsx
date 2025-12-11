import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { portfolioProjects } from '../../../constants';

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
    description: project.description,
  };
}

const renderCaseStudy = (slug: string) => {
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
                return GenericCaseStudy;
        }
    })();

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-symbolic-600"></div>
            </div>
        }>
            {slug === 'areman-escudo-heraldico' ||
             slug === 'arem4n-professional-brand' ||
             slug === 'osttech-cybersecurity' ||
             slug === 'albornoz-propiedades' ||
             slug === 'southsoft-development' ||
             slug === 'bm3-constructora' ||
             slug === 'tommybox-training'
                ? <CaseStudyComponent />
                : <GenericCaseStudy slug={slug} />
            }
        </Suspense>
    );
};


export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = params;

  return (
    <div className="bg-deep-50 min-h-screen font-body pb-20 md:pb-0">
         <Link
            href="/logocodex"
            className="hidden md:flex fixed bottom-6 right-6 z-[1020] items-center justify-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white font-semibold py-3 px-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up"
            style={{ animationDelay: '900ms' }}
            aria-label="Volver a LogoCodex"
        >
            <BackArrowIcon className="w-5 h-5" />
            <span className="ml-2">Volver a LogoCodex</span>
        </Link>

        <div className="md:hidden fixed bottom-0 left-0 w-full z-[1020] bg-white/95 backdrop-blur-md border-t border-deep-200 p-4 shadow-2xl flex justify-between items-center animate-fade-in-up">
            <Link
                href="/logocodex"
                className="text-deep-600 hover:text-deep-800 p-2"
                aria-label="Volver"
            >
                <BackArrowIcon className="w-6 h-6" />
            </Link>
            <Link
                href="/#contacto"
                className="bg-symbolic-600 text-white font-bold text-sm py-2.5 px-6 rounded-full shadow-lg active:scale-95 transition-transform"
            >
                Quiero un resultado así
            </Link>
        </div>

        <main className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
            {renderCaseStudy(slug)}
             <section className="text-center bg-gradient-to-r from-symbolic-600 to-deep-700 text-white p-10 rounded-2xl shadow-xl animate-fade-in-up mt-16" style={{ animationDelay: '400ms' }}>
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">¿Listo para crear tu propio símbolo?</h2>
                <p className="text-lg text-symbolic-100 max-w-3xl mx-auto leading-relaxed">
                    Si esta forma de abordar el branding resuena contigo, conversemos sobre cómo podemos aplicar la metodología LogoCodex™ para construir el alma de tu marca y evitar la irrelevancia.
                </p>
                 <Link
                    href="/#contacto"
                    className="mt-8 inline-block bg-creative-500 hover:bg-creative-600 text-deep-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                    Inicia tu Proyecto Simbólico
                </Link>
            </section>
        </main>
    </div>
  );
}
