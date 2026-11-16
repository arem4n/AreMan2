import type { Metadata } from "next";
import { Epilogue, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import ClientWrapper from "@/components/ClientWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from '@/lib/seo';

const epilogue = Epilogue({
    subsets: ["latin"],
    variable: '--font-epilogue',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
    subsets: ["latin"],
    variable: '--font-barlow-condensed',
    weight: ['600', '700', '800'],
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-jetbrains-mono',
    weight: ['400', '500', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Diseño de identidad visual y branding en Puerto Montt | AREM4N',
        template: '%s | AREM4N',
    },
    description: 'Sergio Arellano diseña logotipos, identidades visuales y sitios web para empresas desde Puerto Montt, Chile, con su método LogoCodeX™.',
    icons: {
        icon: '/images/icon.webp',
    },
};

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = params;

    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${epilogue.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}>
            <body className={epilogue.className}>
                <NextIntlClientProvider messages={messages}>
                    <ClientWrapper>
                        {children}
                    </ClientWrapper>
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    );
}
