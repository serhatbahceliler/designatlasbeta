"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

interface HeaderProps {
  showBackLink?: boolean;
}

export default function Header({ showBackLink = false }: HeaderProps) {
  const { user, profile, signOut, refreshProfile, loading } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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

          <nav className="flex items-center gap-6">
            {user && (
              <Link
                href="/case-atolyesi"
                className="text-gray-400 hover:text-[#DEFF37] transition-colors font-medium"
              >
                Case Atölyesi
              </Link>
            )}
          </nav>

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

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#DEFF37] text-black font-bold flex items-center justify-center text-sm">
                    {getInitials()}
                  </div>
                  <span className="text-white font-medium hidden sm:inline">
                    {getDisplayName()}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-zinc-800">
                        <p className="text-sm font-medium text-white">{profile?.first_name} {profile?.last_name}</p>
                        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-800 transition-colors"
                      >
                        Çıkış yap
                      </button>
                    </div>
                  </>
                )}
              </div>
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
