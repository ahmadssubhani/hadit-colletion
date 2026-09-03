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
  rawPayload: any;
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
