import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { getProgramSlug } from "@/lib/content-helpers";
import {
  defaultSiteContent,
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeProgramsSection({ content }: { content: SiteContent["programs"] }) {
  const [active, setActive] = useState(0);
  const items = content.items.length > 0 ? content.items : defaultSiteContent.programs.items;
  const v = items[Math.min(active, items.length - 1)];
  return (
    <section id="programlar" className="bg-secondary py-24 md:py-32">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-3 text-center">
            {content.eyebrow}
          </p>
          <h2 className="text-display text-primary text-5xl md:text-7xl text-center mb-12">
            {content.headline}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-12">
          {items.map((c, i) => (
            <button
              key={`${getProgramSlug(c)}-${i}`}
              onClick={() => setActive(i)}
              className={`py-5 px-4 text-center uppercase tracking-widest text-xs md:text-sm transition-all border-b-4 ${
                i === active
                  ? "bg-primary text-primary-foreground border-accent"
                  : "bg-card text-primary border-transparent hover:border-accent/50"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <Reveal
          key={active}
          className="grid md:grid-cols-2 gap-10 items-center bg-card p-6 md:p-12"
        >
          <div className="aspect-[4/5] overflow-hidden">
            {v.img ? (
              <img
                src={v.img}
                alt={v.title}
                width={800}
                height={1024}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary" aria-hidden />
            )}
          </div>
          <div>
            <div className="text-accent font-display text-5xl mb-4">{v.n}</div>
            <h3 className="font-serif italic text-3xl md:text-4xl text-primary mb-6 leading-tight">
              "{v.quote}"
            </h3>
            <p className="text-foreground/80 leading-relaxed text-lg mb-8">{v.text}</p>
            <Link
              to="/programlar/$slug"
              params={{ slug: getProgramSlug(v) }}
              className="inline-flex items-center gap-3 text-primary uppercase tracking-widest text-sm border-b-2 border-accent pb-1 hover:gap-5 transition-all"
            >
              Detaylı bilgi <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}