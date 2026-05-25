import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef, type FormEvent, type ReactNode, type DragEvent } from "react";
import {
  createUserClient,
  getSiteContentClient,
  listAdminUsersClient,
  signOutAdmin,
  updateSiteContentClient,
  uploadSiteImageClient,
} from "@/lib/site-content.pocketbase";
import { listPreregistrationsClient, deletePreregistrationClient } from "@/lib/preregistration.pocketbase";
import { ContentPreview } from "@/components/preview/ContentPreview";
import { defaultSiteContent, mergeSiteContent, type SiteContent } from "@/lib/site-content.defaults";

const contentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContentClient(),
});

const adminsQuery = queryOptions({
  queryKey: ["admins"],
  queryFn: () => listAdminUsersClient(),
});

const preregistrationsQuery = queryOptions({
  queryKey: ["preregistrations"],
  queryFn: () => listPreregistrationsClient(),
});

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{ title: "Admin — Mogan Kampüs" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(contentQuery),
      context.queryClient.ensureQueryData(adminsQuery),
      context.queryClient.ensureQueryData(preregistrationsQuery),
    ]),
  component: AdminPage,
});

const SECTIONS: { key: keyof SiteContent; label: string }[] = [
  { key: "utility", label: "Araç çubuğu" },
  { key: "nav", label: "Navigasyon" },
  { key: "hero", label: "Hero" },
  { key: "about", label: "Hakkımızda" },
  { key: "aboutPage", label: "Hakkımızda sayfası" },
  { key: "programs", label: "Programlar" },
  { key: "programsPage", label: "Programlar sayfası" },
  { key: "stats", label: "İstatistikler" },
  { key: "workshops", label: "Atölyeler" },
  { key: "workshopsPage", label: "Atölyeler sayfası" },
  { key: "gallery", label: "Galeri" },
  { key: "venues", label: "Mekanlar" },
  { key: "venuesPage", label: "Mekanlar sayfası" },
  { key: "teacher", label: "Öğretmen programı" },
  { key: "contact", label: "İletişim + alt bilgi" },
  { key: "contactPage", label: "İletişim sayfası" },
  { key: "faqs", label: "SSS" },
  { key: "footer", label: "Alt bilgi" },
];

