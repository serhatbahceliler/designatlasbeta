import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import RoadmapClient from "./RoadmapClient";

interface Topic {
  title: string;
  description?: string;
  resources?: { title: string; url: string }[];
  keyPoints?: string[];
}

interface Section {
  title: string;
  description: string;
  topics: Topic[];
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  icon: string;
  sections: Section[];
}

const roadmaps: Record<string, Roadmap> = {
  "ux-designer": {
    id: "ux-designer",
    title: "UX Designer",
    description: "Kullanıcı araştırması, wireframe ve kullanıcı odaklı tasarım prensiplerinde ustalaşarak anlamlı kullanıcı deneyimleri oluştur.",
    icon: "🎯",
    sections: [
      {
        title: "1. UX Foundations",
        description: "UX'in ne olduğunu, problem çözme yaklaşımını ve temel kavramları oturtmak.",
        topics: [
          { title: "What is UX Design?" },
          { title: "UX vs UI vs Product Design" },
          { title: "User-Centered Design" },
          { title: "Human-Centered Thinking & Empathy" },
          { title: "Basic Design Principles (hierarchy, consistency, feedback)" },
        ],
      },
      {
        title: "2. Product & Design Process",
        description: "UX'in ürün geliştirme sürecindeki yerini ve çalışma biçimini anlamak.",
        topics: [
          { title: "Product Lifecycle (Discovery → Delivery)" },
          { title: "Double Diamond / Design Thinking Overview" },
          { title: "Agile & Lean Basics for Designers" },
          { title: "Problem Framing (problem statements, assumptions, hypotheses)" },
          { title: "Stakeholder Alignment Basics" },
        ],
      },
      {
        title: "3. User Research Fundamentals",
        description: "Doğru soruyu sorma ve doğru yöntemi seçme kasını geliştirmek.",
        topics: [
          { title: "Research Mindset (questions, bias, ethics)" },
          { title: "Qualitative vs Quantitative Research" },
          { title: "Attitudinal vs Behavioral Data" },
          { title: "Choosing the Right Method" },
          { title: "Research Planning (goals, participants, recruitment)" },
        ],
      },
      {
        title: "4. User Interviews",
        description: "Görüşmeyi 'sohbet' değil, 'kanıt üretme' aracına çevirmek.",
        topics: [
          { title: "Writing a Discussion Guide" },
          { title: "Asking Better Questions (avoid leading questions)" },
          { title: "Moderation Skills" },
          { title: "Note Taking & Recording" },
          { title: "Post-Interview Synthesis Basics" },
        ],
      },
      {
        title: "5. Surveys & Quant Basics (Light)",
        description: "Junior seviyede 'temel nicel okuryazarlık' ve doğru kullanım.",
        topics: [
          { title: "When to Use Surveys" },
          { title: "Question Design (scales, wording pitfalls)" },
          { title: "Basic Data Reading (counts, percentages)" },
          { title: "Combining Qual + Quant (triangulation)" },
        ],
      },
      {
        title: "6. Synthesis & Insight",
        description: "Dağınık veriyi karar aldıran içgörüye dönüştürmek.",
        topics: [
          { title: "Affinity Mapping" },
          { title: "Themes & Patterns" },
          { title: "User Needs & Jobs-to-be-Done (intro level)" },
          { title: "Pain Points → Opportunities" },
          { title: "Prioritization Basics (impact/effort)" },
        ],
      },
      {
        title: "7. Personas & Journey Mapping",
        description: "Kullanıcıyı 'temsil edilebilir' hale getirip yolculuğu görünür kılmak.",
        topics: [
          { title: "Proto Personas vs Data-Driven Personas" },
          { title: "User Journeys vs Service Journeys" },
          { title: "Mapping Touchpoints & Emotions" },
          { title: "Identifying Moments of Truth" },
          { title: "Turning Journeys into Design Requirements" },
        ],
      },
      {
        title: "8. Information Architecture",
        description: "İçeriği ve navigasyonu kullanıcıların zihnine göre düzenlemek.",
        topics: [
          { title: "IA Basics" },
          { title: "Sitemaps & Structure" },
          { title: "Navigation Patterns" },
          { title: "Labeling & Terminology" },
          { title: "Card Sorting (open/closed)" },
          { title: "Tree Testing (intro)" },
        ],
      },
      {
        title: "9. Interaction Design",
        description: "Akışları, durumları ve ekran davranışlarını doğru kurgulamak.",
        topics: [
          { title: "Task Flows & User Flows" },
          { title: "State Design (empty, loading, error, success)" },
          { title: "Microinteractions" },
          { title: "Form Design Basics" },
          { title: "Error Prevention & Recovery" },
        ],
      },
      {
        title: "10. Wireframing & Prototyping",
        description: "Çözümü hızlı doğrulamak ve öğrenmeyi hızlandırmak.",
        topics: [
          { title: "Low-Fidelity Wireframes" },
          { title: "Mid-Fidelity Screens" },
          { title: "Prototyping for Testing (what to prototype / what not)" },
          { title: "Prototype Hygiene (naming, components, flow clarity)" },
        ],
      },
      {
        title: "11. Usability Testing",
        description: "Tasarımın 'çalışıp çalışmadığını' kanıtlamak.",
        topics: [
          { title: "Test Types (moderated / unmoderated)" },
          { title: "Task Writing & Scenarios" },
          { title: "Success Criteria & Metrics (task success, time, errors)" },
          { title: "Observation & Note Taking" },
          { title: "Reporting Findings & Recommendations" },
        ],
      },
      {
        title: "12. Heuristics & UX Principles",
        description: "Tasarımı hızlı değerlendirme ve sorunları diline dökebilme.",
        topics: [
          { title: "Nielsen's 10 Usability Heuristics" },
          { title: "Heuristic Evaluation Process" },
          { title: "Severity Ratings" },
          { title: "Turning Issues into Actionable Fixes" },
        ],
      },
      {
        title: "13. Accessibility & Inclusive Design",
        description: "Herkes için kullanılabilir deneyim tasarlamak (temel seviye).",
        topics: [
          { title: "Accessibility Basics" },
          { title: "WCAG Overview (intro)" },
          { title: "Color Contrast & Typography" },
          { title: "Keyboard & Focus (web)" },
          { title: "Accessible Forms & Errors" },
        ],
      },
      {
        title: "14. UX Writing & Content (Basics)",
        description: "Mikro metinlerle anlaşılabilirliği ve güveni artırmak.",
        topics: [
          { title: "Microcopy Principles" },
          { title: "Error Messages & Empty States" },
          { title: "Tone & Consistency" },
          { title: "Information Clarity (labels, buttons)" },
        ],
      },
      {
        title: "15. Measurement & Iteration (Basics)",
        description: "UX'in etkisini anlamak ve iterasyon kültürü.",
        topics: [
          { title: "UX Metrics (basic set: conversion, drop-off, task success)" },
          { title: "Qual Signals vs Quant Signals" },
          { title: "Experiment Mindset (A/B basics, guardrails)" },
          { title: "Continuous Improvement Loops" },
        ],
      },
      {
        title: "16. Collaboration & Delivery",
        description: "UX çıktısını ekip içinde 'işe dönüştürmek'.",
        topics: [
          { title: "Working with PM & Engineering" },
          { title: "Presenting Design Decisions" },
          { title: "Design Reviews" },
          { title: "Handoff Basics (what dev needs)" },
          { title: "Documentation Basics" },
        ],
      },
      {
        title: "17. Portfolio & Career",
        description: "Öğrendiklerini işe dönüştüren sunum.",
        topics: [
          { title: "Case Study Structure" },
          { title: "Showing Process (not only UI)" },
          { title: "Evidence & Outcomes" },
          { title: "Common Junior Mistakes" },
          { title: "Interview Prep Basics" },
        ],
      },
    ],
  },
  // Diğer roadmap'ler için eski yapıyı koruyalım (şimdilik)
  "ui-designer": {
    id: "ui-designer",
    title: "UI Designer",
    description: "Görsel tasarım prensiplerini, tipoğrafiyi, renk teorisini ve arayüz estetiğini öğrenerek güzel kullanıcı arayüzleri oluştur.",
    icon: "🎨",
    sections: [
      {
        title: "Temeller",
        description: "UI tasarımının temel prensipleri",
        topics: [
          { title: "UI Design Nedir?" },
          { title: "Görsel Hiyerarşi" },
          { title: "Grid Sistemleri & Layout" },
          { title: "Boşluk & Hizalama" },
          { title: "UI Designer'ın Rolü" },
        ],
      },
    ],
  },
  "product-designer": {
    id: "product-designer",
    title: "Product Designer",
    description: "UX araştırmasını, UI tasarımını ve ürün stratejisini birleştirerek bütünsel ürün deneyimleri oluştur.",
    icon: "💡",
    sections: [
      {
        title: "Ürün Temelleri",
        description: "Product design'ın temel kavramları",
        topics: [
          { title: "Product Design Nedir?" },
          { title: "Ürün Düşüncesi" },
          { title: "Ürün Yaşam Döngüsü" },
          { title: "Product Designer'ın Rolü" },
        ],
      },
    ],
  },
  "design-system": {
    id: "design-system",
    title: "Design System",
    description: "Ölçeklenebilir tasarım sistemleri, component kütüphaneleri ve tasarım yönetişimi oluştur ve sürdür.",
    icon: "🧩",
    sections: [
      {
        title: "Temeller",
        description: "Design system'lerin temelleri",
        topics: [
          { title: "Design System Nedir?" },
          { title: "Design System vs Component Kütüphanesi" },
          { title: "Faydalar & Kullanım Alanları" },
          { title: "Ne Zaman Design System Oluşturulmalı" },
        ],
      },
    ],
  },
  "design-thinking": {
    id: "design-thinking",
    title: "Design Thinking",
    description: "Karmaşık problemleri yaratıcı bir şekilde çözmek için design thinking metodolojisi ve çerçevelerini uygula.",
    icon: "💭",
    sections: [
      {
        title: "Giriş",
        description: "Design thinking'in temelleri",
        topics: [
          { title: "Design Thinking Nedir?" },
          { title: "Tarihçe & Kökenleri" },
          { title: "Bir Design Thinker'ın Zihin Yapısı" },
          { title: "Design Thinking Ne Zaman Kullanılır" },
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(roadmaps).map((slug) => ({
    slug: slug,
  }));
}

export default async function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roadmap = roadmaps[slug];

  if (!roadmap) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
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
          <Link
            href="/"
            className="text-gray-400 hover:text-[#DEFF37] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Roadmap'lere Dön
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-[#DEFF37]/5 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-scale-in">
            {roadmap.icon}
          </div>

          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-[#DEFF37]/10 border border-[#DEFF37]/30 text-[#DEFF37] font-semibold animate-fade-in">
            Roadmap
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white animate-fade-in">
            {roadmap.title}
          </h1>

          <p className="text-xl text-gray-400 animate-slide-up">
            {roadmap.description}
          </p>
        </div>
      </section>

      {/* Roadmap Content (Client Component) */}
      <RoadmapClient sections={roadmap.sections} />

      {/* CTA */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="mt-20 text-center p-12 bg-gradient-to-br from-[#DEFF37] to-[#DEFF37]/80 rounded-3xl shadow-[0_0_50px_rgba(222,255,55,0.2)]">
            <h3 className="text-3xl font-bold text-black mb-4">
              Daha fazlasını keşfetmeye hazır mısın?
            </h3>
            <p className="text-black/80 mb-8 max-w-2xl mx-auto">
              Tasarım bilgi ve becerilerini genişletmek için diğer roadmap'lere göz at.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-black text-[#DEFF37] font-bold rounded-lg hover:bg-zinc-900 hover:scale-105 transition-all duration-300"
            >
              Tüm Roadmap'leri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-zinc-900 text-gray-500 text-center">
        <p>DesignAtlas BETA &copy; 2024 - Tasarımı Öğren. Adım Adım.</p>
      </footer>
    </main>
  );
}
