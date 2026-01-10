"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/Header";
import CaseAtolyesiContent from "./CaseAtolyesiContent";

export default function CaseAtolyesiPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push("/auth/login?redirect=/case-atolyesi");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <CaseAtolyesiContent />
      </Suspense>
    </div>
  );
}