function AdminPage() {
  const { data: content } = useSuspenseQuery(contentQuery);
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<keyof SiteContent>("hero");
  const [tab, setTab] = useState<"content" | "users" | "preregistrations">("content");
  const [liveSectionValue, setLiveSectionValue] = useState<unknown>(
    content["hero"] ?? defaultSiteContent["hero"],
  );

  useEffect(() => {
    setLiveSectionValue(content[activeKey] ?? defaultSiteContent[activeKey]);
  }, [activeKey, content]);

  const baseContent = mergeSiteContent(content);
  const baseIsArray = Array.isArray(baseContent[activeKey]);
  const liveIsArray = Array.isArray(liveSectionValue);
  const previewContent: SiteContent = {
    ...baseContent,
    [activeKey]:
      baseIsArray && liveIsArray
        ? liveSectionValue
        : !baseIsArray
          ? {
              ...(baseContent[activeKey] as Record<string, unknown>),
              ...(liveSectionValue as Record<string, unknown>),
            }
          : baseContent[activeKey],
  };

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <div className="font-serif text-lg">Mogan Kampüs Admin</div>
        <div className="flex items-center gap-4 text-sm">
          <a href="/" className="opacity-80 hover:opacity-100">
            Siteyi görüntüle →
          </a>
          <button
            onClick={() => {
              signOutAdmin();
              navigate({ to: "/login" });
            }}
            className="border border-primary-foreground/40 px-3 py-1.5 hover:bg-accent hover:border-accent transition uppercase tracking-widest text-xs"
          >
            Çıkış yap
          </button>
        </div>
      </header>

      <div className="px-6 pt-6 flex gap-2 border-b border-border bg-card">
        <TabBtn active={tab === "content"} onClick={() => setTab("content")}>
          İçerik
        </TabBtn>
        <TabBtn active={tab === "users"} onClick={() => setTab("users")}>
          Yöneticiler
        </TabBtn>
        <TabBtn active={tab === "preregistrations"} onClick={() => setTab("preregistrations")}>
          Ön kayıtlar
        </TabBtn>
      </div>

      {tab === "content" ? (
        <div className="grid md:grid-cols-[260px_1fr_1fr] min-h-[calc(100vh-120px)]">
          <aside className="bg-card border-r border-border py-4">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveKey(s.key)}
                className={`w-full text-left px-6 py-3 text-sm border-l-4 ${
                  activeKey === s.key
                    ? "border-accent bg-secondary text-primary font-medium"
                    : "border-transparent text-foreground/70 hover:bg-secondary"
                }`}
              >
                {s.label}
              </button>
            ))}
          </aside>
          <main className="p-6 md:p-10 overflow-auto border-r border-border">
            <SectionEditor
              key={activeKey}
              sectionKey={activeKey}
              initial={content[activeKey] ?? defaultSiteContent[activeKey]}
              onLiveChange={setLiveSectionValue}
            />
          </main>
          <aside className="overflow-auto bg-background">
            {previewContent && (
              <ContentPreview sectionKey={activeKey} content={previewContent} />
            )}
          </aside>
        </div>
      ) : tab === "users" ? (
        <UsersPanel />
      ) : (
        <PreregistrationsPanel />
      )}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm uppercase tracking-widest border-b-2 -mb-px ${
        active
          ? "border-accent text-primary"
          : "border-transparent text-muted-foreground hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

function SectionEditor({
  sectionKey,
  initial,
  onLiveChange,
}: {
  sectionKey: keyof SiteContent;
  initial: unknown;
  onLiveChange?: (value: unknown) => void;
}) {
  const [value, setValue] = useState<unknown>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const qc = useQueryClient();

  const handleChange = (newValue: unknown) => {
    setValue(newValue);
    onLiveChange?.(newValue);
  };

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    try {
      await updateSiteContentClient(sectionKey, value);
      await qc.invalidateQueries({ queryKey: ["site-content"] });
      setMsg("Kaydedildi.");
    } catch (e: unknown) {
      setMsg(errorMessage(e, "Kaydetme başarısız"));
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 2500);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-3xl text-primary capitalize">{sectionKey}</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-primary-foreground px-6 py-2.5 uppercase tracking-widest text-xs hover:bg-accent transition disabled:opacity-50"
        >
          {saving ? "Kaydediliyor…" : "Değişiklikleri kaydet"}
        </button>
      </div>
      {msg && <p className="mb-4 text-sm text-accent">{msg}</p>}

      <FieldsRenderer value={value} onChange={handleChange} />
    </div>
  );
}

function FieldsRenderer({
  value,
  onChange,
  isImageArray,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  isImageArray?: boolean;
}) {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-4">
        {value.map((item, i) => (
          <div key={i} className="border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Öğe {i + 1}
              </span>
              <button
                onClick={() => {
                  const next = [...value];
                  next.splice(i, 1);
                  onChange(next);
                }}
                className="text-xs text-destructive hover:underline"
              >
                Kaldır
              </button>
            </div>
            <FieldsRenderer
              value={item}
              onChange={(v) => {
                const next = [...value];
                next[i] = v;
                onChange(next);
              }}
              isImageArray={isImageArray}
            />
          </div>
        ))}
        <button
          onClick={() => {
            if (value.length > 0) {
              onChange([...value, structuredClone(value[0])]);
            } else if (isImageArray) {
              onChange([""]);
            }
          }}
          className="text-xs uppercase tracking-widest text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground"
        >
          + Öğe ekle
        </button>
      </div>
    );
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return (
      <div className="space-y-5">
        {Object.entries(record).map(([k, v]) => (
          <FieldRow
            key={k}
            label={k}
            value={v}
            onChange={(nv) => onChange({ ...record, [k]: nv })}
            onSiblingChange={(fieldName, newValue) => onChange({ ...record, [fieldName]: newValue })}
            siblingFields={record}
          />
        ))}
      </div>
    );
  }
  if (isImageArray && typeof value === "string") {
    return <ImageField value={value} onChange={(v) => onChange(v)} />;
  }
  const strValue = String(value ?? "");
  return (
    <input
      value={strValue}
      onChange={(e) => onChange(e.target.value)}
      maxLength={500}
      className="w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary"
    />
  );
}

