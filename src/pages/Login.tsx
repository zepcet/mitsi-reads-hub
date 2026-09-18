import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    toast.success("Welcome back.");
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 max-w-md mx-auto">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">
          Members
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium mb-10">Sign in</h1>

        {error && (
          <div className="border border-destructive text-destructive px-4 py-3 text-sm font-sans-body mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground hover:text-foreground font-sans-body underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-sm text-muted-foreground font-sans-body">
          New to mitsi ppl.?{" "}
          <Link to="/signup" className="text-foreground underline hover:text-primary">
            Create an account
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
