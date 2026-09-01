import {
  ASSESSMENT_TARGETS,
  REVIEW_STATUSES,
  parseBoolean,
  parseOptionalInt,
  parsePostgresArray,
  required,
  type Issue,
  type ValidationResult,
} from "./csv";

export type ParsedCorpus = {
  sources: Record<string, string>[];
  hadiths: Record<string, string>[];
  variations: Record<string, string>[];
  narrators: Record<string, string>[];
  assessments: Record<string, string>[];
  chains: Record<string, string>[];
};

export function validateCorpus(corpus: ParsedCorpus, scholarSlugs: Set<string>): ValidationResult {
  const issues: Issue[] = [];
  const hadithSlugs = new Set<string>();
  const narratorSlugs = new Set<string>();
  const variationKeys = new Set<string>();
  const chainKeys = new Set<string>();

  corpus.hadiths.forEach((row, index) => {
    const rowNumber = index + 2;
    const slug = required(row, "slug");
    const title = required(row, "title");
    if (!slug) issues.push({ file: "hadiths.csv", row: rowNumber, field: "slug", message: "Missing required slug." });
    if (!title) issues.push({ file: "hadiths.csv", row: rowNumber, field: "title", message: "Missing required title." });
    if (slug && hadithSlugs.has(slug)) {
      issues.push({ file: "hadiths.csv", row: rowNumber, field: "slug", message: `Duplicate hadith slug "${slug}".` });
    }
    if (slug) hadithSlugs.add(slug);
    const status = (row.review_status || "draft").trim();
    if (!REVIEW_STATUSES.has(status)) {
      issues.push({
        file: "hadiths.csv",
        row: rowNumber,
        field: "review_status",
        message: `Invalid review_status "${status}".`,
      });
    }
  });

  corpus.narrators.forEach((row, index) => {
    const rowNumber = index + 2;
    const slug = required(row, "slug");
    const name = required(row, "name");
    if (!slug) issues.push({ file: "narrators.csv", row: rowNumber, field: "slug", message: "Missing required slug." });
    if (!name) issues.push({ file: "narrators.csv", row: rowNumber, field: "name", message: "Missing required name." });
    if (slug && narratorSlugs.has(slug)) {
      issues.push({ file: "narrators.csv", row: rowNumber, field: "slug", message: `Duplicate narrator slug "${slug}".` });
    }
    if (slug) narratorSlugs.add(slug);
    const score = parseOptionalInt(row.summary_score);
    if (Number.isNaN(score) || (score !== null && (score < 0 || score > 100))) {
      issues.push({
        file: "narrators.csv",
        row: rowNumber,
        field: "summary_score",
        message: "summary_score must be an integer from 0 to 100.",
      });
    }
    for (const field of ["birth_year_ah", "death_year_ah"] as const) {
      const year = parseOptionalInt(row[field]);
      if (Number.isNaN(year)) {
        issues.push({ file: "narrators.csv", row: rowNumber, field, message: `${field} must be an integer.` });
      }
    }
  });

  corpus.variations.forEach((row, index) => {
    const rowNumber = index + 2;
    const hadithSlug = required(row, "hadith_slug");
    const bookTitle = required(row, "book_title");
    if (!hadithSlug) {
      issues.push({ file: "source-variations.csv", row: rowNumber, field: "hadith_slug", message: "Missing hadith_slug." });
    } else if (!hadithSlugs.has(hadithSlug)) {
      issues.push({
        file: "source-variations.csv",
        row: rowNumber,
        field: "hadith_slug",
        message: `Unknown hadith slug "${hadithSlug}".`,
      });
    }
    if (!bookTitle) {
      issues.push({
        file: "source-variations.csv",
        row: rowNumber,
        field: "book_title",
        message: "Missing source/book title (provenance).",
      });
    }
    const key = [hadithSlug, bookTitle, row.hadith_number, row.volume, row.page].join("|");
    if (variationKeys.has(key)) {
      issues.push({
        file: "source-variations.csv",
        row: rowNumber,
        message: "Duplicate source variation for the same cluster, book, and reference.",
      });
    }
    variationKeys.add(key);
    parseBoolean(row.verified);
  });

  corpus.sources.forEach((row, index) => {
    const rowNumber = index + 2;
    if (!required(row, "provider")) {
      issues.push({ file: "source-register.csv", row: rowNumber, field: "provider", message: "Missing provider." });
    }
  });

  corpus.chains.forEach((row, index) => {
    const rowNumber = index + 2;
    const hadithSlug = required(row, "hadith_slug");
    const bookTitle = required(row, "book_title");
    const position = parseOptionalInt(row.position);
    const rawName = required(row, "raw_name");
    if (!hadithSlug || !bookTitle) {
      issues.push({ file: "chains.csv", row: rowNumber, message: "Chain rows need hadith_slug and book_title." });
    }
    if (!rawName) {
      issues.push({
        file: "chains.csv",
        row: rowNumber,
        field: "raw_name",
        message: "Missing raw_name. Do not invent a narrator identity.",
      });
    }
    if (position === null || Number.isNaN(position) || position < 1) {
      issues.push({ file: "chains.csv", row: rowNumber, field: "position", message: "position must be a positive integer." });
    }
    const narratorSlug = (row.narrator_slug ?? "").trim();
    if (narratorSlug && !narratorSlugs.has(narratorSlug)) {
      issues.push({
        file: "chains.csv",
        row: rowNumber,
        field: "narrator_slug",
        message: `Unknown narrator_slug "${narratorSlug}". Leave it empty if identity is unresolved.`,
      });
    }
    const chainNumber = parseOptionalInt(row.chain_number) || 1;
    const nodeKey = [hadithSlug, bookTitle, row.hadith_number, chainNumber, position].join("|");
    if (chainKeys.has(nodeKey)) {
      issues.push({ file: "chains.csv", row: rowNumber, message: "Duplicate chain position for this variation." });
    }
    chainKeys.add(nodeKey);
  });

  corpus.assessments.forEach((row, index) => {
    const rowNumber = index + 2;
    const targetType = (row.target_type ?? "").trim();
    const target = required(row, "target_identifier");
    const scholarSlug = required(row, "scholar_slug");
    const term = required(row, "original_term");
    if (!ASSESSMENT_TARGETS.has(targetType)) {
      issues.push({
        file: "assessments.csv",
        row: rowNumber,
        field: "target_type",
        message: "target_type must be narrator, variation, or chain.",
      });
    }
    if (!target) {
      issues.push({ file: "assessments.csv", row: rowNumber, field: "target_identifier", message: "Missing target_identifier." });
    }
    if (!scholarSlug) {
      issues.push({ file: "assessments.csv", row: rowNumber, field: "scholar_slug", message: "Missing scholar_slug." });
    } else if (!scholarSlugs.has(scholarSlug)) {
      issues.push({
        file: "assessments.csv",
        row: rowNumber,
        field: "scholar_slug",
        message: `Unknown scholar slug "${scholarSlug}". Seed scholars first.`,
      });
    }
    if (!term) {
      issues.push({
        file: "assessments.csv",
        row: rowNumber,
        field: "original_term",
        message: "Missing original scholarly term. Do not invent a grade.",
      });
    }
    if (targetType === "narrator" && target && !narratorSlugs.has(target)) {
      issues.push({
        file: "assessments.csv",
        row: rowNumber,
        field: "target_identifier",
        message: `Unknown narrator slug "${target}".`,
      });
    }
    const score = parseOptionalInt(row.display_score);
    if (Number.isNaN(score) || (score !== null && (score < 0 || score > 100))) {
      issues.push({
        file: "assessments.csv",
        row: rowNumber,
        field: "display_score",
        message: "display_score must be an integer from 0 to 100.",
      });
    }
  });

  return {
    ok: issues.length === 0,
    issues,
    counts: {
      sources: corpus.sources.length,
      hadiths: corpus.hadiths.length,
      variations: corpus.variations.length,
      narrators: corpus.narrators.length,
      assessments: corpus.assessments.length,
      chains: corpus.chains.length,
    },
  };
}

export { parseBoolean, parseOptionalInt, parsePostgresArray, required };
