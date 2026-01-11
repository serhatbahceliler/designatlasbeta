"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type AuthIntent = "openResources" | "openModuleDetail" | "viewRoadmap" | null;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  intent?: AuthIntent;
  intentData?: any; // Data to pass back after auth (e.g., topic/module info)
}

export default function AuthModal({ isOpen, onClose, onSuccess, intent = null, intentData = null }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form states for login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Form states for signup
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveTab("login");
      setError("");
      setLoginEmail("");
      setLoginPassword("");
      setSignupFirstName("");
      setSignupLastName("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupConfirmPassword("");
      setAcceptTerms(false);
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      if (authError) throw authError;

      if (data.user) {
        // Success - close modal and trigger onSuccess
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Giriş yapılamadı. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!signupFirstName.trim() || signupFirstName.trim().length < 2) {
      setError("Ad en az 2 karakter olmalıdır.");
      return;
    }

    if (!signupLastName.trim() || signupLastName.trim().length < 2) {
      setError("Soyad en az 2 karakter olmalıdır.");
      return;
    }

    if (signupPassword.length < 8) {
      setError("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    if (!acceptTerms) {
      setError("Kullanım Koşulları ve Gizlilik Politikası'nı kabul etmelisiniz.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupEmail.trim(),
        password: signupPassword,
        options: {
          data: {
            first_name: signupFirstName.trim(),
            last_name: signupLastName.trim(),
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile record
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: authData.user.id,
              first_name: signupFirstName.trim(),
              last_name: signupLastName.trim(),
            },
          ]);

        if (profileError) {
          // Profile might already exist (e.g., from OAuth), try update instead
          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              first_name: signupFirstName.trim(),
              last_name: signupLastName.trim(),
            })
            .eq("id", authData.user.id);

          if (updateError) {
            console.error("Profile update error:", updateError);
            // Don't fail the signup if profile update fails
          }
        }

        // Check if user is automatically logged in (email confirmation disabled)
        if (authData.session) {
          // User is automatically authenticated - trigger success callback
          onSuccess();
          onClose();
        } else {
          // Email confirmation required - wait a bit and check session again
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            // User is now authenticated
            onSuccess();
            onClose();
          } else {
            // Still no session - might need email confirmation
            // Show success message but user will need to confirm email
            onSuccess();
            onClose();
          }
        }
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
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (authError) throw authError;

      // OAuth will redirect, so we don't close modal here
      // The callback page will handle redirecting back
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(err.message || "Google ile giriş yapılamadı. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-zinc-900 shadow-2xl border border-[#DEFF37]/20 rounded-2xl overflow-hidden animate-scale-in">
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="mb-4">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon and Title side by side */}
            <div className="flex items-start gap-3">
              {/* Auth Icon */}
              <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-[#DEFF37]/10 border border-[#DEFF37]/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              {/* Title and Description */}
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-white mb-0.5 leading-tight">
                  {activeTab === "login" ? "Giriş yap" : "Hesap oluştur"}
                </h2>
                <p className="text-gray-400 text-xs leading-snug">
                  {activeTab === "login"
                    ? "Hesabına giriş yaparak devam edebilirsin"
                    : "Yeni hesap oluşturarak başlayabilirsin"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-3 bg-zinc-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === "login"
                  ? "bg-[#DEFF37] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Giriş yap
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === "signup"
                  ? "bg-[#DEFF37] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Kayıt ol
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          {/* Google Auth Button - Always visible at top for signup */}
          {activeTab === "signup" && (
            <>
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                Google ile devam et
              </button>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-zinc-900 text-gray-400">veya</span>
                </div>
              </div>
            </>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-2">
              <div>
                <label htmlFor="loginEmail" className="block text-xs font-medium text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  required
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="loginPassword" className="block text-xs font-medium text-white mb-1">
                  Şifre
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-sm bg-[#DEFF37] text-black font-bold rounded-lg hover:bg-[#DEFF37]/90 hover:shadow-[0_0_30px_rgba(222,255,55,0.3)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Giriş yapılıyor..." : "Giriş yap"}
              </button>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-zinc-900 text-gray-400">veya</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                Google ile devam et
              </button>

              <p className="text-center text-xs text-gray-400">
                Hesabın yok mu?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="text-[#DEFF37] hover:underline font-semibold"
                >
                  Kayıt ol
                </button>
              </p>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="signupFirstName" className="block text-xs font-medium text-white mb-1">
                    Ad
                  </label>
                  <input
                    type="text"
                    id="signupFirstName"
                    value={signupFirstName}
                    onChange={(e) => setSignupFirstName(e.target.value)}
                    placeholder="Ahmet"
                    required
                    minLength={2}
                    className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="signupLastName" className="block text-xs font-medium text-white mb-1">
                    Soyad
                  </label>
                  <input
                    type="text"
                    id="signupLastName"
                    value={signupLastName}
                    onChange={(e) => setSignupLastName(e.target.value)}
                    placeholder="Yılmaz"
                    required
                    minLength={2}
                    className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signupEmail" className="block text-xs font-medium text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="signupEmail"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  required
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="signupPassword" className="block text-xs font-medium text-white mb-1">
                  Şifre <span className="text-gray-500">(min 8)</span>
                </label>
                <input
                  type="password"
                  id="signupPassword"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="signupConfirmPassword" className="block text-xs font-medium text-white mb-1">
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  id="signupConfirmPassword"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
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
                className="w-full px-4 py-2 text-sm bg-[#DEFF37] text-black font-bold rounded-lg hover:bg-[#DEFF37]/90 hover:shadow-[0_0_30px_rgba(222,255,55,0.3)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-0.5"
              >
                {isSubmitting ? "Hesap oluşturuluyor..." : "Hesap oluştur"}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                Zaten hesabın var mı?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-[#DEFF37] hover:underline font-semibold"
                >
                  Giriş yap
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        @keyframes scale-in {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
