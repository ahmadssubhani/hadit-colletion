// import { RawFetchedCandidate, SourceFetcher, TopicDefinition } from "./types";

// export class HadeethEncFetcher implements SourceFetcher {
//   name = "HadeethEnc.com Fetcher";
//   sourceType = "hadeethenc" as const;

//   async fetchCandidates(
//     topic: TopicDefinition,
//     options?: { maxResults?: number; expandSearch?: boolean }
//   ): Promise<RawFetchedCandidate[]> {
//     const max = options?.maxResults ?? 20;
//     const candidates: RawFetchedCandidate[] = [];
//     const searchTerms = [...topic.searchQueries.arabic, ...topic.searchQueries.english];

//     console.log(`[HadeethEncFetcher] Fetching candidates for topic: ${topic.slug}`);

//     try {
//       // HadeethEnc has an official API: https://hadeethenc.com/api/v1/hadeeths/list/...
      
//     } catch (error) {
//       console.error(`[HadeethEncFetcher] Error fetching from hadeethenc.com:`, error);
//     }

//     return candidates;
//   }
// }

import { RawFetchedCandidate, SourceFetcher, TopicDefinition } from "./types";

interface HadeethEncSearchResult {
  id: string;
  title: string;
}

interface HadeethEncDetail {
  id: string;
  title: string;
  hadeeth: string; // matn text
  attribution: string; // e.g. "Al-Bukhaari"
  grade: string; // e.g. "Saheeh (authentic)"
  explanation?: string;
  hints?: string[];
  categories?: Array<{ id: string; title: string }>;
}

const BASE_URL = "https://hadeethenc.com/api/v1";

export class HadeethEncFetcher implements SourceFetcher {
  name = "HadeethEnc.com Fetcher";
  sourceType = "hadeethenc" as const;

  async fetchCandidates(
    topic: TopicDefinition,
    options?: { maxResults?: number; expandSearch?: boolean }
  ): Promise<RawFetchedCandidate[]> {
    const max = options?.maxResults ?? 20;
    const candidates: RawFetchedCandidate[] = [];
    const searchTerms = [
      ...topic.searchQueries.english,
      ...(options?.expandSearch && topic.expandedKeywords ? topic.expandedKeywords : []),
    ];

    console.log(`[HadeethEncFetcher] Fetching candidates for topic: ${topic.slug}`);

    try {
      const seenIds = new Set<string>();

      for (const term of searchTerms) {
        if (candidates.length >= max) break;

        const searchUrl = `${BASE_URL}/hadeeths/search/?phrase=${encodeURIComponent(
          term
        )}&language=en`;
        const searchRes = await fetch(searchUrl, {
          headers: { Accept: "application/json" },
          // HadeethEnc can be slow; bail out rather than hang the cron run
          signal: AbortSignal.timeout(8000),
        });

        if (!searchRes.ok) continue;

        const results = (await searchRes.json()) as HadeethEncSearchResult[];
        if (!Array.isArray(results)) continue;

        for (const result of results) {
          if (candidates.length >= max) break;
          if (seenIds.has(result.id)) continue;
          seenIds.add(result.id);

          const detailUrl = `${BASE_URL}/hadeeths/one/?id=${result.id}&language=en`;
          const detailRes = await fetch(detailUrl, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(8000),
          });
          if (!detailRes.ok) continue;

          const detail = (await detailRes.json()) as HadeethEncDetail;
          if (!detail?.hadeeth) continue;

          candidates.push({
            source: "hadeethenc",
            sourceIdentifier: `hadeethenc:${detail.id}`,
            bookTitle: "HadeethEnc Encyclopedia of Translated Hadith",
            hadithNumber: detail.id,
            chapter: detail.categories?.[0]?.title ?? topic.title,
            arabicText: "", // English endpoint does not return Arabic matn
            englishText: detail.hadeeth,
            translator: "HadeethEnc.com (IslamHouse.com)",
            sourceUrl: `https://hadeethenc.com/en/browse/hadith/${detail.id}`,
            tradition: "Sunni",
            hadithStatus: detail.grade || "unspecified",
            chainStatus: "unspecified",
            narrationStatus: [],
            statusNotes: detail.explanation,
            rawPayload: detail as unknown as Record<string, unknown>,
          });
        }
      }
    } catch (error) {
      console.error(`[HadeethEncFetcher] Error fetching from hadeethenc.com:`, error);
    }

    return candidates;
  }
}