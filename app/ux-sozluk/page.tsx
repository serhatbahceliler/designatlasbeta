'use client';

import { useState, useMemo, useEffect } from 'react';
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
  { id: 'user-experience-ux', term: 'User Experience (UX) Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'user-interface-ui', term: 'User Interface (UI) Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'usability', term: 'Usability Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'accessibility-a11y', term: 'Accessibility (A11y) Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'user-centered-design', term: 'User-Centered Design Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'human-centered-design', term: 'Human-Centered Design Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'design-thinking', term: 'Design Thinking Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'interaction-design', term: 'Interaction Design Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'information-architecture-ia', term: 'Information Architecture (IA) Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },
  { id: 'user-flow', term: 'User Flow Nedir?', category: 'Temel UX Kavramları', emoji: '🧠' },

  // ⏱️ Performans & Algı
  { id: '2-saniye-kurali', term: '2 Saniye Kuralı Nedir?', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'response-time', term: 'Response Time Nedir?', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'perceived-performance', term: 'Perceived Performance Nedir?', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'loading-states', term: 'Loading States Nedir?', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'skeleton-screen', term: 'Skeleton Screen Nedir?', category: 'Performans & Algı', emoji: '⏱️' },
  { id: 'feedback-visual-system', term: 'Feedback (Visual / System Feedback) Nedir?', category: 'Performans & Algı', emoji: '⏱️' },

  // 🔍 Araştırma & Keşif
  { id: 'user-research', term: 'User Research Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'user-interview', term: 'User Interview Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'usability-testing', term: 'Usability Testing Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'personas', term: 'Personas Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'jobs-to-be-done-jtbd', term: 'Jobs To Be Done (JTBD) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'user-journey-map', term: 'User Journey Map Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'exploratory-research', term: 'Keşifsel Araştırma (Exploratory Research) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'generative-research', term: 'Üretici Araştırma (Generative Research) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'evaluative-research', term: 'Değerlendirici Araştırma (Evaluative Research) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'research-operations', term: 'Araştırma Operasyonları (Research Operations / Research Ops) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'insight', term: 'İçgörü (Insight) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'affinity-mapping', term: 'Yakınlık Haritalama (Affinity Mapping) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'synthesis', term: 'Sentez (Synthesis) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'contextual-inquiry', term: 'Bağlamsal Sorgulama (Contextual Inquiry) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'diary-study', term: 'Günlük Çalışması (Diary Study) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },
  { id: 'assumption-mapping', term: 'Varsayım Haritalama (Assumption Mapping) Nedir?', category: 'Araştırma & Keşif', emoji: '🔍' },

  // 🧠 Problem & Strateji
  { id: 'problem-space', term: 'Problem Alanı (Problem Space) Nedir?', category: 'Problem & Strateji', emoji: '🧠' },
  { id: 'solution-space', term: 'Çözüm Alanı (Solution Space) Nedir?', category: 'Problem & Strateji', emoji: '🧠' },
  { id: 'how-might-we', term: 'Nasıl Yapabiliriz? (How Might We) Nedir?', category: 'Problem & Strateji', emoji: '🧠' },
  { id: 'design-hypothesis', term: 'Tasarım Hipotezi (Design Hypothesis) Nedir?', category: 'Problem & Strateji', emoji: '🧠' },
  { id: 'outcome', term: 'Sonuç (Etkisel Sonuç) (Outcome) Nedir?', category: 'Problem & Strateji', emoji: '🧠' },
  { id: 'output', term: 'Çıktı (Output) Nedir?', category: 'Problem & Strateji', emoji: '🧠' },
  { id: 'kuzey-yildizi-metriği', term: 'Kuzey Yıldızı Metriği (North Star Metric) Nedir?', category: 'Problem & Strateji', emoji: '🧠' },
  { id: 'product-vision', term: 'Ürün Vizyonu (Product Vision) Nedir?', category: 'Problem & Strateji', emoji: '🧠' },

  // 🧩 Bilgi Mimarisi & Etkileşim
  { id: 'bilgi-mimarisi', term: 'Bilgi Mimarisi (Information Architecture) Nedir?', category: 'Bilgi Mimarisi & Etkileşim', emoji: '🧩' },
  { id: 'kart-gruplama', term: 'Kart Gruplama (Card Sorting) Nedir?', category: 'Bilgi Mimarisi & Etkileşim', emoji: '🧩' },
  { id: 'agac-testi', term: 'Ağaç Testi (Tree Testing) Nedir?', category: 'Bilgi Mimarisi & Etkileşim', emoji: '🧩' },
  { id: 'etkilesim-maliyeti', term: 'Etkileşim Maliyeti (Interaction Cost) Nedir?', category: 'Bilgi Mimarisi & Etkileşim', emoji: '🧩' },
  { id: 'asamali-bilgi-gosterimi', term: 'Aşamalı Bilgi Gösterimi (Progressive Disclosure) Nedir?', category: 'Bilgi Mimarisi & Etkileşim', emoji: '🧩' },
  { id: 'bos-durum', term: 'Boş Durum (Empty State) Nedir?', category: 'Bilgi Mimarisi & Etkileşim', emoji: '🧩' },
  { id: 'hata-durumu', term: 'Hata Durumu (Error State) Nedir?', category: 'Bilgi Mimarisi & Etkileşim', emoji: '🧩' },
  { id: 'yukleniyor-durumu', term: 'Yükleniyor Durumu (Loading State) Nedir?', category: 'Bilgi Mimarisi & Etkileşim', emoji: '🧩' },

  // 🎯 Kullanılabilirlik & Erişilebilirlik
  { id: 'kullanilabilirlik', term: 'Kullanılabilirlik (Usability) Nedir?', category: 'Kullanılabilirlik & Erişilebilirlik', emoji: '🎯' },
  { id: 'ogrenilebilirlik', term: 'Öğrenilebilirlik (Learnability) Nedir?', category: 'Kullanılabilirlik & Erişilebilirlik', emoji: '🎯' },
  { id: 'erisilebilirlik', term: 'Erişilebilirlik (Accessibility – A11y) Nedir?', category: 'Kullanılabilirlik & Erişilebilirlik', emoji: '🎯' },
  { id: 'wcag', term: 'Web İçeriği Erişilebilirlik Yönergeleri (WCAG) Nedir?', category: 'Kullanılabilirlik & Erişilebilirlik', emoji: '🎯' },
  { id: 'bilissel-yuk', term: 'Bilişsel Yük (Cognitive Load) Nedir?', category: 'Kullanılabilirlik & Erişilebilirlik', emoji: '🎯' },
  { id: 'eylem-imkani', term: 'Eylem İmkanı (Affordance) Nedir?', category: 'Kullanılabilirlik & Erişilebilirlik', emoji: '🎯' },
  { id: 'gosterge-isaretleyici', term: 'Gösterge / İşaretleyici (Signifier) Nedir?', category: 'Kullanılabilirlik & Erişilebilirlik', emoji: '🎯' },

  // 🧩 Product & Karar Alma
  { id: 'problem-statement', term: 'Problem Statement Nedir?', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'hypothesis', term: 'Hypothesis Nedir?', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'mvp-minimum-viable-product', term: 'MVP (Minimum Viable Product) Nedir?', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'product-discovery', term: 'Product Discovery Nedir?', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'success-metrics', term: 'Success Metrics Nedir?', category: 'Product & Karar Alma', emoji: '🧩' },
  { id: 'north-star-metric', term: 'North Star Metric Nedir?', category: 'Product & Karar Alma', emoji: '🧩' },

  // 🧪 Test & Doğrulama
  { id: 'kullanilabilirlik-testi', term: 'Kullanılabilirlik Testi (Usability Testing) Nedir?', category: 'Test & Doğrulama', emoji: '🧪' },
  { id: 'ab-testi', term: 'A/B Testi (A/B Testing) Nedir?', category: 'Test & Doğrulama', emoji: '🧪' },
  { id: 'kiyaslama-testi', term: 'Kıyaslama Testi (Benchmark Testing) Nedir?', category: 'Test & Doğrulama', emoji: '🧪' },
  { id: 'moderatorlu-test', term: 'Moderatörlü Test (Moderated Test) Nedir?', category: 'Test & Doğrulama', emoji: '🧪' },
  { id: 'moderatorsuz-test', term: 'Moderatörsüz Test (Unmoderated Test) Nedir?', category: 'Test & Doğrulama', emoji: '🧪' },
  { id: 'basari-orani', term: 'Başarı Oranı (Success Rate) Nedir?', category: 'Test & Doğrulama', emoji: '🧪' },
  { id: 'gorev-tamamlama-suresi', term: 'Görev Tamamlama Süresi (Time on Task) Nedir?', category: 'Test & Doğrulama', emoji: '🧪' },

  // 🧱 UI & Design System
  { id: 'tasarim-degiskenleri', term: 'Tasarım Değişkenleri (Design Tokens) Nedir?', category: 'UI & Design System', emoji: '🧱' },
  { id: 'bilesen-kutuphanesi', term: 'Bileşen Kütüphanesi (Component Library) Nedir?', category: 'UI & Design System', emoji: '🧱' },
  { id: 'tasarim-deseni', term: 'Tasarım Deseni (Design Pattern) Nedir?', category: 'UI & Design System', emoji: '🧱' },
  { id: 'atomik-tasarim', term: 'Atomik Tasarım (Atomic Design) Nedir?', category: 'UI & Design System', emoji: '🧱' },
  { id: 'tutarlilik', term: 'Tutarlılık (Consistency) Nedir?', category: 'UI & Design System', emoji: '🧱' },

  // 🧱 UI & Pattern Odaklı Kavramlar
  { id: 'design-system', term: 'Design System Nedir?', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'component', term: 'Component Nedir?', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'atomic-design', term: 'Atomic Design Nedir?', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'consistency', term: 'Consistency Nedir?', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'visual-hierarchy', term: 'Visual Hierarchy Nedir?', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },
  { id: 'empty-state', term: 'Empty State Nedir?', category: 'UI & Pattern Odaklı Kavramlar', emoji: '🧱' },

  // ⚠️ Çok Yanlış Anlaşılan ama Çok Önemli
  { id: 'ux-case-study', term: 'UX Case Study Nedir?', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'concept-case', term: 'Concept Case Nedir?', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'edge-case', term: 'Edge Case Nedir?', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'cognitive-load', term: 'Cognitive Load Nedir?', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'affordance', term: 'Affordance Nedir?', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },
  { id: 'error-prevention', term: 'Error Prevention Nedir?', category: 'Çok Yanlış Anlaşılan ama Çok Önemli', emoji: '⚠️' },

  // 🧠 Core UX & Thinking
  { id: 'mental-model', term: 'Mental Model Nedir?', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'heuristic', term: 'Heuristic Nedir?', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'nielsens-heuristics', term: "Nielsen's Heuristics Nedir?", category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'empathy', term: 'Empathy Nedir?', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'cognitive-bias', term: 'Cognitive Bias Nedir?', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'progressive-disclosure', term: 'Progressive Disclosure Nedir?', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'hicks-law', term: "Hick's Law Nedir?", category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'fittss-law', term: "Fitts's Law Nedir?", category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'jakobs-law', term: "Jakob's Law Nedir?", category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'gestalt-principles', term: 'Gestalt Principles Nedir?', category: 'Core UX & Thinking', emoji: '🧠' },
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
  },
  '2-saniye-kurali': {
    shortDefinition: '2 Saniye Kuralı, bir kullanıcının bir sistemin verdiği tepki için en fazla yaklaşık 2 saniye beklemesi gerektiğini ifade eden bir kullanılabilirlik prensibidir.',
    detailedDescription: 'Kullanıcılar bir aksiyon aldıktan sonra sistemden hızlı bir geri dönüş bekler. 2 saniye, teknik olarak kısa görünse de bu süre içinde kullanıcı sistem hakkında bilinçli veya bilinçsiz bir yargı oluşturur.\n\nBu kural, gerçek performanstan çok algılanan performans ile ilgilidir. Sistem arka planda çalışıyor olabilir ancak kullanıcıya bu his geçmiyorsa deneyim zayıflar.\n\n2 saniyeyi aşan beklemelerde kullanıcı sabırsızlanır, aynı aksiyonu tekrarlar ya da sistemi terk edebilir.',
    exampleScenario: 'Bir kullanıcı "Sepete Ekle" butonuna tıkladığında hiçbir geri bildirim almazsa, tıklamanın algılanmadığını düşünebilir ve sayfayı yenileyebilir.',
    whenToUse: [
      'Sayfa ve ekran geçişleri tasarlanırken',
      'Performans algısı değerlendirilirken',
      'Loading ve feedback durumları kurgulanırken'
    ],
    relatedConcepts: ['Response Time', 'Perceived Performance', 'Feedback', 'Loading States']
  },
  'response-time': {
    shortDefinition: 'Response Time, kullanıcının bir aksiyonundan sonra sistemin tepki vermesi için geçen süredir.',
    detailedDescription: 'Response time ne kadar kısaysa, kullanıcı sistemin hızlı ve güvenilir olduğunu düşünür. Uzun response time\'lar, kullanıcıda hata olduğu hissini yaratabilir.\n\nBu süre yalnızca teknik ölçümlerle değil, kullanıcı algısıyla da değerlendirilmelidir.',
    exampleScenario: 'Bir arama yaptıktan sonra sonuçların geç yüklenmesi, kullanıcıyı aramanın başarısız olduğuna inandırabilir.',
    whenToUse: [
      'Performans analizleri yapılırken',
      'Geri bildirim mekanizmaları tasarlanırken'
    ],
    relatedConcepts: ['2 Saniye Kuralı', 'Feedback', 'Perceived Performance']
  },
  'perceived-performance': {
    shortDefinition: 'Perceived Performance, bir sistemin kullanıcı tarafından ne kadar hızlı algılandığını ifade eder.',
    detailedDescription: 'Gerçek performans ile algılanan performans her zaman aynı değildir. Kullanıcı, bekleme sırasında bilgilendiriliyorsa sistemi daha hızlı algılar.\n\nBu nedenle algıyı yöneten tasarım kararları, teknik iyileştirmeler kadar önemlidir.',
    exampleScenario: 'Skeleton ekran gösterilen bir sayfa, tamamen boş kalan bir sayfaya göre daha hızlı algılanır.',
    whenToUse: [
      'Loading deneyimleri tasarlanırken',
      'Performans algısı iyileştirilirken'
    ],
    relatedConcepts: ['Skeleton Screen', 'Loading States', 'Feedback']
  },
  'loading-states': {
    shortDefinition: 'Loading states, sistemin bir işlem yaptığı sırada kullanıcıya gösterdiği geçici durumlardır.',
    detailedDescription: 'Loading state\'ler kullanıcıyı belirsizlikten kurtarır. Kullanıcı, sistemin çalıştığını anlar ve beklemeye daha toleranslı olur.\n\nYanlış veya eksik loading state kullanımı, kullanıcıyı güvensiz hissettirebilir.',
    exampleScenario: 'Bir liste yüklenirken spinner veya skeleton gösterilmemesi, sayfanın donduğu izlenimini verebilir.',
    whenToUse: [
      'Veri yüklenirken',
      'Sayfa geçişlerinde',
      'Uzun süren işlemlerde'
    ],
    relatedConcepts: ['Perceived Performance', 'Skeleton Screen', 'Feedback']
  },
  'skeleton-screen': {
    shortDefinition: 'Skeleton screen, içerik yüklenmeden önce sayfanın iskelet yapısını gösteren bir loading tekniğidir.',
    detailedDescription: 'Skeleton screen, kullanıcının neyin yükleneceğini önceden görmesini sağlar. Bu da bekleme süresinin daha kısa algılanmasına yardımcı olur.\n\nSpinner\'a göre daha bilgilendirici ve yönlendiricidir.',
    exampleScenario: 'Bir haber sitesinde başlık ve içerik alanlarının gri bloklar olarak görünmesi skeleton screen kullanımına örnektir.',
    whenToUse: [
      'İçerik ağırlıklı sayfalarda',
      'Liste ve feed yapılarında'
    ],
    relatedConcepts: ['Loading States', 'Perceived Performance', 'Response Time']
  },
  'feedback-visual-system': {
    shortDefinition: 'Feedback, kullanıcının yaptığı bir aksiyonun sistem tarafından algılandığını gösteren geri bildirimdir.',
    detailedDescription: 'Kullanıcı her aksiyonunun bir sonucu olduğunu görmek ister. Feedback olmadığı durumlarda kullanıcı aynı işlemi tekrar edebilir veya hata yaptığını düşünebilir.\n\nGeri bildirimler görsel, metinsel veya animasyonel olabilir.',
    exampleScenario: 'Bir form gönderildiğinde "Başarıyla kaydedildi" mesajı gösterilmesi feedback\'tir.',
    whenToUse: [
      'Kullanıcı aksiyonlarından sonra',
      'Hata veya başarı durumlarında'
    ],
    relatedConcepts: ['Response Time', 'Error Prevention', 'Microinteractions']
  },
  'user-research': {
    shortDefinition: 'User Research, kullanıcıların ihtiyaçlarını, davranışlarını ve motivasyonlarını anlamak için yapılan araştırma sürecidir.',
    detailedDescription: 'Kullanıcıyı tanımadan yapılan tasarım kararları varsayımlara dayanır. User research, bu varsayımları doğrular veya çürütür.\n\nAraştırma süreci, ürünün yanlış yönde gelişmesini engeller.',
    exampleScenario: 'Kullanıcılarla görüşmeden geliştirilen bir özellik, ihtiyaç olmadığı için kullanılmayabilir.',
    whenToUse: [
      'Ürün keşif aşamasında',
      'Büyük kararlar alınmadan önce'
    ],
    relatedConcepts: ['User Interview', 'Personas', 'Usability Testing']
  },
  'user-interview': {
    shortDefinition: 'User interview, kullanıcılarla birebir yapılan görüşmeler yoluyla içgörü toplama yöntemidir.',
    detailedDescription: 'Bu görüşmeler, kullanıcıların ne yaptığını değil neden yaptığını anlamayı sağlar. Doğru sorular sormak kritik öneme sahiptir.\n\nYanlış sorular, yanlış içgörülere yol açabilir.',
    exampleScenario: 'Kullanıcıya "Bu özelliği neden kullanmıyorsun?" diye sormak, değerli içgörüler ortaya çıkarabilir.',
    whenToUse: [
      'Problemi derinlemesine anlamak için',
      'Varsayımları doğrulamak için'
    ],
    relatedConcepts: ['User Research', 'Qualitative Research', 'Empathy']
  },
  'usability-testing': {
    shortDefinition: 'Usability testing, kullanıcıların bir ürünü kullanırken yaşadığı problemleri gözlemlemeye yönelik testlerdir.',
    detailedDescription: 'Bu testler, tasarımcının değil kullanıcının bakış açısını ortaya koyar. Küçük testler bile büyük problemleri açığa çıkarabilir.\n\nAmaç, kullanıcıyı test etmek değil, ürünü test etmektir.',
    exampleScenario: 'Bir kullanıcının kayıt olurken sürekli yanlış alanları doldurması usability problemine işaret eder.',
    whenToUse: [
      'Tasarım doğrulanırken',
      'Yayın öncesi kontrollerde'
    ],
    relatedConcepts: ['Usability', 'User Testing', 'Feedback']
  },
  'personas': {
    shortDefinition: 'Personas, hedef kullanıcı gruplarını temsil eden kurgusal ama veri temelli karakterlerdir.',
    detailedDescription: 'Personalar, tasarım kararlarını soyut kullanıcı tanımlarından kurtarır. Ekiplerin aynı kullanıcıyı düşünerek karar almasını sağlar.\n\nAncak gerçek veriye dayanmayan personelar yanıltıcı olabilir.',
    exampleScenario: '"Yoğun çalışan, mobil odaklı bir kullanıcı"yı temsil eden persona, tasarım kararlarını netleştirir.',
    whenToUse: [
      'Kullanıcı segmentasyonu yapılırken',
      'Tasarım kararları alınırken'
    ],
    relatedConcepts: ['User Research', 'User Journey Map', 'Empathy']
  },
  'jobs-to-be-done-jtbd': {
    shortDefinition: 'Jobs To Be Done (JTBD), kullanıcıların bir ürünü belirli bir "işi" yapmak için kullandığını savunan bir yaklaşımdır. Odak, kullanıcıdan çok yapılmak istenen iştir.',
    detailedDescription: 'JTBD, "kullanıcı kim?" sorusu yerine "kullanıcı bu ürünü neden kullanıyor?" sorusunu sorar. İnsanlar ürünleri özellikleri için değil, bir problemi çözmek için "işe alır".\n\nBu yaklaşım, yüzeysel ihtiyaçlar yerine temel motivasyonları anlamayı sağlar ve daha anlamlı çözümler üretmeye yardımcı olur.',
    exampleScenario: 'Bir kullanıcı not alma uygulamasını yazı yazmak için değil, "bir şeyi unutmamak" işi için kullanır.',
    whenToUse: [
      'Problem tanımı yapılırken',
      'Yeni özellikler kurgulanırken',
      'Kullanıcı motivasyonları analiz edilirken'
    ],
    relatedConcepts: ['User Research', 'Problem Statement', 'Personas']
  },
  'user-journey-map': {
    shortDefinition: 'User Journey Map, bir kullanıcının bir ürünle etkileşimi boyunca yaşadığı adımların ve deneyimlerin görselleştirilmiş halidir.',
    detailedDescription: 'Journey map\'ler yalnızca adımları değil, kullanıcının o anki duygu durumunu ve yaşadığı problemleri de gösterir.\n\nBu sayede ekipler, kullanıcı deneyiminin nerede koptuğunu veya iyileştirilebileceğini daha net görür.',
    exampleScenario: 'Bir kullanıcı sipariş verirken ödeme adımında yaşadığı problemi journey map üzerinde net şekilde gösterebilirsiniz.',
    whenToUse: [
      'Uçtan uca deneyim analiz edilirken',
      'Servis veya ürün iyileştirmeleri planlanırken'
    ],
    relatedConcepts: ['User Flow', 'Personas', 'Touchpoints']
  },
  'problem-statement': {
    shortDefinition: 'Problem Statement, çözülmesi gereken problemi net ve odaklı bir şekilde tanımlayan ifadedir.',
    detailedDescription: 'İyi bir problem tanımı, çözümü yönlendirir. Belirsiz veya yanlış tanımlanmış problemler, yanlış çözümlere yol açar.\n\nProblem statement genellikle kullanıcı, bağlam ve yaşanan zorlukları içerir.',
    exampleScenario: '"Kullanıcılar ödeme yapamıyor" yerine "Mobil kullanıcılar ödeme adımında güven problemi yaşıyor" demek daha net bir problem tanımıdır.',
    whenToUse: [
      'Discovery sürecinde',
      'Çözüm üretmeye başlamadan önce'
    ],
    relatedConcepts: ['User Research', 'JTBD', 'Hypothesis']
  },
  'hypothesis': {
    shortDefinition: 'Hypothesis, belirli bir değişikliğin nasıl bir etki yaratacağına dair test edilebilir varsayımdır.',
    detailedDescription: 'Hipotezler, rastgele kararlar almak yerine öğrenmeye dayalı ilerlemeyi sağlar. Yanlış çıkan hipotezler de öğrenme sağlar.\n\nİyi bir hipotez, neyin değiştirileceğini ve neyin ölçüleceğini açıkça belirtir.',
    exampleScenario: '"Ödeme adımına güven rozetleri eklersek tamamlanma oranı artar" bir hipotezdir.',
    whenToUse: [
      'Deney planlanırken',
      'A/B testleri yapılırken'
    ],
    relatedConcepts: ['Experiment', 'Success Metrics', 'MVP']
  },
  'mvp-minimum-viable-product': {
    shortDefinition: 'MVP, bir ürünün temel değerini test etmek için geliştirilen en basit çalışan versiyonudur.',
    detailedDescription: 'MVP, eksik bir ürün değil, öğrenme amacıyla tasarlanmış bir üründür. Amaç, en az eforla en fazla içgörüyü elde etmektir.\n\nYanlış anlaşıldığında "kalitesiz ürün" olarak algılanabilir, ancak doğru kurgulandığında büyük riskleri azaltır.',
    exampleScenario: 'Yeni bir özelliği tüm detaylarıyla geliştirmek yerine, temel bir versiyonunu sınırlı kullanıcıya sunmak MVP yaklaşımıdır.',
    whenToUse: [
      'Yeni ürün veya özellik geliştirirken',
      'Varsayımlar test edilirken'
    ],
    relatedConcepts: ['Hypothesis', 'Product Discovery', 'Experiment']
  },
  'product-discovery': {
    shortDefinition: 'Product Discovery, doğru problemi ve doğru çözümü bulmaya yönelik yapılan keşif sürecidir.',
    detailedDescription: 'Discovery süreci, "ne geliştirelim?" sorusuna cevap arar. Kullanıcı ihtiyaçları, iş hedefleri ve teknik kısıtlar bu aşamada değerlendirilir.\n\nDiscovery yapılmadan geliştirilen ürünler, çoğu zaman yanlış problemlere çözüm üretir.',
    exampleScenario: 'Kullanıcıların gerçekten hangi özelliğe ihtiyaç duyduğunu anlamadan geliştirilen fonksiyonlar kullanılmayabilir.',
    whenToUse: [
      'Ürün yol haritası oluşturulurken',
      'Yeni fikirler değerlendirilirken'
    ],
    relatedConcepts: ['User Research', 'Problem Statement', 'MVP']
  },
  'success-metrics': {
    shortDefinition: 'Success Metrics, bir ürün veya özelliğin başarılı olup olmadığını ölçmek için kullanılan metriklerdir.',
    detailedDescription: 'Bu metrikler, "iyi hissettirdi mi?" yerine "işe yaradı mı?" sorusuna cevap verir. Doğru metrikler, doğru kararlar almayı sağlar.\n\nYanlış metrikler ise ekibi yanlış yönde optimize edebilir.',
    exampleScenario: 'Bir onboarding sürecinin başarısı, tamamlanma oranı ile ölçülebilir.',
    whenToUse: [
      'Deney sonuçları değerlendirilirken',
      'Ürün performansı izlenirken'
    ],
    relatedConcepts: ['North Star Metric', 'KPI', 'Experiment']
  },
  'north-star-metric': {
    shortDefinition: 'North Star Metric, bir ürünün uzun vadeli değerini en iyi temsil eden ana metriktir.',
    detailedDescription: 'Bu metrik, ekiplerin aynı hedefe odaklanmasını sağlar. Her metrik North Star değildir; kullanıcıya sağlanan değeri yansıtması gerekir.\n\nYanlış seçilmiş bir North Star, ürünü yanlış yönde büyütebilir.',
    exampleScenario: 'Bir içerik platformu için "haftalık aktif okuyucu sayısı" bir North Star Metric olabilir.',
    whenToUse: [
      'Ürün stratejisi belirlenirken',
      'Ekip hedefleri hizalanırken'
    ],
    relatedConcepts: ['Success Metrics', 'KPI', 'Product Strategy']
  },
  'design-system': {
    shortDefinition: 'Design System, bir ürünün tasarım ve geliştirme süreçlerinde tutarlılık sağlamak için oluşturulan bileşen, kural ve prensipler bütünüdür.',
    detailedDescription: 'Design system yalnızca UI bileşenlerinden ibaret değildir; renkler, tipografi, davranış kuralları ve kullanım rehberlerini de kapsar.\n\nİyi bir design system, ekiplerin daha hızlı ve tutarlı çalışmasını sağlar.',
    exampleScenario: 'Farklı ekiplerin aynı butonu farklı şekillerde tasarlaması, design system eksikliğine işaret eder.',
    whenToUse: [
      'Büyük ürünlerde',
      'Birden fazla ekip çalışıyorsa'
    ],
    relatedConcepts: ['Component', 'Consistency', 'Atomic Design']
  },
  'component': {
    shortDefinition: 'Component, bir arayüzde tekrar eden ve farklı yerlerde kullanılabilen bağımsız UI parçasıdır.',
    detailedDescription: 'Component\'ler, tasarım ve geliştirme sürecini ölçeklenebilir hale getirir. Değişiklikler tek noktadan yönetilebilir.\n\nYanlış kurgulanan component\'ler ise esnekliği azaltabilir.',
    exampleScenario: 'Bir buton component\'i, farklı ekranlarda aynı davranışı sergiler.',
    whenToUse: [
      'Design system oluşturulurken',
      'Tekrar eden UI elemanları tasarlanırken'
    ],
    relatedConcepts: ['Design System', 'Atomic Design', 'Consistency']
  },
  'atomic-design': {
    shortDefinition: 'Atomic Design, arayüzleri küçük parçalardan başlayarak daha büyük ve anlamlı yapılara dönüştüren bir tasarım metodolojisidir.',
    detailedDescription: 'Bu yaklaşım, UI\'ı atom, molekül, organizma gibi katmanlara ayırır. Amaç sadece isimlendirme değil, sistematik düşünmeyi sağlamaktır.\n\nYanlış anlaşıldığında fazla teorik kalabilir; doğru uygulandığında ise design system\'lerin temelini oluşturur.',
    exampleScenario: 'Bir buton atomdur, buton + ikon bir molekül olabilir, bu yapıların birleşmesiyle daha karmaşık arayüzler oluşur.',
    whenToUse: [
      'Design system kurulurken',
      'Bileşenler ölçeklenirken'
    ],
    relatedConcepts: ['Design System', 'Component', 'Consistency']
  },
  'consistency': {
    shortDefinition: 'Consistency, bir ürünün tüm ekranlarında ve etkileşimlerinde tutarlı davranmasıdır.',
    detailedDescription: 'Tutarlılık, kullanıcıların ürünü öğrenme süresini kısaltır. Kullanıcı bir yerde öğrendiği davranışı başka bir yerde de geçerli varsayar.\n\nTutarsız tasarımlar kullanıcıyı düşündürür ve hata yapmasına neden olur.',
    exampleScenario: 'Bir ekranda mavi olan "Devam" butonunun başka bir ekranda gri olması kafa karışıklığı yaratır.',
    whenToUse: [
      'UI kararları alınırken',
      'Design system uygulanırken'
    ],
    relatedConcepts: ['Design System', 'Visual Hierarchy', 'Usability']
  },
  'visual-hierarchy': {
    shortDefinition: 'Visual Hierarchy, ekrandaki öğelerin önem sırasına göre algılanmasını sağlayan görsel düzenlemedir.',
    detailedDescription: 'Boyut, renk, kontrast ve boşluk gibi öğeler kullanılarak kullanıcının dikkati yönlendirilir.\n\nİyi bir görsel hiyerarşi, kullanıcıya "önce nereye bakması gerektiğini" söyler.',
    exampleScenario: 'Başlığın büyük, açıklamanın daha küçük yazılması görsel hiyerarşinin bir sonucudur.',
    whenToUse: [
      'Ekran tasarımları yapılırken',
      'Bilgi önceliklendirilirken'
    ],
    relatedConcepts: ['UI Design', 'Consistency', 'Accessibility']
  },
  'empty-state': {
    shortDefinition: 'Empty state, bir ekranda henüz içerik olmadığında kullanıcıya gösterilen durumdur.',
    detailedDescription: 'Empty state\'ler sadece "boş" ekranlar değildir; kullanıcıyı yönlendiren fırsatlardır.\n\nİyi bir empty state, kullanıcıya ne yapması gerektiğini net bir şekilde anlatır.',
    exampleScenario: 'Yeni kayıt olan bir kullanıcının boş dashboard yerine yönlendirici bir mesaj görmesi empty state örneğidir.',
    whenToUse: [
      'İlk kullanımda',
      'Veri olmadığında'
    ],
    relatedConcepts: ['Onboarding', 'Feedback', 'UX Writing']
  },
  'ux-case-study': {
    shortDefinition: 'UX Case Study, bir problemin nasıl ele alındığını ve hangi süreçlerle çözüldüğünü anlatan tasarım hikâyesidir.',
    detailedDescription: 'UX case\'ler sonuçtan çok sürece odaklanır. Ekran sayısından ziyade kararların gerekçeleri önemlidir.\n\nİyi bir UX case, düşünce biçimini net bir şekilde aktarır.',
    exampleScenario: 'Bir onboarding probleminin nasıl keşfedildiğini ve çözüldüğünü anlatan çalışma bir UX case\'tir.',
    whenToUse: [
      'Portfolyo hazırlanırken',
      'Tasarım süreci anlatılırken'
    ],
    relatedConcepts: ['Concept Case', 'Problem Statement', 'User Research']
  },
  'concept-case': {
    shortDefinition: 'Concept case, gerçek bir ürün yerine varsayımsal bir problem üzerinden oluşturulan UX çalışmasıdır.',
    detailedDescription: 'Concept case\'ler, özellikle junior tasarımcılar için düşünme becerisini göstermek adına değerlidir.\n\nAncak gerçek ürünmüş gibi anlatılması yanıltıcı olabilir.',
    exampleScenario: 'Varsayımsal bir sağlık uygulaması için hazırlanan UX çalışması concept case\'tir.',
    whenToUse: [
      'Gerçek ürün erişimi yoksa',
      'Düşünme süreci göstermek istendiğinde'
    ],
    relatedConcepts: ['UX Case Study', 'Problem Statement', 'Case Atölyesi']
  },
  'edge-case': {
    shortDefinition: 'Edge case, çoğu kullanıcı için nadir gerçekleşen ama gerçekleştiğinde önemli etkiler yaratan durumlardır.',
    detailedDescription: 'Edge case\'ler genellikle göz ardı edilir ancak kötü deneyimlere yol açabilir.\n\nİyi bir tasarım, ana senaryolar kadar edge case\'leri de hesaba katar.',
    exampleScenario: 'İnternet bağlantısı kesildiğinde formun nasıl davranacağı bir edge case\'tir.',
    whenToUse: [
      'Akışlar detaylandırılırken',
      'Hata senaryoları düşünülürken'
    ],
    relatedConcepts: ['Error Prevention', 'Feedback', 'User Flow']
  },
  'cognitive-load': {
    shortDefinition: 'Cognitive load, kullanıcının bir görevi yerine getirirken harcadığı zihinsel efor miktarıdır.',
    detailedDescription: 'Yüksek bilişsel yük, kullanıcıyı yorar ve hata yapma olasılığını artırır.\n\nİyi UX, kullanıcıdan mümkün olan en az zihinsel eforu talep eder.',
    exampleScenario: 'Aynı ekranda çok fazla seçenek sunulması cognitive load\'u artırır.',
    whenToUse: [
      'Form ve akış tasarlanırken',
      'Bilgi yoğun ekranlarda'
    ],
    relatedConcepts: ['Usability', 'Visual Hierarchy', 'Progressive Disclosure']
  },
  'affordance': {
    shortDefinition: 'Affordance, bir nesnenin nasıl kullanılacağını kullanıcıya sezgisel olarak anlatma yeteneğidir.',
    detailedDescription: 'Bir öğenin tıklanabilir mi, sürüklenebilir mi olduğu görünümünden anlaşılmalıdır.\n\nGizli affordance\'lar kullanıcıyı deneme-yanılmaya iter.',
    exampleScenario: 'Buton gibi görünen bir alanın tıklanamaması affordance problemidir.',
    whenToUse: [
      'Etkileşimler tasarlanırken',
      'UI elemanları değerlendirilirken'
    ],
    relatedConcepts: ['Signifiers', 'Interaction Design', 'Feedback']
  },
  'error-prevention': {
    shortDefinition: 'Error prevention, kullanıcıların hata yapmasını en baştan engellemeye yönelik tasarım yaklaşımıdır.',
    detailedDescription: 'Hataları sonradan düzeltmek yerine, hataya giden yolları kapatmak daha iyi bir deneyim sunar.\n\nBu yaklaşım, kullanıcıyı uyarmaktan çok yönlendirmeyi hedefler.',
    exampleScenario: 'Yanlış formatta e-posta girildiğinde anında uyarı verilmesi error prevention örneğidir.',
    whenToUse: [
      'Form tasarımlarında',
      'Kritik aksiyonlar öncesinde'
    ],
    relatedConcepts: ['Validation', 'Feedback', 'Edge Case']
  },
  'mental-model': {
    shortDefinition: 'Mental model, kullanıcıların bir sistemin nasıl çalıştığına dair kafalarında oluşturdukları içsel düşünce yapısıdır.',
    detailedDescription: 'Kullanıcılar bir ürünü ilk kez kullanırken sıfırdan öğrenmez; daha önce gördükleri sistemlere dayanarak beklentiler oluşturur. Bu beklentiler mental model\'leri oluşturur.\n\nEğer tasarlanan sistem, kullanıcının mental modeliyle uyuşmuyorsa kullanıcı zorlanır, hata yapar veya sistemi "karmaşık" olarak etiketler.\n\nİyi UX, kullanıcıyı eğitmeye çalışmaz; mevcut mental model\'lere uyum sağlar veya onları yavaşça dönüştürür.',
    exampleScenario: 'Kullanıcı bir çöp kutusu ikonuna tıkladığında silme işlemi bekler. Farklı bir aksiyon gerçekleşirse mental model kırılır.',
    whenToUse: [
      'Yeni bir akış tasarlanırken',
      'Alışılmış davranışlar değiştirilirken',
      'Kullanıcı hatalarının nedeni analiz edilirken'
    ],
    relatedConcepts: ['Affordance', "Jakob's Law", 'Usability']
  },
  'heuristic': {
    shortDefinition: 'Heuristic, kullanıcı deneyimini değerlendirmek için kullanılan genel kural ve prensiplerdir.',
    detailedDescription: 'Heuristic\'ler kesin doğrular değildir; hızlı değerlendirme yapmak için kullanılan rehberlerdir.\n\nBir arayüzün "neden iyi" ya da "neden problemli" olduğunu anlamak için kullanılır.\n\nTasarım kararlarını doğrulamak veya problem alanlarını hızlıca tespit etmek için oldukça etkilidir.',
    exampleScenario: 'Bir ekranda kullanıcıya sistem durumu hakkında bilgi verilmemesi, temel bir heuristic ihlalidir.',
    whenToUse: [
      'Hızlı UX değerlendirmeleri yapılırken',
      'Usability testleri öncesinde'
    ],
    relatedConcepts: ["Nielsen's Heuristics", 'Usability', 'UX Review']
  },
  'nielsens-heuristics': {
    shortDefinition: "Nielsen's Heuristics, Jakob Nielsen tarafından tanımlanan ve UX değerlendirmelerinde sık kullanılan 10 temel kullanılabilirlik prensibidir.",
    detailedDescription: 'Bu heuristikler, kullanıcı arayüzlerinde en sık karşılaşılan problemleri tespit etmeye yardımcı olur.\n\nAmaç kusursuz tasarım yapmak değil, büyük problemleri erken aşamada fark etmektir.\n\nTek başına yeterli değildir; kullanıcı testleriyle desteklenmelidir.',
    exampleScenario: "Hata mesajlarının ne yapılacağını söylememesi, Nielsen heuristiklerine aykırıdır.",
    whenToUse: [
      'UX audit yapılırken',
      'Mevcut ürünler değerlendirilirken'
    ],
    relatedConcepts: ['Heuristic', 'Error Prevention', 'Usability']
  },
  'empathy': {
    shortDefinition: 'Empathy, kullanıcının duygularını, ihtiyaçlarını ve motivasyonlarını gerçekten anlamaya çalışmaktır.',
    detailedDescription: 'Empati, "kullanıcı ne yapıyor?"dan çok "neden böyle hissediyor?" sorusuna odaklanır.\n\nEmpati kurmadan yapılan tasarım kararları genellikle yüzeysel kalır.\n\nUX\'in temelinde insanı anlamak vardır; empati bu anlayışın başlangıç noktasıdır.',
    exampleScenario: 'Finansal bir hata yaşayan kullanıcının stresini hesaba katmadan tasarlanan ekranlar güvensizlik yaratır.',
    whenToUse: [
      'User research yapılırken',
      'Hassas akışlar tasarlanırken'
    ],
    relatedConcepts: ['Human-Centered Design', 'User Research', 'Personas']
  },
  'cognitive-bias': {
    shortDefinition: 'Cognitive bias, insanların karar verirken farkında olmadan yaptığı zihinsel eğilimlerdir.',
    detailedDescription: 'Kullanıcılar her zaman rasyonel kararlar almaz. Alışkanlıklar, korkular ve geçmiş deneyimler kararları etkiler.\n\nBu bias\'ları anlamak, daha gerçekçi ve etkili deneyimler tasarlamayı sağlar.',
    exampleScenario: 'Varsayılan olarak seçili gelen bir seçeneğin çoğu kullanıcı tarafından değiştirilmemesi bir cognitive bias örneğidir.',
    whenToUse: [
      'Karar noktaları tasarlanırken',
      'Form ve seçim alanları oluşturulurken'
    ],
    relatedConcepts: ['Default Bias', 'Decision Making', 'Behavioral Design']
  },
  'progressive-disclosure': {
    shortDefinition: 'Progressive disclosure, bilgiyi kullanıcıya ihtiyaç duyduğu anda ve parça parça sunma yaklaşımıdır.',
    detailedDescription: 'Tüm bilgiyi tek ekranda göstermek kullanıcıyı bunaltır. Progressive disclosure, karmaşıklığı yönetilebilir hale getirir.\n\nBu yaklaşım, bilişsel yükü azaltır ve kullanıcıyı daha rahat ilerletir.',
    exampleScenario: 'Gelişmiş ayarların varsayılan olarak gizli olması progressive disclosure\'dır.',
    whenToUse: [
      'Karmaşık akışlar tasarlanırken',
      'Ayar ve konfigürasyon ekranlarında'
    ],
    relatedConcepts: ['Cognitive Load', 'Visual Hierarchy', 'UX Writing']
  },
  'hicks-law': {
    shortDefinition: "Hick's Law, kullanıcıya sunulan seçenek sayısı arttıkça karar verme süresinin de arttığını söyler.",
    detailedDescription: 'Çok fazla seçenek, kullanıcıyı özgürleştirmek yerine kararsız bırakabilir.\n\nBu nedenle sadeleştirme ve önceliklendirme, iyi UX\'in temelidir.',
    exampleScenario: 'Bir ana ekranda aynı anda 10 aksiyon sunmak, kullanıcıyı hangi yolu seçeceği konusunda zorlar.',
    whenToUse: [
      'Menü ve navigasyon tasarlanırken',
      'Kritik karar noktalarında'
    ],
    relatedConcepts: ['Cognitive Load', 'Decision Making', 'Visual Hierarchy']
  },
  'fittss-law': {
    shortDefinition: "Fitts's Law, bir hedefin boyutu ve uzaklığı arttıkça ona ulaşmanın daha kolay olduğunu ifade eden bir prensiptir.",
    detailedDescription: 'Kullanıcılar büyük ve yakın hedeflere daha hızlı ve hatasız ulaşır.\n\nBu nedenle sık kullanılan aksiyonlar daha büyük ve erişilebilir konumlarda olmalıdır.',
    exampleScenario: "Mobil uygulamalarda ana aksiyonun başparmağın kolayca ulaşabileceği yerde olması Fitts's Law ile ilgilidir.",
    whenToUse: [
      'Buton boyutları belirlenirken',
      'Mobil etkileşimler tasarlanırken'
    ],
    relatedConcepts: ['Interaction Design', 'Accessibility', 'Touch Targets']
  },
  'jakobs-law': {
    shortDefinition: "Jakob's Law, kullanıcıların çoğu zaman başka ürünlerde öğrendikleri deneyimleri yeni ürünlere taşıdığını söyler.",
    detailedDescription: 'Kullanıcılar her ürünü sıfırdan öğrenmek istemez. Alışılmış kalıplar bozulduğunda deneyim zorlaşır.\n\nBu yüzden farklı olmak her zaman daha iyi değildir.',
    exampleScenario: "Sağa bakan ok ikonunun \"ilerle\" anlamına gelmesi Jakob's Law'a dayanır.",
    whenToUse: [
      'Alışılmış pattern\'ler değiştirilirken',
      'Yeni etkileşimler tasarlanırken'
    ],
    relatedConcepts: ['Mental Model', 'Consistency', 'Usability']
  },
  'gestalt-principles': {
    shortDefinition: 'Gestalt prensipleri, insanların görsel öğeleri nasıl algıladığını açıklayan psikolojik ilkelerdir.',
    detailedDescription: 'Yakınlık, benzerlik ve devamlılık gibi prensipler, kullanıcıların bilgiyi nasıl gruplayacağını belirler.\n\nBu prensipler doğru kullanıldığında arayüz daha anlaşılır hale gelir.',
    exampleScenario: 'Birbirine yakın duran butonların aynı gruba ait algılanması Gestalt prensiplerindendir.',
    whenToUse: [
      'Layout ve grid tasarlanırken',
      'Bilgi gruplandırılırken'
    ],
    relatedConcepts: ['Visual Hierarchy', 'UI Design', 'Cognitive Load']
  },
  'exploratory-research': {
    shortDefinition: 'Keşifsel Araştırma, henüz net olmayan problem alanlarını anlamak ve yeni fırsatları keşfetmek için yapılan araştırma türüdür.',
    detailedDescription: 'Bu araştırma türü, "ne bilmiyoruz?" sorusuna cevap arar. Problem tanımı net değilken, kullanıcı ihtiyaçları belirsizken veya yeni bir alan keşfedilirken kullanılır.\n\nKeşifsel araştırma, hipotez oluşturmaktan çok soru oluşturmayı hedefler. Açık uçlu sorular ve derinlemesine görüşmeler bu araştırmanın temelidir.\n\nBu araştırma sonunda net çözümler değil, daha iyi anlaşılmış problem alanları ve araştırma soruları elde edilir.',
    exampleScenario: 'Yeni bir sağlık uygulaması geliştirmeye başlarken, kullanıcıların sağlık yönetimi konusunda hangi zorlukları yaşadığını anlamak için keşifsel araştırma yapılır.',
    whenToUse: [
      'Problem alanı belirsizken',
      'Yeni bir ürün veya özellik düşünülürken',
      'Kullanıcı ihtiyaçları hakkında çok az bilgi varken'
    ],
    relatedConcepts: ['User Research', 'User Interview', 'Generative Research', 'Problem Statement']
  },
  'generative-research': {
    shortDefinition: 'Üretici Araştırma, yeni fikirler ve çözümler üretmek için kullanıcıların ihtiyaçlarını, motivasyonlarını ve davranışlarını anlamaya yönelik araştırma türüdür.',
    detailedDescription: 'Generative research, "ne yapmalıyız?" sorusuna cevap arar. Kullanıcıların gerçek ihtiyaçlarını ortaya çıkararak, henüz var olmayan çözümler için fırsatlar yaratır.\n\nBu araştırma türü, kullanıcıların söylediklerinden çok yaptıklarına ve neden yaptıklarına odaklanır. Gözlem ve derinlemesine görüşmeler kritik öneme sahiptir.\n\nÜretici araştırma, tasarım sürecinin başında yapılır ve tasarım kararlarını yönlendirir. Mevcut bir ürünü değerlendirmek için değil, yeni bir şey yaratmak için kullanılır.',
    exampleScenario: 'Bir e-ticaret platformu için yeni bir özellik geliştirmeden önce, kullanıcıların alışveriş sürecinde hangi problemleri yaşadığını anlamak için üretici araştırma yapılır.',
    whenToUse: [
      'Yeni ürün veya özellik geliştirilirken',
      'Kullanıcı ihtiyaçları keşfedilirken',
      'Tasarım sürecinin başında'
    ],
    relatedConcepts: ['User Research', 'Exploratory Research', 'User Interview', 'Contextual Inquiry']
  },
  'evaluative-research': {
    shortDefinition: 'Değerlendirici Araştırma, mevcut bir ürün, prototip veya tasarımın kullanılabilirliğini ve etkinliğini değerlendirmek için yapılan araştırma türüdür.',
    detailedDescription: 'Bu araştırma türü, "çalışıyor mu?" sorusuna cevap arar. Tasarım kararlarının doğruluğunu test eder ve iyileştirme alanlarını ortaya çıkarır.\n\nDeğerlendirici araştırma, genellikle bir çözüm oluşturulduktan sonra yapılır. Usability testing, A/B testing ve kullanıcı geri bildirimleri bu kapsamda değerlendirilir.\n\nBu araştırma, tasarım sürecinin her aşamasında yapılabilir: erken prototiplerden canlı ürünlere kadar. Amaç, problemleri erken tespit etmek ve çözümleri iyileştirmektir.',
    exampleScenario: 'Yeni tasarlanan bir onboarding akışının kullanıcılar tarafından anlaşılıp anlaşılmadığını test etmek için değerlendirici araştırma yapılır.',
    whenToUse: [
      'Tasarım veya prototip test edilirken',
      'Mevcut ürün iyileştirilirken',
      'Tasarım kararlarının doğruluğu kontrol edilirken'
    ],
    relatedConcepts: ['Usability Testing', 'User Testing', 'A/B Testing', 'Feedback']
  },
  'research-operations': {
    shortDefinition: 'Araştırma Operasyonları (Research Ops), kullanıcı araştırmasının etkin ve ölçeklenebilir şekilde yürütülmesi için gerekli süreçler, araçlar ve altyapıyı yöneten disiplindir.',
    detailedDescription: 'Research Ops, araştırmacıların araştırma yapmaya odaklanabilmesi için operasyonel işleri optimize eder. Katılımcı bulma, veri yönetimi, araç seçimi ve araştırma sonuçlarının paylaşımı gibi konuları kapsar.\n\nİyi bir Research Ops yapısı, araştırma sürecini hızlandırır, kaliteyi artırır ve araştırma bulgularının organizasyonda daha geniş kullanımını sağlar.\n\nBu disiplin, özellikle büyük organizasyonlarda ve birden fazla araştırmacının çalıştığı ekiplerde kritik öneme sahiptir.',
    exampleScenario: 'Bir şirkette tüm araştırmacıların aynı katılımcı havuzunu kullanması, araştırma sonuçlarının merkezi bir platformda saklanması ve araştırma şablonlarının standartlaştırılması Research Ops kapsamındadır.',
    whenToUse: [
      'Araştırma süreçleri ölçeklendirilirken',
      'Birden fazla araştırmacı çalışırken',
      'Araştırma verimliliği artırılmak istendiğinde'
    ],
    relatedConcepts: ['User Research', 'Research Process', 'Data Management', 'Research Tools']
  },
  'insight': {
    shortDefinition: 'İçgörü, kullanıcı araştırmasından elde edilen ve tasarım kararlarını yönlendiren derin anlayış ve farkındalıktır.',
    detailedDescription: 'İçgörü, sadece bir gözlem veya veri değildir. Kullanıcıların davranışlarının, ihtiyaçlarının ve motivasyonlarının altında yatan nedenleri açıklayan, eyleme dönüştürülebilir anlayıştır.\n\nİyi bir içgörü, "kullanıcılar bunu yapıyor" demek yerine "kullanıcılar bunu şu sebepten dolayı yapıyor ve bu bize şunu gösteriyor" der.\n\nİçgörüler, araştırma verilerinin sentezlenmesi ve analiz edilmesiyle ortaya çıkar. Tek bir veri noktasından değil, birden fazla kaynaktan gelen bilgilerin birleştirilmesiyle oluşur.',
    exampleScenario: 'Kullanıcı görüşmelerinde birçok kişinin "zaman kazanmak" istediğini söylemesi bir gözlemdir. Ancak "kullanıcılar zaman kazanmak istiyor çünkü tekrarlayan görevlerden bunaldılar ve otomasyon arıyorlar" bir içgörüdür.',
    whenToUse: [
      'Tasarım kararları alınırken',
      'Problem tanımları yapılırken',
      'Ürün stratejisi oluşturulurken'
    ],
    relatedConcepts: ['User Research', 'Synthesis', 'Affinity Mapping', 'Problem Statement']
  },
  'affinity-mapping': {
    shortDefinition: 'Yakınlık Haritalama, araştırma verilerini benzerliklerine göre gruplandırarak kalıpları ve temaları ortaya çıkaran bir sentez yöntemidir.',
    detailedDescription: 'Bu yöntem, çok sayıda araştırma verisini (notlar, gözlemler, geri bildirimler) fiziksel veya dijital olarak gruplandırarak organize eder. Benzer içerikler bir araya getirilir ve her grup bir tema veya kalıp temsil eder.\n\nAffinity mapping, ekip çalışması için idealdir. Herkesin verileri birlikte gruplandırması, ortak bir anlayış oluşturur ve farklı bakış açılarını birleştirir.\n\nBu yöntem, karmaşık araştırma verilerini anlaşılır hale getirir ve içgörülerin ortaya çıkmasını sağlar.',
    exampleScenario: '20 kullanıcı görüşmesinden çıkan notlar, post-it\'lere yazılıp duvara yapıştırılır. Benzer gözlemler bir araya getirilir ve her grup için bir başlık oluşturulur. Bu sayede "ödeme süreci" ve "ürün arama" gibi temalar ortaya çıkar.',
    whenToUse: [
      'Çok sayıda araştırma verisi analiz edilirken',
      'Ekip olarak veri sentezi yapılırken',
      'Kalıplar ve temalar keşfedilirken'
    ],
    relatedConcepts: ['Synthesis', 'User Research', 'Insight', 'Data Analysis']
  },
  'synthesis': {
    shortDefinition: 'Sentez, araştırma verilerini analiz ederek anlamlı kalıplar, temalar ve içgörüler ortaya çıkarma sürecidir.',
    detailedDescription: 'Sentez, ham veriyi anlamlı bilgiye dönüştürür. Araştırmadan toplanan notlar, gözlemler ve geri bildirimler, organize edilir, gruplandırılır ve yorumlanır.\n\nBu süreç, tek tek veri noktalarından çok, bunların bir araya gelmesiyle oluşan büyük resmi görmeyi sağlar. Sentez olmadan araştırma verileri sadece bir bilgi yığınıdır.\n\nİyi bir sentez, tasarım kararlarını yönlendirebilecek net içgörüler ve öneriler üretir.',
    exampleScenario: '10 kullanıcı görüşmesinden çıkan notlar, affinity mapping ile gruplandırılır, her grup için temalar belirlenir ve bu temalardan tasarım önerileri çıkarılır. Bu tüm süreç sentezdir.',
    whenToUse: [
      'Araştırma verileri toplandıktan sonra',
      'İçgörüler ortaya çıkarılırken',
      'Tasarım kararları alınmadan önce'
    ],
    relatedConcepts: ['User Research', 'Affinity Mapping', 'Insight', 'Data Analysis']
  },
  'contextual-inquiry': {
    shortDefinition: 'Bağlamsal Sorgulama, kullanıcıların kendi doğal ortamlarında gözlemlenmesi ve aynı anda görüşme yapılması yöntemiyle gerçek kullanım bağlamını anlamaya yönelik bir araştırma yöntemidir.',
    detailedDescription: 'Bu yöntem, kullanıcıların laboratuvar ortamında değil, gerçek çalışma veya yaşam alanlarında gözlemlenmesini sağlar. Araştırmacı, kullanıcının gerçek bağlamında nasıl davrandığını görür ve aynı anda sorular sorarak davranışların nedenlerini anlar.\n\nBağlamsal sorgulama, kullanıcıların söyledikleri ile yaptıkları arasındaki farkı ortaya çıkarır. Gerçek problemler ve kullanım senaryoları bu yöntemle daha net görülür.\n\nBu yöntem özellikle karmaşık sistemler ve iş süreçleri için değerlidir çünkü bağlam, kullanıcı davranışını büyük ölçüde etkiler.',
    exampleScenario: 'Bir sağlık uygulaması tasarlarken, araştırmacı bir doktorun ofisinde, gerçek hasta randevuları sırasında doktoru gözlemler ve aynı anda "bu bilgiyi neden burada arıyorsunuz?" gibi sorular sorar.',
    whenToUse: [
      'Gerçek kullanım bağlamını anlamak istendiğinde',
      'Karmaşık iş süreçleri araştırılırken',
      'Kullanıcıların söyledikleri ile yaptıkları arasındaki farkı görmek için'
    ],
    relatedConcepts: ['User Research', 'User Interview', 'Ethnographic Research', 'Field Study']
  },
  'diary-study': {
    shortDefinition: 'Günlük Çalışması, kullanıcıların belirli bir süre boyunca deneyimlerini, davranışlarını ve düşüncelerini günlük formatında kaydetmesini sağlayan uzun vadeli bir araştırma yöntemidir.',
    detailedDescription: 'Bu yöntem, kullanıcıların zaman içindeki deneyimlerini ve davranış değişikliklerini anlamak için kullanılır. Katılımcılar, belirli bir süre boyunca (genellikle birkaç gün veya hafta) günlük tutar veya düzenli olarak geri bildirim verir.\n\nGünlük çalışması, anlık davranışları ve uzun vadeli trendleri yakalamak için idealdir. Kullanıcıların kendi ortamlarında, kendi zamanlarında veri toplamasını sağlar.\n\nBu yöntem özellikle zaman içinde değişen ihtiyaçları, alışkanlıkları ve kullanım kalıplarını anlamak için değerlidir.',
    exampleScenario: 'Bir fitness uygulaması için, kullanıcılardan 2 hafta boyunca her gün egzersiz yapma motivasyonlarını, engellerini ve deneyimlerini kaydetmeleri istenir. Bu veriler, uygulamanın nasıl kullanıldığını ve hangi anlarda destek gerektiğini gösterir.',
    whenToUse: [
      'Zaman içindeki davranış değişikliklerini anlamak için',
      'Uzun vadeli kullanım kalıplarını görmek için',
      'Kullanıcıların kendi ortamlarında veri toplamak için'
    ],
    relatedConcepts: ['User Research', 'Longitudinal Study', 'User Behavior', 'Qualitative Research']
  },
  'assumption-mapping': {
    shortDefinition: 'Varsayım Haritalama, ekibin bir ürün veya özellik hakkındaki varsayımlarını görselleştirerek, hangilerinin test edilmesi gerektiğini belirleyen bir çalışma yöntemidir.',
    detailedDescription: 'Bu yöntem, ekibin bilinçli veya bilinçsiz varsayımlarını ortaya çıkarır ve bunları önem ve belirsizlik ekseninde haritalandırır. Yüksek önem ve yüksek belirsizlik içeren varsayımlar, öncelikli olarak test edilmesi gerekenlerdir.\n\nVarsayım haritalama, ekibin aynı sayfada olmasını sağlar ve hangi araştırmaların yapılması gerektiğini netleştirir. Varsayımlar test edilmeden ürün geliştirmek risklidir.\n\nBu yöntem, özellikle yeni ürün veya özellik geliştirirken, ekibin farklı varsayımlarını bir araya getirmek ve önceliklendirmek için kullanılır.',
    exampleScenario: 'Yeni bir ödeme özelliği geliştirilirken, ekip varsayımlarını listeler: "Kullanıcılar hızlı ödeme istiyor", "Güvenlik en önemli faktör", "Mobil kullanıcılar daha fazla". Bu varsayımlar önem ve belirsizlik ekseninde haritalandırılır ve en riskli olanlar önce test edilir.',
    whenToUse: [
      'Yeni ürün veya özellik geliştirilirken',
      'Ekip varsayımlarını netleştirmek istediğinde',
      'Araştırma önceliklerini belirlerken'
    ],
    relatedConcepts: ['Hypothesis', 'Risk Assessment', 'Product Discovery', 'User Research']
  },
  'problem-space': {
    shortDefinition: 'Problem Alanı, çözülmesi gereken problemi ve problemle ilgili bağlamı tanımlayan kavramsal alandır.',
    detailedDescription: 'Problem space, "ne problemi çözmeye çalışıyoruz?" sorusuna cevap verir. Bu alan, kullanıcı ihtiyaçlarını, problemleri, kısıtları ve bağlamı kapsar.\n\nProblem space\'e odaklanmak, erken çözümlere atlamadan önce problemi derinlemesine anlamayı sağlar. Doğru problemi çözmeden, en iyi çözüm bile başarısız olur.\n\nProblem space genellikle kullanıcı araştırması, bağlam analizi ve problem tanımı çalışmalarıyla şekillenir.',
    exampleScenario: 'Bir e-ticaret uygulamasında "kullanıcılar alışveriş yapamıyor" bir problem ifadesidir. Problem space ise bu problemin altında yatan nedenleri, hangi kullanıcıların etkilendiğini, hangi durumlarda ortaya çıktığını ve problem bağlamını kapsar.',
    whenToUse: [
      'Problem tanımı yapılırken',
      'Yeni ürün veya özellik geliştirmeye başlarken',
      'Çözüm üretmeden önce problemi anlamak için'
    ],
    relatedConcepts: ['Problem Statement', 'Solution Space', 'User Research', 'Contextual Inquiry']
  },
  'solution-space': {
    shortDefinition: 'Çözüm Alanı, belirli bir problemi çözmek için geliştirilebilecek çözümlerin bulunduğu kavramsal alandır.',
    detailedDescription: 'Solution space, "bu problemi nasıl çözebiliriz?" sorusuna cevap verir. Bu alan, tasarım seçenekleri, teknolojik çözümler, özellikler ve yaklaşımları kapsar.\n\nÇözüm alanına geçmeden önce problem alanını net bir şekilde anlamak kritik öneme sahiptir. Yanlış problemi çözen en iyi çözüm bile başarısız olur.\n\nİyi bir çözüm alanı, problem space\'i doğru yansıtan ve kullanıcı ihtiyaçlarını gerçekten karşılayan çözümleri içerir.',
    exampleScenario: 'Alışveriş yapma problemi için çözüm alanı, ödeme akışını sadeleştirme, güven sinyalleri ekleme, mobil optimizasyon gibi farklı çözüm yaklaşımlarını içerebilir.',
    whenToUse: [
      'Problem netleştirildikten sonra',
      'Çözüm alternatifleri düşünülürken',
      'Tasarım seçenekleri değerlendirilirken'
    ],
    relatedConcepts: ['Problem Space', 'Ideation', 'Solution Design', 'Feature Prioritization']
  },
  'how-might-we': {
    shortDefinition: 'How Might We (Nasıl Yapabiliriz?), problemi fırsat haline getiren ve yaratıcı çözümleri teşvik eden bir soru formatıdır.',
    detailedDescription: 'HMW soruları, problemi olumsuz bir ifade yerine olumlu bir fırsat olarak çerçeveler. "Kullanıcılar ödeme yapamıyor" yerine "Nasıl yapabiliriz ki kullanıcılar güvenle ve kolayca ödeme yapsın?" gibi.\n\nBu soru formatı, tasarım odaklı düşünme sürecinde ideation aşamasında kullanılır. Açık uçlu ve çözüm odaklı olması nedeniyle yaratıcı fikirlerin ortaya çıkmasına yardımcı olur.\n\nİyi bir HMW sorusu, çok geniş değildir (odaklıdır) ama aynı zamanda çok dar da değildir (yaratıcılığa izin verir).',
    exampleScenario: 'Problem: "Kullanıcılar formu tamamlayamıyor." HMW: "Nasıl yapabiliriz ki kullanıcılar formu hatasız ve hızlı bir şekilde tamamlasın?" Bu soru, çözüm odaklı düşünmeyi teşvik eder.',
    whenToUse: [
      'Ideation aşamasında',
      'Problem ifadelerini fırsatlara dönüştürürken',
      'Beyin fırtınası oturumlarında'
    ],
    relatedConcepts: ['Problem Statement', 'Ideation', 'Design Thinking', 'Solution Space']
  },
  'design-hypothesis': {
    shortDefinition: 'Tasarım Hipotezi, belirli bir tasarım değişikliğinin veya çözümün nasıl bir etki yaratacağına dair test edilebilir varsayımdır.',
    detailedDescription: 'Tasarım hipotezi, "X değişikliğini yaparsak Y sonucunu bekleriz çünkü Z" formatında ifade edilir. Bu yapı, neyin değiştirileceğini, neyin ölçüleceğini ve nedenini açıkça belirtir.\n\nİyi bir tasarım hipotezi test edilebilir olmalıdır. Değişikliğin etkisini ölçmek için net metrikler tanımlanmalıdır.\n\nBu hipotezler, rastgele kararlar almak yerine öğrenmeye dayalı ilerlemeyi sağlar. Yanlış çıkan hipotezler de değerli öğrenmeler sağlar.',
    exampleScenario: 'Tasarım Hipotezi: "Ödeme adımına güven rozetleri eklersek, tamamlanma oranı %15 artacak çünkü kullanıcılar güvenlik endişelerini giderecek." Bu hipotez, değişikliği, sonucu ve nedeni net bir şekilde ifade eder.',
    whenToUse: [
      'Tasarım değişiklikleri planlanırken',
      'Deneyler tasarlanırken',
      'A/B testleri yapılırken'
    ],
    relatedConcepts: ['Hypothesis', 'Experiment', 'Success Metrics', 'A/B Testing']
  },
  'outcome': {
    shortDefinition: 'Sonuç (Outcome), bir ürün veya tasarımın kullanıcılar ve iş üzerinde yarattığı etkisel değişikliktir.',
    detailedDescription: 'Outcome, "neyi değiştirdik?" sorusuna cevap verir. Kullanıcının davranışındaki, durumundaki veya hislerindeki değişiklikleri ifade eder.\n\nOutcome, output\'tan farklıdır. Output bir özellik veya çıktıyken, outcome bu çıktının yarattığı etkidir. Örneğin, bir özellik (output) geliştirmek yerine, kullanıcının zamanını kazanması (outcome) hedeflenebilir.\n\nİyi tasarım kararları, output\'tan çok outcome\'a odaklanır. Kullanıcının gerçekten ihtiyacı olan şey, daha fazla özellik değil, problemlerinin çözülmesidir.',
    exampleScenario: 'Bir eğitim uygulaması için output "kurs ekleme özelliği" olabilir. Outcome ise "kullanıcıların öğrenme hedeflerine daha hızlı ulaşması" veya "motivasyonlarının artması" olabilir.',
    whenToUse: [
      'Ürün hedefleri belirlenirken',
      'Tasarım kararları alınırken',
      'Başarı metrikleri tanımlanırken'
    ],
    relatedConcepts: ['Output', 'Success Metrics', 'North Star Metric', 'Value Proposition']
  },
  'output': {
    shortDefinition: 'Çıktı (Output), bir ürün geliştirme sürecinde üretilen somut özellik, ürün veya deliverable\'dır.',
    detailedDescription: 'Output, "neyi ürettik?" sorusuna cevap verir. Geliştirilen özellikler, ekranlar, fonksiyonlar ve teknik çıktılar bu kapsamdadır.\n\nOutput önemlidir ancak yeterli değildir. Bir özellik üretmek, o özelliğin gerçek bir değer yaratacağı anlamına gelmez.\n\nİyi tasarım ve ürün yönetimi, output\'tan çok outcome\'a odaklanır. Çünkü kullanıcılar özellikleri değil, problemlerinin çözülmesini ister.',
    exampleScenario: 'Bir proje yönetim uygulaması için output "yeni görev oluşturma özelliği" olabilir. Ancak gerçek değer (outcome), kullanıcıların projelerini daha iyi yönetmesi ve zamanlarını daha etkili kullanmasıdır.',
    whenToUse: [
      'Geliştirme çıktılarını tanımlarken',
      'Proje planlaması yaparken',
      'Deliverable\'ları listelerken'
    ],
    relatedConcepts: ['Outcome', 'Feature', 'Deliverable', 'Product Development']
  },
  'kuzey-yildizi-metriği': {
    shortDefinition: 'Kuzey Yıldızı Metriği, bir ürünün uzun vadeli değerini en iyi temsil eden ana metriktir.',
    detailedDescription: 'Bu metrik, ekiplerin aynı hedefe odaklanmasını sağlar. Her metrik North Star değildir; kullanıcıya sağlanan değeri yansıtması gerekir.\n\nKuzey Yıldızı Metriği, hem iş hedeflerini hem de kullanıcı değerini temsil eden bir ölçüttür. Kısa vadeli metrikler yerine, ürünün gerçek başarısını gösteren uzun vadeli bir gösterge olmalıdır.\n\nYanlış seçilmiş bir Kuzey Yıldızı Metriği, ürünü yanlış yönde büyütebilir ve ekip yanlış optimizasyonlar yapabilir.',
    exampleScenario: 'Bir içerik platformu için "haftalık aktif okuyucu sayısı" bir Kuzey Yıldızı Metriği olabilir. Çünkü hem kullanıcı değerini (okuma alışkanlığı) hem de iş değerini (platform kullanımı) temsil eder.',
    whenToUse: [
      'Ürün stratejisi belirlenirken',
      'Ekip hedefleri hizalanırken',
      'Uzun vadeli başarı ölçülürken'
    ],
    relatedConcepts: ['Success Metrics', 'Outcome', 'Product Strategy', 'KPI']
  },
  'product-vision': {
    shortDefinition: 'Ürün Vizyonu, bir ürünün gelecekte nasıl bir değer yaratacağını ve dünyayı nasıl değiştireceğini tanımlayan uzun vadeli hedef ve yöndür.',
    detailedDescription: 'Ürün vizyonu, "gelecekte nerede olmak istiyoruz?" sorusuna cevap verir. Somut özelliklerden çok, ürünün yaratacağı etki ve değeri tanımlar.\n\nİyi bir ürün vizyonu, ilham verici, net ve ulaşılabilir olmalıdır. Ekiplere neden çalıştıklarını hatırlatır ve karar alma süreçlerinde rehberlik eder.\n\nVizyon değişmez ama yol haritası değişebilir. Vizyon, ekiplerin hangi yönde ilerlemesi gerektiğini gösterir ama nasıl ilerleyeceğini göstermez.',
    exampleScenario: 'Bir sağlık uygulamasının vizyonu "herkesin sağlığını yönetmesini kolaylaştırmak ve sağlık okuryazarlığını artırmak" olabilir. Bu vizyon, özellikler değişse bile ekipe yön gösterir.',
    whenToUse: [
      'Ürün stratejisi oluşturulurken',
      'Ekip motivasyonu ve hedef hizalaması sağlanırken',
      'Uzun vadeli planlamalar yapılırken'
    ],
    relatedConcepts: ['Product Strategy', 'Mission', 'Product Roadmap', 'North Star Metric']
  },
  'bilgi-mimarisi': {
    shortDefinition: 'Bilgi Mimarisi, bilginin nasıl yapılandırıldığını ve kullanıcıya nasıl sunulduğunu ifade eden disiplindir.',
    detailedDescription: 'Information Architecture (IA), kullanıcının doğru bilgiye doğru zamanda ulaşmasını sağlar. Menü yapıları, kategoriler, navigasyon ve içerik organizasyonu bu kapsamda değerlendirilir.\n\nİyi bir bilgi mimarisi, kullanıcıyı eğitmeye gerek kalmadan doğru yönlendirir ve karar vermeyi kolaylaştırır. Kötü bir bilgi mimarisi ise kullanıcıyı kaybettirir ve ürünü karmaşık gösterir.\n\nIA tasarımı, kullanıcıların zihinsel modellerini anlamayı ve bu modellere uygun yapılar oluşturmayı gerektirir.',
    exampleScenario: 'Bir e-ticaret sitesinde ürünlerin kategorilere ayrılması, menü yapısının mantıklı olması ve kullanıcının aradığı ürüne kolayca ulaşabilmesi bilgi mimarisinin başarılı uygulanmasıdır.',
    whenToUse: [
      'Navigasyon tasarlanırken',
      'İçerik yapısı kurgulanırken',
      'Menü ve kategori yapıları oluşturulurken'
    ],
    relatedConcepts: ['Navigation', 'User Flow', 'Content Strategy', 'Card Sorting']
  },
  'kart-gruplama': {
    shortDefinition: 'Kart Gruplama (Card Sorting), kullanıcıların bilgi yapısını nasıl organize ettiklerini anlamak için kullanılan bir araştırma yöntemidir.',
    detailedDescription: 'Bu yöntemde, kullanıcılara farklı içerik veya özellikler kartlar halinde verilir ve bunları kendi mantıklarına göre gruplamaları istenir. Bu sayede kullanıcıların zihinsel modelleri anlaşılır.\n\nCard sorting, açık ve kapalı olmak üzere iki şekilde yapılabilir. Açık card sorting\'de kullanıcılar kendi kategorilerini oluştururken, kapalı card sorting\'de önceden belirlenmiş kategoriler kullanılır.\n\nBu yöntem, bilgi mimarisi tasarımında kullanıcı odaklı kararlar almayı sağlar ve ekibin varsayımları yerine kullanıcıların gerçek beklentilerini ortaya çıkarır.',
    exampleScenario: 'Bir haber sitesi için içerik türlerini (spor, ekonomi, teknoloji vb.) kartlara yazıp kullanıcılardan bunları gruplamalarını istemek, kullanıcıların bu içerikleri nasıl algıladığını ve nasıl bir yapı beklediğini gösterir.',
    whenToUse: [
      'Bilgi mimarisi tasarımının başında',
      'Mevcut navigasyon yapısı değerlendirilirken',
      'Kullanıcı zihinsel modelleri anlaşılmaya çalışılırken'
    ],
    relatedConcepts: ['Information Architecture', 'Tree Testing', 'User Research', 'Navigation']
  },
  'agac-testi': {
    shortDefinition: 'Ağaç Testi (Tree Testing), bir navigasyon yapısının etkinliğini test etmek için kullanılan araştırma yöntemidir.',
    detailedDescription: 'Bu yöntemde, kullanıcılara bir görev verilir ve sadece navigasyon yapısı (menü ağacı) gösterilir. Tasarım veya görsel öğeler olmadan sadece metin tabanlı navigasyonla görevi tamamlamaları istenir.\n\nTree testing, bilgi mimarisinin kendi başına çalışıp çalışmadığını anlamak için idealdir. Görsel tasarımdan bağımsız olarak yapının doğruluğunu test eder.\n\nBu yöntem, card sorting\'den sonra veya mevcut bir navigasyon yapısını değerlendirmek için kullanılır. Kullanıcıların hedeflerine ne kadar kolay ulaştığını gösterir.',
    exampleScenario: 'Bir e-ticaret sitesinin menü yapısını metin olarak gösterip kullanıcılardan "kahve makinesi" bulmalarını istemek, navigasyon yapısının etkinliğini test eder.',
    whenToUse: [
      'Navigasyon yapısı tasarlandıktan sonra',
      'Mevcut menü yapısı değerlendirilirken',
      'Bilgi mimarisi doğrulanırken'
    ],
    relatedConcepts: ['Card Sorting', 'Information Architecture', 'Usability Testing', 'Navigation']
  },
  'etkilesim-maliyeti': {
    shortDefinition: 'Etkileşim Maliyeti, kullanıcının bir görevi tamamlamak için harcadığı fiziksel ve zihinsel çabadır.',
    detailedDescription: 'Her etkileşim (tıklama, kaydırma, düşünme, karar verme) bir maliyettir. Bu maliyet ne kadar düşükse, kullanıcı o kadar kolay hedefine ulaşır.\n\nEtkileşim maliyeti yalnızca tıklama sayısı değildir. Kullanıcının düşünmesi, karar vermesi, hata yapması ve düzeltmesi de maliyet oluşturur.\n\nİyi tasarım, gereksiz etkileşim maliyetlerini azaltır ve kullanıcıyı en kısa yoldan hedefine ulaştırır.',
    exampleScenario: 'Bir formda 10 alanın 5 adımda gösterilmesi, kullanıcının her adımda düşünmesini gerektirir. Tek ekranda gösterilmesi ise tüm alanları bir anda görmesini sağlar. Hangisinin daha düşük maliyet olduğu bağlama göre değişir.',
    whenToUse: [
      'Akış tasarımları optimize edilirken',
      'Kullanıcı deneyimi iyileştirilirken',
      'Karar verme noktaları değerlendirilirken'
    ],
    relatedConcepts: ['Cognitive Load', 'Usability', 'User Flow', 'Efficiency']
  },
  'asamali-bilgi-gosterimi': {
    shortDefinition: 'Aşamalı Bilgi Gösterimi, bilgiyi kullanıcıya ihtiyaç duyduğu anda ve parça parça sunma yaklaşımıdır.',
    detailedDescription: 'Progressive Disclosure, tüm bilgiyi tek ekranda göstermek yerine, önce temel bilgiyi sunar ve kullanıcı daha fazla bilgi istediğinde ek detayları gösterir.\n\nBu yaklaşım, karmaşıklığı yönetilebilir hale getirir ve kullanıcıyı bunaltmaz. Bilişsel yükü azaltır ve kullanıcıyı daha rahat ilerletir.\n\nProgressive disclosure, "Gelişmiş ayarlar", "Daha fazla göster", "Detaylar" gibi mekanizmalarla uygulanır.',
    exampleScenario: 'Bir formda temel alanlar (isim, e-posta) önce gösterilirken, gelişmiş seçenekler (tercihler, ayarlar) varsayılan olarak gizlidir ve kullanıcı istediğinde açılabilir.',
    whenToUse: [
      'Karmaşık akışlar tasarlanırken',
      'Ayar ve konfigürasyon ekranlarında',
      'Bilgi yoğun ekranlarda'
    ],
    relatedConcepts: ['Cognitive Load', 'Visual Hierarchy', 'UX Writing', 'Information Architecture']
  },
  'bos-durum': {
    shortDefinition: 'Boş Durum, bir ekranda henüz içerik olmadığında veya veri bulunmadığında kullanıcıya gösterilen durumdur.',
    detailedDescription: 'Empty state\'ler sadece "boş" ekranlar değildir; kullanıcıyı yönlendiren fırsatlardır. İyi bir empty state, kullanıcıya ne yapması gerektiğini net bir şekilde anlatır.\n\nEmpty state\'ler, kullanıcıyı eğitir, motive eder ve aksiyona yönlendirir. Boş bir ekran yerine, kullanıcıya bir sonraki adımı gösteren içerik sunulmalıdır.\n\nBu durumlar, ilk kullanımda, filtreleme sonrasında veya veri silinmesinden sonra görülebilir.',
    exampleScenario: 'Yeni kayıt olan bir kullanıcının boş dashboard\'unda sadece boş bir alan yerine, "İlk projenizi oluşturun" gibi yönlendirici bir mesaj ve aksiyon butonu gösterilmesi empty state örneğidir.',
    whenToUse: [
      'İlk kullanımda',
      'Veri olmadığında',
      'Filtreleme sonrası sonuç bulunamadığında'
    ],
    relatedConcepts: ['Onboarding', 'Feedback', 'UX Writing', 'User Guidance']
  },
  'hata-durumu': {
    shortDefinition: 'Hata Durumu, kullanıcının bir işlemi tamamlayamadığı veya beklenmeyen bir durumla karşılaştığında gösterilen durumdur.',
    detailedDescription: 'Error state\'ler, kullanıcıya neyin yanlış gittiğini, nedenini ve ne yapması gerektiğini net bir şekilde anlatmalıdır. Teknik hata mesajları yerine, kullanıcı dostu açıklamalar kullanılmalıdır.\n\nİyi bir error state, kullanıcıyı suçlamaz, problemi açıklar ve çözüm önerir. Kullanıcının hatayı düzeltmesine veya alternatif bir yol bulmasına yardımcı olur.\n\nHata durumları, form validasyonlarından, ağ hatalarından, yetkilendirme problemlerinden veya beklenmeyen sistem durumlarından kaynaklanabilir.',
    exampleScenario: 'Bir form gönderilirken ağ hatası oluştuğunda, "Bağlantı hatası oluştu. Lütfen tekrar deneyin." yerine "Gönderim sırasında bir sorun oluştu. Bağlantınızı kontrol edip tekrar deneyin." gibi daha açıklayıcı bir mesaj gösterilmesi error state örneğidir.',
    whenToUse: [
      'Form validasyon hatalarında',
      'Ağ ve sunucu hatalarında',
      'Kullanıcı yetkisi olmayan işlemlerde',
      'Beklenmeyen sistem durumlarında'
    ],
    relatedConcepts: ['Error Prevention', 'Feedback', 'UX Writing', 'User Guidance']
  },
  'yukleniyor-durumu': {
    shortDefinition: 'Yükleniyor Durumu, sistemin bir işlem yaptığı sırada kullanıcıya gösterdiği geçici durumdur.',
    detailedDescription: 'Loading state\'ler kullanıcıyı belirsizlikten kurtarır. Kullanıcı, sistemin çalıştığını anlar ve beklemeye daha toleranslı olur.\n\nLoading state\'ler farklı şekillerde gösterilebilir: spinner, progress bar, skeleton screen veya animasyonlar. Sürenin uzunluğuna göre uygun format seçilmelidir.\n\nYanlış veya eksik loading state kullanımı, kullanıcıyı güvensiz hissettirebilir ve sistemin donduğunu düşündürebilir.',
    exampleScenario: 'Bir liste yüklenirken spinner gösterilmesi veya içerik yüklemeden önce skeleton screen gösterilmesi loading state örneğidir. Kullanıcı sistemin çalıştığını anlar ve bekler.',
    whenToUse: [
      'Veri yüklenirken',
      'Sayfa geçişlerinde',
      'Uzun süren işlemlerde',
      'Form gönderimlerinde'
    ],
    relatedConcepts: ['Perceived Performance', 'Skeleton Screen', 'Feedback', 'Response Time']
  },
  'kullanilabilirlik': {
    shortDefinition: 'Kullanılabilirlik, bir ürünün kullanıcılar tarafından ne kadar kolay, hızlı ve hatasız kullanılabildiğini ifade eder.',
    detailedDescription: 'Usability, bir ürünün kullanıcılar tarafından ne kadar kolay, hızlı ve hatasız kullanılabildiğini ifade eder. Kullanılabilirlik; öğrenilebilirlik, hata oranı ve görev tamamlama süresi gibi kriterlerle değerlendirilir.\n\nBir ürün görsel olarak iyi tasarlanmış olabilir ancak kullanımı zorsa usability düşüktür. İyi usability, kullanıcıyı eğitmeye gerek kalmadan hedefe ulaştırır ve kullanıcıyı yormaz.\n\nUsability testleri, bir ürünün kullanılabilirliğini ölçmek ve iyileştirmek için yapılır.',
    exampleScenario: 'Bir formda hangi alanların zorunlu olduğu anlaşılmıyorsa ve kullanıcı hata mesajlarıyla karşılaşıyorsa, burada bir usability problemi vardır.',
    whenToUse: [
      'Ürün test edilirken',
      'Kullanıcı hataları analiz edilirken',
      'Akışlar sadeleştirilirken'
    ],
    relatedConcepts: ['Usability Testing', 'Learnability', 'Error Prevention', 'Accessibility']
  },
  'ogrenilebilirlik': {
    shortDefinition: 'Öğrenilebilirlik, bir ürünün kullanıcılar tarafından ne kadar hızlı ve kolay öğrenilebildiğini ifade eder.',
    detailedDescription: 'Learnability, kullanılabilirliğin temel bileşenlerinden biridir. Bir ürün, kullanıcıların ilk kullanımda ne kadar hızlı öğrenebildiğini ve sonraki kullanımlarda ne kadar hızlı hatırladığını ölçer.\n\nYüksek öğrenilebilirlik, kullanıcıların ürünü eğitime gerek kalmadan kullanabilmesini sağlar. İyi öğrenilebilirlik, kullanıcıları eğitmek için kaynak harcamayı azaltır.\n\nÖğrenilebilirlik, mevcut mental modellere uyum, tutarlılık ve sezgisel tasarım ile artırılabilir.',
    exampleScenario: 'Yeni bir kullanıcı, bir e-ticaret sitesine ilk kez girdiğinde ürün arama, sepet ekleme ve ödeme gibi temel işlemleri hızlıca yapabiliyorsa, site yüksek öğrenilebilirliğe sahiptir.',
    whenToUse: [
      'Yeni kullanıcı deneyimi tasarlanırken',
      'Onboarding süreçleri değerlendirilirken',
      'Ürünün ilk kullanım deneyimi iyileştirilirken'
    ],
    relatedConcepts: ['Usability', 'Mental Model', 'Consistency', 'First-time User Experience']
  },
  'erisilebilirlik': {
    shortDefinition: 'Erişilebilirlik, dijital ürünlerin farklı yetilere sahip kullanıcılar tarafından da erişilebilir ve kullanılabilir olmasını ifade eder.',
    detailedDescription: 'Accessibility (A11y), dijital ürünlerin farklı yetilere sahip kullanıcılar tarafından da erişilebilir ve kullanılabilir olmasını ifade eder. Erişilebilirlik yalnızca engelli kullanıcılar için değil, herkes için daha iyi bir deneyim anlamına gelir.\n\nKontrast, klavye ile kullanım, ekran okuyucu uyumluluğu ve alternatif metinler bu kapsamda değerlendirilir. İyi bir accessibility yaklaşımı, daha kapsayıcı ve sürdürülebilir ürünler ortaya çıkarır.\n\nWCAG yönergeleri, erişilebilirlik standartlarını belirler ve A, AA, AAA seviyelerinde ölçüm yapılmasını sağlar.',
    exampleScenario: 'Düşük kontrastlı bir metin, görme problemi olan kullanıcılar için okunamaz hâle gelebilir. Yeterli kontrast oranına sahip metinler ise tüm kullanıcılar için daha okunabilirdir.',
    whenToUse: [
      'UI tasarlanırken',
      'Design system oluşturulurken',
      'Yasal ve etik gereklilikler değerlendirilirken',
      'Kapsayıcı tasarım yapılırken'
    ],
    relatedConcepts: ['WCAG', 'Usability', 'Inclusive Design', 'Visual Hierarchy']
  },
  'wcag': {
    shortDefinition: 'WCAG, web içeriğinin erişilebilirliğini sağlamak için belirlenmiş uluslararası standartlar ve yönergelerdir.',
    detailedDescription: 'Web Content Accessibility Guidelines (WCAG), web içeriğinin erişilebilirliğini sağlamak için W3C tarafından belirlenmiş uluslararası standartlardır. Bu yönergeler, web sitelerinin farklı yetilere sahip kullanıcılar tarafından da erişilebilir olmasını hedefler.\n\nWCAG, POUR prensiplerine dayanır: Perceivable (Algılanabilir), Operable (Kullanılabilir), Understandable (Anlaşılabilir) ve Robust (Sağlam).\n\nWCAG seviyeleri A (en düşük), AA (orta) ve AAA (en yüksek) olmak üzere üç seviyededir. Çoğu yasal düzenleme AA seviyesini gerektirir.',
    exampleScenario: 'WCAG AA seviyesi, metin için en az 4.5:1 kontrast oranı gerektirir. Bu standart, görme zorluğu yaşayan kullanıcıların içeriği okuyabilmesini sağlar.',
    whenToUse: [
      'Erişilebilirlik standartları belirlenirken',
      'Yasal uyumluluk değerlendirilirken',
      'Tasarım kararları alınırken',
      'Ürün test edilirken'
    ],
    relatedConcepts: ['Accessibility', 'Inclusive Design', 'Web Standards', 'User Testing']
  },
  'bilissel-yuk': {
    shortDefinition: 'Bilişsel Yük, kullanıcının bir görevi yerine getirirken harcadığı zihinsel efor miktarıdır.',
    detailedDescription: 'Cognitive Load, kullanıcının bir görevi yerine getirirken harcadığı zihinsel efor miktarıdır. Yüksek bilişsel yük, kullanıcıyı yorar ve hata yapma olasılığını artırır.\n\nBilişsel yük, içsel (kullanıcının bilgiyi işleme süreci), dışsal (tasarımdan kaynaklanan) ve ilgili (öğrenme süreci) olmak üzere üç türde olabilir. İyi UX tasarımı, dışsal bilişsel yükü azaltmayı hedefler.\n\nİyi UX, kullanıcıdan mümkün olan en az zihinsel eforu talep eder ve karmaşıklığı yönetilebilir hale getirir.',
    exampleScenario: 'Aynı ekranda çok fazla seçenek sunulması, renk ve şekil karmaşası veya belirsiz etiketler bilişsel yükü artırır. Sadeleştirme ve net yönlendirmeler ise bilişsel yükü azaltır.',
    whenToUse: [
      'Form ve akış tasarlanırken',
      'Bilgi yoğun ekranlarda',
      'Karar verme noktalarında',
      'Kullanıcı deneyimi iyileştirilirken'
    ],
    relatedConcepts: ['Usability', 'Visual Hierarchy', 'Progressive Disclosure', 'Cognitive Overload']
  },
  'eylem-imkani': {
    shortDefinition: 'Eylem İmkanı, bir nesnenin nasıl kullanılacağını kullanıcıya sezgisel olarak anlatma yeteneğidir.',
    detailedDescription: 'Affordance, bir nesnenin nasıl kullanılacağını kullanıcıya sezgisel olarak anlatma yeteneğidir. Bir öğenin tıklanabilir mi, sürüklenebilir mi, seçilebilir mi olduğu görünümünden anlaşılmalıdır.\n\nGizli affordance\'lar kullanıcıyı deneme-yanılmaya iter. İyi tasarım, her öğenin ne işe yaradığını ve nasıl kullanılacağını görsel ipuçlarıyla açıkça gösterir.\n\nAffordance, görsel tasarımın yanı sıra etkileşim tasarımında da önemlidir. Kullanıcı, bir öğenin nasıl davranacağını önceden tahmin edebilmelidir.',
    exampleScenario: 'Buton gibi görünen bir alanın tıklanamaması affordance problemidir. Tıklanabilir bir öğenin görsel olarak (renk, boyut, gölge) tıklanabilir görünmesi gerekir.',
    whenToUse: [
      'Etkileşimler tasarlanırken',
      'UI elemanları değerlendirilirken',
      'Kullanılabilirlik problemleri çözülürken'
    ],
    relatedConcepts: ['Signifier', 'Interaction Design', 'Feedback', 'Usability']
  },
  'gosterge-isaretleyici': {
    shortDefinition: 'Gösterge / İşaretleyici, bir öğenin eylem imkanını (affordance) kullanıcıya ileten görsel veya metinsel ipucudur.',
    detailedDescription: 'Signifier, bir öğenin eylem imkanını (affordance) kullanıcıya ileten görsel veya metinsel ipucudur. Affordance bir öğenin ne yapabileceğini gösterirken, signifier bu yeteneği kullanıcıya nasıl ileteceğimizi gösterir.\n\nİyi bir signifier, kullanıcıya net bir şekilde ne yapabileceğini ve nasıl yapacağını anlatır. İkonlar, etiketler, renkler, şekiller ve animasyonlar signifier olarak kullanılabilir.\n\nSignifier\'lar görünür olmalı ve kullanıcının dikkatini çekmelidir. Belirsiz veya eksik signifier\'lar kullanılabilirlik problemlerine yol açar.',
    exampleScenario: 'Bir butonun üzerindeki "Kaydet" yazısı, tıklanabilir bir öğe olduğunu ve ne işe yaradığını gösterir. Bir linkin altı çizili olması veya mavi renkte olması tıklanabilir olduğunu gösterir.',
    whenToUse: [
      'UI elemanları tasarlanırken',
      'Etkileşim ipuçları eklenirken',
      'Kullanılabilirlik iyileştirilirken'
    ],
    relatedConcepts: ['Affordance', 'Visual Design', 'Interaction Design', 'Usability']
  },
  'kullanilabilirlik-testi': {
    shortDefinition: 'Kullanılabilirlik Testi, kullanıcıların bir ürünü kullanırken yaşadığı problemleri gözlemlemeye yönelik testlerdir.',
    detailedDescription: 'Usability Testing, kullanıcıların bir ürünü kullanırken yaşadığı problemleri gözlemlemeye yönelik testlerdir. Bu testler, tasarımcının değil kullanıcının bakış açısını ortaya koyar.\n\nKullanılabilirlik testleri, moderatörlü veya moderatörsüz olarak yapılabilir. Kullanıcılara belirli görevler verilir ve bu görevleri tamamlarken gözlemlenirler.\n\nKüçük testler bile büyük problemleri açığa çıkarabilir. Amaç, kullanıcıyı test etmek değil, ürünü test etmektir.',
    exampleScenario: 'Bir kullanıcının kayıt olurken sürekli yanlış alanları doldurması usability problemine işaret eder. Test sırasında bu problem gözlemlenir ve çözüm üretilir.',
    whenToUse: [
      'Tasarım doğrulanırken',
      'Yayın öncesi kontrollerde',
      'Mevcut ürün iyileştirilirken'
    ],
    relatedConcepts: ['Usability', 'User Testing', 'Feedback', 'Moderated Test']
  },
  'ab-testi': {
    shortDefinition: 'A/B Testi, iki veya daha fazla tasarım versiyonunun performansını karşılaştırarak hangisinin daha etkili olduğunu belirleyen test yöntemidir.',
    detailedDescription: 'A/B Testing, iki veya daha fazla tasarım versiyonunun performansını karşılaştırarak hangisinin daha etkili olduğunu belirleyen test yöntemidir. Kullanıcılar rastgele olarak farklı versiyonlara yönlendirilir ve davranışları ölçülür.\n\nBu test yöntemi, tasarım kararlarını varsayımlara göre değil, veriye göre almayı sağlar. Hangi buton renginin, hangi başlığın veya hangi yerleşimin daha iyi sonuç verdiğini öğrenmek için kullanılır.\n\nA/B testleri, net bir hipotez ve ölçülebilir metrik gerektirir. Test sonuçları istatistiksel olarak anlamlı olmalıdır.',
    exampleScenario: 'Bir e-ticaret sitesinde "Sepete Ekle" butonunun yeşil mi yoksa turuncu mu olması gerektiğini test etmek için kullanıcıların yarısına yeşil, yarısına turuncu buton gösterilir. Hangisinin daha fazla tıklama aldığı ölçülür.',
    whenToUse: [
      'Tasarım kararları doğrulanırken',
      'Farklı tasarım seçenekleri değerlendirilirken',
      'Dönüşüm oranları optimize edilirken'
    ],
    relatedConcepts: ['Hypothesis', 'Experiment', 'Success Metrics', 'Statistical Significance']
  },
  'kiyaslama-testi': {
    shortDefinition: 'Kıyaslama Testi, bir ürünün performansını önceden belirlenmiş standartlarla veya rakip ürünlerle karşılaştıran test yöntemidir.',
    detailedDescription: 'Benchmark Testing, bir ürünün performansını önceden belirlenmiş standartlarla veya rakip ürünlerle karşılaştıran test yöntemidir. Bu test, ürünün mevcut durumunu ölçer ve iyileştirme alanlarını belirler.\n\nKıyaslama testleri, görev tamamlama süresi, başarı oranı, hata oranı gibi metriklerle yapılır. Bu metrikler, zaman içinde karşılaştırılarak iyileştirmelerin etkisi ölçülür.\n\nBu test yöntemi, ürünün pazar pozisyonunu anlamak ve hedeflere ulaşılıp ulaşılmadığını değerlendirmek için kullanılır.',
    exampleScenario: 'Bir e-ticaret sitesinin ödeme akışının tamamlanma süresini ve başarı oranını rakip sitelerle karşılaştırmak, ürünün performansını değerlendirmek için benchmark testing kullanılır.',
    whenToUse: [
      'Ürün performansı değerlendirilirken',
      'Rakip analizi yapılırken',
      'Hedef metrikler izlenirken'
    ],
    relatedConcepts: ['Success Rate', 'Time on Task', 'Usability Testing', 'Metrics']
  },
  'moderatorlu-test': {
    shortDefinition: 'Moderatörlü Test, bir moderatörün (araştırmacı) kullanıcıya rehberlik ettiği ve gerçek zamanlı gözlem yapıldığı test yöntemidir.',
    detailedDescription: 'Moderated Test, bir moderatörün (araştırmacı) kullanıcıya rehberlik ettiği ve gerçek zamanlı gözlem yapıldığı test yöntemidir. Moderator, test sırasında kullanıcıya görevleri verir, sorular sorar ve davranışlarını gözlemler.\n\nBu test yöntemi, derinlemesine içgörüler elde etmek için idealdir. Moderator, kullanıcının düşünce süreçlerini anlamak için sorular sorabilir ve gerçek zamanlı olarak problemleri tespit edebilir.\n\nModeratörlü testler, yüz yüze veya uzaktan (video konferans) yapılabilir. Daha kontrollü bir ortam sağlar ancak zaman ve kaynak açısından daha maliyetlidir.',
    exampleScenario: 'Bir araştırmacı, kullanıcıya bir mobil uygulamayı kullanmasını istediğinde yanında oturur, görevleri verir, kullanıcının ne düşündüğünü sorar ve davranışlarını gözlemler. Bu moderatörlü testtir.',
    whenToUse: [
      'Derinlemesine içgörüler elde edilmek istendiğinde',
      'Karmaşık görevler test edilirken',
      'Kullanıcı düşünce süreçleri anlaşılmaya çalışılırken'
    ],
    relatedConcepts: ['Usability Testing', 'User Research', 'Unmoderated Test', 'Qualitative Research']
  },
  'moderatorsuz-test': {
    shortDefinition: 'Moderatörsüz Test, kullanıcıların kendi kendilerine ve kendi zamanlarında gerçekleştirdikleri test yöntemidir.',
    detailedDescription: 'Unmoderated Test, kullanıcıların kendi kendilerine ve kendi zamanlarında gerçekleştirdikleri test yöntemidir. Kullanıcılar, belirli görevleri verilen talimatlara göre tamamlar ve davranışları otomatik olarak kaydedilir.\n\nBu test yöntemi, daha büyük örneklemlerle test yapmayı sağlar ve zaman ve kaynak açısından daha verimlidir. Ancak derinlemesine içgörüler elde etmek moderatörlü testlere göre daha zordur.\n\nModeratörsüz testler, özellikle nicel metrikleri (başarı oranı, görev tamamlama süresi) ölçmek için idealdir.',
    exampleScenario: 'Kullanıcılara bir web sitesinde ürün bulma görevi verilir ve kullanıcılar kendi bilgisayarlarından, kendi zamanlarında bu görevi tamamlar. Davranışları otomatik olarak kaydedilir ve analiz edilir.',
    whenToUse: [
      'Büyük örneklemlerle test yapılırken',
      'Nicel metrikler ölçülürken',
      'Hızlı ve verimli test yapılmak istendiğinde'
    ],
    relatedConcepts: ['Usability Testing', 'Moderated Test', 'Quantitative Research', 'Remote Testing']
  },
  'basari-orani': {
    shortDefinition: 'Başarı Oranı, kullanıcıların belirli bir görevi başarıyla tamamlama yüzdesidir.',
    detailedDescription: 'Success Rate, kullanıcıların belirli bir görevi başarıyla tamamlama yüzdesidir. Bu metrik, bir ürünün kullanılabilirliğini ölçmek için en önemli metriklerden biridir.\n\nBaşarı oranı, görevlerin tamamlanıp tamamlanmadığını ve tamamlanma sırasında hata yapılıp yapılmadığını ölçer. Yüksek başarı oranı, ürünün kullanıcıların hedeflerine ulaşmasını kolaylaştırdığını gösterir.\n\nBu metrik, usability testleri, A/B testleri ve benchmark testlerinde sıklıkla kullanılır. Zaman içinde karşılaştırılarak iyileştirmelerin etkisi ölçülür.',
    exampleScenario: 'Bir e-ticaret sitesinde 100 kullanıcıdan 75\'i alışveriş sepetine ürün ekleyip ödeme sayfasına ulaşabiliyorsa, başarı oranı %75\'tir. %100\'e yakın olması ideal kabul edilir.',
    whenToUse: [
      'Usability testleri sonuçları değerlendirilirken',
      'A/B testleri analiz edilirken',
      'Ürün performansı ölçülürken'
    ],
    relatedConcepts: ['Usability Testing', 'Time on Task', 'Error Rate', 'Task Completion']
  },
  'gorev-tamamlama-suresi': {
    shortDefinition: 'Görev Tamamlama Süresi, kullanıcının belirli bir görevi tamamlaması için geçen süredir.',
    detailedDescription: 'Time on Task, kullanıcının belirli bir görevi tamamlaması için geçen süredir. Bu metrik, bir ürünün kullanılabilirliğini ve verimliliğini ölçmek için önemli bir göstergedir.\n\nGörev tamamlama süresi ne kadar kısaysa, ürün o kadar verimli ve kullanıcı dostu kabul edilir. Ancak süre, kullanıcının hedefine ulaşması için gereken süredir; hızlı olması her zaman iyi olmayabilir.\n\nBu metrik, usability testleri, A/B testleri ve benchmark testlerinde kullanılır. Zaman içinde karşılaştırılarak iyileştirmelerin etkisi ölçülür.',
    exampleScenario: 'Bir kullanıcının bir ürünü bulup sepete eklemesi ortalama 2 dakika sürüyorsa, bu görev tamamlama süresidir. Bu süreyi 1 dakikaya indirmek, ürünün daha verimli kullanıldığını gösterir.',
    whenToUse: [
      'Görev verimliliği ölçülürken',
      'A/B testleri analiz edilirken',
      'Benchmark testleri yapılırken'
    ],
    relatedConcepts: ['Success Rate', 'Usability Testing', 'Efficiency', 'Task Completion']
  },
  'tasarim-degiskenleri': {
    shortDefinition: 'Tasarım Değişkenleri, renk, tipografi, boşluk, gölge gibi tasarım değerlerinin kod olarak tanımlandığı ve tutarlı şekilde kullanıldığı sistemdir.',
    detailedDescription: 'Design Tokens, renk, tipografi, boşluk, gölge gibi tasarım değerlerinin kod olarak tanımlandığı ve tutarlı şekilde kullanıldığı sistemdir. Bu değerler, tasarım ve geliştirme ekipleri arasında ortak bir dil oluşturur.\n\nTasarım değişkenleri, tasarım sistemlerinin temelidir. Bir renk veya spacing değeri değiştirildiğinde, tüm sistemde otomatik olarak güncellenir. Bu sayede tutarlılık sağlanır ve bakım maliyeti azalır.\n\nDesign tokens, farklı platformlarda (web, mobil) aynı değerleri kullanmayı sağlar ve tasarım değişikliklerini hızlı bir şekilde uygulamayı kolaylaştırır.',
    exampleScenario: 'Bir tasarım değişkeni "primary-color: #DEFF37" olarak tanımlanır ve tüm butonlar, linkler ve vurgu alanları bu değişkeni kullanır. Renk değiştirilmek istendiğinde sadece bu değişken güncellenir ve tüm kullanım alanları otomatik olarak güncellenir.',
    whenToUse: [
      'Design system oluşturulurken',
      'Tutarlılık sağlanmak istendiğinde',
      'Tasarım değerleri yönetilirken'
    ],
    relatedConcepts: ['Design System', 'Component Library', 'Consistency', 'Design Variables']
  },
  'bilesen-kutuphanesi': {
    shortDefinition: 'Bileşen Kütüphanesi, bir ürünün tasarım ve geliştirme süreçlerinde kullanılabilecek hazır UI bileşenlerinin toplandığı koleksiyondur.',
    detailedDescription: 'Component Library, bir ürünün tasarım ve geliştirme süreçlerinde kullanılabilecek hazır UI bileşenlerinin toplandığı koleksiyondur. Buton, input, card gibi temel UI elemanlarından daha karmaşık bileşimlere kadar geniş bir yelpazede bileşenler içerir.\n\nBileşen kütüphanesi, design system\'in uygulama katmanıdır. Tasarım ve geliştirme ekiplerinin daha hızlı ve tutarlı çalışmasını sağlar.\n\nİyi bir component library, dokümantasyon, kullanım örnekleri ve kod implementasyonları içerir. Bu sayede ekipler bileşenleri doğru şekilde kullanabilir.',
    exampleScenario: 'Bir bileşen kütüphanesinde "Primary Button", "Secondary Button", "Text Input" gibi bileşenler tanımlıdır. Tasarımcılar ve geliştiriciler bu bileşenleri kullanarak yeni ekranlar oluşturur.',
    whenToUse: [
      'Design system uygulanırken',
      'Tutarlı UI bileşenleri oluşturulurken',
      'Ekip verimliliği artırılmak istendiğinde'
    ],
    relatedConcepts: ['Design System', 'Design Tokens', 'Atomic Design', 'UI Components']
  },
  'tasarim-deseni': {
    shortDefinition: 'Tasarım Deseni, yaygın olarak kullanılan ve kanıtlanmış çözüm yaklaşımlarıdır.',
    detailedDescription: 'Design Pattern, yaygın olarak kullanılan ve kanıtlanmış çözüm yaklaşımlarıdır. Bu desenler, benzer problemler için tekrar eden çözümler sunar ve tasarımcıların deneme-yanılma yapmadan doğru yaklaşımı seçmesini sağlar.\n\nTasarım desenleri, navigasyon, form tasarımı, ödeme akışları, filtreleme gibi birçok alanda uygulanabilir. Bu desenler, kullanıcıların zihinsel modellerine uyum sağlar ve öğrenme eğrisini azaltır.\n\nDesenler evrensel olmamakla birlikte, farklı platformlarda ve bağlamlarda uyarlanarak kullanılabilir.',
    exampleScenario: 'E-ticaret sitelerinde "Ürün Detay Sayfası" bir tasarım desenidir. Ürün görselleri, fiyat bilgisi, sepete ekleme butonu gibi öğeler bu desende standartlaştırılmıştır. Kullanıcılar bu desene aşina olduğu için yeni sitelerde de hızlıca adapte olur.',
    whenToUse: [
      'Yaygın problemler için çözüm aranırken',
      'Kullanıcı deneyimi standartlaştırılırken',
      'Yeni özellikler tasarlanırken'
    ],
    relatedConcepts: ['UI Pattern', 'Best Practices', 'User Experience', 'Design Standards']
  },
  'atomik-tasarim': {
    shortDefinition: 'Atomik Tasarım, arayüzleri küçük parçalardan başlayarak daha büyük ve anlamlı yapılara dönüştüren bir tasarım metodolojisidir.',
    detailedDescription: 'Atomic Design, arayüzleri küçük parçalardan başlayarak daha büyük ve anlamlı yapılara dönüştüren bir tasarım metodolojisidir. Bu yaklaşım, UI\'ı atom, molekül, organizma, template ve page olmak üzere beş seviyede yapılandırır.\n\nAtomlar (buton, input, label) en küçük yapı taşlarıdır. Bunlar birleşerek molekülleri (form alanı, arama çubuğu), moleküller birleşerek organizmaları (header, sidebar) oluşturur.\n\nBu yaklaşım, design system\'lerin temelini oluşturur ve bileşenlerin ölçeklenebilir şekilde yapılandırılmasını sağlar.',
    exampleScenario: 'Bir buton atomdur, buton + ikon bir molekül olabilir, bu yapıların birleşmesiyle daha karmaşık arayüzler (header, form) oluşur. Bu hiyerarşik yapı, design system\'in temelini oluşturur.',
    whenToUse: [
      'Design system kurulurken',
      'Bileşenler ölçeklenirken',
      'Sistematik tasarım yaklaşımı benimsenirken'
    ],
    relatedConcepts: ['Design System', 'Component Library', 'Design Tokens', 'UI Structure']
  },
  'tutarlilik': {
    shortDefinition: 'Tutarlılık, bir ürünün tüm ekranlarında ve etkileşimlerinde tutarlı davranmasıdır.',
    detailedDescription: 'Consistency, bir ürünün tüm ekranlarında ve etkileşimlerinde tutarlı davranmasıdır. Tutarlılık, kullanıcıların ürünü öğrenme süresini kısaltır ve kullanıcı bir yerde öğrendiği davranışı başka bir yerde de geçerli varsayar.\n\nTutarlılık, görsel (renk, tipografi, spacing), davranışsal (etkileşimler, animasyonlar) ve sözel (dil, ton) olmak üzere farklı boyutlarda değerlendirilir.\n\nTutarsız tasarımlar kullanıcıyı düşündürür ve hata yapmasına neden olur. İyi bir design system, tutarlılığı sağlamak için kritik öneme sahiptir.',
    exampleScenario: 'Bir ekranda mavi olan "Devam" butonunun başka bir ekranda gri olması kafa karışıklığı yaratır. Tüm ekranlarda aynı renk ve stilde kullanılması tutarlılık sağlar.',
    whenToUse: [
      'UI kararları alınırken',
      'Design system uygulanırken',
      'Kullanıcı deneyimi iyileştirilirken'
    ],
    relatedConcepts: ['Design System', 'Visual Hierarchy', 'Usability', 'User Experience']
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Google Analytics page view tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'UX Sözlük',
        page_location: window.location.href,
        page_path: '/ux-sozluk',
      });
    }
  }, []);

  const filteredTerms = useMemo(() => {
    let terms = UX_TERMS;

    // Apply search filter first if search query exists
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      terms = terms.filter((term) =>
        term.term.toLowerCase().includes(query)
      );
    } else {
      // Apply quick filter only if no search query
      terms = filterTermsByRange(UX_TERMS, activeFilter);
    }

    return terms;
  }, [activeFilter, searchQuery]);

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

          {/* Search */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Terim ara..."
                className="w-full px-6 py-4 pl-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37]/50 focus:ring-2 focus:ring-[#DEFF37]/20 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
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
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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

          {/* Quick Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {filterButtons.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setActiveFilter(filter.value);
                    setSearchQuery(''); // Clear search when filter is clicked
                  }}
                  disabled={!!searchQuery} // Disable filters when searching
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    activeFilter === filter.value && !searchQuery
                      ? 'bg-[#DEFF37] text-black'
                      : searchQuery
                      ? 'bg-zinc-900/50 text-gray-500 cursor-not-allowed'
                      : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800'
                  }`}
                >
                  {filter.label}
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryTerms.map((term) => {
                          const hasContent = TERM_CONTENTS[term.id] !== undefined;
                          
                          return (
                            <button
                              key={term.id}
                              onClick={() => hasContent && handleTermClick(term.id)}
                              disabled={!hasContent}
                              className={`group flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl transition-all duration-300 hover:border-[#DEFF37]/50 hover:bg-zinc-900 text-left ${
                                !hasContent ? 'opacity-60 cursor-not-allowed' : ''
                              }`}
                            >
                              <span className="font-medium text-white group-hover:text-[#DEFF37] transition-colors">
                                {term.term}
                              </span>
                              <svg
                                className="w-5 h-5 text-gray-400 group-hover:text-[#DEFF37] transition-colors flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
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
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={handleCloseDrawer}
          />
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-zinc-900 shadow-2xl border-l border-[#DEFF37]/20 overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">{selectedTermData.term}</h2>
                <button
                  onClick={handleCloseDrawer}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-8">
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
          </div>
        </div>
      )}
    </div>
  );
}
