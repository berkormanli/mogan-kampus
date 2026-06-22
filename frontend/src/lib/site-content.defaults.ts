import heroImg from "@/assets/hero-graduation.jpg";
import vCuriosity from "@/assets/value-curiosity.jpg";
import vDignity from "@/assets/value-dignity.jpg";
import vHonor from "@/assets/value-honor.jpg";
import vKindness from "@/assets/value-kindness.jpg";
import expVolley from "@/assets/exp-volleyball.jpg";
import expScience from "@/assets/exp-science.jpg";
import expBand from "@/assets/exp-band.jpg";
import expCheer from "@/assets/exp-cheer.jpg";
import divPrimary from "@/assets/div-primary.jpg";
import divLower from "@/assets/div-lower.jpg";
import divMiddle from "@/assets/div-middle.jpg";

export type ImageValue = string;

export type Program = {
  n: string;
  slug?: string;
  title: string;
  img: ImageValue;
  imgAlt?: string;
  quote: string;
  text: string;
  summary?: string;
  detailTitle?: string;
  detailBody?: string;
  outcomes?: string[];
  ageRange?: string;
  duration?: string;
  gallery?: ImageValue[];
  ctaLabel?: string;
};

export type Workshop = {
  slug?: string;
  title: string;
  text: string;
  summary?: string;
  detailTitle?: string;
  detailBody?: string;
  skills?: string[];
  ageRange?: string;
  duration?: string;
  capacity?: string;
  img?: ImageValue;
  imgAlt?: string;
  gallery?: ImageValue[];
  ctaLabel?: string;
};

export type Venue = {
  slug?: string;
  name: string;
  grades: string;
  img: ImageValue;
  imgAlt?: string;
  text: string;
  summary?: string;
  detailTitle?: string;
  detailBody?: string;
  features?: string[];
  gallery?: ImageValue[];
  ctaLabel?: string;
};

export type Stat = {
  stat: string;
  label: string;
};

export type Faq = {
  q: string;
  a: string;
};

export type SiteContent = {
  utility: {
    location: string;
    email: string;
    phone: string;
  };
  nav: {
    brand: string;
    kicker: string;
  };
  hero: {
    eyebrow: string;
    headlineBefore: string;
    headlineAccent: string;
    headlineAfter: string;
    body: string;
    cta: string;
    imageUrl: ImageValue;
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    text: string;
  };
  aboutPage: {
    eyebrow: string;
    headline: string;
    intro: string;
    valuesTitle: string;
    values: { title: string; text: string }[];
    missionTitle: string;
    missionText: string;
    ctaLabel: string;
  };
  programs: {
    eyebrow: string;
    headline: string;
    items: Program[];
  };
  programsPage: {
    eyebrow: string;
    headline: string;
    intro: string;
    ctaLabel: string;
  };
  stats: {
    eyebrow: string;
    headlineBefore: string;
    headlineAccent: string;
    headlineAfter: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    items: Stat[];
  };
  workshops: {
    eyebrow: string;
    headline: string;
    items: Workshop[];
  };
  workshopsPage: {
    eyebrow: string;
    headline: string;
    intro: string;
    ctaLabel: string;
  };
  gallery: {
    eyebrow: string;
    headline: string;
    imageUrls: ImageValue[];
  };
  venues: {
    eyebrow: string;
    headlineBefore: string;
    headlineOutline: string;
    headlineAfter: string;
    text: string;
    highlightBanner: string;
    highlightCta: string;
    items: Venue[];
  };
  venuesPage: {
    eyebrow: string;
    headline: string;
    intro: string;
    ctaLabel: string;
  };
  teacher: {
    eyebrow: string;
    headlineBefore: string;
    headlineAccent: string;
    headlineAfter: string;
    text: string;
    cta: string;
    cardTitle: string;
    cardText: string;
    bullets: string[];
  };
  contact: {
    eyebrow: string;
    headline: string;
    text: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    backgroundImageUrl: ImageValue;
    backgroundImageAlt?: string;
  };
  contactPage: {
    eyebrow: string;
    headline: string;
    intro: string;
    visitTitle: string;
    faqTitle: string;
  };
  faqs: Faq[];
  footer: {
    brand: string;
    tagline: string;
  };
};

