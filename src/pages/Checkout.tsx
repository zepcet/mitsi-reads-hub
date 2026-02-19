import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, ChevronRight, CreditCard, Lock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  { name: "Reader", price: "9" },
  { name: "Member", price: "19" },
  { name: "Collector", price: "39" },
];

const steps = ["Your plan", "Account", "Payment", "Confirm"];

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan") || "Member";
  const selectedPlan = plans.find((p) => p.name === planParam) || plans[1];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cardNumber: "4242 4242 4242 4242",
    expiry: "12/27",
    cvc: "123",
    nameOnCard: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        {/* Back */}
        <Link
          to="/subscriptions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 font-sans-body"
        >
          <ArrowLeft size={14} /> Back to plans
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-16">
          {steps.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 flex items-center justify-center text-xs font-sans-body font-medium border transition-colors ${
                      done
                        ? "bg-primary text-primary-foreground border-primary"
                        : active
                        ? "border-foreground text-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {done ? <Check size={12} /> : n}
                  </div>
                  <span
                    className={`text-xs tracking-wide font-sans-body hidden sm:block ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 sm:w-12 h-px bg-border mx-3" />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2">
            {/* Step 1 — Plan */}
            {step === 1 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">
                  Step 1
                </p>
                <h2 className="font-serif text-3xl font-medium mb-8">
                  Your selected plan
                </h2>
                <div className="border border-primary p-6 mb-4 relative">
                  <span className="absolute top-3 right-3 text-xs font-sans-body bg-primary text-primary-foreground px-2 py-0.5 tracking-wide">
                    Selected
                  </span>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1 font-sans-body">
                    {selectedPlan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-medium">
                      ${selectedPlan.price}
                    </span>
                    <span className="text-sm text-muted-foreground font-sans-body">
                      / month
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 font-sans-body">
                    Cancel anytime.
                  </p>
                </div>
                <p className="text-xs text-muted-foreground font-sans-body mb-8">
                  Want a different plan?{" "}
                  <Link
                    to="/subscriptions"
                    className="underline hover:text-foreground"
                  >
                    Go back and compare
                  </Link>
                </p>
                <button
                  onClick={() => setStep(2)}
                  className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  Continue <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* Step 2 — Account */}
            {step === 2 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">
                  Step 2
                </p>
                <h2 className="font-serif text-3xl font-medium mb-8">
                  Create your account
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                        First name
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="Fatmagül"
                        className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Yılmaz"
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
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-border px-6 py-3 text-sm tracking-wide hover:bg-muted transition-colors font-sans-body"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    Continue <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Payment */}
            {step === 3 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">
                  Step 3
                </p>
                <h2 className="font-serif text-3xl font-medium mb-2">
                  Payment details
                </h2>
                <p className="text-sm text-muted-foreground font-sans-body mb-8 flex items-center gap-1.5">
                  <Lock size={12} /> Secured with 256-bit SSL encryption
                </p>

                {/* Mock card preview */}
                <div className="bg-foreground text-background p-6 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/20 -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 right-8 w-24 h-24 rounded-full bg-primary/10 translate-y-1/2" />
                  <p className="text-xs tracking-widest uppercase opacity-60 mb-6 font-sans-body">
                    mitsi ppl. membership
                  </p>
                  <p className="font-mono text-xl tracking-widest mb-6">
                    {form.cardNumber || "•••• •••• •••• ••••"}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-60 font-sans-body mb-1">
                        Card holder
                      </p>
                      <p className="text-sm font-sans-body">
                        {form.nameOnCard ||
                          (form.firstName
                            ? `${form.firstName} ${form.lastName}`
                            : "Your Name")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-60 font-sans-body mb-1">
                        Expires
                      </p>
                      <p className="text-sm font-sans-body">
                        {form.expiry || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                      Name on card
                    </label>
                    <input
                      type="text"
                      value={form.nameOnCard}
                      onChange={(e) => update("nameOnCard", e.target.value)}
                      placeholder={
                        form.firstName
                          ? `${form.firstName} ${form.lastName}`
                          : "Full name"
                      }
                      className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                      Card number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.cardNumber}
                        onChange={(e) => update("cardNumber", e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full border border-border bg-background px-4 py-3 pr-12 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                      />
                      <CreditCard
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                        Expiry date
                      </label>
                      <input
                        type="text"
                        value={form.expiry}
                        onChange={(e) => update("expiry", e.target.value)}
                        placeholder="MM/YY"
                        className="w-full border border-border bg-background px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                        CVC
                      </label>
                      <input
                        type="text"
                        value={form.cvc}
                        onChange={(e) => update("cvc", e.target.value)}
                        placeholder="123"
                        className="w-full border border-border bg-background px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="border border-border px-6 py-3 text-sm tracking-wide hover:bg-muted transition-colors font-sans-body"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    Review order <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 — Confirm */}
            {step === 4 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">
                  Step 4
                </p>
                <h2 className="font-serif text-3xl font-medium mb-8">
                  Review & confirm
                </h2>

                {/* Summary rows */}
                <div className="border border-border divide-y divide-border mb-8">
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body">Plan</span>
                    <span className="text-sm font-sans-body font-medium">{selectedPlan.name} — ${selectedPlan.price}/mo</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body">Account</span>
                    <span className="text-sm font-sans-body">{form.email || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body">Payment</span>
                    <span className="text-sm font-mono">•••• {form.cardNumber.slice(-4) || "4242"}</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4 bg-muted/40">
                    <span className="text-xs tracking-widest uppercase font-sans-body font-medium">Total due today</span>
                    <span className="font-serif text-xl font-medium">${selectedPlan.price}/mo</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground font-sans-body mb-6 leading-relaxed">
                  By confirming, you agree to our Terms of Service. Cancel anytime.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="border border-border px-6 py-3 text-sm tracking-wide hover:bg-muted transition-colors font-sans-body"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    <Lock size={13} /> Confirm & subscribe
                  </button>
                </div>
              </div>
            )}

            {/* Step 5 — Success */}
            {step === 5 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-8">
                  <Check size={28} className="text-primary-foreground" />
                </div>
                <h2 className="font-serif text-4xl font-medium mb-4">
                  Welcome to mitsi ppl.
                </h2>
                <p className="text-muted-foreground font-sans-body mb-2">
                  You're now a <strong>{selectedPlan.name}</strong> member.
                </p>
                <p className="text-muted-foreground font-sans-body text-sm mb-10">
                  A confirmation has been sent to{" "}
                  <span className="text-foreground">{form.email || "your email"}</span>.
                </p>

                <div className="border border-border p-6 text-left max-w-sm mx-auto mb-10">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body mb-4">
                    What happens next
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Check your inbox for a welcome email",
                      "Access this month's book selection",
                      "Join our member community forum",
                      "Save the date for our next live session",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-sans-body">
                        <Check size={13} className="mt-0.5 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/book-clubs"
                  className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors"
                >
                  Explore book clubs
                </Link>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          {step < 5 && (
            <div className="md:col-span-1">
              <div className="border border-border p-6 sticky top-32">
                <p className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body mb-5">
                  Order summary
                </p>
                <p className="font-serif text-xl font-medium mb-1">
                  {selectedPlan.name} plan
                </p>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="font-serif text-3xl font-medium">
                    ${selectedPlan.price}
                  </span>
                  <span className="text-sm text-muted-foreground font-sans-body">
                    / month
                  </span>
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  {[
                    "Everything in Reader",
                    "Live virtual sessions",
                    "Early book announcements",
                    "Author Q&A recordings",
                    "Exclusive member events",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs font-sans-body text-muted-foreground">
                      <Check size={11} className="mt-0.5 shrink-0 text-primary" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-5 pt-4">
                  <div className="flex justify-between text-xs font-sans-body">
                    <span>Billed monthly</span>
                    <span className="font-medium">${selectedPlan.price}/mo</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
