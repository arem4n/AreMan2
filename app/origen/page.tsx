import type { Metadata } from 'next';
import OrigenClient from './OrigenClient';

export const metadata: Metadata = {
  title: 'Origen | AREM4N - Soberanía Visual',
  description: 'El momento que cambió cómo veo todo. La historia detrás de la Soberanía Visual.',
};

export default function OrigenPage() {
  return <OrigenClient />;
}
