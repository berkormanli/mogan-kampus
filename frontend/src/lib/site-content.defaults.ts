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

export type ScheduleSlot = {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  isLunch?: boolean;
  isConstant?: boolean;
};

export type YazOkuluLevel = {
  slug: string;
  level: string;
  ageRange: string;
  intro: string;
  weeks: ScheduleSlot[][];
  campNote: string;
  ctaLabel?: string;
};

export type EducereAtolye = {
  slug?: string;
  title: string;
  category: string;
  description: string;
  highlights?: string[];
  duration?: string;
  environment?: string;
  note?: string;
  img?: ImageValue;
  imgAlt?: string;
  ctaLabel?: string;
};

export type OkulGezisi = {
  slug?: string;
  title: string;
  summary: string;
  detailBody?: string;
  duration?: string;
  capacity?: string;
  img?: ImageValue;
  ctaLabel?: string;
};

export type Etkinlik = {
  slug?: string;
  title: string;
  summary: string;
  detailBody?: string;
  date?: string;
  img?: ImageValue;
  ctaLabel?: string;
};

export type DeployStatus = "idle" | "pending" | "success" | "failed";

export type DeployConfig = {
  enabled: boolean;
  webhookUrl: string;
  webhookUrlNote: string;
  lastDeployAt: string;
  lastDeployStatus: DeployStatus;
  lastDeployMessage: string;
  lastDeployTrigger: string;
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
    campLabel: string;
    links: { label: string; to: string }[];
  };
  hero: {
    eyebrow: string;
    headlineBefore: string;
    headlineAccent: string;
    headlineAfter: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
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
  yazOkulu: {
    eyebrow: string;
    headline: string;
    intro: string;
    weekLabel: string;
    dailyNote: string;
    ctaLabel: string;
    levels: YazOkuluLevel[];
  };
  educereAtolyeleri: {
    eyebrow: string;
    headline: string;
    intro: string;
    ctaLabel: string;
    items: EducereAtolye[];
  };
  okulGezileri: {
    eyebrow: string;
    headline: string;
    intro: string;
    ctaLabel: string;
    items: OkulGezisi[];
  };
  etkinlikler: {
    eyebrow: string;
    headline: string;
    intro: string;
    ctaLabel: string;
    items: Etkinlik[];
  };
  deployConfig: DeployConfig;
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

const okulOncesiHafta1: ScheduleSlot[] = [
  { time: "09:00 - 10:00", monday: "ENGLISH TIME", tuesday: "MİMARLİK VE TASARIM", wednesday: "FUN SCIENCE", thursday: "BÖCEK BİLİM", friday: "ENGLISH TIME" },
  { time: "10:00 - 11:30", monday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", tuesday: "HAVACILIK OKULU", wednesday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", thursday: "ARKEOLOJİNİN GİZEMİ", friday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA" },
  { time: "11:40 - 12:20", monday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", tuesday: "GELENEKSEL HARİKA SANATLAR", wednesday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", thursday: "FİMO SERAMİK ATÖLYESİ", friday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI" },
  { time: "12:20 - 13:00", monday: "ÖĞLE YEMEĞİ", tuesday: "ÖĞLE YEMEĞİ", wednesday: "ÖĞLE YEMEĞİ", thursday: "ÖĞLE YEMEĞİ", friday: "ÖĞLE YEMEĞİ", isLunch: true },
  { time: "13:00 - 14:00", monday: "DOĞA VE YAŞAM BECERİLERİ", tuesday: "CİMNASTİK", wednesday: "ÇOCUK YOGASI", thursday: "DOĞA VE YAŞAM BECERİLERİ", friday: "TİYATRO SPORU" },
  { time: "14:10 - 15:10", monday: "VOLEYBOL", tuesday: "DOĞA VE YAŞAM BECERİLERİ", wednesday: "PONNY BİNİCİLİK SAATİ", thursday: "CİMNASTİK", friday: "ÇOCUK YOGASI" },
  { time: "15:20 - 16:20", monday: "YÜZME", tuesday: "BASKETBOL", wednesday: "TİYATRO SPORU", thursday: "BASKETBOL", friday: "YÜZME" },
  { time: "16:30 - 17:30", monday: "ÇOCUK YOGASI", tuesday: "TİYATRO SPORU", wednesday: "GELENEKSEL OYUNLAR", thursday: "TİYATRO SPORU", friday: "GELENEKSEL OYUNLAR" },
  { time: "17:30 - 18:30", monday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", tuesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", wednesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", thursday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", friday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", isConstant: true },
];

const okulOncesiHafta2: ScheduleSlot[] = [
  { time: "09:00 - 10:00", monday: "ENGLISH TIME", tuesday: "AHŞAP ATÖLYESİ", wednesday: "ARAŞTIRMA", thursday: "KUKLA KARAGÖZ", friday: "ENGLISH TIME" },
  { time: "10:00 - 11:30", monday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", tuesday: "LEGO WORLD", wednesday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", thursday: "TOPRAK BİLİM VE AGRO KÜLTÜR", friday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA" },
  { time: "11:40 - 12:20", monday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", tuesday: "GELENEKSEL HARİKA SANATLAR", wednesday: "İNCELEME MÜZE", thursday: "FİMO SERAMİK ATÖLYESİ", friday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI" },
  { time: "12:20 - 13:00", monday: "ÖĞLE YEMEĞİ", tuesday: "ÖĞLE YEMEĞİ", wednesday: "ÖĞLE YEMEĞİ", thursday: "ÖĞLE YEMEĞİ", friday: "ÖĞLE YEMEĞİ", isLunch: true },
  { time: "13:00 - 14:00", monday: "DOĞA VE YAŞAM BECERİLERİ", tuesday: "CİMNASTİK", wednesday: "DOĞA VE YAŞAM BECERİLERİ", thursday: "DOĞA VE YAŞAM BECERİLERİ", friday: "TİYATRO SPORU" },
  { time: "14:10 - 15:10", monday: "VOLEYBOL", tuesday: "DOĞA VE YAŞAM BECERİLERİ", wednesday: "MACERA GEZİLERİ", thursday: "CİMNASTİK", friday: "ÇOCUK YOGASI" },
  { time: "15:20 - 16:20", monday: "YÜZME", tuesday: "BASKETBOL", wednesday: "ARAŞTIRMA", thursday: "BASKETBOL", friday: "YÜZME" },
  { time: "16:30 - 17:30", monday: "ÇOCUK YOGASI", tuesday: "TİYATRO SPORU", wednesday: "GELENEKSEL OYUNLAR", thursday: "TİYATRO SPORU", friday: "GELENEKSEL OYUNLAR" },
  { time: "17:30 - 18:30", monday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", tuesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", wednesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", thursday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", friday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", isConstant: true },
];

const ilkokulHafta1: ScheduleSlot[] = [
  { time: "09:00 - 10:00", monday: "ENGLISH TIME", tuesday: "PEMAKÜLTÜR ATÖLYESİ", wednesday: "FUN SCIENCE", thursday: "ASTRONOMİ", friday: "ENGLISH TIME" },
  { time: "10:00 - 11:30", monday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", tuesday: "HAVACILIK OKULU (KAAN UÇAK)", wednesday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", thursday: "ARKEOLOJİNİN GİZEMİ", friday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA" },
  { time: "11:40 - 12:20", monday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", tuesday: "GELENEKSEL HARİKA SANATLAR", wednesday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", thursday: "FİMO SERAMİK ATÖLYESİ", friday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI" },
  { time: "12:20 - 13:00", monday: "ÖĞLE YEMEĞİ", tuesday: "ÖĞLE YEMEĞİ", wednesday: "ÖĞLE YEMEĞİ", thursday: "ÖĞLE YEMEĞİ", friday: "ÖĞLE YEMEĞİ", isLunch: true },
  { time: "13:00 - 14:00", monday: "DOĞA VE YAŞAM BECERİLERİ", tuesday: "ORYANTRİNG", wednesday: "ÇOCUK YOGASI", thursday: "DOĞA VE YAŞAM BECERİLERİ", friday: "TİYATRO SPORU" },
  { time: "14:10 - 15:10", monday: "DOĞA VE YAŞAM BECERİLERİ", tuesday: "ÇOCUK YOGASI", wednesday: "PONNY BİNİCİLİK SAATİ", thursday: "OKÇULUK", friday: "GELENEKSEL OYUNLAR" },
  { time: "15:20 - 16:20", monday: "YÜZME", tuesday: "BASKETBOL", wednesday: "TİYATRO SPORU", thursday: "BASKETBOL", friday: "YÜZME" },
  { time: "16:30 - 17:30", monday: "VOLEYBOL", tuesday: "TİYATRO SPORU", wednesday: "GELENEKSEL OYUNLAR", thursday: "TİYATRO SPORU", friday: "ÇOCUK YOGASI" },
  { time: "17:30 - 18:30", monday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", tuesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", wednesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", thursday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", friday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", isConstant: true },
];

const ilkokulHafta2: ScheduleSlot[] = [
  { time: "09:00 - 10:00", monday: "ENGLISH TIME", tuesday: "EĞLENCELİ MATEMATİK", wednesday: "ARAŞTIRMA", thursday: "ASTRONOMİ", friday: "ENGLISH TIME" },
  { time: "10:00 - 11:30", monday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", tuesday: "RC İNSANSIZ KARA ARAÇLARI", wednesday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", thursday: "DRONE FUTBOLU", friday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA" },
  { time: "11:40 - 12:20", monday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", tuesday: "GELENEKSEL HARİKA SANATLAR", wednesday: "İNCELEME MÜZE", thursday: "FİMO SERAMİK ATÖLYESİ", friday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI" },
  { time: "12:20 - 13:00", monday: "ÖĞLE YEMEĞİ", tuesday: "ÖĞLE YEMEĞİ", wednesday: "ÖĞLE YEMEĞİ", thursday: "ÖĞLE YEMEĞİ", friday: "ÖĞLE YEMEĞİ", isLunch: true },
  { time: "13:00 - 14:00", monday: "DOĞA VE YAŞAM BECERİLERİ", tuesday: "ORYANTRİNG", wednesday: "DOĞA VE YAŞAM BECERİLERİ", thursday: "DOĞA VE YAŞAM BECERİLERİ", friday: "TİYATRO SPORU" },
  { time: "14:10 - 15:10", monday: "YÜZME", tuesday: "DOĞA VE YAŞAM BECERİLERİ", wednesday: "MACERA GEZİLERİ", thursday: "OKÇULUK", friday: "GELENEKSEL OYUNLAR" },
  { time: "15:20 - 16:20", monday: "ÇOCUK YOGASI", tuesday: "BASKETBOL", wednesday: "ARAŞTIRMA", thursday: "BASKETBOL", friday: "YÜZME" },
  { time: "16:30 - 17:30", monday: "VOLEYBOL", tuesday: "TİYATRO SPORU", wednesday: "GELENEKSEL OYUNLAR", thursday: "TİYATRO SPORU", friday: "ÇOCUK YOGASI" },
  { time: "17:30 - 18:30", monday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", tuesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", wednesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", thursday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", friday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", isConstant: true },
];

const ortaokulHafta1: ScheduleSlot[] = [
  { time: "09:00 - 10:00", monday: "ENGLISH TIME", tuesday: "MATEMATİK MANTIK", wednesday: "ROBOT FUTBOLU", thursday: "TASARLA YAP KODLA UÇUR — İHA DRONE", friday: "ENGLISH TIME" },
  { time: "10:00 - 11:30", monday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", tuesday: "RC İNSANSIZ KARA ARAÇLARI", wednesday: "MAKER STEM ATÖLYESİ", thursday: "BOTANİK", friday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA" },
  { time: "11:40 - 12:20", monday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", tuesday: "GELENEKSEL HARİKA SANATLAR", wednesday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", thursday: "SERAMİK ATÖLYESİ", friday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI" },
  { time: "12:20 - 13:00", monday: "ÖĞLE YEMEĞİ", tuesday: "ÖĞLE YEMEĞİ", wednesday: "ÖĞLE YEMEĞİ", thursday: "ÖĞLE YEMEĞİ", friday: "ÖĞLE YEMEĞİ", isLunch: true },
  { time: "13:00 - 14:00", monday: "DOĞA VE YAŞAM BECERİLERİ", tuesday: "ORYANTRİNG", wednesday: "PONNY BİNİCİLİK SAATİ", thursday: "DOĞA VE YAŞAM BECERİLERİ", friday: "TİYATRO SPORU" },
  { time: "14:10 - 15:10", monday: "YOGA VE NEFES KONDÜSYON", tuesday: "DOĞA VE YAŞAM BECERİLERİ", wednesday: "ULTIMATE FRİZBİ FUTBOLU", thursday: "OKÇULUK", friday: "GELENEKSEL OYUNLAR" },
  { time: "15:20 - 16:20", monday: "YÜZME", tuesday: "BASKETBOL / FUTBOL", wednesday: "OKÇULUK", thursday: "BASKETBOL / FUTBOL", friday: "YÜZME" },
  { time: "16:30 - 17:30", monday: "VOLEYBOL", tuesday: "TİYATRO SPORU", wednesday: "GELENEKSEL OYUNLAR", thursday: "TİYATRO SPORU", friday: "YOGA VE NEFES KONDÜSYON" },
  { time: "17:30 - 18:30", monday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", tuesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", wednesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", thursday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", friday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", isConstant: true },
];

const ortaokulHafta2: ScheduleSlot[] = [
  { time: "09:00 - 10:00", monday: "ENGLISH TIME", tuesday: "MATEMATİK MANTIK", wednesday: "ARAŞTIRMA", thursday: "TASARLA YAP KODLA UÇUR — İHA DRONE", friday: "ENGLISH TIME" },
  { time: "10:00 - 11:30", monday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", tuesday: "RC İNSANSIZ KARA ARAÇLARI", wednesday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA", thursday: "PEMAKÜLTÜR ATÖLYESİ", friday: "DİJİTAL MÜHENDİSLİK - YAPAY ZEKA" },
  { time: "11:40 - 12:20", monday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI", tuesday: "GELENEKSEL HARİKA SANATLAR", wednesday: "İNCELEME MÜZE", thursday: "SERAMİK ATÖLYESİ", friday: "ORFF VE RİTİM ATÖLYESİ — DOĞA ORKESTRASI" },
  { time: "12:20 - 13:00", monday: "ÖĞLE YEMEĞİ", tuesday: "ÖĞLE YEMEĞİ", wednesday: "ÖĞLE YEMEĞİ", thursday: "ÖĞLE YEMEĞİ", friday: "ÖĞLE YEMEĞİ", isLunch: true },
  { time: "13:00 - 14:00", monday: "DOĞA VE YAŞAM BECERİLERİ", tuesday: "ORYANTRİNG", wednesday: "DOĞA VE YAŞAM BECERİLERİ", thursday: "DOĞA VE YAŞAM BECERİLERİ", friday: "TİYATRO SPORU" },
  { time: "14:10 - 15:10", monday: "YOGA VE NEFES KONDÜSYON", tuesday: "DOĞA VE YAŞAM BECERİLERİ", wednesday: "MACERA GEZİLERİ", thursday: "OKÇULUK", friday: "GELENEKSEL OYUNLAR" },
  { time: "15:20 - 16:20", monday: "YÜZME", tuesday: "BASKETBOL / FUTBOL", wednesday: "ARAŞTIRMA", thursday: "BASKETBOL / FUTBOL", friday: "YÜZME" },
  { time: "16:30 - 17:30", monday: "VOLEYBOL", tuesday: "TİYATRO SPORU", wednesday: "GELENEKSEL OYUNLAR", thursday: "TİYATRO SPORU", friday: "YOGA VE NEFES KONDÜSYON" },
  { time: "17:30 - 18:30", monday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", tuesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", wednesday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", thursday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", friday: "HAFIZA TEKNİKLERİ VE ZEKA OYUNLARI", isConstant: true },
];

export const defaultSiteContent: SiteContent = {
  utility: {
    location: "Mogan Gölü Kıyısı, Gölbaşı, Ankara",
    email: "info@mogankampus.com",
    phone: "+90 312 555 0100",
  },
  nav: {
    brand: "Mogan",
    kicker: "Kampüs",
    campLabel: "Bir Eğitim Kampı",
    links: [
      { label: "Hakkımızda", to: "/hakkinda" },
      { label: "Yaz Okulu", to: "/yaz-okulu" },
      { label: "Educere Atölyeleri", to: "/educere-atolyeleri" },
      { label: "Okul Gezileri", to: "/okul-gezileri" },
      { label: "Etkinlikler", to: "/etkinlikler" },
      { label: "İletişim", to: "/iletisim" },
    ],
  },
  hero: {
    eyebrow: "Mutlu Çocuklar, İlham Veren Eğitim",
    headlineBefore: "Doğa",
    headlineAccent: "Bilim",
    headlineAfter: "Sanat",
    body: "Göl kenarında eşsiz bir deneyim.",
    ctaPrimary: "Bilgi Al",
    ctaSecondary: "Programları İncele",
    imageUrl: heroImg,
    imageAlt: "Mogan Kampüs'te doğa, bilim ve sanat dolu bir gün",
  },
  about: {
    eyebrow: "Hakkında",
    headline: "Sınıfın dışında gerçek öğrenme.",
    text: "Mogan Kampüs, öğrencileri ulusal ve uluslararası kariyerlere hazırlamak için tasarlanmış, deneyim temelli bir öğrenme ortamıdır. Doğa, bilim ve sanatı bir araya getiren atölyelerle her çocuğun kendi yolunu bulmasına alan açar.",
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
  yazOkulu: {
    eyebrow: "Yaz Okulu",
    headline: "Yazın en güzel adresi: Mogan Kampüs.",
    intro:
      "Okul öncesinden ortaokula kadar her yaş grubuna özel, haftalık tematik atölyeler, doğa gezileri ve kamp ateşi programlarıyla dopdolu bir yaz programı.",
    weekLabel: "Hafta",
    dailyNote: "Her gün 17:30 - 18:30 arası Hafıza Teknikleri ve Zeka Oyunları uygulanır.",
    ctaLabel: "Yaz Okulu İçin Bilgi Al",
    levels: [
      {
        slug: "okul-oncesi",
        level: "Okul Öncesi",
        ageRange: "4 - 6 yaş",
        intro:
          "Okul öncesi yaz kampımız drama, müzik, doğa ve el becerilerini bir araya getirir; çocuklarımız oyunla öğrenir, keşfeder ve güvenle büyür.",
        weeks: [okulOncesiHafta1, okulOncesiHafta2],
        campNote:
          "Hafta sonu 1 gece konaklamalı okul bahçesinde doğa, astronomi, oryantiring, drama kampı yapılacaktır. Kampımız ebeveyn katılımlı olup etkinlikler veliler ile birlikte organize edilecektir. Cumartesi kamp ateşi programı düzenlenecektir.",
        ctaLabel: "Okul Öncesi İçin Bilgi Al",
      },
      {
        slug: "ilkokul",
        level: "İlkokul",
        ageRange: "7 - 10 yaş",
        intro:
          "İlkokul yaz kampımız fen, teknoloji, müzik, doğa ve spor atölyelerini dengeli bir programla buluşturur; öğrencilerimiz hem öğrenir hem eğlenir.",
        weeks: [ilkokulHafta1, ilkokulHafta2],
        campNote:
          "Hafta sonu 1 gece konaklamalı 2 gün okul bahçesinde doğa, astronomi, oryantiring, drama kampı yapılacaktır. Kampımız ebeveyn katılımlı olup etkinlikler veliler ile birlikte organize edilecektir. Cumartesi kamp ateşi programı düzenlenecektir.",
        ctaLabel: "İlkokul İçin Bilgi Al",
      },
      {
        slug: "ortaokul",
        level: "Ortaokul",
        ageRange: "11 - 14 yaş",
        intro:
          "Ortaokul yaz kampımız dijital mühendislik, robotik, İHA, matematik mantık ve takım sporları ile öğrencilerimizi geleceğin becerilerine hazırlar.",
        weeks: [ortaokulHafta1, ortaokulHafta2],
        campNote:
          "Hafta sonu 1 gece konaklamalı 2 gün okul bahçesinde doğa, astronomi, oryantiring, drama kampı yapılacaktır. Kampımız ebeveyn katılımlı olup etkinlikler veliler ile birlikte organize edilecektir. Cumartesi kamp ateşi programı düzenlenecektir.",
        ctaLabel: "Ortaokul İçin Bilgi Al",
      },
    ],
  },
  educereAtolyeleri: {
    eyebrow: "Educere Atölyeleri",
    headline: "20+ atölye, sınırsız keşif.",
    intro:
      "Mogan Kampüs bünyesinde uygulanan atölyelerin tamamı alan uzmanları eşliğinde, deney temelli ve öğrenci portföyüne katkı sağlayacak şekilde tasarlanmıştır. Aşağıdan atölyeyi seçerek detaylara ulaşabilirsiniz.",
    ctaLabel: "Atölye İçin İletişime Geç",
    items: [
      {
        slug: "havacilik-ve-roket-bilim",
        title: "Havacılık ve Roket Bilim Atölyesi",
        category: "Fen & Mühendislik",
        duration: "Yarım / Tam Gün",
        environment: "Açık Alan & Atölye",
        description:
          "Hezarfen Havacılık ve Roket Bilim Atölyesi'nde öğrencilerimize havacılık ve uzay ile ilgili bilgilendirmelerle ve araştırmalarla ön öğrenmeler hedeflenir. Karton, ahşap model/maket kursları düzenlenmekte, havacılık ve uzay ile ilgili kişi ve kuruluşlara geziler organize edilmektedir. Kağıt ve karton modeller üzerinde uçuşun fiziğini kavrayan çocuklarımız, ahşap ve köpük uçak atölyelerinde aerodinamik gibi zor bir alanı kendileri keşfeder. Hava ve su roket atölyeleriyle FAI uzay modelleri yapılır.",
        highlights: [
          "Karton ve ahşap model/maket kursları",
          "Planör ve aerodinamik deneyleri",
          "Hava ve su roket atölyeleri",
          "FAI uzay modelleri ve profesyonel roket modelciliğine giriş",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza Ankara Üniversitesi Kreiken Rasathanesi uzmanları liderlik yapacaktır.",
        img: expScience,
      },
      {
        slug: "astronomi",
        title: "Astronomi Atölyesi",
        category: "Fen & Doğa",
        duration: "Tam Gün (Gece Gözlemi)",
        environment: "Açık Alan & Atölye",
        description:
          "Astronomi atölyesinde çocuklarımız, gök cisimlerinin fiziksel ve kimyasal özellikleri, konumlarının hesaplanması gibi konular yanında evrenin yapısı, nasıl oluştuğu ve gelişiminin nasıl olduğunu kavrayabildiği atölye ve etkinliklere katılırlar. Astronominin alt dallarını tanır; astrofizik, astromatematik, astrokimya, astrobiyoloji, arkeoastronomi, astrojeoloji alanlarına kucak açarlar.",
        highlights: [
          "Solar Sistemi Keşfedelim Atölyesi",
          "Gece Gökyüzü Atölyesi",
          "Mevsimler ve Yıldızlar Atölyesi",
          "Dünya ve Gezegenler Atölyesi",
          "İlk Teleskobum Atölyesi",
          "Aya İlk Adım Atölyesi",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza Ankara Üniversitesi Kreiken Rasathanesi uzmanları liderlik yapacaktır.",
        img: expScience,
      },
      {
        slug: "iha-drone",
        title: "Tasarla-Yap-Kodla-Uçur İHA Atölyesi (Drone ve RC Uçak)",
        category: "Teknoloji & Mühendislik",
        duration: "Tam Gün",
        environment: "Atölye & Açık Saha",
        description:
          "Her geçen gün daha fazla hayatımıza giren İHA'lar milli savunma sanayiinde de özel bir yere sahip. ROKETSAN, TAİ ve HAVELSAN'dan uzmanlara sanal ortamda teknik destekler alınır. Atölye kapsamında temel İHA-DRONE yapımı eğitimleri alan öğrencilerimiz temel düzeyde uçuş eğitimleri de alacaklardır. Öğrencilerimiz kendi tasarımı olan uçak ve dronları inşa edecekler ve kodlayarak uçuş deneyimleri yaşayacaklardır.",
        highlights: [
          "Temel İHA ve drone yapımı",
          "Uçuş eğitimi ve kodlama",
          "ROKETSAN, TAİ, HAVELSAN uzman desteği",
          "TEKNOFEST ve uluslararası yarışmalara hazırlık",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza THK RC uçak ve drone uzmanları liderlik yapacaktır.",
        img: expScience,
      },
      {
        slug: "dijital-muhendislik-yapay-zeka",
        title: "Dijital Mühendislik ve Yapay Zekâ Atölyesi",
        category: "Teknoloji & Robotik",
        duration: "Tam Gün",
        environment: "Kapalı Atölye",
        description:
          "Çağımız robot çağı ve çocuklarımız da bu çağın nesilleri. Uluslararası ve ulusal tüm otoritelerin gelecekte rağbet edilecek meslekler arasında hedef gösterdiği bu alanlarda öğrencilerimizi şimdiden hazırlamaktayız. Tekno-robot atölyesinde temel elektrik, temel elektronik, mekanik, yenilenebilir enerjiler ve hibrit araçlar ile robot programlama konuları seviyelerine uygun setler ve devrelerle verilir.",
        highlights: [
          "Temel elektrik & elektronik",
          "Mekanik ve yenilenebilir enerji",
          "Hibrit araçlar ve robot programlama",
          "Buluşçu yaklaşımla tasarım süreçleri",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza TÜZDEV ve BİLSEM uzmanları liderlik yapacaktır.",
        img: expScience,
      },
      {
        slug: "oryantiring",
        title: "Oryantiring",
        category: "Spor & Doğa",
        duration: "Tam Gün",
        environment: "Açık Alan (Doğa)",
        description:
          "Oryantiring haritada işaretlenmiş hedefleri en hızlı bulmak üzerine kurulu bir spor. Koşarken düşünebilmek, strateji kurmak çok önemli. Hangi yol daha hızlı? En kısa yol değil bu çoğu kere! Kaybolmadan ilerlemek araziyi iyi okuyabilmeyi, haritayı üç boyutlu düşünmeyi gerektiriyor. 'Orienteering koşarken satranç oynamaktır' diye boşuna demiyorlar.",
        highlights: [
          "Doğa oyunları ve kampçılık",
          "Hayatta kalma becerileri",
          "Harita okuma ve yön bulma",
          "Strateji ve takım çalışması",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza Oryantiring Federasyonu milli atletleri liderlik yapacaktır.",
        img: expVolley,
      },
      {
        slug: "sasirtan-bilim",
        title: "Şaşırtan Bilim",
        category: "Fen & Doğa",
        duration: "Tam Gün",
        environment: "Kapalı Atölye",
        description:
          "Eğlenceli deneyleri kendimiz uygulayarak bilimsel kuralları keşfediyoruz. Temel bilimlerin gizemli dünyasında bilimin eğlenceli yönü ile tanışarak hayatımızdaki yansımalarına ulaşıyoruz. Atölyelerimizde fizik, kimya ve biyoloji bilimlerinin her birinden derlenmiş farklı maceralar çocuklarımızı bekliyor.",
        highlights: [
          "Fizik deneyleri",
          "Kimya deneyleri",
          "Biyoloji gözlemleri",
          "Bilimsel yöntem uygulamaları",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza BİLSEM fen bilimleri öğretmenleri liderlik yapacaktır.",
        img: expScience,
      },
      {
        slug: "ahsap-tasarim",
        title: "Ahşap Tasarım Atölyesi",
        category: "Sanat & Tasarım",
        duration: "Tam Gün",
        environment: "Atölye & Bahçe",
        description:
          "Eyüp Oyuncakları atölyemizin en temel amacı öğrencilerimizi ahşapta, ağaç ve orman kokusunu hissettirmektir. Botanik konusunda ön öğrenmelerin gerçekleşmesinden sonra belli ağaç türlerini dokunarak tanımaları, geleneksel el sanatlarından ahşap işçiliğini uygulayarak kavramaları amaçlanır.",
        highlights: [
          "Ağaç türlerini dokunarak tanıma",
          "Geleneksel ahşap işçiliği",
          "Ahşap oyuncak atölyeleri",
          "Botanik ve doğa farkındalığı",
        ],
        img: expBand,
      },
      {
        slug: "kukla-karagoz",
        title: "Kukla Karagöz Tiyatrosu",
        category: "Sanat & Kültür",
        duration: "Tam Gün",
        environment: "Kapalı Atölye",
        description:
          "Karagöz gölge tiyatrosu kültürünün doğduğu topraklarımızda öğrencilerimizle öncelikle gölge kahramanlarımız Karagöz ve Hacivat deri kuklaları yapacağız. Kukla yapım tekniklerini öğrendikten sonra her bir öğrencimizin en sevdiği anime, film ya da masal kahramanının kuklasını yapması sağlanacaktır. Mini bir gölge tiyatrosu hazırlanıp, senaryo, sahne, kurgu, performans deneyimlemeleri sağlanacaktır.",
        highlights: [
          "Deri kukla yapımı (Karagöz & Hacivat)",
          "Sünger ve ipli kukla yapımı",
          "Sahne, senaryo ve kurgu çalışması",
          "Yeşil ekran ile mikro kukla tiyatrosu",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza BİLSEM öğretmenleri liderlik yapacaktır.",
        img: expBand,
      },
      {
        slug: "dinozorlar-arkeoloji",
        title: "Dinozorlar ve Arkeoloji Atölyesi",
        category: "Fen & Doğa",
        duration: "Tam Gün",
        environment: "Kapalı Atölye",
        description:
          "Arkeoloji atölyesinde çocuklar geçmişi ve arkeolojiyi keşfediyorlar. Bilimsel çalışma yöntemleri, tarih ve tarihi eser bilinci, arkeolojik kazı teknikleri öğrenilir. Dinozorlar Dünyası Atölyesinde öğrenciler, dinozorlar çağına bir yolculuk yapacak; jeolojik devirler bilgisi ile Dünya'nın oluşumundan günümüze kadar yaşanan değişimlerin farkına varacak; bu devirler arasından Mezozoik dönemi derinlemesine inceleyecekler.",
        highlights: [
          "Arkeolojik kazı teknikleri",
          "Tarihi eser bilinci",
          "Jeolojik devirler ve Mezozoik dönem",
          "Fosiller ve bilimsel çalışma yöntemleri",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza BİLSEM öğretmenleri liderlik yapacaktır.",
        img: expCheer,
      },
      {
        slug: "matematik-mantik",
        title: "Matematik Mantık",
        category: "Akademik & Bilişsel",
        duration: "Tam Gün",
        environment: "Kapalı Atölye",
        description:
          "Beynin bilgiyi nasıl kaydettiği, nasıl hatırladığı yani nasıl öğrendiğine yönelik çalışmalar. Hızlı okuma ve hafıza çalışmaları, beynin sağ ve sol yarım küresini beraber ve dengeli kullanmayı sağlayan, akademik başarıyı olduğu kadar sosyal başarıyı da destekleyen programlardır. Zihin Haritalama ile not tutma ve tekrar etme teknikleri öğretilir.",
        highlights: [
          "Hafıza eğitimi",
          "Hızlı okuma teknikleri",
          "Zihin haritalama",
          "Analitik düşünme",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza TÜZDEV öğretmenleri liderlik yapacaktır.",
        img: expScience,
      },
      {
        slug: "mimarlik-tasarim",
        title: "Mimarlık ve Tasarım Atölyesi",
        category: "Sanat & Tasarım",
        duration: "Tam Gün",
        environment: "Atölye & Açık Alan",
        description:
          "Gözlem yapıp farkındalıklarını arttırmaya, tespit ettikleri problemlere kendi özgün çözümlerini üretmeye teşvik ediyor. Bunu yaparken mimarlığı bir araç olarak kullanıyor ve proje üreterek çalışmanın yolunu öğretiyor. Genç beyinler serbestçe üretir, farklı düşünme yollarını öğrenir, tasarım kültürü ve estetik duygularını geliştirir.",
        highlights: [
          "Serbest üretim",
          "Farklı düşünme yolları",
          "Tasarım kültürü",
          "Kolektif çalışma becerisi",
          "Estetik duygu gelişimi",
        ],
        img: expBand,
      },
      {
        slug: "bocek-bilim",
        title: "Böcek Bilim",
        category: "Fen & Doğa",
        duration: "Tam Gün",
        environment: "Açık Alan (Bahçe & Göl)",
        description:
          "Günümüzde tarım ve orman alanlarında zararlılarla mücadelede kullanılan kimyasal ilaçların olumsuz etkileri nedeniyle çevreyle uyumlu mücadele yöntemleri daha da önem kazanmıştır. Bu yöntemlerden biri de biyolojik mücadeledir. Faydalı böcekler bitkilerde bulunan zararlıları yok ettikleri için onların minik dostları olarak da kabul edilebilir.",
        highlights: [
          "Faydalı ve zararlı böcek ayrımı",
          "Biyolojik mücadele kavramı",
          "Ekosistem farkındalığı",
          "Çevreyle uyumlu tarım",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza TÜZDEV öğretmenleri liderlik yapacaktır.",
        img: expScience,
      },
      {
        slug: "3d-modelleme",
        title: "3D Modelleme",
        category: "Teknoloji & Tasarım",
        duration: "Tam Gün",
        environment: "Kapalı Atölye",
        description:
          "3 boyutlu modelleme ve baskı, kendi ürünlerimizi gerçek boyut ve maddelerle üretmeden önceki prototip halini yapmak için ya da günlük hayatta kullanabileceğimiz küçük mekanik aletler, kalemlik, oyuncak, biblo gibi basit ve kullanışlı eşyalar üretmek için kullanılabiliyor. Duyu seti derslerimizle çocuklarımızın duyularını geliştirmeyi ve çevrelerine duyarlılıklarını arttırmayı hedefliyoruz.",
        highlights: [
          "3 boyutlu modelleme ve baskı",
          "Prototipleme",
          "Ürün tasarımı",
          "Duyu seti ve çevre duyarlılığı",
        ],
        note: "Bu Atölyemizin çalışmalarında çocuklarımıza TÜZDEV, BİLSEM öğretmenleri ve Yüksek Mimar TÜZDEV öğretmenleri liderlik yapacaktır.",
        img: expScience,
      },
      {
        slug: "rc-insansiz-kara-araclari",
        title: "RC İnsansız Kara Araçları",
        category: "Teknoloji & Mühendislik",
        duration: "Tam Gün",
        environment: "Atölye & Açık Saha",
        description:
          "Bir nevi insansız kara aracı olarak düşünülebilecek olan RC Model Araba atölyesinde öğrencilerimiz RC teknolojilerini öğrenecek, kendi arabalarını tasarlayıp lazer ve 3D yazıcılarda basacaklar. On Road ve Off Road yarışların kurallarını öğrenip doyasıya yarışacaklar. Atölyemizin bir diğer önemli başlığı da insansız tarım araçları tasarımıdır.",
        highlights: [
          "RC teknolojileri",
          "Lazer kesim ve 3D baskı",
          "On Road ve Off Road yarışları",
          "İnsansız tarım araçları tasarımı",
        ],
        img: expVolley,
      },
      {
        slug: "permakultur",
        title: "Permakültür Atölyesi",
        category: "Fen & Doğa",
        duration: "Tam Gün",
        environment: "Açık Alan (Bahçe)",
        description:
          "Permakültür, doğal ekosistemlerin çeşitliliğine, istikrarına ve esnekliğine sahip olan tarımsal olarak üretken ekosistemlerin bilinçli tasarımı ve bakımlarının sağlanmasıdır. Sürdürülebilir tarım olmaksızın istikrarlı bir sosyal düzen mümkün değildir. Atölyemiz kapsamında tüm yaşam sistemlerinin devamı için gerekli koşulları sağlama ilkelerine dönük etkinlikler planlanmıştır.",
        highlights: [
          "Permakültür kuramı ve ilkeleri",
          "Örüntü kavrayışı",
          "Ağaçlar ve enerji akışları",
          "Toprak yapısı ve toprak iyileştirme",
          "Su hasadı ilkeleri",
        ],
        img: expScience,
      },
      {
        slug: "tiyatro-sporu",
        title: "Tiyatro Sporu",
        category: "Sanat & Drama",
        duration: "Tam Gün",
        environment: "Kapalı / Açık Sahne",
        description:
          "Tiyatro sporu, ABD ve Avrupa'da Theatresports ismi ile alternatif oyun mekânlarında seyircilere sunulan modern doğaçlama tiyatroya ait bir gösteri türüdür. Oyuncuların takımlara ayrılıp birbirleri ile müsabaka etmesi mantığına dayanır. Her turun kendine özgü önceden belirlenmiş kuralları bulunmaktadır.",
        highlights: [
          "Spontane düşünme ve canlandırma",
          "Takım müsabakası formatı",
          "Yirmi beşten fazla doğaçlama turu",
          "Seyirci etkileşimi",
        ],
        img: expCheer,
      },
      {
        slug: "doga-yasam-becerileri",
        title: "Doğa ve Yaşam Becerileri",
        category: "Doğa & Hayatta Kalma",
        duration: "Tam Gün",
        environment: "Açık Alan & Kampüs Geneli",
        description:
          "Ana teması doğada yaşam becerilerinin geliştirilmesi olan atölyemizde her bireyin bireysel ve toplumsal olarak gerçekleştirebileceği becerilerin kazandırılması hedeflenmektedir. Bireylerin doğada kazı yapma, ateş yakma, suyun filtrelenmesi, canlıları tanıma, çadır kurma, yaylacılık faaliyetleri, okçuluk, yön bulma, izcilik, oryantiring ile hedef bulma, doğayı resmetme gibi yeterliliklere sahip olması hedeflenmiştir.",
        highlights: [
          "Doğada ateş yakma ve kazı yapma",
          "Suyun filtrelenmesi",
          "Çadır kurma ve yaylacılık",
          "Yön bulma, izcilik ve oryantiring",
          "Temel ilkyardım ve afet eğitimi",
          "Paintball ve doğa oyunları",
        ],
        img: expVolley,
      },
      {
        slug: "orff-ritim",
        title: "Orff ve Ritim Atölyesi",
        category: "Müzik & Sanat",
        duration: "Tam Gün",
        environment: "Kapalı / Açık Alan",
        description:
          "Alanında uzman müzik öğretmenleri tarafından piyano, bateri, gitar derslerinin yanında orff ve ritim dersleri de veriyoruz. Orff Eğitimi müzik, dans ve doğaçlamanın önemsendiği bir müzik yaklaşımıdır. Doğaçlama, dans, ritim, drama ve hareketi esas alıp çocuğun kendini özgürce dışa vurabileceği temeller üzerine inşa edilen orff eğitimi ile çocuklarımızın bedensel olarak müziği dışa vurma ihtiyacını gideriyoruz.",
        highlights: [
          "Piyano, bateri, gitar dersleri",
          "Orff eğitimi",
          "Ritim eğitimi",
          "Doğaçlama, dans ve drama",
        ],
        img: expBand,
      },
      {
        slug: "geleneksel-harika-sanatlar",
        title: "Geleneksel Harika Sanatlar",
        category: "Sanat & Kültür",
        duration: "Tam Gün",
        environment: "Kapalı Atölye",
        description:
          "Geleneksel Türk Sanatları atölyemizde, ana sanat dalları içeriğinde yer alan kültürel mirasın tarihsel, sanatsal ve teknik temellerini öğrencilere aktarmaktayız. El yazma kitaplarıyla ilgili hat, cilt, tezhip, tasvir, ebru, ince oyma sanatları, çini-seramik, kumaş, halı, kilim, maden, ahşap, taş ve diğer küçük el sanatları atölyenin ana başlıklarını oluşturmaktadır.",
        highlights: [
          "Hat, cilt, tezhip, tasvir",
          "Ebru ve ince oyma sanatları",
          "Çini-seramik",
          "Kumaş, halı, kilim, maden, ahşap, taş işçiliği",
          "Müze, galeri ve sergi gezileri",
        ],
        img: expBand,
      },
      {
        slug: "fun-science",
        title: "Fun Science (Eğlenceli Bilim)",
        category: "Fen & Doğa",
        duration: "Yarım Gün",
        environment: "Kapalı Atölye",
        description:
          "Bilimi deneyerek, oynayarak, merak ederek keşfettiğimiz bir atölye. Çocuklarımız günlük hayattan ilginç deneylerle bilimin temellerini öğrenir, hipotez kurar, test eder ve sonuçları paylaşır.",
        highlights: [
          "Günlük hayattan bilim deneyleri",
          "Hipotez kurma ve test etme",
          "Ekip çalışmasıyla proje sunumu",
        ],
        img: expScience,
      },
      {
        slug: "mimarlik-lego",
        title: "LEGO World & Mimari Tasarım",
        category: "Sanat & Tasarım",
        duration: "Tam Gün",
        environment: "Kapalı Atölye",
        description:
          "LEGO tuğlaları ile şehirler, köprüler ve makineler tasarlıyoruz. Çocuklarımız planlama, inşa etme ve sunum aşamalarından geçerek küçük mimarlar gibi düşünmeyi öğrenir.",
        highlights: [
          "LEGO ile mekanik tasarım",
          "Şehir ve köprü inşası",
          "Proje planlama ve sunum",
        ],
        img: expBand,
      },
      {
        slug: "maket-ucak",
        title: "Maket Uçak ve Kaan Uçak Atölyesi",
        category: "Fen & Mühendislik",
        duration: "Yarım Gün",
        environment: "Atölye & Açık Alan",
        description:
          "Milli uçak projemiz KAAN'dan ilham alan maket uçak atölyesinde öğrencilerimiz planör modellerini uçurmanın zevkini yaşayarak aerodinamik gibi zor bir alanı kendileri keşfeder.",
        highlights: [
          "Köpük uçak maketi yapımı",
          "Aerodinamik deneyleri",
          "Planör uçuşları",
        ],
        img: expScience,
      },
    ],
  },
  okulGezileri: {
    eyebrow: "Okul Gezileri",
    headline: "Bir günlük Mogan Kampüs deneyimi.",
    intro:
      "Okullar için tek günlük gezi paketleri: doğa yürüyüşü, atölye rotasyonu, spor aktiviteleri ve gölet kenarı piknik. Öğretmeninizle iletişime geçin, size özel bir gün planlayalım.",
    ctaLabel: "Okul Gezisi Planla",
    items: [
      {
        slug: "temel-doga-gunu",
        title: "Temel Doğa Günü",
        summary: "Doğa yürüyüşü + oryantiring + ateş yakma + piknik",
        detailBody:
          "Öğrenciler gün boyunca göl kenarında doğa yürüyüşü yapar, basit oryantiring haritası ile hedefleri arar ve akşam üstü kamp ateşi etrafında toplanır.",
        duration: "Tam Gün",
        capacity: "Sınıf / 30 öğrenci",
        ctaLabel: "Plan İste",
      },
      {
        slug: "atolye-rotasyonu",
        title: "Atölye Rotasyonu",
        summary: "3 farklı atölye + öğle yemeği + gölet molası",
        detailBody:
          "3 atölye istasyonunda dönen öğrencilerimiz farklı becerileri deneyimler. Tüm malzemeler Mogan Kampüs tarafından sağlanır.",
        duration: "Tam Gün",
        capacity: "Sınıf / 30 öğrenci",
        ctaLabel: "Plan İste",
      },
      {
        slug: "spor-senligi",
        title: "Spor Şenliği",
        summary: "Plaj voleybolu + futbol + okçuluk + ip atlama",
        detailBody:
          "Okul bahçesinde yapılamayacak kadar eğlenceli, göl manzaralı bir spor günü. Tüm ekipmanlar Mogan Kampüs tarafından sağlanır.",
        duration: "Tam Gün",
        capacity: "Sınıf / 30 öğrenci",
        ctaLabel: "Plan İste",
      },
    ],
  },
  etkinlikler: {
    eyebrow: "Etkinlikler",
    headline: "Yıl boyunca açık etkinlikler.",
    intro:
      "Mogan Kampüs, öğrencilere ve ailelere açık yıl boyu etkinlikler düzenler. Aşağıdaki etkinlikler için takvimimize göz atabilir, ailenizle birlikte katılabilirsiniz.",
    ctaLabel: "Etkinlik Hakkında Bilgi Al",
    items: [
      {
        slug: "yildiz-gozlemi",
        title: "Yıldız Gözlemi Gecesi",
        summary: "Teleskopla gezegen ve yıldız gözlemi.",
        detailBody:
          "Işık kirliliğinden uzak Mogan gökyüzünde aileler ve çocuklar birlikte gezegen ve yıldız gözlemi yapar. Astronomi uzmanı rehberliğinde teleskop kullanımı ve gökyüzü haritası okuma atölyeleri.",
        date: "Yaz ayları boyunca",
        ctaLabel: "Tarih ve Bilgi Al",
      },
      {
        slug: "acik-bahce",
        title: "Açık Bahçe Günü",
        summary: "Atölyelere ücretsiz tanıtım günü.",
        detailBody:
          "Mogan Kampüs'ü ziyaret edebileceğiniz, atölyelere göz atabileceğiniz ve öğretmenlerle tanışabileceğiniz ücretsiz tanıtım günü.",
        date: "Yılda birkaç kez",
        ctaLabel: "Katılım Bilgisi Al",
      },
      {
        slug: "kamp-atesi",
        title: "Kamp Ateşi Geceleri",
        summary: "Yaz okulu öğrencileri ve aileleri için kamp ateşi.",
        detailBody:
          "Yaz okulu öğrencileri ve aileleri için düzenlenen geleneksel kamp ateşi geceleri. Müzik, sohbet ve gökyüzü.",
        date: "Yaz ayları boyunca",
        ctaLabel: "Bilgi Al",
      },
    ],
  },
  programs: {
    eyebrow: "Tematik · Oyunlaştırılmış · Derinlikli",
    headline: "Eğitim Kampı Programları.",
    items: [
      {
        n: "01",
        slug: "alice-harikalar-diyarinda",
        title: "Alice Harikalar Diyarında",
        img: vCuriosity,
        quote: "8-12 yaş",
        text: "Lewis Carroll'ın klasik eseri üzerinden yaratıcı drama, karakter analizi ve hayal gücü çalışması. Öğrenciler eserdeki karakterlere bürünerek hikayeyi yeniden canlandırır.",
        summary: "Edebiyat & Dil · 8-12 yaş · 2 Saat",
        detailTitle: "Merakı bir öğrenme yolculuğuna dönüştüren program.",
        detailBody:
          "Alice Harikalar Diyarında programı, öğrencilerin hikaye içinde karar aldığı, karakterler üzerinden tartıştığı ve kendi yaratıcı çıktılarını ürettiği deneyim temelli bir öğrenme akışıdır. Okuma, rol yapma, tasarım ve sunum çalışmaları birlikte ilerler.",
        outcomes: ["Yaratıcı düşünme", "Sözlü ifade", "Karar verme", "Hikaye tasarımı"],
        ageRange: "8-12 yaş",
        duration: "2 Saat",
        gallery: [vCuriosity, expScience],
        ctaLabel: "Detaylı Bilgi Al",
      },
      {
        n: "02",
        slug: "kucuk-prens",
        title: "Küçük Prens",
        img: vDignity,
        quote: "10-14 yaş",
        text: "Saint-Exupéry'nin başyapıtı üzerinden felsefe, dostluk ve sorumluluk kavramları. Tartışma ve yaratıcı yazma etkinlikleri.",
        summary: "Edebiyat & Dil · 10-14 yaş · 2 Saat",
        detailTitle: "Empatiyi, iletişimi ve sorumluluğu görünür kılan deneyim.",
        detailBody:
          "Küçük Prens programı; felsefi sohbetleri, drama çalışmalarını ve tasarım görevlerini bir araya getirir. Öğrenciler karakterler ve gezegenler üzerinden değerleri tartışır, kendi anlatılarını üretir ve grup içinde sunar.",
        outcomes: ["Empati", "Değer okuryazarlığı", "Drama", "Yaratıcı sunum"],
        ageRange: "10-14 yaş",
        duration: "2 Saat",
        gallery: [vDignity, expBand],
        ctaLabel: "Detaylı Bilgi Al",
      },
      {
        n: "03",
        slug: "yaratici-yazarlik",
        title: "Yaratıcı Yazarlık",
        img: vHonor,
        quote: "10-16 yaş",
        text: "Hikaye kurgusu, karakter yaratma ve diyalog yazımı teknikleri. Öğrenciler kendi kısa hikayelerini yazar ve paylaşır.",
        summary: "Edebiyat & Dil · 10-16 yaş · 2.5 Saat",
        detailTitle: "Yazma becerisini bir üst seviyeye taşıyan atölye.",
        detailBody:
          "Yaratıcı Yazarlık atölyesi, öğrencilerin hikaye kurgusunu, karakter inşasını ve diyalog yazımını deneyimleyerek kendi anlatılarını ürettiği bir programdır.",
        outcomes: ["Hikaye kurgusu", "Karakter yaratma", "Diyalog yazımı", "Yayın akışı"],
        ageRange: "10-16 yaş",
        duration: "2.5 Saat",
        gallery: [vHonor, expCheer],
        ctaLabel: "Detaylı Bilgi Al",
      },
      {
        n: "04",
        slug: "siir-atolyesi",
        title: "Şiir Atölyesi",
        img: vKindness,
        quote: "12-18 yaş",
        text: "Şiir türleri, kafiye ve ritim çalışmaları. Doğadan ilham alarak özgün şiirler üretme.",
        summary: "Edebiyat & Dil · 12-18 yaş · 2 Saat",
        detailTitle: "Doğadan ilham alarak özgün şiirler üretme atölyesi.",
        detailBody:
          "Şiir Atölyesi; türleri inceleme, kafiye ve ritim çalışmalarıyla öğrencilerin kendi şiirlerini yazıp seslendirmelerine olanak tanır.",
        outcomes: ["Şiir türleri", "Kafiye & ritim", "Doğadan ilham", "Sahne sunumu"],
        ageRange: "12-18 yaş",
        duration: "2 Saat",
        gallery: [vKindness, expBand],
        ctaLabel: "Detaylı Bilgi Al",
      },
    ],
  },
  programsPage: {
    eyebrow: "Eğitim Kampı Programları",
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
    primaryCta: "Educere Atölyeleri",
    secondaryCta: "Yaz Okulu",
    items: [
      { stat: "20+", label: "Atölye" },
      { stat: "3", label: "Yaz Okulu Seviyesi" },
      { stat: "1:8", label: "Mentör Oranı" },
    ],
  },
  workshops: {
    eyebrow: "Öne Çıkan Atölyeler",
    headline: "Educere atölyelerinden seçmeler.",
    items: [
      {
        slug: "mogan-hackathon",
        title: "Mogan Hackathon",
        text: "Takımlar 48 saatte fikirden prototipe — gerçek bir problem, gerçek bir çözüm.",
        summary: "Teknoloji · 10-17 yaş · 2 Gün",
        img: expScience,
      },
      {
        slug: "robotik-atolyesi",
        title: "Robotik Atölyesi",
        text: "Mekanik, elektronik ve kodun buluştuğu yerde, çocukların eli her şeyi yaratır.",
        summary: "Teknoloji · 8-15 yaş · 6 Oturum",
        img: expScience,
      },
      {
        slug: "tasarla-yap-kodla",
        title: "Tasarla-Yap-Kodla-Uçur (İHA)",
        text: "Kendi İHA ve dronunu tasarla, kodla ve uçur.",
        summary: "Teknoloji · 10-17 yaş · Tam Gün",
        img: expScience,
      },
      {
        slug: "astronomi-atolyesi",
        title: "Astronomi Atölyesi",
        text: "Teleskop yapımından gezegen gözlemine, evrenin büyüsü bu atölyede.",
        summary: "Fen · 10-16 yaş · Tam Gün",
        img: expScience,
      },
      {
        slug: "doga-yasam-becerileri",
        title: "Doğa ve Yaşam Becerileri",
        text: "Ateş yakmadan yön bulmaya, doğada hayatta kalma sanatı.",
        summary: "Doğa · 8-16 yaş · Tam Gün",
        img: expVolley,
      },
      {
        slug: "orff-ritim-atolyesi",
        title: "Orff ve Ritim Atölyesi",
        text: "Piyano, bateri, gitar ve orff ile bedensel müzik keşfi.",
        summary: "Müzik · 5-14 yaş · Tam Gün",
        img: expBand,
      },
    ],
  },
  workshopsPage: {
    eyebrow: "Öne Çıkan Atölyeler",
    headline: "Educere atölyelerinden seçmeler.",
    intro:
      "Mogan Kampüs bünyesinde uygulanan tüm atölyeleri görmek için Educere Atölyeleri sayfasını ziyaret edin. Her atölye, alanında uzman eğitmenler eşliğinde uygulanır.",
    ctaLabel: "Tüm Atölyeleri Gör",
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
        grades: "Açık Alan · Göl Kıyısı",
        img: divPrimary,
        text: "Survivor tarzı orman parkuru. Engel setleri, halat köprüleri, kaya tırmanma ve macera istasyonları ile Mogan kıyısında eşsiz bir doğa deneyimi.",
        summary: "Survivor tarzı engel parkuru, halat köprüleri, kaya tırmanma ve macera istasyonları.",
        detailTitle: "Hareket, cesaret ve takım desteği için tasarlanmış parkur alanı.",
        detailBody:
          "Macera Parkı öğrencilerin fiziksel farkındalık, denge, cesaret ve takım desteğini deneyimlediği açık alanlardan biridir. Program içeriklerine göre ısınma, görev, parkur ve değerlendirme aşamalarıyla kullanılır.",
        features: [
          "Survivor tarzı engel parkuru",
          "Halat köprü & denge istasyonları",
          "Kaya tırmanma duvarı",
          "Lastik engel & tünel set",
          "Göl manzaralı final alanı",
        ],
        gallery: [divPrimary, expVolley],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "acik-engel-parkuru",
        name: "Açık Engel Parkuru",
        grades: "Açık Alan · Göl Kıyısı",
        img: divLower,
        text: "Göl kıyısında kurulu renkli engel parkuru. Tırmanma, denge ve takım çalışması bir arada.",
        summary: "Renkli denge kirişleri, halka ve halat istasyonları, kaya tırmanma paneli, lastik labirent.",
        detailTitle: "Beden eğitimi dersleri ve takım oyunları için ideal alan.",
        detailBody:
          "Açık Engel Parkuru, göl kenarında kurulu renkli engelleri ile öğrencilerin denge, koordinasyon ve takım çalışması becerilerini geliştirmesi için tasarlanmış açık alan.",
        features: [
          "Renkli denge kirişleri",
          "Halka ve halat istasyonları",
          "Kaya tırmanma paneli",
          "Lastik labirent",
        ],
        gallery: [divLower, expVolley],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "outdoor-basketbol-sahasi",
        name: "Outdoor Basketbol Sahası",
        grades: "Açık Alan · Göl Manzarası",
        img: divMiddle,
        text: "Profesyonel zemin kaplamalı açık basketbol sahası. Göl manzarası eşliğinde spor deneyimi.",
        summary: "Profesyonel kauçuk zemin, resmi basketbol potası, kenar bank ve dinlenme alanı, gece aydınlatması.",
        detailTitle: "Turnuvalar ve beden eğitimi dersleri için ideal.",
        detailBody:
          "Göl manzaralı profesyonel basketbol sahası, gündüz ve gece aydınlatmasıyla okul spor şenliklerine ve turnuvalara ev sahipliği yapar.",
        features: [
          "Profesyonel kauçuk zemin",
          "Resmi basketbol potası",
          "Kenar bank & dinlenme alanı",
          "Gece aydınlatması",
        ],
        gallery: [divMiddle, expCheer],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "plaj-futbol-sahasi",
        name: "Plaj Futbol Sahası",
        grades: "Açık Alan · Kumsal",
        img: divPrimary,
        text: "Mogan kıyısında doğal kumsal alanda plaj futbolu sahası. Turnuvalar ve takım aktiviteleri için.",
        summary: "Doğal kum zemin, özel plaj futbol kaleleri, skor tabelası, soyunma ve duş imkânı.",
        detailTitle: "Plaj futbolu tutkunları için özel olarak tasarlanmış saha.",
        detailBody:
          "Plaj Futbol Sahası, doğal kum zemini ve özel plaj futbol kaleleri ile takım sporları için ideal bir ortam sunar.",
        features: [
          "Doğal kum zemin",
          "Özel plaj futbol kaleleri",
          "Skor tabelası",
          "Soyunma & duş imkânı",
        ],
        gallery: [divPrimary, expVolley],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "plaj-voleybol-sahasi",
        name: "Plaj Voleybol Sahası",
        grades: "Açık Alan · Kumsal",
        img: divLower,
        text: "Göl kenarında kum voleybol sahası. Resmi fileli, turnuva için özel donatılmış alan.",
        summary: "Resmi voleybol filesi, doğal kum zemin, takım bankları, ekipman deposu.",
        detailTitle: "Yaz akşamlarının vazgeçilmez spor aktivitesi.",
        detailBody:
          "Plaj Voleybol Sahası, göl kenarında doğal kum zemini ve resmi filesi ile spor şenlikleri ve takım oyunları için ideal.",
        features: [
          "Resmi voleybol filesi",
          "Doğal kum zemin",
          "Takım bankları",
          "Ekipman deposu",
        ],
        gallery: [divLower, expBand],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "insansiz-kara-araclari",
        name: "RC İnsansız Kara Araçları Alanı",
        grades: "Açık Saha",
        img: divMiddle,
        text: "RC teknolojileri, lazer kesim ve 3D baskıyla kendi insansız kara aracınızı tasarlayın.",
        summary: "On Road ve Off Road yarış alanı, insansız tarım araçları tasarımı.",
        detailTitle: "Geleceğin ulaşım teknolojilerini deneyimleme alanı.",
        detailBody:
          "RC İnsansız Kara Araçları alanı, öğrencilerin kendi araçlarını tasarlayıp yarıştırdığı, insansız tarım araçları prototipleri ürettiği açık saha.",
        features: ["On Road pist", "Off Road parkur", "Lazer & 3D baskı", "Yarış & gösteri alanı"],
        gallery: [divMiddle, expVolley],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "masal-atolye-sinifi",
        name: "Masal & Atölye Sınıfı",
        grades: "Kapalı Alan",
        img: divPrimary,
        text: "Drama, yaratıcı yazma ve edebi atölyeler için tematik dekore edilmiş kapalı öğrenme alanı.",
        summary: "Tematik dekorasyon, kostümler, kütüphane, sunum ekipmanı, hava koşullarından bağımsız.",
        detailTitle: "Hava koşullarından bağımsız iç mekan atölye alanı.",
        detailBody:
          "Masal & Atölye Sınıfı, drama, yaratıcı yazma ve edebi atölyeler için özel olarak dekore edilmiş kapalı bir öğrenme alanıdır.",
        features: [
          "Tematik dekorasyon & kostümler",
          "Kütüphane & kaynaklar",
          "Yazı tahtası & sunum ekipmanı",
          "Hava koşullarına bağımsız",
        ],
        gallery: [divPrimary, expBand],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "futbol-sahasi",
        name: "Futbol Sahası",
        grades: "Açık Alan",
        img: divLower,
        text: "Doğal çim kaplamalı tam ölçekli futbol sahası. Resmi maçlar ve Survivor finalleri için ideal.",
        summary: "Doğal çim zemin, resmi kale ve çizgiler, soyunma odaları, tribün ve seyirci alanı.",
        detailTitle: "Tam ölçekli futbol sahası ile okul turnuvalarına ev sahipliği.",
        detailBody:
          "Futbol Sahası, doğal çim zemini ve tribünü ile okul spor şenlikleri ve Survivor kapanış etkinlikleri için ideal.",
        features: [
          "Doğal çim zemin",
          "Resmi kale & çizgiler",
          "Soyunma odaları",
          "Tribün & seyirci alanı",
        ],
        gallery: [divLower, expVolley],
        ctaLabel: "Ziyaret Bilgisi Al",
      },
      {
        slug: "acik-ogrenme-alani",
        name: "Açık Öğrenme Alanları",
        grades: "Açık Alan · Doğa İçinde",
        img: divMiddle,
        text: "Çardak sınıfı, orman zemini, göl kıyısı platformu ve çimenlik ders alanı — 4 farklı konfigürasyon.",
        summary: "Çardak sınıf, orman tahtı oturma grubu, göl kıyısı platform alanı, doğal çimenlik açık sınıf.",
        detailTitle: "Doğanın içinde öğrenme için dört farklı alan.",
        detailBody:
          "Açık Öğrenme Alanları, dört farklı konfigürasyonla tüm atölye programlarına ev sahipliği yapar: gölgeli çardak sınıf, orman tahtı oturma grubu, göl kıyısı platformu ve çimenlik açık sınıf.",
        features: [
          "Çardak sınıf (gölgeli)",
          "Orman tahtı oturma grubu",
          "Göl kıyısı platform alanı",
          "Doğal çimenlik açık sınıf",
        ],
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
      a: "Yaz okulu programlarımız Okul Öncesi (4-6), İlkokul (7-10) ve Ortaokul (11-14) olarak üç ayrı grupta düzenlenir. Atölyelerin kendi yaş aralıkları vardır; detaylar her atölye sayfasında paylaşılır.",
    },
    {
      q: "Konaklama imkanı sunuluyor mu?",
      a: "Yaz okulu kapsamında hafta sonu 1 gece konaklamalı doğa kampı düzenlenir. Bu kamp ebeveyn katılımlıdır ve Cumartesi kamp ateşi programı ile taçlandırılır.",
    },
    {
      q: "Ön koşul / hazırlık gerekiyor mu?",
      a: "Çoğu atölye için herhangi bir ön bilgi gerekmez. Robotik ve İHA gibi ileri programlarda temel düzey beklenebilir; başvurudan sonra yönlendirme yapılır.",
    },
    {
      q: "Okul gezisi için kaç öğrenci gerekir?",
      a: "Standart okul gezisi paketleri tek sınıf (yaklaşık 30 öğrenci) için tasarlanmıştır. Daha büyük gruplar için özel planlama yapılır.",
    },
  ],
  deployConfig: {
    enabled: true,
    webhookUrl: "",
    webhookUrlNote:
      "Boş bırakırsan PocketBase sunucusundaki CF_PAGES_DEPLOY_HOOK_URL ortam değişkeni kullanılır. URL'i buraya yapıştırmak yalnızca görüntüleme amaçlıdır; gerçek POST PocketBase tarafında yapılır.",
    lastDeployAt: "",
    lastDeployStatus: "idle",
    lastDeployMessage: "Henüz bir yayınlama tetiklenmedi.",
    lastDeployTrigger: "",
  },
  footer: {
    brand: "Mogan Kampüs",
    tagline: "Bir Eğitim Kampı",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function itemIdentity(value: unknown) {
  if (typeof value === "string") return value;
  if (!isRecord(value)) return "";
  return String(value.slug || value.level || value.title || value.name || value.q || value.time || "");
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
    educereAtolyeleri: {
      ...content.educereAtolyeleri,
      items: keepLastUniqueItems(content.educereAtolyeleri.items),
    },
    yazOkulu: {
      ...content.yazOkulu,
      levels: keepLastUniqueItems(content.yazOkulu.levels),
    },
    okulGezileri: {
      ...content.okulGezileri,
      items: keepLastUniqueItems(content.okulGezileri.items),
    },
    etkinlikler: {
      ...content.etkinlikler,
      items: keepLastUniqueItems(content.etkinlikler.items),
    },
    deployConfig: {
      ...defaultSiteContent.deployConfig,
      ...(content.deployConfig ?? {}),
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