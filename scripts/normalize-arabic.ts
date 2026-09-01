import { loadLocalEnv } from "./load-env";
loadLocalEnv();

import { ARABIC_NORMALIZATION_VERSION, normalizeArabic } from "../lib/normalization";

const samples = process.argv.slice(2);
if (!samples.length) {
  console.log(`Arabic search normalization version ${ARABIC_NORMALIZATION_VERSION}`);
  console.log("Usage: npm run normalize-arabic -- \"إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ\"");
  console.log("This prints a derived search form. It must never replace the source transcription.");
  process.exit(0);
}

for (const sample of samples) {
  console.log(JSON.stringify({ original: sample, search_text: normalizeArabic(sample) }, null, 2));
}
