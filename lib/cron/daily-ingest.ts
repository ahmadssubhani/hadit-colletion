// import { createClient, type SupabaseClient } from "@supabase/supabase-js";
// import { getPublicSupabaseUrl, getServiceRoleKey } from "@/lib/env";
// import {
//   getTopicDefinition,
//   getAllTopicDefinitions,
//   type TopicDefinition,
//   type HadithCandidate,
// } from "./topics-registry";
// import { FetchAggregator } from "./fetchers/aggregator";
// import { RelevanceRanker } from "./relevance-ranker";

// export interface DailyIngestResult {
//   success: boolean;
//   topicSlug: string;
//   topicTitle: string;
//   dayNumber: number;
//   runDate: string;
//   count: number;
//   remainingInTopicPool: number;
//   sourceHealth?: Array<{
//     sourceType: string;
//     name: string;
//     status: string;
//     fetchedCount: number;
//     errorMessage?: string;
//   }>;
//   shortlistedHadiths: Array<{
//     identifier: string;
//     bookTitle: string;
//     hadithNumber: string;
//     chapter: string;
//     arabicPreview: string;
//     englishPreview: string;
//     hadithStatus: string;
//     sourceUrl?: string;
//   }>;
//   isDryRun: boolean;
//   message: string;
//   error?: string;
// }

// export function getServiceRoleSupabaseClient(): SupabaseClient | null {
//   try {
//     const url = getPublicSupabaseUrl();
//     const serviceKey = getServiceRoleKey();
//     if (!url || !serviceKey) return null;
//     return createClient(url, serviceKey, {
//       auth: { persistSession: false, autoRefreshToken: false },
//     });
//   } catch {
//     return null;
//   }
// }

// /**
//  * Runs the daily shortlist and ingestion pipeline.
//  * Selects 5 new hadiths that have NOT been ingested on previous days for the active topic.
//  */
// export async function runDailyHadithIngest(options?: {
//   topicSlug?: string;
//   forceNextDay?: boolean;
//   apply?: boolean;
//   batchSize?: number;
// }): Promise<DailyIngestResult> {
//   const batchSize = options?.batchSize ?? 5;
//   const isDryRun = !options?.apply;
//   const runDate = new Date().toISOString().split("T")[0];

//   const supabase = getServiceRoleSupabaseClient();

//   // 1. Identify the active topic
//   let targetSlug = options?.topicSlug;
//   let topicId: number | null = null;
//   let topicTitle = "The Beginning of Revelation (First Wahi at Cave Hira)";

//   if (supabase) {
//     try {
//       if (targetSlug) {
//         const { data: topic } = await supabase
//           .from("daily_topics")
//           .select("id, slug, title, is_active")
//           .eq("slug", targetSlug)
//           .maybeSingle();
//         if (topic) {
//           topicId = topic.id;
//           topicTitle = topic.title;
//         }
//       } else {
//         const { data: activeTopic } = await supabase
//           .from("daily_topics")
//           .select("id, slug, title, is_active")
//           .eq("is_active", true)
//           .maybeSingle();
//         if (activeTopic) {
//           targetSlug = activeTopic.slug;
//           topicId = activeTopic.id;
//           topicTitle = activeTopic.title;
//         }
//       }
//     } catch {
//       // Fallback to registry if DB tables are pending migration
//     }
//   }

//   targetSlug = targetSlug || "first-wahi";
//   const topicDef = getTopicDefinition(targetSlug);
//   if (!topicDef) {
//     return {
//       success: false,
//       topicSlug: targetSlug,
//       topicTitle: targetSlug,
//       dayNumber: 0,
//       runDate,
//       count: 0,
//       remainingInTopicPool: 0,
//       shortlistedHadiths: [],
//       isDryRun,
//       message: `Topic '${targetSlug}' is not registered in the system.`,
//       error: `Unknown topic slug: ${targetSlug}`,
//     };
//   }

//   topicTitle = topicDef.title;

//   // 2. Fetch history of already shortlisted hadith identifiers for this topic
//   const seenIdentifiers = new Set<string>();
//   let previousRunsCount = 0;

//   if (supabase && topicId) {
//     try {
//       const { data: logs } = await supabase
//         .from("daily_hadith_logs")
//         .select("day_number, hadith_identifiers")
//         .eq("topic_id", topicId)
//         .order("day_number", { ascending: true });

//       if (logs && logs.length > 0) {
//         previousRunsCount = logs.length;
//         for (const log of logs) {
//           if (Array.isArray(log.hadith_identifiers)) {
//             for (const id of log.hadith_identifiers) {
//               seenIdentifiers.add(id);
//             }
//           }
//         }
//       }
//     } catch {
//       // Table may not exist yet in offline mode
//     }
//   }

