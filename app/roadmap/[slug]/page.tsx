import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Topic {
  title: string;
  link?: string;
}

interface Section {
  title: string;
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
        title: "Temeller",
        topics: [
          { title: "UX Design Nedir?", link: "https://www.interaction-design.org/literature/topics/ux-design" },
          { title: "Kullanıcı Odaklı Tasarım", link: "https://www.nngroup.com/articles/user-centered-design/" },
          { title: "Design Thinking Süreci", link: "https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process" },
          { title: "UX vs UI vs Product Design" },
          { title: "UX Designer'ın Rolü" },
        ],
      },
      {
        title: "Araştırma",
        topics: [
          { title: "Kullanıcı Görüşmeleri", link: "https://www.nngroup.com/articles/user-interviews/" },
          { title: "Anketler & Soru Formları" },
          { title: "Kullanılabilirlik Testleri", link: "https://www.nngroup.com/articles/usability-testing-101/" },
          { title: "A/B Testleri" },
          { title: "Kart Sıralama" },
          { title: "Persona & Kullanıcı Yolculuk Haritaları" },
          { title: "Rakip Analizi" },
        ],
      },
      {
        title: "Bilgi Mimarisi",
        topics: [
          { title: "Site Haritaları & Kullanıcı Akışları" },
          { title: "Navigasyon Tasarımı" },
          { title: "İçerik Stratejisi" },
          { title: "Taksonomi & Etiketleme" },
        ],
      },
      {
        title: "Wireframe & Prototipleme",
        topics: [
          { title: "Düşük Çözünürlüklü Wireframe'ler" },
          { title: "Yüksek Çözünürlüklü Mockup'lar" },
          { title: "İnteraktif Prototipler" },
          { title: "Figma Temelleri", link: "https://www.figma.com/resources/learn-design/" },
          { title: "Sketch / Adobe XD" },
        ],
      },
      {
        title: "Etkileşim Tasarımı",
        topics: [
          { title: "Mikro-etkileşimler" },
          { title: "Animasyon Prensipleri" },
          { title: "Jestler & Dokunma Desenleri" },
          { title: "Geri Bildirim & Affordances" },
        ],
      },
      {
        title: "Kullanılabilirlik & Heuristikler",
        topics: [
          { title: "Nielsen'in 10 Kullanılabilirlik Heuristiği", link: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
          { title: "Erişilebilirlik (WCAG)", link: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
          { title: "Kapsayıcı Tasarım" },
          { title: "Hata Önleme" },
        ],
      },
      {
        title: "Metrikler & Doğrulama",
        topics: [
          { title: "UX Metrikleri (NPS, SUS, CSAT)" },
          { title: "Analitik & Isı Haritaları" },
          { title: "İteratif Tasarım" },
          { title: "Araştırma Sunumu & İletişimi" },
        ],
      },
    ],
  },
  "ui-designer": {
    id: "ui-designer",
    title: "UI Designer",
    description: "Görsel tasarım prensiplerini, tipoğrafiyi, renk teorisini ve arayüz estetiğini öğrenerek güzel kullanıcı arayüzleri oluştur.",
    icon: "🎨",
    sections: [
      {
        title: "Temeller",
        topics: [
          { title: "UI Design Nedir?" },
          { title: "Görsel Hiyerarşi" },
          { title: "Grid Sistemleri & Layout" },
          { title: "Boşluk & Hizalama" },
          { title: "UI Designer'ın Rolü" },
        ],
      },
      {
        title: "Renk Teorisi",
        topics: [
          { title: "Renk Psikolojisi" },
          { title: "Renk Modelleri (RGB, HSL, CMYK)" },
          { title: "Renk Paletleri & Şemalar" },
          { title: "Kontrast & Erişilebilirlik", link: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" },
          { title: "Karanlık Mod Tasarımı" },
        ],
      },
      {
        title: "Tipoğrafi",
        topics: [
          { title: "Yazı Anatomisi & Sınıflandırması" },
          { title: "Font Eşleştirme", link: "https://fonts.google.com/" },
          { title: "Hiyerarşi & Ölçek" },
          { title: "Satır Yüksekliği & Harf Aralığı" },
          { title: "Responsive Tipoğrafi" },
        ],
      },
      {
        title: "Görsel Tasarım",
        topics: [
          { title: "İkonlar & İkonografi" },
          { title: "Görseller & Fotoğrafçılık" },
          { title: "İlüstrasyonlar" },
          { title: "Gölgeler & Derinlik" },
          { title: "Kenarlıklar & Ayırıcılar" },
        ],
      },
      {
        title: "Componentler & Desenler",
        topics: [
          { title: "Butonlar & CTA'lar" },
          { title: "Formlar & Input Alanları" },
          { title: "Navigasyon Desenleri" },
          { title: "Kartlar & Listeler" },
          { title: "Modal'lar & Overlay'ler" },
          { title: "Tablolar & Veri Gösterimi" },
        ],
      },
      {
        title: "Tasarım Araçları",
        topics: [
          { title: "Figma İleri Seviye", link: "https://www.figma.com/resources/learn-design/" },
          { title: "Auto Layout & Constraints" },
          { title: "Componentler & Varyantlar" },
          { title: "Plugin'ler & İş Akışları" },
        ],
      },
      {
        title: "Handoff & İşbirliği",
        topics: [
          { title: "Tasarım Spesifikasyonları & Redline'lar" },
          { title: "Design Token'lar" },
          { title: "Developer'larla Çalışma" },
          { title: "Tasarımcılar için Versiyon Kontrolü" },
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
        topics: [
          { title: "Product Design Nedir?" },
          { title: "Ürün Düşüncesi" },
          { title: "Ürün Yaşam Döngüsü" },
          { title: "Product Designer'ın Rolü" },
        ],
      },
      {
        title: "UX & UI Yetenekleri",
        topics: [
          { title: "Kullanıcı Araştırma Yöntemleri" },
          { title: "Wireframe & Prototipleme" },
          { title: "Görsel Tasarım Prensipleri" },
          { title: "Etkileşim Tasarımı" },
        ],
      },
      {
        title: "Ürün Stratejisi",
        topics: [
          { title: "İş Hedefleri & KPI'lar" },
          { title: "Değer Önerileri" },
          { title: "Rakip Analizi" },
          { title: "Pazar Araştırması" },
        ],
      },
      {
        title: "Kullanıcı & Problem Keşfi",
        topics: [
          { title: "Jobs to be Done (JTBD)", link: "https://jtbd.info/" },
          { title: "Problem Çerçeveleme" },
          { title: "Fırsat Haritalama" },
          { title: "Kullanıcı İhtiyaçları vs İş İhtiyaçları" },
        ],
      },
      {
        title: "İşbirliği & İletişim",
        topics: [
          { title: "Product Manager'larla Çalışma" },
          { title: "Mühendislerle İşbirliği" },
          { title: "Paydaş Yönetimi" },
          { title: "Tasarım Kritiği" },
          { title: "Çalışmalarınızı Sunma" },
        ],
      },
      {
        title: "Metrikler & İterasyon",
        topics: [
          { title: "Ürün Analitiği" },
          { title: "Özellik Benimsenmesi" },
          { title: "Dönüşüm Hunileri" },
          { title: "İteratif Tasarım & A/B Testleri" },
        ],
      },
      {
        title: "İleri Konular",
        topics: [
          { title: "Büyüme Tasarımı" },
          { title: "Monetizasyon & Fiyatlandırma UI" },
          { title: "Onboarding Akışları" },
          { title: "Boş Durumlar & Hata Yönetimi" },
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
        topics: [
          { title: "Design System Nedir?" },
          { title: "Design System vs Component Kütüphanesi" },
          { title: "Faydalar & Kullanım Alanları" },
          { title: "Ne Zaman Design System Oluşturulmalı" },
        ],
      },
      {
        title: "Design Token'lar",
        topics: [
          { title: "Design Token Nedir?", link: "https://designtokens.org/" },
          { title: "Renk Token'ları" },
          { title: "Tipoğrafi Token'ları" },
          { title: "Boşluk & Boyutlandırma Token'ları" },
          { title: "Token Yönetimi" },
        ],
      },
      {
        title: "Component Tasarımı",
        topics: [
          { title: "Atomic Design Metodolojisi", link: "https://bradfrost.com/blog/post/atomic-web-design/" },
          { title: "Component API Tasarımı" },
          { title: "Varyantlar & Durumlar" },
          { title: "Kompozisyon Desenleri" },
        ],
      },
      {
        title: "Dokümantasyon",
        topics: [
          { title: "Component Dokümantasyonu" },
          { title: "Kullanım Kılavuzları" },
          { title: "Yapılması & Yapılmaması Gerekenler" },
          { title: "Kod Örnekleri" },
          { title: "Storybook", link: "https://storybook.js.org/" },
        ],
      },
      {
        title: "Yönetişim & Katkı",
        topics: [
          { title: "Design System Ekip Yapısı" },
          { title: "Katkı Modelleri" },
          { title: "Versiyon Kontrolü" },
          { title: "Deprecation Stratejisi" },
        ],
      },
      {
        title: "Uygulama",
        topics: [
          { title: "Tasarımdan Koda İş Akışı" },
          { title: "Component Kütüphaneleri (React, Vue, vb.)" },
          { title: "CSS Mimarisi" },
          { title: "Temalama & Özelleştirme" },
        ],
      },
      {
        title: "Benimseme & Ölçekleme",
        topics: [
          { title: "Benimsemeyi Ölçme" },
          { title: "Eğitim & Onboarding" },
          { title: "Çoklu Marka Desteği" },
          { title: "Design System'lerde Erişilebilirlik" },
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
        topics: [
          { title: "Design Thinking Nedir?", link: "https://www.interaction-design.org/literature/article/what-is-design-thinking-and-why-is-it-so-popular" },
          { title: "Tarihçe & Kökenleri" },
          { title: "Bir Design Thinker'ın Zihin Yapısı" },
          { title: "Design Thinking Ne Zaman Kullanılır" },
        ],
      },
      {
        title: "5 Aşama",
        topics: [
          { title: "1. Empati Kurma", link: "https://www.interaction-design.org/literature/article/stage-1-in-the-design-thinking-process-empathise-with-your-users" },
          { title: "2. Tanımlama" },
          { title: "3. Fikir Üretme" },
          { title: "4. Prototipleme" },
          { title: "5. Test Etme" },
        ],
      },
      {
        title: "Empati & Araştırma",
        topics: [
          { title: "Empati Haritalama" },
          { title: "Kullanıcı Görüşmeleri" },
          { title: "Gözlem & Etnografi" },
          { title: "Paydaş Görüşmeleri" },
        ],
      },
      {
        title: "Problem Tanımlama",
        topics: [
          { title: "Bakış Açısı (POV) İfadeleri" },
          { title: "Nasıl Yapabiliriz (HMW) Soruları", link: "https://www.designkit.org/methods/how-might-we" },
          { title: "Problem Çerçeveleme" },
          { title: "İçgörü Sentezi" },
        ],
      },
      {
        title: "Fikir Üretme Teknikleri",
        topics: [
          { title: "Beyin Fırtınası" },
          { title: "Crazy 8's" },
          { title: "SCAMPER" },
          { title: "Zihin Haritalama" },
          { title: "En Kötü Fikir" },
        ],
      },
      {
        title: "Prototipleme",
        topics: [
          { title: "Kağıt Prototipleme" },
          { title: "Dijital Prototipleme" },
          { title: "Rol Oynama" },
          { title: "Hikaye Tahtası (Storyboard)" },
        ],
      },
      {
        title: "Test & İterasyon",
        topics: [
          { title: "Kullanılabilirlik Testleri" },
          { title: "Geri Bildirim Döngüleri" },
          { title: "İterasyon Döngüleri" },
          { title: "Pivot vs Sebat Etme" },
        ],
      },
      {
        title: "Fasilitasyon",
        topics: [
          { title: "Design Sprint'leri Yönetme", link: "https://www.gv.com/sprint/" },
          { title: "Workshop Fasilitasyonu" },
          { title: "Uzaktan Design Thinking" },
          { title: "Paydaş Desteği Alma" },
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
              src="https://r.resimlink.com/rN7xge0jUDZ1.png"
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

      {/* Roadmap Content */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#DEFF37] via-[#DEFF37]/50 to-transparent rounded-full hidden md:block"></div>

            {/* Sections */}
            <div className="space-y-12">
              {roadmap.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                >
                  {/* Section marker */}
                  <div className="absolute left-0 w-16 h-16 bg-[#DEFF37] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(222,255,55,0.3)] hidden md:flex">
                    <span className="text-black font-bold text-xl">{sectionIndex + 1}</span>
                  </div>

                  {/* Section content */}
                  <div className="md:ml-24">
                    <h2 className="text-3xl font-bold mb-6 text-white">
                      {section.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.topics.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="group"
                        >
                          {topic.link ? (
                            <a
                              href={topic.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-[#DEFF37]/50 hover:bg-zinc-900 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                            >
                              <span className="font-medium text-white group-hover:text-[#DEFF37] transition-colors">
                                {topic.title}
                              </span>
                              <svg className="w-5 h-5 text-gray-600 group-hover:text-[#DEFF37] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : (
                            <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl backdrop-blur-sm">
                              <span className="font-medium text-gray-400">
                                {topic.title}
                              </span>
                              <div className="w-2 h-2 bg-zinc-700 rounded-full flex-shrink-0"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
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
