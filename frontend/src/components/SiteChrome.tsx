import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content.defaults";
import logoPng from "@/assets/logo.png";

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
      const sections = Array.from(
        shell.querySelectorAll<HTMLElement>(":scope > section"),
      );
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
    shell.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      shell.removeEventListener("scroll", scheduleUpdate);
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

    document.body.dataset.siteScrollShell = "ready";
    document.documentElement.dataset.sectionAnimations = "ready";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        root: shell,
        threshold: 0.18,
        rootMargin: "-10% 0px -20% 0px",
      },
    );

    sections.forEach((section, index) => {
      section.dataset.sectionIndex = String(index);
      if (index === 0) {
        section.dataset.sectionVisible = "true";
        revealed.add(section);
      }
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      delete document.body.dataset.siteScrollShell;
      delete document.documentElement.dataset.sectionAnimations;
    };
  }, []);
}

function useScrollSnapToSections() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>("main[data-site-shell]");
    if (!shell) {
      console.log("[snap] no shell found");
      return;
    }

    console.log("[snap] hook mounted, shell found");

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;

    const getNavHeight = () => {
      const nav = document.querySelector<HTMLElement>("[data-site-nav]");
      const h = nav?.getBoundingClientRect().height || 72;
      return h;
    };

    const getSectionTop = (section: HTMLElement) => {
      const shellRect = shell.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      return sectionRect.top - shellRect.top + shell.scrollTop;
    };

    const snapToNearestSection = (source: string) => {
      console.log(`[snap] called from ${source}`);
      const sections = Array.from(shell.querySelectorAll<HTMLElement>(":scope > section"));
      console.log(`[snap] found ${sections.length} sections`);
      if (!sections.length) return;

      const scrollTop = shell.scrollTop;
      const viewportHeight = shell.clientHeight;
      const snapThreshold = viewportHeight * 0.5;
      const navHeight = getNavHeight();

      console.log(`[snap] scrollTop=${scrollTop}, viewportHeight=${viewportHeight}, navHeight=${navHeight}, threshold=${snapThreshold}`);

      // Allow free scrolling when more than half the viewport is already the
      // current section — prevents snapping back inside tall sections.
      const shellRect = shell.getBoundingClientRect();
      const sampleY = shellRect.top + navHeight + 1;
      let dominantSectionFillsViewport = false;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= sampleY && rect.bottom > sampleY) {
          const visibleTop = Math.max(rect.top, shellRect.top);
          const visibleBottom = Math.min(rect.bottom, shellRect.bottom);
          const visibleHeight = visibleBottom - visibleTop;
          if (visibleHeight > viewportHeight * 0.5) {
            dominantSectionFillsViewport = true;
          }
          break;
        }
      }

      if (dominantSectionFillsViewport) {
        console.log(`[snap] -> SKIPPED (dominant section fills >50% of viewport — free scroll)`);
        return;
      }

      // If two sections are roughly equally visible (neither dominates the
      // viewport), snap to the closer one only when it's reasonably near.
      let closestSection: HTMLElement | null = null;
      let closestDistance = Infinity;

      for (const section of sections) {
        const rawTop = getSectionTop(section);
        const sectionTop = rawTop - navHeight;
        const distance = Math.abs(scrollTop - sectionTop);

        console.log(`[snap] section id=${section.id || "no-id"} rawTop=${rawTop} sectionTop=${sectionTop} distance=${distance}`);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section;
        }
      }

      console.log(`[snap] closestSection=${closestSection?.id || closestSection?.tagName || "null"}, closestDistance=${closestDistance}`);

      if (
        closestSection &&
        closestDistance < snapThreshold &&
        closestDistance > 20
      ) {
        console.log(`[snap] -> WILL SNAP to ${closestSection.id || "no-id"}`);
        isSnapping = true;
        const targetTop = getSectionTop(closestSection) - navHeight;
        console.log(`[snap] scrollTo({ top: ${targetTop}, behavior: "smooth" })`);
        shell.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
        setTimeout(() => {
          console.log("[snap] isSnapping reset to false");
          isSnapping = false;
        }, 1000);
      } else {
        console.log(`[snap] -> SKIPPED (threshold check failed)`);
      }
    };

    const onScrollEnd = () => {
      if (isSnapping) {
        console.log("[snap] scrollend fired while isSnapping=true, ignoring");
        return;
      }
      console.log("[snap] scrollend event");
      snapToNearestSection("scrollend");
    };

    const onScroll = () => {
      if (isSnapping) {
        console.log("[snap] scroll event while isSnapping=true, ignoring");
        return;
      }
      console.log("[snap] scroll event, scheduling debounce");
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => snapToNearestSection("debounce"), 350);
    };

    shell.addEventListener("scrollend", onScrollEnd);
    shell.addEventListener("scroll", onScroll, { passive: true });

    console.log("[snap] listeners attached");

    return () => {
      console.log("[snap] hook cleanup");
      shell.removeEventListener("scrollend", onScrollEnd);
      shell.removeEventListener("scroll", onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
}

export function UtilityBar({ content }: { content: SiteContent["utility"] }) {
  return (
    <div
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
          <img
            src={logoPng}
            alt="Mogan Kampüs"
            className="h-14 w-auto"
          />
          <span
            className={`font-serif text-lg md:text-xl leading-tight transition-colors duration-300 ${
              isDark ? "text-cream" : "text-primary"
            }`}
          >
            {content.brand}
            <br className="hidden md:block" />
            <span
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                isDark ? "text-cream/60" : "text-muted-foreground"
              }`}
            >
              {content.kicker}
            </span>
          </span>
        </Link>
        <nav
          className={`hidden md:flex items-center gap-8 text-sm tracking-wider uppercase transition-colors duration-300 ${
            isDark ? "text-cream/80" : "text-foreground/80"
          }`}
        >
          <Link to="/hakkinda" className="hover:text-accent transition">
            Hakkında
          </Link>
          <Link to="/programlar" className="hover:text-accent transition">
            Programlar
          </Link>
          <Link to="/atolyeler" className="hover:text-accent transition">
            Atölyeler
          </Link>
          <Link to="/mekanlar" className="hover:text-accent transition">
            Mekanlar
          </Link>
          <Link to="/iletisim" className="hover:text-accent transition">
            İletişim
          </Link>
          <Link
            to="/iletisim"
            className={`px-4 py-2 transition ${
              isDark
                ? "bg-accent text-accent-foreground hover:bg-cream hover:text-primary"
                : "bg-primary text-primary-foreground hover:bg-accent"
            }`}
          >
            Bilgi Al
          </Link>
        </nav>
      </div>
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
