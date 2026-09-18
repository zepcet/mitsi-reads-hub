import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Instagram, Menu, X, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();

  const navLinks = [
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/book-clubs", label: "Book Clubs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const initials =
    [profile?.first_name, profile?.last_name]
      .filter(Boolean)
      .map((n) => (n as string).charAt(0).toUpperCase())
      .join("") || "MP";

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
    setOpen(false);
    navigate("/");
  };

  const AccountBlock = () => (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center hover:text-primary transition-colors"
        aria-label="Account"
      >
        {user ? (
          <span className="w-9 h-9 bg-primary text-primary-foreground flex items-center justify-center text-xs font-sans-body font-medium">
            {initials}
          </span>
        ) : (
          <span className="w-9 h-9 border border-border flex items-center justify-center">
            <User size={20} strokeWidth={1.5} />
          </span>
        )}
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-12 z-50 w-52 bg-background border border-border shadow-sm">
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-sans-body font-medium truncate">
                    {profile?.first_name} {profile?.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground font-sans-body truncate">
                    {user.email}
                  </p>
                </div>
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-sans-body hover:bg-muted transition-colors"
                >
                  Member panel
                </Link>
                <Link
                  to="/account/subscription"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-sans-body hover:bg-muted transition-colors"
                >
                  Subscription
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-sans-body hover:bg-muted transition-colors border-t border-border"
                  >
                    Admin panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2.5 text-sm font-sans-body hover:bg-muted transition-colors border-t border-border"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-sans-body hover:bg-muted transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-sans-body hover:bg-muted transition-colors"
                >
                  Create account
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-sans-body hover:bg-muted transition-colors border-t border-border"
                >
                  Admin login
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <span className="font-serif text-4xl font-medium tracking-tight leading-none">
            mitsi<br />ppl.
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-base font-sans-body tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.href
                  ? "text-primary border-b border-primary pb-0.5"
                  : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.instagram.com/mitsippl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={22} strokeWidth={1.5} />
          </a>
          <div className="hidden lg:block">
            <AccountBlock />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="text-foreground hover:text-primary transition-colors">
                <Menu size={26} strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 flex flex-col pt-16 gap-0">
              <SheetClose className="absolute right-5 top-5 text-foreground hover:text-primary transition-colors">
                <X size={22} strokeWidth={1.5} />
                <span className="sr-only">Close</span>
              </SheetClose>
              <nav className="flex flex-col gap-6 px-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-sans-body tracking-wide transition-colors hover:text-primary ${
                      location.pathname === link.href
                        ? "text-primary border-b border-primary pb-0.5 w-fit"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://www.instagram.com/mitsippl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors mt-2"
                  aria-label="Instagram"
                >
                  <Instagram size={22} strokeWidth={1.5} />
                </a>

                <div className="border-t border-border pt-6 mt-2">
                  {user ? (
                    <>
                      <Link
                        to="/account"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-base font-sans-body hover:text-primary transition-colors"
                      >
                        <span className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                          {initials}
                        </span>
                        Member panel
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="mt-5 text-sm text-muted-foreground hover:text-foreground transition-colors font-sans-body"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-base font-sans-body hover:text-primary transition-colors"
                    >
                      <User size={17} strokeWidth={1.5} />
                      Sign in
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