function FieldRow({
  label,
  value,
  onChange,
  siblingFields,
  onSiblingChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: unknown) => void;
  siblingFields?: Record<string, unknown>;
  onSiblingChange?: (fieldName: string, newValue: unknown) => void;
}) {
  if (Array.isArray(value)) {
    const isImageArr = isImageFieldName(label) && value.every((v) => typeof v === "string");
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
        <FieldsRenderer value={value} onChange={onChange} isImageArray={isImageArr} />
      </div>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
        <FieldsRenderer value={value} onChange={onChange} />
      </div>
    );
  }
  if (typeof value !== "string") {
    return null;
  }
  const isImage = isImageFieldName(label) && !isAltFieldName(label);
  const isLong =
    value.length > 80 ||
    ["text", "body", "subhead", "headline", "quote", "description"].includes(label);

  const altFieldName = isImage ? computeAltFieldName(label) : null;
  const altValue = altFieldName && typeof siblingFields?.[altFieldName] === "string"
    ? (siblingFields[altFieldName] as string)
    : undefined;
  const onAltChange = altFieldName && onSiblingChange
    ? (newAlt: string) => onSiblingChange(altFieldName, newAlt)
    : undefined;

  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      {isImage ? (
        <ImageField
          value={value}
          onChange={onChange}
          alt={altValue}
          onAltChange={onAltChange}
        />
      ) : isLong ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          maxLength={2000}
          className="w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={500}
          className="w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      )}
    </div>
  );
}

function isImageFieldName(label: string): boolean {
  const lower = label.toLowerCase();
  return (
    lower.includes("image") ||
    lower.includes("imageurl") ||
    lower === "img" ||
    lower === "gallery"
  );
}

function isAltFieldName(label: string): boolean {
  if (!label.endsWith("Alt")) return false;
  const baseName = label.slice(0, -3);
  return isImageFieldName(baseName);
}

function computeAltFieldName(imageFieldName: string): string {
  if (/[Uu]rl$/.test(imageFieldName)) {
    return imageFieldName.replace(/[Uu]rl$/, "Alt");
  }
  return imageFieldName + "Alt";
}

