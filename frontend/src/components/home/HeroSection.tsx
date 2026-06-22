import { Link } from "@tanstack/react-router";
import portraitImg from "@/assets/value-kindness.jpg";
import { type SiteContent } from "@/lib/site-content.defaults";

const headlineLines = [
  { key: "headlineBefore", className: "text-[#8bd34a]" },
  { key: "headlineAccent", className: "text-[#29a9ee]" },
  { key: "headlineAfter", className: "text-[#f5a400]" },
] as const;

export function HomeHeroSection({ content }: { content: SiteContent["hero"] }) {
  return (
    <section
      data-header-bg="ink"
      className="relative min-h-[86svh] md:min-h-[calc(100dvh-7.75rem)] overflow-hidden bg-ink text-primary-foreground"
    >
      {content.imageUrl ? (
        <>
          <img
            src={content.imageUrl}
            alt={content.imageAlt}
            width={1920}
            height={1280}
            className="hidden md:block absolute inset-0 h-full w-full object-cover object-[62%_50%]"
          />
          <img
            src={portraitImg}
            alt=""
            width={800}
            height={1024}
            className="md:hidden absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-secondary" aria-hidden />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,31,48,0.94)_0%,rgba(25,42,64,0.82)_36%,rgba(25,42,64,0.36)_68%,rgba(25,42,64,0.1)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,22,34,0.45)_0%,rgba(13,22,34,0.06)_42%,rgba(13,22,34,0.28)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[86svh] max-w-[92rem] items-center px-6 py-16 md:min-h-[calc(100dvh-7.75rem)] md:px-12 lg:px-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.56fr)]">
          <div className="max-w-4xl pt-10 md:pt-0">
            <p className="mb-10 inline-flex rounded-full border border-cream/20 bg-cream/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur md:mb-14">
              {content.eyebrow}
            </p>
            <h1 className="font-display flex max-w-4xl flex-col gap-4 text-6xl font-black uppercase leading-[0.95] tracking-normal [word-spacing:0.5em] drop-shadow-[0_4px_14px_rgba(0,0,0,0.28)] md:gap-6 md:text-8xl lg:text-[8.8rem]">
              {headlineLines.map(({ key, className }) => (
                <span key={key} className={`block ${className}`}>
                  {content[key]}
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-cream/86 md:text-xl md:leading-9">
              {content.body}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/iletisim"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-accent-foreground shadow-lg shadow-black/20 transition hover:bg-cream hover:text-primary"
              >
                {content.cta}
              </Link>
              <Link
                to="/programlar"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-cream/55 bg-cream/10 px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-cream backdrop-blur transition hover:bg-cream hover:text-primary"
              >
                Programları İncele
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="relative aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-lg border border-cream/16 bg-cream/10 shadow-2xl shadow-black/30">
              <img
                src={portraitImg}
                alt="Mogan Kampüs'te gülümseyen çocuklar"
                width={800}
                height={1024}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,50,68,0)_50%,rgba(35,50,68,0.35)_100%)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
