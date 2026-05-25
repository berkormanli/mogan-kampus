import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isSignedIn, signInAdmin } from "@/lib/site-content.pocketbase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Mogan Kampüs" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn()) navigate({ to: "/admin" });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signInAdmin(email, password);
      navigate({ to: "/admin" });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-background px-6">
      <div className="w-full max-w-md bg-card border border-border p-8 md:p-10">
        <div className="mb-8">
          <p className="text-xs tracking-[0.25em] uppercase text-accent mb-2">Admin</p>
          <h1 className="font-serif text-3xl text-primary">Sign in to edit the site</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Admin accounts are managed in PocketBase.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={128}
              className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm hover:bg-accent transition disabled:opacity-50"
          >
            {loading ? "…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-xs text-muted-foreground text-center">
          <a href="/" className="hover:text-primary">
            ← Back to site
          </a>
        </p>
      </div>
    </main>
  );
}
