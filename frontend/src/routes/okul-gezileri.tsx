import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PublicPages";
import { siteContentQuery, getMergedSiteContent } from "@/lib/content-helpers";
import { defaultSiteContent, type OkulGezisi } from "@/lib/site-content.defaults";

export const Route = createFileRoute("/okul-gezileri")({
  head: () => ({
    meta: [
      { title: "Okul Gezileri — Mogan Kampüs" },
      {
        name: "description",
        content:
          "Mogan Kampüs'te okul gezileri: tek günlük doğa, atölye ve spor paketleri. Öğretmeninizle bizimle iletişime geçin.",
      },
    ],
  }),
  component: OkulGezileriRoute,
});

function OkulGezileriRoute() {
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);
  const gezi = content.okulGezileri ?? defaultSiteContent.okulGezileri;

  return (
    <SiteChrome content={content}>
      <PageHero
        eyebrow={gezi.eyebrow}
        headline={gezi.headline}
        intro={gezi.intro}
      />

      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gezi.items.map((item, index) => (
            <Reveal key={item.slug ?? item.title} delay={(index % 3) * 80}>
              <GeziCard item={item} ctaLabel={gezi.ctaLabel} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 max-w-4xl mx-auto">
          <article className="bg-secondary border border-border p-6 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">
              Özel grup programları
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              Yukarıdaki paketler dışında farklı bir kombinasyon, özel bir atölye
              ya da birden çok sınıfın katılımı için bizimle iletişime geçin.
              Mogan Kampüs ekibi size özel bir gün planlayacaktır.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/75 mb-6">
              <li>• Atölye + spor + doğa kombinasyonları</li>
              <li>• Yarım gün ve tam gün seçenekleri</li>
              <li>• Öğle yemeği ve ikramlar dahil paketler</li>
              <li>• Opsiyonel öğretmen brifingi</li>
            </ul>
            <Link
              to="/iletisim"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-accent"
            >
              {gezi.ctaLabel} <span aria-hidden className="ml-1">→</span>
            </Link>
          </article>
        </Reveal>
      </section>
    </SiteChrome>
  );
}

function GeziCard({
  item,
  ctaLabel,
}: {
  item: OkulGezisi;
  ctaLabel: string;
}) {
  return (
    <article className="bg-card border border-border h-full flex flex-col p-6 md:p-7">
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
      <dl className="grid grid-cols-2 gap-3 mb-5 text-xs">
        {item.duration && (
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground mb-0.5">
              Süre
            </dt>
            <dd className="text-foreground/85 font-medium">{item.duration}</dd>
          </div>
        )}
        {item.capacity && (
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground mb-0.5">
              Kontenjan
            </dt>
            <dd className="text-foreground/85 font-medium">{item.capacity}</dd>
          </div>
        )}
      </dl>
      <Link
        to="/iletisim"
        className="mt-auto inline-flex items-center gap-2 self-start text-primary uppercase tracking-widest text-xs border-b-2 border-accent pb-1 hover:gap-3 transition-all"
      >
        {item.ctaLabel ?? ctaLabel} <span aria-hidden>→</span>
      </Link>
    </article>
  );
}