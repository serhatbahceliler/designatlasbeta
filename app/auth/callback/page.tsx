"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle OAuth callback - Supabase client automatically handles the URL hash/fragment
        // Wait a bit for the session to be processed
        await new Promise((resolve) => setTimeout(resolve, 500));

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error);
          const redirectTo = searchParams.get("redirect") || "/";
          router.push(redirectTo);
          return;
        }

        if (data.session) {
          // User is authenticated, redirect based on redirect parameter or home
          const redirectTo = searchParams.get("redirect") || "/";
          router.push(redirectTo);
        } else {
          // No session yet, try waiting a bit more (OAuth might still be processing)
          setTimeout(() => {
            const redirectTo = searchParams.get("redirect") || "/";
            router.push(redirectTo);
          }, 1000);
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Giriş yapılıyor...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Yükleniyor...</p>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
