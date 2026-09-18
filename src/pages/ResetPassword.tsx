import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Recovery flow: Supabase sets a session via the URL hash on this route.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // No recovery session present — link may have expired.
        setError("This reset link is invalid or has expired. Request a new one.");
      }
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    toast.success("Your password has been updated.");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 max-w-md mx-auto">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">
          Members
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium mb-10">Set new password</h1>

        {error && (
          <div className="border border-destructive text-destructive px-4 py-3 text-sm font-sans-body mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
              New password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
              Confirm new password
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Updating…" : "Update password"}
          </button>
        </form>

        <p className="mt-8 text-sm text-muted-foreground font-sans-body">
          <Link to="/login" className="text-foreground underline hover:text-primary">
            Back to sign in
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPassword;
