
import React from 'react';
import { portfolioProjects } from '@/constants';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Arem4nCaseStudy from '@/components/casestudies/Arem4nCaseStudy';
import Arem4nProfessionalCaseStudy from '@/components/casestudies/Arem4nProfessionalCaseStudy';
import OstTechCaseStudy from '@/components/casestudies/OstTechCaseStudy';
import AlbornozCaseStudy from '@/components/casestudies/AlbornozCaseStudy';
import SouthSoftCaseStudy from '@/components/casestudies/SouthSoftCaseStudy';
import Bm3CaseStudy from '@/components/casestudies/Bm3CaseStudy';
import TommyBoxCaseStudy from '@/components/casestudies/TommyBoxCaseStudy';
import GenericCaseStudy from '@/components/casestudies/GenericCaseStudy';
import CaseStudyLayout from './CaseStudyLayout';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const project = portfolioProjects.find(p => p.slug === slug);

  if (!project) {
    return {
      title: 'Caso de Estudio no Encontrado | AREM4N'
    }
  }

  return {
    title: `${project.title} | Caso de Estudio Portafolio LogoCodeX`,
    description: project.caseStudy.description,
  }
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }))
}

const renderPage = (slug: string) => {
    switch(slug) {
        case 'areman-escudo-heraldico':
            return <Arem4nCaseStudy />;
        case 'arem4n-professional-brand':
            return <Arem4nProfessionalCaseStudy />;
        case 'osttech-software':
            return <OstTechCaseStudy />;
        case 'albornoz-propiedades':
            return <AlbornozCaseStudy />;
        case 'southsoft-consultoria':
            return <SouthSoftCaseStudy />;
        case 'bm3-constructora':
            return <Bm3CaseStudy />;
        case 'tommybox-training':
            return <TommyBoxCaseStudy />;
        default:
            return <GenericCaseStudy slug={slug} />;
    }
};

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const project = portfolioProjects.find(p => p.slug === slug);
    
    if (!project) {
        notFound();
    }

    return (
        <CaseStudyLayout>
            {renderPage(slug)}
        </CaseStudyLayout>
    );
}
