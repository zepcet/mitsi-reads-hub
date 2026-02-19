import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import mitsiLogo from "@/assets/mitsi-logo.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 px-6 max-w-6xl mx-auto">

        {/* Founder — moved to top */}

        {/* Founder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 pb-24 border-b border-border">
          <div className="aspect-square overflow-hidden bg-muted max-w-sm">
            <img src={mitsiLogo} alt="mitsi ppl logo" className="w-full h-full object-cover" />
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
