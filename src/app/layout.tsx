import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, Syne } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viyana Productions | Creative Ad Agency & Production Studio",
  description: "Viyana Productions is a creative advertising and production studio specializing in ad campaigns, commercial videos, content creation and graphic design.",
  keywords: [
    "creative ad agency",
    "commercial video production",
    "content creation studio",
    "graphic design agency",
    "advertising campaigns",
    "brand films",
    "social media content",
    "Viyana Productions"
  ],
  authors: [{ name: "Viyana Productions" }],
  openGraph: {
    title: "Viyana Productions | Creative Ad Agency & Production Studio",
    description: "Viyana Productions is a creative advertising and production studio creating bold campaigns, cinematic videos, digital content and visual identities for brands that want to stand out.",
    type: "website",
    locale: "en_US",
    siteName: "Viyana Productions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viyana Productions | Creative Ad Agency & Production Studio",
    description: "Bold campaigns, cinematic videos, digital content and visual identities for brands that want to stand out.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={clsx(
          plusJakartaSans.variable,
          instrument.variable,
          syne.variable,
          "antialiased bg-brand-black text-brand-light selection:bg-brand-light selection:text-brand-black font-sans"
        )}
      >
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
