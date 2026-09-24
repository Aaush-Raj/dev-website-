/**
 * SECTION 10 CONTENT — customer stories
 * ---------------------------------------------------------------------------
 * Three story cards, each with a photo, a sector label, the story's standfirst
 * and its two chips — closed by a pull quote on a dark bar.
 *
 * THE CARDS ARE NOT WRITTEN HERE. They are picked, by id, from the customer
 * stories index in content/customers.ts, which in turn derives the BFSI story
 * from its own page in content/case-study.ts. So a card on the homepage shows
 * exactly the photograph, headline and figures a visitor finds when they click
 * through — this file used to carry its own three stories with placeholder
 * photos and invented metrics, and none of them matched anything inside.
 *
 * What IS decided here: which three of the index's stories the homepage
 * features, in what order, and which card carries the amber emphasis.
 */

import { caseStudy } from "./case-study";
import { customers } from "./customers";

type IndexStory = (typeof customers.stories.items)[number];

/**
 * The three featured stories, by id, in display order. The first three of
 * the index — the same order the customers page opens with — so the homepage
 * and the index tell the story the same way. Swap an id to feature a
 * different one; an id the index does not carry fails the build rather than
 * silently rendering an empty card.
 */
const FEATURED = ["story-bfsi", "story-ngo", "story-ict"] as const;

function pick(id: (typeof FEATURED)[number]): IndexStory {
  const story = customers.stories.items.find((s) => s.id === id);
  if (!story) throw new Error(`stories: no customer story with id "${id}"`);
  return story;
}

/**
 * Where the card goes. A story with its own page links there; one that has
 * no page yet links to its card on the index (the index itself uses a bare
 * "/customers" for those, which from the homepage would land at the top of
 * the page rather than on the story).
 */
function hrefFor(story: IndexStory) {
  return story.cta.href === "/customers"
    ? `/customers#${story.id}`
    : story.cta.href;
}

/** The case study's own pull quote — see `quote` below. */
const caseStudyQuote = caseStudy.article.find(
  (block): block is Extract<(typeof caseStudy.article)[number], { kind: "quote" }> =>
    block.kind === "quote",
);
if (!caseStudyQuote) throw new Error("stories: the case study has no pull quote");

export const stories = {
  eyebrow: "Customer stories",

  /** Split so the line breaks where the design breaks it on lg+. */
  headline: ["Capability programmes", "that show up in the work."] as const,

  description:
    "How enterprises across frontline, technical and regulated workforces turn learning into measurable readiness.",

  link: { label: "Explore all customer stories", href: "/customers" },

  /**
   * The three cards, in the shape the homepage card draws.
   *
   * `tone` drives the top rule, the sector label and the figures. The design
   * runs two violet cards and one amber, so the row has a single point of
   * emphasis rather than three competing ones — the third card takes it.
   */
  items: FEATURED.map((id, index) => {
    const story = pick(id);
    const tone: "brand" | "accent" = index === 2 ? "accent" : "brand";

    return {
      id: story.id,
      industry: story.category,
      title: story.headline,
      description: story.description,
      chips: story.chips,
      href: hrefFor(story),
      image: story.image,
      tone,
    };
  }),

  /**
   * The pull quote on the dark bar that closes the section.
   *
   * It is the BFSI story's own closing line, credited to the story — NOT a
   * customer testimonial. The bar used to carry an invented quote attributed
   * to an anonymous "Learning Leader, Enterprise Customer"; beside three real
   * stories, an unsourced testimonial is a liability, and the design's TODO
   * already said it could not ship without sign-off. If a cleared customer
   * quote arrives, it goes here with a real name.
   */
  quote: {
    text: caseStudyQuote.text,
    attribution: [
      "\u2014 From the customer story,",
      caseStudy.breadcrumb.current + " / Financial Services",
    ] as const,
  },
} as const;
