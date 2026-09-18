import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, User, CreditCard, BookOpen, Sparkles, LogOut, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/account", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/account/profile", label: "Profile", icon: User, end: false },
  { to: "/account/subscription", label: "Subscription", icon: CreditCard, end: false },
  { to: "/account/reading", label: "Reading history", icon: BookOpen, end: false },
  { to: "/account/content", label: "Member content", icon: Sparkles, end: false },
];

const MemberLayout = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initials =
    [profile?.first_name, profile?.last_name]
      .filter(Boolean)
      .map((n) => (n as string).charAt(0).toUpperCase())
      .join("") || "MP";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 font-sans-body"
        >
          <ArrowLeft size={14} /> Back to site
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="md:border-r md:border-border md:pr-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center font-serif text-lg">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-sans-body text-sm font-medium truncate">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-muted-foreground font-sans-body truncate">
                  {profile?.subscription_status === "active"
                    ? "Active member"
                    : "Member"}
                </p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-sans-body transition-colors",
                      isActive
                        ? "bg-foreground text-background"
                        : "text-foreground hover:bg-muted"
                    )
                  }
                >
                  <Icon size={15} strokeWidth={1.5} />
                  {label}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={handleSignOut}
              className="mt-6 flex items-center gap-3 px-3 py-2.5 text-sm font-sans-body text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              <LogOut size={15} strokeWidth={1.5} />
              Sign out
            </button>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MemberLayout;
