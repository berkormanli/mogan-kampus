import PocketBase from "pocketbase";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadDotEnv } from "./env.mjs";

loadDotEnv();

const POCKETBASE_URL =
  process.env.POCKETBASE_URL || process.env.VITE_POCKETBASE_URL;
const POCKETBASE_SUPERUSER_EMAIL =
  process.env.POCKETBASE_SUPERUSER_EMAIL ||
  process.env.POCKETBASE_ADMIN_EMAIL;
const POCKETBASE_SUPERUSER_PASSWORD =
  process.env.POCKETBASE_SUPERUSER_PASSWORD ||
  process.env.POCKETBASE_ADMIN_PASSWORD;

console.log("🔍 DEBUG: Available env keys:", Object.keys(process.env).filter(k => k.includes("POCKET")).join(", "));

if (!POCKETBASE_URL) {
  console.warn("⚠️  Missing POCKETBASE_URL — writing empty content bundle and continuing.");
  writeEmptyBundle();
  process.exit(0);
}

if (!POCKETBASE_SUPERUSER_EMAIL || !POCKETBASE_SUPERUSER_PASSWORD) {
  console.warn("⚠️  Missing PocketBase superuser credentials — writing empty content bundle and continuing.");
  writeEmptyBundle();
  process.exit(0);
}

async function main() {
  const pb = new PocketBase(POCKETBASE_URL);

  console.log(`🔗 Connecting to PocketBase at ${POCKETBASE_URL} ...`);
  await pb
    .collection("_superusers")
    .authWithPassword(POCKETBASE_SUPERUSER_EMAIL, POCKETBASE_SUPERUSER_PASSWORD);

  console.log("📥 Fetching site_content records ...");
  const records = await pb.collection("site_content").getFullList({
    sort: "key",
  });

  const map = {};
  for (const record of records) {
    const key = record.key;
    if (key) {
      map[key] = record.data;
    }
  }

  const outPath = getBundlePath();
  writeFileSync(outPath, JSON.stringify(map, null, 2));

  console.log(
    `✅ Wrote ${Object.keys(map).length} content keys to src/lib/content-bundle.json`,
  );

  pb.authStore.clear();
}

function getBundlePath() {
  return resolve(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "src",
    "lib",
    "content-bundle.json",
  );
}

function writeEmptyBundle() {
  const outPath = getBundlePath();
  writeFileSync(outPath, "{}");
  console.log("   Wrote empty content bundle to src/lib/content-bundle.json");
}

main().catch((err) => {
  console.error("❌ Failed to fetch content bundle:", err.message);
  console.warn("⚠️  Writing empty content bundle and continuing.");
  writeEmptyBundle();
});