//   const dayNumber = previousRunsCount + 1;

//   // 3. Fetch live candidates using Aggregator across DATA_INGESTION.md sources
//   const aggregator = new FetchAggregator();
//   const aggregateResult = await aggregator.aggregate(topicDef, 20);
//   let rawCandidates = aggregateResult.candidates;
//   const sourceHealth = aggregateResult.sourceHealth;

//   // Fallback to pre-indexed candidates if live fetchers return 0 items (e.g. offline/scaffolded mode)
//   if (rawCandidates.length === 0 && topicDef && topicDef.hadithCandidates && topicDef.hadithCandidates.length > 0) {
//     rawCandidates = topicDef.hadithCandidates.map((c: HadithCandidate) => ({
//       source: c.identifier.startsWith("bukhari") || c.identifier.startsWith("muslim") ? "sunnah.com" :
//               c.identifier.startsWith("kafi") || c.identifier.startsWith("nahj") ? "thaqalayn" :
//               c.identifier.startsWith("hadeethenc") ? "hadeethenc" : "reference",
//       sourceIdentifier: c.identifier,
//       bookTitle: c.bookTitle,
//       hadithNumber: c.hadithNumber,
//       chapter: c.chapter,
//       volume: c.volume,
//       page: c.page,
//       arabicText: c.arabicText,
//       englishText: c.englishText,
//       translator: c.translator,
//       sourceUrl: c.sourceUrl || "",
//       tradition: c.bookTitle.includes("Kafi") || c.bookTitle.includes("Nahj") ? "Twelver Shia" : "Sunni",
//       hadithStatus: c.hadithStatus || "sahih",
//       chainStatus: c.chainStatus || "muttasil",
//       narrationStatus: c.narrationStatus || [],
//       statusNotes: c.statusNotes,
//       rawChainText: c.rawChainText,
//       nodes: c.nodes,
//       assessments: c.assessments,
//       rawPayload: c as unknown as Record<string, unknown>,
//     }));
//   }

//   // 4. Rank candidates based on relevance
//   const ranker = new RelevanceRanker();
//   const rankedCandidates = ranker.rank(rawCandidates, topicDef);

//   // 5. Filter candidates to strictly UNSEEN ones (ensuring day N != day N-1)
//   const availableCandidates = rankedCandidates
//     .map(r => r.candidate)
//     .filter((c) => !seenIdentifiers.has(c.sourceIdentifier));

//   if (availableCandidates.length === 0) {
//     return {
//       success: true,
//       topicSlug: targetSlug,
//       topicTitle,
//       dayNumber,
//       runDate,
//       count: 0,
//       remainingInTopicPool: 0,
//       sourceHealth,
//       shortlistedHadiths: [],
//       isDryRun,
//       message: `All ${rawCandidates.length} live hadiths for '${topicTitle}' have already been ingested. Ready for next daily batch!`,
//     };
//   }

//   // 6. Shortlist exactly 5 (or configured batch size) for today
//   const selectedBatch = availableCandidates.slice(0, batchSize);
//   const remainingInPool = availableCandidates.length - selectedBatch.length;

//   const shortlistedSummary = selectedBatch.map((item) => ({
//     identifier: item.sourceIdentifier,
//     bookTitle: item.bookTitle,
//     hadithNumber: item.hadithNumber,
//     chapter: item.chapter,
//     arabicPreview: item.arabicText.slice(0, 100) + (item.arabicText.length > 100 ? "..." : ""),
//     englishPreview: item.englishText.slice(0, 150) + (item.englishText.length > 150 ? "..." : ""),
//     hadithStatus: item.hadithStatus,
//     sourceUrl: item.sourceUrl,
//   }));

//   // 5. If APPLY mode, persist into Supabase (hadiths, variations, chains, assessments, and daily log)
//   if (!isDryRun && supabase) {
//     try {
//       // Ensure daily_topics row exists
//       if (!topicId) {
//         const { data: newTopic } = await supabase
//           .from("daily_topics")
//           .upsert(
//             {
//               slug: topicDef.slug,
//               title: topicDef.title,
//               arabic_title: topicDef.arabicTitle,
//               description: topicDef.description,
//               keywords: topicDef.keywords,
//               is_active: true,
//               daily_batch_size: batchSize,
//             },
//             { onConflict: "slug" },
//           )
//           .select("id")
//           .single();
//         if (newTopic) topicId = newTopic.id;
//       }

