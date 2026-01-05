"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  roadmapId: string;
}

export default function EmailModal({ isOpen, onClose, onSuccess, roadmapId }: EmailModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Lütfen geçerli bir e-posta adresi giriniz. (ör. ad@domain.com)");
      setIsSubmitting(false);
      return;
    }

    // Name validation
    if (fullName.trim().length < 2) {
      setError("Lütfen isminizi ve soyisminizi girin");
      setIsSubmitting(false);
      return;
    }

    try {
      // Supabase'e kaydet
      const { error: dbError } = await supabase
        .from("user_emails")
        .insert([
          {
            email: email.toLowerCase().trim(),
            full_name: fullName.trim(),
            first_roadmap: roadmapId,
          },
        ]);

      if (dbError) {
        // Email already exists hatası
        if (dbError.code === "23505") {
          // Unique constraint violation
          console.log("Email already exists, continuing...");
        } else {
          throw dbError;
        }
      }

      // LocalStorage'a kaydet
      localStorage.setItem("designatlas-email-submitted", "true");
      localStorage.setItem("designatlas-user-email", email.toLowerCase().trim());

      // Show success animation
      setShowSuccess(true);

      // Navigate after animation (1.5 seconds)
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err: any) {
      console.error("Error saving email:", err);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
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
        <div className="p-8 max-h-[90vh] overflow-y-auto">
          {/* Success Animation */}
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <div className="w-20 h-20 rounded-full bg-[#DEFF37]/20 border-2 border-[#DEFF37] flex items-center justify-center mb-6 animate-scale-in">
                <svg className="w-10 h-10 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Başarılı!</h3>
              <p className="text-gray-400">Roadmap'e yönlendiriliyorsunuz...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Mail Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#DEFF37]/10 border border-[#DEFF37]/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  Roadmap'e başlamadan önce
                </h2>
                <p className="text-gray-400 text-sm">
                  Bu roadmap'i size özel şekilde gösterebilmemiz için isim ve e-posta bilginizi istiyoruz. Daha önce DesignAtlas'ta paylaştıysanız tekrar sormayacağız.
                </p>
              </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                İsim Soyisim
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Örn: Ahmet Yılmaz"
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Adresi
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-[#DEFF37] text-black font-bold rounded-lg hover:bg-[#DEFF37]/90 hover:shadow-[0_0_30px_rgba(222,255,55,0.3)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Kaydediliyor..." : "Devam Et"}
            </button>
          </form>
            </>
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
