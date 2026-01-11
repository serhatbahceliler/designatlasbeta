'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';

// Term Content Type
interface TermContent {
  shortDefinition: string;
  detailedDescription: string;
  exampleScenario?: string;
  whenToUse?: string[];
  relatedConcepts: string[];
}

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

// Term Contents (first 10 terms)
const TERM_CONTENTS: Record<string, TermContent> = {
  'user-experience-ux': {
    shortDefinition: 'User Experience (UX), bir kullanıcının bir ürün veya hizmetle etkileşime girdiği tüm süreç boyunca yaşadığı deneyimin bütünüdür. Sadece arayüzü değil, algıyı, hissi ve karar verme sürecini kapsar.',
    detailedDescription: 'UX, bir ürünün yalnızca nasıl göründüğüyle değil, nasıl çalıştığı ve nasıl hissettirdiğiyle ilgilenir. Kullanıcının bir hedefe ulaşırken karşılaştığı engeller, belirsizlikler ve aldığı geri bildirimler UX\'in parçasıdır.\n\nİyi bir UX, kullanıcıyı düşünmeye zorlamadan doğru yönlendiren bir deneyim sunar. Kötü bir UX ise kullanıcıyı kararsız bırakır, hata yapmasına neden olur ya da ürünü terk etmesine yol açar.\n\nUX tasarımı estetikten bağımsız değildir ancak estetik tek başına yeterli değildir. Asıl fark, kullanıcının problemini gerçekten çözüp çözmediğinizde ortaya çıkar.',
    exampleScenario: 'Bir bankacılık uygulamasında para transferi teknik olarak mümkün olabilir. Ancak kullanıcı hangi adımı yapacağını düşünüyorsa veya hata aldığında ne yapacağını bilmiyorsa, deneyim zayıftır.',
    whenToUse: [
      'Ürün akışları tasarlanırken',
      'Kullanıcı problemleri analiz edilirken',
      'Mevcut bir ürün iyileştirilirken'
    ],
    relatedConcepts: ['Usability', 'User Flow', 'Interaction Design', 'Accessibility']
  },
  'user-interface-ui': {
    shortDefinition: 'User Interface (UI), kullanıcının bir ürünle etkileşime girdiği görsel ve etkileşimsel yüzdür. Butonlar, metinler, renkler ve bileşenler UI\'ın temel parçalarıdır.',
    detailedDescription: 'UI, UX\'in görünen kısmıdır ancak UX\'in kendisi değildir. İyi bir UI, kullanıcıyı yönlendirir ve karar vermeyi kolaylaştırır. Kötü bir UI ise kullanıcıyı yanlış yönlendirir veya zihinsel yük oluşturur.\n\nUI tasarımı yalnızca estetik üretmek için değil, bilgiyi doğru önceliklendirmek ve kullanıcıyı doğru aksiyona yönlendirmek için yapılır.',
    exampleScenario: 'Bir e-ticaret sitesinde "Satın Al" butonunun yeterince görünür olmaması, kullanıcının satın alma kararından vazgeçmesine neden olabilir.',
    whenToUse: [
      'Ekran tasarımları yapılırken',
      'Design system oluşturulurken',
      'Kullanılabilirlik problemleri çözülürken'
    ],
    relatedConcepts: ['Visual Hierarchy', 'Design System', 'Consistency']
  },
  'usability': {
    shortDefinition: 'Usability, bir ürünün kullanıcılar tarafından ne kadar kolay, hızlı ve hatasız kullanılabildiğini ifade eder.',
    detailedDescription: 'Kullanılabilirlik; öğrenilebilirlik, hata oranı ve görev tamamlama süresi gibi kriterlerle değerlendirilir. Bir ürün görsel olarak iyi tasarlanmış olabilir ancak kullanımı zorsa usability düşüktür.\n\nİyi usability, kullanıcıyı eğitmeye gerek kalmadan hedefe ulaştırır ve kullanıcıyı yormaz.',
    exampleScenario: 'Bir formda hangi alanların zorunlu olduğu anlaşılmıyorsa ve kullanıcı hata mesajlarıyla karşılaşıyorsa, burada bir usability problemi vardır.',
    whenToUse: [
      'Ürün test edilirken',
      'Kullanıcı hataları analiz edilirken',
      'Akışlar sadeleştirilirken'
    ],
    relatedConcepts: ['Usability Testing', 'Cognitive Load', 'Error Prevention']
  },
  'accessibility-a11y': {
    shortDefinition: 'Accessibility, dijital ürünlerin farklı yetilere sahip kullanıcılar tarafından da erişilebilir ve kullanılabilir olmasını ifade eder.',
    detailedDescription: 'Erişilebilirlik yalnızca engelli kullanıcılar için değil, herkes için daha iyi bir deneyim anlamına gelir. Kontrast, klavye ile kullanım ve ekran okuyucu uyumluluğu bu kapsamda değerlendirilir.\n\nİyi bir accessibility yaklaşımı, daha kapsayıcı ve sürdürülebilir ürünler ortaya çıkarır.',
    exampleScenario: 'Düşük kontrastlı bir metin, görme problemi olan kullanıcılar için okunamaz hâle gelebilir.',
    whenToUse: [
      'UI tasarlanırken',
      'Design system oluşturulurken',
      'Yasal ve etik gereklilikler değerlendirilirken'
    ],
    relatedConcepts: ['Usability', 'Inclusive Design', 'Visual Hierarchy']
  },
  'user-centered-design': {
    shortDefinition: 'User-Centered Design, tasarım sürecinin merkezine kullanıcı ihtiyaçlarını ve beklentilerini koyan bir yaklaşımdır.',
    detailedDescription: 'Bu yaklaşımda kararlar varsayımlara göre değil, kullanıcıdan elde edilen içgörülere göre alınır. Kullanıcı geri bildirimi sürecin doğal bir parçasıdır.\n\nAmaç, kullanıcıyı ürüne adapte etmek değil, ürünü kullanıcıya adapte etmektir.',
    exampleScenario: 'Kullanıcıyı tanımadan tasarlanan bir dashboard, ihtiyaçları karşılamadığı için kullanılmaz.',
    whenToUse: [
      'Ürün keşif aşamasında',
      'Yeni özellik geliştirilirken'
    ],
    relatedConcepts: ['User Research', 'Personas', 'Design Thinking']
  },
  'human-centered-design': {
    shortDefinition: 'Human-Centered Design, sadece kullanıcıyı değil, insan davranışlarını, duygularını ve bağlamı merkeze alan bir tasarım yaklaşımıdır.',
    detailedDescription: 'Bu yaklaşım empatiye dayanır ve tasarımın insanlar üzerindeki etkisini önemser. Özellikle karmaşık ve duygusal bağlamı olan ürünlerde öne çıkar.',
    exampleScenario: 'Sağlık uygulamalarında kullanıcıların yalnızca görevleri değil, stres ve kaygı durumları da dikkate alınmalıdır.',
    whenToUse: [
      'Sosyal etki odaklı ürünlerde',
      'Davranış temelli tasarımlarda'
    ],
    relatedConcepts: ['Design Thinking', 'Empathy', 'User Research']
  },
  'design-thinking': {
    shortDefinition: 'Design Thinking, problem çözmeye empatiyle yaklaşan ve iteratif ilerleyen bir düşünme yöntemidir.',
    detailedDescription: 'Design Thinking, çözümden önce problemi doğru tanımlamayı savunur. Deneme-yanılma ve öğrenme sürecin temelidir.\n\nYanlış problemi çözen en iyi tasarım bile başarısız olur.',
    exampleScenario: 'Kullanıcı problemleri netleşmeden geliştirilen özellikler çoğu zaman kullanılmaz.',
    whenToUse: [
      'Problem keşfi yapılırken',
      'Fikir üretme aşamasında'
    ],
    relatedConcepts: ['Problem Statement', 'Ideation', 'Prototyping']
  },
  'interaction-design': {
    shortDefinition: 'Interaction Design, kullanıcının bir sistemle nasıl etkileşime girdiğini tasarlama sürecidir.',
    detailedDescription: 'Tıklamalar, geçişler, animasyonlar ve geri bildirimler interaction design\'ın parçasıdır. Amaç, etkileşimi doğal ve sezgisel hâle getirmektir.',
    exampleScenario: 'Bir butona tıklandıktan sonra hiçbir geri bildirim verilmemesi, kullanıcıyı belirsizlikte bırakır.',
    whenToUse: [
      'Akışlar tasarlanırken',
      'Mikro etkileşimler kurgulanırken'
    ],
    relatedConcepts: ['Feedback', 'User Flow', 'Microinteractions']
  },
  'information-architecture-ia': {
    shortDefinition: 'Information Architecture, bilginin nasıl yapılandırıldığını ve kullanıcıya nasıl sunulduğunu ifade eder.',
    detailedDescription: 'IA, kullanıcının doğru bilgiye doğru zamanda ulaşmasını sağlar. Menü yapıları, kategoriler ve hiyerarşi bu kapsamda değerlendirilir.',
    exampleScenario: 'Kullanıcının aradığı içeriği menüde bulamaması, bir bilgi mimarisi problemidir.',
    whenToUse: [
      'Navigasyon tasarlanırken',
      'İçerik yapısı kurgulanırken'
    ],
    relatedConcepts: ['Navigation', 'User Flow', 'Content Strategy']
  },
  'user-flow': {
    shortDefinition: 'User Flow, kullanıcının bir hedefe ulaşmak için izlediği adımların bütünüdür.',
    detailedDescription: 'Net ve kesintisiz bir user flow, kullanıcıyı doğru aksiyona yönlendirir. Gereksiz adımlar kullanıcıyı yorar ve terk oranını artırır.',
    exampleScenario: 'Satın alma akışında fazla adım olması, kullanıcının işlemi yarıda bırakmasına neden olabilir.',
    whenToUse: [
      'Akış tasarlanırken',
      'Drop-off noktaları analiz edilirken'
    ],
    relatedConcepts: ['Journey Map', 'Interaction Design', 'Usability']
  }
};

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
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const handleTermClick = (termId: string) => {
    setSelectedTerm(termId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTerm(null);
  };

  const selectedTermData = selectedTerm ? UX_TERMS.find((t) => t.id === selectedTerm) : null;
  const selectedTermContent = selectedTerm ? TERM_CONTENTS[selectedTerm] : null;

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
                        {categoryTerms.map((term) => {
                          const hasContent = TERM_CONTENTS[term.id] !== undefined;
                          
                          return (
                            <div
                              key={term.id}
                              onClick={() => hasContent && handleTermClick(term.id)}
                              className={`p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl transition-all duration-200 ${
                                hasContent
                                  ? 'hover:border-[#DEFF37]/50 cursor-pointer'
                                  : 'opacity-60'
                              }`}
                            >
                              <h3 className="text-lg font-semibold text-white mb-2">
                                {term.term}
                              </h3>
                              {hasContent && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {TERM_CONTENTS[term.id].relatedConcepts.slice(0, 3).map((concept) => (
                                    <span
                                      key={concept}
                                      className="px-2 py-1 bg-zinc-800 text-gray-300 text-xs rounded-full"
                                    >
                                      {concept}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </main>

      {/* Drawer */}
      {isDrawerOpen && selectedTermData && selectedTermContent && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
            onClick={handleCloseDrawer}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-zinc-900 border-l border-zinc-800 z-50 overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-white">{selectedTermData.term}</h2>
              <button
                onClick={handleCloseDrawer}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Kısa Tanım */}
              <div>
                <h3 className="text-lg font-semibold text-[#DEFF37] mb-3">Kısa Tanım</h3>
                <p className="text-gray-300 leading-relaxed">{selectedTermContent.shortDefinition}</p>
              </div>

              {/* Detaylı Açıklama */}
              <div>
                <h3 className="text-lg font-semibold text-[#DEFF37] mb-3">Detaylı Açıklama</h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedTermContent.detailedDescription}
                </div>
              </div>

              {/* Örnek Senaryo */}
              {selectedTermContent.exampleScenario && (
                <div>
                  <h3 className="text-lg font-semibold text-[#DEFF37] mb-3">Örnek Senaryo</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedTermContent.exampleScenario}</p>
                </div>
              )}

              {/* Ne Zaman Kullanılır? */}
              {selectedTermContent.whenToUse && selectedTermContent.whenToUse.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#DEFF37] mb-3">Ne Zaman Kullanılır?</h3>
                  <ul className="space-y-2">
                    {selectedTermContent.whenToUse.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-[#DEFF37] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* İlgili Kavramlar */}
              {selectedTermContent.relatedConcepts && selectedTermContent.relatedConcepts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#DEFF37] mb-3">İlgili Kavramlar</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTermContent.relatedConcepts.map((concept) => (
                      <span
                        key={concept}
                        className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-gray-300 text-sm rounded-full"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
