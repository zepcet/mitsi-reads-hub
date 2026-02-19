import { Check } from "lucide-react";
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

const Subscriptions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">Membership</p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium max-w-xl">
            Join mitsi ppl.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed font-sans-body">
            Choose the plan that fits your reading life. Cancel or change anytime.
          </p>
        </div>

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

        <p className="text-center text-sm text-muted-foreground mt-8 font-sans-body">
          All plans include a 7-day free trial. No card required to start.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Subscriptions;
