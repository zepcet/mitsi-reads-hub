import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { allClubs } from "@/data/bookClubs";
import { PLAN_LABELS, STATUS_LABELS } from "@/types/database";
import { BookOpen, Bookmark, CreditCard, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BookProgress } from "@/types/database";

const Dashboard = () => {
  const { profile } = useAuth();
  const [progress, setProgress] = useState<BookProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from("book_progress")
        .select("*")
        .order("updated_at", { ascending: false });
      if (!mounted) return;
      if (!error) setProgress((data as BookProgress[]) ?? []);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const reading = progress.filter((p) => p.status === "reading");
  const saved = progress.filter((p) => p.saved);

  const firstName = profile?.first_name || "there";

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-sans-body">
        Member panel
      </p>
      <h1 className="font-serif text-4xl md:text-5xl font-medium mb-2">
        Hello, {firstName}.
      </h1>
      <p className="text-muted-foreground font-sans-body mb-10">
        Here's a snapshot of your reading journey.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard
          icon={CreditCard}
          label="Plan"
          value={PLAN_LABELS[profile?.subscription_plan ?? "none"]}
        />
        <StatCard
          icon={BookOpen}
          label="Status"
          value={STATUS_LABELS[profile?.subscription_status ?? "none"]}
        />
        <StatCard icon={BookOpen} label="Reading" value={String(reading.length)} />
        <StatCard icon={Bookmark} label="Saved" value={String(saved.length)} />
      </div>

      {/* Currently reading */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-serif text-2xl font-medium">Currently reading</h2>
          <Link
            to="/account/reading"
            className="text-sm text-muted-foreground hover:text-foreground font-sans-body"
          >
            View all →
          </Link>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground font-sans-body">Loading…</p>
        ) : reading.length === 0 ? (
          <EmptyHint to="/book-clubs" label="Browse book clubs →" >
            You're not reading anything yet.
          </EmptyHint>
        ) : (
          <div className="space-y-3">
            {reading.map((p) => {
              const club = allClubs.find((c) => c.slug === p.book_club_slug);
              if (!club) return null;
              return (
                <div key={p.id} className="flex items-center gap-4 border border-border p-4">
                  <img
                    src={club.image}
                    alt={club.title}
                    className="w-16 h-12 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/book-clubs/${club.slug}`}
                      className="font-serif text-lg hover:text-primary transition-colors block truncate"
                    >
                      {club.title}
                    </Link>
                    <p className="text-xs text-muted-foreground font-sans-body">{club.author}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Saved */}
      <section>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-serif text-2xl font-medium">Saved for later</h2>
          <Link
            to="/account/reading"
            className="text-sm text-muted-foreground hover:text-foreground font-sans-body"
          >
            View all →
          </Link>
        </div>
        {!loading && saved.length === 0 ? (
          <EmptyHint to="/book-clubs" label="Browse book clubs →">
            No saved books yet.
          </EmptyHint>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {saved.map((p) => {
              const club = allClubs.find((c) => c.slug === p.book_club_slug);
              if (!club) return null;
              return (
                <Link
                  key={p.id}
                  to={`/book-clubs/${club.slug}`}
                  className="flex items-center gap-4 border border-border p-4 hover:border-foreground transition-colors"
                >
                  <img src={club.image} alt={club.title} className="w-14 h-14 object-cover" />
                  <div className="min-w-0">
                    <p className="font-serif text-base truncate">{club.title}</p>
                    <p className="text-xs text-muted-foreground font-sans-body truncate">
                      {club.author}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="border border-border p-5">
    <Icon size={18} strokeWidth={1.5} className="text-muted-foreground mb-3" />
    <p className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body mb-1">
      {label}
    </p>
    <p className="font-serif text-xl capitalize">{value}</p>
  </div>
);

const EmptyHint = ({
  children,
  to,
  label,
}: {
  children: React.ReactNode;
  to: string;
  label: string;
}) => (
  <div className="border border-dashed border-border p-8 text-center">
    <Sparkles size={20} className="text-muted-foreground mx-auto mb-3" strokeWidth={1.5} />
    <p className="text-sm text-muted-foreground font-sans-body mb-4">{children}</p>
    <Link
      to={to}
      className="text-sm text-foreground underline hover:text-primary font-sans-body"
    >
      {label}
    </Link>
  </div>
);

export default Dashboard;
