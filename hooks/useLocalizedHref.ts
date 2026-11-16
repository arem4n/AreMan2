import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import { useLocale } from 'next-intl';
import { localizedPath } from '@/lib/seo';

/**
 * Devuelve una función que arma el `href` real de una ruta interna en el
 * idioma actual ('/origen' → '/en/origen' en inglés).
 *
 * Sirve para que los enlaces sean `<a href>` rastreables sin romper la regla
 * del repo: la navegación sigue pasando por `customNavigate` en el `onClick`
 * (ver `isPlainLeftClick`), y el `href` queda para buscadores, "abrir en
 * pestaña nueva" y navegadores sin JavaScript.
 */
export function useLocalizedHref() {
    const locale = useLocale();

    return useCallback(
        (href: string): string => {
            // Anclas de la misma página y enlaces externos se dejan tal cual.
            if (!href.startsWith('/')) return href;
            const [path, hash] = href.split('#');
            const localized = localizedPath(locale, path || '/');
            return hash ? `${localized}#${hash}` : localized;
        },
        [locale]
    );
}

/**
 * true si el clic debe interceptarse para navegar con `customNavigate`.
 * Con Ctrl/Cmd/Shift/Alt o botón central se deja actuar al navegador
 * (abrir en pestaña o ventana nueva).
 */
export function isPlainLeftClick(e: MouseEvent): boolean {
    return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}
