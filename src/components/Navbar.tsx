import { Link, useLocation } from "react-router-dom";
import { Instagram } from "lucide-react";
import mitsiLogo from "@/assets/mitsi-logo.jpg";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/book-clubs", label: "Book Clubs" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 rounded-sm overflow-hidden">
            <img src={mitsiLogo} alt="mitsi ppl." className="w-full h-full object-cover" />
          </div>
          <span className="font-serif text-2xl font-medium tracking-tight">mitsi ppl.</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-sans-body tracking-wide transition-colors hover:text-primary ${
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
            <Instagram size={18} strokeWidth={1.5} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
