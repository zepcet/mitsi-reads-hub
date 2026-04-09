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
];
