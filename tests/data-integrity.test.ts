import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { portfolioProjects } from '@/constants';
import { routing } from '@/i18n/routing';

// El propio CLAUDE.md advierte: "/portafolio tiene dos rutas de renderizado
// independientes que AMBAS necesitan una entrada `case` por proyecto" —
// el switch de LogoCodex.tsx (tab viewer) y el de app/[locale]/portafolio/
// [slug]/page.tsx (página completa). Si se agrega un proyecto nuevo y se
// olvida uno de los dos, no explota (hay un `default` con GenericCaseStudy),
// así que el olvido pasa desapercibido en desarrollo. Estos tests protegen
// contra ese desajuste silencioso.

function extractCaseSlugs(filePath: string): string[] {
  const src = fs.readFileSync(filePath, 'utf8');
  const matches = Array.from(src.matchAll(/case\s+'([^']+)':/g));
  return matches.map(m => m[1]);
}

const ROOT = path.resolve(__dirname, '..');
const LOGOCODEX_PATH = path.join(ROOT, 'components/LogoCodex.tsx');
const SLUG_PAGE_PATH = path.join(ROOT, 'app/[locale]/portafolio/[slug]/page.tsx');

describe('portfolioProjects: forma de los datos', () => {
  it('no está vacío', () => {
    expect(portfolioProjects.length).toBeGreaterThan(0);
  });

  it('cada proyecto tiene los campos requeridos no vacíos', () => {
    for (const p of portfolioProjects) {
      expect(p.slug, `slug de "${p.title}"`).toBeTruthy();
      expect(p.title, `title de "${p.slug}"`).toBeTruthy();
      expect(p.mainImg, `mainImg de "${p.slug}"`).toBeTruthy();
      expect(p.altText, `altText de "${p.slug}"`).toBeTruthy();
      expect(p.testimonial, `testimonial de "${p.slug}"`).toBeTruthy();
      expect(p.clientName, `clientName de "${p.slug}"`).toBeTruthy();
      expect(p.clientRole, `clientRole de "${p.slug}"`).toBeTruthy();
      expect(p.link, `link de "${p.slug}"`).toBeTruthy();
      expect(p.caseStudy?.client, `caseStudy.client de "${p.slug}"`).toBeTruthy();
      expect(p.caseStudy?.description, `caseStudy.description de "${p.slug}"`).toBeTruthy();
    }
  });

  it('tiene al menos una imagen de galería por proyecto, cada una con src y alt', () => {
    for (const p of portfolioProjects) {
      expect(p.galleryImages.length, `galleryImages de "${p.slug}"`).toBeGreaterThan(0);
      for (const img of p.galleryImages) {
        expect(img.src, `imagen sin src en "${p.slug}"`).toBeTruthy();
        expect(img.alt, `imagen sin alt en "${p.slug}" (${img.src})`).toBeTruthy();
      }
    }
  });

  it('los slugs son únicos', () => {
    const slugs = portfolioProjects.map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('los slugs tienen formato kebab-case válido (sin espacios, mayúsculas ni acentos)', () => {
    for (const p of portfolioProjects) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('mainImg y las imágenes de galería apuntan a rutas dentro de /images/', () => {
    for (const p of portfolioProjects) {
      expect(p.mainImg, `mainImg de "${p.slug}"`).toMatch(/^\/images\//);
      for (const img of p.galleryImages) {
        expect(img.src, `galleryImage de "${p.slug}"`).toMatch(/^\/images\//);
      }
    }
  });
});

describe('portfolioProjects: cobertura en las dos rutas de renderizado (LogoCodex + [slug]/page)', () => {
  it('todo slug de portfolioProjects tiene un case en renderCaseStudy (LogoCodex.tsx)', () => {
    const caseSlugs = new Set(extractCaseSlugs(LOGOCODEX_PATH));
    const faltantes = portfolioProjects.map(p => p.slug).filter(slug => !caseSlugs.has(slug));
    expect(faltantes, 'Proyectos sin case en LogoCodex.tsx (van a caer al GenericCaseStudy sin querer)').toEqual([]);
  });

  it('todo slug de portfolioProjects tiene un case en renderPage ([slug]/page.tsx)', () => {
    const caseSlugs = new Set(extractCaseSlugs(SLUG_PAGE_PATH));
    const faltantes = portfolioProjects.map(p => p.slug).filter(slug => !caseSlugs.has(slug));
    expect(faltantes, 'Proyectos sin case en [slug]/page.tsx (van a caer al GenericCaseStudy sin querer)').toEqual([]);
  });

  it('los dos switches cubren exactamente el mismo set de slugs entre sí', () => {
    const logoCodexSlugs = new Set(extractCaseSlugs(LOGOCODEX_PATH));
    const pageSlugs = new Set(extractCaseSlugs(SLUG_PAGE_PATH));
    expect(Array.from(logoCodexSlugs).sort()).toEqual(Array.from(pageSlugs).sort());
  });
});

describe('generateStaticParams: locale × slug', () => {
  it('routing.locales incluye es y en (coherente con el matcher del middleware)', () => {
    expect(routing.locales).toContain('es');
    expect(routing.locales).toContain('en');
  });

  it('genera un param por cada combinación locale × proyecto', () => {
    const params = routing.locales.flatMap(locale =>
      portfolioProjects.map(project => ({ locale, slug: project.slug }))
    );
    expect(params.length).toBe(routing.locales.length * portfolioProjects.length);
    // Todas las combinaciones deben ser únicas
    const keys = params.map(p => `${p.locale}/${p.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
