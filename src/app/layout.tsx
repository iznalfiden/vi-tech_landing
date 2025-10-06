import type { Metadata } from "next";
import { Montserrat, Comfortaa } from 'next/font/google';
import "./globals.css";


export const metadata: Metadata = {
  title: "Vi-Tech",
  description: "Virtuous Improvement Technologies",
  icons: {
    // SVG как основной
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      // Fallback (Safari старых версий и некоторые окружения)
      { url: "/logo.ico" },
    ],
    // iOS иконка
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    // Safari pinned tab (монохромная SVG + цвет)
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }],
  },
};


const montserrat = Montserrat({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const comfortaa = Comfortaa({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  // Comfortaa обычно от 300 до 700 — выбери нужные:
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${comfortaa.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
