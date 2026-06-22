import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import type { SiteContent } from "@/lib/site-content.defaults";
import logoPng from "@/assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

type HeaderTheme = {
  background: string;
  tone: "dark" | "light";
};

const defaultHeaderTheme: HeaderTheme = {
  background: "var(--ink)",
  tone: "dark",
};

function resolveHeaderTheme(section: HTMLElement | undefined): HeaderTheme {
  if (!section) return defaultHeaderTheme;

  const configured = section.dataset.headerBg;
  const className = section.className.toString();
  const inlineBackground = section.style.background || section.style.backgroundColor;
  const backgroundSource = `${configured || ""} ${className} ${inlineBackground}`;

  if (backgroundSource.includes("gradient-navy") || backgroundSource.includes("ink")) {
    return defaultHeaderTheme;
  }

  if (backgroundSource.includes("secondary")) {
    return { background: "var(--secondary)", tone: "light" };
  }

  if (backgroundSource.includes("card")) {
    return { background: "var(--card)", tone: "light" };
  }

  return { background: "var(--background)", tone: "light" };
}

function useActiveHeaderTheme() {
  const [theme, setTheme] = useState<HeaderTheme>(defaultHeaderTheme);

  useEffect(() => {
    let frame = 0;
    const shell = document.querySelector<HTMLElement>("main[data-site-shell]");
    if (!shell) return;

    const updateTheme = () => {
      frame = 0;
      const nav = document.querySelector<HTMLElement>("[data-site-nav]");
      const sampleY = (nav?.getBoundingClientRect().bottom || 80) + 1;
      const sections = Array.from(shell.querySelectorAll<HTMLElement>(":scope > section"));
      let activeSection = sections[0];

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= sampleY && rect.bottom > sampleY) {
          activeSection = section;
          break;
        }

        if (rect.top <= sampleY) {
          activeSection = section;
        }
      }

      const nextTheme = resolveHeaderTheme(activeSection);
      setTheme((currentTheme) =>
        currentTheme.background === nextTheme.background && currentTheme.tone === nextTheme.tone
          ? currentTheme
          : nextTheme,
      );
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateTheme);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return theme;
}

function useSectionScrollEffects() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>("main[data-site-shell]");
    if (!shell) return;

    const sections = Array.from(shell.querySelectorAll<HTMLElement>(":scope > section"));

    if (!sections.length) return;

    document.documentElement.dataset.sectionAnimations = "ready";

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) {
      sections.forEach((section) => {
        section.dataset.sectionVisible = "true";
      });
      return;
    }

    const revealed = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting && !revealed.has(target)) {
            revealed.add(target);
            target.dataset.sectionVisible = "true";
          }
        });
      },
      {
        root: null,
        threshold: 0.18,
        rootMargin: "-10% 0px -20% 0px",
      },
    );

    sections.forEach((section, index) => {
      section.dataset.sectionIndex = String(index);
      if (index <= 1) {
        section.dataset.sectionVisible = "true";
        revealed.add(section);
      }
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.sectionAnimations;
    };
  }, []);
}

function useScrollSnapToSections() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>("main[data-site-shell]");
    if (!shell) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;
    let lastScrollY = window.scrollY;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const getNavHeight = () => {
      const nav = document.querySelector<HTMLElement>("[data-site-nav]");
      return nav?.getBoundingClientRect().height || 72;
    };

    const getTargetTop = (section: HTMLElement) =>
      window.scrollY + section.getBoundingClientRect().top - getNavHeight();

    const snapToNearestSection = () => {
      const sections = Array.from(shell.querySelectorAll<HTMLElement>(":scope > section"));
      if (!sections.length) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const snapThreshold = Math.min(viewportHeight * 0.42, 360);
      const sampleY = getNavHeight() + 1;
      const direction = scrollY >= lastScrollY ? 1 : -1;
      lastScrollY = scrollY;

      let activeSectionAllowsFreeScroll = false;
      let activeSectionIndex = 0;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= sampleY && rect.bottom > sampleY) {
          const visibleTop = Math.max(rect.top, 0);
          const visibleBottom = Math.min(rect.bottom, viewportHeight);
          activeSectionAllowsFreeScroll = visibleBottom - visibleTop > viewportHeight * 0.55;
          activeSectionIndex = sections.indexOf(section);
          break;
        }
      }

      if (activeSectionAllowsFreeScroll) return;

      // Prevent snapping away from UtilityBar when the user is near the top
      // of the page, keeping the UtilityBar visible at the first section.
      if (activeSectionIndex === 0 && scrollY < viewportHeight * 0.4) return;

      const candidateIndexes =
        direction > 0
          ? [activeSectionIndex + 1, activeSectionIndex]
          : [activeSectionIndex, activeSectionIndex - 1];

      let targetSection: HTMLElement | null = null;
      let targetDistance = Infinity;

      for (const index of candidateIndexes) {
        const section = sections[index];
        if (!section) continue;
        const distance = Math.abs(scrollY - getTargetTop(section));
        if (distance < targetDistance) {
          targetDistance = distance;
          targetSection = section;
        }
      }

      if (!targetSection || targetDistance <= 16 || targetDistance >= snapThreshold) return;

      isSnapping = true;
      window.scrollTo({
        top: getTargetTop(targetSection),
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
      window.setTimeout(
        () => {
          isSnapping = false;
        },
        reduceMotion.matches ? 0 : 700,
      );
    };

    const onScrollEnd = () => {
      if (!isSnapping) snapToNearestSection();
    };

    const onScroll = () => {
      if (isSnapping) return;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(snapToNearestSection, 250);
    };

    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
}

