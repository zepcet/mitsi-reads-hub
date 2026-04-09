import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allClubs } from "@/data/bookClubs";

const BookClubs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="mb-16 border-b border-border pb-12">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">Archive</p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium max-w-xl">
            Our Book Clubs
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed font-sans-body">
            Every month we gather around a new title. Here's a look at everything we've read together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allClubs.map((club) => (
            <Link to={`/book-clubs/${club.slug}`} key={club.id} className="group cursor-pointer">
              <article>
                <div className="aspect-[4/3] overflow-hidden bg-muted mb-4">
                  <img
                    src={club.image}
                    alt={club.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2 font-sans-body">
                  {club.month} · {club.genre}
                </p>
                <h2 className="font-serif text-xl font-medium mb-1 group-hover:text-primary transition-colors">
                  {club.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-3 font-sans-body">{club.author}</p>
                <p className="text-sm leading-relaxed text-muted-foreground font-sans-body line-clamp-3">
                  {club.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookClubs;

