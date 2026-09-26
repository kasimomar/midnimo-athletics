import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { siteOrigin, siteTitle, siteDescription } from "@/lib/site-metadata";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: siteOrigin(),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Midnimo Athletics",
    title: siteTitle,
    description: siteDescription,
    url: "/",
    images: [{ url: "/images/logo.png", width: 1024, height: 1024, alt: "Midnimo Athletics logo" }],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/images/logo.png", alt: "Midnimo Athletics logo" }],
  },
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-paper text-ink">{children}</body>
    </html>
  );
}
