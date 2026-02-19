import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allClubs } from "@/data/bookClubs";

const BookClubPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const club = allClubs.find((c) => c.slug === slug);

  if (!club) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 px-6 max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-medium mb-4">Post not found</h1>
          <Link to="/book-clubs" className="text-primary text-sm border-b border-primary pb-0.5">
            ← Back to Book Clubs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        {/* Back */}
        <Link
          to="/book-clubs"
          className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body hover:text-primary transition-colors"
        >
          ← Book Clubs
        </Link>

        {/* Meta */}
        <p className="text-xs tracking-widest uppercase text-muted-foreground mt-8 mb-3 font-sans-body">
          {club.month} · {club.genre}
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-tight mb-2">
          {club.title}
        </h1>
        <p className="font-sans-body text-xl text-muted-foreground mb-10">{club.author}</p>

        {/* Hero image */}
        <div className="aspect-[16/7] overflow-hidden bg-muted mb-12">
          <img
            src={club.image}
            alt={club.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body */}
        <div className="space-y-6 mb-14">
          {club.body.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-foreground font-sans-body">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Discussion highlights */}
        <div className="border-t border-border pt-10">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans-body">
            From the discussion
          </p>
          <div className="space-y-5">
            {club.discussionHighlights.map((quote, i) => (
              <blockquote
                key={i}
                className="border-l-2 border-primary pl-5 font-serif text-xl italic text-foreground"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mt-12 flex items-center gap-2">
          <p className="text-xs tracking-widest uppercase text-muted-foreground font-sans-body mr-2">Club rating</p>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i < club.rating ? "text-primary" : "text-muted"}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Next/Prev navigation */}
        <div className="mt-16 pt-8 border-t border-border flex justify-between gap-8">
          {allClubs[allClubs.findIndex((c) => c.slug === slug) - 1] ? (
            <Link
              to={`/book-clubs/${allClubs[allClubs.findIndex((c) => c.slug === slug) - 1].slug}`}
              className="group flex flex-col"
            >
              <span className="text-xs text-muted-foreground font-sans-body tracking-widest uppercase mb-1">← Previous</span>
              <span className="font-serif text-lg group-hover:text-primary transition-colors">
                {allClubs[allClubs.findIndex((c) => c.slug === slug) - 1].title}
              </span>
            </Link>
          ) : <div />}

          {allClubs[allClubs.findIndex((c) => c.slug === slug) + 1] && (
            <Link
              to={`/book-clubs/${allClubs[allClubs.findIndex((c) => c.slug === slug) + 1].slug}`}
              className="group flex flex-col items-end"
            >
              <span className="text-xs text-muted-foreground font-sans-body tracking-widest uppercase mb-1">Next →</span>
              <span className="font-serif text-lg group-hover:text-primary transition-colors">
                {allClubs[allClubs.findIndex((c) => c.slug === slug) + 1].title}
              </span>
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookClubPost;
