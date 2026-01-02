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
          {
            title: "Nielsen's 10 Usability Heuristics",
            description: "Jakob Nielsen'ın 10 usability heuristic'i, en yaygın UX problemlerini kapsayan evrensel prensiplerdir. Junior'lar için kritik nokta: Heuristic'leri ezberlemek değil, ne zaman hangisi ihlal ediliyor görebilmek.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "10 Usability Heuristics for User Interface Design", url: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Nielsen's 10 Heuristics Explained – NNGroup", url: "https://www.youtube.com/results?search_query=nielsen+10+heuristics+explained+nngroup" },
                  { title: "Usability Heuristics Overview – NNGroup", url: "https://www.youtube.com/results?search_query=usability+heuristics+overview+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Nielsen's Heuristics Explained with Examples", url: "https://medium.com/search?q=nielsen+heuristics+explained+examples" },
                  { title: "How to Actually Use UX Heuristics", url: "https://medium.com/search?q=how+actually+use+ux+heuristics" },
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
            title: "Heuristic Evaluation (Process)",
            description: "Heuristic evaluation: kullanıcıya ihtiyaç duymadan, uzman gözüyle yapılan hızlı bir UX değerlendirme yöntemidir. Ama kullanıcı testinin yerine geçmez.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "How to Conduct a Heuristic Evaluation", url: "https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Heuristic Evaluation Step by Step – NNGroup", url: "https://www.youtube.com/results?search_query=heuristic+evaluation+step+by+step+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Heuristic Evaluation for UX Designers", url: "https://medium.com/search?q=heuristic+evaluation+ux+designers" },
                  { title: "When to Use Heuristic Evaluation", url: "https://medium.com/search?q=when+use+heuristic+evaluation" },
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
          {
            title: "Severity Ratings",
            description: "Her UX problemi aynı önemde değildir. Severity rating, problemleri: küçük rahatsızlık, ciddi engel olarak ayırmayı sağlar. Yanlış yapılan en büyük hata: her problemi 'kritik' görmek.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Severity Ratings for Usability Problems", url: "https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Severity Ratings Explained – NNGroup", url: "https://www.youtube.com/results?search_query=severity+ratings+explained+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Severity Ratings in UX: Explained Simply", url: "https://medium.com/search?q=severity+ratings+ux+explained" },
                  { title: "Stop Calling Every UX Issue Critical", url: "https://medium.com/search?q=stop+calling+every+ux+issue+critical" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "3 UX problemi yaz",
                "Hangisi gerçekten kullanıcıyı durduruyor?",
                "Hangisi sadece rahatsız edici?",
              ],
            },
          },
          {
            title: "Translating Issues into Actionable Fixes",
            description: "Heuristic evaluation'ın değeri: problem listesinden aksiyon üretebilmekte yatar. 'Kafa karıştırıcı' demek yetmez. Neyi değiştireceğini söylemelisin.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Turning UX Findings into Action", url: "https://www.nngroup.com/articles/actionable-ux-findings/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "From UX Issues to Design Actions – NNGroup", url: "https://www.youtube.com/results?search_query=ux+issues+design+actions+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Writing Actionable UX Findings", url: "https://medium.com/search?q=writing+actionable+ux+findings" },
                  { title: "UX Feedback That Leads to Change", url: "https://medium.com/search?q=ux+feedback+leads+change" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu bulguyu aksiyona çevir: 'Kullanıcılar bu ekranda kararsız kalıyor.'",
                "→ Ne değişmeli?",
              ],
            },
          },
        ],
      },
      {
        title: "13. Accessibility & Inclusive Design",
        description: "Herkes için kullanılabilir deneyim tasarlamak (temel seviye).",
        topics: [
          {
            title: "Accessibility Basics (Why It Matters)",
            description: "Erişilebilirlik: sadece engelli kullanıcılar için değildir, geçici durumları (kırık kol, güneş ışığı, yavaş internet) da kapsar. İyi erişilebilirlik, herkes için daha iyi UX demektir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Accessibility 101", url: "https://www.nngroup.com/articles/accessibility-101/" },
                  { title: "Inclusive Design", url: "https://www.nngroup.com/articles/inclusive-design/" },
                ],
              },
              {
                category: "🌐 W3C / WAI",
                items: [
                  { title: "Introduction to Web Accessibility", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Accessibility Basics for UX – NNGroup", url: "https://www.youtube.com/results?search_query=accessibility+basics+ux+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Accessibility Is Not a Feature", url: "https://medium.com/search?q=accessibility+is+not+feature" },
                  { title: "Why Inclusive Design Makes Products Better", url: "https://medium.com/search?q=inclusive+design+makes+products+better" },
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
            title: "WCAG Overview (Intro Level)",
            description: "WCAG (Web Content Accessibility Guidelines), erişilebilirlik için uluslararası standarttır. Temel 4 ilke: Perceivable (Algılanabilir), Operable (Kullanılabilir), Understandable (Anlaşılabilir), Robust (Sağlam). Junior seviyede amaç: kuralları ezberlemek değil, neyi kontrol etmen gerektiğini bilmek.",
            resources: [
              {
                category: "🌐 W3C / WAI",
                items: [
                  { title: "WCAG Overview", url: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
                  { title: "WCAG at a Glance", url: "https://www.w3.org/WAI/standards-guidelines/wcag/glance/" },
                ],
              },
              {
                category: "📘 NNGroup",
                items: [
                  { title: "WCAG 2 Overview for UX Designers", url: "https://www.nngroup.com/articles/wcag/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "WCAG Explained Simply – NNGroup", url: "https://www.youtube.com/results?search_query=wcag+explained+simply+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "WCAG Explained for Designers", url: "https://medium.com/search?q=wcag+explained+designers" },
                  { title: "You Don't Need to Memorize WCAG", url: "https://medium.com/search?q=don't+need+memorize+wcag" },
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
            title: "Color Contrast & Typography",
            description: "Düşük kontrast: en yaygın erişilebilirlik hatasıdır, çoğu zaman 'estetik' gerekçesiyle yapılır. Ama: okunamayan metin, kullanılamayan metindir.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Color Contrast and Readability", url: "https://www.nngroup.com/articles/color-contrast/" },
                  { title: "Typography for UX", url: "https://www.nngroup.com/articles/typography/" },
                ],
              },
              {
                category: "🌐 W3C / WAI",
                items: [
                  { title: "Contrast (Minimum)", url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Color Contrast Explained – NNGroup", url: "https://www.youtube.com/results?search_query=color+contrast+explained+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why Designers Get Contrast Wrong", url: "https://medium.com/search?q=designers+get+contrast+wrong" },
                  { title: "Accessible Typography Basics", url: "https://medium.com/search?q=accessible+typography+basics" },
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
            title: "Keyboard & Focus (Web)",
            description: "Bir kullanıcı: mouse kullanamayabilir, sadece klavye ile gezebilir. Bu yüzden: focus state'ler, tab sırası UX'in parçasıdır.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Keyboard Accessibility", url: "https://www.nngroup.com/articles/keyboard-accessibility/" },
                  { title: "Focus Indicators", url: "https://www.nngroup.com/articles/focus-indicators/" },
                ],
              },
              {
                category: "🌐 W3C / WAI",
                items: [
                  { title: "Keyboard Accessibility", url: "https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Keyboard Accessibility in UX – NNGroup", url: "https://www.youtube.com/results?search_query=keyboard+accessibility+ux+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing for Keyboard Navigation", url: "https://medium.com/search?q=designing+keyboard+navigation" },
                  { title: "Why Focus States Matter", url: "https://medium.com/search?q=why+focus+states+matter" },
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
            title: "Accessible Forms & Errors",
            description: "Formlar, erişilebilirliğin en kırılgan noktalarındandır. Sık yapılan hatalar: label yok, hata mesajı belirsiz, sadece renkle hata göstermek.",
            resources: [
              {
                category: "📘 NNGroup",
                items: [
                  { title: "Accessible Forms", url: "https://www.nngroup.com/articles/form-accessibility/" },
                  { title: "Error Messages and Accessibility", url: "https://www.nngroup.com/articles/error-message-guidelines/" },
                ],
              },
              {
                category: "🌐 W3C / WAI",
                items: [
                  { title: "Forms Accessibility", url: "https://www.w3.org/WAI/tutorials/forms/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Accessible Form Design – NNGroup", url: "https://www.youtube.com/results?search_query=accessible+form+design+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Accessible Forms Explained", url: "https://medium.com/search?q=accessible+forms+explained" },
                  { title: "Why Error Messages Fail Accessibility", url: "https://medium.com/search?q=error+messages+fail+accessibility" },
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
        title: "14. UX Writing & Content (Basics)",
        description: "Mikro metinlerle anlaşılabilirliği ve güveni artırmak.",
        topics: [
          {
            title: "Microcopy Principles",
            description: "Microcopy: butonlar, hata mesajları, boş durumlar, ipuçları gibi küçük ama kritik metinlerdir. İyi microcopy: kısa, net ve aksiyon odaklıdır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Writing: Definition and Principles", url: "https://www.nngroup.com/articles/ux-writing/" },
                  { title: "Microcopy in UX", url: "https://www.nngroup.com/articles/microcopy/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Writing Basics – NNGroup", url: "https://www.youtube.com/results?search_query=ux+writing+basics+nngroup" },
                  { title: "Microcopy Explained – NNGroup", url: "https://www.youtube.com/results?search_query=microcopy+explained+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Microcopy: Small Text, Big Impact", url: "https://medium.com/search?q=microcopy+small+text+big+impact" },
                  { title: "UX Writing for Beginners", url: "https://medium.com/search?q=ux+writing+for+beginners" },
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
            title: "Error Messages & Empty States",
            description: "Hata ve boş durum metinleri: kullanıcıyı suçlamamalı, ne olduğunu açıklamalı ve bir sonraki adımı göstermelidir. Kötü metin, iyi tasarımı bile bozar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Error Message Guidelines", url: "https://www.nngroup.com/articles/error-message-guidelines/" },
                  { title: "Empty States", url: "https://www.nngroup.com/articles/empty-state/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Writing Better Error Messages – NNGroup", url: "https://www.youtube.com/results?search_query=writing+better+error+messages+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How to Write Helpful Error Messages", url: "https://medium.com/search?q=how+to+write+helpful+error+messages" },
                  { title: "Designing Empty States That Guide Users", url: "https://medium.com/search?q=designing+empty+states+guide+users" },
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
            title: "Tone, Voice & Consistency",
            description: "Voice: Ürünün kişiliği. Tone: Bağlama göre değişen ifade şekli. UX writing'de tutarsız ton: güveni zedeler ve ürünü 'parça parça' hissettirir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Tone of Voice in UX", url: "https://www.nngroup.com/articles/tone-of-voice/" },
                  { title: "Writing Consistent UX Copy", url: "https://www.nngroup.com/articles/consistent-ux-writing/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Tone & Voice in UX Writing – NNGroup", url: "https://www.youtube.com/results?search_query=tone+voice+ux+writing+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "UX Voice and Tone Explained", url: "https://medium.com/search?q=ux+voice+tone+explained" },
                  { title: "Why Consistent UX Copy Matters", url: "https://medium.com/search?q=why+consistent+ux+copy+matters" },
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
            title: "Information Clarity (Labels, Buttons, Help Text)",
            description: "Kullanıcılar metni okumaz, tarar. Bu yüzden: etiketler net, butonlar anlamlı ve yardım metinleri kısa olmalıdır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Labeling & UX Writing", url: "https://www.nngroup.com/articles/labeling-systems/" },
                  { title: "Writing for Scannability", url: "https://www.nngroup.com/articles/scannability/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Writing Clear UX Copy – NNGroup", url: "https://www.youtube.com/results?search_query=writing+clear+ux+copy+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Clear Labels Make Better UX", url: "https://medium.com/search?q=clear+labels+better+ux" },
                  { title: "Designing UX Copy for Scanning", url: "https://medium.com/search?q=designing+ux+copy+scanning" },
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
        title: "15. Measurement & Iteration (Basics)",
        description: "UX'in etkisini anlamak ve iterasyon kültürü.",
        topics: [
          {
            title: "UX Metrics Basics",
            description: "UX metrikleri, deneyimin performansını ölçmek için kullanılır. Ama her şey ölçülemez, her ölçüm de anlamlı değildir. Temel metrik grupları: Davranış metrikleri (task completion, drop-off), Verimlilik metrikleri (time on task), Hata metrikleri (error rate), Algısal metrikler (confidence, satisfaction).",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Metrics and Measurement", url: "https://www.nngroup.com/articles/ux-metrics/" },
                  { title: "Measuring UX", url: "https://www.nngroup.com/articles/measuring-ux/" },
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
                  { title: "UX Metrics for Beginners", url: "https://medium.com/search?q=ux+metrics+for+beginners" },
                  { title: "Which UX Metrics Actually Matter", url: "https://medium.com/search?q=which+ux+metrics+actually+matter" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekran seç:",
                "Kullanıcı burada ne yapmalı?",
                "Başarılı olduğunu nasıl anlarsın? (Bir metrik yaz)",
              ],
            },
          },
          {
            title: "Qualitative vs Quantitative Signals",
            description: "UX kararları tek bir sinyale dayanmaz. Qualitative → neden oluyor? Quantitative → ne kadar oluyor? En güçlü içgörüler, bu iki sinyalin birlikte okunmasıyla çıkar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Qualitative vs Quantitative Research", url: "https://www.nngroup.com/articles/quant-vs-qual/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Combining Qual & Quant UX – NNGroup", url: "https://www.youtube.com/results?search_query=combining+qual+quant+ux+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why UX Needs Both Qual and Quant", url: "https://medium.com/search?q=why+ux+needs+both+qual+quant" },
                  { title: "Reading UX Signals Together", url: "https://medium.com/search?q=reading+ux+signals+together" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Şu sinyalleri düşün:",
                "Interview: 'Kafa karıştırıcı'",
                "Analytics: Drop-off yüksek",
                "Bunlar birlikte sana ne söylüyor?",
              ],
            },
          },
          {
            title: "Validating Design Decisions",
            description: "Her tasarım kararı doğrulanmak zorunda değildir. Ama riskli kararlar mutlaka doğrulanmalıdır. Doğrulama yöntemleri: usability test, A/B test, öncesi / sonrası karşılaştırma.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Validating Design Decisions", url: "https://www.nngroup.com/articles/design-validation/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Validation Methods – NNGroup", url: "https://www.youtube.com/results?search_query=ux+validation+methods+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How to Validate UX Decisions", url: "https://medium.com/search?q=how+to+validate+ux+decisions" },
                  { title: "Design Validation Without Overtesting", url: "https://medium.com/search?q=design+validation+without+overtesting" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir karar seç:",
                "Bu karar yanlış olursa ne olur?",
                "Bu riski doğrulamak için en basit yol ne?",
              ],
            },
          },
          {
            title: "Iteration & Continuous Improvement",
            description: "UX tek seferlik bir iş değildir. Her tasarım: test edilir, öğrenilir, iyileştirilir. Iteration, başarısızlık değil ilerleme göstergesidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Iterative Design", url: "https://www.nngroup.com/articles/iterative-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Iterative UX Design – NNGroup", url: "https://www.youtube.com/results?search_query=iterative+ux+design+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Iteration Is the Real UX Skill", url: "https://medium.com/search?q=iteration+real+ux+skill" },
                  { title: "Why Good UX Is Never Finished", url: "https://medium.com/search?q=why+good+ux+never+finished" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir tasarım düşün:",
                "İlk versiyonda neyi öğrenmek isterdin?",
                "İkinci versiyonda neyi değiştirirdin?",
              ],
            },
          },
          {
            title: "Closing the Feedback Loop",
            description: "Feedback loop: kullanıcıdan öğren, ürünü geliştir, tekrar ölç. Bu döngü koparsa UX kararları sezgiye döner.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Closing the UX Feedback Loop", url: "https://www.nngroup.com/articles/feedback-loops/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Feedback Loops Explained – NNGroup", url: "https://www.youtube.com/results?search_query=ux+feedback+loops+explained+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Closing the UX Feedback Loop", url: "https://medium.com/search?q=closing+ux+feedback+loop" },
                  { title: "From Feedback to Action in UX", url: "https://medium.com/search?q=from+feedback+action+ux" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir geri bildirim düşün:",
                "Nereden geliyor?",
                "Aksiyona dönüşüyor mu, yoksa kayboluyor mu?",
              ],
            },
          },
        ],
      },
      {
        title: "16. Collaboration & Delivery",
        description: "UX çıktısını ekip içinde 'işe dönüştürmek'.",
        topics: [
          {
            title: "Working with Product Managers",
            description: "UX ve PM aynı problemi farklı açılardan ele alır. Sağlıklı iş birliği: problem tanımında başlar, çözümde değil, öncelikte hizalanır. UX'in rolü: kullanıcı perspektifini masaya getirmek, kararı sahiplenmek değil.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX and Product Management Collaboration", url: "https://www.nngroup.com/articles/ux-product-management/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX & PM Collaboration – NNGroup", url: "https://www.youtube.com/results?search_query=ux+pm+collaboration+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How UX Designers Should Work with PMs", url: "https://medium.com/search?q=how+ux+designers+work+with+pms" },
                  { title: "UX vs PM Is the Wrong Question", url: "https://medium.com/search?q=ux+vs+pm+wrong+question" },
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
            title: "Working with Developers",
            description: "Developer'lar tasarımı değil: davranışı, kuralları, öncelikleri uygular. İyi UX–Dev ilişkisi: erken başlar, sürekli devam eder, 'sonradan açıklama'ya kalmaz.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Designers and Developers", url: "https://www.nngroup.com/articles/designers-developers/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX & Developer Collaboration – NNGroup", url: "https://www.youtube.com/results?search_query=ux+developer+collaboration+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How Designers Can Work Better with Developers", url: "https://medium.com/search?q=designers+work+better+with+developers" },
                  { title: "Why UX Fails at Handoff", url: "https://medium.com/search?q=why+ux+fails+handoff" },
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
            title: "Design Handoff Basics",
            description: "Handoff: dosya paylaşımı değil, bilgi aktarımıdır. İyi handoff: belirsizliği azaltır, yorum farkını minimize eder, geri dönüşleri hızlandırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Design Handoff Best Practices", url: "https://www.nngroup.com/articles/design-handoff/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Design Handoff Explained – NNGroup", url: "https://www.youtube.com/results?search_query=design+handoff+explained+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Design Handoff Is a Conversation", url: "https://medium.com/search?q=design+handoff+conversation" },
                  { title: "What Developers Actually Need from Designers", url: "https://medium.com/search?q=what+developers+actually+need+designers" },
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
            title: "Specs, Annotations & Documentation",
            description: "Her şey yazılmaz ama: kritik kurallar, edge durumlar, davranış farkları net olmalıdır. Amaç: gereksiz dokümantasyon değil, doğru yerde açıklama.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Documenting UX Designs", url: "https://www.nngroup.com/articles/documenting-designs/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Documentation Tips – NNGroup", url: "https://www.youtube.com/results?search_query=ux+documentation+tips+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "UX Specs Without Overdoing It", url: "https://medium.com/search?q=ux+specs+without+overdoing" },
                  { title: "How Much Documentation Is Enough?", url: "https://medium.com/search?q=how+much+documentation+enough" },
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
            title: "Feedback, Iteration & Design QA",
            description: "Tasarım geliştirmeye girdikten sonra UX bitmez. Gerekli olanlar: tasarım QA, küçük düzeltmeler, gerçek ürüne bakarak öğrenme.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX QA and Design Reviews", url: "https://www.nngroup.com/articles/design-reviews/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Design QA – NNGroup", url: "https://www.youtube.com/results?search_query=ux+design+qa+nngroup" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Design QA Is a UX Responsibility", url: "https://medium.com/search?q=design+qa+ux+responsibility" },
                  { title: "Why Shipped UX Is Not Final UX", url: "https://medium.com/search?q=shipped+ux+not+final" },
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
        title: "17. 🚀 Career, Growth & UX Mindset (Junior Focused)",
        description: "Junior UX Designer'ların kariyere gerçekçi beklentilerle başlaması, sürdürülebilir şekilde gelişmesi ve doğru zihniyeti erken kazanması.",
        topics: [
          {
            title: "UX Mindset (Thinking Like a UX Designer)",
            description: "UX mindset: çözümden önce problemi düşünmek, varsayımı sorgulamak ve kullanıcıyı savunabilmektir. UX Designer her şeyi bilen değil, doğru soruları sorabilen kişidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Mindset", url: "https://www.nngroup.com/articles/ux-mindset/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Thinking Like a UX Designer – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "What UX Mindset Really Means", url: "https://medium.com/example" },
                  { title: "UX Is a Way of Thinking", url: "https://medium.com/example" },
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
            title: "Learning UX Effectively (What to Learn & What Not)",
            description: "UX öğrenirken en büyük hata: her aracı öğrenmeye çalışmak ve temeli atlamaktır. Öncelik sırası: 1) Problem anlayışı, 2) Research & düşünme, 3) Etkileşim & akış, 4) Araçlar (en son).",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "How to Learn UX", url: "https://www.nngroup.com/articles/learning-ux/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Learning UX the Right Way – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Stop Learning Tools First", url: "https://medium.com/example" },
                  { title: "How Junior Designers Should Learn UX", url: "https://medium.com/example" },
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
            title: "Portfolio Basics (Junior Level)",
            description: "Junior portfolyo görsel şov değil, düşünce süreci gösterir. İyi bir case: problem → süreç → karar → öğrenme şeklinde ilerler.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Portfolio Tips", url: "https://www.nngroup.com/articles/ux-portfolio/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Portfolio for Juniors – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "What Makes a Good Junior UX Portfolio", url: "https://medium.com/example" },
                  { title: "Stop Making Dribbble-Style Case Studies", url: "https://medium.com/example" },
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
            title: "Junior UX Roles & Expectations",
            description: "Junior UX Designer her şeyi kusursuz yapmaz, soru sorar ve öğrenmeye açıktır. Yanlış beklentiler: 'Her şeyi tek başıma yapmalıyım' ve 'Hata yapmamalıyım'.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Junior UX Designer Expectations", url: "https://www.nngroup.com/articles/junior-ux-designer/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Junior UX Roles Explained – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "What Is Expected from a Junior UX Designer", url: "https://medium.com/example" },
                  { title: "You're Not Supposed to Know Everything", url: "https://medium.com/example" },
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
          {
            title: "Feedback, Mentorship & Growth",
            description: "UX'te gelişim tek başına olmaz, geri bildirimle hızlanır. Mentorluk cevap değil, yön kazandırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Giving and Receiving UX Feedback", url: "https://www.nngroup.com/articles/ux-feedback/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Growing as a UX Designer – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How Junior Designers Should Ask for Feedback", url: "https://medium.com/example" },
                  { title: "Why Feedback Is a UX Skill", url: "https://medium.com/example" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir işini düşün:",
                "Kime feedback sorabilirsin?",
                "Ne hakkında feedback istersin?",
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
        title: "1. 🎨 UI Foundations",
        description: "UI Designer'ın görsel kararları bilinçli alması, estetik ile kullanılabilirlik arasında denge kurması ve tutarlı, ölçeklenebilir arayüzler tasarlaması.",
        topics: [
          {
            title: "What is UI Design?",
            description: "UI Design, kullanıcı ile sistem arasındaki görsel ve etkileşimsel katmanı tasarlamaktır. UI Designer bilgiyi görsel olarak organize eder, etkileşimleri anlaşılır hale getirir ve kullanıcıyı yönlendirir. UI, UX'in görünen yüzüdür; ama UX'in tamamı değildir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Design in UX", url: "https://www.nngroup.com/articles/visual-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI vs UX Explained – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "What UI Design Really Is", url: "https://medium.com/example" },
                  { title: "UI Design Is Not Just Making Things Pretty", url: "https://medium.com/example" },
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
            title: "UI vs UX vs Product Design",
            description: "UX Design problemi ve akışı çözer, UI Design çözümü görsel olarak netleştirir, Product Design ise UX + UI + iş hedeflerini birleştirir. UI Designer'ın rolü: UX kararlarını bozmadan görsel netlik ve kalite kazandırmaktır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX vs UI vs Product Design", url: "https://www.nngroup.com/articles/ux-vs-ui/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX vs UI Roles – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "UX vs UI vs Product Design Explained", url: "https://medium.com/example" },
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
            title: "Principles of Good Visual Design",
            description: "İyi UI evrensel görsel prensiplere dayanır: Hiyerarşi, Kontrast, Denge, Yakınlık (Gestalt), Tutarlılık. Bu prensipler ihlal edildiğinde kullanıcı yavaşlar, hata yapar ve arayüz karmaşık hissedilir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Design Principles", url: "https://www.nngroup.com/articles/principles-visual-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Visual Design Principles – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Gestalt Principles in UI Design", url: "https://medium.com/example" },
                  { title: "Why Visual Hierarchy Matters", url: "https://medium.com/example" },
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
            title: "Visual Hierarchy",
            description: "Visual hierarchy, kullanıcının ekrana nereden baktığını, neyi önce gördüğünü ve neyi sonra fark ettiğini belirler. Araçlar: boyut, renk, boşluk, kontrast.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Hierarchy", url: "https://www.nngroup.com/articles/visual-hierarchy-ux/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Visual Hierarchy Explained – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing with Visual Hierarchy", url: "https://medium.com/example" },
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
            title: "Consistency & Predictability",
            description: "Tutarlılık öğrenme maliyetini düşürür, kullanıcıyı rahatlatır ve güven oluşturur. UI'da tutarlılık: aynı renk = aynı anlam, aynı component = aynı davranış. Tutarsız UI, kullanıcıyı her seferinde yeniden düşünmeye zorlar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Consistency in UI Design", url: "https://www.nngroup.com/articles/consistency-heuristic/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Consistency in UX/UI – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why Consistency Is Critical in UI Design", url: "https://medium.com/example" },
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
          {
            title: "UI Design Mindset",
            description: "UI Designer her pikselin bir nedeni olduğunu bilir, estetik ile kullanılabilirlik arasında seçim yapar ve 'beğenmedim' yerine nedenini açıklar. İyi UI sessizdir, dikkat çekmez ve işini yapar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Visual Design Mindset", url: "https://www.nngroup.com/articles/visual-design-mindset/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Thinking Like a UI Designer", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "UI Design Is Decision Making", url: "https://medium.com/example" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir UI kararını kendine açıkla:",
                "'Bunu neden böyle yaptım?'",
                "Cevabın sadece 'daha güzel' mi?",
              ],
            },
          },
        ],
      },
      {
        title: "2. 🧱 Layout & Composition",
        description: "Arayüzdeki içeriklerin nerede konumlandığını, birbirleriyle nasıl ilişkilendiğini ve hangi sırayla algılandığını belirleyen yapısal kararlar.",
        topics: [
          {
            title: "Layout Basics",
            description: "Layout, yalnızca 'kutuları dizmek' değildir. İyi bir layout boşlukları bilinçli kullanır, yoğunluğu dengeler ve içeriği nefes aldırır. Temel kavramlar: yoğunluk (density), ritim, white space.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Page Layouts", url: "https://www.nngroup.com/articles/page-layouts/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Layout Basics – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "White Space Is Not Empty Space", url: "https://medium.com/example" },
                  { title: "Layout Mistakes in UI Design", url: "https://medium.com/example" },
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
            title: "Grid Systems",
            description: "Grid'ler hizalamayı kolaylaştırır, tutarlılık sağlar ve responsive tasarımın temelini oluşturur. Yaygın grid türleri: column grid, baseline grid, modular grid.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Grid Systems in UX", url: "https://www.nngroup.com/articles/grid-systems/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Grid Systems Explained – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why UI Designers Should Use Grids", url: "https://medium.com/example" },
                  { title: "Grid Systems in Modern UI", url: "https://medium.com/example" },
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
            title: "Spacing Systems (4pt / 8pt)",
            description: "Spacing system rastgele boşlukları sistematik aralıklara dönüştürür. 4pt / 8pt sistemi: karar sayısını azaltır, tutarlılığı artırır, dev–designer iletişimini kolaylaştırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Spacing and Alignment", url: "https://www.nngroup.com/articles/spacing-alignment/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "8pt Grid System Explained", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why the 8pt Grid Works", url: "https://medium.com/example" },
                  { title: "Spacing Systems for UI Designers", url: "https://medium.com/example" },
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
            title: "Responsive Layout Thinking",
            description: "Responsive layout ekran küçülünce 'sığdırmak' değildir, öncelikleri yeniden düşünmektir. Önemli noktalar: içerik önceliği, kırılım noktaları (breakpoints), esnek container'lar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Responsive Web Design", url: "https://www.nngroup.com/articles/responsive-web-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Responsive UI Design Basics – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing Responsive Layouts", url: "https://medium.com/example" },
                  { title: "Mobile First UI Thinking", url: "https://medium.com/example" },
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
            title: "Content-First Layout",
            description: "İyi UI lorem ipsum'a göre değil, gerçek içeriğe göre tasarlanır. Content-first yaklaşım: metin uzunluklarını, gerçek veri varyasyonlarını ve edge durumları erken görmeni sağlar.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Content-First Design", url: "https://www.nngroup.com/articles/content-first-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Content First UI – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing with Real Content", url: "https://medium.com/example" },
                  { title: "Why Lorem Ipsum Breaks UI", url: "https://medium.com/example" },
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
          {
            title: "Common Layout Mistakes",
            description: "Sık yapılan hatalar: gereksiz hizalama kırıkları, aşırı yoğun ekranlar, her şeyi aynı önemde göstermek. Bu hatalar kullanıcıyı yorar ve görsel kaliteyi düşürür.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Design Mistakes", url: "https://www.nngroup.com/articles/visual-design-mistakes/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Layout Mistakes – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Common UI Layout Mistakes", url: "https://medium.com/example" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı eleştir:",
                "Neresi fazla?",
                "Neresi eksik?",
              ],
            },
          },
        ],
      },
      {
        title: "3. ✍️ Typography",
        description: "Arayüzdeki metinlerin okunabilirliğini, hiyerarşisini, tonunu ve algılanan kalitesini belirleyen kritik UI bileşenleri.",
        topics: [
          {
            title: "Typography Basics",
            description: "Typography yalnızca font seçmek değildir. Font ailesi, font boyutu, satır aralığı (line-height), harf aralığı (letter-spacing) ve ağırlık (font-weight) kararlarının tamamını kapsar. Yanlış kombinasyonlar metni okunamaz hale getirir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Typography for UX", url: "https://www.nngroup.com/articles/typography/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Typography Basics for UI – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Typography in UI Design", url: "https://medium.com/example" },
                  { title: "Why Typography Is UX", url: "https://medium.com/example" },
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
            title: "Type Scale & Hierarchy",
            description: "Type scale başlıklar, alt başlıklar, gövde metni ve yardımcı metinler arasında net bir hiyerarşi kurar. İyi bir scale az sayıda seviye içerir ve tutarlı artışlarla ilerler.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Hierarchy", url: "https://www.nngroup.com/articles/visual-hierarchy-ux/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Type Scale Explained – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Type Scales for UI Designers", url: "https://medium.com/example" },
                  { title: "How Typography Creates Hierarchy", url: "https://medium.com/example" },
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
            title: "Readability & Scannability",
            description: "Kullanıcılar metni okumaz, tarar. Okunabilirliği etkileyen faktörler: satır uzunluğu, satır aralığı, paragraf yapısı, kontrast. İyi typography hızlı taranır ve anlamı bölmez.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Readability and Legibility", url: "https://www.nngroup.com/articles/readability-legibility/" },
                  { title: "Writing for Scannability", url: "https://www.nngroup.com/articles/scannability/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Readable UI Text – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing Readable Interfaces", url: "https://medium.com/example" },
                  { title: "Why Scannability Matters in UI", url: "https://medium.com/example" },
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
            title: "Accessibility for Typography",
            description: "Erişilebilir typography yeterli kontrast, yeterli boyut ve zoom/dynamic type uyumu sağlar. Küçük ve düşük kontrastlı metin en yaygın UI hatalarından biridir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Accessibility and Typography", url: "https://www.nngroup.com/articles/color-contrast/" },
                ],
              },
              {
                category: "🌐 W3C",
                items: [
                  { title: "Text Accessibility", url: "https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Accessible Typography – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Accessible Typography in UI", url: "https://medium.com/example" },
                  { title: "Why Small Text Breaks UX", url: "https://medium.com/example" },
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
            title: "Common Typography Mistakes",
            description: "Sık yapılan hatalar: çok fazla font ailesi, çok fazla font boyutu, yetersiz line-height, sadece estetik için küçük metinler. Bu hatalar UI kalitesini düşürür.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Design Mistakes", url: "https://www.nngroup.com/articles/visual-design-mistakes/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Typography Mistakes in UI", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Typography Mistakes UI Designers Make", url: "https://medium.com/example" },
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
        title: "4. 🎨 Color & Theme",
        description: "Renk bir arayüzde hiyerarşiyi güçlendiren, durumu ve geri bildirimi ileten, markayı yansıtan ve erişilebilirliği doğrudan etkileyen en güçlü UI araçlarından biridir.",
        topics: [
          {
            title: "Color Basics (UI Level)",
            description: "UI'da renk temel görsel kavramlara dayanır: hue (renk tonu), saturation (doygunluk), value/lightness (açıklık). Yanlış kullanım: düşük kontrast, göz yorgunluğu, yanlış vurgu.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Color in UI Design", url: "https://www.nngroup.com/articles/color-in-ui-design/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Color Basics – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Color Basics for UI Designers", url: "https://medium.com/example" },
                  { title: "Why Color Decisions Matter in UX", url: "https://medium.com/example" },
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
            title: "Color Roles in UI",
            description: "UI'da renkler role göre tanımlanmalıdır: Primary (ana aksiyon), Secondary (ikincil aksiyon), Surface/Background, Feedback (success, warning, error). Bu yaklaşım tutarlılığı artırır ve theming'i kolaylaştırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Color Roles and Meaning", url: "https://www.nngroup.com/articles/color-meaning/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Color Roles Explained – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing Color Systems for UI", url: "https://medium.com/example" },
                  { title: "Stop Picking Random Colors", url: "https://medium.com/example" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekrana bak:",
                "Kaç farklı 'aksiyon rengi' var?",
                "Hepsi gerçekten gerekli mi?",
              ],
            },
          },
          {
            title: "Contrast & Readability",
            description: "Yetersiz kontrast en yaygın erişilebilirlik problemidir ve estetik gerekçeyle sıkça ihlal edilir. UI'da kontrast metin–zemin, ikon–zemin, state'ler arası kontrol edilmelidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Color Contrast and Readability", url: "https://www.nngroup.com/articles/color-contrast/" },
                ],
              },
              {
                category: "🌐 W3C",
                items: [
                  { title: "Contrast (Minimum)", url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Color Contrast Explained – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why Designers Get Contrast Wrong", url: "https://medium.com/example" },
                  { title: "Accessible Color in UI", url: "https://medium.com/example" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir metni test et:",
                "Güneş ışığında okunuyor mu?",
                "Sadece renk ile anlam veriyor mu?",
              ],
            },
          },
          {
            title: "Dark Mode & Theme Switching",
            description: "Dark mode sadece renkleri ters çevirmek değildir; kontrast, vurgu ve yüzey mantığı değişir. İyi dark mode göz yormaz, hiyerarşiyi korur ve her bileşende tutarlıdır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Dark Mode UX", url: "https://www.nngroup.com/articles/dark-mode/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Designing Dark Mode – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Dark Mode Done Right", url: "https://medium.com/example" },
                  { title: "Common Dark Mode Mistakes", url: "https://medium.com/example" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı dark mode'a çevir:",
                "Hangi renkler bozuldu?",
                "Hangi vurgu kayboldu?",
              ],
            },
          },
          {
            title: "Branding vs Product UI",
            description: "Marka renkleri her zaman UI için ideal değildir. UI'da öncelik: kullanılabilirlik, netlik, erişilebilirliktir. Gerekirse marka rengi tonlanır, ikincil role alınır veya sınırlı kullanılır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Branding vs Usability", url: "https://www.nngroup.com/articles/branding-usability/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Branding in UI Design – NNGroup", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "When Branding Hurts UX", url: "https://medium.com/example" },
                  { title: "Balancing Brand and Usability", url: "https://medium.com/example" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir marka rengi düşün:",
                "Primary action için uygun mu?",
                "Değilse nerede kullanılmalı?",
              ],
            },
          },
          {
            title: "Common Color Mistakes",
            description: "Sık yapılan hatalar: çok fazla vurgu rengi, kontrastsız metinler, state'lerde tutarsız renkler, yalnızca renkle anlam vermek. Bu hatalar kullanıcıyı yorar ve hata riskini artırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Visual Design Mistakes", url: "https://www.nngroup.com/articles/visual-design-mistakes/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Color Mistakes", url: "https://www.youtube.com/watch?v=example" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Common UI Color Mistakes", url: "https://medium.com/example" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekranı incele:",
                "Renkler bilgi mi veriyor, yoksa süs mü?",
              ],
            },
          },
        ],
      },
      {
        title: "5. 🖼️ Iconography & Imagery",
        description: "Iconography ve imagery, bir arayüzde anlamı hızla iletmek, metin yükünü azaltmak ve görsel tutarlılık sağlamak için kullanılan güçlü UI araçlarıdır. Bir ikon kelimelerden önce algılanır, görseller bilişsel yükü azaltır ve tutarlı görsel dil marka tutarlılığını artırır.",
        topics: [
          {
            title: "Icon Basics (Meaning & Clarity)",
            description: "UI'da ikonlar sadece estetik değil, anlam taşıyan fonksiyonel unsurlardır. Bir ikon iyi sayılabilmesi için: anlaşılır olmalı (kullanıcı ikonu görmeden önce ne yaptığını tahmin edebilmeli), bağlamsal olmalı (hep aynı anlamı taşımalı), grid tabanlı olmalı (görsel tutarlılık için), ve stroke (çizgi) tutarlı olmalı (aynı kalınlık & stil kuralları). Kafa karıştıran ikonlar kullanıcının akışını bozar ve hata riskini artırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Icon Usability", url: "https://www.nngroup.com/articles/icon-usability/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Designing App Icons (Apple)", url: "https://www.youtube.com/watch?v=z7mF8sAI7Ts" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Systematic Icon Design (Sketch)", url: "https://medium.com/sketch-app-sources/systematic-icon-design-b9ff0e79a54a" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir app aç ve 5 ikona bak",
                "Hangisinin ne yaptığını ilk bakışta anladın?",
                "Hangisi kafa karıştırdı? Neden?",
              ],
            },
          },
          {
            title: "Icon Grids & Visual Consistency",
            description: "Tutarlı bir icon set için, tüm ikonları aynı grid (örn. 24×24 pixel kare) ve stroke (çizgi kalınlığı) sistemine göre tasarlamak gerekir. Icon set tutarlılığı: grid size (24px, 32px, 48px), padding/safe area (ikonun kenarından boşluk), stroke weight (tüm çizgiler aynı kalınlık), corner radius (köşelerin yuvarlaklığı), ve optik hizalama (görsel ağırlık ve denge) gerektirir. Tutarsız icon set tasarımın kalitesini düşürür ve amatör görünmesine neden olur.",
            resources: [
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing Perfect Icon Sets", url: "https://medium.com/@minoraxis/designing-perfect-icon-sets-515d2e7b4ef6" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Icon Design for Beginners (Figma Community)", url: "https://www.youtube.com/results?search_query=icon+design+tutorial+figma" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir design system (Material, Feather, Heroicons) aç",
                "İkonları yan yana koy: hepsi aynı stroke kalınlığında mı?",
                "Görsel ağırlıkları eşit mi?",
              ],
            },
          },
          {
            title: "Icon Styles (Outline vs Filled)",
            description: "İkonların iki ana stili vardır: outline (çizgi tabanlı - minimal, modern, daha az yoğun UI'larda tercih edilir) ve filled (dolu - bold, dikkat çekici, vurgulamak için kullanılır). Outline web ve mobilde popüler (Feather, Heroicons), filled mobilde sık kullanılır (Material Icons). UI minimse outline kullan, aktif durum/seçili öğe/önemli action için filled kullan. Karışık kullanma: outline kullanıyorsan, filled sadece vurgu için kullan (örn: selected tab filled, rest outline).",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Filled vs Outline Icons", url: "https://www.nngroup.com/articles/icon-usability/" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "How to Choose Icon Style", url: "https://uxdesign.cc/how-to-choose-icon-style-in-ui-design-8bf4d4c6e7f8" },
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
            title: "Illustrations in UI",
            description: "İllüstrasyonlar UI'da boş durumları, onboarding akışlarını veya brand hikayesini anlatmak için kullanılır. Empty state (hiç içerik yokken), onboarding (adım adım tanıtım), error state (404, 500, offline sayfaları), ve brand storytelling için idealdir. İyi bir UI illüstrasyonu minimal (çok detaylı olmamalı), bağlamsal (içerikle uyumlu), marka ile uyumlu (tone & style kurallarına uygun), ve kullanılabilirliğe katkı sağlayan (sadece süs olmamalı) olmalıdır. Yanlış illustrasyon UI'yı karıştırır, doğru kullanım deneyimi zenginleştirir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Illustrations in UX", url: "https://www.nngroup.com/articles/illustration-ux/" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "When to Use Illustrations in UI", url: "https://uxdesign.cc/when-to-use-illustrations-in-ui-design-2c1e8e9c3f3e" },
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
            title: "Images & Thumbnails",
            description: "UI'da kullanılan görsellerin (fotoğraflar, thumbnails) doğru crop edilmesi, aspect ratio'su ve kalitesi deneyimi etkiler. İyi image/thumbnail kullanımı: aspect ratio tutarlılığı (tüm kartlar aynı orana sahip olmalı: 16:9, 4:3, 1:1), cropping stratejisi (otomatik crop yaparken önemli içerik kesilmemeli), placeholder usage (görsel yüklenene kadar skeleton ya da LQIP göster), ve lazy loading (performans için ekrana gelince yükle) gerektirir. Kötü crop edilmiş, farklı oranlar, düşük kalite tasarımı kalitesiz gösterir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Image Guidelines for UX", url: "https://www.nngroup.com/articles/image-guidelines/" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing with Images in UI", url: "https://uxdesign.cc/designing-with-images-in-ui-37e5c3a8c6f2" },
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
            title: "Common Icon & Imagery Mistakes",
            description: "Icon ve imagery kullanımında sık yapılan hatalar: Ambiguous (belirsiz) iconlar (kullanıcı anlamını tahmin edemiyor), tutarsız stroke & style (farklı icon set'lerden rastgele ikonlar), çok detaylı illustrasyon (dikkat dağıtıcı, load time artışı), farklı aspect ratio'lar (görsel düzensizlik), yanlış crop (önemli içerik kesiliyor), ve gereksiz decorative görseller (UI'ya katma değer sağlamayan 'dolgu' illustrasyon). Bu hatalar UI'nın kalitesini düşürür ve kullanıcıyı kafa karıştırır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Icon Usability", url: "https://www.nngroup.com/articles/icon-usability/" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Common Icon Design Mistakes", url: "https://uxdesign.cc/icon-design-mistakes-ec3f8b6e4c8e" },
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
        title: "6. 🧩 UI Components & Patterns",
        description: "UI component'leri ve pattern'lar arayüzün tekrar eden yapı taşlarıdır. Tutarlılığı sağlar ve tasarım/geliştirme sürecini hızlandırır. Amaç: her ekranı sıfırdan tasarlamamak, kullanıcıya tanıdık deneyimler sunmak ve ölçeklenebilir UI sistemleri kurmak.",
        topics: [
          {
            title: "What is a UI Component?",
            description: "UI component tek başına anlamı olan, tekrar kullanılabilen ve belirli bir davranışı olan arayüz parçasıdır. Örnekler: button, input, card, modal. Component'ler tutarlı davranmalı ve aynı kuralları izlemelidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UI Components and Patterns", url: "https://www.nngroup.com/articles/ui-components/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Components Explained – NNGroup", url: "https://www.youtube.com/results?search_query=nngroup+ui+components" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "What Makes a Good UI Component", url: "https://uxdesign.cc/what-makes-a-good-ui-component-6a1e9b8b0c8f" },
                  { title: "Thinking in Components", url: "https://medium.com/thinking-in-components" },
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
            title: "Core Components (Buttons, Inputs, etc.)",
            description: "Her UI sisteminde bazı temel component'ler vardır: buttons, inputs, selects, checkboxes, radio buttons, cards. Bu component'ler tutarlı davranmalı ve aynı kuralları izlemelidir. Her component'in tıklanabilirliği net olmalı ve birbirleriyle karışmamalıdır.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Button Design Guidelines", url: "https://www.nngroup.com/articles/buttons/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Buttons Best Practices – NNGroup", url: "https://www.youtube.com/results?search_query=nngroup+button+design" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing Buttons for UI", url: "https://uxdesign.cc/designing-buttons-for-ui-2c1e8e9c3f3e" },
                  { title: "Input Fields in UI Design", url: "https://uxdesign.cc/input-fields-in-ui-design-7c8b6e4c6f8e" },
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
            title: "Component Anatomy",
            description: "Bir component yalnızca 'kutudan' ibaret değildir. Örnek bir input: label, helper text, placeholder, error state, prefix/suffix içerir. Bu parçalar birlikte çalışır. Placeholder kaybolunca kullanıcı ne yapacak? Label yeterince net mi? Bu sorular component anatomy'sini anlamak için önemlidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Form Design Anatomy", url: "https://www.nngroup.com/articles/form-design-placeholders/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Input Anatomy Explained – NNGroup", url: "https://www.youtube.com/results?search_query=input+anatomy+ui+design" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Component Anatomy in UI", url: "https://uxdesign.cc/component-anatomy-in-ui-3c8b6e4c6f8e" },
                  { title: "Why Inputs Fail in Forms", url: "https://uxdesign.cc/why-inputs-fail-in-forms-2c1e8e9c3f3e" },
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
            title: "UI Patterns (When to Use What)",
            description: "UI pattern'ları sık karşılaşılan problemler için kanıtlanmış çözümler sunar. Örnek kararlar: modal mı sayfa mı? tabs mi stepper mı? dropdown mı radio mı? Bir problem düşün: Bu problem daha önce çözülmüş mü? Var olan bir pattern işini görür mü?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UI Patterns", url: "https://www.nngroup.com/articles/ui-patterns/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Patterns Explained – NNGroup", url: "https://www.youtube.com/results?search_query=ui+patterns+explained" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Choosing the Right UI Pattern", url: "https://uxdesign.cc/choosing-the-right-ui-pattern-7c8b6e4c6f8e" },
                  { title: "UI Patterns That Work", url: "https://uxdesign.cc/ui-patterns-that-work-2c1e8e9c3f3e" },
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
            title: "Component Consistency & Reusability",
            description: "Component'ler tek bir yerde tanımlanmalı ve her yerde aynı davranmalıdır. Tutarsız component kullanıcıyı şaşırtır ve bakım maliyetini artırır. Bir projede aynı isimle kaç farklı buton var? Neden farklılar? Bu sorular tutarlılığı kontrol etmek için önemlidir.",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Consistency Heuristic", url: "https://www.nngroup.com/articles/consistency-heuristic/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Component Reusability – NNGroup", url: "https://www.youtube.com/results?search_query=component+reusability+ui" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why Reusable Components Matter", url: "https://uxdesign.cc/why-reusable-components-matter-3c8b6e4c6f8e" },
                  { title: "Scaling UI with Components", url: "https://uxdesign.cc/scaling-ui-with-components-2c1e8e9c3f3e" },
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
            description: "Sık yapılan hatalar: her varyasyonu yeni component yapmak, davranışları dokümante etmemek, state'leri atlamak. Bu hatalar teknik borç yaratır ve UI kalitesini düşürür. Bir component düşün: Hangi state'leri eksik? Gerçekte nasıl davranmalı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Design System Mistakes", url: "https://www.nngroup.com/articles/design-system-mistakes/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Component Mistakes", url: "https://www.youtube.com/results?search_query=ui+component+mistakes" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Common UI Component Mistakes", url: "https://uxdesign.cc/common-ui-component-mistakes-7c8b6e4c6f8e" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir component düşün: Hangi state'leri eksik?",
                "Gerçekte nasıl davranmalı?",
              ],
            },
          },
        ],
      },
      {
        title: "7. 🔄 States, Feedback & System Status",
        description: "Bu bölüm, bir arayüzün kullanıcı aksiyonlarına nasıl tepki verdiğini, sistemin o anda ne yaptığını ve kullanıcının nerede olduğunu net şekilde anlatmasını sağlar. Amaç: belirsizliği azaltmak, kullanıcıyı kontrol altında hissettirmek ve hata/bekleme anlarını yönetmek.",
        topics: [
          {
            title: "Component States (Default, Hover, Focus, etc.)",
            description: "Her UI component'i birden fazla state'e sahiptir: default, hover, focus, active, disabled. Eksik state'ler kullanıcıyı kararsız bırakır ve arayüzü 'bozuk' hissettirir. Bir butona bak: Hover yoksa ne hissediyorsun? Disabled hali yeterince farklı mı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UI States", url: "https://www.nngroup.com/articles/ui-states/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Component States Explained – NNGroup", url: "https://www.youtube.com/results?search_query=component+states+ui+design" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing UI States", url: "https://uxdesign.cc/designing-ui-states-3c8b6e4c6f8e" },
                  { title: "Why Disabled States Matter", url: "https://uxdesign.cc/why-disabled-states-matter-2c1e8e9c3f3e" },
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
            title: "Validation & Error Handling",
            description: "Hata mesajları kullanıcıyı suçlamamalı, net ve yönlendirici olmalı, mümkünse anında gösterilmelidir. İyi hata mesajı ne oldu, neden oldu, nasıl düzeltilir sorularını cevaplar. Bir hata mesajını oku: Ne yapman gerektiği net mi? Tekrar denemek kolay mı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Error Message Guidelines", url: "https://www.nngroup.com/articles/error-message-guidelines/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UX Error Messages – NNGroup", url: "https://www.youtube.com/results?search_query=error+messages+ux" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing Helpful Error Messages", url: "https://uxdesign.cc/designing-helpful-error-messages-7c8b6e4c6f8e" },
                  { title: "Inline Validation in Forms", url: "https://uxdesign.cc/inline-validation-in-forms-2c1e8e9c3f3e" },
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
            title: "Loading, Empty & Success States",
            description: "Bu state'ler genelde ihmal edilir ama deneyimin en kırılgan anlarıdır. Boş state yönlendirmeli, loading beklenti yönetmeli, success güven vermelidir. Bir boş ekran düşün: Kullanıcı ne yapmalı? UI bunu söylüyor mu?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Empty States", url: "https://www.nngroup.com/articles/empty-states/" },
                  { title: "Progress Indicators", url: "https://www.nngroup.com/articles/progress-indicators/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Designing Empty & Loading States – NNGroup", url: "https://www.youtube.com/results?search_query=empty+states+loading+ui" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing Empty States That Work", url: "https://uxdesign.cc/designing-empty-states-that-work-7c8b6e4c6f8e" },
                  { title: "Loading States in UI", url: "https://uxdesign.cc/loading-states-in-ui-2c1e8e9c3f3e" },
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
            title: "Affordance & Visual Feedback",
            description: "Affordance bir şeyin ne yapılabileceğini görsel olarak anlatmasıdır. Örnek: buton buton gibi görünmeli, link link gibi davranmalı. Bir ekrana bak: Nereler tıklanabilir? Bunu sadece bakarak anlayabiliyor musun?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Affordances", url: "https://www.nngroup.com/articles/affordances/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Affordance in UI Design – NNGroup", url: "https://www.youtube.com/results?search_query=affordance+ui+design" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Affordance in Interface Design", url: "https://uxdesign.cc/affordance-in-interface-design-7c8b6e4c6f8e" },
                  { title: "Why Users Don't Click", url: "https://uxdesign.cc/why-users-dont-click-2c1e8e9c3f3e" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir ekrana bak: Nereler tıklanabilir?",
                "Bunu sadece bakarak anlayabiliyor musun?",
              ],
            },
          },
          {
            title: "Microcopy for UI States",
            description: "Microcopy küçük metinlerdir ama büyük fark yaratır. Özellikle hata, boş ve loading state'lerinde kritik rol oynar. Bir microcopy düşün: Daha kısa olabilir mi? Daha net bir fiil var mı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Microcopy in UX", url: "https://www.nngroup.com/articles/microcopy/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Writing Microcopy for UI – NNGroup", url: "https://www.youtube.com/results?search_query=microcopy+ui+design" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Microcopy That Improves UX", url: "https://uxdesign.cc/microcopy-that-improves-ux-7c8b6e4c6f8e" },
                  { title: "UI Text That Guides Users", url: "https://uxdesign.cc/ui-text-that-guides-users-2c1e8e9c3f3e" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir microcopy düşün: Daha kısa olabilir mi?",
                "Daha net bir fiil var mı?",
              ],
            },
          },
          {
            title: "Common State & Feedback Mistakes",
            description: "Sık yapılan hatalar: sessiz butonlar, belirsiz loading'ler, suçlayıcı hata mesajları, success state'i göstermemek. Bu hatalar kullanıcı güvenini azaltır. Bir etkileşimi incele: Tıkladıktan sonra ne oluyor? Kullanıcı bunu fark ediyor mu?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "UX Feedback Mistakes", url: "https://www.nngroup.com/articles/usability-heuristics/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "UI Feedback Mistakes", url: "https://www.youtube.com/results?search_query=ui+feedback+mistakes" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why Feedback Is a UX Principle", url: "https://uxdesign.cc/why-feedback-is-a-ux-principle-7c8b6e4c6f8e" },
                ],
              },
            ],
            practice: {
              title: "🧠 Mini Pratik",
              tasks: [
                "Bir etkileşimi incele: Tıkladıktan sonra ne oluyor?",
                "Kullanıcı bunu fark ediyor mu?",
              ],
            },
          },
        ],
      },
      {
        title: "8. 🎞️ Interaction & Motion (UI Perspective)",
        description: "Motion ve etkileşim, bir arayüzün nasıl 'tepki verdiğini', geçişlerin nasıl algılandığını ve kullanıcının nerede olduğunu anlatan görsel ipuçlarıdır. Amaç: dikkat yönlendirmek, durumu açıklamak ve deneyimi akıcı hale getirmek. Motion amaçlı olmalıdır; süs değildir.",
        topics: [
          {
            title: "Microinteractions",
            description: "Microinteraction tek bir aksiyona verilen küçük tepkidir. Örnekler: butona basıldığında renk değişimi, favoriye ekleme animasyonu, toggle geçişi. İyi microinteraction hızlı, doğal ve dikkat dağıtmayan olmalıdır. Bir microinteraction düşün: Olmazsa ne kaybolur? Varsa kullanıcı ne hisseder?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Microinteractions", url: "https://www.nngroup.com/articles/microinteractions/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Microinteractions Explained – NNGroup", url: "https://www.youtube.com/results?search_query=microinteractions+ui+design" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Designing Microinteractions", url: "https://uxdesign.cc/designing-microinteractions-7c8b6e4c6f8e" },
                  { title: "Why Microinteractions Matter", url: "https://uxdesign.cc/why-microinteractions-matter-2c1e8e9c3f3e" },
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
            title: "Motion Principles (Timing & Easing)",
            description: "Motion kararları hız, gecikme ve easing üzerinden algılanır. Yanlış motion yavaşlatır, mide bulandırır ve profesyonellik hissini düşürür. Bir animasyonu izle: Çok mu yavaş? Gereğinden uzun mu?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Animation and Motion", url: "https://www.nngroup.com/articles/animation/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Motion Design Basics – NNGroup", url: "https://www.youtube.com/results?search_query=motion+design+basics" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "UI Motion Principles", url: "https://uxdesign.cc/ui-motion-principles-7c8b6e4c6f8e" },
                  { title: "Timing & Easing Explained", url: "https://uxdesign.cc/timing-easing-explained-2c1e8e9c3f3e" },
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
            title: "Motion for Hierarchy & Focus",
            description: "Motion dikkati yönlendirebilir ve önceliği gösterebilir. Örnek: modal açılırken arka planın geri çekilmesi, focus olan alanın öne çıkması. Bir geçiş düşün: Motion olmasa kullanıcı nerede olduğunu anlar mı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Animation for Attention", url: "https://www.nngroup.com/articles/animation-attention/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Using Motion to Guide Attention", url: "https://www.youtube.com/results?search_query=motion+guide+attention+ui" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Motion as a UX Tool", url: "https://uxdesign.cc/motion-as-a-ux-tool-7c8b6e4c6f8e" },
                  { title: "Guiding Users with Motion", url: "https://uxdesign.cc/guiding-users-with-motion-2c1e8e9c3f3e" },
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
            title: "Motion Pitfalls",
            description: "Sık yapılan hatalar: her şeyi hareketlendirmek, gereksiz bounce'lar, uzun animasyonlar, performansı düşüren motion. Motion görünmez olmalı, baskın değil. Bir ekranı düşün: Motion kapalı olsa hâlâ anlaşılır mı?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Animation Pitfalls", url: "https://www.nngroup.com/articles/animation-pitfalls/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Motion Mistakes in UI", url: "https://www.youtube.com/results?search_query=motion+mistakes+ui" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Why Too Much Animation Hurts UX", url: "https://uxdesign.cc/too-much-animation-hurts-ux-7c8b6e4c6f8e" },
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
            title: "Motion in Components",
            description: "Component bazlı motion state değişimlerini netleştirir ve geçişleri yumuşatır. Örnek: accordion açılıp kapanması, toast mesajlarının girişi. Bir component seç: State değişimi motion ile daha mı anlaşılır?",
            resources: [
              {
                category: "📘 Nielsen Norman Group",
                items: [
                  { title: "Animated UI Components", url: "https://www.nngroup.com/articles/animated-components/" },
                ],
              },
              {
                category: "🎥 YouTube",
                items: [
                  { title: "Motion in UI Components", url: "https://www.youtube.com/results?search_query=motion+ui+components" },
                ],
              },
              {
                category: "✍️ Medium",
                items: [
                  { title: "Animating UI Components", url: "https://uxdesign.cc/animating-ui-components-7c8b6e4c6f8e" },
                  { title: "Motion and State Transitions", url: "https://uxdesign.cc/motion-state-transitions-2c1e8e9c3f3e" },
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
        title: "9. Accessibility for UI Designers",
        description: "UI tasarımında erişilebilirlik prensipleri ve uygulamaları.",
        topics: [
          { title: "Accessibility Mindset (Inclusive UI)" },
          { title: "Color & Contrast Checks" },
          { title: "Focus Visibility & Keyboard (Web awareness)" },
          { title: "Typography Legibility (Scale, spacing)" },
          { title: "Accessible UI Checklist (Quick audit)" },
        ],
      },
      {
        title: "10. Platform Awareness (Web & Mobile)",
        description: "Web ve mobil platformlar için UI tasarım farklılıkları.",
        topics: [
          { title: "Web UI Basics (Navigation, density, hover/focus)" },
          { title: "Mobile UI Basics (Thumb reach, gestures, safe areas)" },
          { title: "Design Guidelines Awareness (Material / iOS HIG)" },
          { title: "Responsive vs Adaptive UI" },
          { title: "Platform-Specific Pitfalls (Same UI everywhere)" },
        ],
      },
      {
        title: "11. Design Systems (UI-Focused, Intro → Practical)",
        description: "Tasarım sistemleri temelleri ve component kütüphaneleri.",
        topics: [
          { title: "Why Design Systems Exist (Consistency & Scale)" },
          { title: "Foundations (Color, Type, Spacing, Radius)" },
          { title: "Design Tokens (Intro: roles, naming, theming)" },
          { title: "Component Libraries (Structure & governance basics)" },
          { title: "Theming & Variants (Light/Dark, brand themes)" },
        ],
      },
      {
        title: "12. UI QA, Critique & Iteration",
        description: "UI kalite kontrolü, tasarım eleştirisi ve iterasyon süreçleri.",
        topics: [
          { title: "UI Critique Framework (Objective critique)" },
          { title: "Visual QA Checklist (Spacing, alignment, contrast, states)" },
          { title: "Design Regression Thinking (What breaks over time)" },
          { title: "Iteration Loops (Feedback → refine)" },
          { title: "Common UI Quality Issues (Inconsistency, density drift)" },
        ],
      },
      {
        title: "13. Handoff & Working with Developers (UI Angle)",
        description: "UI tasarımlarının geliştiricilere teslimi ve işbirliği.",
        topics: [
          { title: "UI Specs Basics (What matters, what doesn't)" },
          { title: "File Organization & Naming (Clean handoff)" },
          { title: "Component Behavior Notes (States, transitions)" },
          { title: "Developer-Friendly UI (Constraints, responsive rules)" },
          { title: "UI Design QA in Build (Compare, adjust)" },
        ],
      },
      {
        title: "14. UI Portfolio & Career (Junior Focused)",
        description: "UI Designer portfolyosu ve kariyer gelişimi.",
        topics: [
          { title: "What Makes a Strong UI Portfolio" },
          { title: "Showing UI Thinking (Rationale, constraints, decisions)" },
          { title: "Before/After & UI Improvements (Case format)" },
          { title: "Common Junior UI Portfolio Mistakes" },
          { title: "Growing as a UI Designer (Learning plan)" },
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
