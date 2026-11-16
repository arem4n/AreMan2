'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useLocalizedHref, isPlainLeftClick } from '@/hooks/useLocalizedHref';

const strings = {
    es: {
        heading: 'Ya sabes quién soy.',
        headingLine2: '¿Hablamos de tu empresa?',
        btnPortfolio: 'Ver el trabajo',
        btnContact: 'Escribir directamente',
    },
    en: {
        heading: "Now you know who I am.",
        headingLine2: "Shall we talk about your company?",
        btnPortfolio: 'See the work',
        btnContact: 'Write directly',
    }
};

export function CTASection({ navigateTo, rm }: { navigateTo: (hash: string) => void; rm: boolean | null }) {
    const locale = useLocale();
    const s = strings[locale as 'es' | 'en'] ?? strings.es;
    const localizedHref = useLocalizedHref();

    const go = (target: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isPlainLeftClick(e)) return;
        e.preventDefault();
        navigateTo(target);
    };

    return (
        <motion.div
            initial={rm ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="py-16 md:py-24 text-center"
        >
            <p className="font-display text-fluid-section font-bold uppercase text-deep-900 mb-10">
                {s.heading}<br />{s.headingLine2}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                    href={localizedHref('/portafolio')}
                    onClick={go('/portafolio')}
                    className="inline-flex items-center justify-center bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-4 px-8 rounded-full transition duration-200 ease-out shadow-lg hover:shadow-xl hover:scale-[1.03] border border-symbolic-500 cursor-pointer focus:outline-none active:scale-95"
                    style={{ minHeight: '44px' }}
                >
                    {s.btnPortfolio}
                </a>
                <a
                    href={localizedHref('/#contacto')}
                    onClick={go('/#contacto')}
                    className="inline-flex items-center justify-center bg-transparent hover:bg-deep-100 text-deep-700 hover:text-deep-900 font-semibold py-4 px-8 rounded-full transition duration-200 ease-out border border-deep-300 hover:border-deep-400 cursor-pointer focus:outline-none active:scale-95"
                    style={{ minHeight: '44px' }}
                >
                    {s.btnContact}
                </a>
            </div>
        </motion.div>
    );
}
