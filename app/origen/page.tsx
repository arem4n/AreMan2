import type { Metadata } from 'next';
import OrigenClient from './OrigenClient';

export const metadata: Metadata = {
  title: 'Origen | AREM4N - Soberanía Visual',
  description: 'La evolución de Sergio Arellano / AREM4N — identidad, software y automatización construidos período por período.',
};

export default function OrigenPage() {
  return <OrigenClient />;
}