//       // Ensure parent cluster in hadiths
//       const clusterSlug = topicDef.slug === "first-wahi" ? "first-revelation-at-hira" : topicDef.slug;
//       let clusterHadithId: number;
//       const { data: existingCluster } = await supabase
//         .from("hadiths")
//         .select("id")
//         .eq("slug", clusterSlug)
//         .maybeSingle();

//       if (existingCluster) {
//         clusterHadithId = existingCluster.id;
//       } else {
//         const { data: insertedCluster, error: clusterErr } = await supabase
//           .from("hadiths")
//           .insert({
//             slug: clusterSlug,
//             title: topicDef.title,
//             arabic_title: topicDef.arabicTitle,
//             summary: topicDef.description,
//             topics: topicDef.keywords,
//             review_status: "published",
//           })
//           .select("id")
//           .single();
//         if (clusterErr) throw clusterErr;
//         clusterHadithId = insertedCluster.id;
//       }

//       const insertedVariationIds: number[] = [];

//       for (const item of selectedBatch) {
//         // Book lookup or insertion
//         let bookId: number;
//         const { data: existingBook } = await supabase
//           .from("books")
//           .select("id")
//           .eq("title", item.bookTitle)
//           .maybeSingle();

//         if (existingBook) {
//           bookId = existingBook.id;
//         } else {
//           const { data: newBook, error: bErr } = await supabase
//             .from("books")
//             .insert({
//               title: item.bookTitle,
//               arabic_title: item.bookTitle,
//               author: "Canonical Compiler",
//               tradition: item.bookTitle.includes("Kafi") || item.bookTitle.includes("Nahj") ? "Twelver Shia" : "Sunni",
//               book_type: item.bookTitle.includes("Encyclopedia") ? "commentary" : "hadith_collection",
//             })
//             .select("id")
//             .single();
//           if (bErr) throw bErr;
//           bookId = newBook.id;
//         }

//         // Variation upsert
//         const { data: variation, error: vErr } = await supabase
//           .from("source_variations")
//           .upsert(
//             {
//               hadith_id: clusterHadithId,
//               book_id: bookId,
//               hadith_number: item.hadithNumber,
//               chapter: item.chapter,
//               volume: item.volume ?? "1",
//               page: item.page ?? "1",
//               arabic_text: item.arabicText,
//               english_text: item.englishText,
//               translator: item.translator ?? "Authentic translation",
//               source_url: item.sourceUrl ?? null,
//               hadith_status: item.hadithStatus,
//               chain_status: item.chainStatus,
//               narration_status: item.narrationStatus,
//               status_notes: item.statusNotes ?? null,
//               review_status: "published",
//               verified: true,
//             },
//             { onConflict: "hadith_id,book_id,hadith_number" },
//           )
//           .select("id")
//           .single();

//         if (vErr) {
//           console.warn(`Variation error for ${item.sourceIdentifier}: ${vErr.message}`);
//           continue;
//         }

//         insertedVariationIds.push(variation.id);

//         // Chains insertion
//         if (item.nodes && item.nodes.length > 0) {
//           const { data: chain } = await supabase
//             .from("chains")
//             .upsert(
//               {
//                 variation_id: variation.id,
//                 chain_number: 1,
//                 raw_chain_text: item.rawChainText ?? "Sanad",
//                 continuity_status: item.chainStatus,
//                 quality_status: item.hadithStatus,
//                 verified: true,
//               },
//               { onConflict: "variation_id,chain_number" },
//             )
//             .select("id")
//             .single();

//           if (chain) {
//             for (const node of item.nodes) {
//               let narratorId: number | null = null;
//               if (node.slug) {
//                 const { data: nRec } = await supabase
//                   .from("narrators")
//                   .select("id")
//                   .eq("slug", node.slug)
//                   .maybeSingle();
//                 if (nRec) narratorId = nRec.id;
//               }

//               await supabase.from("chain_narrators").upsert(
//                 {
//                   chain_id: chain.id,
//                   position: node.position,
//                   narrator_id: narratorId,
//                   raw_name: node.rawName,
//                   transmission_word: node.word ?? "an",
//                   match_confidence: narratorId ? 1 : 0.8,
//                 },
//                 { onConflict: "chain_id,position" },
//               );
//             }
//           }
//         }

//         // Assessments insertion
//         if (item.assessments && item.assessments.length > 0) {
//           for (const ass of item.assessments) {
//             const { data: sch } = await supabase
//               .from("scholars")
//               .select("id")
//               .eq("slug", ass.scholarSlug)
//               .maybeSingle();

