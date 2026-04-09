import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allClubs } from "@/data/bookClubs";

const recentReads = allClubs.slice(0, 3);

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
              Your lifestyle concierge with curated moods & foods and items. A monthly book club with wines & bites.
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

      {/* Video Section */}
      <section className="w-full border-b border-border">
        <div className="overflow-hidden flex items-center justify-center bg-black">
          <video
            className="w-full h-auto"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Recent Book Clubs */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-border">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-medium">Recent Reads</h2>
          <Link to="/book-clubs" className="text-sm text-foreground border-b border-foreground pb-0.5 hover:text-foreground/60 transition-colors">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentReads.map((club) => (
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
                  {club.month}
                </p>
                <h3 className="font-serif text-xl font-medium mb-1">{club.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 font-sans-body">{club.author}</p>
                <p className="text-sm leading-relaxed text-muted-foreground font-sans-body">{club.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Book Club Stories */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-12">Book Club Stories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80", alt: "Book club gathering" },
            { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80", alt: "Reading together" },
            { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80", alt: "Wine and books" },
            { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80", alt: "Community dinner" },
          ].map((photo, i) => (
            <div key={i} className="aspect-square overflow-hidden bg-muted group cursor-pointer">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
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
