import { loadLocalEnv } from "./load-env";
loadLocalEnv();

import { createAdminSupabaseClient } from "../lib/supabase/admin";
import { normalizeArabic } from "../lib/normalization";

/** Propose narrator matches from unresolved chain_narrators.raw_name. Does not write identities. */
async function main() {
  const apply = process.argv.includes("--apply");
  const admin = createAdminSupabaseClient();
  const { data: unresolved, error } = await admin
    .from("chain_narrators")
    .select("id, raw_name, narrator_id")
    .is("narrator_id", null)
    .limit(200);
  if (error) throw error;

  const { data: narrators } = await admin.from("narrators").select("id, slug, name, arabic_name, alternative_names");
  const proposals = [];

  for (const node of unresolved ?? []) {
    const needle = normalizeArabic(node.raw_name).toLowerCase();
    const match = (narrators ?? []).find((narrator) => {
      const haystacks = [narrator.name, narrator.arabic_name, ...(narrator.alternative_names ?? [])]
        .filter(Boolean)
        .map((value) => normalizeArabic(String(value)).toLowerCase());
      return haystacks.some((value) => value === needle || value.includes(needle) || needle.includes(value));
    });
    if (!match) continue;
    proposals.push({
      chain_narrator_id: node.id,
      raw_name: node.raw_name,
      proposed_narrator_id: match.id,
      proposed_slug: match.slug,
      note: "Candidate only. Review before attaching narrator_id.",
    });
    if (apply) {
      await admin
        .from("chain_narrators")
        .update({
          narrator_id: match.id,
          match_confidence: 0.5,
          match_notes: "Proposed by match-narrators.ts; requires human review.",
        })
        .eq("id", node.id);
    }
  }

  console.log(JSON.stringify({ count: proposals.length, apply, proposals }, null, 2));
  if (!apply) console.log("Dry run. Pass --apply only after reviewing candidates.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
