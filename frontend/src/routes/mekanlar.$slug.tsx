import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { VenueDetail } from "@/components/PublicPages";
import { SiteChrome } from "@/components/SiteChrome";
import { getMergedSiteContent, getVenueBySlug, siteContentQuery } from "@/lib/content-helpers";

export const Route = createFileRoute("/mekanlar/$slug")({
  component: VenueDetailRoute,
});

function VenueDetailRoute() {
  const { slug } = Route.useParams();
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);
  const item = getVenueBySlug(content, slug);

  if (!item) {
    return (
      <SiteChrome content={content}>
        <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
          <h1 className="text-display text-6xl text-primary mb-6">Mekan bulunamadı.</h1>
          <a
            href="/mekanlar"
            className="text-primary uppercase tracking-widest border-b border-accent"
          >
            Mekanlara dön
          </a>
        </section>
      </SiteChrome>
    );
  }

  return (
    <SiteChrome content={content}>
      <VenueDetail content={content} item={item} />
    </SiteChrome>
  );
}
