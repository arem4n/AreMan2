
import { MetadataRoute } from 'next';
import { portfolioProjects } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://areman.vercel.app';

  const projectUrls = portfolioProjects.map(project => ({
    url: `${baseUrl}/logocodex/${project.slug}`,
    lastModified: new Date('2025-01-10'),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.7,
  }));

  // Specific priorities for key projects
  const aremanEscudo = projectUrls.find(p => p.url.includes('areman-escudo-heraldico'));
  if(aremanEscudo) aremanEscudo.priority = 0.8;

  const arem4nProfessional = projectUrls.find(p => p.url.includes('arem4n-professional-brand'));
  if(arem4nProfessional) arem4nProfessional.priority = 0.8;


  return [
    {
      url: baseUrl,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/logocodex`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
