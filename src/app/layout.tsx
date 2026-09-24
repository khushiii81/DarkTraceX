import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HackingBackground } from "../components/ui/HackingBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://darktracex.vercel.app"),
  title: {
    default: "DarkTraceX — Malware Mechanics & Attack Vector Simulator",
    template: "%s | DarkTraceX",
  },
  description:
    "An interactive educational platform for malware mechanics and attack vector simulation. Explore PE structures, process injection, obfuscation, and more in a safe sandbox environment.",
  keywords: [
    "malware analysis",
    "cybersecurity",
    "attack vectors",
    "PE structure",
    "process injection",
    "cybersecurity education",
  ],
  authors: [{ name: "DarkTraceX Team" }],
  creator: "DarkTraceX",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://darktracex.vercel.app",
    siteName: "DarkTraceX",
    title: "DarkTraceX — Malware Mechanics & Attack Vector Simulator",
    description:
      "Interactive educational platform for malware mechanics and cybersecurity concepts.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DarkTraceX Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DarkTraceX — Malware Mechanics Simulator",
    description:
      "Interactive educational platform for malware mechanics and cybersecurity concepts.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  name: "DarkTraceX",
  description:
    "An interactive Malware Mechanics & Attack Vector Simulator for educational purposes.",
  applicationCategory: "EducationalApplication",
  educationalUse: "Instruction",
  url: "https://darktracex.vercel.app",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased min-h-screen font-sans selection:bg-red-900/50 selection:text-red-200">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.05)_0%,_transparent_60%)] pointer-events-none" />
        <HackingBackground />
        <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.015] pointer-events-none" />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
