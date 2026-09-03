// export interface CandidateNarratorNode {
//   position: number;
//   rawName: string;
//   slug?: string;
//   word?: string;
// }

// export interface CandidateAssessment {
//   scholarSlug: string;
//   term: string;
//   norm: string;
//   explanation: string;
//   score: number;
//   ref: string;
//   ed?: string;
//   vol?: string;
//   page?: string;
// }

// export interface HadithCandidate {
//   identifier: string; // Unique key e.g. "bukhari:3"
//   bookTitle: string;
//   hadithNumber: string;
//   chapter: string;
//   volume?: string;
//   page?: string;
//   arabicText: string;
//   englishText: string;
//   translator?: string;
//   sourceUrl?: string;
//   hadithStatus: string;
//   chainStatus: string;
//   narrationStatus: string[];
//   statusNotes?: string;
//   rawChainText?: string;
//   nodes?: CandidateNarratorNode[];
//   assessments?: CandidateAssessment[];
// }

// import { TopicDefinition as NewTopicDefinition } from "./fetchers/types";
// export type TopicDefinition = NewTopicDefinition & {
//   hadithCandidates?: HadithCandidate[];
// };

// // Built-in topics registry
// export const TOPICS_REGISTRY: Record<string, TopicDefinition> = {
//   "first-wahi": {
//     slug: "first-wahi",
//     title: "The Beginning of Revelation (First Wahi at Cave Hira)",
//     arabicTitle: "بدء الوحي ونزول القرآن في غار حراء",
//     description: "Cross-traditional narrations on the commencement of revelation in Cave Hira, the first verses of Surah al-Alaq (96:1-5), the pause of revelation (Fatrat al-Wahy), Surah al-Muddaththir, and classical accounts of certainty and tranquility.",
//     keywords: ["first-wahi", "revelation", "hira", "gabriel", "iqra", "alaq", "muddaththir", "khadijah", "waraqa", "sakinah"],
//     searchQueries: {
//       arabic: ["غار حراء", "بدء الوحي", "اقرأ باسم ربك", "يا أيها المدثر", "فترة الوحي"],
//       english: ["cave hira", "first revelation", "gabriel", "waraqa", "read in the name"]
//     },
//     expandedKeywords: ["khadijah", "sakinah", "jibril", "namus", "tahannuth"],
//     hadithCandidates: [
//       // Day 1: Foundational Canonical Accounts
//       {
//         identifier: "bukhari:3",
//         bookTitle: "Sahih al-Bukhari",
//         hadithNumber: "3",
//         chapter: "Book of Revelation (كتاب بدء الوحي)",
//         volume: "1",
//         page: "2",
//         arabicText: "حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ، قَالَ: حَدَّثَنَا اللَّيْثُ، عَنْ عُقَيْلٍ، عَنِ ابْنِ شِهَابٍ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ أَنَّهَا قَالَتْ: أَوَّلُ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ، فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ، ثُمَّ حُبِّبَ إِلَيْهِ الْخَلاَءُ، وَكَانَ يَخْلُو بِغَارِ حِرَاءٍ فَيَتَحَنَّثُ فِيهِ ـ وَهُوَ التَّعَبُّدُ ـ اللَّيَالِيَ ذَوَاتِ الْعَدَدِ قَبْلَ أَنْ يَنْزِعَ إِلَى أَهْلِهِ، وَيَتَزَوَّدُ لِذَلِكَ، ثُمَّ يَرْجِعُ إِلَى خَدِيجَةَ فَيَتَزَوَّدُ لِمِثْلِهَا، حَتَّى جَاءَهُ الْحَقُّ وَهُوَ فِي غَارِ حِرَاءٍ، فَجَاءَهُ الْمَلَكُ فَقَالَ: اقْرَأْ. قَالَ: «مَا أَنَا بِقَارِئٍ»...",
//         englishText: "Narrated Aisha (the mother of the faithful believers): The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good righteous dreams in his sleep. He never had a dream but that it came true like bright daylight. He was also endowed with the love of seclusion in the Cave of Hira...",
//         translator: "Dr. Muhammad Muhsin Khan",
//         sourceUrl: "https://sunnah.com/bukhari:3",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi"],
//         statusNotes: "Canonical opening hadith of Sahih al-Bukhari.",
//         rawChainText: "حدثنا يحيى بن بكير حدثنا الليث عن عقيل عن ابن شهاب عن عروة بن الزبير عن عائشة أم المؤمنين",
//         nodes: [
//           { position: 1, rawName: "Aisha bint Abi Bakr", slug: "aisha-bint-abi-bakr", word: "an" },
//           { position: 2, rawName: "Urwah ibn al-Zubayr", slug: "urwah-ibn-al-zubayr", word: "an" },
//           { position: 3, rawName: "Ibn Shihab al-Zuhri", slug: "ibn-shihab-al-zuhri", word: "an" },
//           { position: 4, rawName: "Uqayl ibn Khalid", slug: "uqayl-ibn-khalid", word: "an" },
//           { position: 5, rawName: "Al-Layth ibn Sa'd", slug: "al-layth-ibn-sad", word: "haddathana" },
//           { position: 6, rawName: "Yahya ibn Bukayr", slug: "yahya-ibn-bukayr", word: "haddathana" },
//         ],
//         assessments: [
//           { scholarSlug: "ibn-hajar", term: "صحيح", norm: "sahih", explanation: "Opening hadith of the Sahih collection.", score: 99, ref: "Fath al-Bari" },
//         ],
//       },
//       {
//         identifier: "muslim:160a",
//         bookTitle: "Sahih Muslim",
//         hadithNumber: "160a",
//         chapter: "Book of Faith (كتاب الإيمان)",
//         volume: "1",
//         page: "139",
//         arabicText: "حَدَّثَنِي أَبُو الطَّاهِرِ أَحْمَدُ بْنُ عَمْرِو بْنِ سَرْحٍ، حَدَّثَنَا ابْنُ وَهْبٍ، قَالَ: أَخْبَرَنِي يُونُسُ، عَنِ ابْنِ شِهَابٍ، قَالَ: حَدَّثَنِي عُرْوَةُ بْنُ الزُّبَيْرِ، أَنَّ عَائِشَةَ زَوْجَ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَخْبَرَتْهُ أَنَّهَا قَالَتْ: كَانَ أَوَّلَ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّادِقَةُ فِي النَّوْمِ، فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ...",
//         englishText: "Aisha reported: The beginning of Divine Revelation to the Messenger of Allah (ﷺ) was in the form of true dreams during sleep. He saw no dream but it came like the breaking of the dawn. Then seclusion was endeared to him in the Cave of Hira...",
//         translator: "Abdul Hamid Siddiqui",
//         sourceUrl: "https://sunnah.com/muslim:160a",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi"],
//         statusNotes: "Transmitted through Ibn Wahb and Yunus ibn Yazid from al-Zuhri.",
//         rawChainText: "حدثني أبو الطاهر أحمد بن عمرو بن سرح حدثنا ابن وهب أخبرني يونس عن ابن شهاب حدثني عروة بن الزبير عن عائشة",
//         nodes: [
//           { position: 1, rawName: "Aisha bint Abi Bakr", slug: "aisha-bint-abi-bakr", word: "akhbarat" },
//           { position: 2, rawName: "Urwah ibn al-Zubayr", slug: "urwah-ibn-al-zubayr", word: "haddathani" },
//           { position: 3, rawName: "Ibn Shihab al-Zuhri", slug: "ibn-shihab-al-zuhri", word: "an" },
//           { position: 4, rawName: "Yunus ibn Yazid", slug: "yunus-ibn-yazid", word: "akhbarani" },
//           { position: 5, rawName: "Abd Allah ibn Wahb", slug: "abdullah-ibn-wahb", word: "haddathana" },
//           { position: 6, rawName: "Abu al-Tahir ibn Sarh", slug: "abu-al-tahir-ibn-sarh", word: "haddathani" },
//         ],
//       },
//       {
//         identifier: "bukhari:4",
//         bookTitle: "Sahih al-Bukhari",
//         hadithNumber: "4",
//         chapter: "Book of Revelation - Intermission (فترة الوحي)",
//         volume: "1",
//         page: "3",
//         arabicText: "حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ، حَدَّثَنَا اللَّيْثُ، عَنْ عُقَيْلٍ، عَنِ ابْنِ شِهَابٍ، قَالَ: سَمِعْتُ أَبَا سَلَمَةَ بْنَ عَبْدِ الرَّحْمَنِ، يَقُولُ: أَخْبَرَنِي جَابِرُ بْنُ عَبْدِ اللَّهِ الأَنْصَارِيُّ، وَهُوَ يُحَدِّثُ عَنْ فَتْرَةِ الْوَحْيِ، فَقَالَ فِي حَدِيثِهِ: «بَيْنَا أَنَا أَمْشِي إِذْ سَمِعْتُ صَوْتًا مِنَ السَّمَاءِ، فَرَفَعْتُ بَصَرِي فَإِذَا الْمَلَكُ الَّذِي جَاءَنِي بِحِرَاءٍ جَالِسٌ عَلَى كُرْسِيٍّ بَيْنَ السَّمَاءِ وَالأَرْضِ، فَرُعِبْتُ مِنْهُ، فَرَجَعْتُ فَقُلْتُ: زَمِّلُونِي زَمِّلُونِي. فَأَنْزَلَ اللَّهُ تَعَالَى: {يَا أَيُّهَا الْمُدَّثِّرُ * قُمْ فَأَنْذِرْ}...»",
//         englishText: "Narrated Jabir ibn Abd Allah: The Prophet (ﷺ) said while speaking of the interval of revelation: 'While I was walking, I suddenly heard a voice from the sky. I looked up and saw the very same Angel who had visited me at Hira sitting on a chair between the sky and the earth...'",
//         translator: "Dr. Muhammad Muhsin Khan",
//         sourceUrl: "https://sunnah.com/bukhari:4",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "fatrat_al_wahy"],
//         statusNotes: "Resumption of revelation with Surah al-Muddaththir.",
//         rawChainText: "حدثنا يحيى بن بكير حدثنا الليث عن عقيل عن ابن شهاب سمعت أبا سلمة عن جابر بن عبد الله",
//         nodes: [
//           { position: 1, rawName: "Jabir ibn Abd Allah", slug: "jabir-ibn-abdullah", word: "akhbarani" },
//           { position: 2, rawName: "Abu Salama ibn Abd al-Rahman", slug: "abu-salama-ibn-abd-al-rahman", word: "qala" },
//           { position: 3, rawName: "Ibn Shihab al-Zuhri", slug: "ibn-shihab-al-zuhri", word: "an" },
//           { position: 4, rawName: "Uqayl ibn Khalid", slug: "uqayl-ibn-khalid", word: "an" },
//           { position: 5, rawName: "Al-Layth ibn Sa'd", slug: "al-layth-ibn-sad", word: "haddathana" },
//           { position: 6, rawName: "Yahya ibn Bukayr", slug: "yahya-ibn-bukayr", word: "haddathana" },
//         ],
//       },
//       {
//         identifier: "kafi:1:4:1129",
//         bookTitle: "Al-Kafi",
//         hadithNumber: "Vol 1 Book 4 Hadith 1129",
//         chapter: "Book of Divine Proof (كتاب الحجة)",
//         volume: "1",
//         page: "176",
//         arabicText: "عَلِيُّ بْنُ إِبْرَاهِيمَ، عَنْ أَبِيهِ، عَنِ ابْنِ أَبِي عُمَيْرٍ، عَنْ هِشَامِ بْنِ سَالِمٍ، عَنْ زُرَارَةَ، قَالَ: قُلْتُ لِأَبِي عَبْدِ اللَّهِ (عَلَيْهِ السَّلَامُ): كَيْفَ لَمْ يَخَفْ رَسُولُ اللَّهِ (صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ) فِيمَا يَأْتِيهِ مِنْ قِبَلِ اللَّهِ أَنْ يَكُونَ ذَلِكَ مِمَّا يَنْزَغُ بِهِ الشَّيْطَانُ؟ فَقَالَ: «إِنَّ اللَّهَ إِذَا اتَّخَذَ عَبْدًا رَسُولًا أَنْزَلَ عَلَيْهِ السَّكِينَةَ وَالْوَقَارَ، فَكَانَ يَأْتِيهِ مِنْ قِبَلِ اللَّهِ عَزَّ وَجَلَّ مِثْلَ الَّذِي يَرَاهُ بِعَيْنِهِ».",
//         englishText: "Zurarah asked Imam Ja'far al-Sadiq: 'How was the Messenger of Allah immune from fearing that what came to him from Allah might be an evil prompting of Satan?' The Imam replied: 'Indeed, when Allah chooses a servant to be a Messenger, He descends upon him divine tranquility (al-Sakinah) and dignity (al-Waqar), so that what comes to him from Allah is as certain as that which he sees directly with his own eyes.'",
//         translator: "Muhammad Sarwar / Sayyid Muhammad Rizvi",
//         sourceUrl: "https://thaqalayn.net/hadith/1/4/112/1",
//         hadithStatus: "muwaththaq",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "theological_proof"],
//         statusNotes: "Twelver Shia foundational report on prophetic tranquility and certainty.",
//         rawChainText: "علي بن إبراهيم عن أبيه عن ابن أبي عمير عن هشام بن سالم عن زرارة عن أبي عبد الله",
//         nodes: [
//           { position: 1, rawName: "Ja'far al-Sadiq", slug: "jafar-al-sadiq", word: "qala" },
//           { position: 2, rawName: "Zurarah ibn A'yan", slug: "zurarah-ibn-ayan", word: "an" },
//           { position: 3, rawName: "Hisham ibn Salim", slug: "hisham-ibn-salim", word: "an" },
//           { position: 4, rawName: "Muhammad ibn Abi Umayr", slug: "muhammad-ibn-abi-umayr", word: "an" },
//           { position: 5, rawName: "Ibrahim ibn Hashim", slug: "ibrahim-ibn-hashim", word: "an" },
//           { position: 6, rawName: "Ali ibn Ibrahim", slug: "ali-ibn-ibrahim", word: "haddathana" },
//         ],
//         assessments: [
//           { scholarSlug: "al-majlisi", term: "موثق كالصحيح", norm: "muwaththaq", explanation: "Graded reliable like sahih in Mir'at al-Uqul.", score: 96, ref: "Mir'at al-Uqul", vol: "4", page: "298" },
//         ],
//       },
//       {
//         identifier: "nahj:192",
//         bookTitle: "Nahj al-Balagha",
//         hadithNumber: "Sermon 192",
//         chapter: "The Sermon of Disparagement (الخطبة القاصعة)",
//         volume: "1",
//         page: "300",
//         arabicText: "قَالَ أَمِيرُ الْمُؤْمِنِينَ عَلِيُّ بْنُ أَبِي طَالِبٍ (عَلَيْهِ السَّلَامُ): «وَلَقَدْ كَانَ يُجَاوِرُ فِي كُلِّ سَنَةٍ بِحِرَاءَ فَأَرَاهُ وَلاَ يَرَاهُ غَيْرِي، وَلَمْ يَجْمَعْ بَيْتٌ وَاحِدٌ يَوْمَئِذٍ فِي الإِسْلاَمِ غَيْرَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ وَخَدِيجَةَ وَأَنَا ثَالِثُهُمَا، أَرَى نُورَ الْوَحْيِ وَالرِّسَالَةِ، وَأَشُمُّ رِيحَ النُّبُوَّةِ، وَلَقَدْ سَمِعْتُ رَنَّةَ الشَّيْطَانِ حِينَ نَزَلَ الْوَحْيُ عَلَيْهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ...»",
//         englishText: "Amir al-Mu'minin Ali ibn Abi Talib said: 'Every year the Messenger of Allah used to stay in seclusion at Mount Hira where I used to see him while no one else saw him... I used to see the radiant light of Divine Revelation and the Message, and I inhaled the fragrance of Prophethood. I heard the mournful cry of Satan when revelation first descended upon him...'",
//         translator: "Sayyid Ali Rida",
//         sourceUrl: "https://thaqalayn.net/chapter/21/1/192",
//         hadithStatus: "mashhur",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "khutbah", "eyewitness_account"],
//         statusNotes: "Eyewitness narration from Ali ibn Abi Talib at Hira.",
//         rawChainText: "الشريف الرضي عن أمير المؤمنين علي بن أبي طالب",
//         nodes: [
//           { position: 1, rawName: "Ali ibn Abi Talib", slug: "ali-ibn-abi-talib", word: "qala" },
//           { position: 2, rawName: "Al-Sharif al-Radi", slug: "sharif-al-radi", word: "rawahu" },
//         ],
//       },

