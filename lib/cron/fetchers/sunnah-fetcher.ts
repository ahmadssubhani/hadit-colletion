import { RawFetchedCandidate, SourceFetcher, TopicDefinition } from "./types";

export class SunnahFetcher implements SourceFetcher {
  name = "Sunnah.com Fetcher";
  sourceType = "sunnah.com" as const;

  async fetchCandidates(
    topic?: TopicDefinition,
    options?: { maxResults?: number; expandSearch?: boolean }
  ): Promise<RawFetchedCandidate[]> {
    const candidates: RawFetchedCandidate[] = [];

    const searchTerms = topic?.searchQueries ? [
      ...topic.searchQueries.arabic,
      ...topic.searchQueries.english,
      ...(options?.expandSearch && topic.expandedKeywords ? topic.expandedKeywords : [])
    ] : [];

    console.log(`[SunnahFetcher] Fetching candidates for topic: ${topic?.slug ?? "general"} with ${searchTerms.length} queries`);

    return candidates;
  }
}
