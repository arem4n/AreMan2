import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair-display'
});

export const metadata: Metadata = {
  title: "AREM4N | Soberanía Visual & Branding Estratégico",
  description: "Portafolio de AREM4N, especialista en branding estratégico y soberanía visual utilizando la metodología LogoCodex™.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
