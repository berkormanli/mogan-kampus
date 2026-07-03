import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { type SiteContent } from "@/lib/site-content.defaults";

export function HomeYazOkuluSection({ content }: { content: SiteContent["yazOkulu"] }) {
  const levels = content.levels ?? [];
  if (!levels.length) return null;

  return (
    <section
      id="yaz-okulu"
      data-header-bg="ink"
      className="bg-ink text-cream py-24 md:py-32"
      style={{ background: "var(--ink)", color: "var(--cream)" }}
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-4">
            {content.eyebrow}
          </p>
          <h2
            className="text-display text-5xl md:text-7xl mb-6 max-w-4xl"
            style={{ color: "var(--cream)" }}
          >
            {content.headline}
          </h2>
          <p className="text-cream/75 max-w-2xl mb-12 md:mb-16 text-lg">
            {content.intro}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {levels.map((level, index) => (
            <Reveal key={level.slug ?? level.level} delay={index * 120}>
              <article className="border border-cream/15 bg-cream/5 h-full p-7 md:p-8 flex flex-col">
                <span className="font-display text-3xl text-accent mb-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mb-2" style={{ color: "var(--cream)" }}>
                  {level.level}
                </h3>
                <p className="text-xs uppercase tracking-[0.18em] text-accent mb-4">
                  {level.ageRange}
                </p>
                <p className="text-cream/70 leading-relaxed text-sm mb-6 line-clamp-4">
                  {level.intro}
                </p>
                <Link
                  to="/yaz-okulu"
                  className="mt-auto inline-flex items-center gap-2 self-start text-cream uppercase tracking-widest text-xs border-b-2 border-accent pb-1 hover:gap-3 transition-all"
                >
                  Programı İncele <span aria-hidden>→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-cream/15 pt-8">
            <p className="text-cream/70 text-sm max-w-xl">
              Hafta içi atölyeler, hafta sonu konaklamalı kamp ateşi programı ve ebeveyn katılımıyla dolu dolu bir yaz.
            </p>
            <Link
              to="/yaz-okulu"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-accent-foreground shadow-lg shadow-black/20 transition hover:bg-cream hover:text-primary"
            >
              Tüm Programı Gör <span aria-hidden className="ml-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}