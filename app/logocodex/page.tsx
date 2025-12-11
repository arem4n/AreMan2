import LogoCodex from '../../components/LogoCodex';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metodología LogoCodex™ | El Libro de los Símbolos',
  description: 'LogoCodex™ es el protocolo que garantiza que tu marca no se pierda en el ruido digital, construyendo un símbolo vivo que conecta con la memoria cultural y la narrativa.',
};

export default function LogoCodexPage() {
  return <LogoCodex />;
}
