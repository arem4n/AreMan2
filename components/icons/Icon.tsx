'use client';

import React from 'react';

/**
 * AREM4N Iconography System
 * Style: Geometric, 1.75 stroke, no fill, currentColor.
 */

const icons = {
  // SERVICES
  'services-presencia': (
    <g>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  ),
  'services-autoridad': (
    <g>
      <path d="M4 10l8 4 8-4-8-4-8 4z" />
      <path d="M4 14l8 4 8-4" />
      <path d="M4 18l8 4 8-4" />
    </g>
  ),
  'services-legado': (
    <g>
      <path d="M12 2v20M2 12h20" />
      <path d="M12 12l7.07-7.07M12 12l7.07 7.07M12 12L4.93 19.07M12 12L4.93 4.93" />
      <path d="M12 7l5 5-5 5-5-5 5-5z" />
    </g>
  ),
  'services-web': (
    <path d="M3 5h18v14H3V5zm0 4h18" />
  ),
  'services-webapp': (
    <g>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7l-5.5 10M12 7l5.5 10M7 19h10" />
    </g>
  ),
  
  // PROCESS
  'process-diagnostico': (
    <g>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </g>
  ),
  'process-construccion': (
    <g>
      <path d="M3 3h18v18H3V3z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path d="M12 12L3 3M12 12l9-9M12 12l-9 9M12 12l9 9" />
    </g>
  ),
  'process-revision': (
    <g>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 5h18" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 19H3" />
    </g>
  ),
  'process-entrega': (
    <g>
      <path d="M3 10v11h18V10" />
      <path d="M12 2v12M8 6l4-4 4 4" />
    </g>
  ),
  
  // WHY
  'why-individual': (
    <g>
      <circle cx="12" cy="8" r="4" />
      <path d="M12 12v10" />
    </g>
  ),
  'why-metodo': (
    <g>
      <path d="M4 6h16M4 12h12M4 18h8" />
      <circle cx="2" cy="6" r="0.5" fill="currentColor" />
      <circle cx="2" cy="12" r="0.5" fill="currentColor" />
      <circle cx="2" cy="18" r="0.5" fill="currentColor" />
    </g>
  ),
  'why-prueba': (
    <path d="M5 3v12l7 6 7-6V3H5z" />
  ),
  
  // DELIVERABLES
  'deliverable-logo': (
    <g>
      <path d="M12 3l9 6v6l-9 6-9-6V9l9-6z" />
      <path d="M12 8l1.5 2.5 2.5 1.5-2.5 1.5L12 16l-1.5-2.5-2.5-1.5 2.5-1.5L12 8z" />
    </g>
  ),
  'deliverable-manual': (
    <g>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M14 2v6l-2-2-2 2V2" />
    </g>
  ),
  'deliverable-motion': (
    <g>
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4V8z" />
      <path d="M22 12c0 2-4 2-4 2" />
    </g>
  ),
  'deliverable-cromatico': (
    <g>
      <circle cx="12" cy="8" r="5" />
      <circle cx="8" cy="15" r="5" />
      <circle cx="16" cy="15" r="5" />
    </g>
  ),
  'deliverable-tipografia': (
    <path d="M4 20l6-16h4l6 16M7 16h10" />
  ),
  'deliverable-mockups': (
    <g>
      <path d="M3 5h18v12H3V5z" />
      <path d="M7 12l6-4 2 8-8-4z" />
    </g>
  ),
  'deliverable-iconografia': (
    <g>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
      <path d="M15 15l4 4" />
    </g>
  ),
  'deliverable-social': (
    <g>
      <circle cx="12" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M10 8.5L7.5 15.5M14 8.5l2.5 7.5" />
    </g>
  ),
  
  // LOGOCODEX
  'codex-semiotica': (
    <g>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 12l4-4m0 0h-3m3 0v3" />
    </g>
  ),
  'codex-arquetipos': (
    <g>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </g>
  ),
  'codex-narrativa': (
    <g>
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <path d="M4 12c4-8 12 8 16 0" />
      <path d="M17 12l3 0l-1.5-1.5" />
    </g>
  ),
  
  // FAQ
  'faq-soberania': (
    <path d="M5 15l7-12 7 12H5zm0 0v3h14v-3" />
  ),
  'faq-involucramiento': (
    <g>
      <circle cx="8" cy="7" r="3" />
      <circle cx="16" cy="7" r="3" />
      <path d="M4 17h8M12 17h8" />
    </g>
  ),
  'faq-filtro': (
    <path d="M3 4h18l-7 9v7l-4 2v-9l-7-9z" />
  ),
  'faq-entrega': (
    <g>
      <path d="M3 8h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      <path d="M3 8l9-5 9 5M12 12l3 3m-3-3l3-3" />
    </g>
  ),
  'faq-ia': (
    <path d="M2 10h4l2-4h8l2 4h4M6 10v6l2 2h8l2-2v-6" />
  ),
  
  // CONTACT
  'contact-email': (
    <g>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </g>
  ),
  'contact-whatsapp': (
    <g>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-7.6 8.38 8.38 0 013.8.9L21 4.5z" />
      <path d="M13 10l-2 4 4-1-2 4" />
    </g>
  ),
  'contact-instagram': (
    <g>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </g>
  ),
  'contact-behance': (
    <g>
      <circle cx="4" cy="8" r="1" fill="currentColor" />
      <circle cx="10" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="4" cy="14" r="1" fill="currentColor" />
      <circle cx="10" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
    </g>
  ),
  
  // UI
  'ui-chevron-left': <path d="M15 19l-7-7 7-7" />,
  'ui-chevron-right': <path d="M9 5l7 7-7 7" />,
  'ui-close': <path d="M18 6L6 18M6 6l12 12" />,
  'ui-arrow-right': <path d="M5 12h14M12 5l7 7-7 7" />,
  'ui-monitor': (
    <g>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </g>
  ),
  'ui-mobile': (
    <g>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </g>
  ),
  'ui-lock': (
    <g>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </g>
  ),
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size = 24,
  strokeWidth = 1.75,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {icons[name]}
  </svg>
);
