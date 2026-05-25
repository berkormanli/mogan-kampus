import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getProgramSlug } from "@/lib/content-helpers";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content.defaults";

export function HomeProgramsSection({ content }: { content: SiteContent["programs"] }) {
  const items = content.items.length > 0 ? content.items : defaultSiteContent.programs.items;

  return (
    <section id="programlar" className="bg-secondary py-24 md:py-32">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-3">{content.eyebrow}</p>
          <h2 className="text-display text-primary text-5xl md:text-7xl max-w-4xl">
            {content.headline}
          </h2>
        </Reveal>

        <Reveal>
          <Carousel
            opts={{ align: "start", loop: items.length > 3 }}
            className="pt-16 md:pt-0"
            aria-label="Atölyeler"
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem
                  key={`${getProgramSlug(item)}-${index}`}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <article className="flex h-full min-h-[27rem] flex-col bg-card p-7 md:p-8">
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <span className="text-accent font-display text-4xl">{item.n}</span>
                      <span className="border border-border px-3 py-2 text-right text-[0.65rem] uppercase tracking-[0.16em] text-foreground/65">
                        {item.quote}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl text-primary mb-5 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-foreground/75 leading-relaxed mb-8 line-clamp-5">
                      {item.text}
                    </p>
                    <Link
                      to="/programlar/$slug"
                      params={{ slug: getProgramSlug(item) }}
                      className="mt-auto inline-flex items-center gap-3 self-start text-primary uppercase tracking-widest text-xs border-b-2 border-accent pb-1 hover:gap-5 transition-all"
                    >
                      Detaylı bilgi <span aria-hidden>→</span>
                    </Link>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="left-auto right-14 top-0 h-11 w-11 translate-y-0 border-primary/20 bg-card text-primary hover:bg-primary hover:text-primary-foreground md:-left-14 md:right-auto md:top-1/2 md:-translate-y-1/2"
              aria-label="Önceki atölyeler"
            />
            <CarouselNext
              className="right-0 top-0 h-11 w-11 translate-y-0 border-primary/20 bg-card text-primary hover:bg-primary hover:text-primary-foreground md:-right-14 md:top-1/2 md:-translate-y-1/2"
              aria-label="Sonraki atölyeler"
            />
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
