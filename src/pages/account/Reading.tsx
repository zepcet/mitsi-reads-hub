import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { allClubs } from "@/data/bookClubs";
import type { BookProgress, BookStatus } from "@/types/database";
import { BOOK_STATUS_LABELS } from "@/types/database";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_ORDER: BookStatus[] = ["reading", "want_to_read", "finished"];

const Reading = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<BookProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from("book_progress")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    setProgress((data as BookProgress[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (slug: string, status: BookStatus) => {
    const existing = progress.find((p) => p.book_club_slug === slug);
    if (existing && existing.status === status) return;

    if (existing) {
      const { error } = await supabase
        .from("book_progress")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("book_progress").insert({
        user_id: user?.id,
        book_club_slug: slug,
        status,
        saved: false,
      });
      if (error) return toast.error(error.message);
    }
    await fetchProgress();
  };

  const toggleSaved = async (slug: string) => {
    const existing = progress.find((p) => p.book_club_slug === slug);
    if (existing) {
      const { error } = await supabase
        .from("book_progress")
        .update({ saved: !existing.saved, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("book_progress").insert({
        user_id: user?.id,
        book_club_slug: slug,
        status: "want_to_read",
        saved: true,
      });
      if (error) return toast.error(error.message);
    }
    await fetchProgress();
  };

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-sans-body">
        Member panel
      </p>
      <h1 className="font-serif text-4xl md:text-5xl font-medium mb-2">Reading history</h1>
      <p className="text-muted-foreground font-sans-body mb-10">
        Track what you're reading, save books for later, and revisit past picks.
      </p>

      {loading ? (
        <p className="text-sm text-muted-foreground font-sans-body">Loading…</p>
      ) : (
        <div className="space-y-4">
          {allClubs.map((club) => {
            const p = progress.find((pr) => pr.book_club_slug === club.slug);
            return (
              <div
                key={club.slug}
                className="flex flex-col sm:flex-row sm:items-center gap-4 border border-border p-4"
              >
                <Link to={`/book-clubs/${club.slug}`} className="shrink-0">
                  <img
                    src={club.image}
                    alt={club.title}
                    className="w-full sm:w-24 h-32 sm:h-20 object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/book-clubs/${club.slug}`}
                    className="font-serif text-xl hover:text-primary transition-colors block"
                  >
                    {club.title}
                  </Link>
                  <p className="text-xs text-muted-foreground font-sans-body mb-3">{club.author}</p>

                  <div className="flex flex-wrap items-center gap-2">
                    {STATUS_ORDER.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(club.slug, s)}
                        className={cn(
                          "text-xs px-3 py-1.5 transition-colors font-sans-body border",
                          p?.status === s
                            ? "bg-foreground text-background border-foreground"
                            : "border-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {BOOK_STATUS_LABELS[s]}
                      </button>
                    ))}
                    <button
                      onClick={() => toggleSaved(club.slug)}
                      className={cn(
                        "ml-1 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 transition-colors font-sans-body border",
                        p?.saved
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Bookmark size={12} strokeWidth={1.5} />
                      {p?.saved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reading;
