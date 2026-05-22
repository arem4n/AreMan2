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
            'symbolic': {
                50: '#fdf2f8',
                100: '#fce7f3',
                200: '#fbcfe8',
                300: '#f9a8d4',
                400: '#f472b6',
                500: '#ec4899',
                600: '#db2777',
                700: '#be185d',
                800: '#9d174d',
                900: '#831843'
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
                900: '#0f172a'
            },
            'creative': {
                50: '#fefce8',
                100: '#fef9c3',
                200: '#fef08a',
                300: '#fde047',
                400: '#facc15',
                500: '#eab308',
                600: '#ca8a04',
                700: '#a16207',
                800: '#854d0e',
                900: '#713f12'
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