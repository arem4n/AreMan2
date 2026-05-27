
import React from 'react';
import { Icon } from './Icon';

export const EmailIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-white" }) => (
    <Icon name="contact-email" className={className} />
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-white" }) => (
    <Icon name="contact-whatsapp" className={className} />
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-white" }) => (
    <Icon name="contact-instagram" className={className} />
);

export const BehanceIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-white" }) => (
    <Icon name="contact-behance" className={className} />
);