//       // Day 2: Quranic Descent, Early Verification & Tirmidhi
//       {
//         identifier: "hadeethenc:3068",
//         bookTitle: "HadeethEnc Prophetic Encyclopedia",
//         hadithNumber: "3068",
//         chapter: "General Hadith Encyclopedia - Revelation & Virtues",
//         volume: "1",
//         page: "1",
//         arabicText: "عَنْ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا: أَنَّ أَوَّلَ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ... فَنَزَلَ عَلَيْهِ مَلَكُ الْوَحْيِ بِقَوْلِهِ تَعَالَى: {اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ}.",
//         englishText: "Narrated by Aisha: The commencement of revelation began with righteous dreams during sleep. The Angel of Revelation descended in the Cave of Hira with Surat al-Alaq. Vocabulary analysis of Tahannuth, Falaq al-Subh, and al-Namus.",
//         translator: "HadeethEnc Team",
//         sourceUrl: "https://hadeethenc.com/en/browse/hadith/3068",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "pedagogical_explanation"],
//         statusNotes: "Pedagogical reference with vocabulary analysis.",
//       },
//       {
//         identifier: "bukhari:4953",
//         bookTitle: "Sahih al-Bukhari",
//         hadithNumber: "4953",
//         chapter: "Tafsir of Surat al-Alaq (تفسير سورة العلق)",
//         volume: "6",
//         page: "163",
//         arabicText: "حَدَّثَنَا يَحْيَى، حَدَّثَنَا وَكِيعٌ، عَنِ الأَعْمَشِ، عَنْ إِبْرَاهِيمَ، عَنْ عَلْقَمَةَ، قَالَ: قَالَ عَبْدُ اللَّهِ: كُنْتُ أَرَى النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقْرَأُ بِـ {اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ} وَهِيَ أَوَّلُ سُورَةٍ أُنْزِلَتْ مِنَ الْقُرْآنِ.",
//         englishText: "Narrated Abd Allah ibn Mas'ud: Surat 'Iqra' bi-ismi Rabbika' (Surah al-Alaq 96) was the first chapter of the Holy Quran ever revealed to the Messenger of Allah (ﷺ).",
//         translator: "Dr. Muhammad Muhsin Khan",
//         sourceUrl: "https://sunnah.com/bukhari:4953",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "quran_exegesis"],
//         statusNotes: "Textual proof establishing Surah al-Alaq as the initial Quranic revelation.",
//       },
//       {
//         identifier: "tirmidhi:3632",
//         bookTitle: "Sahih Muslim",
//         hadithNumber: "2353",
//         chapter: "Book of Virtues (كتاب الفضائل - باب مبعث النبي)",
//         volume: "4",
//         page: "1824",
//         arabicText: "حَدَّثَنَا شَيْبَانُ بْنُ فَرُّوخَ، حَدَّثَنَا حَمَّادُ بْنُ سَلَمَةَ، عَنْ ثَابِتٍ، عَنْ أَنَسِ بْنِ مَالِكٍ: أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَتَاهُ جِبْرِيلُ وَهُوَ يَلْعَبُ مَعَ الْغِلْمَانِ، فَأَخَذَهُ فَصَرَعَهُ فَشَقَّ عَنْ قَلْبِهِ... ثُمَّ بَعَثَهُ اللَّهُ عَلَى رَأْسِ أَرْبَعِينَ سَنَةً.",
//         englishText: "Narrated Anas ibn Malik: Gabriel came to the Messenger of Allah (ﷺ)... and Allah formally commissioned him with the Message at the completion of forty years of age.",
//         translator: "Abdul Hamid Siddiqui",
//         sourceUrl: "https://sunnah.com/muslim:2353",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "mabath"],
//         statusNotes: "Report on the timing and circumstances of the prophetic commission.",
//       },
//       {
//         identifier: "kafi:1:4:384",
//         bookTitle: "Al-Kafi",
//         hadithNumber: "Vol 1 Book 4 Hadith 384",
//         chapter: "The Difference between a Messenger, Prophet and Muhaddath (الفرق بين الرسول والنبي والمحدث)",
//         volume: "1",
//         page: "176",
//         arabicText: "مُحَمَّدُ بْنُ يَحْيَى، عَنْ أَحْمَدَ بْنِ مُحَمَّدٍ، عَنِ ابْنِ مَحْبُوبٍ، عَنِ الأَحْوَلِ، قَالَ: سَأَلْتُ أَبَا جَعْفَرٍ (عَلَيْهِ السَّلَامُ) عَنِ الرَّسُولِ وَالنَّبِيِّ، فَقَالَ: «النَّبِيُّ الَّذِي يَرَى فِي مَنَامِهِ وَيَسْمَعُ الصَّوْتَ وَلاَ يُعَايِنُ الْمَلَكَ، وَالرَّسُولُ الَّذِي يَسْمَعُ الصَّوْتَ وَيَرَى فِي الْمَنَامِ وَيُعَايِنُ الْمَلَكَ».",
//         englishText: "Al-Ahwal asked Imam Muhammad al-Baqir (peace be upon him) about the distinction between the Nabi and the Rasul at the beginning of divine revelation: 'The Prophet is one who sees in his dream and hears the voice but does not physically encounter the Angel, while the Messenger is one who hears the voice, sees in dreams, and directly witnesses the Angel.'",
//         translator: "Muhammad Sarwar",
//         sourceUrl: "https://thaqalayn.net/hadith/1/4/3/1",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "theological_proof"],
//         statusNotes: "Theological clarification on the transition from dreams to direct angelic apparition at Hira.",
//       },
//       {
//         identifier: "bukhari:6982",
//         bookTitle: "Sahih al-Bukhari",
//         hadithNumber: "6982",
//         chapter: "Book of Interpretation of Dreams (كتاب التعبير)",
//         volume: "9",
//         page: "38",
//         arabicText: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، حَدَّثَنَا اللَّيْثُ، حَدَّثَنِي عُقَيْلٌ، عَنِ ابْنِ شِهَابٍ، سَمِعْتُ عُرْوَةَ، قَالَ: قَالَتْ عَائِشَةُ: فَقَالَ وَرَقَةُ: «هَذَا النَّامُوسُ الَّذِي أُنْزِلَ عَلَى مُوسَى، لَيْتَنِي فِيهَا جَذَعًا، لَيْتَنِي أَكُونُ حَيًّا حِينَ يُخْرِجُكَ قَوْمُكَ»...",
//         englishText: "Aisha narrated: Waraqah ibn Nawfal said upon hearing the Prophet's account: 'This is the Namus (the Bearer of Divine Revelation) who was sent down upon Moses. Would that I were a young man! Would that I were alive when your people expel you!'",
//         translator: "Dr. Muhammad Muhsin Khan",
//         sourceUrl: "https://sunnah.com/bukhari:6982",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "waraqa_testimony"],
//         statusNotes: "Explicit testimony linking the revelation at Hira to the prophetic chain of Moses.",
//       },

