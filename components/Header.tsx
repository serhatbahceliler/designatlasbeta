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
  const isCaseAtolyesiActive = pathname === "/case-atolyesi";

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

            {/* Case Atölyesi Button - Visible to everyone */}
            <Link
              href={user ? "/case-atolyesi" : "/auth/login?redirect=/case-atolyesi"}
              className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden ${
                isCaseAtolyesiActive
                  ? "bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3),inset_0_0_20px_rgba(59,130,246,0.1)]"
                  : "bg-zinc-900/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-blue-500/10 hover:to-cyan-500/10 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]"
              }`}
            >
              {/* Gradient border effect using pseudo-element */}
              <div
                className={`absolute -inset-[1px] rounded-full opacity-60 transition-opacity duration-300 ${
                  isCaseAtolyesiActive
                    ? "opacity-80"
                    : "opacity-0 group-hover:opacity-40"
                }`}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-[2px]" />
              </div>

              {/* Inner border to create gradient border effect */}
              <div className="absolute inset-[1px] rounded-full bg-black/80 z-0" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-2">
                {/* AI Sparkle Icon - Starburst style */}
                <svg
                  className={`w-4 h-4 transition-all duration-300 ${
                    isCaseAtolyesiActive
                      ? "text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.9)]"
                      : "text-gray-400 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_4px_rgba(168,85,247,0.7)]"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {/* Sparkle/Starburst icon - unique AI style */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                  />
                  <circle cx="12" cy="10" r="1.5" fill="currentColor" />
                </svg>

                <span
                  className={`transition-colors duration-300 ${
                    isCaseAtolyesiActive
                      ? "text-white font-semibold"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  Case Atölyesi
                </span>
              </div>

              {/* Sheen effect - continuous animation */}
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "sheen 3s ease-in-out infinite",
                }}
              />
            </Link>

            {user ? (
              <>
                {/* Minimalist Profile Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-8 h-8 rounded-full bg-[#DEFF37] text-black font-bold flex items-center justify-center text-xs hover:bg-[#DEFF37]/90 transition-colors"
                  >
                    {getInitials()}
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
