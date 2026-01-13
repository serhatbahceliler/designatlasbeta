"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";

// Article type definition
export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  titleEn: string;
  slug: string;
  description: string;
  category: "ux-research" | "ux-design" | "kariyer" | "araclar-ipucu";
  readingTime: number;
  featured: boolean;
  publishedAt: string;
  heroImage?: string;
  author?: string;
  views?: number; // For popularity sorting
}

// Category configuration
const CATEGORIES = [
  { id: "all", label: "Tümü", value: "all" },
  { id: "ux-research", label: "UX Research", value: "ux-research" },
  { id: "ux-design", label: "UX Design", value: "ux-design" },
  { id: "kariyer", label: "Kariyer", value: "kariyer" },
  { id: "araclar-ipucu", label: "Araçlar & İpucu", value: "araclar-ipucu" },
] as const;

const CATEGORY_COLORS = {
  "ux-research": "#3B82F6", // mavi
  "ux-design": "#10B981", // yeşil
  "kariyer": "#8B5CF6", // mor
  "araclar-ipucu": "#F59E0B", // turuncu
} as const;

const CATEGORY_LABELS = {
  "ux-research": "UX Research",
  "ux-design": "UX Design",
  "kariyer": "Kariyer",
  "araclar-ipucu": "Araçlar & İpucu",
} as const;

// Mock articles data
const MOCK_ARTICLES: Article[] = [
  {
    id: "kullanilabilirlik-testi",
    title: "Kullanılabilirlik Testi Nedir?",
    subtitle: "Adım Adım Uygulama Rehberi",
    titleEn: "Usability Testing",
    slug: "kullanilabilirlik-testi",
    description: "Tasarımlarını gerçek kullanıcılarla test etmenin en etkili yolu. Kullanılabilirlik testinin ne olduğunu, neden önemli olduğunu ve adım adım nasıl uygulayacağını öğren.",
    category: "ux-research",
    readingTime: 12,
    featured: true,
    publishedAt: "2025-01-13",
    heroImage: "https://r.resimlink.com/76fDGw31VzEL.png",
    author: "DesignAtlas",
    views: 1250,
  },
  {
    id: "2",
    title: "User Flow Nasıl Çizilir?",
    titleEn: "User Flow Design",
    slug: "user-flow-nasil-cizilir",
    description: "Kullanıcı akışlarını görselleştirmek için pratik ipuçları ve en iyi uygulamalar. Basit akışlardan karmaşık senaryolara kadar örneklerle.",
    category: "ux-design",
    readingTime: 8,
    featured: false,
    publishedAt: "2025-01-10",
    views: 890,
  },
  {
    id: "3",
    title: "Portfolio Case Study Yazım Rehberi",
    titleEn: "Portfolio Case Study Writing",
    slug: "portfolio-case-study-yazim-rehberi",
    description: "İşverenlerin dikkatini çeken case study'ler yazmak için kapsamlı rehber. Problem tanımlamadan çözüme kadar tüm adımlar.",
    category: "kariyer",
    readingTime: 15,
    featured: false,
    publishedAt: "2025-01-08",
    views: 2100,
  },
  {
    id: "4",
    title: "Figma'da Component Sistemi Kurmak",
    titleEn: "Building Component Systems in Figma",
    slug: "figmada-component-sistemi-kurmak",
    description: "Ölçeklenebilir ve tutarlı tasarım sistemleri oluşturmak için Figma component'lerini etkili kullanma teknikleri.",
    category: "araclar-ipucu",
    readingTime: 10,
    featured: false,
    publishedAt: "2025-01-05",
    views: 1650,
  },
  {
    id: "kullanici-gorusmesi",
    title: "Kullanıcı Görüşmesi Nasıl Yapılır?",
    subtitle: "Etkili User Interview Rehberi",
    titleEn: "User Interview",
    slug: "kullanici-gorusmesi",
    description: "Kullanıcı görüşmesi nedir, nasıl yapılır? Doğru soru sorma teknikleri, görüşme planı oluşturma ve kullanıcıdan içgörü çıkarma rehberi.",
    category: "ux-research",
    readingTime: 14,
    featured: false,
    publishedAt: "2025-01-13",
    heroImage: "",
    author: "DesignAtlas",
    views: 980,
  },
  {
    id: "6",
    title: "Wireframe'den High-Fidelity'e Geçiş",
    titleEn: "From Wireframe to High-Fidelity",
    slug: "wireframeden-high-fidelitye-gecis",
    description: "Low-fidelity wireframe'lerden production-ready tasarımlara geçiş sürecinde dikkat edilmesi gerekenler ve pratik yaklaşımlar.",
    category: "ux-design",
    readingTime: 9,
    featured: false,
    publishedAt: "2025-01-01",
    views: 750,
  },
  {
    id: "7",
    title: "UX Mülakatına Nasıl Hazırlanılır?",
    titleEn: "Preparing for UX Interviews",
    slug: "ux-mulakatina-nasil-hazirlanilir",
    description: "Portfolio sunumundan whiteboard challenge'a kadar UX mülakat sürecinin her aşaması için hazırlık rehberi.",
    category: "kariyer",
    readingTime: 11,
    featured: false,
    publishedAt: "2024-12-28",
    views: 1450,
  },
  {
    id: "8",
    title: "Figma Auto Layout Kullanım İpuçları",
    titleEn: "Figma Auto Layout Tips",
    slug: "figma-auto-layout-kullanim-ipuclari",
    description: "Auto Layout'u profesyonel seviyede kullanarak responsive ve tutarlı tasarımlar oluşturma teknikleri.",
    category: "araclar-ipucu",
    readingTime: 7,
    featured: false,
    publishedAt: "2024-12-25",
    views: 1100,
  },
];

