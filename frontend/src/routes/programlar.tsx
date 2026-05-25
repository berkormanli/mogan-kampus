import { useQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { ProgramsIndex } from "@/components/PublicPages";
import { SiteChrome } from "@/components/SiteChrome";
import { getMergedSiteContent, siteContentQuery } from "@/lib/content-helpers";

export const Route = createFileRoute("/programlar")({
  head: () => ({
    meta: [
      { title: "Programlar — Mogan Kampüs" },
      {
        name: "description",
        content: "Mogan Kampüs kariyer programları ve tematik öğrenme deneyimleri.",
      },
    ],
  }),
  component: ProgramsRoute,
});

function ProgramsRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);

  if (pathname.startsWith("/programlar/")) {
    return <Outlet />;
  }

  return (
    <SiteChrome content={content}>
      <ProgramsIndex content={content} />
    </SiteChrome>
  );
}
