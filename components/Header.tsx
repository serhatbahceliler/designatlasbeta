"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeaderProps {
  showBackLink?: boolean;
}

export default function Header({ showBackLink = false }: HeaderProps) {
  const pathname = usePathname();
  const isKutuphaneActive = pathname === "/kutuphane";

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="https://r.resimlink.com/9ezfkr.png"
            alt="DesignAtlas"
            width={150}
            height={40}
            className="h-10 w-auto"
            unoptimized
          />
        </Link>

        <div className="flex items-center gap-4">
          {showBackLink && (
            <Link
              href="/"
              className="text-gray-400 hover:text-[#DEFF37] transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Roadmap&apos;lere Dön
            </Link>
          )}

          <Link
            href="/kutuphane"
            className={`transition-colors font-medium ${
              isKutuphaneActive
                ? "text-[#DEFF37]"
                : "text-gray-300 hover:text-[#DEFF37]"
            }`}
          >
            Kütüphane
          </Link>

          <Link
            href="/ux-sozluk"
            className="text-gray-300 hover:text-[#DEFF37] transition-colors font-medium"
          >
            UX Sözlük
          </Link>
        </div>
      </div>
    </header>
  );
}
