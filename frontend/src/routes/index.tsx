import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteChrome } from "@/components/SiteChrome";
import { siteContentQuery } from "@/lib/content-helpers";
import { mergeSiteContent } from "@/lib/site-content.defaults";

import { HomeHeroSection } from "@/components/home/HeroSection";
import { HomeAboutSection } from "@/components/home/AboutSection";
import { HomeProgramsSection } from "@/components/home/ProgramsSection";
import { HomeStatsSection } from "@/components/home/StatsSection";
import { HomeWorkshopsSection } from "@/components/home/WorkshopsSection";
import { HomeGallerySection } from "@/components/home/GallerySection";
import { HomeVenuesSection } from "@/components/home/VenuesSection";
import { HomeTeacherSection } from "@/components/home/TeacherSection";
import { HomeContactSection } from "@/components/home/ContactSection";
import { HomeInfoCtaSection } from "@/components/home/InfoCtaSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mogan Kampüs — Sınıfın Dışında Gerçek Öğrenme" },
      {
        name: "description",
        content:
          "Mogan Gölü kıyısında, deneyim temelli öğrenme ile öğrencileri ulusal ve uluslararası kariyerlere hazırlayan kampüs.",
      },
      { property: "og:title", content: "Mogan Kampüs — Sınıfın Dışında Gerçek Öğrenme" },
      {
        property: "og:description",
        content: "20+ atölye, kariyer programları, ilham veren açık mekanlar. Gölbaşı, Ankara.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { data } = useQuery(siteContentQuery);
  const content = mergeSiteContent(data);

  return (
    <SiteChrome content={content}>
      {/* <HomeHeroSection content={content.hero} /> */}
      <HomeVenuesSection content={content.venues} />
      <HomeProgramsSection content={content.programs} />
      <HomeStatsSection content={content.stats} />
      <HomeWorkshopsSection content={content.workshops} />
      <HomeGallerySection content={content.gallery} />
      <HomeInfoCtaSection />
      <HomeTeacherSection content={content.teacher} />
      <HomeContactSection content={content.contact} faqs={content.faqs} />
    </SiteChrome>
  );
}