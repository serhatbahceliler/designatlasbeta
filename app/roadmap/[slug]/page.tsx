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
          {
            title: "Planning User Interviews",
            description: "İyi bir interview, görüşme sırasında değil öncesinde kazanılır. Planlama aşamasında net değilse: sorular dağılır ve sonuçlar belirsiz olur. Interview planı, neyi öğrenmek istediğini netleştirir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "User Interviews: How to Conduct Them", url: "https://www.nngroup.com/articles/user-interviews/" },
                  { title: "Planning User Interviews", url: "https://www.nngroup.com/articles/interview-planning/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Plan User Interviews – NNGroup", url: "https://www.youtube.com/results?search_query=plan+user+interviews+nngroup" },
                  { title: "User Interview Planning – UX Mastery", url: "https://www.youtube.com/results?search_query=user+interview+planning+ux+mastery" },
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
            title: "Writing Interview Questions",
            description: "İyi soru: yönlendirmez, varsayım içermez, 'neden'i açığa çıkarır. Kötü soru, kullanıcıdan onay almaya çalışır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Writing Good UX Interview Questions", url: "https://www.nngroup.com/articles/interview-questions/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Ask Better UX Interview Questions – NNGroup", url: "https://www.youtube.com/results?search_query=ask+better+ux+interview+questions+nngroup" },
                  { title: "Avoid Leading Questions in UX Research – NNGroup", url: "https://www.youtube.com/results?search_query=avoid+leading+questions+ux+research+nngroup" },
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
            title: "Conducting Interviews (Moderation)",
            description: "Interview sırasında UX Designer: konuşmaz, yönlendirmez, savunmaya geçmez. Rolün: dinlemek, derinleştirmek, sessizliği tolere etmek.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Moderating User Interviews", url: "https://www.nngroup.com/articles/moderating-user-interviews/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Moderate User Interviews – NNGroup", url: "https://www.youtube.com/results?search_query=moderate+user+interviews+nngroup" },
                  { title: "UX Interview Moderation Tips – AJ&Smart", url: "https://www.youtube.com/results?search_query=ux+interview+moderation+tips+aj+smart" },
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
            title: "Note Taking & Recording",
            description: "Interview sırasında her şeyi hatırlamak mümkün değildir. Ama doğru not almak mümkündür. Amaç: kelime kelime yazmak değil, anlamlı parçaları yakalamaktır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Taking Notes in UX Research", url: "https://www.nngroup.com/articles/taking-notes-ux/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Research Note Taking – NNGroup", url: "https://www.youtube.com/results?search_query=ux+research+note+taking+nngroup" },
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
            title: "Post-Interview Synthesis (Intro Level)",
            description: "Interview bittiğinde iş bitmez. Asıl değer sonrasında ortaya çıkar. Amaç: tekil cümlelerden tekrar eden desenler çıkarmaktır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Synthesis in UX Research", url: "https://www.nngroup.com/articles/synthesis/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Synthesize UX Research – NNGroup", url: "https://www.youtube.com/results?search_query=synthesize+ux+research+nngroup" },
                  { title: "Affinity Mapping Explained – AJ&Smart", url: "https://www.youtube.com/results?search_query=affinity+mapping+explained+aj+smart" },
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
        title: "5. Surveys & Quant Basics (Light)",
        description: "Junior seviyede 'temel nicel okuryazarlık' ve doğru kullanım.",
        topics: [
          {
            title: "When to Use Surveys (and When Not To)",
            description: "Survey'ler: davranışı keşfetmek için değil, davranışın yaygınlığını ölçmek için kullanılır. Yanlış yerde kullanılan survey: yanlış güven üretir ve 'kullanıcılar böyle istiyor' yanılgısı yaratır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "When to Use Surveys", url: "https://www.nngroup.com/articles/surveys/" },
                  { title: "Survey vs User Interviews", url: "https://www.nngroup.com/articles/survey-vs-interviews/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Surveys Explained – NNGroup", url: "https://www.youtube.com/results?search_query=ux+surveys+explained+nngroup" },
                  { title: "When NOT to Use Surveys – NNGroup", url: "https://www.youtube.com/results?search_query=when+not+use+surveys+nngroup" },
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
            title: "Question Design Basics",
            description: "Survey'de en kritik şey: sorunun kendisidir. Kötü yazılmış sorular: kullanıcıyı yönlendirir, sonuçları çarpıtır ve yanlış kararlar aldırır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Writing Survey Questions", url: "https://www.nngroup.com/articles/survey-questions/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Writing Better Survey Questions – NNGroup", url: "https://www.youtube.com/results?search_query=writing+better+survey+questions+nngroup" },
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
            title: "Scales, Ratings & Common Pitfalls",
            description: "Likert scale, rating ve score'lar: doğru kullanılırsa anlamlı, yanlış kullanılırsa gürültü üretir. Junior'ların en sık yaptığı hata: sonuçları bağlamdan koparmak.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Likert Scales in UX", url: "https://www.nngroup.com/articles/likert-scale/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Survey Scales Explained – NNGroup", url: "https://www.youtube.com/results?search_query=ux+survey+scales+explained+nngroup" },
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
            title: "Basic Data Reading (Counts, Percentages)",
            description: "Nicel veri: tek başına karar verdirmez, yön gösterir. Ama: %5 mi %50 mi olduğunu ayırt edemeyen UX Designer veriyi yanlış yorumlar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Interpreting Quantitative UX Data", url: "https://www.nngroup.com/articles/quantitative-data/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Reading UX Metrics – NNGroup", url: "https://www.youtube.com/results?search_query=reading+ux+metrics+nngroup" },
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
            title: "Combining Qual + Quant (Triangulation)",
            description: "En güçlü UX kararları: tek bir kaynaktan değil, birden fazla sinyalden gelir. Bu yaklaşıma triangulation denir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Triangulation in UX Research", url: "https://www.nngroup.com/articles/triangulation/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Combining Qual and Quant UX Research – NNGroup", url: "https://www.youtube.com/results?search_query=combining+qual+quant+ux+research+nngroup" },
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
        title: "6. Synthesis & Insight",
        description: "Dağınık veriyi karar aldıran içgörüye dönüştürmek.",
        topics: [
          {
            title: "Affinity Mapping (Affinity Diagramming)",
            description: "Affinity mapping, araştırma notlarını benzerliklerine göre gruplayarak tema çıkarmanın en pratik yollarından biridir. Özellikle interview sonrası 'kaosu düzene' çevirir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Affinity Diagramming (Article)", url: "https://www.nngroup.com/articles/affinity-diagram/" },
                  { title: "Affinity Diagramming Pitfalls", url: "https://www.nngroup.com/articles/affinity-diagramming-pitfalls/" },
                  { title: "Affinity Diagramming (NNG Video Page)", url: "https://www.nngroup.com/videos/affinity-diagramming/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "NNGroup — Affinity Diagramming (YouTube)", url: "https://www.youtube.com/watch?v=C4nYxZxteJY" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How to do affinity mapping that doesn't suck", url: "https://medium.com/design-bridges/how-to-do-affinity-mapping-that-doesnt-suck-b0b9faddccfb" },
                  { title: "(TR) İlişki Haritası (Affinity Mapping)", url: "https://medium.com/uxit%C3%BC/i%CC%87li%C5%9Fki-haritas%C4%B1-affinity-mapping-d4a6e1c1153b" },
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
            title: "Thematic Analysis (Coding → Themes)",
            description: "Thematic analysis; veriyi kodlayıp (tag'leyip) tekrar eden örüntülerden tema üretme yaklaşımıdır. 'Affinity mapping' daha hızlı, thematic analysis daha sistematik ilerler.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Thematic Analysis (Article)", url: "https://www.nngroup.com/articles/thematic-analysis/" },
                  { title: "Thematic Analysis (NNG Video Page)", url: "https://www.nngroup.com/videos/thematic-analysis-qualitative-user-research-data/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Thematic Analysis (video)", url: "https://www.youtube.com/watch?v=KUZ6iGvJlGI" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How to Do a Thematic Analysis of User Interviews", url: "https://medium.com/the-interaction-design-foundation/how-to-do-a-thematic-analysis-of-user-interviews-9eb4a1ced06e" },
                  { title: "Thematic Analysis in depth & UX Research — Part I", url: "https://medium.com/%40alaaMHussein/thematic-analysis-in-depth-ux-research-part-%E2%85%B0-6cbeca890aaa" },
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
            title: "Turning Findings into Insights (So What?)",
            description: "Bulgu (finding) ≠ içgörü (insight). Finding: 'Kullanıcılar X ekranında zorlandı.' Insight: 'Zorlanma nedeni Y; çünkü Z; bu da şu aksiyonu gerektiriyor.'",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Analyzing Qualitative Data with Spreadsheet", url: "https://www.nngroup.com/videos/analyzing-qualitative-data-spreadsheet/" },
                  { title: "UX Research Workshops", url: "https://www.nngroup.com/articles/ux-research-workshops/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "NNGroup User Research Playlist", url: "https://www.youtube.com/playlist?list=PLcBMBldR5P3Qi00ZkeotwxPctgsKLIzn4" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Introduction to UX research analysis techniques", url: "https://medium.com/%40jjknowles/introduction-to-ux-research-analysis-techniques-32192cfe0139" },
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
            title: "Prioritization Basics (Impact / Effort)",
            description: "Her bulgu aynı önemde değildir. Junior'lar genelde 'en çok duyduğum'u seçer. Doğrusu: etki + maliyet + risk + hedef uyumu.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "UX Research Workshops", url: "https://www.nngroup.com/articles/ux-research-workshops/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Forced Ranking / Prioritization Workshop", url: "https://www.youtube.com/watch?v=yJwzRJvDIkM" },
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
        title: "7. Personas & Journey Mapping",
        description: "Kullanıcıyı 'temsil edilebilir' hale getirip yolculuğu görünür kılmak.",
        topics: [
          {
            title: "Proto Personas vs Data-Driven Personas",
            description: "Proto Persona: Hızlı varsayım, discovery başlangıcı. Data-Driven Persona: Research ile doğrulanmış, karar destekleyici. Junior'ların en sık hatası: persona'yı kurgusal karakter sanmak.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Personas: Why and How You Should Use Them", url: "https://www.nngroup.com/articles/personas/" },
                  { title: "Personas vs. Proto-Personas", url: "https://www.nngroup.com/articles/proto-personas/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Personas Explained – NNGroup", url: "https://www.youtube.com/results?search_query=personas+explained+nngroup" },
                  { title: "Proto Personas vs Personas – NNGroup", url: "https://www.youtube.com/results?search_query=proto+personas+vs+personas+nngroup" },
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
            title: "User Journeys vs Customer Journeys",
            description: "User Journey: Tek bir ürün içindeki deneyim. Customer Journey: Ürün + temas noktaları + zaman. UX kararları çoğu zaman journey görülmeden alınır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Journey Mapping 101", url: "https://www.nngroup.com/articles/journey-mapping-101/" },
                  { title: "User Journey vs Customer Journey", url: "https://www.nngroup.com/articles/user-journey-vs-customer-journey/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Journey Mapping Explained – NNGroup", url: "https://www.youtube.com/results?search_query=journey+mapping+explained+nngroup" },
                  { title: "Customer Journey Mapping – NNGroup", url: "https://www.youtube.com/results?search_query=customer+journey+mapping+nngroup" },
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
            title: "Mapping Touchpoints & Emotions",
            description: "Journey map sadece adımlardan oluşmaz. Kullanıcının: ne hissettiği, nerede gerildiği, nerede rahatladığı tasarım kararları için kritik sinyaldir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Experience Mapping", url: "https://www.nngroup.com/articles/experience-mapping/" },
                  { title: "Emotional Journey Mapping", url: "https://www.nngroup.com/articles/emotional-journeys/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Mapping Emotions in UX – NNGroup", url: "https://www.youtube.com/results?search_query=mapping+emotions+ux+nngroup" },
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
            title: "Identifying Moments of Truth",
            description: "Moment of Truth, kullanıcının: ürüne güvenip güvenmemeye, devam edip etmemeye karar verdiği anlardır. Bu anlar kaçırılırsa: küçük UX hataları büyük kayıplara dönüşür.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Moments of Truth in UX", url: "https://www.nngroup.com/articles/moments-of-truth/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Moments of Truth Explained – NNGroup", url: "https://www.youtube.com/results?search_query=moments+truth+explained+nngroup" },
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
            title: "Turning Journeys into Design Requirements",
            description: "Journey map bir çıktı değil, araçtır. Asıl değer: journey'den tasarım gereksinimi çıkarmakta.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Using Journey Maps to Drive Design", url: "https://www.nngroup.com/articles/journey-maps-drive-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "From Journey Map to Design Decisions – NNGroup", url: "https://www.youtube.com/results?search_query=journey+map+design+decisions+nngroup" },
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
        title: "8. Information Architecture",
        description: "İçeriği ve navigasyonu kullanıcıların zihnine göre düzenlemek.",
        topics: [
          {
            title: "IA Basics (Mental Models & Structure)",
            description: "IA'nın temeli, kullanıcıların: bilgiyi nasıl grupladığını, kavramları nasıl adlandırdığını anlamaktır. Bu yüzden IA kararları 'iç ekip dili' ile değil, kullanıcı dili ile alınır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Information Architecture: Definition", url: "https://www.nngroup.com/articles/information-architecture/" },
                  { title: "Mental Models in UX", url: "https://www.nngroup.com/articles/mental-models/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Information Architecture Explained – NNGroup", url: "https://www.youtube.com/results?search_query=information+architecture+explained+nngroup" },
                  { title: "Mental Models in UX – NNGroup", url: "https://www.youtube.com/results?search_query=mental+models+ux+nngroup" },
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
            title: "Sitemaps & Content Structure",
            description: "Sitemap: sayfaların listesinden ibaret değildir, öncelik ve hiyerarşi gösterir. Yanlış sitemap: kullanıcıyı derinlere iter, önemli içeriği gizler.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Sitemaps: UX Best Practices", url: "https://www.nngroup.com/articles/sitemaps/" },
                  { title: "Content Hierarchy in UX", url: "https://www.nngroup.com/articles/visual-hierarchy/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Create UX Sitemaps – NNGroup", url: "https://www.youtube.com/results?search_query=create+ux+sitemaps+nngroup" },
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
            title: "Navigation Design",
            description: "Navigasyon: kullanıcıya 'neredeyim?' ve 'buradan nereye gidebilirim?' sorularının cevabını verir. İyi navigasyon düşünmeden kullanılır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Navigation Design Basics", url: "https://www.nngroup.com/articles/navigation-design/" },
                  { title: "Menu Design Best Practices", url: "https://www.nngroup.com/articles/menu-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Navigation UX Explained – NNGroup", url: "https://www.youtube.com/results?search_query=navigation+ux+explained+nngroup" },
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
            title: "Labeling & Terminology",
            description: "Kullanıcılar menüyü okuyarak değil, tahmin ederek kullanır. Bu yüzden: jargon ve iç ekip terimleri IA'yı bozar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Labeling Systems in IA", url: "https://www.nngroup.com/articles/labeling-systems/" },
                  { title: "Terminology & UX Writing", url: "https://www.nngroup.com/articles/ux-writing-terminology/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Labeling in Information Architecture – NNGroup", url: "https://www.youtube.com/results?search_query=labeling+information+architecture+nngroup" },
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
                category: "📘 NNGroup",
                items: [
                  { title: "Card Sorting: A Definitive Guide", url: "https://www.nngroup.com/articles/card-sorting/" },
                  { title: "Open vs Closed Card Sorting", url: "https://www.nngroup.com/articles/open-closed-card-sorting/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Card Sorting Explained – NNGroup", url: "https://www.youtube.com/results?search_query=card+sorting+explained+nngroup" },
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
                category: "📘 NNGroup",
                items: [
                  { title: "Tree Testing 101", url: "https://www.nngroup.com/articles/tree-testing/" },
                  { title: "Evaluating Navigation with Tree Tests", url: "https://www.nngroup.com/articles/tree-testing-navigation/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Tree Testing Explained – NNGroup", url: "https://www.youtube.com/results?search_query=tree+testing+explained+nngroup" },
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
        title: "9. Interaction Design",
        description: "Akışları, durumları ve ekran davranışlarını doğru kurgulamak.",
        topics: [
          {
            title: "Task Flows & User Flows",
            description: "Task flow: Kullanıcının bir görevi tamamlamak için attığı adımlar. User flow: Kullanıcının ürün içinde izlediği yol (karar noktaları dahil). Junior'ların en sık hatası: flow'u ekran listesi sanmak.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "User Flows vs Task Flows", url: "https://www.nngroup.com/articles/user-flows-vs-task-flows/" },
                  { title: "When to Use Which UX Deliverables", url: "https://www.nngroup.com/articles/ux-deliverables/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "User Flows Explained – NNGroup", url: "https://www.youtube.com/results?search_query=user+flows+explained+nngroup" },
                  { title: "Task Flows vs User Flows – NNGroup", url: "https://www.youtube.com/results?search_query=task+flows+vs+user+flows+nngroup" },
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
            title: "State Design (Empty, Loading, Error, Success)",
            description: "Ekranın her durumu için tasarım gerekir: Empty (içerik yok), Loading (veri yükleniyor), Error (hata oluştu), Success (başarılı). Bu durumlar tasarlanmazsa: kullanıcı ne olduğunu anlamaz.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Empty States Best Practices", url: "https://www.nngroup.com/articles/empty-states/" },
                  { title: "Loading Indicators", url: "https://www.nngroup.com/articles/progress-indicators/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI States Explained – NNGroup", url: "https://www.youtube.com/results?search_query=ui+states+explained+nngroup" },
                  { title: "Empty State Design – NNGroup", url: "https://www.youtube.com/results?search_query=empty+state+design+nngroup" },
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
                  { title: "Animation in UX", url: "https://www.nngroup.com/articles/animation-usability/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Microinteractions Explained – NNGroup", url: "https://www.youtube.com/results?search_query=microinteractions+explained+nngroup" },
                  { title: "UX Animation Best Practices – NNGroup", url: "https://www.youtube.com/results?search_query=ux+animation+best+practices+nngroup" },
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
            title: "Form Design Basics",
            description: "Form tasarımı: kullanıcının 'ne yapacağını bildiği' ama 'yapmaktan hoşlanmadığı' bir deneyimdir. Bu yüzden: hata toleransı, netlik ve kolaylık kritiktir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Form Design Best Practices", url: "https://www.nngroup.com/articles/web-form-design/" },
                  { title: "Form Field Usability", url: "https://www.nngroup.com/articles/form-design-usability/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Form Design UX – NNGroup", url: "https://www.youtube.com/results?search_query=form+design+ux+nngroup" },
                  { title: "Form Usability Best Practices – NNGroup", url: "https://www.youtube.com/results?search_query=form+usability+best+practices+nngroup" },
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
            title: "Error Prevention & Recovery",
            description: "Hata önleme: Kullanıcının hata yapmasını zorlaştırmak. Error recovery: Hata yaptığında kolayca düzeltebilmesini sağlamak. Kötü tasarım: hata mesajını gösterir ama çözüm sunmaz.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Error Prevention in UX", url: "https://www.nngroup.com/articles/slips/" },
                  { title: "Error Messages Design", url: "https://www.nngroup.com/articles/error-message-guidelines/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Error Prevention UX – NNGroup", url: "https://www.youtube.com/results?search_query=error+prevention+ux+nngroup" },
                  { title: "Error Message Best Practices – NNGroup", url: "https://www.youtube.com/results?search_query=error+message+best+practices+nngroup" },
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
        title: "10. Wireframing & Prototyping",
        description: "Çözümü hızlı doğrulamak ve öğrenmeyi hızlandırmak.",
        topics: [
          {
            title: "Low-Fidelity Wireframes",
            description: "Low-fi wireframe'ler: hızlıdır, ucuzdur, tartışmaya açıktır. Bu yüzden discovery ve erken çözüm aşamasında idealdir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Low-Fidelity Wireframes", url: "https://www.nngroup.com/articles/low-fidelity-wireframes/" },
                  { title: "Why Sketches and Wireframes Matter", url: "https://www.nngroup.com/articles/sketches-wireframes/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Low-Fidelity Wireframes Explained – NNGroup", url: "https://www.youtube.com/results?search_query=low+fidelity+wireframes+explained+nngroup" },
                  { title: "Sketching & Wireframing for UX – NNGroup", url: "https://www.youtube.com/results?search_query=sketching+wireframing+ux+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why Low-Fidelity Wireframes Save Time", url: "https://medium.com/search?q=why+low+fidelity+wireframes+save+time" },
                  { title: "Stop Polishing Too Early in UX", url: "https://medium.com/search?q=stop+polishing+too+early+ux" },
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
            title: "Mid-Fidelity Screens",
            description: "Mid-fi tasarımlar: yapıyı, içerik hiyerarşisini, etkileşimleri daha net test etmek için kullanılır. Ama hâlâ 'görsel şov' değildir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Wireframe Fidelity Levels", url: "https://www.nngroup.com/articles/wireframe-fidelity/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Mid-Fidelity Prototyping – NNGroup", url: "https://www.youtube.com/results?search_query=mid+fidelity+prototyping+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Choosing the Right Fidelity Level", url: "https://medium.com/search?q=choosing+right+fidelity+level" },
                  { title: "Mid-Fi Is the Sweet Spot", url: "https://medium.com/search?q=mid+fi+sweet+spot" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Mid-fi bir ekran için sor:",
                "Kullanıcı burada ne yapmalı?",
                "Gözünü ilk çeken yer doğru mu?",
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
                  { title: "Prototyping for UX Testing", url: "https://www.nngroup.com/articles/prototyping-ux/" },
                  { title: "Paper Prototyping", url: "https://www.nngroup.com/articles/paper-prototyping/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Prototyping Explained – NNGroup", url: "https://www.youtube.com/results?search_query=ux+prototyping+explained+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Prototype Only What You Need", url: "https://medium.com/search?q=prototype+only+what+you+need" },
                  { title: "Prototyping Mistakes in UX", url: "https://medium.com/search?q=prototyping+mistakes+ux" },
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
            title: "What to Prototype / What Not to Prototype",
            description: "Her şeyi prototype etmek: zaman kaybı, yanlış odaklanma, gereksiz detay demektir. Odak: riskli, belirsiz, kullanıcıyı durduran noktalar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Deciding What to Prototype", url: "https://www.nngroup.com/articles/prototype-fidelity/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "What to Prototype in UX – NNGroup", url: "https://www.youtube.com/results?search_query=what+to+prototype+ux+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Don't Prototype Everything", url: "https://medium.com/search?q=don't+prototype+everything" },
                  { title: "Strategic Prototyping for UX", url: "https://medium.com/search?q=strategic+prototyping+ux" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir feature seç",
                "En riskli adımı işaretle",
                "Sadece o adımı prototype et",
              ],
            },
          },
          {
            title: "Prototype Hygiene (Naming, Flow Clarity)",
            description: "Kötü hazırlanmış prototype: yanlış test sonuçları üretir, kullanıcıyı değil tasarımcıyı test eder. Basit ama kritik konular: ekran isimleri, bağlantıların tutarlılığı, gereksiz dallanmaların temizlenmesi.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Preparing Prototypes for Testing", url: "https://www.nngroup.com/articles/usability-testing-prototypes/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Prototype Preparation Tips – NNGroup", url: "https://www.youtube.com/results?search_query=ux+prototype+preparation+tips+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Prototype Hygiene: Small Things That Matter", url: "https://medium.com/search?q=prototype+hygiene+small+things+matter" },
                  { title: "Why Your Usability Test Failed", url: "https://medium.com/search?q=why+usability+test+failed" },
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
        title: "11. Usability Testing",
        description: "Tasarımın 'çalışıp çalışmadığını' kanıtlamak.",
        topics: [
          {
            title: "What is Usability Testing?",
            description: "Usability testing, kullanıcıların belirli görevleri: yardım almadan, kendi başlarına yapıp yapamadığını gözlemlemektir. Önemli olan: ne söyledikleri değil, ne yaptıklarıdır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Usability Testing 101", url: "https://www.nngroup.com/articles/usability-testing-101/" },
                  { title: "Why You Only Need to Test with 5 Users", url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Usability Testing Explained – NNGroup", url: "https://www.youtube.com/results?search_query=usability+testing+explained+nngroup" },
                  { title: "5-User Testing – NNGroup", url: "https://www.youtube.com/results?search_query=5+user+testing+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Usability Testing for Beginners", url: "https://medium.com/search?q=usability+testing+beginners" },
                  { title: "Why Usability Testing Matters More Than You Think", url: "https://medium.com/search?q=why+usability+testing+matters" },
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
            title: "Moderated vs Unmoderated Testing",
            description: "Moderated Test: Canlı, derinlemesine gözlem. Unmoderated Test: Daha hızlı, daha geniş örneklem. Her problem için doğru yöntem farklıdır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Moderated vs Unmoderated Testing", url: "https://www.nngroup.com/articles/moderated-remote-usability-testing/" },
                  { title: "Remote Usability Testing", url: "https://www.nngroup.com/articles/remote-usability-testing/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Moderated vs Unmoderated UX Tests – NNGroup", url: "https://www.youtube.com/results?search_query=moderated+vs+unmoderated+ux+tests+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Moderated vs Unmoderated Usability Testing", url: "https://medium.com/search?q=moderated+vs+unmoderated+usability+testing" },
                  { title: "Choosing the Right Usability Test", url: "https://medium.com/search?q=choosing+right+usability+test" },
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
            title: "Writing Tasks & Scenarios",
            description: "Kötü yazılmış task: kullanıcıyı yönlendirir, gerçekçi değildir, test sonucunu bozar. İyi task: bağlam verir, çözümü söylemez.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Writing Tasks for Usability Studies", url: "https://www.nngroup.com/articles/task-scenarios-usability-testing/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Writing Better UX Test Tasks – NNGroup", url: "https://www.youtube.com/results?search_query=writing+better+ux+test+tasks+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How to Write Better Usability Test Tasks", url: "https://medium.com/search?q=write+better+usability+test+tasks" },
                  { title: "Task Design Mistakes in UX Testing", url: "https://medium.com/search?q=task+design+mistakes+ux+testing" },
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
            title: "Success Criteria & Metrics",
            description: "Test 'hissi' değil, sonucu ölçer. Temel usability metrikleri: Task success, Time on task, Errors, User confidence (self-reported).",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Usability Metrics", url: "https://www.nngroup.com/articles/usability-metrics/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Metrics Explained – NNGroup", url: "https://www.youtube.com/results?search_query=ux+metrics+explained+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "UX Metrics for Usability Testing", url: "https://medium.com/search?q=ux+metrics+usability+testing" },
                  { title: "Measuring Usability Without Overthinking", url: "https://medium.com/search?q=measuring+usability+without+overthinking" },
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
            title: "Observation, Note Taking & Analysis",
            description: "Usability test sırasında: kullanıcıyı düzeltmezsin, ipucu vermezsin, savunmaya geçmezsin. Ama her şeyi not alırsın.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Observing Users: The Right Way", url: "https://www.nngroup.com/articles/observing-users/" },
                  { title: "Analyzing Usability Test Results", url: "https://www.nngroup.com/articles/analyzing-usability-test-results/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Observing Usability Tests – NNGroup", url: "https://www.youtube.com/results?search_query=observing+usability+tests+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How to Analyze Usability Test Results", url: "https://medium.com/search?q=analyze+usability+test+results" },
                  { title: "From Usability Test Notes to Insights", url: "https://medium.com/search?q=usability+test+notes+insights" },
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
            title: "Reporting Findings & Recommendations",
            description: "Testin değeri: raporda, aksiyonda, değişimde ortaya çıkar. İyi rapor: problem → kanıt → öneri zinciri kurar, suçlamaz, çözüm sunar.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Reporting Usability Test Results", url: "https://www.nngroup.com/articles/reporting-usability-test-results/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "How to Present Usability Findings – NNGroup", url: "https://www.youtube.com/results?search_query=present+usability+findings+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How to Turn Usability Findings into Action", url: "https://medium.com/search?q=turn+usability+findings+action" },
                  { title: "Writing UX Reports People Actually Read", url: "https://medium.com/search?q=writing+ux+reports+people+read" },
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
