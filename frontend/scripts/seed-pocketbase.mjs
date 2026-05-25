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

const facilities = [
  {
    id: "01",
    name: "Adventure Park",
    category: "Macera / Açık Alan",
    featured: true,
    location: "Göl Kıyısı",
    environment: "Açık Alan",
    capacity: {
      min: 20,
      max: 200,
      unit: "Kişi",
    },
    duration: "Tam Gün",
    description:
      "Survivor tarzı orman parkuru. Engel setleri, halat köprüleri, kaya tırmanma ve macera istasyonları ile Mogan kıyısında eşsiz bir doğa deneyimi.",
    specifications: {
      features: [
        "Survivor tarzı engel parkuru",
        "Halat köprü & denge istasyonları",
        "Kaya tırmanma duvarı",
        "Lastik engel & tünel set",
        "Göl manzaralı final alanı",
      ],
    },
    suitable_programs: [
      "Survivor Turnuvası",
      "Takım Oyunları",
      "Liderlik Programları",
      "Okul Gezisi Paketleri",
      "Kamp Programları",
    ],
  },
  {
    id: "02",
    name: "Açık Engel Parkuru",
    category: "Spor Tesisi",
    featured: false,
    location: "Göl Kıyısı",
    environment: "Açık Alan",
    capacity: {
      min: 10,
      max: 200,
      unit: "Kişi",
    },
    description:
      "Göl kıyısında kurulu renkli engel parkuru. Tırmanma, denge ve takım çalışması bir arada.",
    specifications: {
      features: [
        "Renkli denge kirişleri",
        "Halka ve halat istasyonları",
        "Kaya tırmanma paneli",
        "Lastik labirent",
      ],
    },
    suitable_programs: [
      "Takım oyunları",
      "Survivor etkinlikleri",
      "Beden eğitimi dersleri",
      "Grup motivasyon programları",
    ],
  },
  {
    id: "03",
    name: "Outdoor Basketbol Sahası",
    category: "Spor Sahası",
    featured: false,
    location: "Göl Manzarası",
    environment: "Açık Alan",
    capacity: {
      min: 10,
      max: 40,
      unit: "Kişi",
    },
    description:
      "Profesyonel zemin kaplamalı açık basketbol sahası. Göl manzarası eşliğinde spor deneyimi.",
    specifications: {
      features: [
        "Profesyonel kauçuk zemin",
        "Resmi basketbol potası",
        "Kenar bank & dinlenme alanı",
        "Gece aydınlatması",
      ],
    },
    suitable_programs: [
      "Basketbol turnuvaları",
      "Beden eğitimi etkinlikleri",
      "Serbest spor saatleri",
    ],
  },
  {
    id: "04",
    name: "Plaj Futbol Sahası",
    category: "Plaj Sahası",
    featured: false,
    location: "Kumsal",
    environment: "Açık Alan",
    capacity: {
      min: 10,
      max: 60,
      unit: "Kişi",
    },
    description:
      "Mogan kıyısında doğal kumsal alanda plaj futbolu sahası. Turnuvalar ve takım aktiviteleri için.",
    specifications: {
      features: [
        "Doğal kum zemin",
        "Özel plaj futbol kaleleri",
        "Skor tabelası",
        "Soyunma & duş imkânı",
      ],
    },
    suitable_programs: ["Plaj Futbolu Atölyesi", "Strateji Hamleleri", "Okul spor şenlikleri"],
  },
  {
    id: "05",
    name: "Plaj Voleybol Sahası",
    category: "Plaj Sahası",
    featured: false,
    location: "Kumsal",
    environment: "Açık Alan",
    capacity: {
      min: 8,
      max: 60,
      unit: "Kişi",
    },
    description:
      "Göl kenarında kum voleybol sahası. Resmi fileli, turnuva için özel donatılmış alan.",
    specifications: {
      features: ["Resmi voleybol filesi", "Doğal kum zemin", "Takım bankları", "Ekipman deposu"],
    },
    suitable_programs: [
      "Plaj Voleybolu Atölyesi",
      "Spor şenlikleri",
      "Takım oluşturma etkinlikleri",
    ],
  },
  {
    id: "06",
    name: "Human Foosball Alanı",
    category: "Eğlence Alanı",
    featured: false,
    location: "Açık Saha",
    environment: "Açık Alan",
    capacity: {
      min: 10,
      max: 50,
      unit: "Kişi",
    },
    description:
      "Canlı langırt! Köpüklü çubuklara tutunarak birlikte hareket. Koordinasyon ve kahkaha garantili.",
    specifications: {
      features: [
        "Şişme alan yapısı",
        "Köpüklü güvenlik çubukları",
        "Kum zemin",
        "Uzman animatör desteği",
      ],
    },
    suitable_programs: ["Takım oyunları", "Kısa mola aktiviteleri", "Okul gezisi paketleri"],
  },
  {
    id: "07",
    name: "Masal & Atölye Sınıfı",
    category: "İç Mekan",
    featured: false,
    location: "Kapalı Alan",
    environment: "Kapalı",
    capacity: {
      min: 10,
      max: 30,
      unit: "Kişi",
    },
    description:
      "Drama, yaratıcı yazma ve edebi atölyeler için tematik dekore edilmiş kapalı öğrenme alanı.",
    specifications: {
      features: [
        "Tematik dekorasyon & kostümler",
        "Kütüphane & kaynaklar",
        "Yazı tahtası & sunum ekipmanı",
        "Hava koşullarına bağımsız",
      ],
    },
    suitable_programs: [
      "Alice Harikalar Diyarında",
      "Küçük Prens",
      "Yaratıcı Yazma",
      "Drama",
      "Felsefe atölyeleri",
    ],
  },
  {
    id: "08",
    name: "Futbol Sahası",
    category: "Spor Sahası",
    featured: false,
    location: "Açık Alan",
    environment: "Açık Alan",
    capacity: {
      min: 20,
      max: 100,
      unit: "Kişi",
    },
    description:
      "Doğal çim kaplamalı tam ölçekli futbol sahası. Resmi maçlar ve Survivor finalleri için ideal.",
    specifications: {
      features: [
        "Doğal çim zemin",
        "Resmi kale & çizgiler",
        "Soyunma odaları",
        "Tribün & seyirci alanı",
      ],
    },
    suitable_programs: [
      "Futbol turnuvaları",
      "Survivor kapanış etkinlikleri",
      "Okul spor şenlikleri",
    ],
  },
  {
    id: "09",
    name: "Açık Öğrenme Alanları",
    category: "Eğitim Alanı",
    featured: false,
    location: "Doğa İçinde",
    environment: "Açık Alan",
    capacity: {
      min: 10,
      max: 80,
      unit: "Kişi",
    },
    description:
      "Çardak sınıfı, orman zemini, göl kıyısı platformu ve çimenlik ders alanı — 4 konfigürasyon.",
    specifications: {
      configurations: 4,
      features: [
        "Çardak sınıf (gölgeli)",
        "Orman tahtı oturma grubu",
        "Göl kıyısı platform alanı",
        "Doğal çimenlik açık sınıf",
      ],
    },
    suitable_programs: [
      "Tüm atölye programları",
      "LGS hazırlık kampı",
      "Doğa yürüyüşü molaları",
      "Grup tartışmaları",
    ],
  },
];

