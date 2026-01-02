import Link from "next/link";
import Image from "next/image";

const roadmaps = [
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "Kullanıcı araştırması, wireframe ve kullanıcı odaklı tasarımda ustalaş",
    icon: "🎯",
  },
  {
    id: "ui-designer",
    title: "UI Designer",
    description: "Görsel tasarım, tipografi ve arayüz estetiğini öğren",
    icon: "🎨",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description: "UX ve UI'ı ürün stratejisi ve düşüncesi ile birleştir",
    icon: "💡",
  },
  {
    id: "design-system",
    title: "Design System",
    description: "Ölçeklenebilir tasarım sistemleri ve component kütüphaneleri oluştur",
    icon: "🧩",
  },
  {
    id: "design-thinking",
    title: "Design Thinking",
    description: "Karmaşık problemleri çözmek için design thinking metodolojisini uygula",
    icon: "💭",
  },
];

export default function Home() {
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
              src="https://r.resimlink.com/rN7xge0jUDZ1.png"
              alt="DesignAtlas"
              width={200}
              height={60}
              className="h-16 w-auto"
              unoptimized
            />
          </div>

          <div className="animate-slide-up">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
              Tasarımı Öğren.
              <br />
              <span className="text-[#DEFF37]">Adım Adım.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              UX, UI ve Product Designer'lar için net, açık roadmap'ler.
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

      {/* Roadmap Categories Section */}
      <section id="roadmaps" className="py-24 px-6 bg-black border-t border-[#DEFF37]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Yolunu Seç
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            Senin için hazırladığımız 5 farklı tasarım yolu
          </p>

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

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {roadmap.description}
                  </p>

                  <div className="flex items-center text-[#DEFF37] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Roadmap'i Gör
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why DesignAtlas Section */}
      <section className="py-24 px-6 bg-zinc-950 border-t border-[#DEFF37]/20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #DEFF37 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Neden DesignAtlas?
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            Türkçe, ücretsiz ve sade öğrenme yolları
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-[#DEFF37]/50 transition-all duration-300 group backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#DEFF37]/10 border-2 border-[#DEFF37] rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-8 h-8 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Kayıt Yok</h3>
              <p className="text-gray-400">
                Direkt başla. Hesap yok, engel yok, sürtünme yok.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-[#DEFF37]/50 transition-all duration-300 group backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#DEFF37]/10 border-2 border-[#DEFF37] rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-8 h-8 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Boş Laf Yok</h3>
              <p className="text-gray-400">
                Sadece önemli olanlar. Net, uygulanabilir içerik.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-[#DEFF37]/50 transition-all duration-300 group backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#DEFF37]/10 border-2 border-[#DEFF37] rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-8 h-8 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Net Öğrenme Yolları</h3>
              <p className="text-gray-400">
                Sırada ne olduğunu tam olarak bil. Tahmin yok, sadece ilerleme.
              </p>
            </div>
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
