import PocketBase from "pocketbase";
import { loadDotEnv } from "./env.mjs";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

loadDotEnv();

const POCKETBASE_URL = process.env.POCKETBASE_URL || process.env.VITE_POCKETBASE_URL;
const POCKETBASE_SUPERUSER_EMAIL =
  process.env.POCKETBASE_SUPERUSER_EMAIL ||
  process.env.POCKETBASE_ADMIN_EMAIL;
const POCKETBASE_SUPERUSER_PASSWORD =
  process.env.POCKETBASE_SUPERUSER_PASSWORD ||
  process.env.POCKETBASE_ADMIN_PASSWORD;

if (!POCKETBASE_URL) {
  throw new Error("Missing POCKETBASE_URL or VITE_POCKETBASE_URL.");
}
if (!POCKETBASE_SUPERUSER_EMAIL || !POCKETBASE_SUPERUSER_PASSWORD) {
  throw new Error("Missing PocketBase superuser credentials.");
}

const here = dirname(fileURLToPath(import.meta.url));
const defaultsPath = resolve(here, "site-content.defaults.json");
const content = JSON.parse(readFileSync(defaultsPath, "utf8"));

const pb = new PocketBase(POCKETBASE_URL);
await pb
  .collection("_superusers")
  .authWithPassword(POCKETBASE_SUPERUSER_EMAIL, POCKETBASE_SUPERUSER_PASSWORD);

let created = 0;
let updated = 0;

for (const [key, data] of Object.entries(content)) {
  try {
    const existing = await pb
      .collection("site_content")
      .getFirstListItem(pb.filter("key={:key}", { key }));
    await pb.collection("site_content").update(existing.id, {
      key,
      data,
    });
    updated += 1;
    console.log(`updated ${key}`);
  } catch (error) {
    if (error?.status !== 404) throw error;
    await pb.collection("site_content").create({ key, data });
    created += 1;
    console.log(`created ${key}`);
  }
}

console.log(`\n✅ Done. created=${created} updated=${updated} total=${created + updated}`);