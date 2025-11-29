import LogoCodexClient from '@/components/logocodex/LogoCodexClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Metodología LogoCodex™ | AREM4N',
    description: 'Descubre LogoCodex™, la metodología para transformar logotipos en códigos visuales vivos con múltiples capas de significado. Construye símbolos que activan significados profundos.',
};

export default function LogoCodexPage() {
    return <LogoCodexClient />;
}
