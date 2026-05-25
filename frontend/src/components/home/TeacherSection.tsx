import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import {
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeTeacherSection({ content }: { content: SiteContent["teacher"] }) {
  return (
    <section className="bg-secondary py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-4">{content.eyebrow}</p>
          <h2 className="text-display text-primary text-5xl md:text-6xl leading-[0.95] mb-6">
            {content.headlineBefore} <span className="text-accent">{content.headlineAccent}</span>
            {content.headlineAfter}
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed mb-6">{content.text}</p>
          <Link
            to="/iletisim"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm hover:bg-accent transition"
          >
            {content.cta}
          </Link>
        </Reveal>
        <Reveal delay={150}>
          <div className="bg-card border border-border p-8 md:p-10">
            <h3 className="font-serif text-2xl text-primary mb-6">{content.cardTitle}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{content.cardText}</p>
            <ul className="space-y-3 text-foreground/80">
              {content.bullets.map((x, index) => (
                <li key={`${x}-${index}`} className="flex gap-3">
                  <span className="text-accent">→</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}