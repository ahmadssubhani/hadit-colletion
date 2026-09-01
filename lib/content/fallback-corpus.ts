import type {
  Book,
  Hadith,
  HadithAssessment,
  Narrator,
  NarratorAssessment,
  Scholar,
  SourceVariationDetail,
} from "@/lib/types";

const scholarYahya: Scholar = {
  id: 1,
  slug: "yahya-ibn-main",
  name: "Yahya ibn Ma'in",
  arabic_name: "يحيى بن معين",
  tradition: "Sunni",
  birth_year_ah: null,
  death_year_ah: 233,
  credentials: "Early specialist in narrator criticism.",
  methodology: null,
};

const scholarBukhari: Scholar = {
  id: 3,
  slug: "al-bukhari",
  name: "Muhammad al-Bukhari",
  arabic_name: "محمد البخاري",
  tradition: "Sunni",
  birth_year_ah: null,
  death_year_ah: 256,
  credentials: "Hadith compiler and biographical critic.",
  methodology: null,
};

const scholarIbnHajar: Scholar = {
  id: 7,
  slug: "ibn-hajar",
  name: "Ibn Hajar al-Asqalani",
  arabic_name: "ابن حجر العسقلاني",
  tradition: "Sunni",
  birth_year_ah: null,
  death_year_ah: 852,
  credentials: "Hadith master and author of major narrator reference works.",
  methodology: null,
};

export const FALLBACK_SCHOLARS: Scholar[] = [scholarYahya, scholarBukhari, scholarIbnHajar];

export const FALLBACK_BOOKS: Book[] = [
  {
    id: 1,
    title: "Sahih al-Bukhari",
    arabic_title: "صحيح البخاري",
    author: "Muhammad al-Bukhari",
    tradition: "Sunni",
    book_type: "hadith_collection",
    source_url: "https://sunnah.com/bukhari",
    license: null,
  },
  {
    id: 2,
    title: "Sahih Muslim",
    arabic_title: "صحيح مسلم",
    author: "Muslim ibn al-Hajjaj",
    tradition: "Sunni",
    book_type: "hadith_collection",
    source_url: "https://sunnah.com/muslim",
    license: null,
  },
];

export const FALLBACK_NARRATORS: Narrator[] = [
  {
    id: 1,
    slug: "umar-ibn-al-khattab",
    name: "Umar ibn al-Khattab",
    arabic_name: "عمر بن الخطاب",
    alternative_names: ["Umar"],
    birth_year_ah: null,
    death_year_ah: 23,
    region: "Medina",
    generation: "Companion",
    biography: "Second caliph and a major Companion narrator.",
    summary_score: null,
    identity_status: "verified",
  },
  {
    id: 2,
    slug: "alqamah-ibn-waqqas",
    name: "Alqamah ibn Waqqas",
    arabic_name: "علقمة بن وقاص",
    alternative_names: [],
    birth_year_ah: null,
    death_year_ah: null,
    region: "Medina",
    generation: "Successor",
    biography: "Medinan transmitter of the intentions report.",
    summary_score: null,
    identity_status: "verified",
  },
  {
    id: 3,
    slug: "sahl-ibn-sad",
    name: "Sahl ibn Sa'd",
    arabic_name: "سهل بن سعد",
    alternative_names: [],
    birth_year_ah: null,
    death_year_ah: 91,
    region: "Medina",
    generation: "Companion",
    biography: "Companion associated with the banner reports.",
    summary_score: null,
    identity_status: "verified",
  },
  {
    id: 4,
    slug: "abu-hurayra",
    name: "Abu Hurayra",
    arabic_name: "أبو هريرة",
    alternative_names: [],
    birth_year_ah: null,
    death_year_ah: 59,
    region: "Medina",
    generation: "Companion",
    biography: "Prolific Companion narrator.",
    summary_score: null,
    identity_status: "verified",
  },
];

export const FALLBACK_HADITHS: Array<Hadith & { variation_count: number }> = [
  {
    id: 1,
    slug: "actions-by-intentions",
    title: "Actions are only by intentions",
    arabic_title: "إنما الأعمال بالنيات",
    summary: "Parent cluster for the famous intentions report. Each book occurrence keeps its own text and grades.",
    topics: ["intentions", "faith"],
    review_status: "published",
    variation_count: 2,
  },
  {
    id: 2,
    slug: "banner-at-khaybar",
    title: "Tomorrow I shall give the banner",
    arabic_title: "لأعطين الراية",
    summary: "Related banner accounts from Khaybar. Wording differs by source.",
    topics: ["virtues", "leadership"],
    review_status: "published",
    variation_count: 2,
  },
  {
    id: 3,
    slug: "best-manners",
    title: "The best among you are those with the best character",
    arabic_title: "إن من خياركم أحسنكم أخلاقا",
    summary: "Reports on manners and character, kept as separate source occurrences.",
    topics: ["character"],
    review_status: "published",
    variation_count: 1,
  },
  {
    id: 4,
    slug: "path-of-knowledge",
    title: "Whoever travels a path in search of knowledge",
    arabic_title: "من سلك طريقا يلتمس فيه علما",
    summary: "Knowledge reports with their own citations and chains.",
    topics: ["knowledge"],
    review_status: "published",
    variation_count: 1,
  },
];

