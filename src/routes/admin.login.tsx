import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  component: AdminLogin,
  head: () => ({
    meta: [
      { title: "Admin · Dalia Wael" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/dashboard" });
    });
  }, [navigate]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (!data.session) {
      setError("Sign in failed. Please try again.");
      return;
    }
    // Verify admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.session.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) {
      await supabase.auth.signOut();
      setError("This account does not have admin access.");
      return;
    }
    navigate({ to: "/admin/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--cream)] px-6">
      <div className="w-full max-w-md rounded-lg card-gold bg-card p-8 md:p-10 shadow-luxe">
        <div className="mb-8 text-center">
          <img
            src="/logo/hero-monogram.png"
            alt="Dalia Wael"
            className="mx-auto h-14 w-auto object-contain"
          />
          <h1 className="mt-6 font-display text-3xl font-semibold text-gold">Admin</h1>
          <hr className="gold-divider mx-auto my-4" />
          <p className="text-sm text-muted-foreground">
            Sign in to manage your portfolio galleries.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-gold">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-[color:var(--border)] bg-[color:var(--cream)] px-4 py-3 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]/30 transition"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-gold">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-[color:var(--border)] bg-[color:var(--cream)] px-4 py-3 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]/30 transition"
            />
          </div>
          {error && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-luxe transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
