import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
            // Context Injection v3 — anchor confirmed against AreMan2 production.
            // symbolic-600 and creative-400 are the exact confirmed anchors;
            // every other step is derived from them (same hue/saturation family,
            // Tailwind's own lightness curve remapped through the anchor) so the
            // whole scale reads as one deliberate color, not a patched shade.
            'symbolic': {
                50: '#FBEEF5',
                100: '#F9E4EE',
                200: '#F5CDE0',
                300: '#EEA8C9',
                400: '#E571A9',
                500: '#DF418D',
                600: '#cc1f72',
                700: '#901952',
                800: '#64133A',
                900: '#440E28'
            },
            'deep': {
                50: '#f8fafc',
                100: '#f1f5f9',
                200: '#e2e8f0',
                300: '#cbd5e1',
                400: '#94a3b8',
                500: '#64748b',
                600: '#475569',
                700: '#334155',
                800: '#1e293b',
                900: '#0d0e22'
            },
            'creative': {
                50: '#FDF8ED',
                100: '#F8E8BF',
                200: '#F2CF76',
                300: '#EEB21D',
                400: '#b8860b',
                500: '#A0750B',
                600: '#84610B',
                700: '#664B0A',
                800: '#564009',
                900: '#4A3708'
            }
        },
        fontFamily: {
            'display': ['var(--font-barlow-condensed)', 'sans-serif'],
            'body': ['var(--font-epilogue)', 'sans-serif'],
            'jetbrains': ['var(--font-jetbrains-mono)', 'monospace'],
        },
        fontSize: {
            'fluid-hero': ['clamp(2.25rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
            'fluid-section': ['clamp(1.875rem, 3.5vw + 0.75rem, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        }
    }
  },
  plugins: [],
}
export default config