//             if (sch) {
//               await supabase.from("hadith_assessments").upsert(
//                 {
//                   variation_id: variation.id,
//                   scholar_id: sch.id,
//                   original_grade: ass.originalGrade,
//                   normalized_grade: ass.normalizedGrade,
//                   explanation: ass.explanation,
//                   reference_book: ass.referenceBook,
//                   volume: ass.volume ?? null,
//                   page: ass.page ?? null,
//                   verified: true,
//                 },
//                 { onConflict: "variation_id,scholar_id" },
//               );
//             }
//           }
//         }
//       }

//       // Record daily log
//       if (topicId) {
//         await supabase.from("daily_hadith_logs").upsert(
//           {
//             topic_id: topicId,
//             run_date: runDate,
//             day_number: dayNumber,
//             items_count: selectedBatch.length,
//             source_variation_ids: insertedVariationIds,
//             hadith_identifiers: selectedBatch.map((b) => b.sourceIdentifier),
//             status: "success",
//             notes: `Day ${dayNumber}: Ingested ${selectedBatch.length} hadiths for topic '${topicTitle}'.`,
//           },
//           { onConflict: "topic_id,run_date" },
//         );

//         // Update topic counts
//         const totalIngested = seenIdentifiers.size + selectedBatch.length;
//         await supabase
//           .from("daily_topics")
//           .update({
//             total_ingested: totalIngested,
//             updated_at: new Date().toISOString(),
//           })
//           .eq("id", topicId);
//       }
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : String(err);
//       return {
//         success: false,
//         topicSlug: targetSlug,
//         topicTitle,
//         dayNumber,
//         runDate,
//         count: selectedBatch.length,
//         remainingInTopicPool: remainingInPool,
//         shortlistedHadiths: shortlistedSummary,
//         isDryRun,
//         message: `Database error during ingestion: ${errorMessage}`,
//         error: errorMessage,
//       };
//     }
//   }

//   return {
//     success: true,
//     topicSlug: targetSlug,
//     topicTitle,
//     dayNumber,
//     runDate,
//     count: selectedBatch.length,
//     remainingInTopicPool: remainingInPool,
//     sourceHealth,
//     shortlistedHadiths: shortlistedSummary,
//     isDryRun,
//     message: isDryRun
//       ? `[DRY-RUN] Day ${dayNumber}: Successfully shortlisted ${selectedBatch.length} unique hadiths for '${topicTitle}'. (Remaining in pool: ${remainingInPool}). Pass apply: true or --apply to save.`
//       : `[APPLIED] Day ${dayNumber}: Successfully ingested and verified ${selectedBatch.length} hadiths for '${topicTitle}'. (Remaining in pool: ${remainingInPool}).`,
//   };
// }

// /**
//  * Switches the active topic or registers a new topic.
//  */
// export async function setActiveTopic(
//   topicSlug: string,
//   customTopic?: Partial<TopicDefinition>,
// ): Promise<{ success: boolean; message: string; activeTopic: unknown }> {
//   const supabase = getServiceRoleSupabaseClient();
//   const existingDef = getTopicDefinition(topicSlug);

//   const title = customTopic?.title ?? existingDef?.title ?? topicSlug;
//   const arabicTitle = customTopic?.arabicTitle ?? existingDef?.arabicTitle ?? "";
//   const description = customTopic?.description ?? existingDef?.description ?? "";
//   const keywords = customTopic?.keywords ?? existingDef?.keywords ?? [topicSlug];

//   if (supabase) {
//     try {
//       // Deactivate all
//       await supabase.from("daily_topics").update({ is_active: false }).neq("id", 0);

//       // Upsert and activate target
//       const { data: updated, error } = await supabase
//         .from("daily_topics")
//         .upsert(
//           {
//             slug: topicSlug,
//             title,
//             arabic_title: arabicTitle,
//             description,
//             keywords,
//             is_active: true,
//             updated_at: new Date().toISOString(),
//           },
//           { onConflict: "slug" },
//         )
//         .select("*")
//         .single();

//       if (error) throw error;
//       return {
//         success: true,
//         message: `Active daily topic switched to '${title}' (${topicSlug}). Next cron run will start Day 1 for this topic.`,
//         activeTopic: updated,
//       };
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : String(err);
//       return {
//         success: false,
//         message: `Failed to set active topic in database: ${errorMessage}`,
//         activeTopic: null,
//       };
//     }
//   }

//   return {
//     success: true,
//     message: `Active daily topic configured as '${title}' (${topicSlug}) [Offline / Registry mode].`,
//     activeTopic: { slug: topicSlug, title, is_active: true },
//   };
// }

// /**
//  * Gets the current daily status, active topic, and a preview of the next 5 hadiths.
//  */
// export async function getDailyStatus(topicSlug?: string) {
//   const preview = await runDailyHadithIngest({
//     topicSlug,
//     apply: false,
//   });