function assessment(
  id: number,
  variationId: number,
  scholar: Scholar,
  original: string,
  explanation: string,
): HadithAssessment {
  return {
    id,
    variation_id: variationId,
    scholar_id: scholar.id,
    original_grade: original,
    normalized_grade: original.toLowerCase(),
    explanation,
    reference_book: scholar.name,
    edition: null,
    volume: null,
    page: null,
    source_url: null,
    verified: true,
    scholars: scholar,
  };
}

export const FALLBACK_VARIATIONS: Record<string, SourceVariationDetail[]> = {
  "actions-by-intentions": [
    {
      id: 11,
      hadith_id: 1,
      book_id: 1,
      hadith_number: "1",
      chapter: "Beginning of Revelation",
      volume: "1",
      page: "1",
      arabic_text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      english_text: "Actions are only by intentions, and each person will have only what they intended.",
      translator: "Illustrative English for demonstration",
      source_url: "https://sunnah.com/bukhari:1",
      hadith_status: "sahih",
      chain_status: "muttasil",
      narration_status: ["ahad", "marfu"],
      status_notes: "Collection-level status for this Bukhari occurrence only.",
      verified: true,
      books: FALLBACK_BOOKS[0],
      chains: [
        {
          id: 101,
          variation_id: 11,
          chain_number: 1,
          raw_chain_text: "Umar ibn al-Khattab ← Alqamah ibn Waqqas",
          continuity_status: "muttasil",
          quality_status: "sahih",
          notes: null,
          verified: true,
          chain_narrators: [
            {
              id: 1001,
              chain_id: 101,
              narrator_id: 1,
              position: 1,
              raw_name: "Umar ibn al-Khattab",
              transmission_word: "an",
              match_confidence: 1,
              match_notes: null,
              narrators: FALLBACK_NARRATORS[0],
            },
            {
              id: 1002,
              chain_id: 101,
              narrator_id: 2,
              position: 2,
              raw_name: "Alqamah ibn Waqqas",
              transmission_word: "an",
              match_confidence: 1,
              match_notes: null,
              narrators: FALLBACK_NARRATORS[1],
            },
          ],
        },
      ],
      hadith_assessments: [
        assessment(201, 11, scholarBukhari, "Sahih", "Included in al-Sahih for this exact occurrence."),
        assessment(202, 11, scholarIbnHajar, "Sahih", "Later summary judgment attached to this Bukhari route."),
      ],
    },
    {
      id: 12,
      hadith_id: 1,
      book_id: 2,
      hadith_number: "1907",
      chapter: "On intention",
      volume: null,
      page: null,
      arabic_text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّةِ",
      english_text: "Actions are only by intention.",
      translator: "Illustrative English for demonstration",
      source_url: "https://sunnah.com/muslim:1907",
      hadith_status: "sahih",
      chain_status: "muttasil",
      narration_status: ["ahad", "marfu"],
      status_notes: "Grade belongs to this Muslim occurrence, not automatically to every variant.",
      verified: true,
      books: FALLBACK_BOOKS[1],
      chains: [
        {
          id: 102,
          variation_id: 12,
          chain_number: 1,
          raw_chain_text: "Umar ibn al-Khattab",
          continuity_status: "muttasil",
          quality_status: "sahih",
          notes: null,
          verified: true,
          chain_narrators: [
            {
              id: 1003,
              chain_id: 102,
              narrator_id: 1,
              position: 1,
              raw_name: "Umar ibn al-Khattab",
              transmission_word: "an",
              match_confidence: 1,
              match_notes: null,
              narrators: FALLBACK_NARRATORS[0],
            },
          ],
        },
      ],
      hadith_assessments: [assessment(203, 12, scholarBukhari, "Sahih", "Named for the Muslim occurrence.")],
    },
  ],
  "banner-at-khaybar": [
    {
      id: 21,
      hadith_id: 2,
      book_id: 1,
      hadith_number: "4210",
      chapter: "Military Expeditions",
      volume: null,
      page: null,
      arabic_text: "لَأُعْطِيَنَّ الرَّايَةَ غَدًا رَجُلًا يَفْتَحُ اللَّهُ عَلَى يَدَيْهِ",
      english_text: "Tomorrow I will give the banner to a man through whose hands God will grant victory.",
      translator: "Illustrative English for demonstration",
      source_url: "https://sunnah.com/bukhari:4210",
      hadith_status: "sahih",
      chain_status: "muttasil",
      narration_status: ["ahad", "marfu"],
      status_notes: "Shown specifically for this Bukhari occurrence.",
      verified: true,
      books: FALLBACK_BOOKS[0],
      chains: [
        {
          id: 201,
          variation_id: 21,
          chain_number: 1,
          raw_chain_text: "Sahl ibn Sa'd",
          continuity_status: "muttasil",
          quality_status: "sahih",
          notes: null,
          verified: true,
          chain_narrators: [
            {
              id: 2001,
              chain_id: 201,
              narrator_id: 3,
              position: 1,
              raw_name: "Sahl ibn Sa'd",
              transmission_word: "an",
              match_confidence: 1,
              match_notes: null,
              narrators: FALLBACK_NARRATORS[2],
            },
          ],
        },
      ],
      hadith_assessments: [assessment(301, 21, scholarBukhari, "Sahih", "Collection-level status for this occurrence.")],
    },
    {
      id: 22,
      hadith_id: 2,
      book_id: 2,
      hadith_number: "2404",
      chapter: "Virtues of the Companions",
      volume: null,
      page: null,
      arabic_text: "لَأُعْطِيَنَّ الرَّايَةَ رَجُلًا يُحِبُّ اللَّهَ وَرَسُولَهُ",
      english_text: "I shall give the banner to a man who loves God and His Messenger.",
      translator: "Illustrative English for demonstration",
      source_url: "https://sunnah.com/muslim:2404",
      hadith_status: "sahih",
      chain_status: "muttasil",
      narration_status: ["ahad", "marfu"],
      status_notes: "Different wording from the Bukhari occurrence in this cluster.",
      verified: true,
      books: FALLBACK_BOOKS[1],
      chains: [
        {
          id: 202,
          variation_id: 22,
          chain_number: 1,
          raw_chain_text: "Distinct Companion route",
          continuity_status: "muttasil",
          quality_status: "sahih",
          notes: null,
          verified: true,
          chain_narrators: [
            {
              id: 2002,
              chain_id: 202,
              narrator_id: 3,
              position: 1,
              raw_name: "Sahl ibn Sa'd",
              transmission_word: "an",
              match_confidence: 0.7,
              match_notes: "Review identity against the cited edition.",
              narrators: FALLBACK_NARRATORS[2],
            },
          ],
        },
      ],
      hadith_assessments: [assessment(302, 22, scholarIbnHajar, "Sahih", "Attributed to this Muslim occurrence.")],
    },
  ],
  "best-manners": [
    {
      id: 31,
      hadith_id: 3,
      book_id: 1,
      hadith_number: "3559",
      chapter: "Manners",
      volume: null,
      page: null,
      arabic_text: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا",
      english_text: "The best among you are those who have the best manners and character.",
      translator: "Illustrative English for demonstration",
      source_url: "https://sunnah.com/bukhari:3559",
      hadith_status: "sahih",
      chain_status: "muttasil",
      narration_status: ["ahad", "marfu"],
      status_notes: null,
      verified: true,
      books: FALLBACK_BOOKS[0],
      chains: [
        {
          id: 301,
          variation_id: 31,
          chain_number: 1,
          raw_chain_text: "Abdullah ibn Amr route",
          continuity_status: "muttasil",
          quality_status: "sahih",
          notes: null,
          verified: true,
          chain_narrators: [
            {
              id: 3001,
              chain_id: 301,
              narrator_id: 4,
              position: 1,
              raw_name: "Abu Hurayra",
              transmission_word: "an",
              match_confidence: 0.5,
              match_notes: "Demo chain node for navigation.",
              narrators: FALLBACK_NARRATORS[3],
            },
          ],
        },
      ],
      hadith_assessments: [assessment(401, 31, scholarBukhari, "Sahih", "Named for this occurrence.")],
    },
  ],
  "path-of-knowledge": [
    {
      id: 41,
      hadith_id: 4,
      book_id: 2,
      hadith_number: "2699",
      chapter: "Knowledge",
      volume: null,
      page: null,
      arabic_text: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
      english_text: "Whoever travels a path in search of knowledge, God makes easy for him a path to Paradise.",
      translator: "Illustrative English for demonstration",
      source_url: "https://sunnah.com/muslim:2699",
      hadith_status: "sahih",
      chain_status: "muttasil",
      narration_status: ["ahad", "marfu"],
      status_notes: null,
      verified: true,
      books: FALLBACK_BOOKS[1],
      chains: [
        {
          id: 401,
          variation_id: 41,
          chain_number: 1,
          raw_chain_text: "Abu Hurayra",
          continuity_status: "muttasil",
          quality_status: "sahih",
          notes: null,
          verified: true,
          chain_narrators: [
            {
              id: 4001,
              chain_id: 401,
              narrator_id: 4,
              position: 1,
              raw_name: "Abu Hurayra",
              transmission_word: "an",
              match_confidence: 1,
              match_notes: null,
              narrators: FALLBACK_NARRATORS[3],
            },
          ],
        },
      ],
      hadith_assessments: [assessment(501, 41, scholarIbnHajar, "Sahih", "Attributed judgment for this occurrence.")],
    },
  ],
};

