const DIACRITICS = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;

export const ARABIC_NORMALIZATION_VERSION = "1";

/** Derived search form only. Never overwrite source transcription with this output. */
export function normalizeArabic(text: string): string {
  return text
    .normalize("NFKC")
    .replace(DIACRITICS, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function looksLikeArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}
