'use client';

import React from 'react';

/**
 * AREM4N Iconography System — v2 (nano banana pro edition)
 * Style: Expressive geometric, 1.75 stroke, no fill, currentColor.
 * All paths regenerated for visual clarity and symbolic precision.
 */

const icons = {
  // ─── SERVICES ────────────────────────────────────────────────────────────────

  // Presencia: eye with a diamond pupil — "to be seen"
  'services-presencia': (
    <g>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <path d="M12 9l2 3-2 3-2-3 2-3z" />
    </g>
  ),

  // Autoridad: ascending stacked bars — "layers of authority"
  'services-autoridad': (
    <g>
      <path d="M2 18h20" />
      <path d="M5 14h14" />
      <path d="M8 10h8" />
      <path d="M11 6h2" />
    </g>
  ),

  // Legado: crown with upward rays — "legacy, something that endures"
  'services-legado': (
    <g>
      <path d="M3 18l3-8 6 4 6-4 3 8H3z" />
      <path d="M12 2v3" />
      <path d="M7.5 5l1.5 2" />
      <path d="M16.5 5l-1.5 2" />
    </g>
  ),

  // Página Web: browser window with a minimal URL bar
  'services-web': (
    <g>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8h20" />
      <circle cx="5.5" cy="6" r="0.75" fill="currentColor" />
      <circle cx="8.5" cy="6" r="0.75" fill="currentColor" />
    </g>
  ),

  // Web App: connected triangle nodes — "system, network, app"
  'services-webapp': (
    <g>
      <circle cx="12" cy="4" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <path d="M12 6L5 16M12 6l7 10M6 18h12" />
    </g>
  ),

  // ─── PROCESS ─────────────────────────────────────────────────────────────────

  // Diagnóstico: magnifying glass with inner dot
  'process-diagnostico': (
    <g>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M21 21l-5-5" />
      <circle cx="10.5" cy="10.5" r="2.5" />
    </g>
  ),

  // Construcción simbólica: compass drawing a circle
  'process-construccion': (
    <g>
      <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6L12 2z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </g>
  ),

  // Revisión conjunta: two circular arrows
  'process-revision': (
    <g>
      <path d="M16 3l4 4-4 4" />
      <path d="M4 7h16" />
      <path d="M8 21l-4-4 4-4" />
      <path d="M20 17H4" />
    </g>
  ),

  // Entrega: 3D package box (Lucide package)
  'process-entrega': (
    <g>
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M3.27 6.96L12 12l8.73-5.04" />
      <path d="M12 22V12" />
    </g>
  ),

  // ─── WHY ─────────────────────────────────────────────────────────────────────

  // Individual: single figure with a spark above
  'why-individual': (
    <g>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 20c0-4 3.1-7 7-7s7 3 7 7" />
      <path d="M17 2l.5 1.5L19 4l-1.5.5L17 6l-.5-1.5L15 4l1.5-.5L17 2z" />
    </g>
  ),

  // Método: three left-aligned lines with leading dots
  'why-metodo': (
    <g>
      <circle cx="4" cy="7" r="1" fill="currentColor" />
      <path d="M7 7h13" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <path d="M7 12h10" />
      <circle cx="4" cy="17" r="1" fill="currentColor" />
      <path d="M7 17h7" />
    </g>
  ),

  // Prueba social / escudo: shield with a checkmark
  'why-prueba': (
    <g>
      <path d="M12 2l8 3.5V12c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V5.5L12 2z" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5" />
    </g>
  ),

  // ─── DELIVERABLES ────────────────────────────────────────────────────────────

  // Logo: hexagon with inner spark
  'deliverable-logo': (
    <g>
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
      <path d="M12 9l1 2h2l-1.5 1.5.5 2L12 13.5 10 14.5l.5-2L9 11h2l1-2z" />
    </g>
  ),

  // Manual de marca: open book with a bookmark
  'deliverable-manual': (
    <g>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M14 2v8l-2-1.5L10 10V2" />
    </g>
  ),

  // Motion graphics: play button in a circle
  'deliverable-motion': (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none" />
    </g>
  ),

  // Sistema cromático: three overlapping circles (Venn)
  'deliverable-cromatico': (
    <g>
      <circle cx="9" cy="9.5" r="5" />
      <circle cx="15" cy="9.5" r="5" />
      <circle cx="12" cy="15" r="5" />
    </g>
  ),

  // Tipografía: symmetric A
  'deliverable-tipografia': (
    <g>
      <path d="M4 20L12 4l8 16" />
      <path d="M7 14h10" />
    </g>
  ),

  // Mockups: layered rectangles (device frames)
  'deliverable-mockups': (
    <g>
      <rect x="2" y="8" width="14" height="12" rx="1.5" />
      <path d="M6 8V5a1 1 0 011-1h14a1 1 0 011 1v11a1 1 0 01-1 1h-3" />
      <path d="M9 14l2.5-2 2 3 1.5-1.5" />
    </g>
  ),

  // Iconografía: 2×2 grid with one highlighted
  'deliverable-iconografia': (
    <g>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M16 16l4 4" />
      <path d="M20 16l-4 4" />
    </g>
  ),

  // Templates sociales: three overlapping rounded squares
  'deliverable-social': (
    <g>
      <rect x="2" y="2" width="13" height="13" rx="2" />
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M9 5h10M5 9v10" />
    </g>
  ),

  // ─── LOGOCODEX ───────────────────────────────────────────────────────────────

  // Semiótica: eye inside a triangle — "meaning behind the symbol"
  'codex-semiotica': (
    <g>
      <path d="M12 3L22 20H2L12 3z" />
      <ellipse cx="12" cy="15" rx="4" ry="2.5" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
    </g>
  ),

  // Arquetipos: three concentric circles — "layers of archetype"
  'codex-arquetipos': (
    <g>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </g>
  ),

  // Narrativa: speech bubble with text lines
  'codex-narrativa': (
    <g>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
      <path d="M8 9h8M8 13h6" />
    </g>
  ),

  // ─── FAQ ─────────────────────────────────────────────────────────────────────

  // Soberanía: crown
  'faq-soberania': (
    <g>
      <path d="M3 18h18l-3-9-4.5 5L12 6l-1.5 8L6 9l-3 9z" />
      <path d="M3 18h18" />
    </g>
  ),

  // Involucramiento: two side-by-side people
  'faq-involucramiento': (
    <g>
      <circle cx="8" cy="7" r="3" />
      <circle cx="16" cy="7" r="3" />
      <path d="M2 20c0-3.5 2.7-6 6-6" />
      <path d="M22 20c0-3.5-2.7-6-6-6" />
      <path d="M10 20c0-2.2 0.9-4 2-4s2 1.8 2 4" />
    </g>
  ),

  // Filtro: funnel
  'faq-filtro': (
    <g>
      <path d="M3 4h18l-7 8v8l-4-2v-6L3 4z" />
    </g>
  ),

  // Entrega (FAQ): envelope with arrow
  'faq-entrega': (
    <g>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M2 9l10 7 10-7" />
      <path d="M16 2l3 3-3 3" />
      <path d="M8 5h11" />
    </g>
  ),

  // IA: circuit / brain chip
  'faq-ia': (
    <g>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M7 9H4M7 12H3M7 15H4" />
      <path d="M17 9h3M17 12h4M17 15h3" />
      <path d="M9 7V4M12 7V3M15 7V4" />
      <path d="M9 17v3M12 17v4M15 17v3" />
    </g>
  ),

  // ─── CONTACT ─────────────────────────────────────────────────────────────────

  // Email: envelope
  'contact-email': (
    <g>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 7.5l10 6.5 10-6.5" />
    </g>
  ),

  // WhatsApp: speech bubble with phone receiver
  'contact-whatsapp': (
    <g>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      <path d="M9 8.5c.5 1.5 1.5 3 3 4s2.5 1.5 4 1.5" />
      <circle cx="9" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
    </g>
  ),

  // Instagram: rounded square + circle + dot
  'contact-instagram': (
    <g>
      <rect x="2" y="2" width="20" height="20" rx="6" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </g>
  ),

  // Behance: clear B letterform with stroke
  'contact-behance': (
    <g>
      <path d="M6 4v16" />
      <path d="M6 4h5c2 0 3.5 1.5 3.5 3.5S13 11 11 11H6" />
      <path d="M6 11h6c2.5 0 4 2 4 4.5S14.5 20 12 20H6" />
      <path d="M13 6h7" />
    </g>
  ),

  // ─── UI ──────────────────────────────────────────────────────────────────────

  'ui-chevron-left': <path d="M15 18l-6-6 6-6" />,
  'ui-chevron-right': <path d="M9 18l6-6-6-6" />,
  'ui-close': <path d="M18 6L6 18M6 6l12 12" />,
  'ui-arrow-right': (
    <g>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </g>
  ),
  'ui-monitor': (
    <g>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </g>
  ),
  'ui-mobile': (
    <g>
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" />
      <path d="M9 6h6" />
    </g>
  ),
  'ui-lock': (
    <g>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
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

