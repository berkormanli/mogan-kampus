import PocketBase from "pocketbase";
import { loadDotEnv } from "./env.mjs";

loadDotEnv();

const POCKETBASE_URL = process.env.POCKETBASE_URL || process.env.VITE_POCKETBASE_URL;
const POCKETBASE_SUPERUSER_EMAIL =
  process.env.POCKETBASE_SUPERUSER_EMAIL || process.env.POCKETBASE_ADMIN_EMAIL;
const POCKETBASE_SUPERUSER_PASSWORD =
  process.env.POCKETBASE_SUPERUSER_PASSWORD || process.env.POCKETBASE_ADMIN_PASSWORD;

if (!POCKETBASE_URL) {
  throw new Error("Missing POCKETBASE_URL or VITE_POCKETBASE_URL.");
}

if (!POCKETBASE_SUPERUSER_EMAIL || !POCKETBASE_SUPERUSER_PASSWORD) {
  throw new Error("Missing POCKETBASE_SUPERUSER_EMAIL or POCKETBASE_SUPERUSER_PASSWORD.");
}

const content = {
  utility: {
    location: "Mogan Gölü Kıyısı, Gölbaşı, Ankara",
    email: "info@mogankampus.com",
    phone: "+90 312 555 0100",
  },
  nav: {
    brand: "Mogan",
    kicker: "Kampüs",
  },
  hero: {
    eyebrow: "Mogan Gölü Kıyısı · Gölbaşı, Ankara",
    headlineBefore: "Sınıfın dışında",
    headlineAccent: "gerçek",
    headlineAfter: "öğrenme.",
    body: "Öğrencileri ulusal ve uluslararası kariyerlere hazırlayan deneyim temelli bir kampüs. Yaratıcı tasarımlar, atölyeler ve portföy çalışmalarıyla geleceğe hazır bir kuşak.",
    cta: "Bilgi Al →",
    imageUrl: "",
    imageAlt: "Mogan Kampüs öğrencileri göl kenarında",
  },
  about: {
    eyebrow: "Hakkında",
    headline: "Sınıfın dışında gerçek öğrenme.",
    text: "Mogan Kampüs, öğrencileri ulusal ve uluslararası kariyerlere hazırlamak için tasarlanmış, deneyim temelli bir öğrenme ortamıdır. Yaratıcı tasarımları birleştirir, portföy üretimini merkezine alır ve her çocuğun kendi yolunu bulmasına alan açar.",
  },
  aboutPage: {
    eyebrow: "Mogan Kampüs Yaklaşımı",
    headline: "Öğrenmeyi kampüsün tamamına yayan bir deneyim alanı.",
    intro:
      "Mogan Kampüs; açık alanları, atölyeleri ve tematik programlarıyla öğrencilerin deneyerek, üreterek ve sunarak öğrenmesini destekler.",
    valuesTitle: "Öğrenme ilkelerimiz",
    values: [
      { title: "Deneyim", text: "Öğrenciler dener, üretir, geri bildirim alır ve geliştirir." },
      { title: "Portföy", text: "Her çalışma görünür bir çıktıya dönüşür." },
      { title: "Doğa", text: "Açık alan öğrenmenin doğal parçası olarak kullanılır." },
    ],
    missionTitle: "Vizyon & Misyon",
    missionText:
      "Amacımız öğrencilerin akademik başarılarını gerçek dünya becerileriyle tamamlamak; iletişim, tasarım, üretim ve takım çalışmasını güçlendiren bir kültür kurmaktır.",
    ctaLabel: "İletişime Geç",
  },
  programs: {
    eyebrow: "Tematik · Oyunlaştırılmış · Derinlikli",
    headline: "Kariyer Programları.",
    items: [
      {
        n: "01",
        slug: "alice-harikalar-diyarinda",
        title: "Alice Harikalar Diyarında",
        img: "",
        quote: "Merakın peşinden gitmeyi öğrenmek.",
        text: "Hayal gücünü ve eleştirel düşünceyi birleştiren tematik bir okuma ve rol yapma atölyesi. Öğrenciler hikayenin içine girer, kendi kararlarını üretir, yeni dünyalar tasarlar.",
        summary: "Hayal gücü, karar verme ve eleştirel düşünceyi birleştiren tematik program.",
        detailTitle: "Merakı bir öğrenme yolculuğuna dönüştüren program.",
        detailBody:
          "Öğrenciler hikaye içinde karar alır, karakterler üzerinden tartışır ve kendi yaratıcı çıktılarını üretir.",
        outcomes: ["Yaratıcı düşünme", "Sözlü ifade", "Karar verme", "Hikaye tasarımı"],
        ageRange: "8-14 yaş",
        duration: "4-6 hafta",
        gallery: [],
        ctaLabel: "Ön Kayıt Yap",
      },
      {
        n: "02",
        slug: "kucuk-prens",
        title: "Küçük Prens",
        img: "",
        quote: "Önemli olan gözle görülmez.",
        text: "Empati, dostluk ve sorumluluk üzerine kurulu yaratıcı bir program. Felsefi sohbetler, tasarım çalışmaları ve sahne deneyimleriyle değer odaklı öğrenme.",
        summary: "Empati, sorumluluk ve değer odaklı düşünme üzerine yaratıcı program.",
        detailTitle: "Empatiyi, iletişimi ve sorumluluğu görünür kılan deneyim.",
        detailBody:
          "Felsefi sohbetler, drama çalışmaları ve tasarım görevleriyle öğrenciler değerleri tartışır ve sunar.",
        outcomes: ["Empati", "Değer okuryazarlığı", "Drama", "Yaratıcı sunum"],
        ageRange: "7-13 yaş",
        duration: "4 hafta",
        gallery: [],
        ctaLabel: "Ön Kayıt Yap",
      },
      {
        n: "03",
        slug: "orman-ve-sovalye",
        title: "Orman ve Şövalye",
        img: "",
        quote: "Cesaret, doğada yetişir.",
        text: "Doğa içinde gerçekleşen, takım çalışması ve karakter gelişimini birleştiren immersive bir kariyer programı. Engel parkurları, görevler, hikaye temelli maceralar.",
        summary: "Doğa, takım çalışması ve karakter gelişimini birleştiren açık alan programı.",
        detailTitle: "Doğanın içinde takım olmayı ve liderlik almayı öğrenmek.",
        detailBody:
          "Açık alan görevleri, engel parkurları ve hikaye temelli takım mücadeleleriyle ilerleyen program.",
        outcomes: ["Takım çalışması", "Liderlik", "Problem çözme", "Fiziksel farkındalık"],
        ageRange: "9-15 yaş",
        duration: "3-5 hafta",
        gallery: [],
        ctaLabel: "Ön Kayıt Yap",
      },
      {
        n: "04",
        slug: "bir-fikrim-var",
        title: "Bir Fikrim Var",
        img: "",
        quote: "Her öğretmen bir mucittir.",
        text: "Öğretmenlerin kendi atölyelerini Mogan Kampüs'te tasarlayıp uygulayabildiği özel bir program. Eğitimcilere yaratıcı projeleri için mekan ve destek sunuyoruz.",
        summary: "Öğretmenlerin kendi atölyelerini tasarlayıp uygulayabildiği işbirliği programı.",
        detailTitle: "Yaratıcı eğitim fikirlerine alan, ekipman ve uygulama desteği.",
        detailBody:
          "Öğretmenlerin atölye veya eğitim projelerini Mogan Kampüs ortamında hayata geçirmeleri için tasarlanmıştır.",
        outcomes: ["Atölye tasarımı", "Eğitim işbirliği", "Uygulama desteği", "Mentörlük"],
        ageRange: "Öğretmenler ve kurumlar",
        duration: "Projeye göre",
        gallery: [],
        ctaLabel: "Atölye Önerisi Gönder",
      },
    ],
  },
  programsPage: {
    eyebrow: "Kariyer Programları",
    headline: "Tematik akışlarla derinleşen deneyim programları.",
    intro:
      "Programlarımız öğrencileri hikaye, üretim, portföy ve sunum aşamalarından oluşan uzun soluklu öğrenme akışlarına davet eder.",
    ctaLabel: "Program İçin İletişime Geç",
  },
  stats: {
    eyebrow: "Vizyon & Misyon",
    headlineBefore: "Geleceğin",
    headlineAccent: "kariyerine",
    headlineAfter: "bugünden hazırlık.",
    text: "Ders dışı etkinlikler, deneyim temelli öğrenme ve uluslararası standartlarda portföyler. Mogan Kampüs öğrencileri yalnızca sınav değil, hayat için yetişir; merakını rehberlik eden, üretkenliği ödüllendiren bir kültürün içinde büyür.",
    primaryCta: "Atölyeleri Keşfet",
    secondaryCta: "Mekanlar",
    items: [
      { stat: "20+", label: "Atölye" },
      { stat: "3", label: "Ana Program" },
      { stat: "1:8", label: "Mentör Oranı" },
    ],
  },
  workshops: {
    eyebrow: "Atölyeler & Deneyimler",
    headline: "20+ atölye. Sayısız ilk deneyim.",
    items: [
      {
        slug: "mogan-hackathon",
        title: "Mogan Hackathon",
        text: "Takımlar 48 saatte fikirden prototipe — gerçek bir problem, gerçek bir çözüm.",
        summary: "Takımların kısa sürede fikir geliştirip prototip sunduğu yoğun üretim deneyimi.",
        detailTitle: "Fikirden prototipe uzanan iki günlük üretim maratonu.",
        detailBody:
          "Öğrenciler problem tanımı, fikir seçimi, prototipleme ve sunum aşamalarından geçer.",
        skills: ["Problem tanımı", "Prototipleme", "Takım çalışması", "Sunum"],
        ageRange: "10-17 yaş",
        duration: "2 gün",
        capacity: "12-30 öğrenci",
        img: "",
        gallery: [],
        ctaLabel: "Katılım Bilgisi Al",
      },
      {
        slug: "robotik-atolyesi",
        title: "Robotik Atölyesi",
        text: "Mekanik, elektronik ve kodun buluştuğu yerde, çocukların eli her şeyi yaratır.",
        summary: "Mekanik, elektronik ve kodlama temellerini proje üzerinden öğreten atölye.",
        detailTitle: "Kodun fiziksel dünyada çalıştığını görme deneyimi.",
        detailBody:
          "Öğrenciler sensör, motor, mekanik kurgu ve temel kodlama ile çalışan sistemler üretir.",
        skills: ["Temel kodlama", "Elektronik", "Mekanik kurgu", "Test etme"],
        ageRange: "8-15 yaş",
        duration: "6 oturum",
        capacity: "8-16 öğrenci",
        img: "",
        gallery: [],
        ctaLabel: "Katılım Bilgisi Al",
      },
      {
        slug: "design-thinking",
        title: "Design Thinking",
        text: "Empati, fikir, prototip, test. Yaratıcı problemi çözmenin dünya çapındaki yöntemi.",
        summary: "Empati, fikir üretimi, prototip ve test döngüsünü öğreten tasarım atölyesi.",
        detailTitle: "Problemi anlamadan çözüm üretmeyen tasarım yaklaşımı.",
        detailBody:
          "Öğrenciler kullanıcı ihtiyacını anlamayı, fikirleri hızlıca görünür hale getirmeyi ve geri bildirimle geliştirmeyi öğrenir.",
        skills: ["Empati", "Fikir üretimi", "Prototip", "Geri bildirim"],
        ageRange: "9-17 yaş",
        duration: "4 oturum",
        capacity: "10-20 öğrenci",
        img: "",
        gallery: [],
        ctaLabel: "Katılım Bilgisi Al",
      },
      {
        slug: "coding-bootcamp",
        title: "Coding Bootcamp",
        text: "Yoğun, projeye dayalı kodlama programı; öğrenciler kendi portföylerini inşa eder.",
        summary: "Öğrencilerin kendi dijital projelerini ürettiği yoğun kodlama programı.",
        detailTitle: "Portföye dönüşen proje odaklı kodlama eğitimi.",
        detailBody:
          "Temel web ve uygulama mantığını proje üzerinden anlatan, çalışan çıktılarla ilerleyen kodlama programı.",
        skills: ["Kodlama temelleri", "Arayüz mantığı", "Proje geliştirme", "Sunum"],
        ageRange: "11-17 yaş",
        duration: "8 oturum",
        capacity: "8-14 öğrenci",
        img: "",
        gallery: [],
        ctaLabel: "Katılım Bilgisi Al",
      },
      {
        slug: "uzman-soylesileri",
        title: "Uzman Söyleşileri",
        text: "Bilim, sanat, spor ve girişimcilik dünyasından isimler, Mogan'da öğrencilerle buluşuyor.",
      },
      {
        slug: "yildiz-gozlemi",
        title: "Yıldız Gözlemi",
        text: "Göl kenarında teleskoplarla; bilim ve sessizliğin birlikte öğrettiği bir gece.",
      },
      {
        slug: "gol-kenari-yoga",
        title: "Göl Kenarı Yoga",
        text: "Sabah ışığında nefes, denge, odak. Bedenle başlayan bir öğrenme günü.",
      },
      {
        slug: "mentorluk-programi",
        title: "Mentörlük Programı",
        text: "Her öğrenciye, hedefini gören bir mentör; her mentöre, ilham aldığı bir öğrenci.",
      },
      {
        slug: "sunum-iletisim",
        title: "Sunum & İletişim",
        text: "Fikrini anlatabilmek, fikrin kendisi kadar önemlidir. Sahneye, mikrofona, kameraya hazırlık.",
      },
      {
        slug: "demo-day",
        title: "Demo Day",
        text: "Atölye sonunda öğrenciler çalışmalarını ailelere ve jüriye sunar — gerçek bir lansman.",
      },
      {
        slug: "takim-koclugu",
        title: "Takım Koçluğu",
        text: "Birlikte düşünen, birlikte karar alan, birlikte kazanan ekipler kurmak.",
      },
      {
        slug: "mezuniyet-toreni",
        title: "Mezuniyet Töreni",
        text: "Bir programın sonu değil, yeni bir hikayenin başlangıcı için tasarlanmış kutlama.",
      },
    ],
  },
  workshopsPage: {
    eyebrow: "Atölyeler",
    headline: "Kısa, yoğun ve üretim odaklı öğrenme deneyimleri.",
    intro:
      "Atölyelerimiz öğrencilerin belirli bir beceriyi deneyerek öğrenmesini sağlar. Her atölye pratik üretim ve görünür çıktı üzerine kurulur.",
    ctaLabel: "Atölye İçin İletişime Geç",
  },
  gallery: {
    eyebrow: "Kampüsten",
    headline: "Anlar.",
    imageUrls: [],
  },
  venues: {
    eyebrow: "İlham Veren Mekanlar",
    headlineBefore: "Doğanın",
    headlineOutline: "içinde",
    headlineAfter: "bir kampüs.",
    text: "Macera parkı, açık engel parkuru, plaj voleybolu ve futbolu, basketbol sahası, futbol sahası, orman survival alanı, tarım ve atölye serası, açık öğrenme alanları.",
    highlightBanner:
      "Bizim çok güçlü tesis ve olanaklarımız var. Gelin yaz okulu kapsamında buraya gezi düzenleyin.",
    highlightCta: "Bilgi Al →",
    items: [
      {
        slug: "macera-parki",
        name: "Macera Parkı",
        grades: "Açık Alan",
        img: "",
        text: "Tırmanma, denge ve cesaret rotaları — fiziksel zekanın açık havadaki sınıfı.",
        summary: "Tırmanma, denge ve hareket üzerinden özgüven geliştiren açık alan.",
        detailTitle: "Hareket, cesaret ve takım desteği için tasarlanmış parkur alanı.",
        detailBody:
          "Macera Parkı öğrencilerin fiziksel farkındalık, denge, cesaret ve takım desteğini deneyimlediği açık alanlardan biridir.",
        features: ["Tırmanma", "Denge rotaları", "Takım görevleri", "Açık alan etkinlikleri"],
        gallery: [],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "tarim-atolye-serasi",
        name: "Tarım & Atölye Serası",
        grades: "Yıl Boyu",
        img: "",
        text: "Tohumdan hasada, atölyeden mutfağa. Üretmenin ve dönüştürmenin canlı laboratuvarı.",
        summary: "Üretim, gözlem ve sürdürülebilirlik çalışmalarına ayrılmış canlı öğrenme alanı.",
        detailTitle: "Tohumdan ürüne uzanan canlı laboratuvar.",
        detailBody:
          "Tarım & Atölye Serası, öğrencilerin doğa döngülerini gözlemlediği ve üretim süreçlerini deneyimlediği bir uygulama alanıdır.",
        features: ["Tohum çalışmaları", "Gözlem", "Üretim", "Sürdürülebilirlik"],
        gallery: [],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "orman-survival-alani",
        name: "Orman Survival Alanı",
        grades: "Doğa",
        img: "",
        text: "İz sürme, sığınak kurma, takım kararları — doğanın öğrettiği liderlik dersleri.",
        summary: "Doğa içinde karar verme, yön bulma ve takım çalışması deneyimleri.",
        detailTitle: "Doğanın içinde problem çözme ve liderlik pratiği.",
        detailBody:
          "Orman Survival Alanı; iz sürme, yön bulma ve takım kararları gibi etkinliklerle öğrencilerin doğa farkındalığını güçlendirir.",
        features: ["Yön bulma", "Takım kararları", "Doğa farkındalığı", "Görev akışları"],
        gallery: [],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
    ],
  },
  venuesPage: {
    eyebrow: "Mekanlar",
    headline: "Kampüsün her alanı öğrenme için tasarlandı.",
    intro:
      "Mogan Kampüs; açık hava, atölye, spor ve doğa alanlarını öğrenme akışlarının parçası olarak kullanır.",
    ctaLabel: "Kampüsü Ziyaret Et",
  },
  teacher: {
    eyebrow: "Öğretmen Çalışmaları",
    headlineBefore: '"Bir Fikrim Var" diyen her öğretmene',
    headlineAccent: "alan",
    headlineAfter: ".",
    text: "Öğretmenlerin kendi atölyelerini tasarlayıp Mogan Kampüs'te uygulayabildiği özel bir programdır. Eğitimcilere yaratıcı projeleri için mekan, ekipman ve mentörlük sunuyoruz.",
    cta: "Atölye Önerisi Gönder",
    cardTitle: "İşbirlikleri",
    cardText: "Kurumlar ve bireylerle stratejik işbirliklerine açığız:",
    bullets: [
      "Atölye ve portföy programları",
      "Bilim, sanat ve spor etkinlikleri",
      "Öğretmen seminerleri ve eğitimleri",
      "Uzun soluklu eğitim ortaklıkları",
    ],
  },
  contact: {
    eyebrow: "Başvuru & İletişim",
    headline: "Bize katıl.",
    text: "Mogan Gölü Kıyısı, Gölbaşı, Ankara. Aşağıdaki ön kayıt formunu doldurarak bize ulaşabilir, ekibimizden geri dönüş alabilirsiniz.",
    addressLabel: "Adres",
    address: "Mogan Gölü Kıyısı\nGölbaşı, Ankara",
    phoneLabel: "Telefon",
    phone: "+90 312 555 0100",
    emailLabel: "E-posta",
    email: "info@mogankampus.com",
    backgroundImageUrl: "",
  },
  contactPage: {
    eyebrow: "İletişim",
    headline: "Programlar ve ziyaret için bize ulaşın.",
    intro:
      "Ön kayıt, kampüs ziyareti, atölye önerisi veya kurum işbirliği için formu doldurabilirsiniz.",
    visitTitle: "Kampüs Bilgileri",
    faqTitle: "Sıkça Sorulanlar",
  },
  faqs: [
    {
      q: "Yaş sınırı var mı?",
      a: "Programlarımız genellikle 6-17 yaş aralığındaki öğrencilere yöneliktir; her programın kendi yaş aralığı vardır ve detaylar başvuru sırasında paylaşılır.",
    },
    {
      q: "Konaklama imkanı sunuluyor mu?",
      a: "Belirli yaz kampları ve özel programlarda konaklamalı seçenekler mevcuttur. Standart atölyeler genellikle gündüzlü işler.",
    },
    {
      q: "Ön koşul / hazırlık gerekiyor mu?",
      a: "Çoğu atölye için herhangi bir ön bilgi gerekmez. Robotik ve Coding Bootcamp gibi ileri programlarda temel düzey beklenebilir; başvurudan sonra yönlendirme yapılır.",
    },
  ],
  footer: {
    brand: "",
    text: "",
    columns: [],
    tagline: "Sınıfın Dışında Gerçek Öğrenme",
  },
};

const pb = new PocketBase(POCKETBASE_URL);
await pb
  .collection("_superusers")
  .authWithPassword(POCKETBASE_SUPERUSER_EMAIL, POCKETBASE_SUPERUSER_PASSWORD);

for (const [key, data] of Object.entries(content)) {
  try {
    const existing = await pb
      .collection("site_content")
      .getFirstListItem(pb.filter("key={:key}", { key }));
    await pb.collection("site_content").update(existing.id, {
      key,
      data,
    });
    console.log(`updated ${key}`);
  } catch (error) {
    if (error?.status !== 404) throw error;
    await pb.collection("site_content").create({ key, data });
    console.log(`created ${key}`);
  }
}