const careerPrograms = [
  {
    id: "01",
    name: "MOGAN HACKATHON",
    category: "Teknoloji",
    description:
      "48 saatlik yoğun proje geliştirme maratonu. Takımlar gerçek dünya problemlerine çözüm üretir, jüri önünde sunar.",
    specifications: {
      duration: "2 Gün",
      capacity: {
        min: 12,
        max: 80,
        unit: "Kişi",
      },
      format: "Takım bazlı proje geliştirme",
      outcome: "Jüri önünde sunum",
    },
  },
  {
    id: "02",
    name: "UZMAN SÖYLEŞİLERİ",
    category: "Kariyer",
    description:
      "Sektörün önde gelen isimleri kampüse gelerek deneyimlerini ve kariyer yolculuklarını öğrencilerle paylaşır.",
    specifications: {
      duration: "Haftalık",
      capacity: {
        min: 20,
        max: 120,
        unit: "Kişi",
      },
      format: "Konuşmacı / söyleşi",
      frequency: "Haftalık",
    },
  },
  {
    id: "03",
    name: "YILDIZ GÖZLEMİ",
    category: "Gece",
    description:
      "Işık kirliliğinden uzak Mogan gökyüzünde teleskopla gezegen ve yıldız gözlemi. Astronomi uzmanı rehberliğinde.",
    specifications: {
      duration: "Akşam",
      capacity: {
        min: 10,
        max: 60,
        unit: "Kişi",
      },
      format: "Gözlem & rehberlik",
      equipment: "Teleskop",
      guide: "Astronomi uzmanı",
    },
  },
  {
    id: "04",
    name: "GÖL KENARI YOGA",
    category: "Wellness",
    description:
      "Sabah erken saatlerde göl manzarasında zihin açıcı yoga ve meditasyon seansları. Güne enerjik ve odaklı başlamak için.",
    specifications: {
      duration: "1.5 Saat",
      capacity: {
        min: 10,
        max: 50,
        unit: "Kişi",
      },
      format: "Yoga & meditasyon",
      time_of_day: "Sabah erken saatler",
      location: "Göl kenarı",
    },
  },
  {
    id: "05",
    name: "DEMO DAY",
    category: "Teknoloji",
    description:
      "Öğrencilerin hafta boyunca geliştirdikleri projeleri tüm kampüse sunduğu heyecanlı gösteri günü. Geri bildirim ve kutlama.",
    specifications: {
      duration: "Haftalık",
      capacity: "Tüm Kampüs",
      format: "Proje sunumu & geri bildirim",
      frequency: "Haftalık",
    },
  },
  {
    id: "06",
    name: "MEZUNİYET TÖRENİ",
    category: "Sosyal",
    description:
      "Sezon boyunca geliştirilen projelerin sergilendiği, sertifikaların verildiği ve anıların paylaşıldığı özel kapanış töreni.",
    specifications: {
      duration: "Sezon Sonu",
      capacity: "Tüm Kampüs",
      format: "Tören & sergi",
      includes: ["Proje sergisi", "Sertifika dağıtımı", "Anı paylaşımı"],
    },
  },
  {
    id: "07",
    name: "ROBOTİK ATÖLYE",
    category: "Teknoloji",
    description:
      "Arduino ve Lego Mindstorms ile robot tasarımı ve programlama. Temel elektronik ve mühendislik kavramlarına giriş.",
    specifications: {
      duration: "Yarım Gün",
      capacity: {
        min: 10,
        max: 40,
        unit: "Kişi",
      },
      format: "Hands-on atölye",
      tools: ["Arduino", "Lego Mindstorms"],
      topics: ["Robot tasarımı", "Programlama", "Temel elektronik", "Mühendislik kavramları"],
    },
  },
  {
    id: "08",
    name: "TASARIM DÜŞÜNCE",
    category: "Yaratıcılık",
    description:
      "Empati haritası, prototipleme ve test aşamalarıyla gerçek problemlere yaratıcı çözümler üretme atölyesi.",
    specifications: {
      duration: "Tam Gün",
      capacity: {
        min: 15,
        max: 60,
        unit: "Kişi",
      },
      format: "Design Thinking atölyesi",
      methodology: ["Empati haritası", "Prototipleme", "Test aşamaları"],
      focus: "Gerçek problemlere yaratıcı çözümler",
    },
  },
  {
    id: "09",
    name: "KODLAMA BOOTCAMP",
    category: "Akademik",
    description:
      "Python, web geliştirme ve yapay zeka temelleri. Başlangıç seviyesinden ileri seviyeye yoğun programlama kampı.",
    specifications: {
      duration: "3–5 Gün",
      capacity: {
        min: 15,
        max: 45,
        unit: "Kişi",
      },
      format: "Yoğun kamp",
      topics: ["Python", "Web geliştirme", "Yapay zeka temelleri"],
      levels: "Başlangıç → İleri seviye",
    },
  },
  {
    id: "10",
    name: "MENTORLUK PROGRAMI",
    category: "Liderlik",
    description:
      "Sektör profesyonelleriyle birebir mentorluk seansları. Kariyer hedefleri belirleme ve yol haritası oluşturma.",
    specifications: {
      duration: "Sezon Boyunca",
      capacity: {
        min: 5,
        max: 20,
        unit: "Kişi",
      },
      format: "Birebir mentorluk",
      mentors: "Sektör profesyonelleri",
      focus: ["Kariyer hedefleri belirleme", "Yol haritası oluşturma"],
    },
  },
  {
    id: "11",
    name: "TAKIM KOÇLUĞU",
    category: "Takım",
    description:
      "Takım dinamikleri, çatışma yönetimi ve iletişim becerileri üzerine atölye. Lider yetiştiren bir program.",
    specifications: {
      duration: "1 Gün",
      capacity: {
        min: 10,
        max: 50,
        unit: "Kişi",
      },
      format: "Atölye",
      topics: ["Takım dinamikleri", "Çatışma yönetimi", "İletişim becerileri"],
      outcome: "Lider yetiştirme",
    },
  },
  {
    id: "12",
    name: "SUNUM & İLETİŞİM",
    category: "Sunum",
    description:
      "Etkili sunum teknikleri, beden dili ve ikna sanatı. Fikirlerini güçlü şekilde ifade etmeyi öğren.",
    specifications: {
      duration: "1 Gün",
      capacity: {
        min: 10,
        max: 40,
        unit: "Kişi",
      },
      format: "Atölye",
      topics: ["Etkili sunum teknikleri", "Beden dili", "İkna sanatı"],
      outcome: "Fikirleri güçlü ifade etme",
    },
  },
];