type SortOption = "newest" | "popular" | "az";

function KutuphaneContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("kategori") || "all"
  );
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [displayLimit, setDisplayLimit] = useState(8);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory === "all") {
      params.delete("kategori");
    } else {
      params.set("kategori", selectedCategory);
    }
    router.push(`/kutuphane?${params.toString()}`, { scroll: false });
  }, [selectedCategory, router, searchParams]);

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = MOCK_ARTICLES.filter((article) => {
      // Category filter
      const categoryMatch =
        selectedCategory === "all" || article.category === selectedCategory;

      // Search filter
      const searchMatch =
        debouncedSearchQuery === "" ||
        article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        article.titleEn.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "popular":
          return (b.views || 0) - (a.views || 0);
        case "az":
          return a.title.localeCompare(b.title, "tr");
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, debouncedSearchQuery, sortBy]);

  // Get featured article
  const featuredArticle = useMemo(() => {
    return MOCK_ARTICLES.find((article) => article.featured);
  }, []);

  // Get articles (excluding featured)
  const regularArticles = useMemo(() => {
    return filteredAndSortedArticles.filter((article) => !article.featured);
  }, [filteredAndSortedArticles]);

  // Displayed articles
  const displayedArticles = regularArticles.slice(0, displayLimit);
  const hasMore = regularArticles.length > displayLimit;

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 8);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
    setDisplayLimit(8);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white flex items-center justify-center gap-3">
              <span>📚</span>
              <span>Kütüphane</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              UX, UI ve Product Design hakkında Türkçe rehberler. Öğrenmeye nereden başlayacağını bilmiyorsan, roadmap'lere göz at.
            </p>
          </div>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Konu veya anahtar kelime ara..."
                className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37]/50 focus:ring-2 focus:ring-[#DEFF37]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 px-6 border-b border-zinc-800 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category.value
                    ? "bg-[#DEFF37] text-black"
                    : "bg-zinc-900/50 text-gray-300 hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Empty State */}
        {filteredAndSortedArticles.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">Sonuç bulunamadı</h3>
            <p className="text-gray-400 mb-6">
              {debouncedSearchQuery
                ? `"${debouncedSearchQuery}" için içerik henüz yok. Farklı bir arama dene veya tüm yazılara göz at.`
                : "Bu kategoride henüz içerik yok."}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-[#DEFF37] text-black font-semibold rounded-lg hover:bg-[#DEFF37]/90 transition-colors"
            >
              Tüm Yazıları Gör
            </button>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle &&
              !debouncedSearchQuery &&
              (selectedCategory === "all" || featuredArticle.category === selectedCategory) && (
                <section className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span>⭐</span>
                    <span>Öne Çıkan</span>
                  </h2>
                  <Link
                    href={`/kutuphane/${featuredArticle.slug}`}
                    className="group block bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#DEFF37]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    {featuredArticle.heroImage && (
                      <div className="w-full h-64 overflow-hidden">
                        <img
                          src={featuredArticle.heroImage}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="px-3 py-1 rounded-full text-sm font-semibold"
                            style={{
                              backgroundColor: `${CATEGORY_COLORS[featuredArticle.category]}20`,
                              color: CATEGORY_COLORS[featuredArticle.category],
                              border: `1px solid ${CATEGORY_COLORS[featuredArticle.category]}40`,
                            }}
                          >
                            {CATEGORY_LABELS[featuredArticle.category]}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {featuredArticle.readingTime} dk okuma
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-[#DEFF37] transition-colors">
                          {featuredArticle.title}
                        </h3>
                        <p className="text-gray-400 italic mb-3">{featuredArticle.titleEn}</p>
                        <p className="text-gray-300 leading-relaxed">
                          {featuredArticle.description.substring(0, 150)}
                          {featuredArticle.description.length > 150 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  </Link>
                </section>
              )}

            {/* All Articles Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Tüm Yazılar</h2>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#DEFF37]/50"
                >
                  <option value="newest">En Yeni</option>
                  <option value="popular">En Popüler</option>
                  <option value="az">A-Z</option>
                </select>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {displayedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/kutuphane/${article.slug}`}
                    className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-[#DEFF37]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${CATEGORY_COLORS[article.category]}20`,
                          color: CATEGORY_COLORS[article.category],
                          border: `1px solid ${CATEGORY_COLORS[article.category]}40`,
                        }}
                      >
                        {CATEGORY_LABELS[article.category]}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {article.readingTime} dk okuma
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#DEFF37] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 italic text-sm mb-3">{article.titleEn}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {article.description.substring(0, 120)}
                      {article.description.length > 120 ? "..." : ""}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-3 bg-zinc-900/50 border border-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-800 hover:border-[#DEFF37]/50 transition-all"
                  >
                    Daha Fazla Yükle ({regularArticles.length - displayLimit} yazı daha)
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-zinc-950 border-t border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white flex items-center justify-center gap-2">
            <span>💡</span>
            <span>Nereden Başlamalıyım?</span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Öğrenme yolculuğuna başlamak için roadmap'leri keşfet:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/roadmap/ux-designer"
              className="px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white font-semibold hover:bg-zinc-800 hover:border-[#DEFF37]/50 transition-all"
            >
              UX Designer Roadmap
            </Link>
            <Link
              href="/roadmap/ui-designer"
              className="px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white font-semibold hover:bg-zinc-800 hover:border-[#DEFF37]/50 transition-all"
            >
              UI Designer Roadmap
            </Link>
            <Link
              href="/roadmap/product-designer"
              className="px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white font-semibold hover:bg-zinc-800 hover:border-[#DEFF37]/50 transition-all"
            >
              Product Designer Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-zinc-900 text-gray-500 text-center">
        <p>DesignAtlas BETA &copy; 2024 - Tasarımı Öğren. Adım Adım.</p>
      </footer>
    </div>
  );
}

export default function KutuphanePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <KutuphaneContent />
    </Suspense>
  );
}
