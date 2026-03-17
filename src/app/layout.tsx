import type { Metadata, Viewport } from "next";
import { Montserrat, Comfortaa } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { I18nProvider } from "@/components/i18n-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vi-tech.io';

export const metadata: Metadata = {
  title: {
    default: 'Vi-Tech – Operational Excellence Software',
    template: '%s – Vi-Tech',
  },
  description: 'Virtuous Improvement Technologies provides Lean/AI software for manufacturing: GoSeeiT, StandardiziT, ResolviT, ImproviT.',
  metadataBase: new URL(siteUrl),
  keywords: ['operational excellence', 'lean manufacturing', 'continuous improvement', 'GoSeeiT', 'StandardiziT', 'ResolviT', 'ImproviT'],
  authors: [{ name: 'Vi-Tech' }],
  creator: 'Vi-Tech',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Vi-Tech',
    images: [{
      url: '/api/og?title=Vi-Tech&description=Operational%20Excellence%20Software',
      width: 1200,
      height: 630,
      alt: 'Vi-Tech',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@vitech_io',
    site: '@vitech_io',
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#120E2F',
};

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  style: ["normal","italic"],
  display: "swap",
});

const comfortaa = Comfortaa({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["300","400","500","600","700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${comfortaa.variable} font-sans antialiased`}>
        <I18nProvider>
          {/* Каркас, чтобы футер прилипал к низу даже при коротком контенте */}
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Analytics />
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}