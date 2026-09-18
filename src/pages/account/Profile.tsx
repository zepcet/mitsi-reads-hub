import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const { profile, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name ?? "",
        last_name: profile.last_name ?? "",
        avatar_url: profile.avatar_url ?? "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: form.first_name,
        last_name: form.last_name,
        avatar_url: form.avatar_url || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile?.id);
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    await refreshProfile();
    toast.success("Profile updated.");
  };

  const inputClass =
    "w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors";

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-sans-body">
        Member panel
      </p>
      <h1 className="font-serif text-4xl md:text-5xl font-medium mb-10">Profile</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
              First name
            </label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
              Last name
            </label>
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
            Avatar URL
          </label>
          <input
            type="url"
            placeholder="https://…"
            value={form.avatar_url}
            onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
