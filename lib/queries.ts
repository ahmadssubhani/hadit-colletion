import { createServerSupabaseClient } from "@/lib/supabase/server";
import { looksLikeArabic, normalizeArabic } from "@/lib/normalization";
import { one } from "@/lib/format";
import {
  PAGE_SIZE,
  type Book,
  type Hadith,
  type HadithAssessment,
  type Narrator,
  type NarratorAssessment,
  type Scholar,
  type SearchFilters,
  type SearchResult,
  type SourceVariation,
  type SourceVariationDetail,
} from "@/lib/types";
import {
  FALLBACK_BOOKS,
  FALLBACK_HADITHS,
  FALLBACK_NARRATOR_ASSESSMENTS,
  FALLBACK_NARRATORS,
  FALLBACK_SCHOLARS,
  FALLBACK_VARIATIONS,
  searchFallback,
} from "@/lib/content/fallback-corpus";

export async function getCorpusStats() {
  const supabase = createServerSupabaseClient();
  const [hadiths, variations, chains, narrators] = await Promise.all([
    supabase.from("hadiths").select("id", { count: "exact", head: true }),
    supabase.from("source_variations").select("id", { count: "exact", head: true }),
    supabase.from("chains").select("id", { count: "exact", head: true }),
    supabase.from("narrators").select("id", { count: "exact", head: true }),
  ]);

  const stats = {
    hadiths: hadiths.count ?? 0,
    variations: variations.count ?? 0,
    chains: chains.count ?? 0,
    narrators: narrators.count ?? 0,
    error: hadiths.error ?? variations.error ?? chains.error ?? narrators.error,
  };

  if (stats.hadiths === 0 && stats.variations === 0) {
    return {
      hadiths: FALLBACK_HADITHS.length,
      variations: Object.values(FALLBACK_VARIATIONS).reduce((sum, rows) => sum + rows.length, 0),
      chains: Object.values(FALLBACK_VARIATIONS).reduce(
        (sum, rows) => sum + rows.reduce((inner, row) => inner + row.chains.length, 0),
        0,
      ),
      narrators: FALLBACK_NARRATORS.length,
      error: null,
    };
  }

  return stats;
}

export async function getFeaturedHadiths(limit = 6) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("hadiths")
    .select("id, slug, title, arabic_title, summary, topics, review_status, source_variations(id)")
    .order("updated_at", { ascending: false })
    .limit(limit);

  const hadiths = (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    arabic_title: row.arabic_title,
    summary: row.summary,
    topics: row.topics ?? [],
    review_status: row.review_status,
    variation_count: Array.isArray(row.source_variations) ? row.source_variations.length : 0,
  }));

  if (error) {
    return { hadiths: FALLBACK_HADITHS.slice(0, limit), error: error.message };
  }

  if (!hadiths.length) {
    return { hadiths: FALLBACK_HADITHS.slice(0, limit), error: null };
  }

  return { hadiths, error: null };
}

export async function getBooks(): Promise<Book[]> {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from("books").select("*").order("title");
  if (!data?.length) return FALLBACK_BOOKS;
  return data as Book[];
}

export async function getScholars(): Promise<Scholar[]> {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from("scholars").select("*").order("name");
  if (!data?.length) return FALLBACK_SCHOLARS;
  return data as Scholar[];
}

