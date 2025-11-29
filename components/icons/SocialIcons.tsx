
import React from 'react';

const IconProps = {
    className: "w-6 h-6 text-white"
};

export const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || IconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || IconProps.className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.885-.002 2.024.63 3.965 1.739 5.618l-1.18 4.329 4.432-1.173zM8.23 7.29c-.193-.334-.452-.392-.632-.398-.18-.005-.367-.008-.552-.008-.182 0-.466.063-.703.334-.234.27-.896.869-.896 2.121s.92 2.451 1.042 2.623c.124.17 1.783 2.923 4.465 3.97.633.245 1.128.39 1.52.502.593.164 1.128.14.154.552.023.412.023.776.023.823s-.008.063-.308.334c-.3.27-.92.81-1.124.981-.202.171-.403.19-.664.124-.26-.064-1.127-.414-2.147-1.332-1.021-.918-1.688-2.04-1.96-2.393-.27-.352-.564-.464-.78-.464-.218 0-.418.063-.562.334z" />
    </svg>
);


export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || IconProps.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export const BehanceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || IconProps.className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-6v-2h6v2zm-6.75 3c.002-1.458-.834-2.74-2.25-2.74s-2.25 1.282-2.25 2.74c0 1.459.833 2.74 2.25 2.74s2.248-1.281 2.25-2.74zm-2.25 1.25c-.562 0-1.04-.377-1.04-.99 0-.612.478-.99 1.04-.99s1.04.378 1.04.99c0 .613-.478.99-1.04.99zm-4.75 3.75h5.5c0 1.381-1.119 2.5-2.5 2.5h-.5c-1.381 0-2.5-1.119-2.5-2.5zm-1.25-1.417c-1.514 0-2.75 1.236-2.75 2.75s1.236 2.75 2.75 2.75 2.75-1.236 2.75-2.75-1.236-2.75-2.75-2.75zm0 4.083c-.703 0-1.25-.547-1.25-1.25s.547-1.25 1.25-1.25 1.25.547 1.25 1.25-.547 1.25-1.25 1.25z" />
    </svg>
);