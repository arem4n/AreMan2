'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { useTransition } from 'react';
import { localizedPath } from '@/lib/seo';
import { isPlainLeftClick } from '@/hooks/useLocalizedHref';

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
    const locale = useLocale();
    const router = useRouter();
    // usePathname de next-intl devuelve la ruta sin prefijo de idioma
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const nextLocale = locale === 'es' ? 'en' : 'es';

    const toggleLocale = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isPlainLeftClick(e)) return;
        e.preventDefault();
        if (isPending) return;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    // Enlace real a la misma página en el otro idioma: así los buscadores
    // descubren la versión traducida. El clic normal sigue usando el router.
    return (
        <a
            href={localizedPath(nextLocale, pathname)}
            hrefLang={nextLocale}
            onClick={toggleLocale}
            aria-disabled={isPending || undefined}
            className={`inline-block font-mono text-xs font-bold tracking-widest transition-all duration-200 ${className}`}
            aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
            <span className={locale === 'es' ? 'text-deep-900' : 'text-deep-400'}>ES</span>
            <span className="mx-1 text-deep-300">/</span>
            <span className={locale === 'en' ? 'text-deep-900' : 'text-deep-400'}>EN</span>
        </a>
    );
};

export default LanguageSwitcher;
