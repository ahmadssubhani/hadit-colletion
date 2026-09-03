-- =============================================================================
-- SEED SCRIPT: The First Revelation (Bad' al-Wahy / First Wahi)
-- Multi-source dataset from Sunnah.com, Thaqalayn, HadeethEnc, Dorar, and Classical References
-- =============================================================================

-- 1. Ensure reference books exist
insert into public.books (title, arabic_title, author, tradition, book_type, source_url)
values
  ('Sahih al-Bukhari', 'صحيح البخاري', 'Muhammad al-Bukhari', 'Sunni', 'hadith_collection', 'https://sunnah.com/bukhari'),
  ('Sahih Muslim', 'صحيح مسلم', 'Muslim ibn al-Hajjaj', 'Sunni', 'hadith_collection', 'https://sunnah.com/muslim'),
  ('Al-Kafi', 'الكافي', 'Muhammad ibn Ya''qub al-Kulayni', 'Twelver Shia', 'hadith_collection', 'https://thaqalayn.net/book/1'),
  ('Nahj al-Balagha', 'نهج البلاغة', 'Al-Sharif al-Radi', 'Twelver Shia', 'hadith_collection', 'https://thaqalayn.net/book/21'),
  ('HadeethEnc Prophetic Encyclopedia', 'موسوعة الأحاديث النبوية', 'HadeethEnc Team', 'Sunni', 'commentary', 'https://hadeethenc.com/en/home')
on conflict do nothing;

-- 2. Ensure classical scholars exist
insert into public.scholars (slug, name, arabic_name, tradition, death_year_ah, credentials)
values
  ('yahya-ibn-main', 'Yahya ibn Ma''in', 'يحيى بن معين', 'Sunni', 233, 'Early specialist in narrator criticism.'),
  ('ahmad-ibn-hanbal', 'Ahmad ibn Hanbal', 'أحمد بن حنبل', 'Sunni', 241, 'Hadith scholar, jurist and narrator critic.'),
  ('al-bukhari', 'Muhammad al-Bukhari', 'محمد البخاري', 'Sunni', 256, 'Hadith compiler and biographical critic.'),
  ('abu-hatim-al-razi', 'Abu Hatim al-Razi', 'أبو حاتم الرازي', 'Sunni', 277, 'Early authority in narrator criticism and hidden defects.'),
  ('al-nasai', 'Al-Nasa''i', 'النسائي', 'Sunni', 303, 'Hadith compiler and narrator critic.'),
  ('al-dhahabi', 'Al-Dhahabi', 'الذهبي', 'Sunni', 748, 'Historian and synthesizer of biographical criticism.'),
  ('ibn-hajar', 'Ibn Hajar al-Asqalani', 'ابن حجر العسقلاني', 'Sunni', 852, 'Hadith master and author of major narrator reference works.'),
  ('al-kashshi', 'Al-Kashshi', 'الكشي', 'Twelver Shia', null, 'Early Imami authority preserving reports about transmitters.'),
  ('al-najashi', 'Al-Najashi', 'النجاشي', 'Twelver Shia', 450, 'Imami bibliographer and narrator critic.'),
  ('al-tusi', 'Al-Shaykh al-Tusi', 'الشيخ الطوسي', 'Twelver Shia', 460, 'Jurist, hadith scholar and author of foundational rijal works.'),
  ('al-hilli', 'Al-Allama al-Hilli', 'العلامة الحلي', 'Twelver Shia', 726, 'Jurist and hadith classifier.'),
  ('al-majlisi', 'Muhammad Baqir al-Majlisi', 'محمد باقر المجلسي', 'Twelver Shia', 1110, 'Hadith compiler and commentator.'),
  ('al-khoei', 'Abu al-Qasim al-Khoei', 'أبو القاسم الخوئي', 'Twelver Shia', 1413, 'Marja and author of an analytical encyclopedia of transmitters.')
on conflict (slug) do nothing;

-- 3. Insert Parent Hadith Cluster
insert into public.hadiths (slug, title, arabic_title, summary, topics, review_status)
values
  (
    'first-revelation-at-hira',
    'The Beginning of Revelation (First Wahi at Cave Hira)',
    'بدء الوحي ونزول القرآن في غار حراء',
    'Comprehensive cross-traditional parent cluster for the commencement of Divine Revelation to Prophet Muhammad (ﷺ) in the Cave of Hira, the descent of Gabriel with Surah al-Alaq (96:1-5), subsequent events with Khadijah and Waraqa ibn Nawfal, and cross-traditional accounts on certainty, tranquility, and early witnesses.',
    array['revelation','prophethood','hira','gabriel','quran','khadijah','waraqa','sakinah'],
    'published'
  )
on conflict (slug) do update set
  title = excluded.title,
  arabic_title = excluded.arabic_title,
  summary = excluded.summary,
  topics = excluded.topics,
  review_status = excluded.review_status,
  updated_at = now();

-- 4. Insert Narrators
insert into public.narrators (slug, name, arabic_name, alternative_names, birth_year_ah, death_year_ah, region, generation, biography, summary_score, identity_status)
values
  ('aisha-bint-abi-bakr', 'Aisha bint Abi Bakr', 'عائشة بنت أبي بكر', array['Umm al-Mu''minin','Aisha'], null, 58, 'Medina', 'Companion', 'Wife of the Prophet and one of the most prolific scholars and narrators among the Companions.', 100, 'verified'),
  ('urwah-ibn-al-zubayr', 'Urwah ibn al-Zubayr', 'عروة بن الزبير', array['Urwa','Abu Abd Allah'], 23, 94, 'Medina', 'Successor', 'One of the Seven Fuqaha of Medina; prominent jurist and scholar of early Islamic history and Maghazi.', 98, 'verified'),
  ('ibn-shihab-al-zuhri', 'Ibn Shihab al-Zuhri', 'ابن شهاب الزهري', array['Muhammad ibn Muslim al-Zuhri','al-Zuhri'], 58, 124, 'Medina', 'Successor', 'Pivotal authority in hadith transmission and codification; teacher of Malik, al-Layth, and Uqayl.', 99, 'verified'),
  ('uqayl-ibn-khalid', 'Uqayl ibn Khalid', 'عقيل بن خالد', array['Uqayl ibn Khalid al-Ayli'], null, 144, 'Egypt', 'later_transmitter', 'Thiqah transmitter from Ayla who studied closely under al-Zuhri; relied upon by al-Bukhari and Muslim.', 92, 'verified'),
  ('al-layth-ibn-sad', 'Al-Layth ibn Sa''d', 'الليث بن سعد', array['Imam al-Layth','Abu al-Harith'], 94, 175, 'Egypt', 'later_transmitter', 'Eminent jurist and chief scholar of Egypt; praised by al-Shafi''i for immense knowledge and reliability.', 98, 'verified'),
  ('yahya-ibn-bukayr', 'Yahya ibn Bukayr', 'يحيى بن بكير', array['Yahya ibn Abd Allah ibn Bukayr'], 154, 231, 'Egypt', 'later_transmitter', 'Prominent Egyptian hadith transmitter and key teacher of Imam al-Bukhari in his Sahih.', 90, 'verified'),
  ('yunus-ibn-yazid', 'Yunus ibn Yazid', 'يونس بن يزيد', array['Yunus ibn Yazid al-Ayli'], null, 159, 'Egypt', 'later_transmitter', 'Major transmitter from al-Zuhri; relied upon by Imam Muslim in his Sahih.', 91, 'verified'),
  ('abdullah-ibn-wahb', 'Abd Allah ibn Wahb', 'عبد الله بن وهب', array['Ibn Wahb','Abu Muhammad'], 125, 197, 'Egypt', 'later_transmitter', 'Prominent Egyptian jurist and hadith master; author of al-Muwatta al-Saghir and Jami''.', 96, 'verified'),
  ('abu-al-tahir-ibn-sarh', 'Abu al-Tahir ibn Sarh', 'أبو الطاهر بن السرح', array['Ahmad ibn Amr ibn Sarh'], 170, 250, 'Egypt', 'later_transmitter', 'Thiqah hadith master of Egypt and one of the principal teachers of Imam Muslim.', 92, 'verified'),
  ('harmala-ibn-yahya', 'Harmala ibn Yahya', 'حرملة بن يحيى', array['Harmala ibn Yahya al-Tujibi'], 166, 243, 'Egypt', 'later_transmitter', 'Companion of al-Shafi''i and reliable transmitter relied upon by Imam Muslim.', 90, 'verified'),
  ('jabir-ibn-abdullah', 'Jabir ibn Abd Allah', 'جابر بن عبد الله', array['Jabir ibn Abd Allah al-Ansari'], null, 78, 'Medina', 'Companion', 'Prominent Ansari Companion present at the Pledge of Aqaba; one of the prolific narrators of Hadith.', 99, 'verified'),
  ('abu-salama-ibn-abd-al-rahman', 'Abu Salama ibn Abd al-Rahman', 'أبو سلمة بن عبد الرحمن', array['Abu Salama'], null, 94, 'Medina', 'Successor', 'One of the eminent jurists of Medina and son of the Companion Abd al-Rahman ibn Awf.', 95, 'verified'),
  ('ali-ibn-abi-talib', 'Ali ibn Abi Talib', 'علي بن أبي طالب', array['Amir al-Mu''minin','Abu al-Hasan','Imam Ali'], 23, 40, 'Kufa', 'Companion', 'Cousin and son-in-law of the Prophet, fourth righteous Caliph, first Shia Imam, and eyewitness at Hira.', 100, 'verified'),
  ('sharif-al-radi', 'Al-Sharif al-Radi', 'الشريف الرضي', array['Muhammad ibn al-Husayn al-Musawi'], 359, 406, 'Baghdad', 'later_transmitter', 'Renowned scholar, poet, and compiler of Nahj al-Balagha.', 95, 'verified'),
  ('jafar-al-sadiq', 'Ja''far al-Sadiq', 'جعفر الصادق', array['Imam al-Sadiq','Abu Abd Allah'], 83, 148, 'Medina', 'Imam', 'Sixth Imam of the Ahl al-Bayt; foundational authority on Islamic jurisprudence, theology, and ethics.', 100, 'verified'),
  ('zurarah-ibn-ayan', 'Zurarah ibn A''yan', 'زرارة بن أعين', array['Zurara','Abu al-Hasan'], 80, 150, 'Kufa', 'later_transmitter', 'Chief disciple of Imam al-Baqir and Imam al-Sadiq; among the foremost jurists of the Ashab al-Ijma.', 96, 'verified'),
  ('hisham-ibn-salim', 'Hisham ibn Salim', 'هشام بن سالم', array['Hisham ibn Salim al-Jawaliqi'], null, 183, 'Kufa', 'later_transmitter', 'Trusted companion and narrator from Imam al-Sadiq and Imam al-Kazim.', 92, 'verified'),
  ('muhammad-ibn-abi-umayr', 'Muhammad ibn Abi Umayr', 'محمد بن أبي عمير', array['Ibn Abi Umayr','Abu Ahmad'], null, 217, 'Baghdad', 'later_transmitter', 'Celebrated Imami hadith authority; one of the consensus transmitters whose marasil are accepted as musnad.', 98, 'verified'),
  ('ibrahim-ibn-hashim', 'Ibrahim ibn Hashim', 'إبراهيم بن هاشم', array['Ibrahim ibn Hashim al-Qummi','Abu Ishaq'], null, 270, 'Qom', 'later_transmitter', 'Pioneer who transmitted Kufan hadith traditions to the seminary of Qom; highly trusted narrator.', 94, 'verified'),
  ('ali-ibn-ibrahim', 'Ali ibn Ibrahim', 'علي بن إبراهيم', array['Ali ibn Ibrahim al-Qummi'], null, 329, 'Qom', 'later_transmitter', 'Eminent Imami hadith scholar, author of Tafsir al-Qummi, and principal teacher of al-Kulayni.', 97, 'verified')
on conflict (slug) do update set
  name = excluded.name,
  arabic_name = excluded.arabic_name,
  alternative_names = excluded.alternative_names,
  birth_year_ah = excluded.birth_year_ah,
  death_year_ah = excluded.death_year_ah,
  region = excluded.region,
  generation = excluded.generation,
  biography = excluded.biography,
  summary_score = excluded.summary_score,
  identity_status = excluded.identity_status;

-- 5. Insert Source Variations
do $$
declare
  v_hadith_id bigint;
  v_bukhari_id bigint;
  v_muslim_id bigint;
  v_kafi_id bigint;
  v_nahj_id bigint;
  v_hadeethenc_id bigint;
  v_var_bukhari3 bigint;
  v_var_muslim160 bigint;
  v_var_bukhari4 bigint;
  v_var_kafi1129 bigint;
  v_var_nahj192 bigint;
  v_var_hadeethenc bigint;
  v_chain_id bigint;
  v_scholar_id bigint;
  v_narrator_id bigint;
begin
  select id into v_hadith_id from public.hadiths where slug = 'first-revelation-at-hira';
  select id into v_bukhari_id from public.books where title = 'Sahih al-Bukhari';
  select id into v_muslim_id from public.books where title = 'Sahih Muslim';
  select id into v_kafi_id from public.books where title = 'Al-Kafi';
  select id into v_nahj_id from public.books where title = 'Nahj al-Balagha';
  select id into v_hadeethenc_id from public.books where title = 'HadeethEnc Prophetic Encyclopedia';

  -- Variation 1: Sahih al-Bukhari 3
  insert into public.source_variations (
    hadith_id, book_id, hadith_number, chapter, volume, page,
    arabic_text, english_text, translator, source_url,
    hadith_status, chain_status, narration_status, status_notes, verified
  ) values (
    v_hadith_id, v_bukhari_id, '3', 'Book of Revelation (كتاب بدء الوحي)', '1', '2',
    'حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ، قَالَ: حَدَّثَنَا اللَّيْثُ، عَنْ عُقَيْلٍ، عَنِ ابْنِ شِهَابٍ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ، عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ أَنَّهَا قَالَتْ: أَوَّلُ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ، فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ، ثُمَّ حُبِّبَ إِلَيْهِ الْخَلاَءُ، وَكَانَ يَخْلُو بِغَارِ حِرَاءٍ فَيَتَحَنَّثُ فِيهِ ـ وَهُوَ التَّعَبُّدُ ـ اللَّيَالِيَ ذَوَاتِ الْعَدَدِ قَبْلَ أَنْ يَنْزِعَ إِلَى أَهْلِهِ، وَيَتَزَوَّدُ لِذَلِكَ، ثُمَّ يَرْجِعُ إِلَى خَدِيجَةَ فَيَتَزَوَّدُ لِمِثْلِهَا، حَتَّى جَاءَهُ الْحَقُّ وَهُوَ فِي غَارِ حِرَاءٍ، فَجَاءَهُ الْمَلَكُ فَقَالَ: اقْرَأْ. قَالَ: «مَا أَنَا بِقَارِئٍ». قَالَ: «فَأَخَذَنِي فَغَطَّنِي حَتَّى بَلَغَ مِنِّي الْجَهْدَ ثُمَّ أَرْسَلَنِي»، فَقَالَ: اقْرَأْ. قُلْتُ: «مَا أَنَا بِقَارِئٍ». فَأَخَذَنِي فَغَطَّنِي الثَّانِيَةَ حَتَّى بَلَغَ مِنِّي الْجَهْدَ ثُمَّ أَرْسَلَنِي، فَقَالَ: اقْرَأْ. فَقُلْتُ: «مَا أَنَا بِقَارِئٍ». فَأَخَذَنِي فَغَطَّنِي الثَّالِثَةَ ثُمَّ أَرْسَلَنِي، فَقَالَ: {اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ * خَلَقَ الإِنْسَانَ مِنْ عَلَقٍ * اقْرَأْ وَرَبُّكَ الأَكْرَمُ}. فَرَجَعَ بِهَا رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَرْجُفُ فُؤَادُهُ، فَدَخَلَ عَلَى خَدِيجَةَ بِنْتِ خُوَيْلِدٍ رَضِيَ اللَّهُ عَنْهَا فَقَالَ: «زَمِّلُونِي زَمِّلُونِي». فَزَمَّلُوهُ حَتَّى ذَهَبَ عَنْهُ الرَّوْعُ، فَقَالَ لِخَدِيجَةَ وَأَخْبَرَهَا الْخَبَرَ: «لَقَدْ خَشِيتُ عَلَى نَفْسِي». فَقَالَتْ خَدِيجَةُ: كَلاَّ وَاللَّهِ مَا يُخْزِيكَ اللَّهُ أَبَدًا، إِنَّكَ لَتَصِلُ الرَّحِمَ، وَتَحْمِلُ الْكَلَّ، وَتَكْسِبُ الْمَعْدُومَ، وَتَقْرِي الضَّيْفَ، وَتُعِينُ عَلَى نَوَائِبِ الْحَقِّ. فَانْطَلَقَتْ بِهِ خَدِيجَةُ حَتَّى أَتَتْ بِهِ وَرَقَةَ بْنَ نَوْفَلِ بْنِ أَسَدِ بْنِ عَبْدِ الْعُزَّى ابْنَ عَمِّ خَدِيجَةَ، وَكَانَ امْرَأً تَنَصَّرَ فِي الْجَاهِلِيَّةِ، وَكَانَ يَكْتُبُ الْكِتَابَ الْعِبْرَانِيَّ، فَيَكْتُبُ مِنَ الإِنْجِيلِ بِالْعِبْرَانِيَّةِ مَا شَاءَ اللَّهُ أَنْ يَكْتُبَ، وَكَانَ شَيْخًا كَبِيرًا قَدْ عَمِيَ، فَقَالَتْ لَهُ خَدِيجَةُ: يَا ابْنَ عَمِّ، اسْمَعْ مِنَ ابْنِ أَخِيكَ. فَقَالَ لَهُ وَرَقَةُ: يَا ابْنَ أَخِي مَاذَا تَرَى؟ فَأَخْبَرَهُ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ خَبَرَ مَا رَأَى. فَقَالَ لَهُ وَرَقَةُ: هَذَا النَّامُوسُ الَّذِي نَزَّلَ اللَّهُ عَلَى مُوسَى، يَا لَيْتَنِي فِيهَا جَذَعًا، لَيْتَنِي أَكُونُ حَيًّا إِذْ يُخْرِجُكَ قَوْمُكَ. فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «أَوَمُخْرِجِيَّ هُمْ؟». قَالَ: نَعَمْ، لَمْ يَأْتِ رَجُلٌ قَطُّ بِمِثْلِ مَا جِئْتَ بِهِ إِلاَّ عُودِيَ، وَإِنْ يُدْرِكْنِي يَوْمُكَ أَنْصُرْكَ نَصْرًا مُؤَزَّرًا. ثُمَّ لَمْ يَنْشَبْ وَرَقَةُ أَنْ تُوُفِّيَ، وَفَتَرَ الْوَحْيُ.',
    'Narrated Aisha: The commencement of the Divine Inspiration to Allah''s Messenger (ﷺ) was in the form of good righteous dreams in his sleep. He never had a dream but that it came true like bright daylight. He was also endowed with the love of seclusion, so he used to isolate himself in the cave of Hira, worshipping therein for a number of nights before coming back to his family to replenish his provisions. This continued until the Truth suddenly descended upon him while he was in the cave of Hira. The Angel came to him and said: ''Read!'' He replied: ''I do not know how to read.'' The Prophet added: ''The Angel seized me and squeezed me firmly until I could bear it no more, and then released me and said again: Read! I replied: I do not know how to read.'' This was repeated three times, after which Gabriel recited the first verses of Surah al-Alaq (96:1-3). The Prophet returned to Khadijah trembling, and she comforted him and took him to Waraqah ibn Nawfal, who testified to the descent of the Divine Namus.',
    'Dr. Muhammad Muhsin Khan', 'https://sunnah.com/bukhari:3',
    'sahih', 'muttasil', array['marfu','ahad','first_wahi'], 'Canonical opening hadith of Sahih al-Bukhari on the commencement of revelation.', true
  ) returning id into v_var_bukhari3;

  -- Chain for Bukhari 3
  insert into public.chains (variation_id, chain_number, raw_chain_text, continuity_status, quality_status, notes, verified)
  values (v_var_bukhari3, 1, 'حدثنا يحيى بن بكير حدثنا الليث عن عقيل عن ابن شهاب عن عروة بن الزبير عن عائشة أم المؤمنين', 'muttasil', 'sahih', 'Primary canonical chain in Sahih al-Bukhari', true)
  returning id into v_chain_id;

  insert into public.chain_narrators (chain_id, position, raw_name, narrator_id, transmission_word, match_confidence)
  select v_chain_id, 1, 'Aisha bint Abi Bakr', id, 'an', 1.0000 from public.narrators where slug = 'aisha-bint-abi-bakr'
  union all select v_chain_id, 2, 'Urwah ibn al-Zubayr', id, 'an', 1.0000 from public.narrators where slug = 'urwah-ibn-al-zubayr'
  union all select v_chain_id, 3, 'Ibn Shihab al-Zuhri', id, 'an', 1.0000 from public.narrators where slug = 'ibn-shihab-al-zuhri'
  union all select v_chain_id, 4, 'Uqayl ibn Khalid', id, 'an', 1.0000 from public.narrators where slug = 'uqayl-ibn-khalid'
  union all select v_chain_id, 5, 'Al-Layth ibn Sa''d', id, 'haddathana', 1.0000 from public.narrators where slug = 'al-layth-ibn-sad'
  union all select v_chain_id, 6, 'Yahya ibn Bukayr', id, 'haddathana', 1.0000 from public.narrators where slug = 'yahya-ibn-bukayr';

  -- Variation 2: Sahih Muslim 160a
  insert into public.source_variations (
    hadith_id, book_id, hadith_number, chapter, volume, page,
    arabic_text, english_text, translator, source_url,
    hadith_status, chain_status, narration_status, status_notes, verified
  ) values (
    v_hadith_id, v_muslim_id, '160a', 'Book of Faith (كتاب الإيمان)', '1', '139',
    'حَدَّثَنِي أَبُو الطَّاهِرِ أَحْمَدُ بْنُ عَمْرِو بْنِ سَرْحٍ، حَدَّثَنَا ابْنُ وَهْبٍ، قَالَ: أَخْبَرَنِي يُونُسُ، عَنِ ابْنِ شِهَابٍ، قَالَ: حَدَّثَنِي عُرْوَةُ بْنُ الزُّبَيْرِ، أَنَّ عَائِشَةَ زَوْجَ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَخْبَرَتْهُ أَنَّهَا قَالَتْ: كَانَ أَوَّلَ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّادِقَةُ فِي النَّوْمِ، فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ، ثُمَّ حُبِّبَ إِلَيْهِ الْخَلاَءُ، فَكَانَ يَخْلُو بِغَارِ حِرَاءٍ يَتَحَنَّثُ فِيهِ ـ وَهُوَ التَّعَبُّدُ ـ اللَّيَالِيَ أُوﻻَتِ الْعَدَدِ، قَبْلَ أَنْ يَرْجِعَ إِلَى أَهْلِهِ وَيَتَزَوَّدُ لِذَلِكَ، ثُمَّ يَرْجِعُ إِلَى خَدِيجَةَ فَيَتَزَوَّدُ بِمِثْلِهَا، حَتَّى فَجِئَهُ الْحَقُّ وَهُوَ فِي غَارِ حِرَاءٍ، فَجَاءَهُ الْمَلَكُ فَقَالَ: اقْرَأْ. فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَا أَنَا بِقَارِئٍ»...',
    'Aisha, the wife of the Prophet (ﷺ), reported: The beginning of Divine Revelation to the Messenger of Allah (ﷺ) was in the form of true dreams during sleep. He saw no dream but it came like the breaking of the dawn. Then seclusion was endeared to him, so he used to go into seclusion in the Cave of Hira, engaging in acts of devotion (Tahannuth) for several nights before returning to his family. He took provisions with him for that purpose, and then returned to Khadijah and took provisions like that again, until the Truth unexpectedly descended upon him while he was in the Cave of Hira. The Angel commanded him to read, repeated the press thrice, and recited Surat al-Alaq.',
    'Abdul Hamid Siddiqui', 'https://sunnah.com/muslim:160a',
    'sahih', 'muttasil', array['marfu','ahad','first_wahi'], 'Transmitted through Ibn Wahb and Yunus ibn Yazid from al-Zuhri.', true
  ) returning id into v_var_muslim160;

  -- Chain for Muslim 160a
  insert into public.chains (variation_id, chain_number, raw_chain_text, continuity_status, quality_status, notes, verified)
  values (v_var_muslim160, 1, 'حدثني أبو الطاهر أحمد بن عمرو بن سرح حدثنا ابن وهب أخبرني يونس عن ابن شهاب حدثني عروة بن الزبير أن عائشة زوج النبي أخبرته', 'muttasil', 'sahih', 'Primary canonical chain in Sahih Muslim', true)
  returning id into v_chain_id;

  insert into public.chain_narrators (chain_id, position, raw_name, narrator_id, transmission_word, match_confidence)
  select v_chain_id, 1, 'Aisha bint Abi Bakr', id, 'akhbarat', 1.0000 from public.narrators where slug = 'aisha-bint-abi-bakr'
  union all select v_chain_id, 2, 'Urwah ibn al-Zubayr', id, 'haddathani', 1.0000 from public.narrators where slug = 'urwah-ibn-al-zubayr'
  union all select v_chain_id, 3, 'Ibn Shihab al-Zuhri', id, 'an', 1.0000 from public.narrators where slug = 'ibn-shihab-al-zuhri'
  union all select v_chain_id, 4, 'Yunus ibn Yazid', id, 'akhbarani', 1.0000 from public.narrators where slug = 'yunus-ibn-yazid'
  union all select v_chain_id, 5, 'Abd Allah ibn Wahb', id, 'haddathana', 1.0000 from public.narrators where slug = 'abdullah-ibn-wahb'
  union all select v_chain_id, 6, 'Abu al-Tahir ibn Sarh', id, 'haddathani', 1.0000 from public.narrators where slug = 'abu-al-tahir-ibn-sarh';

  -- Variation 3: Sahih al-Bukhari 4 (Intermission of Revelation)
  insert into public.source_variations (
    hadith_id, book_id, hadith_number, chapter, volume, page,
    arabic_text, english_text, translator, source_url,
    hadith_status, chain_status, narration_status, status_notes, verified
  ) values (
    v_hadith_id, v_bukhari_id, '4', 'Book of Revelation - Intermission (فترة الوحي)', '1', '3',
    'حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ، حَدَّثَنَا اللَّيْثُ، عَنْ عُقَيْلٍ، عَنِ ابْنِ شِهَابٍ، قَالَ: سَمِعْتُ أَبَا سَلَمَةَ بْنَ عَبْدِ الرَّحْمَنِ، يَقُولُ: أَخْبَرَنِي جَابِرُ بْنُ عَبْدِ اللَّهِ الأَنْصَارِيُّ، وَهُوَ يُحَدِّثُ عَنْ فَتْرَةِ الْوَحْيِ، فَقَالَ فِي حَدِيثِهِ: «بَيْنَا أَنَا أَمْشِي إِذْ سَمِعْتُ صَوْتًا مِنَ السَّمَاءِ، فَرَفَعْتُ بَصَرِي فَإِذَا الْمَلَكُ الَّذِي جَاءَنِي بِحِرَاءٍ جَالِسٌ عَلَى كُرْسِيٍّ بَيْنَ السَّمَاءِ وَالأَرْضِ، فَرُعِبْتُ مِنْهُ، فَرَجَعْتُ فَقُلْتُ: زَمِّلُونِي زَمِّلُونِي. فَأَنْزَلَ اللَّهُ تَعَالَى: {يَا أَيُّهَا الْمُدَّثِّرُ * قُمْ فَأَنْذِرْ * وَرَبَّكَ فَكَبِّرْ * وَثِيَابَكَ فَطَهِّرْ * وَالرُّجْزَ فَاهْجُرْ}، فَحَمِيَ الْوَحْيُ وَتَتَابَعَ».',
    'Narrated Jabir ibn Abd Allah al-Ansari: The Prophet (ﷺ) said while speaking of the interval of revelation: ''While I was walking, I suddenly heard a voice from the sky. I looked up and saw the very same Angel who had visited me at Hira sitting on a chair between the sky and the earth. I was terrified of him and returned home saying: Wrap me up! Wrap me up! Whereupon Allah revealed: {O you wrapped up in your cloak! Arise and warn...} (74:1-5). After this, the revelation intensified and came continuously.''',
    'Dr. Muhammad Muhsin Khan', 'https://sunnah.com/bukhari:4',
    'sahih', 'muttasil', array['marfu','ahad','first_wahi','fatrat_al_wahy'], 'Narrates the resumption of revelation after the initial pause.', true
  ) returning id into v_var_bukhari4;

  -- Chain for Bukhari 4
  insert into public.chains (variation_id, chain_number, raw_chain_text, continuity_status, quality_status, notes, verified)
  values (v_var_bukhari4, 1, 'حدثنا يحيى بن بكير حدثنا الليث عن عقيل عن ابن شهاب سمعت أبا سلمة بن عبد الرحمن يقول أخبرني جابر بن عبد الله الأنصاري', 'muttasil', 'sahih', 'Intermission report chain', true)
  returning id into v_chain_id;

  insert into public.chain_narrators (chain_id, position, raw_name, narrator_id, transmission_word, match_confidence)
  select v_chain_id, 1, 'Jabir ibn Abd Allah', id, 'akhbarani', 1.0000 from public.narrators where slug = 'jabir-ibn-abdullah'
  union all select v_chain_id, 2, 'Abu Salama ibn Abd al-Rahman', id, 'qala', 1.0000 from public.narrators where slug = 'abu-salama-ibn-abd-al-rahman'
  union all select v_chain_id, 3, 'Ibn Shihab al-Zuhri', id, 'an', 1.0000 from public.narrators where slug = 'ibn-shihab-al-zuhri'
  union all select v_chain_id, 4, 'Uqayl ibn Khalid', id, 'an', 1.0000 from public.narrators where slug = 'uqayl-ibn-khalid'
  union all select v_chain_id, 5, 'Al-Layth ibn Sa''d', id, 'haddathana', 1.0000 from public.narrators where slug = 'al-layth-ibn-sad'
  union all select v_chain_id, 6, 'Yahya ibn Bukayr', id, 'haddathana', 1.0000 from public.narrators where slug = 'yahya-ibn-bukayr';

  -- Variation 4: Al-Kafi Vol 1 Book 4 Hadith 1129
  insert into public.source_variations (
    hadith_id, book_id, hadith_number, chapter, volume, page,
    arabic_text, english_text, translator, source_url,
    hadith_status, chain_status, narration_status, status_notes, verified
  ) values (
    v_hadith_id, v_kafi_id, 'Vol 1 Book 4 Hadith 1129', 'Book of Divine Proof (كتاب الحجة)', '1', '176',
    'عَلِيُّ بْنُ إِبْرَاهِيمَ، عَنْ أَبِيهِ، عَنِ ابْنِ أَبِي عُمَيْرٍ، عَنْ هِشَامِ بْنِ سَالِمٍ، عَنْ زُرَارَةَ، قَالَ: قُلْتُ لِأَبِي عَبْدِ اللَّهِ (عَلَيْهِ السَّلَامُ): كَيْفَ لَمْ يَخَفْ رَسُولُ اللَّهِ (صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ) فِيمَا يَأْتِيهِ مِنْ قِبَلِ اللَّهِ أَنْ يَكُونَ ذَلِكَ مِمَّا يَنْزَغُ بِهِ الشَّيْطَانُ؟ فَقَالَ (عَلَيْهِ السَّلَامُ): «إِنَّ اللَّهَ إِذَا اتَّخَذَ عَبْدًا رَسُولًا أَنْزَلَ عَلَيْهِ السَّكِينَةَ وَالْوَقَارَ، فَكَانَ يَأْتِيهِ مِنْ قِبَلِ اللَّهِ عَزَّ وَجَلَّ مِثْلَ الَّذِي يَرَاهُ بِعَيْنِهِ».',
    'Ali ibn Ibrahim, from his father, from Ibn Abi Umayr, from Hisham ibn Salim, from Zurarah who said: I asked Abu Abdillah (Imam Ja''far al-Sadiq, peace be upon him): ''How was the Messenger of Allah (peace and blessings be upon him and his family) immune from fearing that what came to him from Allah might be an evil prompting of Satan?'' The Imam replied: ''Indeed, when Allah chooses a servant to be a Messenger, He descends upon him divine tranquility (al-Sakinah) and dignity (al-Waqar), so that what comes to him from Allah the Mighty and Majestic is as clear and certain as that which he sees directly with his own eyes.''',
    'Muhammad Sarwar / Sayyid Muhammad Rizvi', 'https://thaqalayn.net/hadith/1/4/112/1',
    'muwaththaq', 'muttasil', array['marfu','ahad','first_wahi','theological_proof'], 'Twelver Shia foundational report establishing infallible certainty at the onset of revelation.', true
  ) returning id into v_var_kafi1129;

  -- Chain for Al-Kafi
  insert into public.chains (variation_id, chain_number, raw_chain_text, continuity_status, quality_status, notes, verified)
  values (v_var_kafi1129, 1, 'علي بن إبراهيم عن أبيه عن ابن أبي عمير عن هشام بن سالم عن زرارة عن أبي عبد الله عليه السلام', 'muttasil', 'sahih', 'Twelver Shia chain in Al-Kafi', true)
  returning id into v_chain_id;

  insert into public.chain_narrators (chain_id, position, raw_name, narrator_id, transmission_word, match_confidence)
  select v_chain_id, 1, 'Ja''far al-Sadiq', id, 'qala', 1.0000 from public.narrators where slug = 'jafar-al-sadiq'
  union all select v_chain_id, 2, 'Zurarah ibn A''yan', id, 'an', 1.0000 from public.narrators where slug = 'zurarah-ibn-ayan'
  union all select v_chain_id, 3, 'Hisham ibn Salim', id, 'an', 1.0000 from public.narrators where slug = 'hisham-ibn-salim'
  union all select v_chain_id, 4, 'Muhammad ibn Abi Umayr', id, 'an', 1.0000 from public.narrators where slug = 'muhammad-ibn-abi-umayr'
  union all select v_chain_id, 5, 'Ibrahim ibn Hashim', id, 'an', 1.0000 from public.narrators where slug = 'ibrahim-ibn-hashim'
  union all select v_chain_id, 6, 'Ali ibn Ibrahim', id, 'haddathana', 1.0000 from public.narrators where slug = 'ali-ibn-ibrahim';

  -- Variation 5: Nahj al-Balagha Sermon 192
  insert into public.source_variations (
    hadith_id, book_id, hadith_number, chapter, volume, page,
    arabic_text, english_text, translator, source_url,
    hadith_status, chain_status, narration_status, status_notes, verified
  ) values (
    v_hadith_id, v_nahj_id, 'Sermon 192', 'The Sermon of Disparagement (الخطبة القاصعة)', '1', '300',
    'قَالَ أَمِيرُ الْمُؤْمِنِينَ عَلِيُّ بْنُ أَبِي طَالِبٍ (عَلَيْهِ السَّلَامُ): «وَلَقَدْ كَانَ يُجَاوِرُ فِي كُلِّ سَنَةٍ بِحِرَاءَ فَأَرَاهُ وَلاَ يَرَاهُ غَيْرِي، وَلَمْ يَجْمَعْ بَيْتٌ وَاحِدٌ يَوْمَئِذٍ فِي الإِسْلاَمِ غَيْرَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ وَخَدِيجَةَ وَأَنَا ثَالِثُهُمَا، أَرَى نُورَ الْوَحْيِ وَالرِّسَالَةِ، وَأَشُمُّ رِيحَ النُّبُوَّةِ، وَلَقَدْ سَمِعْتُ رَنَّةَ الشَّيْطَانِ حِينَ نَزَلَ الْوَحْيُ عَلَيْهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ، فَقُلْتُ: يَا رَسُولَ اللَّهِ مَا هَذِهِ الرَّنَّةُ؟ فَقَالَ: هَذَا الشَّيْطَانُ قَدْ أَيِسَ مِنْ عِبَادَتِهِ، إِنَّكَ تَسْمَعُ مَا أَسْمَعُ وَتَرَى مَا أَرَى إِلاَّ أَنَّكَ لَسْتَ بِنَبِيٍّ، وَلَكِنَّكَ لَوَزِيرٌ وَإِنَّكَ لَعَلَى خَيْرٍ».',
    'Amir al-Mu''minin Ali ibn Abi Talib (peace be upon him) said: ''Every year the Messenger of Allah used to stay in seclusion at Mount Hira where I used to see him while no one else saw him. At that time Islam had not gathered in any house except that of the Messenger of Allah, Khadijah, and I was the third of them. I used to see the radiant light of Divine Revelation and the Message, and I inhaled the fragrance of Prophethood. I heard the mournful cry of Satan when revelation first descended upon him. I asked: O Messenger of Allah, what is this cry? He replied: This is Satan who has despaired of ever being worshipped. You hear what I hear and you see what I see, except that you are not a prophet, but you are a vizier and you are upon great virtue.''',
    'Sayyid Ali Rida', 'https://thaqalayn.net/chapter/21/1/192',
    'mashhur', 'muttasil', array['marfu','khutbah','eyewitness_account'], 'Eyewitness narration from Ali ibn Abi Talib regarding the first revelation at Hira.', true
  ) returning id into v_var_nahj192;

  -- Chain for Nahj al-Balagha
  insert into public.chains (variation_id, chain_number, raw_chain_text, continuity_status, quality_status, notes, verified)
  values (v_var_nahj192, 1, 'الشريف الرضي عن أمير المؤمنين علي بن أبي طالب عليه السلام', 'muttasil', 'mashhur', 'Nahj al-Balagha Sermon 192', true)
  returning id into v_chain_id;

  insert into public.chain_narrators (chain_id, position, raw_name, narrator_id, transmission_word, match_confidence)
  select v_chain_id, 1, 'Ali ibn Abi Talib', id, 'qala', 1.0000 from public.narrators where slug = 'ali-ibn-abi-talib'
  union all select v_chain_id, 2, 'Al-Sharif al-Radi', id, 'rawahu', 1.0000 from public.narrators where slug = 'sharif-al-radi';

  -- Variation 6: HadeethEnc 3068
  insert into public.source_variations (
    hadith_id, book_id, hadith_number, chapter, volume, page,
    arabic_text, english_text, translator, source_url,
    hadith_status, chain_status, narration_status, status_notes, verified
  ) values (
    v_hadith_id, v_hadeethenc_id, '3068', 'General Hadith Encyclopedia - Revelation & Virtues', '1', '1',
    'عَنْ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا: أَنَّ أَوَّلَ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ الْوَحْيِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ... فَنَزَلَ عَلَيْهِ مَلَكُ الْوَحْيِ بِقَوْلِهِ تَعَالَى: {اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ}.',
    'Narrated by Aisha (may Allah be pleased with her): The commencement of revelation to the Messenger of Allah (ﷺ) began with righteous dreams during sleep. The Angel of Revelation descended upon him in the Cave of Hira with the opening of Surah al-Alaq: ''Read in the name of your Lord Who created.'' Pedagogical vocabulary notes: ''Tahannuth'' means devotional worship; ''Falaq al-Subh'' means breaking of dawn; ''al-Namus'' refers to Gabriel.',
    'HadeethEnc Team', 'https://hadeethenc.com/en/browse/hadith/3068',
    'sahih', 'muttasil', array['marfu','pedagogical_explanation'], 'Pedagogical reference with vocabulary analysis.', true
  ) returning id into v_var_hadeethenc;

  -- 6. Insert Hadith Assessments
  select id into v_scholar_id from public.scholars where slug = 'ibn-hajar';
  insert into public.hadith_assessments (variation_id, scholar_id, original_grade, normalized_grade, explanation, reference_book, edition, volume, page, source_url, verified)
  values (v_var_bukhari3, v_scholar_id, 'صحيح متفق عليه', 'sahih', 'Rigorous authentic narration opening the Sahih collection with multiple corroborated chains.', 'Fath al-Bari fi Sharh Sahih al-Bukhari', 'Dar al-Ma''rifah', '1', '23', 'https://shamela.ws/book/1673', true);

  select id into v_scholar_id from public.scholars where slug = 'al-majlisi';
  insert into public.hadith_assessments (variation_id, scholar_id, original_grade, normalized_grade, explanation, reference_book, edition, volume, page, source_url, verified)
  values (v_var_kafi1129, v_scholar_id, 'موثق كالصحيح', 'muwaththaq', 'Graded as reliable like sahih due to the consensus on transmitters like Ibn Abi Umayr and Zurarah.', 'Mir''at al-Uqul fi Sharh Akhbar Al al-Rasul', 'Dar al-Kutub al-Islamiyyah', '4', '298', '', true);

  -- 7. Insert Narrator Assessments
  select id into v_scholar_id from public.scholars where slug = 'ibn-hajar';
  select id into v_narrator_id from public.narrators where slug = 'ibn-shihab-al-zuhri';
  insert into public.narrator_assessments (narrator_id, scholar_id, original_term, normalized_term, explanation, display_score, reference_book, edition, volume, page, source_url, verified)
  values (v_narrator_id, v_scholar_id, 'الفقيه الحافظ متفق على جلالته وإتقانه', 'thiqah_thabt', 'Master hadith authority whose precision and comprehensive memory are accepted by consensus.', 99, 'Taqrib al-Tahdhib', 'Dar al-Rashid', '1', '506', 'https://shamela.ws/book/8609/506', true);

  select id into v_scholar_id from public.scholars where slug = 'al-khoei';
  select id into v_narrator_id from public.narrators where slug = 'zurarah-ibn-ayan';
  insert into public.narrator_assessments (narrator_id, scholar_id, original_term, normalized_term, explanation, display_score, reference_book, edition, volume, page, source_url, verified)
  values (v_narrator_id, v_scholar_id, 'فوق الوثاقة جليل القدر ومن أصحاب الإجماع', 'thiqah_jalil', 'Foremost companion of the Imams and central to the Ashab al-Ijma.', 98, 'Mu''jam Rijal al-Hadith', '5th Edition', '8', '225', 'http://shiaonlinelibrary.com', true);

end $$;
