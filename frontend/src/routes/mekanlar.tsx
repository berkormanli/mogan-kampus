import { useQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { VenuesIndex } from "@/components/PublicPages";
import { SiteChrome } from "@/components/SiteChrome";
import { getMergedSiteContent, siteContentQuery } from "@/lib/content-helpers";

export const Route = createFileRoute("/mekanlar")({
  head: () => ({
    meta: [
      { title: "Mekanlar — Mogan Kampüs" },
      {
        name: "description",
        content: "Mogan Kampüs açık alanları, atölyeleri ve öğrenme mekanları.",
      },
    ],
  }),
  component: VenuesRoute,
});

function VenuesRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);

  if (pathname.startsWith("/mekanlar/")) {
    return <Outlet />;
  }

  return (
    <SiteChrome content={content}>
      <VenuesIndex content={content} />
    </SiteChrome>
  );
}
