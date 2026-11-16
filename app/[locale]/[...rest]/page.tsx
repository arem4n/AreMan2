import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

// Ruta comodín: cualquier URL desconocida bajo un idioma cae aquí y dispara
// `app/[locale]/not-found.tsx`. Sin ella, Next sirve su 404 genérico fuera
// del layout con idioma (sin <html>, sin estilos y con errores de hidratación).

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale, namespace: 'NotFound' });
    return { title: t('metaTitle'), robots: { index: false, follow: true } };
}

export default function CatchAllPage() {
    notFound();
}
