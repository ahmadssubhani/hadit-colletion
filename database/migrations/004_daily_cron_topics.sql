-- Migration: 004_daily_cron_topics.sql
-- Manages active themes/wahi topics and logs daily shortlist runs for deduplication.

create table if not exists public.daily_topics (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  arabic_title text,
  description text,
  keywords text[] not null default '{}',
  is_active boolean not null default false,
  daily_batch_size integer not null default 5,
  total_ingested integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_hadith_logs (
  id bigint generated always as identity primary key,
  topic_id bigint not null references public.daily_topics(id) on delete cascade,
  run_date date not null default current_date,
  day_number integer not null default 1,
  items_count integer not null default 5,
  source_variation_ids bigint[] not null default '{}',
  hadith_identifiers text[] not null default '{}',
  status text not null default 'success' check (status in ('success', 'partial', 'failed')),
  notes text,
  created_at timestamptz not null default now(),
  unique (topic_id, run_date)
);

create index if not exists daily_topics_active_idx on public.daily_topics(is_active);
create index if not exists daily_hadith_logs_topic_idx on public.daily_hadith_logs(topic_id, run_date);

alter table public.daily_topics enable row level security;
alter table public.daily_hadith_logs enable row level security;

-- Allow public read access to active topics and logs
create policy "Public daily topics" on public.daily_topics for select using (true);
create policy "Public daily hadith logs" on public.daily_hadith_logs for select using (true);

-- Insert initial First Wahi topic
insert into public.daily_topics (slug, title, arabic_title, description, keywords, is_active, daily_batch_size)
values (
  'first-wahi',
  'The Beginning of Revelation (First Wahi at Cave Hira)',
  'بدء الوحي في غار حراء ونزول القرآن',
  'Cross-traditional narrations on the commencement of revelation in Cave Hira, the first verses of Surah al-Alaq (96:1-5), the pause of revelation (Fatrat al-Wahy), Surah al-Muddaththir, and classical accounts of certainty and tranquility.',
  array['first-wahi', 'revelation', 'hira', 'gabriel', 'iqra', 'alaq', 'muddaththir', 'khadijah', 'waraqa', 'sakinah'],
  true,
  5
)
on conflict (slug) do update set
  title = excluded.title,
  arabic_title = excluded.arabic_title,
  description = excluded.description,
  keywords = excluded.keywords,
  is_active = excluded.is_active,
  updated_at = now();
