import Link from "next/link";
import { notFound } from "next/navigation";
import RoadmapClient from "./RoadmapClient";
import Header from "@/components/Header";

interface Resource {
  category: string;
  items: { title: string; url?: string }[];
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
  credits?: {
    name: string;
    role: string;
    company: string;
    photo: string;
    linkedin?: string;
  }[];
}

const roadmaps: Record<string, Roadmap> = {
  "ux-designer": {
    id: "ux-designer",
    title: "UX Designer",
    description: "Kullanıcı araştırması, wireframe ve kullanıcı odaklı tasarım prensiplerinde ustalaşarak anlamlı kullanıcı deneyimleri oluştur.",
    icon: "🎯",
    sections: [
      {
        title: "UX Temelleri (UX Foundations)",
        description: "UX'in ne olduğunu, problem çözme yaklaşımını ve temel kavramları oturtmak.",
        topics: [
          {
            title: "UX Design Nedir?",
            description: "UX Design, bir ürünün kullanıcı için ne kadar anlaşılır, verimli ve tatmin edici olduğunu tasarlama sürecidir. Sadece ekran çizmek değil; problemi anlamak, çözümü test etmek ve iyileştirmektir.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "What is UX Design?", url: "https://www.interaction-design.org/literature/topics/ux-design" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "What is UX Design? – AJ&Smart", url: "https://www.youtube.com/@ajsmart" },
                  { title: "UX Design in 5 Minutes – NNGroup", url: "https://www.youtube.com/@NNgroup" },
                  { title: "UX Design Explained for Beginners – DesignCourse", url: "https://www.youtube.com/@DesignCourse" },
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
                  { title: "UX vs UI vs Product Design", url: "https://www.nngroup.com/videos/ux-vs-ui/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX vs UI vs Product Design Explained – Jesse Showalter", url: "https://www.youtube.com/@jesseshowalter" },
                  { title: "UX, UI and Product Design Differences – AJ&Smart", url: "https://www.youtube.com/@ajsmart" },
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
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "User-Centered Design Basics", url: "https://www.interaction-design.org/literature/topics/user-centered-design" },
                  { title: "Empathy in UX Design", url: "https://www.interaction-design.org/literature/topics/empathize" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "User-Centered Design Explained – NNGroup", url: "https://www.nngroup.com/videos/explain-ux-user-centered-design/" },
                  { title: "What Is User-Centered Design? – UX Mastery", url: "https://www.youtube.com/c/Uxmastery" },
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
                  { title: "Empathy vs Sympathy in UX", url: "https://www.nngroup.com/articles/sympathy-vs-empathy-ux/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Empathy in UX Design – NNGroup" },
                  { title: "How to Build Empathy as a Designer – AJ&Smart" },
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
            title: "Temel Tasarım Prensipleri",
            description: "Bu prensipler, tüm UX kararlarının temelidir: Görsel hiyerarşi, Tutarlılık, Geri bildirim, Basitlik. Bunlar yoksa kullanıcı düşünmek zorunda kalır.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Visual Hierarchy in UX", url: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/" },
                  { title: "Consistency in UX Design", url: "https://uxmag.com/articles/consistency-in-ui-ux-design-the-key-to-user-satisfaction" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Design Principles for UX Designers – NNGroup" },
                  { title: "Visual Hierarchy Explained – DesignCourse" },
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
        title: "Ürün & Tasarım Süreci (Product & Design Process)",
        description: "UX'in ürün geliştirme sürecindeki yerini ve çalışma biçimini anlamak.",
        topics: [
          {
            title: "Product Lifecycle (Discovery → Delivery)",
            description: "Ürün geliştirme süreci iki ana fazda ilerler: Discovery (Doğru problemi bulmak) ve Delivery (Bulduğun problemi doğru çözmek). UX'in asıl gücü discovery aşamasında ortaya çıkar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Upfront vs. Continuous Discovery", url: "https://www.nngroup.com/videos/upfront-vs-continuous-discovery/" },
                  { title: "UX Activities in the Product Lifecycle", url: "https://media.nngroup.com/media/articles/attachments/ux_methods_activities_NNg_A4.pdf" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Discovery in Agile – NNGroup", url: "https://www.nngroup.com/videos/discovery-in-agile/" },
                  { title: "Product Discovery – Teresa Torres", url: "https://www.producttalk.org/" },
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
            title: "Double Diamond & Design Thinking'e Genel Bakış",
            description: "Double Diamond, tasarım sürecini genişlet → daralt mantığıyla açıklar: 1) Discover (Problemi keşfet), 2) Define (Doğru problemi tanımla), 3) Develop (Çözümler üret), 4) Deliver (Test et ve iyileştir). Bu model, 'ilk akla gelen çözümü' yapmamayı öğretir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Design Thinking 101", url: "https://www.nngroup.com/articles/design-thinking/" },
                  { title: "Discovery: Definition (Double Diamond)", url: "https://www.nngroup.com/articles/discovery-phase/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Design Thinking 101 – NNGroup", url: "https://www.nngroup.com/videos/design-thinking/" },
                  { title: "AJ&Smart YouTube Channel", url: "https://www.youtube.com/@ajsmart" },
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
            title: "Agile & Lean Designer Temelleri",
            description: "Agile ve Lean: UX'i hızlandırmak için değil, yanlış şeyi hızlı yapmamak için vardır. UX Designer için önemli olan: Sprint mantığını bilmek ve UX'in sprint'ten önce ve sonra da var olduğunu anlamak.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Agile UX Basics", url: "https://www.nngroup.com/articles/lean-ux-agile-study-guide/" },
                  { title: "Lean UX Principles", url: "https://www.interaction-design.org/literature/topics/lean-ux" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Agile UX Explained – NNGroup" },
                  { title: "Lean UX Overview – Jeff Gothelf" },
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
            title: "Problem Tanımları",
            description: "Problem framing: 'Ne yapalım?'dan önce 'Asıl sorun ne?'yi netleştirme sürecidir. Yanlış çerçevelenen problem, ne kadar iyi tasarlanırsa tasarlansın başarısız olur.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "What are Problem Statements?", url: "https://www.interaction-design.org/literature/topics/problem-statements" },
                  { title: "Problem Statements in UX", url: "https://www.nngroup.com/articles/problem-statements/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Frame UX Problems – NNGroup" },
                  { title: "Problem Statements Explained – AJ&Smart" },
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
            title: "Stakeholder Alignment Temelleri",
            description: "UX Designer yalnız çalışmaz. PM, developer, business ve stakeholder'larla aynı problemi aynı şekilde anlamak zorundadır. Bu hizalanma olmazsa: UX kararları 'kişisel fikir' gibi görünür ve güven azalır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Stakeholder Management for UX", url: "https://www.nngroup.com/articles/stakeholder-engagement/" },
                  { title: "Presenting UX Work", url: "https://www.nngroup.com/articles/presenting-remotely/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Communicating UX Decisions – NNGroup" },
                  { title: "How to Defend UX Decisions – DesignCourse" },
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
        title: "Kullanıcı Araştırması Temelleri (User Research Fundamentals)",
        description: "Doğru soruyu sorma ve doğru yöntemi seçme kasını geliştirmek.",
        topics: [
          {
            title: "Research Mindset (soru, bias, etik)",
            description: "UX Research bir teknik değil, zihniyet meselesidir. İyi research: Cevap aramaz, soru sorar. Kendi fikrini doğrulamaya çalışmaz. Kullanıcıyı yönlendirmez.",
            resources: [
              {
                category: "📘 Maze",
                items: [
                  { title: "UX Research: What It Is and Why It Matters", url: "https://maze.co/guides/ux-research/" },
                  { title: "Bias in UX Research", url: "https://maze.co/guides/ux-cognitive-biases/types/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Research Basics – NNGroup" },
                  { title: "Avoiding Bias in User Research – NNGroup" },
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
                category: "📘 Maze",
                items: [
                  { title: "Qualitative vs Quantitative Research", url: "https://maze.co/guides/ux-research/qualitative-ux-research-methods/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Qual vs Quant UX Research – NNGroup" },
                  { title: "UX Research Methods Explained – NNGroup" },
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
                  { title: "Attitudinal vs Behavioral UX Research – NNGroup" },
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
            title: "Doğru Araştırma Yöntemini Seçmek",
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
                  { title: "Choosing the Right UX Research Method – NNGroup" },
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
            title: "Research Planlama (hedefler, katılımcı, recruitment)",
            description: "İyi research: başlamadan önce planlanır ve 'Bir bakalım' diye yapılmaz. Research planı; hedefi, katılımcıyı ve yöntemi netleştirir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "UX Research Plan Template", url: "https://www.nngroup.com/articles/pm-research-plan/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Create a UX Research Plan – NNGroup" },
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
        title: "Kullanıcı Görüşmeleri (User Interviews)",
        description: "Görüşmeyi 'sohbet' değil, 'kanıt üretme' aracına çevirmek.",
        topics: [
          {
            title: "User Interviews 101",
            description: "İyi bir interview, görüşme sırasında değil öncesinde kazanılır. Planlama aşamasında net değilse: sorular dağılır ve sonuçlar belirsiz olur. Interview planı, neyi öğrenmek istediğini netleştirir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "User Interviews 101", url: "https://www.nngroup.com/articles/user-interviews/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Plan User Interviews – NNGroup" },
                  { title: "User Interview Planning – UX Mastery" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu soruya cevap yaz: 'Bu interview sonunda neyi öğrenmiş olmak istiyorum?'",
                "Cevabın net değilse interview da net değildir.",
              ],
            },
          },
          {
            title: "Interview Soruları Yazma",
            description: "İyi soru: yönlendirmez, varsayım içermez, 'neden'i açığa çıkarır. Kötü soru, kullanıcıdan onay almaya çalışır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Writing an Effective Guide for a UX Interview", url: "https://www.nngroup.com/articles/interview-guide/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Ask Better UX Interview Questions – NNGroup" },
                  { title: "Avoid Leading Questions in UX Research – NNGroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bu soruyu düzelt: 'Bu özelliği beğendiniz mi?'",
                "Daha iyi bir soru nasıl olur?",
              ],
            },
          },
          {
            title: "Görüşme Yürütme (Moderasyon)",
            description: "Interview sırasında UX Designer: konuşmaz, yönlendirmez, savunmaya geçmez. Rolün: dinlemek, derinleştirmek, sessizliği tolere etmek.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Moderating User Interviews", url: "https://www.interaction-design.org/literature/article/how-to-moderate-user-interviews" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Moderate User Interviews – NNGroup" },
                  { title: "UX Interview Moderation Tips – AJ&Smart" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir kullanıcı bir şey söyledi ve sustu. Ne yaparsın?",
                "Hemen başka soruya mı geçersin?",
                "Yoksa sessizliği biraz daha mı beklersin?",
                "Neden?",
              ],
            },
          },
          {
            title: "Not Alma & Kayıt",
            description: "Interview sırasında her şeyi hatırlamak mümkün değildir. Ama doğru not almak mümkündür. Amaç: kelime kelime yazmak değil, anlamlı parçaları yakalamaktır.",
            resources: [
              {
                category: "📘 Medium",
                items: [
                  { title: "Taking Notes in UX Research", url: "https://medium.com/@AndrewJHCI/taking-research-notes-for-ux-ea1cb516fb64" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Research Note Taking – NNGroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir interview notu düşün: 'User confused'",
                "Bunu daha iyi bir not haline getir:",
                "Ne oldu?",
                "Ne yapmaya çalışıyordu?",
                "Nerede takıldı?",
              ],
            },
          },
          {
            title: "Görüşme Sonrası Sentez (Intro)",
            description: "Interview bittiğinde iş bitmez. Asıl değer sonrasında ortaya çıkar. Amaç: tekil cümlelerden tekrar eden desenler çıkarmaktır.",
            resources: [
              {
                category: "📘 Looppanel",
                items: [
                  { title: "Synthesis in UX Research", url: "https://www.looppanel.com/blog/ux-research-synthesis" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Synthesize UX Research – NNGroup" },
                  { title: "Affinity Mapping Explained – AJ&Smart" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "3 farklı kullanıcı aynı noktada zorlandıysa:",
                "Bu: tekil bir görüş mü?",
                "Yoksa bir pattern mi?",
                "Ne zaman 'insight' dersin?",
              ],
            },
          },
        ],
      },
      {
        title: "Anketler & Nicel Temeller (Light) (Surveys & Quant Basics)",
        description: "Junior seviyede 'temel nicel okuryazarlık' ve doğru kullanım.",
        topics: [
          {
            title: "Anketleri Ne Zaman Kullanmalı?",
            description: "Survey'ler: davranışı keşfetmek için değil, davranışın yaygınlığını ölçmek için kullanılır. Yanlış yerde kullanılan survey: yanlış güven üretir ve 'kullanıcılar böyle istiyor' yanılgısı yaratır.",
            resources: [
              {
                category: "📘 Looppanel",
                items: [
                  { title: "Survey vs User Interviews", url: "https://www.looppanel.com/blog/research-methods-survey-vs-interview" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Surveys Explained – NNGroup" },
                  { title: "When NOT to Use Surveys – NNGroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu soruya cevap ver: 'Kullanıcılar bu özelliği neden kullanmıyor?'",
                "Survey uygun mu?",
                "Değilse neden?",
              ],
            },
          },
          {
            title: "Soru Tasarımı Temelleri",
            description: "Survey'de en kritik şey: sorunun kendisidir. Kötü yazılmış sorular: kullanıcıyı yönlendirir, sonuçları çarpıtır ve yanlış kararlar aldırır.",
            resources: [
              {
                category: "📘 Maze",
                items: [
                  { title: "Writing Survey Questions", url: "https://maze.co/guides/ux-surveys/questions/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Writing Better Survey Questions – NNGroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bu soruyu düzelt: 'Bu özelliği ne kadar beğendiniz?'",
                "Daha tarafsız bir versiyonunu yaz.",
              ],
            },
          },
          {
            title: "Ölçekler, Değerlendirme ve Tuzaklar",
            description: "Likert scale, rating ve score'lar: doğru kullanılırsa anlamlı, yanlış kullanılırsa gürültü üretir. Junior'ların en sık yaptığı hata: sonuçları bağlamdan koparmak.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Rating Scales", url: "https://www.nngroup.com/articles/rating-scales/" },
                  { title: "Rating Scales 2", url: "https://www.interaction-design.org/literature/article/rating-scales-for-ux-research" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Survey Scales Explained – NNGroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "1–5 scale kullandığını düşün.",
                "3 ne anlama geliyor?",
                "Kullanıcı için net mi?",
              ],
            },
          },
          {
            title: "Temel Veri Okuma (Sayılar, Yüzdeler)",
            description: "Nicel veri: tek başına karar verdirmez, yön gösterir. Ama: %5 mi %50 mi olduğunu ayırt edemeyen UX Designer veriyi yanlış yorumlar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Interpreting Quantitative UX Data", url: "https://www.nngroup.com/articles/quantitative-user-research-methods/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Reading UX Metrics – NNGroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "100 kişiden 5'i bir problem yaşadıysa:",
                "Bu önemsiz mi?",
                "Yoksa kritik mi?",
                "Ne zaman önemlidir?",
              ],
            },
          },
          {
            title: "Nitel + Nicel Birleştirme (Triangulation)",
            description: "En güçlü UX kararları: tek bir kaynaktan değil, birden fazla sinyalden gelir. Bu yaklaşıma triangulation denir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Triangulation in UX Research", url: "https://www.nngroup.com/articles/triangulation-better-research-results-using-multiple-ux-methods/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Combining Qual and Quant UX Research – NNGroup" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu sinyalleri birleştir:",
                "Interview: 'Bulmak zor'",
                "Analytics: Drop-off yüksek",
                "Survey: 'Kafa karıştırıcı'",
                "Bunlar birlikte sana ne söylüyor?",
              ],
            },
          },
        ],
      },
      {
        title: "Sentez & İçgörü (Synthesis & Insight)",
        description: "Dağınık veriyi karar aldıran içgörüye dönüştürmek.",
        topics: [
          {
            title: "Affinity Diagramlar",
            description: "Affinity mapping, araştırma notlarını benzerliklerine göre gruplayarak tema çıkarmanın en pratik yollarından biridir. Özellikle interview sonrası 'kaosu düzene' çevirir.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Affinity Diagrams", url: "https://www.interaction-design.org/literature/topics/affinity-diagrams" },
                  { title: "Affinity Diagramming for Collaboratively Sorting UX Findings and Design Ideas", url: "https://www.nngroup.com/articles/affinity-diagram/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Elinde 10–15 interview notu olduğunu varsay",
                "Her notu tek cümle olacak şekilde yaz",
                "Benzer olanları grupla (3–5 grup hedefle)",
                "Her gruba bir tema adı ver (ör. 'Güven eksikliği', 'Bulunabilirlik sorunu')",
                "Her tema için 1 adet 'bu ne anlama geliyor?' cümlesi yaz",
              ],
            },
          },
          {
            title: "Tematik Analiz (Kodlama → Tema)",
            description: "Thematic analysis; veriyi kodlayıp (tag'leyip) tekrar eden örüntülerden tema üretme yaklaşımıdır. 'Affinity mapping' daha hızlı, thematic analysis daha sistematik ilerler.",
            resources: [
              {
                category: "📘 ScienceDirect",
                items: [
                  { title: "Thematic Analysis (Article)", url: "https://www.sciencedirect.com/science/article/pii/S2949916X25000222" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "3 adımda mini coding:",
                "10 cümlelik not seç",
                "Her cümleye 1–2 'kod' yaz (ör. confusion, trust, time pressure)",
                "Kodları gruplayıp 2–3 tema çıkar ve tema başına 1 örnek alıntı ekle",
              ],
            },
          },
          {
            title: "Bulguları İçgörüye Çevirme (So What?)",
            description: "Bulgu (finding) ≠ içgörü (insight). Finding: 'Kullanıcılar X ekranında zorlandı.' Insight: 'Zorlanma nedeni Y; çünkü Z; bu da şu aksiyonu gerektiriyor.'",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Analyzing Qualitative Data with Spreadsheet", url: "https://www.nngroup.com/articles/thematic-analysis/" },
                  { title: "Workshopping UX Research with Stakeholders", url: "https://www.nngroup.com/articles/ux-research-workshops/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu Insight template'ini doldur:",
                "Observation: Kullanıcılar … yaparken … yaşıyor",
                "Because: Çünkü …",
                "Impact: Bu yüzden … (hedef/iş/deneyim etkisi)",
                "Opportunity: Bu problemi azaltmak için …",
              ],
            },
          },
          {
            title: "Önceliklendirme Temelleri (Impact / Effort)",
            description: "Her bulgu aynı önemde değildir. Junior'lar genelde 'en çok duyduğum'u seçer. Doğrusu: etki + maliyet + risk + hedef uyumu.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "UX Research Workshops", url: "https://www.nngroup.com/articles/ux-research-workshops/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "3 bulgu seç ve tablo yap:",
                "Bulgu | Etki (1–5) | Efor (1–5) | Öncelik (kısa gerekçe)",
              ],
            },
          },
        ],
      },
      {
        title: "Persona & Journey Mapping",
        description: "Kullanıcıyı 'temsil edilebilir' hale getirip yolculuğu görünür kılmak.",
        topics: [
          {
            title: "Proto Persona vs Data-Driven Persona",
            description: "Proto Persona: Hızlı varsayım, discovery başlangıcı. Data-Driven Persona: Research ile doğrulanmış, karar destekleyici. Junior'ların en sık hatası: persona'yı kurgusal karakter sanmak.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Personas – A Simple Introduction", url: "https://www.interaction-design.org/literature/article/personas-why-and-how-you-should-use-them" },
                  { title: "Personas vs. Proto-Personas", url: "https://medium.com/@karimcmahon/proto-personas-vs-persona-s-db8873a2d2e4" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu soruya cevap yaz: Bu persona:",
                "Varsayım mı?",
                "Yoksa research'e mi dayanıyor?",
                "Eğer varsayımsa, nasıl doğrulanabilir?",
              ],
            },
          },
          {
            title: "User Journey vs Customer Journey",
            description: "User Journey: Tek bir ürün içindeki deneyim. Customer Journey: Ürün + temas noktaları + zaman. UX kararları çoğu zaman journey görülmeden alınır.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Journey Mapping 101", url: "https://www.nngroup.com/articles/journey-mapping-101/" },
                  { title: "User Journey vs Customer Journey: Understanding Key Differences", url: "https://aguayo.co/en/blog-aguayo-user-experience/user-journey-vs-customer-journey/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Seçtiğin bir ürün için:",
                "Journey nerede başlıyor?",
                "Gerçekten ilk ekran mı?",
              ],
            },
          },
          {
            title: "Touchpoint & Duygu Haritalama",
            description: "Journey map sadece adımlardan oluşmaz. Kullanıcının: ne hissettiği, nerede gerildiği, nerede rahatladığı tasarım kararları için kritik sinyaldir.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "UX Mapping Methods Compared: A Cheat Sheet", url: "https://www.nngroup.com/articles/ux-mapping-cheat-sheet/" },
                  { title: "Emotional Journey Mapping", url: "https://uxdesign.cc/a-guide-to-emotional-journey-mapping-36725933e99f" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir journey adımı seç:",
                "Kullanıcı burada ne hissediyor?",
                "Bu duygu tasarımla nasıl değiştirilebilir?",
              ],
            },
          },
          {
            title: "Moments of Truth",
            description: "Moment of Truth, kullanıcının: ürüne güvenip güvenmemeye, devam edip etmemeye karar verdiği anlardır. Bu anlar kaçırılırsa: küçük UX hataları büyük kayıplara dönüşür.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Moments of Truth in UX", url: "https://www.interaction-design.org/literature/topics/moment-of-truth" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Journey'de şu soruyu sor:",
                "'Kullanıcı bu adımda neden vazgeçebilir?'",
              ],
            },
          },
          {
            title: "Etkili Journey Map İpuçları",
            description: "Journey map bir çıktı değil, araçtır. Asıl değer: journey'den tasarım gereksinimi çıkarmakta.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Top Tips to Create Effective Journey Maps", url: "https://www.interaction-design.org/literature/article/top-things-to-learn-from-ixdf-journey-mapping-course" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir journey adımından şunu çıkar:",
                "'Bu adımda tasarım şunu yapmalı çünkü …'",
              ],
            },
          },
        ],
      },
      {
        title: "Bilgi Mimarisi (Information Architecture)",
        description: "İçeriği ve navigasyonu kullanıcıların zihnine göre düzenlemek.",
        topics: [
          {
            title: "IA Temelleri (Mental Models & Structure)",
            description: "IA'nın temeli, kullanıcıların: bilgiyi nasıl grupladığını, kavramları nasıl adlandırdığını anlamaktır. Bu yüzden IA kararları 'iç ekip dili' ile değil, kullanıcı dili ile alınır.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "What is information architecture?", url: "https://www.uxdesigninstitute.com/blog/what-is-information-architecture/" },
                  { title: "What is information architecture? (IDF)", url: "https://www.interaction-design.org/literature/topics/information-architecture" },
                  { title: "Mental Models in UX", url: "https://www.nngroup.com/articles/mental-models/" },
                  { title: "Mental Models in UX (IDF)", url: "https://www.interaction-design.org/literature/topics/mental-models" },
                  { title: "Mental Model", url: "https://lawsofux.com/mental-model/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ürün seç",
                "Menü başlıklarını oku",
                "Kullanıcı olmayan biri bu başlıklardan ne beklerdi?",
                "Beklenti ile içerik örtüşüyor mu?",
              ],
            },
          },
          {
            title: "Site Haritaları & İçerik Yapısı",
            description: "Sitemap: sayfaların listesinden ibaret değildir, öncelik ve hiyerarşi gösterir. Yanlış sitemap: kullanıcıyı derinlere iter, önemli içeriği gizler.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Sitemaps: UX Best Practices", url: "https://www.interaction-design.org/literature/article/ux-sitemap" },
                  { title: "Content Hierarchy in UX", url: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "10 sayfalık hayali bir ürün düşün",
                "En önemli 3 sayfa hangisi?",
                "Bunlar sitemap'te en üstte mi?",
              ],
            },
          },
          {
            title: "Navigasyon Tasarımı",
            description: "Navigasyon: kullanıcıya 'neredeyim?' ve 'buradan nereye gidebilirim?' sorularının cevabını verir. İyi navigasyon düşünmeden kullanılır.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Navigation Design Basics", url: "https://www.interaction-design.org/literature/topics/navigation" },
                  { title: "Menu-Design Checklist: 17 UX Guidelines", url: "https://www.nngroup.com/articles/menu-design/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir navigasyon düşün:",
                "İlk bakışta kaç seçenek var?",
                "Hepsi gerçekten gerekli mi?",
              ],
            },
          },
          {
            title: "Etiketleme & Terminoloji",
            description: "Kullanıcılar menüyü okuyarak değil, tahmin ederek kullanır. Bu yüzden: jargon ve iç ekip terimleri IA'yı bozar.",
            resources: [
              {
                category: "📘 Medium",
                items: [
                  { title: "Terminology & UX Writing", url: "https://medium.com/@autumnkotsiuba/terminology-in-ux-writing-292c45fdc3c6" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir menü başlığı seç:",
                "Bu başlık kullanıcıya ne vaat ediyor?",
                "İçerik bu vaadi karşılıyor mu?",
              ],
            },
          },
          {
            title: "Card Sorting (Open / Closed)",
            description: "Card sorting, kullanıcıların bilgiyi nasıl grupladığını görmenin en pratik yoludur. Open card sorting: keşif, Closed card sorting: doğrulama.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Card Sorting: The Ultimate Guide (in 2025)", url: "https://www.interaction-design.org/literature/article/the-pros-and-cons-of-card-sorting-in-ux-research" },
                  { title: "Card Sorting: Uncover Users", url: "https://www.nngroup.com/articles/card-sorting-definition/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "8–10 içerik başlığı yaz",
                "Bunları kullanıcı gözüyle grupla",
                "Kendi grubun ile kullanıcının grubu aynı mı?",
              ],
            },
          },
          {
            title: "Tree Testing (Intro)",
            description: "Tree testing: IA'yı arayüz olmadan test etmeyi sağlar ve 'Bulabiliyor mu?' sorusuna net cevap verir.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Tree Testing 101", url: "https://www.qualtrics.com/articles/strategy-research/tree-testing-101-elevating-your-user-experience/" },
                  { title: "Tree Testing: Fast, Iterative Evaluation of Menu Labels and Categories", url: "https://www.nngroup.com/articles/tree-testing/" },
                  { title: "Tree Testing: A Complete Guide", url: "https://www.interaction-design.org/literature/article/tree-testing-ux" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir kullanıcıdan şunu iste: 'X içeriğini bul.'",
                "Kaç adımda buldu?",
                "Nerede şaşırdı?",
              ],
            },
          },
        ],
      },
      {
        title: "Etkileşim Tasarımı (Temel) (Interaction Design)",
        description: "Akışları, durumları ve ekran davranışlarını doğru kurgulamak.",
        topics: [
          {
            title: "Task Flows & User Flows",
            description: "Task flow: Kullanıcının bir görevi tamamlamak için attığı adımlar. User flow: Kullanıcının ürün içinde izlediği yol (karar noktaları dahil). Junior'ların en sık hatası: flow'u ekran listesi sanmak.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "User Flows vs Task Flows", url: "https://www.nudgenow.com/blogs/task-flow-vs-user-flow-in-ux-design" },
                  { title: "When to Use Which UX Deliverables", url: "https://www.interaction-design.org/literature/topics/ux-deliverables" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir görevi seç: 'Şifre sıfırla'",
                "Şimdi task flow çiz: Adımlar neler?",
                "User flow'a çevir: Karar noktaları nerede?",
              ],
            },
          },
          {
            title: "State Tasarımı (Empty, Loading, Error, Success)",
            description: "Ekranın her durumu için tasarım gerekir: Empty (içerik yok), Loading (veri yükleniyor), Error (hata oluştu), Success (başarılı). Bu durumlar tasarlanmazsa: kullanıcı ne olduğunu anlamaz.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Designing Empty States in Complex Applications: 3 Guidelines", url: "https://www.nngroup.com/articles/empty-state-interface-design/" },
                  { title: "Empty State UX Examples & Best Practices", url: "https://www.pencilandpaper.io/articles/empty-states" },
                  { title: "Loading Indicators", url: "https://uxdesign.cc/loading-progress-indicators-ui-components-series-f4b1fc35339a" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran düşün: 'Favori ürünler listesi'",
                "Empty state nasıl görünür?",
                "Loading state?",
                "Error state?",
                "Her biri kullanıcıya ne diyor?",
              ],
            },
          },
          {
            title: "Microinteractions",
            description: "Microinteraction: Küçük, tek amaçlı etkileşimler (beğen butonu, toggle, hover feedback). Bunlar göze çarpmaz ama eksikse: sistem cansız hissedilir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Microinteractions in UX", url: "https://www.nngroup.com/articles/microinteractions/" },
                  { title: "Animation in UX", url: "https://www.nngroup.com/articles/animation-purpose-ux/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir butona tıkladığını düşün",
                "Tıklama anında ne olur?",
                "Kullanıcı feedback alıyor mu?",
                "Almazsa ne hisseder?",
              ],
            },
          },
          {
            title: "Form Tasarımı Temelleri",
            description: "Form tasarımı: kullanıcının 'ne yapacağını bildiği' ama 'yapmaktan hoşlanmadığı' bir deneyimdir. Bu yüzden: hata toleransı, netlik ve kolaylık kritiktir.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Form Design Best Practices", url: "https://cxl.com/blog/form-design-best-practices/" },
                  { title: "Website Forms Usability: Top 10 Recommendations", url: "https://www.nngroup.com/articles/web-form-design/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir form düşün: kayıt formu",
                "Kaç alan var?",
                "Hepsi gerçekten gerekli mi?",
                "Kullanıcı hata yaptığında ne olur?",
              ],
            },
          },
          {
            title: "Hata Önleme & Recovery",
            description: "Hata önleme: Kullanıcının hata yapmasını zorlaştırmak. Error recovery: Hata yaptığında kolayca düzeltebilmesini sağlamak. Kötü tasarım: hata mesajını gösterir ama çözüm sunmaz.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Preventing User Errors: Avoiding Unconscious Slips", url: "https://www.nngroup.com/articles/slips/" },
                  { title: "Error-Message Guidelines", url: "https://www.nngroup.com/articles/error-message-guidelines/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir hata mesajı yaz: 'Geçersiz giriş'",
                "Şimdi düzelt:",
                "Ne yanlış?",
                "Nasıl düzeltilir?",
                "Kullanıcıya rehberlik ediyor mu?",
              ],
            },
          },
        ],
      },
      {
        title: "Wireframing & Prototyping",
        description: "Çözümü hızlı doğrulamak ve öğrenmeyi hızlandırmak.",
        topics: [
          {
            title: "Low-Fidelity Wireframes",
            description: "Low-fi wireframe'ler: hızlıdır, ucuzdur, tartışmaya açıktır. Bu yüzden discovery ve erken çözüm aşamasında idealdir.",
            resources: [
              {
                category: "📘 UX Pilot",
                items: [
                  { title: "Low-Fidelity Wireframes", url: "https://uxpilot.ai/blogs/low-fidelity-wireframe" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran düşün",
                "5 dakikada kâğıt üstüne çiz",
                "UI detayı eklemeden sadece yapıyı göster",
                "Birine göster ve ne anladığını sor",
              ],
            },
          },
          {
            title: "Prototyping for Testing",
            description: "Prototype: sunum için değil, test için yapılır. İyi prototype: sadece test edilecek akışı içerir, her detayı kapsamaz.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "UX Prototypes: Low Fidelity vs. High Fidelity", url: "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/" },
                  { title: "Paper Prototyping", url: "https://www.nngroup.com/articles/paper-prototyping-cutout-kit/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir usability test yapacağını düşün",
                "Hangi ekranlar gerçekten gerekli?",
                "Hangileri test dışında kalabilir?",
              ],
            },
          },
          {
            title: "Prototip Temizliği (İsimlendirme, Akış Netliği)",
            description: "Kötü hazırlanmış prototype: yanlış test sonuçları üretir, kullanıcıyı değil tasarımcıyı test eder. Basit ama kritik konular: ekran isimleri, bağlantıların tutarlılığı, gereksiz dallanmaların temizlenmesi.",
            resources: [
              {
                category: "📘 Maze",
                items: [
                  { title: "Preparing Prototypes for Testing", url: "https://maze.co/guides/prototype-testing/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir prototype aç:",
                "Kırık link var mı?",
                "Kullanıcıyı çıkmaz sokağa sokuyor mu?",
              ],
            },
          },
        ],
      },
      {
        title: "Kullanılabilirlik Testleri (Usability Testing)",
        description: "Tasarımın 'çalışıp çalışmadığını' kanıtlamak.",
        topics: [
          {
            title: "Kullanılabilirlik Testi Nedir?",
            description: "Usability testing, kullanıcıların belirli görevleri: yardım almadan, kendi başlarına yapıp yapamadığını gözlemlemektir. Önemli olan: ne söyledikleri değil, ne yaptıklarıdır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Usability Testing 101", url: "https://www.nngroup.com/articles/usability-testing-101/" },
                  { title: "Why You Only Need to Test with 5 Users", url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir görev yaz: 'Kullanıcı X işlemini yapabilmeli.'",
                "Şimdi sor: Bu görevin başarılı olduğunu nasıl anlarsın?",
              ],
            },
          },
          {
            title: "Moderasyonlu vs Moderasyonsuz Testler",
            description: "Moderated Test: Canlı, derinlemesine gözlem. Unmoderated Test: Daha hızlı, daha geniş örneklem. Her problem için doğru yöntem farklıdır.",
            resources: [
              {
                category: "📘 Kaynaklar",
                items: [
                  { title: "Moderated vs Unmoderated Testing", url: "https://maze.co/guides/usability-testing/moderated-vs-unmoderated/" },
                  { title: "Remote Usability Testing", url: "https://www.nngroup.com/articles/remote-usability-testing-study-guide/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu problem için yöntem seç: 'Kullanıcılar neden onboarding'i terk ediyor?'",
                "Moderated mı? Unmoderated mı?",
                "Neden?",
              ],
            },
          },
          {
            title: "Görev & Senaryolar Yazma",
            description: "Kötü yazılmış task: kullanıcıyı yönlendirir, gerçekçi değildir, test sonucunu bozar. İyi task: bağlam verir, çözümü söylemez.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Writing Tasks for Usability Studies", url: "https://www.nngroup.com/articles/better-usability-tasks/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bu task'ı düzelt: 'Sepete ürün ekle.'",
                "→ Daha bağlamsal bir task yaz.",
              ],
            },
          },
          {
            title: "Başarı Kriterleri & Metrikler",
            description: "Test 'hissi' değil, sonucu ölçer. Temel usability metrikleri: Task success, Time on task, Errors, User confidence (self-reported).",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Usability Metrics", url: "https://www.nngroup.com/articles/usability-metrics/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir task için ölçüm belirle:",
                "Başarılı / başarısız",
                "Ne kadar sürede?",
                "Kaç hata?",
              ],
            },
          },
          {
            title: "Gözlem, Not Alma & Analiz",
            description: "Usability test sırasında: kullanıcıyı düzeltmezsin, ipucu vermezsin, savunmaya geçmezsin. Ama her şeyi not alırsın.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Observer Guidelines for Usability Research", url: "https://www.nngroup.com/articles/observer-guidelines/" },
                  { title: "Analyze Usability Test Data in 4 Steps", url: "https://www.nngroup.com/articles/analyze-usability-data/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir gözlem yaz: 'Kullanıcı durdu, ekrana baktı, geri döndü.'",
                "Bu neyin sinyali olabilir?",
              ],
            },
          },
          {
            title: "Bulguların Raporlanması & Öneriler",
            description: "Testin değeri: raporda, aksiyonda, değişimde ortaya çıkar. İyi rapor: problem → kanıt → öneri zinciri kurar, suçlamaz, çözüm sunar.",
            resources: [
              {
                category: "📘 Maze",
                items: [
                  { title: "Reporting Usability Test Results", url: "https://maze.co/guides/usability-testing/results/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir bulgu yaz: 'Kullanıcılar ödeme adımında durdu.'",
                "Bunu bir öneriye çevir.",
              ],
            },
          },
        ],
      },
      {
        title: "Heuristics & UX Prensipleri (Heuristics & UX Principles)",
        description: "Tasarımı hızlı değerlendirme ve sorunları diline dökebilme.",
        topics: [
          {
            title: "Nielsen'in 10 Kullanılabilirlik Heuristiği",
            description: "Jakob Nielsen'ın 10 usability heuristic'i, en yaygın UX problemlerini kapsayan evrensel prensiplerdir. Junior'lar için kritik nokta: Heuristic'leri ezberlemek değil, ne zaman hangisi ihlal ediliyor görebilmek.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "10 Usability Heuristics for User Interface Design", url: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran seç",
                "En az 1 heuristic ihlali bul",
                "Hangi heuristic?",
                "Kullanıcıyı nasıl etkiliyor?",
              ],
            },
          },
          {
            title: "Heuristic Evaluation (Süreç)",
            description: "Heuristic evaluation: kullanıcıya ihtiyaç duymadan, uzman gözüyle yapılan hızlı bir UX değerlendirme yöntemidir. Ama kullanıcı testinin yerine geçmez.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "How to Conduct a Heuristic Evaluation", url: "https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/" },
                  { title: "Severity Ratings for Usability Problems", url: "https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir feature seç",
                "3 heuristic üzerinden değerlendir",
                "Her biri için 1 problem yaz",
              ],
            },
          },
        ],
      },
      {
        title: "Erişilebilirlik & Kapsayıcı Tasarım (Accessibility & Inclusive Design)",
        description: "Herkes için kullanılabilir deneyim tasarlamak (temel seviye).",
        topics: [
          {
            title: "Accessibility Temelleri (Neden Önemli)",
            description: "Erişilebilirlik: sadece engelli kullanıcılar için değildir, geçici durumları (kırık kol, güneş ışığı, yavaş internet) da kapsar. İyi erişilebilirlik, herkes için daha iyi UX demektir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Accessibility 101", url: "https://www.nngroup.com/articles/usability-101-introduction-to-usability/" },
                ],
              },
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Inclusive Design", url: "https://www.interaction-design.org/literature/topics/inclusive-design?srsltid=AfmBOopIjs2eUxQNqBpRwZbeOPHsJxOiteG0en2smCVyxvVGLddj7lJx" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Kullandığın bir ürünü düşün",
                "Tek elle kullanabilir misin?",
                "Ses kapalıyken anlaşılır mı?",
              ],
            },
          },
          {
            title: "WCAG Genel Bakış",
            description: "WCAG (Web Content Accessibility Guidelines), erişilebilirlik için uluslararası standarttır. Temel 4 ilke: Perceivable (Algılanabilir), Operable (Kullanılabilir), Understandable (Anlaşılabilir), Robust (Sağlam). Junior seviyede amaç: kuralları ezberlemek değil, neyi kontrol etmen gerektiğini bilmek.",
            resources: [
              {
                category: "🌐 W3C / WAI",
                items: [
                  { title: "WCAG Overview", url: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
                  { title: "WCAG at a Glance", url: "https://www.w3.org/WAI/standards-guidelines/wcag/glance/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran için sor:",
                "Bu ekran algılanabilir mi?",
                "Klavye ile kullanılabilir mi?",
              ],
            },
          },
          {
            title: "Renk Kontrastı & Tipografi",
            description: "Düşük kontrast: en yaygın erişilebilirlik hatasıdır, çoğu zaman 'estetik' gerekçesiyle yapılır. Ama: okunamayan metin, kullanılamayan metindir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Typography for UX", url: "https://www.nngroup.com/articles/typography-terms-ux/" },
                ],
              },
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "The UX Designer's Guide to Typography", url: "https://www.interaction-design.org/literature/article/the-ux-designer-s-guide-to-typography?srsltid=AfmBOoryTDRy64DFtSX2n4wsRopUiWRl4X3dUF6vn1INGJtKve_TvBjc" },
                ],
              },
              {
                category: "📘 A FixT",
                items: [
                  { title: "Color Contrast and Readability", url: "https://afixt.com/color-contrast-and-readability-the-cornerstones-of-accessible-design/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir metni kontrol et:",
                "Açık tema + güneş ışığında okunuyor mu?",
                "Kontrast sadece 'güzel' mi, yeterli mi?",
              ],
            },
          },
          {
            title: "Klavye & Odak Yönetimi (Web)",
            description: "Bir kullanıcı: mouse kullanamayabilir, sadece klavye ile gezebilir. Bu yüzden: focus state'ler, tab sırası UX'in parçasıdır.",
            resources: [
              {
                category: "🌐 WebAIM",
                items: [
                  { title: "Keyboard Accessibility", url: "https://webaim.org/techniques/keyboard/" },
                ],
              },
              {
                category: "✍️ UX Design CC",
                items: [
                  { title: "Accessible Custom Focus Indicators", url: "https://uxdesign.cc/accessible-custom-focus-indicators-da4768d1fb7b" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir web sayfasında:",
                "Sadece Tab ile gez",
                "Nerede kayboluyorsun?",
              ],
            },
          },
          {
            title: "Erişilebilir Formlar & Hatalar",
            description: "Formlar, erişilebilirliğin en kırılgan noktalarındandır. Sık yapılan hatalar: label yok, hata mesajı belirsiz, sadece renkle hata göstermek.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Accessible Forms" },
                  { title: "Error Messages and Accessibility" },
                ],
              },
              {
                category: "🌐 W3C / WAI",
                items: [
                  { title: "Forms Accessibility" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Accessible Form Design – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Accessible Forms Explained" },
                  { title: "Why Error Messages Fail Accessibility" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir hata mesajına bak:",
                "Sadece kırmızı renk mi var?",
                "Kullanıcı ne yapacağını anlıyor mu?",
              ],
            },
          },
        ],
      },
      {
        title: "UX Writing & İçerik (Temel) (UX Writing & Content)",
        description: "Mikro metinlerle anlaşılabilirliği ve güveni artırmak.",
        topics: [
          {
            title: "UX Writing Nedir?",
            description: "UX Writing, kullanıcı deneyimini iyileştirmek için arayüzlerde kullanılan metinlerin tasarlanmasıdır. Butonlar, etiketler, hata mesajları, yardım metinleri gibi mikro metinler, kullanıcının ürünle etkileşimini yönlendirir.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "What is UX Writing?", url: "https://www.interaction-design.org/literature/topics/ux-writing#:~:text=UX%20writing%20is%20the%20practice,%2C%20descriptions%2C%20controls%20and%20warnings." },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Writing: Study Guide", url: "https://www.nngroup.com/articles/ux-writing-study-guide/" },
                  { title: "UX Copy Sizes: Long, Short, and Micro", url: "https://www.nngroup.com/articles/ux-copy-sizes/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir buton metni seç: 'Gönder'",
                "Bunu daha net ve daha aksiyon odaklı hale getir",
              ],
            },
          },
          {
            title: "Hata Mesajları & Empty States",
            description: "Hata ve boş durum metinleri: kullanıcıyı suçlamamalı, ne olduğunu açıklamalı ve bir sonraki adımı göstermelidir. Kötü metin, iyi tasarımı bile bozar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Empty States", url: "https://www.nngroup.com/articles/empty-state-interface-design/" },
                  { title: "Error Message Guidelines", url: "https://www.nngroup.com/articles/error-message-guidelines/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bu metni iyileştir: 'Bir hata oluştu.'",
                "→ Kullanıcı ne yapmalı?",
              ],
            },
          },
          {
            title: "Ton, Ses & Tutarlılık",
            description: "Voice: Ürünün kişiliği. Tone: Bağlama göre değişen ifade şekli. UX writing'de tutarsız ton: güveni zedeler ve ürünü 'parça parça' hissettirir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Tone of Voice in UX", url: "https://www.nngroup.com/articles/tone-of-voice-dimensions/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Aynı aksiyon için iki metin yaz:",
                "• Resmi ton",
                "• Samimi ton",
                "Hangisi ürünün bağlamına uygun?",
              ],
            },
          },
          {
            title: "Bilgi Açıklığı (Etiketler, Butonlar, Yardım Metinleri)",
            description: "Kullanıcılar metni okumaz, tarar. Bu yüzden: etiketler net, butonlar anlamlı ve yardım metinleri kısa olmalıdır.",
            resources: [
              {
                category: "📘 LogRocket",
                items: [
                  { title: "Labeling & UX Writing", url: "https://blog.logrocket.com/ux-design/label-ux-definition/" },
                ],
              },
              {
                category: "📘 CareerFoundry",
                items: [
                  { title: "Writing for Scannability", url: "https://careerfoundry.com/en/blog/ux-design/scannability/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir label seç: 'Bilgiler'",
                "Bu label kullanıcıya ne vaat ediyor?",
                "Yeterince net mi?",
              ],
            },
          },
        ],
      },
      {
        title: "Ekip İçinde Çalışma & Teslim (Collaboration & Delivery)",
        description: "UX çıktısını ekip içinde 'işe dönüştürmek'.",
        topics: [
          {
            title: "Product Manager ile Çalışma",
            description: "UX ve PM aynı problemi farklı açılardan ele alır. Sağlıklı iş birliği: problem tanımında başlar, çözümde değil, öncelikte hizalanır. UX'in rolü: kullanıcı perspektifini masaya getirmek, kararı sahiplenmek değil.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX and Product Management Collaboration", url: "https://www.nngroup.com/articles/product-and-ux-study-guide/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir feature düşün:",
                "Problem tanımı kimden geldi?",
                "UX bu tanımı nasıl güçlendirebilir?",
              ],
            },
          },
          {
            title: "Developerlarla Çalışma",
            description: "Developer'lar tasarımı değil: davranışı, kuralları, öncelikleri uygular. İyi UX–Dev ilişkisi: erken başlar, sürekli devam eder, 'sonradan açıklama'ya kalmaz.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "From Confrontation to Collaboration: The Developer-Designer Relationship", url: "https://www.nngroup.com/articles/developer-designer-relationship/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran seç:",
                "Bu ekranın en kritik davranış kuralı ne?",
                "Developer bunu nereden anlayacak?",
              ],
            },
          },
          {
            title: "Design Handoff Temelleri",
            description: "Handoff: dosya paylaşımı değil, bilgi aktarımıdır. İyi handoff: belirsizliği azaltır, yorum farkını minimize eder, geri dönüşleri hızlandırır.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Design Handoff Best Practices", url: "https://www.interaction-design.org/literature/article/how-to-ensure-a-smooth-design-handoff?srsltid=AfmBOoq9z_cZO24nGyHgBLtG8oV9ubklHE1focorQWXCH9yXQuixi1Mp" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım düşün:",
                "Developer'ın en çok soru soracağı yer neresi?",
                "Bunu önceden nasıl netleştirirsin?",
              ],
            },
          },
          {
            title: "Spesifikasyonlar, Açıklamalar & Dokümantasyon",
            description: "Her şey yazılmaz ama: kritik kurallar, edge durumlar, davranış farkları net olmalıdır. Amaç: gereksiz dokümantasyon değil, doğru yerde açıklama.",
            resources: [
              {
                category: "📘 Pencil and Paper",
                items: [
                  { title: "Documenting UX Designs", url: "https://www.pencilandpaper.io/articles/ux-design-documentation-guide" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Lean Agile Documentation", url: "https://www.nngroup.com/articles/lean-agile-documentation/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component seç:",
                "Hangi durumda farklı davranıyor?",
                "Bu bilgi nerede yazmalı?",
              ],
            },
          },
          {
            title: "Geri Bildirim, Iterasyon & Design QA",
            description: "Tasarım geliştirmeye girdikten sonra UX bitmez. Gerekli olanlar: tasarım QA, küçük düzeltmeler, gerçek ürüne bakarak öğrenme.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX QA and Design Reviews", url: "https://www.nngroup.com/articles/quality-assurance-ux/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Canlı bir ürün düşün:",
                "Tasarımdan farklı olan ne var?",
                "Bu fark bilinçli mi, kazara mı?",
              ],
            },
          },
        ],
      },
      {
        title: "🚀 Kariyer, Büyüme & UX Zihniyeti (Junior) (Career, Growth & UX Mindset)",
        description: "Junior UX Designer'ların kariyere gerçekçi beklentilerle başlaması, sürdürülebilir şekilde gelişmesi ve doğru zihniyeti erken kazanması.",
        topics: [
          {
            title: "UX Zihniyeti (UX Designer gibi düşünmek)",
            description: "UX mindset: çözümden önce problemi düşünmek, varsayımı sorgulamak ve kullanıcıyı savunabilmektir. UX Designer her şeyi bilen değil, doğru soruları sorabilen kişidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Mindset", url: "https://www.nngroup.com/articles/mindsets-fixed-vs-growth/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir problem seç:",
                "Çözüm düşünmeden önce",
                "'Bu gerçekten problem mi?' diye sor",
              ],
            },
          },
          {
            title: "Etkili UX Öğrenme (Ne Öğrenmeli, Ne Öğrenmemeli)",
            description: "UX öğrenirken en büyük hata: her aracı öğrenmeye çalışmak ve temeli atlamaktır. Öncelik sırası: 1) Problem anlayışı, 2) Research & düşünme, 3) Etkileşim & akış, 4) Araçlar (en son).",
            resources: [
              {
                category: "📘 CareerFoundry",
                items: [
                  { title: "How To Learn UX Design (7-Step Guide)", url: "https://careerfoundry.com/en/blog/ux-design/how-to-learn-to-be-a-ux-designer/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Kendine sor:",
                "Şu an öğrendiğim şey problem çözmeme yardım ediyor mu?",
                "Yoksa sadece araç mı?",
              ],
            },
          },
          {
            title: "Portfolio Temelleri (Junior)",
            description: "Junior portfolyo görsel şov değil, düşünce süreci gösterir. İyi bir case: problem → süreç → karar → öğrenme şeklinde ilerler.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Portfolio Tips", url: "https://www.nngroup.com/articles/ux-design-portfolios/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir case için yaz:",
                "En zor karar neydi?",
                "Neyi yanlış yaptın, ne öğrendin?",
              ],
            },
          },
          {
            title: "Junior UX Rolleri & Beklentiler",
            description: "Junior UX Designer her şeyi kusursuz yapmaz, soru sorar ve öğrenmeye açıktır. Yanlış beklentiler: 'Her şeyi tek başıma yapmalıyım' ve 'Hata yapmamalıyım'.",
            resources: [
              {
                category: "📘 UX Design Institute",
                items: [
                  { title: "Junior UX Designer Expectations", url: "https://www.uxdesigninstitute.com/blog/expectations-junior-ux-designer/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir iş ilanı oku:",
                "Gerçekten junior mu?",
                "Yoksa senior beklentisi mi var?",
              ],
            },
          },
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
        title: "UI Design Temelleri",
        description: "UI Designer'ın görsel kararları bilinçli alması, estetik ile kullanılabilirlik arasında denge kurması ve tutarlı, ölçeklenebilir arayüzler tasarlaması.",
        topics: [
          {
            title: "UI Design Nedir?",
            description: "UI Design, kullanıcı ile sistem arasındaki görsel ve etkileşimsel katmanı tasarlamaktır. UI Designer bilgiyi görsel olarak organize eder, etkileşimleri anlaşılır hale getirir ve kullanıcıyı yönlendirir. UI, UX'in görünen yüzüdür; ama UX'in tamamı değildir.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "What is UI Design?", url: "https://www.interaction-design.org/literature/topics/ui-design#:~:text=UI%20design%20is%20about%20creating,simple%20and%20natural%20to%20use." },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Design in UX", url: "https://www.nngroup.com/articles/visual-design-in-ux-study-guide/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran düşün:",
                "Bu ekran kullanıcıya ne yapması gerektiğini görsel olarak söylüyor mu?",
                "Yoksa sadece güzel mi?",
              ],
            },
          },
          {
            title: "UI Designer'ın Rolü",
            description: "UI Designer görsel kararları bilinçli alır, estetik ile kullanılabilirlik arasında denge kurar ve tutarlı, ölçeklenebilir arayüzler tasarlar. UI Designer'ın rolü: UX kararlarını bozmadan görsel netlik ve kalite kazandırmaktır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX vs UI vs Product Design" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX vs UI Roles – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "UX vs UI vs Product Design Explained" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir UI kararı düşün:",
                "Bu karar kullanıcı akışını destekliyor mu?",
                "Yoksa sadece görsel bir tercih mi?",
              ],
            },
          },
          {
            title: "UI vs UX Arasındaki Fark",
            description: "UX Design problemi ve akışı çözer, UI Design çözümü görsel olarak netleştirir. UI, UX'in görünen yüzüdür; ama UX'in tamamı değildir. UI Designer'ın rolü: UX kararlarını bozmadan görsel netlik ve kalite kazandırmaktır.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "UX vs UI: What's the Difference?", url: "https://www.interaction-design.org/literature/article/ux-vs-ui-what-s-the-difference?srsltid=AfmBOorO4481heRQmWiPFnu4t3DCldqHbhbWeOBPWdCFFYd8kfjdoy4m" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran seç:",
                "Gözün ilk nereye gidiyor?",
                "Orası gerçekten en önemli yer mi?",
              ],
            },
          },
          {
            title: "Görsel Algı ve Kullanıcı Davranışı",
            description: "Kullanıcılar ekranı nasıl algılar, nereye bakar, neyi önce fark eder? Görsel algı prensipleri UI tasarımının temelidir. Kullanıcı davranışını anlamak, etkili arayüzler tasarlamak için kritiktir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Hierarchy" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Visual Hierarchy Explained – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing with Visual Hierarchy" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı 5 saniye incele:",
                "Hatırladığın ilk 3 şey ne?",
                "Tasarım bunu hedefliyor muydu?",
              ],
            },
          },
          {
            title: "Temel Tasarım Prensipleri",
            description: "İyi UI evrensel görsel prensiplere dayanır: Hiyerarşi, Kontrast, Denge, Yakınlık (Gestalt), Tutarlılık. Bu prensipler ihlal edildiğinde kullanıcı yavaşlar, hata yapar ve arayüz karmaşık hissedilir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Design Principles", url: "https://www.nngroup.com/videos/visual-design-principles-in-action/#:~:text=Summary%3A%20Use%20the%205%20key,objectively%20critique%20and%20improve%20designs." },
                ],
              },
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "User Interface Design Guidelines: 10 Rules of Thumb", url: "https://www.interaction-design.org/literature/article/user-interface-design-guidelines-10-rules-of-thumb?srsltid=AfmBOorNkP1i0IFxfscODlu1ngsyEh36Z5x_hF6twnAaGTG6HVEGa50k" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir üründe:",
                "Aynı işlevi yapan iki farklı buton bul",
                "Neden farklı görünüyor olabilir?",
              ],
            },
          },
        ],
      },
      {
        title: "Görsel Tasarım Prensipleri",
        description: "Arayüzdeki içeriklerin nerede konumlandığını, birbirleriyle nasıl ilişkilendiğini ve hangi sırayla algılandığını belirleyen yapısal kararlar.",
        topics: [
          {
            title: "Görsel Hiyerarşi",
            description: "Layout, yalnızca 'kutuları dizmek' değildir. İyi bir layout boşlukları bilinçli kullanır, yoğunluğu dengeler ve içeriği nefes aldırır. Temel kavramlar: yoğunluk (density), ritim, white space.",
            resources: [
              {
                category: "📘 MockFlow",
                items: [
                  { title: "Page Layouts", url: "https://mockflow.com/glossary/layout" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran seç:",
                "İçerik sıkışık mı?",
                "Hangi alanlara nefes aldırılabilir?",
              ],
            },
          },
          {
            title: "Alignment & Spacing",
            description: "Hizalama ve boşluk kullanımı görsel düzeni belirler. Grid'ler hizalamayı kolaylaştırır, tutarlılık sağlar ve responsive tasarımın temelini oluşturur. Yaygın grid türleri: column grid, baseline grid, modular grid.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Grid Systems in UX", url: "https://www.interaction-design.org/literature/topics/grid-systems?srsltid=AfmBOooDR_Ljp7VYMzDKQOgAlvB2cYgDtiYLBiF8p-pOQCz2CaJ9obSG" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Using Grids in Interface Designs", url: "https://www.nngroup.com/articles/using-grids-in-interface-designs/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım aç:",
                "Grid var mı?",
                "Yoksa elemanlar göz kararı mı dizilmiş?",
              ],
            },
          },
          {
            title: "Contrast & Denge",
            description: "Kontrast ve denge görsel hiyerarşiyi güçlendirir. Spacing system rastgele boşlukları sistematik aralıklara dönüştürür. 4pt / 8pt sistemi: karar sayısını azaltır, tutarlılığı artırır, dev–designer iletişimini kolaylaştırır.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "What is Visual Alignment?", url: "https://www.interaction-design.org/literature/topics/visual-alignment?srsltid=AfmBOorL_302QUOG6ngZee0R96wC5VdAgNlHx24eWTlRQh460n4VrAkx" },
                ],
              },
              {
                category: "📘 UX Planet",
                items: [
                  { title: "Principles of Spacing in UI Design: A Beginner's Guide to the 4-Point Spacing System", url: "https://uxplanet.org/principles-of-spacing-in-ui-design-a-beginners-guide-to-the-4-point-spacing-system-6e88233b527a" },
                ],
              },
              {
                category: "📘 UX Lab Academy",
                items: [
                  { title: "The Ultimate spacing guide for UI Designers", url: "https://www.uxlab.academy/blogs/the-ultimate-spacing-guide-for-ui-designers" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran ölç:",
                "Boşluklar aynı artışlarla mı ilerliyor?",
                "Yoksa rastgele mi?",
              ],
            },
          },
          {
            title: "Consistency & Tekrar",
            description: "Tutarlılık öğrenme maliyetini düşürür, kullanıcıyı rahatlatır ve güven oluşturur. UI'da tutarlılık: aynı renk = aynı anlam, aynı component = aynı davranış. Tutarsız UI, kullanıcıyı her seferinde yeniden düşünmeye zorlar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Responsive Web Design (RWD) and User Experience", url: "https://www.nngroup.com/articles/responsive-web-design-definition/" },
                ],
              },
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Responsive Design: Best Practices", url: "https://www.interaction-design.org/literature/article/responsive-design-let-the-device-do-the-work?srsltid=AfmBOoqJ-dHKcVeeHatxN9TpgYZXiqwsWDuKPeEFhDU_OMw-7FzGpZGW" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir masaüstü ekranı düşün:",
                "Mobilde ilk ne kalmalı?",
                "İlk ne gitmeli?",
              ],
            },
          },
          {
            title: "Gestalt Prensipleri",
            description: "Gestalt prensipleri kullanıcıların görsel bilgiyi nasıl organize ettiğini açıklar. Yakınlık, benzerlik, süreklilik, kapatma gibi prensipler UI tasarımında kritik rol oynar. İyi UI lorem ipsum'a göre değil, gerçek içeriğe göre tasarlanır.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "What is Content-First?", url: "https://www.interaction-design.org/literature/topics/content-first?srsltid=AfmBOoqk-M0kxL-YNWMFlHBSa2EkZ7mvfmTyYb0NaRAmN4aeRkAkUujO" },
                ],
              },
              {
                category: "📘 UX Design Institute",
                items: [
                  { title: "How to do content-first design: an actionable framework", url: "https://www.uxdesigninstitute.com/blog/content-first-design-guide/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarımda:",
                "Tüm metinleri uzat",
                "Hâlâ çalışıyor mu?",
              ],
            },
          },
        ],
      },
      {
        title: "Renk (Color)",
        description: "Renk bir arayüzde hiyerarşiyi güçlendiren, durumu ve geri bildirimi ileten, markayı yansıtan ve erişilebilirliği doğrudan etkileyen en güçlü UI araçlarından biridir.",
        topics: [
          {
            title: "Renk Teorisi Temelleri",
            description: "UI'da renk temel görsel kavramlara dayanır: hue (renk tonu), saturation (doygunluk), value/lightness (açıklık). Yanlış kullanım: düşük kontrast, göz yorgunluğu, yanlış vurgu.",
            resources: [
              {
                category: "📘 UX Planet",
                items: [
                  { title: "Principles of color in UI Design", url: "https://uxplanet.org/principles-of-color-in-ui-design-43708d8512d8" },
                ],
              },
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "UI Color Palette 2025: Best Practices, Tips, and Tricks for Designers", url: "https://www.interaction-design.org/literature/article/ui-color-palette?srsltid=AfmBOoqSRBQ7vWikEN3E8O-6kAeU6eTFkPWOkuDHrfnDUkYT38t8ZNPX" },
                ],
              },
              {
                category: "📘 Learn UI Design",
                items: [
                  { title: "Color in UI Design: A (Practical) Framework", url: "https://www.learnui.design/blog/color-in-ui-design-a-practical-framework.html" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir rengi seç:",
                "Bu renk neyi vurguluyor?",
                "Alternatif bir renkle aynı mesajı verir mi?",
              ],
            },
          },
          {
            title: "Renk Paleti Oluşturma",
            description: "Renk paleti oluştururken sistematik bir yaklaşım izlenmelidir. UI'da renkler role göre tanımlanmalıdır: Primary (ana aksiyon), Secondary (ikincil aksiyon), Surface/Background, Feedback (success, warning, error). Bu yaklaşım tutarlılığı artırır ve theming'i kolaylaştırır.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "What is Dark Mode?", url: "https://www.interaction-design.org/literature/topics/dark-mode?srsltid=AfmBOooTMJ-tUAdRHMeKmUJtq4Isf1w05LH4Qb-gSV-nF1e8PbiBsh_e" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Dark Mode: How Users Think About It and Issues to Avoid", url: "https://www.nngroup.com/articles/dark-mode-users-issues/" },
                ],
              },
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Branding in UX Design", url: "https://www.interaction-design.org/literature/topics/branding-in-ux-design#:~:text=Branding%20focuses%20on%20how%20to,boost%20user%20satisfaction%20and%20usability." },
                ],
              },
              {
                category: "📘 iA",
                items: [
                  { title: "Return on Design", url: "https://ia.net/topics/return-on-design" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı seç:",
                "Kaç farklı font boyutu var?",
                "Hepsi gerçekten gerekli mi?",
              ],
            },
          },
          {
            title: "Primary / Secondary Renkler",
            description: "UI'da renkler role göre tanımlanmalıdır: Primary (ana aksiyon), Secondary (ikincil aksiyon), Surface/Background. Primary renk en önemli aksiyonlar için, Secondary renk ikincil aksiyonlar için kullanılır. Bu yaklaşım tutarlılığı artırır ve theming'i kolaylaştırır.",
            resources: [
              {
                category: "📘 Figma",
                items: [
                  { title: "Color Symbolism", url: "https://www.figma.com/resource-library/color-symbolism/" },
                ],
              },
              {
                category: "📘 BrandBros",
                items: [
                  { title: "De rol van kleuren in branding", url: "https://www.brandbros.nl/en/brandblog/de-rol-van-kleuren-in-branding" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir paragrafı incele:",
                "Satırlar çok mu uzun?",
                "Metni bölmek mümkün mü?",
              ],
            },
          },
          {
            title: "Durum Renkleri (Success, Error, Warning)",
            description: "Durum renkleri kullanıcıya sistemin durumunu bildirir. Success (başarılı işlemler), Error (hata durumları), Warning (uyarılar) için net ve tutarlı renkler kullanılmalıdır. Bu renkler sadece görsel değil, anlamsal olarak da doğru kullanılmalıdır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Accessibility and Typography" },
                ],
              },
              {
                category: "🌐 W3C",
                items: [
                  { title: "Text Accessibility" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Accessible Typography – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Accessible Typography in UI" },
                  { title: "Why Small Text Breaks UX" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir metni büyüt:",
                "%200 zoom'da hâlâ okunuyor mu?",
                "Satırlar kopuyor mu?",
              ],
            },
          },
          {
            title: "Kontrast & Erişilebilirlik",
            description: "Yetersiz kontrast en yaygın erişilebilirlik problemidir ve estetik gerekçeyle sıkça ihlal edilir. UI'da kontrast metin–zemin, ikon–zemin, state'ler arası kontrol edilmelidir. Erişilebilirlik standartlarına uygun kontrast oranları kullanılmalıdır.",
            resources: [
              {
                category: "📘 Afixt",
                items: [
                  { title: "Color Contrast and Readability: The Cornerstones of Accessible Design", url: "https://afixt.com/color-contrast-and-readability-the-cornerstones-of-accessible-design/" },
                ],
              },
              {
                category: "📘 Havenly",
                items: [
                  { title: "Color Palette Mistakes", url: "https://havenly.com/blog/color-palette-mistakes" },
                ],
              },
              {
                category: "📘 Supercharge Design",
                items: [
                  { title: "8 Common UI Color Mistakes", url: "https://supercharge.design/blog/8-common-ui-color-mistakes" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarımı eleştir:",
                "En gereksiz typographic karar hangisi?",
                "Kaldırsan ne olur?",
              ],
            },
          },
        ],
      },
      {
        title: "Tipografi (Typography)",
        description: "Arayüzdeki metinlerin okunabilirliğini, hiyerarşisini, tonunu ve algılanan kalitesini belirleyen kritik UI bileşenleri.",
        topics: [
          {
            title: "Tipografi Temelleri",
            description: "Typography yalnızca font seçmek değildir. Font ailesi, font boyutu, satır aralığı (line-height), harf aralığı (letter-spacing) ve ağırlık (font-weight) kararlarının tamamını kapsar. Yanlış kombinasyonlar metni okunamaz hale getirir.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "The UI Designer's Guide to Typography", url: "https://www.interaction-design.org/literature/article/the-ux-designer-s-guide-to-typography?srsltid=AfmBOorBTKMat-qzKyLmworWpjpdXcsH3Ne7WhmVZ9T9fz4BjMTZdOhO" },
                ],
              },
              {
                category: "📘 UX Planet",
                items: [
                  { title: "Principles of Typography in UI Design", url: "https://uxplanet.org/principles-of-typography-in-ui-design-bc28f1f9666d" },
                ],
              },
              {
                category: "📘 DesignLab",
                items: [
                  { title: "Guide: How to Define & Use Typography in UX/UI Design", url: "https://designlab.com/blog/what-is-typography-how-is-it-important-to-ux-ui-design" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir metni incele:",
                "Okumak mı zor, taramak mı?",
                "Gözün nerede yoruluyor?",
              ],
            },
          },
          {
            title: "Font Aileleri & Kullanım Alanları",
            description: "Font aileleri farklı kullanım alanları için seçilir. Serif, sans-serif, monospace gibi font kategorileri farklı bağlamlarda farklı etkiler yaratır. UI'da genellikle sans-serif fontlar tercih edilir çünkü ekranda daha okunabilirdir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Typography for UX" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Typography Basics for UI – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Typography in UI Design" },
                  { title: "Why Typography Is UX" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı seç:",
                "Hangi font ailesi kullanılmış?",
                "Neden bu font seçilmiş olabilir?",
              ],
            },
          },
          {
            title: "Hiyerarşi (Heading, Body, Caption)",
            description: "Type scale başlıklar, alt başlıklar, gövde metni ve yardımcı metinler arasında net bir hiyerarşi kurar. İyi bir scale az sayıda seviye içerir ve tutarlı artışlarla ilerler. Heading, Body, Caption gibi seviyeler görsel hiyerarşiyi güçlendirir.",
            resources: [
              {
                category: "📘 Figma",
                items: [
                  { title: "What is visual hierarchy", url: "https://www.figma.com/resource-library/what-is-visual-hierarchy/" },
                ],
              },
              {
                category: "📘 UX Planet",
                items: [
                  { title: "Principles of visual hierarchy in UI Design", url: "https://uxplanet.org/principles-of-visual-hierarchy-in-ui-design-fbcd31f88088" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Hierarchy in UX: Definition", url: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı seç:",
                "Kaç farklı font boyutu var?",
                "Hepsi gerçekten gerekli mi?",
              ],
            },
          },
          {
            title: "Satır Aralığı & Okunabilirlik",
            description: "Kullanıcılar metni okumaz, tarar. Okunabilirliği etkileyen faktörler: satır uzunluğu, satır aralığı, paragraf yapısı, kontrast. İyi typography hızlı taranır ve anlamı bölmez. Satır aralığı (line-height) okunabilirliği doğrudan etkiler.",
            resources: [
              {
                category: "📘 Readability Matters",
                items: [
                  { title: "Legibility vs Readability", url: "https://readabilitymatters.org/articles/legibility-vs-readability#:~:text=%E2%80%9CLegibility%E2%80%9D%20is%20based%20on%20the,and%20move%20along%20the%20line." },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Legibility, Readability, and Comprehension", url: "https://www.nngroup.com/articles/legibility-readability-comprehension/" },
                ],
              },
              {
                category: "📘 DesignCode",
                items: [
                  { title: "UX Design Handbook: Readability and Legibility", url: "https://designcode.io/ux-design-handbook-readability-and-legibility" },
                ],
              },
              {
                category: "📘 UX Matters",
                items: [
                  { title: "Scannability: Principle and Practice", url: "https://www.uxmatters.com/mt/archives/2015/06/scannability-principle-and-practice.php" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir paragrafı incele:",
                "Satırlar çok mu uzun?",
                "Metni bölmek mümkün mü?",
              ],
            },
          },
          {
            title: "UI Tipografisinde Yaygın Hatalar",
            description: "Sık yapılan hatalar: çok fazla font ailesi, çok fazla font boyutu, yetersiz line-height, sadece estetik için küçük metinler. Bu hatalar UI kalitesini düşürür. Erişilebilir typography yeterli kontrast, yeterli boyut ve zoom/dynamic type uyumu sağlar.",
            resources: [
              {
                category: "📘 Digital Ink",
                items: [
                  { title: "Typography Mistakes", url: "https://www.digital.ink/blog/typography-mistakes/" },
                ],
              },
              {
                category: "📘 UX Design CC",
                items: [
                  { title: "5 Typography Mistakes New Designers Make", url: "https://uxdesign.cc/5-typography-mistakes-new-designers-make-how-to-avoid-them-f75abe7da937" },
                ],
              },
              {
                category: "📘 Supercharge Design",
                items: [
                  { title: "20 Common Typography Mistakes in UI Design", url: "https://supercharge.design/blog/20-common-typography-mistakes-in-ui-design" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarımı eleştir:",
                "En gereksiz typographic karar hangisi?",
                "Kaldırsan ne olur?",
              ],
            },
          },
        ],
      },
      {
        title: "Grid & Layout Sistemleri",
        description: "Grid ve layout sistemleri arayüzdeki içeriklerin nerede konumlandığını, birbirleriyle nasıl ilişkilendiğini ve hangi sırayla algılandığını belirleyen yapısal kararlardır.",
        topics: [
          {
            title: "Icon Basics (Meaning & Clarity)",
            description: "Icon'lar görsel iletişimin güçlü araçlarıdır. İyi bir icon anlaşılır, tutarlı ve anlamlı olmalıdır. Icon'lar kullanıcıya ne yapması gerektiğini hızlıca iletir, ancak belirsiz icon'lar kafa karışıklığı yaratır.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "What is Iconography?", url: "https://www.interaction-design.org/literature/topics/iconography?srsltid=AfmBOopZKwT1BQfaBXDLLJtZBplRkIrv8v92pknRJRy_u6koZYmLGtuk" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Icon Usability", url: "https://www.nngroup.com/articles/icon-usability/" },
                  { title: "Icon Usability: When and How to Evaluate Digital Icons", url: "https://www.nngroup.com/articles/how-to-test-digital-icons/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir icon set'i incele:",
                "Her icon'un anlamı net mi?",
                "Kullanıcılar icon'ları anlayabilir mi?",
              ],
            },
          },
          {
            title: "Icon Grids & Visual Consistency",
            description: "Icon set'leri görsel tutarlılık gerektirir. Aynı stroke width, aynı corner radius, aynı padding ve aynı visual style tüm icon'larda kullanılmalıdır. Icon grid'ler icon'ların tutarlı görünmesini sağlar.",
            resources: [
              {
                category: "📘 UX Design CC",
                items: [
                  { title: "Designing Perfect Icon Sets", url: "https://uxdesign.cc/design-principles-for-creating-the-perfect-icon-set-d12570e0bcb1" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir icon set'i incele:",
                "Tüm icon'lar aynı stroke width'e sahip mi?",
                "Görsel tutarlılık var mı?",
              ],
            },
          },
          {
            title: "Icon Styles (Outline vs Filled)",
            description: "Icon stilleri (outline vs filled) farklı durumları ve öncelikleri göstermek için kullanılır. Outline icon'lar daha hafif, filled icon'lar daha vurgulu görünür. Active/inactive durumları için farklı stiller kullanılabilir.",
            resources: [
              {
                category: "📘 UX Movement",
                items: [
                  { title: "Solid vs Outline Icons: Which are Faster to Recognize?", url: "https://uxmovement.com/mobile/solid-vs-outline-icons-which-are-faster-to-recognize/" },
                ],
              },
              {
                category: "📘 Radiant Digital",
                items: [
                  { title: "Solid vs Outline Icons", url: "https://www.radiant.digital/article/solid-vs-outline-icons" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir navigation bar tasarla",
                "Active tab → filled icon, Inactive tabs → outline icon",
                "Fark ne kadar belirgin?",
              ],
            },
          },
          {
            title: "Grid Sistemleri Nedir?",
            description: "Grid'ler hizalamayı kolaylaştırır, tutarlılık sağlar ve responsive tasarımın temelini oluşturur. Yaygın grid türleri: column grid, baseline grid, modular grid.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Grid Systems in UX" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Grid Systems Explained – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why UI Designers Should Use Grids" },
                  { title: "Grid Systems in Modern UI" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım aç:",
                "Grid var mı?",
                "Yoksa elemanlar göz kararı mı dizilmiş?",
              ],
            },
          },
          {
            title: "8pt / 4pt Spacing System",
            description: "Spacing system rastgele boşlukları sistematik aralıklara dönüştürür. 4pt / 8pt sistemi: karar sayısını azaltır, tutarlılığı artırır, dev–designer iletişimini kolaylaştırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Spacing and Alignment" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "8pt Grid System Explained" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why the 8pt Grid Works" },
                  { title: "Spacing Systems for UI Designers" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran ölç:",
                "Boşluklar aynı artışlarla mı ilerliyor?",
                "Yoksa rastgele mi?",
              ],
            },
          },
          {
            title: "Responsive Grid Mantığı",
            description: "Responsive layout ekran küçülünce 'sığdırmak' değildir, öncelikleri yeniden düşünmektir. Önemli noktalar: içerik önceliği, kırılım noktaları (breakpoints), esnek container'lar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Responsive Web Design" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir layout'u responsive yap:",
                "Breakpoint'ler nerede olmalı?",
                "İçerik önceliği nasıl değişiyor?",
              ],
            },
          },
          {
            title: "Illustrations in UI",
            description: "İllüstrasyonlar UI'da kullanıcıya rehberlik eder, duygusal bağ kurar ve boş durumları (empty states) daha anlaşılır hale getirir. İyi bir illüstrasyon basit, anlaşılır ve UI'ya katma değer sağlar. Aşırı detaylı illüstrasyonlar dikkat dağıtır ve yükleme süresini artırır.",
            resources: [
              {
                category: "📘 Fireart Studio",
                items: [
                  { title: "Illustrations in UX", url: "https://fireart.studio/blog/how-ui-illustrations-improve-ux/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir app'in empty state'ini incele",
                "İllüstrasyon var mı?",
                "Varsa UI'ya yardımcı mı, yoksa dikkat dağıtıcı mı?",
              ],
            },
          },
          {
            title: "Layout Türleri (Fixed, Fluid)",
            description: "Layout türleri: Fixed (sabit genişlik), Fluid (esnek genişlik), Responsive (breakpoint'lere göre değişen). Her layout türünün kendi kullanım alanı vardır. Fixed layout daha kontrollü, fluid layout daha esnek, responsive layout her ekrana uyum sağlar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Layout Guidelines" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir layout tasarla:",
                "Fixed mi, fluid mi, responsive mi?",
                "Neden bu layout türünü seçtin?",
              ],
            },
          },
          {
            title: "Images & Thumbnails",
            description: "Görseller ve thumbnail'lar UI'da içeriği görselleştirir ve kullanıcıya hızlı bilgi verir. Tutarlı aspect ratio, doğru crop stratejisi ve optimize edilmiş görsel boyutları önemlidir. Farklı aspect ratio'lar görsel düzensizlik yaratır ve kullanıcı deneyimini olumsuz etkiler.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Using Imagery in Visual Design", url: "https://www.nngroup.com/articles/imagery-in-visual-design/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir e-commerce sitesi aç (örn. listing page)",
                "Ürün görselleri: hepsi aynı aspect ratio'da mı?",
                "Crop stratejisi tutarlı mı?",
              ],
            },
          },
          {
            title: "Breakpoint Düşüncesi",
            description: "Breakpoint'ler ekran genişliğine göre layout'un değiştiği noktalardır. Breakpoint'leri düşünürken: içerik önceliği, kullanıcı davranışı, cihaz türleri göz önünde bulundurulmalıdır. Yaygın breakpoint'ler: mobile (320-768px), tablet (768-1024px), desktop (1024px+).",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Responsive Design Guidelines" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir layout'u responsive yap:",
                "Breakpoint'ler nerede olmalı?",
                "İçerik önceliği nasıl değişiyor?",
              ],
            },
          },
          {
            title: "Common Icon & Imagery Mistakes",
            description: "Icon ve imagery kullanımında sık yapılan hatalar: Ambiguous (belirsiz) iconlar (kullanıcı anlamını tahmin edemiyor), tutarsız stroke & style (farklı icon set'lerden rastgele ikonlar), çok detaylı illustrasyon (dikkat dağıtıcı, load time artışı), farklı aspect ratio'lar (görsel düzensizlik), yanlış crop (önemli içerik kesiliyor), ve gereksiz decorative görseller (UI'ya katma değer sağlamayan 'dolgu' illustrasyon). Bu hatalar UI'nın kalitesini düşürür ve kullanıcıyı kafa karıştırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Bad Icons: How to Identify and Improve Them", url: "https://www.nngroup.com/articles/bad-icons/" },
                ],
              },
              {
                category: "📘 Codener",
                items: [
                  { title: "Icon Design Mistakes to Avoid in Your Next Project", url: "https://codener.com/icon-design-mistakes-to-avoid-in-your-next-project/" },
                ],
              },
              {
                category: "📘 Oodles Studio",
                items: [
                  { title: "5 Common Iconography Mistakes", url: "https://www.oodlesstudio.com/blog/common-iconography-mistakes/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir web/app UI'ında: İkonlar tutarlı mı (aynı style, stroke)?",
                "Görsellerden herhangi biri gereksiz mi?",
                "Crop sorunlu olan var mı?",
              ],
            },
          },
        ],
      },
      {
        title: "UI Components",
        description: "UI component'leri arayüzün tekrar eden yapı taşlarıdır. Tutarlılığı sağlar ve tasarım/geliştirme sürecini hızlandırır. Amaç: her ekranı sıfırdan tasarlamamak, kullanıcıya tanıdık deneyimler sunmak ve ölçeklenebilir UI sistemleri kurmak.",
        topics: [
          {
            title: "UI Component Nedir?",
            description: "UI component tek başına anlamı olan, tekrar kullanılabilen ve belirli bir davranışı olan arayüz parçasıdır. Örnekler: button, input, card, modal. Component'ler tutarlı davranmalı ve aynı kuralları izlemelidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Design-Pattern Guidelines: Study Guide", url: "https://www.nngroup.com/articles/design-pattern-guidelines/" },
                ],
              },
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "What are User Interface (UI) Design Patterns?", url: "https://www.interaction-design.org/literature/topics/ui-design-patterns?srsltid=AfmBOooiZer8AylyGtFg23C7naU3pwI5Wk2fPCwc9CZ2hQXBrs-Q84iD" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarıma bak: Hangi elementler tekrar ediyor?",
                "Bunlar component olabilir mi?",
              ],
            },
          },
          {
            title: "Temel Component'ler (Button, Input, Checkbox)",
            description: "Her UI sisteminde bazı temel component'ler vardır: buttons, inputs, selects, checkboxes, radio buttons, cards. Bu component'ler tutarlı davranmalı ve aynı kuralları izlemelidir. Her component'in tıklanabilirliği net olmalı ve birbirleriyle karışmamalıdır.",
            resources: [
              {
                category: "📘 UXPin",
                items: [
                  { title: "User Interface Elements Every Designer Should Know", url: "https://www.uxpin.com/studio/blog/user-interface-elements-every-designer-should-know/" },
                ],
              },
              {
                category: "📘 UX Design CC",
                items: [
                  { title: "Button Design — UI component series", url: "https://uxdesign.cc/button-design-user-interface-components-series-85243b6736c7" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Button States: Communicate Interaction", url: "https://www.nngroup.com/articles/button-states-communicate-interaction/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir butona bak: Tıklanabilir olduğu net mi?",
                "İkincil butonla karışıyor mu?",
              ],
            },
          },
          {
            title: "Component States (Default, Hover, Disabled)",
            description: "Bir component yalnızca 'kutudan' ibaret değildir. Örnek bir input: label, helper text, placeholder, error state, prefix/suffix içerir. Bu parçalar birlikte çalışır. Placeholder kaybolunca kullanıcı ne yapacak? Label yeterince net mi? Bu sorular component anatomy'sini anlamak için önemlidir.",
            resources: [
              {
                category: "📘 Iva Beleva",
                items: [
                  { title: "The anatomy of a component in a design system", url: "https://www.ivabeleva.com/article/the-anatomy-of-a-component-in-a-design-system.html" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir input incele: Placeholder kaybolunca kullanıcı ne yapacak?",
                "Label yeterince net mi?",
              ],
            },
          },
          {
            title: "Component Tutarlılığı",
            description: "Component'ler tek bir yerde tanımlanmalı ve her yerde aynı davranmalıdır. Tutarsız component kullanıcıyı şaşırtır ve bakım maliyetini artırır. Bir projede aynı isimle kaç farklı buton var? Neden farklılar? Bu sorular tutarlılığı kontrol etmek için önemlidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UI Patterns" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Patterns Explained – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Choosing the Right UI Pattern" },
                  { title: "UI Patterns That Work" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir problem düşün: Bu problem daha önce çözülmüş mü?",
                "Var olan bir pattern işini görür mü?",
              ],
            },
          },
          {
            title: "Reusable Component Mantığı",
            description: "Component'ler tek bir yerde tanımlanmalı ve her yerde aynı davranmalıdır. Tutarsız component kullanıcıyı şaşırtır ve bakım maliyetini artırır. Bir projede aynı isimle kaç farklı buton var? Neden farklılar? Bu sorular tutarlılığı kontrol etmek için önemlidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Consistency Heuristic" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Component Reusability – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why Reusable Components Matter" },
                  { title: "Scaling UI with Components" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir projede: Aynı isimle kaç farklı buton var?",
                "Neden farklılar?",
              ],
            },
          },
          {
            title: "Common Component Mistakes",
            description: "Component tasarımında sık yapılan hatalar: tutarsız state'ler, belirsiz tıklanabilirlik, aşırı karmaşık component'ler, gereksiz varyasyonlar, zayıf hata mesajları ve erişilebilirlik eksiklikleri. Bu hatalar kullanıcı deneyimini olumsuz etkiler ve bakım maliyetini artırır.",
            resources: [
              {
                category: "📘 Medium",
                items: [
                  { title: "5 Common UI Design Mistakes and How to Avoid Them", url: "https://medium.com/design-bootcamp/5-common-ui-design-mistakes-and-how-to-avoid-them-38fb10a9d605" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Top 10 Application-Design Mistakes", url: "https://www.nngroup.com/articles/top-10-application-design-mistakes/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component incele:",
                "Hangi hataları görüyorsun?",
                "Nasıl iyileştirebilirsin?",
              ],
            },
          },
        ],
      },
      {
        title: "Design System Temelleri",
        description: "Design System, bir ürün ailesinde görsel tutarlılığı, tekrar kullanılabilirliği ve ölçeklenebilirliği sağlayan canlı bir UI altyapısıdır. Amaç: her ekranı yeniden tasarlamamak, UI kararlarını kişiye değil sisteme bağlamak ve tasarım/geliştirme hızını artırmak.",
        topics: [
          {
            title: "Design System Nedir?",
            description: "Design system'ler büyüyen ürünlerde dağılmayı önler, tutarsız UI kararlarını azaltır ve ekipler arası ortak dil oluşturur. Design system ≠ component listesi. Design system = kurallar + bileşenler + prensipler. Bir ürün düşün: Aynı şey kaç farklı şekilde tasarlanmış? Neden?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Design Systems 101", url: "https://www.nngroup.com/articles/design-systems-101/" },
                ],
              },
              {
                category: "📘 Figma",
                items: [
                  { title: "Design Systems 101: What is a design system?", url: "https://www.figma.com/blog/design-systems-101-what-is-a-design-system/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir butona bak: Hover yoksa ne hissediyorsun?",
                "Disabled hali yeterince farklı mı?",
              ],
            },
          },
          {
            title: "UI Kit vs Design System",
            description: "UI Kit sadece component'lerin toplandığı bir kütüphanedir. Design System ise component'ler, kurallar, prensipler ve dokümantasyonu içeren kapsamlı bir sistemdir. UI Kit tasarımı hızlandırır, Design System tutarlılığı ve ölçeklenebilirliği sağlar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Error-Message Guidelines", url: "https://www.nngroup.com/articles/error-message-guidelines/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir hata mesajını oku: Ne yapman gerektiği net mi?",
                "Tekrar denemek kolay mı?",
              ],
            },
          },
          {
            title: "Component & Pattern Ayrımı",
            description: "Component tek başına anlamı olan, tekrar kullanılabilen UI yapı taşıdır (örn: button, input). Pattern ise birden fazla component'in bir araya gelerek oluşturduğu çözümdür (örn: form pattern, navigation pattern). Component'ler pattern'ları oluşturur, pattern'lar kullanıcı deneyimini şekillendirir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Designing Empty States in Complex Applications: 3 Guidelines", url: "https://www.nngroup.com/articles/empty-state-interface-design/" },
                  { title: "Progress Indicators", url: "https://www.nngroup.com/articles/progress-indicators/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir boş ekran düşün: Kullanıcı ne yapmalı?",
                "UI bunu söylüyor mu?",
              ],
            },
          },
          {
            title: "Foundations (Color, Type, Spacing, Radius)",
            description: "Foundations tüm UI'ın temelidir ve component'lerden önce gelir. Genellikle şunları içerir: renk rolleri, typography scale, spacing sistemi, radius/elevation. Bir component'e bak: Hangi foundation'lara dayanıyor?",
            resources: [],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component'e bak: Hangi foundation'lara dayanıyor?",
              ],
            },
          },
          {
            title: "Design Token Mantığı (Intro)",
            description: "Design token tasarım kararlarının adlandırılmış halidir. Örnek: primary.color, spacing.sm, radius.md. Token'lar theming'i kolaylaştırır ve tasarım–dev uyumunu artırır. Bir rengi düşün: Hex yerine rol adıyla çağırabilir misin?",
            resources: [
              {
                category: "📘 Martin Fowler",
                items: [
                  { title: "Design Token-Based UI Architecture", url: "https://martinfowler.com/articles/design-token-based-ui-architecture.html#:~:text=Design%20tokens%20are%20design%20decisions,and%20improved%20consistency%20in%20design." },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir rengi düşün: Hex yerine rol adıyla çağırabilir misin?",
              ],
            },
          },
          {
            title: "Theming & Variants",
            description: "Theming bir design system'in farklı görsel kimliklerle (light/dark, brand variations) kullanılabilmesini sağlar. Variants ise aynı component'in farklı durumlarını (size, style, state) tanımlar. Bir component düşün: Kaç farklı tema altında çalışabilir?",
            resources: [
              {
                category: "📘 UXPin",
                items: [
                  { title: "Design System Theming", url: "https://www.uxpin.com/studio/blog/design-system-theming/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component düşün: Kaç farklı tema altında çalışabilir?",
              ],
            },
          },
          {
            title: "Design System ile Ölçeklenebilirlik",
            description: "Design System ürün büyüdükçe tutarlılığı korur, yeni ekip üyelerinin hızlı adapte olmasını sağlar ve tasarım/geliştirme hızını artırır. İyi bir Design System ölçeklenebilir, dokümante edilmiş ve sürdürülebilirdir.",
            resources: [
              {
                category: "📘 CareerFoundry",
                items: [
                  { title: "Microcopy in UX", url: "https://careerfoundry.com/en/blog/ux-design/what-is-microcopy-ux/" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "The 3 I's of Microcopy: Inform, Influence, and Interact", url: "https://www.nngroup.com/articles/3-is-of-microcopy/" },
                ],
              },
              {
                category: "📘 UX Design CC",
                items: [
                  { title: "A mini-guide to microcopy", url: "https://uxdesign.cc/a-mini-guide-to-microcopy-55496469f03b" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir Design System düşün: Ürün 10 kat büyüse ne olur?",
                "Sistem hâlâ çalışır mı?",
              ],
            },
          },
        ],
      },
      {
        title: "Interaction & Motion (Temel)",
        description: "Motion ve etkileşim, bir arayüzün nasıl 'tepki verdiğini', geçişlerin nasıl algılandığını ve kullanıcının nerede olduğunu anlatan görsel ipuçlarıdır. Amaç: dikkat yönlendirmek, durumu açıklamak ve deneyimi akıcı hale getirmek. Motion amaçlı olmalıdır; süs değildir.",
        topics: [
          {
            title: "UI'da Interaction Nedir?",
            description: "Microinteraction tek bir aksiyona verilen küçük tepkidir. Örnekler: butona basıldığında renk değişimi, favoriye ekleme animasyonu, toggle geçişi. İyi microinteraction hızlı, doğal ve dikkat dağıtmayan olmalıdır. Bir microinteraction düşün: Olmazsa ne kaybolur? Varsa kullanıcı ne hisseder?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Microinteractions in User Experience", url: "https://www.nngroup.com/articles/microinteractions/" },
                ],
              },
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "The Role of Micro-interactions in Modern UX", url: "https://www.interaction-design.org/literature/article/micro-interactions-ux?srsltid=AfmBOopLXu8PHd-Pfyo3g-qFMhp1BbKrZCqgMMTe8uayV4fDF4ryWZDF" },
                ],
              },
              {
                category: "📘 UX Design CC",
                items: [
                  { title: "Micro-Interactions: Why, When and How to Use Them to Improve the User Experience", url: "https://uxdesign.cc/micro-interactions-why-when-and-how-to-use-them-to-boost-the-ux-17094b3baaa0" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir microinteraction düşün: Olmazsa ne kaybolur?",
                "Varsa kullanıcı ne hisseder?",
              ],
            },
          },
          {
            title: "Hover, Focus, Active State'ler",
            description: "Motion kararları hız, gecikme ve easing üzerinden algılanır. Yanlış motion yavaşlatır, mide bulandırır ve profesyonellik hissini düşürür. Bir animasyonu izle: Çok mu yavaş? Gereğinden uzun mu?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "The Role of Animation and Motion in UX", url: "https://www.nngroup.com/articles/animation-purpose-ux/" },
                ],
              },
              {
                category: "📘 Adobe",
                items: [
                  { title: "What are motion graphics?", url: "https://www.adobe.com/uk/creativecloud/animation/discover/motion-graphics.html" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir animasyonu izle: Çok mu yavaş?",
                "Gereğinden uzun mu?",
              ],
            },
          },
          {
            title: "Micro Interaction Mantığı",
            description: "Motion dikkati yönlendirebilir ve önceliği gösterebilir. Örnek: modal açılırken arka planın geri çekilmesi, focus olan alanın öne çıkması. Bir geçiş düşün: Motion olmasa kullanıcı nerede olduğunu anlar mı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Animation for Attention", url: "https://www.nngroup.com/articles/animation-usability/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir geçiş düşün: Motion olmasa kullanıcı nerede olduğunu anlar mı?",
              ],
            },
          },
          {
            title: "Motion'ın Amacı (Süs değil, anlam)",
            description: "Sık yapılan hatalar: her şeyi hareketlendirmek, gereksiz bounce'lar, uzun animasyonlar, performansı düşüren motion. Motion görünmez olmalı, baskın değil. Bir ekranı düşün: Motion kapalı olsa hâlâ anlaşılır mı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Animation for Attention", url: "https://www.nngroup.com/articles/animation-usability/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı düşün: Motion kapalı olsa hâlâ anlaşılır mı?",
              ],
            },
          },
          {
            title: "UI Motion'da Dikkat Edilmesi Gerekenler",
            description: "Motion kararları hız, gecikme ve easing üzerinden algılanır. Yanlış motion yavaşlatır, mide bulandırır ve profesyonellik hissini düşürür. Motion görünmez olmalı, baskın değil. Bir animasyonu izle: Çok mu yavaş? Gereğinden uzun mu?",
            resources: [
              {
                category: "📘 Educational Voice",
                items: [
                  { title: "Animated UI Components", url: "https://educationalvoice.co.uk/animated-ui-elements/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component seç: State değişimi motion ile daha mı anlaşılır?",
              ],
            },
          },
        ],
      },
      {
        title: "Accessibility (UI Odaklı)",
        description: "Accessibility (erişilebilirlik), arayüzlerin farklı yetilere sahip kullanıcılar, farklı cihazlar ve farklı çevresel koşullar altında da kullanılabilir olmasını sağlar. Amaç: erişilebilirliği 'opsiyonel' değil varsayılan görmek, UI kararlarının herkesi kapsamasını sağlamak ve yasal/etik riskleri azaltmak.",
        topics: [
          {
            title: "UI'da Accessibility Neden Önemli?",
            description: "Erişilebilirlik sadece engelli kullanıcılar için değildir, herkes için daha iyi UI üretir. UI Designer 'herkes görebilir' varsayımını bırakır ve en zor koşulu baz alarak tasarlar. Bir ekran düşün: Tek el, güneş ışığı, düşük dikkat - hâlâ kullanılabilir mi?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Accessibility and Inclusivity: Study Guide", url: "https://www.nngroup.com/articles/accessibility-inclusivity-study-guide/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran düşün: Tek el, güneş ışığı, düşük dikkat",
                "Hâlâ kullanılabilir mi?",
              ],
            },
          },
          {
            title: "Renk Kontrast Kuralları",
            description: "Renk körlüğü ve düşük görüş çok yaygındır ve çoğu UI tasarımında göz ardı edilir. Kurallar: sadece renkle anlam verme, yeterli kontrast sağla, feedback'i çoklu sinyallerle destekle. Bir hata state'i düşün: Renk kapalı olsa da anlaşılır mı?",
            resources: [
              {
                category: "📘 UX Design CC",
                items: [
                  { title: "Colour contrast in UX", url: "https://uxdesign.cc/colour-contrast-in-ux-design-477011020095" },
                ],
              },
              {
                category: "📘 Tubik Studio",
                items: [
                  { title: "Types of Contrast in User Interface Design", url: "https://blog.tubikstudio.com/contrast-in-user-interface-design/" },
                ],
              },
              {
                category: "📘 Halo Lab",
                items: [
                  { title: "How contrast works in user experience design", url: "https://www.halo-lab.com/blog/how-contrast-works-in-user-experience-design" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir hata state'i düşün: Renk kapalı olsa da anlaşılır mı?",
              ],
            },
          },
          {
            title: "Tipografi & Okunabilirlik",
            description: "Erişilebilir typography yeterli font boyutu, yeterli satır aralığı ve zoom uyumu sağlar. Küçük ve sık metinler en yaygın erişilebilirlik ihlallerindendir. Bir metni %200 büyüt: Bozuluyor mu? Taşıyor mu?",
            resources: [
              {
                category: "📘 Harvard University",
                items: [
                  { title: "Design Readability", url: "https://accessibility.huit.harvard.edu/design-readability" },
                ],
              },
              {
                category: "📘 Willamette University",
                items: [
                  { title: "Readability Guidelines", url: "https://my.willamette.edu/site/digital-accessibility/guidelines/readability" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir formu düşün: Sadece Tab ile tamamlanabiliyor mu?",
                "Focus net mi?",
              ],
            },
          },
          {
            title: "Tıklanabilir Alanlar",
            description: "Web arayüzlerinde klavye ile gezinme ve focus state'leri hayati önemdedir. Focus olmayan UI klavye kullanıcıları için kullanılamaz hale gelir. Bir formu düşün: Sadece Tab ile tamamlanabiliyor mu? Focus net mi?",
            resources: [
              {
                category: "📘 WebAIM",
                items: [
                  { title: "Keyboard Accessibility", url: "https://webaim.org/techniques/keyboard/" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Keyboard-Only Navigation for Improved Accessibility", url: "https://www.nngroup.com/articles/keyboard-accessibility/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir metni %200 büyüt: Bozuluyor mu?",
                "Taşıyor mu?",
              ],
            },
          },
          {
            title: "Accessibility'de Sık Yapılan UI Hataları",
            description: "Her UI tasarımı için hızlı kontrol listesi: Kontrast yeterli mi? Renk tek başına anlam taşıyor mu? Focus state'leri net mi? Metinler okunabilir mi? Boş ve hata state'leri açıklayıcı mı? Bir ekranı checklist ile tara: İlk bulduğun problem ne?",
            resources: [
              {
                category: "📘 Figma",
                items: [
                  { title: "Accessibility Checklist", url: "https://www.figma.com/community/file/1390658349718354530" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı checklist ile tara: İlk bulduğun problem ne?",
              ],
            },
          },
        ],
      },
      {
        title: "UI Pattern'ları",
        description: "UI pattern'ları sık karşılaşılan problemler için kanıtlanmış çözümler sunar. Pattern'lar kullanıcıya tanıdık deneyimler sağlar ve öğrenme maliyetini düşürür. Amaç: her problemi sıfırdan çözmek yerine, kanıtlanmış pattern'ları doğru şekilde kullanmak.",
        topics: [
          {
            title: "UI Pattern Nedir?",
            description: "Web arayüzleri mouse + klavye kullanımına dayanır, hover ve focus gibi state'leri yoğun kullanır ve genellikle daha yüksek bilgi yoğunluğuna sahiptir. Web UI'da önemli noktalar: hover affordance, link davranışları, scroll algısı. Bir web ekranına bak: Hover olmadan anlaşılır mı? Linkler net mi?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Web UX: Study Guide", url: "https://www.nngroup.com/articles/web-ux-study-guide/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir web ekranına bak: Hover olmadan anlaşılır mı?",
                "Linkler net mi?",
              ],
            },
          },
          {
            title: "Form Pattern'ları",
            description: "Mobil UI dokunma odaklıdır, tek el kullanımını hesaba katar ve daha sınırlı alanla çalışır. Mobilde kritik noktalar: dokunma alanı boyutları, thumb reach, safe area'lar. Bir mobil ekran düşün: En sık kullanılan aksiyon nereye yakın? Tek elle erişilebilir mi?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Mobile UX: Study Guide", url: "https://www.nngroup.com/articles/mobile-ux-study-guide/" },
                ],
              },
              {
                category: "📘 Toptal",
                items: [
                  { title: "Mobile UI/UX Design Principles", url: "https://www.toptal.com/designers/ui/mobile-ux-design-principles" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir mobil ekran düşün: En sık kullanılan aksiyon nereye yakın?",
                "Tek elle erişilebilir mi?",
              ],
            },
          },
          {
            title: "Navigation Pattern'ları",
            description: "Her platformun kendi beklentileri vardır: Web → tarayıcı alışkanlıkları, iOS → Human Interface Guidelines, Android → Material Design. Amaç guideline'ları kopyalamak değil, mantığını anlamaktır. Bir iOS ve Android ekranı karşılaştır: Aynı davranış neden farklı görünüyor?",
            resources: [
              {
                category: "📘 Apple",
                items: [
                  { title: "Human Interface Guidelines", url: "https://developer.apple.com/design/human-interface-guidelines" },
                ],
              },
              {
                category: "📘 Google Material Design",
                items: [
                  { title: "Material Design", url: "https://m3.material.io/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir iOS ve Android ekranı karşılaştır: Aynı davranış neden farklı görünüyor?",
              ],
            },
          },
          {
            title: "Feedback & Status Pattern'ları",
            description: "Responsive UI ekran boyutuna göre esner. Adaptive UI belirli breakpoint'lerde farklı tasarlanır. Hangisi? Ürün türüne, içerik yoğunluğuna ve teknik kısıtlara bağlıdır. Bir ekran düşün: Sadece küçülse yeterli mi? Yoksa farklı davranmalı mı?",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Adaptive vs. Responsive Design", url: "https://www.interaction-design.org/literature/article/adaptive-vs-responsive-design?srsltid=AfmBOoqJQ5htDkGkmfBjtkZMaUPreLdhubNCFiRiejNbQlnwx_Iza_AZ" },
                ],
              },
              {
                category: "📘 UXPin",
                items: [
                  { title: "Responsive Design vs. Adaptive Design: Best Choice for Designers", url: "https://www.uxpin.com/studio/blog/responsive-vs-adaptive-design-whats-best-choice-designers/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran düşün: Sadece küçülse yeterli mi?",
                "Yoksa farklı davranmalı mı?",
              ],
            },
          },
          {
            title: "Pattern Kullanırken Dikkat Edilmesi Gerekenler",
            description: "Sık yapılan hatalar: web mantığını mobile taşımak, hover'a güvenmek, küçük dokunma alanları, platforma aykırı navigation. Bu hatalar öğrenme maliyetini artırır ve ürünü yabancı hissettirir. Bir tasarımı düşün: Bu ekran hangi platformda daha zor? Neden?",
            resources: [
              {
                category: "📘 UXPin",
                items: [
                  { title: "Cross-Platform Experience – An In-Depth Guide for Product Designers", url: "https://www.uxpin.com/studio/blog/cross-platform-experience/" },
                ],
              },
              {
                category: "📘 Medium",
                items: [
                  { title: "Cross-Platform UX: Designing Consistency Across Devices", url: "https://medium.com/@harsh.mudgal_27075/cross-platform-ux-designing-consistency-across-devices-42ad853c7e15" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarımı düşün: Bu ekran hangi platformda daha zor?",
                "Neden?",
              ],
            },
          },
        ],
      },
      {
        title: "UI Tasarım Süreci",
        description: "UI tasarım süreci, UX'ten UI'a geçişten başlayarak iteratif tasarım ve refine sürecine kadar uzanan bir yolculuktur. Amaç: sistematik bir yaklaşımla kaliteli UI'lar üretmek ve sürekli iyileştirmek.",
        topics: [
          {
            title: "UI Tasarımına Nereden Başlanır?",
            description: "Design system'ler büyüyen ürünlerde dağılmayı önler, tutarsız UI kararlarını azaltır ve ekipler arası ortak dil oluşturur. Design system ≠ component listesi. Design system = kurallar + bileşenler + prensipler. Bir ürün düşün: Aynı şey kaç farklı şekilde tasarlanmış? Neden?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Design Systems 101" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Why Design Systems Matter – NNGroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Design Systems Are About People" },
                  { title: "Why Products Without Design Systems Break" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ürün düşün: Aynı şey kaç farklı şekilde tasarlanmış?",
                "Neden?",
              ],
            },
          },
          {
            title: "Referans & Inspiration Kullanımı",
            description: "Foundations tüm UI'ın temelidir ve component'lerden önce gelir. Genellikle şunları içerir: renk rolleri, typography scale, spacing sistemi, radius/elevation. Bir component'e bak: Hangi foundation'lara dayanıyor?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Design System Foundations" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Design System Foundations Explained" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Building UI Foundations" },
                  { title: "Why Foundations Come First" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component'e bak: Hangi foundation'lara dayanıyor?",
              ],
            },
          },
          {
            title: "UX'ten UI'a Geçiş",
            description: "Design token tasarım kararlarının adlandırılmış halidir. Örnek: primary.color, spacing.sm, radius.md. Token'lar theming'i kolaylaştırır ve tasarım–dev uyumunu artırır. Bir rengi düşün: Hex yerine rol adıyla çağırabilir misin?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Design Tokens" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Design Tokens Explained" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Design Tokens for UI Designers" },
                  { title: "Why Tokens Matter" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir rengi düşün: Hex yerine rol adıyla çağırabilir misin?",
              ],
            },
          },
          {
            title: "Iteratif UI Tasarımı",
            description: "Component library sistemin görünen yüzüdür. İyi bir library varyantları net tanımlar, state'leri kapsar ve kullanım kurallarını belirtir. Bir component düşün: Kaç varyantı var? Hangileri gerçekten gerekli?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Component Libraries" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Building Component Libraries" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Scaling UI with Component Libraries" },
                  { title: "Component Libraries Done Right" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component düşün: Kaç varyantı var?",
                "Hangileri gerçekten gerekli?",
              ],
            },
          },
          {
            title: "Review & Refine Süreci",
            description: "Theming light/dark, brand varyantları ve ürün bazlı farklılaşmalar için kullanılır. Ama kontrolsüz theme sayısı sistemi kırar. Bir theme düşün: Hangi foundation'lar değişiyor? Hangileri sabit kalmalı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Theming in Design Systems" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Theming Explained" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Design System Theming" },
                  { title: "Managing Variants in UI" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir theme düşün: Hangi foundation'lar değişiyor?",
                "Hangileri sabit kalmalı?",
              ],
            },
          },
        ],
      },
      {
        title: "Developer Handoff (UI Perspektifi)",
        description: "Bu bölüm, UI tasarımının doğru anlaşılmasını, eksiksiz uygulanmasını, canlı üründe bozulmamasını sağlayan iletişim ve aktarım pratiklerini kapsar. Amaç: 'dosyayı attım bitti' yaklaşımını bırakmak, UI kararlarını geliştirilebilir hale getirmek, tasarım–geliştirme arasında ortak dil kurmak.",
        topics: [
          {
            title: "UI Handoff Nedir?",
            description: "UI handoff sadece Figma linki paylaşmak değildir, tasarımın nasıl çalıştığını anlatmaktır. İyi bir handoff belirsizliği azaltır, tekrar soru ihtiyacını düşürür, geliştirme süresini hızlandırır. Bir tasarımı düşün: Developer ilk hangi soruyu sorar? Bunu önceden nasıl netleştirirsin?",
            resources: [
              {
                category: "📘 Figma",
                items: [
                  { title: "The designer's handbook for developer handoff", url: "https://www.figma.com/blog/the-designers-handbook-for-developer-handoff/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir canlı ürüne bak: Tasarımla birebir mi?",
                "Fark varsa neden?",
              ],
            },
          },
          {
            title: "File Organization & Naming",
            description: "İyi organize edilmiş dosyalar ve tutarlı isimlendirme, developer'ların tasarımı hızlı anlamasını ve doğru uygulamasını sağlar. Dosya yapısı ve isimlendirme kuralları net olmalı, herkes aynı dili konuşmalıdır. Bir tasarım dosyası düşün: Developer aradığı şeyi bulabilir mi?",
            resources: [
              {
                category: "📘 Medium",
                items: [
                  { title: "Guidelines for organizing your design files", url: "https://medium.com/@mariamargarida/guidelines-for-organizing-your-design-files-3dcf25fa0475" },
                ],
              },
              {
                category: "📘 Smashing Magazine",
                items: [
                  { title: "UX Design Files Organization Template", url: "https://www.smashingmagazine.com/2025/04/ux-design-files-organization-template/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım dosyası düşün: Developer aradığı şeyi bulabilir mi?",
              ],
            },
          },
          {
            title: "Component Behavior & States",
            description: "Component'lerin davranışlarını ve state'lerini net bir şekilde dokümante etmek, developer'ların component'leri doğru şekilde uygulamasını sağlar. Her component'in farklı state'leri (hover, active, disabled, error) tanımlanmalı ve açıklanmalıdır. Bir component düşün: Tüm state'leri tanımlı mı?",
            resources: [],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component düşün: Tüm state'leri tanımlı mı?",
              ],
            },
          },
          {
            title: "Component Dokümantasyonu",
            description: "UI QA sırasında kontrol edilecekler: spacing tutarlılığı, hizalamalar, renk ve kontrast, typography scale, state'lerin varlığı. Checklist, kaliteyi kişiden bağımsız hale getirir. Bir ekranı checklist ile tara: İlk yakaladığın hata ne?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Design Heuristics" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI QA Checklist" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "UI QA Checklist for Designers" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı checklist ile tara: İlk yakaladığın hata ne?",
              ],
            },
          },
          {
            title: "Developer-Friendly UI Decisions",
            description: "UI tasarımında developer'larla işbirliği yapmak, teknik kısıtlamaları anlamak ve uygulanabilir çözümler üretmek kritiktir. Developer'larla erken ve sürekli iletişim kurmak, tasarımın geliştirme sürecinde sorunsuz ilerlemesini sağlar. Bir tasarım kararı düşün: Developer bu kararı uygulayabilir mi?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Collaboration with Developers", url: "https://www.nngroup.com/articles/developer-designer-relationship/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım kararı düşün: Developer bu kararı uygulayabilir mi?",
              ],
            },
          },
          {
            title: "UI Bug'ları ve Design QA",
            description: "Geliştirme sonrası UI mutlaka kontrol edilmelidir, küçük farklar büyük etki yaratır. UI QA suçlama değil, kalite korumadır. Canlı ürüne bak: Tasarımdan farklı olan ne? Bu fark deneyimi etkiliyor mu?",
            resources: [
              {
                category: "📘 Fireart Studio",
                items: [
                  { title: "What Does Design QA Mean?", url: "https://fireart.studio/blog/what-does-design-qa-mean/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ürün düşün: İlk versiyon ile şimdiki hali arasında",
                "kalite farkı var mı?",
              ],
            },
          },
        ],
      },
      {
        title: "UI Portfolio & Kariyer (Junior)",
        description: "Bu bölüm, Junior UI Designer'ların portfolyosunu doğru kurgulamasını, sektöre gerçekçi beklentilerle girmesini, sürdürülebilir şekilde gelişmesini amaçlar. Amaç: 'güzel ekranlar' yerine UI düşüncesini göstermek, işe alım süreçlerinde net ve anlaşılır olmak, kariyerin erken aşamasında doğru alışkanlıklar kazanmak.",
        topics: [
          {
            title: "UI Portfolio Nedir?",
            description: "İyi bir UI portfolyosu az ama net iş gösterir, görsel kararların nedenlerini açıklar, tutarlılığı ve kaliteyi yansıtır. Junior seviyede 3–5 sağlam case yeterlidir, quantity değil clarity önemlidir. Portfolyondaki bir işi seç: Bu işi neden ekledin? Seni hangi açıdan temsil ediyor?",
            resources: [],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarımı düşün: Developer ilk hangi soruyu sorar?",
                "Bunu önceden nasıl netleştirirsin?",
              ],
            },
          },
          {
            title: "Case Study'de UI Nasıl Anlatılır?",
            description: "Düzenli dosyalar geliştiricinin işi anlamasını kolaylaştırır, yanlış ekran uygulanma riskini azaltır. İyi organizasyon: net sayfa isimleri, component bazlı yapı, gereksiz frame'lerden arınmış dosya. Bir dosyana bak: İlk kez açan biri neyin nerede olduğunu anlar mı?",
            resources: [],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir dosyana bak: İlk kez açan biri neyin nerede olduğunu anlar mı?",
              ],
            },
          },
          {
            title: "UI Case Study Yapısı",
            description: "Developer'lar görünümü değil, davranışı uygular. Bu yüzden state'ler, varyantlar, responsive kurallar net olmalıdır. Bir component seç: Hover yoksa ne olur? Disabled ne zaman kullanılır?",
            resources: [],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component seç: Hover yoksa ne olur?",
                "Disabled ne zaman kullanılır?",
              ],
            },
          },
          {
            title: "Junior UI Designer'dan Beklentiler",
            description: "İyi UI geliştirilebilir UI'dır. Dikkat edilmesi gerekenler: aşırı özel spacing'ler, tek seferlik varyantlar, mantıksız kırılımlar. Basit kurallar daha hızlı, daha stabil, daha tutarlı ürünler sağlar. Bir UI kararını düşün: Bu gerçekten gerekli mi? Yoksa görsel tercih mi?",
            resources: [],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir UI kararını düşün: Bu gerçekten gerekli mi?",
                "Yoksa görsel tercih mi?",
              ],
            },
          },
          {
            title: "UI'da Sürekli Gelişim",
            description: "Geliştirme sonrası UI mutlaka kontrol edilmelidir, küçük farklar büyük etki yaratır. UI QA suçlama değil, kalite korumadır. Canlı ürüne bak: Tasarımdan farklı olan ne? Bu fark deneyimi etkiliyor mu?",
            resources: [],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Canlı ürüne bak: Tasarımdan farklı olan ne?",
                "Bu fark deneyimi etkiliyor mu?",
              ],
            },
          },
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
        title: "Product Design Temelleri",
        description: "Product Design'ın ne olduğunu, Product Designer'ın rolünü ve Product Design'ın UX, UI ile ilişkisini anlamak.",
        topics: [
          {
            title: "Product Design Nedir?",
            description: "Product Design, kullanıcı deneyimi, arayüz tasarımı ve ürün stratejisini birleştirerek anlamlı ve değer yaratan ürünler oluşturma sürecidir. Sadece ekran tasarlamak değil, kullanıcı ve iş hedeflerini birlikte ele alarak problem çözmektir.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Product Design — The Process of Creating Products People Love", url: "https://www.interaction-design.org/literature/topics/product-design" },
                ],
              },
              {
                category: "📘 Figma",
                items: [
                  { title: "What is product design?", url: "https://www.figma.com/resource-library/what-is-product-design/" },
                ],
              },
            ],
          },
          {
            title: "Product Designer'ın Rolü",
            description: "Product Designer sadece UX veya UI yapan kişi değildir, ürün kararlarının tasarım tarafındaki ortağıdır. Sorumluluk alanı: problemi doğru tanımlamak, çözüm alternatiflerini düşünmek, kullanıcıyı temsil etmek, kararların etkisini sorgulamak. Product Designer karar veren değil, kararı şekillendiren kişidir.",
            resources: [
              {
                category: "📘 Figma",
                items: [
                  { title: "What is product design?", url: "https://www.figma.com/resource-library/what-is-product-design/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir feature düşün: Bu feature olmasa ürün çöker mi?",
                "Yoksa sadece 'nice to have' mi?",
              ],
            },
          },
          {
            title: "UX, UI ve Product Design Arasındaki Farklar",
            description: "UX Design: Problemi anlar ve çözümün kullanıcı için çalışıp çalışmadığını test eder. UI Design: Görsel dili ve arayüzü tasarlar. Product Design: UX + UI + iş hedeflerini birlikte ele alır. Bu roller çoğu şirkette örtüşebilir, ama bakış açıları farklıdır.",
            resources: [
              {
                category: "📘 CareerFoundry",
                items: [
                  { title: "What is the Difference Between a UX Designer and a Product Designer?", url: "https://careerfoundry.com/en/blog/ux-design/what-is-the-difference-between-a-ux-designer-and-a-product-designer/" },
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
              ],
            },
          },
          {
            title: "Product Mindset Nedir?",
            description: "Product Mindset, tasarımcının ekrana değil probleme odaklanmasını, çözümden önce değeri sorgulamasını, kullanıcı, iş ve teknik gerçekliği birlikte düşünmesini sağlayan düşünme biçimidir. Product Sense doğru soruları sorabilme yetisidir, zamanla gelişir, deneyimle güçlenir.",
            resources: [
              {
                category: "📘 Product School",
                items: [
                  { title: "Ürün Odaklı Bir Zihniyet Nasıl Oluşturulur?", url: "https://productschool.com/blog/product-fundamentals/product-mindset-for-yourself-and-your-organization" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Günlük kullandığın bir ürünü seç: En sevdiğin özellik neden iyi?",
                "En sinir olduğun şey neden kötü?",
              ],
            },
          },
          {
            title: "Kullanıcı ve İş Dengesi",
            description: "Gerçek ürünlerde kullanıcı her istediğini alamaz, iş her istediğini yaptıramaz. Product Designer iki taraf arasında denge kurar, kör savunma yapmaz. İyi Product Thinking ortak noktayı arar.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir çatışma düşün: Kullanıcıyı mutlu eden ama iş için riskli olan ne?",
                "Bunun orta yolu ne olabilir?",
              ],
            },
          },
        ],
      },
      {
        title: "Ürün Düşüncesi & İş Perspektifi",
        description: "Ürünün neden var olduğunu, kullanıcı ve iş problemlerini, değer önerisini ve Product Designer'ın işe etkisini anlamak.",
        topics: [
          {
            title: "Ürün Neden Var?",
            description: "Her ürün bir problemi çözmek için vardır. Ürünün var olma nedeni kullanıcının hayatını kolaylaştırmak, bir iş problemini çözmek veya yeni bir değer yaratmaktır. Product Designer ürünün amacını sorgulayarak başlar.",
          },
          {
            title: "Kullanıcı Problemi vs İş Problemi",
            description: "Kullanıcı problemi, kullanıcının yaşadığı zorluk veya ihtiyaçtır. İş problemi ise şirketin çözmeye çalıştığı iş hedefleri veya kısıtlardır. Product Designer hem kullanıcıyı hem de işi anlayarak denge kurmalıdır. İyi ürünler bu iki problemi birlikte çözer.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir feature düşün: Bu feature hangi kullanıcı problemini çözüyor?",
                "Bu feature hangi iş problemini çözüyor?",
              ],
            },
          },
          {
            title: "Değer Önerisi (Value Proposition)",
            description: "Bir ürün kararı ancak şu üçü kesişiyorsa değerlidir: Kullanıcı için anlamlı, İş için mantıklı, Teknik olarak yapılabilir. Değer önerisi, ürünün kullanıcıya sağladığı benzersiz değeri açıklar. Bu üçlüden biri yoksa risk vardır, sürdürülebilirlik düşer.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Value Proposition in UX" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir fikir düşün: Kullanıcı için neden değerli?",
                "İş tarafında hangi probleme hizmet ediyor?",
              ],
            },
          },
          {
            title: "Outcome Odaklı Düşünme",
            description: "Product Thinking output değil, outcome üretir. Output: Yeni ekran. Outcome: Kullanıcı daha hızlı işini tamamladı. Tasarımın başarısı kaç ekran çizildiğiyle değil, hangi davranış değiştiğiyle ölçülür.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Outcomes vs Outputs" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım kararı için sor: Kullanıcının hangi davranışı değişmeli?",
                "Bunu nasıl anlayacaksın?",
              ],
            },
          },
          {
            title: "Product Designer'ın İşe Etkisi",
            description: "Product Designer yaptığı işin iş hedeflerine nasıl katkı sağladığını anlayabilmelidir. Bu etki kullanıcı memnuniyeti, hız, hata oranı, benimsenme, iş metrikleri gibi sinyallerle anlatılır.",
          },
        ],
      },
      {
        title: "Product Discovery (UX Discovery)",
        description: "Product Discovery, doğru problemi bulmak, varsayımları test etmek ve sürekli öğrenmeyi sağlamak için yapılan araştırma ve öğrenme sürecidir.",
        topics: [
          {
            title: "Product Discovery Nedir?",
            description: "Product Discovery, doğru problemi bulmak ve doğru çözümü keşfetmek için yapılan süreçtir. Discovery aşamasında kullanıcı ihtiyaçları, iş hedefleri ve teknik kısıtlar birlikte ele alınır. Amaç: yanlış problemi çözmekten kaçınmak ve en çok değer yaratan çözümü bulmaktır.",
            resources: [
              {
                category: "📘 Miro",
                items: [
                  { title: "What is product discovery", url: "https://miro.com/product-development/what-is-product-discovery/" },
                ],
              },
              {
                category: "📘 ProductPlan",
                items: [
                  { title: "Product Discovery", url: "https://www.productplan.com/glossary/product-discovery/" },
                ],
              },
            ],
          },
          {
            title: "Discovery vs Delivery",
            description: "Ürün geliştirme süreci iki ana fazda ilerler: Discovery (Doğru problemi bulmak) ve Delivery (Bulduğun problemi doğru çözmek). Discovery aşamasında belirsizlik yüksektir, Delivery'de ise çözüm netleşmiştir. Product Designer'ın asıl gücü discovery aşamasında ortaya çıkar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Upfront vs. Continuous Discovery", url: "https://www.nngroup.com/videos/upfront-vs-continuous-discovery/" },
                  { title: "UX Activities in the Product Lifecycle", url: "https://media.nngroup.com/media/articles/attachments/ux_methods_activities_NNg_A4.pdf" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Discovery in Agile – NNGroup", url: "https://www.nngroup.com/videos/discovery-in-agile/" },
                  { title: "Product Discovery – Teresa Torres", url: "https://www.producttalk.org/" },
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
            title: "Doğru Problemi Bulmak",
            description: "En yaygın hata: problemi dinler dinlemez çözüm düşünmek. Doğru problemi bulmak için: neden bu sorun var? kim için sorun? gerçekten çözülmeli mi? Product Thinking = önce problem, sonra çözüm.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Problem vs Solution" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "'Kullanıcı X istiyor' cümlesini şuna çevir:",
                "'Kullanıcı aslında neyi başarmaya çalışıyor?'",
              ],
            },
          },
          {
            title: "Varsayımlar & Hipotezler",
            description: "Birçok ürün kararı veri değil varsayım içerir. Örnek varsayımlar: 'Kullanıcı bunu anlar', 'Bu daha hızlıdır', 'Bu daha kolaydır'. Product Thinking varsayımı fark eder, test edilebilir hale getirir. Varsayım haritalama varsayımları görünür yapar, hangilerinin riskli olduğunu gösterir.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Assumptions in UX", url: "https://www.interaction-design.org/literature/topics/assumptions?srsltid=AfmBOorcen3SFiTkK05j9ZsDC_Ak4fHZFrbEf_ApIOwqYyPiP5wpbt6H" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir karar yaz: Bu karar hangi varsayıma dayanıyor?",
                "Bu varsayımı nasıl doğrularsın?",
              ],
            },
          },
          {
            title: "Discovery Sürekliliği",
            description: "Discovery bir faz değil, sürekli bir düşünme biçimidir. Upfront discovery başlangıçta yapılır, continuous discovery ise sürekli devam eder. Product Designer discovery'i sadece başta değil, her aşamada yapmalıdır. Araştırma belirsizlik varsa yapılır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Upfront vs. Continuous Discovery", url: "https://www.nngroup.com/videos/upfront-vs-continuous-discovery/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Son sprinti düşün: Hangi noktada 'emin değiliz' dediniz?",
                "Orada araştırma yapılsa ne öğrenilirdi?",
              ],
            },
          },
        ],
      },
      {
        title: "Kullanıcıyı Anlamak",
        description: "Kullanıcı araştırması temelleri, nitel ve nicel araştırma yöntemleri, kullanıcı görüşmeleri ve içgörü üretme süreçleri.",
        topics: [
          {
            title: "Kullanıcı Araştırması Temelleri",
            description: "Araştırma bir faz değil, bir düşünme biçimidir. Yanlış yaklaşım: 'Tasarım yaptık, şimdi test edelim'. Doğru yaklaşım: 'Henüz emin değiliz, önce anlayalım'. Research mindset emin olmamayı kabul eder, varsayımları görünür kılar, hızlı öğrenmeyi önemser. Araştırma yapılması gereken anlar: Yeni bir problem tanımlanıyorsa, Kullanıcı davranışı beklenenden farklıysa, Ekip 'neden böyle?' diye tartışıyorsa.",
            resources: [
              {
                category: "📘 Interaction Design Foundation",
                items: [
                  { title: "Kullanıcı araştırması nedir?", url: "https://www.interaction-design.org/literature/topics/user-research" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ürün kararını düşün: Bu karar hangi bilgiye dayanıyor?",
                "Bu bilgi gerçekten kullanıcıdan mı geliyor?",
              ],
            },
          },
          {
            title: "Nitel & Nicel Araştırma",
            description: "Qualitative: derinlik, neden, bağlam. Quantitative: yaygınlık, trend, karşılaştırma. Product Designer ikisini birlikte okumayı öğrenir. Nitel araştırma 'neden?' sorusunu, nicel araştırma 'ne kadar?' sorusunu cevaplar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Quantitative & Qualitative Research: Study Guide", url: "https://www.nngroup.com/articles/quantitative-research-study-guide/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir problem için sor: Önce hangisi gerekli?",
                "Neden?",
              ],
            },
          },
          {
            title: "Kullanıcı Görüşmeleri",
            description: "User interview kullanıcıyı ikna etme değil, onu anlama çabasıdır. İyi interview 'neden?' sorusunu derinleştirir, yönlendirme yapmaz, çözüm değil deneyim konuşur.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "User Interviews", url: "https://www.nngroup.com/articles/user-interviews/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir soru yaz: 'Bu özelliği beğendin mi?' yerine",
                "'Bu noktada ne yapmaya çalışıyordun?'",
              ],
            },
          },
          {
            title: "Davranışsal vs Tutumsal Veri",
            description: "Kullanıcılar her zaman doğruyu söylemez ama her zaman bir şey yapar. Davranışsal veri kullanıcının ne yaptığını gösterir (contextual inquiry, analytics), tutumsal veri kullanıcının ne düşündüğünü gösterir (interview, survey). İkisi birlikte anlamlıdır.",
            resources: [
              {
                category: "📘 Kullanıcı Deneyimi",
                items: [
                  { title: "Tutumsal ve Davranışsal UX Araştırma Yöntemleri Nelerdir?", url: "https://www.kullanicideneyimi.org.tr/blog/tutumsal-davranissal-ux-arastirma-yontemleri" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir kullanıcıyı düşün: Söylediğiyle yaptığı çelişiyor mu?",
                "Hangisi daha değerli?",
              ],
            },
          },
          {
            title: "İçgörü (Insight) Üretme",
            description: "Araştırmanın en kritik kısmı veri toplamak değil, anlam çıkarmaktır. Insight tekrar eden davranışlardan, güçlü sinyallerden, bağlamdan doğar. İçgörü üretme: veri → pattern → insight → karar zincirini kurmaktır.",
            resources: [
              {
                category: "📘 Medium",
                items: [
                  { title: "UX Research Synthesis", url: "https://medium.com/@whatismunadoing/ux-research-synthesis-4e623a80527a" },
                ],
              },
              {
                category: "📘 UX Tweak",
                items: [
                  { title: "UX Research Synthesis 101: How to Synthesize UX Research Data", url: "https://blog.uxtweak.com/ux-research-synthesis/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "3 gözlem yaz: Bunlar hangi ortak probleme işaret ediyor?",
              ],
            },
          },
        ],
      },
      {
        title: "Problem Tanımı & Çerçeveleme",
        description: "Problem statement yazımı, Jobs To Be Done, kullanıcı ihtiyaçları ve pain point'ler, opportunity alanları ve problem önceliklendirme.",
        topics: [
          {
            title: "Problem Statement Yazımı",
            description: "Problem statement problemi net, ölçülebilir ve çözülebilir şekilde tanımlar. İyi bir problem statement: kime yönelik olduğunu, ne problemini çözdüğünü, neden önemli olduğunu açıklar. Problem statement yoksa çözüm de hedefli olamaz.",
          },
          {
            title: "Jobs To Be Done (JTBD)",
            description: "JTBD yaklaşımı kullanıcıyı değil, kullanıcının yapmak istediği işi merkeze alır. Kullanıcı ürünü değil, bir sonucu 'işe alır'. JTBD yaklaşımı kullanıcının gerçek motivasyonunu anlamaya yardımcı olur.",
            resources: [
              {
                category: "📘 UX Planet",
                items: [
                  { title: "Jobs to Be Done (JTBD) in Product Design", url: "https://uxplanet.org/jobs-to-be-done-jtbd-in-product-design-6065e7bec122" },
                ],
              },
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Personas vs. Jobs-to-Be-Done", url: "https://www.nngroup.com/articles/personas-jobs-be-done/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir özelliği düşün: Kullanıcı bunu neden 'işe alıyor'?",
                "Hangi işi çözmek için?",
              ],
            },
          },
          {
            title: "Kullanıcı İhtiyaçları & Pain Point'ler",
            description: "Kullanıcı ihtiyaçları kullanıcının gerçekleştirmek istediği hedefler, pain point'ler ise bu hedeflere ulaşmayı engelleyen zorluklardır. İyi ürünler hem ihtiyacı karşılar hem de pain point'i çözer.",
          },
          {
            title: "Opportunity Alanlarını Belirleme",
            description: "Opportunity alanları, kullanıcı ihtiyaçları ve iş hedeflerinin kesiştiği, çözüm üretilebilecek alanlardır. Opportunity alanlarını belirlemek için: kullanıcı ihtiyaçlarını, pain point'leri, iş hedeflerini ve teknik kısıtları birlikte düşünmek gerekir.",
          },
          {
            title: "Problem Önceliklendirme",
            description: "Her şey önemliyse, hiçbir şey önemli değildir. Problem önceliklendirme etki (impact), çaba (effort), risk ve kullanıcı aciliyeti üzerinden düşünülür. Önceliklendirme yapılmazsa kaynaklar dağılır, etki azalır.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Üç problem yaz: En çok etki hangisinde?",
                "En az çaba hangisinde?",
              ],
            },
          },
        ],
      },
      {
        title: "Fikir Üretimi & Çözüm Alanı",
        description: "Ideation teknikleri, çözüm alternatifleri üretme, diverge & converge mantığı, hızlı fikir değerlendirme ve çözüm varsayımları.",
        topics: [
          {
            title: "Ideation Teknikleri",
            description: "Ideation teknikleri yaratıcı fikir üretmek için kullanılan yöntemlerdir. Örnek teknikler: brainstorming, mind mapping, SCAMPER, worst possible idea, analogies. Ideation teknikleri çözüm alanını genişletir.",
          },
          {
            title: "Çözüm Alternatifleri Üretme",
            description: "Tek bir çözüm üretmek yerine, birden fazla alternatif düşünmek daha iyi sonuçlar verir. Çözüm alternatifleri üretirken: farklı yaklaşımlar dene, kısıtları kaldırmayı dene, 'ya şöyle olsaydı?' sor.",
          },
          {
            title: "Diverge & Converge Mantığı",
            description: "Diverge aşamasında çok sayıda fikir üretilir, converge aşamasında bu fikirler değerlendirilip daraltılır. Önce diverge yap, sonra converge. Diverge yapılmadan converge yapılırsa daha iyi çözümler kaçırılabilir.",
          },
          {
            title: "Hızlı Fikir Değerlendirme",
            description: "Her fikri detaylı değerlendirmek yerine, hızlı değerlendirme kriterleri kullan. Örnek kriterler: kullanıcı değeri, teknik yapılabilirlik, iş değeri, çaba. Hızlı değerlendirme ile daha umut verici fikirler üzerinde odaklanılır.",
          },
          {
            title: "Çözüm Varsayımları",
            description: "Her çözüm fikri bir varsayıma dayanır. Örnek varsayımlar: 'Kullanıcı bunu anlar', 'Bu daha hızlıdır', 'Bu daha kolaydır'. Çözüm varsayımlarını görünür kılmak ve test etmek, yanlış çözüme yatırım yapmayı önler.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir çözüm fikri yaz: Bu fikir hangi varsayıma dayanıyor?",
                "Bu varsayımı nasıl test edersin?",
              ],
            },
          },
        ],
      },
      {
        title: "Ürün Akışları & Deneyim Tasarımı",
        description: "User flow'lar, task flow'lar, bilgi mimarisi, deneyim tutarlılığı ve edge case düşüncesi ile bütünsel deneyim tasarımı.",
        topics: [
          {
            title: "User Flow'lar",
            description: "User Journey kullanıcının hedefe giderken geçtiği adımların haritasıdır. User flow birden fazla hedefi kapsayan geniş akıştır. Amaç: sürtünme noktalarını görmek, kritik anları (moments that matter) yakalamak. Journey map tek ekran değil, uçtan uca deneyimi gösterir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Journey mapping 101", url: "https://www.nngroup.com/articles/journey-mapping-101/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir akışı düşün: Kullanıcı en çok nerede duraksıyor?",
                "Neden?",
              ],
            },
          },
          {
            title: "Task Flow'lar",
            description: "Task flow tek bir işi yapma adımlarıdır. Task flow'lar user flow'lardan daha dar kapsamlıdır ve belirli bir görevi tamamlama sürecini gösterir. UX tasarımı bu akışları sadeleştirmeye çalışır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "User journeys vs user flows", url: "https://www.nngroup.com/articles/user-journeys-vs-user-flows/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir görev seç: Kaç adım var?",
                "Hangisi gerçekten gerekli?",
              ],
            },
          },
          {
            title: "Bilgi Mimarisi (IA)",
            description: "Information Architecture içeriğin nasıl gruplanacağı, nasıl adlandırılacağı, nasıl bulunacağı ile ilgilenir. İyi IA kullanıcıyı düşündürmez, aradığını sezgisel olarak buldurur.",
            resources: [
              {
                category: "📘 UX Design Institute",
                items: [
                  { title: "What is information architecture?", url: "https://www.uxdesigninstitute.com/blog/what-is-information-architecture/" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir menüyü incele: Bu başlık altında gerçekten bu içerik olmalı mı?",
              ],
            },
          },
          {
            title: "Deneyim Tutarlılığı",
            description: "Deneyim tutarlılığı, kullanıcının ürünün farklı bölümlerinde aynı davranışları görmesini ve aynı beklentileri geliştirmesini sağlar. Tutarlı deneyim öğrenme maliyetini düşürür, güven oluşturur.",
          },
          {
            title: "Edge Case Düşüncesi (High-level)",
            description: "Edge case'ler, kullanıcının beklenen akış dışında kaldığı durumlardır. High-level edge case düşüncesi: hata durumları, boş durumlar, limit durumları gibi kritik anları önceden düşünmektir.",
          },
        ],
      },
      {
        title: "Wireframe & Prototipleme",
        description: "Low-fidelity wireframe'ler, deneyim odaklı wireframe, prototipleme ile test etme, fidelity seviyeleri ve karar vermek için prototip.",
        topics: [
          {
            title: "Low-Fidelity Wireframe'ler",
            description: "Low-fi wireframe'ler: hızlıdır, ucuzdur, tartışmaya açıktır. Bu yüzden discovery ve erken çözüm aşamasında idealdir. Low-fidelity wireframe'ler detaydan çok yapıya odaklanır.",
          },
          {
            title: "Deneyim Odaklı Wireframe",
            description: "Deneyim odaklı wireframe, kullanıcının ürünle etkileşimini ve akışını ön planda tutar. Detaydan çok deneyim akışına, içerikten çok kullanıcı eylemlerine odaklanır.",
          },
          {
            title: "Prototipleme ile Test Etme",
            description: "Prototype: sunum için değil, test için yapılır. İyi prototype: sadece test edilecek akışı içerir, her detayı kapsamaz. Prototipleme ile test etme, çözüm varsayımlarını doğrulama imkanı sağlar.",
          },
          {
            title: "Fidelity Seviyeleri",
            description: "Fidelity seviyeleri low-fidelity'den high-fidelity'ye kadar değişir. Low-fidelity hızlı test için, high-fidelity detaylı test ve developer handoff için kullanılır. Doğru fidelity seviyesini seçmek, zamanı ve kaynağı verimli kullanmak için önemlidir.",
          },
          {
            title: "Karar Vermek İçin Prototip",
            description: "Prototip karar vermek için bir araçtır. Prototip ile hangi çözümün daha iyi çalıştığını, kullanıcının hangi akışı tercih ettiğini test edebilirsin. Karar vermek için prototip: hızlı, odaklı ve test edilebilir olmalıdır.",
          },
        ],
      },
      {
        title: "UI & Design System ile Çalışmak",
        description: "UI ve Product Design ilişkisi, Design System kullanımı, component bazlı tasarım, tutarlılık & ölçeklenebilirlik ve UI kararlarının ürüne etkisi.",
        topics: [
          {
            title: "UI ve Product Design İlişkisi",
            description: "UI, Product Design'ın görsel ve etkileşimsel katmanıdır. UI sadece görsel değil, kullanıcı deneyimini şekillendiren bir araçtır. UI kararları Product Design kararlarıyla uyumlu olmalıdır.",
          },
          {
            title: "Design System Kullanımı",
            description: "Design System, tutarlı ve ölçeklenebilir ürünler oluşturmak için kullanılan component, pattern ve guideline'ların birleşimidir. Design System kullanımı, hız, tutarlılık ve ölçeklenebilirlik sağlar.",
          },
          {
            title: "Component Bazlı Tasarım",
            description: "Component bazlı tasarım, tekrar eden UI elementlerini yeniden kullanılabilir parçalara böler. Component bazlı tasarım: tutarlılık sağlar, geliştirme hızını artırır, bakımı kolaylaştırır.",
          },
          {
            title: "Tutarlılık & Ölçeklenebilirlik",
            description: "Tutarlılık öğrenme maliyetini düşürür, kullanıcıyı rahatlatır. Ölçeklenebilirlik ise ürün büyüdükçe tutarlılığı ve kaliteyi korur. Design System bu ikisini birlikte sağlar.",
          },
          {
            title: "UI Kararlarının Ürüne Etkisi",
            description: "UI kararları sadece görsel değil, kullanıcı davranışını ve ürün metriklerini etkiler. İyi UI kararları: kullanıcı deneyimini iyileştirir, ürün hedeflerine katkı sağlar, teknik kısıtları dikkate alır.",
          },
        ],
      },
      {
        title: "MVP & Iterasyon",
        description: "MVP nedir ne değildir, scope belirleme, hızlı teslim – öğrenme döngüsü, iteratif gelişim ve öğrenilenlere göre iyileştirme.",
        topics: [
          {
            title: "MVP Nedir? Ne Değildir?",
            description: "MVP en küçük çözüm değil, en çok öğrenme sağlayan çözümdür. MVP, kullanıcıya değer sağlayan ve test edilebilir varsayımları doğrulayan en küçük özellik setidir. Amaç kusursuzluk değil, öğrenme hızıdır.",
          },
          {
            title: "Scope Belirleme",
            description: "Scope belirleme, MVP'ye hangi özelliklerin dahil edileceğini, hangilerinin sonraya bırakılacağını karar vermektir. Scope belirleme: kullanıcı değeri, iş değeri, teknik yapılabilirlik ve öğrenme hedeflerini birlikte düşünmektir.",
          },
          {
            title: "Hızlı Teslim – Öğrenme Döngüsü",
            description: "Hızlı teslim – öğrenme döngüsü, kısa sprint'lerde ürünü canlıya alıp, kullanıcı davranışından öğrenmeyi sağlar. Bu döngü: build → measure → learn → iterate mantığıyla çalışır.",
          },
          {
            title: "Iteratif Gelişim",
            description: "İyi ürünler tek seferde 'mükemmel' olmaz, iterasyonla gelişir. Iteratif gelişim: her iterasyonda öğrenilenleri bir sonraki versiyona yansıtarak sürekli iyileştirmektir. Iteration geri adım değil, öğrenmenin sonucudur.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım için sor: Bugün yeniden yapsan neyi değiştirirdin?",
                "Neden?",
              ],
            },
          },
          {
            title: "Öğrenilenlere Göre İyileştirme",
            description: "Öğrenilenlere göre iyileştirme, test sonuçlarını, kullanıcı feedback'ini ve metrikleri analiz ederek ürünü geliştirmektir. Öğrenme yoksa iyileştirme de olmaz.",
          },
        ],
      },
      {
        title: "Validasyon & Test",
        description: "Çözüm doğrulama, usability testleri, konsept testleri, feedback toplama ve test sonuçlarını ürüne yansıtma.",
        topics: [
          {
            title: "Çözüm Doğrulama",
            description: "Çözüm doğrulama, ürettiğiniz çözümün gerçekten problemi çözüp çözmediğini test etmektir. Çözüm doğrulama: kullanıcıların çözümü kullanabilmesi, problemi çözebilmesi ve çözümden değer alabilmesi ile ölçülür.",
          },
          {
            title: "Usability Testleri",
            description: "Usability testleri, kullanıcıların ürünü kullanırken ne kadar kolay, hızlı ve hatasız bir şekilde görevlerini tamamlayabildiğini ölçer. Usability testleri: görev tamamlama süresi, hata oranı, kullanıcı memnuniyeti gibi metriklerle ölçülür.",
          },
          {
            title: "Konsept Testleri",
            description: "Konsept testleri, kullanıcıların yeni bir fikri veya konsepti nasıl algıladığını ve ne kadar değerli bulduğunu anlamak için yapılır. Konsept testleri: kullanıcı görüşmeleri, prototip testleri ve A/B testleri ile yapılabilir.",
          },
          {
            title: "Feedback Toplama",
            description: "Feedback toplama, kullanıcılardan, stakeholder'lardan ve ekipten ürün hakkında geri bildirim toplamaktır. İyi feedback toplama: net sorular sorar, yapıcı geri bildirim alır, geri bildirimi analiz eder ve ürüne yansıtır.",
          },
          {
            title: "Test Sonuçlarını Ürüne Yansıtma",
            description: "Test sonuçlarını ürüne yansıtma, test bulgularını analiz edip, öğrenilenleri ürün geliştirme sürecine entegre etmektir. Test yapıp sonuçları yansıtmamak, test yapmamaktan daha kötüdür.",
          },
        ],
      },
      {
        title: "Metrikler & Etki Ölçümü",
        description: "Product metrikleri nedir, output vs outcome, UX & product metrikleri, başarıyı ölçmek ve öğrenme odaklı KPI'lar.",
        topics: [
          {
            title: "Product Metrikleri Nedir?",
            description: "Product metrikleri, ürünün başarısını ve kullanıcı davranışını ölçmek için kullanılan sayısal göstergelerdir. Product metrikleri: activation, adoption, retention, revenue gibi farklı kategorilerde olabilir.",
          },
          {
            title: "Output vs Outcome",
            description: "Output yaptığın iştir (ör. yeni ekran), outcome ise yarattığın etkidir (ör. kullanıcı daha hızlı işini tamamladı). Product Designer output değil, outcome üretir. Tasarımın başarısı kaç ekran çizildiğiyle değil, hangi davranış değiştiğiyle ölçülür.",
          },
          {
            title: "UX & Product Metrikleri",
            description: "UX ve Product metrikleri birlikte okunur. Örnek UX metrikleri: görev tamamlama süresi, hata oranı, kullanıcı memnuniyeti. Örnek Product metrikleri: activation, adoption, retention. Tek başına biri yeterli değildir.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir feature seç: UX tarafında neyi ölçerdin?",
                "Product tarafında neyi izlerdin?",
              ],
            },
          },
          {
            title: "Başarıyı Ölçmek",
            description: "Başarıyı ölçmek, tasarım kararlarının ne kadar etkili olduğunu anlamak için metrikleri kullanmaktır. İyi bir success metric net, ölçülebilir, davranışa bağlıdır. Başarı 'ekran yayına alındı' değildir, 'kullanıcı şu işi daha kolay yaptı'dır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Metrics" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım için yaz: Bu tasarım başarılı olursa ne değişir?",
                "Bunu hangi sinyalle anlarsın?",
              ],
            },
          },
          {
            title: "Öğrenme Odaklı KPI'lar",
            description: "Öğrenme odaklı KPI'lar, ürün kararlarının doğruluğunu öğrenmek için kullanılan metriklerdir. Öğrenme odaklı KPI'lar: 'kullanıcılar bu özelliği kullanıyor mu?', 'bu özellik problemi çözüyor mu?' gibi sorulara cevap verir.",
          },
        ],
      },
      {
        title: "Ekiplerle Çalışma",
        description: "Product Manager ile çalışmak, developer'larla çalışmak, stakeholder yönetimi, karar alma süreçleri ve cross-functional iş birliği.",
        topics: [
          {
            title: "Product Manager ile Çalışmak",
            description: "PM ürün hedeflerini, öncelikleri, iş etkisini temsil eder. Product Designer kullanıcı perspektifini, deneyim kalitesini, riskleri ortaya koyar. Sağlıklı ilişki: erken konuşmak, birlikte problem tanımlamak, çözümü birlikte şekillendirmek.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Designers & Product Managers" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir PM konuşmasını düşün: Problem net miydi?",
                "Yoksa sadece çözüm mü konuşuldu?",
              ],
            },
          },
          {
            title: "Developer'larla Çalışmak",
            description: "Developer'lar tasarımı değil, davranışı uygular. İyi iletişim niyeti açıklar, edge-case yerine temel mantığı anlatır, 'neden böyle'yi paylaşır. Amaç tasarımın canlıda bozulmamasıdır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Designers & Developers" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarımı düşün: Developer'a sadece 'nasıl göründüğünü' mü anlattın?",
                "Yoksa 'nasıl çalıştığını' mı?",
              ],
            },
          },
          {
            title: "Stakeholder Yönetimi",
            description: "Stakeholder'lar karar vericidir, ama her zaman kullanıcıyı temsil etmez. Product Designer feedback'i filtreler, kişisel görüş ile kullanıcı ihtiyacını ayırır, kararı veriye bağlar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Stakeholder Feedback" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir feedback düşün: Bu kişisel mi?",
                "Yoksa kullanıcıdan gelen bir sinyal mi?",
              ],
            },
          },
          {
            title: "Karar Alma Süreçleri",
            description: "Karar alma süreçleri, ekip içinde karar verme yöntemlerini ve süreçlerini içerir. İyi karar alma süreçleri: problemi net tanımlar, alternatifleri değerlendirir, veriye dayalı karar verir, kararı dokümante eder.",
          },
          {
            title: "Cross-functional İş Birliği",
            description: "Cross-functional iş birliği, farklı ekiplerle (PM, developer, data, marketing vb.) birlikte çalışarak ürün geliştirmektir. İyi cross-functional iş birliği: erken iletişim, ortak hedefler, açık feedback döngüleri ve karşılıklı saygı gerektirir.",
          },
        ],
      },
      {
        title: "Teslim, Dokümantasyon & Handoff",
        description: "Product Design handoff, kararların dokümantasyonu, tasarım – geliştirme uyumu, Design QA ve canlı sonrası takip.",
        topics: [
          {
            title: "Product Design Handoff",
            description: "Handoff dosya teslimi değil, bilgi aktarımıdır. İyi handoff belirsizliği azaltır, yorum ihtiyacını düşürür, geliştirme sürecini hızlandırır. Product Design handoff: tasarım dosyaları, component davranışları, edge case'ler ve karar gerekçelerini içerir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Design Handoff" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir handoff düşün: Developer hangi soruyu sordu?",
                "Bunu önceden çözebilir miydin?",
              ],
            },
          },
          {
            title: "Kararların Dokümantasyonu",
            description: "Kararların dokümantasyonu, tasarım kararlarının nedenlerini, alternatifleri ve trade-off'ları kaydetmektir. İyi dokümantasyon: problemi hatırlatır, karar gerekçesini açıklar, gelecekteki kararları yönlendirir.",
          },
          {
            title: "Tasarım – Geliştirme Uyumu",
            description: "Tasarım – geliştirme uyumu, tasarımın canlıda beklendiği gibi görünmesini ve çalışmasını sağlamaktır. İyi uyum: erken iletişim, net spesifikasyonlar, düzenli kontroller ve feedback döngüleri gerektirir.",
          },
          {
            title: "Design QA",
            description: "Design QA, geliştirme sonrasında tasarımın canlıda doğru şekilde uygulanıp uygulanmadığını kontrol etmektir. Design QA küçük farkları yakalar, deneyim kalitesini korur, kullanıcıyı savunur.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Canlı ürüne bak: Tasarımdan farklı olan ne?",
                "Bu fark kullanıcıyı etkiliyor mu?",
              ],
            },
          },
          {
            title: "Canlı Sonrası Takip",
            description: "Canlı sonrası takip, ürün yayına alındıktan sonra kullanıcı davranışını, metrikleri ve feedback'i izlemektir. Canlı sonrası takip: beklenen etkiyi ölçer, beklenmeyen problemleri tespit eder, iterasyon için öğrenme sağlar.",
          },
        ],
      },
      {
        title: "Product Designer Kariyeri",
        description: "Product Designer'dan beklentiler, Junior → Mid → Senior farkları, Product case study yazımı, portfolyoda ürün anlatmak ve sürekli öğrenme & gelişim.",
        topics: [
          {
            title: "Product Designer'dan Beklentiler",
            description: "Product Designer'dan beklentiler: problemi doğru tanımlamak, kullanıcıyı temsil etmek, veriye dayalı karar vermek, ekip içinde çalışmak ve ürünün etkisini ölçmek. Product Designer hem tasarım hem de ürün düşüncesi gerektirir.",
          },
          {
            title: "Junior → Mid → Senior Farkları",
            description: "Junior öğrenir, uygular, yönlendirme ister. Mid problemi sahiplenir, alternatif üretir, sorumluluk alır. Senior çerçeve çizer, riskleri öngörür, başkalarının kararını güçlendirir.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Kendine sor: Şu an hangi seviyedesin?",
                "Seni bir üst seviyeye taşıyacak şey ne?",
              ],
            },
          },
          {
            title: "Product Case Study Yazımı",
            description: "Etkili bir Product case study: 1. Problemi anlatır 2. Süreci gösterir 3. Kritik kararları açıklar 4. Sonucu ve etkiyi paylaşır. Product case study yazımı: kararların nedenlerini, trade-off'ları ve öğrenilenleri içerir.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir case için yaz: En zor karar neydi?",
                "Alternatif neydi?",
              ],
            },
          },
          {
            title: "Portfolyoda Ürün Anlatmak",
            description: "Portfolyoda ürün anlatmak, yapılan işleri göstermekten çok, nasıl düşünüldüğünü, nasıl karar verildiğini ve hangi etkinin yaratıldığını anlatmaktır. İyi bir portfolyo problemi net tanımlar, süreci sade anlatır, sonucu ve etkiyi gösterir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX & Product Design Portfolios" },
                  { title: "Case Study Storytelling" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir case seç: Bu case seni hangi açıdan temsil ediyor?",
                "Neden portfolyonda olmalı?",
              ],
            },
          },
          {
            title: "Sürekli Öğrenme & Gelişim",
            description: "İyi Product Designer trend kovalamaz, temelini güçlendirir. Sürekli öğrenme & gelişim: düzenli gözlem, geri bildirim, bilinçli pratik ve öz eleştiri gerektirir.",
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Kendin için yaz: Bu yıl geliştirmek istediğin 1 alan ne?",
                "Bunun için ne yapacaksın?",
              ],
            },
          },
        ],
      },
    ],
    // Geçici olarak kaldırıldı - Daha sonra eklenecek
    // credits: [
    //   {
    //     name: "Serhat Bahçeliler",
    //     role: "Product Designer",
    //     company: "iyzico",
    //     photo: "https://r.resimlink.com/hBWVCENUpR.png",
    //     linkedin: "https://www.linkedin.com/in/serhatbahceliler/",
    //   },
    //   {
    //     name: "Ebrar Kaynar",
    //     role: "Product Designer",
    //     company: "iyzico",
    //     photo: "https://r.resimlink.com/yF42g7mp.png",
    //     linkedin: "https://www.linkedin.com/in/ebrarkaynar/",
    //   },
    // ],
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
      <Header showBackLink={true} />

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
      <RoadmapClient sections={roadmap.sections} credits={roadmap.credits} roadmapSlug={slug} />

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
