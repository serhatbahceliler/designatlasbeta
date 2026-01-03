"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const roadmaps = [
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "Araştırma yöntemleri, kullanıcı akışları, test süreçleri ve temel UX pratiklerini öğren. Problemi doğru tanımlamayı ve kullanıcı odaklı çözüm üretmeyi hedefler.",
    icon: "🎯",
  },
  {
    id: "ui-designer",
    title: "UI Designer",
    description: "Görsel hiyerarşi, layout sistemleri ve component mantığını kavra. Tutarlı, ölçeklenebilir ve geliştiriciyle uyumlu arayüzler tasarlamaya odaklanır.",
    icon: "🎨",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description: "Problem çözme, ürün düşüncesi ve uçtan uca tasarım sürecini kapsar. İş hedefleriyle kullanıcı ihtiyaçlarını dengeleyen kararlar almayı öğretir.",
    icon: "💡",
  },
  {
    id: "design-system",
    title: "Design Systems",
    description: "Component yapıları, token mantığı ve tasarım sistemlerinin nasıl kurulduğunu öğren. Büyük ürünlerde tutarlılık ve sürdürülebilirlik sağlamaya odaklanır.",
    icon: "🧩",
  },
  {
    id: "design-thinking",
    title: "Design Thinking",
    description: "Problem keşfi, fikir üretimi, prototipleme ve test adımlarını kapsar. Belirsiz problemleri yapılandırılmış şekilde çözme yaklaşımını öğretir.",
    icon: "💭",
  },
];

