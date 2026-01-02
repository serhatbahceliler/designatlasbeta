import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignAtlas - Learn Design. Step by Step.",
  description: "Clear roadmaps for UX, UI and Product Designers. No login. No fluff. Clear learning paths.",
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