const workshops = [
  {
    id: "01",
    name: "Alice Harikalar Diyarında",
    category: "Edebiyat & Dil",
    target_age: "8–12 yaş",
    duration: "2 Saat",
    capacity: { min: 15, max: 30, unit: "Kişi" },
    description:
      "Lewis Carroll'ın klasik eseri üzerinden yaratıcı drama, karakter analizi ve hayal gücü çalışması. Öğrenciler eserdeki karakterlere bürünerek hikayeyi yeniden canlandırır.",
    specifications: {
      activities: [
        "Yaratıcı drama",
        "Karakter analizi",
        "Hayal gücü çalışması",
        "Hikaye canlandırma",
      ],
      curriculum_link: "Türkçe / Edebiyat",
      environment: "Kapalı (Masal Sınıfı)",
    },
  },
  {
    id: "02",
    name: "Küçük Prens",
    category: "Edebiyat & Dil",
    target_age: "10–14 yaş",
    duration: "2 Saat",
    capacity: { min: 15, max: 30, unit: "Kişi" },
    description:
      "Saint-Exupéry'nin başyapıtı üzerinden felsefe, dostluk ve sorumluluk kavramları. Tartışma ve yaratıcı yazma etkinlikleri.",
    specifications: {
      activities: ["Felsefi tartışma", "Yaratıcı yazma", "Kavram çalışması"],
      curriculum_link: "Türkçe / Felsefe",
      environment: "Kapalı (Masal Sınıfı)",
    },
  },
  {
    id: "03",
    name: "Yaratıcı Yazarlık",
    category: "Edebiyat & Dil",
    target_age: "10–16 yaş",
    duration: "2.5 Saat",
    capacity: { min: 10, max: 25, unit: "Kişi" },
    description:
      "Hikaye kurgusu, karakter yaratma ve diyalog yazımı teknikleri. Öğrenciler kendi kısa hikayelerini yazar ve paylaşır.",
    specifications: {
      activities: ["Hikaye kurgusu", "Karakter yaratma", "Diyalog yazımı", "Kısa hikaye yazma"],
      curriculum_link: "Türkçe / Yazma Becerileri",
      environment: "Kapalı / Açık",
    },
  },
  {
    id: "04",
    name: "Şiir Atölyesi",
    category: "Edebiyat & Dil",
    target_age: "12–18 yaş",
    duration: "2 Saat",
    capacity: { min: 10, max: 25, unit: "Kişi" },
    description:
      "Şiir türleri, kafiye ve ritim çalışmaları. Doğadan ilham alarak özgün şiirler üretme.",
    specifications: {
      activities: ["Şiir türleri inceleme", "Kafiye & ritim çalışması", "Doğadan ilham yazımı"],
      curriculum_link: "Türkçe / Edebiyat",
      environment: "Açık Alan (Göl Kenarı)",
    },
  },
  {
    id: "05",
    name: "Münazara & Tartışma",
    category: "Edebiyat & Dil",
    target_age: "12–18 yaş",
    duration: "2 Saat",
    capacity: { min: 12, max: 40, unit: "Kişi" },
    description:
      "Argüman geliştirme, karşı argüman oluşturma ve etkili konuşma teknikleri. Takım halinde münazara pratiği.",
    specifications: {
      activities: [
        "Argüman geliştirme",
        "Karşı argüman oluşturma",
        "Etkili konuşma",
        "Takım münazarası",
      ],
      curriculum_link: "Türkçe / İletişim",
      environment: "Kapalı / Açık",
    },
  },
  {
    id: "06",
    name: "Matematik Dedektifleri",
    category: "Matematik & Mantık",
    target_age: "8–12 yaş",
    duration: "2 Saat",
    capacity: { min: 15, max: 30, unit: "Kişi" },
    description:
      "İpuçlarıyla matematik bulmacaları çözme. Sayılar, örüntüler ve temel geometri problemlerini dedektif hikayesi formatında keşfetme.",
    specifications: {
      activities: [
        "Matematik bulmacaları",
        "Örüntü keşfi",
        "Geometri problemleri",
        "Dedektif senaryoları",
      ],
      curriculum_link: "Matematik",
      environment: "Kapalı / Açık",
    },
  },
  {
    id: "07",
    name: "Strateji Hamleleri",
    category: "Matematik & Mantık",
    target_age: "10–16 yaş",
    duration: "2.5 Saat",
    capacity: { min: 10, max: 30, unit: "Kişi" },
    description:
      "Satranç, mangala ve stratejik kart oyunlarıyla eleştirel düşünme ve ileri planlama becerisi geliştirme.",
    specifications: {
      activities: ["Satranç", "Mangala", "Stratejik kart oyunları", "Eleştirel düşünme"],
      curriculum_link: "Matematik / Mantık",
      environment: "Kapalı / Açık",
    },
  },
  {
    id: "08",
    name: "Kodlama & Algoritma",
    category: "Matematik & Mantık",
    target_age: "10–16 yaş",
    duration: "3 Saat",
    capacity: { min: 10, max: 25, unit: "Kişi" },
    description:
      "Blok tabanlı ve metin tabanlı kodlama ile algoritmik düşünme. Scratch, Python temelleri ve problem çözme.",
    specifications: {
      activities: [
        "Blok tabanlı kodlama",
        "Metin tabanlı kodlama",
        "Algoritmik düşünme",
        "Problem çözme",
      ],
      tools: ["Scratch", "Python"],
      curriculum_link: "Bilişim Teknolojileri / Matematik",
      environment: "Kapalı",
    },
  },
  {
    id: "09",
    name: "Finansal Okuryazarlık",
    category: "Matematik & Mantık",
    target_age: "12–18 yaş",
    duration: "2.5 Saat",
    capacity: { min: 15, max: 35, unit: "Kişi" },
    description:
      "Bütçe planlama, tasarruf, yatırım temelleri ve girişimcilik kavramları. Simülasyonlarla finansal karar alma.",
    specifications: {
      activities: [
        "Bütçe planlama",
        "Tasarruf stratejileri",
        "Yatırım temelleri",
        "Girişimcilik",
        "Finansal simülasyonlar",
      ],
      curriculum_link: "Matematik / Sosyal Bilgiler",
      environment: "Kapalı",
    },
  },
  {
    id: "10",
    name: "Geometri & Origami",
    category: "Matematik & Mantık",
    target_age: "8–14 yaş",
    duration: "2 Saat",
    capacity: { min: 10, max: 30, unit: "Kişi" },
    description:
      "Kağıt katlama sanatı ile geometrik şekiller, simetri ve uzamsal düşünme becerisi. Eğlenceli ve somut matematik deneyimi.",
    specifications: {
      activities: ["Origami", "Geometrik şekil oluşturma", "Simetri çalışması", "Uzamsal düşünme"],
      curriculum_link: "Matematik / Geometri",
      environment: "Kapalı / Açık",
    },
  },
  {
    id: "11",
    name: "Doğa Kaşifi",
    category: "Fen & Doğa",
    target_age: "5–10 yaş",
    duration: "2.5 Saat",
    capacity: { min: 15, max: 30, unit: "Kişi" },
    description:
      "Bitki ve böcek gözlemi, toprak analizi ve ekosistem keşfi. Doğadaki canlıları tanıma ve sınıflandırma.",
    specifications: {
      activities: [
        "Bitki gözlemi",
        "Böcek gözlemi",
        "Toprak analizi",
        "Ekosistem keşfi",
        "Sınıflandırma",
      ],
      curriculum_link: "Fen Bilimleri / Hayat Bilgisi",
      environment: "Açık Alan (Orman & Göl)",
    },
  },
  {
    id: "12",
    name: "Deney Laboratuvarı",
    category: "Fen & Doğa",
    target_age: "8–14 yaş",
    duration: "2.5 Saat",
    capacity: { min: 10, max: 25, unit: "Kişi" },
    description:
      "Kimyasal reaksiyonlar, fizik deneyleri ve biyoloji gözlemleri. Güvenli ortamda bilimsel yöntem uygulama.",
    specifications: {
      activities: [
        "Kimyasal reaksiyonlar",
        "Fizik deneyleri",
        "Biyoloji gözlemleri",
        "Bilimsel yöntem uygulama",
      ],
      curriculum_link: "Fen Bilimleri",
      environment: "Kapalı (Laboratuvar)",
    },
  },
  {
    id: "13",
    name: "Astronomi & Uzay",
    category: "Fen & Doğa",
    target_age: "10–16 yaş",
    duration: "2.5 Saat",
    capacity: { min: 10, max: 40, unit: "Kişi" },
    description:
      "Güneş sistemi, yıldızlar ve uzay araştırmaları. Teleskop gözlemi ve model roket yapımı.",
    specifications: {
      activities: [
        "Güneş sistemi çalışması",
        "Yıldız gözlemi",
        "Teleskop kullanımı",
        "Model roket yapımı",
      ],
      equipment: ["Teleskop", "Model roket kiti"],
      curriculum_link: "Fen Bilimleri / Fizik",
      environment: "Açık Alan (Gece & Gündüz)",
    },
  },
  {
    id: "14",
    name: "Sürdürülebilir Yaşam",
    category: "Fen & Doğa",
    target_age: "10–16 yaş",
    duration: "2.5 Saat",
    capacity: { min: 15, max: 35, unit: "Kişi" },
    description:
      "Geri dönüşüm, enerji tasarrufu, su döngüsü ve ekolojik ayak izi kavramları. Çevre bilinci oluşturma.",
    specifications: {
      activities: [
        "Geri dönüşüm uygulamaları",
        "Enerji tasarrufu",
        "Su döngüsü",
        "Ekolojik ayak izi hesaplama",
      ],
      curriculum_link: "Fen Bilimleri / Çevre",
      environment: "Açık / Kapalı",
    },
  },
  {
    id: "15",
    name: "Tarım & Bahçecilik",
    category: "Fen & Doğa",
    target_age: "5–12 yaş",
    duration: "2 Saat",
    capacity: { min: 10, max: 30, unit: "Kişi" },
    description:
      "Tohum ekme, bitki bakımı ve hasat deneyimi. Topraktan sofraya sürecin keşfi ve doğa sevgisi.",
    specifications: {
      activities: ["Tohum ekme", "Bitki bakımı", "Hasat deneyimi", "Doğa sevgisi"],
      curriculum_link: "Hayat Bilgisi / Fen Bilimleri",
      environment: "Açık Alan (Bahçe)",
    },
  },
  {
    id: "16",
    name: "Resim & Doğa Boyama",
    category: "Sanat & Tasarım",
    target_age: "5–14 yaş",
    duration: "2 Saat",
    capacity: { min: 10, max: 30, unit: "Kişi" },
    description:
      "Göl manzarası eşliğinde açık havada resim yapma. Suluboya, akrilik ve pastel boya teknikleri.",
    specifications: {
      activities: ["Açık hava resmi", "Suluboya", "Akrilik boya", "Pastel boya"],
      curriculum_link: "Görsel Sanatlar",
      environment: "Açık Alan (Göl Kenarı)",
    },
  },
  {
    id: "17",
    name: "El Sanatları & Seramik",
    category: "Sanat & Tasarım",
    target_age: "8–16 yaş",
    duration: "2.5 Saat",
    capacity: { min: 10, max: 25, unit: "Kişi" },
    description:
      "Kil şekillendirme, seramik boyama ve geleneksel el sanatları. Üç boyutlu düşünme ve motor beceri geliştirme.",
    specifications: {
      activities: ["Kil şekillendirme", "Seramik boyama", "Geleneksel el sanatları", "3D düşünme"],
      curriculum_link: "Görsel Sanatlar / Teknoloji Tasarım",
      environment: "Kapalı (Atölye)",
    },
  },
  {
    id: "18",
    name: "Müzik & Ritim",
    category: "Sanat & Tasarım",
    target_age: "5–14 yaş",
    duration: "2 Saat",
    capacity: { min: 10, max: 30, unit: "Kişi" },
    description:
      "Perküsyon çalgılar, ritim kalıpları ve grup müziği. Doğadan seslerle kompozisyon oluşturma.",
    specifications: {
      activities: ["Perküsyon", "Ritim kalıpları", "Grup müziği", "Doğa sesleri kompozisyonu"],
      curriculum_link: "Müzik",
      environment: "Açık / Kapalı",
    },
  },
  {
    id: "19",
    name: "Fotoğrafçılık",
    category: "Sanat & Tasarım",
    target_age: "12–18 yaş",
    duration: "3 Saat",
    capacity: { min: 10, max: 20, unit: "Kişi" },
    description:
      "Kompozisyon, ışık kullanımı ve doğa fotoğrafçılığı. Kampüs çevresinde çekim pratiği ve portfolyo oluşturma.",
    specifications: {
      activities: ["Kompozisyon", "Işık kullanımı", "Doğa fotoğrafçılığı", "Portfolyo oluşturma"],
      curriculum_link: "Görsel Sanatlar / Teknoloji",
      environment: "Açık Alan (Kampüs Geneli)",
    },
  },
  {
    id: "20",
    name: "Tiyatro & Drama",
    category: "Sanat & Tasarım",
    target_age: "8–16 yaş",
    duration: "2.5 Saat",
    capacity: { min: 12, max: 35, unit: "Kişi" },
    description:
      "Doğaçlama, sahne teknikleri ve karakter çalışması. Özgüven geliştirme ve ifade becerileri.",
    specifications: {
      activities: ["Doğaçlama", "Sahne teknikleri", "Karakter çalışması", "Özgüven geliştirme"],
      curriculum_link: "Türkçe / Görsel Sanatlar",
      environment: "Kapalı / Açık Sahne",
    },
  },
  {
    id: "21",
    name: "Survivor Parkuru",
    category: "Spor & Hareket",
    target_age: "8–16 yaş",
    duration: "2.5 Saat",
    capacity: { min: 20, max: 60, unit: "Kişi" },
    description:
      "Engel parkuru, halat köprüler ve takım yarışları. Fiziksel dayanıklılık, cesaretlilik ve takım ruhu.",
    specifications: {
      activities: ["Engel parkuru", "Halat köprüler", "Takım yarışları", "Fiziksel dayanıklılık"],
      curriculum_link: "Beden Eğitimi",
      environment: "Açık Alan (Adventure Park)",
    },
  },
  {
    id: "22",
    name: "Okçuluk",
    category: "Spor & Hareket",
    target_age: "10–18 yaş",
    duration: "2 Saat",
    capacity: { min: 10, max: 30, unit: "Kişi" },
    description:
      "Temel okçuluk teknikleri, odaklanma ve hedef atışı. Güvenli ekipman ve uzman eğitmen eşliğinde.",
    specifications: {
      activities: ["Okçuluk teknikleri", "Odaklanma", "Hedef atışı"],
      equipment: ["Güvenli yay", "Ok", "Hedef tahtası"],
      curriculum_link: "Beden Eğitimi",
      environment: "Açık Alan",
    },
  },
  {
    id: "23",
    name: "Doğa Yürüyüşü",
    category: "Spor & Hareket",
    target_age: "5–18 yaş",
    duration: "2–3 Saat",
    capacity: { min: 15, max: 60, unit: "Kişi" },
    description:
      "Mogan Gölü çevresinde rehberli doğa yürüyüşü. Flora-fauna gözlemi ve pusula kullanımı.",
    specifications: {
      activities: ["Rehberli yürüyüş", "Flora-fauna gözlemi", "Pusula kullanımı"],
      curriculum_link: "Beden Eğitimi / Fen Bilimleri",
      environment: "Açık Alan (Göl Çevresi)",
    },
  },
  {
    id: "24",
    name: "Plaj Sporları",
    category: "Spor & Hareket",
    target_age: "8–18 yaş",
    duration: "2.5 Saat",
    capacity: { min: 10, max: 60, unit: "Kişi" },
    description:
      "Plaj voleybolu, plaj futbolu ve kumda takım oyunları. Spor, eğlence ve takım çalışması bir arada.",
    specifications: {
      activities: ["Plaj voleybolu", "Plaj futbolu", "Kumda takım oyunları"],
      curriculum_link: "Beden Eğitimi",
      environment: "Açık Alan (Kumsal)",
    },
  },
  {
    id: "25",
    name: "Geleneksel Çocuk Oyunları",
    category: "Spor & Hareket",
    target_age: "5–12 yaş",
    duration: "2 Saat",
    capacity: { min: 15, max: 50, unit: "Kişi" },
    description:
      "Yakan top, mendil kapmaca, istop ve uzun eşek gibi geleneksel Türk çocuk oyunları. Kültürel miras ve hareket.",
    specifications: {
      activities: ["Yakan top", "Mendil kapmaca", "İstop", "Uzun eşek"],
      curriculum_link: "Beden Eğitimi / Kültür",
      environment: "Açık Alan",
    },
  },
  {
    id: "26",
    name: "Satranç Turnuvası",
    category: "Strateji & Zeka Oyunları",
    target_age: "8–18 yaş",
    duration: "3 Saat",
    capacity: { min: 16, max: 64, unit: "Kişi" },
    description:
      "Farklı seviyelerde satranç turnuvası. Açılış stratejileri, taktik problemler ve zaman yönetimi.",
    specifications: {
      activities: [
        "Satranç turnuvası",
        "Açılış stratejileri",
        "Taktik problemler",
        "Zaman yönetimi",
      ],
      curriculum_link: "Matematik / Mantık",
      environment: "Kapalı / Açık",
    },
  },
  {
    id: "27",
    name: "Mangala & Geleneksel Oyunlar",
    category: "Strateji & Zeka Oyunları",
    target_age: "8–16 yaş",
    duration: "2 Saat",
    capacity: { min: 10, max: 40, unit: "Kişi" },
    description:
      "Mangala, 9 taş ve diğer Türk zeka oyunları. Stratejik düşünme ve kültürel miras bir arada.",
    specifications: {
      activities: ["Mangala", "9 taş", "Türk zeka oyunları", "Stratejik düşünme"],
      curriculum_link: "Matematik / Kültür",
      environment: "Kapalı / Açık",
    },
  },
  {
    id: "28",
    name: "Escape Room",
    category: "Strateji & Zeka Oyunları",
    target_age: "10–18 yaş",
    duration: "1.5 Saat",
    capacity: { min: 4, max: 20, unit: "Kişi" },
    description:
      "Tematik kaçış odaları. İpuçlarını çöz, bulmacaları tamamla ve süre bitmeden odadan çık. Takım çalışması ve mantık.",
    specifications: {
      activities: ["İpucu çözme", "Bulmaca tamamlama", "Takım çalışması", "Mantık egzersizi"],
      curriculum_link: "Matematik / Mantık",
      environment: "Kapalı (Tematik Oda)",
    },
  },
  {
    id: "29",
    name: "Hazine Avı",
    category: "Strateji & Zeka Oyunları",
    target_age: "5–14 yaş",
    duration: "2 Saat",
    capacity: { min: 15, max: 60, unit: "Kişi" },
    description:
      "Kampüs genelinde ipuçlarıyla hazine arama. Harita okuma, yön bulma ve problem çözme becerileri.",
    specifications: {
      activities: ["Hazine arama", "Harita okuma", "Yön bulma", "Problem çözme"],
      curriculum_link: "Sosyal Bilgiler / Matematik",
      environment: "Açık Alan (Kampüs Geneli)",
    },
  },
  {
    id: "30",
    name: "Akıl & Zeka Oyunları",
    category: "Strateji & Zeka Oyunları",
    target_age: "6–16 yaş",
    duration: "2 Saat",
    capacity: { min: 10, max: 30, unit: "Kişi" },
    description:
      "Tangram, sudoku, hafıza oyunları ve mantık bulmacaları. Zihinsel esneklik ve analitik düşünme geliştirme.",
    specifications: {
      activities: ["Tangram", "Sudoku", "Hafıza oyunları", "Mantık bulmacaları"],
      curriculum_link: "Matematik / Mantık",
      environment: "Kapalı / Açık",
    },
  },
];

