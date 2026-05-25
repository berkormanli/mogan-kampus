import PocketBase from "pocketbase";
import { loadDotEnv } from "./env.mjs";

loadDotEnv();

const POCKETBASE_URL = process.env.POCKETBASE_URL || process.env.VITE_POCKETBASE_URL;
const POCKETBASE_SUPERUSER_EMAIL =
  process.env.POCKETBASE_SUPERUSER_EMAIL || process.env.POCKETBASE_ADMIN_EMAIL;
const POCKETBASE_SUPERUSER_PASSWORD =
  process.env.POCKETBASE_SUPERUSER_PASSWORD || process.env.POCKETBASE_ADMIN_PASSWORD;

if (!POCKETBASE_URL) {
  throw new Error("Missing POCKETBASE_URL or VITE_POCKETBASE_URL.");
}

if (!POCKETBASE_SUPERUSER_EMAIL || !POCKETBASE_SUPERUSER_PASSWORD) {
  throw new Error("Missing POCKETBASE_SUPERUSER_EMAIL or POCKETBASE_SUPERUSER_PASSWORD.");
}

const rules = {
  users: {
    listRule: "isAdmin = true && @request.auth.isAdmin = true",
    viewRule: "id = @request.auth.id || @request.auth.isAdmin = true",
    createRule: "@request.auth.isAdmin = true",
    updateRule: "id = @request.auth.id || @request.auth.isAdmin = true",
    deleteRule: "@request.auth.isAdmin = true",
  },
  site_content: {
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.isAdmin = true",
    updateRule: "@request.auth.isAdmin = true",
    deleteRule: "@request.auth.isAdmin = true",
  },
  media: {
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.isAdmin = true",
    updateRule: "@request.auth.isAdmin = true",
    deleteRule: "@request.auth.isAdmin = true",
  },
  preregistrations: {
    listRule: "@request.auth.isAdmin = true",
    viewRule: "@request.auth.isAdmin = true",
    createRule: "",
    updateRule: "@request.auth.isAdmin = true",
    deleteRule: "@request.auth.isAdmin = true",
  },
};

const pb = new PocketBase(POCKETBASE_URL);
await pb
  .collection("_superusers")
  .authWithPassword(POCKETBASE_SUPERUSER_EMAIL, POCKETBASE_SUPERUSER_PASSWORD);

for (const [name, patch] of Object.entries(rules)) {
  const collection = await pb.collections.getOne(name);
  await pb.collections.update(collection.id, patch);
  console.log(`updated rules for ${name}`);
}

console.log("PocketBase API rules applied.");