export const defaultSiteContent: SiteContent = {
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
    eyebrow: "Mutlu Çocuklar, İlham Veren Eğitim",
    headlineBefore: "Doğa",
    headlineAccent: "Bilim",
    headlineAfter: "Sanat",
    body: "Mogan Gölü kıyısında, çocukların keşfederek öğrendiği, özgürce geliştiği ve mutlulukla büyüdüğü modern bir eğitim kampüsü.",
    cta: "Bilgi Al",
    imageUrl: heroImg,
    imageAlt: "Mogan Kampüs'te mutlu çocuklar",
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
      "Mogan Kampüs; açık alanları, atölyeleri ve tematik programlarıyla öğrencilerin deneyerek, üreterek ve sunarak öğrenmesini destekler. Her program merak, portföy üretimi ve gerçek hayat becerileri etrafında tasarlanır.",
    valuesTitle: "Öğrenme ilkelerimiz",
    values: [
      {
        title: "Deneyim",
        text: "Öğrenciler yalnızca dinlemez; dener, üretir, geri bildirim alır ve tekrar geliştirir.",
      },
      {
        title: "Portföy",
        text: "Her çalışma görünür bir çıktıya dönüşür; öğrenci gelişimi somut örneklerle takip edilir.",
      },
      {
        title: "Doğa",
        text: "Açık alan, hareket ve keşif öğrenmenin doğal parçası olarak programlara dahil edilir.",
      },
    ],
    missionTitle: "Vizyon & Misyon",
    missionText:
      "Amacımız öğrencilerin akademik başarılarını gerçek dünya becerileriyle tamamlamak; onları iletişim, tasarım, üretim, takım çalışması ve özgüven açısından güçlendiren bir öğrenme kültürü kurmaktır.",
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
        img: vCuriosity,
        quote: "Merakın peşinden gitmeyi öğrenmek.",
        text: "Hayal gücünü ve eleştirel düşünceyi birleştiren tematik bir okuma ve rol yapma atölyesi. Öğrenciler hikayenin içine girer, kendi kararlarını üretir, yeni dünyalar tasarlar.",
        summary: "Hayal gücü, karar verme ve eleştirel düşünceyi birleştiren tematik program.",
        detailTitle: "Merakı bir öğrenme yolculuğuna dönüştüren program.",
        detailBody:
          "Alice Harikalar Diyarında programı, öğrencilerin hikaye içinde karar aldığı, karakterler üzerinden tartıştığı ve kendi yaratıcı çıktılarını ürettiği deneyim temelli bir öğrenme akışıdır. Okuma, rol yapma, tasarım ve sunum çalışmaları birlikte ilerler.",
        outcomes: ["Yaratıcı düşünme", "Sözlü ifade", "Karar verme", "Hikaye tasarımı"],
        ageRange: "8-14 yaş",
        duration: "4-6 hafta",
        gallery: [vCuriosity, expScience],
        ctaLabel: "Ön Kayıt Yap",
      },
      {
        n: "02",
        slug: "kucuk-prens",
        title: "Küçük Prens",
        img: vDignity,
        quote: "Önemli olan gözle görülmez.",
        text: "Empati, dostluk ve sorumluluk üzerine kurulu yaratıcı bir program. Felsefi sohbetler, tasarım çalışmaları ve sahne deneyimleriyle değer odaklı öğrenme.",
        summary: "Empati, sorumluluk ve değer odaklı düşünme üzerine yaratıcı program.",
        detailTitle: "Empatiyi, iletişimi ve sorumluluğu görünür kılan deneyim.",
        detailBody:
          "Küçük Prens programı; felsefi sohbetleri, drama çalışmalarını ve tasarım görevlerini bir araya getirir. Öğrenciler karakterler ve gezegenler üzerinden değerleri tartışır, kendi anlatılarını üretir ve grup içinde sunar.",
        outcomes: ["Empati", "Değer okuryazarlığı", "Drama", "Yaratıcı sunum"],
        ageRange: "7-13 yaş",
        duration: "4 hafta",
        gallery: [vDignity, expBand],
        ctaLabel: "Ön Kayıt Yap",
      },
      {
        n: "03",
        slug: "orman-ve-sovalye",
        title: "Orman ve Şövalye",
        img: vHonor,
        quote: "Cesaret, doğada yetişir.",
        text: "Doğa içinde gerçekleşen, takım çalışması ve karakter gelişimini birleştiren immersive bir kariyer programı. Engel parkurları, görevler, hikaye temelli maceralar.",
        summary: "Doğa, takım çalışması ve karakter gelişimini birleştiren açık alan programı.",
        detailTitle: "Doğanın içinde takım olmayı ve liderlik almayı öğrenmek.",
        detailBody:
          "Orman ve Şövalye programında öğrenciler açık alan görevleri, engel parkurları ve hikaye temelli takım mücadeleleriyle ilerler. Program cesaret, sorumluluk, iş bölümü ve kriz anında iletişim becerilerini destekler.",
        outcomes: ["Takım çalışması", "Liderlik", "Problem çözme", "Fiziksel farkındalık"],
        ageRange: "9-15 yaş",
        duration: "3-5 hafta",
        gallery: [vHonor, expVolley],
        ctaLabel: "Ön Kayıt Yap",
      },
      {
        n: "04",
        slug: "bir-fikrim-var",
        title: "Bir Fikrim Var",
        img: vKindness,
        quote: "Her öğretmen bir mucittir.",
        text: "Öğretmenlerin kendi atölyelerini Mogan Kampüs'te tasarlayıp uygulayabildiği özel bir program. Eğitimcilere yaratıcı projeleri için mekan ve destek sunuyoruz.",
        summary: "Öğretmenlerin kendi atölyelerini tasarlayıp uygulayabildiği işbirliği programı.",
        detailTitle: "Yaratıcı eğitim fikirlerine alan, ekipman ve uygulama desteği.",
        detailBody:
          "Bir Fikrim Var, öğretmenlerin kendi atölye veya eğitim projelerini Mogan Kampüs ortamında hayata geçirmeleri için tasarlanmıştır. İçerik tasarımı, mekan kullanımı ve uygulama planı birlikte netleştirilir.",
        outcomes: ["Atölye tasarımı", "Eğitim işbirliği", "Uygulama desteği", "Mentörlük"],
        ageRange: "Öğretmenler ve kurumlar",
        duration: "Projeye göre",
        gallery: [vKindness, expCheer],
        ctaLabel: "Atölye Önerisi Gönder",
      },
    ],
  },
  programsPage: {
    eyebrow: "Kariyer Programları",
    headline: "Tematik akışlarla derinleşen deneyim programları.",
    intro:
      "Programlarımız öğrencileri tek bir etkinlikten fazlasına davet eder. Her akış hikaye, üretim, portföy ve sunum aşamalarından oluşur.",
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
          "Mogan Hackathon öğrencileri problem tanımı, fikir seçimi, prototipleme ve sunum aşamalarından geçirir. Takımlar gerçek bir ihtiyaca çözüm üretir ve çalışmalarını jüriye aktarır.",
        skills: ["Problem tanımı", "Prototipleme", "Takım çalışması", "Sunum"],
        ageRange: "10-17 yaş",
        duration: "2 gün",
        capacity: "12-30 öğrenci",
        img: expScience,
        gallery: [expScience, expBand],
        ctaLabel: "Katılım Bilgisi Al",
      },
      {
        slug: "robotik-atolyesi",
        title: "Robotik Atölyesi",
        text: "Mekanik, elektronik ve kodun buluştuğu yerde, çocukların eli her şeyi yaratır.",
        summary: "Mekanik, elektronik ve kodlama temellerini proje üzerinden öğreten atölye.",
        detailTitle: "Kodun fiziksel dünyada çalıştığını görme deneyimi.",
        detailBody:
          "Robotik Atölyesi, öğrencilerin sensör, motor, mekanik kurgu ve temel kodlama ile çalışan sistemler üretmesini sağlar. Odak, hazır cevaptan çok deneme ve iyileştirme döngüsüdür.",
        skills: ["Temel kodlama", "Elektronik", "Mekanik kurgu", "Test etme"],
        ageRange: "8-15 yaş",
        duration: "6 oturum",
        capacity: "8-16 öğrenci",
        img: expScience,
        gallery: [expScience, expVolley],
        ctaLabel: "Katılım Bilgisi Al",
      },
      {
        slug: "design-thinking",
        title: "Design Thinking",
        text: "Empati, fikir, prototip, test. Yaratıcı problemi çözmenin dünya çapındaki yöntemi.",
        summary: "Empati, fikir üretimi, prototip ve test döngüsünü öğreten tasarım atölyesi.",
        detailTitle: "Problemi anlamadan çözüm üretmeyen tasarım yaklaşımı.",
        detailBody:
          "Design Thinking atölyesinde öğrenciler kullanıcı ihtiyacını anlamayı, fikirleri hızlıca görünür hale getirmeyi ve geri bildirimle geliştirmeyi öğrenir.",
        skills: ["Empati", "Fikir üretimi", "Prototip", "Geri bildirim"],
        ageRange: "9-17 yaş",
        duration: "4 oturum",
        capacity: "10-20 öğrenci",
        img: expBand,
        gallery: [expBand, expScience],
        ctaLabel: "Katılım Bilgisi Al",
      },
      {
        slug: "coding-bootcamp",
        title: "Coding Bootcamp",
        text: "Yoğun, projeye dayalı kodlama programı; öğrenciler kendi portföylerini inşa eder.",
        summary: "Öğrencilerin kendi dijital projelerini ürettiği yoğun kodlama programı.",
        detailTitle: "Portföye dönüşen proje odaklı kodlama eğitimi.",
        detailBody:
          "Coding Bootcamp, temel web ve uygulama mantığını proje üzerinden anlatır. Öğrenciler her hafta çalışan bir çıktı üretir ve program sonunda portföylerine ekleyebilecekleri bir proje sunar.",
        skills: ["Kodlama temelleri", "Arayüz mantığı", "Proje geliştirme", "Sunum"],
        ageRange: "11-17 yaş",
        duration: "8 oturum",
        capacity: "8-14 öğrenci",
        img: expScience,
        gallery: [expScience, expCheer],
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
      "Atölyelerimiz öğrencilerin belirli bir beceriyi deneyerek öğrenmesini sağlar. Her atölye pratik üretim, takım çalışması ve görünür çıktı üzerine kurulur.",
    ctaLabel: "Atölye İçin İletişime Geç",
  },
  gallery: {
    eyebrow: "Kampüsten",
    headline: "Anlar.",
    imageUrls: [expScience, expBand, expVolley, expCheer, expBand, expScience],
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
        img: divPrimary,
        text: "Tırmanma, denge ve cesaret rotaları — fiziksel zekanın açık havadaki sınıfı.",
        summary: "Tırmanma, denge ve hareket üzerinden özgüven geliştiren açık alan.",
        detailTitle: "Hareket, cesaret ve takım desteği için tasarlanmış parkur alanı.",
        detailBody:
          "Macera Parkı öğrencilerin fiziksel farkındalık, denge, cesaret ve takım desteğini deneyimlediği açık alanlardan biridir. Program içeriklerine göre ısınma, görev, parkur ve değerlendirme aşamalarıyla kullanılır.",
        features: ["Tırmanma", "Denge rotaları", "Takım görevleri", "Açık alan etkinlikleri"],
        gallery: [divPrimary, expVolley],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "tarim-atolye-serasi",
        name: "Tarım & Atölye Serası",
        grades: "Yıl Boyu",
        img: divLower,
        text: "Tohumdan hasada, atölyeden mutfağa. Üretmenin ve dönüştürmenin canlı laboratuvarı.",
        summary: "Üretim, gözlem ve sürdürülebilirlik çalışmalarına ayrılmış canlı öğrenme alanı.",
        detailTitle: "Tohumdan ürüne uzanan canlı laboratuvar.",
        detailBody:
          "Tarım & Atölye Serası, öğrencilerin doğa döngülerini gözlemlediği, üretim ve dönüşüm süreçlerini deneyimlediği bir uygulama alanıdır. Atölyeler mevsime ve yaş grubuna göre şekillenir.",
        features: ["Tohum çalışmaları", "Gözlem", "Üretim", "Sürdürülebilirlik"],
        gallery: [divLower, expScience],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "orman-survival-alani",
        name: "Orman Survival Alanı",
        grades: "Doğa",
        img: divMiddle,
        text: "İz sürme, sığınak kurma, takım kararları — doğanın öğrettiği liderlik dersleri.",
        summary: "Doğa içinde karar verme, yön bulma ve takım çalışması deneyimleri.",
        detailTitle: "Doğanın içinde problem çözme ve liderlik pratiği.",
        detailBody:
          "Orman Survival Alanı; iz sürme, güvenli alan kurma, yön bulma ve takım kararları gibi etkinliklerle öğrencilerin doğa farkındalığını ve liderlik becerilerini güçlendirir.",
        features: ["Yön bulma", "Takım kararları", "Doğa farkındalığı", "Görev akışları"],
        gallery: [divMiddle, expCheer],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
    ],
  },
  venuesPage: {
    eyebrow: "Mekanlar",
    headline: "Kampüsün her alanı öğrenme için tasarlandı.",
    intro:
      "Mogan Kampüs; açık hava, atölye, spor ve doğa alanlarını öğrenme akışlarının parçası olarak kullanır. Mekanlar program hedeflerine göre farklı deneyimler sunar.",
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
    backgroundImageUrl: heroImg,
  },
  contactPage: {
    eyebrow: "İletişim",
    headline: "Programlar ve ziyaret için bize ulaşın.",
    intro:
      "Ön kayıt, kampüs ziyareti, atölye önerisi veya kurum işbirliği için formu doldurabilirsiniz. Ekibimiz sizinle en kısa sürede iletişime geçer.",
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
    tagline: "Sınıfın Dışında Gerçek Öğrenme",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function itemIdentity(value: unknown) {
  if (typeof value === "string") return value;
  if (!isRecord(value)) return "";
  return String(value.slug || value.title || value.name || value.q || "");
}

function keepLastUniqueItems<T>(items: T[]) {
  const seen = new Set<string>();
  const unique: T[] = [];

  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index];
    const identity = itemIdentity(item) || String(index);
    if (seen.has(identity)) continue;
    seen.add(identity);
    unique.unshift(item);
  }

  return unique;
}

