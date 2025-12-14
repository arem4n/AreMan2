
import { MetadataRoute } from 'next';
import { portfolioProjects } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://areman.vercel.app';

  const projectUrls = portfolioProjects.map(project => ({
    url: `${baseUrl}/logocodex/${project.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/logocodex`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
