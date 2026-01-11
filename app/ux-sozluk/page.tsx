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

  // 🧠 Core UX & Thinking
  { id: 'mental-model', term: 'Mental Model', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'heuristic', term: 'Heuristic', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'nielsens-heuristics', term: "Nielsen's Heuristics", category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'empathy', term: 'Empathy', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'cognitive-bias', term: 'Cognitive Bias', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'progressive-disclosure', term: 'Progressive Disclosure', category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'hicks-law', term: "Hick's Law", category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'fittss-law', term: "Fitts's Law", category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'jakobs-law', term: "Jakob's Law", category: 'Core UX & Thinking', emoji: '🧠' },
  { id: 'gestalt-principles', term: 'Gestalt Principles', category: 'Core UX & Thinking', emoji: '🧠' },
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
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredTerms = useMemo(() => {
    return filterTermsByRange(UX_TERMS, activeFilter);
  }, [activeFilter]);

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
                  onClick={() => setActiveFilter(filter.value)}
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
                                {term.term} Nedir?
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
                <h2 className="text-2xl font-bold text-white">{selectedTermData.term} Nedir?</h2>
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
