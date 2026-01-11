"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const redirectTo = searchParams.get("redirect") || "/";
  const intent = searchParams.get("intent");

  // If user is already logged in, redirect
  useEffect(() => {
    if (!authLoading && user) {
      router.push(redirectTo);
    }
  }, [user, authLoading, redirectTo, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!firstName.trim() || firstName.trim().length < 2) {
      setError("Ad en az 2 karakter olmalıdır.");
      return;
    }

    if (!lastName.trim() || lastName.trim().length < 2) {
      setError("Soyad en az 2 karakter olmalıdır.");
      return;
    }

    if (password.length < 8) {
      setError("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    if (!acceptTerms) {
      setError("Kullanım Koşulları ve Gizlilik Politikası'nı kabul etmelisiniz.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Sign up with Supabase Auth - auto confirm email
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile record immediately
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: authData.user.id,
              first_name: firstName.trim(),
              last_name: lastName.trim(),
            },
          ]);

        if (profileError) {
          console.error("Profile insert error:", profileError);
          // If profile insert fails, try update (might exist from trigger)
          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              first_name: firstName.trim(),
              last_name: lastName.trim(),
            })
            .eq("id", authData.user.id);

          if (updateError) {
            console.error("Profile update error:", updateError);
            // Still proceed - profile might be created by trigger
          }
        }

        // Check if user is automatically logged in (email confirmation disabled)
        if (authData.session) {
          // User is already authenticated (email confirmation disabled)
          // Redirect immediately
          router.push(redirectTo);
          router.refresh();
        } else {
          // Email confirmation might be required - wait a bit and check session again
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          // Try to get session again
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            // User is now authenticated
            router.push(redirectTo);
            router.refresh();
          } else {
            // Still no session - email confirmation required
            // Show success message and redirect (user will need to confirm email)
            router.push(redirectTo);
            router.refresh();
          }
        }
      } else {
        throw new Error("Kullanıcı oluşturulamadı");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Hesap oluşturulamadı. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      // Build redirect URL
      const redirectToParam = redirectTo !== "/" ? redirectTo : "";
      
      // Build the full callback URL with query params
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      if (redirectToParam) {
        callbackUrl.searchParams.set("redirect", redirectToParam);
      }
      if (intent) {
        callbackUrl.searchParams.set("intent", intent);
      }

      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl.toString(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (authError) {
        console.error("Google OAuth error:", authError);
        throw authError;
      }

      // OAuth will redirect - don't set submitting to false as page will change
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(err.message || "Google ile giriş yapılamadı. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="https://r.resimlink.com/9ezfkr.png"
              alt="DesignAtlas"
              width={150}
              height={40}
              className="h-8 w-auto sm:h-10"
              unoptimized
            />
          </Link>
          <Link
            href="/"
            className="text-gray-400 hover:text-[#DEFF37] transition-colors text-xs sm:text-sm"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-60px)] px-4 sm:px-6 py-2 sm:py-3">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DEFF37]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DEFF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md my-2">
          {/* Card */}
          <div className="bg-zinc-900/90 backdrop-blur-sm border border-[#DEFF37]/20 rounded-2xl shadow-2xl p-4 sm:p-5">
            {/* Header - Icon and Title side by side */}
            <div className="flex items-start gap-3 mb-3 sm:mb-4">
              {/* Icon */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-lg bg-[#DEFF37]/10 border border-[#DEFF37]/30 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              
              {/* Title and Description */}
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-white mb-0.5 leading-tight">
                  Hesap oluştur
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm leading-snug">
                  Yeni hesap oluşturarak başlayabilirsin
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            {/* Google Auth Button - Always visible at top */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google ile devam et</span>
            </button>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-zinc-900 text-gray-400">veya</span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-medium text-white mb-1">
                    Ad
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ahmet"
                    required
                    minLength={2}
                    className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-medium text-white mb-1">
                    Soyad
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Yılmaz"
                    required
                    minLength={2}
                    className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  required
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-white mb-1">
                  Şifre <span className="text-gray-500">(min 8)</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-white mb-1">
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                />
              </div>

              <div className="flex items-start gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                  className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 text-[#DEFF37] bg-zinc-800 border-zinc-700 rounded focus:ring-[#DEFF37] focus:ring-1"
                />
                <label htmlFor="acceptTerms" className="text-xs text-gray-300 leading-snug">
                  <span className="text-white">Kullanım Koşulları</span> ve{" "}
                  <span className="text-white">Gizlilik Politikası</span>'nı kabul ediyorum.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-sm bg-[#DEFF37] text-black font-bold rounded-lg hover:bg-[#DEFF37]/90 hover:shadow-[0_0_30px_rgba(222,255,55,0.3)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-0.5"
              >
                {isSubmitting ? "Hesap oluşturuluyor..." : "Hesap oluştur"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-xs text-gray-400 mt-3">
              Zaten hesabın var mı?{" "}
              <Link
                href={`/auth/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
                className="text-[#DEFF37] hover:underline font-semibold"
              >
                Giriş yap
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
