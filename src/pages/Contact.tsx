import { useState } from "react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ENDPOINT"; // will be replaced with user's endpoint

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof form;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          message: result.data.message,
        }),
      });

      if (res.ok) {
        toast({ title: "Message sent!", description: "We'll get back to you soon." });
        setForm({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-40 pb-24">
        <h1 className="font-serif text-5xl md:text-6xl font-medium mb-4">Contact</h1>
        <div className="w-12 h-px bg-primary mb-10" />

        <p className="text-lg leading-relaxed text-muted-foreground font-sans-body mb-12">
          For any inquiries regarding mitsi ppl. book clubs, partnerships, or anything else — reach out using the form below.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* Name row */}
          <fieldset>
            <legend className="font-serif text-xl mb-4">Name</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-sans-body mb-1">
                  First Name <span className="text-muted-foreground">(required)</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-3 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
                />
                {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-sans-body mb-1">
                  Last Name <span className="text-muted-foreground">(required)</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-3 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
                />
                {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
              </div>
            </div>
          </fieldset>

          {/* Email */}
          <div>
            <label className="block font-serif text-xl mb-4">
              Email <span className="text-muted-foreground text-sm font-sans-body">(required)</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-border bg-background px-3 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block font-serif text-xl mb-4">
              Message <span className="text-muted-foreground text-sm font-sans-body">(required)</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="w-full border border-border bg-background px-3 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors resize-y"
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
