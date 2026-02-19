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
    id: 1,
    slug: "normal-people",
    title: "Normal People",
    author: "Sally Rooney",
    month: "January 2025",
    genre: "Literary Fiction",
    excerpt: "We explored themes of class, intimacy, and the quiet ways people shape each other's lives. One of our most emotionally resonant sessions.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    rating: 5,
    body: [
      "We kicked off 2025 with Sally Rooney's Normal People — and honestly, we couldn't have chosen a more fitting start. The room (virtual and in-person) was electric from the first five minutes.",
      "The novel follows Connell and Marianne across years, classes, and continents — and what struck us most was how Rooney captures the unsaid. So much of the tension lives in what the characters don't tell each other. It felt achingly real.",
      "We spent a long time talking about class anxiety — how Connell's insecurity about his background shapes every relationship he has, often without him even realising it. Several members shared personal stories that felt mirrored in the book. That's when you know a novel has really done something.",
      "The writing style divided us slightly. Some loved the lack of quotation marks; others found it distancing. But we all agreed: Rooney writes interiority better than almost anyone working today.",
    ],
    discussionHighlights: [
      "\"I've never felt so seen by a fictional character's silence.\"",
      "\"Connell is both the most frustrating and most human character I've read in years.\"",
      "\"The ending destroyed me — in the best possible way.\"",
    ],
  },
  {
    id: 2,
    slug: "babel",
    title: "Babel",
    author: "R.F. Kuang",
    month: "February 2025",
    genre: "Historical Fantasy",
    excerpt: "A gripping conversation about language, empire, and the cost of belonging to institutions that don't truly belong to you.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    rating: 5,
    body: [
      "February's pick was R.F. Kuang's Babel — and it hit differently than anything we'd read before. A dark academia fantasy rooted in the violence of empire and the seduction of belonging.",
      "Set in 1830s Oxford, the novel follows Robin, a Chinese student recruited to study at the Royal Institute of Translation. The magic system — silver bars that harness the 'loss in translation' between languages — is one of the most original we've ever encountered.",
      "What made our discussion so alive was how immediately political the book feels. We talked about what it means to benefit from an institution built on exploitation. Several members were studying or had studied at elite universities, and the parallels were uncomfortable in the best way.",
      "Kuang doesn't give easy answers, and we appreciated that. The characters make choices that are morally complicated, and the ending refuses to be redemptive in a comfortable sense. We sat with the discomfort, and it was worth it.",
    ],
    discussionHighlights: [
      "\"I had to put it down after Chapter 20. I needed a moment.\"",
      "\"The footnotes are incredible — she clearly did years of research.\"",
      "\"This is the most important fantasy novel I've read. Full stop.\"",
    ],
  },
  {
    id: 3,
    slug: "tomorrow-and-tomorrow-and-tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    month: "March 2025",
    genre: "Literary Fiction",
    excerpt: "Love, creativity, and collaboration across decades. One of our most spirited discussions yet.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    rating: 4,
    body: [
      "March brought us Gabrielle Zevin's surprise masterpiece — a novel about video games that turns out to be about everything else: friendship, ambition, grief, and the strange way art can outlive us.",
      "Sam and Sadie's relationship — not romantic, not not-romantic — was the centre of almost all our discussion. Zevin refuses to let it be defined, and members were genuinely split on whether that was a strength or a frustration.",
      "For those of us who grew up gaming, there was something deeply nostalgic about the way Zevin captures the worlds of the 80s, 90s and 2000s gaming scenes. But you don't need to know a joystick from a controller to love this book.",
      "The section about Marx was unexpected and moved several people to tears. Zevin writes grief the way very few authors can — not as an event, but as something that changes the texture of every ordinary moment after.",
    ],
    discussionHighlights: [
      "\"I didn't expect to cry over a video game novel. Here we are.\"",
      "\"Sam is infuriating and I loved every page with him in it.\"",
      "\"The title is perfect. It only made sense on the last page.\"",
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
