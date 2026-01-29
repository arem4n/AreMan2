import LogoCodexClient from '@/components/logocodex/LogoCodexClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Portafolio de Diseño | LogoCodeX',
    description: 'Explora el Codex de proyectos y la metodología LogoCodex™ para transformar logotipos en códigos visuales vivos con múltiples capas de significado.',
};

export default function LogoCodexPage() {
    return <LogoCodexClient />;
}
