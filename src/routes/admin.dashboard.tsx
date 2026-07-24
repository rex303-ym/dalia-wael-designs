import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDown, ArrowUp, LogOut, Trash2, Upload, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Dashboard · Dalia Wael Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type SectionKey =
  | "artcam"
  | "solidworks"
  | "3dmax"
  | "photoshop"
  | "rhino"
  | "surface_finishing"
  | "handmade_sketch"
  | "handmade_final";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "artcam", label: "Art CAM" },
  { key: "solidworks", label: "SolidWorks" },
  { key: "3dmax", label: "3D Max" },
  { key: "photoshop", label: "Photoshop" },
  { key: "rhino", label: "Rhino & Rhino Gold" },
  { key: "surface_finishing", label: "Surface Finishing" },
  { key: "handmade_sketch", label: "Hand Sketches" },
  { key: "handmade_final", label: "Final Products" },
];

type Row = {
  id: string;
  section: string;
  image_url: string;
  storage_path: string | null;
  display_order: number;
};

// ~20 years
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 20;

function AdminDashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [section, setSection] = useState<SectionKey>("artcam");
  const [rows, setRows] = useState<Row[]>([]);
  const [uploads, setUploads] = useState<{ name: string; status: "uploading" | "done" | "error"; error?: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!role) {
        await supabase.auth.signOut();
        navigate({ to: "/admin/login" });
        return;
      }
      setReady(true);
    })();
  }, [navigate]);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("id, section, image_url, storage_path, display_order")
      .eq("section", section)
      .order("display_order", { ascending: true });
    setRows((data as Row[]) ?? []);
  }, [section]);

  useEffect(() => {
    if (ready) load();
  }, [ready, load]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    e.target.value = "";

    // seed upload status
    setUploads((prev) => [
      ...prev,
      ...files.map((f) => ({ name: f.name, status: "uploading" as const })),
    ]);

    // find current max order
    const { data: maxRow } = await supabase
      .from("gallery_images")
      .select("display_order")
      .eq("section", section)
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    let nextOrder = (maxRow?.display_order ?? -1) + 1;

    for (const file of files) {
      try {
        const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${section}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
        const { error: upErr } = await supabase.storage
          .from("portfolio-images")
          .upload(path, file, { cacheControl: "31536000", upsert: false });
        if (upErr) throw upErr;
        const { data: signed, error: signErr } = await supabase.storage
          .from("portfolio-images")
          .createSignedUrl(path, SIGNED_URL_TTL);
        if (signErr || !signed) throw signErr ?? new Error("Could not sign URL");
        const { error: insErr } = await supabase.from("gallery_images").insert({
          section,
          image_url: signed.signedUrl,
          storage_path: path,
          display_order: nextOrder++,
        });
        if (insErr) throw insErr;
        setUploads((prev) =>
          prev.map((u) => (u.name === file.name && u.status === "uploading" ? { ...u, status: "done" } : u)),
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload failed";
        setUploads((prev) =>
          prev.map((u) =>
            u.name === file.name && u.status === "uploading" ? { ...u, status: "error", error: message } : u,
          ),
        );
      }
    }
    await load();
  };

  const handleDelete = async (row: Row) => {
    if (!confirm("Delete this image?")) return;
    if (row.storage_path) {
      await supabase.storage.from("portfolio-images").remove([row.storage_path]);
    }
    await supabase.from("gallery_images").delete().eq("id", row.id);
    await load();
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    const a = rows[index];
    const b = rows[target];
    // swap display_order
    await supabase.from("gallery_images").update({ display_order: b.display_order }).eq("id", a.id);
    await supabase.from("gallery_images").update({ display_order: a.display_order }).eq("id", b.id);
    await load();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-[color:var(--cream)]">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--cream)] text-foreground">
      <header className="border-b border-[color:var(--gold)]/40 bg-[color:var(--sand)]/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo/hero-monogram.png" alt="" className="h-10 w-auto object-contain" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin</p>
              <h1 className="font-display text-xl font-semibold text-foreground">Gallery Manager</h1>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)] px-5 py-2 text-xs uppercase tracking-[0.25em] text-gold hover:bg-[color:var(--gold)]/10 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* Section selector */}
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.25em] transition-colors border ${
                section === s.key
                  ? "bg-gradient-gold text-[color:var(--ink)] border-transparent shadow-luxe"
                  : "border-[color:var(--gold)]/50 text-gold hover:bg-[color:var(--gold)]/10"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Upload */}
        <div className="rounded-lg card-gold bg-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Upload images to {SECTIONS.find((s) => s.key === section)?.label}
              </h2>
              <p className="text-sm text-muted-foreground">
                Select multiple images at once. They will appear at the end of the gallery.
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-luxe transition-transform hover:scale-[1.02]"
            >
              <Upload className="h-4 w-4" /> Choose files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </div>

          {uploads.length > 0 && (
            <ul className="mt-6 space-y-1 text-sm">
              {uploads.slice(-8).map((u, i) => (
                <li key={i} className="flex items-center gap-2">
                  {u.status === "uploading" && <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />}
                  {u.status === "done" && <span className="text-gold">✓</span>}
                  {u.status === "error" && <span className="text-red-600">✕</span>}
                  <span className="truncate">{u.name}</span>
                  {u.error && <span className="text-red-600 text-xs">— {u.error}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Grid */}
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            {rows.length} image{rows.length === 1 ? "" : "s"} in{" "}
            {SECTIONS.find((s) => s.key === section)?.label}
          </p>
          {rows.length === 0 ? (
            <div className="rounded-lg card-gold bg-card p-10 text-center text-muted-foreground">
              No images yet. Upload some above.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {rows.map((row, i) => (
                <div key={row.id} className="rounded-lg card-gold bg-card overflow-hidden">
                  <div className="aspect-square bg-[color:var(--sand)]">
                    <img
                      src={row.image_url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--gold)]/60 text-gold disabled:opacity-30 hover:bg-[color:var(--gold)]/10"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => move(i, 1)}
                        disabled={i === rows.length - 1}
                        aria-label="Move down"
                        className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--gold)]/60 text-gold disabled:opacity-30 hover:bg-[color:var(--gold)]/10"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(row)}
                      aria-label="Delete"
                      className="grid h-8 w-8 place-items-center rounded-full border border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
