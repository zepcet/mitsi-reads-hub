import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PLAN_LABELS, STATUS_LABELS } from "@/types/database";
import { Check } from "lucide-react";

const planPrices: Record<string, string> = {
  reader: "$9/mo",
  member: "$19/mo",
  collector: "$39/mo",
  none: "—",
};

const planFeatures: Record<string, string[]> = {
  reader: ["Monthly book club access", "Discussion guides", "Community board"],
  member: ["Everything in Reader", "Live session invites", "Members-only picks"],
  collector: ["Everything in Member", "Curated wine & bites pairings", "Priority event access"],
  none: ["No active subscription"],
};

const Subscription = () => {
  const { profile } = useAuth();
  const plan = profile?.subscription_plan ?? "none";
  const status = profile?.subscription_status ?? "none";

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-sans-body">
        Member panel
      </p>
      <h1 className="font-serif text-4xl md:text-5xl font-medium mb-10">Subscription</h1>

      <div className="border border-border p-6 mb-10 max-w-lg">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body">
            Current plan
          </span>
          <span
            className={`text-xs px-2 py-0.5 ${
              status === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {STATUS_LABELS[status]}
          </span>
        </div>
        <p className="font-serif text-3xl mb-1">{PLAN_LABELS[plan]}</p>
        <p className="text-sm text-muted-foreground font-sans-body">
          {planPrices[plan]}
          {profile?.subscription_type && (
            <span className="capitalize"> · {profile.subscription_type}</span>
          )}
        </p>
      </div>

      <h2 className="font-serif text-2xl font-medium mb-6">What's included</h2>
      <ul className="space-y-3 mb-10 max-w-lg">
        {planFeatures[plan].map((f) => (
          <li key={f} className="flex items-center gap-3">
            <Check size={16} strokeWidth={2} className="text-primary" />
            <span className="text-sm font-sans-body">{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-4">
        {plan !== "none" ? (
          <button className="border border-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors font-sans-body">
            Manage billing
          </button>
        ) : null}
        <Link
          to="/subscriptions"
          className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors font-sans-body text-center"
        >
          {plan === "none" ? "Choose a plan" : "Upgrade plan"}
        </Link>
      </div>

      <p className="text-xs text-muted-foreground font-sans-body mt-6 max-w-lg">
        Billing management is illustrative. Payments are not yet processed live.
      </p>
    </div>
  );
};

export default Subscription;