function normalizeSiteContent(content: SiteContent): SiteContent {
  return {
    ...content,
    aboutPage: {
      ...content.aboutPage,
      values: keepLastUniqueItems(content.aboutPage.values),
    },
    programs: {
      ...content.programs,
      items: keepLastUniqueItems(content.programs.items),
    },
    stats: {
      ...content.stats,
      items: keepLastUniqueItems(content.stats.items),
    },
    workshops: {
      ...content.workshops,
      items: keepLastUniqueItems(content.workshops.items),
    },
    gallery: {
      ...content.gallery,
      imageUrls: keepLastUniqueItems(content.gallery.imageUrls.filter(Boolean)),
    },
    venues: {
      ...content.venues,
      items: keepLastUniqueItems(content.venues.items),
    },
    teacher: {
      ...content.teacher,
      bullets: keepLastUniqueItems(content.teacher.bullets),
    },
    faqs: keepLastUniqueItems(content.faqs),
    footer: {
      brand: (content.footer as Record<string, unknown>)?.brand as string ?? defaultSiteContent.footer.brand,
      tagline: (content.footer as Record<string, unknown>)?.tagline as string ?? defaultSiteContent.footer.tagline,
    },
  };
}

export function mergeSiteContent(content: Record<string, unknown> | undefined): SiteContent {
  if (!content) return defaultSiteContent;

  const replaced: Record<string, unknown> = { ...defaultSiteContent };
  for (const key of Object.keys(defaultSiteContent) as Array<keyof SiteContent>) {
    const value = content[key];
    if (value !== undefined && value !== null) {
      replaced[key] = value;
    }
  }

  return normalizeSiteContent(replaced as SiteContent);
}
