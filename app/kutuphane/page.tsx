"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
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
  category: "ux-research" | "ux-design" | "kariyer" | "araclar-ipucu" | "temel-kavramlar";
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
  { id: "temel-kavramlar", label: "Temel Kavramlar", value: "temel-kavramlar" },
] as const;

const CATEGORY_COLORS = {
  "ux-research": "#3B82F6", // mavi
  "ux-design": "#10B981", // yeşil
  "kariyer": "#8B5CF6", // mor
  "araclar-ipucu": "#F59E0B", // turuncu
  "temel-kavramlar": "#6366F1", // indigo
} as const;

const CATEGORY_LABELS = {
  "ux-research": "UX Research",
  "ux-design": "UX Design",
  "kariyer": "Kariyer",
  "araclar-ipucu": "Araçlar & İpucu",
  "temel-kavramlar": "Temel Kavramlar",
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
    id: "portfolio-case-study",
    title: "Portfolio Case Study Nasıl Yazılır?",
    subtitle: "İş Bulmanı Sağlayacak Case Study Rehberi",
    titleEn: "Portfolio Case Study",
    slug: "portfolio-case-study",
    description: "UX portfolio case study nasıl yazılır? Hiring manager'ların dikkatini çeken, süreç odaklı ve ikna edici case study oluşturma rehberi.",
    category: "kariyer",
    readingTime: 15,
    featured: true,
    publishedAt: "2025-01-13",
    heroImage: "https://r.resimlink.com/MiVUPTfO.png",
    author: "DesignAtlas",
    views: 2100,
  },
  {
    id: "user-flow-task-flow",
    title: "User Flow ve Task Flow: Fark ve Kullanım",
    subtitle: "İki Kavramı Doğru Anla, Doğru Kullan",
    titleEn: "User Flow vs Task Flow",
    slug: "user-flow-task-flow",
    description: "User flow ve task flow nedir, aralarındaki fark ne? Hangisini ne zaman kullanmalısın? Pratik örnekler ve şablonlarla akış diyagramı rehberi.",
    category: "ux-design",
    readingTime: 10,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "DesignAtlas",
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
    id: "ux-nedir",
    title: "UX Nedir?",
    subtitle: "Kullanıcı Deneyimi Tasarımına Giriş",
    titleEn: "What is UX?",
    slug: "ux-nedir",
    description: "UX (User Experience) nedir? Kullanıcı deneyimi tasarımı ne anlama gelir, neden önemlidir ve UX Designer ne yapar? Başlangıç seviyesi rehberi.",
    category: "temel-kavramlar",
    readingTime: 12,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    views: 0,
  },
  {
    id: "ui-nedir",
    title: "UI Nedir?",
    subtitle: "Kullanıcı Arayüzü Tasarımına Giriş",
    titleEn: "What is UI?",
    slug: "ui-nedir",
    description: "UI (User Interface) nedir? Kullanıcı arayüzü tasarımı ne anlama gelir, UI Designer ne yapar ve iyi bir arayüz nasıl olmalı? Başlangıç seviyesi rehberi.",
    category: "temel-kavramlar",
    readingTime: 11,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    views: 0,
  },
];

type SortOption = "newest" | "popular" | "az";

