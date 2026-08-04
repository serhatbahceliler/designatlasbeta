import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import MixpanelProvider from "@/components/MixpanelProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "Design Atlas - UX, UI ve Product Design Öğrenme Platformu",
    template: "%s | Design Atlas",
  },
  description: "UX, UI ve Product Designer'lar için adım adım roadmap'ler, UX Sözlük ve güvenilir kaynaklarla desteklenmiş tasarım rehberleri. Türkçe, ücretsiz, reklamsız.",
  keywords: [
    "Design Atlas",
    "design atlas",
    "UX design",
    "UI design",
    "Product design",
    "UX roadmap",
    "UI roadmap",
    "Product design roadmap",
    "tasarım öğrenme",
    "design öğrenme",
    "UX rehberi",
    "UI rehberi",
    "tasarım roadmap",
    "design roadmap",
    "UX case study",
    "UX sözlük",
    "design sözlük",
  ],
  authors: [{ name: "Design Atlas" }],
  creator: "Design Atlas",
  publisher: "Design Atlas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.designatlas.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.designatlas.io",
    siteName: "Design Atlas",
    title: "Design Atlas - UX, UI ve Product Design Öğrenme Platformu",
    description: "UX, UI ve Product Designer'lar için adım adım roadmap'ler, UX Sözlük ve güvenilir kaynaklarla desteklenmiş tasarım rehberleri. Türkçe, ücretsiz, reklamsız.",
    images: [
      {
        url: "https://r.resimlink.com/Tp-aXNqbWR.png",
        width: 1200,
        height: 630,
        alt: "Design Atlas - UX, UI ve Product Design Öğrenme Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Atlas - UX, UI ve Product Design Öğrenme Platformu",
    description: "UX, UI ve Product Designer'lar için adım adım roadmap'ler, UX Sözlük ve güvenilir kaynaklarla desteklenmiş tasarım rehberleri.",
    images: ["https://r.resimlink.com/Tp-aXNqbWR.png"],
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
  icons: {
    icon: [
      { url: "https://r.resimlink.com/ZTzbek.png", sizes: "48x48", type: "image/png" },
      { url: "https://r.resimlink.com/ZTzbek.png", sizes: "32x32", type: "image/png" },
      { url: "https://r.resimlink.com/ZTzbek.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    shortcut: "https://r.resimlink.com/ZTzbek.png",
    apple: "https://r.resimlink.com/ZTzbek.png",
  },
  verification: {
    // Google Search Console verification code'u buraya eklenecek (gerekirse)
  },
};

const GA_MEASUREMENT_ID = "G-TJKJ1NRBSF";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <MixpanelProvider>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          {children}
        </MixpanelProvider>
      </body>
    </html>
  );
}