//       // Day 3: Resumption of Revelation & Angelic Vision
//       {
//         identifier: "muslim:161a",
//         bookTitle: "Sahih Muslim",
//         hadithNumber: "161a",
//         chapter: "Book of Faith - Intermission of Revelation (كتاب الإيمان - باب فترة الوحي)",
//         volume: "1",
//         page: "143",
//         arabicText: "حَدَّثَنَا مُحَمَّدُ بْنُ رَافِعٍ، حَدَّثَنَا عَبْدُ الرَّزَّاقِ، أَخْبَرَنَا مَعْمَرٌ، عَنِ الزُّهْرِيِّ، قَالَ: سَمِعْتُ أَبَا سَلَمَةَ، قَالَ: أَخْبَرَنِي جَابِرٌ: سَمِعْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يُحَدِّثُ عَنْ فَتْرَةِ الْوَحْيِ: «فَبَيْنَا أَنَا أَمْشِي سَمِعْتُ صَوْتًا، فَإِذَا الْمَلَكُ جَالِسٌ بَيْنَ السَّمَاءِ وَالأَرْضِ...»",
//         englishText: "Jabir reported from the Prophet (ﷺ) regarding the pause in revelation: 'While walking I heard a voice, and behold! The Angel who visited me at Hira was seated between heaven and earth on a throne...'",
//         translator: "Abdul Hamid Siddiqui",
//         sourceUrl: "https://sunnah.com/muslim:161a",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "fatrat_al_wahy"],
//         statusNotes: "Ma'mar transmission from al-Zuhri.",
//       },
//       {
//         identifier: "hadeethenc:3201",
//         bookTitle: "HadeethEnc Prophetic Encyclopedia",
//         hadithNumber: "3201",
//         chapter: "General Hadith Encyclopedia - Surah al-Muddaththir",
//         volume: "1",
//         page: "2",
//         arabicText: "عَنْ جَابِرِ بْنِ عَبْدِ اللَّهِ رَضِيَ اللَّهُ عَنْهُمَا: أَنَّ أَوَّلَ مَا نَزَلَ بَعْدَ فَتْرَةِ الْوَحْيِ: {يَا أَيُّهَا الْمُدَّثِّرُ * قُمْ فَأَنْذِرْ}.",
//         englishText: "Narrated by Jabir ibn Abd Allah: The very first portion revealed after the pause of revelation was Surah al-Muddaththir ('O you who covers himself [with a garment], arise and warn').",
//         translator: "HadeethEnc Team",
//         sourceUrl: "https://hadeethenc.com/en/browse/hadith/3201",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "pedagogical_explanation"],
//         statusNotes: "Authentic report detailing the initiation of the public preaching phase.",
//       },
//       {
//         identifier: "bukhari:3392",
//         bookTitle: "Sahih al-Bukhari",
//         hadithNumber: "3392",
//         chapter: "Stories of the Prophets (كتاب أحاديث الأنبياء)",
//         volume: "4",
//         page: "135",
//         arabicText: "حَدَّثَنَا مُوسَى بْنُ إِسْمَاعِيلَ، حَدَّثَنَا هَمَّامٌ، عَنْ يَحْيَى، عَنْ أَبِي سَلَمَةَ، قَالَ: سَأَلْتُ جَابِرَ بْنَ عَبْدِ اللَّهِ: أَيُّ الْقُرْآنِ أُنْزِلَ أَوَّلَ؟ فَقَالَ: {يَا أَيُّهَا الْمُدَّثِّرُ}. قُلْتُ: أَوْ {اقْرَأْ}؟ قَالَ: أُحَدِّثُكُمْ مَا حَدَّثَنَا رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «إِنِّي جَاوَرْتُ بِحِرَاءٍ...»",
//         englishText: "Abu Salama asked Jabir: 'Which was revealed first?' Jabir replied: 'Surah al-Muddaththir.' Abu Salama said: 'Or {Read in the name of your Lord}?' Jabir said: 'I tell you what the Prophet told us: 'I stayed in Hira...'' [Reconciled by scholars: Iqra was first for Prophethood, al-Muddaththir first for Messengership and Warning].",
//         translator: "Dr. Muhammad Muhsin Khan",
//         sourceUrl: "https://sunnah.com/bukhari:3392",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "scholarly_reconciliation"],
//         statusNotes: "Classical hadith on the order of initial Quranic revelations.",
//       },
//       {
//         identifier: "tirmidhi:3633",
//         bookTitle: "Al-Kafi",
//         hadithNumber: "Vol 8 Hadith 234",
//         chapter: "Rawdat al-Kafi - Seclusion at Mount Nur (روضة الكافي - خلوة جبل النور)",
//         volume: "8",
//         page: "189",
//         arabicText: "عَلِيُّ بْنُ إِبْرَاهِيمَ، عَنْ أَبِيهِ، عَنْ عَمْرِو بْنِ عُثْمَانَ، عَنْ عَلِيِّ بْنِ عِيسَى، عَنْ عَمِّهِ، عَنْ أَبِي عَبْدِ اللَّهِ (عَلَيْهِ السَّلَامُ)، قَالَ: «كَانَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ قَبْلَ الْبِعْثَةِ يَرَى الأَنْوَارَ وَيَسْمَعُ النِّدَاءَ مِنْ حِجَارَةِ مَكَّةَ وَأَشْجَارِهَا: السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، فَيَظُنُّ أَنَّهُ مِنْ نَفْسِهِ حَتَّى كَاشَفَهُ جِبْرِيلُ بِالرِّسَالَةِ».",
//         englishText: "Imam Ja'far al-Sadiq (peace be upon him) said: 'Prior to his mission, the Messenger of Allah (peace and blessings be upon him and his family) used to see divine lights and hear the greeting from the stones and trees of Makkah saying: Peace be upon you, O Messenger of Allah, until Gabriel unveiled to him the Message.'",
//         translator: "Sayyid Muhammad Rizvi",
//         sourceUrl: "https://thaqalayn.net/hadith/8/1/234/1",
//         hadithStatus: "hasan",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "pre_revelation_signs"],
//         statusNotes: "Twelver Shia narration on the miraculous signs preceding the descent of Gabriel.",
//       },
//       {
//         identifier: "shamela:musnad:2408",
//         bookTitle: "Sahih al-Bukhari",
//         hadithNumber: "4955",
//         chapter: "Virtues of the Quran (فضائل القرآن)",
//         volume: "6",
//         page: "184",
//         arabicText: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، حَدَّثَنَا اللَّيْثُ، عَنْ سَعِيدٍ الْمَقْبُرِيِّ، عَنْ أَبِي هُرَيْرَةَ: قَالَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَا مِنَ الأَنْبِيَاءِ نَبِيٌّ إِلاَّ أُعْطِيَ مِنَ الآيَاتِ مَا مِثْلُهُ آمَنَ عَلَيْهِ الْبَشَرُ، وَإِنَّمَا كَانَ الَّذِي أُوتِيتُهُ وَحْيًا أَوْحَاهُ اللَّهُ إِلَيَّ، فَأَرْجُو أَنْ أَكُونَ أَكْثَرَهُمْ تَابِعًا يَوْمَ الْقِيَامَةِ».",
//         englishText: "Narrated Abu Hurayrah: The Prophet (ﷺ) said: 'Every Prophet was given miracles because of which people believed, but what I have been given is Divine Inspiration (Wahy) which Allah revealed to me. So I hope that I will have the greatest number of followers on the Day of Resurrection.'",
//         translator: "Dr. Muhammad Muhsin Khan",
//         sourceUrl: "https://sunnah.com/bukhari:4955",
//         hadithStatus: "sahih",
//         chainStatus: "muttasil",
//         narrationStatus: ["marfu", "ahad", "first_wahi", "prophetic_miracle"],
//         statusNotes: "Foundational declaration on the nature of prophetic revelation as the supreme eternal miracle.",
//       },
//     ],
//   },
// };

