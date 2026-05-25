import { Reveal } from "@/components/Reveal";
import {
  defaultSiteContent,
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeGallerySection({ content }: { content: SiteContent["gallery"] }) {
  const tiles =
    content.imageUrls.filter(Boolean).length > 0
      ? content.imageUrls.filter(Boolean)
      : defaultSiteContent.gallery.imageUrls;
  return (
    <section className="bg-secondary py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-4">{content.eyebrow}</p>
          <h2 className="text-display text-primary text-5xl md:text-8xl">{content.headline}</h2>
        </Reveal>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-2">
        {tiles.map((src, i) => (
          <Reveal key={i} delay={(i % 3) * 100}>
            <div className="aspect-square overflow-hidden">
              <img
                src={src}
                alt="Mogan Kampüs'ten kareler"
                width={900}
                height={900}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}