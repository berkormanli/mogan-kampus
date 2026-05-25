import { useState } from "react";
import { submitPreregistrationClient } from "@/lib/preregistration.pocketbase";

type FormVariant = "dark" | "light";

const formStyles = {
  dark: {
    panel: "bg-primary-foreground/5 border-primary-foreground/15",
    successPanel: "bg-primary-foreground/10 border-primary-foreground/20",
    bodyText: "text-primary-foreground/85",
    label: "text-primary-foreground/70",
    input:
      "bg-transparent border-primary-foreground/30 focus:border-accent text-primary-foreground placeholder:text-primary-foreground/40",
    button: "bg-accent text-accent-foreground hover:bg-primary-foreground hover:text-primary",
  },
  light: {
    panel: "bg-card border-border shadow-sm",
    successPanel: "bg-card border-border shadow-sm",
    bodyText: "text-foreground/75",
    label: "text-muted-foreground",
    input: "bg-background border-border focus:border-accent text-foreground placeholder:text-muted-foreground/60",
    button: "bg-primary text-primary-foreground hover:bg-accent",
  },
};

export function PreregistrationForm({ variant = "dark" }: { variant?: FormVariant }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const styles = formStyles[variant];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    const fd = new FormData(e.currentTarget);
    try {
      await submitPreregistrationClient({
        firstName: String(fd.get("firstName") ?? ""),
        lastName: String(fd.get("lastName") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        message: String(fd.get("message") ?? ""),
        interest: String(fd.get("interest") ?? ""),
      });
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }

  if (status === "success") {
    return (
      <div className={`border p-8 text-center ${styles.successPanel}`}>
        <h3 className="font-serif text-2xl text-accent mb-3">Teşekkürler!</h3>
        <p className={styles.bodyText}>
          Ön kaydınızı aldık. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs uppercase tracking-widest text-accent border-b border-accent pb-0.5 hover:opacity-80"
        >
          Yeni başvuru gönder
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`border p-6 md:p-8 grid gap-5 ${styles.panel}`}
    >
      <h3 className="font-serif text-2xl text-accent">Ön Kayıt Formu</h3>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Ad"
          name="firstName"
          required
          maxLength={80}
          autoComplete="given-name"
          variant={variant}
        />
        <Field
          label="Soyad"
          name="lastName"
          required
          maxLength={80}
          autoComplete="family-name"
          variant={variant}
        />
      </div>
      <Field
        label="E-posta"
        name="email"
        type="email"
        required
        maxLength={255}
        autoComplete="email"
        variant={variant}
      />
      <Field
        label="Telefon"
        name="phone"
        type="tel"
        required
        maxLength={40}
        autoComplete="tel"
        placeholder="+90 ..."
        variant={variant}
      />
      <div>
        <label className={`block text-xs uppercase tracking-widest mb-2 ${styles.label}`}>Mesaj</label>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="İletmek istediğiniz notlar (opsiyonel)"
          className={`w-full border px-4 py-3 outline-none resize-none ${styles.input}`}
        />
      </div>
      <div>
        <label className={`block text-xs uppercase tracking-widest mb-2 ${styles.label}`}>İlgi Alanı</label>
        <select
          name="interest"
          className={`w-full border px-4 py-3 outline-none ${styles.input}`}
        >
          <option value="">Seçiniz</option>
          <option value="yaz-okulu-gezisi">Yaz Okulu Gezisi</option>
          <option value="program-bilgisi">Program Bilgisi</option>
          <option value="atolye-bilgisi">Atölye Bilgisi</option>
          <option value="genel-bilgi">Genel Bilgi</option>
        </select>
      </div>
      {errorMsg && <p className="text-sm text-accent">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`px-8 py-4 uppercase tracking-widest text-sm transition disabled:opacity-50 justify-self-start ${styles.button}`}
      >
        {status === "submitting" ? "Gönderiliyor…" : "Başvuruyu Gönder"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
  placeholder,
  autoComplete,
  variant,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
  variant: FormVariant;
}) {
  const styles = formStyles[variant];

  return (
    <div>
      <label className={`block text-xs uppercase tracking-widest mb-2 ${styles.label}`}>
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full border px-4 py-3 outline-none ${styles.input}`}
      />
    </div>
  );
}
