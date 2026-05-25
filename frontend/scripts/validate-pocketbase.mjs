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

const required = {
  users: {
    type: "auth",
    rules: {
      listRule: "isAdmin = true && @request.auth.isAdmin = true",
      viewRule: "id = @request.auth.id || @request.auth.isAdmin = true",
      createRule: "@request.auth.isAdmin = true",
      updateRule: "id = @request.auth.id || @request.auth.isAdmin = true",
      deleteRule: "@request.auth.isAdmin = true",
    },
    fields: {
      isAdmin: { type: "bool", required: false },
    },
  },
  site_content: {
    type: "base",
    rules: {
      listRule: "",
      viewRule: "",
      createRule: "@request.auth.isAdmin = true",
      updateRule: "@request.auth.isAdmin = true",
      deleteRule: "@request.auth.isAdmin = true",
    },
    fields: {
      key: { type: "text", required: true },
      data: { type: "json", required: true },
      updatedBy: { type: "relation", required: false },
    },
  },
  media: {
    type: "base",
    rules: {
      listRule: "",
      viewRule: "",
      createRule: "@request.auth.isAdmin = true",
      updateRule: "@request.auth.isAdmin = true",
      deleteRule: "@request.auth.isAdmin = true",
    },
    fields: {
      title: { type: "text", required: false },
      file: { type: "file", required: true },
    },
  },
  preregistrations: {
    type: "base",
    rules: {
      listRule: "@request.auth.isAdmin = true",
      viewRule: "@request.auth.isAdmin = true",
      createRule: "",
      updateRule: "@request.auth.isAdmin = true",
      deleteRule: "@request.auth.isAdmin = true",
    },
    fields: {
      firstName: { type: "text", required: true },
      lastName: { type: "text", required: true },
      email: { type: "email", required: true },
      phone: { type: "text", required: true },
      message: { type: "text", required: false },
    },
  },
};

function normalizeRule(rule) {
  return rule ?? null;
}

function assertEqual(errors, label, actual, expected) {
  if (actual !== expected) {
    errors.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

const pb = new PocketBase(POCKETBASE_URL);
await pb
  .collection("_superusers")
  .authWithPassword(POCKETBASE_SUPERUSER_EMAIL, POCKETBASE_SUPERUSER_PASSWORD);

const collections = await pb.collections.getFullList({ sort: "name" });
const byName = new Map(collections.map((collection) => [collection.name, collection]));
const errors = [];

for (const [name, spec] of Object.entries(required)) {
  const collection = byName.get(name);
  if (!collection) {
    errors.push(`${name}: collection missing`);
    continue;
  }

  assertEqual(errors, `${name}.type`, collection.type, spec.type);

  for (const [ruleName, expected] of Object.entries(spec.rules)) {
    assertEqual(errors, `${name}.${ruleName}`, normalizeRule(collection[ruleName]), expected);
  }

  const fields = new Map((collection.fields ?? []).map((field) => [field.name, field]));
  for (const [fieldName, expected] of Object.entries(spec.fields)) {
    const field = fields.get(fieldName);
    if (!field) {
      errors.push(`${name}.${fieldName}: field missing`);
      continue;
    }
    assertEqual(errors, `${name}.${fieldName}.type`, field.type, expected.type);
    assertEqual(errors, `${name}.${fieldName}.required`, !!field.required, expected.required);
  }
}

if (errors.length > 0) {
  console.error("PocketBase schema validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("PocketBase schema validation passed.");
