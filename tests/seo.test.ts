import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
    SITE_URL,
    localizedPath,
    absoluteUrl,
    languageAlternates,
    pageMetadata,
    indexablePaths,
    buildSitemap,
} from '@/lib/seo';
import { portfolioProjects } from '@/constants';
import { routing } from '@/i18n/routing';

describe('lib/seo — rutas por idioma', () => {
    it('el idioma por defecto va sin prefijo y el resto con prefijo', () => {
        expect(localizedPath('es', '/')).toBe('/');
        expect(localizedPath('es', '/origen')).toBe('/origen');
        expect(localizedPath('en', '/')).toBe('/en');
        expect(localizedPath('en', '/portafolio/tommybox-training')).toBe('/en/portafolio/tommybox-training');
    });

    it('un idioma desconocido cae al idioma por defecto', () => {
        expect(localizedPath('fr', '/origen')).toBe('/origen');
    });

    it('las URL absolutas usan el dominio canónico con www y sin barra final', () => {
        expect(SITE_URL).toBe('https://www.arem4n.com');
        expect(absoluteUrl('es', '/')).toBe('https://www.arem4n.com');
        expect(absoluteUrl('en', '/')).toBe('https://www.arem4n.com/en');
        expect(absoluteUrl('es', '/origen')).toBe('https://www.arem4n.com/origen');
    });

    it('hreflang incluye todos los idiomas y x-default al idioma por defecto', () => {
        expect(languageAlternates('/portafolio')).toEqual({
            es: 'https://www.arem4n.com/portafolio',
            en: 'https://www.arem4n.com/en/portafolio',
            'x-default': 'https://www.arem4n.com/portafolio',
        });
    });
});

describe('lib/seo — pageMetadata', () => {
    const meta = pageMetadata({ locale: 'en', path: '/origen', title: 'Origin', description: 'Desc' });

    it('la canónica y og:url son la URL de la página en su idioma', () => {
        expect(meta.alternates?.canonical).toBe('https://www.arem4n.com/en/origen');
        expect((meta.openGraph as { url?: string }).url).toBe('https://www.arem4n.com/en/origen');
    });

    it('og:locale sigue al idioma', () => {
        expect((meta.openGraph as { locale?: string }).locale).toBe('en_US');
        const es = pageMetadata({ locale: 'es', path: '/', title: 't', description: 'd' });
        expect((es.openGraph as { locale?: string }).locale).toBe('es_CL');
    });

    it('la imagen para redes existe en public/ para cada idioma', () => {
        for (const locale of routing.locales) {
            const m = pageMetadata({ locale, path: '/', title: 't', description: 'd' });
            const images = (m.openGraph as { images: { url: string }[] }).images;
            expect(images).toHaveLength(1);
            const file = path.join(process.cwd(), 'public', images[0].url);
            expect(fs.existsSync(file), `falta ${images[0].url}`).toBe(true);
        }
    });
});

describe('lib/seo — sitemap', () => {
    it('lista home, portafolio, origen y cada caso de estudio', () => {
        const paths = indexablePaths();
        expect(paths).toContain('/');
        expect(paths).toContain('/portafolio');
        expect(paths).toContain('/origen');
        for (const project of portfolioProjects) {
            expect(paths).toContain(`/portafolio/${project.slug}`);
        }
    });

    it('tiene una entrada por ruta e idioma, sin duplicados, todas en el dominio canónico', () => {
        const entries = buildSitemap();
        const urls = entries.map(e => e.url);
        expect(urls).toHaveLength(indexablePaths().length * routing.locales.length);
        expect(new Set(urls).size).toBe(urls.length);
        for (const url of urls) {
            expect(url.startsWith(SITE_URL)).toBe(true);
        }
    });

    it('cada entrada declara sus alternativas de idioma', () => {
        for (const entry of buildSitemap()) {
            const languages = entry.alternates?.languages ?? {};
            for (const locale of routing.locales) {
                expect(languages[locale as keyof typeof languages]).toBeTruthy();
            }
        }
    });
});
