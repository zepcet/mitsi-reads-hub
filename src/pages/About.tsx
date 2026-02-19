import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import mitsiLogo from "@/assets/mitsi-logo.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 px-6 max-w-6xl mx-auto">

        {/* Hero section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24 pb-24 border-b border-border">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">About</p>
            <h1 className="font-serif text-5xl md:text-6xl font-medium leading-tight">
              We read.<br />We talk.<br />We connect.
            </h1>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-muted-foreground font-sans-body mb-6">
              mitsi ppl. is a book club built on the belief that reading is better together. We believe books are not just stories — they're invitations to understand the world and each other more deeply.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground font-sans-body">
              Each month, we choose one book and gather — virtually and in person — to share what moved us, challenged us, and surprised us. No book degree required. Just curiosity.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="font-serif text-3xl font-medium mb-12">What we believe in</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                number: "01",
                title: "Radical inclusion",
                body: "Books belong to everyone. Our community welcomes every kind of reader — slow, fast, critical, emotional, first-timers and lifelong lovers of literature.",
              },
              {
                number: "02",
                title: "Honest conversation",
                body: "We don't just summarize. We dig into what the book made us feel, think, and question. Disagreement is welcome. Pretension is not.",
              },
              {
                number: "03",
                title: "Real community",
                body: "We're not just a newsletter. We're a group of real people who show up — month after month — to share something that matters.",
              },
            ].map((value) => (
              <div key={value.number}>
                <p className="text-primary font-serif text-5xl font-medium mb-4 opacity-30">{value.number}</p>
                <h3 className="font-serif text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans-body">{value.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 pb-24 border-b border-border">
          <div className="aspect-square overflow-hidden bg-muted max-w-sm">
            <img src={mitsiLogo} alt="mitsi ppl logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans-body">The founder</p>
            <h2 className="font-serif text-3xl font-medium mb-6">Hello, I'm Mitsi.</h2>
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
