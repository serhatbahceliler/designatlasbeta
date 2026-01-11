'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';

// UX Terms Data Structure
const UX_TERMS = [
  // 🧠 Temel UX Kavramları
  { id: 'user-experience-ux', term: 'User Experience (UX)', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'user-interface-ui', term: 'User Interface (UI)', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'usability', term: 'Usability', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'accessibility-a11y', term: 'Accessibility (A11y)', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'user-centered-design', term: 'User-Centered Design', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'human-centered-design', term: 'Human-Centered Design', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'design-thinking', term: 'Design Thinking', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'interaction-design', term: 'Interaction Design', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'information-architecture-ia', term: 'Information Architecture (IA)', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'user-flow', term: 'User Flow', category: 'Temel UX Kavramları', emoji: '🧠' },

  // ⏱️ Performans & Algı
  { id: '2-saniye-kurali', term: '2 Saniye Kuralı', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'response-time', term: 'Response Time', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'perceived-performance', term: 'Perceived Performance', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'loading-states', term: 'Loading States', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'skeleton-screen', term: 'Skeleton Screen', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'feedback-visual-system', term: 'Feedback (Visual / System Feedback)', category: 'Performans & Algı', emoji: '⏱️' },

  // 🧪 Research & Discovery
  { id: 'user-research', term: 'User Research', category: 'Research & Discovery', emoji: '🧪' },
  { id: 'user-interview', term: 'User Interview', category: 'Research & Discovery', emoji: '🧪' },
  { id: 'usability-testing', term: 'Usability Testing', category: 'Research & Discovery', emoji: '🧪' },
  { id: 'personas', term: 'Personas', category: 'Research & Discovery', emoji: '🧪' },
  { id: 'jobs-to-be-done-jtbd', term: 'Jobs To Be Done (JTBD)', category: 'Research & Discovery', emoji: '🧪' },
  { id: 'user-journey-map', term: 'User Journey Map', category: 'Research & Discovery', emoji: '🧪' },

  // 🧩 Product & Karar Alma
  { id: 'problem-statement', term: 'Problem Statement', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'hypothesis', term: 'Hypothesis', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'mvp-minimum-viable-product', term: 'MVP (Minimum Viable Product)', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'product-discovery', term: 'Product Discovery', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'success-metrics', term: 'Success Metrics', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'north-star-metric', term: 'North Star Metric', category: 'Product & Karar Alma', emoji: '🧩' },

  // 🧱 UI & Pattern Odaklı Kavramlar
  { id: 'design-system', term: 'Design System', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'component', term: 'Component', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'atomic-design', term: 'Atomic Design', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'consistency', term: 'Consistency', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'visual-hierarchy', term: 'Visual Hierarchy', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'empty-state', term: 'Empty State', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },

  // ⚠️ Çok Yanlış Anlaşılan ama Çok Önemli
  { id: 'ux-case-study', term: 'UX Case Study', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'concept-case', term: 'Concept Case', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'edge-case', term: 'Edge Case', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'cognitive-load', term: 'Cognitive Load', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'affordance', term: 'Affordance', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'error-prevention', term: 'Error Prevention', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
];

type FilterRange = 'all' | 'a-d' | 'e-h' | 'i-l' | 'm-o' | 'p-t' | 'u-z' | '0-9';

interface Term {
  id: string;
  term: string;
  category: string;
  emoji: string;
}

function getFirstLetter(term: string): string {
  const firstChar = term.charAt(0).toUpperCase();
  if (firstChar >= 'A' && firstChar <= 'D') return 'a-d';
  if (firstChar >= 'E' && firstChar <= 'H') return 'e-h';
  if (firstChar >= 'I' && firstChar <= 'L') return 'i-l';
  if (firstChar >= 'M' && firstChar <= 'O') return 'm-o';
  if (firstChar >= 'P' && firstChar <= 'T') return 'p-t';
  if (firstChar >= 'U' && firstChar <= 'Z') return 'u-z';
  if (firstChar >= '0' && firstChar <= '9') return '0-9';
  return 'other';
}

function filterTermsByRange(terms: Term[], range: FilterRange): Term[] {
  if (range === 'all') return terms;
  
  return terms.filter((term) => {
    const firstLetter = getFirstLetter(term.term);
    return firstLetter === range;
  });
}

export default function UXSozlukPage() {
  const [activeFilter, setActiveFilter] = useState<FilterRange>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = filterTermsByRange(UX_TERMS, activeFilter);
    
    if (selectedCategory) {
      terms = terms.filter((term) => term.category === selectedCategory);
    }
    
    return terms;
  }, [activeFilter, selectedCategory]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(UX_TERMS.map((t) => t.category)));
    return uniqueCategories.map((cat) => {
      const term = UX_TERMS.find((t) => t.category === cat);
      return {
        name: cat,
        emoji: term?.emoji || '📚',
      };
    });
  }, []);

  const filterButtons: { label: string; value: FilterRange }[] = [
    { label: 'Tümünü Gör', value: 'all' },
    { label: 'A-D', value: 'a-d' },
    { label: 'E-H', value: 'e-h' },
    { label: 'I-L', value: 'i-l' },
    { label: 'M-O', value: 'm-o' },
    { label: 'P-T', value: 'p-t' },
    { label: 'U-Z', value: 'u-z' },
    { label: '1-9', value: '0-9' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              UX Sözlük
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              UX, UI ve Product Design terimlerinin açıklamaları
            </p>
          </div>

          {/* Quick Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {filterButtons.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setActiveFilter(filter.value);
                    setSelectedCategory(null);
                  }}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    activeFilter === filter.value
                      ? 'bg-[#DEFF37] text-black'
                      : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedCategory === null
                    ? 'bg-[#DEFF37] text-black'
                    : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800'
                }`}
              >
                Tüm Kategoriler
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setActiveFilter('all');
                  }}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-[#DEFF37] text-black'
                      : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800'
                  }`}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Terms List - Group by category */}
          {(() => {
            // Group filtered terms by category
            const termsByCategory = filteredTerms.reduce((acc, term) => {
              if (!acc[term.category]) {
                acc[term.category] = [];
              }
              acc[term.category].push(term);
              return acc;
            }, {} as Record<string, Term[]>);

            const displayedCategories = categories.filter((cat) => termsByCategory[cat.name]?.length > 0);

            if (displayedCategories.length === 0) {
              return (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg">
                    Bu filtreye uygun terim bulunamadı.
                  </p>
                </div>
              );
            }

            return (
              <div className="space-y-8">
                {displayedCategories.map((category) => {
                  const categoryTerms = termsByCategory[category.name] || [];
                  
                  return (
                    <div key={category.name} className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900/30">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">{category.emoji}</span>
                        <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                        <span className="text-gray-500 text-sm">({categoryTerms.length})</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryTerms.map((term) => (
                          <div
                            key={term.id}
                            className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-[#DEFF37]/50 transition-all duration-200 cursor-pointer"
                          >
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {term.term}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              İçerik yakında eklenecek...
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