// export function getTopicDefinition(slug: string): TopicDefinition | null {
//   return TOPICS_REGISTRY[slug] ?? null;
// }

// export function getAllTopicDefinitions(): TopicDefinition[] {
//   return Object.values(TOPICS_REGISTRY);
// }

// export function registerCustomTopic(topic: TopicDefinition) {
//   TOPICS_REGISTRY[topic.slug] = topic;
// }
import { TopicDefinition as NewTopicDefinition, CandidateAssessment } from "./fetchers/types";

export interface CandidateNarratorNode {
  position: number;
  rawName: string;
  slug?: string;
  word?: string;
}

export interface HadithCandidate {
  identifier: string; // Unique key e.g. "bukhari:3"
  bookTitle: string;
  hadithNumber: string;
  chapter: string;
  volume?: string;
  page?: string;
  arabicText: string;
  englishText: string;
  translator?: string;
  sourceUrl?: string;
  hadithStatus: string;
  chainStatus: string;
  narrationStatus: string[];
  statusNotes?: string;
  rawChainText?: string;
  nodes?: CandidateNarratorNode[];
  assessments?: CandidateAssessment[];
}

export type TopicDefinition = NewTopicDefinition & {
  hadithCandidates?: HadithCandidate[];
};

// Built-in topics registry
export const TOPICS_REGISTRY: Record<string, TopicDefinition> = {
  "first-wahi": {
    slug: "first-wahi",
    title: "The Beginning of Revelation (First Wahi at Cave Hira)",
    arabicTitle: "بدء الوحي ونزول القرآن في غار حراء",
    description: "Cross-traditional narrations on the commencement of revelation in Cave Hira, the first verses of Surah al-Alaq (96:1-5), the pause of revelation (Fatrat al-Wahy), Surah al-Muddaththir, and classical accounts of certainty and tranquility.",
    keywords: ["first-wahi", "revelation", "hira", "gabriel", "iqra", "alaq", "muddaththir", "khadijah", "waraqa", "sakinah"],
    searchQueries: {
      arabic: ["غار حراء", "بدء الوحي", "اقرأ باسم ربك", "يا أيها المدثر", "فترة الوحي"],
      english: ["cave hira", "first revelation", "gabriel", "waraqa", "read in the name"]
    },
    expandedKeywords: ["khadijah", "sakinah", "jibril", "namus", "tahannuth"],
    hadithCandidates: [
      // Day 1: Foundational Canonical Accounts
      {
        identifier: "bukhari:3",
        bookTitle: "Sahih al-Bukhari",
        hadithNumber: "3",
        chapter: "Book of Revelation (كتاب بدء الوحي)",
        volume: "1",
        page: "2",
        arabicText: "حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ، قَالَ: حَدَّثَنَا اللَّيْثُ، عَنْ عُقَيْلٍ، عَنِ ابْنِ شِهَابٍ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ أَنَّهَا قَالَتْ: أَوَّلُ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ، فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ، ثُمَّ حُبِّبَ إِلَيْهِ الْخَلاَءُ، وَكَانَ يَخْلُو بِغَارِ حِرَاءٍ فَيَتَحَنَّثُ فِيهِ ـ وَهُوَ التَّعَبُّدُ ـ اللَّيَالِيَ ذَوَاتِ الْعَدَدِ قَبْلَ أَنْ يَنْزِعَ إِلَى أَهْلِهِ، وَيَتَزَوَّدُ لِذَلِكَ، ثُمَّ يَرْجِعُ إِلَى خَدِيجَةَ فَيَتَزَوَّدُ لِمِثْلِهَا، حَتَّى جَاءَهُ الْحَقُّ وَهُوَ فِي غَارِ حِرَاءٍ، فَجَاءَهُ الْمَلَكُ فَقَالَ: اقْرَأْ. قَالَ: «مَا أَنَا بِقَارِئٍ»...",
        englishText: "Narrated Aisha (the mother of the faithful believers): The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good righteous dreams in his sleep. He never had a dream but that it came true like bright daylight. He was also endowed with the love of seclusion in the Cave of Hira...",
        translator: "Dr. Muhammad Muhsin Khan",
        sourceUrl: "https://sunnah.com/bukhari:3",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi"],
        statusNotes: "Canonical opening hadith of Sahih al-Bukhari.",
        rawChainText: "حدثنا يحيى بن بكير حدثنا الليث عن عقيل عن ابن شهاب عن عروة بن الزبير عن عائشة أم المؤمنين",
        nodes: [
          { position: 1, rawName: "Aisha bint Abi Bakr", slug: "aisha-bint-abi-bakr", word: "an" },
          { position: 2, rawName: "Urwah ibn al-Zubayr", slug: "urwah-ibn-al-zubayr", word: "an" },
          { position: 3, rawName: "Ibn Shihab al-Zuhri", slug: "ibn-shihab-al-zuhri", word: "an" },
          { position: 4, rawName: "Uqayl ibn Khalid", slug: "uqayl-ibn-khalid", word: "an" },
          { position: 5, rawName: "Al-Layth ibn Sa'd", slug: "al-layth-ibn-sad", word: "haddathana" },
          { position: 6, rawName: "Yahya ibn Bukayr", slug: "yahya-ibn-bukayr", word: "haddathana" },
        ],
        assessments: [
          { scholarName: "Ibn Hajar al-Asqalani", scholarSlug: "ibn-hajar", originalGrade: "صحيح", normalizedGrade: "sahih", explanation: "Opening hadith of the Sahih collection.", score: 99, referenceBook: "Fath al-Bari" },
        ],
      },
      {
        identifier: "muslim:160a",
        bookTitle: "Sahih Muslim",
        hadithNumber: "160a",
        chapter: "Book of Faith (كتاب الإيمان)",
        volume: "1",
        page: "139",
        arabicText: "حَدَّثَنِي أَبُو الطَّاهِرِ أَحْمَدُ بْنُ عَمْرِو بْنِ سَرْحٍ، حَدَّثَنَا ابْنُ وَهْبٍ، قَالَ: أَخْبَرَنِي يُونُسُ، عَنِ ابْنِ شِهَابٍ، قَالَ: حَدَّثَنِي عُرْوَةُ بْنُ الزُّبَيْرِ، أَنَّ عَائِشَةَ زَوْجَ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَخْبَرَتْهُ أَنَّهَا قَالَتْ: كَانَ أَوَّلَ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّادِقَةُ فِي النَّوْمِ، فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ...",
        englishText: "Aisha reported: The beginning of Divine Revelation to the Messenger of Allah (ﷺ) was in the form of true dreams during sleep. He saw no dream but it came like the breaking of the dawn. Then seclusion was endeared to him in the Cave of Hira...",
        translator: "Abdul Hamid Siddiqui",
        sourceUrl: "https://sunnah.com/muslim:160a",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi"],
        statusNotes: "Transmitted through Ibn Wahb and Yunus ibn Yazid from al-Zuhri.",
        rawChainText: "حدثني أبو الطاهر أحمد بن عمرو بن سرح حدثنا ابن وهب أخبرني يونس عن ابن شهاب حدثني عروة بن الزبير عن عائشة",
        nodes: [
          { position: 1, rawName: "Aisha bint Abi Bakr", slug: "aisha-bint-abi-bakr", word: "akhbarat" },
          { position: 2, rawName: "Urwah ibn al-Zubayr", slug: "urwah-ibn-al-zubayr", word: "haddathani" },
          { position: 3, rawName: "Ibn Shihab al-Zuhri", slug: "ibn-shihab-al-zuhri", word: "an" },
          { position: 4, rawName: "Yunus ibn Yazid", slug: "yunus-ibn-yazid", word: "akhbarani" },
          { position: 5, rawName: "Abd Allah ibn Wahb", slug: "abdullah-ibn-wahb", word: "haddathana" },
          { position: 6, rawName: "Abu al-Tahir ibn Sarh", slug: "abu-al-tahir-ibn-sarh", word: "haddathani" },
        ],
      },
      {
        identifier: "bukhari:4",
        bookTitle: "Sahih al-Bukhari",
        hadithNumber: "4",
        chapter: "Book of Revelation - Intermission (فترة الوحي)",
        volume: "1",
        page: "3",
        arabicText: "حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ، حَدَّثَنَا اللَّيْثُ، عَنْ عُقَيْلٍ، عَنِ ابْنِ شِهَابٍ، قَالَ: سَمِعْتُ أَبَا سَلَمَةَ بْنَ عَبْدِ الرَّحْمَنِ، يَقُولُ: أَخْبَرَنِي جَابِرُ بْنُ عَبْدِ اللَّهِ الأَنْصَارِيُّ، وَهُوَ يُحَدِّثُ عَنْ فَتْرَةِ الْوَحْيِ، فَقَالَ فِي حَدِيثِهِ: «بَيْنَا أَنَا أَمْشِي إِذْ سَمِعْتُ صَوْتًا مِنَ السَّمَاءِ، فَرَفَعْتُ بَصَرِي فَإِذَا الْمَلَكُ الَّذِي جَاءَنِي بِحِرَاءٍ جَالِسٌ عَلَى كُرْسِيٍّ بَيْنَ السَّمَاءِ وَالأَرْضِ، فَرُعِبْتُ مِنْهُ، فَرَجَعْتُ فَقُلْتُ: زَمِّلُونِي زَمِّلُونِي. فَأَنْزَلَ اللَّهُ تَعَالَى: {يَا أَيُّهَا الْمُدَّثِّرُ * قُمْ فَأَنْذِرْ}...»",
        englishText: "Narrated Jabir ibn Abd Allah: The Prophet (ﷺ) said while speaking of the interval of revelation: 'While I was walking, I suddenly heard a voice from the sky. I looked up and saw the very same Angel who had visited me at Hira sitting on a chair between the sky and the earth...'",
        translator: "Dr. Muhammad Muhsin Khan",
        sourceUrl: "https://sunnah.com/bukhari:4",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "fatrat_al_wahy"],
        statusNotes: "Resumption of revelation with Surah al-Muddaththir.",
        rawChainText: "حدثنا يحيى بن بكير حدثنا الليث عن عقيل عن ابن شهاب سمعت أبا سلمة عن جابر بن عبد الله",
        nodes: [
          { position: 1, rawName: "Jabir ibn Abd Allah", slug: "jabir-ibn-abdullah", word: "akhbarani" },
          { position: 2, rawName: "Abu Salama ibn Abd al-Rahman", slug: "abu-salama-ibn-abd-al-rahman", word: "qala" },
          { position: 3, rawName: "Ibn Shihab al-Zuhri", slug: "ibn-shihab-al-zuhri", word: "an" },
          { position: 4, rawName: "Uqayl ibn Khalid", slug: "uqayl-ibn-khalid", word: "an" },
          { position: 5, rawName: "Al-Layth ibn Sa'd", slug: "al-layth-ibn-sad", word: "haddathana" },
          { position: 6, rawName: "Yahya ibn Bukayr", slug: "yahya-ibn-bukayr", word: "haddathana" },
        ],
      },
      {
        identifier: "kafi:1:4:1129",
        bookTitle: "Al-Kafi",
        hadithNumber: "Vol 1 Book 4 Hadith 1129",
        chapter: "Book of Divine Proof (كتاب الحجة)",
        volume: "1",
        page: "176",
        arabicText: "عَلِيُّ بْنُ إِبْرَاهِيمَ، عَنْ أَبِيهِ، عَنِ ابْنِ أَبِي عُمَيْرٍ، عَنْ هِشَامِ بْنِ سَالِمٍ، عَنْ زُرَارَةَ، قَالَ: قُلْتُ لِأَبِي عَبْدِ اللَّهِ (عَلَيْهِ السَّلَامُ): كَيْفَ لَمْ يَخَفْ رَسُولُ اللَّهِ (صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ) فِيمَا يَأْتِيهِ مِنْ قِبَلِ اللَّهِ أَنْ يَكُونَ ذَلِكَ مِمَّا يَنْزَغُ بِهِ الشَّيْطَانُ؟ فَقَالَ: «إِنَّ اللَّهَ إِذَا اتَّخَذَ عَبْدًا رَسُولًا أَنْزَلَ عَلَيْهِ السَّكِينَةَ وَالْوَقَارَ، فَكَانَ يَأْتِيهِ مِنْ قِبَلِ اللَّهِ عَزَّ وَجَلَّ مِثْلَ الَّذِي يَرَاهُ بِعَيْنِهِ».",
        englishText: "Zurarah asked Imam Ja'far al-Sadiq: 'How was the Messenger of Allah immune from fearing that what came to him from Allah might be an evil prompting of Satan?' The Imam replied: 'Indeed, when Allah chooses a servant to be a Messenger, He descends upon him divine tranquility (al-Sakinah) and dignity (al-Waqar), so that what comes to him from Allah is as certain as that which he sees directly with his own eyes.'",
        translator: "Muhammad Sarwar / Sayyid Muhammad Rizvi",
        sourceUrl: "https://thaqalayn.net/hadith/1/4/112/1",
        hadithStatus: "muwaththaq",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "theological_proof"],
        statusNotes: "Twelver Shia foundational report on prophetic tranquility and certainty.",
        rawChainText: "علي بن إبراهيم عن أبيه عن ابن أبي عمير عن هشام بن سالم عن زرارة عن أبي عبد الله",
        nodes: [
          { position: 1, rawName: "Ja'far al-Sadiq", slug: "jafar-al-sadiq", word: "qala" },
          { position: 2, rawName: "Zurarah ibn A'yan", slug: "zurarah-ibn-ayan", word: "an" },
          { position: 3, rawName: "Hisham ibn Salim", slug: "hisham-ibn-salim", word: "an" },
          { position: 4, rawName: "Muhammad ibn Abi Umayr", slug: "muhammad-ibn-abi-umayr", word: "an" },
          { position: 5, rawName: "Ibrahim ibn Hashim", slug: "ibrahim-ibn-hashim", word: "an" },
          { position: 6, rawName: "Ali ibn Ibrahim", slug: "ali-ibn-ibrahim", word: "haddathana" },
        ],
        assessments: [
          { scholarName: "Al-Majlisi", scholarSlug: "al-majlisi", originalGrade: "موثق كالصحيح", normalizedGrade: "muwaththaq", explanation: "Graded reliable like sahih in Mir'at al-Uqul.", score: 96, referenceBook: "Mir'at al-Uqul", volume: "4", page: "298" },
        ],
      },
      {
        identifier: "nahj:192",
        bookTitle: "Nahj al-Balagha",
        hadithNumber: "Sermon 192",
        chapter: "The Sermon of Disparagement (الخطبة القاصعة)",
        volume: "1",
        page: "300",
        arabicText: "قَالَ أَمِيرُ الْمُؤْمِنِينَ عَلِيُّ بْنُ أَبِي طَالِبٍ (عَلَيْهِ السَّلَامُ): «وَلَقَدْ كَانَ يُجَاوِرُ فِي كُلِّ سَنَةٍ بِحِرَاءَ فَأَرَاهُ وَلاَ يَرَاهُ غَيْرِي، وَلَمْ يَجْمَعْ بَيْتٌ وَاحِدٌ يَوْمَئِذٍ فِي الإِسْلاَمِ غَيْرَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ وَخَدِيجَةَ وَأَنَا ثَالِثُهُمَا، أَرَى نُورَ الْوَحْيِ وَالرِّسَالَةِ، وَأَشُمُّ رِيحَ النُّبُوَّةِ، وَلَقَدْ سَمِعْتُ رَنَّةَ الشَّيْطَانِ حِينَ نَزَلَ الْوَحْيُ عَلَيْهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ...»",
        englishText: "Amir al-Mu'minin Ali ibn Abi Talib said: 'Every year the Messenger of Allah used to stay in seclusion at Mount Hira where I used to see him while no one else saw him... I used to see the radiant light of Divine Revelation and the Message, and I inhaled the fragrance of Prophethood. I heard the mournful cry of Satan when revelation first descended upon him...'",
        translator: "Sayyid Ali Rida",
        sourceUrl: "https://thaqalayn.net/chapter/21/1/192",
        hadithStatus: "mashhur",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "khutbah", "eyewitness_account"],
        statusNotes: "Eyewitness narration from Ali ibn Abi Talib at Hira.",
        rawChainText: "الشريف الرضي عن أمير المؤمنين علي بن أبي طالب",
        nodes: [
          { position: 1, rawName: "Ali ibn Abi Talib", slug: "ali-ibn-abi-talib", word: "qala" },
          { position: 2, rawName: "Al-Sharif al-Radi", slug: "sharif-al-radi", word: "rawahu" },
        ],
      },

      // Day 2: Quranic Descent, Early Verification & Tirmidhi
      {
        identifier: "hadeethenc:3068",
        bookTitle: "HadeethEnc Prophetic Encyclopedia",
        hadithNumber: "3068",
        chapter: "General Hadith Encyclopedia - Revelation & Virtues",
        volume: "1",
        page: "1",
        arabicText: "عَنْ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا: أَنَّ أَوَّلَ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ... فَنَزَلَ عَلَيْهِ مَلَكُ الْوَحْيِ بِقَوْلِهِ تَعَالَى: {اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ}.",
        englishText: "Narrated by Aisha: The commencement of revelation began with righteous dreams during sleep. The Angel of Revelation descended in the Cave of Hira with Surat al-Alaq. Vocabulary analysis of Tahannuth, Falaq al-Subh, and al-Namus.",
        translator: "HadeethEnc Team",
        sourceUrl: "https://hadeethenc.com/en/browse/hadith/3068",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "pedagogical_explanation"],
        statusNotes: "Pedagogical reference with vocabulary analysis.",
      },
      {
        identifier: "bukhari:4953",
        bookTitle: "Sahih al-Bukhari",
        hadithNumber: "4953",
        chapter: "Tafsir of Surat al-Alaq (تفسير سورة العلق)",
        volume: "6",
        page: "163",
        arabicText: "حَدَّثَنَا يَحْيَى، حَدَّثَنَا وَكِيعٌ، عَنِ الأَعْمَشِ، عَنْ إِبْرَاهِيمَ، عَنْ عَلْقَمَةَ، قَالَ: قَالَ عَبْدُ اللَّهِ: كُنْتُ أَرَى النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقْرَأُ بِـ {اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ} وَهِيَ أَوَّلُ سُورَةٍ أُنْزِلَتْ مِنَ الْقُرْآنِ.",
        englishText: "Narrated Abd Allah ibn Mas'ud: Surat 'Iqra' bi-ismi Rabbika' (Surah al-Alaq 96) was the first chapter of the Holy Quran ever revealed to the Messenger of Allah (ﷺ).",
        translator: "Dr. Muhammad Muhsin Khan",
        sourceUrl: "https://sunnah.com/bukhari:4953",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "quran_exegesis"],
        statusNotes: "Textual proof establishing Surah al-Alaq as the initial Quranic revelation.",
      },
      {
        identifier: "tirmidhi:3632",
        bookTitle: "Sahih Muslim",
        hadithNumber: "2353",
        chapter: "Book of Virtues (كتاب الفضائل - باب مبعث النبي)",
        volume: "4",
        page: "1824",
        arabicText: "حَدَّثَنَا شَيْبَانُ بْنُ فَرُّوخَ، حَدَّثَنَا حَمَّادُ بْنُ سَلَمَةَ، عَنْ ثَابِتٍ، عَنْ أَنَسِ بْنِ مَالِكٍ: أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَتَاهُ جِبْرِيلُ وَهُوَ يَلْعَبُ مَعَ الْغِلْمَانِ، فَأَخَذَهُ فَصَرَعَهُ فَشَقَّ عَنْ قَلْبِهِ... ثُمَّ بَعَثَهُ اللَّهُ عَلَى رَأْسِ أَرْبَعِينَ سَنَةً.",
        englishText: "Narrated Anas ibn Malik: Gabriel came to the Messenger of Allah (ﷺ)... and Allah formally commissioned him with the Message at the completion of forty years of age.",
        translator: "Abdul Hamid Siddiqui",
        sourceUrl: "https://sunnah.com/muslim:2353",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "mabath"],
        statusNotes: "Report on the timing and circumstances of the prophetic commission.",
      },
      {
        identifier: "kafi:1:4:384",
        bookTitle: "Al-Kafi",
        hadithNumber: "Vol 1 Book 4 Hadith 384",
        chapter: "The Difference between a Messenger, Prophet and Muhaddath (الفرق بين الرسول والنبي والمحدث)",
        volume: "1",
        page: "176",
        arabicText: "مُحَمَّدُ بْنُ يَحْيَى، عَنْ أَحْمَدَ بْنِ مُحَمَّدٍ، عَنِ ابْنِ مَحْبُوبٍ، عَنِ الأَحْوَلِ، قَالَ: سَأَلْتُ أَبَا جَعْفَرٍ (عَلَيْهِ السَّلَامُ) عَنِ الرَّسُولِ وَالنَّبِيِّ، فَقَالَ: «النَّبِيُّ الَّذِي يَرَى فِي مَنَامِهِ وَيَسْمَعُ الصَّوْتَ وَلاَ يُعَايِنُ الْمَلَكَ، وَالرَّسُولُ الَّذِي يَسْمَعُ الصَّوْتَ وَيَرَى فِي الْمَنَامِ وَيُعَايِنُ الْمَلَكَ».",
        englishText: "Al-Ahwal asked Imam Muhammad al-Baqir (peace be upon him) about the distinction between the Nabi and the Rasul at the beginning of divine revelation: 'The Prophet is one who sees in his dream and hears the voice but does not physically encounter the Angel, while the Messenger is one who hears the voice, sees in dreams, and directly witnesses the Angel.'",
        translator: "Muhammad Sarwar",
        sourceUrl: "https://thaqalayn.net/hadith/1/4/3/1",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "theological_proof"],
        statusNotes: "Theological clarification on the transition from dreams to direct angelic apparition at Hira.",
      },
      {
        identifier: "bukhari:6982",
        bookTitle: "Sahih al-Bukhari",
        hadithNumber: "6982",
        chapter: "Book of Interpretation of Dreams (كتاب التعبير)",
        volume: "9",
        page: "38",
        arabicText: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، حَدَّثَنَا اللَّيْثُ، حَدَّثَنِي عُقَيْلٌ، عَنِ ابْنِ شِهَابٍ، سَمِعْتُ عُرْوَةَ، قَالَ: قَالَتْ عَائِشَةُ: فَقَالَ وَرَقَةُ: «هَذَا النَّامُوسُ الَّذِي أُنْزِلَ عَلَى مُوسَى، لَيْتَنِي فِيهَا جَذَعًا، لَيْتَنِي أَكُونُ حَيًّا حِينَ يُخْرِجُكَ قَوْمُكَ»...",
        englishText: "Aisha narrated: Waraqah ibn Nawfal said upon hearing the Prophet's account: 'This is the Namus (the Bearer of Divine Revelation) who was sent down upon Moses. Would that I were a young man! Would that I were alive when your people expel you!'",
        translator: "Dr. Muhammad Muhsin Khan",
        sourceUrl: "https://sunnah.com/bukhari:6982",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "waraqa_testimony"],
        statusNotes: "Explicit testimony linking the revelation at Hira to the prophetic chain of Moses.",
      },

      // Day 3: Resumption of Revelation & Angelic Vision
      {
        identifier: "muslim:161a",
        bookTitle: "Sahih Muslim",
        hadithNumber: "161a",
        chapter: "Book of Faith - Intermission of Revelation (كتاب الإيمان - باب فترة الوحي)",
        volume: "1",
        page: "143",
        arabicText: "حَدَّثَنَا مُحَمَّدُ بْنُ رَافِعٍ، حَدَّثَنَا عَبْدُ الرَّزَّاقِ، أَخْبَرَنَا مَعْمَرٌ، عَنِ الزُّهْرِيِّ، قَالَ: سَمِعْتُ أَبَا سَلَمَةَ، قَالَ: أَخْبَرَنِي جَابِرٌ: سَمِعْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يُحَدِّثُ عَنْ فَتْرَةِ الْوَحْيِ: «فَبَيْنَا أَنَا أَمْشِي سَمِعْتُ صَوْتًا، فَإِذَا الْمَلَكُ جَالِسٌ بَيْنَ السَّمَاءِ وَالأَرْضِ...»",
        englishText: "Jabir reported from the Prophet (ﷺ) regarding the pause in revelation: 'While walking I heard a voice, and behold! The Angel who visited me at Hira was seated between heaven and earth on a throne...'",
        translator: "Abdul Hamid Siddiqui",
        sourceUrl: "https://sunnah.com/muslim:161a",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "fatrat_al_wahy"],
        statusNotes: "Ma'mar transmission from al-Zuhri.",
      },
      {
        identifier: "hadeethenc:3201",
        bookTitle: "HadeethEnc Prophetic Encyclopedia",
        hadithNumber: "3201",
        chapter: "General Hadith Encyclopedia - Surah al-Muddaththir",
        volume: "1",
        page: "2",
        arabicText: "عَنْ جَابِرِ بْنِ عَبْدِ اللَّهِ رَضِيَ اللَّهُ عَنْهُمَا: أَنَّ أَوَّلَ مَا نَزَلَ بَعْدَ فَتْرَةِ الْوَحْيِ: {يَا أَيُّهَا الْمُدَّثِّرُ * قُمْ فَأَنْذِرْ}.",
        englishText: "Narrated by Jabir ibn Abd Allah: The very first portion revealed after the pause of revelation was Surah al-Muddaththir ('O you who covers himself [with a garment], arise and warn').",
        translator: "HadeethEnc Team",
        sourceUrl: "https://hadeethenc.com/en/browse/hadith/3201",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "pedagogical_explanation"],
        statusNotes: "Authentic report detailing the initiation of the public preaching phase.",
      },
      {
        identifier: "bukhari:3392",
        bookTitle: "Sahih al-Bukhari",
        hadithNumber: "3392",
        chapter: "Stories of the Prophets (كتاب أحاديث الأنبياء)",
        volume: "4",
        page: "135",
        arabicText: "حَدَّثَنَا مُوسَى بْنُ إِسْمَاعِيلَ، حَدَّثَنَا هَمَّامٌ، عَنْ يَحْيَى، عَنْ أَبِي سَلَمَةَ، قَالَ: سَأَلْتُ جَابِرَ بْنَ عَبْدِ اللَّهِ: أَيُّ الْقُرْآنِ أُنْزِلَ أَوَّلَ؟ فَقَالَ: {يَا أَيُّهَا الْمُدَّثِّرُ}. قُلْتُ: أَوْ {اقْرَأْ}؟ قَالَ: أُحَدِّثُكُمْ مَا حَدَّثَنَا رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «إِنِّي جَاوَرْتُ بِحِرَاءٍ...»",
        englishText: "Abu Salama asked Jabir: 'Which was revealed first?' Jabir replied: 'Surah al-Muddaththir.' Abu Salama said: 'Or {Read in the name of your Lord}?' Jabir said: 'I tell you what the Prophet told us: 'I stayed in Hira...'' [Reconciled by scholars: Iqra was first for Prophethood, al-Muddaththir first for Messengership and Warning].",
        translator: "Dr. Muhammad Muhsin Khan",
        sourceUrl: "https://sunnah.com/bukhari:3392",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "scholarly_reconciliation"],
        statusNotes: "Classical hadith on the order of initial Quranic revelations.",
      },
      {
        identifier: "tirmidhi:3633",
        bookTitle: "Al-Kafi",
        hadithNumber: "Vol 8 Hadith 234",
        chapter: "Rawdat al-Kafi - Seclusion at Mount Nur (روضة الكافي - خلوة جبل النور)",
        volume: "8",
        page: "189",
        arabicText: "عَلِيُّ بْنُ إِبْرَاهِيمَ، عَنْ أَبِيهِ، عَنْ عَمْرِو بْنِ عُثْمَانَ، عَنْ عَلِيِّ بْنِ عِيسَى، عَنْ عَمِّهِ، عَنْ أَبِي عَبْدِ اللَّهِ (عَلَيْهِ السَّلَامُ)، قَالَ: «كَانَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ قَبْلَ الْبِعْثَةِ يَرَى الأَنْوَارَ وَيَسْمَعُ النِّدَاءَ مِنْ حِجَارَةِ مَكَّةَ وَأَشْجَارِهَا: السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، فَيَظُنُّ أَنَّهُ مِنْ نَفْسِهِ حَتَّى كَاشَفَهُ جِبْرِيلُ بِالرِّسَالَةِ».",
        englishText: "Imam Ja'far al-Sadiq (peace be upon him) said: 'Prior to his mission, the Messenger of Allah (peace and blessings be upon him and his family) used to see divine lights and hear the greeting from the stones and trees of Makkah saying: Peace be upon you, O Messenger of Allah, until Gabriel unveiled to him the Message.'",
        translator: "Sayyid Muhammad Rizvi",
        sourceUrl: "https://thaqalayn.net/hadith/8/1/234/1",
        hadithStatus: "hasan",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "pre_revelation_signs"],
        statusNotes: "Twelver Shia narration on the miraculous signs preceding the descent of Gabriel.",
      },
      {
        identifier: "shamela:musnad:2408",
        bookTitle: "Sahih al-Bukhari",
        hadithNumber: "4955",
        chapter: "Virtues of the Quran (فضائل القرآن)",
        volume: "6",
        page: "184",
        arabicText: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ، حَدَّثَنَا اللَّيْثُ، عَنْ سَعِيدٍ الْمَقْبُرِيِّ، عَنْ أَبِي هُرَيْرَةَ: قَالَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَا مِنَ الأَنْبِيَاءِ نَبِيٌّ إِلاَّ أُعْطِيَ مِنَ الآيَاتِ مَا مِثْلُهُ آمَنَ عَلَيْهِ الْبَشَرُ، وَإِنَّمَا كَانَ الَّذِي أُوتِيتُهُ وَحْيًا أَوْحَاهُ اللَّهُ إِلَيَّ، فَأَرْجُو أَنْ أَكُونَ أَكْثَرَهُمْ تَابِعًا يَوْمَ الْقِيَامَةِ».",
        englishText: "Narrated Abu Hurayrah: The Prophet (ﷺ) said: 'Every Prophet was given miracles because of which people believed, but what I have been given is Divine Inspiration (Wahy) which Allah revealed to me. So I hope that I will have the greatest number of followers on the Day of Resurrection.'",
        translator: "Dr. Muhammad Muhsin Khan",
        sourceUrl: "https://sunnah.com/bukhari:4955",
        hadithStatus: "sahih",
        chainStatus: "muttasil",
        narrationStatus: ["marfu", "ahad", "first_wahi", "prophetic_miracle"],
        statusNotes: "Foundational declaration on the nature of prophetic revelation as the supreme eternal miracle.",
      },
    ],
  },
};

export function getTopicDefinition(slug: string): TopicDefinition | null {
  return TOPICS_REGISTRY[slug] ?? null;
}

export function getAllTopicDefinitions(): TopicDefinition[] {
  return Object.values(TOPICS_REGISTRY);
}

export function registerCustomTopic(topic: TopicDefinition) {
  TOPICS_REGISTRY[topic.slug] = topic;
}