import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import founderPhoto from "@/assets/founder.png";
import mitsiLogo from "@/assets/mitsi-logo.jpg";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    caption: "This month's read 📖 Normal People by Sally Rooney. Have you read it?",
    likes: 142,
    url: "https://www.instagram.com/mitsippl/",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    caption: "Our cozy Sunday reading session ☕ Nothing beats books + good company.",
    likes: 98,
    url: "https://www.instagram.com/mitsippl/",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
    caption: "February pick revealed! 🎉 Babel by R.F. Kuang — we're not ready.",
    likes: 211,
    url: "https://www.instagram.com/mitsippl/",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&q=80",
    caption: "Post-session thoughts. We talked for 3 hours straight 💬",
    likes: 76,
    url: "https://www.instagram.com/mitsippl/",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
    caption: "Reading is better together. Always. 🤍 #mitsippl #bookclub",
    likes: 189,
    url: "https://www.instagram.com/mitsippl/",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 px-6 max-w-6xl mx-auto">

        {/* Founder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 pb-24 border-b border-border">
          <div className="aspect-square overflow-hidden bg-muted max-w-sm">
            <img src={founderPhoto} alt="Fatmagül" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">The founder</p>
            <h2 className="font-serif text-3xl font-medium mb-6">Hello, I'm Fatmagül.</h2>
            <p className="text-muted-foreground leading-relaxed font-sans-body mb-4">
              I started mitsi ppl. because I missed the feeling of finishing a book and immediately wanting to talk about it with someone who cared. I'd been reading alone for too long.
            </p>
            <p className="text-muted-foreground leading-relaxed font-sans-body mb-4">
              What started as a small WhatsApp group has grown into a proper community of readers who show up every month, full of opinions and warmth.
            </p>
            <p className="text-muted-foreground leading-relaxed font-sans-body">
              I'm so glad you're here.
            </p>
          </div>
        </div>

        {/* Instagram grid */}
        <div className="mb-24 pb-24 border-b border-border">
          <div className="flex items-center gap-3 mb-8">
            <img src={mitsiLogo} alt="@mitsippl" className="w-9 h-9 rounded-full object-cover" />
            <a
              href="https://www.instagram.com/mitsippl/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans-body text-sm font-medium hover:text-primary transition-colors"
            >
              @mitsippl
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-muted block"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                  <p className="text-background text-xs font-sans-body px-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16">
          <h2 className="font-serif text-4xl font-medium mb-4">Ready to join?</h2>
          <p className="text-muted-foreground mb-8 font-sans-body">
            Your next great read is one subscription away.
          </p>
          <a
            href="/subscriptions"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors"
          >
            See membership plans
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

