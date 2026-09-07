// export type ReviewStatus = "draft" | "in_review" | "published" | "rejected";

// export type Book = {
//   id: number;
//   title: string;
//   arabic_title: string | null;
//   author: string | null;
//   tradition: string;
//   book_type: string;
//   source_url: string | null;
//   license: string | null;
// };

// export type Hadith = {
//   id: number;
//   slug: string;
//   title: string;
//   arabic_title: string | null;
//   summary: string | null;
//   topics: string[];
//   review_status: ReviewStatus;
// };

// export type SourceVariation = {
//   id: number;
//   hadith_id: number;
//   book_id: number;
//   hadith_number: string | null;
//   chapter: string | null;
//   volume: string | null;
//   page: string | null;
//   arabic_text: string | null;
//   english_text: string | null;
//   translator: string | null;
//   source_url: string | null;
//   hadith_status: string;
//   chain_status: string;
//   narration_status: string[];
//   status_notes: string | null;
//   verified: boolean;
//   books?: Book | Book[] | null;
// };

// export type Narrator = {
//   id: number;
//   slug: string;
//   name: string;
//   arabic_name: string | null;
//   alternative_names: string[];
//   birth_year_ah: number | null;
//   death_year_ah: number | null;
//   region: string | null;
//   generation: string | null;
//   biography: string | null;
//   summary_score: number | null;
//   identity_status: string;
// };

// export type ChainNarrator = {
//   id: number;
//   chain_id: number;
//   narrator_id: number | null;
//   position: number;
//   raw_name: string;
//   transmission_word: string | null;
//   match_confidence: number | null;
//   match_notes: string | null;
//   narrators?: Narrator | Narrator[] | null;
// };

// export type Chain = {
//   id: number;
//   variation_id: number;
//   chain_number: number;
//   raw_chain_text: string | null;
//   continuity_status: string;
//   quality_status: string;
//   notes: string | null;
//   verified: boolean;
//   chain_narrators?: ChainNarrator[];
  
// };

// export type Scholar = {
//   id: number;
//   slug: string;
//   name: string;
//   arabic_name: string | null;
//   tradition: string | null;
//   birth_year_ah: number | null;
//   death_year_ah: number | null;
//   credentials: string | null;
//   methodology: string | null;
// };

// export type HadithAssessment = {
//   id: number;
//   variation_id: number;
//   scholar_id: number;
//   original_grade: string;
//   normalized_grade: string | null;
//   explanation: string | null;
//   reference_book: string | null;
//   edition: string | null;
//   volume: string | null;
//   page: string | null;
//   source_url: string | null;
//   verified: boolean;
//   scholars?: Scholar | Scholar[] | null;
// };

// export type NarratorAssessment = {
//   id: number;
//   narrator_id: number;
//   scholar_id: number;
//   original_term: string;
//   normalized_term: string | null;
//   explanation: string | null;
//   display_score: number | null;
//   mapping_method: string | null;
//   reference_book: string | null;
//   edition: string | null;
//   volume: string | null;
//   page: string | null;
//   source_url: string | null;
//   verified: boolean;
//   scholars?: Scholar | Scholar[] | null;
// };

// export type ChainAssessment = {
//   id: number;
//   chain_id: number;
//   scholar_id: number | null;
//   continuity_status: string | null;
//   quality_status: string | null;
//   explanation: string | null;
//   reference_book: string | null;
//   edition: string | null;
//   volume: string | null;
//   page: string | null;
//   source_url: string | null;
//   verified: boolean;
//   scholars?: Scholar | Scholar[] | null;
// };

// export type SourceVariationDetail = SourceVariation & {
//   books: Book | null;
//   chains: Chain[];
//   hadith_assessments: HadithAssessment[];
// };

// export type SearchFilters = {
//   q?: string;
//   bookId?: string;
//   hadithStatus?: string;
//   chainStatus?: string;
//   narrationStatus?: string;
//   scholarId?: string;
//   assessment?: string;
//   page?: number;
// };

// export type SearchResult = {
//   hadiths: Array<Hadith & { variation_count: number }>;
//   total: number;
//   page: number;
//   pageSize: number;
// };

// export const PAGE_SIZE = 12;
export interface CandidateNarratorNode {
  position: number;
  rawName: string;
  slug?: string;
  word?: string;
}

export interface CandidateAssessment {
  scholarName: string;
  scholarSlug?: string;
  originalGrade: string;
  normalizedGrade: string;
  explanation?: string;
  score?: number;
  referenceBook?: string;
  edition?: string;
  volume?: string;
  page?: string;
}

export interface RawFetchedCandidate {
  source: "sunnah.com" | "thaqalayn" | "hadeethenc" | "dorar" | "al-islam" | "reference";
  sourceIdentifier: string; // Unique global identifier (e.g. "sunnah:bukhari:3", "dorar:48210", "thaqalayn:1:4:1129")
  bookTitle: string;
  hadithNumber: string;
  chapter: string;
  volume?: string;
  page?: string;
  arabicText: string;
  englishText: string;
  translator?: string;
  sourceUrl: string;
  tradition: "Sunni" | "Twelver Shia" | "Academic / Inter-traditional";
  hadithStatus: string;
  chainStatus: string;
  narrationStatus: string[];
  statusNotes?: string;
  rawChainText?: string;
  nodes?: CandidateNarratorNode[];
  assessments?: CandidateAssessment[];
  rawPayload: Record<string, unknown>;
}

export interface TopicDefinition {
  slug: string;
  title: string;
  arabicTitle: string;
  description: string;
  keywords: string[];
  searchQueries: {
    arabic: string[];
    english: string[];
  };
  expandedKeywords?: string[];
}

export interface RelevanceScoreBreakdown {
  totalScore: number;
  arabicKeywordScore: number;
  englishKeywordScore: number;
  chapterScore: number;
  completenessScore: number;
  diversityBoost: number;
  matchedKeywords: string[];
}

export interface RankedCandidate {
  candidate: RawFetchedCandidate;
  scoreBreakdown: RelevanceScoreBreakdown;
}

export interface SourceHealthStatus {
  sourceType: "sunnah.com" | "thaqalayn" | "hadeethenc" | "dorar" | "al-islam" | "reference";
  name: string;
  status: "ok" | "unreachable" | "rate_limited" | "error";
  fetchedCount: number;
  errorMessage?: string;
}

export interface AggregatedFetchResult {
  candidates: RawFetchedCandidate[];
  sourceHealth: SourceHealthStatus[];
}

export interface SourceFetcher {
  name: string;
  sourceType: "sunnah.com" | "thaqalayn" | "hadeethenc" | "dorar" | "al-islam" | "reference";
  fetchCandidates(topic?: TopicDefinition, options?: { maxResults?: number; expandSearch?: boolean }): Promise<RawFetchedCandidate[]>;
}