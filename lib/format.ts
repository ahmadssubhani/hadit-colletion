export function one<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export function formatList(values: string[] | null | undefined): string {
  return (values ?? []).filter(Boolean).join(" · ");
}

export function formatStatus(value: string | null | undefined): string {
  if (!value) return "Unspecified";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function statusTone(value: string | null | undefined): "ok" | "pending" | "neutral" {
  const normalized = (value ?? "").toLowerCase();
  if (
    ["not_graded", "unverified", "pending", "needs verification", "review chain"].some((item) =>
      normalized.includes(item),
    )
  ) {
    return "pending";
  }
  if (["historical", "neutral", "unspecified"].some((item) => normalized.includes(item))) {
    return "neutral";
  }
  return "ok";
}

export function bookInitial(title: string): string {
  const cleaned = title.replace(/^al[- ]/i, "").trim();
  return (cleaned[0] ?? "?").toUpperCase();
}

export function formatAhYear(year: number | null | undefined): string {
  if (!year) return "Not recorded";
  return `${year} AH`;
}

const QUALITY_SCORE_MAP: Record<string, number> = {
  sahih: 95,
  hasan: 78,
  hasan_sahih: 88,
  muttasil: 90,
  daif: 35,
  "da'if": 35,
  munqati: 30,
  mawdu: 5,
  unverified: 0,
};

export function chainEvidenceScore(qualityStatus: string | null | undefined, continuityStatus: string | null | undefined): number | null {
  const quality = (qualityStatus ?? "").toLowerCase().replace(/[\s-]+/g, "_");
  const continuity = (continuityStatus ?? "").toLowerCase().replace(/[\s-]+/g, "_");
  const qualityScore = QUALITY_SCORE_MAP[quality];
  const continuityScore = QUALITY_SCORE_MAP[continuity];
  if (qualityScore === undefined && continuityScore === undefined) return null;
  if (qualityScore === undefined) return continuityScore;
  if (continuityScore === undefined) return qualityScore;
  return Math.round((qualityScore * 0.7 + continuityScore * 0.3));
}

export function evidenceLabel(score: number | null): string {
  if (score === null) return "Not yet assessed";
  if (score >= 85) return "Strongly reliable";
  if (score >= 65) return "Generally reliable";
  if (score >= 40) return "Disputed reliability";
  return "Weak or rejected";
}

export function citation(parts: {
  reference_book?: string | null;
  edition?: string | null;
  volume?: string | null;
  page?: string | null;
  source_url?: string | null;
}): string {
  return [parts.reference_book, parts.edition, parts.volume ? `vol. ${parts.volume}` : null, parts.page ? `p. ${parts.page}` : null]
    .filter(Boolean)
    .join(" · ");
}