"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isRedirecting = false;

    const handleAuthCallback = async () => {
      try {
        const redirectTo = searchParams.get("redirect") || "/";

        // Listen for auth state changes - this will fire when Supabase processes the hash fragment
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (isRedirecting) return;

          if (event === 'SIGNED_IN' && session) {
            isRedirecting = true;
            // Clean up the hash fragment from URL
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
            router.push(redirectTo);
            subscription.unsubscribe();
          } else if (event === 'TOKEN_REFRESHED' && session) {
            isRedirecting = true;
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
            router.push(redirectTo);
            subscription.unsubscribe();
          }
        });

        // Also try to get session immediately (in case it's already processed)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && !isRedirecting) {
          isRedirecting = true;
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
          router.push(redirectTo);
          subscription.unsubscribe();
        } else {
          // Wait a bit for hash fragment to be processed
          setTimeout(() => {
            if (!isRedirecting) {
              supabase.auth.getSession().then(({ data: { session } }) => {
                if (session && !isRedirecting) {
                  isRedirecting = true;
                  window.history.replaceState(null, '', window.location.pathname + window.location.search);
                  router.push(redirectTo);
                  subscription.unsubscribe();
                } else if (!isRedirecting) {
                  // Still no session after waiting, redirect anyway
                  isRedirecting = true;
                  window.history.replaceState(null, '', window.location.pathname + window.location.search);
                  router.push(redirectTo);
                  subscription.unsubscribe();
                }
              });
            }
          }, 1500);
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        const redirectTo = searchParams.get("redirect") || "/";
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
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
