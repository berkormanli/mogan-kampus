import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PublicPages";
import { siteContentQuery, getMergedSiteContent } from "@/lib/content-helpers";
import { defaultSiteContent, type EducereAtolye } from "@/lib/site-content.defaults";

export const Route = createFileRoute("/educere-atolyeleri")({
  head: () => ({
    meta: [
      { title: "Educere Atölyeleri — Mogan Kampüs" },
      {
        name: "description",
        content:
          "Mogan Kampüs bünyesindeki tüm Educere atölyeleri: fen, teknoloji, sanat, doğa, spor ve müzik atölyeleri.",
      },
    ],
  }),
  component: EducereAtolyeleriRoute,
});

function EducereAtolyeleriRoute() {
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);
  const edu = content.educereAtolyeleri ?? defaultSiteContent.educereAtolyeleri;

  const categories = Array.from(new Set(edu.items.map((i) => i.category))).sort((a, b) =>
    a.localeCompare(b, "tr-TR"),
  );

  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  const filtered =
    activeCategory === "Tümü"
      ? edu.items
      : edu.items.filter((i) => i.category === activeCategory);

  return (
    <SiteChrome content={content}>
      <PageHero
        eyebrow={edu.eyebrow}
        headline={edu.headline}
        intro={edu.intro}
      />

      <section className="px-6 md:px-12 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10">
          <CategoryChip
            active={activeCategory === "Tümü"}
            label="Tümü"
            onClick={() => setActiveCategory("Tümü")}
            count={edu.items.length}
          />
          {categories.map((cat) => {
            const count = edu.items.filter((i) => i.category === cat).length;
            return (
              <CategoryChip
                key={cat}
                active={activeCategory === cat}
                label={cat}
                onClick={() => setActiveCategory(cat)}
                count={count}
              />
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <Reveal key={item.slug ?? item.title} delay={(index % 3) * 80}>
              <EducereCard item={item} ctaLabel={edu.ctaLabel} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
              Hangi atölye size uygun?
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Çocuğunuz için en uygun atölyeyi seçmek ya da özel bir program
              oluşturmak için ekibimizle iletişime geçin.
            </p>
            <Link
              to="/iletisim"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-accent"
            >
              {edu.ctaLabel} <span aria-hidden className="ml-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteChrome>
  );
}

function CategoryChip({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider border transition ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground/75 border-border hover:border-primary hover:text-primary"
      }`}
    >
      {label}
      <span className={`ml-2 text-[0.65rem] ${active ? "opacity-80" : "opacity-60"}`}>
        {count}
      </span>
    </button>
  );
}

function EducereCard({
  item,
  ctaLabel,
}: {
  item: EducereAtolye;
  ctaLabel: string;
}) {
  return (
    <article className="group bg-card border border-border h-full flex flex-col overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden bg-secondary">
        {item.img ? (
          <img
            src={item.img}
            alt={item.imgAlt ?? item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-muted-foreground text-sm">
            Görsel
          </div>
        )}
      </div>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <span className="inline-flex w-fit items-center rounded-full bg-accent/10 text-accent text-[0.65rem] font-semibold uppercase tracking-[0.18em] px-3 py-1 mb-4">
          {item.category}
        </span>
        <h3 className="font-serif text-2xl text-primary mb-3 leading-tight">
          {item.title}
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed mb-5 line-clamp-4">
          {item.description}
        </p>
        <dl className="grid grid-cols-2 gap-3 mb-5 text-xs">
          {item.duration && (
            <div>
              <dt className="uppercase tracking-widest text-muted-foreground mb-0.5">
                Süre
              </dt>
              <dd className="text-foreground/85 font-medium">{item.duration}</dd>
            </div>
          )}
          {item.environment && (
            <div>
              <dt className="uppercase tracking-widest text-muted-foreground mb-0.5">
                Ortam
              </dt>
              <dd className="text-foreground/85 font-medium">{item.environment}</dd>
            </div>
          )}
        </dl>
        {item.highlights && item.highlights.length > 0 && (
          <ul className="text-xs text-foreground/70 space-y-1 mb-5">
            {item.highlights.slice(0, 3).map((h, i) => (
              <li key={`${h}-${i}`} className="flex gap-2">
                <span className="text-accent mt-1">•</span>
                <span className="leading-snug">{h}</span>
              </li>
            ))}
          </ul>
        )}
        <Link
          to="/iletisim"
          className="mt-auto inline-flex items-center gap-2 self-start text-primary uppercase tracking-widest text-xs border-b-2 border-accent pb-1 hover:gap-3 transition-all"
        >
          {item.ctaLabel ?? ctaLabel} <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}