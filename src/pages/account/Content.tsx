import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { MemberContent } from "@/types/database";
import { ExternalLink, Calendar } from "lucide-react";

const Content = () => {
  const [items, setItems] = useState<MemberContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from("member_content")
        .select("*")
        .order("published_at", { ascending: false });
      if (!mounted) return;
      if (!error) setItems((data as MemberContent[]) ?? []);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const guides = items.filter((i) => i.category === "guide");
  const lives = items.filter((i) => i.category === "live");

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-sans-body">
        Member panel
      </p>
      <h1 className="font-serif text-4xl md:text-5xl font-medium mb-2">Member content</h1>
      <p className="text-muted-foreground font-sans-body mb-10">
        Exclusive discussion guides, live sessions, and members-only picks.
      </p>

      {loading ? (
        <p className="text-sm text-muted-foreground font-sans-body">Loading…</p>
      ) : (
        <div className="space-y-10">
          {lives.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-medium mb-5">Live sessions</h2>
              <div className="space-y-3">
                {lives.map((item) => (
                  <div key={item.id} className="border border-primary p-5">
                    <div className="flex items-center gap-2 text-xs text-primary mb-2 font-sans-body">
                      <Calendar size={13} strokeWidth={1.5} />
                      {item.event_date
                        ? new Date(item.event_date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Date TBA"}
                    </div>
                    <p className="font-serif text-xl mb-2">{item.title}</p>
                    <p className="text-sm text-muted-foreground font-sans-body mb-3 leading-relaxed">
                      {item.body}
                    </p>
                    {item.link_url && (
                      <a
                        href={item.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-foreground underline hover:text-primary font-sans-body"
                      >
                        Join session <ExternalLink size={13} strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="font-serif text-2xl font-medium mb-5">Discussion guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((item) => (
                <div key={item.id} className="border border-border p-5">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans-body">
                    Guide
                  </p>
                  <p className="font-serif text-xl mb-2">{item.title}</p>
                  <p className="text-sm text-muted-foreground font-sans-body leading-relaxed mb-4">
                    {item.body}
                  </p>
                  {item.link_url && (
                    <a
                      href={item.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-foreground underline hover:text-primary font-sans-body"
                    >
                      Read guide <ExternalLink size={13} strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Content;
