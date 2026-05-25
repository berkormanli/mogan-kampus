/// <reference path="../pb_data/types.d.ts" />

const DEPLOY_HOOK_URL = $os.getenv("CF_PAGES_DEPLOY_HOOK_URL") ?? "";

if (!DEPLOY_HOOK_URL) {
  console.log("[rebuild-hook] CF_PAGES_DEPLOY_HOOK_URL not set — hook disabled");
}

function notifyRebuild() {
  if (!DEPLOY_HOOK_URL) return;

  $http.send({
    url: DEPLOY_HOOK_URL,
    method: "POST",
    body: "",
    timeout: 10,
  }).then((resp) => {
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      console.log(`[rebuild-hook] deploy triggered (${resp.statusCode})`);
    } else {
      console.error(`[rebuild-hook] deploy hook returned ${resp.statusCode}: ${resp.raw}`);
    }
  }).catch((err) => {
    console.error("[rebuild-hook] deploy hook request failed:", err);
  });
}

let debounceTimer = null;
const DEBOUNCE_MS = 5_000;

function debouncedNotify() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    notifyRebuild();
  }, DEBOUNCE_MS);
}

onRecordAfterCreateSuccess((e) => { debouncedNotify(); }, "site_content");
onRecordAfterUpdateSuccess((e) => { debouncedNotify(); }, "site_content");
onRecordAfterDeleteSuccess((e) => { debouncedNotify(); }, "site_content");
onRecordAfterCreateSuccess((e) => { debouncedNotify(); }, "media");

console.log("[rebuild-hook] hooks registered for site_content + media");
