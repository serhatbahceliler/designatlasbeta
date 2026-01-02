import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignAtlas - Tasarımı Öğren. Adım Adım.",
  description: "UX, UI ve Product Designer'lar için net, açık roadmap'ler. Kayıt yok. Boş laf yok. Net öğrenme yolları.",
  icons: {
    icon: "https://r.resimlink.com/Tp-aXNqbWR.png",
    shortcut: "https://r.resimlink.com/Tp-aXNqbWR.png",
    apple: "https://r.resimlink.com/Tp-aXNqbWR.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
