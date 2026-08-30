insert into public.scholars
  (slug, name, arabic_name, tradition, death_year_ah, credentials)
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
