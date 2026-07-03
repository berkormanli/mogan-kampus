import {
  defaultSiteContent,
  mergeSiteContent,
  type Program,
  type SiteContent,
  type Venue,
  type Workshop,
} from "@/lib/site-content.defaults";
import { getSiteContentClient, type SiteContentMap } from "@/lib/site-content.pocketbase";
import contentBundle from "@/lib/content-bundle.json";

/**
 * Public-facing content query. The site is intentionally static:
 *   - Admins edit content via PocketBase (`updateSiteContentClient`).
 *   - Build script (`bun run build`) calls `fetch-content-bundle.mjs` to
 *     pull the latest records into `src/lib/content-bundle.json`.
 *   - Public pages read only the build-time bundle; there is no runtime
 *     fetch from PocketBase in production.
 *
 * If you change admin content, run `bun run build` (or `bun run deploy:aws`)
 * so the bundle is refreshed and the static site reflects the edits.
 */
export const siteContentQuery = {
  queryKey: ["site-content"],
  queryFn: async () => contentBundle as SiteContentMap,
  placeholderData: contentBundle as SiteContentMap,
  staleTime: Infinity,
};

export function slugify(value: string | undefined) {
  const safe = value ?? "";
  return safe
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProgramSlug(item: Program) {
  return item.slug || slugify(item.title);
}

export function getWorkshopSlug(item: Workshop) {
  return item.slug || slugify(item.title);
}

export function getVenueSlug(item: Venue) {
  return item.slug || slugify(item.name);
}

export function getMergedSiteContent(data: Record<string, unknown> | undefined): SiteContent {
  return mergeSiteContent(data);
}

export function getProgramBySlug(content: SiteContent, slug: string) {
  const items = content.programs.items.length
    ? content.programs.items
    : defaultSiteContent.programs.items;
  return items.find((item) => getProgramSlug(item) === slug);
}

export function getWorkshopBySlug(content: SiteContent, slug: string) {
  const items = content.workshops.items.length
    ? content.workshops.items
    : defaultSiteContent.workshops.items;
  return items.find((item) => getWorkshopSlug(item) === slug);
}

export function getVenueBySlug(content: SiteContent, slug: string) {
  const items = content.venues.items.length
    ? content.venues.items
    : defaultSiteContent.venues.items;
  return items.find((item) => getVenueSlug(item) === slug);
}
