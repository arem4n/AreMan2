
import React from 'react';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('Footer');

    return (
        <footer className="bg-deep-900 text-deep-400 py-8 text-center">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-2xl font-display font-bold text-symbolic-500 mb-2">AREM4N</div>
                <p className="text-sm mb-4">&quot;{t('quote')}&quot;</p>
                <small className="block text-sm text-deep-500">
                    &copy; {currentYear} {t('copyright')}
                </small>
            </div>
        </footer>
    );
};

export default Footer;
