"use client";

import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Suspense fallback={<div className="h-20 bg-black" />}>
        <Header />
      </Suspense>
      
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Icon/Illustration */}
          <div className="mb-12 relative">
            <div className="relative inline-block">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-[#DEFF37]/20 rounded-full blur-3xl animate-pulse"></div>
              
              {/* 404 Number with gradient */}
              <div className="relative text-9xl md:text-[12rem] font-bold leading-none">
                <span className="bg-gradient-to-br from-[#DEFF37] via-[#DEFF37]/80 to-[#DEFF37]/60 bg-clip-text text-transparent animate-fade-in">
                  404
                </span>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-[#DEFF37]/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-[#DEFF37]/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Bu sayfa bulunamadı.
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Tasarımda da bazen doğru yere yanlış yoldan gideriz.
            <br />
            <span className="text-[#DEFF37]/80">Önemli olan devam edebilmek.</span>
          </p>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#DEFF37] text-black font-bold rounded-xl hover:bg-[#DEFF37]/90 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(222,255,55,0.3)] hover:shadow-[0_0_40px_rgba(222,255,55,0.4)] animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span>→</span>
            <span>Anasayfaya dön</span>
          </Link>

          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DEFF37]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DEFF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