function slugify(value) {
  const replacements = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
  };

  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (character) => replacements[character])
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toVenue(facility) {
  const capacity = `${facility.capacity.min}-${facility.capacity.max} ${facility.capacity.unit}`;

  return {
    ...facility,
    slug: slugify(facility.name),
    grades: `${facility.environment} · ${facility.location}`,
    img: "",
    text: facility.description,
    summary: [facility.category, capacity, facility.duration].filter(Boolean).join(" · "),
    detailTitle: facility.name,
    detailBody: facility.description,
    features: facility.specifications.features,
    gallery: [],
    ctaLabel: "Ziyaret Bilgisi Al",
  };
}

function formatCapacity(capacity) {
  if (typeof capacity === "string") return capacity;
  return `${capacity.min}-${capacity.max} ${capacity.unit}`;
}

function toWorkshop(program) {
  const { duration, capacity, ...highlights } = program.specifications;

  return {
    ...program,
    slug: slugify(program.name),
    title: program.name,
    text: program.description,
    summary: program.category,
    detailTitle: program.name,
    detailBody: program.description,
    skills: Object.values(highlights).flat(),
    duration,
    capacity: formatCapacity(capacity),
    img: "",
    gallery: [],
    ctaLabel: "Katılım Bilgisi Al",
  };
}

