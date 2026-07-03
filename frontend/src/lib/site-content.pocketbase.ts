import { pb } from "@/integrations/pocketbase/client";

export type SiteContentMap = Record<string, unknown>;

type PocketBaseRecord = Record<string, unknown> & {
  id: string;
  created?: string;
  email?: string;
};

function asRecord(value: unknown): PocketBaseRecord {
  if (!value || typeof value !== "object" || !("id" in value)) {
    throw new Error("Unexpected PocketBase response");
  }
  return value as PocketBaseRecord;
}

function getRecordString(record: PocketBaseRecord, key: string) {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

function getRecordBoolean(record: PocketBaseRecord, key: string) {
  return record[key] === true;
}

export async function getSiteContentClient(): Promise<SiteContentMap> {
  const records = await pb.collection("site_content").getFullList({
    sort: "key",
  });

  const map: SiteContentMap = {};
  for (const item of records) {
    const record = asRecord(item);
    const key = getRecordString(record, "key");
    if (key) {
      map[key] =
        key === "footer" ? pickFooterKeys(record.data) : record.data;
    }
  }
  return map;
}

function pickFooterKeys(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object") return data as Record<string, unknown>;
  const obj = data as Record<string, unknown>;
  return { brand: obj.brand ?? "", tagline: obj.tagline ?? "" };
}

export async function updateSiteContentClient(key: string, data: unknown) {
  const userId = pb.authStore.record?.id;
  const payload: Record<string, unknown> = {
    key,
    data,
  };
  // Only include updatedBy when we have a valid user ID.
  // An empty string is not a valid relation reference and causes PocketBase to return 400.
  if (userId) {
    payload.updatedBy = userId;
  }

  try {
    const existing = await pb
      .collection("site_content")
      .getFirstListItem(pb.filter("key={:key}", { key }));
    await pb.collection("site_content").update(existing.id, payload);
  } catch (error) {
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      await pb.collection("site_content").create(payload);
    } else {
      throw error;
    }
  }
  return { ok: true };
}

export type DeployStatus = "idle" | "pending" | "success" | "failed";

export type DeployState = {
  status: DeployStatus;
  message: string;
  triggeredBy: string;
  triggeredAt: string;
};

const DEPLOY_REQUEST_KEY = "__deploy_request";

/**
 * Fires a Cloudflare Pages rebuild by writing a synthetic deploy_request
 * record into site_content. The PocketBase hook (pb_hooks/main.pb.js)
 * catches this event, debounces it with the rest of the change queue,
 * and POSTs to the Cloudflare Deploy Hook URL. This keeps the webhook
 * URL on the PocketBase server and never exposes it to the browser.
 */
export async function triggerDeployClient(): Promise<DeployState> {
  const userEmail =
    (pb.authStore.record as { email?: string } | null)?.email ?? "unknown";
  const now = new Date().toISOString();
  const data = {
    __kind: "deploy_request",
    who: userEmail,
    at: now,
  };

  const payload: Record<string, unknown> = {
    key: DEPLOY_REQUEST_KEY,
    data,
  };
  const userId = pb.authStore.record?.id;
  if (userId) payload.updatedBy = userId;

  try {
    const existing = await pb
      .collection("site_content")
      .getFirstListItem(pb.filter("key={:key}", { key: DEPLOY_REQUEST_KEY }));
    await pb.collection("site_content").update(existing.id, payload);
  } catch (error) {
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      await pb.collection("site_content").create(payload);
    } else {
      throw error;
    }
  }

  // Optimistic pending state; the hook is fire-and-forget so we don't
  // know the Cloudflare HTTP status. Refresh `deployConfig` afterwards
  // to surface the actual result.
  return {
    status: "pending",
    message:
      "Yayınlama isteği PocketBase'e iletildi. Cloudflare Pages yeniden derleme tetiklendi.",
    triggeredBy: userEmail,
    triggeredAt: now,
  };
}

export async function uploadSiteImageClient(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", file.name);

  const record = asRecord(await pb.collection("media").create(formData));
  const filename = getRecordString(record, "file");
  const url = pb.files.getURL(record, filename);

  return { url, path: `${record.id}/${filename}` };
}

export async function getCurrentUserIsAdmin() {
  if (!pb.authStore.isValid || !pb.authStore.record) return false;
  return getRecordBoolean(pb.authStore.record as PocketBaseRecord, "isAdmin");
}

export async function listAdminUsersClient() {
  const records = await pb.collection("users").getFullList({
    filter: "isAdmin = true",
    sort: "created",
  });

  return {
    admins: records.map((item) => {
      const record = asRecord(item);
      return {
        id: record.id,
        email: getRecordString(record, "email") || "(unknown)",
        createdAt: getRecordString(record, "created"),
      };
    }),
  };
}

export async function signInAdmin(email: string, password: string) {
  const auth = await pb.collection("users").authWithPassword(email, password);
  const record = asRecord(auth.record);
  if (!getRecordBoolean(record, "isAdmin")) {
    pb.authStore.clear();
    throw new Error("Forbidden: admin account required");
  }
  return auth;
}

export function signOutAdmin() {
  pb.authStore.clear();
}

export function isSignedIn() {
  return pb.authStore.isValid;
}

export async function createUserClient(email: string, password: string, isAdmin: boolean) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  await pb.collection("users").create({
    email,
    password,
    passwordConfirm: password,
    isAdmin,
  });

  return { ok: true };
}
