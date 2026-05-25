import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { WorkshopDetail } from "@/components/PublicPages";
import { SiteChrome } from "@/components/SiteChrome";
import { getMergedSiteContent, getWorkshopBySlug, siteContentQuery } from "@/lib/content-helpers";

export const Route = createFileRoute("/atolyeler/$slug")({
  component: WorkshopDetailRoute,
});

function WorkshopDetailRoute() {
  const { slug } = Route.useParams();
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);
  const item = getWorkshopBySlug(content, slug);

  if (!item) {
    return (
      <SiteChrome content={content}>
        <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
          <h1 className="text-display text-6xl text-primary mb-6">Atölye bulunamadı.</h1>
          <a
            href="/atolyeler"
            className="text-primary uppercase tracking-widest border-b border-accent"
          >
            Atölyelere dön
          </a>
        </section>
      </SiteChrome>
    );
  }

  return (
    <SiteChrome content={content}>
      <WorkshopDetail content={content} item={item} />
    </SiteChrome>
  );
}
