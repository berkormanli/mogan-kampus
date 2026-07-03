import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { type SiteContent } from "@/lib/site-content.defaults";

export function HomeEducereAtolyeleriSection({
  content,
}: {
  content: SiteContent["educereAtolyeleri"];
}) {
  const items = content.items ?? [];
  if (!items.length) return null;

  const featured = items.slice(0, 6);

  return (
    <section
      id="educere-atolyeleri"
      className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto"
    >
      <Reveal>
        <p className="text-sm tracking-[0.25em] uppercase text-accent mb-4">
          {content.eyebrow}
        </p>
        <h2 className="text-display text-primary text-5xl md:text-7xl mb-6 max-w-4xl">
          {content.headline}
        </h2>
        <p className="text-foreground/70 max-w-2xl mb-12 md:mb-16 text-lg">
          {content.intro}
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featured.map((item, index) => (
          <Reveal key={item.slug ?? item.title} delay={(index % 3) * 100}>
            <article className="bg-card border border-border h-full flex flex-col overflow-hidden group">
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
                <h3 className="font-serif text-xl md:text-2xl text-primary mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-5 line-clamp-3">
                  {item.description}
                </p>
                <Link
                  to="/educere-atolyeleri"
                  className="mt-auto inline-flex items-center gap-2 self-start text-primary uppercase tracking-widest text-xs border-b-2 border-accent pb-1 hover:gap-3 transition-all"
                >
                  {item.ctaLabel ?? content.ctaLabel} <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-8">
          <p className="text-foreground/70 text-sm max-w-xl">
            Eğitim kampımızda uygulanan <strong className="text-primary">{items.length}+ atölye</strong>{" "}
            var. Hepsini görmek için Educere Atölyeleri sayfasına göz atın.
          </p>
          <Link
            to="/educere-atolyeleri"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-accent"
          >
            Tüm Atölyeleri Gör <span aria-hidden className="ml-1">→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}