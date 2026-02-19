import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allClubs = [
  {
    id: 1,
    title: "Normal People",
    author: "Sally Rooney",
    month: "January 2025",
    genre: "Literary Fiction",
    excerpt: "We explored themes of class, intimacy, and the quiet ways people shape each other's lives. One of our most emotionally resonant sessions.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
  },
  {
    id: 2,
    title: "Babel",
    author: "R.F. Kuang",
    month: "February 2025",
    genre: "Historical Fantasy",
    excerpt: "A gripping conversation about language, empire, and the cost of belonging to institutions that don't truly belong to you.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
  },
  {
    id: 3,
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    month: "March 2025",
    genre: "Literary Fiction",
    excerpt: "Love, creativity, and collaboration across decades. One of our most spirited discussions yet.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
  },
  {
    id: 4,
    title: "The Covenant of Water",
    author: "Abraham Verghese",
    month: "April 2025",
    genre: "Historical Fiction",
    excerpt: "A sweeping multi-generational saga set in South India. We talked for hours about family, medicine, and memory.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: 5,
    title: "James",
    author: "Percival Everett",
    month: "May 2025",
    genre: "Fiction",
    excerpt: "A radical reimagining of Huckleberry Finn told from Jim's perspective. Powerful, funny, and devastating all at once.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
  },
  {
    id: 6,
    title: "Intermezzo",
    author: "Sally Rooney",
    month: "June 2025",
    genre: "Literary Fiction",
    excerpt: "Grief, love, and the games we play to survive loss. A perfect summer read that sparked a wonderful debate.",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80",
  },
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {allClubs.map((club, index) => (
            <article
              key={club.id}
              className={`group cursor-pointer flex gap-6 ${index % 2 === 1 ? "md:mt-12" : ""}`}
            >
              <div className="w-36 h-48 shrink-0 overflow-hidden bg-muted">
                <img
                  src={club.image}
                  alt={club.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
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
                <span className="mt-4 text-xs text-primary font-sans-body tracking-wide">
                  Read more →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookClubs;
