export interface BookClub {
  id: number;
  slug: string;
  title: string;
  author: string;
  month: string;
  genre: string;
  excerpt: string;
  image: string;
  body: string[];
  rating: number;
  discussionHighlights: string[];
}

export const allClubs: BookClub[] = [
  {
    id: 0,
    slug: "all-fours",
    title: "All Fours",
    author: "Miranda July",
    month: "February 2025",
    genre: "Literary Fiction",
    excerpt: "Slip into the world of a 45-year-old, who has just left her husband and hit the road from LA to NYC — a New York Times bestseller.",
    image: "/images/mitsi-01.png",
    rating: 5,
    body: [
      "Our February pick was Miranda July's All Fours — and from the very first pages, we knew this one would stay with us. July has always been fearless, but this novel feels like her most vulnerable and fully realised work yet.",
      "The unnamed narrator — a woman in her mid-forties, married, a mother — impulsively veers off the road during a planned cross-country drive and checks into a motel near her home. What follows is a story about the body, desire, time, and what it means to want things you're not supposed to want.",
      "We spent a long time on the perimenopause sections, which July writes with a frankness that felt genuinely radical. For many in our group, it was the first time they'd read their own physical experience reflected back so clearly in fiction.",
      "Some found the novel difficult — its logic is dreamlike, not linear. But most agreed that July earns the strangeness. By the end, it didn't feel strange at all. It felt necessary.",
    ],
    discussionHighlights: [
      "\"I read the last fifty pages in one sitting. I couldn't stop.\"",
      "\"July writes the female body in a way I've never encountered before.\"",
      "\"Uncomfortable, funny, and completely alive. My favourite read in years.\"",
    ],
  },
  {
    id: 1,
    slug: "the-wedding-people",
    title: "The Wedding People",
    author: "Alison Espach",
    month: "March 2025",
    genre: "Literary Fiction",
    excerpt: "A gripping conversation about love, loneliness, and the unexpected connections we make when we least expect them.",
    image: "/images/mitsi-02.png",
    rating: 5,
    body: [
      "March brought us Alison Espach's The Wedding People — a novel that surprised us with its warmth, wit, and emotional depth. What begins as a story about a woman checking into a hotel to end her life becomes something entirely different.",
      "Lila arrives at a grand hotel in Newport, Rhode Island, only to find it overtaken by a wedding party. What follows is a week of unexpected connection, absurd comedy, and genuine tenderness as she's drawn into the lives of strangers.",
      "We talked extensively about how Espach handles depression — not with heavy-handedness, but with a lightness that never trivialises. The humour is earned, and the moments of hope feel real rather than forced.",
      "The setting — a beautiful, crumbling hotel by the sea — became a character in itself. Several members said they could smell the salt air while reading.",
    ],
    discussionHighlights: [
      "\"I laughed and cried in the same chapter. Multiple times.\"",
      "\"Espach writes loneliness with such precision it took my breath away.\"",
      "\"The ending was perfect — hopeful without being saccharine.\"",
    ],
  },
  {
    id: 2,
    slug: "mitsi-book-club-launch",
    title: "Mitsi Book Club",
    author: "at sitsstudio",
    month: "January 2025",
    genre: "Community Event",
    excerpt: "Our very first gathering — wine, candles, and a beautiful evening of conversation that started it all.",
    image: "/images/mitsi-03.png",
    rating: 5,
    body: [
      "January 2025 marked the very first Mitsi Book Club gathering at sitsstudio — and what a night it was. Candles lit, wine poured, and a table set for readers who didn't yet know each other.",
      "We came together around a shared love of books and left as a community. The conversation flowed as freely as the wine, and by the end of the evening, we knew this was something special.",
      "The intimate setting at sitsstudio — with its warm lighting and carefully curated atmosphere — set the tone for everything that would follow. This wasn't just a book club; it was an experience.",
      "Looking back, this first evening established the DNA of Mitsi Book Club: thoughtful conversation, beautiful spaces, good wine, and the belief that reading is better when shared.",
    ],
    discussionHighlights: [
      "\"I walked in knowing no one and left feeling like I'd found my people.\"",
      "\"The setting was magical — candles, wine, and the most beautiful table.\"",
      "\"This is what a book club should feel like.\"",
    ],
  },
  {
    id: 4,
    slug: "the-covenant-of-water",
    title: "The Covenant of Water",
    author: "Abraham Verghese",
    month: "April 2025",
    genre: "Historical Fiction",
    excerpt: "A sweeping multi-generational saga set in South India. We talked for hours about family, medicine, and memory.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    rating: 4,
    body: [
      "April's pick was a big one — in every sense. Abraham Verghese's The Covenant of Water spans three generations of a family in South India, from 1900 to 1977. At over 700 pages, it asked something of us. It gave back more.",
      "Verghese — a physician — writes the body with extraordinary care. The medical scenes, which in lesser hands would feel clinical, feel instead like acts of love. Several members who work in healthcare said it was the most accurate fictional portrayal of doctoring they'd ever read.",
      "The water motif — a condition that causes members of one family to drown across generations — sounds strange in summary but works beautifully in practice. It becomes a meditation on fate, legacy, and what we inherit without choosing.",
      "We spent an unusually long time on the ending, which brought threads together across decades in a way that felt genuinely earned. There were tears. There was applause. It was a good night.",
    ],
    discussionHighlights: [
      "\"Reading this felt like spending time with a family I'd known my whole life.\"",
      "\"Verghese writes South India so vividly I could smell the rain.\"",
      "\"The slowest start, the most satisfying ending. Trust the process.\"",
    ],
  },
  {
    id: 5,
    slug: "james",
    title: "James",
    author: "Percival Everett",
    month: "May 2025",
    genre: "Fiction",
    excerpt: "A radical reimagining of Huckleberry Finn told from Jim's perspective. Powerful, funny, and devastating all at once.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    rating: 5,
    body: [
      "Percival Everett's James arrived in May with the weight of a Pulitzer and delivered. It's a retelling of Adventures of Huckleberry Finn — from Jim's perspective, reimagined as a literate, philosophically astute man who has been performing ignorance his entire life to survive.",
      "The premise alone launched our best discussion of the year so far. What does it mean to perform? To code-switch? To survive by making yourself legible to people who have decided what you are? These weren't abstract questions for many in our group.",
      "Everett's prose is precise and devastating. Funny too — genuinely funny — which makes the moments of horror land harder. He doesn't let you get comfortable.",
      "We also talked about Twain — how to hold a classic text that is both a product of its time and deeply shaped by racial caricature. James doesn't erase Huck Finn; it corrects it. That distinction mattered to us.",
    ],
    discussionHighlights: [
      "\"The opening chapters are some of the best writing I've read in a decade.\"",
      "\"I laughed, then immediately felt guilty for laughing. Masterful.\"",
      "\"This should be taught alongside Huck Finn everywhere.\"",
    ],
  },
  {
    id: 6,
    slug: "intermezzo",
    title: "Intermezzo",
    author: "Sally Rooney",
    month: "June 2025",
    genre: "Literary Fiction",
    excerpt: "Grief, love, and the games we play to survive loss. A perfect summer read that sparked a wonderful debate.",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
    rating: 4,
    body: [
      "We returned to Sally Rooney in June — a conscious decision after the response to Normal People in January. Intermezzo felt like a more mature, more compassionate book, even if it didn't have the same raw voltage.",
      "Two brothers grieving their father in completely different ways. Peter, a lawyer in his thirties unravelling quietly; Ivan, a younger chess prodigy who falls unexpectedly in love. Rooney interweaves their stories with a structural elegance that becomes clearer the further you go.",
      "This time, the conversation centred on grief — how we perform okayness for each other, how loss changes what we're willing to risk. It was a more vulnerable discussion than usual, and we were grateful for it.",
      "Some members felt Intermezzo was overlong; others thought the pacing was deliberate and necessary. Rooney's prose has evolved — there's more interiority here, more patience — and we debated whether that was growth or indulgence. No consensus reached. That's as it should be.",
    ],
    discussionHighlights: [
      "\"Ivan is Sally Rooney's most surprising character. I didn't expect to love him.\"",
      "\"The grief in this book felt so specific it hurt.\"",
      "\"A slower burn than Normal People but I think I prefer it.\"",
    ],
  },
];
