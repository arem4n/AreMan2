import type { Metadata } from "next";
import { Epilogue, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

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

export const metadata: Metadata = {
  title: {
    default: 'AREM4N | Soberanía Visual & Branding Estratégico',
    template: '%s | AREM4N',
  },
  description: 'Metodología LogoCodeX™ para identidades que justifican precios premium.',
  icons: {
    icon: '/images/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${epilogue.variable} ${barlowCondensed.variable}`}>
      <body className={epilogue.className}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
