
import React, { type PropsWithChildren } from 'react';
import { useTranslations } from 'next-intl';
import { Icon, IconName } from './icons/Icons';

interface WhyItemProps {
    icon: IconName;
    number: string;
    title: string;
    className?: string;
}

const WhyItem = ({ icon, number, title, children, className }: WhyItemProps & PropsWithChildren) => (
    <div className={`py-12 lg:py-4 px-6 lg:px-8 group transition-all duration-300 ${className ?? ''}`}>
        <div className="flex items-center gap-4 mb-6">
            <div className="text-symbolic-600 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 flex-shrink-0">
                <Icon name={icon} size={32} />
            </div>
            <span className="text-4xl font-display font-extrabold text-symbolic-100 leading-none select-none group-hover:text-symbolic-200 transition-colors duration-300">
                {number}
            </span>
        </div>
        <h4 className="font-display font-bold text-deep-900 text-xl lg:text-2xl mb-4 leading-snug group-hover:text-symbolic-600 transition-colors">
            {title}
        </h4>
        <div className="text-deep-600 leading-relaxed text-base">
            {children}
        </div>
    </div>
);

const WhyChooseMe: React.FC = () => {
    const t = useTranslations('WhyChooseMe');

    return (
        <section id="por-que-elegirme" className="py-20 lg:py-32 bg-deep-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-deep-200 text-deep-700 text-xs font-bold tracking-widest uppercase mb-4">
                        {t('tag')}
                    </span>
                    <h2 className="text-fluid-section font-display font-bold text-deep-800">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-0 divide-y divide-deep-200 lg:divide-y-0 lg:divide-x border-y lg:border-y-0 border-deep-200">
                    <WhyItem icon="why-individual" number="01" title={t('item01Title')} className="lg:pr-10 first:pt-0 lg:pt-4">
                        <p>{t('item01Body')}</p>
                    </WhyItem>
                    <WhyItem icon="why-metodo" number="02" title={t('item02Title')} className="lg:px-10">
                        <p><strong>LogoCodeX™</strong>{' '}{t('item02BodyPre')}</p>
                    </WhyItem>
                    <WhyItem icon="why-prueba" number="03" title={t('item03Title')} className="lg:pl-10 last:pb-0 lg:pb-4">
                        <p className="mb-3"><strong>AREM4N</strong>{' '}{t('item03Body1Pre')}</p>
                        <p>{t('item03Body2')}</p>
                        <p className="font-semibold italic mt-3 text-symbolic-600">{t('item03Body3')}</p>
                    </WhyItem>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseMe;
