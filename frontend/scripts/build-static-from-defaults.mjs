// Generates src/lib/content-bundle.json directly from the TypeScript
// defaults in site-content.defaults.ts, then writes the same content to
// scripts/site-content.defaults.json so other tooling can read it.
//
// Use this when you want to ship a fully static build without a live
// PocketBase server. The resulting content-bundle.json is what the public
// site reads at runtime, and it embeds the latest defaults the frontend
// ships with — no external service required.

import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = resolve(here, "..", "src", "lib", "site-content.defaults.ts");
const outBundle = resolve(here, "..", "src", "lib", "content-bundle.json");
const outJson = resolve(here, "site-content.defaults.json");

const result = await build({
  entryPoints: [entry],
  bundle: true,
  write: false,
  format: "cjs",
  platform: "node",
  target: "node20",
  external: ["*.png", "*.jpg", "*.jpeg", "*.svg", "*.ico", "*.webmanifest"],
  loader: {
    ".png": "empty",
    ".jpg": "empty",
    ".jpeg": "empty",
    ".svg": "empty",
    ".ico": "empty",
    ".webmanifest": "empty",
  },
});

const code = result.outputFiles[0].text;
const m = { exports: {} };
const fn = new Function("module", "exports", "require", code);
fn(m, m.exports, (id) => {
  if (id.startsWith("@/")) {
    return undefined;
  }
  throw new Error("Unexpected require: " + id);
});

const defaults = m.exports.defaultSiteContent;
if (!defaults) {
  throw new Error("defaultSiteContent export not found.");
}

mkdirSync(dirname(outJson), { recursive: true });
writeFileSync(outJson, JSON.stringify(defaults, null, 2));
writeFileSync(outBundle, JSON.stringify(defaults, null, 2));

const summary = Object.keys(defaults).length;
const itemsSummary = Object.fromEntries(
  Object.entries(defaults).map(([k, v]) => {
    if (v && typeof v === "object") {
      const items = v.items || v.levels;
      return [k, items ? items.length : "object"];
    }
    return [k, typeof v];
  }),
);

console.log(`✅ Wrote ${outBundle}`);
console.log(`✅ Wrote ${outJson}`);
console.log(`   ${summary} keys:`, JSON.stringify(itemsSummary));