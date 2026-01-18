"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { MarkdownRenderer } from "@/components/kutuphane/MarkdownRenderer";
import { trackMixpanelEvent } from "@/lib/mixpanel";

// Article data - In production, this would come from a CMS or API
const ARTICLE_DATA: Record<string, any> = {
  "kullanilabilirlik-testi": {
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
    author: "Serhat Bahçeliler",
    content: `# Kullanılabilirlik Testi Nedir? Adım Adım Uygulama Rehberi

**Seviye:** Başlangıç  
**Kategori:** UX Research  
**Son güncelleme:** Ocak 2025

---

## Giriş

Haftalarca üzerinde çalıştığın bir tasarımı geliştirici ekibe teslim ettin. Herkes mutlu, ürün yayınlandı. Ama bir hafta sonra müşteri hizmetleri şikayetlerle doldu: "Ödeme butonunu bulamıyorum", "Sepetim nereye gitti?", "Bu sayfa ne işe yarıyor?"

Tanıdık geldi mi?

Bu senaryo, tasarımların gerçek kullanıcılarla test edilmediğinde sıkça yaşanır. Kullanılabilirlik testi, tam da bu sorunu çözmek için var: Tasarımını kullanıcının gözünden görmeni sağlar ve sorunları ürün yayınlanmadan önce yakalamanı mümkün kılar.

Bu yazıda kullanılabilirlik testinin ne olduğunu, neden önemli olduğunu ve adım adım nasıl uygulayacağını öğreneceksin. Yazının sonunda kendi testini planlayabileceğin bir checklist de seni bekliyor.

---

## Kullanılabilirlik Testi Ne Demek?

Kullanılabilirlik testi, gerçek kullanıcıların bir ürün veya tasarımla etkileşimini gözlemlediğin bir araştırma yöntemidir. Kullanıcıya belirli görevler verirsin ve bu görevleri tamamlamaya çalışırken nerede takıldığını, ne hissettiğini, neyi anlamadığını izlersin.

**Kullanılabilirlik testi şu DEĞİLDİR:**

- Kullanıcıya "Beğendin mi?" diye sormak (bu fikir testi)
- A/B testi (bu metrik karşılaştırma)
- Anket göndermek (bu tutum araştırması)
- Tasarımı arkadaşına gösterip onay almak (bu bias)

[CALLOUT]
**Kullanılabilirlik testi şudur:**
Gerçek bir kullanıcının, gerçek görevleri tamamlamaya çalışırken yaşadığı deneyimi gözlemlemek ve bu gözlemlerden tasarım kararları çıkarmak.
[/CALLOUT]

Basit bir örnekle açıklayalım: Bir e-ticaret sitesi tasarlıyorsun. Kullanılabilirlik testinde kullanıcıya "Mavi bir tişört bul ve sepete ekle" dersin. Sonra izlersin: Filtreleri bulabildi mi? Beden seçimi kafa karıştırdı mı? Sepete ekleme butonu yeterince görünür müydü?

---

## Neden Önemli?

### Kullanıcı perspektifi

Sen tasarımcı olarak ürünü en iyi bilen kişisin. Bu bir avantaj gibi görünse de aslında körlük yaratır. Kullanıcı ürünü ilk kez görüyor ve senin "aşikar" bulduğun şeyler onun için hiç aşikar olmayabilir. Kullanılabilirlik testi, bu körlüğü kırar.

### Business perspektifi

Sorunları geliştirme aşamasında bulmak, yayın sonrası bulmaktan çok daha ucuzdur. Bir butonu Figma'da değiştirmek 5 dakika alır. Aynı butonu production'da değiştirmek sprint planlaması, geliştirme, QA ve deployment gerektirir.

Ayrıca kullanılabilirlik sorunları doğrudan iş metriklerini etkiler:

- Checkout'ta takılan kullanıcı → Tamamlanmayan sipariş
- Filtreleri bulamayan kullanıcı → Siteden çıkış
- Formu anlayamayan kullanıcı → Yarıda bırakılan başvuru

### Stakeholder perspektifi

"Bence bu tasarım iyi" yerine "5 kullanıcıyla test ettik, 4'ü bu görevi sorunsuz tamamladı" demek tartışmaları bitirir. Kullanılabilirlik testi, tasarım kararlarına veri desteği sağlar.

---

## Nasıl Yapılır? Adım Adım Süreç

### 1. Hazırlık Aşaması

#### Test amacını belirle

Her testin net bir amacı olmalı. "Genel olarak bakalım" yaklaşımı işe yaramaz.

[COMPARISON]
Kötü amaç: "Tasarımın kullanılabilirliğini test etmek"
İyi amaç: "Kullanıcıların yeni checkout akışında ödeme yöntemini seçip siparişi tamamlayıp tamamlayamadığını anlamak"
[/COMPARISON]

#### Görevleri yaz

Görevler, kullanıcının gerçek hayatta yapacağı işlemleri yansıtmalı. Yönlendirici olmamalı.

[COMPARISON]
Kötü görev: "Sol menüden Hesabım'a tıklayıp adres ekle"
İyi görev: "Siparişinin yeni adresine gelmesini istiyorsun. Teslimat adresini değiştir."
[/COMPARISON]

[TIP]
💡 İyi görevlerin özellikleri:
- Senaryo bazlı (ne yapacağını değil, neyi başarmak istediğini söyler)
- Yönlendirici değil (UI elementlerinin adını vermez)
- Gerçekçi (kullanıcının gerçekten yapacağı bir şey)

Genellikle bir test seansı için 5-7 görev idealdir. Daha fazlası kullanıcıyı yorar.
[/TIP]

#### Katılımcı sayısını belirle

[INFO]
5 kullanıcı yeterli
Sorunların yaklaşık %85'ini ortaya çıkarır
[/INFO]

Bu sayı, Jakob Nielsen'in araştırmalarına dayanır ve küçük ekipler için iyi bir başlangıç noktasıdır.

[WARNING]
⚠️ Dikkat: 5 kullanıcı, tek bir kullanıcı segmenti için geçerli. Eğer ürünün hem bireysel hem kurumsal kullanıcılara hitap ediyorsa, her segment için ayrı testler gerekir.
[/WARNING]

#### Katılımcı bul

Doğru katılımcı, hedef kullanıcı profiline uyan kişidir. 

[WARNING]
⚠️ Arkadaşlarını veya iş arkadaşlarını test etme; onlar gerçek kullanıcı davranışını yansıtmaz.
[/WARNING]

Katılımcı bulma yöntemleri:
- Mevcut kullanıcı tabanından davet
- Sosyal medya veya topluluk grupları
- Araştırma platformları (UserTesting, Maze vb.)
- Ürünün hedef kitlesinin bulunduğu ortamlar

#### Test ortamını hazırla

**Yüz yüze test için:**
- Sessiz bir oda
- Ekran kaydı yapabileceğin bir düzenek
- Not almak için bir gözlemci (mümkünse)

**Remote test için:**
- Ekran paylaşımlı görüşme aracı (Zoom, Google Meet)
- Ekran kaydı yazılımı
- Stabil internet bağlantısı

### 2. Test Senaryosu Oluşturma

Test senaryosu, testin başından sonuna kadar ne söyleyeceğini ve yapacağını içeren bir script'tir. Bu, her katılımcıya tutarlı bir deneyim sunmanı sağlar.

[STEPS]
1. Giriş (2-3 dakika)
   - Kendini tanıt
   - Testin amacını açıkla
   - "Seni değil, tasarımı test ediyoruz" de
   - Sesli düşünmesini iste
   - Kayıt izni al

2. Isınma soruları (2-3 dakika)
   - Demografik bilgiler
   - Benzer ürün deneyimi
   - Konuyla ilgili alışkanlıklar

3. Görevler (15-25 dakika)
   - Her görevi tek tek ver
   - Takılırsa hemen yardım etme
   - Neden öyle yaptığını sor

4. Kapanış (3-5 dakika)
   - Genel izlenim
   - En zor/kolay kısım
   - Eklemek istediği bir şey var mı
[/STEPS]

### 3. Testi Yürütme

#### Başlarken söylenecekler

Test başlamadan önce katılımcıyı rahatlatmak çok önemli. Şöyle bir giriş yapabilirsin:

[QUOTE]
"Bugün seninle bir tasarımı test edeceğiz. Seni değil, tasarımı test ediyoruz, yani yanlış cevap diye bir şey yok. Zorlandığın yerler varsa bu tasarımın sorunu, senin değil. Test boyunca aklından geçenleri sesli söylemeni isteyeceğim. Bu bize çok yardımcı oluyor. Başlamadan önce soruların var mı?"
[/QUOTE]

#### Test sırasında dikkat edilecekler

[CHECKLIST]
Yap:
- Sessiz kal ve gözlemle
- Not al (nerede takıldı, ne söyledi, yüz ifadesi)
- "Ne düşünüyorsun?" veya "Şu an ne yapmaya çalışıyorsun?" gibi açık uçlu sorular sor
- Takılırsa biraz bekle, hemen müdahale etme

Yapma:
- "Şuraya tıklasana" deme
- Tasarımı savunma
- Takıldığında hemen cevabı verme
- Yönlendirici sorular sorma ("Bu buton güzel değil mi?")
[/CHECKLIST]

#### Takıldığında ne yapmalı

Kullanıcı bir görevde tamamen takılırsa ve ilerleyemiyorsa, bu da değerli veri. Bir süre bekle, sonra şunu sorabilirsin: "Normalde bu durumda ne yapardın?"

Eğer hala ilerleyemiyorsa: "Bu görevi burada bırakalım, sıradaki göreve geçelim" diyebilirsin. Zorla tamamlatmaya çalışma.

### 4. Analiz ve Raporlama

#### Notları düzenle

Her katılımcı için şu bilgileri kaydet:
- Görev tamamlama durumu (başarılı / kısmen başarılı / başarısız)
- Tamamlama süresi
- Hata sayısı ve türü
- Kullanıcının söyledikleri (doğrudan alıntılar)
- Gözlemlenen zorluklar

#### Sorunları önceliklendir

[TABLE]
Seviye | Tanım | Aksiyon
Kritik | Görevi tamamlamayı engelliyor | Hemen çöz
Yüksek | Ciddi zorlanma yaratıyor | Sprint içinde çöz
Orta | Deneyimi olumsuz etkiliyor | Backlog'a al
Düşük | Küçük rahatsızlık | İleride değerlendir
[/TABLE]

#### Rapor formatı

Stakeholder'lara sunacağın rapor şunları içermeli:

1. **Özet:** Test amacı, katılımcı sayısı, ana bulgular (1 paragraf)
2. **Metodoloji:** Nasıl test edildi, kimlerle test edildi
3. **Bulgular:** Sorunlar, öncelik sırası, görsel kanıtlar (screenshot/video clip)
4. **Öneriler:** Her sorun için çözüm önerisi
5. **Sonraki adımlar:** Ne zaman tekrar test edilecek

---

## Sık Yapılan Hatalar

### 1. Yönlendirici görev yazmak

[COMPARISON]
Hata: "Üst menüdeki Hesabım butonuna tıkla"
Doğrusu: "Hesap bilgilerini güncellemek istiyorsun"
[/COMPARISON]

Görevde UI elementlerinin adını verirsen, kullanıcının onu bulup bulamayacağını test edemezsin.

### 2. Arkadaşlarla test etmek

Arkadaşların seni kırmamak için nazik davranır, gerçek sorunları söylemeyebilir. Ayrıca ürünü veya seni tanıdıkları için gerçek kullanıcı gibi davranmazlar.

### 3. Takılınca hemen yardım etmek

Kullanıcı zorlandığında içgüdüsel olarak yardım etmek istersin. Ama takılma anları en değerli veridir. Birkaç dakika bekle, gözlemle.

### 4. Tek seferde çok fazla test etmek

20 görevli, 1 saatlik bir test kullanıcıyı yorar ve veri kalitesini düşürür. 5-7 görev, 30-45 dakika ideal.

### 5. Test sonuçlarını kişisel almak

"Kullanıcı beğenmedi" diye üzülme. Test, tasarımı geliştirmek için yapılır. Her bulunan sorun, daha iyi bir ürün demek.

---

[EXERCISE]
## Şimdi Sen Dene

**Senaryo:** Bir yemek siparişi uygulaması tasarlıyorsun. Kullanıcıların favori restoranlarından sipariş vermesini kolaylaştırmak istiyorsun.

**Görev:** Bu uygulama için 3 adet kullanılabilirlik testi görevi yaz.

**Kurallar:**
- Görevler yönlendirici olmasın
- Senaryo bazlı olsun
- Gerçek kullanıcı davranışını yansıtsın

**Başlangıç için örnek:**
"Geçen hafta sipariş verdiğin restorandan tekrar sipariş vermek istiyorsun."

Kendi görevlerini yazdıktan sonra şu soruları sor:
- UI elementi adı geçiyor mu? (geçmesin)
- Kullanıcı neyi başarmak istiyor belli mi? (belli olsun)
- Gerçek bir kullanıcı bunu yapar mı? (yapsın)
[/EXERCISE]

---

[SUMMARY]
## Özet

- Kullanılabilirlik testi, tasarımı gerçek kullanıcılarla test etmektir; fikir sormak değil
- 5 kullanıcı, sorunların çoğunu ortaya çıkarır
- Görevler yönlendirici değil, senaryo bazlı olmalı
- Test sırasında sessiz kal, gözlemle, yönlendirme
- Bulunan sorunları önceliklendirip aksiyon al
[/SUMMARY]

---

## İlgili İçerikler

**Sonraki:** [Kullanıcı Görüşmesi Nasıl Yapılır?](/kutuphane/kullanici-gorusmesi)

**İlgili Roadmap:** [UX Designer Roadmap → Research Yöntemleri](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [Usability Testing 101 - NNGroup](https://www.nngroup.com/articles/usability-testing-101/) (İngilizce, 10 dk)
- [How to Conduct Usability Testing - Interaction Design Foundation](https://www.interaction-design.org/literature/article/usability-testing) (İngilizce, 15 dk)
- [Running a Usability Test - UsabilityHub](https://usabilityhub.com/guides/usability-testing) (İngilizce, 12 dk)
`,
  },
  "kullanici-gorusmesi": {
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
    author: "Serhat Bahçeliler",
    content: `# Kullanıcı Görüşmesi Nasıl Yapılır? Etkili User Interview Rehberi

**Seviye:** Başlangıç  
**Kategori:** UX Research  
**Son güncelleme:** Ocak 2025

---

## Giriş

"Kullanıcılar ne istiyor?" sorusunun cevabını bulmak için anket mi yapmalı, dataya mı bakmalı, yoksa tahmin mi etmeli?

Hiçbiri. Kullanıcıyla konuşmalısın.

Kullanıcı görüşmesi, UX araştırmasının en temel ve en güçlü yöntemlerinden biri. Doğru yapıldığında, hiçbir anketin veya analitik verinin veremeyeceği derinlikte içgörüler sunar. Kullanıcının ne yaptığını değil, neden yaptığını anlarsın.

Ama dikkat: Kötü yapılan bir görüşme, yanlış içgörülere ve hatalı tasarım kararlarına yol açabilir. "Kullanıcı böyle istedi" deyip aslında kendi fikrini doğrulatmış olabilirsin.

Bu yazıda kullanıcı görüşmesinin ne olduğunu, nasıl planlanacağını, doğru soru sorma tekniklerini ve görüşmeden içgörü çıkarmayı öğreneceksin.

---

## Kullanıcı Görüşmesi Ne Demek?

Kullanıcı görüşmesi (user interview), hedef kullanıcılarla birebir yapılan, açık uçlu sorularla kullanıcının deneyimlerini, ihtiyaçlarını, motivasyonlarını ve sorunlarını anlamaya yönelik bir nitel araştırma yöntemidir.

**Kullanıcı görüşmesi şu DEĞİLDİR:**

- Anket (bu nicel veri toplar, yüzeyseldir)
- Satış görüşmesi (bu ikna etmek içindir)
- Kullanılabilirlik testi (bu görev tamamlamayı gözlemler)
- Sohbet (bu yapılandırılmamış, amaçsızdır)

[CALLOUT]
**Kullanıcı görüşmesi şudur:**
Yapılandırılmış ama esnek bir formatta, açık uçlu sorularla kullanıcının dünyasını, motivasyonlarını ve sorunlarını derinlemesine anlamaya çalışmak.
[/CALLOUT]

Kullanıcı görüşmesi sana "ne" değil "neden" sorusunun cevabını verir. Analitik veriler kullanıcının ne yaptığını gösterir, görüşmeler ise neden öyle davrandığını açıklar.

---

## Neden Önemli?

### Varsayımları kırar

Her tasarımcının kafasında kullanıcı hakkında varsayımlar vardır. "Kullanıcılar hızlı checkout ister", "Fiyat en önemli faktör", "Herkes mobil kullanıyor" gibi. Bu varsayımlar bazen doğru, bazen tamamen yanlış olabilir. Kullanıcı görüşmesi, varsayımları gerçek verilerle test eder.

### Beklenmedik içgörüler sunar

Anket yaparken hangi soruları soracağını önceden bilmen gerekir. Ama kullanıcı görüşmesinde, hiç beklemediğin konular ortaya çıkabilir. Kullanıcı, senin aklına bile gelmemiş bir sorunu anlatabilir.

### Empati oluşturur

Ekran başında veri analiz etmek başka, gerçek bir insanın yaşadığı zorlukları dinlemek başka. Kullanıcı görüşmeleri, tüm ekibin kullanıcıyla empati kurmasını sağlar. Stakeholder'a "5 kullanıcı bu sorunu yaşadı" demek, görüşme kaydını izletmekle aynı etkiyi yaratmaz.

### Tasarım kararlarını destekler

"Bence kullanıcılar bunu ister" yerine "8 görüşmeden 6'sında kullanıcılar bu ihtiyacı dile getirdi" demek, tartışmaları bitirir. Görüşmeler, tasarım kararlarına kanıt sağlar.

---

## Ne Zaman Kullanılır?

Kullanıcı görüşmesi her aşamada farklı amaçlarla kullanılabilir:

[TABLE]
Aşama | Amaç | Örnek Sorular
Keşif (Discovery) | Problemi ve kullanıcıyı anlamak | "Bu işi şu an nasıl yapıyorsun?"
Tanımlama (Define) | İhtiyaçları netleştirmek | "En çok neye zaman harcıyorsun?"
Değerlendirme | Konseptleri test etmek | "Bu çözüm hakkında ne düşünüyorsun?"
Lansman sonrası | Deneyimi anlamak | "Ürünü kullanırken neler yaşadın?"
[/TABLE]

[TIP]
💡 En değerli görüşmeler genellikle keşif aşamasında yapılır. Çünkü burada henüz çözüm geliştirmemişsindir ve kullanıcının gerçek dünyasını anlamaya çalışıyorsundur.
[/TIP]

---

## Nasıl Yapılır? Adım Adım Süreç

### 1. Hazırlık Aşaması

#### Araştırma amacını belirle

Her görüşmenin net bir amacı olmalı. "Kullanıcıyı tanımak istiyorum" çok genel.

[COMPARISON]
Kötü amaç: "Kullanıcıları daha iyi anlamak"
İyi amaç: "Freelancer'ların fatura kesme sürecinde yaşadıkları zorlukları ve mevcut çözümlerini anlamak"
[/COMPARISON]

#### Katılımcı profilini tanımla

Kimlerle görüşeceğini net olarak tanımla. Screening kriterleri oluştur:

- Demografik özellikler (yaş, lokasyon, meslek)
- Davranışsal özellikler (ürünü kullanıyor mu, ne sıklıkla)
- Deneyim seviyesi (yeni mi, deneyimli mi)

[WARNING]
⚠️ Herkesle görüşme. "18-65 yaş arası herkes" bir segment değil. Ne kadar spesifik olursan, o kadar derin içgörü alırsın.
[/WARNING]

#### Katılımcı sayısını belirle

[INFO]
5-8 görüşme yeterli
Belirli bir kullanıcı segmenti için ana temaları ortaya çıkarır
[/INFO]

Görüşmelerde "doygunluk noktası" vardır. Bir noktadan sonra yeni görüşmeler aynı temaları tekrarlar. Genellikle 5-8 görüşme sonrası ana paternler netleşir.

#### Görüşme rehberi oluştur

Görüşme rehberi (interview guide), sorulacak soruları ve akışı içeren bir dokümandır. Bu bir script değil, rehberdir. Kelimesi kelimesine okumak yerine, doğal bir sohbet akışı içinde kullanırsın.

**Rehber yapısı:**

[STEPS]
1. Giriş (3-5 dakika)
   - Kendini ve amacı tanıt
   - Kayıt izni al
   - "Doğru/yanlış cevap yok" de
   - Süreyi belirt

2. Isınma soruları (5 dakika)
   - Katılımcı hakkında genel bilgi
   - Konuyla ilgili arka plan
   - Rahatlatıcı, kolay sorular

3. Ana sorular (20-35 dakika)
   - Araştırma amacına yönelik sorular
   - Geçmiş deneyimler
   - Mevcut davranışlar
   - Sorunlar ve ihtiyaçlar

4. Derinleştirme (5-10 dakika)
   - Takip soruları
   - "Neden?" ve "Nasıl?" ile derinleştirme
   - Somut örnekler isteme

5. Kapanış (3-5 dakika)
   - "Eklemek istediğin bir şey var mı?"
   - Teşekkür
   - Sonraki adımlar
[/STEPS]

### 2. Soru Hazırlama

Doğru soru sormak, kullanıcı görüşmesinin en kritik kısmı. Yanlış sorular yanlış içgörülere yol açar.

#### Açık uçlu sorular sor

[COMPARISON]
Kötü soru: "Online alışveriş yapıyor musun?"
İyi soru: "Son online alışveriş deneyimini anlatır mısın?"
[/COMPARISON]

Açık uçlu sorular "evet/hayır" ile cevaplanamaz. Kullanıcıyı anlatmaya, açıklamaya teşvik eder.

**Açık uçlu soru kalıpları:**
- "Anlat..."
- "Nasıl...?"
- "Ne oldu...?"
- "Neden...?"
- "Bana ... hakkında bilgi verir misin?"

#### Yönlendirici sorulardan kaçın

[COMPARISON]
Yönlendirici: "Bu özellik faydalı değil mi?"
Nötr: "Bu özellik hakkında ne düşünüyorsun?"
[/COMPARISON]

[COMPARISON]
Yönlendirici: "Çoğu insan X'i tercih ediyor, sen?"
Nötr: "Bu konuda tercihini nasıl belirlersin?"
[/COMPARISON]

Yönlendirici sorular, istediğin cevabı "üfler". Kullanıcı seni memnun etmek için o yönde cevap verebilir.

#### Hipotetik sorulardan kaçın

[COMPARISON]
Hipotetik: "Böyle bir özellik olsa kullanır mıydın?"
Davranış bazlı: "Bu işi şu an nasıl yapıyorsun?"
[/COMPARISON]

İnsanlar gelecekteki davranışlarını tahmin etmekte kötüdür. "Kullanırım" diyen kişi, gerçekte kullanmayabilir. Geçmiş davranışları sor, hipotetik senaryoları değil.

#### Örnek soru seti

**Keşif aşaması için:**
- "Bana tipik bir iş gününü anlatır mısın?"
- "Bu işi yapmaya nasıl karar verdin?"
- "En son [X] yaptığında ne oldu?"
- "Bu süreçte en çok neye zaman harcıyorsun?"
- "En sinir bozucu kısım ne?"
- "İdeal dünyada bu nasıl çalışırdı?"

**Mevcut ürün değerlendirmesi için:**
- "[Ürün]'ü ilk nasıl keşfettin?"
- "En son ne zaman ve neden kullandın?"
- "Hangi durumda aklına geliyor?"
- "Başka hangi araçları deneydin?"
- "Olmasa ne yapardın?"

### 3. Görüşmeyi Yürütme

#### Ortamı hazırla

**Yüz yüze:**
- Sessiz, rahat bir ortam
- Karşılıklı oturma (masa arkasından değil)
- Su, kağıt kalem hazır

**Remote:**
- Stabil internet bağlantısı
- Sessiz arka plan
- Kamera açık (mimik görmek için)
- Yedek iletişim kanalı

#### Giriş scripti

[QUOTE]
"Merhaba, ben [isim], [şirket]'te tasarımcı olarak çalışıyorum. Bugün seninle [konu] hakkında konuşmak istiyorum. Bu bir test değil, doğru veya yanlış cevap yok. Senin deneyimlerini ve düşüncelerini anlamak istiyorum. Görüşme yaklaşık [süre] dakika sürecek. İzin verirsen kayıt almak istiyorum, sadece ekip içinde kullanacağız. Başlamadan önce soruların var mı?"
[/QUOTE]

#### Görüşme sırasında dikkat edilecekler

[CHECKLIST]
Yap:
- Aktif dinle, göz teması kur
- Not al ama akışı bozma
- "Neden?" ve "Nasıl?" ile derinleştir
- Sessizliğe izin ver (düşünme süresi)
- Somut örnekler iste ("Mesela?")
- Nötr kal, tepki verme

Yapma:
- Kendi fikrini söyleme
- Sözünü kesme
- Cevabı tamamlama
- Tasarımı/ürünü savunma
- Çok hızlı soru geçme
- Notlara gömülme
[/CHECKLIST]

#### Derinleştirme teknikleri

Kullanıcı yüzeysel cevap verdiğinde şu teknikleri kullan:

**"5 Neden" tekniği:**
İlk cevaba "Neden?" diye sor. Cevaba tekrar "Neden?" sor. Kök nedene ulaşana kadar devam et.

**Somutlaştırma:**
"Bana en son bunun yaşandığı bir örnek verebilir misin?"
"O gün tam olarak ne oldu?"

**Yansıtma:**
Kullanıcının söylediğini özetle ve geri sor:
"Yani anlattığın şey... Doğru mu anladım?"

**Sessizlik:**
Cevaptan sonra hemen soru sorma. 3-5 saniye bekle. Kullanıcı genellikle devam eder ve daha derin bilgi verir.

### 4. Analiz ve Sentez

#### Notları düzenle

Görüşmeden hemen sonra (mümkünse aynı gün) notlarını düzenle. Her görüşme için:

- Katılımcı profili (anonim)
- Öne çıkan temalar
- Doğrudan alıntılar (önemli cümleler)
- Şaşırtıcı bulgular
- Takip edilecek sorular

#### Temaları çıkar

Tüm görüşmeleri tamamladıktan sonra:

1. Tüm notları bir araya getir
2. Tekrar eden kalıpları (pattern) işaretle
3. Benzer konuları grupla
4. Her gruba tema adı ver
5. Temayı destekleyen alıntıları ekle

[TIP]
💡 Affinity mapping yöntemi: Her bulguyu ayrı post-it'e yaz. Benzer post-it'leri grupla. Gruplara isim ver. Bu, örüntüleri görselleştirmenin etkili bir yolu.
[/TIP]

#### Raporlama

Görüşme raporun şunları içermeli:

1. **Özet:** Araştırma amacı, katılımcı profili, ana bulgular
2. **Metodoloji:** Kaç görüşme, kimlerle, nasıl yapıldı
3. **Temalar:** Ana başlıklar ve destekleyen alıntılar
4. **Persona/kullanıcı profili:** Görüşmelerden çıkan kullanıcı karakterizasyonu
5. **Öneriler:** Tasarım için aksiyon önerileri

---

## Sık Yapılan Hatalar

### 1. Evet/hayır soruları sormak

[COMPARISON]
Hata: "Memnun musun?"
Doğrusu: "Deneyimini nasıl değerlendirirsin?"
[/COMPARISON]

Kapalı sorular sohbeti keser, derinlik sağlamaz.

### 2. Çözüm önermek

Kullanıcı sorun anlattığında hemen "Şöyle bir özellik yapsak?" deme. Görüşme keşif için, çözüm için değil. Not al, sonra düşün.

### 3. Kendi fikrini söylemek

"Ben de öyle düşünüyorum" veya "Aslında şöyle çalışıyor" gibi cümleler kullanıcıyı etkiler. Nötr kal, yargılama.

### 4. Savunmaya geçmek

Kullanıcı ürünü eleştirdiğinde savunma. "Ama o özellik şunun için var" deme. Dinle, not al, anlamaya çalış.

### 5. Tek görüşmeyle sonuç çıkarmak

Bir kullanıcının söylediği tüm kullanıcıları temsil etmez. En az 5 görüşme yap, örüntüleri ara.

### 6. Sadece pozitif dinlemek

Confirmation bias: Duymak istediğini duyarsın. Varsayımlarını çürüten verilere de dikkat et.

---

[EXERCISE]
## Şimdi Sen Dene

**Senaryo:** Bir online eğitim platformu tasarlıyorsun. Kullanıcıların online kurs satın alma ve tamamlama deneyimlerini anlamak istiyorsun.

**Görev:** Bu araştırma için 5 adet görüşme sorusu yaz.

**Kurallar:**
- Sorular açık uçlu olmalı
- Yönlendirici olmamalı
- Geçmiş davranışlara odaklanmalı (hipotetik değil)
- Farklı konuları kapsamalı (keşif, sorun, çözüm arayışı)

**Başlangıç için örnek:**
"En son online bir kurs aldığında, kursu nasıl buldun ve seçtin?"

Sorularını yazdıktan sonra şu kontrolleri yap:
- Evet/hayır ile cevaplanabilir mi? (cevaplanmamalı)
- Cevabı yönlendiriyor mu? (yönlendirmemeli)
- Geçmiş davranışı mı soruyor, gelecek tahmini mi? (geçmiş olmalı)
[/EXERCISE]

---

[SUMMARY]
## Özet

- Kullanıcı görüşmesi "neden" sorusunun cevabını verir; anket veya analitik "ne" sorusunu
- 5-8 görüşme ana temaları ortaya çıkarmak için yeterli
- Açık uçlu, yönlendirici olmayan sorular sor
- Geçmiş davranışları sor, hipotetik senaryoları değil
- Dinle, not al, yargılama; görüşme sırasında çözüm önerme
- Tüm görüşmelerden örüntü ve tema çıkar
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Kullanılabilirlik Testi Nedir?](/kutuphane/kullanilabilirlik-testi)

**Sonraki:** [Portfolio Case Study Nasıl Yazılır?](/kutuphane/portfolio-case-study)

**İlgili Roadmap:** [UX Designer Roadmap → Research Yöntemleri](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [User Interviews: How, When, and Why to Conduct Them - NNGroup](https://www.nngroup.com/articles/user-interviews/) (İngilizce, 10 dk)
- [Interviewing Users - Interaction Design Foundation](https://www.interaction-design.org/literature/article/interviewing-users) (İngilizce, 12 dk)
- [The Mom Test - Rob Fitzpatrick](http://momtestbook.com/) (Kitap, kullanıcıdan dürüst feedback alma üzerine)
`,
  },
  "portfolio-case-study": {
    id: "portfolio-case-study",
    title: "Portfolio Case Study Nasıl Yazılır?",
    subtitle: "İş Bulmanı Sağlayacak Case Study Rehberi",
    titleEn: "Portfolio Case Study",
    slug: "portfolio-case-study",
    description: "UX portfolio case study nasıl yazılır? Hiring manager'ların dikkatini çeken, süreç odaklı ve ikna edici case study oluşturma rehberi.",
    category: "kariyer",
    readingTime: 15,
    featured: false,
    publishedAt: "2025-01-13",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# Portfolio Case Study Nasıl Yazılır? İş Bulmanı Sağlayacak Rehber

**Seviye:** Başlangıç  
**Kategori:** Kariyer  
**Son güncelleme:** Ocak 2025

---

## Giriş

Onlarca iş başvurusu yaptın ama geri dönüş yok. CV'n iyi, Figma biliyorsun, hatta birkaç proje de yaptın. Ama portfolyon? "Birkaç ekran görüntüsü koydum, yeter" diyorsan, işte sorun burada.

Hiring manager'lar günde onlarca portfolyo inceliyor. Ortalama bir portfolyoya 3-5 dakika ayırıyorlar. Bu sürede seni diğer adaylardan ayıran şey güzel pikselller değil, düşünce sürecin.

Case study, bir tasarım projesinin hikayesidir. Sadece "ne yaptığını" değil, "neden yaptığını", "nasıl düşündüğünü" ve "ne öğrendiğini" gösterir. İyi bir case study, hiring manager'a şunu söyler: "Bu kişi sadece tasarım yapmıyor, problem çözüyor."

Bu yazıda etkili bir case study'nin yapısını, içermesi gerekenleri ve sık yapılan hataları öğreneceksin.

---

## Case Study Nedir?

Case study, bir tasarım projesinin baştan sona hikayesini anlatan dokümandır. Problemi tanımlar, süreci gösterir, kararları açıklar ve sonuçları paylaşır.

**Case study şu DEĞİLDİR:**

- Ekran görüntüleri galerisi
- Sadece final tasarımlar
- Figma dosyası linki
- "Güzel görünen" portfolio sayfası

[CALLOUT]
**Case study şudur:**
Bir problemi nasıl anladığını, çözümü nasıl geliştirdiğini ve bu süreçte nasıl düşündüğünü gösteren, yapılandırılmış bir proje hikayesi.
[/CALLOUT]

Hiring manager'lar case study'de şunları arar:

- **Problem çözme yeteneği:** Karmaşık bir sorunu nasıl parçaladın?
- **Süreç:** Research'ten delivery'ye nasıl ilerladin?
- **Karar verme:** Neden A'yı seçtin, B'yi değil?
- **İş birliği:** Ekiple, stakeholder'larla nasıl çalıştın?
- **Etki:** Tasarımın ne sonuç verdi?

---

## Neden Önemli?

### CV yetmez

CV, ne yaptığını listeler. Case study, nasıl düşündüğünü gösterir. İkisi farklı sorulara cevap verir:

- CV: "Bu kişi deneyimli mi?"
- Case study: "Bu kişi bizim problemlerimizi çözebilir mi?"

### Görsel güzellik yetmez

Dribbble'da güzel görseller paylaşabilirsin ama bu seni işe aldırmaz. Hiring manager'lar estetik yeteneğini değil, düşünce sürecini görmek ister.

### Röportajda fark yaratır

İyi bir case study, röportajda konuşacak somut materyal sağlar. "Bana bir projenden bahset" sorusuna hazırlıklı olursun.

---

## Kaç Case Study Gerekli?

[INFO]
3-4 kaliteli case study
10 yüzeysel projeden daha etkili
[/INFO]

Daha fazla her zaman daha iyi değil. Hiring manager'lar hepsini okumayacak. 3-4 güçlü case study, farklı yetkinliklerini ve proje tiplerini göstermeye yeter.

**Çeşitlilik önemli:**
- Farklı proje tipleri (0'dan tasarım, redesign, feature)
- Farklı platformlar (web, mobil, B2B, B2C)
- Farklı roller (solo, ekip içinde, lead)

---

## Case Study Yapısı

Her case study şu bölümlerden oluşmalı:

### 1. Başlık ve Özet (Hero Section)

İlk izlenim burada oluşur. 5 saniyede projenin ne olduğunu anlatmalı.

**İçermeli:**
- Proje adı
- Şirket/müşteri (veya "Kişisel Proje")
- Senin rolün
- Kısa özet (1-2 cümle)
- Öne çıkan görsel

[COMPARISON]
Kötü özet: "E-ticaret sitesi tasarımı"
İyi özet: "Checkout tamamlanma oranını %23 artıran mobil ödeme deneyimi yeniden tasarımı"
[/COMPARISON]

### 2. Bağlam (Context)

Okuyucuyu projeye dahil et. Arka planı anlat.

**Cevap verilecek sorular:**
- Bu proje neydi?
- Şirket/ürün ne yapıyor?
- Neden bu projeye ihtiyaç duyuldu?
- Senin rolün ve sorumlulukların neydi?
- Ekip kimlerden oluşuyordu?
- Zaman çizelgesi neydi?

[TIP]
💡 Gizlilik varsa: "NDA nedeniyle bazı detayları değiştirdim" veya "Gerçek veriler yerine örnek veriler kullandım" diyebilirsin.
[/TIP]

### 3. Problem Tanımı

Net ve spesifik bir problem ifadesi yaz. Bu, tüm case study'nin temelidir.

[COMPARISON]
Belirsiz problem: "Kullanıcı deneyimi kötüydü"
Net problem: "Mobil kullanıcıların %67'si checkout'un 3. adımında sepeti terk ediyordu"
[/COMPARISON]

**Problem tanımı içermeli:**
- Spesifik sorun ne?
- Kimi etkiliyor?
- Business etkisi ne? (metrik varsa)
- Neden çözülmesi gerekiyordu?

### 4. Araştırma ve Keşif

Bu bölüm, "ödevini yaptığını" gösterir. Ne öğrendiğini ve bunun tasarımı nasıl şekillendirdiğini anlat.

**Gösterebileceklerin:**
- Kullanıcı görüşmeleri ve bulgular
- Anket sonuçları
- Analitik veri analizi
- Rakip analizi
- Persona veya kullanıcı profilleri
- User journey map

[WARNING]
⚠️ Her projede her yöntemi kullanmak zorunda değilsin. "Research yapmadım" demek yerine, eldeki veriyi nasıl kullandığını anlat.
[/WARNING]

**Araştırmayı anlatırken:**
- Ne yaptığını değil, ne öğrendiğini vurgula
- Bulguları tasarım kararlarına bağla
- Doğrudan alıntılar kullan ("Kullanıcı şöyle dedi...")

### 5. Tasarım Süreci

Bu bölüm, düşünce sürecini gösterir. Final tasarıma nasıl ulaştığını anlat.

**Gösterebileceklerin:**
- Sketch'ler ve ilk fikirler
- Wireframe'ler
- Farklı konsept alternatifleri
- Karar noktaları ("A mı B mi?")
- Kullanılabilirlik testi sonuçları
- İterasyonlar ve değişiklikler

[CALLOUT]
**Süreci göster, sadece sonucu değil.**
Hiring manager'lar final ekranları görmek istemez, oraya nasıl geldiğini görmek ister. Reddedilen fikirleri, değişen kararları, öğrenilen dersleri paylaş.
[/CALLOUT]

**Karar noktalarını açıkla:**

[COMPARISON]
Süreçsiz: "İşte final tasarım"
Süreç odaklı: "İlk iterasyonda tek sayfa checkout denedik, ama testlerde kullanıcılar uzun formu görünce vazgeçti. Bu yüzden adımlı yapıya geçtik."
[/COMPARISON]

### 6. Final Tasarım

Sonucu göster. Ama sadece ekran görüntüsü değil, tasarım kararlarını açıkla.

**Gösterim formatları:**
- Annotated mockup'lar (açıklamalı)
- Before/after karşılaştırması
- Prototype videosu veya gif
- Farklı durumlar (states) ve akışlar

**Her önemli tasarım kararını açıkla:**
- Bu elementi neden böyle tasarladın?
- Hangi kullanıcı ihtiyacına cevap veriyor?
- Hangi araştırma bulgusuna dayanıyor?

### 7. Sonuçlar ve Etki

Bu bölüm, tasarımın işe yaradığını kanıtlar.

**Metrikler varsa:**
- Conversion rate değişimi
- Task completion süresi
- Kullanıcı memnuniyeti skoru
- Business metrikleri (satış, kayıt, retention)

[COMPARISON]
Belirsiz sonuç: "Proje başarılı oldu"
Somut sonuç: "Checkout tamamlanma oranı %58'den %71'e yükseldi (3 ay sonra ölçüm)"
[/COMPARISON]

**Metrik yoksa:**
- Stakeholder feedback'i
- Kullanıcı yorumları
- Kalitaif gözlemler
- Projenin durumu (launch edildi mi?)

[TIP]
💡 Junior'san ve metrik erişimin yoksa sorun değil. "Launch sonrası metriklere erişimim yoktu, ancak kullanılabilirlik testlerinde task completion %40'tan %85'e çıktı" gibi süreç içi metrikleri kullanabilirsin.
[/TIP]

### 8. Öğrenilenler (Reflection)

Bu bölüm, öz farkındalığını gösterir. Ne iyi gitti, ne daha iyi olabilirdi?

**Sorular:**
- Bu projeden ne öğrendin?
- Tekrar yapsan neyi farklı yapardın?
- Hangi kısıtlarla karşılaştın?
- Ekip olarak ne öğrendiniz?

Bu bölüm hiring manager'lara şunu söyler: "Bu kişi sadece iş yapmıyor, aynı zamanda öğreniyor ve gelişiyor."

---

## Yazım İpuçları

### Hikaye anlat

Case study bir rapor değil, hikaye. Okuyucuyu yolculuğa çıkar:
- Başlangıç: Problem ve bağlam
- Gelişme: Araştırma, keşifler, zorluklar
- Sonuç: Çözüm ve etki

### "Ben" değil "biz" ama rolünü netleştir

Ekip projelerinde "biz" kullan ama kendi katkını açıkça belirt:
- "Ekip olarak user research yaptık. **Ben 5 kullanıcı görüşmesini yürüttüm.**"
- "Tasarım sistemini birlikte geliştirdik. **Component library'yi ben oluşturdum.**"

### Jargondan kaçın

Hiring manager teknik olmayabilir. "Heuristic evaluation" yerine "uzman incelemesi", "information architecture" yerine "içerik yapısı" kullanabilirsin. Ya da terimi kullanıp kısaca açıkla.

### Görsellerle destekle

Metin duvarı okumak zor. Her bölümde görsel kullan:
- Araştırma: Affinity map, persona kartları
- Süreç: Sketch'ler, wireframe'ler
- Final: Mockup'lar, prototype gif'leri

### Uzunluğu dengele

[INFO]
5-10 dakika okuma süresi
1500-3000 kelime ideal
[/INFO]

Çok kısa: Yüzeysel kalır, süreç anlaşılmaz
Çok uzun: Kimse okumaz, ilgi kaybolur

---

## Gerçek Proje Yoksa Ne Yapmalı?

Junior'lar için en büyük engel: "Gerçek proje deneyimim yok."

**Alternatifler:**

### 1. Redesign projesi
Mevcut bir ürünü (Spotify, Instagram, banka uygulaması) analiz et ve iyileştirme öner. Gerçekçi kısıtlar belirle.

### 2. Kişisel proje
Kendi problemini çöz. "Arkadaşlarımla yemek planlamak zordu, bir uygulama konsepti tasarladım."

### 3. Design challenge
ADPList, UX Challenge gibi platformlardaki brief'leri kullan.

### 4. Freelance/gönüllü iş
Küçük işletmelere, STK'lara ücretsiz veya düşük ücretle çalış.

[WARNING]
⚠️ Önemli: Gerçek proje olmadığını belirt. "Kişisel Proje" veya "Konsept Çalışması" etiketiyle paylaş. Hiring manager'ları yanıltma.
[/WARNING]

**Kişisel projelerde de süreç göster:**
- Problem tanımı (neden bu konuyu seçtin?)
- Araştırma (rakip analizi, kullanıcı görüşmeleri)
- Tasarım süreci (sketch, wireframe, iterasyon)
- Sonuç (test sonuçları, varsa feedback)

---

## Sık Yapılan Hatalar

### 1. Sadece final görseller koymak

[COMPARISON]
Hata: "10 ekran görüntüsü yan yana"
Doğrusu: "Her ekranın arkasındaki düşünceyi açıkla"
[/COMPARISON]

Güzel görseller seni Dribbble'da like yapar, ama işe aldırmaz.

### 2. Problem tanımını atlaMak

"E-ticaret sitesi tasarladım" hiçbir şey anlatmıyor. Hangi problem? Kimin için? Neden?

### 3. Araştırmayı göstermemek

"User research yaptım" yetmez. Ne öğrendin? Bu tasarımı nasıl etkiledi?

### 4. "Ben her şeyi yaptım" demek

Ekip projesinde her şeyin kredisini almak inandırıcı değil ve red flag. Kendi rolünü netleştir, ekibi de acknowledge et.

### 5. Sonuç/etki göstermemek

"Proje tamamlandı" bir sonuç değil. Metrik, feedback, öğrenilen ders - bir şey göster.

### 6. Çok uzun yazmak

Hiring manager'ların vakti kısıtlı. 20 dakikalık case study okunmaz. Öz ve etkili yaz.

### 7. Mobil deneyimi unutmak

Portfolyolar sıkça mobilde incelenir. Case study'lerin mobilde de okunabilir olduğundan emin ol.

---

## Case Study Checklist

Yayınlamadan önce şu soruları kontrol et:

[CHECKLIST]
Problem açıkça tanımlanmış mı?
Bağlam yeterli mi? (şirket, rol, ekip, süre)
Araştırma bulguları var mı?
Süreç gösterilmiş mi? (sadece sonuç değil)
Karar noktaları açıklanmış mı?
Final tasarımlar açıklamalı mı?
Sonuç/etki belirtilmiş mi?
Öğrenilenler paylaşılmış mı?
Görseller yeterli ve kaliteli mi?
Mobilde okunabilir mi?
5-10 dakikada okunabilir mi?
Yazım hataları kontrol edildi mi?
[/CHECKLIST]

---

[EXERCISE]
## Şimdi Sen Dene

**Görev:** Mevcut veya geçmiş bir projeni case study formatına dönüştürmek için outline oluştur.

**Adımlar:**

1. Bir proje seç (gerçek, kişisel veya konsept)

2. Şu soruları cevapla:
   - Problem ne? (1 cümle)
   - Çözüm ne? (1 cümle)
   - Senin rolün ne?
   - En önemli 3 karar noktası ne?
   - Sonuç/etki ne?

3. Her bölüm için hangi görselleri kullanacağını listele:
   - Araştırma bölümü için?
   - Süreç bölümü için?
   - Final bölümü için?

**Başarı kriteri:** 
Bu outline'ı birine gösterdiğinde, projenin ne olduğunu ve senin katkını 2 dakikada anlayabilmeli.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Case study güzel görseller değil, düşünce sürecini gösterir
- 3-4 kaliteli case study, 10 yüzeysel projeden iyidir
- Yapı: Bağlam → Problem → Araştırma → Süreç → Sonuç → Öğrenilenler
- Süreç göster: Reddedilen fikirler, iterasyonlar, kararlar
- Sonuç göster: Metrik, feedback veya öğrenilenler
- Gerçek proje yoksa kişisel proje veya redesign yap, ama belirt
- 5-10 dakikada okunabilir uzunlukta tut
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Kullanıcı Görüşmesi Nasıl Yapılır?](/kutuphane/kullanici-gorusmesi)

**Sonraki:** [User Flow ve Task Flow: Fark ve Kullanım](/kutuphane/user-flow-task-flow)

**İlgili Roadmap:** [UX Designer Roadmap → Kariyer](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [How to Write a UX Case Study - NNGroup](https://www.nngroup.com/articles/ux-case-study-guide/) (İngilizce, 12 dk)
- [Case Study Club](https://www.casestudy.club/) (Örnek case study'ler, İngilizce)
- [Bestfolios](https://www.bestfolios.com/) (Portfolio örnekleri, İngilizce)
`,
  },
  "user-flow-task-flow": {
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
    author: "Serhat Bahçeliler",
    content: `# User Flow ve Task Flow: Fark ve Kullanım Rehberi

**Seviye:** Başlangıç  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

"User flow çizer misin?" dedi lead designer. Figma'yı açtın, kutular çizdin, oklar ekledin. Ama aslında ne çizdiğinden emin değilsin. User flow mı, task flow mu, wireflow mu?

Bu kavramlar sıkça karıştırılıyor. Hatta bazen birbirinin yerine kullanılıyor. Ama her birinin farklı amacı ve kullanım alanı var.

Yanlış diyagram çizmek sadece zaman kaybı değil. Ekiple yanlış iletişime, eksik tasarımlara ve gözden kaçan senaryolara yol açar.

Bu yazıda user flow ve task flow arasındaki farkı, her birini ne zaman kullanacağını ve nasıl çizeceğini öğreneceksin.

---

## Task Flow Nedir?

Task flow, **tek bir görevin** tamamlanması için gereken adımları gösteren **lineer** diyagramdır.

**Özellikleri:**
- Tek bir kullanıcı tipi varsayar
- Tek bir yol gösterir (dallanma yok)
- Karar noktaları içermez
- "Happy path" yani ideal senaryoyu gösterir

[CALLOUT]
**Task flow şudur:**
A noktasından B noktasına giden tek bir çizgi. Kullanıcının görevi tamamlamak için atacağı ideal adımlar.
[/CALLOUT]

**Örnek: Şifre sıfırlama task flow**
[Giriş ekranı] → [Şifremi unuttum tıkla] → [Email gir] → [Gönder] → [Email kontrol et] → [Linke tıkla] → [Yeni şifre gir] → [Onayla] → [Başarılı]

Gördüğün gibi: Tek yol, tek senaryo, dallanma yok.

---

## User Flow Nedir?

User flow, bir kullanıcının **belirli bir hedefe** ulaşmak için üründe izleyebileceği **tüm yolları** gösteren diyagramdır.

**Özellikleri:**
- Farklı kullanıcı tiplerini içerebilir
- Birden fazla yol gösterir
- Karar noktaları içerir (if/else)
- Alternatif senaryoları ve hata durumlarını kapsar

[CALLOUT]
**User flow şudur:**
Kullanıcının ürüne girişinden hedefe ulaşmasına kadar tüm olası yolların haritası. Dallanmalar, kararlar ve alternatifler dahil.
[/CALLOUT]

**Örnek: E-ticaret satın alma user flow**
[Ana sayfa]
↓
[Ürün listesi] ←→ [Arama] ←→ [Kategori filtre]
↓
[Ürün detay]
↓
[Sepete ekle]
↓
[Sepet] → [Alışverişe devam] → [Ürün listesi]
↓
[Checkout]
↓
┌─ [Üye mi?] ─┐
↓ Evet       ↓ Hayır
[Giriş]      [Misafir devam] veya [Kayıt ol]
↓             ↓
└─────────────┘
↓
[Adres seç/ekle]
↓
[Ödeme yöntemi]
↓
┌─ [Ödeme başarılı?] ─┐
↓ Evet               ↓ Hayır
[Onay sayfası]       [Hata → Tekrar dene]

Gördüğün gibi: Birden fazla yol, karar noktaları, alternatif senaryolar.

---

## Temel Farklar

[TABLE]
| Özellik | Task Flow | User Flow |
|---------|-----------|-----------|
| **Yapı** | Lineer (tek çizgi) | Dallanmalı (ağaç/ağ) |
| **Karar noktası** | Yok | Var |
| **Alternatif yollar** | Yok | Var |
| **Kullanıcı tipi** | Tek tip varsayar | Farklı tipler olabilir |
| **Kapsam** | Tek görev | Tüm yolculuk |
| **Detay seviyesi** | Düşük | Yüksek |
| **Çizim süresi** | Hızlı | Daha uzun |
| **Kullanım amacı** | Adımları netleştirme | Tüm senaryoları görme |
[/TABLE]

[COMPARISON]
**Task Flow:** "Kullanıcı bu görevi nasıl tamamlar?"
**User Flow:** "Kullanıcı bu hedefe ulaşmak için hangi yolları izleyebilir?"
[/COMPARISON]

---

## Hangisini Ne Zaman Kullanmalısın?

### Task Flow Kullan:

- Tek bir özelliği veya görevi tasarlarken
- Ekibe basit bir akışı anlatırken
- Developer'a lineer bir süreci aktarırken
- İlk konsept aşamasında hızlıca fikir paylaşırken

**Örnek senaryolar:**
- Şifre sıfırlama
- Profil fotoğrafı değiştirme
- Bildirim ayarlarını güncelleme
- Tek bir form doldurma

### User Flow Kullan:

- Yeni bir özellik veya ürün tasarlarken
- Tüm kullanıcı senaryolarını görmek istediğinde
- Edge case'leri ve hata durumlarını planlarken
- Stakeholder'lara kapsamlı sunum yaparken
- QA ekibine test senaryoları verirken

**Örnek senaryolar:**
- Onboarding deneyimi
- Checkout süreci
- Kayıt ve giriş akışları
- Çok adımlı form süreçleri

[TIP]
💡 **Pratik kural:** Eğer akışta "ya bu olursa?" sorusu soruyorsan, user flow çizmelisin. Tek bir "mutlu yol" yeterliyse, task flow yeter.
[/TIP]

---

## Nasıl Çizilir?

### Task Flow Çizimi

**Adımlar:**

[STEPS]
1. Görevi tanımla
   "Kullanıcı şifresini sıfırlayacak"

2. Başlangıç noktasını belirle
   Kullanıcı nereden başlıyor? (örn: giriş ekranı)

3. Bitiş noktasını belirle
   Başarılı tamamlanma neye benziyor? (örn: yeni şifreyle giriş)

4. Adımları listele
   Sırayla her adımı yaz

5. Oklarla bağla
   Soldan sağa veya yukarıdan aşağı
[/STEPS]

**Kullanılan şekiller:**
[Dikdörtgen] → Ekran veya sayfa
(Oval) → Başlangıç/bitiş
→ → Akış yönü

### User Flow Çizimi

**Adımlar:**

[STEPS]
1. Kullanıcı hedefini tanımla
   "Kullanıcı ürün satın alacak"

2. Giriş noktalarını belirle
   Kullanıcı nerelerden gelebilir? (ana sayfa, reklam, email link)

3. Ana yolu (happy path) çiz
   İdeal senaryo task flow gibi

4. Karar noktalarını ekle
   "Üye mi?", "Ödeme başarılı mı?" gibi

5. Alternatif yolları çiz
   Her karar için farklı dallar

6. Hata durumlarını ekle
   Başarısız ödeme, geçersiz email vs.

7. Çıkış noktalarını işaretle
   Başarılı tamamlanma, vazgeçme, hata
[/STEPS]

**Kullanılan şekiller:**
[Dikdörtgen] → Ekran veya sayfa
(Oval) → Başlangıç/bitiş
<Baklava> → Karar noktası (evet/hayır)
→ → Akış yönü
[Dikdörtgen kesik köşe] → Sistem aksiyonu

---

## User Flow Sembolleri

Standart flowchart sembolleri kullanılır:

[TABLE]
| Sembol | İsim | Kullanım |
|--------|------|----------|
| ⬭ (Oval) | Terminal | Başlangıç ve bitiş noktaları |
| ▭ (Dikdörtgen) | Process | Ekran, sayfa, adım |
| ◇ (Baklava) | Decision | Karar noktası (if/else) |
| ▱ (Parallelogram) | Input/Output | Kullanıcı girişi, sistem çıktısı |
| → (Ok) | Flow line | Akış yönü |
| ⬡ (Altıgen) | Preparation | Hazırlık adımı |
[/TABLE]

[TIP]
💡 Sembol ezberlemek zorunda değilsin. Önemli olan tutarlılık. Aynı proje içinde aynı sembolleri aynı anlam için kullan.
[/TIP]

---

## Araçlar

### Dijital Araçlar

| Araç | Ücretsiz | En İyi Yön |
|------|----------|------------|
| **FigJam** | ✓ | Figma entegrasyonu |
| **Miro** | Kısmen | İş birliği |
| **Whimsical** | Kısmen | Hız ve basitlik |
| **Lucidchart** | Kısmen | Profesyonel flowchart |
| **Overflow** | ✗ | UI ekranlarıyla flow |

### Analog

Kalem kağıt her zaman işe yarar. Özellikle beyin fırtınası ve ilk eskizler için whiteboard veya post-it kullan.

---

## Sık Yapılan Hatalar

### 1. Her şeyi tek diyagrama sığdırmak

[COMPARISON]
Hata: "50 kutulu, okunmaz bir diyagram"
Doğrusu: "Büyük akışları parçalara böl, her biri için ayrı diyagram"
[/COMPARISON]

### 2. Hata durumlarını unutmak

User flow'da sadece happy path göstermek eksik kalır. "Ya ödeme başarısız olursa?", "Ya email zaten kayıtlıysa?" sorularını da kapsa.

### 3. Kullanıcı perspektifini kaybetmek

[COMPARISON]
Sistem odaklı: "Veritabanı sorgusu → API response → Cache güncelle"
Kullanıcı odaklı: "Ara butonuna tıkla → Sonuçları gör → Ürün seç"
[/COMPARISON]

Flow diyagramı kullanıcının gördüklerini göstermeli, arka plan teknik süreçleri değil.

### 4. Detayda boğulmak

İlk aşamada her küçük adımı göstermeye çalışma. Önce ana akışı çiz, sonra gerekirse detaylandır.

### 5. Güncel tutmamak

Tasarım değişti ama flow aynı kaldı? Bu, ekibi yanıltır. Flow diyagramlarını tasarımla senkron tut.

---

## Wireflow: Üçüncü Bir Seçenek

User flow ve wireframe'in birleşimi. Akış diyagramındaki her kutuya basit wireframe eklersin.

**Ne zaman kullanılır:**
- Akışı görselleştirmek istediğinde
- Stakeholder'lara sunum yaparken
- Geliştirme öncesi detaylı dokümantasyon için

**Örnek:**
[Wireframe: Giriş ekranı] → [Wireframe: Email formu] → [Wireframe: Onay mesajı]

Dezavantajı: Hazırlaması daha uzun sürer.

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Senaryo:** Bir müzik streaming uygulaması için "Playlist oluşturma" özelliğini tasarlıyorsun.

**Görev 1 - Task Flow:**
Playlist oluşturmanın en basit yolunu task flow olarak çiz. Sadece happy path, dallanma yok.

**Görev 2 - User Flow:**
Aynı özellik için user flow çiz. Şu durumları da dahil et:
- Kullanıcı giriş yapmamışsa ne olur?
- Playlist ismi zaten varsa ne olur?
- Şarkı eklemeden playlist kaydedilirse ne olur?

**Karşılaştır:**
İki diyagramı yan yana koy. Task flow kaç kutu? User flow kaç kutu? Fark ne kadar?
[/EXERCISE]

---

[SUMMARY]
## Özet

- **Task flow** tek bir görevi lineer olarak gösterir, dallanma yoktur
- **User flow** tüm olası yolları gösterir, karar noktaları ve alternatifler içerir
- Task flow hızlı iletişim için, user flow kapsamlı planlama için kullan
- Standart flowchart sembollerini tutarlı kullan
- Hata durumlarını ve edge case'leri unutma
- Büyük akışları parçalara böl, okunabilir tut
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Portfolio Case Study Nasıl Yazılır?](/kutuphane/portfolio-case-study)

**Sonraki:** [UX Nedir?](/kutuphane/ux-nedir)

**İlgili Roadmap:** [UX Designer Roadmap → Tasarım Çıktıları](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [Task Flows vs User Flows - NNGroup](https://www.nngroup.com/articles/user-flows/) (İngilizce, 8 dk)
- [User Flow - IxDF](https://www.interaction-design.org/literature/topics/user-flows) (İngilizce, 10 dk)
- [The Guide to User Flow Diagrams - CareerFoundry](https://careerfoundry.com/en/blog/ux-design/what-are-user-flows/) (İngilizce, 12 dk)
`,
  },
  "ux-nedir": {
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
    content: `# UX Nedir? Kullanıcı Deneyimi Tasarımına Giriş

**Seviye:** Başlangıç  
**Kategori:** Temel Kavramlar  
**Son güncelleme:** Ocak 2025

---

## Giriş

Bir uygulamayı ilk açtığında her şey karmaşık geldi. Nereye tıklayacağını bilemedik, aradığını bulamadın, sonunda vazgeçip sildin.

Başka bir uygulamada ise her şey yerli yerindeydi. İstediğini saniyeler içinde buldun, işlemini tamamladın, memnun kaldın.

İkisi arasındaki fark neydi? Görsel tasarım mı? Belki biraz. Ama asıl fark **kullanıcı deneyimi** yani **UX** idi.

UX, son yılların en popüler kariyer alanlarından biri haline geldi. Ama hâlâ en çok yanlış anlaşılan kavramlardan biri. "UX yapıyorum" diyenlerin bir kısmı aslında UI tasarlıyor, bir kısmı sadece wireframe çiziyor.

Bu yazıda UX'in gerçekte ne anlama geldiğini, neden bu kadar önemli olduğunu ve UX Designer'ların ne yaptığını öğreneceksin.

---

## UX Ne Demek?

UX, **User Experience** yani **Kullanıcı Deneyimi** kelimelerinin kısaltmasıdır.

[CALLOUT]
**Kullanıcı Deneyimi (UX):**
Bir kullanıcının bir ürün, sistem veya hizmetle etkileşiminde yaşadığı tüm deneyim. Kullanım öncesi beklentilerden, kullanım sırasındaki etkileşime ve kullanım sonrası duygulara kadar her şeyi kapsar.
[/CALLOUT]

Bu terimi ilk kez **Don Norman** 1990'larda Apple'da çalışırken kullandı. Norman'ın tanımı oldukça geniş:

> "Kullanıcı deneyimi, son kullanıcının şirketle, hizmetleriyle ve ürünleriyle olan tüm etkileşimini kapsar."

Yani UX sadece ekrandaki butonlar değil. Ürünü keşfetme anından, satın alma sürecine, kullanıma, müşteri desteğine kadar her temas noktası UX'in parçası.

---

## UX Sadece Dijital Değil

UX kavramı dijital ürünlerle sınırlı değil. Her deneyimin bir UX'i var:

**Günlük hayattan örnekler:**

- **Kapı kolu:** İtecek misin, çekecek misin? Tasarımı bunu anlatıyor mu?
- **Market rafları:** Aradığın ürünü kolayca bulabiliyor musun?
- **Havaalanı:** Check-in'den uçağa binişe kadar süreç ne kadar akıcı?
- **Restoran menüsü:** İstediğin yemeği kaç saniyede buluyorsun?

Dijital dünyada ise:
- Mobil uygulamalar
- Web siteleri
- Yazılımlar
- Kiosk ve ATM'ler
- Akıllı cihazlar

[TIP]
💡 UX Designer olarak çalışsan da çalışmasan da, iyi UX'i fark etmeyi öğrenmek her yerde işine yarar. Eleştirel bakış açısı kazanırsın.
[/TIP]

---

## UX'in Bileşenleri

Peter Morville'in "UX Honeycomb" (Bal Peteği) modeli, iyi bir kullanıcı deneyiminin 7 bileşenini tanımlar:

[TABLE]
| Bileşen | İngilizce | Açıklama |
|---------|-----------|----------|
| **Kullanışlı** | Useful | Gerçek bir ihtiyacı karşılıyor mu? |
| **Kullanılabilir** | Usable | Kolayca kullanılabiliyor mu? |
| **Bulunabilir** | Findable | İçerik ve özellikler kolayca bulunuyor mu? |
| **Güvenilir** | Credible | Kullanıcı ürüne güveniyor mu? |
| **Erişilebilir** | Accessible | Herkes kullanabiliyor mu? |
| **Arzu edilir** | Desirable | Kullanmak istiyor muyuz? |
| **Değerli** | Valuable | İş hedeflerine katkı sağlıyor mu? |
[/TABLE]

İyi UX, bu 7 bileşenin dengesidir. Sadece "kullanılabilir" olmak yetmez. Ürün aynı zamanda kullanışlı, bulunabilir ve değerli olmalı.

---

## UX Neden Önemli?

### 1. İş sonuçlarını doğrudan etkiler

Kötü UX = kayıp müşteri, kayıp gelir.

**Rakamlarla:**
- Her 1 dolarlık UX yatırımı, 100 dolara kadar geri dönüş sağlayabilir (Forrester Research)
- Kullanıcıların %88'i kötü deneyim sonrası siteye geri dönmüyor
- Mobil kullanıcıların %53'ü 3 saniyeden uzun yüklenen siteleri terk ediyor

### 2. Rekabet avantajı sağlar

Ürünler giderek birbirine benziyor. Özellikleri kopyalamak kolay. Ama iyi deneyimi kopyalamak zor. UX, farklılaşma noktası.

### 3. Destek maliyetlerini düşürür

Kullanıcılar ürünü kolayca kullanabiliyorsa, daha az destek talebi gelir. Daha az "şifre sıfırlama nasıl yapılır?" sorusu demek, daha düşük destek maliyeti demek.

### 4. Müşteri sadakati oluşturur

İyi deneyim, duygusal bağ oluşturur. Apple kullanıcılarının marka sadakati tesadüf değil. Ürünlerini kullanmak keyifli.

---

## UX Designer Ne Yapar?

UX Designer'ın temel amacı:

**Kullanıcı ihtiyaçları ile iş hedeflerini buluşturan, kullanılabilir ve değerli ürünler tasarlamak.**

### Günlük işler

Bir UX Designer'ın tipik sorumlulukları:

[STEPS]
1. Kullanıcı Araştırması
   Kullanıcıları anlama: görüşmeler, anketler, gözlem

2. Analiz ve Sentez
   Verileri anlamlı içgörülere dönüştürme: persona, journey map

3. Bilgi Mimarisi
   İçerik ve özelliklerin yapısını belirleme

4. Akış Tasarımı
   User flow, task flow oluşturma

5. Wireframing
   Düşük sadakatli ekran taslaları çizme

6. Prototyping
   Etkileşimli prototipler oluşturma

7. Kullanılabilirlik Testi
   Tasarımları gerçek kullanıcılarla test etme

8. İterasyon
   Geri bildirimlere göre tasarımı geliştirme
[/STEPS]

### Kullanılan araçlar

| Kategori | Araçlar |
|----------|---------|
| Tasarım | Figma, Sketch, Adobe XD |
| Prototyping | Figma, ProtoPie, Principle |
| Araştırma | Maze, UserTesting, Hotjar |
| İş birliği | FigJam, Miro, Notion |
| Handoff | Zeplin, Figma Dev Mode |

### Çalışma şekli

UX Designer genellikle şu kişilerle birlikte çalışır:
- Product Manager (ürün yöneticisi)
- UI Designer (görsel tasarımcı)
- Developer (geliştirici)
- Researcher (araştırmacı, varsa)
- Stakeholder'lar (paydaşlar)

[CALLOUT]
**UX tek kişilik iş değil.**
İyi UX, farklı disiplinlerin iş birliğiyle ortaya çıkar. UX Designer bu iş birliğini koordine eden, kullanıcı perspektifini temsil eden kişidir.
[/CALLOUT]

---

## UX Süreci Nasıl İşler?

UX tasarım süreci genellikle şu aşamalardan oluşur:

### 1. Keşif (Discover)

**Sorular:** Problem ne? Kullanıcı kim? Mevcut durum ne?

**Aktiviteler:**
- Stakeholder görüşmeleri
- Kullanıcı araştırması
- Rakip analizi
- Veri analizi

### 2. Tanımlama (Define)

**Sorular:** Asıl problem ne? Kime odaklanmalıyız?

**Çıktılar:**
- Problem statement
- Persona
- User journey map
- Araştırma bulguları raporu

### 3. Geliştirme (Develop)

**Sorular:** Nasıl çözebiliriz? Hangi fikirler var?

**Aktiviteler:**
- Beyin fırtınası
- Wireframing
- Prototyping
- Design critique

### 4. Teslim (Deliver)

**Sorular:** Çözüm işe yarıyor mu? Nasıl geliştirebiliriz?

**Aktiviteler:**
- Kullanılabilirlik testi
- İterasyon
- Developer handoff
- Dokümantasyon

[TIP]
💡 Bu süreç lineer değil, döngüsel. Her aşamada öğrendiklerin, önceki aşamalara geri dönmeni gerektirebilir. Buna "iteratif süreç" denir.
[/TIP]

---

## UX vs UI: Temel Fark

En çok karıştırılan kavramlardan biri. Kısaca:

[COMPARISON]
**UX (User Experience):** Ürün nasıl çalışıyor ve hissettiriyor?
**UI (User Interface):** Ürün nasıl görünüyor?
[/COMPARISON]

**Restoran benzetmesi:**
- **UX:** Restoranın konsepti, menü tasarımı, masaların yerleşimi, sipariş süreci, yemeğin sunumu
- **UI:** Menünün görsel tasarımı, tabak seçimi, iç mekan dekorasyonu, renk paleti

[TABLE]
| Özellik | UX Design | UI Design |
|---------|-----------|-----------|
| **Odak** | Deneyim, akış, yapı | Görsel, estetik, etkileşim |
| **Sorular** | Nasıl çalışmalı? | Nasıl görünmeli? |
| **Çıktılar** | Wireframe, flow, persona | Mockup, style guide, ikon |
| **Araştırma** | Kullanıcı araştırması | Görsel trend araştırması |
| **Test** | Kullanılabilirlik testi | Görsel A/B test |
[/TABLE]

İkisi birbirini tamamlar. İyi UX kötü UI ile batabilir, iyi UI kötü UX'i kurtaramaz.

[WARNING]
⚠️ Daha detaylı karşılaştırma için "UX ve UI Arasındaki Fark" yazımızı okuyabilirsin. *(yakında)*
[/WARNING]

---

## UX Designer Olmak İçin Gerekenler

### Temel beceriler

**Soft skills:**
- **Empati:** Kullanıcının yerine geçebilme
- **Merak:** "Neden?" sorusunu sormaktan yorulmama
- **İletişim:** Fikirleri net ifade edebilme
- **Problem çözme:** Karmaşık sorunları parçalara ayırabilme
- **İş birliği:** Farklı disiplinlerle çalışabilme

**Hard skills:**
- Kullanıcı araştırması yöntemleri
- Wireframing ve prototyping
- Bilgi mimarisi
- Temel görsel tasarım prensipleri
- Tasarım araçları (Figma vs.)

### Eğitim gerekli mi?

Kısa cevap: **Zorunlu değil.**

UX alanında farklı arka planlardan insanlar var: psikoloji, grafik tasarım, mühendislik, pazarlama, hatta edebiyat. Önemli olan beceriler ve portfolio, diploma değil.

**Öğrenme yolları:**
- Online kurslar (Google UX Certificate, Coursera, IxDF)
- Bootcamp'ler
- Kendi kendine öğrenme + pratik projeler
- Staj veya junior pozisyonlar

[TIP]
💡 DesignAtlas roadmap'leri, UX Designer olmak için gereken becerileri adım adım öğrenmeni sağlar. Nereden başlayacağını bilmiyorsan, oradan başla.
[/TIP]

---

## UX Alanındaki Roller

UX geniş bir alan. Zamanla farklı uzmanlıklar ortaya çıktı:

[TABLE]
| Rol | Odak | Tipik Çıktılar |
|-----|------|----------------|
| **UX Designer** | Genel deneyim | Flow, wireframe, prototype |
| **UX Researcher** | Kullanıcı araştırması | Araştırma raporu, persona |
| **UI Designer** | Görsel tasarım | Mockup, design system |
| **Product Designer** | Uçtan uca ürün | Hepsi + strateji |
| **UX Writer** | Metin ve içerik | Microcopy, içerik stratejisi |
| **Interaction Designer** | Etkileşim tasarımı | Animasyon, micro-interaction |
| **Service Designer** | Hizmet deneyimi | Service blueprint |
[/TABLE]

Küçük şirketlerde bir kişi birden fazla rolü üstlenebilir. Büyük şirketlerde roller daha ayrışmış olur.

---

## Yaygın Yanlış Anlamalar

### "UX = UI"

Hayır. İkisi farklı ama birbirini tamamlayan disiplinler. UX yapı ve deneyim, UI görsel ve estetik.

### "UX = Wireframe çizmek"

Wireframe, UX sürecinin sadece bir parçası. UX araştırmayla başlar, testle devam eder, iterasyonla gelişir.

### "UX sadece tasarımcıların işi"

UX, tüm organizasyonun sorumluluğu. Developer'dan müşteri hizmetlerine, pazarlamadan ürün yönetimine herkes UX'i etkiler.

### "Güzel görünüyorsa UX iyidir"

Güzellik UX'in sadece bir parçası (desirable). Kullanışlı, kullanılabilir, bulunabilir ve erişilebilir olması da gerekir.

### "Ben kullanıcıyı tanıyorum, araştırmaya gerek yok"

En tehlikeli varsayım. Kullanıcılar hakkındaki varsayımların genellikle yanlış çıkar. Araştırma, bu varsayımları test eder.

---

## Türkiye'de UX

Türkiye'de UX alanı son 10 yılda hızla büyüdü. Özellikle:

- Fintech (iyzico, Papara, Param)
- E-ticaret (Trendyol, Hepsiburada, n11)
- Bankacılık (Garanti BBVA, İş Bankası, Akbank)
- Startup ekosistemi

**Zorluklar:**
- Türkçe kaynak azlığı (DesignAtlas bunu çözüyor!)
- "UX'e gerek yok" algısı hâlâ bazı şirketlerde var
- Junior pozisyonlar sınırlı

**Fırsatlar:**
- Büyüyen dijitalleşme
- Remote çalışma ile global fırsatlar
- UX olgunluğu artan şirketler

---

[EXERCISE]
## Şimdi Sen Dene

**15 dakika**

**Görev:** Bugün kullandığın bir dijital ürünü (uygulama veya website) UX Honeycomb modeline göre değerlendir.

**Adımlar:**

1. Bir ürün seç (banka uygulaması, e-ticaret sitesi, sosyal medya vs.)

2. Her bileşen için 1-5 puan ver:
   - Kullanışlı (Useful): ___/5
   - Kullanılabilir (Usable): ___/5
   - Bulunabilir (Findable): ___/5
   - Güvenilir (Credible): ___/5
   - Erişilebilir (Accessible): ___/5
   - Arzu edilir (Desirable): ___/5
   - Değerli (Valuable): ___/5

3. En düşük puan verdiğin bileşen hangisi? Neden?

4. Bu ürünün UX'ini iyileştirmek için bir öneri yaz.

**Bonus:** Aynı kategoriden başka bir ürünü de değerlendir ve karşılaştır.
[/EXERCISE]

---

[SUMMARY]
## Özet

- UX (User Experience), kullanıcının ürünle olan tüm etkileşim deneyimidir
- UX sadece dijital değil, her deneyimin bir UX'i var
- İyi UX: kullanışlı, kullanılabilir, bulunabilir, güvenilir, erişilebilir, arzu edilir ve değerli
- UX Designer kullanıcıyı anlar, problem çözer, tasarlar ve test eder
- UX ≠ UI: UX deneyim ve yapı, UI görsel ve estetik
- UX kariyer için diploma şart değil, beceriler ve portfolio önemli
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [User Flow ve Task Flow](/kutuphane/user-flow-task-flow)

**Sonraki:** UI Nedir? *(yakında)*

**İlgili konular:**
- UX ve UI Arasındaki Fark *(yakında)*
- Product Design Nedir? *(yakında)*

**İlgili Roadmap:** [UX Designer Roadmap → Temeller](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [The Definition of User Experience (UX) - NNGroup](https://www.nngroup.com/articles/definition-user-experience/) (İngilizce, 5 dk)
- [User Experience Basics - Usability.gov](https://www.usability.gov/what-and-why/user-experience.html) (İngilizce, 8 dk)
- [Don Norman: The term "UX"](https://www.youtube.com/watch?v=9BdtGjoIN4E) (Video, İngilizce, 2 dk)
`,
  },
  "ui-nedir": {
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
    content: `# UI Nedir? Kullanıcı Arayüzü Tasarımına Giriş

**Seviye:** Başlangıç  
**Kategori:** Temel Kavramlar  
**Son güncelleme:** Ocak 2025

---

## Giriş

Bir uygulamayı açtığında gördüğün her şey: butonlar, renkler, yazı tipleri, ikonlar, menüler. Hepsi bir tasarımcının kararı. Bu kararların toplamına **UI** yani **kullanıcı arayüzü** diyoruz.

UI, kullanıcının ürünle fiziksel olarak etkileşime girdiği katman. Bir butona tıklıyorsun, bir form dolduruyorsun, bir menüyü açıyorsun. Tüm bu etkileşimlerin görsel ve davranışsal tasarımı UI Designer'ın işi.

Güzel görünen ama kullanılamayan arayüzler var. Çirkin ama son derece işlevsel olanlar da. İyi UI, ikisini dengeler: hem estetik hem kullanılabilir.

Bu yazıda UI'ın ne olduğunu, UI Designer'ların ne yaptığını ve iyi bir arayüzün özelliklerini öğreneceksin.

---

## UI Ne Demek?

UI, **User Interface** yani **Kullanıcı Arayüzü** kelimelerinin kısaltmasıdır.

[CALLOUT]
**Kullanıcı Arayüzü (UI):**
Kullanıcının bir dijital ürünle etkileşime girdiği görsel ve etkileşimli yüzey. Ekranda gördüğün ve dokunduğun her şey: butonlar, menüler, formlar, ikonlar, renkler, tipografi.
[/CALLOUT]

UI, ürünün "yüzü". Kullanıcı arka plandaki kodu, veritabanını, sunucuları görmez. Sadece arayüzü görür ve onunla etkileşir. Bu yüzden arayüz tasarımı kritik.

---

## Arayüz Tipleri

UI sadece ekranlardan ibaret değil. Farklı arayüz tipleri var:

### 1. Grafik Kullanıcı Arayüzü (GUI)

En yaygın tip. Görsel elementlerle etkileşim:
- Masaüstü uygulamaları
- Mobil uygulamalar
- Web siteleri

### 2. Ses Kullanıcı Arayüzü (VUI)

Sesle etkileşim:
- Siri, Alexa, Google Assistant
- Sesli asistanlar
- IVR sistemleri (telefon menüleri)

### 3. Dokunmatik Arayüz

Fiziksel dokunuşla etkileşim:
- Kiosk'lar
- ATM'ler
- Akıllı ev panelleri

### 4. Hareket Tabanlı Arayüz

Vücut hareketleriyle etkileşim:
- Xbox Kinect
- VR/AR sistemleri

[TIP]
💡 Bu yazıda GUI (Grafik Kullanıcı Arayüzü) odağındayız çünkü UI Designer dendiğinde genellikle bu kastedilir.
[/TIP]

---

## UI'ın Temel Elementleri

Bir arayüz şu temel yapı taşlarından oluşur:

### 1. Layout (Yerleşim)

Elementlerin ekranda nasıl konumlandığı:
- Grid sistemleri
- Spacing (boşluklar)
- Alignment (hizalama)
- Responsive davranış

### 2. Tipografi

Metin tasarımı:
- Font seçimi
- Font boyutları (hiyerarşi)
- Satır aralığı (line-height)
- Metin renkleri

### 3. Renk

Renk paleti ve kullanımı:
- Primary, secondary, accent renkler
- Background ve surface renkleri
- Text renkleri
- Durum renkleri (success, error, warning)

### 4. Görsel Elementler

- İkonlar
- İllüstrasyonlar
- Fotoğraflar
- Grafikler ve çizelgeler

### 5. Bileşenler (Components)

Tekrar kullanılan UI parçaları:
- Butonlar
- Input alanları
- Kartlar
- Modallar
- Navigation elementleri
- Tablolar

### 6. Etkileşim Tasarımı

Elementlerin davranışı:
- Hover durumları
- Tıklama efektleri
- Animasyonlar
- Geçişler (transitions)

[TABLE]
| Element | Görevi | Örnek |
|---------|--------|-------|
| **Buton** | Aksiyon tetikleme | "Kaydet", "Gönder" |
| **Input** | Veri girişi | Text field, checkbox |
| **Navigation** | Yönlendirme | Tab bar, sidebar |
| **Kart** | İçerik gruplama | Ürün kartı, profil kartı |
| **Modal** | Odaklanmış etkileşim | Onay diyalogu |
| **Toast** | Geri bildirim | "Kaydedildi" mesajı |
[/TABLE]

---

## UI Designer Ne Yapar?

UI Designer'ın temel amacı:

**Kullanılabilir, tutarlı ve estetik arayüzler tasarlamak.**

### Günlük işler

[STEPS]
1. Görsel Tasarım
   Ekranların görsel tasarımını oluşturma: renkler, tipografi, spacing

2. Bileşen Tasarımı
   Tekrar kullanılabilir UI bileşenleri tasarlama: butonlar, formlar, kartlar

3. Design System
   Tutarlılık için tasarım sistemi oluşturma ve sürdürme

4. Responsive Tasarım
   Farklı ekran boyutları için uyarlama

5. Prototipleme
   Etkileşimli prototipler oluşturma

6. Etkileşim Tasarımı
   Hover, active, disabled durumları ve animasyonlar

7. Developer Handoff
   Tasarımları geliştirici ekibe aktarma

8. Görsel QA
   Geliştirilen ürünün tasarıma uygunluğunu kontrol etme
[/STEPS]

### Kullanılan araçlar

| Kategori | Araçlar |
|----------|---------|
| Tasarım | Figma, Sketch, Adobe XD |
| Prototip | Figma, ProtoPie, Principle, Framer |
| Animasyon | After Effects, Lottie |
| Handoff | Figma Dev Mode, Zeplin |
| Design System | Figma, Storybook |

### Çalışma şekli

UI Designer genellikle şu kişilerle birlikte çalışır:
- UX Designer (deneyim tasarımı)
- Developer (uygulama)
- Product Manager (ürün kararları)
- Brand Designer (marka uyumu)

---

## İyi UI'ın Özellikleri

### 1. Tutarlılık (Consistency)

Aynı elementler her yerde aynı görünmeli ve davranmalı.

[COMPARISON]
❌ Kötü: Bir sayfada mavi buton, diğerinde yeşil buton aynı işlev için
✅ İyi: Primary buton her yerde aynı renk, boyut ve davranış
[/COMPARISON]

**Tutarlılık tipleri:**
- Görsel tutarlılık (renkler, fontlar)
- Fonksiyonel tutarlılık (aynı element = aynı davranış)
- Dış tutarlılık (platform conventions'a uyum)

### 2. Görsel Hiyerarşi

Önemli elementler öne çıkmalı, ikincil elementler geri planda kalmalı.

**Hiyerarşi araçları:**
- Boyut (büyük = önemli)
- Renk (kontrast = dikkat çeker)
- Konum (üst ve sol = önce görülür)
- Boşluk (etrafında boşluk = öne çıkar)

### 3. Anlaşılırlık (Clarity)

Kullanıcı neyin tıklanabilir olduğunu, nerede olduğunu, ne yapması gerektiğini hemen anlamalı.

[COMPARISON]
❌ Belirsiz: Flat, tıklanabilir mi belli olmayan text
✅ Anlaşılır: Buton görünümünde, hover'da feedback veren element
[/COMPARISON]

### 4. Geri Bildirim (Feedback)

Kullanıcı bir aksiyon aldığında, sistem cevap vermeli.

**Geri bildirim örnekleri:**
- Butona tıklayınca renk değişimi
- Form gönderilince başarı mesajı
- Yükleme sırasında spinner
- Hata durumunda kırmızı border ve mesaj

### 5. Erişilebilirlik (Accessibility)

Herkes için kullanılabilir tasarım:
- Yeterli renk kontrastı
- Okunabilir font boyutları
- Ekran okuyucu uyumu
- Keyboard navigation desteği

[INFO]
4.5:1 minimum kontrast oranı
Normal metin için WCAG AA standardı
[/INFO]

### 6. Estetik

Görsel olarak çekici, modern ve profesyonel görünüm.

**Ama dikkat:** Estetik, kullanılabilirliği engellememelidir. Güzel ama kullanılamaz UI, kötü UI'dır.

---

## UI Tasarım Prensipleri

### Yakınlık (Proximity)

İlişkili elementler birbirine yakın olmalı.

[COMPARISON]
❌ Form label'ı inputtan uzakta
✅ Label, input'un hemen üstünde veya yanında
[/COMPARISON]

### Hizalama (Alignment)

Elementler görünmez çizgiler üzerinde hizalı olmalı.

### Tekrar (Repetition)

Aynı görsel pattern'ler tekrar kullanılmalı. Bu tutarlılık yaratır.

### Kontrast (Contrast)

Farklı elementler arasında yeterli görsel fark olmalı. Bu hem hiyerarşi hem erişilebilirlik için önemli.

[TIP]
💡 Bu 4 prensip Robin Williams'ın "The Non-Designer's Design Book" kitabından gelir. CRAP (Contrast, Repetition, Alignment, Proximity) olarak bilinir.
[/TIP]

---

## Design System Nedir?

UI Designer'ların en önemli çıktılarından biri design system'dır.

[CALLOUT]
**Design System:**
Bir ürün veya şirketin tüm dijital ürünlerinde kullanılan, tekrar kullanılabilir bileşenler, stiller ve kurallar bütünü. Tek bir doğruluk kaynağı (single source of truth).
[/CALLOUT]

**Design system içerir:**
- Renk paleti
- Tipografi sistemi
- Spacing sistemi
- Icon set
- UI bileşenleri (butonlar, inputlar, kartlar...)
- Kullanım kuralları ve dokümantasyon

**Neden önemli:**
- Tutarlılık sağlar
- Hızlı tasarım ve geliştirme
- Kolay güncelleme
- Ekipler arası ortak dil

**Popüler design system'lar:**
- Material Design (Google)
- Human Interface Guidelines (Apple)
- Carbon (IBM)
- Polaris (Shopify)

---

## UI vs UX: Tekrar Hatırlayalım

[COMPARISON]
**UI:** Ürün nasıl görünüyor?
**UX:** Ürün nasıl çalışıyor ve hissettiriyor?
[/COMPARISON]

**Ev benzetmesi:**
- **UX:** Evin planı, odaların yerleşimi, kapıların açılış yönü, elektrik prizlerinin konumu
- **UI:** Duvar renkleri, mobilya seçimi, aydınlatma armatürleri, dekorasyon

[TABLE]
| Özellik | UI Design | UX Design |
|---------|-----------|-----------|
| **Soru** | Nasıl görünmeli? | Nasıl çalışmalı? |
| **Odak** | Görsel, estetik | Deneyim, akış |
| **Çıktılar** | Mockup, style guide | Wireframe, persona |
| **Araçlar** | Figma, Illustrator | FigJam, Miro |
| **Test** | Görsel A/B test | Kullanılabilirlik testi |
[/TABLE]

[WARNING]
⚠️ Küçük ekiplerde UX ve UI aynı kişi tarafından yapılabilir. Ama bunlar farklı becerilerdir. "UX/UI Designer" title'ı yaygın olsa da, iki farklı disiplini temsil eder.
[/WARNING]

---

## Sık Yapılan UI Hataları

### 1. Tutarsız tasarım

Aynı işlev için farklı görünümler, farklı renkler, farklı boyutlar.

### 2. Yetersiz kontrast

Açık gri text beyaz arka planda. Kullanıcılar (özellikle görme zorluğu olanlar) okuyamaz.

### 3. Çok küçük tıklama alanları

44x44px altı butonlar mobilde tıklanamaz.

### 4. Belirsiz etkileşimler

Neyin tıklanabilir, neyin tıklanamaz olduğu belli değil.

### 5. Aşırı tasarım

Her yere animasyon, gradient, gölge. Basitlik yerine karmaşıklık.

### 6. Platform kurallarını görmezden gelmek

iOS uygulamasında Android pattern'leri veya tam tersi. Kullanıcılar platform conventions'a alışkındır.

---

## UI Designer Olmak İçin

### Gerekli beceriler

**Hard skills:**
- Görsel tasarım prensipleri
- Tipografi
- Renk teorisi
- Layout ve grid sistemleri
- Design system oluşturma
- Figma veya benzeri araçlar
- Temel animasyon

**Soft skills:**
- Detaylara dikkat
- Estetik algı
- İş birliği
- Geri bildirim alma ve verme
- Trend takibi

### Nasıl gelişirsin?

1. **Günlük UI incele:** Kullandığın uygulamaları eleştirel gözle bak
2. **Replika yap:** Beğendiğin UI'ları Figma'da kopyala
3. **Daily UI challenge:** 100 günlük tasarım challengeına katıl
4. **Design system öğren:** Material Design, HIG incele
5. **Portfolio oluştur:** Yaptıklarını göster

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Bir mobil uygulamanın ana ekranını UI elementleri açısından analiz et.

**Adımlar:**

1. Telefonunda sık kullandığın bir uygulamayı aç (Spotify, Instagram, banka uygulaması vs.)

2. Ana ekranı incele ve şunları listele:
   - Kaç farklı buton tipi var?
   - Kaç farklı font boyutu kullanılmış?
   - Primary renk ne? Nerelerde kullanılmış?
   - Spacing tutarlı mı?
   - Görsel hiyerarşi nasıl kurulmuş?

3. Şu soruları cevapla:
   - En önemli aksiyon ne? Nasıl öne çıkarılmış?
   - Tutarsız gördüğün bir element var mı?
   - Erişilebilirlik açısından sorun var mı?

**Bonus:** Aynı kategoriden başka bir uygulamayla karşılaştır. Hangisinin UI'ı daha iyi? Neden?
[/EXERCISE]

---

[SUMMARY]
## Özet

- UI (User Interface), kullanıcının ürünle etkileşime girdiği görsel yüzeydir
- UI elementleri: layout, tipografi, renk, ikonlar, bileşenler
- İyi UI: tutarlı, anlaşılır, erişilebilir ve estetik
- UI Designer görsel tasarım yapar, design system oluşturur, bileşenler tasarlar
- UI görsel katman, UX deneyim katmanı - ikisi birbirini tamamlar
- Tutarlılık için design system kritik önemde
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [UX Nedir?](/kutuphane/ux-nedir)

**Sonraki:** [UX ve UI Arasındaki Fark](/kutuphane/ux-ui-farki)

**İlgili konular:**
- Design System Temelleri *(yakında)*
- Visual Hierarchy Prensipleri *(yakında)*

**İlgili Roadmap:** [UI Designer Roadmap → Temeller](/roadmap/ui-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [User Interface Design Basics - Usability.gov](https://www.usability.gov/what-and-why/user-interface-design.html) (İngilizce, 6 dk)
- [UI Design - IxDF](https://www.interaction-design.org/literature/topics/ui-design) (İngilizce, 10 dk)
- [Material Design](https://material.io/design) (Google'ın design system'ı, İngilizce)
`,
  },
  "ux-ui-farki": {
    id: "ux-ui-farki",
    title: "UX ve UI Arasındaki Fark",
    subtitle: "İki Kavramı Bir Kez ve Herkes İçin Netleştirelim",
    titleEn: "UX vs UI",
    slug: "ux-ui-farki",
    description: "UX ve UI arasındaki fark nedir? UX Designer ile UI Designer ne yapar, nasıl çalışırlar? Karıştırılan bu iki kavramı örneklerle açıklıyoruz.",
    category: "temel-kavramlar",
    readingTime: 9,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# UX ve UI Arasındaki Fark: Kapsamlı Karşılaştırma

**Seviye:** Başlangıç  
**Kategori:** Temel Kavramlar  
**Son güncelleme:** Ocak 2025

---

## Giriş

"UX/UI Designer arıyoruz."

İş ilanlarının %80'i böyle yazıyor. Sanki UX ve UI aynı şeymiş gibi. Ya da biri diğerinin parçasıymış gibi.

Değil.

UX ve UI farklı disiplinler. Farklı sorulara cevap veriyorlar, farklı beceriler gerektiriyorlar, farklı çıktılar üretiyorlar. Ama birlikte çalışıyorlar, birbirlerini tamamlıyorlar.

Bu yazıda UX ve UI arasındaki farkı bir kez ve herkes için netleştireceğiz. Benzetmeler, örnekler ve tablolarla.

---

## Tek Cümlede Fark

[CALLOUT]
**UX:** Ürün nasıl çalışıyor ve nasıl hissettiriyor?
**UI:** Ürün nasıl görünüyor?
[/CALLOUT]

UX deneyimi tasarlar. UI görüntüyü tasarlar.

---

## Benzetmelerle Anlamak

### Ev Benzetmesi

Bir ev inşa ettiğini düşün:

**UX:**
- Evin planı (kaç oda, nerede)
- Odalar arası geçişler
- Kapıların açılış yönü
- Elektrik prizlerinin konumu
- Mutfak tezgahının yüksekliği
- Işığın nereden geleceği

**UI:**
- Duvar renkleri
- Mobilya seçimi
- Aydınlatma armatürleri
- Zemin kaplaması
- Perde ve dekorasyon
- Kapı kollarının tasarımı

[TIP]
💡 Güzel dekore edilmiş ama planı kötü bir evde yaşamak zor. Planı iyi ama çirkin bir evde yaşanabilir ama keyif vermez. İkisi de lazım.
[/TIP]

### Restoran Benzetmesi

**UX:**
- Menü yapısı ve kategorileri
- Sipariş süreci
- Masaların yerleşimi
- Garsonun ne zaman geleceği
- Ödeme akışı
- Bekleme süresi

**UI:**
- Menünün görsel tasarımı
- Tabak ve çatal bıçak seçimi
- İç mekan dekorasyonu
- Aydınlatma ambiyansı
- Garson üniforması
- Logo ve marka renkleri

### Araba Benzetmesi

**UX:**
- Vites kolunun konumu
- Gösterge panelinin düzeni
- Klima kontrollerinin mantığı
- Bagajın açılış şekli
- Sürüş deneyimi

**UI:**
- Gösterge panelinin görsel tasarımı
- Buton ve düğmelerin şekli
- İç mekan renkleri ve malzemeleri
- Ekran arayüzü tasarımı
- Işıklandırma

---

## Detaylı Karşılaştırma

[TABLE]
| Özellik | UX Design | UI Design |
|---------|-----------|-----------|
| **Tam adı** | User Experience Design | User Interface Design |
| **Odak** | Deneyim, akış, yapı | Görsel, estetik, etkileşim |
| **Ana soru** | Nasıl çalışmalı? | Nasıl görünmeli? |
| **Kullanıcı ile ilişki** | Kullanıcıyı anlamak | Kullanıcıya sunmak |
| **Araştırma** | Kullanıcı araştırması | Görsel trend araştırması |
| **Çıktılar** | Persona, journey map, wireframe, flow | Mockup, style guide, design system |
| **Araçlar** | FigJam, Miro, Maze | Figma, Illustrator, Principle |
| **Test** | Kullanılabilirlik testi | Görsel A/B test, preference test |
| **Başarı kriteri** | Kullanıcı görevi tamamladı mı? | Görsel açık ve çekici mi? |
| **Analoji** | Mimarın planı | İç mimarın dekorasyonu |
[/TABLE]

---

## Süreçte Nerede Duruyorlar?

Tipik bir tasarım sürecinde:

[STEPS]
1. Araştırma → UX
   Kullanıcı görüşmeleri, anketler, veri analizi

2. Tanımlama → UX
   Persona, problem statement, user journey

3. Yapı → UX
   Information architecture, user flow, wireframe

4. Görsel Tasarım → UI
   Style exploration, renk, tipografi, bileşenler

5. Prototip → UX + UI
   Etkileşimli prototip, animasyonlar

6. Test → UX + UI
   Kullanılabilirlik testi, görsel feedback

7. İterasyon → UX + UI
   Geri bildirimlere göre düzenleme

8. Handoff → UI
   Developer'a görsel spesifikasyonlar
[/STEPS]

[CALLOUT]
**Süreç lineer değil, döngüsel.**
UI çalışırken UX sorunları ortaya çıkabilir. Test sonuçları hem UX hem UI değişikliği gerektirebilir. İkisi paralel ve iteratif çalışır.
[/CALLOUT]

---

## Çıktılar Karşılaştırması

### UX Designer Çıktıları

| Çıktı | Açıklama |
|-------|----------|
| **Persona** | Hedef kullanıcı profili |
| **User Journey Map** | Kullanıcı yolculuğu haritası |
| **User Flow** | Kullanıcı akış diyagramı |
| **Wireframe** | Düşük sadakatli ekran taslakları |
| **Information Architecture** | İçerik ve navigasyon yapısı |
| **Usability Test Raporu** | Test bulguları ve öneriler |

### UI Designer Çıktıları

| Çıktı | Açıklama |
|-------|----------|
| **Style Guide** | Renk, tipografi, spacing kuralları |
| **Mockup** | Yüksek sadakatli ekran tasarımları |
| **Design System** | Tekrar kullanılabilir bileşenler |
| **Icon Set** | Tutarlı ikon kütüphanesi |
| **Prototype** | Etkileşimli ve animasyonlu prototip |
| **Redline/Spec** | Developer için ölçü ve detaylar |

### Görsel Fark

[COMPARISON]
**Wireframe (UX):**
Gri kutular, placeholder metinler, akış odaklı, görsel detay yok

**Mockup (UI):**
Gerçek renkler, fontlar, ikonlar, görseller, piksel-perfect tasarım
[/COMPARISON]

---

## UX/UI Designer: Hibrit Rol

İş ilanlarında sıkça gördüğün "UX/UI Designer" title'ı ne anlama geliyor?

[CALLOUT]
**UX/UI Designer:**
Hem kullanıcı deneyimi hem kullanıcı arayüzü tasarımı yapan kişi. İki farklı beceri setini tek kişide birleştirir.
[/CALLOUT]

### Ne zaman bu rol mantıklı?

- Küçük ekipler ve startup'lar
- Sınırlı bütçe
- Hızlı hareket etme ihtiyacı
- Tek tasarımcılı projeler

### Ne zaman roller ayrılmalı?

- Büyük ve karmaşık projeler
- Derin araştırma gerektiren ürünler
- Yüksek görsel standart beklentisi
- Yeterli bütçe ve ekip büyüklüğü

[WARNING]
⚠️ UX/UI Designer olarak çalışsan da, iki disiplini karıştırma. Hangi şapkayı taktığını bil. Araştırma yaparken UX, görsel tasarlarken UI modundasın.
[/WARNING]

---

## Hangisi Önce Gelir?

Genel kural: **UX önce.**

Çünkü:
1. Önce problemi anlamalısın (UX araştırma)
2. Sonra yapıyı kurmalısın (UX yapı)
3. Sonra görselleştirmelisin (UI)

Ama pratikte bu kadar net değil. İkisi paralel ilerleyebilir:
- UX wireframe çizerken, UI style exploration yapabilir
- UI tasarlarken, UX sorunları fark edilebilir
- Test sonuçları ikisini de etkiler

[TIP]
💡 Sıkı waterfall yerine, iteratif düşün. UX ve UI birbirini besler, bir ileri bir geri gidilir.
[/TIP]

---

## Birlikte Nasıl Çalışırlar?

### İdeal iş akışı

[UX Research]
↓
[UX: Persona, Journey Map]
↓
[UX: Information Architecture, Flow]
↓
[UX: Wireframe] ←→ [UI: Style Exploration]
↓
[UI: Visual Design, Mockup]
↓
[UX + UI: Prototype]
↓
[UX: Usability Test] → Feedback → [Iterate]
↓
[UI: Design System, Handoff]

### İletişim noktaları

| Aşama | UX → UI | UI → UX |
|-------|---------|---------|
| **Araştırma sonrası** | Persona, kullanıcı ihtiyaçları | - |
| **Yapı sonrası** | Wireframe, flow | Görsel kısıtlar, teknik limitler |
| **Tasarım sırasında** | Akış değişiklikleri | Görsel alternatifler |
| **Test sonrası** | Kullanılabilirlik bulguları | Görsel feedback |

---

## Yaygın Yanlış Anlamalar

### "UX = Wireframe"

Hayır. Wireframe, UX'in sadece bir çıktısı. UX araştırmayla başlar, stratejiyle devam eder.

### "UI = Güzel tasarım"

Kısmen. UI estetik ama aynı zamanda fonksiyonel, tutarlı ve erişilebilir olmalı.

### "UI olmadan UX olur"

Teknik olarak evet. Wireframe'lerle test yapılabilir. Ama final ürün için UI şart.

### "UX olmadan UI olur"

Yine teknik olarak evet. Ama sonuç güzel görünen ama kullanılamayan bir ürün olabilir.

### "UX daha önemli"

İkisi de önemli. Kötü UX + iyi UI = frustrasyon. İyi UX + kötü UI = terk. İkisi dengede olmalı.

---

## Kariyer Perspektifi

### UX Designer olmak istiyorsan

**Güçlü olman gereken alanlar:**
- Kullanıcı araştırması
- Problem tanımlama
- Analitik düşünme
- İletişim ve sunum
- Empati

**Daha az kritik:**
- Görsel tasarım detayları
- Renk teorisi
- Tipografi uzmanlığı

### UI Designer olmak istiyorsan

**Güçlü olman gereken alanlar:**
- Görsel tasarım prensipleri
- Tipografi
- Renk ve kompozisyon
- Detaylara dikkat
- Design system düşüncesi

**Daha az kritik:**
- Derin kullanıcı araştırması
- İstatistik ve veri analizi

### UX/UI Designer olmak istiyorsan

Her iki alanın temellerine hakim olmalısın. Ama genellikle bir tarafta daha güçlü olursun. Bu normal.

---

## Gerçek Dünya Örneği

Bir e-ticaret uygulamasının "Sepete Ekle" özelliğini düşünelim:

### UX açısından sorular:
- Kullanıcı ürünü sepete ne zaman eklemek istiyor?
- Sepete ekledikten sonra ne bekliyor?
- Sepete gitmek mi istiyor, alışverişe devam mı?
- Miktar seçimi gerekli mi?
- Aynı ürün zaten sepetteyse ne olacak?

### UI açısından sorular:
- Buton ne renk olmalı?
- Buton nerede konumlanmalı?
- Tıklandığında nasıl bir feedback olmalı?
- Başarı animasyonu nasıl olmalı?
- Buton üzerinde ne yazmalı? İkon mu, text mi?

[COMPARISON]
**UX kararı:** Sepete ekledikten sonra mini cart açılsın, kullanıcı sepeti görsün ama sayfada kalsın.

**UI kararı:** Buton primary yeşil (#10B981), tıklandığında scale animasyonu, ardından mini cart sağdan slide-in.
[/COMPARISON]

---

[EXERCISE]
## Şimdi Sen Dene

**15 dakika**

**Görev:** Bir özelliği hem UX hem UI gözüyle analiz et.

**Senaryo:** Bir banka uygulamasının "Para Transferi" özelliği.

**Adım 1 - UX soruları yaz (en az 5):**
- Kullanıcı nasıl bir akış bekliyor?
- Hangi bilgilere ihtiyaç var?
- Hata durumlarında ne olmalı?
- ...

**Adım 2 - UI soruları yaz (en az 5):**
- Tutar nasıl girilmeli?
- Onay ekranı nasıl görünmeli?
- Başarı durumu nasıl gösterilmeli?
- ...

**Adım 3 - Karşılaştır:**
Sorularının odağı ne kadar farklı? Hangilerinde örtüşme var?
[/EXERCISE]

---

[SUMMARY]
## Özet

- **UX** deneyimi tasarlar (nasıl çalışıyor?), **UI** görüntüyü tasarlar (nasıl görünüyor?)
- UX: araştırma, yapı, akış, wireframe / UI: görsel, estetik, bileşen, mockup
- Genel olarak UX önce gelir ama pratikte paralel ve iteratif çalışılır
- UX/UI Designer hibrit roldür, özellikle küçük ekiplerde yaygın
- İkisi birbirini tamamlar: iyi UX + kötü UI veya kötü UX + iyi UI başarısız olur
- Kariyer seçiminde güçlü yönlerini değerlendir, ama temelleri her iki alanda da öğren
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [UI Nedir?](/kutuphane/ui-nedir)

**Sonraki:** [Wireframe Nedir?](/kutuphane/wireframe-nedir)

**İlgili konular:**
- [UX Nedir?](/kutuphane/ux-nedir)
- [UI Nedir?](/kutuphane/ui-nedir)
- Product Design Nedir? *(yakında)*

**İlgili Roadmap:** [UX Designer Roadmap → Temeller](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [UX vs UI Design: What's the Difference? - NNGroup](https://www.nngroup.com/articles/ux-vs-ui/) (İngilizce, 6 dk)
- [The Difference Between UX and UI Design - IxDF](https://www.interaction-design.org/literature/article/the-difference-between-ux-and-ui-design-a-layman-s-guide) (İngilizce, 10 dk)
- [UI vs UX: What's the difference? - Figma](https://www.figma.com/resource-library/difference-between-ui-and-ux/) (İngilizce, 8 dk)
`,
  },
  "wireframe-nedir": {
    id: "wireframe-nedir",
    title: "Wireframe Nedir?",
    subtitle: "Tasarımın İskeletini Oluşturma Rehberi",
    titleEn: "What is Wireframe?",
    slug: "wireframe-nedir",
    description: "Wireframe nedir, ne işe yarar? Wireframe nasıl çizilir, hangi araçlar kullanılır? Low-fidelity tasarımın temellerini öğren.",
    category: "ux-design",
    readingTime: 11,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# Wireframe Nedir? Tasarımın İskeletini Oluşturma Rehberi

**Seviye:** Başlangıç  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

Bir bina inşa etmeden önce mimar çizim yapar. Duvarlar nerede olacak, kapılar nereye açılacak, pencereler hangi yönü görecek. Henüz boya rengi, parke seçimi yok. Sadece yapı.

Dijital ürünlerde de aynı mantık geçerli. Renkler, fontlar ve güzel görseller eklemeden önce, sayfanın iskeletini çizersin. Buna **wireframe** diyoruz.

Wireframe, tasarım sürecinin en değerli ama en çok atlanan adımlarından biri. "Hızlıca mockup'a geçelim" derken, yapısal sorunlar göz ardı edilir. Sonra her şeyi baştan yapmak zorunda kalırsın.

Bu yazıda wireframe'in ne olduğunu, neden önemli olduğunu ve nasıl çizileceğini öğreneceksin.

---

## Wireframe Ne Demek?

[CALLOUT]
**Wireframe:**
Bir dijital ürünün sayfa veya ekran yapısını gösteren düşük sadakatli (low-fidelity) görsel taslak. İçerik yerleşimini, hiyerarşiyi ve temel fonksiyonları gösterir. Renk, tipografi veya detaylı görsel içermez.
[/CALLOUT]

"Wire" (tel) + "Frame" (çerçeve) = Tel çerçeve.

Wireframe, tasarımın iskeletidir. Tıpkı bir binanın çelik konstrüksiyonu gibi. Üzerine duvar, boya, dekorasyon (yani UI) sonra gelir.

---

## Wireframe Neye Benzer?

Tipik bir wireframe şu özelliklere sahiptir:

- **Gri tonları:** Siyah, beyaz ve gri. Renk yok.
- **Placeholder içerik:** "Lorem ipsum" metinler, "Image" yazan kutular
- **Basit şekiller:** Dikdörtgenler, çizgiler, basit ikonlar
- **Görsel detay yok:** Gölge, gradient, efekt yok
- **Net etiketler:** Her alanın ne olduğu yazılı

[COMPARISON]
**Wireframe'de olan:**
- İçerik blokları ve yerleşimi
- Navigasyon yapısı
- Buton konumları
- Metin hiyerarşisi (başlık, alt başlık, body)
- Temel akış

**Wireframe'de olmayan:**
- Gerçek renkler
- Son tipografi
- Gerçek görseller
- Detaylı ikonlar
- Animasyonlar
[/COMPARISON]

---

## Neden Wireframe Çizilir?

### 1. Hızlı iterasyon

Wireframe çizmek hızlıdır. Mockup yapmak saatler alırken, wireframe dakikalar alır. Yanlış bir fikri wireframe'de görmek, mockup'ta görmekten çok daha ucuz.

### 2. Yapıya odaklanma

Renkler ve görseller dikkat dağıtır. "Bu mavi çok koyu" tartışması yerine, "Bu buton burada mı olmalı?" tartışması yaparsın.

### 3. Erken geri bildirim

Stakeholder'lara wireframe göstermek, erken feedback almayı sağlar. Yanlış yönde ilerlemeden önce düzeltme şansı verir.

### 4. Ekip hizalaması

Wireframe, herkesin aynı sayfada olduğundan emin olmanı sağlar. Developer, PM, tasarımcı - herkes yapıyı görür.

### 5. Kullanılabilirlik testi

Wireframe'lerle bile kullanılabilirlik testi yapabilirsin. Görsel tasarım olmadan akışı test edebilirsin.

[INFO]
5x daha hızlı
Wireframe iterasyonu, mockup iterasyonundan ortalama 5 kat hızlı
[/INFO]

---

## Wireframe Tipleri

Wireframe'ler sadakat seviyesine (fidelity) göre ayrılır:

### Low-Fidelity (Düşük Sadakat)

En basit hali. Kalem kağıtla bile çizilebilir.

**Özellikleri:**
- Çok hızlı (dakikalar)
- Çok kaba
- Elle çizim veya basit kutular
- Beyin fırtınası ve ilk fikirler için

### Mid-Fidelity (Orta Sadakat)

En yaygın kullanılan tip. Dijital araçlarla çizilir.

**Özellikleri:**
- Orta hızda (saatler)
- Net yapı ve yerleşim
- Placeholder içerik
- Ekip paylaşımı ve geri bildirim için

### High-Fidelity (Yüksek Sadakat)

Wireframe'den çok "grayscale mockup"a yakın.

**Özellikleri:**
- Daha uzun süre
- Gerçek içerik
- Detaylı yerleşim
- Kullanılabilirlik testi için

[TABLE]
| Tip | Hız | Detay | Kullanım |
|-----|-----|-------|----------|
| **Low-fi** | Dakikalar | Çok düşük | Beyin fırtınası, ilk fikirler |
| **Mid-fi** | Saatler | Orta | Ekip paylaşımı, feedback |
| **High-fi** | Günler | Yüksek | Test, dokümantasyon |
[/TABLE]

[TIP]
💡 Çoğu projede mid-fidelity wireframe yeterli. High-fidelity'e geçmeden önce akışın doğrulanması gerekir.
[/TIP]

---

## Wireframe Nasıl Çizilir?

### Adım Adım Süreç

[STEPS]
1. Amacı belirle
   Bu sayfanın amacı ne? Kullanıcı ne yapmak istiyor?

2. İçerik listesi çıkar
   Sayfada hangi içerikler olmalı? Header, form, liste, butonlar...

3. Hiyerarşi oluştur
   En önemli ne? İkincil ne? Üçüncül ne?

4. Layout seç
   Tek kolon mu? İki kolon mu? Grid nasıl olacak?

5. Kabaca yerleştir
   İçerikleri kabaca konumlandır. Mükemmel olmasına gerek yok.

6. Detaylandır
   Placeholder metin ekle, butonları yerleştir, navigasyonu kur.

7. Gözden geçir
   Akış mantıklı mı? Eksik bir şey var mı? Feedback al.
[/STEPS]

### Temel Layout Kalıpları

**Tek Kolon:**
Mobil için ideal. İçerik yukarıdan aşağı akar.
[Header]
[Hero]
[Content Block]
[Content Block]
[CTA]
[Footer]

**İki Kolon:**
Desktop için yaygın. Ana içerik + sidebar.
[Header                    ]
[Sidebar] [Main Content    ]
[Footer                    ]

**Grid:**
Ürün listeleri, portfolyo, galeri için.
[Header           ]
[Card][Card][Card]
[Card][Card][Card]
[Footer           ]

---

## Wireframe Elementleri

Wireframe'lerde kullanılan standart element gösterimleri:

### Metin
[████████████████] → Başlık
[████████████] → Alt başlık
[████ ████ ████ ████] → Paragraf (çizgiler)

### Görsel
┌─────────────┐
│      ✕      │ → Placeholder görsel
│   IMAGE     │
└─────────────┘

### Buton
[  Buton Text  ] → Primary buton
[  Buton Text  ] → Secondary buton (border only)

### Input
Label
┌─────────────────┐
│ Placeholder...  │
└─────────────────┘

### Navigation
[Logo]  Link  Link  Link  [CTA]

### Kart
┌─────────────────┐
│     IMAGE       │
├─────────────────┤
│ Başlık          │
│ Açıklama text   │
│ [Buton]         │
└─────────────────┘

---

## Wireframe Araçları

### Analog (Kalem + Kağıt)

**Avantajları:**
- Sıfır maliyet
- Anında başlama
- Tam özgürlük
- Hiçbir öğrenme eğrisi yok

**Dezavantajları:**
- Paylaşımı zor
- Düzenleme zahmetli
- Arşivleme sorunu

**Ne zaman kullan:**
Beyin fırtınası, ilk eskizler, whiteboard çalışmaları

### Dijital Araçlar

[TABLE]
| Araç | Ücretsiz | En İyi Yön | Platform |
|------|----------|------------|----------|
| **Figma** | ✓ | Her şey bir arada | Web, Desktop |
| **Balsamiq** | ✗ | Sketch tarzı, hızlı | Web, Desktop |
| **Whimsical** | Kısmen | Basitlik, hız | Web |
| **Miro** | Kısmen | İş birliği, whiteboard | Web |
| **Sketch** | ✗ | macOS için güçlü | macOS |
| **Adobe XD** | Kısmen | Adobe ekosistemi | Desktop |
[/TABLE]

[TIP]
💡 Figma, hem wireframe hem mockup için kullanılabildiğinden en popüler seçenek. Ücretsiz planı çoğu ihtiyacı karşılar.
[/TIP]

---

## Wireframe vs Diğerleri

### Wireframe vs Sketch

| Sketch | Wireframe |
|--------|-----------|
| Kalem kağıt, çok hızlı | Dijital, biraz daha yavaş |
| Çok kaba | Daha düzenli |
| Kişisel kullanım | Ekip paylaşımı |

### Wireframe vs Mockup

[COMPARISON]
**Wireframe:**
- Düşük sadakat
- Yapı odaklı
- Gri tonları
- Hızlı iterasyon
- "Ne nerede?"

**Mockup:**
- Yüksek sadakat
- Görsel odaklı
- Gerçek renkler, fontlar
- Detaylı çalışma
- "Nasıl görünecek?"
[/COMPARISON]

### Wireframe vs Prototype

| Wireframe | Prototype |
|-----------|-----------|
| Statik | Etkileşimli |
| Görüntü | Deneyim |
| "Böyle görünecek" | "Böyle çalışacak" |

---

## Sık Yapılan Hatalar

### 1. Çok erken detaya girmek

[COMPARISON]
❌ Hata: İlk wireframe'de pixel-perfect hizalama
✅ Doğrusu: Önce yapı, detay sonra
[/COMPARISON]

### 2. Wireframe'i atlamak

"Hemen mockup yapalım" düşüncesi. Yapısal hatalar mockup'ta düzeltmek 5x daha uzun sürer.

### 3. Renk ve görsel eklemek

Wireframe'de renk kullanmak, odağı dağıtır. Gri tonlarında kal.

### 4. Gerçek içerik koymamak

"Lorem ipsum" her yerde olunca, içerik uzunlukları anlaşılmaz. Mümkünse gerçekçi içerik kullan.

### 5. Tek versiyon çizmek

[COMPARISON]
❌ Hata: Bir wireframe, herkes onaylasın
✅ Doğrusu: 2-3 alternatif çiz, karşılaştır
[/COMPARISON]

### 6. Mobili unutmak

Desktop wireframe çizip, mobili "sonra hallederiz" demek. Responsive düşünceyi baştan kur.

---

## Wireframe Checklist

Wireframe'ini paylaşmadan önce kontrol et:

[CHECKLIST]
✓ Sayfanın amacı net mi?
✓ İçerik hiyerarşisi doğru mu?
✓ Tüm gerekli elementler var mı?
✓ Navigasyon mantıklı mı?
✓ Primary aksiyon öne çıkıyor mu?
✓ Mobile düşünüldü mü?
✓ Placeholder içerik yeterli mi?
✓ Eksik durum var mı? (empty, error, loading)
✓ Etiketler ve notlar eklendi mi?
[/CHECKLIST]

---

## Ne Zaman Wireframe Atlanabilir?

Her projede wireframe şart değil. Atlayabileceğin durumlar:

- Çok küçük değişiklikler (buton rengi, metin değişikliği)
- Mevcut design system'dan direkt uygulama
- Daha önce yapılmış benzer sayfa
- Çok sıkı deadline ve validate edilmiş konsept

[WARNING]
⚠️ Yeni sayfa, yeni akış veya karmaşık özellik tasarlıyorsan, wireframe atlama. Sonra pişman olursun.
[/WARNING]

---

## Wireframe Sunumu

Wireframe'i stakeholder'lara sunarken dikkat et:

**Yapılması gerekenler:**
- Bağlamı anlat: "Bu sayfa şu amaçla tasarlandı"
- Akışı göster: "Kullanıcı buradan buraya gidiyor"
- Feedback iste: "Yapı hakkında ne düşünüyorsunuz?"
- Görsel olmadığını vurgula: "Bu final tasarım değil"

**Yapılmaması gerekenler:**
- Renk/font tartışmasına girme
- Her detayı açıklama
- Tek seçenek sunma
- Feedback olmadan geçme

---

[EXERCISE]
## Şimdi Sen Dene

**25 dakika**

**Görev:** Bir blog yazısı sayfası için mid-fidelity wireframe çiz.

**Gereksinimler:**
- Header (logo, navigation)
- Yazı başlığı ve meta bilgiler (yazar, tarih, okuma süresi)
- Yazı içeriği alanı
- Yazar hakkında bölüm
- İlgili yazılar
- Footer

**Adımlar:**

1. Kalem kağıtla veya Figma'da 5 dakika içinde low-fi sketch çiz

2. Sketch'i düzenle, mid-fi wireframe'e dönüştür

3. Şu kontrolleri yap:
   - Görsel hiyerarşi net mi?
   - Primary içerik (yazı) öne çıkıyor mu?
   - Mobile'da nasıl görünür?

**Bonus:** 2 farklı layout alternatifi çiz ve karşılaştır.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Wireframe, dijital ürünün düşük sadakatli yapısal taslağıdır
- Renk ve görsel detay içermez, yapıya odaklanır
- Hızlı iterasyon, erken feedback ve ekip hizalaması sağlar
- Low, mid ve high-fidelity seviyeleri vardır; çoğu projede mid-fi yeterli
- Figma, Balsamiq, Whimsical gibi araçlarla veya kalem kağıtla çizilebilir
- Mockup'tan önce gelir, prototype'tan farklıdır (statik vs etkileşimli)
- Yeni sayfa veya karmaşık özellik tasarlıyorsan wireframe atlanmamalı
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [UX ve UI Arasındaki Fark](/kutuphane/ux-ui-farki)

**Sonraki:** [Prototype Nedir?](/kutuphane/prototype-nedir)

**İlgili konular:**
- [User Flow ve Task Flow](/kutuphane/user-flow-task-flow)
- Wireframe vs Mockup vs Prototype *(yakında)*

**İlgili Roadmap:** [UX Designer Roadmap → Tasarım Çıktıları](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [Wireframing - Usability.gov](https://www.usability.gov/how-to-and-tools/methods/wireframing.html) (İngilizce, 6 dk)
- [What is a Wireframe? - IxDF](https://www.interaction-design.org/literature/topics/wireframing) (İngilizce, 8 dk)
- [The Guide to Wireframing - UXPin](https://www.uxpin.com/studio/blog/what-is-a-wireframe-designing-your-ux-backbone/) (İngilizce, 10 dk)
`,
  },
  "persona-olusturma": {
    id: "persona-olusturma",
    title: "Persona Oluşturma Rehberi",
    subtitle: "Kullanıcılarını Somutlaştırmanın Yolu",
    titleEn: "Creating Personas",
    slug: "persona-olusturma",
    description: "Persona nedir, nasıl oluşturulur? Kullanıcı araştırmasından persona çıkarma, persona şablonu ve kullanım rehberi. Örneklerle adım adım anlatım.",
    category: "ux-research",
    readingTime: 13,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# Persona Oluşturma Rehberi: Kullanıcılarını Somutlaştır

**Seviye:** Başlangıç  
**Kategori:** UX Research  
**Son güncelleme:** Ocak 2025

---

## Giriş

"Kullanıcılarımız kim?" sorusuna "herkes" cevabını veriyorsan, aslında kimseyi hedeflemiyorsun demektir.

Tasarım yaparken kafanda somut bir kullanıcı olması gerekir. 35 yaşında, İstanbul'da yaşayan, iki çocuklu, zamanı kısıtlı bir anne mi? Yoksa 24 yaşında, yeni mezun, ilk işini arayan, teknolojiye meraklı biri mi?

İkisi için aynı ürünü aynı şekilde tasarlayamazsın.

**Persona**, kullanıcılarını somutlaştırmanın yolu. Gerçek araştırmaya dayanan, ama kurgusal bir karakter. Tasarım kararlarında "Bu özellik Ayşe'nin işine yarar mı?" diye sorabilirsin.

Bu yazıda persona'nın ne olduğunu, nasıl oluşturulacağını ve etkili kullanımını öğreneceksin.

---

## Persona Nedir?

[CALLOUT]
**Persona:**
Hedef kullanıcı grubunu temsil eden, araştırma verilerine dayanan kurgusal karakter profili. Demografik bilgiler, davranışlar, hedefler, motivasyonlar ve sorunları içerir.
[/CALLOUT]

Persona gerçek bir kişi değil. Ama gerçek kullanıcılardan toplanan verilerin sentezi. Bir ismi, yüzü, hikayesi var. Bu sayede soyut "kullanıcı" kavramı somutlaşıyor.

**Persona şu DEĞİLDİR:**

- Demografik segment (25-34 yaş kadınlar)
- Pazar araştırması profili
- Gerçek bir müşteri
- Varsayıma dayalı tahmin

---

## Neden Persona Oluşturulur?

### 1. Empati kurmayı sağlar

"Kullanıcı" soyut bir kavram. "Elif, 32 yaşında, çalışan anne, sabah koşuşturmacasında 2 dakikada sipariş vermek istiyor" somut bir insan. İkincisiyle empati kurmak çok daha kolay.

### 2. Odak sağlar

Persona olmadan herkes kendi kafasındaki kullanıcıyı hayal eder. Persona, ekibin aynı kullanıcıyı düşünmesini sağlar.

### 3. "Herkes için" tuzağından kaçındırır

Her özellik herkese hitap edemez. Persona, kimin için tasarladığını netleştirir. "Bu özellik Elif için mi, Ahmet için mi?"

### 4. Karar vermeyi kolaylaştırır

Tasarım tartışmalarında "Kullanıcı bunu ister mi?" yerine "Elif bunu kullanır mı?" diye sorarsın. Daha somut, daha kolay.

### 5. Stakeholder iletişimini güçlendirir

PM'e veya CEO'ya "kullanıcılar" demek yerine "Elif" demek, mesajı daha etkili iletir.

[INFO]
2-4 persona
Çoğu proje için ideal sayı. Daha fazlası odağı dağıtır.
[/INFO]

---

## Persona Türleri

### Primary Persona (Ana Persona)

En önemli hedef kullanıcı. Tasarım öncelikle bu kişi için yapılır.

### Secondary Persona (İkincil Persona)

Önemli ama birincil olmayan kullanıcı grupları. Primary persona'nın ihtiyaçları karşılandıktan sonra düşünülür.

### Negative Persona (Anti-Persona)

Hedeflemediğin kullanıcı. "Bu ürün bu kişi için değil" demek de önemli.

### Proto-Persona

Araştırma öncesi varsayımlara dayanan geçici persona. Araştırma sonrası gerçek personalarla değiştirilir.

[TABLE]
| Tür | Veri Kaynağı | Kullanım |
|-----|--------------|----------|
| **Primary** | Araştırma | Ana tasarım hedefi |
| **Secondary** | Araştırma | İkincil özellikler |
| **Negative** | Araştırma + iş kararı | Kapsam dışı tanımı |
| **Proto** | Varsayım | Araştırma planlaması |
[/TABLE]

---

## Persona Nasıl Oluşturulur?

### Adım 1: Veri Topla

Persona araştırmaya dayanmalı. Veri kaynakları:

**Birincil kaynaklar (en değerli):**
- Kullanıcı görüşmeleri
- Gözlem (contextual inquiry)
- Anketler
- Kullanılabilirlik testleri

**İkincil kaynaklar:**
- Analitik veriler
- Müşteri destek kayıtları
- Satış ekibi feedback'i
- Sosyal medya yorumları
- Sektör araştırmaları

[TIP]
💡 İdeal: 5-10 kullanıcı görüşmesi + analitik veri. Minimum: Mevcut veriler + stakeholder görüşmeleri. Sıfır veriyle persona oluşturma.
[/TIP]

### Adım 2: Paternleri Bul

Topladığın verilerde tekrar eden kalıpları ara:

- Benzer hedefler
- Benzer sorunlar
- Benzer davranışlar
- Benzer motivasyonlar

Bu kalıplar, persona gruplarını oluşturur.

**Örnek paternler:**
- "Zamanı kısıtlı, hızlı çözüm arıyor" → Grup A
- "Detaylı araştırma yapıyor, karşılaştırıyor" → Grup B
- "Fiyat odaklı, indirim bekliyor" → Grup C

### Adım 3: Grupları Tanımla

Her pattern grubu için karakteristikleri listele:

- Kim bunlar? (demografik)
- Ne istiyorlar? (hedefler)
- Neden istiyorlar? (motivasyonlar)
- Ne engel oluyor? (sorunlar)
- Nasıl davranıyorlar? (davranışlar)

### Adım 4: Personayı Oluştur

Her grup için bir persona karakteri yarat:

[STEPS]
1. İsim ve fotoğraf
   Gerçekçi bir isim ve stok fotoğraf. Persona'yı "gerçek" hissettirir.

2. Demografik bilgiler
   Yaş, meslek, lokasyon, eğitim, aile durumu

3. Bio/Arka plan
   1-2 paragraflık hikaye. Kim bu kişi?

4. Hedefler
   Bu kişi ürününle ne başarmak istiyor?

5. Motivasyonlar
   Neden bu hedefe ulaşmak istiyor?

6. Sorunlar (Pain points)
   Şu an ne zorlanıyor? Frustrasyonları ne?

7. Davranışlar
   Ürünü nasıl kullanıyor/kullanır? Alışkanlıkları ne?

8. Araçlar ve teknoloji
   Hangi cihazları, uygulamaları kullanıyor?

9. Alıntı
   Persona'yı özetleyen tek bir cümle, kendi ağzından.
[/STEPS]

### Adım 5: Doğrula ve Rafine Et

Oluşturduğun personaları ekiple paylaş:
- Araştırma verilerini yansıtıyor mu?
- Gerçekçi mi?
- Tasarım kararlarında kullanılabilir mi?

---

## Persona Şablonu

Bir persona kartı şu bilgileri içermeli:

┌─────────────────────────────────────────────────────────────┐
│ [FOTOĞRAF]                                                  │
│                                                             │
│ İSİM: Elif Yılmaz                                          │
│ YAŞ: 32                                                     │
│ MESLEK: Pazarlama Müdürü                                   │
│ LOKASYON: İstanbul, Kadıköy                                │
│ AİLE: Evli, 1 çocuk (4 yaş)                                │
│                                                             │
│ ALINTI:                                                     │
│ "Zamanım çok kısıtlı, her şeyin hızlı ve kolay olmasını    │
│ istiyorum."                                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ BIO:                                                        │
│ Elif, büyük bir FMCG şirketinde pazarlama müdürü olarak    │
│ çalışıyor. Sabah 7'de evden çıkıp akşam 7'de dönüyor.      │
│ Hafta içi alışveriş için zaman bulamıyor, çoğu işini       │
│ mobil üzerinden, yolda veya öğle arasında hallediyor.      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ HEDEFLER:                              │ SORUNLAR:          │
│ • Hızlı alışveriş yapmak               │ • Zaman yetersiz   │
│ • Güvenilir ürün bulmak                │ • Çok seçenek var  │
│ • Zamandan tasarruf                    │ • Karşılaştırma zor│
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ MOTİVASYONLAR:                         │ DAVRANIŞLAR:       │
│ • Ailesine zaman ayırmak              │ • Mobil öncelikli  │
│ • İşte başarılı olmak                 │ • Favorilere ekler │
│ • Stresi azaltmak                     │ • Yorumlara bakar  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ARAÇLAR: iPhone 14, Instagram, LinkedIn, WhatsApp          │
│ TERCİH ETTİĞİ KANALLAR: Mobil app, push notification       │
└─────────────────────────────────────────────────────────────┘

---

## Persona Örneği

### Primary Persona: Elif Yılmaz

**Demografik:**
- 32 yaşında, kadın
- Pazarlama Müdürü, FMCG sektörü
- İstanbul, Kadıköy'da yaşıyor
- Evli, 4 yaşında bir kızı var
- Üniversite mezunu

**Alıntı:**
> "Zamanım çok kısıtlı. Alışveriş yapmak için mağaza mağaza gezemiyorum. Her şeyin hızlı ve kolay olmasını istiyorum."

**Bio:**
Elif, kariyerine odaklı ama aynı zamanda iyi bir anne olmak isteyen bir profesyonel. Haftada 50+ saat çalışıyor. Sabah koşuşturmacası, akşam ev işleri derken kendine ve alışverişe vakit ayıramıyor. Çoğu alışverişini telefonundan, metro'da veya öğle arasında yapıyor.

**Hedefler:**
- Minimum zamanla alışverişi tamamlamak
- Güvenilir, kaliteli ürünler bulmak
- Ailesinin ihtiyaçlarını aksatmamak

**Sorunlar (Pain Points):**
- Çok fazla seçenek, karar vermek zor
- Ürün karşılaştırması zahmetli
- Teslimat zamanı belirsiz
- Mobil deneyimler genelde kötü

**Davranışlar:**
- Sabah metro'da uygulamaları kontrol eder
- Favorilere ekleyip sonra satın alır
- Yorumlara ve puanlara güvenir
- Hızlı checkout tercih eder, misafir kullanıcı olmayı sever

**Teknoloji:**
- iPhone 14 Pro
- Günlük uygulamalar: Instagram, LinkedIn, WhatsApp, Netflix
- E-ticaret: Trendyol, Hepsiburada, Amazon

---

## Persona Kullanımı

Persona oluşturdun. Şimdi ne yapacaksın?

### Tasarım kararlarında

[COMPARISON]
❌ "Kullanıcılar bu özelliği ister mi?"
✅ "Elif bu özelliği kullanır mı? Onun sorununu çözer mi?"
[/COMPARISON]

### User story yazarken
Elif olarak,
Hızlıca sepetime ürün ekleyebilmek istiyorum,
Böylece metro'da kısa sürede alışverişimi tamamlayabilirim.

### Önceliklendirmede

"Bu özellik Elif için mi Ahmet için mi?" sorusu, önceliklendirmeye yardımcı olur. Primary persona'nın ihtiyaçları önce gelir.

### Stakeholder sunumlarında

"Kullanıcılarımız hızlı checkout istiyor" yerine "Elif, sabah metro'da 2 dakikada sipariş vermek istiyor ama şu an 5 adım geçmesi gerekiyor" demek daha etkili.

### Kullanılabilirlik testlerinde

Test senaryolarını persona'ya göre yaz. "Elif olarak bu görevi tamamla."

---

## Sık Yapılan Hatalar

### 1. Araştırma olmadan persona oluşturmak

[COMPARISON]
❌ Hata: "Bence kullanıcılarımız böyle" deyip persona yazmak
✅ Doğrusu: En az mevcut veriler ve stakeholder görüşmeleriyle desteklemek
[/COMPARISON]

Varsayıma dayanan persona, yanlış yönlendirebilir.

### 2. Çok fazla persona oluşturmak

5-6-7 persona odağı dağıtır. 2-4 persona yeterli. Daha fazlası gerekiyorsa, ürün kapsamı çok geniş olabilir.

### 3. Demografiye takılmak

Yaş, cinsiyet, lokasyon önemli ama yeterli değil. Asıl önemli olan: hedefler, motivasyonlar, davranışlar, sorunlar.

### 4. Persona'yı bir kez yapıp unutmak

Persona yaşayan bir döküman. Yeni araştırmalarla güncellenmeli, tasarım sürecinde aktif kullanılmalı.

### 5. Gerçekçi olmayan persona

"35 yaşında, 3 dil bilen, maratona hazırlanan, startup kuran, 2 çocuklu CEO" gerçekçi değil. Ortalama kullanıcıyı yansıt.

### 6. Personayı kutuda bırakmak

En büyük hata: Persona oluşturup kimseyle paylaşmamak, kararlarda kullanmamak. Persona duvar süsü değil, araç.

---

## Persona vs Diğer Araçlar

### Persona vs Segment

| Segment | Persona |
|---------|---------|
| Demografik gruplandırma | Karakter profili |
| "25-34 yaş kadınlar" | "Elif, 32, çalışan anne" |
| Pazarlama odaklı | Tasarım odaklı |
| Nicel | Nitel |

### Persona vs User Journey Map

Persona kim olduğunu söyler, journey map ne yaptığını gösterir. İkisi birbirini tamamlar.

### Persona vs Empathy Map

Empathy map, persona'nın bir bölümü gibidir. Tek bir kullanıcının düşüncelerini, duygularını, söylediklerini ve yaptıklarını haritalandırır.

---

## Ne Zaman Persona Oluşturulmalı?

**Kesinlikle oluştur:**
- Yeni ürün tasarımı
- Büyük redesign
- Yeni pazara giriş
- Ekip içi hizalama sorunu varsa

**İsteğe bağlı:**
- Küçük özellik güncellemeleri
- Mevcut persona hâlâ geçerliyse
- Çok sıkı deadline

[WARNING]
⚠️ Proto-persona ile başlamak, hiç persona olmamaktan iyidir. Sonra araştırmayla doğrula ve güncelle.
[/WARNING]

---

[EXERCISE]
## Şimdi Sen Dene

**30 dakika**

**Görev:** Bir fitness uygulaması için proto-persona oluştur.

**Senaryo:** Evde egzersiz yapmak isteyen kullanıcılar için mobil fitness uygulaması tasarlıyorsun.

**Adımlar:**

1. **Kullanıcı tipi belirle**
   - Yeni başlayan mı, deneyimli mi?
   - Motivasyonu ne? (kilo vermek, kas yapmak, sağlık)
   - Ne kadar zamanı var?

2. **Persona kartı oluştur:**
   - İsim ve yaş
   - Meslek
   - 2-3 cümlelik bio
   - 3 hedef
   - 3 sorun (pain point)
   - 1 alıntı

3. **Kontrol soruları:**
   - Bu persona gerçekçi mi?
   - Tasarım kararlarında kullanabilir misin?
   - "Bu özellik [persona adı] için uygun mu?" sorusunu sorabilir misin?

**Bonus:** İkinci bir persona oluştur (farklı kullanıcı tipi) ve ikisini karşılaştır.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Persona, hedef kullanıcıyı temsil eden araştırmaya dayalı kurgusal karakterdir
- Empati kurmayı, odaklanmayı ve karar vermeyi kolaylaştırır
- 2-4 persona çoğu proje için yeterli (1 primary + 1-3 secondary)
- Demografiden çok hedefler, motivasyonlar ve sorunlar önemli
- Araştırma verisine dayanmalı, varsayımla oluşturulmamalı
- Oluşturup kutuda bırakma, aktif kullan ve güncelle
- Proto-persona ile başlamak, hiç olmamasından iyidir
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Wireframe Nedir?](/kutuphane/wireframe-nedir)

**Sonraki:** [UX Mülakat Soruları ve Cevapları](/kutuphane/ux-mulakat-sorulari)

**İlgili konular:**
- [Kullanıcı Görüşmesi Nasıl Yapılır?](/kutuphane/kullanici-gorusmesi)
- Empathy Map Oluşturma *(yakında)*
- User Journey Map Oluşturma *(yakında)*

**İlgili Roadmap:** [UX Designer Roadmap → Research](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [Personas - NNGroup](https://www.nngroup.com/articles/persona/) (İngilizce, 8 dk)
- [Personas - IxDF](https://www.interaction-design.org/literature/topics/personas) (İngilizce, 10 dk)
- [Just Enough Research - Erika Hall](https://abookapart.com/products/just-enough-research) (Kitap, araştırma temelleri)
`,
  },
  "ux-mulakat-sorulari": {
    id: "ux-mulakat-sorulari",
    title: "UX Mülakat Soruları ve Cevapları",
    subtitle: "İş Görüşmesine Hazırlık Rehberi",
    titleEn: "UX Interview Questions",
    slug: "ux-mulakat-sorulari",
    description: "UX Designer iş görüşmesinde en çok sorulan sorular ve nasıl cevaplanır? Davranışsal, teknik ve case study soruları için hazırlık rehberi.",
    category: "kariyer",
    readingTime: 16,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# UX Mülakat Soruları ve Cevapları: İş Görüşmesine Hazırlık Rehberi

**Seviye:** Başlangıç - Orta  
**Kategori:** Kariyer  
**Son güncelleme:** Ocak 2025

---

## Giriş

CV'ni gönderdin, portfolyonu inclediler, seni mülakata çağırdılar. Şimdi gerçek sınav başlıyor.

UX mülakatları diğer mesleklere göre biraz farklı. Sadece "kendinden bahset" ve "neden bu şirketi istiyorsun" yok. Tasarım sürecini anlatman, problem çözme becerinizi göstermen, hatta canlı olarak bir challenge çözmen istenebilir.

Hazırlıksız yakalanmak, iyi bir pozisyonu kaçırmana neden olabilir. Ama iyi hazırlandığında, mülakat seni öne çıkarma fırsatı olur.

Bu yazıda UX mülakatlarında en çok sorulan soruları, nasıl cevaplaman gerektiğini ve hazırlık ipuçlarını bulacaksın.

---

## Mülakat Türleri

UX mülakatları genellikle birkaç turdan oluşur:

### 1. HR/Recruiter Görüşmesi

İlk eleme. Genel sorular, maaş beklentisi, uygunluk.

**Süre:** 15-30 dakika
**Format:** Telefon veya video

### 2. Hiring Manager Görüşmesi

Portföy incelemesi, deneyim soruları, takım uyumu.

**Süre:** 45-60 dakika
**Format:** Video veya yüz yüze

### 3. Teknik/Portfolio Sunumu

Derinlemesine proje anlatımı, süreç soruları.

**Süre:** 45-60 dakika
**Format:** Sunum + Q&A

### 4. Whiteboard/Design Challenge

Canlı problem çözme. Yerinde tasarım.

**Süre:** 60-90 dakika
**Format:** Yüz yüze veya video (FigJam/Miro)

### 5. Takım Görüşmesi

Potansiyel iş arkadaşlarıyla tanışma, kültür uyumu.

**Süre:** 30-45 dakika
**Format:** Yüz yüze veya video

[TIP]
💡 Her şirketin süreci farklı. Başvurduğun şirketin mülakat sürecini önceden araştır. Glassdoor ve LinkedIn'de eski adayların deneyimlerini bulabilirsin.
[/TIP]

---

## STAR Metodu

Davranışsal soruları cevaplamak için en etkili yöntem: **STAR**

[CALLOUT]
**STAR Metodu:**
- **S**ituation (Durum): Ne oluyordu? Bağlam ne?
- **T**ask (Görev): Senin rolün/sorumluluğun ne?
- **A**ction (Aksiyon): Ne yaptın? Nasıl yaptın?
- **R**esult (Sonuç): Ne oldu? Sonuç ne?
[/CALLOUT]

**Örnek soru:** "Zor bir stakeholder ile çalıştığın bir durumu anlat."

**STAR ile cevap:**

> **Situation:** "Geçen yıl e-ticaret projemizde pazarlama direktörü her toplantıda tasarım kararlarını değiştirmek istiyordu."
>
> **Task:** "Benim görevim hem iyi bir ilişki kurmak hem de kullanıcı odaklı tasarım kararlarını korumaktı."
>
> **Action:** "Haftalık birebir toplantılar ayarladım. Endişelerini dinledim, araştırma verilerini paylaştım. Her büyük kararı veriyle destekledim."
>
> **Result:** "3 ay sonra en büyük destekçimiz oldu. Hatta CEO'ya UX yatırımını savundu. Proje zamanında tamamlandı ve conversion %18 arttı."

---

## Soru Kategorileri

### Kategori 1: Genel/Tanışma Soruları

İlk izlenim. Kim olduğunu, neden orada olduğunu anlamak için.

---

**Soru: "Kendinden bahseder misin?"**

[COMPARISON]
❌ Kötü cevap: "2018'de üniversiteden mezun oldum, şu şirketlerde çalıştım, şunu yaptım, bunu yaptım..." (özgeçmiş okuma)

✅ İyi cevap: "Son 3 yıldır B2B SaaS ürünlerinde UX tasarımı yapıyorum. En çok kullanıcı araştırması ve karmaşık akışları sadeleştirmek ilgimi çekiyor. Şu anki rolümde checkout akışını yeniledik ve conversion %23 arttı. Sizin [ürün adı]'daki [spesifik özellik] benzer bir zorluk gibi görünüyor, bu yüzden bu pozisyon beni heyecanlandırıyor."
[/COMPARISON]

**İpucu:** 60-90 saniye. Özgeçmiş değil, hikaye anlat. Pozisyonla bağlantı kur.

---

**Soru: "Neden UX Designer oldun / olmak istiyorsun?"**

**Cevap yaklaşımı:**
- Kişisel hikaye (ne tetikledi?)
- Neden bu alan seni çekiyor?
- Hangi yönlerini seviyorsun?

**Örnek:**
> "İlk kullanıcı testimi yaptığımda, kullanıcının 'bu neden böyle çalışıyor?' dediğini gördüm. O an tasarımcıların varsayımlarının ne kadar yanlış olabileceğini anladım. O günden beri kullanıcıyı dinlemek ve onların hayatını kolaylaştırmak benim motivasyonum."

---

**Soru: "Neden bu şirkette çalışmak istiyorsun?"**

[WARNING]
⚠️ "Güzel şirketsiniz" veya "Büyümek istiyorum" gibi genel cevaplardan kaçın. Şirketi araştır, spesifik ol.
[/WARNING]

**Cevap yapısı:**
1. Şirketin ürünü/misyonu hakkında spesifik bir şey
2. Bu rolün senin hedeflerin ile nasıl örtüştüğü
3. Ne katkı sağlayabileceğin

**Örnek:**
> "Ürününüzü 2 yıldır kullanıyorum ve [spesifik özellik] gerçekten iyi tasarlanmış. Ama [şu alan]'da fırsatlar görüyorum. B2B deneyimim bu tür karmaşık akışlarda işe yarar. Ayrıca [şirket blogu/podcast]'ında design system yaklaşımınızı okudum, bu benim de tutkulu olduğum bir alan."

---

### Kategori 2: Süreç ve Teknik Sorular

UX bilgini ve çalışma şeklini anlamak için.

---

**Soru: "Tasarım sürecini anlat."**

En klasik soru. Ezbere "discover, define, design, deliver" deme. Kendi deneyiminle anlat.

**Cevap yapısı:**
1. Genel framework'ü kısaca belirt
2. Bir proje üzerinden somutlaştır
3. Esnek olduğunu göster ("projeye göre değişir")

**Örnek:**
> "Genellikle Double Diamond'a benzer bir süreç izliyorum ama her projeye adapte ediyorum.
>
> Mesela son projemde, önce stakeholder'larla problem alanını netleştirdik. Sonra 6 kullanıcı görüşmesi yaptım. Bulgulardan 2 persona çıkardım. Akışları wireframe'ledim, 3 iterasyon geçtik. Kullanılabilirlik testiyle doğruladık, sonra UI'a geçtik.
>
> Ama deadline sıkıysa veya problem net tanımlıysa, araştırmayı kısaltıp direkt çözüme geçtiğim de oldu. Süreç araç, amaç değil."

---

**Soru: "Kullanıcı araştırması nasıl yaparsın?"**

**Cevap yapısı:**
- Hangi yöntemleri biliyorsun?
- Ne zaman hangisini kullanırsın?
- Örnek ver

**Örnek:**
> "Projenin aşamasına göre farklı yöntemler kullanıyorum.
>
> Keşif aşamasında kullanıcı görüşmeleri ve gözlem tercih ediyorum, derinlemesine anlayış için. Validasyon için kullanılabilirlik testi yapıyorum, genellikle 5-8 kişiyle.
>
> Son projemde, checkout problemini anlamak için önce analitik dataya baktım, hangi adımda terk ediyorlar. Sonra 5 kullanıcıyla görüşüp 'neden' sorusunun cevabını aldım."

---

**Soru: "Wireframe ile mockup arasındaki fark nedir?"**

Temel bilgi sorusu. Net ve kısa cevapla.

**Örnek:**
> "Wireframe düşük sadakatli, yapıyı gösterir - gri kutular, placeholder içerik. Akışı ve yerleşimi doğrulamak için.
>
> Mockup yüksek sadakatli, final görünümü gösterir - gerçek renkler, fontlar, görseller. Görsel tasarımı onaylamak ve developer'a teslim için.
>
> Ben genellikle önce wireframe'le stakeholder onayı alıyorum, böylece görsel detaylarda kaybolmuyoruz."

---

**Soru: "Tasarım kararlarını nasıl savunursun?"**

[COMPARISON]
❌ "Bence bu daha iyi görünüyor"
✅ "Kullanıcı araştırmasında şunu gördük, data şunu söylüyor, bu yüzden bu çözüm daha uygun"
[/COMPARISON]

**Cevap yaklaşımı:**
- Veri ve araştırmayla destekleme
- Alternatifler sunma
- Dinlemeye açık olma

**Örnek:**
> "Tasarım kararlarını her zaman araştırma veya data ile desteklemeye çalışıyorum. 'Şunu düşünüyorum' yerine 'testlerde kullanıcıların %70'i bunu tercih etti' demek çok daha etkili.
>
> Ama her zaman elimde veri olmuyor. O zaman UX prensiplerini referans veriyorum. Ve her zaman 'deneyelim, ölçelim' demeye açığım. Ego yerine sonuca odaklanıyorum."

---

### Kategori 3: Davranışsal Sorular

Geçmiş deneyimlerinden örnekler. STAR metodunu kullan.

---

**Soru: "Zor bir proje anlat. Nasıl üstesinden geldin?"**

**STAR örneği:**

> **S:** "Geçen yıl 2 haftalık deadline'la yeni bir ödeme özelliği tasarlamamız istendi."
>
> **T:** "Normalde 4-6 haftalık bir iş. Benim görevim süreci hızlandırmak ama kaliteden ödün vermemekti."
>
> **A:** "Araştırmayı kısalttım, mevcut müşteri feedback'lerini analiz ettim. Paralel çalıştım - wireframe'lerken UI pattern'leri hazırladım. Günlük 15 dk standup ile stakeholder'ları senkronize tuttum."
>
> **R:** "Zamanında teslim ettik. Lansman sonrası sadece 2 minor bug çıktı. PM, bu yaklaşımı diğer projelere de uyarlamak istedi."

---

**Soru: "Geri bildirimi nasıl alırsın? Zor bir feedback aldığında ne yaparsın?"**

**Cevap yaklaşımı:**
- Feedback'e açık olduğunu göster
- Somut örnek ver
- Ne öğrendiğini söyle

**Örnek:**
> "Feedback almayı severim çünkü körlüklerimi gösterir.
>
> Geçen ay, üzerinde 3 gün çalıştığım bir tasarımı design critique'te tamamen eleştirdiler. İlk an savunmacı oldum içimden. Ama not aldım, sorular sordum, 'neden' diye derinleştirdim.
>
> Sonuçta haklılardı. Kullanıcı perspektifini kaybetmişim, kendi çözümüme aşık olmuşum. Revize ettim, çok daha iyi oldu. O günden beri erken feedback almaya özen gösteriyorum."

---

**Soru: "Ekip içinde anlaşmazlık yaşadığında ne yaparsın?"**

**Örnek:**
> "Anlaşmazlıklar kaçınılmaz ve genellikle faydalı bile.
>
> Bir projede developer 'bu yapılamaz' dedi, ben 'kullanıcı için şart' dedim. Kavga etmek yerine, ikimiz bir saat oturup teknik kısıtları ve kullanıcı ihtiyaçlarını bir arada değerlendirdik.
>
> Ortaya hybrid bir çözüm çıktı - benim orijinal tasarımım kadar ideal değil ama kullanıcı için yeterli ve teknik olarak feasible. Win-win."

---

**Soru: "Bir hata yaptığın zamanı anlat."**

[WARNING]
⚠️ "Hiç hata yapmadım" deme. İnsan değilsin gibi görünür. Ama çok büyük, telafisi olmayan hata da anlatma.
[/WARNING]

**Cevap yapısı:**
- Hata ne?
- Ne yaptın düzeltmek için?
- Ne öğrendin?

**Örnek:**
> "Bir projede araştırma yapmadan direkt wireframe'e geçtim. Deadline vardı, 'zaten biliyorum' dedim.
>
> Sonuç: 2 hafta çalıştım, stakeholder toplantısında kullanıcıların bu özelliği hiç istemediği ortaya çıktı. 2 hafta çöpe gitti.
>
> O günden beri ne kadar kısa olursa olsun, minimum araştırma yapmadan başlamıyorum. 2 saat görüşme, 2 hafta yanlış işten iyidir."

---

### Kategori 4: Case Study / Whiteboard Soruları

Canlı problem çözme. En zorlu kısım.

---

**Soru: "Bir ATM yeniden tasarla" / "Yaşlılar için uygulama tasarla" / "[Şirket ürünündeki] şu sorunu çöz"**

**Yaklaşım:**

[STEPS]
1. Sorular sor (5 dk)
   - Hedef kullanıcı kim?
   - En önemli senaryo ne?
   - Kısıtlar var mı?
   - Başarı nasıl ölçülür?

2. Problemi çerçevele (5 dk)
   - Problemi kendi cümlelerinle özetle
   - Varsayımlarını söyle
   - Kapsamı daralt (her şeyi çözemezsin)

3. Kullanıcıyı tanımla (5 dk)
   - Hızlı proto-persona
   - Temel hedef ve pain point

4. Çözüm geliştir (15-20 dk)
   - Birkaç fikir üret
   - En iyisini seç, neden onu seçtiğini açıkla
   - Kabaca wireframe çiz

5. Sunumunu yap (5 dk)
   - Süreci özetle
   - Varsayımları belirt
   - Sonraki adımları söyle
[/STEPS]

[TIP]
💡 **Kritik:** Sonuç kadar süreç önemli. Düşünce yapını sesli anlat. "Şu an şunu düşünüyorum, çünkü..." Hiring manager senin nasıl düşündüğünü görmek istiyor.
[/TIP]

---

### Kategori 5: Senin Soruların

Mülakat bittiğinde "soruların var mı?" diye sorulur. **Her zaman soru sor.**

**Sorulacak iyi sorular:**

[TABLE]
| Soru | Neden Sor |
|------|-----------|
| "Tasarım ekibinin yapısı nasıl?" | Çalışma ortamını anlamak |
| "Bir UX Designer'ın tipik haftası nasıl geçiyor?" | Gerçek işi anlamak |
| "Bu pozisyondaki en büyük zorluk ne olur?" | Beklentileri anlamak |
| "Tasarım kararları nasıl alınıyor?" | Kültürü anlamak |
| "İlk 90 günde benden ne beklersiniz?" | Başarı kriterlerini anlamak |
| "Design system var mı? Nasıl çalışıyor?" | Olgunluğu anlamak |
[/TABLE]

**Sorulmaması gereken sorular:**
- İlk görüşmede maaş (recruiter aşaması hariç)
- Tatil günleri, yan haklar (teklif aşamasında sor)
- Google'da bulabileceğin şeyler ("Ne iş yapıyorsunuz?")

---

## Junior'lar İçin İpuçları

Deneyim az olduğunda nasıl cevap vereceksin?

### Kişisel projeler kullan

"İş deneyimim yok ama kişisel projemde şunu yaptım..."

### Bootcamp/kurs projeleri

"Kursumda şu challenge'ı çözdüm, sürecim şöyleydi..."

### Redesign projeleri

"Spotify'ın şu özelliğini analiz edip iyileştirme önerisi hazırladım..."

### Transferable skills

Önceki kariyerinden aktarılabilir beceriler: araştırma, sunum, proje yönetimi, müşteri ilişkileri

[COMPARISON]
❌ "Deneyimim yok, bilmiyorum"
✅ "Profesyonel deneyimim sınırlı ama bootcamp projemde 5 kullanıcı görüşmesi yaptım ve şunu öğrendim..."
[/COMPARISON]

---

## Hazırlık Checklist

Mülakata gitmeden önce:

[CHECKLIST]
✓ Portfolyodaki 2-3 projeyi detaylı anlatabiliyorum
✓ Her proje için: problem, süreç, karar, sonuç hazır
✓ STAR metoduyla 5-6 hikaye hazırladım
✓ Şirketi araştırdım (ürün, kültür, son haberler)
✓ Pozisyon ilanını tekrar okudum, gereksinimleri biliyorum
✓ Whiteboard challenge için pratik yaptım
✓ Soracağım 3-5 soru hazırladım
✓ Teknik kurulum test edildi (video görüşmeyse)
✓ Portfolyo linki çalışıyor
✓ 10 dakika erken olacak şekilde plan yaptım
[/CHECKLIST]

---

## Sık Yapılan Hatalar

### 1. Portfolyoyu bilmemek

Kendi projenizi anlatamıyorsanız, kimin projesini anlatacaksınız?

### 2. Sonuç odaklı olmamak

Süreç güzel ama "conversion %20 arttı" veya "kullanıcı memnuniyeti yükseldi" gibi sonuçlar daha etkili.

### 3. Tek başına çalışmış gibi anlatmak

"Ben yaptım, ben tasarladım" yerine "Ekiple birlikte...", "Benim katkım şuydu..."

### 4. Soru sormamak

"Sorum yok" demek ilgisizlik göstergesi.

### 5. Araştırma yapmamak

Şirketi, ürünü, sektörü bilmeden gitmek.

### 6. Ezbere cevap vermek

Hazırlık önemli ama robotik cevaplar itici. Doğal ol.

---

[EXERCISE]
## Şimdi Sen Dene

**45 dakika**

**Görev:** Aşağıdaki 3 soruyu STAR metoduyla cevapla.

**Sorular:**

1. "Kullanıcı araştırmasının tasarım kararını değiştirdiği bir durum anlat."

2. "Deadline baskısı altında nasıl çalışırsın?"

3. "Bir tasarımını eleştirdiler, ne yaptın?"

**Her cevap için:**
- Situation: 2-3 cümle
- Task: 1-2 cümle
- Action: 3-5 cümle (en detaylı kısım)
- Result: 2-3 cümle (mümkünse metrik)

**Bonus:** Cevaplarını sesli oku ve süresini tut. Her cevap 2-3 dakika olmalı.
[/EXERCISE]

---

[SUMMARY]
## Özet

- UX mülakatları: HR → Hiring Manager → Portfolio → Challenge → Takım aşamalarından oluşabilir
- STAR metodu davranışsal sorularda etkili: Situation, Task, Action, Result
- Süreç soruları için kendi deneyiminden somut örnekler ver
- Whiteboard challenge'da sonuç kadar düşünce süreci önemli
- Junior'lar: kişisel projeler, bootcamp, redesign çalışmaları kullanılabilir
- Her zaman soru sor, araştırma yap, portfolyonu bil
- Hazırlık kritik: 2-3 proje, 5-6 STAR hikayesi, şirket araştırması
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Persona Oluşturma Rehberi](/kutuphane/persona-olusturma)

**Sonraki:** [Product Design Nedir?](/kutuphane/product-design-nedir)

**İlgili konular:**
- [Portfolio Case Study Nasıl Yazılır?](/kutuphane/portfolio-case-study)
- Stakeholder'a Tasarım Sunumu *(yakında)*

**İlgili Roadmap:** [UX Designer Roadmap → Kariyer](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [UX Interview Questions - NNGroup](https://www.nngroup.com/articles/ux-interview-questions/) (İngilizce, 10 dk)
- [Cracking the PM Interview - Gayle McDowell](https://www.amazon.com/Cracking-PM-Interview-Product-Technology/dp/0984782818) (Kitap, whiteboard için)
- [Glassdoor UX Designer Interviews](https://www.glassdoor.com/Interview/ux-designer-interview-questions-SRCH_KO0,11.htm) (Şirket bazlı sorular)
`,
  },
  "product-design-nedir": {
    id: "product-design-nedir",
    title: "Product Design Nedir?",
    subtitle: "Ürün Tasarımcısının Rolü ve Sorumlulukları",
    titleEn: "What is Product Design?",
    slug: "product-design-nedir",
    description: "Product Design nedir? Product Designer ne yapar, UX Designer'dan farkı ne? Ürün tasarımcısının rolü, sorumlulukları ve kariyer yolu rehberi.",
    category: "temel-kavramlar",
    readingTime: 12,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# Product Design Nedir? Ürün Tasarımcısının Rolü ve Sorumlulukları

**Seviye:** Başlangıç  
**Kategori:** Temel Kavramlar  
**Son güncelleme:** Ocak 2025

---

## Giriş

İş ilanlarına baktığında "UX Designer", "UI Designer", "Product Designer" title'larını yan yana görüyorsun. Bazen aynı iş için bile farklı isimler kullanılıyor.

Peki Product Designer nedir? UX Designer'dan farkı ne? Neden bazı şirketler "UX/UI Designer" ararken, bazıları "Product Designer" arıyor?

Son yıllarda özellikle startup'lar ve teknoloji şirketlerinde "Product Designer" title'ı giderek popülerleşti. Bunun bir nedeni var: Modern ürün ekipleri, sadece "tasarlayan" değil, "ürünün başarısından sorumlu olan" tasarımcılar istiyor.

Bu yazıda Product Design'ın ne olduğunu, Product Designer'ın ne yaptığını ve bu kariyer yolunun nasıl göründüğünü öğreneceksin.

---

## Product Design Ne Demek?

[CALLOUT]
**Product Design:**
Bir dijital ürünün kullanıcı ihtiyaçlarını karşılayacak ve iş hedeflerini destekleyecek şekilde tasarlanması sürecidir. UX, UI ve ürün stratejisini birleştirir. Sadece "nasıl görünüyor" veya "nasıl çalışıyor" değil, "neden var" ve "başarılı mı" sorularını da kapsar.
[/CALLOUT]

Product Design, tek bir disiplin değil, birden fazla disiplinin kesişimi:
Product Design = UX Design + UI Design + Ürün Stratejisi + İş Anlayışı

Product Designer sadece tasarlamaz. Ürünün neden var olduğunu anlar, kullanıcı ihtiyaçlarını keşfeder, çözümler tasarlar ve bu çözümlerin işe yarayıp yaramadığını ölçer.

---

## Product Designer Ne Yapar?

### Temel Sorumluluklar

[STEPS]
1. Problemi Anlama
   - Kullanıcı araştırması yapma
   - İş hedeflerini anlama
   - Problemin kapsamını belirleme
   - Başarı metriklerini tanımlama

2. Çözüm Geliştirme
   - Fikirler üretme ve değerlendirme
   - User flow ve wireframe oluşturma
   - Prototip hazırlama
   - Görsel tasarım yapma

3. Doğrulama
   - Kullanılabilirlik testi
   - A/B test
   - Metrik takibi
   - İterasyon

4. Teslim ve Takip
   - Developer handoff
   - QA desteği
   - Lansman sonrası izleme
   - Sürekli iyileştirme
[/STEPS]

### Günlük İşler

Bir Product Designer'ın tipik bir haftası:

| Gün | Aktiviteler |
|-----|-------------|
| Pazartesi | Sprint planning, stakeholder toplantısı |
| Salı | Kullanıcı görüşmeleri, araştırma analizi |
| Çarşamba | Wireframing, design critique |
| Perşembe | Visual design, prototipleme |
| Cuma | Kullanılabilirlik testi, retrospektif |

[TIP]
💡 Her gün farklı. Bazen tüm gün araştırma yaparsın, bazen tüm gün Figma'dasın. Bu çeşitlilik Product Design'ın cazip yanlarından biri.
[/TIP]

---

## UX Designer vs Product Designer

En çok karıştırılan konu. İkisi aynı mı, farklı mı?

### Temel Farklar

[TABLE]
| Özellik | UX Designer | Product Designer |
|---------|-------------|------------------|
| **Odak** | Kullanıcı deneyimi | Deneyim + iş hedefleri |
| **Kapsam** | UX (bazen UI) | UX + UI + strateji |
| **Metrikler** | Kullanılabilirlik, NPS | Revenue, retention, conversion |
| **Sahiplik** | Tasarım çıktıları | Ürün başarısı |
| **Strateji** | Input verir | Aktif katılır |
| **İş anlayışı** | Temel | Derinlemesine |
[/TABLE]

### Venn Diyagramı
┌─────────────────────────────────────────────┐
│                                             │
│   UX Design         Product Design          │
│   ┌───────┐         ┌───────────────┐      │
│   │       │         │               │      │
│   │ User  │◄───────►│  UX + UI +    │      │
│   │Research│        │  Strategy +   │      │
│   │ Flows │         │  Business     │      │
│   │ Wire  │         │               │      │
│   │       │         │               │      │
│   └───────┘         └───────────────┘      │
│                                             │
└─────────────────────────────────────────────┘

[COMPARISON]
**UX Designer sorar:** "Kullanıcı bu görevi tamamlayabiliyor mu?"

**Product Designer sorar:** "Kullanıcı bu görevi tamamlayabiliyor mu VE bu iş hedeflerimize ulaşmamıza yardımcı oluyor mu?"
[/COMPARISON]

### Hangisi Daha İyi?

Ne iyi ne kötü - farklılar.

**UX Designer ol:**
- Derin araştırma yapmak istiyorsan
- Kullanıcı psikolojisine ilgi duyuyorsan
- Büyük organizasyonlarda specialized rol istiyorsan

**Product Designer ol:**
- Hem tasarım hem iş tarafını anlamak istiyorsan
- Ürünün başarısında sorumluluk almak istiyorsan
- Startup veya küçük takımlarda çalışmak istiyorsan

---

## Product Designer'ın Becerileri

### Hard Skills

**Tasarım becerileri:**
- Kullanıcı araştırması yöntemleri
- Information architecture
- Wireframing ve prototyping
- Visual/UI design
- Interaction design
- Design systems

**Ürün becerileri:**
- Ürün metrikleri anlayışı
- A/B testing
- Analitik araçları (Mixpanel, Amplitude)
- Temel SQL/data anlayışı
- Roadmap okuyabilme

**Araçlar:**
- Figma (tasarım + prototip)
- FigJam/Miro (işbirliği)
- Maze/UserTesting (araştırma)
- Notion/Confluence (dokümantasyon)
- Jira/Linear (proje yönetimi)

### Soft Skills

[TABLE]
| Beceri | Neden Önemli |
|--------|--------------|
| **İletişim** | Fikirleri satmak, stakeholder yönetimi |
| **Empati** | Kullanıcıyı ve ekibi anlamak |
| **Problem çözme** | Karmaşık sorunları parçalamak |
| **İş birliği** | Cross-functional çalışma |
| **Stratejik düşünme** | Büyük resmi görmek |
| **Esneklik** | Belirsizlikle başa çıkmak |
[/TABLE]

---

## Product Designer Nasıl Çalışır?

### Ürün Üçgeni

Product Designer, üç ana grupla sürekli etkileşim halinde:
          Product Manager
                ▲
               /│\\
              / │ \\
             /  │  \\
            /   │   \\
           /    │    \\
          /     │     \\
         /      │      \\
        ▼───────┼───────▼
Engineer        │        Data/Research
                │
          Product Designer
          (merkezde)

### PM ile İlişki

| PM | Product Designer |
|----|------------------|
| "Ne" ve "Neden" | "Nasıl" |
| Roadmap | Tasarım |
| Business case | User case |
| Önceliklendirme | Çözüm detayı |

**İdeal ilişki:** Ortaklık. PM problem getirir, birlikte çözüm bulursunuz.

### Engineer ile İlişki

- Erken dahil et (feasibility)
- Teknik kısıtları anla
- Handoff'u kolaylaştır
- Edge case'leri birlikte çöz

### Stakeholder ile İlişki

- Düzenli güncelleme
- Veriyle konuş
- Feedback loop kur
- "Hayır" demeyi öğren (nazikçe)

---

## Product Design Süreci

Her şirketin süreci farklı olsa da, genel çerçeve:

### 1. Discover (Keşfet)

**Aktiviteler:**
- Problem statement oluşturma
- Kullanıcı araştırması
- Competitive analysis
- Data analizi
- Stakeholder görüşmeleri

**Çıktılar:**
- Araştırma bulguları
- Opportunity areas
- Problem tanımı

### 2. Define (Tanımla)

**Aktiviteler:**
- Persona oluşturma
- User journey mapping
- Başarı metrikleri belirleme
- Scope belirleme

**Çıktılar:**
- Persona
- Journey map
- Success metrics
- Design brief

### 3. Design (Tasarla)

**Aktiviteler:**
- Ideation (beyin fırtınası)
- Sketching
- Wireframing
- Visual design
- Prototyping

**Çıktılar:**
- Wireframes
- High-fi mockups
- Interactive prototype
- Design specs

### 4. Deliver (Teslim Et)

**Aktiviteler:**
- Usability testing
- İterasyon
- Developer handoff
- QA support

**Çıktılar:**
- Final tasarımlar
- Dev documentation
- Test sonuçları

### 5. Measure (Ölç)

**Aktiviteler:**
- Lansman sonrası takip
- Metrik analizi
- Kullanıcı feedback toplama
- İyileştirme önerileri

**Çıktılar:**
- Performance raporu
- Learning document
- Next iteration plan

[CALLOUT]
**Süreç lineer değil.**
Gerçek hayatta bu adımlar iç içe geçer, geri dönersin, atlar devam edersin. Önemli olan amacı unutmamak: Kullanıcı + iş için değer yaratmak.
[/CALLOUT]

---

## Product Designer Olmak

### Kariyer Yolları

**1. UX Designer'dan geçiş:**
En yaygın yol. UX temeli var, iş/strateji tarafını eklersin.

**2. UI Designer'dan geçiş:**
Görsel güçlü, UX ve strateji öğrenirsin.

**3. Grafik tasarımdan geçiş:**
Visual background var, dijital ürün ve UX öğrenirsin.

**4. Farklı kariyerden geçiş:**
PM, developer, pazarlama... Transferable skills + tasarım öğrenme.

### Seviyeler

[TABLE]
| Seviye | Deneyim | Sorumluluk |
|--------|---------|------------|
| **Junior** | 0-2 yıl | Yönlendirme altında çalışma, tek özellikler |
| **Mid** | 2-5 yıl | Bağımsız proje yönetimi, mentörlük |
| **Senior** | 5-8 yıl | Karmaşık projeler, strateji input, liderlik |
| **Staff/Principal** | 8+ yıl | Çoklu proje, organizasyonel etki |
| **Design Manager** | Değişken | İnsan yönetimi, takım liderliği |
[/TABLE]

### Maaş Beklentisi (Türkiye, 2025)

[WARNING]
⚠️ Maaşlar şirkete, sektöre ve lokasyona göre değişir. Bunlar ortalama tahminlerdir.
[/WARNING]

| Seviye | Aylık Net (TL) |
|--------|----------------|
| Junior | 35.000 - 55.000 |
| Mid | 55.000 - 90.000 |
| Senior | 90.000 - 150.000 |
| Lead/Principal | 150.000+ |

Remote/global şirketlerde USD maaşlar çok daha yüksek olabilir.

---

## Product Design'ın Geleceği

### Trendler

**AI ve tasarım:**
- AI-assisted design tools
- Generative UI
- Personalization at scale

**Specialization vs Generalization:**
- Bazı şirketler specialist istiyor (UX Researcher, UI Designer)
- Bazıları generalist istiyor (Product Designer)
- "T-shaped" designer: Geniş bilgi + derin uzmanlık

**Business acumen önemi artıyor:**
- Tasarımcıların iş metrikleri anlaması bekleniyor
- "Seat at the table" için strateji bilgisi şart

**Design systems maturity:**
- Daha fazla şirket design system kuruyor
- System thinking önemli beceri

---

## Sık Yapılan Yanlış Anlamalar

### "Product Designer = UX/UI Designer"

Kısmen doğru ama eksik. Product Designer aynı zamanda strateji ve iş tarafıyla ilgilenir.

### "Product Designer her şeyi yapar"

Hayır. Araştırma, görsel tasarım, strateji - hepsinde iyidir ama her birinde uzman olmak zorunda değil. T-shaped olmak önemli.

### "Product Design sadece startup'larda var"

Hayır. Enterprise şirketler de Product Designer title'ı kullanıyor. Fark şirket kültüründe.

### "Product Designer kod bilmeli"

Kod bilmek faydalı ama zorunlu değil. Teknik anlayış (feasibility, constraints) yeterli.

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Bir ürün problemini Product Designer gözüyle analiz et.

**Senaryo:** Bir yemek siparişi uygulamasında kullanıcıların %40'ı sepete ürün ekliyor ama siparişi tamamlamıyor.

**Adımlar:**

1. **Problem tanımı yaz** (2-3 cümle)
   - Ne oluyor?
   - Neden önemli? (iş etkisi)

2. **Araştırma planı oluştur**
   - Hangi verilere bakarsın?
   - Kiminle konuşursun?
   - Hangi sorular sorarsın?

3. **Olası nedenler listele** (en az 5)
   - Kullanıcı perspektifinden

4. **Başarı metrikleri belirle**
   - Bu problemi çözdüğünü nasıl anlarsın?

5. **Bir çözüm önerisi yaz**
   - Kısa açıklama
   - Neden bu çözüm?

**Bu egzersiz, Product Designer'ın problem-çözüm yaklaşımını pratiğe döker.**
[/EXERCISE]

---

[SUMMARY]
## Özet

- Product Design, UX + UI + strateji + iş anlayışının birleşimidir
- Product Designer sadece tasarlamaz, ürünün başarısından sorumluluk alır
- UX Designer deneyime odaklanır, Product Designer deneyim + iş hedeflerine
- PM, Engineer ve stakeholder'larla yakın çalışır
- Discover → Define → Design → Deliver → Measure süreci izlenir
- T-shaped beceriler: Geniş bilgi + bir alanda derinlik
- İş metrikleri anlayışı giderek daha önemli
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [UX Mülakat Soruları](/kutuphane/ux-mulakat-sorulari)

**Sonraki:** [Prototype Nedir?](/kutuphane/prototype-nedir)

**İlgili konular:**
- [UX Nedir?](/kutuphane/ux-nedir)
- [UI Nedir?](/kutuphane/ui-nedir)
- [UX ve UI Arasındaki Fark](/kutuphane/ux-ui-farki)

**İlgili Roadmap:** Product Designer Roadmap

---

## Kaynaklar

Derinleşmek istersen:

- [What is Product Design? - IDEO](https://www.ideou.com/pages/product-design) (İngilizce, 8 dk)
- [Product Design vs UX Design - NNGroup](https://www.nngroup.com/articles/product-design-vs-ux-design/) (İngilizce, 6 dk)
- [Inspired - Marty Cagan](https://www.svpg.com/inspired-how-to-create-products-customers-love/) (Kitap, ürün yönetimi klasiği)
`,
  },
  "prototype-nedir": {
    id: "prototype-nedir",
    title: "Prototype Nedir?",
    subtitle: "Etkileşimli Tasarım Taslakları Oluşturma Rehberi",
    titleEn: "What is Prototype?",
    slug: "prototype-nedir",
    description: "Prototype nedir, ne işe yarar? Prototip nasıl oluşturulur, hangi araçlar kullanılır? Low-fi'dan high-fi'ya prototipleme rehberi.",
    category: "ux-design",
    readingTime: 12,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# Prototype Nedir? Etkileşimli Tasarım Taslakları Oluşturma Rehberi

**Seviye:** Başlangıç  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

Statik tasarımlar her şeyi anlatamaz.

Wireframe'ler ve mockup'lar "nasıl görüneceğini" gösterir ama "nasıl hissettireceğini" gösteremez. Bir butona tıkladığında ne olacak? Sayfa nasıl geçiş yapacak? Form gönderildiğinde kullanıcı ne görecek?

İşte burada **prototype** devreye girer.

Prototip, tasarımının çalışan bir simülasyonu. Gerçek kod yok ama gerçek gibi hissettiriyor. Tıklıyorsun, geçiş oluyor, animasyon çalışıyor. Kullanıcılar sanki gerçek ürünü kullanıyormuş gibi test edebiliyor.

Bu yazıda prototype'ın ne olduğunu, neden önemli olduğunu ve nasıl oluşturulacağını öğreneceksin.

---

## Prototype Ne Demek?

[CALLOUT]
**Prototype (Prototip):**
Bir ürün veya özelliğin etkileşimli simülasyonu. Kod yazmadan, tasarımın nasıl çalışacağını deneyimlemeyi sağlar. Tıklanabilir, gezinilebilir ve test edilebilir tasarım taslağı.
[/CALLOUT]

"Proto" (ilk) + "type" (örnek) = İlk örnek, taslak.

Prototip, final ürün değil. Bir deney aracı. Fikirleri test etmek, geri bildirim almak ve sorunları erken yakalamak için kullanılır.

---

## Prototip Ne İşe Yarar?

### 1. Fikirleri test etme

Bir fikrin işe yarayıp yaramayacağını anlamanın en hızlı yolu, prototip yapıp denemek. Kod yazmak haftalar alır, prototip saatler.

### 2. Kullanılabilirlik testi

Gerçek kullanıcılarla test yapmak için gerçek ürün gerekmiyor. Prototip yeterli. "Bu butonu bul ve tıkla" görevi prototiple yapılabilir.

### 3. Stakeholder sunumu

"Şöyle çalışacak" demek yerine, "buyurun deneyin" demek çok daha etkili. Prototip, fikirleri satmanın en iyi yolu.

### 4. Developer iletişimi

Statik tasarım + prototip kombinasyonu, developer'a "nasıl çalışmalı" sorusunun cevabını verir. Animasyonlar, geçişler, etkileşimler netleşir.

### 5. Erken hata tespiti

Bir akış sorunu var mı? Kullanıcı kaybolur mu? Prototipte görmek, geliştirme sonrası görmekten 10 kat ucuz.

[INFO]
100x daha ucuz
Geliştirme sonrası hata düzeltmek, tasarım aşamasında düzeltmekten 100 kat daha maliyetli
[/INFO]

---

## Prototip Türleri

Prototipler sadakat seviyesine (fidelity) göre ayrılır:

### Low-Fidelity Prototype

En basit hali. Hızlı, kaba, konsept doğrulama için.

**Özellikleri:**
- Kağıt veya basit dijital
- Görsel detay yok
- Temel tıklama/geçiş
- Dakikalar/saatler içinde yapılır

**Ne zaman kullanılır:**
- İlk fikirler
- Konsept doğrulama
- Beyin fırtınası sonrası

### Mid-Fidelity Prototype

Orta detay seviyesi. Akışı test etmek için ideal.

**Özellikleri:**
- Wireframe bazlı
- Gerçekçi akış
- Temel etkileşimler
- Günler içinde yapılır

**Ne zaman kullanılır:**
- Kullanılabilirlik testi
- Stakeholder geri bildirimi
- Akış doğrulama

### High-Fidelity Prototype

Final tasarıma yakın. Gerçek gibi görünür ve hisseder.

**Özellikleri:**
- Gerçek renkler, fontlar, görseller
- Detaylı etkileşimler
- Animasyonlar ve micro-interactions
- Günler/haftalar içinde yapılır

**Ne zaman kullanılır:**
- Final kullanılabilirlik testi
- Stakeholder onayı
- Developer handoff
- Kullanıcı araştırması

[TABLE]
| Fidelity | Görsel | Etkileşim | Süre | Kullanım |
|----------|--------|-----------|------|----------|
| **Low** | Kaba/kağıt | Temel tıklama | Dakikalar | Konsept test |
| **Mid** | Wireframe | Akış | Saatler | Kullanılabilirlik |
| **High** | Final tasarım | Detaylı | Günler | Final onay |
[/TABLE]

[TIP]
💡 Her zaman high-fidelity gerekmiyor. Amaca göre doğru fidelity'yi seç. Erken aşamada low-fi daha verimli.
[/TIP]

---

## Prototip Yöntemleri

### 1. Kağıt Prototip

En basit ve en hızlı yöntem.

**Nasıl yapılır:**
- Her ekranı ayrı kağıda çiz
- Kullanıcıya göster
- "Buraya tıklasaydın" de, sonraki kağıdı göster

**Avantajları:**
- Sıfır maliyet
- Çok hızlı
- Herkes yapabilir
- Erken fikirler için ideal

**Dezavantajları:**
- Gerçekçi değil
- Kaydetmek zor
- Uzaktan test zor

### 2. Tıklanabilir Prototip

Statik ekranları bağlayarak oluşturulan prototip.

**Nasıl yapılır:**
- Ekranları tasarla (wireframe veya mockup)
- Hotspot'lar ekle (tıklanabilir alanlar)
- Ekranları birbirine bağla
- Geçiş animasyonu ekle

**Araçlar:** Figma, InVision, Marvel

**Avantajları:**
- Hızlı oluşturulur
- Kolayca paylaşılır
- Test için yeterli

**Dezavantajları:**
- Sınırlı etkileşim
- Gerçek data yok

### 3. Etkileşimli Prototip

Daha karmaşık etkileşimler içeren prototip.

**Özellikler:**
- Conditional logic (if/else)
- Değişkenler (variables)
- Dinamik içerik
- Karmaşık animasyonlar

**Araçlar:** Figma (advanced), ProtoPie, Principle, Framer

**Avantajları:**
- Çok gerçekçi
- Kompleks senaryolar
- Micro-interactions

**Dezavantajları:**
- Daha fazla zaman
- Öğrenme eğrisi

### 4. Kod Prototip

HTML/CSS/JS ile yapılan prototip.

**Ne zaman kullanılır:**
- Çok karmaşık etkileşimler
- Gerçek data gerektiğinde
- Developer background varsa

**Avantajları:**
- Tam kontrol
- Gerçek data
- Bazen ürüne dönüşür

**Dezavantajları:**
- En yavaş
- Teknik beceri gerektirir

---

## Figma'da Prototip Oluşturma

Figma en popüler prototipleme aracı. Temel adımlar:

### Adım 1: Ekranları Hazırla

Her ekranı ayrı frame olarak tasarla. Frame isimlendirmesi önemli:
- ${'`'}01-Home${'`'}
- ${'`'}02-Product-List${'`'}
- ${'`'}03-Product-Detail${'`'}
- ${'`'}04-Cart${'`'}

### Adım 2: Prototype Moduna Geç

Sağ panelde "Design" yerine "Prototype" sekmesine tıkla.

### Adım 3: Bağlantı Oluştur

1. Bir element seç (buton, kart, link)
2. Sağ taraftaki mavi noktaya tıkla ve sürükle
3. Hedef frame'e bırak
4. Bağlantı oluştu

### Adım 4: Etkileşim Ayarları

Her bağlantı için ayarlar:

**Trigger (Tetikleyici):**
- On tap/click (tıklama)
- On drag (sürükleme)
- While hovering (hover)
- Mouse enter/leave
- After delay (gecikme sonrası)

**Action (Aksiyon):**
- Navigate to (sayfa geçişi)
- Open overlay (modal açma)
- Swap with (component değiştirme)
- Back (geri gitme)
- Close overlay
- Scroll to

**Animation (Animasyon):**
- Instant (anında)
- Dissolve (çözünme)
- Move in/out (kayma)
- Push (itme)
- Slide in/out

### Adım 5: Önizleme ve Paylaş

- ▶️ butonuyla önizle
- "Share" ile link oluştur
- "Present" ile tam ekran göster

[STEPS]
1. Frame'leri oluştur ve isimlendir
2. Prototype moduna geç
3. Elementleri bağla
4. Trigger ve animasyon ayarla
5. Test et ve paylaş
[/STEPS]

---

## Prototip Best Practices

### 1. Amacı belirle

Her prototipin bir amacı olmalı. "Ne test edeceğim?" sorusunu cevapla.

[COMPARISON]
❌ "Tüm uygulamanın prototipi"
✅ "Checkout akışını test etmek için prototip"
[/COMPARISON]

### 2. Doğru fidelity seç

Erken aşama = low-fi, final onay = high-fi. Her şey high-fi olmak zorunda değil.

### 3. Gerçekçi içerik kullan

"Lorem ipsum" yerine gerçekçi içerik. Kullanıcılar gerçek içerikle daha doğal etkileşir.

### 4. Edge case'leri dahil et

- Boş durum (empty state)
- Hata durumu (error state)
- Yükleme durumu (loading state)
- Başarı durumu (success state)

### 5. Akışı tamamla

Yarım kalan akışlar test sonuçlarını bozar. "Burası henüz yok" demek yerine, basit placeholder ekle.

### 6. Mobil için ayrı düşün

Desktop prototip mobilde çalışmaz. Responsive düşün veya ayrı mobil prototip yap.

---

## Prototip Araçları

[TABLE]
| Araç | Fiyat | En İyi Yön | Platform |
|------|-------|------------|----------|
| **Figma** | Ücretsiz+ | All-in-one, işbirliği | Web |
| **ProtoPie** | Ücretli | Karmaşık etkileşimler | Desktop |
| **Principle** | Ücretli | Animasyon | macOS |
| **Framer** | Ücretsiz+ | Kod + tasarım | Web |
| **InVision** | Ücretsiz+ | Basit prototipler | Web |
| **Marvel** | Ücretsiz+ | Hızlı prototip | Web |
| **Adobe XD** | Ücretsiz+ | Adobe ekosistemi | Desktop |
[/TABLE]

### Araç Seçimi

**Yeni başlıyorsan:** Figma (ücretsiz, kolay, yaygın)

**Karmaşık animasyonlar:** ProtoPie veya Principle

**Kod biliyorsan:** Framer

**Sadece akış testi:** InVision veya Marvel

---

## Wireframe vs Mockup vs Prototype

Sık karıştırılan üç kavram:

[TABLE]
| Özellik | Wireframe | Mockup | Prototype |
|---------|-----------|--------|-----------|
| **Sadakat** | Düşük | Yüksek | Değişken |
| **Görsel** | Gri, placeholder | Gerçek tasarım | Değişken |
| **Etkileşim** | Yok (statik) | Yok (statik) | Var (tıklanabilir) |
| **Amaç** | Yapı | Görsel | Deneyim |
| **Soru** | Ne nerede? | Nasıl görünecek? | Nasıl çalışacak? |
[/TABLE]

[COMPARISON]
**Wireframe:** İskelet - yapıyı gösterir
**Mockup:** Cilt - görünümü gösterir
**Prototype:** Hareket - deneyimi gösterir
[/COMPARISON]

**Tipik akış:**
Wireframe → Mockup → Prototype → Geliştirme

Ama her projede hepsi gerekli değil. Bazen wireframe'den direkt prototype'a geçilir.

---

## Prototiple Test Yapma

Prototip oluşturdun. Şimdi test zamanı.

### Test Senaryosu Hazırla
Senaryo: Yeni bir çift koşu ayakkabısı almak istiyorsun.
Görev 1: Ana sayfadan koşu ayakkabıları kategorisine git.
Görev 2: Bir ayakkabı seç ve detaylarını incele.
Görev 3: Sepete ekle.
Görev 4: Ödeme sayfasına ilerle.

### Test Sırasında Dikkat Et

- Kullanıcı nerede takılıyor?
- Hangi butonu bulamıyor?
- Beklediği yerde olmayan ne var?
- Kaç tıklamada görevi tamamlıyor?

### Test Sonrası

- Notları derle
- Paternleri bul
- Önceliklendir
- İtere et

[TIP]
💡 5 kullanıcıyla test, sorunların %85'ini ortaya çıkarır. Daha fazlasına gerek yok, bulguları düzelt ve tekrar test et.
[/TIP]

---

## Sık Yapılan Hatalar

### 1. Her şeyi prototiplemek

Tüm uygulama değil, test edilecek akış yeterli.

### 2. Çok erken high-fidelity

Konsept bile netleşmeden piksel-perfect prototip yapmak zaman kaybı.

### 3. Etkileşimleri unutmak

Sadece ekranları bağlamak yetmez. Hover, loading, error durumları da önemli.

### 4. Test etmeden geçmek

Prototip yapıp kimseye göstermemek, yapmamış olmakla aynı.

### 5. Geri bildirim sonrası güncellememek

Test yaptın, sorunları buldun ama düzeltmedin. Prototip ölü döküman oldu.

---

[EXERCISE]
## Şimdi Sen Dene

**30 dakika**

**Görev:** Basit bir login akışı için tıklanabilir prototip oluştur.

**Ekranlar:**
1. Login ekranı (email + şifre + giriş butonu + şifremi unuttum link)
2. Şifremi unuttum ekranı (email + gönder butonu)
3. Email gönderildi onay ekranı
4. Ana sayfa (başarılı giriş sonrası)

**Adımlar:**

1. Figma'da 4 frame oluştur (mobil boyut: 375x812)

2. Her ekranı basitçe tasarla (wireframe seviyesi yeterli)

3. Prototype modunda bağlantıları kur:
   - Login → "Giriş" butonu → Ana sayfa
   - Login → "Şifremi unuttum" → Şifremi unuttum ekranı
   - Şifremi unuttum → "Gönder" → Onay ekranı
   - Onay → "Giriş yap" → Login

4. Geçiş animasyonu ekle (Dissolve veya Slide)

5. Preview ile test et

**Bonus:** Hata durumu ekle - yanlış şifre girildiğinde error mesajı göster.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Prototype, tasarımın etkileşimli simülasyonu - tıklanabilir, test edilebilir
- Low/mid/high fidelity seçimi amaca göre yapılır
- Kağıt prototipten kod prototipe kadar farklı yöntemler var
- Figma en popüler araç: frame'leri bağla, trigger/action/animation ayarla
- Wireframe statik yapı, mockup statik görsel, prototype etkileşimli deneyim
- Test için prototip oluştur, 5 kullanıcı sorunların çoğunu gösterir
- Her şeyi prototipleme, amaca odaklan
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Product Design Nedir?](/kutuphane/product-design-nedir)

**Sonraki:** [Wireframe vs Mockup vs Prototype](/kutuphane/wireframe-mockup-prototype)

**İlgili konular:**
- [Wireframe Nedir?](/kutuphane/wireframe-nedir)
- [Kullanılabilirlik Testi Nedir?](/kutuphane/kullanilabilirlik-testi)
- [User Flow ve Task Flow](/kutuphane/user-flow-task-flow)

**İlgili Roadmap:** UX Designer Roadmap → Tasarım Çıktıları

---

## Kaynaklar

Derinleşmek istersen:

- [Prototyping - NNGroup](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/) (İngilizce, 8 dk)
- [Figma Prototyping Guide](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma) (İngilizce, resmi döküman)
- [Prototyping - IxDF](https://www.interaction-design.org/literature/topics/prototyping) (İngilizce, 10 dk)
`,
  },
  "wireframe-mockup-prototype": {
    id: "wireframe-mockup-prototype",
    title: "Wireframe vs Mockup vs Prototype",
    subtitle: "Üç Tasarım Çıktısını Doğru Anla, Doğru Kullan",
    titleEn: "Wireframe vs Mockup vs Prototype",
    slug: "wireframe-mockup-prototype",
    description: "Wireframe, mockup ve prototype arasındaki farklar nedir? Hangisini ne zaman kullanmalısın? Karşılaştırmalı rehber ve pratik örnekler.",
    category: "ux-design",
    readingTime: 10,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# Wireframe vs Mockup vs Prototype: Üç Tasarım Çıktısını Doğru Anla

**Seviye:** Başlangıç  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

"Wireframe gönderir misin?" diyor PM. "Prototype hazır mı?" diyor developer. "Mockup'ı görelim" diyor stakeholder.

Üç farklı terim, üç farklı beklenti. Yanlış çıktıyı gönderirsen, toplantı verimsiz geçer, beklentiler karışır.

Bu üç kavram en çok karıştırılan tasarım terimleri arasında. Hepsinin ortak noktası: Henüz kod yazılmadan tasarımı görselleştirmek. Ama her biri farklı amaca hizmet ediyor.

Bu yazıda wireframe, mockup ve prototype arasındaki farkları, hangisini ne zaman kullanacağını ve tipik tasarım akışında nasıl sıralandıklarını öğreneceksin.

---

## Hızlı Özet

Üç kavramı tek tabloda görelim:

[TABLE]
| Özellik | Wireframe | Mockup | Prototype |
|---------|-----------|--------|-----------|
| **Sadakat** | Düşük (Low-fi) | Yüksek (High-fi) | Değişken |
| **Etkileşim** | Yok (Statik) | Yok (Statik) | Var (Tıklanabilir) |
| **Görsel** | Gri, placeholder | Gerçek tasarım | Değişken |
| **Amaç** | Yapı | Görünüm | Deneyim |
| **Soru** | Ne nerede? | Nasıl görünecek? | Nasıl çalışacak? |
| **Süre** | Dakikalar-saatler | Saatler-günler | Saatler-günler |
[/TABLE]

---

## Wireframe Nedir?

[CALLOUT]
**Wireframe:**
Düşük sadakatli, statik yapı taslağı. İçerik yerleşimini ve hiyerarşiyi gösterir. Görsel detay içermez.
[/CALLOUT]

### Özellikleri

- Siyah, beyaz ve gri tonları
- Placeholder içerik ("Lorem ipsum", "Image")
- Basit şekiller: kutular, çizgiler
- Renk, tipografi, görsel detay yok
- Hızlı üretilir

### Ne Zaman Kullanılır?

- Erken aşama fikirleri paylaşırken
- Sayfa yapısını ve hiyerarşiyi belirlerken
- Stakeholder'dan yapısal onay alırken
- Görsel detaylara girmeden önce

### Avantajları

- Çok hızlı
- Görsel tartışmalara girmez
- Yapıya odaklanmayı sağlar
- Değiştirmesi kolay

### Dezavantajları

- Gerçekçi değil
- Etkileşim yok
- Stakeholder'lar bazen anlamakta zorlanır

---

## Mockup Nedir?

[CALLOUT]
**Mockup:**
Yüksek sadakatli, statik görsel tasarım. Final ürünün görünümünü gösterir. Etkileşim içermez.
[/CALLOUT]

### Özellikleri

- Gerçek renkler ve tipografi
- Gerçek veya gerçekçi içerik
- Detaylı görsel tasarım
- İkonlar, görseller, gölgeler
- Piksel-perfect

### Ne Zaman Kullanılır?

- Görsel tasarım onayı alırken
- Brand uyumunu gösterirken
- Developer'a visual spec verirken
- Pazarlama materyalleri için

### Avantajları

- Gerçekçi görünüm
- Görsel kararları netleştirir
- Developer için referans
- Stakeholder'lar kolayca anlar

### Dezavantajları

- Zaman alır
- Değiştirmesi daha zor
- Etkileşimi göstermez
- Erken aşamada gereksiz detay

---

## Prototype Nedir?

[CALLOUT]
**Prototype:**
Etkileşimli tasarım simülasyonu. Tıklanabilir, gezinilebilir. Deneyimi test etmeyi sağlar.
[/CALLOUT]

### Özellikleri

- Tıklanabilir alanlar (hotspot)
- Sayfa geçişleri
- Animasyonlar (opsiyonel)
- Low-fi veya high-fi olabilir
- Test edilebilir

### Ne Zaman Kullanılır?

- Kullanılabilirlik testi yaparken
- Akışı stakeholder'a gösterirken
- Developer'a etkileşim spec verirken
- Fikirleri test ederken

### Avantajları

- Deneyimi simüle eder
- Test edilebilir
- Stakeholder'lar "dener"
- Akış sorunlarını ortaya çıkarır

### Dezavantajları

- Wireframe/mockup'a göre daha fazla zaman
- Bakımı gerekir (değişikliklerde güncelleme)
- Bazen "gerçek ürün" sanılır

---

## Fidelity Kavramı

**Fidelity** (sadakat), tasarımın final ürüne ne kadar benzediğini ifade eder.

### Low-Fidelity (Düşük Sadakat)

- Kaba, hızlı
- Detaysız
- Erken aşama fikirleri için
- Örnek: Wireframe, paper prototype

### High-Fidelity (Yüksek Sadakat)

- Detaylı, gerçekçi
- Final ürüne yakın
- Onay ve test için
- Örnek: Mockup, high-fi prototype

[TIP]
💡 Fidelity seçimi amaca göre yapılır. Erken aşamada low-fi daha verimli, final onayda high-fi gerekli.
[/TIP]

---

## Detaylı Karşılaştırma

### Amaç Açısından

[TABLE]
| Çıktı | Ana Soru | Amaç |
|-------|----------|------|
| **Wireframe** | Ne nerede olacak? | Yapıyı ve hiyerarşiyi belirlemek |
| **Mockup** | Nasıl görünecek? | Görsel tasarımı onaylatmak |
| **Prototype** | Nasıl çalışacak? | Deneyimi test etmek |
[/TABLE]

### Hedef Kitle Açısından

[TABLE]
| Çıktı | Birincil Hedef Kitle |
|-------|---------------------|
| **Wireframe** | Tasarım ekibi, PM, stakeholder (yapısal onay) |
| **Mockup** | Stakeholder (görsel onay), developer (spec) |
| **Prototype** | Kullanıcı (test), stakeholder (demo), developer (etkileşim) |
[/TABLE]

### Zaman ve Emek Açısından

[TABLE]
| Çıktı | Oluşturma Süresi | Değiştirme Kolaylığı |
|-------|------------------|---------------------|
| **Wireframe** | Dakikalar - saatler | Çok kolay |
| **Mockup** | Saatler - günler | Orta |
| **Prototype** | Saatler - günler | Orta - Zor (bağlantılar) |
[/TABLE]

---

## Tipik Tasarım Akışı

Çoğu projede akış şöyle ilerler:

**Adım 1: Wireframe**
Yapıyı belirle, stakeholder onayı al.

**Adım 2: Mockup**
Görsel tasarımı yap, onay al.

**Adım 3: Prototype**
Etkileşimleri ekle, test et.

**Adım 4: Handoff**
Developer'a teslim et.

[WARNING]
⚠️ Bu sıra her projede geçerli değil. Bazen wireframe'den direkt prototype'a geçilir. Bazen sadece mockup yeterli olur. Projenin ihtiyacına göre esnek ol.
[/WARNING]

---

## Hangi Durumda Hangisi?

### Sadece Wireframe Yeterli

- Erken aşama beyin fırtınası
- İç ekip hizalaması
- Hızlı A/B fikir karşılaştırması
- Yapısal karar alma

### Sadece Mockup Yeterli

- Küçük UI değişiklikleri
- Görsel güncelleme
- Pazarlama materyali
- Mevcut akışta görsel yenileme

### Prototype Gerekli

- Kullanılabilirlik testi
- Karmaşık akış doğrulama
- Stakeholder demo
- Yeni özellik lansmanı
- Developer'a etkileşim anlatma

### Üçü Birlikte Gerekli

- Yeni ürün tasarımı
- Büyük yeniden tasarım
- Kompleks çok adımlı akışlar
- Yüksek riskli projeler

---

## Yaygın Hatalar

### 1. Her şeye mockup ile başlamak

[COMPARISON]
❌ Hata: Direkt Figma'da detaylı tasarım yapmak
✅ Doğrusu: Önce wireframe ile yapıyı onayla, sonra mockup'a geç
[/COMPARISON]

Yapı yanlışsa, güzel mockup'ı çöpe atarsın.

### 2. Prototype'ı atlayıp geliştirmeye geçmek

"Mockup yeterli, developer anlar" düşüncesi tehlikeli. Etkileşimler, geçişler, edge case'ler prototype olmadan net olmaz.

### 3. Wireframe'i müşteriye göstermek

Bazı stakeholder'lar wireframe'i "bitmiş tasarım" sanır ve "çok çirkin" der. Bağlamı açıkla veya direkt mockup göster.

### 4. High-fi prototype'ı "gerçek ürün" sanmak

Prototype test aracıdır, final ürün değil. Kullanıcılar bazen "neden bu kadar yavaş?" der çünkü gerçek zannneder.

### 5. Fidelity tutarsızlığı

Aynı projede bazı ekranlar wireframe, bazıları mockup olunca karışıklık çıkar. Tutarlı ol.

---

## Pratik Senaryolar

### Senaryo 1: Yeni Onboarding Akışı

**İhtiyaç:** 5 ekranlık yeni kullanıcı karşılama akışı

**Yaklaşım:**
1. Wireframe ile akışı belirle (hangi bilgiler, hangi sırayla)
2. Stakeholder onayı al
3. Mockup ile görsel tasarla
4. Prototype ile animasyonları ve geçişleri ekle
5. 5 kullanıcıyla test et
6. İtere et

### Senaryo 2: Buton Rengi Değişikliği

**İhtiyaç:** Primary buton rengini değiştirmek

**Yaklaşım:**
- Sadece mockup yeterli
- Design system'da güncelle
- Wireframe/prototype gereksiz

### Senaryo 3: Checkout Akışını Test Etme

**İhtiyaç:** Mevcut checkout'un sorunlu olduğu düşünülüyor

**Yaklaşım:**
1. Mevcut akışın prototype'ını çıkar
2. Kullanılabilirlik testi yap
3. Sorunları tespit et
4. Alternatif wireframe'ler çiz
5. Yeni mockup ve prototype yap
6. Tekrar test et

---

## Araçlara Göre Kullanım

[TABLE]
| Araç | Wireframe | Mockup | Prototype |
|------|-----------|--------|-----------|
| **Figma** | ✓ | ✓ | ✓ |
| **Sketch** | ✓ | ✓ | Sınırlı |
| **Adobe XD** | ✓ | ✓ | ✓ |
| **Balsamiq** | ✓ | ✗ | ✗ |
| **InVision** | ✗ | ✗ | ✓ |
| **ProtoPie** | ✗ | ✗ | ✓ (gelişmiş) |
| **Kalem/Kağıt** | ✓ | ✗ | ✓ (paper prototype) |
[/TABLE]

[TIP]
💡 Figma her üçü için de kullanılabilir. Tek araçta kalarak geçişler arası zaman kaybetmezsin.
[/TIP]

---

## Özet Tablosu

[TABLE]
| | Wireframe | Mockup | Prototype |
|---|-----------|--------|-----------|
| **Bir kelimeyle** | İskelet | Görünüm | Deneyim |
| **Sadakat** | Düşük | Yüksek | Değişken |
| **Statik/Dinamik** | Statik | Statik | Dinamik |
| **Ne gösterir** | Yapı, hiyerarşi | Renkler, fontlar | Akış, etkileşim |
| **Ne zaman** | Erken aşama | Görsel onay | Test, demo |
| **Hız** | En hızlı | Orta | Orta-yavaş |
[/TABLE]

---

[EXERCISE]
## Şimdi Sen Dene

**15 dakika**

**Görev:** Aynı ekran için wireframe, mockup ve prototype farkını anla.

**Senaryo:** Bir profil ayarları sayfası tasarlıyorsun.

**Adım 1 - Wireframe (5 dk)**
Kağıda veya Figma'da gri kutularla:
- Profil fotoğrafı placeholder
- İsim ve email alanları
- Şifre değiştir butonu
- Bildirim ayarları toggle'ları
- Kaydet butonu

**Adım 2 - Mockup'a dönüştür (5 dk)**
Aynı yapıyı:
- Gerçek renklerle
- Gerçek fontlarla
- Örnek bir profil fotoğrafıyla
- Tamamla

**Adım 3 - Prototype düşün (5 dk)**
Şu etkileşimleri not al:
- Toggle'a tıklayınca ne olur?
- Kaydet'e basınca ne olur?
- Başarılı kayıt mesajı nasıl görünür?

**Değerlendirme:** Her adımda ne kadar farklı bilgi iletildiğini gör.
[/EXERCISE]

---

[SUMMARY]
## Özet

- **Wireframe:** Düşük sadakat, statik, yapı gösterir - "Ne nerede?"
- **Mockup:** Yüksek sadakat, statik, görünüm gösterir - "Nasıl görünecek?"
- **Prototype:** Etkileşimli, deneyim gösterir - "Nasıl çalışacak?"
- Tipik akış: Wireframe → Mockup → Prototype (ama esnek ol)
- Her projede üçü gerekmez, amaca göre seç
- Fidelity seçimi: Erken aşama low-fi, final onay high-fi
- Figma üçü için de kullanılabilir
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Prototype Nedir?](/kutuphane/prototype-nedir)

**Sonraki:** [Information Architecture Temelleri](/kutuphane/information-architecture)

**İlgili konular:**
- [Wireframe Nedir?](/kutuphane/wireframe-nedir)
- [Prototype Nedir?](/kutuphane/prototype-nedir)
- [User Flow ve Task Flow](/kutuphane/user-flow-task-flow)

**İlgili Roadmap:** UX Designer Roadmap → Tasarım Çıktıları

---

## Kaynaklar

Derinleşmek istersen:

- [Wireframes vs Mockups vs Prototypes - UXPin](https://www.uxpin.com/studio/blog/wireframe-vs-mockup-vs-prototype/) (İngilizce, 8 dk)
- [Fidelity in Design - NNGroup](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/) (İngilizce, 6 dk)
- [Design Fidelity - IxDF](https://www.interaction-design.org/literature/article/design-fidelity-what-it-is-and-why-it-matters) (İngilizce, 10 dk)
`,
  },
  "information-architecture": {
    id: "information-architecture",
    title: "Information Architecture Temelleri",
    subtitle: "İçeriği Organize Etmenin Sanatı",
    titleEn: "Information Architecture",
    slug: "information-architecture",
    description: "Information Architecture (IA) nedir? Bilgi mimarisi nasıl oluşturulur? Site haritası, navigasyon ve içerik organizasyonu rehberi.",
    category: "ux-design",
    readingTime: 13,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# Information Architecture Temelleri: İçeriği Organize Etmenin Sanatı

**Seviye:** Başlangıç - Orta  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

Bir e-ticaret sitesinde "laptop çantası" arıyorsun. Nereye bakarsın?

- Elektronik → Bilgisayar Aksesuarları?
- Moda → Çantalar?
- Ofis → Laptop Aksesuarları?

Eğer siteye bağlı olarak farklı yerlere bakıyorsan, bu bir **Information Architecture** problemi.

IA, kullanıcıların içeriği nasıl bulduğunu, anladığını ve gezindiğini belirleyen görünmez iskelet. Kötü IA, güzel UI'ı bile kullanılamaz kılar. "Aradığımı bulamıyorum" şikayetinin arkasında genellikle IA sorunları yatar.

Bu yazıda Information Architecture'ın ne olduğunu, temel bileşenlerini ve nasıl oluşturulacağını öğreneceksin.

---

## Information Architecture Nedir?

[CALLOUT]
**Information Architecture (IA):**
İçeriğin ve bilginin nasıl organize edileceğini, yapılandırılacağını, etiketleneceğini ve sunulacağını belirleyen disiplin. Kullanıcıların bilgiyi bulmasını, anlamasını ve kullanmasını kolaylaştırır.
[/CALLOUT]

IA terimi 1976'da Richard Saul Wurman tarafından ortaya atıldı. Dijital dünyada ise özellikle web sitelerinin karmaşıklaşmasıyla önem kazandı.

**IA'nın temel sorusu:** "Kullanıcı aradığını nasıl bulacak?"

---

## IA Neden Önemli?

### 1. Bulunabilirlik (Findability)

Kullanıcılar aradıklarını bulamazsa, site ne kadar güzel olursa olsun işe yaramaz. IA, içeriği bulunabilir kılar.

### 2. Anlaşılabilirlik (Understandability)

"Bu link nereye götürür?", "Bu kategori neyi içerir?" sorularının cevabı net olmalı. İyi IA, belirsizliği azaltır.

### 3. Ölçeklenebilirlik (Scalability)

Bugün 50 ürün var, yarın 5000 olacak. İyi IA, büyümeye hazır yapı sağlar.

### 4. SEO Etkisi

Arama motorları da IA'yı anlar. Mantıklı URL yapısı, breadcrumb, site haritası SEO'yu güçlendirir.

[INFO]
%50 kullanıcı
Kötü navigasyon nedeniyle siteyi terk ediyor (Forrester Research)
[/INFO]

---

## IA'nın Dört Bileşeni

Information Architecture dört temel sistemden oluşur:

### 1. Organizasyon Sistemleri (Organization Systems)

İçeriğin nasıl gruplandığı ve sınıflandırıldığı.

**Organizasyon şemaları:**

[TABLE]
| Şema Tipi | Açıklama | Örnek |
|-----------|----------|-------|
| **Alfabetik** | A'dan Z'ye sıralama | Sözlük, telefon rehberi |
| **Kronolojik** | Zamana göre sıralama | Blog yazıları, haber arşivi |
| **Coğrafi** | Lokasyona göre | Mağaza bulucu, hava durumu |
| **Konu bazlı** | Temaya göre gruplama | E-ticaret kategorileri |
| **Görev bazlı** | Yapılacak işe göre | Online bankacılık |
| **Hedef kitleye göre** | Kullanıcı tipine göre | Bireysel / Kurumsal |
[/TABLE]

**Organizasyon yapıları:**

- **Hiyerarşik:** Ağaç yapısı, ana kategoriler ve alt kategoriler
- **Veritabanı:** Metadata bazlı, filtreleme ve arama
- **Hipertekst:** İçerikler arası çapraz linkler, wiki tarzı

### 2. Etiketleme Sistemleri (Labeling Systems)

İçeriğin nasıl adlandırıldığı. Menü isimleri, buton metinleri, kategori başlıkları.

**İyi etiketleme özellikleri:**

- Açık ve anlaşılır
- Tutarlı (aynı şey için aynı terim)
- Kullanıcının dilinde (jargon değil)
- Kısa ama açıklayıcı

[COMPARISON]
❌ Kötü etiket: "Çözümlerimiz", "Kaynaklar", "Daha Fazla"
✅ İyi etiket: "Ürünler", "Yardım Merkezi", "Fiyatlandırma"
[/COMPARISON]

### 3. Navigasyon Sistemleri (Navigation Systems)

Kullanıcının içerik içinde nasıl hareket ettiği.

**Navigasyon tipleri:**

[TABLE]
| Tip | Açıklama | Örnek |
|-----|----------|-------|
| **Global** | Her sayfada aynı, ana menü | Header navigation |
| **Lokal** | Bölüme özel alt menü | Sidebar, category nav |
| **Contextual** | İçerik içi linkler | "İlgili ürünler", inline link |
| **Supplemental** | Yardımcı navigasyon | Site haritası, index |
| **Breadcrumb** | Konum göstergesi | Ana Sayfa > Kategori > Ürün |
[/TABLE]

### 4. Arama Sistemleri (Search Systems)

Kullanıcının içeriği arayarak bulması.

**Arama bileşenleri:**

- Arama kutusu konumu ve tasarımı
- Arama sonuçları sayfası
- Filtreleme ve sıralama
- Öneri ve otomatik tamamlama
- "Sonuç bulunamadı" durumu

[TIP]
💡 Navigasyon ve arama birbirini tamamlar. Bazı kullanıcılar gezinmeyi, bazıları aramayı tercih eder. İkisini de iyi tasarla.
[/TIP]

---

## IA Nasıl Oluşturulur?

### Adım 1: İçerik Envanteri

Mevcut içeriği listele. Ne var, ne yok?

**İçerik envanteri tablosu:**

| Sayfa/İçerik | URL | Kategori | Durum | Notlar |
|--------------|-----|----------|-------|--------|
| Ana sayfa | / | - | Aktif | - |
| Hakkımızda | /hakkimizda | Kurumsal | Güncel değil | Güncelleme gerek |
| Ürün A | /urunler/a | Ürünler | Aktif | - |

### Adım 2: İçerik Denetimi (Audit)

Mevcut içeriği değerlendir:
- Güncel mi?
- Değerli mi?
- Duplicate var mı?
- Eksik ne var?

### Adım 3: Kullanıcı Araştırması

Kullanıcılar içeriği nasıl düşünüyor? İki temel yöntem:

**Card Sorting:**
Kullanıcılara içerik kartları verip gruplamalarını istersin.

- **Açık card sort:** Kullanıcı grupları ve isimleri kendisi belirler
- **Kapalı card sort:** Kategoriler sabit, kullanıcı kartları yerleştirir
- **Hibrit:** İkisinin karışımı

**Tree Testing:**
Oluşturduğun yapıyı test edersin. "X'i bul" görevi verip, kullanıcının doğru yolu izleyip izlemediğini ölçersin.

### Adım 4: Yapıyı Oluştur

Araştırma bulgularına göre:
- Ana kategorileri belirle
- Alt kategorileri oluştur
- Çapraz ilişkileri düşün
- Derinliği dengele (çok derin = kaybolma, çok sığ = kalabalık)

### Adım 5: Site Haritası Çiz

Yapıyı görselleştir. Tüm sayfalar ve ilişkileri.

### Adım 6: Test Et ve İtere Et

Tree testing ile yapıyı doğrula. Sorunları düzelt, tekrar test et.

---

## Site Haritası Oluşturma

Site haritası, IA'nın görsel temsili. Tüm sayfaları ve hiyerarşiyi gösterir.

### Site Haritası İçeriği

Her sayfa için:
- Sayfa adı
- Sayfa ID veya URL
- Hiyerarşik konum
- Sayfa tipi (landing, content, form vs.)

### Site Haritası Formatları

**Liste formatı:**

Ana Sayfa
1.1 Ürünler
1.1.1 Kategori A
1.1.2 Kategori B
1.2 Hakkımızda
1.3 İletişim

**Görsel format:**
Figma, Miro veya özel sitemap araçlarıyla kutular ve bağlantılar şeklinde.

### Site Haritası İpuçları

- Tutarlı isimlendirme kullan
- Derinliği 3-4 seviyeyle sınırla
- Büyük sitelerde bölümlere ayır
- Versiyon kontrolü yap

---

## Navigasyon Tasarımı

### Navigasyon Prensipleri

**1. Tutarlılık**
Global navigasyon her sayfada aynı yerde, aynı görünümde olmalı.

**2. Netlik**
Her link nereye gittiğini açıkça belirtmeli.

**3. Bağlam**
Kullanıcı nerede olduğunu bilmeli (aktif state, breadcrumb).

**4. Erişilebilirlik**
Klavye navigasyonu, ekran okuyucu uyumu.

### Navigasyon Kararları

**Kaç ana menü öğesi?**
5-7 öğe ideal. Daha fazlası göz karmaşası yaratır.

**Mega menü gerekli mi?**
Çok içerik varsa faydalı, az içerik için overkill.

**Hamburger menü ne zaman?**
Mobilde yaygın, desktop'ta tartışmalı. Kritik linkleri gizlememeli.

**Footer navigasyon ne içermeli?**
Yasal linkler, secondary sayfalar, site haritası linki.

---

## Card Sorting Detayları

Card sorting, IA için en değerli araştırma yöntemi.

### Nasıl Yapılır?

[STEPS]
1. İçerik kartları hazırla
   Her içerik/sayfa için bir kart. 30-60 kart ideal.

2. Katılımcı bul
   5-15 katılımcı yeterli veri sağlar.

3. Seansı yürüt
   Fiziksel kartlar veya online araç (OptimalSort, Maze).

4. Sonuçları analiz et
   Hangi kartlar sıkça birlikte gruplandı?
   Hangi isimler verildi?

5. Paternleri bul
   Ortak gruplamalar ve isimlendirmeler.
[/STEPS]

### Araçlar

[TABLE]
| Araç | Ücretsiz | Özellik |
|------|----------|---------|
| **OptimalSort** | Sınırlı | Kapsamlı analiz |
| **Maze** | Sınırlı | Kullanıcı testi entegrasyonu |
| **UXtweak** | Sınırlı | Tree testing dahil |
| **Miro** | Kısmen | Manuel analiz gerekir |
| **Fiziksel kartlar** | Evet | Yüz yüze seanslar için |
[/TABLE]

---

## Tree Testing Detayları

Oluşturduğun yapıyı test etmenin yolu.

### Nasıl Yapılır?

1. Site yapısını araca yükle (sadece yapı, görsel yok)
2. Görevler oluştur: "X'i nerede ararsın?"
3. Katılımcıları yönlendir
4. Başarı oranını ve yolu analiz et

### Metrikler

- **Başarı oranı:** Doğru yeri bulan yüzdesi
- **Doğrudanlık:** İlk denemede bulanlar
- **Zaman:** Görevi tamamlama süresi
- **Yol:** Kullanıcının izlediği rota

[TIP]
💡 Tree testing, card sorting'den sonra yapılır. Önce yapıyı keşfet (card sort), sonra doğrula (tree test).
[/TIP]

---

## IA Hataları

### 1. Organizasyon bazlı yapı

[COMPARISON]
❌ Şirket organizasyonuna göre: "Pazarlama", "Satış", "Operasyon"
✅ Kullanıcı ihtiyacına göre: "Ürünler", "Destek", "Hesabım"
[/COMPARISON]

Kullanıcı şirketin iç yapısını bilmez, bilmek zorunda da değil.

### 2. Çok derin hiyerarşi

4+ seviye derinlik kullanıcıyı kaybettirir. "3 tık kuralı" tam doğru olmasa da, derinliği sınırla.

### 3. Tutarsız etiketleme

Bir yerde "Ürünler", başka yerde "Çözümler", başka yerde "Hizmetler". Aynı şey için aynı terim.

### 4. Arama ve navigasyon ayrımı

İkisi birbirini tamamlamalı. Sadece arama veya sadece navigasyon yetmez.

### 5. Test etmemek

"Bence mantıklı" yetersiz. Kullanıcılarla test et.

---

## IA Dökümanları

### Site Haritası

Tüm sayfalar ve hiyerarşi.

### Navigasyon Spec

Menü yapısı, dropdown davranışı, mobile adaptasyon.

### Taksonomi

Kategori ve etiket listesi, tanımlarıyla.

### URL Yapısı

URL patternleri ve kuralları.

---

[EXERCISE]
## Şimdi Sen Dene

**25 dakika**

**Görev:** Bir online kütüphane için basit IA oluştur.

**Senaryo:** Kullanıcılar kitap arayabiliyor, ödünç alabiliyor, listeler oluşturabiliyor.

**Adım 1 - İçerik listesi (5 dk)**
Bu sitede hangi sayfalar/içerikler olmalı? Listele (en az 15 öğe).

**Adım 2 - Gruplama (10 dk)**
Listelediğin öğeleri mantıklı kategorilere ayır. Her kategoriye isim ver.

**Adım 3 - Hiyerarşi (5 dk)**
Ana menüde ne olacak? Alt sayfalar nasıl organize olacak?

**Adım 4 - Navigasyon (5 dk)**
- Global nav'da hangi öğeler?
- Kullanıcı giriş yapmışsa ne değişir?
- Footer'da ne olmalı?

**Kontrol soruları:**
- Kullanıcı "Tarih kitapları"nı kaç tıkta bulur?
- "Ödünç aldıklarım" nerede?
- Arama sonuçlarında filtreleme var mı?
[/EXERCISE]

---

[SUMMARY]
## Özet

- IA, içeriğin nasıl organize edildiğini, etiketlendiğini ve sunulduğunu belirler
- Dört bileşen: Organizasyon, etiketleme, navigasyon, arama sistemleri
- İçerik envanteri → kullanıcı araştırması → yapı oluşturma → test akışı
- Card sorting kullanıcıların içeriği nasıl grupladığını gösterir
- Tree testing oluşturduğun yapının çalışıp çalışmadığını doğrular
- Site haritası IA'nın görsel temsilidir
- Organizasyon yapısına göre değil, kullanıcı ihtiyacına göre tasarla
- Test etmeden canlıya alma
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Wireframe vs Mockup vs Prototype](/kutuphane/wireframe-mockup-prototype)

**Sonraki:** [User Journey Map Oluşturma](/kutuphane/user-journey-map)

**İlgili konular:**
- [User Flow ve Task Flow](/kutuphane/user-flow-task-flow)
- Card Sorting Nedir? *(yakında)*
- Tree Testing Nedir? *(yakında)*

**İlgili Roadmap:** UX Designer Roadmap → Yapı ve Mimari

---

## Kaynaklar

Derinleşmek istersen:

- [Information Architecture - NNGroup](https://www.nngroup.com/articles/ia-vs-navigation/) (İngilizce, 8 dk)
- [Information Architecture - IxDF](https://www.interaction-design.org/literature/topics/information-architecture) (İngilizce, 12 dk)
- [Information Architecture for the Web and Beyond - Rosenfeld & Morville](https://www.oreilly.com/library/view/information-architecture-4th/9781491913529/) (Kitap, IA'nın kutsal kitabı)
`,
  },
  "user-journey-map": {
    id: "user-journey-map",
    title: "User Journey Map Oluşturma",
    subtitle: "Kullanıcı Yolculuğunu Görselleştirme Rehberi",
    titleEn: "User Journey Mapping",
    slug: "user-journey-map",
    description: "User Journey Map nedir, nasıl oluşturulur? Kullanıcı yolculuğu haritası adım adım rehberi. Şablon, örnekler ve en iyi pratikler.",
    category: "ux-design",
    readingTime: 14,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# User Journey Map Oluşturma: Kullanıcı Yolculuğunu Görselleştirme Rehberi

**Seviye:** Başlangıç - Orta  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

Kullanıcın ürününle ilk karşılaştığı andan, hedefine ulaştığı ana kadar neler yaşıyor?

Sadece uygulamadaki adımlar değil. Öncesinde ne düşünüyordu? Hangi alternatifleri değerlendirdi? Nereden geldi? Hangi anlarda mutlu oldu, hangi anlarda sinirlenedi? Müşteri desteğini aradı mı? Sosyal medyada ne gördü?

Tüm bu yolculuğu tek bir görselde anlamak - işte **User Journey Map** bunu sağlar.

Journey map, kullanıcı deneyiminin büyük resmini gösterir. Pain point'leri ortaya çıkarır, fırsatları görünür kılar, tüm ekibi aynı sayfaya getirir.

Bu yazıda journey map'in ne olduğunu, nasıl oluşturulacağını ve etkili kullanımını öğreneceksin.

---

## User Journey Map Nedir?

[CALLOUT]
**User Journey Map:**
Bir kullanıcının belirli bir hedefe ulaşmak için geçtiği tüm aşamaları, bu aşamalardaki eylemlerini, düşüncelerini, duygularını ve temas noktalarını kronolojik olarak görselleştiren diyagram.
[/CALLOUT]

Journey map, kullanıcının hikayesini anlatır. Sadece "ne yaptı" değil, "ne hissetti", "ne düşündü", "neyle karşılaştı" sorularına da cevap verir.

---

## Journey Map Ne İşe Yarar?

### 1. Pain Point'leri Görünür Kılar

Kullanıcının nerede zorlandığını, hayal kırıklığı yaşadığını gösterir. Sayılarla görünmeyen problemler journey map'te ortaya çıkar.

### 2. Fırsatları Ortaya Çıkarır

"Burada kullanıcıya yardımcı olabilir miyiz?" sorusuna cevap verir. Geliştirilecek alanları gösterir.

### 3. Empati Oluşturur

Tüm ekip, kullanıcının gözünden dünyayı görür. Developer'dan CEO'ya herkes aynı hikayeyi anlar.

### 4. Silo'ları Kırar

Farklı departmanlar (pazarlama, satış, ürün, destek) kullanıcının yolculuğundaki kendi rollerini görür. İş birliği artar.

### 5. Önceliklendirme Sağlar

Hangi problem daha kritik? Journey map'teki duygu eğrisi, önceliklendirmeye yardımcı olur.

[INFO]
2x daha etkili
Journey map kullanan ekipler, müşteri memnuniyetinde 2 kat daha fazla iyileşme sağlıyor (Forrester)
[/INFO]

---

## Journey Map Bileşenleri

Bir journey map tipik olarak şu katmanları içerir:

### 1. Persona

Journey map belirli bir kullanıcı tipi için oluşturulur. Kim bu yolculuğu yapıyor?

### 2. Senaryo

Hangi hedef için yolculuk? "Yeni müşterinin ilk satın alımı" veya "Mevcut müşterinin abonelik iptali" gibi.

### 3. Aşamalar (Phases)

Yolculuğun ana bölümleri. Genellikle 4-7 aşama.

Örnek aşamalar:
- Farkındalık
- Değerlendirme
- Satın Alma
- Kullanım
- Destek
- Sadakat/Terk

### 4. Eylemler (Actions)

Her aşamada kullanıcı ne yapıyor? Somut davranışlar.

### 5. Düşünceler (Thoughts)

Kullanıcının kafasından neler geçiyor? Sorular, beklentiler.

### 6. Duygular (Emotions)

Kullanıcı ne hissediyor? Mutlu, kaygılı, sinirli, şaşkın?

### 7. Temas Noktaları (Touchpoints)

Kullanıcı hangi kanallarla etkileşiyor? Web, mobil, mağaza, telefon, email, sosyal medya...

### 8. Pain Points

Nerede sorun yaşıyor? Frustrasyonlar, engeller.

### 9. Fırsatlar (Opportunities)

Ne yapabiliriz? İyileştirme önerileri.

---

## Journey Map Türleri

### Current State (Mevcut Durum)

Şu anki deneyimi gösterir. Problemleri tespit için kullanılır.

### Future State (Gelecek Durum)

İdeal deneyimi gösterir. Vizyon belirleme için kullanılır.

### Day in the Life

Ürün odaklı değil, kullanıcının günü odaklı. Daha geniş bağlamı anlamak için.

### Service Blueprint

Journey map + arka plan süreçleri. Kullanıcının görmediği operasyonları da içerir. Daha teknik.

[TABLE]
| Tür | Odak | Ne Zaman Kullan |
|-----|------|-----------------|
| **Current State** | Mevcut deneyim | Problem tespiti |
| **Future State** | İdeal deneyim | Vizyon/strateji |
| **Day in the Life** | Kullanıcının günü | Bağlam anlama |
| **Service Blueprint** | Arka plan dahil | Operasyon tasarımı |
[/TABLE]

---

## Journey Map Nasıl Oluşturulur?

### Adım 1: Hazırlık

**Persona belirle:**
Hangi kullanıcı tipi için? Tek bir persona seç.

**Senaryo tanımla:**
Hangi yolculuk? Başlangıç ve bitiş noktası ne?

**Kapsam belirle:**
Sadece dijital mi? Tüm temas noktaları mı?

### Adım 2: Veri Topla

Journey map araştırmaya dayanmalı. Veri kaynakları:

- Kullanıcı görüşmeleri
- Anketler
- Analitik veriler
- Müşteri destek kayıtları
- Sosyal medya yorumları
- Satış ekibi feedback'i

[WARNING]
⚠️ Varsayımla journey map oluşturma. Masa başında "bence kullanıcı şöyle hisseder" demek tehlikeli. Araştırma verisi kullan.
[/WARNING]

### Adım 3: Aşamaları Belirle

Yolculuğu mantıksal bölümlere ayır.

**Örnek - E-ticaret yolculuğu:**
1. İhtiyaç Farkındalığı
2. Araştırma
3. Değerlendirme
4. Satın Alma
5. Teslimat Bekleme
6. Ürün Kullanımı
7. Destek (gerekirse)

### Adım 4: Her Aşamayı Doldur

Her aşama için şu bilgileri ekle:

**Eylemler:** Kullanıcı ne yapıyor?
- "Google'da arama yapıyor"
- "Ürün yorumlarını okuyor"
- "Sepete ekliyor"

**Düşünceler:** Ne düşünüyor?
- "Acaba bu ürün işimi görür mü?"
- "Fiyat makul mü?"
- "Kargo ne zaman gelir?"

**Duygular:** Ne hissediyor?
- Heyecanlı, kaygılı, kararsız, mutlu, sinirli...

**Temas noktaları:** Nerede etkileşiyor?
- Google, web sitesi, mobil app, email, müşteri hizmetleri...

### Adım 5: Pain Point ve Fırsatları İşaretle

Her aşamada:
- Kırmızı: Pain point'ler, sorunlar
- Yeşil: Fırsatlar, iyileştirme alanları

### Adım 6: Duygu Eğrisi Çiz

Aşamalar boyunca kullanıcının duygusal yolculuğunu çiz. Yukarı = pozitif, aşağı = negatif.

Bu eğri, en kritik problemleri görsel olarak gösterir.

### Adım 7: Görselleştir ve Paylaş

- Temiz ve okunabilir format
- Ekiple paylaş
- Duvara as veya dijital olarak erişilebilir tut

---

## Journey Map Şablonu

Temel bir journey map şablonu:

[TABLE]
| Katman | Aşama 1 | Aşama 2 | Aşama 3 | Aşama 4 |
|--------|---------|---------|---------|---------|
| **Aşama Adı** | Farkındalık | Araştırma | Satın Alma | Kullanım |
| **Eylemler** | ... | ... | ... | ... |
| **Düşünceler** | ... | ... | ... | ... |
| **Duygular** | 😐 | 🙂 | 😟 | 😊 |
| **Temas Noktaları** | ... | ... | ... | ... |
| **Pain Points** | ... | ... | ... | ... |
| **Fırsatlar** | ... | ... | ... | ... |
[/TABLE]

---

## Journey Map vs User Flow

İkisi farklı amaçlara hizmet eder:

[TABLE]
| Özellik | User Flow | Journey Map |
|---------|-----------|-------------|
| **Odak** | Ürün içi adımlar | Tüm deneyim |
| **Kapsam** | Tek akış | Uçtan uca yolculuk |
| **İçerik** | Ekranlar, tıklamalar | Duygular, düşünceler |
| **Bakış açısı** | Teknik | İnsan odaklı |
| **Temas noktaları** | Sadece ürün | Tüm kanallar |
| **Çıktı formatı** | Akış diyagramı | Görsel hikaye |
[/TABLE]

[COMPARISON]
**User Flow:** "Kullanıcı ürünümde hangi adımları izliyor?"
**Journey Map:** "Kullanıcı bu süreçte neler yaşıyor, hissediyor, düşünüyor?"
[/COMPARISON]

---

## Journey Map Araçları

[TABLE]
| Araç | Ücretsiz | En İyi Yön |
|------|----------|------------|
| **Miro** | Kısmen | İş birliği, şablonlar |
| **FigJam** | Evet | Figma entegrasyonu |
| **Smaply** | Sınırlı | Journey map özelleşmiş |
| **UXPressia** | Sınırlı | Persona + journey map |
| **Lucidchart** | Sınırlı | Profesyonel diyagramlar |
| **Canva** | Evet | Görsel tasarım |
| **PowerPoint/Slides** | Evet | Sunum için |
[/TABLE]

[TIP]
💡 Araç önemli değil, içerik önemli. Kalem kağıtla da etkili journey map oluşturabilirsin. Önemli olan araştırma verisi ve doğru yapı.
[/TIP]

---

## Journey Map Örneği

**Persona:** Ayşe, 32, çalışan anne, online market alışverişi yapıyor

**Senaryo:** İlk kez online market siparişi verme

**Aşamalar:**

**1. İhtiyaç Farkındalığı**
- Eylem: Markete gidecek zamanı olmadığını fark ediyor
- Düşünce: "Online sipariş versem acaba kaliteli ürün gelir mi?"
- Duygu: Kaygılı
- Temas: -
- Pain: Online market güvenilirliği konusunda şüphe

**2. Araştırma**
- Eylem: Google'da "online market" arıyor, arkadaşlarına soruyor
- Düşünce: "Hangisi daha güvenilir? Hangisinin teslimatı hızlı?"
- Duygu: Kararsız
- Temas: Google, WhatsApp, Instagram
- Pain: Çok fazla seçenek, karşılaştırma zor

**3. Uygulama İndirme**
- Eylem: App Store'dan indiriyor, kayıt oluyor
- Düşünce: "Umarım çok karmaşık değildir"
- Duygu: Meraklı
- Temas: App Store, mobil uygulama
- Pain: Uzun kayıt formu

**4. Ürün Seçimi**
- Eylem: Kategorileri geziyor, ürün ekliyor
- Düşünce: "Bu elma taze mi acaba? Gramajı ne kadar?"
- Duygu: Şüpheli → sonra güvenen
- Temas: Mobil uygulama
- Pain: Taze ürünleri görmeden seçmek zor

**5. Ödeme**
- Eylem: Sepeti kontrol, adres giriyor, ödeme yapıyor
- Düşünce: "Teslimat ücreti ne kadar? Minimum sepet tutarı var mı?"
- Duygu: Hafif kaygılı
- Temas: Mobil uygulama
- Pain: Teslimat ücreti sürprizi

**6. Teslimat Bekleme**
- Eylem: Sipariş durumunu kontrol ediyor
- Düşünce: "Ne zaman gelecek? Evde olmalı mıyım?"
- Duygu: Sabırsız
- Temas: Mobil uygulama, SMS
- Pain: Teslimat saati belirsiz

**7. Ürün Teslim Alma**
- Eylem: Ürünleri kontrol ediyor
- Düşünce: "Acaba eksik veya bozuk ürün var mı?"
- Duygu: Endişeli → sonra memnun
- Temas: Kurye, mobil uygulama
- Fırsat: İlk sipariş sonrası teşekkür mesajı

---

## Sık Yapılan Hatalar

### 1. Araştırma olmadan oluşturmak

[COMPARISON]
❌ "Bence kullanıcı burada mutlu oluyor"
✅ "Görüşmelerde 6/8 kullanıcı bu adımda hayal kırıklığı yaşadığını söyledi"
[/COMPARISON]

### 2. Çok detaya girmek

Her küçük adımı dahil etmek yerine, ana aşamalara odaklan. Okunabilirliği koru.

### 3. Sadece ürünü göstermek

Journey map, ürün dışı temas noktalarını da kapsar. Google araması, arkadaş tavsiyesi, müşteri hizmetleri...

### 4. Duyguları ihmal etmek

Sadece eylemler yetmez. Kullanıcının duygusal yolculuğu journey map'in kalbi.

### 5. Bir kez yapıp bırakmak

Journey map yaşayan döküman. Ürün ve kullanıcı değiştikçe güncellenmeli.

### 6. Paylaşmamak

Çekmecede duran journey map işe yaramaz. Ekiple paylaş, duvara as, toplantılarda referans ver.

---

## Journey Map Workshop

Ekiple birlikte journey map oluşturmak için workshop formatı:

[STEPS]
1. Hazırlık (Workshop öncesi)
   - Araştırma verilerini derle
   - Persona ve senaryoyu belirle
   - Katılımcıları davet et (cross-functional)

2. Giriş (15 dk)
   - Journey map nedir, neden yapıyoruz
   - Persona ve senaryo tanıtımı

3. Aşamaları belirleme (20 dk)
   - Beyin fırtınası: Hangi aşamalar var?
   - Oylama ve seçim

4. Aşamaları doldurma (60 dk)
   - Gruplar halinde her aşama için post-it'ler
   - Eylemler, düşünceler, duygular, temas noktaları

5. Pain point ve fırsatlar (20 dk)
   - Sorunları işaretle
   - Fırsatları tartış

6. Sentez (15 dk)
   - Tüm içeriği birleştir
   - Duygu eğrisini çiz

7. Sonraki adımlar (10 dk)
   - En önemli 3 insight
   - Aksiyon planı
[/STEPS]

---

[EXERCISE]
## Şimdi Sen Dene

**30 dakika**

**Görev:** Bir fitness uygulaması için basit journey map oluştur.

**Persona:** Can, 28, ofis çalışanı, kilo vermek istiyor, daha önce spor salonu deneyip bırakmış.

**Senaryo:** İlk kez fitness uygulaması indirip, ilk antrenmanını tamamlama.

**Adımlar:**

1. **Aşamaları belirle (5 dk)**
   Yolculuğu 4-5 aşamaya böl.

2. **Her aşama için doldur (20 dk)**
   - 2-3 eylem
   - 1-2 düşünce
   - Duygu (emoji veya kelime)
   - Temas noktaları
   - Pain point (varsa)

3. **Fırsatları belirle (5 dk)**
   Her pain point için bir iyileştirme önerisi yaz.

**Kontrol:** Journey map'ine bakan biri Can'ın yolculuğunu anlayabilmeli.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Journey map, kullanıcının tüm yolculuğunu görselleştirir: eylemler, düşünceler, duygular, temas noktaları
- Pain point'leri tespit eder, fırsatları ortaya çıkarır, ekip hizalaması sağlar
- Araştırma verisine dayanmalı, varsayımla değil
- Current state, future state, service blueprint gibi türleri var
- User flow teknik odaklı (ürün adımları), journey map insan odaklı (deneyim)
- Workshop formatıyla cross-functional ekiple birlikte oluşturulabilir
- Yaşayan döküman: güncelle, paylaş, referans ver
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Information Architecture Temelleri](/kutuphane/information-architecture)

**Sonraki:** [Empathy Map Oluşturma](/kutuphane/empathy-map)

**İlgili konular:**
- [Persona Oluşturma Rehberi](/kutuphane/persona-olusturma)
- [User Flow ve Task Flow](/kutuphane/user-flow-task-flow)
- [Kullanıcı Görüşmesi Nasıl Yapılır?](/kutuphane/kullanici-gorusmesi)

**İlgili Roadmap:** UX Designer Roadmap → Research & Strateji

---

## Kaynaklar

Derinleşmek istersen:

- [Customer Journey Mapping - NNGroup](https://www.nngroup.com/articles/customer-journey-mapping/) (İngilizce, 10 dk)
- [Journey Mapping 101 - NNGroup](https://www.nngroup.com/articles/journey-mapping-101/) (İngilizce, 8 dk)
- [Service Design Tools - Journey Map](https://servicedesigntools.org/tools/customer-journey-map) (İngilizce, şablonlar)
`,
  },
  "empathy-map": {
    id: "empathy-map",
    title: "Empathy Map Oluşturma",
    subtitle: "Kullanıcını Derinlemesine Anlamanın Yolu",
    titleEn: "Empathy Mapping",
    slug: "empathy-map",
    description: "Empathy Map nedir, nasıl oluşturulur? Kullanıcının düşüncelerini, duygularını ve davranışlarını anlamak için empati haritası rehberi.",
    category: "ux-research",
    readingTime: 11,
    featured: false,
    publishedAt: "2025-01-14",
    heroImage: "",
    author: "Serhat Bahçeliler",
    content: `# Empathy Map Oluşturma: Kullanıcını Derinlemesine Anlamanın Yolu

**Seviye:** Başlangıç  
**Kategori:** UX Research  
**Son güncelleme:** Ocak 2025

---

## Giriş

Kullanıcı görüşmesi yaptın, notlar aldın. Şimdi bu bilgileri nasıl anlamlı hale getireceksin?

Sayfalar dolusu not arasında kaybolmak yerine, kullanıcıyı tek bir görselde özetleyebilirsin. Ne söylüyor, ne düşünüyor, ne yapıyor, ne hissediyor?

**Empathy Map**, kullanıcıyı anlamanın en hızlı ve etkili yollarından biri. 15-20 dakikada oluşturabilirsin, ama sağladığı içgörüler tasarım kararlarını aylarca yönlendirebilir.

Bu yazıda empathy map'in ne olduğunu, nasıl oluşturulacağını ve etkili kullanımını öğreneceksin.

---

## Empathy Map Nedir?

[CALLOUT]
**Empathy Map:**
Bir kullanıcının ne söylediğini, düşündüğünü, yaptığını ve hissettiğini dört kadrana ayırarak görselleştiren araç. Araştırma verilerini sentezlemek ve kullanıcıyla empati kurmak için kullanılır.
[/CALLOUT]

Empathy map, Dave Gray tarafından XPLANE'de geliştirildi. Basit ama güçlü bir çerçeve sunuyor.

Temel fikir: Kullanıcıyı dışarıdan (söyledikleri, yaptıkları) ve içeriden (düşündükleri, hissettikleri) anlamak.

---

## Empathy Map Ne İşe Yarar?

### 1. Araştırma Verilerini Sentezler

Dağınık notları organize eder. "Bu kullanıcı hakkında ne biliyoruz?" sorusuna yapılandırılmış cevap verir.

### 2. Empati Oluşturur

Ekibin kullanıcıyı gerçek bir insan olarak görmesini sağlar. Soyut "kullanıcı" kavramı somutlaşır.

### 3. Boşlukları Gösterir

Hangi kadran boş kaldı? Orada bilgi eksikliği var demektir. Daha fazla araştırma gerekebilir.

### 4. Hızlı ve Kolay

Persona kadar kapsamlı değil ama çok daha hızlı. Workshop'ta 20 dakikada oluşturulabilir.

### 5. İş Birliğini Destekler

Ekiple birlikte doldurulabilir. Farklı bakış açıları tek görselde birleşir.

[INFO]
20 dakika
Bir empathy map oluşturmak için yeterli süre
[/INFO]

---

## Empathy Map'in Yapısı

### Klasik Dört Kadran

**1. Says (Söylüyor)**
Kullanıcının doğrudan söylediği şeyler. Görüşmelerden alıntılar.

Örnek notlar:
- "Bu çok karmaşık"
- "Hızlı bir şekilde işimi halletmek istiyorum"
- "Fiyatları karşılaştırmak zor"

**2. Thinks (Düşünüyor)**
Kullanıcının kafasından geçenler. Söylemedikleri ama düşündükleri.

Örnek notlar:
- "Acaba güvenilir mi?"
- "Daha iyi bir alternatif var mı?"
- "Bu kadar kişisel bilgi vermek zorunda mıyım?"

**3. Does (Yapıyor)**
Kullanıcının gözlemlenen davranışları. Aksiyonlar, alışkanlıklar.

Örnek notlar:
- Fiyatları not defterine yazıyor
- Yorumları okuyor ama yazmıyor
- Birden fazla sekme açıyor

**4. Feels (Hissediyor)**
Kullanıcının duyguları. Kaygılar, mutluluklar, frustrasyonlar.

Örnek notlar:
- Kaygılı (doğru seçimi yapmaktan)
- Sabırsız (yavaş yükleme)
- Güvensiz (ödeme güvenliği)

### Güncellenmiş Versiyon

NNGroup'un güncellediği versiyonda iki ek bölüm var:

**5. Goals (Hedefler)**
Kullanıcı ne başarmak istiyor?

**6. Pains (Acılar)**
Kullanıcının engelleri, frustrasyonları ne?

---

## Says vs Thinks: Fark Nedir?

Bu iki kadran en çok karıştırılan bölüm.

[TABLE]
| Says (Söylüyor) | Thinks (Düşünüyor) |
|-----------------|-------------------|
| Doğrudan alıntı | Çıkarım, varsayım |
| Sesli ifade edilmiş | İçsel, söylenmemiş |
| "Bu butonu bulamıyorum" | "Bu site profesyonel görünmüyor" |
| Objektif | Subjektif |
[/TABLE]

[COMPARISON]
**Says:** "Teslimat süresi çok uzun" (kullanıcı bunu söyledi)
**Thinks:** "Bu kadar bekleyemem, başka yerden alayım" (bunu söylemedi ama muhtemelen düşünüyor)
[/COMPARISON]

[TIP]
💡 "Thinks" kadranı için dikkatli ol. Bunlar senin yorumların, kullanıcının gerçekten ne düşündüğünü bilemezsin. Araştırma verilerine dayandır.
[/TIP]

---

## Empathy Map Nasıl Oluşturulur?

### Adım 1: Amacı Belirle

Kimin için empathy map yapıyorsun? Hangi bağlamda?

- Belirli bir persona için
- Belirli bir senaryo/görev için
- Belirli bir araştırma sonrası

### Adım 2: Veri Topla

Empathy map araştırmaya dayanmalı:

- Kullanıcı görüşmesi notları
- Gözlem notları
- Anket açık uçlu cevapları
- Müşteri destek kayıtları
- Sosyal medya yorumları

### Adım 3: Şablonu Hazırla

Dört (veya altı) kadranı çiz:
- Whiteboard
- Kağıt
- FigJam/Miro
- Post-it'ler

### Adım 4: Kadranları Doldur

Her veri parçasını uygun kadrana yerleştir:

- Doğrudan alıntı → Says
- Gözlemlenen davranış → Does
- Yorumlanan düşünce → Thinks
- Tespit edilen duygu → Feels

### Adım 5: Paternleri Bul

Doldurduktan sonra:
- Tekrar eden temalar ne?
- En güçlü duygular hangileri?
- Söyledikleri ile yaptıkları tutarlı mı?
- Boşluklar nerede?

### Adım 6: İçgörüleri Çıkar

Empathy map'ten ne öğrendik?
- Ana pain point'ler
- Gizli ihtiyaçlar
- Tasarım fırsatları

---

## Empathy Map Örneği

**Kullanıcı:** Online banka müşterisi, ilk kez kredi başvurusu yapıyor

**Senaryo:** Mobil uygulamadan kredi başvurusu

[TABLE]
| Kadran | İçerik |
|--------|--------|
| **Says** | "Neden bu kadar çok belge istiyor?", "Faiz oranını anlamadım", "Ne kadar sürede onaylanır?" |
| **Thinks** | "Acaba reddedilir miyim?", "Başka bankada daha düşük faiz var mı?", "Kredi notum yeterli mi?" |
| **Does** | Diğer bankaların faizlerini karşılaştırıyor, hesap makinesinde ödeme tutarı hesaplıyor, eşine danışıyor |
| **Feels** | Kaygılı (reddedilme), Kararsız (doğru seçim mi?), Sabırsız (uzun form), Güvensiz (kişisel bilgi paylaşımı) |
| **Goals** | Hızlı onay almak, en düşük faizi bulmak, süreci anlamak |
| **Pains** | Belirsiz süre, karmaşık terimler, çok fazla belge |
[/TABLE]

**Çıkarılan içgörüler:**
- Kullanıcı faiz oranını anlamakta zorlanıyor → Basit açıklama/görselleştirme gerekli
- Reddedilme kaygısı yüksek → Ön onay özelliği değerli olabilir
- Süre belirsizliği frustrasyona yol açıyor → Tahmini süre göstermek önemli

---

## Empathy Map vs Persona

İkisi farklı araçlar:

[TABLE]
| Özellik | Empathy Map | Persona |
|---------|-------------|---------|
| **Kapsam** | Anlık durum odaklı | Kapsamlı profil |
| **İçerik** | Düşünce, duygu, davranış | Demografik, hedef, hikaye |
| **Süre** | 15-30 dakika | Saatler/günler |
| **Derinlik** | Yüzeysel ama hızlı | Derin ama yavaş |
| **Kullanım** | Araştırma sentezi | Referans döküman |
[/TABLE]

[COMPARISON]
**Empathy Map:** "Bu kullanıcı şu an ne yaşıyor?"
**Persona:** "Bu kullanıcı kim?"
[/COMPARISON]

**Birlikte kullanım:**
- Empathy map → Persona oluşturmak için girdi
- Persona varsa → Empathy map ile belirli senaryoyu derinleştir

---

## Empathy Map Workshop

Ekiple birlikte empathy map oluşturmak için:

[STEPS]
1. Hazırlık (5 dk)
   - Araştırma verilerini paylaş
   - Kullanıcı ve senaryoyu tanıt

2. Bireysel doldurum (10 dk)
   - Herkes post-it'lere yazar
   - Her kadran için en az 3-4 not

3. Paylaşım (10 dk)
   - Sırayla post-it'leri yapıştır
   - Kısa açıklama yap

4. Gruplama (5 dk)
   - Benzer notları grupla
   - Tekrarları birleştir

5. Tartışma (10 dk)
   - Şaşırtıcı olan ne?
   - Eksik ne?
   - En önemli içgörü ne?

6. Sonuç (5 dk)
   - 3 ana içgörü belirle
   - Sonraki adımları planla
[/STEPS]

**Toplam süre:** 45 dakika

---

## Tek Kullanıcı vs Segment

Empathy map iki şekilde kullanılabilir:

### Tek Kullanıcı İçin

Bir görüşme sonrası, o kullanıcıyı anlamak için. Daha spesifik, daha detaylı.

### Segment/Persona İçin

Birden fazla kullanıcının verilerini birleştirerek, kullanıcı grubunu temsil eden empathy map. Daha genel, pattern odaklı.

[TIP]
💡 Her iki yaklaşım da geçerli. Tek kullanıcı empathy map'i araştırma notu gibi, segment empathy map'i ise persona alternatifi gibi kullanılabilir.
[/TIP]

---

## Sık Yapılan Hatalar

### 1. Araştırma olmadan doldurmak

[COMPARISON]
❌ "Bence kullanıcı şöyle hissediyordur"
✅ "Görüşmede kullanıcı 'çok stresli' dedi ve ses tonu gergin idi"
[/COMPARISON]

### 2. Says ve Thinks'i karıştırmak

Says = doğrudan alıntı, Thinks = çıkarım. İkisini ayır.

### 3. Yüzeysel doldurmak

"Mutlu", "Üzgün" gibi genel ifadeler yerine spesifik ol. "Teslimat süresinin belirsizliğinden kaygılı" daha değerli.

### 4. Tek kadrana yığılmak

Dört kadran dengeli olmalı. Biri çok dolu, diğeri boşsa, araştırmada eksiklik var.

### 5. Bir kez yapıp bırakmak

Empathy map yaşayan döküman. Yeni verilerle güncelle.

---

## Empathy Map Kullanım Alanları

### Araştırma Sonrası Sentez

Görüşme veya gözlem sonrası verileri organize etmek için.

### Workshop Aktivitesi

Ekibin kullanıcıyı birlikte anlaması için.

### Persona Geliştirme

Persona oluşturmadan önce veya mevcut personayı derinleştirmek için.

### Tasarım Sprintleri

Hızlı kullanıcı anlayışı oluşturmak için.

### Stakeholder Sunumu

Kullanıcı perspektifini paylaşmak için.

---

## Araçlar

[TABLE]
| Araç | Ücretsiz | Özellik |
|------|----------|---------|
| **Miro** | Kısmen | Hazır şablonlar, iş birliği |
| **FigJam** | Evet | Figma entegrasyonu |
| **Mural** | Sınırlı | Workshop odaklı |
| **Canva** | Evet | Görsel şablonlar |
| **Post-it + Whiteboard** | Evet | Yüz yüze için ideal |
| **Google Slides** | Evet | Basit, erişilebilir |
[/TABLE]

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Bir e-ticaret müşterisi için empathy map oluştur.

**Senaryo:** Kullanıcı online ayakkabı siparişi veriyor ama beden konusunda endişeli.

**Adımlar:**

1. **Dört kadranı çiz** (kağıt veya dijital)

2. **Her kadran için en az 4 madde yaz:**

   **Says:** Kullanıcı ne söyler?
   - Örnek: "Beden tablosu var mı?"

   **Thinks:** Ama ne düşünür?
   - Örnek: "Ya küçük gelirse iade süreci nasıl?"

   **Does:** Ne yapar?
   - Örnek: Yorumlarda beden bilgisi arar

   **Feels:** Ne hisseder?
   - Örnek: Kararsız

3. **İçgörü çıkar:**
   - Bu kullanıcının en büyük kaygısı ne?
   - Tasarımla nasıl yardımcı olabilirsin?

**Kontrol:** Empathy map'ine bakan biri, bu kullanıcının deneyimini anlayabilmeli.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Empathy Map, kullanıcının söylediğini, düşündüğünü, yaptığını ve hissettiğini görselleştirir
- Dört kadran: Says, Thinks, Does, Feels (+ Goals, Pains)
- Araştırma verilerini sentezlemek için hızlı ve etkili
- Says = doğrudan alıntı, Thinks = çıkarım - ikisini karıştırma
- Persona'dan daha hızlı, daha az kapsamlı
- Workshop formatında ekiple birlikte oluşturulabilir
- Araştırma verisi olmadan varsayımla doldurma
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [User Journey Map Oluşturma](/kutuphane/user-journey-map)

**Sonraki:** Anket Tasarımı: Doğru Soru Sorma *(yakında)*

**İlgili konular:**
- [Persona Oluşturma Rehberi](/kutuphane/persona-olusturma)
- [Kullanıcı Görüşmesi Nasıl Yapılır?](/kutuphane/kullanici-gorusmesi)
- [User Journey Map Oluşturma](/kutuphane/user-journey-map)

**İlgili Roadmap:** UX Designer Roadmap → Research

---

## Kaynaklar

Derinleşmek istersen:

- [Empathy Mapping - NNGroup](https://www.nngroup.com/articles/empathy-mapping/) (İngilizce, 8 dk)
- [Updated Empathy Map - NNGroup](https://www.nngroup.com/articles/empathy-mapping/) (İngilizce, güncel versiyon)
- [Empathy Map Canvas - Dave Gray](https://gamestorming.com/empathy-mapping/) (İngilizce, orijinal kaynak)
`,
  },
  "anket-tasarimi": {
    id: "anket-tasarimi",
    title: "Anket Tasarımı: Doğru Soru Sorma",
    subtitle: "Etkili UX Anketi Oluşturma Rehberi",
    titleEn: "Survey Design",
    slug: "anket-tasarimi",
    description: "UX anketi nasıl tasarlanır? Doğru soru sorma teknikleri, soru tipleri, yaygın hatalar ve anket best practice'leri. Kapsamlı anket rehberi.",
    category: "ux-research",
    readingTime: 14,
    featured: false,
    publishedAt: "2025-01-15",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Anket Tasarımı: Doğru Soru Sorma Sanatı

**Seviye:** Başlangıç - Orta  
**Kategori:** UX Research  
**Son güncelleme:** Ocak 2025

---

## Giriş

"Kullanıcılarımızın %78'i memnun" diyor rapor. Ama bu sayı gerçeği yansıtıyor mu?

Anket tasarımı, görünenden çok daha zor bir iş. Yanlış soru sormak, yanlış cevap almak demek. Yönlendirici bir soru, verileri tamamen çarpıtabilir. Çok uzun bir anket, tamamlama oranını düşürür ve sadece en sabırlı kullanıcıların cevaplarını alırsın.

İyi bir anket, doğru soruları, doğru sırayla, doğru formatta sorar. Ve en önemlisi: gerçekten cevap verilmesi gereken soruları sorar.

Bu yazıda etkili anket tasarımının temellerini, soru tiplerini ve kaçınılması gereken hataları öğreneceksin.

---

## Anket Ne Zaman Kullanılır?

Anketler her araştırma sorusu için uygun değil.

### Anket İçin Uygun

- Geniş kitleden nicel veri toplama
- Kullanıcı memnuniyeti ölçme (CSAT, NPS)
- Demografik bilgi toplama
- Özellik önceliklendirme
- Kullanım sıklığı ve paternleri
- Pazar araştırması

### Anket İçin Uygun Değil

- "Neden" sorusuna cevap arama
- Derinlemesine kullanıcı anlayışı
- Karmaşık davranışları anlama
- Keşif aşaması araştırması
- Kullanılabilirlik sorunları tespiti

[COMPARISON]
**Anket:** "Kaç kullanıcı bu özelliği kullanıyor?" (nicel)
**Görüşme:** "Neden bu özelliği kullanmıyorlar?" (nitel)
[/COMPARISON]

[TIP]
💡 Anketler "ne" ve "ne kadar" sorularını cevaplar. "Neden" için kullanıcı görüşmesi veya gözlem daha etkili.
[/TIP]

---

## Anket Tasarım Süreci

### Adım 1: Hedefi Belirle

Anketle ne öğrenmek istiyorsun? Spesifik ol.

[COMPARISON]
❌ Genel: "Kullanıcıları tanımak istiyoruz"
✅ Spesifik: "Checkout'u terk eden kullanıcıların nedenlerini anlamak istiyoruz"
[/COMPARISON]

### Adım 2: Hedef Kitleyi Tanımla

Kim cevap verecek? Nasıl ulaşacaksın?

- Mevcut kullanıcılar mı, potansiyel mi?
- Hangi segmentler?
- Minimum kaç cevap gerekli?

### Adım 3: Soruları Tasarla

Her soru hedefe hizmet etmeli. "Nice to have" soruları çıkar.

### Adım 4: Sıralamayı Belirle

- Kolay sorularla başla
- Hassas sorular sona
- Mantıksal akış

### Adım 5: Test Et

Anketi yayınlamadan önce:
- 3-5 kişiyle pilot test
- Süreyi ölç
- Anlaşılmayan soruları tespit et

### Adım 6: Yayınla ve İzle

- Cevap oranını takip et
- Yarıda bırakma noktalarını analiz et
- Gerekirse düzeltme yap

---

## Soru Tipleri

### 1. Kapalı Uçlu Sorular

Önceden belirlenmiş seçeneklerden seçim.

**Tek seçimli (Single choice):**
Ürünümüzü ne sıklıkla kullanıyorsunuz?
○ Her gün
○ Haftada birkaç kez
○ Ayda birkaç kez
○ Nadiren
○ Hiç kullanmıyorum

**Çok seçimli (Multiple choice):**
Hangi özellikleri kullanıyorsunuz? (Birden fazla seçebilirsiniz)
☐ Dashboard
☐ Raporlar
☐ Entegrasyonlar
☐ API
☐ Hiçbiri

**Avantajları:** Analizi kolay, cevaplamasi hızlı
**Dezavantajları:** Seçenekler dışında cevap alamazsın

### 2. Likert Ölçeği

Katılım veya memnuniyet derecesi ölçer.
"Uygulamanın kullanımı kolay" ifadesine ne kadar katılıyorsunuz?
1 - Kesinlikle katılmıyorum
2 - Katılmıyorum
3 - Ne katılıyorum ne katılmıyorum
4 - Katılıyorum
5 - Kesinlikle katılıyorum

**5'li vs 7'li ölçek:**

[TABLE]
| Ölçek | Avantaj | Dezavantaj |
|-------|---------|------------|
| **5'li** | Basit, hızlı | Daha az hassas |
| **7'li** | Daha hassas | Seçim zorluğu |
[/TABLE]

[TIP]
💡 Çoğu UX araştırması için 5'li ölçek yeterli. 7'li ölçek akademik araştırmalarda tercih edilir.
[/TIP]

### 3. NPS (Net Promoter Score)

Tavsiye etme olasılığını ölçer.
Bu ürünü bir arkadaşınıza veya meslektaşınıza tavsiye etme olasılığınız nedir?
0 -------- 5 -------- 10
Hiç olası değil    Çok olası

**Hesaplama:**
- 0-6: Detractors (Eleştirenler)
- 7-8: Passives (Pasifler)
- 9-10: Promoters (Destekçiler)
- NPS = %Promoters - %Detractors

### 4. Açık Uçlu Sorular

Serbest metin cevabı.
Bu özelliği geliştirmek için öneriniz var mı?
[________________]

**Avantajları:** Zengin içgörü, beklenmedik cevaplar
**Dezavantajları:** Analizi zor, düşük cevap oranı

### 5. Derecelendirme (Rating)

Yıldız, emoji veya sayısal değerlendirme.
Bugünkü deneyiminizi nasıl değerlendirirsiniz?
☆ ☆ ☆ ☆ ☆

### 6. Sıralama (Ranking)

Seçenekleri önem sırasına koyma.
Aşağıdaki özellikleri önem sırasına göre sıralayın:

[___]
[___]
[___]


---

## İyi Soru Yazma Kuralları

### 1. Net ve Kısa Ol

[COMPARISON]
❌ "Genel olarak düşündüğünüzde, ürünümüzü kullanırken yaşadığınız deneyim hakkında ne söylersiniz?"

✅ "Ürünümüzü kullanmak kolay mı?"
[/COMPARISON]

### 2. Tek Konu Sor

[COMPARISON]
❌ "Ürünümüz hızlı ve kullanımı kolay mı?" (iki soru bir arada)

✅ "Ürünümüz hızlı mı?"
✅ "Ürünümüzün kullanımı kolay mı?"
[/COMPARISON]

### 3. Yönlendirici Olma

[COMPARISON]
❌ "Bu harika yeni özelliği ne kadar beğendiniz?"

✅ "Bu yeni özellik hakkında ne düşünüyorsunuz?"
[/COMPARISON]

### 4. Varsayımda Bulunma

[COMPARISON]
❌ "Karanlık mod özelliğini ne sıklıkla kullanıyorsunuz?" (kullandığını varsayıyor)

✅ "Karanlık mod özelliğini kullanıyor musunuz?" → Evetse: "Ne sıklıkla?"
[/COMPARISON]

### 5. Jargondan Kaçın

[COMPARISON]
❌ "API entegrasyonlarımızın UX'i hakkında ne düşünüyorsunuz?"

✅ "Diğer uygulamalarla bağlantı kurma deneyiminiz nasıldı?"
[/COMPARISON]

### 6. Negatif Soru Sorma

[COMPARISON]
❌ "Ürünümüzün kullanımının zor olmadığını düşünmüyor musunuz?"

✅ "Ürünümüzü kullanmak kolay mı?"
[/COMPARISON]

---

## Anket Yapısı

### Giriş

- Anketi kimin yaptığını
- Amacı
- Tahmini süreyi
- Gizlilik bilgisi
Bu anket [Şirket Adı] tarafından ürün deneyiminizi
iyileştirmek amacıyla hazırlanmıştır.
Yaklaşık 5 dakika sürecektir.
Cevaplarınız anonim tutulacaktır.

### Isınma Soruları

Kolay, tehditkâr olmayan sorularla başla.
Ürünümüzü ne kadar süredir kullanıyorsunuz?

### Ana Sorular

Asıl öğrenmek istediğin konular.

### Demografik Sorular

Sona bırak. Hassas bilgiler içerebilir.
Yaş aralığınız:
○ 18-24
○ 25-34
...

### Kapanış

Teşekkür ve (opsiyonel) iletişim fırsatı.
Anketimizi tamamladığınız için teşekkür ederiz!
Daha fazla görüş paylaşmak isterseniz: [email]

---

## Yaygın Anket Metrikleri

### CSAT (Customer Satisfaction Score)

Genel memnuniyet ölçümü.
Bu deneyimden ne kadar memnunsunuz?
1 (Hiç memnun değilim) - 5 (Çok memnunun)

**Hesaplama:** (Memnun cevaplar / Toplam cevap) x 100

### NPS (Net Promoter Score)

Tavsiye olasılığı (yukarıda detaylandırıldı).

**Benchmark:** +50 üzeri çok iyi, +70 üzeri mükemmel.

### CES (Customer Effort Score)

Görev tamamlama kolaylığı.
[Görev] yapmak ne kadar kolaydı?
1 (Çok zor) - 7 (Çok kolay)

### SUS (System Usability Scale)

10 soruluk standart kullanılabilirlik ölçeği.

---

## Anket Uzunluğu

[TABLE]
| Süre | Soru Sayısı | Tamamlama Oranı |
|------|-------------|-----------------|
| 1-2 dk | 5-7 soru | %90+ |
| 3-5 dk | 8-12 soru | %80+ |
| 5-10 dk | 13-20 soru | %60-70 |
| 10+ dk | 20+ soru | %50 altı |
[/TABLE]

[WARNING]
⚠️ Her ek soru tamamlama oranını düşürür. Gerçekten gerekli olmayan soruları çıkar.
[/WARNING]

---

## Yaygın Hatalar

### 1. Çok Uzun Anket

Problem: Tamamlama oranı düşer, kalite düşer.
Çözüm: Maksimum 10-15 soru, 5-10 dakika.

### 2. Yönlendirici Sorular

Problem: Veriyi çarpıtır.
Çözüm: Nötr dil kullan, pilot test yap.

### 3. Çift Anlamlı Sorular

Problem: Hangi konuya cevap verdiği belirsiz.
Çözüm: Her soru tek konu.

### 4. Eksik Seçenekler

Problem: Kullanıcı kendini bulamıyor.
Çözüm: "Diğer" seçeneği ekle, "Hiçbiri" ekle.

### 5. Zorunlu Tüm Sorular

Problem: Cevaplamak istemeyenler anketi terk eder.
Çözüm: Sadece kritik soruları zorunlu yap.

### 6. Açık Uçlu Soru Abartısı

Problem: Analiz zorlaşır, cevap oranı düşer.
Çözüm: 1-2 açık uçlu soru yeterli.

### 7. Mantık Hataları

Problem: Alakasız sorular gösterilir.
Çözüm: Skip logic kullan (cevaba göre dallanma).

---

## Anket Araçları

[TABLE]
| Araç | Ücretsiz Plan | En İyi Yön |
|------|---------------|------------|
| **Typeform** | 10 soru/ay | Güzel tasarım, UX |
| **Google Forms** | Sınırsız | Ücretsiz, basit |
| **SurveyMonkey** | 10 soru | Gelişmiş analiz |
| **Maze** | Sınırlı | UX araştırma entegre |
| **Hotjar** | Sınırlı | Site içi anket |
| **Tally** | Sınırsız | Notion benzeri, ücretsiz |
| **Airtable Forms** | Sınırlı | Veritabanı entegre |
[/TABLE]

---

## Cevap Oranını Artırma

### Dağıtımda

- Doğru zamanda gönder (iş saatleri, haftaiçi)
- Kişiselleştirilmiş davet
- Hatırlatma gönder (1 kez)
- Mobil uyumlu olduğundan emin ol

### Anket İçinde

- Kısa tut
- İlerleme göster
- Zorunlu soruları minimize et
- "Bilmiyorum" seçeneği ekle

### Motivasyon

- Amacı açıkla
- Sonuçları paylaşacağını söyle
- (Dikkatli) Teşvik sun (çekiliş, indirim)

---

[EXERCISE]
## Şimdi Sen Dene

**25 dakika**

**Görev:** Bir mobil uygulama için kısa kullanıcı memnuniyeti anketi tasarla.

**Senaryo:** E-ticaret uygulaması, son 30 günde alışveriş yapmış kullanıcılara gönderilecek.

**Gereksinimler:**
- Maksimum 8 soru
- 3 dakikada tamamlanabilmeli
- Hem nicel hem nitel veri toplamalı

**Adımlar:**

1. **Hedef belirle** (1 dk)
   Bu anketle ne öğrenmek istiyorsun? 2-3 madde yaz.

2. **Soru listesi oluştur** (10 dk)
   - 1 NPS sorusu
   - 2-3 Likert ölçeği sorusu
   - 1-2 çoktan seçmeli soru
   - 1 açık uçlu soru

3. **Sıralamayı belirle** (5 dk)
   Kolay → Zor, Genel → Spesifik

4. **Kontrol et** (5 dk)
   - Yönlendirici soru var mı?
   - Çift anlamlı soru var mı?
   - Jargon var mı?

5. **Giriş ve kapanış yaz** (4 dk)

**Test:** Anketi bir arkadaşına göster, anlaşılmayan yer var mı?
[/EXERCISE]

---

[SUMMARY]
## Özet

- Anketler nicel veri toplamak için ideal, "neden" için yetersiz
- Soru tipleri: kapalı uçlu, Likert, NPS, açık uçlu, sıralama
- İyi soru: net, tek konulu, yönlendirici olmayan, jargonsuz
- Anket yapısı: giriş → ısınma → ana sorular → demografik → kapanış
- İdeal uzunluk: 5-10 dakika, 10-15 soru
- Yaygın metrikler: CSAT, NPS, CES, SUS
- Her ek soru tamamlama oranını düşürür - sadece gerekli olanı sor
- Yayınlamadan önce pilot test yap
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Empathy Map Oluşturma](/kutuphane/empathy-map)

**Sonraki:** A/B Test Temelleri *(yakında)*

**İlgili konular:**
- [Kullanıcı Görüşmesi Nasıl Yapılır?](/kutuphane/kullanici-gorusmesi)
- [Kullanılabilirlik Testi Nedir?](/kutuphane/kullanilabilirlik-testi)
- NPS Nedir ve Nasıl Kullanılır? *(yakında)*

**İlgili Roadmap:** UX Designer Roadmap → Research

---

## Kaynaklar

Derinleşmek istersen:

- [Survey Design - NNGroup](https://www.nngroup.com/articles/survey-best-practices/) (İngilizce, 10 dk)
- [Writing Survey Questions - Pew Research](https://www.pewresearch.org/our-methods/u-s-surveys/writing-survey-questions/) (İngilizce, kapsamlı)
- [Just Enough Research - Erika Hall](https://abookapart.com/products/just-enough-research) (Kitap, anket bölümü mükemmel)
`,
  },
  "ab-test-temelleri": {
    id: "ab-test-temelleri",
    title: "A/B Test Temelleri",
    subtitle: "Veriyle Tasarım Kararı Alma Rehberi",
    titleEn: "A/B Testing Basics",
    slug: "ab-test-temelleri",
    description: "A/B test nedir, nasıl yapılır? Hipotez oluşturma, sample size, istatistiksel anlamlılık. Tasarımcılar için A/B test rehberi.",
    category: "ux-research",
    readingTime: 13,
    featured: false,
    publishedAt: "2025-01-15",
    heroImage: "",
    author: "DesignAtlas",
    content: `# A/B Test Temelleri: Veriyle Tasarım Kararı Alma Rehberi

**Seviye:** Orta  
**Kategori:** UX Research  
**Son güncelleme:** Ocak 2025

---

## Giriş

"Mavi buton mu, yeşil buton mu?"

Bu soruyu toplantıda tartışarak çözemezsin. Herkesin bir fikri var, kimse kanıtlayamıyor. HiPPO (Highest Paid Person's Opinion) kazanıyor.

Ya da... gerçek kullanıcılara sorarsın.

**A/B test**, tasarım kararlarını fikirlerden değil, veriden almayı sağlar. İki versiyonu gerçek kullanıcılara gösterirsin, hangisi daha iyi performans gösteriyorsa o kazanır.

Basit görünür ama doğru yapmak zor. Yanlış hipotez, yetersiz sample size, erken durdurma - hepsi yanlış sonuçlara götürür.

Bu yazıda A/B testin temellerini, nasıl yapılacağını ve dikkat edilmesi gerekenleri öğreneceksin.

---

## A/B Test Nedir?

[CALLOUT]
**A/B Test:**
İki farklı versiyonu (A ve B) rastgele kullanıcı gruplarına gösterip hangisinin belirlenen metrikte daha iyi performans gösterdiğini ölçen kontrollü deneysel araştırma yöntemi.
[/CALLOUT]

**Temel mantık:**
- Versiyon A (Control): Mevcut tasarım
- Versiyon B (Variant): Yeni tasarım
- Kullanıcılar rastgele ikisinden birine yönlendirilir
- Belirlenen metrik karşılaştırılır
- İstatistiksel olarak anlamlı fark varsa, kazanan belirlenir

---

## A/B Test Ne Zaman Kullanılır?

### Uygun Durumlar

- Buton rengi, metin, konum değişiklikleri
- CTA (Call to Action) optimizasyonu
- Sayfa layout'u karşılaştırması
- Fiyatlandırma sayfası varyasyonları
- Onboarding akışı alternatifleri
- Email konu satırı testi

### Uygun Olmayan Durumlar

- Yeterli trafik yoksa (sample size)
- Çok büyük değişiklikler (A/B yerine kullanıcı testi)
- "Neden" sorusu soruluyorsa (nitel araştırma gerek)
- Marka veya strateji kararları
- Uzun satın alma döngüsü olan ürünler

[TIP]
💡 A/B test "hangisi daha iyi" sorusuna cevap verir. "Neden daha iyi" için kullanılabilirlik testi veya görüşme gerekir.
[/TIP]

---

## A/B Test Süreci

### Adım 1: Hipotez Oluştur

Test rastgele yapılmaz. Bir hipotezle başlar.

**Hipotez yapısı:**
"Eğer [değişiklik] yaparsak, [metrik]'te [yön] göreceğiz, çünkü [neden]."

[COMPARISON]
❌ Kötü: "Yeşil buton daha iyi olur"

✅ İyi: "Eğer CTA butonunu yeşil yaparsak, tıklama oranında %10 artış göreceğiz, çünkü yeşil renk 'devam et' mesajı veriyor ve sayfadaki diğer elementlerden ayrışıyor."
[/COMPARISON]

### Adım 2: Metrik Belirle

Ne ölçüyorsun? Tek bir primary metrik seç.

**Yaygın metrikler:**
- Conversion rate (dönüşüm oranı)
- Click-through rate (CTR)
- Bounce rate (hemen çıkma)
- Time on page
- Revenue per user
- Sign-up rate

[WARNING]
⚠️ Tek primary metrik seç. Çok metrik takip edersen, birinde tesadüfen anlamlı sonuç bulma olasılığın artar (multiple testing problem).
[/WARNING]

### Adım 3: Sample Size Hesapla

Kaç kullanıcı gerekli? Bu, testin gücünü belirler.

**Etkileyen faktörler:**
- Mevcut conversion rate (baseline)
- Tespit etmek istediğin minimum fark (MDE)
- İstatistiksel güven seviyesi (genellikle %95)
- İstatistiksel güç (genellikle %80)

[FORMÜL KUTUSU]
Başlık: Sample Size Hesaplama
Formül: Calculatorler kullanılır (Evan Miller, Optimizely)
Açıklama: Baseline %5, MDE %20 relatif artış (%5 → %6) için yaklaşık 25.000 kullanıcı/varyant gerekir
Örnek: %2 baseline, %50 relatif MDE → ~6.000 kullanıcı/varyant
[/FORMÜL KUTUSU]

**Online hesaplayıcılar:**
- Evan Miller Sample Size Calculator
- Optimizely Sample Size Calculator
- AB Test Guide Calculator

### Adım 4: Testi Kur

- A ve B versiyonlarını hazırla
- Rastgele yönlendirmeyi kur
- Tracking'i doğrula
- QA yap

### Adım 5: Testi Çalıştır

- Belirlenen sample size'a ulaşana kadar bekle
- Minimum 1-2 tam hafta (hafta içi/sonu etkisi)
- Erken bakmaktan kaçın (peeking)

### Adım 6: Sonuçları Analiz Et

- İstatistiksel anlamlılık kontrol et
- Güven aralığına bak
- Segment bazlı analiz yap
- Sonucu dokümante et

---

## İstatistiksel Kavramlar

### İstatistiksel Anlamlılık (Statistical Significance)

Gözlemlenen farkın şans eseri olma olasılığının düşük olduğunu gösterir.

**p-value:**
- p < 0.05: %95 güvenle anlamlı
- p < 0.01: %99 güvenle anlamlı

**Örnek:** p = 0.03 demek, bu farkın şans eseri olma olasılığı %3.

### Güven Aralığı (Confidence Interval)

Gerçek değerin hangi aralıkta olduğunu gösterir.

**Örnek:** Conversion artışı %15, güven aralığı [%8, %22]
Gerçek artış %95 olasılıkla %8 ile %22 arasında.

### İstatistiksel Güç (Statistical Power)

Gerçek bir fark varsa, onu tespit etme olasılığı. Genellikle %80 hedeflenir.

### Minimum Detectable Effect (MDE)

Tespit edilebilecek en küçük fark. Küçük MDE = daha çok sample gerekir.

---

## A/B Test Tipleri

### Klasik A/B Test

İki versiyon karşılaştırması.

### A/B/n Test

İkiden fazla versiyon (A, B, C, D...). Daha çok sample gerektirir.

### Multivariate Test (MVT)

Birden fazla element kombinasyonu test edilir. Örneğin: 2 başlık × 2 görsel × 2 buton = 8 kombinasyon. Çok trafik gerektirir.

### Split URL Test

Tamamen farklı sayfalar karşılaştırılır. Büyük değişiklikler için.

[TABLE]
| Test Tipi | Ne Zaman | Sample İhtiyacı |
|-----------|----------|-----------------|
| **A/B** | Tek değişken | Orta |
| **A/B/n** | Birkaç alternatif | Yüksek |
| **MVT** | Kombinasyon optimizasyonu | Çok yüksek |
| **Split URL** | Büyük değişiklik | Orta |
[/TABLE]

---

## Sık Yapılan Hatalar

### 1. Erken Durdurmak (Peeking)

[COMPARISON]
❌ Hata: "3 günde B %20 önde, testi bitirelim!"
✅ Doğrusu: Sample size'a ulaşana kadar bekle
[/COMPARISON]

Erken bakmak ve "iyi görünüyor" diye durdurmak, false positive oranını artırır.

### 2. Yetersiz Sample Size

Az kullanıcıyla test yapmak, güvenilir sonuç vermez. Hesaplayıcı kullan.

### 3. Çok Değişken Test Etmek

[COMPARISON]
❌ Hata: Hem buton rengini hem metni hem konumu değiştirmek
✅ Doğrusu: Tek değişken test et, hangisinin etkili olduğunu bil
[/COMPARISON]

### 4. Yanlış Metrik

Primary metrik iş hedefiyle uyumlu olmalı. CTR artıp conversion düşebilir.

### 5. Segmentleri İhmal Etmek

Genel sonuç "fark yok" dese de, belirli segmentlerde fark olabilir (mobil vs desktop).

### 6. Sezonalite

Bayram, kampanya dönemleri sonuçları etkiler. Normal dönemde test et veya bunu hesaba kat.

### 7. Novelty Effect

Yeni olan dikkat çeker, zamanla etkisi azalır. Uzun süreli testler daha güvenilir.

---

## Test Edilecek Şeyler

### Yüksek Etki Potansiyeli

- CTA metni ve konumu
- Headline / değer önerisi
- Form uzunluğu
- Fiyatlandırma sunumu
- Checkout adım sayısı
- Onboarding akışı

### Orta Etki Potansiyeli

- Buton rengi ve boyutu
- Görsel seçimi
- Sosyal kanıt yerleşimi
- Navigasyon yapısı

### Düşük Etki Potansiyeli

- Minor metin değişiklikleri
- İkon değişiklikleri
- Küçük renk ayarlamaları

[TIP]
💡 Önce büyük değişiklikleri test et. %1'lik iyileştirmeler için zaman harcamak yerine, %20 potansiyeli olan testlere odaklan.
[/TIP]

---

## A/B Test Araçları

[TABLE]
| Araç | Segment | Fiyat |
|------|---------|-------|
| **Google Optimize** | Ücretsiz (kapatıldı, alternatif: GA4 experiments) | Ücretsiz |
| **Optimizely** | Enterprise | $$$ |
| **VWO** | Mid-market | $$ |
| **AB Tasty** | Mid-market | $$ |
| **LaunchDarkly** | Feature flags + test | $$ |
| **Amplitude Experiment** | Analytics entegre | $$ |
| **PostHog** | Açık kaynak | Ücretsiz+ |
[/TABLE]

---

## Sonuç Yorumlama

### Kazanan Var

B versiyonu istatistiksel olarak anlamlı şekilde daha iyi:
- Değişikliği uygula
- Öğrenileni dokümante et
- Sonraki test için insight kullan

### Fark Yok (Inconclusive)

İstatistiksel anlamlılık yok:
- Değişiklik etkisiz olabilir
- Sample size yetersiz olabilir
- Daha uzun test veya farklı hipotez dene

### Control Kazandı

A (mevcut) daha iyi:
- Değişikliği yapma
- Neden işe yaramadığını analiz et
- Farklı yaklaşım dene

---

## Tasarımcının A/B Test Rolü

Tasarımcı olarak:

**Test öncesi:**
- Hipotez oluşturmaya katkı ver
- Araştırma insight'larını paylaş
- Varyasyonları tasarla
- Edge case'leri düşün

**Test sırasında:**
- Sonuçlara erken müdahale etme
- Sabırlı ol

**Test sonrası:**
- Sonuçları öğrenmeye dönüştür
- Kazanırsa uygula
- Kaybederse neden olduğunu anla
- Sonraki test fikirlerini geliştir

---

## A/B Test Olmadan Karar Alma

Her şeyi test edemezsin. Ne zaman test etmeden ilerleyebilirsin?

- Trafik yetersizse
- Acil düzeltme gerekiyorsa (bug, kritik UX sorunu)
- Kullanıcı araştırması zaten net cevap verdiyse
- Değişiklik riski düşükse
- Test maliyeti faydayı aşıyorsa

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Bir e-ticaret checkout sayfası için A/B test hipotezi oluştur.

**Senaryo:** Checkout'ta %40 abandon rate var. Adres formu en uzun adım.

**Adımlar:**

1. **Problem analizi (5 dk)**
   - Neden kullanıcılar terk ediyor olabilir?
   - 3 olası neden listele

2. **Hipotez yaz (5 dk)**
   Format: "Eğer [değişiklik] yaparsak, [metrik]'te [yön] göreceğiz, çünkü [neden]."

3. **Test tasarımı (5 dk)**
   - Control (A): Mevcut ne?
   - Variant (B): Ne değişecek?
   - Primary metrik ne?

4. **Başarı kriteri (5 dk)**
   - Minimum ne kadar iyileşme anlamlı?
   - Tahmini sample size ne olur? (calculator kullan)

**Örnek hipotez:**
"Eğer adres formunda otomatik tamamlama eklersek, checkout completion rate'te %15 artış göreceğiz, çünkü kullanıcılar daha az yazacak ve hata yapma olasılığı azalacak."
[/EXERCISE]

---

[SUMMARY]
## Özet

- A/B test, iki versiyonu karşılaştırarak veriyle karar almayı sağlar
- Süreç: Hipotez → Metrik → Sample size → Test → Analiz
- İstatistiksel anlamlılık: p < 0.05 genellikle yeterli
- Sample size hesapla, erken durdurma (peeking)
- Tek değişken test et, çok değişken için MVT kullan
- Kazanan varsa uygula, yoksa öğren ve devam et
- Her şeyi test etmek gerekmez, büyük etki potansiyeline odaklan
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Anket Tasarımı: Doğru Soru Sorma](/kutuphane/anket-tasarimi)

**Sonraki:** Heuristic Evaluation Nedir? *(yakında)*

**İlgili konular:**
- [Kullanılabilirlik Testi Nedir?](/kutuphane/kullanilabilirlik-testi)
- Conversion Rate Optimization *(yakında)*
- UX Metrikleri Rehberi *(yakında)*

**İlgili Roadmap:** UX Designer Roadmap → Research & Data

---

## Kaynaklar

Derinleşmek istersen:

- [A/B Testing - NNGroup](https://www.nngroup.com/articles/ab-testing-and-ux-research/) (İngilizce, 8 dk)
- [Evan Miller Sample Size Calculator](https://www.evanmiller.org/ab-testing/sample-size.html) (Araç)
- [Trustworthy Online Controlled Experiments - Kohavi](https://www.amazon.com/Trustworthy-Online-Controlled-Experiments-Practical/dp/1108724264) (Kitap, A/B test kitabı)
`,
  },
  "heuristic-evaluation": {
    id: "heuristic-evaluation",
    title: "Heuristic Evaluation Nedir?",
    subtitle: "Uzman Değerlendirmesiyle UX Sorunlarını Tespit Etme",
    titleEn: "Heuristic Evaluation",
    slug: "heuristic-evaluation",
    description: "Heuristic evaluation nedir, nasıl yapılır? Nielsen'in 10 sezgisel ilkesi, değerlendirme süreci ve şablon. Uzman UX denetimi rehberi.",
    category: "ux-research",
    readingTime: 14,
    featured: false,
    publishedAt: "2025-01-15",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Heuristic Evaluation Nedir? Uzman Değerlendirmesiyle UX Sorunlarını Tespit Etme

**Seviye:** Orta  
**Kategori:** UX Research  
**Son güncelleme:** Ocak 2025

---

## Giriş

Kullanılabilirlik testi için bütçe yok. Kullanıcı bulmak zor. Zaman kısıtlı.

Peki UX sorunlarını nasıl tespit edeceksin?

**Heuristic evaluation**, uzmanların belirlenmiş ilkelere göre bir arayüzü değerlendirdiği hızlı ve ekonomik bir yöntem. Kullanıcı gerekmiyor, birkaç saatte yapılabilir, ve ciddi sorunları ortaya çıkarır.

1990'larda Jakob Nielsen tarafından popülerleştirilen bu yöntem, hâlâ UX araç kutusunun temel parçalarından. Kullanılabilirlik testinin yerini almaz ama onu tamamlar.

Bu yazıda heuristic evaluation'ın ne olduğunu, Nielsen'in 10 ilkesini ve nasıl uygulanacağını öğreneceksin.

---

## Heuristic Evaluation Nedir?

[CALLOUT]
**Heuristic Evaluation:**
Uzmanların bir arayüzü önceden belirlenmiş kullanılabilirlik ilkelerine (heuristics) göre sistematik olarak değerlendirdiği UX denetim yöntemi. "Usability inspection" kategorisindedir.
[/CALLOUT]

**Heuristic** kelimesi Yunanca "bulmak, keşfetmek" anlamına gelir. Bu bağlamda, tasarım sorunlarını bulmak için kullanılan genel ilkeler/kurallar demek.

---

## Neden Heuristic Evaluation?

### Avantajları

- **Hızlı:** Birkaç saatte tamamlanabilir
- **Ekonomik:** Kullanıcı recruit maliyeti yok
- **Erken aşamada:** Wireframe'de bile yapılabilir
- **Kolay organize:** Uzman bul, değerlendir
- **Somut çıktı:** İlkelere bağlı, spesifik sorunlar

### Dezavantajları

- **Gerçek kullanıcı değil:** Uzman tahmini, gerçek davranış değil
- **False positive:** Olmayan sorunları bulabilir
- **False negative:** Gerçek sorunları kaçırabilir
- **Uzman kalitesine bağlı:** Deneyimsiz uzman az bulur
- **Bağlam eksikliği:** Kullanıcının gerçek ortamı yok

[INFO]
%75 sorun tespiti
5 uzman, kullanılabilirlik sorunlarının yaklaşık %75'ini bulur
[/INFO]

---

## Nielsen'in 10 Sezgisel İlkesi

1994'te Jakob Nielsen tarafından tanımlanan ve hâlâ geçerli olan 10 temel ilke:

### 1. Sistem Durumu Görünürlüğü (Visibility of System Status)

Sistem, kullanıcıya neler olduğunu her zaman makul sürede bildirmelidir.

**Kontrol et:**
- Yükleme göstergeleri var mı?
- İşlem tamamlandığında geri bildirim var mı?
- Kullanıcı nerede olduğunu biliyor mu?
- Progress indicator'lar var mı?

[COMPARISON]
❌ Kötü: Form gönderildi, hiçbir şey olmadı
✅ İyi: "Formunuz gönderildi" mesajı + onay ekranı
[/COMPARISON]

### 2. Sistem ve Gerçek Dünya Uyumu (Match Between System and Real World)

Sistem, kullanıcının dilini kullanmalı. Teknik jargon yerine tanıdık kelimeler, kavramlar.

**Kontrol et:**
- Teknik terimler var mı?
- İkonlar anlaşılır mı?
- Metaforlar gerçek dünyayla uyumlu mu?
- Bilgi mantıksal sırada mı?

[COMPARISON]
❌ Kötü: "Exception 404: Resource not found"
✅ İyi: "Aradığınız sayfa bulunamadı"
[/COMPARISON]

### 3. Kullanıcı Kontrolü ve Özgürlüğü (User Control and Freedom)

Kullanıcılar yanlış yere tıklar. Kolay çıkış, geri alma seçenekleri olmalı.

**Kontrol et:**
- Geri butonu çalışıyor mu?
- İptal seçeneği var mı?
- Undo/Redo mümkün mü?
- Modal'lardan çıkış kolay mı?

[COMPARISON]
❌ Kötü: Email gönderildi, geri alamazsın
✅ İyi: Gmail'in "Gönderimi geri al" özelliği
[/COMPARISON]

### 4. Tutarlılık ve Standartlar (Consistency and Standards)

Aynı şeyler aynı görünmeli ve çalışmalı. Platform kurallarına uy.

**Kontrol et:**
- Aynı aksiyon her yerde aynı mı?
- Terminoloji tutarlı mı?
- Görsel dil tutarlı mı?
- Platform standartlarına uyuyor mu?

[COMPARISON]
❌ Kötü: Bir yerde "Kaydet", başka yerde "Sakla"
✅ İyi: Her yerde "Kaydet"
[/COMPARISON]

### 5. Hata Önleme (Error Prevention)

Hata mesajından önce, hatanın olmasını engelle.

**Kontrol et:**
- Tehlikeli aksiyonlarda onay var mı?
- Input'larda format ipucu var mı?
- Kısıtlamalar (constraints) var mı?
- Akıllı varsayılanlar var mı?

[COMPARISON]
❌ Kötü: Yanlış tarih formatı girince hata
✅ İyi: Tarih seçici (date picker) ile format zorla
[/COMPARISON]

### 6. Hatırlamak Yerine Tanıma (Recognition Rather Than Recall)

Kullanıcıyı hatırlamaya zorlamak yerine, seçenekleri göster.

**Kontrol et:**
- Son aramalar/işlemler görünüyor mu?
- Seçenekler listesi var mı?
- Yardım bağlamsal mı?
- Gerekli bilgi görünür mü?

[COMPARISON]
❌ Kötü: "Ürün kodunu girin"
✅ İyi: Ürün listesinden seçim
[/COMPARISON]

### 7. Esneklik ve Kullanım Verimliliği (Flexibility and Efficiency of Use)

Hem yeni başlayanlar hem uzmanlar için uygun olmalı.

**Kontrol et:**
- Kısayollar var mı?
- Sık işlemler hızlandırılmış mı?
- Kişiselleştirme mümkün mü?
- Gelişmiş özellikler gizli mi?

[COMPARISON]
❌ Kötü: Her işlem için 5 tıklama
✅ İyi: Sık kullanılanlar için kısayol + hızlı erişim
[/COMPARISON]

### 8. Estetik ve Minimalist Tasarım (Aesthetic and Minimalist Design)

Gereksiz bilgi görünmemeli. Her ekstra element, önemli olanla rekabet eder.

**Kontrol et:**
- Gereksiz element var mı?
- Görsel gürültü var mı?
- Öncelik hiyerarşisi net mi?
- İçerik odaklı mı?

[COMPARISON]
❌ Kötü: 15 farklı CTA, hepsi önemli
✅ İyi: 1 primary CTA, net hiyerarşi
[/COMPARISON]

### 9. Hataları Tanıma, Teşhis ve Kurtarma (Help Users Recognize, Diagnose, and Recover from Errors)

Hata mesajları anlaşılır olmalı ve çözüm önermelidir.

**Kontrol et:**
- Hata mesajı anlaşılır mı?
- Sorunun ne olduğu belirtilmiş mi?
- Çözüm önerisi var mı?
- Teknik kod yerine insan dili mi?

[COMPARISON]
❌ Kötü: "Error 500"
✅ İyi: "Bir sorun oluştu. Lütfen birkaç dakika sonra tekrar deneyin. Sorun devam ederse destek@site.com adresine yazın."
[/COMPARISON]

### 10. Yardım ve Dokümantasyon (Help and Documentation)

İdeal sistem yardıma ihtiyaç duymaz ama gerektiğinde erişilebilir olmalı.

**Kontrol et:**
- Yardım bölümü var mı?
- Aranabilir mi?
- Bağlamsal yardım var mı?
- Göreve odaklı mı?

---

## Heuristic Evaluation Nasıl Yapılır?

### Adım 1: Hazırlık

**Kapsamı belirle:**
- Tüm uygulama mı, belirli akış mı?
- Hangi platformlar? (web, mobil, desktop)
- Hangi kullanıcı senaryoları?

**Değerlendiricileri seç:**
- 3-5 uzman ideal
- UX deneyimi olan kişiler
- Mümkünse domain bilgisi

**Materyalleri hazırla:**
- Değerlendirilecek ürün/prototype
- Heuristic listesi
- Değerlendirme şablonu
- Senaryo listesi (opsiyonel)

### Adım 2: Bireysel Değerlendirme

Her uzman bağımsız olarak değerlendirir:

[STEPS]
1. Genel tanışma (10-15 dk)
   Ürünü genel olarak gez, yapıyı anla

2. Detaylı değerlendirme (1-2 saat)
   Her ekranı/özelliği heuristic'lere göre değerlendir

3. Sorunları kaydet
   Her sorun için: konum, açıklama, ihlal edilen heuristic, şiddet
[/STEPS]

### Adım 3: Şiddet Derecelendirmesi

Her sorun için şiddet puanı:

[TABLE]
| Puan | Şiddet | Açıklama |
|------|--------|----------|
| 0 | Sorun değil | Kullanılabilirlik sorunu yok |
| 1 | Kozmetik | Sadece zaman varsa düzelt |
| 2 | Minor | Düşük öncelik |
| 3 | Major | Yüksek öncelik, düzeltilmeli |
| 4 | Catastrophic | Çıkmadan önce mutlaka düzelt |
[/TABLE]

### Adım 4: Bulguları Birleştir

Tüm uzmanların bulguları toplanır:
- Duplicate'ler birleştirilir
- Şiddet puanları ortalaması alınır
- Öncelik sırası belirlenir

### Adım 5: Raporla

Rapor içeriği:
- Yönetici özeti
- Yöntem açıklaması
- Bulgular listesi (öncelik sırasına göre)
- Her bulgu için: ekran görüntüsü, açıklama, heuristic, şiddet, öneri

---

## Değerlendirme Şablonu

Her sorun için kaydet:

[TABLE]
| Alan | Açıklama |
|------|----------|
| **ID** | Sorun numarası (örn: H-001) |
| **Konum** | Nerede? (sayfa, ekran, element) |
| **Açıklama** | Sorun ne? |
| **Heuristic** | Hangi ilke ihlal ediliyor? |
| **Şiddet** | 0-4 arası puan |
| **Ekran görüntüsü** | Sorunu gösteren görsel |
| **Öneri** | Nasıl düzeltilebilir? |
[/TABLE]

---

## Heuristic Evaluation vs Kullanılabilirlik Testi

[TABLE]
| Özellik | Heuristic Evaluation | Kullanılabilirlik Testi |
|---------|---------------------|------------------------|
| **Kim yapar** | Uzmanlar | Gerçek kullanıcılar |
| **Süre** | Saatler | Günler/haftalar |
| **Maliyet** | Düşük | Orta-yüksek |
| **Bulgu tipi** | Potansiyel sorunlar | Gerçek sorunlar |
| **Aşama** | Erken dahil geç | Prototype sonrası |
| **"Neden" açıklar mı** | Sınırlı | Evet |
| **Öğrenme eğrisi** | Uzmanlık gerekir | Yönetim gerekir |
[/TABLE]

[TIP]
💡 İkisi birbirinin alternatifi değil, tamamlayıcısı. Önce heuristic evaluation ile bariz sorunları bul, sonra kullanılabilirlik testiyle doğrula ve derinleştir.
[/TIP]

---

## Alternatif Heuristic Setleri

Nielsen'in 10 ilkesi en yaygın ama tek seçenek değil:

**Shneiderman's 8 Golden Rules:**
Benzer ilkeler, farklı organizasyon

**Gerhardt-Powals' Cognitive Principles:**
Bilişsel yük odaklı

**ISO 9241 Dialogue Principles:**
Uluslararası standart

**Domain-spesifik heuristic'ler:**
E-ticaret, mobil, erişilebilirlik için özel setler

---

## Sık Yapılan Hatalar

### 1. Tek uzmanla yapmak

Tek uzman sorunların sadece ~%35'ini bulur. Minimum 3 uzman kullan.

### 2. Uzmanların birlikte çalışması

[COMPARISON]
❌ Hata: Uzmanlar birlikte değerlendirip tartışıyor
✅ Doğrusu: Önce bağımsız değerlendir, sonra birleştir
[/COMPARISON]

### 3. Şiddet derecelendirmesini atlamak

Tüm sorunlar eşit değil. Şiddet olmadan önceliklendirme yapılamaz.

### 4. Kullanıcı testi yerine kullanmak

Heuristic evaluation kullanıcı testinin yerini almaz. İkisi farklı şeyler bulur.

### 5. Öneri vermemek

Sadece sorun listelemek yetmez. Her sorun için çözüm önerisi sun.

---

## Ne Zaman Kullanılır?

**İdeal durumlar:**
- Bütçe veya zaman kısıtlı
- Erken tasarım aşaması
- Hızlı geri bildirim gerekli
- Kullanıcı testi öncesi ön değerlendirme
- Rakip analizi

**Dikkatli olunması gereken durumlar:**
- Çok yenilikçi ürünler (standart heuristic'ler yetersiz)
- Domain-spesifik ürünler (uzman bilgisi gerekir)
- Kritik kararlar (kullanıcı testiyle doğrula)

---

[EXERCISE]
## Şimdi Sen Dene

**30 dakika**

**Görev:** Bir web sitesinin ana sayfasını Nielsen'in 10 ilkesine göre değerlendir.

**Seçenekler:**
- Kendi şirketinin ürünü
- Sık kullandığın bir e-ticaret sitesi
- Herhangi bir SaaS ürünü

**Adımlar:**

1. **Siteyi seç ve gez** (5 dk)
   Genel yapıyı anla

2. **Her ilke için değerlendir** (20 dk)
   Her 10 ilke için:
   - Bu ilke karşılanıyor mu?
   - Sorun varsa ne?
   - Şiddet derecesi (0-4)

3. **Top 3 sorun** (5 dk)
   En kritik 3 sorunu seç ve öneri yaz

**Şablon:**

| Heuristic | Sorun | Şiddet | Öneri |
|-----------|-------|--------|-------|
| 1. Görünürlük | ... | X | ... |
| 2. Gerçek dünya | ... | X | ... |
| ... | ... | ... | ... |

**Not:** İlk denemede her ilkede sorun bulmak zorunda değilsin. Bazı siteler bazı ilkelerde iyi olabilir.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Heuristic evaluation, uzmanların ilkelere göre arayüz değerlendirdiği hızlı UX denetimi
- Nielsen'in 10 ilkesi: görünürlük, gerçek dünya uyumu, kontrol, tutarlılık, hata önleme, tanıma, esneklik, minimalizm, hata kurtarma, yardım
- 3-5 uzman ideal, bağımsız değerlendirme sonra birleştirme
- Şiddet derecelendirmesi: 0 (sorun yok) - 4 (felaket)
- Kullanılabilirlik testinin yerini almaz, tamamlar
- Erken aşamada, düşük bütçede, hızlı geri bildirim için ideal
- Her sorun için konum, açıklama, heuristic, şiddet ve öneri kaydet
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [A/B Test Temelleri](/kutuphane/ab-test-temelleri)

**Sonraki:** Design System Nedir? *(yakında)*

**İlgili konular:**
- [Kullanılabilirlik Testi Nedir?](/kutuphane/kullanilabilirlik-testi)
- Cognitive Walkthrough Nedir? *(yakında)*
- UX Audit Nasıl Yapılır? *(yakında)*

**İlgili Roadmap:** UX Designer Roadmap → Research & Evaluation

---

## Kaynaklar

Derinleşmek istersen:

- [10 Usability Heuristics - NNGroup](https://www.nngroup.com/articles/ten-usability-heuristics/) (İngilizce, orijinal kaynak)
- [How to Conduct a Heuristic Evaluation - NNGroup](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/) (İngilizce, 10 dk)
- [Severity Ratings for Usability Problems - NNGroup](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/) (İngilizce, şiddet derecelendirme)
`,
  },
  "design-system-nedir": {
    id: "design-system-nedir",
    title: "Design System Nedir?",
    subtitle: "Tutarlı Tasarımın Temeli",
    titleEn: "What is Design System?",
    slug: "design-system-nedir",
    description: "Design system nedir, neden önemli? Component library, style guide ve design token kavramları. Design system oluşturma ve kullanma rehberi.",
    category: "ux-design",
    readingTime: 15,
    featured: true,
    publishedAt: "2025-01-15",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Design System Nedir? Tutarlı Tasarımın Temeli

**Seviye:** Orta  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

Aynı ürünün farklı sayfalarında farklı buton stilleri. Bir yerde 16px padding, başka yerde 20px. Mavi tonları birbiriyle uyumsuz. Mobilde farklı, desktop'ta farklı.

Tanıdık geldi mi?

Ekip büyüdükçe, ürün genişledikçe tutarlılık kayboluyor. Her tasarımcı kendi kararlarını veriyor. Her developer farklı yorumluyor. Sonuç: Frankenstein ürün.

**Design system**, bu kaosa son veren sistemdir. Ortak dil, ortak kurallar, ortak component'ler. Herkes aynı yapı taşlarını kullanır, tutarlılık garanti.

Bu yazıda design system'ın ne olduğunu, bileşenlerini ve nasıl başlayacağını öğreneceksin.

---

## Design System Nedir?

[CALLOUT]
**Design System:**
Bir ürün veya ürün ailesinin tutarlı tasarımını sağlamak için kullanılan yeniden kullanılabilir component'ler, stil kuralları, pattern'ler, ilkeler ve dokümantasyondan oluşan kapsamlı ekosistem.
[/CALLOUT]

Design system sadece bir dosya veya kütüphane değil. Üç ayağı var:

**1. Tasarım varlıkları:** Figma component'leri, stiller, token'lar
**2. Kod varlıkları:** React/Vue/Swift component'leri
**3. Dokümantasyon:** Kurallar, kullanım rehberleri, ilkeler

Bu üçü senkronize çalıştığında design system işlevsel olur.

---

## Neden Design System?

### 1. Tutarlılık

Aynı component her yerde aynı görünür ve çalışır. Kullanıcı deneyimi birleşik olur.

### 2. Verimlilik

Sıfırdan tasarlamak yerine, hazır component'leri birleştir. Tasarım süresi kısalır.

### 3. Ölçeklenebilirlik

Yeni sayfa, yeni özellik eklemek kolaylaşır. Temel yapı hazır.

### 4. İş birliği

Tasarımcı ve developer aynı dili konuşur. "Primary button" deyince herkes aynı şeyi anlar.

### 5. Bakım kolaylığı

Bir değişiklik merkezi olarak yapılır, her yere yayılır. Mavi tonu değişecek? Token'ı güncelle, bitti.

### 6. Kalite

Test edilmiş, erişilebilir, responsive component'ler. Her seferinde baştan düşünmek yok.

[INFO]
%47 daha hızlı
Design system kullanan ekipler, tasarım ve geliştirme süresinde ortalama %47 tasarruf sağlıyor
[/INFO]

---

## Design System Bileşenleri

### 1. Design Tokens

Tasarım kararlarının en küçük birimi. Platform-agnostik değişkenler.

**Token kategorileri:**

[TABLE]
| Kategori | Örnekler |
|----------|----------|
| **Color** | color-primary, color-background, color-text |
| **Typography** | font-size-lg, font-weight-bold, line-height-tight |
| **Spacing** | spacing-xs, spacing-md, spacing-xl |
| **Border** | border-radius-sm, border-width-default |
| **Shadow** | shadow-sm, shadow-lg |
| **Animation** | duration-fast, easing-default |
[/TABLE]

**Token yapısı örneği:**
color-primary-500: #6366F1
color-primary-600: #4F46E5
spacing-4: 16px
spacing-8: 32px
font-size-base: 16px
border-radius-md: 8px

[TIP]
💡 Token isimlendirmesinde anlamlı ve tutarlı ol. "blue-500" yerine "color-primary-500" kullan. Böylece mavi yeşile dönse bile isim mantıklı kalır.
[/TIP]

### 2. Foundation / Style Guide

Token'ların nasıl kullanılacağını tanımlar.

**İçerir:**
- Renk paleti ve kullanım kuralları
- Tipografi sistemi (scale, hierarchy)
- Spacing sistemi (grid, margin, padding)
- İkonografi kuralları
- Görsel dil (fotoğraf, illüstrasyon)

### 3. Component Library

Yeniden kullanılabilir UI elementleri.

**Temel component'ler:**
- Button (primary, secondary, ghost, disabled)
- Input (text, email, password, error state)
- Select / Dropdown
- Checkbox / Radio
- Card
- Modal / Dialog
- Toast / Notification
- Navigation (header, sidebar, tabs)
- Table
- Form

**Her component için:**
- Tüm varyasyonlar (size, state, type)
- Responsive davranış
- Erişilebilirlik gereksinimleri
- Kullanım rehberi
- Do's and don'ts

### 4. Patterns

Component'lerin birlikte nasıl kullanılacağını gösteren şablonlar.

**Örnek pattern'ler:**
- Form pattern (label + input + error + help text)
- Card grid pattern
- Empty state pattern
- Loading state pattern
- Error page pattern
- Navigation pattern

### 5. Dokümantasyon

Her şeyin nasıl kullanılacağını anlatan rehber.

**İçerir:**
- Genel ilkeler (tone of voice, accessibility)
- Token referansı
- Component kataloğu
- Pattern örnekleri
- Contribution guide
- Changelog

---

## Atomic Design

Brad Frost'un Atomic Design metodolojisi, design system yapılandırmasında yaygın kullanılır.

**5 seviye:**

[TABLE]
| Seviye | Açıklama | Örnek |
|--------|----------|-------|
| **Atoms** | En küçük birim, bölünemez | Button, input, label, icon |
| **Molecules** | Atom grupları, basit fonksiyon | Search bar (input + button) |
| **Organisms** | Molecule grupları, bölüm | Header (logo + nav + search + user) |
| **Templates** | Sayfa iskeletleri | Blog post template |
| **Pages** | Gerçek içerikli sayfalar | Specific blog post |
[/TABLE]

---

## Design System vs Diğerleri

### Design System vs UI Kit

[TABLE]
| Özellik | UI Kit | Design System |
|---------|--------|---------------|
| **İçerik** | Görsel component'ler | Component + kural + kod + döküman |
| **Yaşam döngüsü** | Statik dosya | Yaşayan ekosistem |
| **Kod** | Genellikle yok | Dahil |
| **Dokümantasyon** | Minimal | Kapsamlı |
| **Governance** | Yok | Süreç ve sahiplik var |
[/TABLE]

### Design System vs Style Guide

Style guide, design system'ın bir parçası. Sadece stil kurallarını içerir (renk, tipografi). Design system bunun üzerine component'ler, pattern'ler ve kod ekler.

### Design System vs Component Library

Component library, design system'ın bir parçası. UI component koleksiyonu. Design system bunun üzerine token'lar, kurallar ve dokümantasyon ekler.

---

## Popüler Design System Örnekleri

### Material Design (Google)

- En kapsamlı ve detaylı
- Android'in temeli
- Web için Material UI (React)
- [material.io](https://material.io)

### Human Interface Guidelines (Apple)

- iOS, macOS, watchOS için
- Platform-spesifik kurallar
- [developer.apple.com/design](https://developer.apple.com/design)

### Carbon (IBM)

- Enterprise odaklı
- Erişilebilirlik güçlü
- React, Vue, Angular desteği
- [carbondesignsystem.com](https://carbondesignsystem.com)

### Polaris (Shopify)

- E-ticaret odaklı
- İçerik rehberleri güçlü
- [polaris.shopify.com](https://polaris.shopify.com)

### Ant Design (Alibaba)

- Enterprise React component'leri
- Çin pazarı odaklı
- [ant.design](https://ant.design)

### Atlassian Design System

- Jira, Confluence için
- [atlassian.design](https://atlassian.design)

---

## Design System Nasıl Başlanır?

### Küçük Başla

Tam teşekküllü sistem hemen gelmez. Önce:

[STEPS]
1. Token'larla başla
   Renk, tipografi, spacing tanımla

2. Temel component'leri oluştur
   Button, input, card - en sık kullanılanlar

3. Dokümante et
   Basit de olsa kullanım rehberi yaz

4. Pilot proje
   Bir projede dene, feedback al

5. İtere et
   Eksikleri tamamla, genişlet
[/STEPS]

### Audit ile Başla

Mevcut ürünü audit et:
- Kaç farklı buton stili var?
- Kaç farklı renk kullanılıyor?
- Tutarsızlıklar nerede?

Bu audit, design system'ın kapsamını belirler.

### Önceliklendir

Her şeyi aynı anda yapamazsın. Öncelik:
1. En sık kullanılan component'ler
2. En çok tutarsızlık olan alanlar
3. En kritik kullanıcı akışları

---

## Design System Araçları

### Tasarım

[TABLE]
| Araç | Özellik |
|------|---------|
| **Figma** | Component, variant, auto layout, token plugin'leri |
| **Sketch** | Library, symbol, shared styles |
| **Adobe XD** | Component, design token desteği |
[/TABLE]

### Token Yönetimi

- **Tokens Studio (Figma plugin):** Figma'da token yönetimi
- **Style Dictionary (Amazon):** Token'ları koda çevirme
- **Theo (Salesforce):** Token build tool

### Dokümantasyon

- **Storybook:** Component dokümantasyonu, interactive playground
- **Zeroheight:** Design system dokümantasyon platformu
- **Notion/Confluence:** Basit döküman için

### Kod

- **Storybook:** React, Vue, Angular component geliştirme
- **Bit:** Component paylaşımı
- **Lerna/Nx:** Monorepo yönetimi

---

## Design System Governance

Sistem var, peki kim sahip? Nasıl güncellenir?

### Sahiplik Modelleri

**Centralized (Merkezi):**
Dedicated design system ekibi var. Tüm kararlar bu ekipten geçer.

**Federated (Dağıtık):**
Farklı ekiplerden temsilciler bir araya gelir. Kararlar ortaklaşa alınır.

**Hybrid:**
Core ekip temel sistemi yönetir, diğer ekipler katkıda bulunur.

### Contribution Süreci

1. Öneri/talep oluştur
2. Review ve tartışma
3. Tasarım + geliştirme
4. Test
5. Dokümantasyon
6. Release

### Versiyonlama

Design system'lar semantic versioning kullanır:
- **Major (1.0 → 2.0):** Breaking change
- **Minor (1.0 → 1.1):** Yeni özellik, geriye uyumlu
- **Patch (1.0.0 → 1.0.1):** Bug fix

---

## Sık Yapılan Hatalar

### 1. Çok erken genişlemek

[COMPARISON]
❌ Hata: İlk günden 100 component hedeflemek
✅ Doğrusu: 10-15 temel component ile başla, ihtiyaç oldukça ekle
[/COMPARISON]

### 2. Tasarım ve kod senkronizasyonu

Figma'daki component ile koddaki farklıysa, sistem işe yaramaz. Sync mekanizması kur.

### 3. Dokümantasyon eksikliği

Component var ama nasıl kullanılacağı yok. Dokümantasyon olmadan adoption düşer.

### 4. Adoption zorlamak

Ekibi zorla değil, değer göstererek ikna et. "Bak ne kadar hızlı" daha etkili.

### 5. Güncellememek

Design system yaşayan organizma. Güncel tutulmazsa ölür.

### 6. Edge case'leri görmezden gelmek

"Standart dışı" ihtiyaçlar olacak. Bunları nasıl ele alacağını planla.

---

## Küçük Ekipler İçin

Tam teşekküllü design system lüks görünebilir. Ama küçük ekipler de faydalanabilir:

**Minimum viable design system:**
- Renk token'ları (5-10 renk)
- Tipografi scale (4-5 boyut)
- Spacing scale (4-6 değer)
- 5-10 temel component
- Basit bir Notion sayfası dokümantasyon

Bu kadar bile tutarlılığı artırır ve tekrar eden işleri azaltır.

---

[EXERCISE]
## Şimdi Sen Dene

**30 dakika**

**Görev:** Mini design system token seti oluştur.

**Senaryo:** Yeni bir SaaS ürünü için temel token'ları tanımla.

**Adımlar:**

1. **Renk token'ları (10 dk)**
   - Primary renk (5 ton: 100, 300, 500, 700, 900)
   - Neutral/Gray (5 ton)
   - Semantic: success, warning, error
   - Background, surface, text renkleri

2. **Tipografi token'ları (10 dk)**
   - Font family (1-2 font)
   - Font size scale (xs, sm, base, lg, xl, 2xl)
   - Font weight (regular, medium, bold)
   - Line height (tight, normal, relaxed)

3. **Spacing token'ları (5 dk)**
   - 4px base ile scale: 4, 8, 12, 16, 24, 32, 48, 64

4. **Diğer token'lar (5 dk)**
   - Border radius: sm, md, lg, full
   - Shadow: sm, md, lg

**Çıktı:** Figma'da veya Notion'da token listesi oluştur.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Design system = component'ler + kurallar + kod + dokümantasyon
- Token'lar en küçük birim: renk, tipografi, spacing değişkenleri
- Atomic design: atom → molecule → organism → template → page
- UI kit statik, design system yaşayan ekosistem
- Küçük başla: token + temel component + basit döküman
- Governance önemli: sahiplik, contribution, versiyonlama
- Tasarım-kod senkronizasyonu kritik
- Popüler örnekler: Material, Carbon, Polaris, Ant Design
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Heuristic Evaluation Nedir?](/kutuphane/heuristic-evaluation)

**Sonraki:** Accessibility (Erişilebilirlik) Temelleri *(yakında)*

**İlgili konular:**
- [UI Nedir?](/kutuphane/ui-nedir)
- Component Tasarım İlkeleri *(yakında)*
- Figma'da Design System Kurma *(yakında)*

**İlgili Roadmap:** UI Designer Roadmap → Design Systems

---

## Kaynaklar

Derinleşmek istersen:

- [Design Systems 101 - NNGroup](https://www.nngroup.com/articles/design-systems-101/) (İngilizce, 10 dk)
- [Atomic Design - Brad Frost](https://atomicdesign.bradfrost.com/) (Kitap, ücretsiz online)
- [Design Systems Handbook - InVision](https://www.designbetter.co/design-systems-handbook) (Kitap, ücretsiz)
- [Design Tokens W3C](https://design-tokens.github.io/community-group/format/) (Standart taslağı)
`,
  },
  "accessibility-temelleri": {
    id: "accessibility-temelleri",
    title: "Accessibility (Erişilebilirlik) Temelleri",
    subtitle: "Herkes İçin Tasarım",
    titleEn: "Accessibility Basics",
    slug: "accessibility-temelleri",
    description: "Erişilebilirlik nedir, neden önemli? WCAG standartları, erişilebilir tasarım ilkeleri ve pratik kontrol listesi. A11y rehberi.",
    category: "ux-design",
    readingTime: 14,
    featured: false,
    publishedAt: "2025-01-15",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Accessibility (Erişilebilirlik) Temelleri: Herkes İçin Tasarım

**Seviye:** Başlangıç - Orta  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

Dünya nüfusunun %15'i bir tür engele sahip. Bu, 1 milyardan fazla insan demek.

Ama erişilebilirlik sadece "engelliler için" değil. Güneş altında telefonuna bakmaya çalışan sen de, tek elle bebek tutarken scroll yapan anne de, gözlüğünü unutan yaşlı amca da erişilebilirlikten faydalanır.

**Accessibility** (erişilebilirlik), ürünlerin herkes tarafından, her koşulda kullanılabilir olmasını sağlar. Etik bir sorumluluk olduğu kadar, iş mantığı açısından da önemli: daha geniş kitle, daha fazla kullanıcı.

Bu yazıda erişilebilirliğin ne olduğunu, WCAG standartlarını ve tasarımcı olarak dikkat etmen gerekenleri öğreneceksin.

---

## Accessibility Nedir?

[CALLOUT]
**Accessibility (A11y):**
Dijital ürünlerin, fiziksel, duyusal, bilişsel veya durumsal engeli olan bireyler dahil herkes tarafından algılanabilir, kullanılabilir ve anlaşılabilir olmasını sağlayan tasarım ve geliştirme pratiği.
[/CALLOUT]

**A11y neden?**
"Accessibility" kelimesinde A ile Y arasında 11 harf var: a-ccessibilit-y → a11y

Benzer kısaltmalar:
- i18n = internationalization
- l10n = localization

---

## Neden Erişilebilirlik?

### 1. Etik sorumluluk

İnternet artık temel bir hak. Bankacılık, eğitim, sağlık, iletişim - hepsi dijitalde. Erişilemezlik, dışlama demek.

### 2. Yasal gereklilik

Birçok ülkede erişilebilirlik yasal zorunluluk:
- ABD: ADA, Section 508
- AB: European Accessibility Act
- Türkiye: 5378 sayılı Engelliler Kanunu

### 3. Daha geniş kitle

%15 engelli nüfus + yaşlanan nüfus + geçici/durumsal engeller = büyük pazar.

### 4. SEO faydası

Erişilebilir siteler genellikle SEO dostu: semantic HTML, alt text, düzgün başlık yapısı.

### 5. İyi UX = erişilebilir UX

Erişilebilirlik için yapılan iyileştirmeler, herkes için deneyimi iyileştirir.

[INFO]
%15+
Dünya nüfusunun engelli oranı. 1 milyardan fazla potansiyel kullanıcı.
[/INFO]

---

## Engel Türleri

### Görme Engeli

- **Körlük:** Ekran okuyucu kullanır
- **Az görme:** Büyütme, yüksek kontrast
- **Renk körlüğü:** Renk dışı ipuçları gerekir

### İşitme Engeli

- **Sağırlık:** Altyazı, transcript gerekir
- **Az işitme:** Ses kontrolü, görsel uyarılar

### Motor (Hareket) Engeli

- **Kısıtlı hareket:** Klavye navigasyonu
- **Titreme:** Büyük tıklama alanları
- **Geçici:** Kırık kol, bebekli anne

### Bilişsel Engel

- **Dikkat eksikliği:** Basit, net tasarım
- **Öğrenme güçlüğü:** Anlaşılır dil
- **Hafıza sorunları:** Tutarlı navigasyon

### Durumsal Engel

- **Parlak güneş:** Yüksek kontrast
- **Gürültülü ortam:** Altyazı
- **Tek el meşgul:** Büyük butonlar
- **Yavaş internet:** Hafif sayfa

[TIP]
💡 Kalıcı, geçici ve durumsal engeller aynı çözümlerden faydalanır. Tek kolunu kaybetmiş biri, kolu kırık biri ve bebek tutan biri - hepsi tek elle kullanım ister.
[/TIP]

---

## WCAG Standartları

**WCAG (Web Content Accessibility Guidelines)**, W3C tarafından yayınlanan uluslararası erişilebilirlik standardı.

### Dört Temel İlke (POUR)

**1. Perceivable (Algılanabilir)**
İçerik en az bir duyuyla algılanabilmeli.
- Görsellerin alt text'i
- Video altyazıları
- Yeterli renk kontrastı

**2. Operable (Kullanılabilir)**
Arayüz kontrol edilebilmeli.
- Klavye erişimi
- Yeterli zaman
- Nöbet tetiklemeyen içerik

**3. Understandable (Anlaşılabilir)**
İçerik ve arayüz anlaşılır olmalı.
- Okunabilir metin
- Tahmin edilebilir davranış
- Hata önleme ve düzeltme

**4. Robust (Sağlam)**
Farklı teknolojilerle uyumlu olmalı.
- Geçerli HTML
- Yardımcı teknoloji uyumu

### Uyumluluk Seviyeleri

[TABLE]
| Seviye | Açıklama | Hedef Kitle |
|--------|----------|-------------|
| **A** | Minimum | Temel erişilebilirlik |
| **AA** | Orta | Çoğu yasal gereklilik, önerilen hedef |
| **AAA** | Maksimum | En yüksek erişilebilirlik, tüm içerik için zor |
[/TABLE]

**Hedef:** Çoğu proje için WCAG 2.1 AA seviyesi.

---

## Tasarımcı İçin Erişilebilirlik

### Renk ve Kontrast

**Minimum kontrast oranları (WCAG AA):**
- Normal metin: 4.5:1
- Büyük metin (18px+ veya 14px bold+): 3:1
- UI bileşenleri ve grafikler: 3:1

[COMPARISON]
❌ Kötü: Açık gri metin (#999) beyaz üzerinde → 2.8:1
✅ İyi: Koyu gri metin (#595959) beyaz üzerinde → 7:1
[/COMPARISON]

**Renk körlüğü:**
- Sadece renge dayanma
- Renk + ikon, renk + pattern kullan
- Hata için sadece kırmızı değil, ikon de ekle

### Tipografi

- Minimum 16px body text
- Satır yüksekliği en az 1.5
- Paragraf spacing en az 2x font size
- Okunabilir font seçimi (sans-serif genellikle daha iyi)

### Touch Target (Dokunma Alanı)

- Minimum 44x44 pixel (WCAG)
- İdeal: 48x48 pixel
- Butonlar arası yeterli boşluk

### Focus State

Klavye kullanıcıları için odak göstergesi:
- Her interaktif elementte görünür focus
- Sadece outline kaldırma ❌
- Özel focus stili tasarla

[COMPARISON]
❌ Kötü: ${'`'}outline: none;${'`'} ve alternatif yok
✅ İyi: ${'`'}outline: none;${'`'} ama ${'`'}box-shadow${'`'} veya ${'`'}border${'`'} ile alternatif
[/COMPARISON]

### Form Tasarımı

- Her input'un label'ı olmalı
- Placeholder label yerine kullanılmamalı
- Hata mesajları açık ve yardımcı
- Required alanlar belirtilmeli
- Grup label'ları (fieldset/legend)

### Görsel İçerik

- Tüm görsellerde alt text
- Dekoratif görseller: boş alt (${'`'}alt=""${'`'})
- Karmaşık görseller: uzun açıklama
- Video: altyazı ve transcript

---

## Screen Reader (Ekran Okuyucu)

Görme engelli kullanıcıların en temel aracı.

**Nasıl çalışır:**
- HTML'i okur, sese çevirir
- Semantic HTML kritik
- Heading hiyerarşisi önemli
- Alt text'ler okunur
- ARIA etiketleri yardımcı olur

**Popüler screen reader'lar:**
- NVDA (Windows, ücretsiz)
- JAWS (Windows, ücretli)
- VoiceOver (macOS/iOS, dahili)
- TalkBack (Android, dahili)

[TIP]
💡 En az bir screen reader'ı dene. VoiceOver macOS'ta dahili. Ürününü dinleyerek deneyimle, neler eksik görürsün.
[/TIP]

---

## Semantic HTML

Screen reader'lar HTML yapısını okur. Doğru element, doğru anlam.

[TABLE]
| Yanlış | Doğru | Neden |
|--------|-------|-------|
| ${'`'}<div onclick>${'`'} | ${'`'}<button>${'`'} | Keyboard focus, role |
| ${'`'}<div class="title">${'`'} | ${'`'}<h1>${'`'} | Heading hiyerarşisi |
| ${'`'}<span class="link">${'`'} | ${'`'}<a href>${'`'} | Link davranışı |
| ${'`'}<div>${'`'} ile liste | ${'`'}<ul><li>${'`'} | Liste yapısı |
| ${'`'}<b>${'`'} | ${'`'}<strong>${'`'} | Semantic önem |
[/TABLE]

### Heading Hiyerarşisi

${'```'}
<h1>Sayfa Başlığı (tek)
  <h2>Bölüm 1
    <h3>Alt bölüm
    <h3>Alt bölüm
  <h2>Bölüm 2
    <h3>Alt bölüm
${'```'}

Seviye atlama ❌ (h1 → h3)

---

## ARIA

ARIA (Accessible Rich Internet Applications), HTML'in yetersiz kaldığı durumlarda erişilebilirlik bilgisi ekler.

**Temel ARIA özellikleri:**

- ${'`'}aria-label${'`'}: Görünmez etiket
- ${'`'}aria-labelledby${'`'}: Başka elemente referans
- ${'`'}aria-describedby${'`'}: Ek açıklama
- ${'`'}aria-hidden${'`'}: Screen reader'dan gizle
- ${'`'}role${'`'}: Element rolünü belirt

**Örnek:**
${'```'}html
<button aria-label="Menüyü kapat">
  <svg>...</svg>
</button>
${'```'}

[WARNING]
⚠️ ARIA son çare. Önce semantic HTML kullan. Yanlış ARIA, erişilebilirliği bozar. "No ARIA is better than bad ARIA."
[/WARNING]

---

## Erişilebilirlik Kontrol Listesi

### Tasarım Aşaması

[CHECKLIST]
Yap: Renk kontrastı minimum 4.5:1 (metin), Sadece renge dayanan bilgi yok, Touch target minimum 44x44px, Focus state tasarlandı, Form label'ları tasarlandı, Hata state'leri tasarlandı, Heading hiyerarşisi planlandı, Alt text notları eklendi
[/CHECKLIST]

### Geliştirme Sonrası

[CHECKLIST]
Yap: Klavye navigasyonu çalışıyor, Screen reader ile test edildi, Otomatik test araçları çalıştırıldı, Manuel test yapıldı, Zoom %200'de düzgün görünüyor, Animasyonlar kapatılabiliyor
[/CHECKLIST]

---

## Test Araçları

### Otomatik Test

[TABLE]
| Araç | Tip | Özellik |
|------|-----|---------|
| **axe DevTools** | Browser extension | En kapsamlı, ücretsiz |
| **WAVE** | Browser extension | Görsel gösterim |
| **Lighthouse** | Chrome dahili | Genel audit |
| **Pa11y** | CLI | CI/CD entegrasyonu |
[/TABLE]

### Kontrast Kontrolü

- **WebAIM Contrast Checker**
- **Stark (Figma plugin)**
- **Color Contrast Analyzer**

### Screen Reader Test

- VoiceOver (macOS: Cmd + F5)
- NVDA (Windows, ücretsiz download)
- Chrome Screen Reader extension

[TIP]
💡 Otomatik testler sorunların sadece %30-40'ını bulur. Manuel test ve gerçek kullanıcı testi şart.
[/TIP]

---

## Yaygın Hatalar

### 1. Sadece renge güvenmek

[COMPARISON]
❌ Hata: Hata = kırmızı border
✅ Doğrusu: Hata = kırmızı border + hata ikonu + hata mesajı
[/COMPARISON]

### 2. Focus outline kaldırmak

"Çirkin" diye outline kaldırıp, alternatif koymamak klavye kullanıcılarını kaybettirir.

### 3. Alt text eksikliği

Her anlamlı görselin alt text'i olmalı. Dekoratif ise ${'`'}alt=""${'`'}.

### 4. Placeholder'ı label olarak kullanmak

Placeholder yazı girince kaybolur. Label her zaman görünür olmalı.

### 5. Auto-play video/ses

Otomatik başlayan medya, screen reader kullanıcılarını rahatsız eder.

### 6. Yetersiz touch target

Küçük butonlar, yakın linkler - mobilde kabus.

### 7. Hareket azaltma seçeneği yok

Animasyonlar bazı kullanıcılarda baş dönmesine neden olur. prefers-reduced-motion kullan.

---

## İş Case'i

Erişilebilirlik "nice to have" değil:

- **Yasal risk:** Erişilemez siteler için davalar artıyor (ABD'de 2023'te 4.000+ dava).
- **Pazar büyüklüğü:** Engelli nüfusun harcama gücü trilyonlarca dolar.
- **SEO:** Erişilebilir siteler genellikle daha iyi sıralanır.
- **Marka:** Inclusive tasarım, pozitif marka algısı.
- **Verimlilik:** Erişilebilirlik baştan düşünülürse, sonradan düzeltmekten ucuz.

---

[EXERCISE]
## Şimdi Sen Dene

**25 dakika**

**Görev:** Bir web sayfasının erişilebilirlik auditi yap.

**Araçlar:**
- axe DevTools veya WAVE extension
- WebAIM Contrast Checker
- Klavye (Tab, Enter, Space)

**Adımlar:**

1. **Otomatik test (5 dk)**
   axe veya WAVE ile sayfayı tara, hataları listele

2. **Kontrast kontrolü (5 dk)**
   Ana metin ve butonların kontrastını kontrol et

3. **Klavye testi (10 dk)**
   - Sadece Tab ile gezin
   - Tüm interaktif elementlere ulaşabiliyor musun?
   - Focus görünür mü?
   - Mantıklı sırada mı?

4. **Sonuçları raporla (5 dk)**
   - Bulunan sorunlar
   - Şiddet (kritik/major/minor)
   - Öneriler

**Bonus:** VoiceOver veya NVDA ile sayfayı dinle.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Erişilebilirlik = herkes için kullanılabilir tasarım
- A11y herkes için faydalı: engelli, yaşlı, durumsal engelli
- WCAG standartları: POUR ilkeleri, A/AA/AAA seviyeleri
- Hedef: WCAG 2.1 AA
- Tasarımda: kontrast, touch target, focus state, form label, alt text
- Semantic HTML, ARIA son çare
- Otomatik test %30-40, manuel test şart
- Yasal, etik ve iş açısından önemli
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Design System Nedir?](/kutuphane/design-system-nedir)

**Sonraki:** Micro-interactions Tasarımı *(yakında)*

**İlgili konular:**
- [UI Nedir?](/kutuphane/ui-nedir)
- Color Theory ve Renk Kullanımı *(yakında)*
- Inclusive Design Nedir? *(yakında)*

**İlgili Roadmap:** UI Designer Roadmap → Erişilebilirlik

---

## Kaynaklar

Derinleşmek istersen:

- [WCAG 2.1 - W3C](https://www.w3.org/WAI/WCAG21/quickref/) (İngilizce, resmi kaynak)
- [WebAIM](https://webaim.org/) (İngilizce, pratik rehberler)
- [A11y Project](https://www.a11yproject.com/) (İngilizce, checklist ve kaynaklar)
- [Inclusive Components - Heydon Pickering](https://inclusive-components.design/) (İngilizce, component örnekleri)
`,
  },
  "micro-interactions": {
    id: "micro-interactions",
    title: "Micro-interactions Tasarımı",
    subtitle: "Küçük Detaylar, Büyük Farklar",
    titleEn: "Micro-interactions Design",
    slug: "micro-interactions",
    description: "Micro-interaction nedir? Tetikleyiciler, kurallar, feedback ve döngüler. Kullanıcı deneyimini zenginleştiren küçük animasyonlar rehberi.",
    category: "ux-design",
    readingTime: 12,
    featured: false,
    publishedAt: "2025-01-15",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Micro-interactions Tasarımı: Küçük Detaylar, Büyük Farklar

**Seviye:** Orta  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

Facebook'ta like butonuna tıkladığında kalp animasyonu. iPhone'da sessize alırken hafif titreşim. Gmail'de email gönderince "Gönderildi" mesajı ve geri alma seçeneği.

Bunların hepsi **micro-interaction**.

Küçük, fark edilmesi zor detaylar. Ama olmadığında bir şeylerin eksik olduğunu hissedersin. Buton tıkladın ama hiçbir şey olmadı mı? Gerçekten tıklandı mı, bilmiyorsun. Form gönderdin ama feedback yok mu? Tekrar mı denemeliyim?

Micro-interaction'lar bu boşlukları doldurur. Kullanıcıya "evet, seni duydum" der.

Bu yazıda micro-interaction'ların ne olduğunu, nasıl tasarlanacağını ve iyi örneklerini öğreneceksin.

---

## Micro-interaction Nedir?

[CALLOUT]
**Micro-interaction:**
Tek bir görevi tamamlamak için tasarlanmış küçük, odaklı etkileşimler. Kullanıcıya geri bildirim verir, durumu gösterir, aksiyonu yönlendirir ve deneyimi zenginleştirir.
[/CALLOUT]

Terim Dan Saffer'ın 2013'teki "Microinteractions" kitabından popülerleşti.

**Micro-interaction örnekleri:**
- Like/favorite butonu
- Toggle switch
- Pull-to-refresh
- Password strength indicator
- Form validation feedback
- Loading spinner
- Hover state
- Swipe to delete

---

## Neden Micro-interaction?

### 1. Geri bildirim sağlar

Kullanıcı aksiyon aldı, sistem ne yaptı? Micro-interaction cevap verir.

### 2. Durumu gösterir

Yükleniyor mu, tamamlandı mı, hata mı? Görsel ipucu verir.

### 3. Yönlendirir

Bir sonraki adımı gösterir, dikkat çeker.

### 4. Hataları önler

Yanlış yapılmadan önce uyarır (password strength gibi).

### 5. Karakter katar

Marka kişiliğini yansıtır, deneyimi keyifli kılar.

### 6. Algılanan hızı artırır

Güzel loading animasyonu, beklemeyi daha az sıkıcı yapar.

[INFO]
400ms
Çoğu micro-interaction için ideal animasyon süresi
[/INFO]

---

## Micro-interaction'ın Dört Bileşeni

Dan Saffer'ın framework'ü:

### 1. Trigger (Tetikleyici)

Micro-interaction'ı başlatan şey.

**Kullanıcı tetikleyicisi:**
- Tıklama/dokunma
- Hover
- Scroll
- Swipe
- Ses komutu
- Gesture

**Sistem tetikleyicisi:**
- Zaman (alarm)
- Konum (yaklaştığında)
- Data değişimi (yeni mesaj)
- Hata oluşması

### 2. Rules (Kurallar)

Tetikleyici aktive olunca ne olacak?

- Ne değişecek?
- Sınırlar ne?
- Sıralama nasıl?
- Süre ne kadar?

### 3. Feedback (Geri Bildirim)

Kullanıcının kuralları anlaması için görsel/işitsel yanıt.

**Feedback türleri:**
- Görsel (renk, animasyon, ikon değişimi)
- İşitsel (ses efekti)
- Dokunsal (titreşim)

### 4. Loops & Modes (Döngüler ve Modlar)

Micro-interaction'ın meta-kuralları:

**Loops:**
- İlk kullanımda farklı mı?
- Tekrarlarda değişiyor mu?
- Süresi doluyor mu?

**Modes:**
- Farklı durumlarda farklı davranış
- Gece/gündüz modu
- Acemi/uzman modu

---

## Yaygın Micro-interaction Türleri

### Button Feedback

Buton tıklandığında görsel yanıt.

**Beklenen davranışlar:**
- Hover: Hafif renk değişimi
- Active/pressed: Bastırılma efekti
- Focus: Outline/glow
- Loading: Spinner veya progress
- Success: Renk değişimi, ikon, checkmark

### Toggle/Switch

On/off durumu değiştirme.

**İyi toggle özellikleri:**
- Mevcut durumu net gösterir
- Geçiş animasyonu akıcı (200-300ms)
- Renk + pozisyon ile durum belirtir
- Tıklama alanı yeterli büyük

### Form Validation

Input doğrulama feedback'i.

**Zamanlama seçenekleri:**
- On submit: Form gönderilince
- On blur: Alandan çıkınca
- Real-time: Yazarken (dikkatli kullan)

**Feedback elementleri:**
- Border rengi (kırmızı/yeşil)
- İkon (✓ veya ✕)
- Hata mesajı
- Helper text

### Loading States

Bekleme süresini gösterme.

**Türler:**
- Spinner: Belirsiz süre
- Progress bar: Belirli süre
- Skeleton: İçerik önizlemesi
- Percentage: Yüzde gösterimi

[TIP]
💡 2 saniyeden kısa işlemler için spinner yeterli. Daha uzun işlemler için progress veya skeleton kullan. 10+ saniye için açıklayıcı mesaj ekle.
[/TIP]

### Pull-to-Refresh

Aşağı çekince yenileme.

**Aşamalar:**
1. Pull başlangıç: İkon görünür
2. Pull threshold: "Bırak" mesajı
3. Release: Loading animasyonu
4. Complete: İçerik güncellenir

### Swipe Actions

Kaydırarak aksiyon alma.

**Örnekler:**
- Swipe to delete (mail, todo)
- Swipe to archive
- Swipe to reveal options
- Swipe to navigate (onboarding)

### Toast/Snackbar

Geçici bildirim mesajı.

**İyi toast özellikleri:**
- Otomatik kaybolur (3-5 saniye)
- Manuel kapatılabilir
- Aksiyon içerebilir (Geri al)
- Ekranı engellemez

---

## Animasyon Prensipleri

### Timing (Zamanlama)

[TABLE]
| Süre | Kullanım |
|------|----------|
| 100-150ms | Hover, active state |
| 200-300ms | Toggle, checkbox |
| 300-400ms | Modal açılış |
| 400-500ms | Sayfa geçişi |
| 500ms+ | Dikkatli kullan |
[/TABLE]

### Easing

Animasyonun hız eğrisi.

**Yaygın easing'ler:**
- **ease-out:** Hızlı başla, yavaş bitir (önerilen)
- **ease-in:** Yavaş başla, hızlı bitir (çıkışlar için)
- **ease-in-out:** Yavaş başla, yavaş bitir (döngüler için)
- **linear:** Sabit hız (genellikle kaçın)

[COMPARISON]
❌ Linear: Robotik, doğal değil
✅ ease-out: Doğal, responsive hisseder
[/COMPARISON]

### 12 Disney Prensibi (UX'e Uyarlanmış)

1. **Squash & Stretch:** Element büyür/küçülür
2. **Anticipation:** Hareketten önce hazırlık
3. **Staging:** Dikkat yönlendirme
4. **Follow Through:** Hareket sonrası momentum
5. **Slow In/Out:** Easing kullanımı
6. **Arcs:** Doğrusal değil, eğrisel hareket
7. **Secondary Action:** Ana hareketle destekleyici
8. **Timing:** Süre ve hız
9. **Exaggeration:** Abartı (dikkatli)
10. **Solid Drawing:** Tutarlı görsel
11. **Appeal:** Çekicilik

---

## İyi Örnekler

### Facebook Like

- Trigger: Tıklama
- Feedback: Kalp animasyonu, renk değişimi
- Karakter: Eğlenceli, keyifli

### Slack Mesaj Gönderme

- Trigger: Enter veya tıklama
- Feedback: Mesaj yukarı kayar, timestamp görünür
- Durum: Gönderiliyor → Gönderildi

### iPhone Silent Mode

- Trigger: Fiziksel switch
- Feedback: Titreşim + görsel banner
- Multimodal: Dokunsal + görsel

### Gmail Geri Al

- Trigger: Email gönder
- Feedback: "Gönderildi" toast + "Geri al" butonu
- Loop: 5 saniye içinde geri alınabilir

### Stripe Ödeme Formu

- Real-time validation
- Kart tipi otomatik algılama
- Smooth error feedback
- Success animasyonu

---

## Performans Dikkat Noktaları

### GPU-Friendly Özellikler

Sadece şu özellikleri animasyonla:
- ${'`'}transform${'`'} (translate, scale, rotate)
- ${'`'}opacity${'`'}

Kaçınılması gerekenler:
- ${'`'}width${'`'}, ${'`'}height${'`'} (layout tetikler)
- ${'`'}top${'`'}, ${'`'}left${'`'} (layout tetikler)
- ${'`'}box-shadow${'`'} (pahalı)

### 60fps Hedefi

Akıcı animasyon için 60fps gerekli. Her frame 16ms.

### prefers-reduced-motion

Animasyon hassasiyeti olan kullanıcılar için:
${'```'}css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
${'```'}

---

## Sık Yapılan Hatalar

### 1. Fazla animasyon

[COMPARISON]
❌ Her element animasyonlu, göz yorucu
✅ Önemli aksiyonlarda, ölçülü animasyon
[/COMPARISON]

### 2. Çok yavaş animasyon

500ms+ animasyonlar sabırsızlık yaratır. Hızlı olsun.

### 3. Tutarsız timing

Bir yerde 200ms, başka yerde 600ms. Tutarlı ol.

### 4. Feedback eksikliği

Buton tıklandı ama hiçbir şey olmadı. Her aksiyona yanıt ver.

### 5. Erişilebilirliği unutmak

Animasyon hassasiyeti olanları düşün. reduced-motion desteği ekle.

### 6. Amaçsız animasyon

"Cool görünüyor" yetmez. Her animasyonun amacı olmalı.

---

## Tasarım Araçları

[TABLE]
| Araç | Özellik |
|------|---------|
| **Figma** | Smart Animate, prototype |
| **Principle** | Detaylı animasyon |
| **ProtoPie** | Sensör ve logic desteği |
| **After Effects** | Export için Lottie |
| **Framer** | Kod + tasarım |
[/TABLE]

### Handoff için

- Lottie (JSON animasyon)
- Protopie (spec export)
- Video/GIF referans

---

[EXERCISE]
## Şimdi Sen Dene

**25 dakika**

**Görev:** Bir "Add to Cart" butonu için micro-interaction tasarla.

**Senaryo:** E-ticaret sitesinde ürün detay sayfasındaki sepete ekle butonu.

**Adımlar:**

1. **State'leri tanımla (5 dk)**
   - Default
   - Hover
   - Active/Pressed
   - Loading
   - Success
   - (Opsiyonel) Already in cart

2. **Her state için feedback belirle (10 dk)**
   - Görsel değişim (renk, boyut, ikon)
   - Metin değişimi
   - Animasyon süresi ve easing
   
3. **Figma'da prototype (10 dk)**
   - State'leri tasarla
   - Smart Animate ile bağla
   - Test et

**Kontrol soruları:**
- Kullanıcı her state'te ne olduğunu anlıyor mu?
- Timing doğal hissediyor mu?
- Success feedback yeterince net mi?
[/EXERCISE]

---

[SUMMARY]
## Özet

- Micro-interaction = tek göreve odaklı küçük etkileşimler
- Dört bileşen: Trigger, Rules, Feedback, Loops & Modes
- Geri bildirim verir, durum gösterir, yönlendirir, karakter katar
- Timing: 100-400ms arası, ease-out tercih et
- Sadece transform ve opacity animasyonla (performans)
- Her aksiyona feedback ver, ama abartma
- prefers-reduced-motion desteği ekle
- Amaçsız animasyon kaçın, her birinin işlevi olsun
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Accessibility Temelleri](/kutuphane/accessibility-temelleri)

**Sonraki:** UX Writing Temelleri *(yakında)*

**İlgili konular:**
- [Prototype Nedir?](/kutuphane/prototype-nedir)
- UI Animasyon Prensipleri *(yakında)*
- Motion Design Temelleri *(yakında)*

**İlgili Roadmap:** UI Designer Roadmap → Interaction Design

---

## Kaynaklar

Derinleşmek istersen:

- [Microinteractions - Dan Saffer](https://www.microinteractions.com/) (Kitap, temel kaynak)
- [The Role of Animation in UX - NNGroup](https://www.nngroup.com/articles/animation-usability/) (İngilizce, 8 dk)
- [Material Motion - Google](https://material.io/design/motion/) (İngilizce, motion ilkeleri)
- [UI Animation Newsletter](https://uianimationnewsletter.com/) (İngilizce, haftalık ilham)
`,
  },
  "ux-writing-temelleri": {
    id: "ux-writing-temelleri",
    title: "UX Writing Temelleri",
    subtitle: "Kullanıcıyla Doğru Kelimelerle Konuşma",
    titleEn: "UX Writing Basics",
    slug: "ux-writing-temelleri",
    description: "UX Writing nedir? Microcopy, hata mesajları, CTA yazımı ve ton of voice. Kullanıcı odaklı içerik yazma rehberi.",
    category: "ux-design",
    readingTime: 13,
    featured: false,
    publishedAt: "2025-01-15",
    heroImage: "",
    author: "DesignAtlas",
    content: `# UX Writing Temelleri: Kullanıcıyla Doğru Kelimelerle Konuşma

**Seviye:** Başlangıç - Orta  
**Kategori:** UX Design  
**Son güncelleme:** Ocak 2025

---

## Giriş

"Bir hata oluştu" vs "Bağlantın kesildi. İnterneti kontrol edip tekrar dene."

İkisi de hata mesajı. Ama biri kullanıcıyı çaresiz bırakır, diğeri ne yapacağını söyler.

Arayüzdeki her kelime bir tasarım kararı. Buton metni, placeholder, hata mesajı, onboarding metni - hepsi kullanıcı deneyiminin parçası. Yanlış kelime kafa karışıklığı yaratır, doğru kelime yönlendirir.

**UX Writing**, bu kelimeleri bilinçli şekilde seçme disiplini. "Lorem ipsum" ile tasarım bitmiyor, asıl iş kelimelerle başlıyor.

Bu yazıda UX Writing'in ne olduğunu, temel prensiplerini ve pratik ipuçlarını öğreneceksin.

---

## UX Writing Nedir?

[CALLOUT]
**UX Writing:**
Dijital ürünlerdeki tüm metinlerin kullanıcı deneyimini iyileştirecek şekilde stratejik olarak yazılması disiplini. Amaç: kullanıcıyı yönlendirmek, bilgilendirmek ve görevini kolaylaştırmak.
[/CALLOUT]

**UX Writing kapsamı:**
- Buton ve link metinleri
- Menü ve navigasyon
- Form label ve placeholder'lar
- Hata ve başarı mesajları
- Onboarding ve yardım metinleri
- Boş durum (empty state) metinleri
- Tooltip ve açıklamalar
- Bildirim metinleri

---

## Microcopy Nedir?

[CALLOUT]
**Microcopy:**
Arayüzdeki küçük, genellikle göz ardı edilen metin parçaları. Buton metni, placeholder, tooltip, hata mesajı gibi. Küçük ama etkisi büyük.
[/CALLOUT]

Microcopy örnekleri:
- "Sepete Ekle" (buton)
- "ornek@email.com" (placeholder)
- "Şifren en az 8 karakter olmalı" (helper text)
- "Değişiklikler kaydedildi" (toast)

---

## Neden UX Writing Önemli?

### 1. Yönlendirme

Kullanıcı ne yapacağını bilmiyorsa, metin söyler. "Devam" yerine "Ödemeye Geç" daha net.

### 2. Güven oluşturma

Profesyonel, tutarlı metin güven verir. Yazım hatası, belirsiz ifade güveni zedeler.

### 3. Dönüşüm artırma

Doğru CTA metni dönüşümü artırır. "Ücretsiz Dene" vs "Gönder" arasında ciddi fark olabilir.

### 4. Destek yükü azaltma

Net açıklamalar, daha az "bu ne demek?" sorusu demek.

### 5. Marka kişiliği

Metin tonu markayı yansıtır. Resmi mi, samimi mi, eğlenceli mi?

[INFO]
%90 kullanıcı
Kötü microcopy nedeniyle form terk ettiğini söylüyor
[/INFO]

---

## UX Writing Prensipleri

### 1. Net Ol (Clear)

Anlaşılması için düşünmeye gerek kalmamalı.

[COMPARISON]
❌ "İşlem gerçekleştirilemedi"
✅ "Kartından ödeme alınamadı. Kart bilgilerini kontrol et."
[/COMPARISON]

### 2. Kısa Tut (Concise)

Her kelime anlam taşımalı. Gereksiz kelimeleri çıkar.

[COMPARISON]
❌ "Lütfen aşağıdaki butona tıklayarak kayıt işleminizi tamamlayınız"
✅ "Kaydı tamamla"
[/COMPARISON]

### 3. Faydalı Ol (Useful)

Sadece bilgi verme, ne yapılacağını da söyle.

[COMPARISON]
❌ "Hata 404"
✅ "Bu sayfa bulunamadı. Ana sayfaya dön veya arama yap."
[/COMPARISON]

### 4. İnsan Gibi Konuş

Kurumsal jargon yerine doğal dil.

[COMPARISON]
❌ "Talebiniz işleme alınmıştır"
✅ "Talebini aldık, 24 saat içinde dönüş yapacağız"
[/COMPARISON]

### 5. Tutarlı Ol

Aynı şey için aynı kelime. Bir yerde "Kaydet", başka yerde "Sakla" olmasın.

---

## CTA (Call to Action) Yazımı

CTA, kullanıcıyı harekete geçiren buton/link metni.

### İyi CTA Özellikleri

**1. Aksiyon fiili ile başla**
- ❌ "Devam"
- ✅ "Sepete Ekle"

**2. Spesifik ol**
- ❌ "Gönder"
- ✅ "Mesaj Gönder"

**3. Değer vaat et**
- ❌ "Kaydol"
- ✅ "Ücretsiz Hesap Oluştur"

**4. Kısa tut**
- 2-5 kelime ideal
- Maksimum 7-8 kelime

### CTA Örnekleri

[TABLE]
| Kötü | İyi | Neden |
|------|-----|-------|
| Gönder | Ücretsiz Dene | Değer vaat ediyor |
| Tıklayın | Planını Seç | Aksiyon spesifik |
| İleri | Ödemeye Geç | Ne olacağı net |
| Onayla | Siparişi Tamamla | Bağlam veriyor |
| Başla | 14 Gün Ücretsiz Başla | Risk azaltıyor |
[/TABLE]

### Primary vs Secondary CTA

**Primary:** Ana aksiyon, dikkat çekici
- "Satın Al", "Ücretsiz Dene"

**Secondary:** Alternatif, daha az vurgulu
- "Daha Fazla Bilgi", "Belki Sonra"

---

## Hata Mesajları

Hata mesajı kullanıcıyı en hassas anda yakalar. Kötü mesaj frustrasyonu artırır.

### İyi Hata Mesajı Özellikleri

**1. Ne olduğunu söyle**
Teknik kod değil, anlaşılır açıklama.

**2. Neden olduğunu açıkla (mümkünse)**
Kullanıcının hatası mı, sistem mi?

**3. Nasıl düzeltileceğini söyle**
Çözüm önerisi sun.

**4. Suçlama**
"Hatalı giriş" değil, "Şifre eşleşmedi"

### Hata Mesajı Formülü
[Ne oldu] + [Neden oldu (opsiyonel)] + [Ne yapılabilir]

### Örnekler

[COMPARISON]
❌ Kötü: "Error 500: Internal Server Error"
✅ İyi: "Bir sorun oluştu. Sayfayı yenile veya birkaç dakika sonra tekrar dene."
[/COMPARISON]

[COMPARISON]
❌ Kötü: "Geçersiz email"
✅ İyi: "Email adresi geçersiz görünüyor. Formatı kontrol et (örn: ad@email.com)"
[/COMPARISON]

[COMPARISON]
❌ Kötü: "Şifre hatalı"
✅ İyi: "Şifre eşleşmedi. Tekrar dene veya şifreni sıfırla."
[/COMPARISON]

---

## Form Metinleri

### Label

- Net ve kısa
- Soru formatından kaçın (genellikle)
- "Email Adresi" yeterli, "Email Adresiniz Nedir?" gereksiz

### Placeholder

- Label yerine kullanma
- Örnek format göster
- Kaybolunca bilgi kaybı olmasın

[COMPARISON]
❌ Placeholder as label: Sadece "Email" placeholder'da
✅ Doğru: Label: "Email" + Placeholder: "ornek@email.com"
[/COMPARISON]

### Helper Text

- Label altında ek bilgi
- Gereksinimi açıkla
- Format ipucu ver

**Örnek:**
Şifre
[________________]
En az 8 karakter, 1 büyük harf ve 1 rakam içermeli

### Validation Mesajları

- Hemen göster (blur veya real-time)
- Spesifik ol
- Pozitif feedback de ver (✓)

---

## Empty States

İçerik olmadığında gösterilen durum.

### İyi Empty State

**1. Ne olduğunu açıkla**
"Henüz favori eklemedin"

**2. Değer öner**
"Favorilerin burada görünecek"

**3. Aksiyon ver**
"Keşfetmeye Başla" butonu

### Örnek
[İllüstrasyon]
Sepetinde henüz ürün yok
Beğendiğin ürünleri sepete ekle ve alışverişe başla.
[Alışverişe Başla]

---

## Tone of Voice

Metnin "kişiliği". Marka ile tutarlı olmalı.

### Tone Spektrumu

[TABLE]
| Boyut | Örnek Aralık |
|-------|--------------|
| Formalite | Resmi ↔ Samimi |
| Ciddiyet | Ciddi ↔ Eğlenceli |
| Saygı | Saygılı ↔ Sıra dışı |
| Coşku | Sakin ↔ Heyecanlı |
[/TABLE]

### Tone Tutarlılığı

Hata mesajında eğlenceli, onboarding'de resmi olma. Tutarlı ol.

**Ama:** Bağlama göre ayarla. Ciddi hata (ödeme başarısız) çok eğlenceli olmamalı.

### Örnek Tone Kılavuzu

**Biz:** Samimi ama profesyonel
- "Sen" diye hitap ederiz
- Emoji ölçülü kullanırız
- Jargondan kaçınırız
- Hatalarda empatik ve çözüm odaklıyız

---

## Lokalizasyon Düşüncesi

Metin başka dillere çevrilecekse:

- Kısa tut (çeviri genellikle uzar)
- Kültürel referanstan kaçın
- Değişken için yer bırak (isim, sayı)
- Cinsiyet varsayımı yapma

---

## UX Writing Süreci

[STEPS]
1. Bağlamı anla
   Kullanıcı kim? Nerede? Ne yapıyor? Nasıl hissediyor?

2. İlk draft yaz
   Mükemmel olmasına gerek yok, başla

3. Düzenle ve kısalt
   Her kelimeyi sorgula. Gerekli mi?

4. Sesli oku
   Doğal geliyor mu? Takılıyor musun?

5. Test et
   Kullanıcılar anlıyor mu? A/B test yap
[/STEPS]

---

## Sık Yapılan Hatalar

### 1. Placeholder'ı label olarak kullanmak

Yazı girince placeholder kaybolur, kullanıcı ne istediğini unutur.

### 2. Jargon kullanmak

[COMPARISON]
❌ "Authentication failed"
✅ "Giriş yapılamadı"
[/COMPARISON]

### 3. Çok uzun yazmak

Kimse paragraf okumak istemiyor. Kısa ve öz.

### 4. Suçlayıcı dil

[COMPARISON]
❌ "Hatalı şifre girdiniz"
✅ "Şifre eşleşmedi"
[/COMPARISON]

### 5. Tutarsız terminoloji

"Kaydet", "Sakla", "Onayla" aynı iş için farklı yerler.

### 6. Lorem ipsum bırakmak

Gerçek metin olmadan tasarım eksik. Metin de tasarımın parçası.

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Aşağıdaki kötü UX metinlerini iyileştir.

**Senaryolar:**

1. **Hata mesajı:**
   - Kötü: "Error: Invalid input"
   - İyileştir: ___

2. **CTA butonu:**
   - Kötü: "Gönder"
   - Bağlam: Email bültene kayıt formu
   - İyileştir: ___

3. **Empty state:**
   - Kötü: "Sonuç bulunamadı"
   - Bağlam: E-ticaret arama sonucu
   - İyileştir: ___

4. **Form helper text:**
   - Kötü: (yok)
   - Bağlam: Şifre alanı
   - Ekle: ___

5. **Onay mesajı:**
   - Kötü: "İşlem başarılı"
   - Bağlam: Sipariş tamamlama
   - İyileştir: ___

**Her biri için:** Net, kısa, faydalı ve insan gibi yaz.
[/EXERCISE]

---

[SUMMARY]
## Özet

- UX Writing = arayüzdeki tüm metinleri stratejik yazma
- Microcopy küçük ama etkisi büyük
- Dört prensip: Net, kısa, faydalı, insan gibi
- CTA: Aksiyon fiili + spesifik + değer vaat et
- Hata mesajı: Ne oldu + neden + nasıl düzeltilir
- Form: Label ≠ placeholder, helper text kullan
- Empty state: Açıkla + değer öner + aksiyon ver
- Tone of voice tutarlı olmalı
- Test et, iterate et
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Micro-interactions Tasarımı](/kutuphane/micro-interactions)

**Sonraki:** Gestalt İlkeleri ve Görsel Algı *(yakında)*

**İlgili konular:**
- [Accessibility Temelleri](/kutuphane/accessibility-temelleri)
- Content Strategy Nedir? *(yakında)*
- Tone of Voice Rehberi *(yakında)*

**İlgili Roadmap:** UX Designer Roadmap → Content & Writing

---

## Kaynaklar

Derinleşmek istersen:

- [Writing is Designing - Michael Metts & Andy Welfle](https://rosenfeldmedia.com/books/writing-is-designing/) (Kitap)
- [Strategic Writing for UX - Torrey Podmajersky](https://www.oreilly.com/library/view/strategic-writing-for/9781492049395/) (Kitap)
- [UX Writing Hub](https://uxwritinghub.com/) (İngilizce, kurs ve kaynaklar)
- [Google's UX Writing Guidelines](https://developers.google.com/style) (İngilizce, stil rehberi)
`,
  },
  "gestalt-ilkeleri": {
    id: "gestalt-ilkeleri",
    title: "Gestalt İlkeleri ve Görsel Algı",
    subtitle: "Tasarımın Psikolojik Temelleri",
    titleEn: "Gestalt Principles",
    slug: "gestalt-ilkeleri",
    description: "Gestalt ilkeleri nedir? Yakınlık, benzerlik, süreklilik, kapalılık ve diğer görsel algı prensipleri. UI tasarımda Gestalt kullanımı.",
    category: "temel-kavramlar",
    readingTime: 12,
    featured: false,
    publishedAt: "2025-01-15",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Gestalt İlkeleri ve Görsel Algı: Tasarımın Psikolojik Temelleri

**Seviye:** Başlangıç  
**Kategori:** Temel Kavramlar  
**Son güncelleme:** Ocak 2025

---

## Giriş

Neden bazı tasarımlar "düzgün" görünürken, bazıları kaotik hissettiriyor?

Cevap beynimizde. İnsan beyni görsel bilgiyi rastgele işlemez; belirli kalıplar arar, gruplar oluşturur, anlamlı bütünler kurar. Bu doğal eğilimleri anlayan tasarımcı, kullanıcının zihninde düzen yaratabilir.

**Gestalt ilkeleri**, 1920'lerde Alman psikologların keşfettiği görsel algı kuralları. "Gestalt" Almanca'da "biçim" veya "bütün" anlamına gelir. Temel fikir: "Bütün, parçaların toplamından fazladır."

Bu yazıda Gestalt ilkelerini ve UI tasarımda nasıl kullanıldığını öğreneceksin.

---

## Gestalt Nedir?

[CALLOUT]
**Gestalt:**
İnsan beyninin görsel bilgiyi nasıl organize ettiğini ve algıladığını açıklayan psikolojik prensipler bütünü. Beyin, ayrı parçaları anlamlı bütünler halinde algılamaya çalışır.
[/CALLOUT]

**Temel önerme:**
Beyin, görsel ögeleri:
- Gruplayarak
- Basitleştirerek
- Tamamlayarak
- Düzenleyerek

...algılar. Bu doğal eğilimleri kullanarak daha etkili tasarımlar yapabiliriz.

---

## Temel Gestalt İlkeleri

### 1. Yakınlık (Proximity)

**İlke:** Birbirine yakın olan elementler, bir grup olarak algılanır.

Mesafe, ilişki sinyali verir. Yakın = ilişkili, uzak = ayrı.

**UI'da kullanım:**

- Form alanı ile label'ı yakın tut
- İlişkili butonları grupla
- Kartlar arası boşluk ile ayırım yap
- Section'lar arası daha fazla boşluk

[COMPARISON]
❌ Kötü: Label ile input arası çok uzak, hangi label hangi input'a ait belirsiz
✅ İyi: Label hemen input'un üstünde, ilişki net
[/COMPARISON]

**Örnek:**
[Label A]     [Label B]     ← Uzak, ayrı gruplar
[Input A]     [Input B]
vs.
[Label A]                    ← Yakın, aynı grup
[Input A]
[Label B]                    ← Yakın, aynı grup
[Input B]

### 2. Benzerlik (Similarity)

**İlke:** Görsel olarak benzer elementler, bir grup olarak algılanır.

Benzerlik faktörleri: renk, boyut, şekil, yön, doku.

**UI'da kullanım:**

- Aynı işlev = aynı stil (tüm primary butonlar aynı)
- Farklı işlev = farklı stil (primary vs secondary)
- Kategori renkleri
- İkon stilleri tutarlılığı

[COMPARISON]
❌ Kötü: Her buton farklı renk, hangisi ne belirsiz
✅ İyi: Primary hep mavi, secondary hep gri, destructive hep kırmızı
[/COMPARISON]

**Örnek:**
- Tüm "Sil" butonları kırmızı
- Tüm "Kaydet" butonları mavi
- Kullanıcı pattern'i öğrenir, hızlanır

### 3. Süreklilik (Continuity)

**İlke:** Göz, kesintisiz çizgileri ve eğrileri takip etmeyi tercih eder.

Düzgün akış, doğal yol izleme.

**UI'da kullanım:**

- Progress step'leri çizgiyle bağla
- Timeline tasarımı
- Scroll yönü
- Görsel hiyerarşi akışı

**Örnek:**
○────○────○────●────○
1    2    3    4    5
Step 1 → Step 2 → Step 3 → Step 4

Gözümüz doğal olarak çizgiyi takip eder.

### 4. Kapalılık (Closure)

**İlke:** Beyin, eksik şekilleri tamamlama eğilimindedir.

Tam olmayan şekilleri "kapatır", bütün olarak görür.

**UI'da kullanım:**

- Kartlar (kenarlar tam çizilmese de kart olarak algılanır)
- İkonlar (basitleştirilmiş, eksik detay)
- Carousel'de kesilmiş kartlar (daha fazla içerik var sinyali)
- Logo tasarımı

**Örnek:**
Carousel'de sağda yarım görünen kart → "scroll edersem daha var" mesajı.

### 5. Figür-Zemin (Figure-Ground)

**İlke:** Beyin, görsel alanı figür (ön plan) ve zemin (arka plan) olarak ayırır.

Bir şey öne çıkar, geri kalan arka plan olur.

**UI'da kullanım:**

- Modal/overlay (karartılmış arka plan)
- Dropdown menü (zemin üzerinde figür)
- Focus state (diğerlerini soluklaştırma)
- Kartlar ve gölgeler

[COMPARISON]
❌ Kötü: Modal açıldı ama arka plan aynı parlaklıkta, odak belirsiz
✅ İyi: Modal açıldı, arka plan karartıldı, odak nette
[/COMPARISON]

### 6. Ortak Bölge (Common Region)

**İlke:** Aynı sınırlı alan içindeki elementler, bir grup olarak algılanır.

Çerçeve, kutu, arka plan rengi = gruplama aracı.

**UI'da kullanım:**

- Kart tasarımı
- Form bölümleri
- Well/container
- Grouped settings

**Örnek:**
${'```'}
┌─────────────────────┐
│  Kişisel Bilgiler   │
│  [Ad]  [Soyad]      │
│  [Email]            │
└─────────────────────┘
┌─────────────────────┐
│  Adres Bilgileri    │
│  [Şehir]  [İlçe]    │
│  [Adres]            │
└─────────────────────┘
${'```'}

### 7. Ortak Kader (Common Fate)

**İlke:** Aynı yönde hareket eden elementler, bir grup olarak algılanır.

Hareket birliği = ilişki.

**UI'da kullanım:**

- Paralel animasyonlar
- Slider'da birlikte kayan içerik
- Accordion açılışı
- Drag-and-drop sırasında grup hareketi

**Örnek:**
Bir kartı sürüklerken, içindeki tüm elementler birlikte hareket eder → tek birim algısı.

### 8. Bağlantılılık (Connectedness / Uniform Connectedness)

**İlke:** Fiziksel olarak bağlı elementler, bir grup olarak algılanır.

Çizgi, ok, bağlantı = ilişki.

**UI'da kullanım:**

- Flowchart bağlantıları
- Step indicator çizgileri
- Breadcrumb ayırıcıları
- Org chart

**Örnek:**
[Başla] ───→ [İşlem] ───→ [Bitir]

---

## Ek İlkeler

### Simetri (Symmetry)

Simetrik şekiller daha düzenli ve dengeli algılanır.

**UI'da:** Ortalanmış modal, dengeli layout.

### Basitlik / Prägnanz (Simplicity)

Beyin, en basit yorumu tercih eder.

**UI'da:** Minimal tasarım, gereksiz element çıkarma.

### Ortak Deneyim (Past Experience)

Önceki deneyimler algıyı etkiler.

**UI'da:** Alışılmış pattern'ler kullan (hamburger menu = menu demek).

---

## UI Tasarımda Gestalt Uygulamaları

### Form Tasarımı

**Yakınlık:**
- Label ile input yakın (8px)
- Input grupları arası uzak (24-32px)

**Ortak bölge:**
- İlişkili alanları container'a al

**Benzerlik:**
- Tüm input'lar aynı stil
- Required göstergesi tutarlı

### Kart Tasarımı

**Kapalılık:**
- Border veya shadow ile sınır

**Ortak bölge:**
- İçerik tek birim olarak algılanır

**Figür-zemin:**
- Gölge ile derinlik

### Navigasyon

**Yakınlık:**
- Alt menü öğeleri ana öğeye yakın

**Benzerlik:**
- Aynı seviye linkler aynı stil

**Süreklilik:**
- Breadcrumb ok/çizgi ile akış

### Modal/Overlay

**Figür-zemin:**
- Arka plan karartma
- Modal öne çıkıyor

**Ortak bölge:**
- Modal içeriği tek birim

### Dashboard

**Yakınlık:**
- İlişkili metrikler yakın

**Ortak bölge:**
- Widget kartları

**Benzerlik:**
- Aynı tip grafik aynı stil

---

## Gestalt İhlalleri ve Sonuçları

### Yakınlık İhlali

**Problem:** Label ile input arası çok uzak veya eşit mesafe
**Sonuç:** Kullanıcı yanlış label'ı okur, hata yapar

### Benzerlik İhlali

**Problem:** Farklı işlevli butonlar aynı görünüyor
**Sonuç:** Kullanıcı yanlış butona tıklar

### Figür-Zemin İhlali

**Problem:** Modal açıldı ama arka plan hâlâ aktif görünüyor
**Sonuç:** Kullanıcı nereye odaklanacağını bilemiyor

### Kapalılık İhlali

**Problem:** Kart sınırları belirsiz
**Sonuç:** İçeriklerin ilişkisi anlaşılmıyor

---

[INFO]
100+ yıl
Gestalt ilkeleri 1920'lerden beri geçerli
[/INFO]

---

## Pratik Kontrol Listesi

Form tasarlarken:

[CHECKLIST]
✓ Label, input'a input'lar arasındaki mesafeden daha yakın mı?
✓ İlişkili alanlar gruplanmış mı?
✓ Aynı tip input'lar aynı stilde mi?
✓ Bölümler görsel olarak ayrılmış mı?
[/CHECKLIST]

Genel UI için:

[CHECKLIST]
✓ İlişkili elementler yakın mı?
✓ Aynı işlev = aynı görünüm mü?
✓ Modal/dropdown için figür-zemin ayrımı net mi?
✓ Progress göstergeleri süreklilik sağlıyor mu?
✓ Görsel hiyerarşi net mi?
[/CHECKLIST]

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Bir web sayfasını Gestalt ilkeleri açısından analiz et.

**Adımlar:**

1. **Sayfa seç** (2 dk)
   - Sık kullandığın bir site (e-ticaret, SaaS, haber)

2. **Her ilke için örnek bul** (15 dk)
   
   Şu soruları cevapla:
   
   **Yakınlık:**
   - İlişkili elementler yakın mı?
   - Gruplamada mesafe kullanılmış mı?
   
   **Benzerlik:**
   - Aynı işlevli elementler aynı stilde mi?
   - Renk/boyut tutarlı mı?
   
   **Kapalılık:**
   - Kartlar nasıl tanımlanmış?
   - Sınırlar net mi?
   
   **Figür-zemin:**
   - Odak noktası net mi?
   - Modal/dropdown varsa arka plan nasıl?
   
   **Süreklilik:**
   - Göz akışı doğal mı?
   - Progress indicator var mı?

3. **İyileştirme öner** (3 dk)
   - 1-2 Gestalt ihlali bulduysan, nasıl düzeltirdin?
[/EXERCISE]

---

[SUMMARY]
## Özet

- Gestalt = beynin görsel bilgiyi organize etme prensipleri
- "Bütün, parçaların toplamından fazladır"
- Temel ilkeler: yakınlık, benzerlik, süreklilik, kapalılık, figür-zemin
- Ek ilkeler: ortak bölge, ortak kader, bağlantılılık
- Yakınlık: birbirine yakın = ilişkili
- Benzerlik: aynı görünüm = aynı işlev
- Kapalılık: beyin eksik şekilleri tamamlar
- Figür-zemin: ön plan ve arka plan ayrımı
- UI'da: form gruplama, kart tasarımı, modal, navigasyon
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [UX Writing Temelleri](/kutuphane/ux-writing-temelleri)

**Sonraki:** Renk Teorisi ve UI'da Renk Kullanımı *(yakında)*

**İlgili konular:**
- [UI Nedir?](/kutuphane/ui-nedir)
- [Design System Nedir?](/kutuphane/design-system-nedir)
- Görsel Hiyerarşi Oluşturma *(yakında)*

**İlgili Roadmap:** UI Designer Roadmap → Tasarım Temelleri

---

## Kaynaklar

Derinleşmek istersen:

- [Gestalt Principles - NNGroup](https://www.nngroup.com/articles/gestalt-proximity/) (İngilizce, seri halinde)
- [Laws of UX - Jon Yablonski](https://lawsofux.com/) (İngilizce, interaktif site)
- [Universal Principles of Design](https://www.amazon.com/Universal-Principles-of-Design-Revised-Updated/dp/1592535879) (Kitap, 125 tasarım prensibi)
`,
  },
  "renk-teorisi": {
    id: "renk-teorisi",
    title: "Renk Teorisi ve UI'da Renk Kullanımı",
    subtitle: "Etkili Renk Paleti Oluşturma Rehberi",
    titleEn: "Color Theory for UI",
    slug: "renk-teorisi",
    description: "Renk teorisi nedir? Renk çarkı, renk harmonileri, UI'da renk kullanımı. Erişilebilir ve etkili renk paleti oluşturma rehberi.",
    category: "temel-kavramlar",
    readingTime: 14,
    featured: false,
    publishedAt: "2025-01-16",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Renk Teorisi ve UI'da Renk Kullanımı: Etkili Renk Paleti Oluşturma Rehberi

**Seviye:** Başlangıç - Orta  
**Kategori:** Temel Kavramlar  
**Son güncelleme:** Ocak 2025

---

## Giriş

Mavi neden güven veriyor? Kırmızı neden dikkat çekiyor? Bir uygulamada 15 farklı renk kullanınca neden kaotik görünüyor?

Renk, tasarımın en güçlü araçlarından biri. Doğru kullanıldığında yönlendirir, duygu uyandırır, marka kimliği oluşturur. Yanlış kullanıldığında kafa karışıklığı yaratır, erişilebilirliği bozar, amatör görünüm verir.

**Renk teorisi**, renkleri bilinçli ve etkili kullanmanın temelidir. Sanat eğitiminden gelen bu ilkeler, dijital tasarımda da geçerli.

Bu yazıda renk teorisinin temellerini ve UI tasarımda nasıl uygulanacağını öğreneceksin.

---

## Renk Temelleri

### Renk Özellikleri

Her rengin üç temel özelliği var:

**1. Hue (Ton)**
Rengin kendisi. Kırmızı, mavi, yeşil gibi. Renk çarkındaki pozisyon.

**2. Saturation (Doygunluk)**
Rengin yoğunluğu. Canlı mı, soluk mu? %100 doygunluk = en canlı, %0 = gri.

**3. Lightness/Brightness (Parlaklık)**
Rengin açıklık-koyuluk değeri. %100 = beyaz, %0 = siyah.

### Renk Modelleri

**RGB (Red, Green, Blue)**
Ekranlar için. Işık karışımı. Kırmızı + Yeşil + Mavi = Beyaz.

**HEX**
RGB'nin web formatı. #FF5733 gibi 6 karakterli kod.

**HSL (Hue, Saturation, Lightness)**
Tasarımcı dostu. Rengi, doygunluğu, parlaklığı ayrı kontrol et.

**HSB/HSV (Hue, Saturation, Brightness)**
HSL'e benzer, Figma ve diğer araçlarda yaygın.

[TIP]
💡 HSL ile çalışmak daha sezgisel. Aynı hue'yu koruyup, farklı doygunluk ve parlaklıkla varyasyonlar üretebilirsin.
[/TIP]

---

## Renk Çarkı

Renk çarkı, renklerin ilişkisini gösteren dairesel diyagram.

### Birincil Renkler (Primary)

Diğer renklerden oluşturulamaz: Kırmızı, Sarı, Mavi.

### İkincil Renkler (Secondary)

İki birincil rengin karışımı: Turuncu (kırmızı+sarı), Yeşil (sarı+mavi), Mor (mavi+kırmızı).

### Üçüncül Renkler (Tertiary)

Birincil ve ikincil renk karışımı: Kırmızı-turuncu, Sarı-yeşil gibi.

---

## Renk Harmonileri

Renk çarkını kullanarak uyumlu paletler oluşturma yöntemleri.

### Monokromatik (Monochromatic)

Tek hue, farklı doygunluk ve parlaklık değerleri.

**Örnek:** Mavi ailesinden açık mavi, orta mavi, koyu mavi.

**Avantaj:** Kolay, tutarlı, zarif
**Dezavantaj:** Monoton olabilir, kontrast sınırlı

**UI kullanımı:** Minimal tasarımlar, tek marka rengi etrafında sistem.

### Analogous (Komşu)

Renk çarkında yan yana olan renkler.

**Örnek:** Mavi, mavi-yeşil, yeşil.

**Avantaj:** Doğal, uyumlu, rahatlatıcı
**Dezavantaj:** Kontrast düşük olabilir

**UI kullanımı:** Doğa temalı uygulamalar, rahatlatıcı deneyimler.

### Komplementer (Complementary)

Renk çarkında karşılıklı renkler.

**Örnek:** Mavi ve turuncu, kırmızı ve yeşil.

**Avantaj:** Yüksek kontrast, dikkat çekici
**Dezavantaj:** Aşırı kullanımda yorucu

**UI kullanımı:** CTA vurgulama, accent renk.

### Split-Complementary

Bir renk + karşısındaki rengin iki yanındaki renkler.

**Örnek:** Mavi + sarı-turuncu + kırmızı-turuncu.

**Avantaj:** Komplementerden daha yumuşak, hâlâ kontrastlı
**UI kullanımı:** Daha sofistike paletler.

### Triadik (Triadic)

Renk çarkında eşit mesafedeki üç renk (120° arayla).

**Örnek:** Kırmızı, sarı, mavi.

**Avantaj:** Canlı, dengeli
**Dezavantaj:** Dengelemesi zor

**UI kullanımı:** Oyun arayüzleri, çocuk uygulamaları.

### Tetradik (Square/Rectangle)

Dört renk, dikdörtgen veya kare formasyonunda.

**Avantaj:** Zengin palet
**Dezavantaj:** Dengelemesi en zor

---

## Renk Psikolojisi

Renkler duygusal çağrışımlar yapar. Kültüre göre değişebilir ama bazı genel eğilimler var.

[TABLE]
| Renk | Çağrışımlar | UI Kullanımı |
|------|-------------|--------------|
| **Mavi** | Güven, profesyonellik, sakinlik | Finans, kurumsal, sağlık |
| **Yeşil** | Doğa, büyüme, başarı | Sürdürülebilirlik, onay mesajları |
| **Kırmızı** | Enerji, aciliyet, hata | Uyarılar, hatalar, satış |
| **Turuncu** | Enerji, sıcaklık, eylem | CTA, eğlence |
| **Sarı** | İyimserlik, dikkat, uyarı | Uyarı mesajları, vurgulama |
| **Mor** | Lüks, yaratıcılık, gizemler | Premium, yaratıcı sektörler |
| **Siyah** | Sofistike, güç, elegans | Lüks markalar, minimal |
| **Beyaz** | Temizlik, sadelik, alan | Arka plan, boşluk |
| **Gri** | Nötr, profesyonel, denge | UI temeli, metin |
[/TABLE]

[WARNING]
⚠️ Renk psikolojisi kültüre göre değişir. Batı'da beyaz saflık, Doğu Asya'da yas rengi olabilir. Hedef kitlenizi düşünün.
[/WARNING]

---

## UI İçin Renk Paleti Oluşturma

### Temel Palet Yapısı

**1. Primary (Birincil)**
Marka rengi. CTA'lar, ana aksiyonlar.

**2. Secondary (İkincil)**
Destekleyici renk. İkincil aksiyonlar.

**3. Accent**
Vurgu rengi. Küçük detaylar, dikkat çekme.

**4. Neutral (Nötr)**
Gri skalası. Metin, border, arka plan.

**5. Semantic (Anlamsal)**
Duruma göre renkler: success (yeşil), warning (sarı), error (kırmızı), info (mavi).

### 60-30-10 Kuralı

**%60 Dominant:** Arka plan, büyük alanlar (genellikle nötr)
**%30 Secondary:** Kartlar, bölümler, destekleyici
**%10 Accent:** CTA, vurgular, dikkat çekici detaylar

Bu oran görsel denge sağlar.

### Renk Tonları Oluşturma

Her ana renk için ton skalası oluştur:
**Primary:**
- 50   - En açık (hover, subtle)
- 100  - Çok açık
- 200  - Açık
- 300  - Orta açık
- 400  - Orta
- 500  - Ana ton (base)
- 600  - Orta koyu
- 700  - Koyu
- 800  - Çok koyu
- 900  - En koyu (pressed state)

Bu sistem Tailwind CSS ve birçok design system'da kullanılır.

---

## Erişilebilirlik ve Kontrast

### WCAG Kontrast Gereksinimleri

[TABLE]
| Metin Tipi | AA Seviyesi | AAA Seviyesi |
|------------|-------------|--------------|
| Normal metin | 4.5:1 | 7:1 |
| Büyük metin (18px+) | 3:1 | 4.5:1 |
| UI bileşenleri | 3:1 | - |
[/TABLE]

### Renk Körlüğü

Dünya nüfusunun yaklaşık %8'i (erkeklerde daha yüksek) bir tür renk körlüğü yaşıyor.

**Türler:**
- Deuteranopia (yeşil körlüğü) - En yaygın
- Protanopia (kırmızı körlüğü)
- Tritanopia (mavi körlüğü) - Nadir

**Tasarım önerileri:**

[COMPARISON]
❌ Kötü: Sadece kırmızı/yeşil ile hata/başarı gösterme
✅ İyi: Kırmızı + ✕ ikonu, Yeşil + ✓ ikonu
[/COMPARISON]

- Sadece renge güvenme, ikon/pattern/metin ekle
- Kırmızı-yeşil kombinasyonuna dikkat
- Simülatörlerle test et

### Test Araçları

- **WebAIM Contrast Checker** - Kontrast oranı
- **Stark (Figma plugin)** - Kontrast + renk körlüğü
- **Color Oracle** - Renk körlüğü simülatörü
- **Coblis** - Online renk körlüğü simülatörü

---

## Dark Mode Renkleri

Dark mode için renkleri doğrudan tersine çevirme. Özel düzenleme gerekir.

### Dark Mode İlkeleri

**1. Saf siyah kullanma**
#000000 yerine #121212 veya koyu gri. Saf siyah ekranda "delik" etkisi yapar.

**2. Doygunluğu azalt**
Canlı renkler karanlık arka planda göz yorar. Primary rengin doygunluğunu düşür.

**3. Depth için gölge yerine elevation**
Karanlıkta gölge görünmez. Yükselen yüzeyler daha açık ton alır.

**4. Beyaz metin için kontrast**
Saf beyaz (${'`'}#FFFFFF${'`'}) çok parlak olabilir. ${'`'}#E0E0E0${'`'} gibi hafif gri daha rahat.

---

## Renk Seçim Araçları

[TABLE]
| Araç | Özellik |
|------|---------|
| **Coolors** | Hızlı palet üretimi, export |
| **Adobe Color** | Harmoni kuralları, trend paletler |
| **Realtime Colors** | Paleti gerçek UI'da önizle |
| **Happy Hues** | Hazır palet + uygulama örneği |
| **ColorHunt** | Topluluk paletleri |
| **Figma Plugins** | Coolors, Stark, Color Palettes |
[/TABLE]

---

## Sık Yapılan Hatalar

### 1. Çok fazla renk

[COMPARISON]
❌ Kötü: 10 farklı renk, her biri farklı ton
✅ İyi: Primary, secondary, nötrler, semantic - tutarlı sistem
[/COMPARISON]

### 2. Yetersiz kontrast

Açık gri metin beyaz üzerinde okunmaz. Kontrast kontrol et.

### 3. Sadece renge güvenmek

Renk körlüğü olan kullanıcıları dışlar. İkon, metin, pattern ekle.

### 4. Doygunluk abartısı

Her şey canlı renk olunca göz yorulur. Nötrler denge sağlar.

### 5. Dark mode'u unutmak

Light için tasarlayıp dark'ı sonradan eklemek zor. Baştan düşün.

### 6. Kültürel farkları görmezden gelmek

Global ürün için renk çağrışımlarını araştır.

---

## Pratik İpuçları

**Başlarken:**
1. Marka rengi varsa onunla başla
2. Yoksa hedef kitleye uygun primary seç
3. Komplementer veya split-complementary ile accent belirle
4. Gri skalası oluştur (5-9 ton)
5. Semantic renkler ekle (standart: yeşil, sarı, kırmızı, mavi)

**Palet oluştururken:**
- Gerçek UI'da test et (Realtime Colors)
- Metin, buton, kart, form - hepsinde dene
- Kontrast kontrolü yap
- Renk körlüğü simülasyonu yap

**Token olarak kaydet:**
${'```'}
color-primary-500: #6366F1
color-primary-600: #4F46E5
color-neutral-100: #F3F4F6
color-neutral-900: #111827
color-success-500: #10B981
color-error-500: #EF4444
${'```'}

---

[EXERCISE]
## Şimdi Sen Dene

**25 dakika**

**Görev:** Bir fintech uygulaması için renk paleti oluştur.

**Gereksinimler:**
- Güven veren, profesyonel his
- Erişilebilir (WCAG AA)
- Light ve dark mode uyumlu düşün

**Adımlar:**

1. **Primary renk seç (5 dk)**
   - Fintech için uygun ton (mavi, yeşil, mor?)
   - Coolors veya Adobe Color kullan

2. **Ton skalası oluştur (5 dk)**
   - 50'den 900'e kadar en az 5 ton
   
3. **Nötr palet (5 dk)**
   - Gri skalası: 5-7 ton
   - Metin için koyu, arka plan için açık

4. **Semantic renkler (5 dk)**
   - Success, Warning, Error, Info

5. **Kontrast testi (5 dk)**
   - Primary buton üzerinde beyaz metin: 4.5:1 üzeri mi?
   - Body text arka plan üzerinde: 4.5:1 üzeri mi?

**Çıktı:** 
- Primary: 5 ton
- Neutral: 5-7 ton  
- Semantic: 4 renk
- Her birinin HEX kodu
[/EXERCISE]

---

[SUMMARY]
## Özet

- Rengin üç özelliği: hue (ton), saturation (doygunluk), lightness (parlaklık)
- Renk harmonileri: monokromatik, analogous, komplementer, triadik
- UI paleti: primary, secondary, neutral, semantic renkler
- 60-30-10 kuralı: dominant, secondary, accent oranı
- Kontrast: normal metin 4.5:1, büyük metin 3:1 minimum
- Renk körlüğü için: sadece renge güvenme, ikon/metin ekle
- Dark mode: saf siyah kullanma, doygunluğu azalt
- Her renk için ton skalası oluştur (50-900)
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Gestalt İlkeleri ve Görsel Algı](/kutuphane/gestalt-ilkeleri)

**Sonraki:** Tipografi Temelleri *(yakında)*

**İlgili konular:**
- [Design System Nedir?](/kutuphane/design-system-nedir)
- [Accessibility Temelleri](/kutuphane/accessibility-temelleri)
- Dark Mode Tasarımı *(yakında)*

**İlgili Roadmap:** UI Designer Roadmap → Görsel Tasarım Temelleri

---

## Kaynaklar

Derinleşmek istersen:

- [Color in UI Design - NNGroup](https://www.nngroup.com/articles/color-enhance-design/) (İngilizce, 8 dk)
- [Refactoring UI - Color](https://www.refactoringui.com/) (Kitap, pratik renk tavsiyeleri)
- [Realtime Colors](https://www.realtimecolors.com/) (Araç, palet önizleme)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) (Araç)
`,
  },
  "tipografi-temelleri": {
    id: "tipografi-temelleri",
    title: "Tipografi Temelleri",
    subtitle: "UI'da Yazı Tipi Seçimi ve Kullanımı",
    titleEn: "Typography Basics",
    slug: "tipografi-temelleri",
    description: "Tipografi nedir? Font seçimi, type scale, line height, letter spacing. UI tasarımda okunabilir ve estetik tipografi rehberi.",
    category: "temel-kavramlar",
    readingTime: 13,
    featured: false,
    publishedAt: "2025-01-16",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Tipografi Temelleri: UI'da Yazı Tipi Seçimi ve Kullanımı

**Seviye:** Başlangıç - Orta
**Kategori:** Temel Kavramlar
**Son güncelleme:** Ocak 2025

---

## Giriş

Bir web sitesinin %95'i tipografi. Metin her yerde: başlıklar, paragraflar, butonlar, menüler, form alanları, hata mesajları.

Yanlış font seçimi veya kötü tipografik ayarlar, tasarımı amatör gösterir ve okunabilirliği yok eder. Doğru tipografi ise görünmezdir - kullanıcı içeriğe odaklanır, fontun kendisini fark etmez.

**Tipografi**, sadece "güzel font seçmek" değil. Boyut, ağırlık, satır aralığı, harf aralığı, hiyerarşi - hepsi bilinçli kararlar gerektirir.

Bu yazıda tipografinin temellerini ve UI tasarımda nasıl uygulanacağını öğreneceksin.

---

## Tipografi Terminolojisi

### Font vs Typeface

**Typeface (Yazı tipi):** Tasarım ailesi. Örnek: Helvetica, Inter, Roboto.

**Font:** Typeface'in belirli bir varyasyonu. Örnek: Inter Bold 16px.

Günlük kullanımda ikisi karıştırılır, çoğu durumda sorun değil.

### Temel Kavramlar

**Baseline:** Harflerin oturduğu çizgi.

**X-height:** Küçük harflerin yüksekliği (x harfi referans). Yüksek x-height = daha okunabilir.

**Cap height:** Büyük harflerin yüksekliği.

**Ascender:** Baseline üzerine çıkan kısım (b, d, h gibi).

**Descender:** Baseline altına inen kısım (g, p, y gibi).

**Kerning:** İki harf arasındaki mesafe ayarı.

**Tracking (Letter spacing):** Tüm harfler arasındaki genel mesafe.

**Leading (Line height):** Satırlar arası mesafe.

---

## Font Kategorileri

### Serif

Harflerin uçlarında küçük çıkıntılar (tırnaklar) var.

**Özellikler:** Geleneksel, resmi, güvenilir, klasik.

**Örnekler:** Times New Roman, Georgia, Playfair Display, Merriweather.

**UI kullanımı:** Editoryal içerik, lüks markalar, uzun form okuma.

### Sans-serif

Tırnaksız, temiz harfler.

**Özellikler:** Modern, minimal, temiz, nötr.

**Örnekler:** Helvetica, Inter, Roboto, Open Sans, SF Pro.

**UI kullanımı:** Çoğu dijital arayüz, uygulama UI, web.

### Monospace

Her harf aynı genişlikte.

**Özellikler:** Teknik, kod görünümü.

**Örnekler:** Fira Code, JetBrains Mono, Consolas.

**UI kullanımı:** Kod blokları, teknik veriler, terminaller.

### Display / Decorative

Dikkat çekici, özel tasarım.

**Özellikler:** Etkileyici, kişilikli ama okunması zor olabilir.

**UI kullanımı:** Sadece başlıklar, logo, hero section. Body text için asla.

---

## Font Seçimi

### UI İçin İyi Font Özellikleri

**1. Okunabilirlik**
- Yüksek x-height
- Açık harf formları (a, e, g, s net ayrışmalı)
- Tutarlı stroke kalınlığı

**2. Karakter seti**
- Türkçe karakterler (ğ, ü, ş, ı, ö, ç)
- Sayılar, semboller
- Farklı weight'ler (regular, medium, bold minimum)

**3. Performans**
- Web font olarak optimize edilmiş
- Makul dosya boyutu

**4. Lisans**
- Ticari kullanıma uygun

### Popüler UI Fontları

[TABLE]
| Font | Tip | Özellik | Lisans |
|------|-----|---------|--------|
| **Inter** | Sans-serif | UI için tasarlandı, geniş karakter seti | Ücretsiz |
| **Roboto** | Sans-serif | Google'ın Material font'u | Ücretsiz |
| **SF Pro** | Sans-serif | Apple ekosistemi | Apple cihazlar |
| **Open Sans** | Sans-serif | Nötr, okunabilir | Ücretsiz |
| **Nunito** | Sans-serif | Yumuşak, samimi | Ücretsiz |
| **Poppins** | Sans-serif | Geometrik, modern | Ücretsiz |
| **Lato** | Sans-serif | Sıcak, profesyonel | Ücretsiz |
| **Source Sans Pro** | Sans-serif | Adobe, temiz | Ücretsiz |
[/TABLE]

[TIP]
💡 Inter, UI tasarımı için özel olarak tasarlandı. Türkçe desteği var, ücretsiz ve çok sayıda weight içeriyor. Emin değilsen Inter ile başla.
[/TIP]

---

## Type Scale (Boyut Sistemi)

Rastgele boyutlar yerine, tutarlı bir ölçek kullan.

### Modüler Scale

Bir oran ile çarparak boyutlar oluşturulur.

**Yaygın oranlar:**
- 1.125 (Major Second)
- 1.200 (Minor Third)
- 1.250 (Major Third) - Popüler
- 1.333 (Perfect Fourth)
- 1.414 (Augmented Fourth)
- 1.618 (Golden Ratio)

**Örnek (1.25 oran, 16px base):**

[TABLE]
| İsim | Boyut | Kullanım |
|------|-------|----------|
| xs | 12px | Caption, helper text |
| sm | 14px | Secondary text, label |
| base | 16px | Body text |
| lg | 20px | Lead paragraph |
| xl | 24px | H4 |
| 2xl | 30px | H3 |
| 3xl | 38px | H2 |
| 4xl | 48px | H1 |
| 5xl | 60px | Display |
[/TABLE]

### Pratik Type Scale

Modüler hesaplama yerine, yaygın kullanılan değerler:

12 - 14 - 16 - 18 - 20 - 24 - 30 - 36 - 48 - 60 - 72

Bu değerler çoğu tasarım sisteminde karşına çıkar.

---

## Font Weight

Yazının kalınlığı. Hiyerarşi ve vurgu için kullanılır.

[TABLE]
| Weight | Değer | Kullanım |
|--------|-------|----------|
| Thin | 100 | Dekoratif, dikkatli kullan |
| Light | 300 | Büyük başlıklarda |
| Regular | 400 | Body text |
| Medium | 500 | Vurgu, subtitle |
| Semibold | 600 | Başlıklar, butonlar |
| Bold | 700 | Güçlü vurgu |
| Black | 900 | Display, çok dikkatli kullan |
[/TABLE]

**Öneriler:**
- Body text için Regular (400)
- Başlıklar için Semibold (600) veya Bold (700)
- Çok fazla weight karıştırma (2-3 yeterli)
- İnce fontlar küçük boyutlarda okunmaz

---

## Line Height (Satır Aralığı)

Satırlar arası mesafe. Okunabilirlik için kritik.

**Genel kurallar:**

[TABLE]
| İçerik Tipi | Line Height | Açıklama |
|-------------|-------------|----------|
| Body text | 1.5 - 1.7 | Rahat okuma |
| Başlıklar | 1.1 - 1.3 | Sıkı, kompakt |
| Büyük display | 1.0 - 1.1 | Çok sıkı |
| Uzun paragraf | 1.6 - 1.8 | Daha rahat |
[/TABLE]

[COMPARISON]
❌ Kötü: Body text'te 1.0 line-height, satırlar birbirine yapışık
✅ İyi: Body text'te 1.5-1.6 line-height, rahat okuma
[/COMPARISON]

**Hesaplama:**
Line height = font size × oran
16px × 1.5 = 24px satır yüksekliği

---

## Letter Spacing (Harf Aralığı)

Harfler arası genel mesafe.

**Genel kurallar:**

- Body text: Genellikle 0 veya çok minimal (font'un default'u yeterli)
- Büyük başlıklar: Negatif değer (-0.02em) daha sıkı görünüm
- Küçük text, all caps: Pozitif değer (+0.05em - +0.1em) daha okunabilir
- All caps metin: Her zaman letter-spacing artır

[COMPARISON]
❌ Kötü: ALL CAPS text normal letter-spacing, harfler yapışık
✅ İyi: ALL CAPS text'te +0.05em letter-spacing, okunabilir
[/COMPARISON]

---

## Satır Uzunluğu (Measure)

Bir satırdaki karakter sayısı. Çok kısa veya çok uzun satırlar okumayı zorlaştırır.

**İdeal aralık:** 45-75 karakter (boşluklar dahil)

**Optimum:** 66 karakter

**Pratik uygulama:**
- max-width kullan
- Paragraflar için 600-800px genişlik genellikle uygun
- Mobilde tam genişlik olabilir ama padding ile dengele

---

## Tipografik Hiyerarşi

Görsel önem sırası oluşturma. Kullanıcı nereye bakacağını bilmeli.

### Hiyerarşi Araçları

**1. Boyut**
Büyük = önemli, küçük = secondary

**2. Weight**
Bold = vurgu, regular = normal

**3. Renk**
Koyu = önemli, açık = secondary

**4. Konum**
Üst = önce görülür

**5. Boşluk**
Etrafında boşluk olan element dikkat çeker

### Örnek Hiyerarşi

[TABLE]
| Element | Boyut | Weight | Renk |
|---------|-------|--------|------|
| H1 | 48px | Bold | #111827 |
| H2 | 36px | Semibold | #111827 |
| H3 | 24px | Semibold | #111827 |
| Body | 16px | Regular | #374151 |
| Secondary | 14px | Regular | #6B7280 |
| Caption | 12px | Regular | #9CA3AF |
[/TABLE]

---

## Font Pairing (Font Eşleştirme)

İki farklı font kullanacaksan uyum önemli.

### Eşleştirme İlkeleri

**1. Kontrast oluştur**
Benzer fontlar yerine farklı karakterde fontlar. Serif başlık + Sans-serif body klasik kombinasyon.

**2. X-height'ı eşleştir**
İki fontun x-height'ı benzer olmalı, yan yana dengesiz durmasın.

**3. Çok farklı kaçınma**
İki display font birlikte kaotik görünür.

### Güvenli Kombinasyonlar

- Playfair Display (başlık) + Lato (body)
- Poppins (başlık) + Inter (body)
- Merriweather (başlık) + Open Sans (body)
- Roboto Slab (başlık) + Roboto (body)

[TIP]
💡 Emin değilsen tek font ailesi kullan. Inter'in farklı weight'leri çoğu ihtiyacı karşılar.
[/TIP]

---

## Web Font Performansı

Fontlar sayfa yükleme süresini etkiler.

### Optimizasyon İpuçları

**1. Sadece kullanılan weight'leri yükle**
Regular, Medium, Bold yeterli. 9 weight yükleme.

**2. Subset kullan**
Latin-extended veya sadece Türkçe karakterler.

**3. Font-display: swap**
Metin hemen görünsün, font yüklenince değişsin.

**4. Preload kritik fontlar**
İlk görünen fontları önceden yükle.

**5. Sistem fontları düşün**
-apple-system, BlinkMacSystemFont, 'Segoe UI' - sıfır yükleme süresi.

### System Font Stack
${'```'}
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
${'```'}

Her cihaz kendi sistem fontunu kullanır. Hızlı, tutarlı.

---

## Responsive Tipografi

Farklı ekran boyutlarında tipografi ayarı.

### Yaklaşımlar

**1. Breakpoint bazlı**
Mobil, tablet, desktop için farklı boyutlar.

**2. Fluid typography**
Viewport genişliğine göre sürekli değişen boyut (clamp() ile).

**3. Hibrit**
Base boyut sabit, başlıklar fluid.

### Örnek Fluid Typography
${'```'}
font-size: clamp(1rem, 0.5rem + 2vw, 2rem);
${'```'}

Minimum 1rem, maksimum 2rem, arada viewport'a göre ayarlanır.

---

## Sık Yapılan Hatalar

### 1. Çok küçük font

[COMPARISON]
❌ Kötü: Body text 12px, okunması zor
✅ İyi: Body text minimum 16px
[/COMPARISON]

### 2. Yetersiz kontrast

Açık gri metin beyaz üzerinde okunmaz.

### 3. Çok fazla font

5 farklı font = kaos. 1-2 font yeterli.

### 4. Tutarsız scale

Rastgele boyutlar: 13px, 17px, 22px. Sistem oluştur.

### 5. Dar line-height

Body text'te 1.0-1.2 satır aralığı okumayı zorlaştırır.

### 6. Çok uzun satırlar

100+ karakter satırlar göz yorar. Max-width kullan.

### 7. All caps'te letter-spacing unutmak

Büyük harfler birbirine yapışık görünür.

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Bir blog sayfası için tipografi sistemi oluştur.

**Gereksinimler:**
- Başlıklar ve body text
- Okunabilir, modern görünüm
- Türkçe karakter desteği

**Adımlar:**

1. **Font seç (5 dk)**
   - Google Fonts'tan bir font seç
   - Weight'leri belirle (hangileri lazım?)

2. **Type scale oluştur (5 dk)**
   - H1, H2, H3, body, small için boyutlar
   - 1.25 oran kullanabilirsin

3. **Line height belirle (3 dk)**
   - Başlıklar için
   - Body text için

4. **Hiyerarşi tablosu yap (5 dk)**

| Element | Font Size | Weight | Line Height | Color |
|---------|-----------|--------|-------------|-------|
| H1 | ? | ? | ? | ? |
| H2 | ? | ? | ? | ? |
| Body | ? | ? | ? | ? |
| Caption | ? | ? | ? | ? |

5. **Kontrol (2 dk)**
   - Body en az 16px mi?
   - Line height 1.5+ mı?
   - Kontrast yeterli mi?
[/EXERCISE]

---

[SUMMARY]
## Özet

- Tipografi UI'ın %95'i, bilinçli kararlar gerektirir
- Sans-serif fontlar dijital UI için genellikle daha uygun
- Body text minimum 16px, line-height 1.5-1.7
- Type scale kullan, rastgele boyutlardan kaçın
- 1-2 font ailesi yeterli, weight'lerle hiyerarşi kur
- Satır uzunluğu 45-75 karakter ideal
- All caps'te letter-spacing artır
- Web font performansını düşün, sadece gereken weight'leri yükle
- Responsive tipografi için fluid veya breakpoint yaklaşımı
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Renk Teorisi ve UI'da Renk Kullanımı](/kutuphane/renk-teorisi)

**Sonraki:** Görsel Hiyerarşi Oluşturma *(yakında)*

**İlgili konular:**
- [Design System Nedir?](/kutuphane/design-system-nedir)
- [Accessibility Temelleri](/kutuphane/accessibility-temelleri)
- [UX Writing Temelleri](/kutuphane/ux-writing-temelleri)

**İlgili Roadmap:** UI Designer Roadmap → Görsel Tasarım Temelleri

---

## Kaynaklar

Derinleşmek istersen:

- [Practical Typography - Matthew Butterick](https://practicaltypography.com/) (İngilizce, online kitap)
- [Typewolf](https://www.typewolf.com/) (İngilizce, font önerileri)
- [Google Fonts](https://fonts.google.com/) (Ücretsiz fontlar)
- [Type Scale](https://type-scale.com/) (Araç, scale hesaplama)
`,
  },
  "gorsel-hiyerarsi": {
    id: "gorsel-hiyerarsi",
    title: "Görsel Hiyerarşi Oluşturma",
    subtitle: "Kullanıcının Gözünü Yönlendirme Sanatı",
    titleEn: "Visual Hierarchy",
    slug: "gorsel-hiyerarsi",
    description: "Görsel hiyerarşi nedir? Boyut, renk, kontrast, boşluk ve konum ile dikkat yönetimi. UI'da etkili hiyerarşi oluşturma rehberi.",
    category: "ux-design",
    readingTime: 12,
    featured: false,
    publishedAt: "2025-01-16",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Görsel Hiyerarşi Oluşturma: Kullanıcının Gözünü Yönlendirme Sanatı

**Seviye:** Başlangıç - Orta
**Kategori:** UX Design
**Son güncelleme:** Ocak 2025

---

## Giriş

Bir sayfaya baktığında gözün ilk nereye gidiyor?

Bu tesadüf değil. İyi tasarımcılar, kullanıcının dikkatini bilinçli olarak yönlendirir. En önemli şey önce görülür, sonra ikinci önemli, sonra üçüncü. Bu sıralama net olmazsa sayfa kaotik görünür ve kullanıcı kaybolur.

**Görsel hiyerarşi**, tasarım elementlerini önem sırasına göre düzenleme sanatı. Her element eşit dikkat çekerse, hiçbiri dikkat çekmez. Hiyerarşi olmadan tasarım, bağıran bir kalabalık gibidir.

Bu yazıda görsel hiyerarşinin ne olduğunu, hangi araçlarla oluşturulduğunu ve nasıl uygulanacağını öğreneceksin.

---

## Görsel Hiyerarşi Nedir?

[CALLOUT]
**Görsel Hiyerarşi:**
Tasarım elementlerini görsel önem sırasına göre düzenleme ve kullanıcının dikkatini kontrollü şekilde yönlendirme prensibi. Hangi elementin önce, hangisinin sonra görüleceğini belirler.
[/CALLOUT]

**Temel soru:** Kullanıcı bu sayfaya baktığında sırasıyla neyi görmeli?

1. En önemli mesaj/aksiyon
2. Destekleyici bilgi
3. Detaylar
4. Secondary içerik

Bu sıralama net olmalı ve görsel araçlarla desteklenmeli.

---

## Neden Görsel Hiyerarşi Önemli?

### 1. Yönlendirme

Kullanıcı nereye bakacağını bilir. Kaybolmaz, kafası karışmaz.

### 2. Taranabilirlik

Çoğu kullanıcı okumaz, tarar. Hiyerarşi, tarama sırasında önemli noktaları yakalamasını sağlar.

### 3. Dönüşüm

CTA net bir şekilde öne çıkarsa, tıklanma olasılığı artar.

### 4. Estetik

Dengeli hiyerarşi, profesyonel ve düzenli görünüm sağlar.

### 5. Erişilebilirlik

Screen reader kullanıcıları için de mantıksal sıralama önemli.

[INFO]
**2.6 saniye**
Kullanıcının bir sayfada ilk izlenimi oluşturma süresi
[/INFO]

---

## Hiyerarşi Araçları

### 1. Boyut (Size)

En güçlü araç. Büyük = önemli, küçük = daha az önemli.

**Uygulama:**
- Başlıklar body text'ten büyük
- Primary CTA secondary'den büyük
- Hero başlığı diğer başlıklardan büyük

[COMPARISON]
❌ Kötü: Tüm metinler aynı boyutta, neyin önemli olduğu belirsiz
✅ İyi: Başlık 48px, alt başlık 24px, body 16px - net hiyerarşi
[/COMPARISON]

### 2. Renk ve Kontrast (Color & Contrast)

Dikkat çekici renkler öne çıkar. Yüksek kontrast dikkat çeker.

**Uygulama:**
- Primary CTA dikkat çekici renk
- Önemli bilgi koyu metin
- Secondary bilgi açık gri metin
- Arka plandan ayrışan vurgular

**Kontrast türleri:**
- Renk kontrastı (mavi buton beyaz arka planda)
- Ton kontrastı (koyu metin açık zemin)
- Doygunluk kontrastı (canlı renk soluk ortamda)

### 3. Boşluk (Whitespace)

Etrafında boşluk olan element daha önemli görünür.

**Uygulama:**
- Başlıkların üstünde/altında fazla boşluk
- CTA etrafında nefes alanı
- Bölümler arası yeterli margin
- Kalabalık değil, ferah tasarım

[TIP]
💡 Boşluk "boş alan" değil, tasarımın parçası. Boşluk eklemekten korkma.
[/TIP]

### 4. Konum (Position)

Üst ve sol taraf önce görülür (soldan sağa okuyan dillerde).

**Uygulama:**
- En önemli içerik üstte
- Logo sol üstte
- Primary CTA göz hattında
- Footer'da secondary bilgiler

### 5. Ağırlık (Weight)

Kalın metin ince metinden önce dikkat çeker.

**Uygulama:**
- Başlıklar bold
- Body text regular
- Vurgular semibold
- Caption/secondary light veya regular

### 6. Yoğunluk (Density)

Sıkışık alanlar dikkat çeker ama okunabilirlik düşer. Denge önemli.

**Uygulama:**
- Önemli bilgi izole, etrafında boşluk
- Liste/detay bilgisi daha yoğun olabilir

### 7. Görsel Elementler

İnsan yüzleri, fotoğraflar, ikonlar dikkat çeker.

**Uygulama:**
- Hero section'da görsel
- Özellik listelerinde ikonlar
- Testimonial'da yüz fotoğrafı
- Görsel yönlendirme (ok, bakış yönü)

---

## Göz Tarama Kalıpları

Kullanıcılar sayfaları belirli kalıplarda tarar.

### F-Pattern

Metin ağırlıklı sayfalarda (blog, haber, arama sonuçları).

**Nasıl çalışır:**
1. Üstte yatay tarama
2. Biraz aşağı inip tekrar yatay
3. Sol tarafta dikey tarama

**UI uygulaması:**
- Önemli bilgi sol üstte
- Başlıklar sola yaslanmış
- Sol tarafta anahtar kelimeler

### Z-Pattern

Az içerikli, görsel ağırlıklı sayfalarda (landing page, hero section).

**Nasıl çalışır:**
1. Sol üstten başla (logo)
2. Sağa doğru yatay (navigation)
3. Çapraz aşağı sola
4. Sağa doğru yatay (CTA)

**UI uygulaması:**
- Logo sol üst
- Navigation sağ üst
- İçerik ortada
- CTA sağ alt veya ortada

### Gutenberg Diyagramı

Sayfa dört bölgeye ayrılır:

- Sol üst: Primary Optical Area (ilk bakış)
- Sağ üst: Strong Fallow Area
- Sol alt: Weak Fallow Area (en az dikkat)
- Sağ alt: Terminal Area (son bakış, CTA için ideal)

---

## Hiyerarşi Seviyeleri

Tipik bir sayfa için 3-4 hiyerarşi seviyesi yeterli.

[TABLE]
| Seviye | Ne İçerir | Görsel Özellikler |
|--------|-----------|-------------------|
| **1. Primary** | Ana başlık, hero mesajı | En büyük, en dikkat çekici |
| **2. Secondary** | Alt başlıklar, önemli bilgi | Orta büyüklük, belirgin |
| **3. Tertiary** | Body text, açıklamalar | Normal boyut, okunabilir |
| **4. Quaternary** | Caption, metadata, footer | Küçük, subtle |
[/TABLE]

**Her seviye için:**
- Boyut farkı net olmalı (en az 1.25x oran)
- Renk/kontrast farkı görünür olmalı
- Weight farkı algılanabilir olmalı

---

## UI Elementlerinde Hiyerarşi

### Butonlar

[TABLE]
| Tip | Görünüm | Kullanım |
|-----|---------|----------|
| **Primary** | Solid, dikkat çekici renk | Ana aksiyon (Kaydet, Satın Al) |
| **Secondary** | Outline veya subtle | İkincil aksiyon (İptal, Daha Fazla) |
| **Tertiary** | Text link, minimal | Üçüncül aksiyon (Yardım, Detay) |
| **Destructive** | Kırmızı tonu | Tehlikeli aksiyon (Sil) |
[/TABLE]

### Kart İçeriği

Bir kart içinde de hiyerarşi olmalı:
1. Görsel (varsa) - dikkat çekici
2. Başlık - büyük, bold
3. Açıklama - normal, gri
4. Meta bilgi - küçük, subtle
5. Aksiyon - belirgin ama başlıktan küçük

### Form

1. Section başlığı - büyük
2. Label - medium, koyu
3. Input - normal
4. Helper text - küçük, açık renk
5. Error - küçük ama dikkat çekici renk

---

## Hiyerarşi Test Etme

### Squint Test (Kısık Göz Testi)

Gözlerini kısarak tasarıma bak. Sadece ana şekilleri görürsün. Hâlâ hiyerarşi algılanıyor mu?

### Blur Test

Tasarımı blur'la (Figma'da efekt ekle). Önemli elementler hâlâ ayırt ediliyor mu?

### 5 Saniye Testi

Birine tasarımı 5 saniye göster. "Ne gördün?" diye sor. Önemli mesajları söyleyebiliyor mu?

### İlk Tıklama

Kullanıcıya bir görev ver. İlk nereye tıklıyor? Doğru yere mi?

---

## Sık Yapılan Hatalar

### 1. Her şey önemli

[COMPARISON]
❌ Kötü: 5 farklı CTA hepsi aynı vurguda, hepsi "önemli"
✅ İyi: 1 primary CTA net öne çıkıyor, diğerleri secondary
[/COMPARISON]

Her şey önemli olunca hiçbir şey önemli değil.

### 2. Yetersiz boyut farkı

32px ve 28px arasındaki fark algılanmaz. En az 1.25-1.5x oran kullan.

### 3. Boşluk korkusu

Her yeri içerikle doldurmak kaos yaratır. Boşluk hiyerarşinin parçası.

### 4. Tutarsız hiyerarşi

Bir sayfada H2 36px, başka sayfada 28px. Tutarlı sistem kur.

### 5. Renge çok güvenmek

Renk körlüğü olan kullanıcılar için renk tek başına yetmez. Boyut ve weight de kullan.

### 6. Mobili unutmak

Desktop'ta çalışan hiyerarşi mobilde bozulabilir. Responsive düşün.

---

## Pratik Uygulama: Landing Page

**Hiyerarşi sırası:**

1. **Hero başlık** - En büyük, en dikkat çekici
2. **Alt başlık/değer önerisi** - Başlıktan küçük, açıklayıcı
3. **Primary CTA** - Dikkat çekici renk, belirgin boyut
4. **Supporting visual** - Hero görsel
5. **Feature başlıkları** - Orta boyut
6. **Feature açıklamaları** - Normal body text
7. **Secondary CTA** - Daha subtle
8. **Footer** - En küçük, en az önemli

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Bir pricing sayfası için hiyerarşi planla.

**Senaryo:** SaaS ürünü, 3 plan (Basic, Pro, Enterprise). Pro planı öne çıkarmak istiyorsun.

**Adımlar:**

1. **Element listesi (3 dk)**
   Sayfada hangi elementler olacak? Listele:
   - Sayfa başlığı
   - Plan kartları
   - Plan isimleri
   - Fiyatlar
   - Özellik listeleri
   - CTA butonları
   - ...

2. **Önem sırası (5 dk)**
   Her elementi 1-4 arası önem seviyesine ata.

3. **Görsel araçlar (7 dk)**
   Her seviye için hangi araçları kullanacaksın?
   
   | Element | Seviye | Boyut | Renk | Weight | Boşluk |
   |---------|--------|-------|------|--------|--------|
   | Sayfa başlığı | ? | ? | ? | ? | ? |
   | Pro plan kartı | ? | ? | ? | ? | ? |
   | Pro plan CTA | ? | ? | ? | ? | ? |
   | Diğer plan CTA | ? | ? | ? | ? | ? |

4. **Pro planı nasıl öne çıkarırsın? (5 dk)**
   - Boyut farkı?
   - Renk vurgusu?
   - Badge (Popular, Recommended)?
   - Konum?
[/EXERCISE]

---

[SUMMARY]
## Özet

- Görsel hiyerarşi = elementleri önem sırasına göre düzenleme
- Her şey eşit önemde olunca hiçbir şey önemli değil
- Hiyerarşi araçları: boyut, renk/kontrast, boşluk, konum, ağırlık
- F-pattern metin ağırlıklı, Z-pattern görsel ağırlıklı sayfalarda
- 3-4 hiyerarşi seviyesi yeterli (primary, secondary, tertiary, quaternary)
- Boyut farkı en az 1.25x olmalı
- Squint test ve 5 saniye testiyle kontrol et
- Tutarlı sistem kur, sayfa sayfa değişmesin
- Mobil için de hiyerarşiyi kontrol et
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Tipografi Temelleri](/kutuphane/tipografi-temelleri)

**Sonraki:** Spacing ve Layout Sistemleri *(yakında)*

**İlgili konular:**
- [Gestalt İlkeleri](/kutuphane/gestalt-ilkeleri)
- [Renk Teorisi](/kutuphane/renk-teorisi)
- [Design System Nedir?](/kutuphane/design-system-nedir)

**İlgili Roadmap:** UI Designer Roadmap → Görsel Tasarım

---

## Kaynaklar

Derinleşmek istersen:

- [Visual Hierarchy - NNGroup](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) (İngilizce, 8 dk)
- [F-Shaped Pattern - NNGroup](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) (İngilizce, araştırma)
- [Refactoring UI](https://www.refactoringui.com/) (Kitap, pratik hiyerarşi tavsiyeleri)
`,
  },
  "spacing-layout-sistemleri": {
    id: "spacing-layout-sistemleri",
    title: "Spacing ve Layout Sistemleri",
    subtitle: "Tutarlı Boşluk ve Düzen Oluşturma",
    titleEn: "Spacing and Layout Systems",
    slug: "spacing-layout-sistemleri",
    description: "Spacing sistemi nedir? 4px/8px grid, margin ve padding kuralları, layout grid kullanımı. Tutarlı ve ölçeklenebilir UI düzeni rehberi.",
    category: "ux-design",
    readingTime: 13,
    featured: false,
    publishedAt: "2025-01-16",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Spacing ve Layout Sistemleri: Tutarlı Boşluk ve Düzen Oluşturma

**Seviye:** Başlangıç - Orta
**Kategori:** UX Design
**Son güncelleme:** Ocak 2025

---

## Giriş

Neden bazı tasarımlar "temiz" görünürken, bazıları dağınık hissettiriyor?

Çoğu zaman cevap: spacing. Bir yerde 12px, başka yerde 17px, başka yerde 23px. Tutarsız boşluklar kaos yaratır. Göz düzen arar, bulamazsa rahatsız olur.

**Spacing sistemi**, boşlukları rastgele değil, belirli kurallara göre belirleme yaklaşımı. 8px grid, 4px grid, spacing scale - hepsi aynı amaca hizmet eder: tutarlılık.

**Layout sistemi** ise sayfanın genel yapısını düzenler. Kolonlar, gutterlar, marginler. İçeriğin nereye oturacağını belirler.

Bu yazıda spacing ve layout sistemlerinin temellerini ve nasıl uygulanacağını öğreneceksin.

---

## Spacing Neden Önemli?

### 1. Tutarlılık

Aynı ilişkideki elementler aynı boşluğa sahip olmalı. Kullanıcı pattern'i öğrenir.

### 2. Hiyerarşi

Boşluk, gruplama ve ayırma için kullanılır. Yakın = ilişkili, uzak = ayrı (Gestalt yakınlık ilkesi).

### 3. Okunabilirlik

Yeterli boşluk göz yorgunluğunu azaltır, içeriği sindirilebilir kılar.

### 4. Profesyonellik

Tutarlı spacing, tasarımın kalitesini gösterir. Detaylara dikkat = güven.

### 5. Geliştirme Kolaylığı

Sistematik spacing, CSS/kod yazımını kolaylaştırır.

[INFO]
**8px**
En yaygın kullanılan spacing base değeri
[/INFO]

---

## Spacing Terminolojisi

### Padding

Elementin **içindeki** boşluk. İçerik ile border arasındaki mesafe.

**Örnek:** Butonun içindeki metin etrafındaki boşluk.

### Margin

Elementin **dışındaki** boşluk. Element ile diğer elementler arasındaki mesafe.

**Örnek:** İki kart arasındaki mesafe.

### Gap

Flex veya grid container'da çocuk elementler arasındaki boşluk.

**Örnek:** Grid içindeki kartlar arası mesafe.

### Gutter

Layout grid'de kolonlar arasındaki boşluk.

### Whitespace

Genel boşluk terimi. İçerik olmayan alanlar.

---

## 8px Grid Sistemi

En yaygın spacing sistemi. Tüm değerler 8'in katları.

### Neden 8?

- Çoğu ekran boyutuna temiz bölünür
- Yeterince küçük (hassas kontrol)
- Yeterince büyük (çok fazla seçenek yok)
- Yaygın standart, developer'lar bilir

### 8px Spacing Scale

[TABLE]
| Token | Değer | Kullanım |
|-------|-------|----------|
| spacing-1 | 8px | Çok sıkı, ikon-metin arası |
| spacing-2 | 16px | Sıkı, form elemanları arası |
| spacing-3 | 24px | Normal, paragraflar arası |
| spacing-4 | 32px | Geniş, section içi gruplar |
| spacing-5 | 40px | Çok geniş, bölümler arası |
| spacing-6 | 48px | Section arası |
| spacing-7 | 64px | Büyük bölümler arası |
| spacing-8 | 80px | Hero, major sections |
| spacing-9 | 96px | Sayfa bölümleri |
| spacing-10 | 128px | Çok büyük ayrımlar |
[/TABLE]

### 4px Seçeneği

Bazı durumlar 8px çok büyük olabilir. 4px base kullanılabilir:

4, 8, 12, 16, 20, 24, 32, 40, 48, 64...

Veya hybrid: Base 8px ama 4px de mevcut (ince ayarlar için).

[TIP]
💡 Tailwind CSS 4px base kullanır: 1=4px, 2=8px, 3=12px, 4=16px... Figma'da da 4px grid popüler.
[/TIP]

---

## Spacing Kullanım Kuralları

### İlişki Kuralı

İlişkili elementler arası boşluk < İlişkisiz elementler arası boşluk

**Örnek:**
- Label ile input arası: 4-8px (çok yakın, ilişkili)
- Input grupları arası: 16-24px (ayrı ama aynı form)
- Form bölümleri arası: 32-48px (farklı konular)

### Tutarlılık Kuralı

Aynı ilişki = aynı boşluk.

[COMPARISON]
❌ Kötü: Bir yerde label-input arası 6px, başka yerde 12px
✅ İyi: Tüm label-input araları 8px
[/COMPARISON]

### Hiyerarşi Kuralı

Daha önemli ayrımlar = daha büyük boşluk.

- Element içi: 4-8px
- Element arası: 8-16px
- Grup arası: 16-32px
- Bölüm arası: 32-64px
- Section arası: 48-96px

### Orantı Kuralı

Büyük elementler etrafında daha fazla boşluk.

- Küçük buton padding: 8px 16px
- Büyük buton padding: 16px 32px
- Hero başlık margin: 64px+

---

## Component İçi Spacing

### Buton

[TABLE]
| Boyut | Padding (dikey) | Padding (yatay) |
|-------|-----------------|-----------------|
| Small | 8px | 12px |
| Medium | 10px-12px | 16px-20px |
| Large | 14px-16px | 24px-32px |
[/TABLE]

### Input

- Label ile input arası: 4-8px
- Input padding: 12px 16px (veya 8px 12px small)
- Helper text ile input arası: 4-8px
- Input grupları arası: 16-24px

### Kart

- Kart padding: 16px-24px
- İç elementler arası: 8px-16px
- Başlık ile içerik arası: 8px-12px
- Kartlar arası (grid): 16px-24px

### Liste

- Liste item'ları arası: 8px-12px (sıkı liste)
- Liste item'ları arası: 16px-24px (ayrık liste)
- Liste item padding: 12px-16px (tıklanabilirse)

---

## Layout Grid Sistemi

Sayfa düzenini organize eden kolon sistemi.

### Grid Bileşenleri

**Kolonlar (Columns):** Dikey şeritler. Genellikle 12 kolon (bölünebilirlik).

**Gutter:** Kolonlar arası boşluk. 16px-32px arası yaygın.

**Margin:** Sayfa kenarlarındaki boşluk. Responsive değişir.

**Container:** İçeriğin maksimum genişliği.

### 12 Kolon Grid

Neden 12?
- 1, 2, 3, 4, 6, 12'ye bölünebilir
- Esnek layout seçenekleri
- Endüstri standardı

**Örnek bölümler:**
- 12/12 = Tam genişlik
- 6/6 = İki eşit kolon
- 4/4/4 = Üç eşit kolon
- 3/3/3/3 = Dört eşit kolon
- 8/4 = Ana içerik + sidebar
- 3/6/3 = Ortalanmış içerik

### Responsive Grid

[TABLE]
| Breakpoint | Ekran | Kolonlar | Margin | Gutter |
|------------|-------|----------|--------|--------|
| Mobile | <640px | 4 | 16px | 16px |
| Tablet | 640-1024px | 8 | 24px | 24px |
| Desktop | 1024-1440px | 12 | 32px | 24px |
| Large | >1440px | 12 | auto | 24px |
[/TABLE]

---

## Figma'da Grid Kullanımı

### Layout Grid Ekleme

1. Frame seç
2. Design panelinde "Layout grid" → "+"
3. Grid tipini seç: Columns, Rows, veya Grid

### Kolon Grid Ayarları

- **Count:** Kolon sayısı (12)
- **Type:** Stretch (esnek) veya Fixed (sabit genişlik)
- **Margin:** Kenar boşluğu
- **Gutter:** Kolonlar arası

### Spacing Grid

Kolon grid'e ek olarak, spacing kontrolü için 8px grid:

1. Frame'e ikinci grid ekle
2. Tip: Grid
3. Size: 8px
4. Opacity düşük tut (referans için)

[TIP]
💡 Figma'da "Snap to grid" aktif olursa elementler otomatik 8px'e yaslanır. Hızlı ve tutarlı çalışma sağlar.
[/TIP]

---

## Auto Layout (Figma)

Modern spacing yaklaşımı. Manuel yerleştirme yerine otomatik düzen.

### Auto Layout Avantajları

- Spacing bir kez tanımla, otomatik uygula
- İçerik değişince layout adapte olur
- Responsive davranış
- Padding ve gap kontrolü

### Auto Layout Ayarları

- **Direction:** Horizontal veya Vertical
- **Gap:** Elementler arası boşluk (spacing scale'den)
- **Padding:** İç boşluk (her yön ayrı ayarlanabilir)
- **Alignment:** Hizalama

### Nested Auto Layout

Karmaşık layoutlar için iç içe auto layout:

- Sayfa = Vertical auto layout (section'lar)
- Section = Vertical auto layout (içerik grupları)
- Grup = Horizontal auto layout (elementler)

---

## Spacing Token'ları

Design system'da spacing değerlerini token olarak tanımla.

### Token Tanımları
${'```'}
spacing-0: 0px
spacing-1: 4px
spacing-2: 8px
spacing-3: 12px
spacing-4: 16px
spacing-5: 20px
spacing-6: 24px
spacing-8: 32px
spacing-10: 40px
spacing-12: 48px
spacing-16: 64px
spacing-20: 80px
spacing-24: 96px
${'```'}

### Semantic Token'lar

Değer yerine anlam:
${'```'}
spacing-component-padding-sm: 8px
spacing-component-padding-md: 16px
spacing-component-padding-lg: 24px
spacing-section-gap: 64px
spacing-page-margin-mobile: 16px
spacing-page-margin-desktop: 32px
${'```'}

---

## Yaygın Hatalar

### 1. Rastgele değerler

[COMPARISON]
❌ Kötü: 13px, 17px, 22px, 29px - rastgele
✅ İyi: 8px, 16px, 24px, 32px - sistemli
[/COMPARISON]

### 2. Tutarsız ilişkiler

Aynı ilişki farklı spacing almamalı.

### 3. Çok sıkışık

Boşluk eklemekten korkmak. Breathing room gerekli.

### 4. Çok gevşek

Aşırı boşluk da sorun. İlişkili elementler kopuk görünür.

### 5. Responsive düşünmemek

Desktop spacing'i mobilde çok büyük olabilir. Breakpoint'lere göre ayarla.

### 6. Grid'i görmezden gelmek

Kolon grid varsa kullan. Elementler havada kalmasın.

---

## Pratik Spacing Rehberi

### Hızlı Referans

[TABLE]
| Ne İçin | Değer |
|---------|-------|
| İkon-metin arası | 4-8px |
| Label-input arası | 4-8px |
| Input içi padding | 8-12px (dikey), 12-16px (yatay) |
| Buton padding | 8-12px (dikey), 16-24px (yatay) |
| Liste item arası | 8-16px |
| Kart içi padding | 16-24px |
| Kart-kart arası | 16-24px |
| Form grupları arası | 24-32px |
| Section içi gruplar | 32-48px |
| Sectionlar arası | 48-96px |
| Sayfa kenar margin (mobil) | 16px |
| Sayfa kenar margin (desktop) | 32-64px |
[/TABLE]

---

[EXERCISE]
## Şimdi Sen Dene

**25 dakika**

**Görev:** Bir signup form için spacing sistemi tanımla.

**Form elementleri:**
- Form başlığı
- Ad Soyad (label + input)
- Email (label + input)
- Şifre (label + input + helper text)
- Checkbox (şartları kabul)
- Submit butonu
- "Zaten hesabın var mı?" linki

**Adımlar:**

1. **Spacing scale belirle (3 dk)**
   8px base ile scale oluştur: 8, 16, 24, 32, 48

2. **Element içi spacing (7 dk)**
   - Input padding: ?
   - Buton padding: ?
   - Checkbox-text arası: ?

3. **Element arası spacing (10 dk)**
   - Label ile input arası: ?
   - Input ile helper text arası: ?
   - Form grupları (ad, email, şifre) arası: ?
   - Son grup ile checkbox arası: ?
   - Checkbox ile buton arası: ?
   - Buton ile link arası: ?

4. **Form container (5 dk)**
   - Form padding: ?
   - Başlık ile ilk input arası: ?
   - Max width: ?

**Kontrol:** Tüm değerler scale'den mi? İlişkili elementler yakın mı?
[/EXERCISE]

---

[SUMMARY]
## Özet

- Spacing sistemi tutarlılık ve profesyonellik sağlar
- 8px grid yaygın standart: 8, 16, 24, 32, 40, 48, 64...
- 4px daha hassas kontrol için, hybrid kullanılabilir
- Padding = iç boşluk, Margin = dış boşluk, Gap = container içi
- İlişkili elementler yakın, ilişkisiz elementler uzak
- Layout grid: 12 kolon, gutter (kolon arası), margin (kenar)
- Responsive: Mobilde margin/gutter küçülür, kolon sayısı azalır
- Figma'da Auto Layout ile spacing kontrolü
- Token'lar ile spacing değerlerini standartlaştır
- Rastgele değerlerden kaçın, scale'den seç
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Görsel Hiyerarşi Oluşturma](/kutuphane/gorsel-hiyerarsi)

**Sonraki:** Responsive Design Temelleri *(yakında)*

**İlgili konular:**
- [Design System Nedir?](/kutuphane/design-system-nedir)
- [Gestalt İlkeleri](/kutuphane/gestalt-ilkeleri)
- Figma Auto Layout Rehberi *(yakında)*

**İlgili Roadmap:** UI Designer Roadmap → Layout & Grid

---

## Kaynaklar

Derinleşmek istersen:

- [Space in Design Systems - Nathan Curtis](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62) (İngilizce, 15 dk)
- [The 8-Point Grid - Spec.fm](https://spec.fm/specifics/8-pt-grid) (İngilizce, detaylı)
- [Layout Grid - Figma](https://help.figma.com/hc/en-us/articles/360040450513-Create-layout-grids-with-grids-columns-and-rows) (Resmi döküman)
`,
  },
  "responsive-design-temelleri": {
    id: "responsive-design-temelleri",
    title: "Responsive Design Temelleri",
    subtitle: "Her Ekrana Uyumlu Tasarım",
    titleEn: "Responsive Design Basics",
    slug: "responsive-design-temelleri",
    description: "Responsive design nedir? Mobile-first yaklaşım, breakpoint'ler, fluid grid ve esnek görseller. Her ekran boyutuna uyumlu tasarım rehberi.",
    category: "ux-design",
    readingTime: 14,
    featured: false,
    publishedAt: "2025-01-16",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Responsive Design Temelleri: Her Ekrana Uyumlu Tasarım

**Seviye:** Başlangıç - Orta
**Kategori:** UX Design
**Son güncelleme:** Ocak 2025

---

## Giriş

Kullanıcıların %60'ından fazlası mobil cihazlardan erişiyor. Ama aynı siteyi tablet'te, laptop'ta, geniş monitörde de kullanıyorlar.

Her cihaz için ayrı tasarım mı yapacaksın? Hayır.

**Responsive design**, tek bir tasarımın her ekran boyutuna akıllıca uyum sağlaması demek. Mobilde tek kolon, tablette iki kolon, desktop'ta üç kolon. Aynı içerik, farklı düzenler.

2010'da Ethan Marcotte'un tanımladığı bu yaklaşım, artık standart. Responsive olmayan site, modern web'de kabul görmez.

Bu yazıda responsive design'ın temellerini, mobile-first yaklaşımı ve pratik uygulama yöntemlerini öğreneceksin.

---

## Responsive Design Nedir?

[CALLOUT]
**Responsive Design:**
Tek bir tasarımın, görüntülendiği cihazın ekran boyutuna ve özelliklerine otomatik olarak uyum sağlaması yaklaşımı. Fluid grid, esnek görseller ve CSS media query'ler ile gerçekleştirilir.
[/CALLOUT]

**Üç temel bileşen:**
1. Fluid grid (esnek grid sistemi)
2. Flexible images (esnek görseller)
3. Media queries (CSS koşulları)

---

## Neden Responsive?

### 1. Çoklu Cihaz Gerçeği

Kullanıcılar telefon, tablet, laptop, desktop, TV'den erişiyor. Hepsine hitap etmelisin.

### 2. SEO Faydası

Google, mobile-friendly siteleri daha üst sıralarda gösteriyor. Mobile-first indexing aktif.

### 3. Maliyet Verimliliği

Her platform için ayrı tasarım yerine, tek tasarım maintain etmek daha kolay.

### 4. Kullanıcı Deneyimi

Kullanıcı hangi cihazda olursa olsun, optimum deneyim almalı.

### 5. Gelecek Uyumluluğu

Yeni cihazlar çıktığında (katlanabilir telefonlar gibi) adaptasyon daha kolay.

[INFO]
**%60+**
Global web trafiğinin mobil cihazlardan gelme oranı
[/INFO]

---

## Mobile-First Yaklaşım

### Nedir?

Tasarıma en küçük ekrandan başlayıp, büyük ekranlara doğru genişletme.

**Geleneksel (Desktop-first):**
Desktop tasarla → Küçült → Mobil'e sığdır

**Mobile-first:**
Mobil tasarla → Genişlet → Desktop'a yay

### Neden Mobile-First?

**1. Önceliklendirme zorlar**
Küçük ekranda her şey sığmaz. En önemli içeriği seçmek zorundasın.

**2. Performans**
Mobil için optimize edilmiş kod, desktop'ta da hızlı çalışır. Tersi zor.

**3. Progressive enhancement**
Temel deneyim herkese, gelişmiş özellikler büyük ekranlara.

**4. Gerçek kullanım**
Çoğu kullanıcı mobilde başlıyor. Önce onları düşün.

[COMPARISON]
❌ Desktop-first: "Bu güzel tasarımı mobilde nasıl sığdırırız?"
✅ Mobile-first: "Temel deneyimi kurduk, desktop'ta nasıl zenginleştiririz?"
[/COMPARISON]

---

## Breakpoint'ler

Tasarımın değiştiği ekran genişliği noktaları.

### Yaygın Breakpoint'ler

[TABLE]
| İsim | Genişlik | Cihazlar |
|------|----------|----------|
| xs (Extra small) | <640px | Küçük telefonlar |
| sm (Small) | 640px+ | Büyük telefonlar |
| md (Medium) | 768px+ | Tabletler (portrait) |
| lg (Large) | 1024px+ | Tabletler (landscape), küçük laptop |
| xl (Extra large) | 1280px+ | Laptop, desktop |
| 2xl | 1536px+ | Büyük desktop |
[/TABLE]

### Breakpoint Seçimi

**İçeriğe göre belirle:**
Rastgele cihaz boyutlarına değil, içeriğin "kırıldığı" noktaya göre breakpoint koy.

**Fazla breakpoint kaçın:**
3-4 breakpoint çoğu proje için yeterli. Fazlası karmaşıklık yaratır.

**Yaygın sistem (Tailwind-style):**
- Mobile: 0-767px
- Tablet: 768-1023px
- Desktop: 1024px+

[TIP]
💡 "320px iPhone 5 için optimize edeyim" yerine, içeriğin nerede kırıldığına bak. Tasarımı daralt, bozulduğu yere breakpoint koy.
[/TIP]

---

## Responsive Davranışlar

Elementler breakpoint'lerde nasıl değişir?

### 1. Reflow (Yeniden Akış)

Elementler yeniden dizilir.

**Örnek:** Desktop'ta 3 kolon kart → Mobilde tek kolon stack

### 2. Resize (Yeniden Boyutlandırma)

Elementler küçülür veya büyür.

**Örnek:** Hero başlık 64px → Mobilde 36px

### 3. Reposition (Yeniden Konumlandırma)

Elementler farklı yere taşınır.

**Örnek:** Desktop'ta sidebar sağda → Mobilde içeriğin altında

### 4. Show/Hide (Göster/Gizle)

Bazı elementler belirli boyutlarda gizlenir.

**Örnek:** Desktop'ta genişletilmiş menü → Mobilde hamburger menü

### 5. Replace (Değiştirme)

Farklı boyutlar için farklı element.

**Örnek:** Desktop'ta tablo → Mobilde kart listesi

---

## Grid Değişimleri

### Kolon Sayısı Değişimi

[TABLE]
| Breakpoint | Kolon Sayısı | Kullanım |
|------------|--------------|----------|
| Mobile | 4 | Sınırlı alan, basit layout |
| Tablet | 8 | Orta karmaşıklık |
| Desktop | 12 | Tam esneklik |
[/TABLE]

### İçerik Genişliği

**Mobil:** Tam genişlik (padding ile) veya küçük margin

**Tablet:** Max-width başlar (örn: 720px)

**Desktop:** Max-width artar (örn: 1200px) veya container

**Large:** Max-width sabit, ortada kalır

### Gutter ve Margin

[TABLE]
| Breakpoint | Gutter | Page Margin |
|------------|--------|-------------|
| Mobile | 16px | 16px |
| Tablet | 24px | 24-32px |
| Desktop | 24-32px | 32-64px |
[/TABLE]

---

## Responsive Tipografi

Font boyutları ekran boyutuna göre değişmeli.

### Yaklaşımlar

**1. Breakpoint bazlı:**
Her breakpoint için sabit değerler.
${'```'}
Mobile: H1 = 32px, Body = 16px
Desktop: H1 = 48px, Body = 18px
${'```'}

**2. Fluid typography:**
Viewport genişliğine göre sürekli değişen boyut.
${'```'}
font-size: clamp(1.5rem, 4vw, 3rem);
${'```'}

Minimum 1.5rem, maksimum 3rem, arada viewport'a bağlı.

### Pratik Değerler

[TABLE]
| Element | Mobile | Desktop |
|---------|--------|---------|
| H1 | 28-36px | 48-64px |
| H2 | 24-28px | 36-42px |
| H3 | 20-24px | 24-30px |
| Body | 16px | 16-18px |
| Small | 14px | 14px |
[/TABLE]

---

## Responsive Görseller

### Esnek Görsel Temel
${'```'}css
img {
  max-width: 100%;
  height: auto;
}
${'```'}

Görsel container'dan taşmaz, oranını korur.

### Art Direction

Farklı ekranlar için farklı görsel crop'ları.

**Örnek:**
- Desktop: Yatay geniş görsel
- Mobil: Kare veya dikey crop (yüz odaklı)

### Performans

**srcset kullan:**
Farklı çözünürlükler için farklı dosyalar. Mobil küçük dosya yükler.

**Lazy loading:**
Görünür alanda olmayan görselleri sonra yükle.

---

## Navigation Patterns

Mobilde navigasyon en zorlu konulardan biri.

### Hamburger Menu

En yaygın pattern. Üç çizgi ikonu, tıklayınca açılır menü.

**Avantaj:** Alan tasarrufu
**Dezavantaj:** Gizli, keşfedilebilirlik düşük

### Bottom Navigation

Mobil uygulamalarda popüler. Ekranın altında 4-5 ikon.

**Avantaj:** Kolay erişim, görünür
**Dezavantaj:** Sınırlı sayıda item

### Tab Bar

Yatay kaydırılabilir sekmeler.

**Avantaj:** Çok sayıda kategori
**Dezavantaj:** Tümü görünmez

### Priority+ Navigation

Sığan linkler görünür, sığmayanlar "More" altında.

**Avantaj:** Önemli linkler her zaman görünür
**Dezavantaj:** Tutarsız görünüm

---

## Touch Considerations

Mobilde parmak, mouse değil.

### Touch Target

Minimum 44x44px (Apple), 48x48px (Google önerisi).

Küçük butonlar mobilde kullanılamaz.

### Spacing

Butonlar arası yeterli boşluk. Yanlışlıkla yanlış butona basmayı önle.

### Hover Yok

Mobilde hover state çalışmaz. Hover'a bağımlı tasarım yapma.

### Gesture

Swipe, pinch, long-press gibi gesture'ları düşün ama temel işlevler için şart koşma.

---

## Figma'da Responsive Tasarım

### Frame Boyutları

Yaygın frame preset'leri:
- iPhone 14: 390 x 844
- iPad: 768 x 1024 (veya 834 x 1194)
- Desktop: 1440 x 900 (veya 1920 x 1080)

### Constraints

Element'in parent resize olduğunda nasıl davranacağını belirler:
- Left, Right, Center
- Scale
- Left and Right (stretch)

### Auto Layout

Responsive davranış için güçlü araç:
- Wrap özelliği (elementler sarmala)
- Min/Max width
- Fill container vs Hug contents

### Component Variants

Aynı component'in mobil ve desktop versiyonları:
- Button/Mobile, Button/Desktop
- Card/Compact, Card/Full

---

## Test Etme

### Browser DevTools

Chrome/Firefox'ta responsive mode. Farklı ekran boyutlarını simüle et.

### Gerçek Cihazlar

Simülasyon yetmez. Gerçek telefon ve tablette test et.

### Kritik Test Noktaları

- Navigation açılıyor/kapanıyor mu?
- Touch target'lar yeterli mi?
- Metin okunabiliyor mu?
- Görseller düzgün mi?
- Form'lar kullanılabilir mi?
- Breakpoint geçişleri smooth mu?

---

## Sık Yapılan Hatalar

### 1. Desktop-first düşünmek

[COMPARISON]
❌ Kötü: Desktop'ta harika, "mobilde bir bakalım"
✅ İyi: Mobil'de temel deneyim, desktop'ta zenginleştirme
[/COMPARISON]

### 2. Çok fazla breakpoint

5-6 breakpoint karmaşıklık yaratır. 3-4 yeterli.

### 3. Sabit piksel değerleri

Her yerde px kullanmak esnekliği kırar. Relative unit'ler (rem, %, vw) kullan.

### 4. Hover'a bağımlılık

Mobilde hover yok. Kritik bilgi hover'da olmamalı.

### 5. Küçük touch target

44px altı butonlar mobilde kullanılamaz.

### 6. Yatay scroll

İçerik ekrandan taşarsa yatay scroll oluşur. Genellikle hata.

### 7. Test etmemek

Sadece simülasyona güvenme. Gerçek cihazda test et.

---

[EXERCISE]
## Şimdi Sen Dene

**25 dakika**

**Görev:** Bir blog sayfasının responsive davranışlarını planla.

**Sayfa elementleri:**
- Header (logo + navigation)
- Hero (başlık + özet + görsel)
- İçerik (metin + görseller)
- Sidebar (yazar bilgisi + ilgili yazılar)
- Footer

**Adımlar:**

1. **Breakpoint'leri belirle (3 dk)**
   Hangi genişliklerde tasarım değişecek?

2. **Her element için davranış planla (15 dk)**

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Header | ? | ? | ? |
| Hero görsel | ? | ? | ? |
| İçerik genişliği | ? | ? | ? |
| Sidebar | ? | ? | ? |
| Navigation | ? | ? | ? |

3. **Tipografi değişimleri (3 dk)**
   H1, H2, body için mobil ve desktop boyutları

4. **Touch target kontrolü (4 dk)**
   Navigation linkleri, butonlar - minimum boyutlar ne olmalı?
[/EXERCISE]

---

[SUMMARY]
## Özet

- Responsive design = tek tasarım, her ekrana uyum
- Üç temel: fluid grid, esnek görseller, media queries
- Mobile-first: küçükten büyüğe tasarla, önceliklendirmeyi zorlar
- Breakpoint'ler: içeriğin kırıldığı noktalarına göre belirle
- Davranışlar: reflow, resize, reposition, show/hide
- Grid: mobilde 4 kolon, tablette 8, desktop'ta 12
- Touch target minimum 44-48px
- Hover'a bağımlı tasarım yapma
- Gerçek cihazlarda test et
- Tipografi ve spacing de responsive olmalı
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Spacing ve Layout Sistemleri](/kutuphane/spacing-layout-sistemleri)

**Sonraki:** Figma Temelleri *(yakında)*

**İlgili konular:**
- [Spacing ve Layout Sistemleri](/kutuphane/spacing-layout-sistemleri)
- [Design System Nedir?](/kutuphane/design-system-nedir)
- Mobile UX Best Practices *(yakında)*

**İlgili Roadmap:** UI Designer Roadmap → Responsive Design

---

## Kaynaklar

Derinleşmek istersen:

- [Responsive Web Design - Ethan Marcotte](https://alistapart.com/article/responsive-web-design/) (İngilizce, orijinal makale)
- [Mobile First - Luke Wroblewski](https://www.lukew.com/ff/entry.asp?933) (İngilizce, mobile-first konsept)
- [Responsive Design - NNGroup](https://www.nngroup.com/articles/responsive-web-design-definition/) (İngilizce, 8 dk)
`,
  },
  "figma-temelleri": {
    id: "figma-temelleri",
    title: "Figma Temelleri",
    subtitle: "Sıfırdan Figma Öğrenme Rehberi",
    titleEn: "Figma Basics",
    slug: "figma-temelleri",
    description: "Figma nedir, nasıl kullanılır? Arayüz, temel araçlar, frame, component, auto layout. Başlangıç seviyesi Figma rehberi.",
    category: "araclar-ipucu",
    readingTime: 15,
    featured: true,
    publishedAt: "2025-01-16",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Figma Temelleri: Sıfırdan Figma Öğrenme Rehberi

**Seviye:** Başlangıç
**Kategori:** Araçlar & İpucu
**Son güncelleme:** Ocak 2025

---

## Giriş

Figma, modern UI/UX tasarımının standart aracı haline geldi. Tarayıcıda çalışıyor, gerçek zamanlı iş birliği sunuyor, ücretsiz planı var.

Sketch, Adobe XD, InVision... Hepsi bir zamanlar popülerdi. Ama Figma, iş birliği odaklı yaklaşımıyla pazarı domine etti. Artık iş ilanlarında "Figma bilgisi" neredeyse zorunlu.

Bu yazıda Figma'nın temellerini öğreneceksin. Arayüzü tanıyacak, temel araçları kullanacak, ilk tasarımını yapacaksın.

---

## Figma Nedir?

[CALLOUT]
**Figma:**
Tarayıcı tabanlı, bulut üzerinde çalışan UI/UX tasarım aracı. Gerçek zamanlı iş birliği, component sistemi, prototyping ve developer handoff özellikleri sunar.
[/CALLOUT]

**Temel özellikler:**
- Tarayıcıda çalışır (desktop app da var)
- Gerçek zamanlı iş birliği (Google Docs gibi)
- Component ve variant sistemi
- Auto layout
- Prototyping
- Developer handoff (Dev Mode)
- Plugin ekosistemi
- FigJam (whiteboard)

---

## Figma vs Alternatifler

[TABLE]
| Özellik | Figma | Sketch | Adobe XD |
|---------|-------|--------|----------|
| Platform | Web + Desktop | macOS only | Desktop |
| İş birliği | Gerçek zamanlı | Plugin ile | Sınırlı |
| Fiyat (başlangıç) | Ücretsiz | $12/ay | Ücretsiz (sınırlı) |
| Component sistemi | Güçlü | Güçlü | Orta |
| Prototyping | Dahili | Plugin | Dahili |
| Öğrenme eğrisi | Düşük | Orta | Düşük |
| Pazar payı | Dominant | Azalıyor | Azalıyor |
[/TABLE]

---

## Hesap Oluşturma ve Planlar

### Ücretsiz Plan (Starter)

- 3 Figma dosyası
- 3 FigJam dosyası
- Sınırsız kişisel draft
- 30 gün versiyon geçmişi
- Sınırsız viewer/commenter

Başlangıç için yeterli. Öğrenme aşamasında ücretsiz plan kullan.

### Profesyonel Plan

- Sınırsız dosya
- Sınırsız versiyon geçmişi
- Shared library
- Team features
- Dev Mode

### Nasıl Başlanır?

1. figma.com'a git
2. Google veya email ile kayıt ol
3. Hemen tasarlamaya başla

---

## Arayüz Tanıtımı

Figma'yı açtığında beş ana alan görürsün:

### 1. Toolbar (Üst)

Sol tarafta araçlar:
- Move (V): Seçme ve taşıma
- Frame (F): Frame oluşturma
- Shape tools: Rectangle (R), Ellipse (O), Line (L)
- Pen (P): Vektör çizim
- Text (T): Metin ekleme
- Hand (H): Canvas'ta gezinme
- Comment (C): Yorum ekleme

Sağ tarafta:
- Share butonu
- Play butonu (prototype)
- Zoom kontrolü

### 2. Left Sidebar - Layers Panel

Tüm layer'ların listesi. Hiyerarşik yapı.
- Page'ler (üstte)
- Frame'ler ve içerikleri
- Sürükle-bırak ile düzenleme
- Göz ikonu ile gizleme
- Kilit ikonu ile kilitleme

### 3. Canvas (Orta)

Tasarım alanı. Sonsuz canvas, istediğin yere frame koy.

### 4. Right Sidebar - Design Panel

Seçili elementin özellikleri:
- Position (X, Y)
- Size (W, H)
- Rotation
- Fill (renk, gradient)
- Stroke (border)
- Effects (shadow, blur)
- Auto layout ayarları

### 5. Assets Panel (Sol)

Component'lere erişim. Team library'den veya local component'ler.

---

## Temel Kavramlar

### Frame

Figma'nın temel container'ı. Artboard gibi düşün ama daha güçlü.

**Frame özellikleri:**
- Sabit boyut
- İçerik taşabilir (clip content ile kontrol)
- Auto layout uygulanabilir
- Constraint'ler çalışır
- Prototip için başlangıç noktası

**Frame oluşturma:**
- F tuşu veya toolbar'dan
- Sürükle-bırak ile boyut
- Sağ panelden preset boyutlar (iPhone, Desktop vs.)

### Group vs Frame

[TABLE]
| Özellik | Frame | Group |
|---------|-------|-------|
| Boyut | Bağımsız, sabit | İçeriğe göre |
| Taşma | Clip edilebilir | Taşar |
| Auto layout | Uygulanabilir | Uygulanamaz |
| Constraints | Çalışır | Çalışmaz |
| Kullanım | UI container | Geçici gruplama |
[/TABLE]

[TIP]
💡 UI tasarımda neredeyse her zaman Frame kullan. Group sadece geçici seçim kolaylığı için.
[/TIP]

### Layer Hiyerarşisi

Figma'da her şey layer. Üstteki layer, alttakinin üzerinde görünür.

**Sıralama:**
- Üst layer = Görsel olarak üstte
- Sürükle-bırak ile sıralama değiştir
- Cmd/Ctrl + ] = Bir üste
- Cmd/Ctrl + [ = Bir alta

---

## Temel Araçlar

### Move Tool (V)

Varsayılan araç. Seçme, taşıma, boyutlandırma.

**İpuçları:**
- Shift + sürükle = Orantılı boyutlandırma
- Alt + sürükle = Kopyala
- Shift + tıklama = Çoklu seçim

### Frame Tool (F)

Frame oluşturma. Sürükle veya tıkla.

**Preset boyutlar:**
Sağ panelden cihaz boyutları seç (iPhone 14, Desktop vb.)

### Shape Tools

**Rectangle (R):** Dikdörtgen
- Shift ile kare
- Corner radius sağ panelden

**Ellipse (O):** Daire/Elips
- Shift ile tam daire

**Line (L):** Çizgi
- Shift ile 45° açılar

**Polygon/Star:** Toolbar'dan seç
- Kenar sayısı ayarlanabilir

### Text Tool (T)

Metin ekleme. Tıkla ve yaz veya alan çiz.

**Metin kutusu türleri:**
- Auto width: Metin genişliğine göre
- Auto height: Sabit genişlik, yükseklik metne göre
- Fixed: Sabit boyut

### Pen Tool (P)

Vektör çizim. Bezier eğrileri.

Başlangıçta zor gelebilir, pratik gerektirir.

---

## Renk ve Stil

### Fill (Dolgu)

Elementin içi.

**Türler:**
- Solid: Tek renk
- Linear gradient: Çizgisel geçiş
- Radial gradient: Dairesel geçiş
- Image: Görsel dolgu

**Renk seçimi:**
- Color picker
- HEX kodu
- RGB/HSL değerleri
- Eyedropper (I tuşu)

### Stroke (Çerçeve)

Elementin border'ı.

**Ayarlar:**
- Renk
- Kalınlık
- Position: Inside, Center, Outside
- Dash (kesikli çizgi)

### Effects

**Drop shadow:** Dış gölge
**Inner shadow:** İç gölge
**Layer blur:** Element bulanıklığı
**Background blur:** Arkasını bulanıklaştırma (glassmorphism)

---

## Auto Layout

Figma'nın en güçlü özelliklerinden biri. Elementleri otomatik düzenler.

### Auto Layout Nedir?

Frame içindeki elementleri belirli kurallara göre otomatik hizalar ve boşluklar.

**Avantajları:**
- İçerik değişince layout adapte olur
- Spacing tutarlı
- Responsive davranış
- Buton, kart gibi component'ler için ideal

### Auto Layout Ekleme

1. Frame veya elementleri seç
2. Shift + A
3. Veya sağ tık > Add auto layout

### Auto Layout Ayarları

**Direction:**
- Horizontal (yatay dizi)
- Vertical (dikey dizi)
- Wrap (satır dolunca alt satıra geç)

**Gap:** Elementler arası boşluk

**Padding:** Frame içi boşluk (4 yön ayrı ayarlanabilir)

**Alignment:** Elementlerin hizalanması

**Sizing:**
- Hug: İçeriğe göre boyutlan
- Fill: Parent'ı doldur
- Fixed: Sabit boyut

### Auto Layout Örnek: Buton

1. Text yaz: "Kaydet"
2. Shift + A ile auto layout ekle
3. Padding: 12px vertical, 24px horizontal
4. Fill color ekle
5. Corner radius: 8px

Artık metin değişince buton otomatik genişler.

---

## Components

Tekrar kullanılabilir tasarım elementleri.

### Component Nedir?

Ana element (Main Component) oluştur, kopyalarını (Instance) kullan. Ana'yı güncelle, tümü güncellenir.

### Component Oluşturma

1. Element(ler)i seç
2. Cmd/Ctrl + Alt + K
3. Veya sağ tık > Create component

Main component mor elmas ikonu alır.

### Instance Kullanma

1. Main component'i kopyala (Cmd/Ctrl + D veya Alt + sürükle)
2. Instance mavi elmas ikonu alır
3. Instance'da override yapabilirsin (metin, renk vb.)

### Neden Component?

- **Tutarlılık:** Aynı element her yerde aynı
- **Verimlilik:** Bir kez tasarla, her yerde kullan
- **Güncelleme:** Tek yerden güncelle, her yere yansısın
- **Organizasyon:** Library olarak paylaş

---

## Variants

Aynı component'in farklı durumları.

### Variant Nedir?

Butonun default, hover, disabled halleri gibi. Tek component, birden fazla varyasyon.

### Variant Oluşturma

1. Component'i seç
2. Sağ panelde "+" ile property ekle
3. Variant'ları oluştur

**Örnek buton variant'ları:**
- State: Default, Hover, Pressed, Disabled
- Size: Small, Medium, Large
- Type: Primary, Secondary, Tertiary

### Variant Kullanma

Instance'da sağ panelden variant seç. Dropdown ile değiştir.

---

## Prototyping

Tasarımları interaktif hale getirme.

### Prototype Mode

Sağ üstte "Prototype" sekmesine geç.

### Bağlantı Oluşturma

1. Kaynak elementi seç (buton gibi)
2. Mavi daire görünür (sağda)
3. Sürükle, hedef frame'e bırak
4. Interaction ayarlarını yap

### Interaction Ayarları

**Trigger:** Ne zaman tetiklensin?
- On click
- On hover
- On drag
- While pressing
- After delay

**Action:** Ne olsun?
- Navigate to (sayfa geçişi)
- Open overlay (modal)
- Scroll to
- Back
- Open link

**Animation:** Nasıl geçiş?
- Instant
- Dissolve
- Move in/out
- Push
- Slide in/out
- Smart animate

### Preview

Play butonu (▶) veya Cmd/Ctrl + Alt + Enter ile prototip önizleme.

---

## Kısayollar

[TABLE]
| Kısayol | İşlev |
|---------|-------|
| V | Move tool |
| F | Frame tool |
| R | Rectangle |
| O | Ellipse |
| T | Text |
| P | Pen |
| I | Eyedropper |
| H | Hand (pan) |
| Space + drag | Geçici pan |
| Cmd/Ctrl + D | Duplicate |
| Cmd/Ctrl + G | Group |
| Cmd/Ctrl + Alt + G | Frame selection |
| Shift + A | Auto layout |
| Cmd/Ctrl + Alt + K | Create component |
| Cmd/Ctrl + / | Quick actions |
| Cmd/Ctrl + Z | Undo |
| Cmd/Ctrl + Shift + Z | Redo |
| Cmd/Ctrl + + | Zoom in |
| Cmd/Ctrl + - | Zoom out |
| Cmd/Ctrl + 0 | Zoom 100% |
| Cmd/Ctrl + 1 | Zoom to fit |
| Cmd/Ctrl + 2 | Zoom to selection |
[/TABLE]

[TIP]
💡 Cmd/Ctrl + / ile Quick Actions aç. İstediğin komutu yaz, hızlıca ulaş.
[/TIP]

---

## İlk Proje: Basit Buton

Öğrendiklerini uygula.

[STEPS]
1. **Yeni dosya oluştur**
   Figma'da "New design file"

2. **Frame ekle**
   F tuşu, 200x60 boyutunda frame çiz

3. **Renk ver**
   Fill: #6366F1 (mor)

4. **Corner radius**
   Sağ panelde: 8px

5. **Text ekle**
   T tuşu, frame içine tıkla, "Kaydet" yaz

6. **Text stil**
   Font: Inter, Size: 16, Weight: Medium, Color: White

7. **Text ortala**
   Frame ve text'i seç, Align center (yatay ve dikey)

8. **Auto layout ekle**
   Frame'i seç, Shift + A
   Padding: 16px vertical, 32px horizontal

9. **Component yap**
   Cmd/Ctrl + Alt + K

10. **Instance oluştur**
    Alt + sürükle ile kopyala
    Metni "İptal" olarak değiştir
[/STEPS]

Tebrikler! İlk component'ini oluşturdun.

---

## Sık Yapılan Hatalar

### 1. Group yerine Frame kullanmamak

Frame'in avantajlarını kaçırırsın. Auto layout, constraints çalışmaz.

### 2. Component oluşturmamak

Aynı elementi 10 kez kopyalayıp sonra hepsini tek tek güncellemek.

### 3. Auto layout kullanmamak

Manuel spacing, içerik değişince bozulur.

### 4. Naming yapmamak

"Frame 234", "Rectangle 12" isimleri developer'ı çıldırtır.

### 5. Organize etmemek

Her şey tek page'de, binlerce layer. Page ve section kullan.

---

[EXERCISE]
## Şimdi Sen Dene

**30 dakika**

**Görev:** Basit bir login kartı tasarla.

**Gereksinimler:**
- Kart container (beyaz, gölgeli)
- Başlık: "Giriş Yap"
- 2 input alanı (Email, Şifre)
- "Giriş Yap" butonu (component)
- "Şifremi Unuttum" linki

**Adımlar:**

1. **Desktop frame oluştur** (1440x900)

2. **Kart frame'i** (400px genişlik)
   - Fill: White
   - Corner radius: 12px
   - Shadow: 0, 4, 24, rgba(0,0,0,0.1)

3. **Başlık ekle**
   - "Giriş Yap"
   - 24px, Semibold

4. **Input alanları** (Auto layout kullan)
   - Label + Input grupları
   - Input: Border, padding, placeholder

5. **Buton** (Önceki egzersizden component)

6. **Link**
   - "Şifremi Unuttum"
   - Küçük, mavi, underline

7. **Tümünü auto layout ile düzenle**
   - Kartın içi vertical auto layout
   - Uygun gap değerleri

**Bonus:** Prototip ekle - buton tıklayınca başka frame'e geçiş.
[/EXERCISE]

---

[SUMMARY]
## Özet

- Figma tarayıcı tabanlı, gerçek zamanlı iş birlikli tasarım aracı
- Ücretsiz plan başlangıç için yeterli
- Frame = Temel container, Group'tan daha güçlü
- Auto layout = Otomatik spacing ve boyutlandırma
- Component = Tekrar kullanılabilir element, instance'lar ile kullan
- Variant = Aynı component'in farklı durumları
- Prototyping = Interaktif demo oluşturma
- Kısayolları öğren, hız kazan
- Naming ve organizasyon önemli
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Responsive Design Temelleri](/kutuphane/responsive-design-temelleri)

**Sonraki:** Figma Auto Layout Detaylı Rehber *(yakında)*

**İlgili konular:**
- [Design System Nedir?](/kutuphane/design-system-nedir)
- [Prototype Nedir?](/kutuphane/prototype-nedir)
- Figma Component Best Practices *(yakında)*

**İlgili Roadmap:** UI Designer Roadmap → Araçlar

---

## Kaynaklar

Derinleşmek istersen:

- [Figma Help Center](https://help.figma.com/) (Resmi döküman)
- [Figma YouTube](https://www.youtube.com/figma) (Resmi video eğitimler)
- [Figma Community](https://www.figma.com/community) (Ücretsiz kaynaklar, template'ler)
`,
  },
  "design-critique": {
    id: "design-critique",
    title: "Design Critique Nasıl Yapılır?",
    subtitle: "Yapıcı Geri Bildirim Verme ve Alma Rehberi",
    titleEn: "How to Give Design Critique",
    slug: "design-critique",
    description: "Design critique nedir? Etkili geri bildirim verme teknikleri, critique oturumu yönetimi ve yapıcı feedback kültürü oluşturma rehberi.",
    category: "kariyer",
    readingTime: 12,
    featured: false,
    publishedAt: "2025-01-16",
    heroImage: "",
    author: "DesignAtlas",
    content: `# Design Critique Nasıl Yapılır? Yapıcı Geri Bildirim Verme ve Alma Rehberi

**Seviye:** Orta
**Kategori:** Kariyer
**Son güncelleme:** Ocak 2025

---

## Giriş

"Bu rengi beğenmedim."
"Bence buton daha büyük olmalı."
"Güzel olmuş."

Bu tür geri bildirimler tasarımı geliştirmez. Kişisel tercihler, belirsiz yorumlar ve yüzeysel övgüler - hepsi critique değil, sadece görüş.

**Design critique**, yapılandırılmış bir geri bildirim sürecidir. Tasarımı belirli hedefler ve kriterler çerçevesinde değerlendirir. Amaç tasarımcıyı yargılamak değil, tasarımı birlikte geliştirmek.

İyi critique becerisi, tasarımcının kariyerinde kritik. Hem vermek hem almak öğrenilmeli. Bu yazıda etkili critique'in nasıl yapılacağını öğreneceksin.

---

## Design Critique Nedir?

[CALLOUT]
**Design Critique:**
Bir tasarımın belirli hedefler, kullanıcı ihtiyaçları ve tasarım prensipleri çerçevesinde yapılandırılmış şekilde değerlendirildiği geri bildirim oturumu. Amaç: tasarımı geliştirmek, tasarımcıyı değil.
[/CALLOUT]

**Critique ne değildir:**
- Kişisel beğeni yarışması
- Tasarımcıyı yargılama
- "Ben olsam..." senaryoları
- Onay toplantısı

---

## Critique vs Feedback

[TABLE]
| Özellik | Feedback | Critique |
|---------|----------|----------|
| Yapı | Informal, spontan | Yapılandırılmış, planlı |
| Odak | Genel izlenim | Belirli hedefler |
| Kriter | Kişisel tercih | Objektif prensipler |
| Format | Anlık yorum | Oturum formatı |
| Amaç | Görüş bildirme | Tasarımı geliştirme |
[/TABLE]

Her ikisi de değerli. Ama critique daha derinlikli ve etkili.

---

## Neden Critique Önemli?

### 1. Kör noktaları görme

Tasarımcı kendi işine çok yakın. Başkaları farklı perspektif sunar.

### 2. Varsayımları sorgulama

"Neden böyle yaptın?" sorusu, bilinçaltı kararları yüzeye çıkarır.

### 3. Kaliteyi artırma

Daha fazla göz, daha az hata. Erken aşamada düzeltme, sonra düzeltmekten ucuz.

### 4. Öğrenme

Hem veren hem alan öğrenir. Farklı yaklaşımlar, yeni teknikler.

### 5. Takım hizalaması

Herkes aynı kriterleri ve öncelikleri anlar.

[INFO]
**70%**
Erken critique ile yakalanan tasarım problemlerinin oranı (geç aşamaya göre)
[/INFO]

---

## Geri Bildirim Verme İlkeleri

### 1. Tasarıma odaklan, kişiye değil

[COMPARISON]
❌ Kötü: "Bu kötü olmuş" / "Sen hep bu hatayı yapıyorsun"
✅ İyi: "Bu bölüm hedef X'e ulaşmakta zorlanıyor çünkü..."
[/COMPARISON]

### 2. Spesifik ol

[COMPARISON]
❌ Kötü: "Bu biraz karışık"
✅ İyi: "Kullanıcı bu ekranda 3 farklı CTA görüyor, hangisine tıklayacağını bilemeyebilir"
[/COMPARISON]

### 3. Hedefler çerçevesinde değerlendir

[COMPARISON]
❌ Kötü: "Mavi rengi tercih ederdim"
✅ İyi: "Hedefiniz güven vermekti, yeşil renk bu sektörde güven yerine 'başarı' çağrışımı yapabilir"
[/COMPARISON]

### 4. Soru sor

Varsaymak yerine sor. Tasarımcının düşünce sürecini anla.

"Bu butonun burada olma sebebi nedir?"
"Kullanıcının bu noktada ne hissetmesini istiyorsun?"
"Alternatif yaklaşımları değerlendirdin mi?"

### 5. Alternatif öner (zorunlu değil)

Çözüm sunmak zorunda değilsin ama varsa paylaş. "Şunu deneyebilirsin" formatında.

### 6. Önceliklendir

Her şeyi söyleme. En önemli 2-3 noktaya odaklan. Aşırı feedback bunaltır.

### 7. Pozitifi de söyle

Sadece sorunlar değil, işe yarayan şeyleri de belirt. Motivasyon ve öğrenme için önemli.

---

## Geri Bildirim Çerçeveleri

### I Like, I Wish, What If

Yapılandırılmış, pozitif ton.

**I Like:** Neyi beğendin? Neyin işe yaradığını düşünüyorsun?
**I Wish:** Ne farklı olsaydı iyi olurdu?
**What If:** Alternatif fikirler, denemeler?

**Örnek:**
- "I Like: Onboarding akışının basitliği, kullanıcıyı bunaltmıyor."
- "I Wish: İlerleme göstergesi olsa, kullanıcı nerede olduğunu bilse."
- "What If: Son adımda özet ekranı olsa?"

### Situation-Behavior-Impact (SBI)

Daha formal, net yapı.

**Situation:** Hangi bağlamda/ekranda?
**Behavior:** Ne görüyoruz/tasarım ne yapıyor?
**Impact:** Bunun kullanıcıya/hedefe etkisi ne?

**Örnek:**
"Ödeme ekranında (situation) 5 farklı CTA var (behavior), bu kullanıcının karar vermesini zorlaştırabilir ve terk oranını artırabilir (impact)."

### Strengths, Weaknesses, Opportunities

SWOT benzeri yapı.

**Strengths:** Tasarımın güçlü yönleri
**Weaknesses:** Geliştirilmesi gereken alanlar
**Opportunities:** Kaçırılmış fırsatlar, ek fikirler

---

## Critique Oturumu Yönetimi

### Hazırlık (Önce)

**Tasarımcı olarak:**
- Bağlamı paylaş (problem, kullanıcı, hedefler)
- Hangi aşamada olduğunu belirt (erken konsept? detay aşaması?)
- Ne tür feedback istediğini söyle
- Materyalleri önceden paylaş

**Katılımcı olarak:**
- Materyalleri önceden incele
- Bağlamı anla
- Notlar al

### Oturum Yapısı

[STEPS]
1. **Giriş (5 dk)**
   Tasarımcı bağlamı sunar: Problem, kullanıcı, hedefler, kısıtlar

2. **Tasarımı göster (5-10 dk)**
   Tasarımcı çözümü sunar, minimal açıklama

3. **Sessiz inceleme (3-5 dk)**
   Herkes sessizce inceler, not alır

4. **Geri bildirim turu (15-20 dk)**
   Sırayla herkes konuşur, moderatör yönetir

5. **Tartışma (5-10 dk)**
   Açık sorular, derinleşme

6. **Özet (3-5 dk)**
   Ana noktalar, action item'lar
[/STEPS]

### Moderatör Rolü

- Zamanı yönetir
- Herkese söz hakkı verir
- Konuyu odakta tutar
- Kişisel saldırıları engeller
- Notları özetler

### İdeal Katılımcı Sayısı

3-6 kişi ideal. Daha az = yetersiz perspektif. Daha fazla = kaos.

---

## Geri Bildirim Alma

Vermek kadar almak da beceri ister.

### 1. Defansif olma

İlk tepki savunmak olabilir. Dur, dinle, anla.

[COMPARISON]
❌ Kötü: "Ama sen anlamadın, aslında bu..."
✅ İyi: "Anlıyorum, bu endişeyi daha iyi ele almam gerekiyor."
[/COMPARISON]

### 2. Açıklama vs savunma

Neden yaptığını açıklamak iyi. Ama her kritik için savunma moduna geçme.

### 3. Netleştirici sorular sor

"Bu konu hakkında biraz daha açar mısın?"
"Hangi kullanıcı senaryosunu düşünüyorsun?"

### 4. Not al

Her şeyi hatırlayamazsın. Not al, sonra değerlendir.

### 5. Teşekkür et

Feedback zaman ve emek gerektirir. Değer ver.

### 6. Hepsini uygulamak zorunda değilsin

Feedback öneri, emir değil. Değerlendir, filtrele, kararı sen ver.

---

## Uzaktan Critique

Remote çalışmada critique farklı dinamikler gerektirir.

### Araçlar

- **Figma:** Yorum özelliği, gerçek zamanlı
- **Loom:** Asenkron video feedback
- **Miro/FigJam:** Sticky note'larla feedback
- **Slack/Teams:** Yazılı tartışma

### Asenkron Critique

Herkes aynı anda olmak zorunda değil.

**Avantajları:**
- Zaman farkı sorunu yok
- Düşünüp yazma şansı
- Yazılı kayıt

**Dezavantajları:**
- Anlık tartışma zor
- Ton kaybolabilir
- Daha yavaş

### Senkron Critique (Video)

Zoom/Meet üzerinden canlı oturum.

**İpuçları:**
- Ekran paylaşımı
- Herkes kamerayı açsın (bağlantı için)
- Chat'i de kullan
- Sessiz inceleme süresi ver

---

## Stakeholder Feedback

Tasarımcı olmayan paydaşlardan feedback almak farklı.

### Zorluklar

- Tasarım dili bilmeyebilirler
- Kişisel tercihlerini söyleyebilirler
- Çözüm sunmak isteyebilirler (problem yerine)
- HiPPO etkisi (Highest Paid Person's Opinion)

### Stratejiler

**1. Soruları yönlendir**
"Beğendiniz mi?" yerine "Bu tasarım X hedefe ulaşıyor mu?"

**2. Kriterleri önceden belirle**
"Bugün şu 3 kriteri değerlendireceğiz..."

**3. Kullanıcıyı hatırlat**
"Kullanıcı araştırmamız şunu gösterdi..."

**4. Data kullan**
"A/B testimizde bu yaklaşım %X daha iyi performans gösterdi."

**5. Tercih vs gereksinim ayır**
"Bu bir tercih mi yoksa bir iş gereksinimi mi?"

---

## Critique Kültürü Oluşturma

### Takımda

- Düzenli critique oturumları (haftalık/2 haftalık)
- Herkes katılır, herkes sunar
- Psikolojik güvenlik ortamı
- Hata yapma özgürlüğü
- Kıdemden bağımsız görüş alma

### Bireysel

- Erken ve sık feedback iste
- Farklı perspektiflerden al (tasarımcı, developer, PM, kullanıcı)
- Feedback'e açık ol, savunmacı olma
- Öğrenmeyi öncelikle

---

## Sık Yapılan Hatalar

### 1. Kişiselleştirme

Tasarımı eleştirmek, tasarımcıyı eleştirmek değil.

### 2. Belirsiz feedback

"Biraz garip" = işe yaramaz. Spesifik ol.

### 3. Çözüm dayatma

"Bence şöyle yapmalısın" yerine problemi belirt.

### 4. Sadece negatif

Sadece sorunlara odaklanmak moral bozar.

### 5. Her şeyi söyleme

10 sorun varsa hepsini söyleme. Öncelikli 2-3 tane.

### 6. Bağlamı bilmeden konuşma

Hedefleri, kısıtları bilmeden feedback anlamsız.

### 7. Feedback almamak

"Ben kıdemliyim, biliyorum" = öğrenmeyi durdurma.

---

[EXERCISE]
## Şimdi Sen Dene

**20 dakika**

**Görev:** Aşağıdaki kötü feedback'leri yapıcı hale getir.

**Senaryo:** E-ticaret checkout sayfası tasarımı

**Kötü feedback'ler:**

1. "Bu çok karışık."
   → Yapıcı versiyon: ___

2. "Renkleri beğenmedim."
   → Yapıcı versiyon: ___

3. "Ben olsam sidebar koyardım."
   → Yapıcı versiyon: ___

4. "Güzel olmuş."
   → Yapıcı versiyon: ___

5. "Kullanıcılar bunu anlamaz."
   → Yapıcı versiyon: ___

**Formül:**
- Spesifik ol
- Hedefe bağla
- Soru formatı dene
- "Ben" yerine "kullanıcı" de
[/EXERCISE]

---

[SUMMARY]
## Özet

- Critique = yapılandırılmış, hedef odaklı geri bildirim
- Tasarıma odaklan, kişiye değil
- Spesifik ol, belirsiz yorumlardan kaçın
- Hedefler ve kriterler çerçevesinde değerlendir
- Soru sor, varsayma
- "I Like, I Wish, What If" veya SBI çerçevesi kullan
- Oturum yapısı: bağlam → gösterim → inceleme → feedback → özet
- Feedback alırken: defansif olma, not al, filtrele
- Hepsini uygulamak zorunlu değil
- Düzenli critique = takım gelişimi
[/SUMMARY]

---

## İlgili İçerikler

**Önceki:** [Figma Temelleri](/kutuphane/figma-temelleri)

**Sonraki:** Stakeholder Yönetimi *(yakında)*

**İlgili konular:**
- [UX Mülakat Soruları](/kutuphane/ux-mulakat-sorulari)
- [Portfolio Case Study Hazırlama](/kutuphane/portfolio-case-study)
- Sunum ve Storytelling *(yakında)*

**İlgili Roadmap:** UX Designer Roadmap → Soft Skills

---

## Kaynaklar

Derinleşmek istersen:

- [Discussing Design - Adam Connor & Aaron Irizarry](https://www.oreilly.com/library/view/discussing-design/9781491902394/) (Kitap, temel kaynak)
- [Design Critiques - NNGroup](https://www.nngroup.com/articles/design-critiques/) (İngilizce, 8 dk)
- [How to Run a Design Critique - Google Design](https://design.google/library/how-to-run-a-design-critique) (İngilizce)
`,
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "ux-research": "#3B82F6",
  "ux-design": "#10B981",
  "kariyer": "#8B5CF6",
  "araclar-ipucu": "#F59E0B",
  "temel-kavramlar": "#6366F1",
};

const CATEGORY_LABELS: Record<string, string> = {
  "ux-research": "UX Research",
  "ux-design": "UX Design",
  "kariyer": "Kariyer",
  "araclar-ipucu": "Araçlar & İpucu",
  "temel-kavramlar": "Temel Kavramlar",
};


export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  const article = ARTICLE_DATA[slug];

  // Google Analytics & Mixpanel page view tracking
  useEffect(() => {
    if (article && typeof window !== 'undefined') {
      // Google Analytics - Send custom event with article details
      // Note: GoogleAnalytics component handles standard pageview tracking
      if ((window as any).gtag) {
        (window as any).gtag('event', 'article_view', {
          article_title: article.title,
          article_slug: article.slug,
          article_category: article.category,
          reading_time: article.readingTime,
          page_path: `/kutuphane/${article.slug}`,
        });
      }
      // Mixpanel
      trackMixpanelEvent('article_viewed', {
        article_id: article.id,
        article_title: article.title,
        article_slug: article.slug,
        article_category: article.category,
        reading_time: article.readingTime,
        page_path: `/kutuphane/${article.slug}`,
      });
    }
  }, [article]);

  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));

      // Update active section in TOC
      const sections = document.querySelectorAll("h2");
      let current = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Yazı bulunamadı</h1>
          <Link href="/kutuphane" className="text-[#DEFF37] hover:underline">
            Kütüphaneye dön
          </Link>
        </div>
      </div>
    );
  }

  // Extract headings for TOC
  const tocSections = useMemo(() => {
    const headings: Array<{ id: string; text: string; level: number }> = [];
    const h2Regex = /^##\s+(.+)$/gm;
    let match;
    while ((match = h2Regex.exec(article.content)) !== null) {
      const text = match[1];
      const id = text.toLowerCase().replace(/\s+/g, "-");
      headings.push({ id, text, level: 2 });
    }
    return headings;
  }, [article.content]);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-40">
        <div
          className="h-full bg-[#DEFF37] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#DEFF37] transition-colors">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <Link href="/kutuphane" className="hover:text-[#DEFF37] transition-colors">
              Kütüphane
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{article.title}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-4">
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold inline-block"
              style={{
                backgroundColor: `${CATEGORY_COLORS[article.category] || "#3B82F6"}20`,
                color: CATEGORY_COLORS[article.category] || "#3B82F6",
                border: `1px solid ${CATEGORY_COLORS[article.category] || "#3B82F6"}40`,
              }}
            >
              {CATEGORY_LABELS[article.category] || "UX Research"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl md:text-2xl text-gray-400 mb-4">{article.subtitle}</p>
          )}
          <p className="text-lg text-gray-400 italic mb-6">{article.titleEn}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <img
                src="https://r.resimlink.com/MOZoRk0.png"
                alt="Serhat Bahçeliler"
                className="w-6 h-6 rounded-full object-cover border border-zinc-700"
              />
              <span>Serhat Bahçeliler</span>
            </div>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>{article.readingTime} dk okuma</span>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents - Desktop */}
          {tocSections.length > 0 && (
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 -ml-6 pl-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">İçindekiler</h3>
                <nav className="space-y-2">
                  {tocSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-[#DEFF37]/10 text-[#DEFF37] border-l-2 border-[#DEFF37]"
                          : "text-gray-400 hover:text-white hover:bg-zinc-900/50"
                      }`}
                    >
                      {section.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Article Content */}
          <article className="lg:col-span-3">
            <MarkdownRenderer content={article.content} />
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-zinc-900 text-gray-500 text-center mt-16">
        <p>DesignAtlas BETA &copy; 2024 - Tasarımı Öğren. Adım Adım.</p>
      </footer>

      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${article.title} ${article.subtitle ? `- ${article.subtitle}` : ""}`,
            description: article.description,
            image: article.heroImage || undefined,
            author: {
              "@type": "Person",
              name: "Serhat Bahçeliler",
            },
            publisher: {
              "@type": "Organization",
              name: "DesignAtlas",
              logo: {
                "@type": "ImageObject",
                url: "https://designatlas.io/logo.png",
              },
            },
            datePublished: article.publishedAt,
            dateModified: article.publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://designatlas.io/kutuphane/${article.slug}`,
            },
          }),
        }}
      />

      {/* Structured Data - FAQ */}
      {(() => {
        const faqData: any = {
          "kullanilabilirlik-testi": [
            {
              "@type": "Question",
              name: "Kullanılabilirlik testi nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kullanılabilirlik testi, gerçek kullanıcıların bir ürün veya tasarımla etkileşimini gözlemlediğin bir araştırma yöntemidir. Kullanıcıya belirli görevler verilir ve bu görevleri tamamlamaya çalışırken nerede takıldığı, ne hissettiği gözlemlenir.",
              },
            },
            {
              "@type": "Question",
              name: "Kullanılabilirlik testi için kaç kişi gerekli?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Klasik kural olarak 5 kullanıcı, sorunların yaklaşık %85'ini ortaya çıkarır. Bu sayı tek bir kullanıcı segmenti için geçerlidir. Farklı kullanıcı grupları için ayrı testler yapılmalıdır.",
              },
            },
            {
              "@type": "Question",
              name: "Kullanılabilirlik testi nasıl yapılır?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kullanılabilirlik testi 4 aşamada yapılır: 1) Hazırlık (amaç belirleme, görev yazma, katılımcı bulma), 2) Test senaryosu oluşturma, 3) Testi yürütme (gözlem ve not alma), 4) Analiz ve raporlama.",
              },
            },
            {
              "@type": "Question",
              name: "Kullanılabilirlik testi ile A/B testi arasındaki fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kullanılabilirlik testi, kullanıcıların bir tasarımla nasıl etkileşime girdiğini gözlemler ve nitel veri toplar. A/B testi ise iki farklı versiyonu karşılaştırarak hangisinin daha iyi performans gösterdiğini metriklerle ölçer.",
              },
            },
          ],
          "kullanici-gorusmesi": [
            {
              "@type": "Question",
              name: "Kullanıcı görüşmesi nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kullanıcı görüşmesi, hedef kullanıcılarla birebir yapılan, açık uçlu sorularla kullanıcının deneyimlerini, ihtiyaçlarını, motivasyonlarını ve sorunlarını anlamaya yönelik bir nitel araştırma yöntemidir.",
              },
            },
            {
              "@type": "Question",
              name: "Kullanıcı görüşmesi kaç dakika sürmeli?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "İdeal kullanıcı görüşmesi 30-60 dakika arasında sürer. 30 dakikanın altı yüzeysel kalır, 60 dakikanın üzeri ise katılımcıyı yorar ve veri kalitesini düşürür.",
              },
            },
            {
              "@type": "Question",
              name: "Kullanıcı görüşmesinde nasıl sorular sorulmalı?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Açık uçlu sorular sorulmalı, yönlendirici sorulardan kaçınılmalıdır. 'Evet/hayır' ile cevaplanabilecek sorular yerine 'Nasıl?', 'Neden?', 'Anlat' ile başlayan sorular tercih edilmelidir.",
              },
            },
            {
              "@type": "Question",
              name: "Kullanıcı görüşmesi ile anket arasındaki fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kullanıcı görüşmesi nitel veri toplar, derinlemesine içgörü sağlar ve az sayıda katılımcıyla yapılır. Anket ise nicel veri toplar, geniş kitleden yüzeysel bilgi alır ve istatistiksel analiz için kullanılır.",
              },
            },
          ],
          "portfolio-case-study": [
            {
              "@type": "Question",
              name: "UX case study nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX case study, bir tasarım projesinin baştan sona hikayesini anlatan dokümandır. Problemi, süreci, kararları ve sonuçları gösterir. Portfolyoda yer alır ve iş başvurularında tasarımcının yetkinliğini kanıtlar.",
              },
            },
            {
              "@type": "Question",
              name: "Portfolio için kaç case study gerekli?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kaliteli 3-4 case study yeterlidir. 10 yüzeysel projeden iyidir. Her case study farklı bir yetkinliği veya proje tipini göstermelidir.",
              },
            },
            {
              "@type": "Question",
              name: "Case study ne kadar uzun olmalı?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "İdeal uzunluk 5-10 dakikalık okuma süresidir (1500-3000 kelime). Çok kısa yüzeysel kalır, çok uzun okunmaz. Hiring manager'lar genellikle 5 dakikadan fazla zaman ayırmaz.",
              },
            },
            {
              "@type": "Question",
              name: "Gerçek proje olmadan case study yazılabilir mi?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Evet, kişisel projeler, redesign konseptleri veya hayali projeler de case study olarak yazılabilir. Önemli olan sürecin ve düşünce yapısının gösterilmesidir. Ancak bunun gerçek bir proje olmadığını belirtmek gerekir.",
              },
            },
          ],
          "user-flow-task-flow": [
            {
              "@type": "Question",
              name: "User flow nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "User flow, bir kullanıcının belirli bir hedefe ulaşmak için üründe izlediği tüm yolu gösteren diyagramdır. Giriş noktasından hedefe kadar tüm ekranları, kararları ve alternatif yolları içerir.",
              },
            },
            {
              "@type": "Question",
              name: "Task flow nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Task flow, tek bir görevin tamamlanması için gereken adımları gösteren lineer diyagramdır. Karar noktaları ve alternatif yollar içermez, sadece ideal yolu gösterir.",
              },
            },
            {
              "@type": "Question",
              name: "User flow ve task flow arasındaki fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Task flow tek bir görevi lineer olarak gösterir, dallanma yoktur. User flow ise kullanıcının tüm yolculuğunu gösterir, karar noktaları ve alternatif yollar içerir. Task flow daha basit ve spesifik, user flow daha kapsamlıdır.",
              },
            },
            {
              "@type": "Question",
              name: "User flow nasıl çizilir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "User flow çizmek için önce kullanıcı hedefini belirle, giriş noktasını tanımla, adımları ve ekranları listele, karar noktalarını ekle, alternatif yolları çiz. Figma, FigJam, Miro veya Whimsical gibi araçlar kullanabilirsin.",
              },
            },
          ],
          "ux-nedir": [
            {
              "@type": "Question",
              name: "UX ne demek?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX, User Experience (Kullanıcı Deneyimi) kelimelerinin kısaltmasıdır. Bir kullanıcının bir ürün, sistem veya hizmetle etkileşiminde yaşadığı tüm deneyimi ifade eder.",
              },
            },
            {
              "@type": "Question",
              name: "UX Designer ne yapar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX Designer, kullanıcı araştırması yapar, kullanıcı ihtiyaçlarını analiz eder, kullanıcı akışları ve wireframe'ler oluşturur, prototipler tasarlar ve kullanılabilirlik testleri yürütür. Amacı, ürünlerin kullanıcılar için kolay, verimli ve keyifli olmasını sağlamaktır.",
              },
            },
            {
              "@type": "Question",
              name: "UX ve UI arasındaki fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX (User Experience) ürünün nasıl çalıştığını ve hissettirdiğini tasarlar; kullanıcı araştırması, akışlar ve yapı ile ilgilenir. UI (User Interface) ise ürünün nasıl göründüğünü tasarlar; renkler, tipografi, butonlar ve görsel elementlerle ilgilenir.",
              },
            },
            {
              "@type": "Question",
              name: "UX Designer olmak için ne gerekir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX Designer olmak için empati, analitik düşünme, problem çözme ve iletişim becerileri gerekir. Teknik olarak kullanıcı araştırması, wireframing, prototyping ve temel görsel tasarım bilgisi önemlidir. Belirli bir diploma zorunluluğu yoktur.",
              },
            },
          ],
          "ui-nedir": [
            {
              "@type": "Question",
              name: "UI ne demek?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UI, User Interface (Kullanıcı Arayüzü) kelimelerinin kısaltmasıdır. Kullanıcının bir dijital ürünle etkileşime girdiği görsel ve etkileşimli yüzeyi ifade eder: butonlar, menüler, ikonlar, renkler, tipografi ve tüm görsel elementler.",
              },
            },
            {
              "@type": "Question",
              name: "UI Designer ne yapar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UI Designer, dijital ürünlerin görsel tasarımını yapar. Renk paletleri, tipografi, ikonlar, butonlar ve tüm görsel elementleri tasarlar. Design system oluşturur, style guide hazırlar ve görsel tutarlılığı sağlar.",
              },
            },
            {
              "@type": "Question",
              name: "UI ve UX arasındaki fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UI (User Interface) ürünün nasıl göründüğüyle ilgilenir: renkler, tipografi, görsel elementler. UX (User Experience) ise ürünün nasıl çalıştığı ve hissettirdiğiyle ilgilenir: kullanıcı araştırması, akışlar, yapı. UI görsel katman, UX deneyim katmanıdır.",
              },
            },
            {
              "@type": "Question",
              name: "İyi bir UI nasıl olmalı?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "İyi bir UI tutarlı, anlaşılır, erişilebilir ve estetik olmalıdır. Görsel hiyerarşi net olmalı, elementler tahmin edilebilir davranmalı, renk kontrastı yeterli olmalı ve marka kimliğiyle uyumlu olmalıdır.",
              },
            },
          ],
          "ux-ui-farki": [
            {
              "@type": "Question",
              name: "UX ve UI arasındaki temel fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX (User Experience) ürünün nasıl çalıştığını ve kullanıcıya nasıl hissettirdiğini tasarlar. UI (User Interface) ise ürünün nasıl göründüğünü tasarlar. UX yapı ve deneyim, UI görsel ve estetiktir.",
              },
            },
            {
              "@type": "Question",
              name: "UX/UI Designer ne demek?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX/UI Designer, hem kullanıcı deneyimi hem de kullanıcı arayüzü tasarımı yapan kişidir. Özellikle küçük ekiplerde ve startuplarda yaygın bir roldür. İki farklı beceri setini tek kişide birleştirir.",
              },
            },
            {
              "@type": "Question",
              name: "UX mi UI mi önce gelir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Genel olarak UX önce gelir. Önce kullanıcı ihtiyaçları araştırılır, akışlar ve yapı belirlenir (UX), sonra bu yapı görsel olarak tasarlanır (UI). Ancak pratikte ikisi paralel ve iteratif olarak ilerler.",
              },
            },
            {
              "@type": "Question",
              name: "UX olmadan UI olur mu?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Teknik olarak evet, görsel tasarım yapılabilir. Ancak UX düşünülmeden yapılan UI, güzel görünse de kullanılamaz olabilir. İyi ürünler için ikisi birlikte düşünülmelidir.",
              },
            },
          ],
          "wireframe-nedir": [
            {
              "@type": "Question",
              name: "Wireframe nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Wireframe, bir dijital ürünün sayfa veya ekran yapısını gösteren düşük sadakatli (low-fidelity) görsel taslaklardır. Renk, tipografi veya görsel detay içermez; sadece içerik yerleşimini, hiyerarşiyi ve temel fonksiyonları gösterir.",
              },
            },
            {
              "@type": "Question",
              name: "Wireframe ne işe yarar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Wireframe, tasarım sürecinin erken aşamasında fikirleri hızlıca görselleştirmeye, ekip içi iletişimi kolaylaştırmaya, yapısal sorunları erken tespit etmeye ve görsel tasarıma geçmeden önce akışı doğrulamaya yarar.",
              },
            },
            {
              "@type": "Question",
              name: "Wireframe nasıl çizilir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Wireframe çizmek için önce sayfanın amacını belirle, içerik hiyerarşisini oluştur, temel layout'u çiz, placeholder içerikleri yerleştir ve navigasyonu ekle. Kalem kağıtla veya Figma, Balsamiq gibi dijital araçlarla çizilebilir.",
              },
            },
            {
              "@type": "Question",
              name: "Wireframe ve mockup arasındaki fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Wireframe düşük sadakatlidir, yapıyı gösterir, görsel detay içermez. Mockup yüksek sadakatlidir, gerçek renkler, fontlar ve görseller içerir, final tasarıma yakındır. Wireframe önce, mockup sonra gelir.",
              },
            },
          ],
          "persona-olusturma": [
            {
              "@type": "Question",
              name: "Persona nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Persona, hedef kullanıcı grubunu temsil eden kurgusal ama araştırmaya dayalı karakter profilidir. Gerçek kullanıcı verilerinden oluşturulur ve tasarım kararlarına rehberlik eder.",
              },
            },
            {
              "@type": "Question",
              name: "Persona ne işe yarar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Persona, ekibin kullanıcıya empati kurmasını sağlar, tasarım kararlarında ortak referans noktası oluşturur, 'herkes için tasarla' tuzağından kaçınmaya yardımcı olur ve stakeholder iletişimini kolaylaştırır.",
              },
            },
            {
              "@type": "Question",
              name: "Kaç persona oluşturulmalı?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Çoğu proje için 2-4 persona yeterlidir. Bir primary persona (ana hedef) ve 1-3 secondary persona (diğer önemli gruplar) oluşturulur. Çok fazla persona odağı dağıtır.",
              },
            },
            {
              "@type": "Question",
              name: "Persona araştırma olmadan oluşturulabilir mi?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Teknik olarak evet ama önerilmez. Araştırma olmadan oluşturulan personalar varsayımlara dayanır ve yanlış yönlendirebilir. En azından mevcut veriler, müşteri destek kayıtları veya stakeholder görüşmeleri kullanılmalıdır.",
              },
            },
          ],
          "ux-mulakat-sorulari": [
            {
              "@type": "Question",
              name: "UX mülakatında en çok hangi sorular soruluyor?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX mülakatlarında genellikle üç tip soru sorulur: Davranışsal sorular (geçmiş deneyimler), teknik sorular (UX bilgisi ve süreç) ve case study/whiteboard challenge (problem çözme becerisi). En yaygın sorular tasarım sürecini, zor projelerden örnekleri ve kullanıcı araştırması deneyimini içerir.",
              },
            },
            {
              "@type": "Question",
              name: "UX mülakatına nasıl hazırlanmalı?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Portfolyonuzdaki 2-3 projeyi detaylı anlatabilecek şekilde hazırlayın, STAR metoduyla davranışsal soru cevapları pratik yapın, şirketi ve ürünlerini araştırın, whiteboard challenge için problem çözme pratiği yapın ve sorulacak sorularınızı hazırlayın.",
              },
            },
            {
              "@type": "Question",
              name: "Deneyimim az, nasıl cevap vermeliyim?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kişisel projelerden, bootcamp çalışmalarından veya redesign projelerinden örnekler verin. Sürecinizi ve düşünce yapınızı gösterin. 'Deneyimim yok' demek yerine 'Bu konuda şu projeyi yaptım' deyin. Öğrenme isteğinizi ve potansiyelinizi vurgulayın.",
              },
            },
            {
              "@type": "Question",
              name: "STAR metodu nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "STAR metodu davranışsal soruları cevaplamak için kullanılan bir yapıdır: Situation (durum), Task (görev), Action (aksiyon), Result (sonuç). Geçmiş deneyimlerinizi bu yapıda anlatmak, cevaplarınızı organize ve etkili kılar.",
              },
            },
          ],
          "product-design-nedir": [
            {
              "@type": "Question",
              name: "Product Design nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Product Design, bir dijital ürünün kullanıcı deneyiminden görsel tasarımına, stratejisinden iş hedeflerine kadar tüm tasarım sürecini kapsayan disiplindir. UX ve UI'ı birleştirir, aynı zamanda ürün stratejisi ve iş metrikleriyle de ilgilenir.",
              },
            },
            {
              "@type": "Question",
              name: "Product Designer ne yapar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Product Designer kullanıcı araştırması yapar, deneyim ve arayüz tasarlar, prototip oluşturur, test eder ve ürün stratejisine katkıda bulunur. Sadece tasarlamak değil, ürünün başarısı için sorumluluk almak Product Designer'ın görevidir.",
              },
            },
            {
              "@type": "Question",
              name: "Product Designer ile UX Designer arasındaki fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX Designer kullanıcı deneyimine odaklanır, Product Designer ise deneyimin yanı sıra iş hedefleri, metrikler ve ürün stratejisiyle de ilgilenir. Product Designer daha geniş bir sorumluluk alanına sahiptir ve genellikle UX+UI+strateji birleşimidir.",
              },
            },
            {
              "@type": "Question",
              name: "Product Designer olmak için ne gerekir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "UX ve UI tasarım becerilerinin yanı sıra, ürün düşüncesi, iş metrikleri anlayışı, iletişim ve iş birliği becerileri gerekir. Teknik olarak araştırma, wireframing, prototyping, visual design ve temel analitik bilgisi önemlidir.",
              },
            },
          ],
          "information-architecture": [
            {
              "@type": "Question",
              name: "Information Architecture nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Information Architecture (Bilgi Mimarisi), içeriğin ve bilginin nasıl organize edileceğini, yapılandırılacağını ve etiketleneceğini belirleyen disiplindir. Kullanıcıların ihtiyaçlarını bulmalarını ve anlamalarını kolaylaştırır.",
              },
            },
            {
              "@type": "Question",
              name: "Information Architecture ne işe yarar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "IA, kullanıcıların içerik içinde kaybolmamasını sağlar. İyi bir IA ile kullanıcılar aradıklarını hızlıca bulur, nerede olduklarını bilir ve bir sonraki adımı tahmin edebilir.",
              },
            },
            {
              "@type": "Question",
              name: "Site haritası ve IA aynı şey mi?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Hayır. Site haritası, IA'nın bir çıktısıdır. IA daha geniş bir kavram olup organizasyon sistemleri, etiketleme, navigasyon ve arama sistemlerini kapsar. Site haritası sadece sayfa hiyerarşisini gösterir.",
              },
            },
            {
              "@type": "Question",
              name: "Card sorting nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Card sorting, kullanıcıların içeriği nasıl grupladığını ve adlandırdığını anlamak için kullanılan bir IA araştırma yöntemidir. Kullanıcılara içerik kartları verilir ve mantıklı gelen şekilde gruplamalarını istersiniz.",
              },
            },
          ],
          "user-journey-map": [
            {
              "@type": "Question",
              name: "User Journey Map nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "User Journey Map, bir kullanıcının belirli bir hedefe ulaşmak için geçtiği tüm aşamaları, bu aşamalardaki eylemlerini, düşüncelerini, duygularını ve temas noktalarını görselleştiren bir diyagramdır.",
              },
            },
            {
              "@type": "Question",
              name: "Journey map ne işe yarar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Journey map, kullanıcı deneyimindeki pain point'leri tespit etmeye, fırsatları görmeye, ekibin kullanıcı perspektifini anlamasına ve departmanlar arası hizalamaya yardımcı olur.",
              },
            },
            {
              "@type": "Question",
              name: "User flow ile journey map arasındaki fark nedir?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "User flow, kullanıcının üründe izlediği adımları ve ekranları gösterir - teknik ve ürün odaklıdır. Journey map ise kullanıcının duygularını, düşüncelerini ve tüm temas noktalarını (ürün dışı dahil) kapsar - deneyim odaklıdır.",
              },
            },
            {
              "@type": "Question",
              name: "Journey map nasıl oluşturulur?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Önce persona ve senaryo belirle, araştırma verilerini topla, aşamaları tanımla, her aşama için eylemler, düşünceler, duygular ve temas noktalarını ekle, pain point ve fırsatları işaretle, görselleştir ve paylaş.",
              },
            },
          ],
        };

        const faqs = faqData[slug];
        if (!faqs) return null;

        return (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs,
              }),
            }}
          />
        );
      })()}

      {/* Structured Data - Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Ana Sayfa",
                item: "https://designatlas.io",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Kütüphane",
                item: "https://designatlas.io/kutuphane",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `https://designatlas.io/kutuphane/${article.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
