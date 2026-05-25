import { Reveal } from "@/components/Reveal";
import {
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeAboutSection({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="hakkinda" className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
      <Reveal>
        <p className="text-sm tracking-[0.25em] uppercase text-accent mb-6">{content.eyebrow}</p>
        <h2 className="text-display text-primary text-5xl md:text-8xl leading-[0.95] max-w-5xl">
          {content.headline}
        </h2>
      </Reveal>
      <Reveal delay={150} className="mt-12 grid md:grid-cols-3 gap-8">
        <p className="md:col-start-2 md:col-span-2 text-foreground/80 leading-relaxed font-serif text-xl md:text-2xl">
          {content.text}
        </p>
      </Reveal>
    </section>
  );
}