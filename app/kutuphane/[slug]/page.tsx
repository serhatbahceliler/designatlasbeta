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
    author: "DesignAtlas",
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
    author: "DesignAtlas",
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
    author: "DesignAtlas",
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

**Sonraki:** UX Mülakat Soruları ve Cevapları *(yakında)*

**İlgili Roadmap:** [UX Designer Roadmap → Kariyer](/roadmap/ux-designer)

---

## Kaynaklar

Derinleşmek istersen:

- [How to Write a UX Case Study - NNGroup](https://www.nngroup.com/articles/ux-case-study-guide/) (İngilizce, 12 dk)
- [Case Study Club](https://www.casestudy.club/) (Örnek case study'ler, İngilizce)
- [Bestfolios](https://www.bestfolios.com/) (Portfolio örnekleri, İngilizce)
`,
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "ux-research": "#3B82F6",
  "ux-design": "#10B981",
  "kariyer": "#8B5CF6",
  "araclar-ipucu": "#F59E0B",
};

const CATEGORY_LABELS: Record<string, string> = {
  "ux-research": "UX Research",
  "ux-design": "UX Design",
  "kariyer": "Kariyer",
  "araclar-ipucu": "Araçlar & İpucu",
};


export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  const article = ARTICLE_DATA[slug];

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
            <span>{article.readingTime} dk okuma</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}</span>
            {article.author && (
              <>
                <span>•</span>
                <span>{article.author}</span>
              </>
            )}
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
              "@type": "Organization",
              name: article.author || "DesignAtlas",
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