export function UtilityBar({ content }: { content: SiteContent["utility"] }) {
  return (
    <div
      data-utility-bar=""
      className="text-cream text-xs md:text-sm"
      style={{ background: "var(--ink)", color: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 flex flex-wrap items-center justify-end gap-x-8 gap-y-1">
        <Link to="/iletisim" className="hover:text-accent transition flex items-center gap-2">
          <span aria-hidden>📍</span> {content.location}
        </Link>
        <a
          href={`mailto:${content.email}`}
          className="hover:text-accent transition flex items-center gap-2"
        >
          <span aria-hidden>✉</span> {content.email}
        </a>
        <a
          href={`tel:${content.phone.replace(/\s/g, "")}`}
          className="hover:text-accent transition flex items-center gap-2"
        >
          <span aria-hidden>☎</span> {content.phone}
        </a>
      </div>
    </div>
  );
}

export function Nav({ content }: { content: SiteContent["nav"] }) {
  const theme = useActiveHeaderTheme();
  const isDark = theme.tone === "dark";
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link
        to="/hakkinda"
        className="hover:text-accent transition"
        onClick={() => setMobileMenuOpen(false)}
      >
        Hakkında
      </Link>
      <Link
        to="/programlar"
        className="hover:text-accent transition"
        onClick={() => setMobileMenuOpen(false)}
      >
        Programlar
      </Link>
      <Link
        to="/atolyeler"
        className="hover:text-accent transition"
        onClick={() => setMobileMenuOpen(false)}
      >
        Atölyeler
      </Link>
      <Link
        to="/mekanlar"
        className="hover:text-accent transition"
        onClick={() => setMobileMenuOpen(false)}
      >
        Mekanlar
      </Link>
      <Link
        to="/iletisim"
        className="hover:text-accent transition"
        onClick={() => setMobileMenuOpen(false)}
      >
        İletişim
      </Link>
      <Link
        to="/iletisim"
        className={`px-4 py-2 transition ${
          isDark
            ? "bg-accent text-accent-foreground hover:bg-cream hover:text-primary"
            : "bg-primary text-primary-foreground hover:bg-accent"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        Bilgi Al
      </Link>
    </>
  );

  return (
    <header
      data-site-nav
      className={`sticky top-0 z-40 backdrop-blur border-b transition-colors duration-300 ${
        isDark ? "text-cream border-cream/10" : "text-primary border-border"
      }`}
      style={{ background: theme.background, color: isDark ? "var(--cream)" : "var(--primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoPng} alt="Mogan Kampüs" className="h-14 w-auto" />
          <span
            className={`flex flex-col font-serif text-lg leading-tight transition-colors duration-300 md:text-xl ${
              isDark ? "text-cream" : "text-primary"
            }`}
          >
            <span>{content.brand}</span>
            <span>{content.kicker}</span>
            <span
              className={`whitespace-nowrap text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                isDark ? "text-cream/60" : "text-muted-foreground"
              }`}
            >
              Bir Eğitim Kampüsü
            </span>
          </span>
        </Link>
        <nav
          className={`hidden md:flex items-center gap-8 text-sm tracking-wider uppercase transition-colors duration-300 ${
            isDark ? "text-cream/80" : "text-foreground/80"
          }`}
        >
          {navLinks}
        </nav>
        {isMobile && (
          <button
            type="button"
            aria-label="Menüyü aç"
            className="md:hidden p-2 rounded-md transition hover:opacity-80"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
      </div>
      {isMobile && (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent
            side="right"
            className={`w-3/4 sm:max-w-sm ${isDark ? "bg-ink text-cream" : "bg-background text-foreground"}`}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigasyon Menüsü</SheetTitle>
              <SheetDescription>Mobil navigasyon menüsü</SheetDescription>
            </SheetHeader>
            <nav
              className={`flex flex-col gap-6 text-sm tracking-wider uppercase pt-8 ${isDark ? "text-cream/80" : "text-foreground/80"}`}
            >
              {navLinks}
            </nav>
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
}

export function Footer({ content }: { content: SiteContent["footer"] }) {
  return (
    <footer
      className="bg-ink text-cream px-6 md:px-12 py-6"
      style={{ background: "var(--ink)", color: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto text-xs opacity-60 flex flex-wrap gap-2 justify-between">
        <span>© {new Date().getFullYear()}</span>
        <span>{content.tagline}</span>
      </div>
    </footer>
  );
}

export function SiteChrome({
  content,
  children,
}: {
  content: Pick<SiteContent, "utility" | "nav" | "footer">;
  children: React.ReactNode;
}) {
  useSectionScrollEffects();
  useScrollSnapToSections();

  return (
    <main data-site-shell className="bg-background">
      <UtilityBar content={content.utility} />
      <Nav content={content.nav} />
      {children}
      <Footer content={content.footer} />
    </main>
  );
}
