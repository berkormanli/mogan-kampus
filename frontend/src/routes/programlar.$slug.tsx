import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ProgramDetail } from "@/components/PublicPages";
import { SiteChrome } from "@/components/SiteChrome";
import { getMergedSiteContent, getProgramBySlug, siteContentQuery } from "@/lib/content-helpers";

export const Route = createFileRoute("/programlar/$slug")({
  component: ProgramDetailRoute,
});

function ProgramDetailRoute() {
  const { slug } = Route.useParams();
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);
  const item = getProgramBySlug(content, slug);

  if (!item) {
    return (
      <SiteChrome content={content}>
        <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
          <h1 className="text-display text-6xl text-primary mb-6">Program bulunamadı.</h1>
          <a
            href="/programlar"
            className="text-primary uppercase tracking-widest border-b border-accent"
          >
            Programlara dön
          </a>
        </section>
      </SiteChrome>
    );
  }

  return (
    <SiteChrome content={content}>
      <ProgramDetail content={content} item={item} />
    </SiteChrome>
  );
}
