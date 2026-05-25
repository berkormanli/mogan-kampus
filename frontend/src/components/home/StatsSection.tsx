import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import {
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeStatsSection({ content }: { content: SiteContent["stats"] }) {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
      <Reveal className="md:col-span-7">
        <p className="text-sm tracking-[0.25em] uppercase text-accent mb-4">{content.eyebrow}</p>
        <h2 className="text-display text-primary text-5xl md:text-7xl leading-[0.95]">
          {content.headlineBefore} <span className="text-accent">{content.headlineAccent}</span>{" "}
          {content.headlineAfter}
        </h2>
        <p className="mt-8 text-lg text-foreground/80 max-w-xl leading-relaxed">{content.text}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/atolyeler"
            className="bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm hover:bg-accent transition"
          >
            {content.primaryCta}
          </Link>
          <Link
            to="/mekanlar"
            className="border-2 border-primary text-primary px-6 py-3 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition"
          >
            {content.secondaryCta}
          </Link>
        </div>
      </Reveal>
      <div className="md:col-span-5 grid grid-cols-3 gap-3">
        {content.items.map((s, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="aspect-square bg-primary text-primary-foreground flex flex-col items-center justify-center p-4 text-center">
              <div className="text-display text-4xl md:text-5xl text-accent">{s.stat}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest mt-2 opacity-80">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}