export const FALLBACK_NARRATOR_ASSESSMENTS: Record<string, NarratorAssessment[]> = {
  "umar-ibn-al-khattab": [
    {
      id: 1,
      narrator_id: 1,
      scholar_id: scholarYahya.id,
      original_term: "ثقة",
      normalized_term: "thiqah",
      explanation: "Companion; reliability is discussed in rijal works with named attributions.",
      display_score: 95,
      mapping_method: "editorial display mapping",
      reference_book: "Illustrative citation",
      edition: null,
      volume: null,
      page: null,
      source_url: null,
      verified: true,
      scholars: scholarYahya,
    },
  ],
  "sahl-ibn-sad": [
    {
      id: 2,
      narrator_id: 3,
      scholar_id: scholarIbnHajar.id,
      original_term: "صحابي",
      normalized_term: "companion",
      explanation: "Identified as a Companion in later biographical summaries.",
      display_score: 90,
      mapping_method: "editorial display mapping",
      reference_book: "Taqrib",
      edition: null,
      volume: null,
      page: null,
      source_url: null,
      verified: true,
      scholars: scholarIbnHajar,
    },
  ],
};

export function searchFallback(filters: {
  q?: string;
  bookId?: string;
  hadithStatus?: string;
  chainStatus?: string;
  narrationStatus?: string;
  scholarId?: string;
  assessment?: string;
  page?: number;
}) {
  const page = Math.max(1, filters.page ?? 1);
  const q = (filters.q ?? "").trim().toLowerCase();
  let rows = FALLBACK_HADITHS.map((hadith) => ({
    hadith,
    variations: FALLBACK_VARIATIONS[hadith.slug] ?? [],
  }));

  if (q) {
    rows = rows.filter(({ hadith, variations }) => {
      const blob = [
        hadith.title,
        hadith.slug,
        hadith.summary,
        ...variations.flatMap((v) => [v.english_text, v.arabic_text, v.hadith_number, v.books?.title]),
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }
  if (filters.bookId) {
    const bookId = Number(filters.bookId);
    rows = rows.filter(({ variations }) => variations.some((v) => v.book_id === bookId));
  }
  if (filters.hadithStatus) {
    rows = rows.filter(({ variations }) => variations.some((v) => v.hadith_status === filters.hadithStatus));
  }
  if (filters.chainStatus) {
    rows = rows.filter(({ variations }) => variations.some((v) => v.chain_status === filters.chainStatus));
  }
  if (filters.narrationStatus) {
    rows = rows.filter(({ variations }) =>
      variations.some((v) => v.narration_status.includes(filters.narrationStatus!)),
    );
  }
  if (filters.scholarId) {
    const scholarId = Number(filters.scholarId);
    rows = rows.filter(({ variations }) =>
      variations.some((v) => v.hadith_assessments.some((a) => a.scholar_id === scholarId)),
    );
  }
  if (filters.assessment) {
    const term = filters.assessment.toLowerCase();
    rows = rows.filter(({ variations }) =>
      variations.some((v) =>
        v.hadith_assessments.some(
          (a) => a.original_grade.toLowerCase().includes(term) || (a.normalized_grade ?? "").includes(term),
        ),
      ),
    );
  }

  const total = rows.length;
  const pageSize = 12;
  const start = (page - 1) * pageSize;
  return {
    hadiths: rows.slice(start, start + pageSize).map((row) => row.hadith),
    total,
    page,
    pageSize,
    error: null as string | null,
  };
}
