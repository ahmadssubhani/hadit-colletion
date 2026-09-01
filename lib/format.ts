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