export async function searchHadiths(filters: SearchFilters): Promise<SearchResult & { error: string | null }> {
  const supabase = createServerSupabaseClient();
  const { count: publishedCount } = await supabase.from("hadiths").select("id", { count: "exact", head: true });
  if (!publishedCount) {
    return searchFallback(filters);
  }

  const page = Math.max(1, filters.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const queryText = filters.q?.trim() ?? "";

  let variationIds: number[] | null = null;

  if (queryText) {
    const arabicQuery = looksLikeArabic(queryText) ? normalizeArabic(queryText) : queryText;
    const { data: textMatches, error: textError } = await supabase
      .from("source_variations")
      .select("id, hadith_id")
      .or(
        [
          `english_text.ilike.%${escapeIlike(queryText)}%`,
          `arabic_text.ilike.%${escapeIlike(queryText)}%`,
          `arabic_text.ilike.%${escapeIlike(arabicQuery)}%`,
          `hadith_number.ilike.%${escapeIlike(queryText)}%`,
        ].join(","),
      )
      .limit(500);

    if (textError) {
      return emptyResult(page, textError.message);
    }

    const { data: bookMatches } = await supabase
      .from("books")
      .select("id, title")
      .or(`title.ilike.%${escapeIlike(queryText)}%,author.ilike.%${escapeIlike(queryText)}%`);

    let bookVariationIds: number[] = [];
    if (bookMatches?.length) {
      const { data: byBook } = await supabase
        .from("source_variations")
        .select("id")
        .in(
          "book_id",
          bookMatches.map((book) => book.id),
        );
      bookVariationIds = (byBook ?? []).map((row) => row.id);
    }

    const { data: narratorMatches } = await supabase
      .from("narrators")
      .select("id")
      .or(
        `name.ilike.%${escapeIlike(queryText)}%,arabic_name.ilike.%${escapeIlike(queryText)}%,slug.ilike.%${escapeIlike(queryText)}%`,
      )
      .limit(50);

    let narratorVariationIds: number[] = [];
    if (narratorMatches?.length) {
      const { data: chainNodes } = await supabase
        .from("chain_narrators")
        .select("chain_id")
        .in(
          "narrator_id",
          narratorMatches.map((row) => row.id),
        );
      const chainIds = [...new Set((chainNodes ?? []).map((row) => row.chain_id))];
      if (chainIds.length) {
        const { data: chains } = await supabase.from("chains").select("variation_id").in("id", chainIds);
        narratorVariationIds = (chains ?? []).map((row) => row.variation_id);
      }
    }

    const { data: slugMatches } = await supabase
      .from("hadiths")
      .select("id, slug, title")
      .or(`slug.ilike.%${escapeIlike(queryText)}%,title.ilike.%${escapeIlike(queryText)}%`);

    variationIds = [
      ...new Set([
        ...(textMatches ?? []).map((row) => row.id),
        ...bookVariationIds,
        ...narratorVariationIds,
      ]),
    ];

    if (slugMatches?.length && !queryNeedsVariationFilter(filters)) {
      const extra = await supabase
        .from("source_variations")
        .select("id")
        .in(
          "hadith_id",
          slugMatches.map((row) => row.id),
        );
      variationIds = [...new Set([...variationIds, ...(extra.data ?? []).map((row) => row.id)])];
    }
  }

  let variationQuery = supabase.from("source_variations").select("id, hadith_id");

  if (variationIds) {
    if (variationIds.length === 0) return emptyResult(page, null);
    variationQuery = variationQuery.in("id", variationIds);
  }
  if (filters.bookId) variationQuery = variationQuery.eq("book_id", Number(filters.bookId));
  if (filters.hadithStatus) variationQuery = variationQuery.eq("hadith_status", filters.hadithStatus);
  if (filters.chainStatus) variationQuery = variationQuery.eq("chain_status", filters.chainStatus);
  if (filters.narrationStatus) variationQuery = variationQuery.contains("narration_status", [filters.narrationStatus]);

  if (filters.scholarId || filters.assessment) {
    let assessmentQuery = supabase.from("hadith_assessments").select("variation_id");
    if (filters.scholarId) assessmentQuery = assessmentQuery.eq("scholar_id", Number(filters.scholarId));
    if (filters.assessment) {
      assessmentQuery = assessmentQuery.or(
        `original_grade.ilike.%${escapeIlike(filters.assessment)}%,normalized_grade.ilike.%${escapeIlike(filters.assessment)}%`,
      );
    }
    const { data: assessed, error } = await assessmentQuery;
    if (error) return emptyResult(page, error.message);
    const assessedIds = [...new Set((assessed ?? []).map((row) => row.variation_id))];
    if (!assessedIds.length) return emptyResult(page, null);
    variationQuery = variationQuery.in("id", assessedIds);
  }

  const { data: matchedVariations, error: variationError } = await variationQuery;
  if (variationError) return emptyResult(page, variationError.message);

  const hadithIds = [...new Set((matchedVariations ?? []).map((row) => row.hadith_id))];
  if (!hadithIds.length && queryText) {
    const { data: titleOnly, error } = await supabase
      .from("hadiths")
      .select("id, slug, title, arabic_title, summary, topics, review_status, source_variations(id)")
      .or(`slug.ilike.%${escapeIlike(queryText)}%,title.ilike.%${escapeIlike(queryText)}%,summary.ilike.%${escapeIlike(queryText)}%`)
      .range(from, to);

    if (error) return emptyResult(page, error.message);
    const hadiths = (titleOnly ?? []).map(mapHadithRow);
    return { hadiths, total: hadiths.length, page, pageSize: PAGE_SIZE, error: null };
  }

  if (!hadithIds.length && !queryText && !queryNeedsVariationFilter(filters)) {
    const { data, count, error } = await supabase
      .from("hadiths")
      .select("id, slug, title, arabic_title, summary, topics, review_status, source_variations(id)", {
        count: "exact",
      })
      .order("updated_at", { ascending: false })
      .range(from, to);

    if (error) return emptyResult(page, error.message);
    return {
      hadiths: (data ?? []).map(mapHadithRow),
      total: count ?? 0,
      page,
      pageSize: PAGE_SIZE,
      error: null,
    };
  }

  if (!hadithIds.length) return emptyResult(page, null);

  const { data, count, error } = await supabase
    .from("hadiths")
    .select("id, slug, title, arabic_title, summary, topics, review_status, source_variations(id)", {
      count: "exact",
    })
    .in("id", hadithIds)
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (error) return emptyResult(page, error.message);

  return {
    hadiths: (data ?? []).map(mapHadithRow),
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    error: null,
  };
}

export async function getHadithBySlug(slug: string) {
  const supabase = createServerSupabaseClient();
  const { data: hadith, error } = await supabase.from("hadiths").select("*").eq("slug", slug).maybeSingle();
  if (error || !hadith) {
    const fallback = FALLBACK_HADITHS.find((row) => row.slug === slug);
    if (fallback) {
      return { hadith: fallback, variations: FALLBACK_VARIATIONS[slug] ?? [], error: null };
    }
    return { hadith: null, variations: [] as SourceVariationDetail[], error };
  }

  const { data: variations, error: variationError } = await supabase
    .from("source_variations")
    .select("*, books(*)")
    .eq("hadith_id", hadith.id)
    .order("id");

  if (variationError) return { hadith: hadith as Hadith, variations: [], error: variationError };

  const variationRows = (variations ?? []) as SourceVariation[];
  const variationIds = variationRows.map((row) => row.id);

  const [{ data: chains }, { data: assessments }] = await Promise.all([
    variationIds.length
      ? supabase
          .from("chains")
          .select("*, chain_narrators(*, narrators(*))")
          .in("variation_id", variationIds)
          .order("chain_number")
      : Promise.resolve({ data: [] }),
    variationIds.length
      ? supabase.from("hadith_assessments").select("*, scholars(*)").in("variation_id", variationIds)
      : Promise.resolve({ data: [] }),
  ]);

  const details: SourceVariationDetail[] = variationRows.map((variation) => ({
    ...variation,
    books: one(variation.books),
    chains: ((chains ?? []) as SourceVariationDetail["chains"])
      .filter((chain) => chain.variation_id === variation.id)
      .map((chain) => ({
        ...chain,
        chain_narrators: [...(chain.chain_narrators ?? [])].sort((a, b) => a.position - b.position),
      })),
    hadith_assessments: ((assessments ?? []) as HadithAssessment[]).filter(
      (assessment) => assessment.variation_id === variation.id,
    ),
  }));

  return { hadith: hadith as Hadith, variations: details, error: null };
}

export async function getNarrators(page = 1) {
  const supabase = createServerSupabaseClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const { data, count, error } = await supabase
    .from("narrators")
    .select("*", { count: "exact" })
    .order("name")
    .range(from, to);

  if (error || !data?.length) {
    const start = (page - 1) * PAGE_SIZE;
    return {
      narrators: FALLBACK_NARRATORS.slice(start, start + PAGE_SIZE),
      total: FALLBACK_NARRATORS.length,
      page,
      pageSize: PAGE_SIZE,
      error: null,
    };
  }

  return {
    narrators: data as Narrator[],
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    error: null,
  };
}

export async function getNarratorBySlug(slug: string) {
  const supabase = createServerSupabaseClient();
  const { data: narrator, error } = await supabase.from("narrators").select("*").eq("slug", slug).maybeSingle();
  if (error || !narrator) {
    const fallback = FALLBACK_NARRATORS.find((row) => row.slug === slug);
    if (fallback) {
      const appearances = Object.entries(FALLBACK_VARIATIONS).flatMap(([hadithSlug, variations]) => {
        const cluster = FALLBACK_HADITHS.find((row) => row.slug === hadithSlug);
        return variations
          .filter((variation) =>
            variation.chains.some((chain) => chain.chain_narrators?.some((node) => node.narrator_id === fallback.id)),
          )
          .map((variation) => ({
            hadith_slug: hadithSlug,
            hadith_title: cluster?.title ?? hadithSlug,
            book_title: variation.books?.title ?? null,
          }));
      });
      return {
        narrator: fallback,
        assessments: FALLBACK_NARRATOR_ASSESSMENTS[slug] ?? [],
        appearances,
        error: null,
      };
    }
    return { narrator: null, assessments: [] as NarratorAssessment[], appearances: [], error };
  }

  const { data: assessments } = await supabase
    .from("narrator_assessments")
    .select("*, scholars(*)")
    .eq("narrator_id", narrator.id);

  const { data: nodes } = await supabase
    .from("chain_narrators")
    .select("chain_id, position, raw_name")
    .eq("narrator_id", narrator.id);

  const chainIds = [...new Set((nodes ?? []).map((row) => row.chain_id))];
  let appearances: Array<{ hadith_slug: string; hadith_title: string; book_title: string | null }> = [];

  if (chainIds.length) {
    const { data: chains } = await supabase.from("chains").select("id, variation_id").in("id", chainIds);
    const variationIds = [...new Set((chains ?? []).map((row) => row.variation_id))];
    if (variationIds.length) {
      const { data: variations } = await supabase
        .from("source_variations")
        .select("id, hadith_id, books(title)")
        .in("id", variationIds);
      const hadithIds = [...new Set((variations ?? []).map((row) => row.hadith_id))];
      const { data: hadithRows } = await supabase.from("hadiths").select("id, slug, title").in("id", hadithIds);
      const hadithById = new Map((hadithRows ?? []).map((row) => [row.id, row]));
      appearances = (variations ?? []).map((row) => {
        const hadith = hadithById.get(row.hadith_id);
        const book = one(row.books as { title: string } | { title: string }[] | null);
        return {
          hadith_slug: hadith?.slug ?? "",
          hadith_title: hadith?.title ?? "Untitled cluster",
          book_title: book?.title ?? null,
        };
      });
    }
  }

  return {
    narrator: narrator as Narrator,
    assessments: (assessments ?? []) as NarratorAssessment[],
    appearances,
    error: null,
  };
}

function mapHadithRow(row: {
  id: number;
  slug: string;
  title: string;
  arabic_title: string | null;
  summary: string | null;
  topics: string[] | null;
  review_status: Hadith["review_status"];
  source_variations?: { id: number }[] | null;
}): Hadith & { variation_count: number } {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    arabic_title: row.arabic_title,
    summary: row.summary,
    topics: row.topics ?? [],
    review_status: row.review_status,
    variation_count: Array.isArray(row.source_variations) ? row.source_variations.length : 0,
  };
}

function emptyResult(page: number, error: string | null): SearchResult & { error: string | null } {
  return { hadiths: [], total: 0, page, pageSize: PAGE_SIZE, error };
}

function queryNeedsVariationFilter(filters: SearchFilters): boolean {
  return Boolean(
    filters.bookId ||
      filters.hadithStatus ||
      filters.chainStatus ||
      filters.narrationStatus ||
      filters.scholarId ||
      filters.assessment,
  );
}

function escapeIlike(value: string): string {
  return value.replace(/[%_,]/g, " ").replace(/\s+/g, " ").trim();
}