const SEARCH_PROMPTS = [
  "UX Design nedir?",
  "Kullanılabilirlik testi nedir?",
  "User flow nedir?",
];

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
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const placeholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0);
  const isTypingRef = useRef(true);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Animated placeholder typing effect - only when search input is empty
  useEffect(() => {
    // Stop animation if search query has text
    if (searchQuery !== "") {
      setAnimatedPlaceholder("");
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
      }
      return;
    }

    const currentPrompt = SEARCH_PROMPTS[currentPromptIndex];
    charIndexRef.current = 0;
    isTypingRef.current = true;

    const animate = () => {
      if (isTypingRef.current) {
        // Typing phase
        if (charIndexRef.current <= currentPrompt.length) {
          setAnimatedPlaceholder(currentPrompt.slice(0, charIndexRef.current));
          charIndexRef.current++;
          placeholderTimeoutRef.current = setTimeout(animate, 50);
        } else {
          // Wait before deleting
          placeholderTimeoutRef.current = setTimeout(() => {
            isTypingRef.current = false;
            charIndexRef.current = currentPrompt.length;
            animate();
          }, 2000);
        }
      } else {
        // Deleting phase
        if (charIndexRef.current > 0) {
          charIndexRef.current--;
          setAnimatedPlaceholder(currentPrompt.slice(0, charIndexRef.current));
          placeholderTimeoutRef.current = setTimeout(animate, 30);
        } else {
          // Move to next prompt
          setCurrentPromptIndex((prev) => (prev + 1) % SEARCH_PROMPTS.length);
        }
      }
    };

    animate();

    return () => {
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
      }
    };
  }, [searchQuery, currentPromptIndex]);

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

  // Get featured articles
  const featuredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter((article) => article.featured);
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

  // Google Analytics page view tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Kütüphane',
        page_location: window.location.href,
        page_path: '/kutuphane',
      });
    }
  }, []);

  // Track search events
  useEffect(() => {
    if (debouncedSearchQuery && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'search', {
        search_term: debouncedSearchQuery,
        page_location: window.location.href,
      });
    }
  }, [debouncedSearchQuery]);

  // Track category filter events
  useEffect(() => {
    if (selectedCategory !== 'all' && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'filter', {
        filter_type: 'category',
        filter_value: selectedCategory,
        page_location: window.location.href,
      });
    }
  }, [selectedCategory]);

  // Track sort events
  useEffect(() => {
    if (sortBy !== 'newest' && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sort', {
        sort_type: sortBy,
        page_location: window.location.href,
      });
    }
  }, [sortBy]);

  // Track article clicks
  const handleArticleClick = (articleId: string, articleTitle: string, articleSlug: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'Article',
        event_label: articleTitle,
        article_id: articleId,
        article_slug: articleSlug,
        page_location: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 border-b border-zinc-800 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#DEFF37]/5 via-transparent to-purple-500/5 animate-gradient-shift"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            {/* Animated Books Stack */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-end gap-2 book-stack">
                <div className="book book-1">📖</div>
                <div className="book book-2">📗</div>
                <div className="book book-3">📕</div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white hero-title mb-4">
              Kütüphane
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto hero-subtitle">
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
                placeholder={animatedPlaceholder || "Konu veya anahtar kelime ara..."}
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
            {/* Featured Articles */}
            {featuredArticles.length > 0 &&
              !debouncedSearchQuery &&
              (selectedCategory === "all" ||
                featuredArticles.some((article) => article.category === selectedCategory)) && (
                <section className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span>⭐</span>
                    <span>Öne Çıkan</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredArticles
                      .filter(
                        (article) =>
                          selectedCategory === "all" || article.category === selectedCategory
                      )
                      .map((article) => (
                        <Link
                          key={article.id}
                          href={`/kutuphane/${article.slug}`}
                          className="group block bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#DEFF37]/50 transition-all duration-300 hover:-translate-y-1"
                          onClick={() => handleArticleClick(article.id, article.title, article.slug)}
                        >
                          {article.heroImage && (
                            <div className="w-full h-48 overflow-hidden">
                              <img
                                src={article.heroImage}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6">
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
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#DEFF37] transition-colors">
                              {article.title}
                            </h3>
                            {article.subtitle && (
                              <p className="text-gray-400 text-sm mb-2">{article.subtitle}</p>
                            )}
                            <p className="text-gray-400 italic text-sm mb-3">{article.titleEn}</p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {article.description.substring(0, 120)}
                              {article.description.length > 120 ? "..." : ""}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
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
                    onClick={() => handleArticleClick(article.id, article.title, article.slug)}
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

      {/* Animation Styles */}
      <style jsx>{`
        /* Floating Books Animation */
        .book-stack {
          position: relative;
        }

        .book {
          font-size: 2.5rem;
          display: inline-block;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
        }

        .book-1 {
          animation: float-book-1 3s ease-in-out infinite;
          transform-origin: center bottom;
        }

        .book-2 {
          animation: float-book-2 3.5s ease-in-out infinite;
          animation-delay: 0.2s;
          transform-origin: center bottom;
        }

        .book-3 {
          animation: float-book-3 3.2s ease-in-out infinite;
          animation-delay: 0.4s;
          transform-origin: center bottom;
        }

        @keyframes float-book-1 {
          0%, 100% {
            transform: translateY(0) rotate(-2deg) scale(1);
          }
          50% {
            transform: translateY(-12px) rotate(2deg) scale(1.05);
          }
        }

        @keyframes float-book-2 {
          0%, 100% {
            transform: translateY(0) rotate(1deg) scale(1);
          }
          50% {
            transform: translateY(-15px) rotate(-1deg) scale(1.05);
          }
        }

        @keyframes float-book-3 {
          0%, 100% {
            transform: translateY(0) rotate(-1.5deg) scale(1);
          }
          50% {
            transform: translateY(-10px) rotate(1.5deg) scale(1.05);
          }
        }

        /* Hero Title Animation */
        .hero-title {
          animation: fade-in-up 0.8s ease-out;
          background: linear-gradient(to right, #ffffff, #f0f0f0, #ffffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fade-in-up 0.8s ease-out, shimmer 3s ease-in-out infinite;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        /* Hero Subtitle Animation */
        .hero-subtitle {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }

        /* Gradient Background Animation */
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 0.5;
            transform: translate(0, 0) scale(1);
          }
          33% {
            opacity: 0.7;
            transform: translate(20px, -20px) scale(1.1);
          }
          66% {
            opacity: 0.6;
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .book-1,
          .book-2,
          .book-3,
          .hero-title,
          .hero-subtitle,
          .animate-gradient-shift {
            animation: none;
          }

          .hero-title {
            background: none;
            -webkit-text-fill-color: #ffffff;
            color: #ffffff;
          }

          .book {
            filter: none;
          }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .book {
            font-size: 2rem;
          }

          @keyframes float-book-1,
                   float-book-2,
                   float-book-3 {
            0%, 100% {
              transform: translateY(0) rotate(0deg) scale(1);
            }
            50% {
              transform: translateY(-8px) rotate(1deg) scale(1.02);
            }
          }
        }
      `}</style>
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
