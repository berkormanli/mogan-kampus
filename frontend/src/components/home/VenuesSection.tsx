import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { getVenueSlug } from "@/lib/content-helpers";
import {
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeVenuesSection({ content }: { content: SiteContent["venues"] }) {
  return (
    <section id="mekanlar" className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
      <Reveal>
        <p className="text-sm tracking-[0.25em] uppercase text-accent mb-4">{content.eyebrow}</p>
        <h2 className="text-display text-primary text-5xl md:text-7xl mb-6 max-w-3xl">
          {content.headlineBefore} <span className="text-outline">{content.headlineOutline}</span>{" "}
          {content.headlineAfter}
        </h2>
        <p className="text-foreground/70 max-w-2xl mb-16 text-lg">{content.text}</p>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.items.map((d, idx) => (
          <Reveal key={`${getVenueSlug(d)}-${idx}`} delay={idx * 120}>
            <Link
              to="/mekanlar/$slug"
              params={{ slug: getVenueSlug(d) }}
              className="block bg-card group border border-border h-full"
            >
              <div className="aspect-[3/4] overflow-hidden">
                {d.img ? (
                  <img
                    src={d.img}
                    alt={d.name}
                    width={900}
                    height={1200}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary" aria-hidden />
                )}
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-accent mb-2">{d.grades}</div>
                <h3 className="text-2xl text-primary uppercase tracking-wide mb-3">{d.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{d.text}</p>
                <span className="text-xs uppercase tracking-widest text-primary border-b border-primary pb-0.5 group-hover:text-accent group-hover:border-accent transition">
                  {d.ctaLabel || "Keşfet →"}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}