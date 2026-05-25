import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PreregistrationForm } from "@/components/PreregistrationForm";
import { getProgramSlug, getVenueSlug, getWorkshopSlug } from "@/lib/content-helpers";
import type { Program, SiteContent, Venue, Workshop } from "@/lib/site-content.defaults";

export function PageHero({
  eyebrow,
  headline,
  intro,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
}) {
  return (
    <section
      className="px-6 md:px-12 py-20 md:py-28 text-primary-foreground"
      style={{ background: "var(--gradient-navy)" }}
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-5">{eyebrow}</p>
          <h1 className="text-display text-5xl md:text-8xl leading-[0.95] max-w-5xl">{headline}</h1>
          <p className="mt-8 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
            {intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutPageContent({ content }: { content: SiteContent }) {
  return (
    <>
      <PageHero
        eyebrow={content.aboutPage.eyebrow}
        headline={content.aboutPage.headline}
        intro={content.aboutPage.intro}
      />
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-6xl text-primary mb-10">
            {content.aboutPage.valuesTitle}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {content.aboutPage.values.map((value, index) => (
            <Reveal key={`${value.title}-${index}`} delay={index * 100}>
              <article className="border border-border bg-card p-8 h-full">
                <div className="text-accent font-display text-4xl mb-4">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-2xl text-primary mb-3">{value.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{value.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 grid md:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <h2 className="text-display text-primary text-5xl md:text-7xl leading-[0.95]">
            {content.aboutPage.missionTitle}
          </h2>
          <div>
            <p className="font-serif text-2xl text-foreground/80 leading-relaxed">
              {content.aboutPage.missionText}
            </p>
            <Link
              to="/iletisim"
              className="inline-block mt-8 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm hover:bg-accent transition"
            >
              {content.aboutPage.ctaLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export function ProgramsIndex({ content }: { content: SiteContent }) {
  return (
    <>
      <PageHero
        eyebrow={content.programsPage.eyebrow}
        headline={content.programsPage.headline}
        intro={content.programsPage.intro}
      />
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {content.programs.items.map((item, index) => (
            <Reveal key={`${getProgramSlug(item)}-${index}`} delay={(index % 2) * 100}>
              <ProgramCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function ProgramDetail({ content, item }: { content: SiteContent; item: Program }) {
  return (
    <DetailPage
      eyebrow={content.programsPage.eyebrow}
      title={item.detailTitle || item.title}
      intro={item.summary || item.text}
      image={item.img}
      imageAlt={item.title}
      body={item.detailBody || item.text}
      facts={[
        ["Yaş Aralığı", item.ageRange],
        ["Süre", item.duration],
      ]}
      listTitle="Program çıktıları"
      list={item.outcomes}
      gallery={item.gallery}
      ctaLabel={item.ctaLabel || content.programsPage.ctaLabel}
    />
  );
}

export function WorkshopsIndex({ content }: { content: SiteContent }) {
  return (
    <>
      <PageHero
        eyebrow={content.workshopsPage.eyebrow}
        headline={content.workshopsPage.headline}
        intro={content.workshopsPage.intro}
      />
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.workshops.items.map((item, index) => (
            <Reveal key={`${getWorkshopSlug(item)}-${index}`} delay={(index % 3) * 80}>
              <WorkshopCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function WorkshopDetail({ content, item }: { content: SiteContent; item: Workshop }) {
  return (
    <DetailPage
      eyebrow={content.workshopsPage.eyebrow}
      title={item.detailTitle || item.title}
      intro={item.summary || item.text}
      image={item.img}
      imageAlt={item.title}
      body={item.detailBody || item.text}
      facts={[
        ["Yaş Aralığı", item.ageRange],
        ["Süre", item.duration],
        ["Kapasite", item.capacity],
      ]}
      listTitle="Beceriler"
      list={item.skills}
      gallery={item.gallery}
      ctaLabel={item.ctaLabel || content.workshopsPage.ctaLabel}
    />
  );
}

export function VenuesIndex({ content }: { content: SiteContent }) {
  return (
    <>
      <PageHero
        eyebrow={content.venuesPage.eyebrow}
        headline={content.venuesPage.headline}
        intro={content.venuesPage.intro}
      />
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.venues.items.map((item, index) => (
            <Reveal key={`${getVenueSlug(item)}-${index}`} delay={(index % 3) * 100}>
              <VenueCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function VenueDetail({ content, item }: { content: SiteContent; item: Venue }) {
  return (
    <DetailPage
      eyebrow={content.venuesPage.eyebrow}
      title={item.detailTitle || item.name}
      intro={item.summary || item.text}
      image={item.img}
      imageAlt={item.name}
      body={item.detailBody || item.text}
      facts={[["Alan", item.grades]]}
      listTitle="Öne çıkanlar"
      list={item.features}
      gallery={item.gallery}
      ctaLabel={item.ctaLabel || content.venuesPage.ctaLabel}
    />
  );
}

export function ContactPageContent({ content }: { content: SiteContent }) {
  return (
    <>
      <PageHero
        eyebrow={content.contactPage.eyebrow}
        headline={content.contactPage.headline}
        intro={content.contactPage.intro}
      />
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <Reveal>
            <h2 className="font-serif text-4xl text-primary mb-8">
              {content.contactPage.visitTitle}
            </h2>
            <div className="space-y-6 text-foreground/75">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-2">
                  {content.contact.addressLabel}
                </div>
                <p>
                  {content.contact.address.split("\n").map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-2">
                  {content.contact.phoneLabel}
                </div>
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {content.contact.phone}
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-2">
                  {content.contact.emailLabel}
                </div>
                <a href={`mailto:${content.contact.email}`} className="hover:text-accent">
                  {content.contact.email}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <PreregistrationForm variant="light" />
          </Reveal>
        </div>
        <Reveal className="mt-20">
          <h2 className="font-serif text-4xl text-primary mb-8 text-center">
            {content.contactPage.faqTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {content.faqs.map((item, index) => (
              <article key={`${item.q}-${index}`} className="bg-card border border-border p-6">
                <h3 className="font-serif text-xl text-primary mb-3">{item.q}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ProgramCard({ item }: { item: Program }) {
  return (
    <Link
      to="/programlar/$slug"
      params={{ slug: getProgramSlug(item) }}
      className="group block bg-card border border-border h-full"
    >
      <div className="aspect-[16/10] overflow-hidden">
        {item.img ? (
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        ) : (
          <div className="w-full h-full bg-secondary" aria-hidden />
        )}
      </div>
      <div className="p-7">
        <div className="text-accent font-display text-4xl mb-3">{item.n}</div>
        <h2 className="font-serif text-3xl text-primary mb-3">{item.title}</h2>
        <p className="text-foreground/70 leading-relaxed mb-5">{item.summary || item.text}</p>
        <span className="text-xs uppercase tracking-widest text-primary border-b border-accent pb-1 group-hover:text-accent transition">
          Detaylı Bilgi →
        </span>
      </div>
    </Link>
  );
}

function WorkshopCard({ item }: { item: Workshop }) {
  return (
    <Link
      to="/atolyeler/$slug"
      params={{ slug: getWorkshopSlug(item) }}
      className="group block border border-border bg-card p-7 h-full"
    >
      <h2 className="font-serif text-2xl text-primary mb-3">{item.title}</h2>
      <p className="text-foreground/70 leading-relaxed text-sm mb-6">{item.summary || item.text}</p>
      <span className="text-xs uppercase tracking-widest text-primary border-b border-accent pb-1 group-hover:text-accent transition">
        Atölyeyi İncele →
      </span>
    </Link>
  );
}

function VenueCard({ item }: { item: Venue }) {
  return (
    <Link
      to="/mekanlar/$slug"
      params={{ slug: getVenueSlug(item) }}
      className="group block bg-card border border-border h-full"
    >
      <div className="aspect-[3/4] overflow-hidden">
        {item.img ? (
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        ) : (
          <div className="w-full h-full bg-secondary" aria-hidden />
        )}
      </div>
      <div className="p-6">
        <div className="text-xs uppercase tracking-widest text-accent mb-2">{item.grades}</div>
        <h2 className="text-2xl text-primary uppercase tracking-wide mb-3">{item.name}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {item.summary || item.text}
        </p>
        <span className="text-xs uppercase tracking-widest text-primary border-b border-primary pb-0.5 group-hover:text-accent group-hover:border-accent transition">
          {item.ctaLabel || "Keşfet →"}
        </span>
      </div>
    </Link>
  );
}

function DetailPage({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  body,
  facts,
  listTitle,
  list,
  gallery,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt: string;
  body: string;
  facts: [string, string | undefined][];
  listTitle: string;
  list?: string[];
  gallery?: string[];
  ctaLabel: string;
}) {
  const visibleFacts = facts.filter(([, value]) => value);
  const visibleGallery = gallery?.filter(Boolean) || [];

  return (
    <>
      <PageHero eyebrow={eyebrow} headline={title} intro={intro} />
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <Reveal>
            {image && (
              <div className="aspect-[4/3] overflow-hidden mb-10">
                <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="font-serif text-2xl md:text-3xl text-foreground/80 leading-relaxed">
              {body}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <aside className="bg-secondary border border-border p-8">
              {visibleFacts.length > 0 && (
                <div className="space-y-5 mb-8">
                  {visibleFacts.map(([label, value]) => (
                    <div key={label}>
                      <div className="text-xs uppercase tracking-widest text-accent mb-1">
                        {label}
                      </div>
                      <div className="text-primary font-serif text-2xl">{value}</div>
                    </div>
                  ))}
                </div>
              )}
              {list && list.length > 0 && (
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-accent mb-4">
                    {listTitle}
                  </h2>
                  <ul className="space-y-3 text-foreground/75">
                    {list.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex gap-3">
                        <span className="text-accent">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                to="/iletisim"
                className="inline-block mt-8 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm hover:bg-accent transition"
              >
                {ctaLabel}
              </Link>
            </aside>
          </Reveal>
        </div>
        {visibleGallery.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mt-16">
            {visibleGallery.map((src, index) => (
              <Reveal key={`${src}-${index}`} delay={(index % 2) * 100}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
