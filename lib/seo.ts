import type { Metadata, MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { portfolioProjects } from '@/constants';

type Locale = (typeof routing.locales)[number];

/** Dominio canónico. El apex (arem4n.com) redirige aquí. */
export const SITE_URL = 'https://www.arem4n.com';
export const SITE_NAME = 'AREM4N';

const OG_LOCALE: Record<Locale, string> = { es: 'es_CL', en: 'en_US' };
const OG_IMAGE: Record<Locale, string> = {
    es: '/images/og-arem4n.jpg',
    en: '/images/og-arem4n-en.jpg',
};

function normalizeLocale(locale: string): Locale {
    return routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale;
}

/**
 * Ruta pública de una página en un idioma, igual que la arma el middleware
 * (`localePrefix: 'as-needed'`): el idioma por defecto va sin prefijo.
 * `path` es la ruta sin idioma: '/', '/origen', '/portafolio/<slug>'.
 */
export function localizedPath(locale: string, path: string): string {
    const clean = path === '/' ? '' : path;
    const loc = normalizeLocale(locale);
    if (loc === routing.defaultLocale) return clean || '/';
    return `/${loc}${clean}`;
}

export function absoluteUrl(locale: string, path: string): string {
    const p = localizedPath(locale, path);
    return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
}

/** Mapa hreflang → URL absoluta, con x-default apuntando al idioma por defecto. */
export function languageAlternates(path: string): Record<string, string> {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
        languages[locale] = absoluteUrl(locale, path);
    }
    languages['x-default'] = absoluteUrl(routing.defaultLocale, path);
    return languages;
}

interface PageMetadataInput {
    locale: string;
    /** Ruta sin idioma: '/', '/origen', '/portafolio/<slug>'. */
    path: string;
    title: string;
    description: string;
    /** Título para redes; por defecto el mismo `title`. */
    ogTitle?: string;
    /** Descripción para redes; por defecto la misma `description`. */
    ogDescription?: string;
    ogType?: 'website' | 'article';
}

/**
 * Metadatos completos de una página: canónica, hreflang, Open Graph y Twitter.
 * Next reemplaza `openGraph` entero cuando una página lo define (no lo fusiona
 * con el del layout), así que cada página debe pasar por aquí para no perder
 * la imagen ni la URL.
 */
export function pageMetadata({
    locale,
    path,
    title,
    description,
    ogTitle,
    ogDescription,
    ogType = 'website',
}: PageMetadataInput): Metadata {
    const loc = normalizeLocale(locale);
    const url = absoluteUrl(loc, path);
    const socialTitle = ogTitle ?? title;
    const socialDescription = ogDescription ?? description;
    const image = OG_IMAGE[loc];

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: languageAlternates(path),
        },
        openGraph: {
            title: socialTitle,
            description: socialDescription,
            url,
            siteName: SITE_NAME,
            images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
            locale: OG_LOCALE[loc],
            type: ogType,
        },
        twitter: {
            card: 'summary_large_image',
            title: socialTitle,
            description: socialDescription,
            images: [image],
        },
    };
}

/** Rutas indexables del sitio, sin idioma. */
export function indexablePaths(): string[] {
    return ['/', '/portafolio', '/origen', ...portfolioProjects.map(p => `/portafolio/${p.slug}`)];
}

export function buildSitemap(): MetadataRoute.Sitemap {
    return indexablePaths().flatMap(path =>
        routing.locales.map(locale => ({
            url: absoluteUrl(locale, path),
            alternates: { languages: languageAlternates(path) },
        }))
    );
}