const anonymousQuotes = [
  "YouTube izliyorum ama doğru sırada mı öğreniyorum bilmiyorum.",
  "UX mi UI mı Product mı seçmem gerektiğine karar veremiyorum.",
  "Bir şeyler öğreniyorum ama ilerlediğimi hissetmiyorum.",
  "Her kaynak farklı bir şey söylüyor, hangisine güveneceğimi bilmiyorum.",
  "Ne öğrenmem gerektiğini biliyorum ama nereden başlayacağımı bilmiyorum.",
  "Bir roadmap olsa da adım adım ilerlesem diye düşünüyorum.",
  "Kaynak çok ama hepsi dağınık; düzenli bir yol istiyorum.",
  "Öğreniyorum ama portfolyoya nasıl çevireceğimi bilmiyorum.",
];

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Bir ürünü kullanırken seni en çok hangisi düşündürür?",
    options: [
      { text: "Kullanıcı neden burada takıldı, neyi anlamadı?", scores: { ux: 3, ui: 0, product: 0 } },
      { text: "Bu ekran daha düzenli ve estetik olabilir.", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Bu özellik gerçekten gerekli mi, problemi çözüyor mu?", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
  {
    id: 2,
    question: "Bir problem verildiğinde ilk refleksin hangisi olur?",
    options: [
      { text: "Önce kullanıcıyı anlamaya çalışırım.", scores: { ux: 3, ui: 0, product: 0 } },
      { text: "Nasıl bir arayüzle çözerim diye düşünürüm.", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Problemin köküne ve etkisine bakarım.", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
  {
    id: 3,
    question: "Aşağıdakilerden hangisi sana daha keyifli gelir?",
    options: [
      { text: "Kullanıcı testlerinden çıkan içgörüleri yorumlamak.", scores: { ux: 3, ui: 0, product: 0 } },
      { text: "Renk, boşluk ve düzenle ekranı iyileştirmek.", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Hangi çözümün daha anlamlı olduğuna karar vermek.", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
  {
    id: 4,
    question: "Bir tasarımda seni en çok ne tatmin eder?",
    options: [
      { text: "Kullanıcının daha az zorlanması.", scores: { ux: 3, ui: 0, product: 0 } },
      { text: "Görsel olarak temiz ve tutarlı olması.", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Ürünün doğru problemi çözmesi.", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
  {
    id: 5,
    question: "Bir ekip toplantısında sen daha çok ne yaparsın?",
    options: [
      { text: "Kullanıcı perspektifini hatırlatırım.", scores: { ux: 3, ui: 0, product: 0 } },
      { text: "Tasarım kalitesiyle ilgili yorum yaparım.", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Öncelik ve kapsam üzerine düşünürüm.", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
  {
    id: 6,
    question: "Bir ekranı eleştirirken ilk baktığın şey nedir?",
    options: [
      { text: "Kullanıcı bu akışı anlayabilir mi?", scores: { ux: 3, ui: 0, product: 0 } },
      { text: "Görsel hiyerarşi doğru mu?", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Bu ekranın üründeki rolü ne?", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
  {
    id: 7,
    question: "Aşağıdaki cümlelerden hangisi sana daha yakın?",
    options: [
      { text: "Kullanıcıyı anlamadan çözüm olmaz.", scores: { ux: 3, ui: 0, product: 0 } },
      { text: "İyi bir arayüz her şeyi değiştirir.", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Doğru problem çözülmüyorsa tasarım anlamsızdır.", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
  {
    id: 8,
    question: "Bu alanda öğrenmeye başlarken seni en çok ne motive eder?",
    options: [
      { text: "İnsan davranışlarını anlamak.", scores: { ux: 3, ui: 0, product: 0 } },
      { text: "Görsel tasarım becerilerini geliştirmek.", scores: { ux: 0, ui: 3, product: 0 } },
      { text: "Ürün kararlarının arkasındaki mantığı öğrenmek.", scores: { ux: 0, ui: 0, product: 3 } },
    ],
  },
];

const resultDescriptions = {
  ux: {
    title: "UX Designer",
    icon: "🎯",
    description: "Yanıtlarına göre, UX Designer yoluyla başlaman senin için daha uygun görünüyor. Kullanıcıyı anlama, problem keşfi ve deneyimi iyileştirme tarafına daha yatkınsın. Bu bir sınav değil; ilerledikçe farklı alanlara da geçebilirsin.",
    roadmapLink: "/roadmap/ux-designer",
  },
  ui: {
    title: "UI Designer",
    icon: "🎨",
    description: "Yanıtlarına göre, UI Designer yoluyla başlaman senin için daha uygun görünüyor. Görsel düzen, estetik ve arayüz detaylarına daha yatkınsın. Bu bir sınav değil; ilerledikçe farklı alanlara da geçebilirsin.",
    roadmapLink: "/roadmap/ui-designer",
  },
  product: {
    title: "Product Designer",
    icon: "💡",
    description: "Yanıtlarına göre, Product Designer yoluyla başlaman senin için daha uygun görünüyor. Ürün düşüncesi, önceliklendirme ve stratejik karar alma tarafına daha yatkınsın. Bu bir sınav değil; ilerledikçe farklı alanlara da geçebilirsin.",
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

          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-text-reveal" style={{ animationDelay: '0ms' }}>
              <span className="px-4 py-2 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-full text-[#DEFF37] font-semibold text-sm">
                Erken Erişim
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-text-reveal" style={{ animationDelay: '150ms' }}>
              Tasarımı öğrenirken kaybolma.
              <br />
              <span className="text-[#DEFF37]">designatlas.io yolunu gösterir.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-text-reveal" style={{ animationDelay: '300ms' }}>
              UX, UI ve Product Design için hazırlanmış,
              <br />
              tamamı Türkçe anlatımlarla sunulan öğrenme roadmap'leri.
              <br />
              <span className="text-gray-400">Güvenilir kaynaklarla neyi, ne zaman ve neden öğrenmen gerektiğini netleştirir.</span>
            </p>

            {/* Micro-motivation */}
            <p className="text-sm text-gray-500 mt-6 max-w-2xl mx-auto animate-text-reveal" style={{ animationDelay: '450ms' }}>
              Günde 15–20 dakika ayırarak ilerleyebileceğin şekilde tasarlandı.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Trust & Value Section */}
      <section className="py-12 px-6 bg-zinc-950 border-t border-[#DEFF37]/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 leading-relaxed">
            Tüm roadmap'ler, gerçek kaynaklara dayanır ve öğrenme belirsizliğini azaltmak için hazırlanır.
          </p>
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
      <section className="py-24 px-6 bg-zinc-950 border-t border-[#DEFF37]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Tasarımcılar bize ne söyledi?
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            Aşağıdaki yorumlar, daha önce yaptığımız anonim bir anketten alınmıştır.
          </p>

          {/* First Row - Scrolling Right to Left */}
          <div className="relative mb-8">
            <div className="marquee-container">
              <div className="marquee-content marquee-scroll-left">
                {[...anonymousQuotes.slice(0, 4), ...anonymousQuotes.slice(0, 4)].map((quote, index) => (
                  <div
                    key={index}
                    className="glassmorphism-card group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">
                        "{quote}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row - Scrolling Left to Right */}
          <div className="relative mb-12">
            <div className="marquee-container">
              <div className="marquee-content marquee-scroll-right">
                {[...anonymousQuotes.slice(4, 8), ...anonymousQuotes.slice(4, 8)].map((quote, index) => (
                  <div
                    key={index}
                    className="glassmorphism-card group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">
                        "{quote}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 opacity-70">
              🔒 Tüm geri bildirimler anonimdir
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6 bg-black border-t border-[#DEFF37]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            designatlas.io bu belirsizliği ortadan kaldırır.
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Ne öğreneceğini, hangi sırayla ilerleyeceğini ve hangi kaynağa güveneceğini netleştirir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Rolüne göre adım adım roadmap'ler</p>
                <p className="text-gray-400 text-sm">UX, UI ve Product Designer rolleri için neyi, ne zaman öğrenmen gerektiğini net bir sırayla gösterir.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Güvenilir kaynaklara dayalı içerikler</p>
                <p className="text-gray-400 text-sm">Nielsen Norman Group, Interaction Design Foundation gibi güvenilir ve doğrulanmış kaynaklara yönlendirir.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Temel olanı öğren, detayda kaybolma</p>
                <p className="text-gray-400 text-sm">Gereksiz konu yok. Sadece gerçekten işine yarayacak temel bilgileri öğrenirsin.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DEFF37]/10 border border-[#DEFF37] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#DEFF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Hesapsız, baskısız öğrenme</p>
                <p className="text-gray-400 text-sm">Kayıt yok, mail yok, üyelik yok. Hemen başla, kendi hızında ilerle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta / Early Access Section */}
      <section className="py-16 px-6 bg-zinc-950 border-t border-[#DEFF37]/20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block px-4 py-2 mb-4 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-full">
            <span className="text-[#DEFF37] font-semibold text-sm">ERKEN ERİŞİM</span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            DesignAtlas erken erişimde
          </h3>
          <p className="text-gray-400">
            Roadmap'ler sürekli güncellenir ve geri bildirimlerle gelişir. Öğrenme yolculuğunda her zaman yanında.
          </p>
        </div>
      </section>

      {/* Roadmap Preview Section */}
      <section id="roadmaps" className="py-24 px-6 bg-zinc-950 border-t border-[#DEFF37]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Öğrenme yolunu seç
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Rolüne mi odaklanmak istiyorsun, yoksa tasarım becerilerini derinleştirmek mi?
          </p>

          {/* Roller (Job-based learning) */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Roller</h3>
              <p className="text-gray-400 text-sm">Belirli bir tasarım rolü için uçtan uca öğrenme yolculukları.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmaps.filter(r => ['ux-designer', 'ui-designer', 'product-designer'].includes(r.id)).map((roadmap, index) => (
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

              {/* Quiz Card */}
              <button
                onClick={() => setIsQuizOpen(true)}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm text-left"
                style={{
                  animation: `slideUp 0.6s ease-out 0.3s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 to-zinc-800/0 group-hover:from-zinc-800/10 group-hover:to-transparent transition-all duration-500"></div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    ❓
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gray-300 transition-colors duration-300">
                    Karar veremediysen, yardımcı olalım.
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                    1 dakikalık kısa bir quiz ile sana en uygun başlangıç yolunu önerelim.
                  </p>

                  <div className="flex items-center text-gray-400 font-medium group-hover:translate-x-2 transition-transform duration-300 text-sm">
                    Quiz'i Başlat
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Tasarım Becerileri (Skill/framework based learning) */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Tasarım Becerileri</h3>
              <p className="text-gray-400 text-sm">Rolünden bağımsız olarak, tasarım becerilerini derinleştirebileceğin alanlar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Design Systems - Yakında */}
              <div
                className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm cursor-not-allowed"
                style={{
                  animation: `slideUp 0.6s ease-out 0.3s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 to-zinc-800/0 group-hover:from-zinc-800/10 group-hover:to-transparent transition-all duration-500"></div>

                <div className="relative p-8">
                  {/* Badge - Sağ Üst */}
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-zinc-800 text-gray-400 rounded-md">
                    Yakında
                  </span>

                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    🧩
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    Design Systems
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    Ölçeklenebilir tasarım sistemleri, component kütüphaneleri ve tasarım yönetişimi oluştur ve sürdür.
                  </p>
                </div>
              </div>

              {/* Design Thinking - Yakında */}
              <div
                className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm cursor-not-allowed"
                style={{
                  animation: `slideUp 0.6s ease-out 0.4s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 to-zinc-800/0 group-hover:from-zinc-800/10 group-hover:to-transparent transition-all duration-500"></div>

                <div className="relative p-8">
                  {/* Badge - Sağ Üst */}
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-zinc-800 text-gray-400 rounded-md">
                    Yakında
                  </span>

                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    💭
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    Design Thinking
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    Karmaşık problemleri yaratıcı bir şekilde çözmek için design thinking metodolojisi ve çerçevelerini uygula.
                  </p>
                </div>
              </div>

              {/* UX Research - Yakında */}
              <div
                className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm cursor-not-allowed"
                style={{
                  animation: `slideUp 0.6s ease-out 0.5s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 to-zinc-800/0 group-hover:from-zinc-800/10 group-hover:to-transparent transition-all duration-500"></div>

                <div className="relative p-8">
                  {/* Badge - Sağ Üst */}
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-zinc-800 text-gray-400 rounded-md">
                    Yakında
                  </span>

                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    🔍
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    UX Research
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    Kullanıcıyı daha derinlemesine anlamaya odaklanan araştırma ve test süreçleri. Görüşmeler, testler ve içgörü üretimi üzerine kapsamlı bir öğrenme yolu.
                  </p>
                </div>
              </div>

              {/* Interaction Design - Yakında */}
              <div
                className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm cursor-not-allowed"
                style={{
                  animation: `slideUp 0.6s ease-out 0.6s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 to-zinc-800/0 group-hover:from-zinc-800/10 group-hover:to-transparent transition-all duration-500"></div>

                <div className="relative p-8">
                  {/* Badge - Sağ Üst */}
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-zinc-800 text-gray-400 rounded-md">
                    Yakında
                  </span>

                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    ⚡
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    Interaction Design
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    Kullanıcı akışları, etkileşimler ve ekranlar arası davranış tasarımı. Daha akıcı ve sezgisel deneyimler oluşturmayı hedefleyen bir disiplin.
                  </p>
                </div>
              </div>
            </div>
          </div>
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

        @keyframes text-reveal {
          from {
            opacity: 0;
            filter: blur(8px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
        .animate-text-reveal {
          opacity: 0;
          animation: text-reveal 0.8s ease-out forwards;
        }

        /* Glassmorphism Card Styles */
        .glassmorphism-card {
          position: relative;
          width: 380px;
          flex-shrink: 0;
          padding: 1.25rem;
          background: rgba(24, 24, 27, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(222, 255, 55, 0.12);
          border-radius: 1rem;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .glassmorphism-card:hover {
          background: rgba(24, 24, 27, 0.7);
          border-color: rgba(222, 255, 55, 0.25);
          box-shadow: 0 12px 40px 0 rgba(222, 255, 55, 0.08),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        /* Marquee Container */
        .marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .marquee-content {
          display: flex;
          gap: 1.5rem;
          width: fit-content;
        }

        /* Marquee Animations */
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .marquee-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .marquee-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        /* Hover Pause */
        .marquee-container:hover .marquee-scroll-left,
        .marquee-container:hover .marquee-scroll-right {
          animation-play-state: paused;
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .marquee-scroll-left,
          .marquee-scroll-right {
            animation: none;
          }

          .marquee-content {
            justify-content: center;
            flex-wrap: wrap;
          }

          .glassmorphism-card {
            width: 100%;
            max-width: 380px;
          }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .glassmorphism-card {
            width: 320px;
          }
        }
      `}</style>
    </main>
  );
}
