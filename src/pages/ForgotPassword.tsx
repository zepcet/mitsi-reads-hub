import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
    toast.success("Reset link sent.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 max-w-md mx-auto">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">
          Members
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium mb-10">Reset password</h1>

        {sent ? (
          <div className="space-y-6">
            <p className="text-muted-foreground font-sans-body leading-relaxed">
              If an account exists for{" "}
              <span className="text-foreground">{email}</span>, you'll receive a link to
              reset your password shortly.
            </p>
            <Link
              to="/login"
              className="inline-block border border-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors font-sans-body"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="border border-destructive text-destructive px-4 py-3 text-sm font-sans-body mb-6">
                {error}
              </div>
            )}
            <p className="text-muted-foreground font-sans-body mb-8 leading-relaxed">
              Enter your email and we'll send you a link to set a new password.
            </p>
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
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Sending…" : "Send reset link"}
              </button>
            </form>
            <p className="mt-8 text-sm text-muted-foreground font-sans-body">
              Remembered it?{" "}
              <Link to="/login" className="text-foreground underline hover:text-primary">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
