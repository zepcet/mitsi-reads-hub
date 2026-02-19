import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bookClubs = [
  {
    id: 1,
    title: "Normal People",
    author: "Sally Rooney",
    month: "January 2025",
    excerpt: "We explored themes of class, intimacy, and the quiet ways people shape each other's lives.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
  },
  {
    id: 2,
    title: "Babel",
    author: "R.F. Kuang",
    month: "February 2025",
    excerpt: "A gripping conversation about language, empire, and the cost of belonging to institutions that don't truly belong to you.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
  },
  {
    id: 3,
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    month: "March 2025",
    excerpt: "Love, creativity, and collaboration across decades. One of our most spirited discussions yet.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — text only, Seen Library style */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans-body">
              A book club for curious people
            </p>
            <h1 className="font-serif text-6xl md:text-8xl font-medium leading-tight">
              We read.<br />We talk.<br />We connect.
            </h1>
          </div>
          <div className="flex flex-col justify-center md:pt-16">
            <p className="text-lg leading-relaxed text-muted-foreground font-sans-body mb-4">
              mitsi ppl. is a book club built on the belief that reading is better together. We believe books are not just stories — they're invitations to understand the world and each other more deeply.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground font-sans-body mb-8">
              Each month, we choose one book and gather — virtually and in person — to share what moved us, challenged us, and surprised us. No book degree required. Just curiosity.
            </p>
            <div className="flex gap-4">
              <Link
                to="/subscriptions"
                className="bg-primary text-primary-foreground px-6 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors"
              >
                Join the club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Book Clubs */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-medium">Recent Reads</h2>
          <Link to="/book-clubs" className="text-sm text-primary border-b border-primary pb-0.5 hover:text-primary/80 transition-colors">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bookClubs.map((club) => (
            <article key={club.id} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-muted mb-4">
                <img
                  src={club.image}
                  alt={club.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2 font-sans-body">
                {club.month}
              </p>
              <h3 className="font-serif text-xl font-medium mb-1">{club.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 font-sans-body">{club.author}</p>
              <p className="text-sm leading-relaxed text-muted-foreground font-sans-body">{club.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="bg-primary text-primary-foreground py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase mb-4 opacity-80 font-sans-body">Membership</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Become a member
          </h2>
          <p className="text-lg opacity-80 mb-8 font-sans-body leading-relaxed">
            Get early access to book selections, exclusive discussion guides, and community events with like-minded readers.
          </p>
          <Link
            to="/subscriptions"
            className="inline-block border border-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            See plans
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