function ImageField({
  value,
  onChange,
  alt,
  onAltChange,
}: {
  value: string;
  onChange: (v: string) => void;
  alt?: string;
  onAltChange?: (v: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  let dragCounter = useRef(0);

  async function uploadFile(file: File) {
    setErr(null);
    if (file.size > 5 * 1024 * 1024) {
      setErr("En fazla 5MB.");
      return;
    }
    setBusy(true);
    try {
      const { url } = await uploadSiteImageClient(file);
      onChange(url);
    } catch (e: unknown) {
      console.error("Image upload failed:", e);
      setErr(errorMessage(e, "Yükleme başarısız"));
    } finally {
      setBusy(false);
      setFileKey((k) => k + 1);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) uploadFile(f);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    dragCounter.current = 0;
    const f = e.dataTransfer.files?.[0];
    if (f) uploadFile(f);
  }

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items?.length) setDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setDragOver(false);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div className="space-y-3">
      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        className={[
          "border-2 border-dashed rounded-lg p-4 transition-colors",
          dragOver
            ? "border-accent bg-accent/5"
            : value
              ? "border-border bg-card"
              : "border-muted-foreground/30 bg-muted/30",
        ].join(" ")}
      >
        <div className="flex items-center gap-4">
          {value ? (
            <img src={value} alt={alt ?? ""} className="w-24 h-24 object-cover rounded border border-border" />
          ) : (
            <div className="w-24 h-24 grid place-items-center bg-muted text-muted-foreground text-xs rounded">
              Görsel yok
            </div>
          )}
          <div className="flex-1 min-w-0">
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Görsel URL'si yapıştırın, sürükleyin veya yükleyin"
              className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary rounded"
            />
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <label className="text-xs uppercase tracking-widest text-primary cursor-pointer hover:text-accent inline-flex items-center gap-1">
                {busy ? "Yükleniyor…" : "Yeni görsel yükle"}
                <input
                  key={fileKey}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
              {value && (
                <button
                  onClick={() => onChange("")}
                  className="text-xs text-destructive hover:underline"
                >
                  Temizle
                </button>
              )}
            </div>
            {dragOver && (
              <p className="text-xs text-accent mt-2">Bırakın yükleyin</p>
            )}
          </div>
        </div>
      </div>

      {onAltChange && (value || alt !== undefined) && (
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Alt metin
          </label>
          <input
            value={alt ?? ""}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Görsel için alternatif metin"
            maxLength={500}
            className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary rounded"
          />
        </div>
      )}

      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}

function UsersPanel() {
  const { data } = useSuspenseQuery(adminsQuery);
  const qc = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await createUserClient(email, password, isAdmin);
      await qc.invalidateQueries({ queryKey: ["admins"] });
      setEmail("");
      setPassword("");
      setIsAdmin(false);
      setFormOpen(false);
      setMsg("Kullanıcı oluşturuldu.");
    } catch (err: unknown) {
      setMsg(errorMessage(err, "Kullanıcı oluşturulamadı."));
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 3000);
    }
  }

  return (
    <main className="p-6 md:p-10 max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-serif text-3xl text-primary">Yöneticiler</h2>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="text-xs uppercase tracking-widest text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition"
        >
          {formOpen ? "İptal" : "+ Kullanıcı ekle"}
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        Burada listelenen kişiler oturum açıp siteyi düzenleyebilir. Yönetici seçeneğini yalnızca
        güvenilir editörler için etkinleştirin.
      </p>

      {msg && <p className="mb-4 text-sm text-accent">{msg}</p>}

      {formOpen && (
        <form
          onSubmit={handleCreate}
          className="mb-8 border border-border bg-card p-6 space-y-4"
        >
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground">
            Yeni kullanıcı ekle
          </h3>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <span className="text-sm text-muted-foreground">Yönetici yetkisi ver</span>
          </label>
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground px-6 py-2.5 uppercase tracking-widest text-xs hover:bg-accent transition disabled:opacity-50"
          >
            {saving ? "Oluşturuluyor…" : "Kullanıcı oluştur"}
          </button>
        </form>
      )}

      <section className="bg-card border border-border">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-6 py-3">E-posta</th>
              <th className="px-6 py-3">Oluşturulma</th>
            </tr>
          </thead>
          <tbody>
            {data.admins.map((a) => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-6 py-3">{a.email}</td>
                <td className="px-6 py-3 text-muted-foreground">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function PreregistrationsPanel() {
  const { data } = useSuspenseQuery(preregistrationsQuery);
  const qc = useQueryClient();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await deletePreregistrationClient(id);
      await qc.invalidateQueries({ queryKey: ["preregistrations"] });
    } catch (err: unknown) {
      console.error(errorMessage(err, "Ön kayıt silinemedi."));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <main className="p-6 md:p-10 max-w-3xl">
      <h2 className="font-serif text-3xl text-primary mb-2">Ön kayıtlar</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Siteden gelen iletişim formu gönderileri.
      </p>

      {data.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Henüz ön kayıt yok.</p>
      ) : (
        <div className="space-y-4">
          {data.items.map((p) => (
            <article
              key={p.id}
              className="border border-border bg-card p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-primary">
                    {p.firstName} {p.lastName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(p.created).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deleting === p.id}
                  className="text-xs text-destructive hover:underline shrink-0 disabled:opacity-50"
                >
                  {deleting === p.id ? "Siliniyor…" : "Sil"}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    E-posta
                  </span>
                  <p className="text-primary">{p.email}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Telefon
                  </span>
                  <p className="text-primary">{p.phone}</p>
                </div>
              </div>

              {p.message && (
                <div className="pt-1">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Mesaj
                  </span>
                  <p className="text-sm text-primary/80 mt-1 leading-relaxed whitespace-pre-wrap">
                    {p.message}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
