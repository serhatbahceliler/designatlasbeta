import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import RoadmapClient from "./RoadmapClient";

interface Resource {
  category: string;
  items: { title: string; url: string }[];
}

interface Topic {
  title: string;
  description?: string;
  resources?: Resource[];
  practice?: {
    title: string;
    tasks: string[];
  };
}

interface Section {
  title: string;
  description: string;
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
        title: "1. UX Foundations",
        description: "UX'in ne olduğunu, problem çözme yaklaşımını ve temel kavramları oturtmak.",
        topics: [
          {
            title: "What is UX Design?",
            description: "UX Design, bir ürünün kullanıcı için ne kadar anlaşılır, verimli ve tatmin edici olduğunu tasarlama sürecidir. Sadece ekran çizmek değil; problemi anlamak, çözümü test etmek ve iyileştirmektir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "What Is User Experience (UX) Design?", url: "https://www.nngroup.com/articles/definition-user-experience/" },
                  { title: "UX 101: Introduction to User Experience", url: "https://www.nngroup.com/articles/ux-101-introduction-user-experience/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "What is UX Design? – AJ&Smart", url: "https://www.youtube.com/results?search_query=what+is+ux+design+aj+smart" },
                  { title: "UX Design in 5 Minutes – NNGroup", url: "https://www.youtube.com/results?search_query=ux+design+in+5+minutes+nngroup" },
                  { title: "UX Design Explained for Beginners – DesignCourse", url: "https://www.youtube.com/results?search_query=ux+design+explained+beginners+designcourse" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Kullandığın bir uygulamayı düşün (ör. banka app'i)",
                "Bu uygulamada seni zorlayan bir an var mı?",
                "O an neden zorladı?",
                "Sence bu bir UX problemi mi, neden?",
              ],
            },
          },
          {
            title: "UX vs UI vs Product Design",
            description: "UX Design: Problemi anlar ve çözümün kullanıcı için çalışıp çalışmadığını test eder. UI Design: Görsel dili ve arayüzü tasarlar. Product Design: UX + UI + iş hedeflerini birlikte ele alır. Bu roller çoğu şirkette örtüşebilir, ama bakış açıları farklıdır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "UX vs UI vs Product Design", url: "https://www.nngroup.com/articles/ux-vs-ui/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX vs UI vs Product Design Explained – Jesse Showalter", url: "https://www.youtube.com/results?search_query=ux+vs+ui+vs+product+design+jesse+showalter" },
                  { title: "UX, UI and Product Design Differences – AJ&Smart", url: "https://www.youtube.com/results?search_query=ux+ui+product+design+differences+aj+smart" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir mobil uygulama seç",
                "UX problemi örneği yaz",
                "UI problemi örneği yaz",
                "Product kararıyla ilgili bir problem yaz",
                "(Birbiriyle karıştırmamaya çalış)",
              ],
            },
          },
          {
            title: "User-Centered Design",
            description: "User-Centered Design (UCD), kararların kişisel fikirlere değil, kullanıcı ihtiyaçlarına ve kanıtlara dayanmasını savunur. \"Ben böyle hissediyorum\" değil, \"Kullanıcı bunu yapamıyor\" demektir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "User-Centered Design Basics", url: "https://www.nngroup.com/articles/user-centered-design/" },
                  { title: "Empathy in UX Design", url: "https://www.nngroup.com/articles/empathy-ux-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "User-Centered Design Explained – NNGroup", url: "https://www.youtube.com/results?search_query=user+centered+design+explained+nngroup" },
                  { title: "What Is User-Centered Design? – UX Mastery", url: "https://www.youtube.com/results?search_query=user+centered+design+ux+mastery" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Tasarladığın hayali bir ürün düşün",
                "Şu cümleyi doldur: \"Kullanıcı şu problemi yaşıyor çünkü …\"",
                "Bu problem nasıl doğrulanabilir? (Interview, test, gözlem?)",
              ],
            },
          },
          {
            title: "Human-Centered Thinking & Empathy",
            description: "Empati, kullanıcıyı anlamak, sempati ise kullanıcıya acımaktır. UX'te empati: kullanıcıyı suçlamamayı, sistemin neden hata yaptığını sorgulamayı sağlar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Empathy vs Sympathy in UX", url: "https://www.nngroup.com/articles/empathy-vs-sympathy/" },
                  { title: "Building Empathy Through Research", url: "https://www.nngroup.com/articles/building-empathy/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Empathy in UX Design – NNGroup", url: "https://www.youtube.com/results?search_query=empathy+ux+design+nngroup" },
                  { title: "How to Build Empathy as a Designer – AJ&Smart", url: "https://www.youtube.com/results?search_query=build+empathy+designer+aj+smart" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Son kullandığın bir uygulamada hata aldığını düşün",
                "Hata mesajı kullanıcıyı suçluyor mu?",
                "Mesaj daha empatik nasıl yazılabilirdi?",
              ],
            },
          },
          {
            title: "Basic Design Principles",
            description: "Bu prensipler, tüm UX kararlarının temelidir: Görsel hiyerarşi, Tutarlılık, Geri bildirim, Basitlik. Bunlar yoksa kullanıcı düşünmek zorunda kalır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Visual Hierarchy in UX", url: "https://www.nngroup.com/articles/visual-hierarchy/" },
                  { title: "Consistency in UX Design", url: "https://www.nngroup.com/articles/consistency-heuristic/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Design Principles for UX Designers – NNGroup", url: "https://www.youtube.com/results?search_query=design+principles+ux+designers+nngroup" },
                  { title: "Visual Hierarchy Explained – DesignCourse", url: "https://www.youtube.com/results?search_query=visual+hierarchy+explained+designcourse" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı gözünün önüne getir",
                "İlk baktığında gözün nereye gidiyor?",
                "Bu bilinçli mi, rastgele mi?",
                "Kullanıcıdan beklenen aksiyon net mi?",
              ],
            },
          },
        ],
      },
      {
        title: "2. Product & Design Process",
        description: "UX'in ürün geliştirme sürecindeki yerini ve çalışma biçimini anlamak.",
        topics: [
          {
            title: "Product Lifecycle (Discovery → Delivery)",
            description: "Ürün geliştirme süreci iki ana fazda ilerler: Discovery (Doğru problemi bulmak) ve Delivery (Bulduğun problemi doğru çözmek). UX'in asıl gücü discovery aşamasında ortaya çıkar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Discovery vs Delivery in UX", url: "https://www.nngroup.com/articles/discovery-delivery/" },
                  { title: "UX Activities in the Product Lifecycle", url: "https://www.nngroup.com/articles/ux-product-lifecycle/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Discovery vs Delivery Explained – NNGroup", url: "https://www.youtube.com/results?search_query=discovery+vs+delivery+nngroup" },
                  { title: "Product Discovery Explained – Teresa Torres", url: "https://www.youtube.com/results?search_query=product+discovery+teresa+torres" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Kullandığın bir ürün düşün",
                "Bu ürün sence gerçek bir problemi çözüyor mu?",
                "Bu problem discovery'de yakalanmış gibi mi duruyor?",
                "Yoksa sonradan 'eklenmiş' mi?",
              ],
            },
          },
          {
            title: "Double Diamond & Design Thinking Overview",
            description: "Double Diamond, tasarım sürecini genişlet → daralt mantığıyla açıklar: 1) Discover (Problemi keşfet), 2) Define (Doğru problemi tanımla), 3) Develop (Çözümler üret), 4) Deliver (Test et ve iyileştir). Bu model, 'ilk akla gelen çözümü' yapmamayı öğretir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Design Thinking 101", url: "https://www.nngroup.com/articles/design-thinking/" },
                  { title: "The Double Diamond Model", url: "https://www.nngroup.com/articles/double-diamond/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Double Diamond Explained – NNGroup", url: "https://www.youtube.com/results?search_query=double+diamond+nngroup" },
                  { title: "Design Thinking in 5 Minutes – AJ&Smart", url: "https://www.youtube.com/results?search_query=design+thinking+5+minutes+aj+smart" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir problem cümlesi yaz: '__________ uygulamasında kullanıcılar __________ yaparken zorlanıyor.'",
                "Şimdi sor: Bu gerçekten problem mi, yoksa çözüm mü?",
                "'Define' aşamasında net mi?",
              ],
            },
          },
          {
            title: "Agile & Lean Basics for Designers",
            description: "Agile ve Lean: UX'i hızlandırmak için değil, yanlış şeyi hızlı yapmamak için vardır. UX Designer için önemli olan: Sprint mantığını bilmek ve UX'in sprint'ten önce ve sonra da var olduğunu anlamak.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Agile UX Basics", url: "https://www.nngroup.com/articles/agile-ux/" },
                  { title: "Lean UX Principles", url: "https://www.nngroup.com/articles/lean-ux/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Agile UX Explained – NNGroup", url: "https://www.youtube.com/results?search_query=agile+ux+nngroup" },
                  { title: "Lean UX Overview – Jeff Gothelf", url: "https://www.youtube.com/results?search_query=lean+ux+jeff+gothelf" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir sprint düşün (2 hafta)",
                "UX bu sprint'in neresinde olmalı?",
                "Sence UX sadece 'ticket' mı üretir?",
              ],
            },
          },
          {
            title: "Problem Framing",
            description: "Problem framing: 'Ne yapalım?'dan önce 'Asıl sorun ne?'yi netleştirme sürecidir. Yanlış çerçevelenen problem, ne kadar iyi tasarlanırsa tasarlansın başarısız olur.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Problem Statements in UX", url: "https://www.nngroup.com/articles/problem-statements/" },
                  { title: "Framing UX Problems", url: "https://www.nngroup.com/articles/framing-problems/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Frame UX Problems – NNGroup", url: "https://www.youtube.com/results?search_query=frame+ux+problems+nngroup" },
                  { title: "Problem Statements Explained – AJ&Smart", url: "https://www.youtube.com/results?search_query=problem+statements+aj+smart" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu cümleyi doldur: 'Bu ürün, __________ kullanıcılarının __________ problemini çözmeyi amaçlıyor.'",
                "Şimdi sor: Bu cümlede çözüm var mı?",
                "Yoksa sadece problem mi?",
              ],
            },
          },
          {
            title: "Stakeholder Alignment Basics",
            description: "UX Designer yalnız çalışmaz. PM, developer, business ve stakeholder'larla aynı problemi aynı şekilde anlamak zorundadır. Bu hizalanma olmazsa: UX kararları 'kişisel fikir' gibi görünür ve güven azalır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Stakeholder Management for UX", url: "https://www.nngroup.com/articles/stakeholder-management/" },
                  { title: "Presenting UX Work", url: "https://www.nngroup.com/articles/presenting-ux/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Communicating UX Decisions – NNGroup", url: "https://www.youtube.com/results?search_query=communicating+ux+decisions+nngroup" },
                  { title: "How to Defend UX Decisions – DesignCourse", url: "https://www.youtube.com/results?search_query=defend+ux+decisions+designcourse" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir UX kararını anlatmayı dene:",
                "Kararı neden aldın?",
                "Hangi kullanıcı problemiyle ilişkili?",
                "Kanıtın ne?",
                "('Bence böyle daha iyi' demeden anlatmaya çalış)",
              ],
            },
          },
        ],
      },
      {
        title: "3. User Research Fundamentals",
        description: "Doğru soruyu sorma ve doğru yöntemi seçme kasını geliştirmek.",
        topics: [
          {
            title: "Research Mindset (questions, bias, ethics)",
            description: "UX Research bir teknik değil, zihniyet meselesidir. İyi research: Cevap aramaz, soru sorar. Kendi fikrini doğrulamaya çalışmaz. Kullanıcıyı yönlendirmez.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "UX Research: What It Is and Why It Matters", url: "https://www.nngroup.com/articles/ux-research/" },
                  { title: "Bias in UX Research", url: "https://www.nngroup.com/articles/research-bias/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Research Basics – NNGroup", url: "https://www.youtube.com/results?search_query=ux+research+basics+nngroup" },
                  { title: "Avoiding Bias in User Research – NNGroup", url: "https://www.youtube.com/results?search_query=avoiding+bias+user+research+nngroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ürünle ilgili varsayım yaz: 'Kullanıcılar __________ istiyor.'",
                "Şimdi sor: Bunu nereden biliyorum?",
                "Bu bir varsayım mı, kanıt mı?",
              ],
            },
          },
          {
            title: "Qualitative vs Quantitative Research",
            description: "Qualitative: 'Neden?' sorusuna cevap verir. Quantitative: 'Ne kadar?' sorusuna cevap verir. UX'te bu ikisi rakip değil, birlikte çalışır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Qualitative vs Quantitative Research", url: "https://www.nngroup.com/articles/quant-vs-qual/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Qual vs Quant UX Research – NNGroup", url: "https://www.youtube.com/results?search_query=qual+vs+quant+ux+research+nngroup" },
                  { title: "UX Research Methods Explained – NNGroup", url: "https://www.youtube.com/results?search_query=ux+research+methods+explained+nngroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu sorular için yöntemi seç:",
                "'Kullanıcılar neden bu ekranı terk ediyor?'",
                "'Kaç kişi bu özelliği kullanıyor?'",
                "(Hangisi qual, hangisi quant?)",
              ],
            },
          },
          {
            title: "Attitudinal vs Behavioral Data",
            description: "Attitudinal: Kullanıcının ne söylediği. Behavioral: Kullanıcının ne yaptığı. İnsanlar çoğu zaman söylediklerini yapmaz. UX Research'te bu fark kritiktir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Attitudinal vs Behavioral Research", url: "https://www.nngroup.com/articles/attitudinal-behavioral/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Attitudinal vs Behavioral UX Research – NNGroup", url: "https://www.youtube.com/results?search_query=attitudinal+behavioral+ux+research+nngroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir örnek yaz:",
                "Kullanıcı ne söyledi?",
                "Kullanıcı ne yaptı?",
                "Bu ikisi aynı mı?",
              ],
            },
          },
          {
            title: "Choosing the Right Research Method",
            description: "Her sorunun tek bir doğru yöntemi yoktur. Yanlış yöntemle yapılan research: zaman kaybıdır ve yanlış güven oluşturur. Önemli olan: Soruyla yöntemi eşleştirmek.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "When to Use Which UX Research Methods", url: "https://www.nngroup.com/articles/which-ux-research-methods/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Choosing the Right UX Research Method – NNGroup", url: "https://www.youtube.com/results?search_query=choosing+right+ux+research+method+nngroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu soruya yöntem seç: 'Kullanıcılar onboarding'i nerede terk ediyor?'",
                "Interview mi?",
                "Usability test mi?",
                "Analytics mi?",
                "Neden?",
              ],
            },
          },
          {
            title: "Research Planning (goals, participants, recruitment)",
            description: "İyi research: başlamadan önce planlanır ve 'Bir bakalım' diye yapılmaz. Research planı; hedefi, katılımcıyı ve yöntemi netleştirir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "UX Research Plan Template", url: "https://www.nngroup.com/articles/ux-research-plan/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Create a UX Research Plan – NNGroup", url: "https://www.youtube.com/results?search_query=create+ux+research+plan+nngroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Mini bir research plan yaz:",
                "Amaç:",
                "Katılımcı:",
                "Yöntem:",
                "(3 madde yeterli)",
              ],
            },
          },
        ],
      },
      {
        title: "4. User Interviews",
        description: "Görüşmeyi 'sohbet' değil, 'kanıt üretme' aracına çevirmek.",
        topics: [
          { title: "Writing a Discussion Guide" },
          { title: "Asking Better Questions (avoid leading questions)" },
          { title: "Moderation Skills" },
          { title: "Note Taking & Recording" },
          { title: "Post-Interview Synthesis Basics" },
        ],
      },
      {
        title: "5. Surveys & Quant Basics (Light)",
        description: "Junior seviyede 'temel nicel okuryazarlık' ve doğru kullanım.",
        topics: [
          { title: "When to Use Surveys" },
          { title: "Question Design (scales, wording pitfalls)" },
          { title: "Basic Data Reading (counts, percentages)" },
          { title: "Combining Qual + Quant (triangulation)" },
        ],
      },
      {
        title: "6. Synthesis & Insight",
        description: "Dağınık veriyi karar aldıran içgörüye dönüştürmek.",
        topics: [
          { title: "Affinity Mapping" },
          { title: "Themes & Patterns" },
          { title: "User Needs & Jobs-to-be-Done (intro level)" },
          { title: "Pain Points → Opportunities" },
          { title: "Prioritization Basics (impact/effort)" },
        ],
      },
      {
        title: "7. Personas & Journey Mapping",
        description: "Kullanıcıyı 'temsil edilebilir' hale getirip yolculuğu görünür kılmak.",
        topics: [
          { title: "Proto Personas vs Data-Driven Personas" },
          { title: "User Journeys vs Service Journeys" },
          { title: "Mapping Touchpoints & Emotions" },
          { title: "Identifying Moments of Truth" },
          { title: "Turning Journeys into Design Requirements" },
        ],
      },
      {
        title: "8. Information Architecture",
        description: "İçeriği ve navigasyonu kullanıcıların zihnine göre düzenlemek.",
        topics: [
          { title: "IA Basics" },
          { title: "Sitemaps & Structure" },
          { title: "Navigation Patterns" },
          { title: "Labeling & Terminology" },
          { title: "Card Sorting (open/closed)" },
          { title: "Tree Testing (intro)" },
        ],
      },
      {
        title: "9. Interaction Design",
        description: "Akışları, durumları ve ekran davranışlarını doğru kurgulamak.",
        topics: [
          { title: "Task Flows & User Flows" },
          { title: "State Design (empty, loading, error, success)" },
          { title: "Microinteractions" },
          { title: "Form Design Basics" },
          { title: "Error Prevention & Recovery" },
        ],
      },
      {
        title: "10. Wireframing & Prototyping",
        description: "Çözümü hızlı doğrulamak ve öğrenmeyi hızlandırmak.",
        topics: [
          { title: "Low-Fidelity Wireframes" },
          { title: "Mid-Fidelity Screens" },
          { title: "Prototyping for Testing (what to prototype / what not)" },
          { title: "Prototype Hygiene (naming, components, flow clarity)" },
        ],
      },
      {
        title: "11. Usability Testing",
        description: "Tasarımın 'çalışıp çalışmadığını' kanıtlamak.",
        topics: [
          { title: "Test Types (moderated / unmoderated)" },
          { title: "Task Writing & Scenarios" },
          { title: "Success Criteria & Metrics (task success, time, errors)" },
          { title: "Observation & Note Taking" },
          { title: "Reporting Findings & Recommendations" },
        ],
      },
      {
        title: "12. Heuristics & UX Principles",
        description: "Tasarımı hızlı değerlendirme ve sorunları diline dökebilme.",
        topics: [
          { title: "Nielsen's 10 Usability Heuristics" },
          { title: "Heuristic Evaluation Process" },
          { title: "Severity Ratings" },
          { title: "Turning Issues into Actionable Fixes" },
        ],
      },
      {
        title: "13. Accessibility & Inclusive Design",
        description: "Herkes için kullanılabilir deneyim tasarlamak (temel seviye).",
        topics: [
          { title: "Accessibility Basics" },
          { title: "WCAG Overview (intro)" },
          { title: "Color Contrast & Typography" },
          { title: "Keyboard & Focus (web)" },
          { title: "Accessible Forms & Errors" },
        ],
      },
      {
        title: "14. UX Writing & Content (Basics)",
        description: "Mikro metinlerle anlaşılabilirliği ve güveni artırmak.",
        topics: [
          { title: "Microcopy Principles" },
          { title: "Error Messages & Empty States" },
          { title: "Tone & Consistency" },
          { title: "Information Clarity (labels, buttons)" },
        ],
      },
      {
        title: "15. Measurement & Iteration (Basics)",
        description: "UX'in etkisini anlamak ve iterasyon kültürü.",
        topics: [
          { title: "UX Metrics (basic set: conversion, drop-off, task success)" },
          { title: "Qual Signals vs Quant Signals" },
          { title: "Experiment Mindset (A/B basics, guardrails)" },
          { title: "Continuous Improvement Loops" },
        ],
      },
      {
        title: "16. Collaboration & Delivery",
        description: "UX çıktısını ekip içinde 'işe dönüştürmek'.",
        topics: [
          { title: "Working with PM & Engineering" },
          { title: "Presenting Design Decisions" },
          { title: "Design Reviews" },
          { title: "Handoff Basics (what dev needs)" },
          { title: "Documentation Basics" },
        ],
      },
      {
        title: "17. Portfolio & Career",
        description: "Öğrendiklerini işe dönüştüren sunum.",
        topics: [
          { title: "Case Study Structure" },
          { title: "Showing Process (not only UI)" },
          { title: "Evidence & Outcomes" },
          { title: "Common Junior Mistakes" },
          { title: "Interview Prep Basics" },
        ],
      },
    ],
  },
  // Diğer roadmap'ler için eski yapıyı koruyalım (şimdilik)
  "ui-designer": {
    id: "ui-designer",
    title: "UI Designer",
    description: "Görsel tasarım prensiplerini, tipoğrafiyi, renk teorisini ve arayüz estetiğini öğrenerek güzel kullanıcı arayüzleri oluştur.",
    icon: "🎨",
    sections: [
      {
        title: "Temeller",
        description: "UI tasarımının temel prensipleri",
        topics: [
          { title: "UI Design Nedir?" },
          { title: "Görsel Hiyerarşi" },
          { title: "Grid Sistemleri & Layout" },
          { title: "Boşluk & Hizalama" },
          { title: "UI Designer'ın Rolü" },
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
        description: "Product design'ın temel kavramları",
        topics: [
          { title: "Product Design Nedir?" },
          { title: "Ürün Düşüncesi" },
          { title: "Ürün Yaşam Döngüsü" },
          { title: "Product Designer'ın Rolü" },
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
        description: "Design system'lerin temelleri",
        topics: [
          { title: "Design System Nedir?" },
          { title: "Design System vs Component Kütüphanesi" },
          { title: "Faydalar & Kullanım Alanları" },
          { title: "Ne Zaman Design System Oluşturulmalı" },
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
        description: "Design thinking'in temelleri",
        topics: [
          { title: "Design Thinking Nedir?" },
          { title: "Tarihçe & Kökenleri" },
          { title: "Bir Design Thinker'ın Zihin Yapısı" },
          { title: "Design Thinking Ne Zaman Kullanılır" },
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
              src="https://r.resimlink.com/9ezfkr.png"
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

      {/* Roadmap Content (Client Component) */}
      <RoadmapClient sections={roadmap.sections} />

      {/* CTA */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
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
