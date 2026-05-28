
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '../analytics';

const Newsletter: React.FC = () => {
    const t = useTranslations('Newsletter');
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState({ submitting: false, success: false, error: '' });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setFormState({ submitting: false, success: false, error: t('errorEmail') });
            return;
        }
        setFormState({ submitting: true, success: false, error: '' });

        trackEvent('submit_newsletter_form', { offer: 'Creatividad Expandida Book' });

        fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setFormState({ submitting: false, success: true, error: '' });
                    setEmail('');
                    setTimeout(() => setFormState(fs => ({ ...fs, success: false })), 5000);
                } else {
                    setFormState({ submitting: false, success: false, error: data.error || t('errorConnection') });
                }
            })
            .catch(() => {
                setFormState({ submitting: false, success: false, error: t('errorConnection') });
            });
    };

    return (
        <section className="py-16 bg-deep-900 text-white text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-creative-400/10 text-creative-400 text-xs font-bold tracking-widest uppercase mb-4 border border-creative-400/20">
                    {t('tag')}
                </span>
                <h3 className="text-3xl lg:text-5xl font-display font-bold mb-6">
                    {t('title1')} <br /><span className="text-creative-400">{t('title2')}</span>
                </h3>
                <p className="text-lg text-deep-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                    {t('description1')} <strong>{t('descriptionBold')}</strong>.
                    <br /><br />
                    {t('description2')} <em>{t('descriptionBook')}</em>{t('description3')}
                </p>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                    <label htmlFor="newsletter-email" className="sr-only">{t('emailLabel')}</label>
                    <input
                        type="email"
                        id="newsletter-email"
                        placeholder={t('emailPlaceholder')}
                        className="w-full md:w-2/3 px-4 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-creative-400 transition-all"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" disabled={formState.submitting} className="w-full md:w-auto whitespace-nowrap bg-creative-500 hover:bg-creative-600 text-deep-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-creative-500/20 disabled:bg-deep-700 disabled:opacity-75 disabled:cursor-not-allowed">
                        {formState.submitting ? t('submitting') : t('submit')}
                    </button>
                </form>
                <div className="h-6 mt-4">
                    {formState.success && <p className="text-sm text-creative-300 font-medium">{t('successMessage')}</p>}
                    {formState.error && <p className="text-sm text-symbolic-400">{formState.error}</p>}
                </div>
                <p className="text-xs text-deep-500 mt-8 font-mono">{t('disclaimer')}</p>
            </div>
        </section>
    );
};

export default Newsletter;
