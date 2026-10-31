export type SearchIntent = "informational" | "navigational" | "commercial" | "game-seeking";

export type SeoCategory = "numbers" | "logic" | "computer-science" | "memory-visual" | "brand";

export type SeoGame = "target-25" | "sequence" | "pinpoint" | null;

export type SeoPageType = "game" | "collection" | "puzzle" | "guide";

export type SeoStatus = "research" | "draft" | "needs_review" | "approved" | "published" | "noindex" | "mapped" | "refused";

export type KeywordRecord = {
  keyword: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  category: SeoCategory;
  game: SeoGame;
  /** Monthly search volume. Null until a verified source is connected. */
  volume: number | null;
  /** Competition estimate. Null until a verified source is connected. */
  difficulty: number | null;
  country: string;
  pageType: SeoPageType | "category" | "existing";
  targetUrl: string | null;
  parentUrl: string | null;
  priority: "high" | "medium" | "low";
  status: SeoStatus;
  indexable: boolean;
  note: string;
};

export type SeoSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoChallenge = {
  prompt: string;
  difficulty: "easy" | "medium" | "harder";
  hint: string;
  answer: string;
  steps: string[];
  alternatives?: string[];
};

export type SeoLink = {
  href: string;
  label: string;
  description?: string;
};

export type SeoPage = {
  id: string;
  path: string;
  pageType: SeoPageType;
  category: SeoCategory;
  game: SeoGame;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  introduction: string;
  sections: SeoSection[];
  challenge?: SeoChallenge;
  strategies?: string[];
  faq?: { question: string; answer: string }[];
  related: SeoLink[];
  listing?: SeoLink[];
  parentPath: string;
  references?: { label: string; href: string }[];
  createdAt: string;
  updatedAt: string;
  status: "published";
  indexable: true;
};
