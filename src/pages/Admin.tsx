import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

interface ContentRow {
  id: string;
  title: string;
  category: string;
  event_date: string | null;
  published_at: string | null;
}

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const [rows, setRows] = useState<ContentRow[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("member_content")
      .select("id,title,category,event_date,published_at")
      .order("published_at", { ascending: false })
      .then(({ data }) => setRows((data as ContentRow[]) ?? []));
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-8 pt-40 pb-24">
        <h1 className="font-serif text-5xl mb-10">Admin</h1>

        {loading ? (
          <p className="font-sans-body text-muted-foreground">Loading…</p>
        ) : !user ? (
          <p className="font-sans-body text-muted-foreground">
            Please{" "}
            <Link to="/login" className="text-primary underline">
              sign in
            </Link>{" "}
            with an admin account.
          </p>
        ) : !isAdmin ? (
          <p className="font-sans-body text-muted-foreground">
            This account does not have admin access.
          </p>
        ) : (
          <div className="border border-border">
            <div className="px-5 py-3 border-b border-border">
              <p className="font-sans-body text-sm tracking-wide uppercase">
                Member content
              </p>
            </div>
            {rows.length === 0 ? (
              <p className="px-5 py-6 font-sans-body text-sm text-muted-foreground">
                No content yet.
              </p>
            ) : (
              rows.map((r) => (
                <div
                  key={r.id}
                  className="px-5 py-4 border-b border-border last:border-b-0 flex items-baseline justify-between gap-6"
                >
                  <span className="font-sans-body">{r.title}</span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-sans-body">
                    {r.category}
                    {r.event_date
                      ? ` · ${new Date(r.event_date).toLocaleDateString()}`
                      : ""}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
