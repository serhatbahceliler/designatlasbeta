"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { MarkdownRenderer } from "@/components/kutuphane/MarkdownRenderer";

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

**Sonraki:** Prototype Nedir? *(yakında)*

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

**Sonraki:** UX Mülakat Soruları ve Cevapları *(yakında)*

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

  // Google Analytics page view tracking
  useEffect(() => {
    if (article && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: article.title,
        page_location: window.location.href,
        page_path: `/kutuphane/${article.slug}`,
        article_title: article.title,
        article_slug: article.slug,
        article_category: article.category,
        reading_time: article.readingTime,
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
