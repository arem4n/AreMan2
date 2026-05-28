import React from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '../analytics';
import { Icon } from './icons/Icon';

interface ServiceCardProps {
    title: string;
    price: string;
    description: string[];
    subtitle?: string;
    recommended?: boolean;
    onButtonClick: (title: string) => void;
    icon?: React.ReactNode;
    ctaLabel: string;
    recommendedLabel: string;
    estimatedLabel: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, subtitle, description, recommended = false, onButtonClick, icon, ctaLabel, recommendedLabel, estimatedLabel }) => (
    <div className={`relative card-hover rounded-2xl p-4 lg:p-5 shadow-lg flex flex-col h-full transition duration-200 ease-out ${recommended ? 'bg-symbolic-700 text-white shadow-xl' : 'bg-white border border-deep-100'}`}>
        {recommended && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-creative-400 text-deep-900 px-3 py-1 rounded-full text-xs font-semibold z-10">{recommendedLabel}</div>}

        {icon && (
            <div className="flex justify-center mb-3">
                <div className="p-2.5 rounded-full bg-white/10 border border-white/10">
                    {icon}
                </div>
            </div>
        )}

        <h4 className={`text-lg lg:text-xl font-display font-bold mb-1 text-center ${recommended ? 'text-white' : 'text-deep-800'}`}>{title}</h4>
        {subtitle && (
            <p className={`text-xs lg:text-sm font-semibold italic mb-2 text-center ${recommended ? 'text-creative-300' : 'text-symbolic-600'}`}>
                {subtitle}
            </p>
        )}
        <div className={`text-xs lg:text-sm mb-3 flex-grow ${recommended ? 'text-symbolic-200' : 'text-deep-800'}`}>
            {description.map((line, index) => (
                <p key={index} className="mb-1 last:mb-0">{line}</p>
            ))}
        </div>
        <div className="text-right mt-auto">
            <div className={`text-xl lg:text-2xl font-bold ${recommended ? 'text-creative-300' : 'text-symbolic-600'}`}>{price}</div>
            <div className={`text-[10px] ${recommended ? 'text-symbolic-200' : 'text-deep-500'}`}>{estimatedLabel}</div>
        </div>
        <button
            type="button"
            onClick={() => {
                trackEvent('select_service_package', { packageName: title });
                onButtonClick(title);
            }}
            className={`mt-4 self-center w-max text-center font-semibold py-2 px-5 text-sm rounded-full transition duration-200 ease-out shadow-lg hover:shadow-xl [@media(hover:hover)]:hover:scale-105 active:scale-95 ${recommended ? 'bg-creative-500 hover:bg-creative-600 text-deep-900' : 'bg-symbolic-600 hover:bg-symbolic-700 text-white'}`}
        >
            {ctaLabel}
        </button>
    </div>
);

interface ServicesProps {
    onPackageSelect: (packageName: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onPackageSelect }) => {
    const t = useTranslations('Services');

    return (
        <>
            <section id="servicios" className="bg-deep-50 py-12 lg:py-20 relative">
                <div className="max-w-6xl mx-auto px-4 w-full flex flex-col">
                    <h2 className="text-fluid-section font-display font-bold text-center mb-8 lg:mb-12 text-deep-800">
                        {t('title')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
                        <div className="w-full flex flex-col h-full">
                            <ServiceCard
                                title={t('presencia.title')}
                                subtitle={t('presencia.subtitle')}
                                price={t('presencia.price')}
                                description={[t('presencia.description')]}
                                onButtonClick={onPackageSelect}
                                ctaLabel={t('ctaCard')}
                                recommendedLabel={t('recommended')}
                                estimatedLabel={t('estimatedInvestment')}
                                icon={<Icon name="services-presencia" size={32} className="text-symbolic-600" />}
                            />
                        </div>

                        <div className="w-full flex flex-col h-full">
                            <ServiceCard
                                title={t('autoridad.title')}
                                subtitle={t('autoridad.subtitle')}
                                price={t('autoridad.price')}
                                description={[t('autoridad.description1'), t('autoridad.description2'), t('autoridad.description3')]}
                                recommended
                                onButtonClick={onPackageSelect}
                                ctaLabel={t('ctaCard')}
                                recommendedLabel={t('recommended')}
                                estimatedLabel={t('estimatedInvestment')}
                                icon={<Icon name="services-autoridad" size={32} className="text-creative-400" />}
                            />
                        </div>

                        <div className="w-full flex flex-col h-full">
                            <ServiceCard
                                title={t('legado.title')}
                                subtitle={t('legado.subtitle')}
                                price={t('legado.price')}
                                description={[t('legado.description1'), t('legado.description2'), t('legado.description3')]}
                                onButtonClick={onPackageSelect}
                                ctaLabel={t('ctaCard')}
                                recommendedLabel={t('recommended')}
                                estimatedLabel={t('estimatedInvestment')}
                                icon={<Icon name="services-legado" size={32} className="text-deep-800" />}
                            />
                        </div>
                    </div>

                    <p className="text-sm lg:text-base text-center max-w-3xl mx-auto text-deep-800 leading-relaxed">
                        {t('disclaimerPre')}{' '}<strong>{t('disclaimerBold')}</strong>{t('disclaimerPost')}
                    </p>
                </div>
            </section>

            <section id="construccion-digital" className="bg-white border-t border-deep-200 py-12 lg:py-20 relative">
                <div className="max-w-5xl mx-auto px-4 w-full flex flex-col lg:gap-10">
                    <div className="text-center mb-8 lg:mb-12">
                        <span className="inline-block px-4 py-1 bg-deep-900/5 text-deep-500 text-xs font-bold tracking-widest uppercase rounded-full mb-2">
                            {t('digital.tag')}
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-deep-800 mb-1.5">
                            {t('digital.title')}
                        </h3>
                        <p className="text-sm lg:text-base text-deep-600 max-w-2xl mx-auto">
                            {t('digital.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <div className="w-full flex flex-col h-full">
                            <div className="bg-white rounded-2xl p-4 lg:p-5 shadow-lg border border-deep-100 flex flex-col gap-3 h-full justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-widest text-symbolic-600 uppercase">{t('digital.webTag')}</span>
                                    <h4 className="text-lg lg:text-xl font-display font-bold text-deep-800">{t('digital.webTitle')}</h4>
                                    <p className="text-deep-700 text-xs lg:text-sm leading-relaxed">{t('digital.webDescription')}</p>
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <div>
                                        <div className="text-xl font-bold text-symbolic-600">{t('digital.webPrice')}</div>
                                        <div className="text-xs text-deep-500">{t('estimatedInvestment')}</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onPackageSelect(t('digital.webTag'))}
                                        className="self-start font-semibold py-2 px-5 text-sm rounded-full bg-symbolic-600 hover:bg-symbolic-700 text-white transition duration-200 ease-out shadow-lg [@media(hover:hover)]:hover:scale-105 active:scale-95"
                                    >
                                        {t('digital.webCta')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col h-full">
                            <div className="bg-deep-900 rounded-2xl p-4 lg:p-5 shadow-xl border border-deep-700 flex flex-col gap-3 text-white h-full justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-bold tracking-widest text-creative-400 uppercase">{t('digital.appTag')}</span>
                                    <h4 className="text-lg lg:text-xl font-display font-bold text-white">{t('digital.appTitle')}</h4>
                                    <p className="text-deep-300 text-xs lg:text-sm leading-relaxed">{t('digital.appDescription')}</p>
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <div className="flex justify-between items-baseline gap-2 flex-wrap">
                                        <div>
                                            <div className="text-xl font-bold text-creative-400">{t('digital.appPrice')}</div>
                                            <div className="text-xs text-deep-400">{t('estimatedInvestmentScope')}</div>
                                        </div>
                                        <a
                                            href="#portafolio"
                                            className="text-xs text-creative-400 hover:text-creative-300 transition-colors underline underline-offset-2"
                                        >
                                            {t('digital.appCaseLink')}
                                        </a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onPackageSelect(t('digital.appTag'))}
                                        className="self-start font-semibold py-2 px-5 text-sm rounded-full bg-creative-500 hover:bg-creative-400 text-deep-900 transition duration-200 ease-out shadow-lg [@media(hover:hover)]:hover:scale-105 active:scale-95"
                                    >
                                        {t('digital.appCta')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
