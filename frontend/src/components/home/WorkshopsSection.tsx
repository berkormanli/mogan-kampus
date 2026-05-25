import { Reveal } from "@/components/Reveal";
import { getWorkshopSlug } from "@/lib/content-helpers";
import {
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeWorkshopsSection({ content }: { content: SiteContent["workshops"] }) {
  return (
    <section
      id="atolyeler"
      className="bg-ink text-cream py-24 md:py-32"
      style={{ background: "var(--ink)", color: "var(--cream)" }}
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-4">{content.eyebrow}</p>
          <h2
            className="text-display text-5xl md:text-7xl mb-16 max-w-3xl"
            style={{ color: "var(--cream)" }}
          >
            {content.headline}
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10">
          {content.items.map((f, i) => (
            <Reveal key={`${getWorkshopSlug(f)}-${i}`} delay={(i % 3) * 80}>
              <article className="p-8 md:p-10 h-full" style={{ background: "var(--ink)" }}>
                <div className="text-accent font-display text-3xl mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--cream)" }}>
                  {f.title}
                </h3>
                <p className="opacity-70 leading-relaxed text-sm md:text-base">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}