import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/book-clubs", label: "Book Clubs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <span className="font-serif text-4xl font-medium tracking-tight leading-none">mitsi<br />ppl.</span>
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

