import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/account";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
        },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // With email confirmation on (default), session is null until the user
    // confirms. If a session is present, sign them straight in.
    if (data.session) {
      navigate(from, { replace: true });
      return;
    }

    setConfirmSent(true);
  };

  if (confirmSent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 px-6 max-w-md mx-auto text-center">
          <div className="w-14 h-14 bg-primary flex items-center justify-center mx-auto mb-8">
            <Check size={24} className="text-primary-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-medium mb-4">Check your email</h1>
          <p className="text-muted-foreground font-sans-body leading-relaxed mb-8">
            We sent a confirmation link to{" "}
            <span className="text-foreground">{form.email}</span>. Click the link to
            verify your account and access your member panel.
          </p>
          <Link
            to="/login"
            className="inline-block border border-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors font-sans-body"
          >
            Back to sign in
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 max-w-md mx-auto">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">
          Join mitsi ppl.
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium mb-10">Create account</h1>

        {error && (
          <div className="border border-destructive text-destructive px-4 py-3 text-sm font-sans-body mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                First name
              </label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                Last name
              </label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
              Email address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-sm text-muted-foreground font-sans-body">
          Already a member?{" "}
          <Link to="/login" className="text-foreground underline hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
