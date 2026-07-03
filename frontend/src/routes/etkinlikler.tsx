import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PublicPages";
import { siteContentQuery, getMergedSiteContent } from "@/lib/content-helpers";
import { defaultSiteContent, type Etkinlik } from "@/lib/site-content.defaults";

export const Route = createFileRoute("/etkinlikler")({
  head: () => ({
    meta: [
      { title: "Etkinlikler — Mogan Kampüs" },
      {
        name: "description",
        content:
          "Mogan Kampüs yıl boyu etkinlikleri: Yıldız Gözlemi Geceleri, Açık Bahçe Günü ve Kamp Ateşi Geceleri.",
      },
    ],
  }),
  component: EtkinliklerRoute,
});

function EtkinliklerRoute() {
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);
  const etkinlik = content.etkinlikler ?? defaultSiteContent.etkinlikler;

  return (
    <SiteChrome content={content}>
      <PageHero
        eyebrow={etkinlik.eyebrow}
        headline={etkinlik.headline}
        intro={etkinlik.intro}
      />

      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {etkinlik.items.map((item, index) => (
            <Reveal key={item.slug ?? item.title} delay={(index % 3) * 80}>
              <EtkinlikCard item={item} ctaLabel={etkinlik.ctaLabel} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-accent mb-3">
            Takvimi Kaçırma
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            Yeni etkinliklerden haberdar olun
          </h2>
          <p className="text-foreground/75 leading-relaxed mb-6">
            Mogan Kampüs'ün açık etkinliklerine katılmak ya da özel davet
            almak için iletişim formunu doldurun.
          </p>
          <Link
            to="/iletisim"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-accent"
          >
            {etkinlik.ctaLabel} <span aria-hidden className="ml-1">→</span>
          </Link>
        </Reveal>
      </section>
    </SiteChrome>
  );
}

function EtkinlikCard({
  item,
  ctaLabel,
}: {
  item: Etkinlik;
  ctaLabel: string;
}) {
  return (
    <article className="bg-card border border-border h-full flex flex-col p-6 md:p-7">
      {item.date && (
        <span className="inline-flex w-fit items-center rounded-full bg-accent/10 text-accent text-[0.65rem] font-semibold uppercase tracking-[0.18em] px-3 py-1 mb-4">
          {item.date}
        </span>
      )}
      <h3 className="font-serif text-2xl text-primary mb-3 leading-tight">
        {item.title}
      </h3>
      <p className="text-sm text-foreground/75 leading-relaxed mb-4">
        {item.summary}
      </p>
      {item.detailBody && (
        <p className="text-xs text-foreground/65 leading-relaxed mb-5">
          {item.detailBody}
        </p>
      )}
      <Link
        to="/iletisim"
        className="mt-auto inline-flex items-center gap-2 self-start text-primary uppercase tracking-widest text-xs border-b-2 border-accent pb-1 hover:gap-3 transition-all"
      >
        {item.ctaLabel ?? ctaLabel} <span aria-hidden>→</span>
      </Link>
    </article>
  );
}