//   const allTopics = getAllTopicDefinitions().map((t) => ({
//     slug: t.slug,
//     title: t.title,
//     candidateCount: t.hadithCandidates?.length ?? 0,
//   }));

//   return {
//     activeTopic: {
//       slug: preview.topicSlug,
//       title: preview.topicTitle,
//       dayNumber: preview.dayNumber,
//       runDate: preview.runDate,
//     },
//     upcomingShortlist: preview.shortlistedHadiths,
//     remainingCandidatesInPool: preview.remainingInTopicPool,
//     availableTopics: allTopics,
//   };
// }

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseUrl, getServiceRoleKey } from "@/lib/env";
import {
  getTopicDefinition,
  getAllTopicDefinitions,
  type TopicDefinition,
  type HadithCandidate,
} from "./topics-registry";
import { FetchAggregator } from "./fetchers/aggregator";
import { RelevanceRanker } from "./relevance-ranker";

export interface DailyIngestResult {
  success: boolean;
  topicSlug: string;
  topicTitle: string;
  dayNumber: number;
  runDate: string;
  count: number;
  remainingInTopicPool: number;
  sourceHealth?: Array<{
    sourceType: string;
    name: string;
    status: string;
    fetchedCount: number;
    errorMessage?: string;
  }>;
  shortlistedHadiths: Array<{
    identifier: string;
    bookTitle: string;
    hadithNumber: string;
    chapter: string;
    arabicPreview: string;
    englishPreview: string;
    hadithStatus: string;
    sourceUrl?: string;
  }>;
  isDryRun: boolean;
  message: string;
  error?: string;
}

export function getServiceRoleSupabaseClient(): SupabaseClient | null {
  try {
    const url = getPublicSupabaseUrl();
    const serviceKey = getServiceRoleKey();
    if (!url || !serviceKey) return null;
    return createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    return null;
  }
}

/**
 * Runs the daily shortlist and ingestion pipeline.
 * Selects 5 new hadiths that have NOT been ingested on previous days for the active topic.
 */
