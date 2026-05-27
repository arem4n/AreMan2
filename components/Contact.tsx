
import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../analytics';
import { EmailIcon, WhatsAppIcon, InstagramIcon, BehanceIcon } from './icons/SocialIcons';

const ContactInfoItem = ({ icon, title, value, href, linkClass }: { icon: React.ReactNode, title: string, value: string, href: string, linkClass?: string }) => (
    <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-symbolic-600 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <div>
            <div className="font-semibold">{title}</div>
            <a href={href} target="_blank" rel="noopener noreferrer" className={`opacity-90 transition-colors ${linkClass || 'text-creative-400 hover:text-creative-300'}`}>{value}</a>
        </div>
    </div>
);

interface ContactProps {
    selectedPackage: string | null;
    clearSelectedPackage: () => void;
}

const Contact: React.FC<ContactProps> = ({ selectedPackage, clearSelectedPackage }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
    const [formState, setFormState] = useState({ submitting: false, success: false, error: '' });
    
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (selectedPackage) {
            // 1. Set the message based on the package
            if (messageRef.current) {
                const newMessage = `Hola Sergio, quiero auditar mi marca con el paquete '${selectedPackage}'. ¿Cómo funciona el proceso LogoCodex?`;
                setFormData(prev => ({ ...prev, message: newMessage }));
            }

            const outerTimer = setTimeout(() => {
                if (sectionRef.current) {
                    sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (titleRef.current) {
                        titleRef.current.classList.add('scale-110', 'text-creative-400');
                    }
                }
            }, 500);

            const innerTimer = setTimeout(() => {
                if (titleRef.current) {
                    titleRef.current.classList.remove('scale-110', 'text-creative-400');
                }
                clearSelectedPackage();
            }, 2500);

            return () => {
                clearTimeout(outerTimer);
                clearTimeout(innerTimer);
            };
        }
    }, [selectedPackage, clearSelectedPackage]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Bot detection: if honeypot is filled, we act as if it succeeded but do nothing.
        if (formData.honeypot) {
            setFormState({ submitting: false, success: true, error: '' });
            setFormData({ name: '', email: '', message: '', honeypot: '' });
            return;
        }

        if (!formData.name || !formData.email || !formData.message) {
            setFormState({ submitting: false, success: false, error: 'Por favor, completa todos los campos.' });
            return;
        }
        setFormState({ submitting: true, success: false, error: '' });

        trackEvent('submit_contact_form', { fromPackage: selectedPackage || 'N/A' });

        // Integration with Resend API
        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setFormState({ submitting: false, success: true, error: '' });
                setFormData({ name: '', email: '', message: '', honeypot: '' });
                setTimeout(() => setFormState(fs => ({ ...fs, success: false })), 5000);
            } else {
                setFormState({ submitting: false, success: false, error: data.error || 'Algo salió mal.' });
            }
        })
        .catch(err => {
            setFormState({ submitting: false, success: false, error: 'Error de conexión.' });
        });
    };

    return (
        <section id="contacto" ref={sectionRef} className="py-16 lg:py-24 bg-deep-900 relative">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center text-white mb-12">
                    <h2 
                        ref={titleRef}
                        className="text-3xl lg:text-5xl font-display font-bold mb-6 transition-all duration-500 transform origin-center"
                    >
                        Hablemos.
                    </h2>
                    <div className="text-lg opacity-90 mb-8 max-w-2xl mx-auto space-y-4">
                        <p>
                             Lo que más me gusta de este trabajo no es el resultado final. Es el proceso de descubrir qué historia tiene tu empresa y encontrar la forma de contarla visualmente.
                        </p>
                        <p>
                             Cada marca es una narrativa distinta. Eso nunca se vuelve rutina.
                        </p>
                        <p className="font-semibold text-creative-400">
                             Si llegaste hasta acá, es probable que tengas algo que vale la pena contar. Escríbeme y lo descubro juntos.
                        </p>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <form onSubmit={handleSubmit} noValidate className="bg-deep-800 p-8 rounded-2xl shadow-xl flex flex-col space-y-4 border border-deep-600">
                        <div className="mb-2 text-sm text-creative-400 font-semibold uppercase tracking-wider">Diagnóstico Inicial</div>
                        
                        <label htmlFor="contact-name" className="sr-only">Tu Nombre</label>
                        <input 
                            type="text" 
                            id="contact-name" 
                            name="name" 
                            ref={nameRef}
                            placeholder="Nombre del Fundador" 
                            className="p-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder-deep-400 focus:outline-none focus:ring-2 focus:ring-symbolic-500" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                        
                        <label htmlFor="contact-email" className="sr-only">Tu Email</label>
                        <input 
                            type="email" 
                            id="contact-email" 
                            name="email" 
                            placeholder="Email Corporativo" 
                            className="p-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder-deep-400 focus:outline-none focus:ring-2 focus:ring-symbolic-500" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />

                        <label htmlFor="contact-message" className="sr-only">Tu Mensaje</label>
                        <textarea 
                            id="contact-message" 
                            name="message"
                            ref={messageRef}
                            placeholder="Cuéntame brevemente: ¿Cuál es el mayor desafío de identidad de tu startup hoy?" 
                            rows={5} 
                            className="p-3 rounded-lg bg-deep-700 border border-deep-600 text-white placeholder-deep-400 focus:outline-none focus:ring-2 focus:ring-symbolic-500 transition-shadow duration-300" 
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        
                        <input 
                            type="text" 
                            name="honeypot" 
                            style={{ display: 'none' }} 
                            tabIndex={-1} 
                            autoComplete="off" 
                            value={formData.honeypot} 
                            onChange={handleChange} 
                        />


                        <div className="h-14 pt-1">
                            <button type="submit" disabled={formState.submitting} className="w-full bg-symbolic-600 hover:bg-symbolic-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-deep-600 disabled:cursor-not-allowed">
                                {formState.submitting ? 'Procesando...' : 'Solicitar Diagnóstico'}
                            </button>
                            {formState.success && <p className="text-center text-sm text-creative-300 pt-2">¡Solicitud recibida! Te contactaré para agendar.</p>}
                            {formState.error && <p className="text-center text-sm text-symbolic-400 pt-2">{formState.error}</p>}
                        </div>
                    </form>

                    <div className="space-y-6 text-white">
                        <ContactInfoItem icon={<EmailIcon />} title="Email Directo" value="contacto@arem4n.com" href="mailto:contacto@arem4n.com" />
                        <ContactInfoItem icon={<WhatsAppIcon />} title="WhatsApp Directo" value="+56 9 3497 3287" href="https://wa.me/56934973287" />
                        <ContactInfoItem icon={<InstagramIcon />} title="Instagram" value="@arem4n" href="https://www.instagram.com/arem4n" />
                        <ContactInfoItem icon={<BehanceIcon />} title="Portafolio Extendido" value="behance.net/arem4n" href="https://www.behance.net/arem4n" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
