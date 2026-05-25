import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ContactPageContent } from "@/components/PublicPages";
import { SiteChrome } from "@/components/SiteChrome";
import { getMergedSiteContent, siteContentQuery } from "@/lib/content-helpers";

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim — Mogan Kampüs" },
      {
        name: "description",
        content: "Mogan Kampüs ön kayıt, ziyaret, telefon ve e-posta iletişim bilgileri.",
      },
    ],
  }),
  component: ContactRoute,
});

function ContactRoute() {
  const { data } = useQuery(siteContentQuery);
  const content = getMergedSiteContent(data);

  return (
    <SiteChrome content={content}>
      <ContactPageContent content={content} />
    </SiteChrome>
  );
}
