import { Reveal } from "@/components/Reveal";
import { PreregistrationForm } from "@/components/PreregistrationForm";
import {
  type SiteContent,
} from "@/lib/site-content.defaults";

export function HomeContactSection({
  content,
  faqs,
}: {
  content: SiteContent["contact"];
  faqs: SiteContent["faqs"];
}) {
  return (
    <section
      id="contact"
      className="relative text-primary-foreground py-32 md:py-44 overflow-hidden"
      style={{ background: "var(--gradient-navy)" }}
    >
      {content.backgroundImageUrl && (
        <div className="absolute inset-0 opacity-15">
          <img
            src={content.backgroundImageUrl}
            alt=""
            width={1920}
            height={1280}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="relative px-6 md:px-12 max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-accent mb-6 text-center">
            {content.eyebrow}
          </p>
          <h2 className="text-display text-[14vw] md:text-[10vw] leading-[0.85] mb-10 text-center">
            {content.headline}
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="max-w-xl mx-auto text-lg text-primary-foreground/85 mb-12 font-serif text-center">
            {content.text}
          </p>
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-start mb-16">
            <div className="space-y-6 text-primary-foreground/85">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-2">
                  {content.addressLabel}
                </div>
                <p>
                  {content.address.split("\n").map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-2">
                  {content.phoneLabel}
                </div>
                <a href={`tel:${content.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {content.phone}
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-2">
                  {content.emailLabel}
                </div>
                <a href={`mailto:${content.email}`} className="hover:text-accent">
                  {content.email}
                </a>
              </div>
            </div>
            <PreregistrationForm />
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="border-t border-primary-foreground/20 pt-12">
            <p className="text-sm tracking-[0.25em] uppercase text-accent mb-8 text-center">
              Sıkça Sorulanlar
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {faqs.map((f, index) => (
                <div
                  key={`${f.q}-${index}`}
                  className="bg-primary-foreground/5 p-6 border border-primary-foreground/10"
                >
                  <h3 className="font-serif text-xl mb-3 text-accent">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/80">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}