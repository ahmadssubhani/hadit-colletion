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
  hadeeth: string; // matn text (in whichever language was requested)
  attribution: string; // e.g. "Al-Bukhaari" — the actual source book/collector
  grade: string; // e.g. "Saheeh (authentic)"
  explanation?: string;
  hints?: string[];
  categories?: Array<{ id: string; title: string }>;
}

const BASE_URL = "https://hadeethenc.com/api/v1";

async function fetchDetail(id: string, language: "en" | "ar"): Promise<HadeethEncDetail | null> {
  try {
    const res = await fetch(`${BASE_URL}/hadeeths/one/?id=${id}&language=${language}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as HadeethEncDetail;
  } catch {
    return null;
  }
}

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
          signal: AbortSignal.timeout(8000),
        });

        if (!searchRes.ok) continue;

        const results = (await searchRes.json()) as HadeethEncSearchResult[];
        if (!Array.isArray(results)) continue;

        for (const result of results) {
          if (candidates.length >= max) break;
          if (seenIds.has(result.id)) continue;
          seenIds.add(result.id);

          // Fetch English and Arabic in parallel — same hadith id, different language param
          const [enDetail, arDetail] = await Promise.all([
            fetchDetail(result.id, "en"),
            fetchDetail(result.id, "ar"),
          ]);

          if (!enDetail?.hadeeth) continue;

          // attribution is the real source book (e.g. "Al-Bukhaari", "Muslim") —
          // use it as the book title instead of a generic placeholder.
          const bookTitle = enDetail.attribution?.trim() || "HadeethEnc Encyclopedia of Translated Hadith";

          candidates.push({
            source: "hadeethenc",
            sourceIdentifier: `hadeethenc:${enDetail.id}`,
            bookTitle,
            hadithNumber: enDetail.id,
            chapter: enDetail.categories?.[0]?.title ?? topic.title,
            arabicText: arDetail?.hadeeth ?? "",
            englishText: enDetail.hadeeth,
            translator: "HadeethEnc.com (IslamHouse.com)",
            sourceUrl: `https://hadeethenc.com/en/browse/hadith/${enDetail.id}`,
            tradition: "Sunni",
            hadithStatus: enDetail.grade || "unspecified",
            chainStatus: "unspecified",
            narrationStatus: [],
            statusNotes: enDetail.explanation,
            rawPayload: { en: enDetail, ar: arDetail } as unknown as Record<string, unknown>,
          });
        }
      }
    } catch (error) {
      console.error(`[HadeethEncFetcher] Error fetching from hadeethenc.com:`, error);
    }

    return candidates;
  }
}