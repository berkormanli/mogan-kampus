/**
 * Reads the TypeScript default site content via a tiny in-process loader
 * (esbuild is already in the dep tree through @tanstack), then writes a
 * JSON snapshot that other Node scripts (e.g. seed-pocketbase) can read
 * without TypeScript awareness.
 */
import { build } from "esbuild";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = resolve(here, "..", "src", "lib", "site-content.defaults.ts");
const out = resolve(here, "site-content.defaults.json");

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

writeFileSync(out, JSON.stringify(defaults, null, 2));
console.log(`✅ Wrote ${out}`);