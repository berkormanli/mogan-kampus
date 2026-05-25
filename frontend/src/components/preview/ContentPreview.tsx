import { HomeHeroSection } from "@/components/home/HeroSection";
import { HomeAboutSection } from "@/components/home/AboutSection";
import { HomeProgramsSection } from "@/components/home/ProgramsSection";
import { HomeStatsSection } from "@/components/home/StatsSection";
import { HomeWorkshopsSection } from "@/components/home/WorkshopsSection";
import { HomeGallerySection } from "@/components/home/GallerySection";
import { HomeVenuesSection } from "@/components/home/VenuesSection";
import { HomeTeacherSection } from "@/components/home/TeacherSection";
import { HomeContactSection } from "@/components/home/ContactSection";
import { AboutPageContent, ContactPageContent, ProgramsIndex, WorkshopsIndex, VenuesIndex } from "@/components/PublicPages";
import { PreviewProvider } from "@/components/preview/PreviewContext";
import type { SiteContent } from "@/lib/site-content.defaults";

function UtilityBarPreview({ utility }: { utility: SiteContent["utility"] }) {
  return (
    <div className="text-cream text-xs md:text-sm" style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 flex flex-wrap items-center justify-end gap-x-8 gap-y-1">
        <span className="flex items-center gap-2">
          <span aria-hidden>📍</span> {utility.location}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden>✉</span> {utility.email}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden>☎</span> {utility.phone}
        </span>
      </div>
    </div>
  );
}

function NavPreview({ nav }: { nav: SiteContent["nav"] }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-cream/10 text-cream" style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block w-10 h-10 rounded-full border-2 border-accent bg-accent text-accent-foreground grid place-items-center font-display text-sm">
            MK
          </span>
          <span className="font-serif text-lg md:text-xl leading-tight text-cream">
            {nav.brand}
            <br className="hidden md:block" />
            <span className="text-xs tracking-[0.2em] uppercase text-cream/60">
              {nav.kicker}
            </span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wider uppercase text-cream/80">
          <span>Hakkında</span>
          <span>Programlar</span>
          <span>Atölyeler</span>
          <span>Mekanlar</span>
          <span>İletişim</span>
          <span className="px-4 py-2 bg-accent text-accent-foreground">Başvur</span>
        </nav>
      </div>
    </header>
  );
}

function FaqsPreview({ faqs }: { faqs: SiteContent["faqs"] }) {
  return (
    <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto">
      <p className="text-sm tracking-[0.25em] uppercase text-accent mb-8 text-center">
        Sıkça Sorulanlar
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {faqs.map((f, index) => (
          <div
            key={`${f.q}-${index}`}
            className="bg-card border border-border p-6"
          >
            <h3 className="font-serif text-xl text-primary mb-3">{f.q}</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterPreview({ footer }: { footer: SiteContent["footer"] }) {
  return (
    <footer className="bg-ink text-cream px-6 md:px-12 py-6" style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto text-xs opacity-60 flex flex-wrap gap-2 justify-between">
        <span>© {new Date().getFullYear()}</span>
        <span>{footer.tagline}</span>
      </div>
    </footer>
  );
}

export function ContentPreview({
  sectionKey,
  content,
}: {
  sectionKey: keyof SiteContent;
  content: SiteContent;
}) {
  return (
    <PreviewProvider isPreview={true}>
      <div className="content-preview overflow-auto h-full bg-background">
        {sectionKey === "hero" && <HomeHeroSection content={content.hero} />}
        {sectionKey === "about" && <HomeAboutSection content={content.about} />}
        {sectionKey === "programs" && <HomeProgramsSection content={content.programs} />}
        {sectionKey === "stats" && <HomeStatsSection content={content.stats} />}
        {sectionKey === "workshops" && <HomeWorkshopsSection content={content.workshops} />}
        {sectionKey === "gallery" && <HomeGallerySection content={content.gallery} />}
        {sectionKey === "venues" && <HomeVenuesSection content={content.venues} />}
        {sectionKey === "teacher" && <HomeTeacherSection content={content.teacher} />}
        {sectionKey === "contact" && <HomeContactSection content={content.contact} faqs={content.faqs} />}
        {sectionKey === "aboutPage" && <AboutPageContent content={content} />}
        {sectionKey === "programsPage" && <ProgramsIndex content={content} />}
        {sectionKey === "workshopsPage" && <WorkshopsIndex content={content} />}
        {sectionKey === "venuesPage" && <VenuesIndex content={content} />}
        {sectionKey === "contactPage" && <ContactPageContent content={content} />}
        {sectionKey === "utility" && <UtilityBarPreview utility={content.utility} />}
        {sectionKey === "nav" && <NavPreview nav={content.nav} />}
        {sectionKey === "faqs" && <FaqsPreview faqs={content.faqs} />}
        {sectionKey === "footer" && <FooterPreview footer={content.footer} />}
      </div>
    </PreviewProvider>
  );
}