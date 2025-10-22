import type { Metadata } from "next";
import { Montserrat, Comfortaa } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Vi-Tech",
  description: "Virtuous Improvement Technologies",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }],
  },
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
        {/* Каркас, чтобы футер прилипал к низу даже при коротком контенте */}
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  );
}