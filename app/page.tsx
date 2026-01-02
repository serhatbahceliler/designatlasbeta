"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const roadmaps = [
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "Araştırma, akış, test ve temel UX pratikleri.",
    icon: "🎯",
  },
  {
    id: "ui-designer",
    title: "UI Designer",
    description: "Görsel hiyerarşi, layout, component düşüncesi.",
    icon: "🎨",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description: "Problem çözme, ürün düşüncesi, tasarım süreci.",
    icon: "💡",
  },
  {
    id: "design-system",
    title: "Design Systems",
    description: "Bileşenler, token mantığı, ölçeklenebilir UI.",
    icon: "🧩",
  },
  {
    id: "design-thinking",
    title: "Design Thinking",
    description: "Problem keşfi, fikir üretimi, prototipleme, test.",
    icon: "💭",
  },
];

const anonymousQuotes = [
  "YouTube izliyorum ama doğru sırada mı öğreniyorum bilmiyorum.",
  "UX mi UI mı Product mı seçmem gerektiğine karar veremiyorum.",
  "Bir şeyler öğreniyorum ama ilerlediğimi hissetmiyorum.",
  "Her kaynak farklı bir şey söylüyor, hangisine güveneceğimi bilmiyorum.",
];

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Bir tasarım projesinde seni en çok heyecanlandıran şey ne?",
    options: [
      { text: "Kullanıcıların davranışlarını anlamak ve problemlerini çözmek", scores: { ux: 3, ui: 0, product: 1 } },
      { text: "Güzel, estetik ve tutarlı arayüzler oluşturmak", scores: { ux: 0, ui: 3, product: 1 } },
      { text: "İş hedeflerini kullanıcı ihtiyaçları ile dengelemek", scores: { ux: 1, ui: 0, product: 3 } },
    ],
  },
  {
    id: 2,
    question: "Boş zamanında genellikle ne yaparsın?",
    options: [
      { text: "İnsanları gözlemlerim, davranışlarını analiz ederim", scores: { ux: 3, ui: 0, product: 1 } },
      { text: "Dribbble/Behance'de tasarımlar incelerim, renk paletleri oluştururum", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Startup haberleri okur, ürün stratejileri hakkında düşünürüm", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
  {
    id: 3,
    question: "Bir uygulama kullanırken en çok neye dikkat edersin?",
    options: [
      { text: "Ne kadar kolay ve mantıklı kullanılabildiğine", scores: { ux: 3, ui: 1, product: 1 } },
      { text: "Görsel tutarlılığına, renk ve tipografi seçimlerine", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Çözdüğü probleme ve iş modelinin mantığına", scores: { ux: 1, ui: 0, product: 3 } },
    ],
  },
  {
    id: 4,
    question: "Hangi tür araçlarla çalışmayı daha çok seversin?",
    options: [
      { text: "Kullanıcı araştırması ve test araçları (anketler, analytics)", scores: { ux: 3, ui: 0, product: 2 } },
      { text: "Tasarım araçları (Figma, Sketch) ve stil kılavuzları", scores: { ux: 0, ui: 3, product: 1 } },
      { text: "Her ikisi de - ama önce veriye bakarım", scores: { ux: 2, ui: 1, product: 3 } },
    ],
  },
  {
    id: 5,
    question: "Bir problem ile karşılaştığında ilk tepkin ne olur?",
    options: [
      { text: "Kullanıcılarla konuşurum, onların yaşadığı zorluğu anlamaya çalışırım", scores: { ux: 3, ui: 0, product: 1 } },
      { text: "Benzer problemlerin çözümlerini araştırır, görsel referanslar toplarım", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Problemi iş hedefleriyle eşleştirir, önceliklendiririm", scores: { ux: 1, ui: 0, product: 3 } },
    ],
  },
  {
    id: 6,
    question: "Ekip toplantılarında genellikle hangi konulara odaklanırsın?",
    options: [
      { text: "Kullanıcı deneyiminin akışına, kullanılabilirlik sorunlarına", scores: { ux: 3, ui: 1, product: 1 } },
      { text: "Tasarım tutarlılığına, görsel detaylara", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Ürünün genel stratejisine, KPI'lara, iş sonuçlarına", scores: { ux: 1, ui: 1, product: 3 } },
    ],
  },
  {
    id: 7,
    question: "Başarılı bir tasarım projesi için en önemli şey nedir?",
    options: [
      { text: "Kullanıcı ihtiyaçlarını tam olarak karşılaması", scores: { ux: 3, ui: 1, product: 2 } },
      { text: "Görsel olarak etkileyici ve tutarlı olması", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "İş hedeflerine ulaşması ve ölçülebilir sonuçlar yaratması", scores: { ux: 1, ui: 0, product: 3 } },
    ],
  },
  {
    id: 8,
    question: "Hangi tür feedback almaktan en çok hoşlanırsın?",
    options: [
      { text: "Kullanılabilirlik testi sonuçları ve kullanıcı geri bildirimleri", scores: { ux: 3, ui: 0, product: 1 } },
      { text: "Görsel tasarımın kalitesi ve estetik tercihleri hakkında", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Ürünün iş etkisi ve kullanıcı metriklerindeki değişim", scores: { ux: 1, ui: 0, product: 3 } },
    ],
  },
  {
    id: 9,
    question: "Bir projede en çok hangi aşamada olmaktan keyif alırsın?",
    options: [
      { text: "Araştırma ve keşif aşamasında - kullanıcıları anlamak", scores: { ux: 3, ui: 0, product: 2 } },
      { text: "Görsel tasarım aşamasında - mockup ve prototype oluşturmak", scores: { ux: 0, ui: 3, product: 1 } },
      { text: "Strateji ve planlama aşamasında - ürünün yönünü belirlemek", scores: { ux: 1, ui: 0, product: 3 } },
    ],
  },
  {
    id: 10,
    question: "Kendini tanımlarken hangi ifadeyi kullanırsın?",
    options: [
      { text: "Empatik, araştırmacı, kullanıcı odaklı", scores: { ux: 3, ui: 0, product: 1 } },
      { text: "Yaratıcı, detaycı, estetik düşkünü", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Stratejik, analitik, problem çözücü", scores: { ux: 1, ui: 0, product: 3 } },
    ],
  },
];

const resultDescriptions = {
  ux: {
    title: "UX Designer",
    icon: "🎯",
    description: "Kullanıcı araştırması, davranış analizi ve kullanılabilirlik konularına odaklanıyorsun. Kullanıcıların ihtiyaçlarını anlamak ve sorunlarını çözmek senin için en önemli.",
    roadmapLink: "/roadmap/ux-designer",
  },
  ui: {
    title: "UI Designer",
    icon: "🎨",
    description: "Görsel tasarım, estetik ve arayüz detaylarına önem veriyorsun. Güzel, tutarlı ve etkileyici kullanıcı arayüzleri oluşturmak senin uzmanlık alanın.",
    roadmapLink: "/roadmap/ui-designer",
  },
  product: {
    title: "Product Designer",
    icon: "💡",
    description: "İş hedefleri ile kullanıcı ihtiyaçlarını dengelemek, stratejik düşünmek ve ürün başarısını ölçmek senin için önemli. Hem UX hem UI'ı birleştirerek bütünsel çözümler üretiyorsun.",
    roadmapLink: "/roadmap/product-designer",
  },
};

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ ux: 0, ui: 0, product: 0 });
  const [quizResult, setQuizResult] = useState<"ux" | "ui" | "product" | null>(null);

  const handleAnswerClick = (optionScores: { ux: number; ui: number; product: number }) => {
    const newScores = {
      ux: scores.ux + optionScores.ux,
      ui: scores.ui + optionScores.ui,
      product: scores.product + optionScores.product,
    };
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz tamamlandı, sonucu hesapla
      const result = Object.entries(newScores).reduce((a, b) => (newScores[a[0] as keyof typeof newScores] > newScores[b[0] as keyof typeof newScores] ? a : b))[0] as "ux" | "ui" | "product";
      setQuizResult(result);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ ux: 0, ui: 0, product: 0 });
    setQuizResult(null);
    setIsQuizOpen(false);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScores({ ux: 0, ui: 0, product: 0 });
    setQuizResult(null);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DEFF37]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DEFF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#DEFF37 1px, transparent 1px), linear-gradient(90deg, #DEFF37 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          {/* Logo */}
          <div className="mb-12 animate-fade-in flex justify-center">
            <Image
              src="https://r.resimlink.com/9ezfkr.png"
              alt="DesignAtlas"
              width={200}
              height={60}
              className="h-16 w-auto"
              unoptimized
            />
          </div>

          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Tasarımı öğrenmek
              <br />
              <span className="text-[#DEFF37]">zor olmamalı.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              DesignAtlas, UX, UI ve Product Design öğrenme sürecindeki belirsizliği azaltmak için oluşturulmuş, adım adım öğrenme yol haritaları sunar.
              <br />
              <span className="text-gray-400">Neyi, ne zaman ve neden öğrenmen gerektiğini netleştirir.</span>
            </p>
            <a
              href="#roadmaps"
              className="inline-block px-8 py-4 bg-[#DEFF37] text-black font-bold rounded-lg hover:bg-[#DEFF37]/90 hover:shadow-[0_0_30px_rgba(222,255,55,0.3)] hover:scale-105 transition-all duration-300 animate-scale-in"
            >
              Roadmap'leri Keşfet
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-black border-t border-[#DEFF37]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">
            Sorun içerik eksikliği değil, yön eksikliği
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
            YouTube'da videolar, Medium'da makaleler, onlarca kurs platformu... İçerik her yerde. Ama doğru sırada, doğru zamanda neyi öğrenmen gerektiğini söyleyen yok.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">Nereden başlayacağını bilememek</p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">Hangi konunun gerçekten önemli olduğunu ayırt edememek</p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">Doğru sırada ilerleyip ilerlemediğinden emin olamamak</p>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">Öğrendiğini ilerleme hissine çevirememek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence / Real Voices Section */}
      <section className="py-24 px-6 bg-zinc-950 border-t border-[#DEFF37]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Tasarımcılar bize ne söyledi?
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Aşağıdaki yorumlar, daha önce yaptığımız anonim bir anketten alınmıştır.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {anonymousQuotes.map((quote, index) => (
              <div
                key={index}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-[#DEFF37]/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-2xl">💬</div>
                  <p className="text-gray-300 italic leading-relaxed">"{quote}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              🔒 Tüm geri bildirimler anonimdir.
            </p>
            <Link
              href="/survey"
              className="inline-flex items-center gap-2 text-[#DEFF37] hover:text-[#DEFF37]/80 transition-colors font-medium"
            >
              Anonim anketi görüntüle
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6 bg-black border-t border-[#DEFF37]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            DesignAtlas tam olarak bu noktada devreye giriyor
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">UX, UI ve Product Designer'lar için adım adım roadmap'ler</p>
                <p className="text-gray-400 text-sm">Her rolde ne öğrenmen gerektiğini, hangi sırayla ilerlemen gerektiğini göster.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Güvenilir kaynaklardan kürasyonlu içerikler</p>
                <p className="text-gray-400 text-sm">Nielsen Norman Group, Interaction Design Foundation gibi güvenilir kaynaklara yönlendirme.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Temel konulara odaklanan sade yapı</p>
                <p className="text-gray-400 text-sm">Gereksiz detaylar yok. Sadece öğrenmen gereken temel konular.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Hesap oluşturmadan, baskı olmadan öğrenme</p>
                <p className="text-gray-400 text-sm">Hemen başla. Mail adresi yok, üyelik yok, sadece öğren.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Preview Section */}
      <section id="roadmaps" className="py-24 px-6 bg-zinc-950 border-t border-[#DEFF37]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Öğrenme yolunu seç
          </h2>
          <p className="text-center text-gray-400 mb-8 text-lg">
            5 farklı tasarım disiplini için hazırlanmış roadmap'ler
          </p>

          {/* Quiz Trigger */}
          <div className="max-w-2xl mx-auto mb-16 p-6 bg-zinc-900/50 border border-[#DEFF37]/30 rounded-xl text-center">
            <p className="text-gray-300 mb-4">
              Hangi alana meraklı olduğunu bilemiyor musun?
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#DEFF37] text-black font-bold rounded-lg hover:bg-[#DEFF37]/90 hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              10 Soruluk Quiz'i Başlat
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap, index) => (
              <Link
                key={roadmap.id}
                href={`/roadmap/${roadmap.id}`}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-[#DEFF37]/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#DEFF37]/0 to-[#DEFF37]/0 group-hover:from-[#DEFF37]/5 group-hover:to-transparent transition-all duration-500"></div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {roadmap.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#DEFF37] transition-colors duration-300">
                    {roadmap.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                    {roadmap.description}
                  </p>

                  <div className="flex items-center text-[#DEFF37] font-semibold group-hover:translate-x-2 transition-transform duration-300 text-sm">
                    Roadmap'i Gör
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* No Sign-Up Section */}
      <section className="py-24 px-6 bg-black border-t border-[#DEFF37]/20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#DEFF37]/10 border-2 border-[#DEFF37] rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Çünkü öğrenmek için hesap açmak zorunda değilsin
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            DesignAtlas'ta mail bırakman gerekmez. Hesap oluşturman gerekmez. Sadece öğrenirsin.
          </p>
        </div>
      </section>

      {/* Beta Disclaimer Section */}
      <section className="py-16 px-6 bg-zinc-950 border-t border-[#DEFF37]/20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block px-4 py-2 mb-4 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-full">
            <span className="text-[#DEFF37] font-semibold text-sm">BETA</span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Bu bir beta sürüm
          </h3>
          <p className="text-gray-400">
            DesignAtlas erken aşamada. İçerikler geri bildirimlerle gelişecek.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 bg-black border-t border-[#DEFF37]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Bir roadmap ile başla.
            <br />
            <span className="text-[#DEFF37]">Adım adım ilerle.</span>
          </h2>
          <a
            href="#roadmaps"
            className="inline-block px-8 py-4 bg-[#DEFF37] text-black font-bold rounded-lg hover:bg-[#DEFF37]/90 hover:shadow-[0_0_30px_rgba(222,255,55,0.3)] hover:scale-105 transition-all duration-300"
          >
            Roadmap'leri Keşfet
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-zinc-900 text-gray-500 text-center">
        <p>DesignAtlas BETA &copy; 2024 - Tasarımı Öğren. Adım Adım.</p>
      </footer>

      {/* Quiz Drawer */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={resetQuiz}
          ></div>

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-zinc-900 shadow-2xl border-l border-[#DEFF37]/20 overflow-y-auto animate-slide-in-right">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Tasarım Alanı Keşif Quiz'i
                  </h2>
                  {!quizResult && (
                    <p className="text-gray-400 text-sm">
                      Soru {currentQuestion + 1} / {quizQuestions.length}
                    </p>
                  )}
                </div>
                <button
                  onClick={resetQuiz}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quiz Content */}
              {!quizResult ? (
                <>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#DEFF37] transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-6">
                      {quizQuestions[currentQuestion].question}
                    </h3>

                    <div className="space-y-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerClick(option.scores)}
                          className="w-full p-5 bg-zinc-800/50 border border-zinc-700 rounded-xl text-left hover:border-[#DEFF37]/50 hover:bg-zinc-800 transition-all duration-300 group"
                        >
                          <p className="text-gray-300 group-hover:text-white transition-colors">
                            {option.text}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Result */
                <div className="text-center py-12">
                  <div className="text-7xl mb-6">{resultDescriptions[quizResult].icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {resultDescriptions[quizResult].title}
                  </h3>
                  <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
                    {resultDescriptions[quizResult].description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href={resultDescriptions[quizResult].roadmapLink}
                      className="inline-block px-8 py-4 bg-[#DEFF37] text-black font-bold rounded-lg hover:bg-[#DEFF37]/90 hover:scale-105 transition-all duration-300"
                    >
                      Roadmap'i İncele
                    </Link>
                    <button
                      onClick={restartQuiz}
                      className="px-8 py-4 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
                    >
                      Tekrar Çöz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}
