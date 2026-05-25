import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AboutPageContent } from "@/components/PublicPages";
import { SiteChrome } from "@/components/SiteChrome";
import { getMergedSiteContent, siteContentQuery } from "@/lib/content-helpers";

export const Route = createFileRoute("/hakkinda")({
  head: () => ({
    meta: [
      { title: "Hakkında — Mogan Kampüs" },
      {
        name: "description",
        content: "Mogan Kampüs öğrenme yaklaşımı, vizyonu ve deneyim temelli eğitim modeli.",
      },
    ],
  }),
  component: AboutRoute,
});

function AboutRoute() {
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);

  return (
    <SiteChrome content={content}>
      <AboutPageContent content={content} />
    </SiteChrome>
  );
}