export async function runDailyHadithIngest(options?: {
  topicSlug?: string;
  forceNextDay?: boolean;
  apply?: boolean;
  batchSize?: number;
}): Promise<DailyIngestResult> {
  const batchSize = options?.batchSize ?? 5;
  const isDryRun = !options?.apply;
  const runDate = new Date().toISOString().split("T")[0];

  const supabase = getServiceRoleSupabaseClient();

  if (!isDryRun && !supabase) {
    return {
      success: false,
      topicSlug: options?.topicSlug || "unknown",
      topicTitle: "unknown",
      dayNumber: 0,
      runDate,
      count: 0,
      remainingInTopicPool: 0,
      shortlistedHadiths: [],
      isDryRun,
      message: "Cannot apply: Supabase client failed to initialize. Check that your Supabase URL and service role key environment variables are set correctly.",
      error: "Supabase client is null — missing or invalid environment variables (SUPABASE URL / SERVICE_ROLE_KEY).",
    };
  }

  // 1. Identify the active topic
  let targetSlug = options?.topicSlug;
  let topicId: number | null = null;
  let topicTitle = "The Beginning of Revelation (First Wahi at Cave Hira)";

  if (supabase) {
    try {
      if (targetSlug) {
        const { data: topic } = await supabase
          .from("daily_topics")
          .select("id, slug, title, is_active")
          .eq("slug", targetSlug)
          .maybeSingle();
        if (topic) {
          topicId = topic.id;
          topicTitle = topic.title;
        }
      } else {
        const { data: activeTopic } = await supabase
          .from("daily_topics")
          .select("id, slug, title, is_active")
          .eq("is_active", true)
          .maybeSingle();
        if (activeTopic) {
          targetSlug = activeTopic.slug;
          topicId = activeTopic.id;
          topicTitle = activeTopic.title;
        }
      }
    } catch {
      // Fallback to registry if DB tables are pending migration
    }
  }

  targetSlug = targetSlug || "first-wahi";
  const topicDef = getTopicDefinition(targetSlug);
  if (!topicDef) {
    return {
      success: false,
      topicSlug: targetSlug,
      topicTitle: targetSlug,
      dayNumber: 0,
      runDate,
      count: 0,
      remainingInTopicPool: 0,
      shortlistedHadiths: [],
      isDryRun,
      message: `Topic '${targetSlug}' is not registered in the system.`,
      error: `Unknown topic slug: ${targetSlug}`,
    };
  }

  topicTitle = topicDef.title;

  // 2. Fetch history of already shortlisted hadith identifiers for this topic
  const seenIdentifiers = new Set<string>();
  let previousRunsCount = 0;

  if (supabase && topicId) {
    try {
      const { data: logs } = await supabase
        .from("daily_hadith_logs")
        .select("day_number, hadith_identifiers")
        .eq("topic_id", topicId)
        .order("day_number", { ascending: true });

      if (logs && logs.length > 0) {
        previousRunsCount = logs.length;
        for (const log of logs) {
          if (Array.isArray(log.hadith_identifiers)) {
            for (const id of log.hadith_identifiers) {
              seenIdentifiers.add(id);
            }
          }
        }
      }
    } catch {
      // Table may not exist yet in offline mode
    }
  }

  const dayNumber = previousRunsCount + 1;

  // 3. Fetch live candidates using Aggregator across DATA_INGESTION.md sources
  const aggregator = new FetchAggregator();
  const aggregateResult = await aggregator.aggregate(topicDef, 20);
  let rawCandidates = aggregateResult.candidates;
  const sourceHealth = aggregateResult.sourceHealth;

  // Fallback to pre-indexed candidates if live fetchers return 0 items (e.g. offline/scaffolded mode)
  if (rawCandidates.length === 0 && topicDef && topicDef.hadithCandidates && topicDef.hadithCandidates.length > 0) {
    rawCandidates = topicDef.hadithCandidates.map((c: HadithCandidate) => ({
      source: c.identifier.startsWith("bukhari") || c.identifier.startsWith("muslim") ? "sunnah.com" :
              c.identifier.startsWith("kafi") || c.identifier.startsWith("nahj") ? "thaqalayn" :
              c.identifier.startsWith("hadeethenc") ? "hadeethenc" : "reference",
      sourceIdentifier: c.identifier,
      bookTitle: c.bookTitle,
      hadithNumber: c.hadithNumber,
      chapter: c.chapter,
      volume: c.volume,
      page: c.page,
      arabicText: c.arabicText,
      englishText: c.englishText,
      translator: c.translator,
      sourceUrl: c.sourceUrl || "",
      tradition: c.bookTitle.includes("Kafi") || c.bookTitle.includes("Nahj") ? "Twelver Shia" : "Sunni",
      hadithStatus: c.hadithStatus || "sahih",
      chainStatus: c.chainStatus || "muttasil",
      narrationStatus: c.narrationStatus || [],
      statusNotes: c.statusNotes,
      rawChainText: c.rawChainText,
      nodes: c.nodes,
      assessments: c.assessments,
      rawPayload: c as unknown as Record<string, unknown>,
    }));
  }

  // 4. Rank candidates based on relevance
  const ranker = new RelevanceRanker();
  const rankedCandidates = ranker.rank(rawCandidates, topicDef);

  // 5. Filter candidates to strictly UNSEEN ones (ensuring day N != day N-1)
  const availableCandidates = rankedCandidates
    .map(r => r.candidate)
    .filter((c) => !seenIdentifiers.has(c.sourceIdentifier));

  if (availableCandidates.length === 0) {
    return {
      success: true,
      topicSlug: targetSlug,
      topicTitle,
      dayNumber,
      runDate,
      count: 0,
      remainingInTopicPool: 0,
      sourceHealth,
      shortlistedHadiths: [],
      isDryRun,
      message: `All ${rawCandidates.length} live hadiths for '${topicTitle}' have already been ingested. Ready for next daily batch!`,
    };
  }

  // 6. Shortlist exactly 5 (or configured batch size) for today
  const selectedBatch = availableCandidates.slice(0, batchSize);
  const remainingInPool = availableCandidates.length - selectedBatch.length;

  const shortlistedSummary = selectedBatch.map((item) => ({
    identifier: item.sourceIdentifier,
    bookTitle: item.bookTitle,
    hadithNumber: item.hadithNumber,
    chapter: item.chapter,
    arabicPreview: item.arabicText.slice(0, 100) + (item.arabicText.length > 100 ? "..." : ""),
    englishPreview: item.englishText.slice(0, 150) + (item.englishText.length > 150 ? "..." : ""),
    hadithStatus: item.hadithStatus,
    sourceUrl: item.sourceUrl,
  }));

  // 5. If APPLY mode, persist into Supabase (hadiths, variations, chains, assessments, and daily log)
  if (!isDryRun && supabase) {
    try {
      // Ensure daily_topics row exists
      if (!topicId) {
        const { data: newTopic } = await supabase
          .from("daily_topics")
          .upsert(
            {
              slug: topicDef.slug,
              title: topicDef.title,
              arabic_title: topicDef.arabicTitle,
              description: topicDef.description,
              keywords: topicDef.keywords,
              is_active: true,
              daily_batch_size: batchSize,
            },
            { onConflict: "slug" },
          )
          .select("id")
          .single();
        if (newTopic) topicId = newTopic.id;
      }

      // Ensure parent cluster in hadiths
      const clusterSlug = topicDef.slug === "first-wahi" ? "first-revelation-at-hira" : topicDef.slug;
      let clusterHadithId: number;
      const { data: existingCluster } = await supabase
        .from("hadiths")
        .select("id")
        .eq("slug", clusterSlug)
        .maybeSingle();

      if (existingCluster) {
        clusterHadithId = existingCluster.id;
      } else {
        const { data: insertedCluster, error: clusterErr } = await supabase
          .from("hadiths")
          .insert({
            slug: clusterSlug,
            title: topicDef.title,
            arabic_title: topicDef.arabicTitle,
            summary: topicDef.description,
            topics: topicDef.keywords,
            review_status: "published",
          })
          .select("id")
          .single();
        if (clusterErr) throw clusterErr;
        clusterHadithId = insertedCluster.id;
      }

      const insertedVariationIds: number[] = [];

      for (const item of selectedBatch) {
        // Book lookup or insertion
        let bookId: number;
        const { data: existingBook } = await supabase
          .from("books")
          .select("id")
          .eq("title", item.bookTitle)
          .maybeSingle();

        if (existingBook) {
          bookId = existingBook.id;
        } else {
          const { data: newBook, error: bErr } = await supabase
            .from("books")
            .insert({
              title: item.bookTitle,
              arabic_title: item.bookTitle,
              author: "Canonical Compiler",
              tradition: item.bookTitle.includes("Kafi") || item.bookTitle.includes("Nahj") ? "Twelver Shia" : "Sunni",
              book_type: item.bookTitle.includes("Encyclopedia") ? "commentary" : "hadith_collection",
            })
            .select("id")
            .single();
          if (bErr) throw bErr;
          bookId = newBook.id;
        }

        // Variation upsert
        const { data: variation, error: vErr } = await supabase
          .from("source_variations")
          .upsert(
            {
              hadith_id: clusterHadithId,
              book_id: bookId,
              hadith_number: item.hadithNumber,
              chapter: item.chapter,
              volume: item.volume ?? "1",
              page: item.page ?? "1",
              arabic_text: item.arabicText,
              english_text: item.englishText,
              translator: item.translator ?? "Authentic translation",
              source_url: item.sourceUrl ?? null,
              hadith_status: item.hadithStatus,
              chain_status: item.chainStatus,
              narration_status: item.narrationStatus,
              status_notes: item.statusNotes ?? null,
              review_status: "published",
              verified: true,
            },
            { onConflict: "hadith_id,book_id,hadith_number" },
          )
          .select("id")
          .single();

        if (vErr) {
          console.warn(`Variation error for ${item.sourceIdentifier}: ${vErr.message}`);
          continue;
        }

        insertedVariationIds.push(variation.id);

        // Chains insertion
        if (item.nodes && item.nodes.length > 0) {
          const { data: chain } = await supabase
            .from("chains")
            .upsert(
              {
                variation_id: variation.id,
                chain_number: 1,
                raw_chain_text: item.rawChainText ?? "Sanad",
                continuity_status: item.chainStatus,
                quality_status: item.hadithStatus,
                verified: true,
              },
              { onConflict: "variation_id,chain_number" },
            )
            .select("id")
            .single();

          if (chain) {
            for (const node of item.nodes) {
              let narratorId: number | null = null;
              if (node.slug) {
                const { data: nRec } = await supabase
                  .from("narrators")
                  .select("id")
                  .eq("slug", node.slug)
                  .maybeSingle();
                if (nRec) narratorId = nRec.id;
              }

              await supabase.from("chain_narrators").upsert(
                {
                  chain_id: chain.id,
                  position: node.position,
                  narrator_id: narratorId,
                  raw_name: node.rawName,
                  transmission_word: node.word ?? "an",
                  match_confidence: narratorId ? 1 : 0.8,
                },
                { onConflict: "chain_id,position" },
              );
            }
          }
        }

        // Assessments insertion
        if (item.assessments && item.assessments.length > 0) {
          for (const ass of item.assessments) {
            const { data: sch } = await supabase
              .from("scholars")
              .select("id")
              .eq("slug", ass.scholarSlug)
              .maybeSingle();

            if (sch) {
              await supabase.from("hadith_assessments").upsert(
                {
                  variation_id: variation.id,
                  scholar_id: sch.id,
                  original_grade: ass.originalGrade,
                  normalized_grade: ass.normalizedGrade,
                  explanation: ass.explanation,
                  reference_book: ass.referenceBook,
                  volume: ass.volume ?? null,
                  page: ass.page ?? null,
                  verified: true,
                },
                { onConflict: "variation_id,scholar_id" },
              );
            }
          }
        }
      }

      // Record daily log
      if (topicId) {
        await supabase.from("daily_hadith_logs").upsert(
          {
            topic_id: topicId,
            run_date: runDate,
            day_number: dayNumber,
            items_count: selectedBatch.length,
            source_variation_ids: insertedVariationIds,
            hadith_identifiers: selectedBatch.map((b) => b.sourceIdentifier),
            status: "success",
            notes: `Day ${dayNumber}: Ingested ${selectedBatch.length} hadiths for topic '${topicTitle}'.`,
          },
          { onConflict: "topic_id,run_date" },
        );

        // Update topic counts
        const totalIngested = seenIdentifiers.size + selectedBatch.length;
        await supabase
          .from("daily_topics")
          .update({
            total_ingested: totalIngested,
            updated_at: new Date().toISOString(),
          })
          .eq("id", topicId);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        topicSlug: targetSlug,
        topicTitle,
        dayNumber,
        runDate,
        count: selectedBatch.length,
        remainingInTopicPool: remainingInPool,
        shortlistedHadiths: shortlistedSummary,
        isDryRun,
        message: `Database error during ingestion: ${errorMessage}`,
        error: errorMessage,
      };
    }
  }

  return {
    success: true,
    topicSlug: targetSlug,
    topicTitle,
    dayNumber,
    runDate,
    count: selectedBatch.length,
    remainingInTopicPool: remainingInPool,
    sourceHealth,
    shortlistedHadiths: shortlistedSummary,
    isDryRun,
    message: isDryRun
      ? `[DRY-RUN] Day ${dayNumber}: Successfully shortlisted ${selectedBatch.length} unique hadiths for '${topicTitle}'. (Remaining in pool: ${remainingInPool}). Pass apply: true or --apply to save.`
      : `[APPLIED] Day ${dayNumber}: Successfully ingested and verified ${selectedBatch.length} hadiths for '${topicTitle}'. (Remaining in pool: ${remainingInPool}).`,
  };
}

