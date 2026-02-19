import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <p className="font-serif text-xl font-medium">mitsi ppl.</p>
          <p className="text-muted-foreground text-sm mt-2 max-w-xs">
            A community for readers who love books, conversation, and connection.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link to="/subscriptions" className="text-sm hover:text-primary transition-colors">Subscriptions</Link>
          <Link to="/book-clubs" className="text-sm hover:text-primary transition-colors">Book Clubs</Link>
          <Link to="/about" className="text-sm hover:text-primary transition-colors">About</Link>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <Instagram size={16} strokeWidth={1.5} />
            @mitsippl
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} mitsi ppl. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
