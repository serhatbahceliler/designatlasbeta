"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface HeaderProps {
  showBackLink?: boolean;
}

export default function Header({ showBackLink = false }: HeaderProps) {
  const { user, profile, signOut, refreshProfile, loading } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const isKutuphaneActive = pathname === "/kutuphane";

  // Refresh profile when user changes
  useEffect(() => {
    if (user && !profile) {
      refreshProfile();
    }
  }, [user, profile, refreshProfile]);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await signOut();
  };

  const getInitials = () => {
    if (!profile) return "U";
    const first = profile.first_name?.charAt(0)?.toUpperCase() || "";
    const last = profile.last_name?.charAt(0)?.toUpperCase() || "";
    return (first + last) || "U";
  };

  const getDisplayName = () => {
    if (!profile) {
      // Fallback to user email if profile not loaded yet
      if (user?.email) {
        return user.email.split("@")[0];
      }
      return "User";
    }
    return profile.first_name || profile.last_name || "User";
  };

  return (
    <>
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
                Roadmap'lere Dön
              </Link>
            )}

            {/* Kütüphane Link - Visible to everyone */}
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

            {/* UX Sözlük Link - Visible to everyone */}
            <Link
              href="/ux-sozluk"
              className="text-gray-300 hover:text-[#DEFF37] transition-colors font-medium"
            >
              UX Sözlük
            </Link>

            {user ? (
              <>
                {/* Minimalist Profile Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-8 h-8 rounded-full bg-[#DEFF37] text-black flex items-center justify-center hover:bg-[#DEFF37]/90 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-56 bg-zinc-900/95 backdrop-blur-sm border border-zinc-800/50 rounded-lg shadow-xl z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-zinc-800/50">
                          <p className="text-sm font-medium text-white">
                            {profile?.first_name} {profile?.last_name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-800/50 transition-colors"
                        >
                          Çıkış yap
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-white font-semibold rounded-lg hover:text-[#DEFF37] transition-colors"
                >
                  Giriş yap
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-[#DEFF37] text-black font-semibold rounded-lg hover:bg-[#DEFF37]/90 transition-colors"
                >
                  Kayıt ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
