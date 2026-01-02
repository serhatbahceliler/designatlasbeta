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
          <p className="text-center text-gray-400 mb-16 text-lg">
            5 farklı tasarım disiplini için hazırlanmış roadmap'ler
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
    </main>
  );
}
