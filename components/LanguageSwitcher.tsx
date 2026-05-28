'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { useTransition } from 'react';

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLocale = () => {
        const nextLocale = locale === 'es' ? 'en' : 'es';
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggleLocale}
            disabled={isPending}
            className={`font-mono text-xs font-bold tracking-widest transition-all duration-200 ${className}`}
            aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
            <span className={locale === 'es' ? 'text-deep-900' : 'text-deep-400'}>ES</span>
            <span className="mx-1 text-deep-300">/</span>
            <span className={locale === 'en' ? 'text-deep-900' : 'text-deep-400'}>EN</span>
        </button>
    );
};

export default LanguageSwitcher;