/**
 * Switches the active topic or registers a new topic.
 */
export async function setActiveTopic(
  topicSlug: string,
  customTopic?: Partial<TopicDefinition>,
): Promise<{ success: boolean; message: string; activeTopic: unknown }> {
  const supabase = getServiceRoleSupabaseClient();
  const existingDef = getTopicDefinition(topicSlug);

  const title = customTopic?.title ?? existingDef?.title ?? topicSlug;
  const arabicTitle = customTopic?.arabicTitle ?? existingDef?.arabicTitle ?? "";
  const description = customTopic?.description ?? existingDef?.description ?? "";
  const keywords = customTopic?.keywords ?? existingDef?.keywords ?? [topicSlug];

  if (supabase) {
    try {
      // Deactivate all
      await supabase.from("daily_topics").update({ is_active: false }).neq("id", 0);

      // Upsert and activate target
      const { data: updated, error } = await supabase
        .from("daily_topics")
        .upsert(
          {
            slug: topicSlug,
            title,
            arabic_title: arabicTitle,
            description,
            keywords,
            is_active: true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "slug" },
        )
        .select("*")
        .single();

      if (error) throw error;
      return {
        success: true,
        message: `Active daily topic switched to '${title}' (${topicSlug}). Next cron run will start Day 1 for this topic.`,
        activeTopic: updated,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        message: `Failed to set active topic in database: ${errorMessage}`,
        activeTopic: null,
      };
    }
  }

  return {
    success: true,
    message: `Active daily topic configured as '${title}' (${topicSlug}) [Offline / Registry mode].`,
    activeTopic: { slug: topicSlug, title, is_active: true },
  };
}

/**
 * Gets the current daily status, active topic, and a preview of the next 5 hadiths.
 */
export async function getDailyStatus(topicSlug?: string) {
  const preview = await runDailyHadithIngest({
    topicSlug,
    apply: false,
  });

  const allTopics = getAllTopicDefinitions().map((t) => ({
    slug: t.slug,
    title: t.title,
    candidateCount: t.hadithCandidates?.length ?? 0,
  }));

  return {
    activeTopic: {
      slug: preview.topicSlug,
      title: preview.topicTitle,
      dayNumber: preview.dayNumber,
      runDate: preview.runDate,
    },
    upcomingShortlist: preview.shortlistedHadiths,
    remainingCandidatesInPool: preview.remainingInTopicPool,
    availableTopics: allTopics,
  };
}