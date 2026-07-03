// PocketBase Go hook that triggers a Cloudflare Pages rebuild whenever
// site_content or media records change. Debounced 5s so a save storm
// (e.g. saving many sections of the admin form) only causes one
// rebuild.
//
// Required environment variable on the PocketBase server:
//   CF_PAGES_DEPLOY_HOOK_URL="https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/xxxxxxxx"
//
// Install: copy this file next to the `pocketbase` binary into the
// `pb_hooks/` directory and restart PocketBase. Look for the
// "[rebuild-hook]" lines in stdout to confirm registration.

var DEBOUNCE_MS = 5000;
var pending = [];
var timer = null;
var inFlight = false;

function scheduleDeploy(reason) {
    if (pending.indexOf(reason) === -1) {
        pending.push(reason);
    }
    if (timer !== null) return;
    timer = setTimeout(flushPending, DEBOUNCE_MS);
}

function flushPending() {
    timer = null;
    if (inFlight) return;

    var reasons = pending.slice();
    pending = [];

    var url = $os.getenv("CF_PAGES_DEPLOY_HOOK_URL");
    if (!url) {
        console.log(
            "[rebuild-hook] skipped (" + reasons.length + " change(s)): CF_PAGES_DEPLOY_HOOK_URL is not set. Reasons=" + reasons.join(",")
        );
        updateDeployStatus({
            status: "failed",
            message: "CF_PAGES_DEPLOY_HOOK_URL ortam değişkeni PocketBase sunucusunda tanımlı değil. CLOUDFLARE_DEPLOYMENT.md dosyasına bakın.",
            trigger: reasons.join(","),
            at: new Date().toISOString()
        });
        return;
    }

    inFlight = true;
    var startedAt = new Date().toISOString();
    var trigger = reasons.join(",") || "unknown";

    updateDeployStatus({
        status: "pending",
        message: "Cloudflare Deploy Hook'a istek gönderiliyor. Lütfen bekleyin...",
        trigger: trigger,
        at: startedAt
    });

    // Use a top-level fetch with await-via-Promise.then to keep Goja happy.
    // PocketBase v0.22+ exposes `fetch` as a global.
    Promise.resolve()
        .then(function () {
            return fetch(url, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    source: "pocketbase",
                    reason: reasons,
                    at: startedAt
                })
            });
        })
        .then(function (response) {
            return response.text().then(function (text) {
                var ok = response.status >= 200 && response.status < 300;
                var preview = (text || "").slice(0, 200);
                console.log(
                    "[rebuild-hook] deploy triggered (reasons=" + reasons.length +
                    " status=" + response.status +
                    ' body="' + preview + '")'
                );
                updateDeployStatus({
                    status: ok ? "success" : "failed",
                    message: ok
                        ? "Cloudflare Deploy Hook " + response.status + " ile yanıt verdi. Build 1-2 dakika içinde tamamlanır."
                        : "Cloudflare Deploy Hook " + response.status + " ile yanıt verdi: " + preview,
                    trigger: trigger,
                    at: startedAt
                });
            });
        })
        .catch(function (err) {
            var message = (err && err.message) ? err.message : String(err);
            console.log("[rebuild-hook] deploy failed: " + message);
            updateDeployStatus({
                status: "failed",
                message: "Cloudflare Deploy Hook'a ulaşılamadı: " + message,
                trigger: trigger,
                at: startedAt
            });
        })
        .then(function () {
            inFlight = false;
        });
}

function updateDeployStatus(payload) {
    try {
        var dao = $app.dao();
        var collection = dao.findCollectionByNameOrId("site_content");
        var records = dao.findRecordsByFilter(collection, "key = {:k}", { k: "deployConfig" }, "", 0, 0);
        var record = records && records.length > 0 ? records[0] : null;

        var existing = {};
        if (record) {
            try {
                existing = record.get("data") || {};
            } catch (e) {
                existing = {};
            }
        }

        var next = {
            enabled: existing.enabled !== false,
            webhookUrl: existing.webhookUrl || "",
            webhookUrlNote: existing.webhookUrlNote || "",
            lastDeployAt: payload.at,
            lastDeployStatus: payload.status,
            lastDeployMessage: payload.message,
            lastDeployTrigger: payload.trigger
        };

        if (record) {
            record.set("data", next);
            dao.saveRecord(record);
        } else {
            var newRecord = new Record(collection, {
                key: "deployConfig",
                data: next
            });
            dao.saveRecord(newRecord);
        }
    } catch (err) {
        var msg = (err && err.message) ? err.message : String(err);
        console.log("[rebuild-hook] could not update deployConfig: " + msg);
    }
}

function isTracked(name) {
    return name === "site_content" || name === "media";
}

onRecordAfterCreateSuccess(function (e) {
    if (!isTracked(e.collection.name)) return;
    var data = e.record && e.record.get("data");
    if (data && data.__kind === "deploy_request") {
        scheduleDeploy("admin.manual." + (data.who || "unknown"));
        return;
    }
    scheduleDeploy(e.collection.name + ".create");
});

onRecordAfterUpdateSuccess(function (e) {
    if (!isTracked(e.collection.name)) return;
    var data = e.record && e.record.get("data");
    if (data && data.__kind === "deploy_request") {
        scheduleDeploy("admin.manual." + (data.who || "unknown"));
        return;
    }
    scheduleDeploy(e.collection.name + ".update");
});

onRecordAfterDeleteSuccess(function (e) {
    if (!isTracked(e.collection.name)) return;
    scheduleDeploy(e.collection.name + ".delete");
});

console.log("[rebuild-hook] hooks registered for site_content + media");