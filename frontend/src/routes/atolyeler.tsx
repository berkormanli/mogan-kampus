import { useQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { WorkshopsIndex } from "@/components/PublicPages";
import { SiteChrome } from "@/components/SiteChrome";
import { getMergedSiteContent, siteContentQuery } from "@/lib/content-helpers";

export const Route = createFileRoute("/atolyeler")({
  head: () => ({
    meta: [
      { title: "Atölyeler — Mogan Kampüs" },
      {
        name: "description",
        content: "Mogan Kampüs atölyeleri, deneyimler ve üretim odaklı öğrenme programları.",
      },
    ],
  }),
  component: WorkshopsRoute,
});

function WorkshopsRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);

  if (pathname.startsWith("/atolyeler/")) {
    return <Outlet />;
  }

  return (
    <SiteChrome content={content}>
      <WorkshopsIndex content={content} />
    </SiteChrome>
  );
}
