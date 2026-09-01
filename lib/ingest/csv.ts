export type Issue = {
  file: string;
  row: number;
  field?: string;
  message: string;
};

export type ValidationResult = {
  ok: boolean;
  issues: Issue[];
  counts: Record<string, number>;
};

export const REVIEW_STATUSES = new Set(["draft", "in_review", "published", "rejected"]);
export const ASSESSMENT_TARGETS = new Set(["narrator", "variation", "chain"]);

export function parsePostgresArray(value: string | undefined): string[] {
  if (!value) return [];
  const trimmed = value.trim();
  if (!trimmed || trimmed === "{}" || trimmed === "[]") return [];
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);
  }
  return trimmed
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function required(row: Record<string, string>, field: string): string | null {
  const value = (row[field] ?? "").trim();
  return value || null;
}

export function parseBoolean(value: string | undefined, fallback = false): boolean {
  if (!value) return fallback;
  return ["true", "t", "1", "yes"].includes(value.trim().toLowerCase());
}

export function parseOptionalInt(value: string | undefined): number | null {
  if (!value || !value.trim()) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : NaN;
}
