import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PublicPages";
import { siteContentQuery, getMergedSiteContent } from "@/lib/content-helpers";
import { defaultSiteContent, type ScheduleSlot, type YazOkuluLevel } from "@/lib/site-content.defaults";

export const Route = createFileRoute("/yaz-okulu")({
  head: () => ({
    meta: [
      { title: "Yaz Okulu — Mogan Kampüs" },
      {
        name: "description",
        content:
          "Mogan Kampüs Yaz Okulu: Okul Öncesi, İlkokul ve Ortaokul öğrencilerine yönelik haftalık tematik atölye programları ve hafta sonu kamp.",
      },
    ],
  }),
  component: YazOkuluRoute,
});

function YazOkuluRoute() {
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);
  const yazOkulu = content.yazOkulu ?? defaultSiteContent.yazOkulu;

  return (
    <SiteChrome content={content}>
      <PageHero
        eyebrow={yazOkulu.eyebrow}
        headline={yazOkulu.headline}
        intro={yazOkulu.intro}
      />

      <section className="px-4 md:px-12 py-16 md:py-24 max-w-7xl mx-auto space-y-20 md:space-y-28">
        {yazOkulu.levels.map((level, index) => (
          <LevelBlock key={level.slug ?? level.level} level={level} index={index} config={yazOkulu} />
        ))}
      </section>

      <section className="bg-secondary px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
              Hemen Rezervasyon Yapın
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Yaz okulu kontenjanları sınırlıdır. Seviyenize uygun programı seçin,
              ekibimiz en kısa sürede sizinle iletişime geçsin.
            </p>
            <Link
              to="/iletisim"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-accent"
            >
              {yazOkulu.ctaLabel} <span aria-hidden className="ml-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteChrome>
  );
}

function LevelBlock({
  level,
  index,
  config,
}: {
  level: YazOkuluLevel;
  index: number;
  config: { weekLabel: string; dailyNote: string };
}) {
  return (
    <Reveal>
      <article id={level.slug} className="scroll-mt-32">
        <header className="mb-8 md:mb-10">
          <div className="flex items-baseline gap-4 mb-3">
            <span className="font-display text-4xl md:text-5xl text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
              {level.level}
            </h2>
          </div>
          <p className="text-sm uppercase tracking-[0.18em] text-accent mb-4">
            {level.ageRange}
          </p>
          <p className="text-foreground/75 leading-relaxed max-w-3xl">
            {level.intro}
          </p>
        </header>

        <div className="space-y-12">
          {level.weeks.map((week, weekIdx) => (
            <WeekTable
              key={`${level.slug}-week-${weekIdx}`}
              week={week}
              weekNumber={weekIdx + 1}
              weekLabel={config.weekLabel}
            />
          ))}
        </div>

        {level.campNote && (
          <div className="mt-8 border border-accent/30 bg-accent/5 p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-accent mb-2">
              Kamp Notu
            </p>
            <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
              {level.campNote}
            </p>
          </div>
        )}

        {level.ctaLabel && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/iletisim"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-accent"
            >
              {level.ctaLabel} <span aria-hidden className="ml-1">→</span>
            </Link>
          </div>
        )}

        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {config.dailyNote}
        </p>
      </article>
    </Reveal>
  );
}

function WeekTable({
  week,
  weekNumber,
  weekLabel,
}: {
  week: ScheduleSlot[];
  weekNumber: number;
  weekLabel: string;
}) {
  const days = [
    { key: "monday", label: "Pazartesi" },
    { key: "tuesday", label: "Salı" },
    { key: "wednesday", label: "Çarşamba" },
    { key: "thursday", label: "Perşembe" },
    { key: "friday", label: "Cuma" },
  ] as const;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-display text-xl md:text-2xl text-accent">
          {weekLabel} {String(weekNumber).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full text-xs md:text-sm border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left font-semibold uppercase tracking-widest text-accent px-3 md:px-4 py-3 border-b border-border w-[140px]">
                Saat
              </th>
              {days.map((d) => (
                <th
                  key={d.key}
                  className="text-left font-semibold uppercase tracking-widest text-accent px-3 md:px-4 py-3 border-b border-border"
                >
                  {d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {week.map((slot, idx) => (
              <tr
                key={`${slot.time}-${idx}`}
                className={slot.isLunch ? "bg-secondary/40" : slot.isConstant ? "bg-accent/5" : ""}
              >
                <td className="px-3 md:px-4 py-3 border-b border-border font-mono text-foreground/80 align-top whitespace-nowrap">
                  {slot.time}
                </td>
                {days.map((d) => (
                  <td
                    key={`${d.key}-${idx}`}
                    className={`px-3 md:px-4 py-3 border-b border-border align-top ${
                      slot.isConstant ? "text-accent font-medium" : "text-foreground/85"
                    }`}
                  >
                    {slot[d.key] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}