function toProgram(workshop) {
  return {
    ...workshop,
    n: workshop.id,
    slug: slugify(workshop.name),
    title: workshop.name,
    img: "",
    quote: workshop.category,
    text: workshop.description,
    summary: [workshop.category, workshop.target_age, workshop.duration].join(" · "),
    detailTitle: workshop.name,
    detailBody: workshop.description,
    outcomes: workshop.specifications.activities,
    ageRange: workshop.target_age,
    duration: workshop.duration,
    gallery: [],
    ctaLabel: "Katılım Bilgisi Al",
  };
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
    eyebrow: "Atölyeler",
    headline: "30+ atölye. Altı öğrenme alanı.",
    items: workshops.map(toProgram),
  },
  programsPage: {
    eyebrow: "Atölyeler",
    headline: "Sınıfların ötesinde öğrenme deneyimi.",
    intro:
      "Her atölye, müfredatla bağlantılı olarak tasarlanmış olup öğrencilerin yaparak-yaşayarak öğrenmesini sağlar.",
    ctaLabel: "Atölye İçin İletişime Geç",
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
    eyebrow: "Kariyer Programları",
    headline: "12 program. Geleceğe hazırlık.",
    items: careerPrograms.map(toWorkshop),
  },
  workshopsPage: {
    eyebrow: "Kariyer Programları",
    headline: "Atölye ve kariyer programlarıyla geleceğe hazırlık.",
    intro:
      "Öğrencilerin okul dışı zamanlarını ulusal ve uluslararası kariyerleri bakımından değerli kılan programlar.",
    ctaLabel: "Program İçin İletişime Geç",
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
    items: facilities.map(toVenue),
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
