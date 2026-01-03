import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignAtlas – UX, UI ve Product Design için Öğrenme Roadmap'leri",
  description: "UX, UI ve Product Designer'lar için net, açık roadmap'ler. Kayıt yok. Boş laf yok. Net öğrenme yolları.",
  icons: {
    icon: "https://r.resimlink.com/Tp-aXNqbWR.png",
    shortcut: "https://r.resimlink.com/Tp-aXNqbWR.png",
    apple: "https://r.resimlink.com/Tp-aXNqbWR.png",
  },
};

const GA_MEASUREMENT_ID = "G-TJKJ1NRBSF";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

        {children}
      </body>
    </html>
  );
}
