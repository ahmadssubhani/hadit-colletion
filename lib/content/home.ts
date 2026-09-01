export type DemoHadith = {
  id: string;
  tag: string;
  arabic: string;
  english: string;
  narrator: string;
  collection: string;
  reference: string;
};

/** Placeholder samples for the homepage. Replace with published database rows when available. */
export const DEMO_HADITHS: DemoHadith[] = [
  {
    id: "demo-intentions",
    tag: "Intentions",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    english: "Actions are only by intentions.",
    narrator: "Umar ibn al-Khattab",
    collection: "Sahih al-Bukhari",
    reference: "Hadith 1",
  },
  {
    id: "demo-manners",
    tag: "Character",
    arabic: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا",
    english: "The best among you are those who have the best manners and character.",
    narrator: "Abdullah ibn Amr",
    collection: "Sahih al-Bukhari",
    reference: "Hadith 3559",
  },
  {
    id: "demo-knowledge",
    tag: "Knowledge",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
    english: "Whoever travels a path in search of knowledge, God makes easy for him a path to Paradise.",
    narrator: "Abu Hurayra",
    collection: "Sahih Muslim",
    reference: "Hadith 2699",
  },
];

export const HOME_COLLECTIONS = [
  { title: "Sahih al-Bukhari", query: "Bukhari", note: "Sunni collection" },
  { title: "Sahih Muslim", query: "Muslim", note: "Sunni collection" },
  { title: "Jami at-Tirmidhi", query: "Tirmidhi", note: "Sunni collection" },
  { title: "Sunan Abu Dawud", query: "Abu Dawud", note: "Sunni collection" },
  { title: "Sunan an-Nasa'i", query: "Nasa'i", note: "Sunni collection" },
  { title: "Sunan Ibn Majah", query: "Ibn Majah", note: "Sunni collection" },
];

export const HOME_TOPICS = [
  { label: "Prayer", query: "prayer" },
  { label: "Faith", query: "faith" },
  { label: "Charity", query: "charity" },
  { label: "Fasting", query: "fasting" },
  { label: "Character", query: "character" },
  { label: "Knowledge", query: "knowledge" },
  { label: "Family", query: "family" },
];

export const HOME_REASONS = [
  {
    title: "Authentic sources",
    text: "Every occurrence stays attached to its book, edition, and citation.",
  },
  {
    title: "Clear search",
    text: "Look up English, Arabic, narrators, and hadith numbers in PostgreSQL.",
  },
  {
    title: "Organized clusters",
    text: "Related reports are grouped without merging their wording or grades.",
  },
  {
    title: "Named assessments",
    text: "Scholarly judgments remain attributed. The site never invents a consensus grade.",
  },
];
