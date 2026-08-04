"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import CaseAtolyesiContent from "./CaseAtolyesiContent";

export default function CaseAtolyesiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <CaseAtolyesiContent key="case-atolyesi-content" />
      </Suspense>
    </div>
  );
}
