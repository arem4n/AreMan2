
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon, IconName } from './icons/Icons';
import { ChevronRightIcon } from './icons/Icons';

const faqIcons: IconName[] = [
    'faq-soberania',
    'faq-involucramiento',
    'faq-filtro',
    'faq-entrega',
    'faq-ia',
];

const FAQItem: React.FC<{ icon: IconName; question: string; answer: string; index: number }> = ({ icon, question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-deep-200">
            <button
                id={`faq-btn-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left focus-visible:outline-none group"
            >
                <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${isOpen ? 'bg-symbolic-600 text-white' : 'bg-deep-100 text-deep-500 group-hover:bg-deep-200'}`}>
                        <Icon name={icon} size={20} />
                    </div>
                    <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-symbolic-600' : 'text-deep-800 group-hover:text-symbolic-600'}`}>
                        {question}
                    </span>
                </div>
                <span className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-90 text-symbolic-600' : 'text-deep-400'}`}>
                    <ChevronRightIcon className="w-6 h-6" />
                </span>
            </button>

            <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-btn-${index}`}
                style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    transition: 'grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
                }}
            >
                <div style={{ overflow: 'hidden' }}>
                    <p className="pb-6 text-deep-600 leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const t = useTranslations('FAQ');

    const faqs = faqIcons.map((icon, i) => ({
        icon,
        question: t(`q${i + 1}` as any),
        answer: t(`a${i + 1}` as any),
    }));

    return (
        <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-deep-200 text-deep-700 text-xs font-bold tracking-widest uppercase mb-4">
                        {t('tag')}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-deep-800">
                        {t('title')}
                    </h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-deep-100 p-6 lg:p-8">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} index={index} icon={faq.icon} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
