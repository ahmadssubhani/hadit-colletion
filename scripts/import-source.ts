import { loadLocalEnv } from "./load-env";
loadLocalEnv();

import { createAdminSupabaseClient } from "../lib/supabase/admin";
import { createServerSupabaseClient } from "../lib/supabase/server";
import { loadTemplates } from "../lib/ingest/load";
import {
  parseBoolean,
  parseOptionalInt,
  parsePostgresArray,
  validateCorpus,
} from "../lib/ingest/validate";

async function main() {
  const dryRun = process.argv.includes("--dry-run") || !process.argv.includes("--apply");
  const corpus = await loadTemplates();
  const readClient = dryRun && !process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createServerSupabaseClient()
    : createAdminSupabaseClient();

  const { data: scholars, error: scholarError } = await readClient.from("scholars").select("id, slug");
  if (scholarError && !dryRun) throw scholarError;
  const standardScholarSlugs = [
    "yahya-ibn-main",
    "ahmad-ibn-hanbal",
    "al-bukhari",
    "abu-hatim-al-razi",
    "al-nasai",
    "al-dhahabi",
    "ibn-hajar",
    "al-kashshi",
    "al-najashi",
    "al-tusi",
    "al-hilli",
    "al-majlisi",
    "al-khoei",
  ];
  const dbScholars = scholars && scholars.length > 0 ? scholars : standardScholarSlugs.map((slug, id) => ({ id: id + 1, slug }));
  const scholarBySlug = new Map(dbScholars.map((row) => [row.slug, row.id]));

  const result = validateCorpus(corpus, new Set(scholarBySlug.keys()));
  console.log("Validation counts:", result.counts);
  if (!result.ok) {
    console.error("Validation failed:");
    for (const issue of result.issues) {
      console.error(`- ${issue.file}:${issue.row}${issue.field ? ` ${issue.field}` : ""} ${issue.message}`);
    }
    process.exit(1);
  }

  if (dryRun) {
    console.log("Dry run complete. Re-run with --apply to write using the service-role key.");
    console.log("Publish only after human review. Template rows default to unverified/draft and stay hidden by RLS.");
    return;
  }

  const admin = createAdminSupabaseClient();

  for (const source of corpus.sources) {
    await admin.from("import_batches").insert({
      provider: source.provider,
      source_url: emptyToNull(source.source_url),
      license: emptyToNull(source.license),
      permission_status: source.permission_status?.trim() || "unknown",
      retrieved_at: emptyToNull(source.retrieved_at) ?? new Date().toISOString(),
      checksum: emptyToNull(source.checksum),
      notes: [source.material, source.access_method, source.translation_rights, source.notes].filter(Boolean).join(" | "),
    });
  }

  const { data: existingHadiths } = await admin.from("hadiths").select("id, slug");
  const hadithBySlug = new Map((existingHadiths ?? []).map((row) => [row.slug, row.id]));

  for (const row of corpus.hadiths) {
    const payload = {
      slug: row.slug,
      title: row.title,
      arabic_title: emptyToNull(row.arabic_title),
      summary: emptyToNull(row.summary),
      topics: parsePostgresArray(row.topics),
      review_status: row.review_status || "draft",
      updated_at: new Date().toISOString(),
    };
    if (hadithBySlug.has(row.slug)) {
      await admin.from("hadiths").update(payload).eq("slug", row.slug);
    } else {
      const { data, error } = await admin.from("hadiths").insert(payload).select("id, slug").single();
      if (error) throw error;
      hadithBySlug.set(data.slug, data.id);
    }
  }

  const { data: existingNarrators } = await admin.from("narrators").select("id, slug");
  const narratorBySlug = new Map((existingNarrators ?? []).map((row) => [row.slug, row.id]));

  for (const row of corpus.narrators) {
    const payload = {
      slug: row.slug,
      name: row.name,
      arabic_name: emptyToNull(row.arabic_name),
      alternative_names: parsePostgresArray(row.alternative_names),
      birth_year_ah: parseOptionalInt(row.birth_year_ah),
      death_year_ah: parseOptionalInt(row.death_year_ah),
      region: emptyToNull(row.region),
      generation: emptyToNull(row.generation),
      biography: emptyToNull(row.biography),
      summary_score: parseOptionalInt(row.summary_score),
      identity_status: row.identity_status || "unverified",
    };
    if (narratorBySlug.has(row.slug)) {
      await admin.from("narrators").update(payload).eq("slug", row.slug);
    } else {
      const { data, error } = await admin.from("narrators").insert(payload).select("id, slug").single();
      if (error) throw error;
      narratorBySlug.set(data.slug, data.id);
    }
  }

  const { data: existingBooks } = await admin.from("books").select("id, title");
  const bookByTitle = new Map((existingBooks ?? []).map((row) => [row.title, row.id]));

  for (const row of corpus.variations) {
    if (!bookByTitle.has(row.book_title)) {
      const { data, error } = await admin
        .from("books")
        .insert({ title: row.book_title, tradition: "unclassified" })
        .select("id, title")
        .single();
      if (error) throw error;
      bookByTitle.set(data.title, data.id);
    }
  }

  const variationKey = (hadithId: number, bookId: number, number: string | null) =>
    `${hadithId}|${bookId}|${number ?? ""}`;
  const { data: existingVariations } = await admin.from("source_variations").select("id, hadith_id, book_id, hadith_number");
  const variationByKey = new Map(
    (existingVariations ?? []).map((row) => [variationKey(row.hadith_id, row.book_id, row.hadith_number), row.id]),
  );

  for (const row of corpus.variations) {
    const hadithId = hadithBySlug.get(row.hadith_slug);
    const bookId = bookByTitle.get(row.book_title);
    if (!hadithId || !bookId) throw new Error("Unresolved hadith or book during variation import.");
    const payload = {
      hadith_id: hadithId,
      book_id: bookId,
      hadith_number: emptyToNull(row.hadith_number),
      chapter: emptyToNull(row.chapter),
      volume: emptyToNull(row.volume),
      page: emptyToNull(row.page),
      arabic_text: emptyToNull(row.arabic_text),
      english_text: emptyToNull(row.english_text),
      translator: emptyToNull(row.translator),
      source_url: emptyToNull(row.source_url),
      hadith_status: row.hadith_status || "not_graded",
      chain_status: row.chain_status || "unverified",
      narration_status: parsePostgresArray(row.narration_status),
      status_notes: emptyToNull(row.status_notes),
      verified: parseBoolean(row.verified),
    };
    const key = variationKey(hadithId, bookId, payload.hadith_number);
    if (variationByKey.has(key)) {
      await admin.from("source_variations").update(payload).eq("id", variationByKey.get(key)!);
    } else {
      const { data, error } = await admin.from("source_variations").insert(payload).select("id").single();
      if (error) throw error;
      variationByKey.set(key, data.id);
    }
  }

  for (const row of corpus.chains) {
    const hadithId = hadithBySlug.get(row.hadith_slug);
    const bookId = bookByTitle.get(row.book_title);
    if (!hadithId || !bookId) throw new Error("Unresolved variation for chain import.");
    const key = variationKey(hadithId, bookId, emptyToNull(row.hadith_number));
    const variationId = variationByKey.get(key);
    if (!variationId) throw new Error(`No source variation for chain row ${row.hadith_slug} / ${row.book_title}.`);
    const chainNumber = parseOptionalInt(row.chain_number) || 1;
    const { data: chain, error: chainError } = await admin
      .from("chains")
      .upsert(
        {
          variation_id: variationId,
          chain_number: chainNumber,
          raw_chain_text: emptyToNull(row.raw_chain_text),
          continuity_status: row.continuity_status || "unverified",
          quality_status: row.quality_status || "unverified",
          notes: emptyToNull(row.notes),
          verified: parseBoolean(row.verified),
        },
        { onConflict: "variation_id,chain_number" },
      )
      .select("id")
      .single();
    if (chainError) throw chainError;

    const narratorSlug = emptyToNull(row.narrator_slug);
    const { error: nodeError } = await admin.from("chain_narrators").upsert(
      {
        chain_id: chain.id,
        position: parseOptionalInt(row.position),
        raw_name: row.raw_name,
        narrator_id: narratorSlug ? narratorBySlug.get(narratorSlug) ?? null : null,
        transmission_word: emptyToNull(row.transmission_word),
        match_confidence: row.match_confidence ? Number(row.match_confidence) : null,
        match_notes: emptyToNull(row.match_notes),
      },
      { onConflict: "chain_id,position" },
    );
    if (nodeError) throw nodeError;
  }

  for (const row of corpus.assessments) {
    const scholarId = scholarBySlug.get(row.scholar_slug);
    if (!scholarId) throw new Error(`Unknown scholar ${row.scholar_slug}`);
    if (row.target_type === "narrator") {
      const narratorId = narratorBySlug.get(row.target_identifier);
      if (!narratorId) throw new Error(`Unknown narrator ${row.target_identifier}`);
      const { error } = await admin.from("narrator_assessments").insert({
        narrator_id: narratorId,
        scholar_id: scholarId,
        original_term: row.original_term,
        normalized_term: emptyToNull(row.normalized_term),
        explanation: emptyToNull(row.explanation),
        display_score: parseOptionalInt(row.display_score),
        reference_book: emptyToNull(row.reference_book),
        edition: emptyToNull(row.edition),
        volume: emptyToNull(row.volume),
        page: emptyToNull(row.page),
        source_url: emptyToNull(row.source_url),
        verified: parseBoolean(row.verified),
      });
      if (error) throw error;
    } else if (row.target_type === "variation") {
      const variationId = Number(row.target_identifier);
      if (!Number.isInteger(variationId)) {
        throw new Error("variation assessments require target_identifier to be the numeric source_variations.id");
      }
      const { error } = await admin.from("hadith_assessments").insert({
        variation_id: variationId,
        scholar_id: scholarId,
        original_grade: row.original_term,
        normalized_grade: emptyToNull(row.normalized_term),
        explanation: emptyToNull(row.explanation),
        reference_book: emptyToNull(row.reference_book),
        edition: emptyToNull(row.edition),
        volume: emptyToNull(row.volume),
        page: emptyToNull(row.page),
        source_url: emptyToNull(row.source_url),
        verified: parseBoolean(row.verified),
      });
      if (error) throw error;
    }
  }

  console.log("Import applied. Unpublished/unverified rows remain hidden from anonymous visitors by RLS.");
}

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
