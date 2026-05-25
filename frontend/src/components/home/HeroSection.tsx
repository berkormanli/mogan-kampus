import { Link } from "@tanstack/react-router";
import {
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeHeroSection({ content }: { content: SiteContent["hero"] }) {
  return (
    <section data-header-bg="ink" className="relative grid md:grid-cols-2">
      <div
        className="relative px-6 md:px-12 lg:px-16 py-20 md:py-28 text-primary-foreground overflow-hidden"
        style={{ background: "var(--gradient-navy)" }}
      >
        <div className="relative z-10 max-w-xl">
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-6">{content.eyebrow}</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
            {content.headlineBefore}{" "}
            <em className="not-italic text-accent">{content.headlineAccent}</em>{" "}
            {content.headlineAfter}
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-md">{content.body}</p>
          <Link
            to="/iletisim"
            className="inline-block bg-transparent border-2 border-primary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:bg-accent hover:border-accent transition"
          >
            {content.cta}
          </Link>
        </div>
        <span
          aria-hidden
          className="absolute -bottom-6 -left-2 text-display text-[28vw] md:text-[14vw] leading-none text-primary-foreground/5 pointer-events-none"
        >
          Mogan.
        </span>
      </div>
      <div className="relative min-h-[55vh] md:min-h-full">
        {content.imageUrl ? (
          <img
            src={content.imageUrl}
            alt={content.imageAlt}
            width={1920}
            height={1280}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary" aria-hidden />
        )}
      </div>
    </section>
  );
}