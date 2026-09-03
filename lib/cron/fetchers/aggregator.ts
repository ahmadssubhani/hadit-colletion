import { AggregatedFetchResult, RawFetchedCandidate, SourceFetcher, SourceHealthStatus, TopicDefinition } from "./types";
import { SunnahFetcher } from "./sunnah-fetcher";
import { DorarFetcher } from "./dorar-fetcher";
import { ThaqalaynFetcher } from "./thaqalayn-fetcher";
import { HadeethEncFetcher } from "./hadeethenc-fetcher";

export class FetchAggregator {
  private fetchers: SourceFetcher[] = [
    new SunnahFetcher(),
    new DorarFetcher(),
    new ThaqalaynFetcher(),
    new HadeethEncFetcher(),
  ];

  async aggregate(topic?: TopicDefinition, maxPerSource = 20): Promise<AggregatedFetchResult> {
    console.log(`[FetchAggregator] Aggregating candidates across ${this.fetchers.length} DATA_INGESTION.md sources...`);

    const sourceHealth: SourceHealthStatus[] = [];
    const allCandidates: RawFetchedCandidate[] = [];

    const promises = this.fetchers.map(async (f) => {
      try {
        const candidates = await f.fetchCandidates(topic, { maxResults: maxPerSource });
        sourceHealth.push({
          sourceType: f.sourceType,
          name: f.name,
          status: "ok",
          fetchedCount: candidates.length,
        });
        return candidates;
      } catch (err: any) {
        console.error(`[FetchAggregator] Source ${f.name} unreachable/failed:`, err.message);
        sourceHealth.push({
          sourceType: f.sourceType,
          name: f.name,
          status: "unreachable",
          fetchedCount: 0,
          errorMessage: err.message,
        });
        return [];
      }
    });

    const results = await Promise.all(promises);
    for (const res of results) {
      allCandidates.push(...res);
    }

    console.log(`[FetchAggregator] Total candidates aggregated: ${allCandidates.length} from ${sourceHealth.filter(s => s.status === 'ok').length}/${this.fetchers.length} active sources`);

    return {
      candidates: allCandidates,
      sourceHealth,
    };
  }
}
