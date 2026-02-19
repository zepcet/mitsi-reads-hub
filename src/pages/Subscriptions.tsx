import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Users, Gift, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Reader",
    price: "9",
    period: "/ month",
    description: "Perfect for those just beginning their journey with mitsi ppl.",
    features: [
      "Monthly book selection",
      "Discussion questions & guide",
      "Access to community forum",
      "Monthly newsletter",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Member",
    price: "19",
    period: "/ month",
    description: "Our most popular plan for committed readers.",
    features: [
      "Everything in Reader",
      "Live virtual sessions",
      "Early book announcements",
      "Author Q&A recordings",
      "Exclusive member events",
    ],
    cta: "Join as Member",
    highlighted: true,
  },
  {
    name: "Collector",
    price: "39",
    period: "/ month",
    description: "For the deeply dedicated — books, community, and more.",
    features: [
      "Everything in Member",
      "Curated book box (quarterly)",
      "1:1 reading recommendation session",
      "Priority event access",
      "Name in annual booklet",
    ],
    cta: "Become a Collector",
    highlighted: false,
  },
];

type Tab = "Individual" | "Group" | "Gift";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Individual");

  // Group state
  const [groupPlan, setGroupPlan] = useState<"Member" | "Collector">("Member");
  const [groupCount, setGroupCount] = useState(2);
  const groupPrices = { Member: 15, Collector: 30 };
  const groupPrice = groupPrices[groupPlan];

  // Gift state
  const [giftPlan, setGiftPlan] = useState<"Reader" | "Member" | "Collector">("Member");
  const [giftEmail, setGiftEmail] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftAnonymous, setGiftAnonymous] = useState(false);

  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "Individual", icon: <User size={14} />, label: "Individual" },
    { id: "Group", icon: <Users size={14} />, label: "Group" },
    { id: "Gift", icon: <Gift size={14} />, label: "Gift" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">Membership</p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium max-w-xl">
            Join mitsi ppl.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed font-sans-body">
            Choose the plan that fits your reading life. Cancel or change anytime.
          </p>
        </div>

        {/* Subscription type tabs */}
        <div className="flex gap-0 border border-border mb-12 w-fit">
          {tabs.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-sans-body tracking-wide transition-colors ${
                tab === id
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:text-foreground"
              } ${id !== "Gift" ? "border-r border-border" : ""}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* ── INDIVIDUAL ── */}
        {tab === "Individual" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground"
                } ${index < plans.length - 1 ? "border-r border-border" : ""}`}
              >
                <div className="mb-8">
                  <p className={`text-xs tracking-widest uppercase mb-3 font-sans-body ${plan.highlighted ? "opacity-70" : "text-muted-foreground"}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-5xl font-medium">${plan.price}</span>
                    <span className={`text-sm font-sans-body ${plan.highlighted ? "opacity-70" : "text-muted-foreground"}`}>{plan.period}</span>
                  </div>
                  <p className={`mt-4 text-sm leading-relaxed font-sans-body ${plan.highlighted ? "opacity-80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-sans-body">
                      <Check
                        size={14}
                        className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`}
                      />
                      <span className={plan.highlighted ? "opacity-90" : ""}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate(`/checkout?plan=${plan.name}`)}
                  className={`w-full py-3 text-sm tracking-wide transition-colors ${
                    plan.highlighted
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── GROUP ── */}
        {tab === "Group" && (
          <div className="max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans-body">
              Group rate — minimum 2 people
            </p>

            {/* Plan selector */}
            <div className="grid grid-cols-2 gap-0 border border-border mb-8">
              {(["Member", "Collector"] as const).map((p, i) => (
                <button
                  key={p}
                  onClick={() => setGroupPlan(p)}
                  className={`p-5 text-left transition-colors ${
                    groupPlan === p ? "bg-foreground text-background" : "bg-background hover:bg-muted"
                  } ${i === 0 ? "border-r border-border" : ""}`}
                >
                  <p className="text-xs tracking-widest uppercase mb-1 font-sans-body opacity-70">{p}</p>
                  <p className="font-serif text-3xl font-medium">${groupPrices[p]}<span className="text-sm font-sans-body opacity-60"> /person/mo</span></p>
                </button>
              ))}
            </div>

            {/* Count input */}
            <div className="mb-6">
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                How many people?
              </label>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setGroupCount(Math.max(2, groupCount - 1))}
                  className="w-12 h-12 flex items-center justify-center text-lg hover:bg-muted transition-colors border-r border-border"
                >
                  −
                </button>
                <span className="w-16 text-center font-sans-body text-sm">{groupCount}</span>
                <button
                  onClick={() => setGroupCount(groupCount + 1)}
                  className="w-12 h-12 flex items-center justify-center text-lg hover:bg-muted transition-colors border-l border-border"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price summary */}
            <div className="border border-border divide-y divide-border mb-8">
              <div className="flex justify-between px-5 py-3 text-sm font-sans-body">
                <span className="text-muted-foreground">Rate per person</span>
                <span>${groupPrice}/mo</span>
              </div>
              <div className="flex justify-between px-5 py-3 text-sm font-sans-body">
                <span className="text-muted-foreground">People</span>
                <span>{groupCount}</span>
              </div>
              <div className="flex justify-between px-5 py-4 font-sans-body">
                <span className="text-xs tracking-widest uppercase font-medium">Total</span>
                <span className="font-serif text-2xl font-medium">${groupPrice * groupCount}<span className="text-sm font-sans-body text-muted-foreground">/mo</span></span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/checkout?plan=${groupPlan}&type=group&count=${groupCount}`)}
              className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors"
            >
              Subscribe group
            </button>
          </div>
        )}

        {/* ── GIFT ── */}
        {tab === "Gift" && (
          <div className="max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans-body">
              Gift a membership to someone you love
            </p>

            {/* Plan selector */}
            <div className="grid grid-cols-3 gap-0 border border-border mb-8">
              {(["Reader", "Member", "Collector"] as const).map((p, i) => {
                const price = plans.find((pl) => pl.name === p)?.price;
                return (
                  <button
                    key={p}
                    onClick={() => setGiftPlan(p)}
                    className={`p-5 text-left transition-colors ${
                      giftPlan === p ? "bg-foreground text-background" : "bg-background hover:bg-muted"
                    } ${i < 2 ? "border-r border-border" : ""}`}
                  >
                    <p className="text-xs tracking-widest uppercase mb-1 font-sans-body opacity-70">{p}</p>
                    <p className="font-serif text-3xl font-medium">${price}<span className="text-sm font-sans-body opacity-60">/mo</span></p>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                  Recipient's email address
                </label>
                <input
                  type="email"
                  value={giftEmail}
                  onChange={(e) => setGiftEmail(e.target.value)}
                  placeholder="friend@example.com"
                  className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 font-sans-body">
                  Personal message <span className="normal-case">(optional)</span>
                </label>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Write a note to go with your gift..."
                  rows={4}
                  className="w-full border border-border bg-background px-4 py-3 text-sm font-sans-body focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setGiftAnonymous(!giftAnonymous)}
                  className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                    giftAnonymous ? "bg-foreground border-foreground" : "border-border"
                  }`}
                >
                  {giftAnonymous && <Check size={10} className="text-background" />}
                </div>
                <span className="text-sm font-sans-body text-muted-foreground">Send gift anonymously</span>
              </label>
            </div>

            <button
              onClick={() => navigate(`/checkout?plan=${giftPlan}&type=gift`)}
              className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors"
            >
              Buy gift membership
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Subscriptions;
