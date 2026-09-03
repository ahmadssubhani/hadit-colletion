import { RawFetchedCandidate, SourceFetcher, TopicDefinition } from "./types";

export class DorarFetcher implements SourceFetcher {
  name = "Dorar.net Fetcher";
  sourceType = "dorar" as const;

  async fetchCandidates(
    topic?: TopicDefinition,
    _options?: { maxResults?: number; expandSearch?: boolean }
  ): Promise<RawFetchedCandidate[]> {
    const candidates: RawFetchedCandidate[] = [];
    const searchTerms = topic?.searchQueries?.arabic ?? [];

    console.log(`[DorarFetcher] Fetching candidates for topic: ${topic?.slug ?? "general"} with ${searchTerms.length} queries`);

    return candidates;
  }
}
