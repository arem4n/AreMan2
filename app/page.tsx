import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'AREM4N | Soberanía Visual & Branding Estratégico',
  description: 'En un mercado saturado de tendencias efímeras, utilizo la metodología LogoCodex™ para inyectar identidad estratégica, semiótica y narrativa a tu marca.',
};

export default function HomePage() {
  return <HomePageClient />;
}
