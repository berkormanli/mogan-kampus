import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export function HomeInfoCtaSection() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 text-primary-foreground" style={{ background: "var(--gradient-navy)" }}>
      <Reveal>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display text-5xl md:text-7xl mb-6">
            <span className="text-accent-outline">Tesislerimizi</span>{" "}
            <span>keşfedin,</span>
            <br />
            <span>yaz okulunuzu</span>{" "}
            <span className="text-accent">planlayın.</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Mogan Kampüs'ün güçlü tesis ve olanaklarını yaz okulu kapsamında keşfedin.
            Okulunuz için gezi, atölye veya tam günlük program planlamak üzere bize ulaşın.
          </p>
          <Link
            to="/iletisim"
            className="inline-block bg-accent text-accent-foreground px-10 py-5 uppercase tracking-widest text-sm hover:bg-primary-foreground hover:text-primary transition"
          >
            Bilgi Al
          </Link>
        </div>
      </Reveal>
    </section>
  );
}