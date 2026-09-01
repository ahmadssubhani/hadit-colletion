import { loadLocalEnv } from "./load-env";
loadLocalEnv();

import { createAdminSupabaseClient } from "../lib/supabase/admin";
import { normalizeArabic } from "../lib/normalization";

type VariationRow = {
  id: number;
  hadith_id: number;
  arabic_text: string | null;
  english_text: string | null;
};

function overlap(a: string, b: string): number {
  const left = new Set(a.split(" ").filter((token) => token.length > 3));
  const right = new Set(b.split(" ").filter((token) => token.length > 3));
  if (!left.size || !right.size) return 0;
  let shared = 0;
  for (const token of left) if (right.has(token)) shared += 1;
  return shared / Math.min(left.size, right.size);
}

/** Propose cluster relationships. Reviewers must choose the relationship; this never publishes. */
async function main() {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("source_variations")
    .select("id, hadith_id, arabic_text, english_text")
    .limit(400);
  if (error) throw error;

  const rows = (data ?? []) as VariationRow[];
  const proposals = [];
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = i + 1; j < rows.length; j += 1) {
      if (rows[i].hadith_id === rows[j].hadith_id) continue;
      const arabicScore = overlap(
        normalizeArabic(rows[i].arabic_text ?? ""),
        normalizeArabic(rows[j].arabic_text ?? ""),
      );
      const englishScore = overlap((rows[i].english_text ?? "").toLowerCase(), (rows[j].english_text ?? "").toLowerCase());
      const score = Math.max(arabicScore, englishScore);
      if (score < 0.35) continue;
      proposals.push({
        variation_a: rows[i].id,
        variation_b: rows[j].id,
        cluster_a: rows[i].hadith_id,
        cluster_b: rows[j].hadith_id,
        score: Number(score.toFixed(3)),
        reviewer_must_choose: ["same hadith variation", "partial parallel", "quotation", "same topic only", "unrelated"],
      });
    }
  }

  proposals.sort((a, b) => b.score - a.score);
  console.log(JSON.stringify(proposals.slice(0, 50), null, 2));
  console.log("Candidates only. Do not merge wording or copy grades across clusters.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
