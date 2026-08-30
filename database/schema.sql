create extension if not exists pg_trgm;

create table public.books (
  id bigint generated always as identity primary key,
  title text not null,
  arabic_title text,
  author text,
  tradition text not null default 'unclassified',
  book_type text not null default 'hadith_collection',
  source_url text,
  license text,
  created_at timestamptz not null default now()
);

create table public.hadiths (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  arabic_title text,
  summary text,
  topics text[] not null default '{}',
  review_status text not null default 'draft'
    check (review_status in ('draft','in_review','published','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.source_variations (
  id bigint generated always as identity primary key,
  hadith_id bigint not null references public.hadiths(id) on delete cascade,
  book_id bigint not null references public.books(id),
  hadith_number text,
  chapter text,
  volume text,
  page text,
  arabic_text text,
  english_text text,
  translator text,
  source_url text,
  hadith_status text not null default 'not_graded',
  chain_status text not null default 'unverified',
  narration_status text[] not null default '{}',
  status_notes text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.narrators (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  arabic_name text,
  alternative_names text[] not null default '{}',
  birth_year_ah integer,
  death_year_ah integer,
  region text,
  generation text,
  biography text,
  summary_score smallint check (summary_score between 0 and 100),
  identity_status text not null default 'unverified',
  created_at timestamptz not null default now()
);

create table public.chains (
  id bigint generated always as identity primary key,
  variation_id bigint not null references public.source_variations(id) on delete cascade,
  chain_number integer not null default 1,
  raw_chain_text text,
  continuity_status text not null default 'unverified',
  quality_status text not null default 'unverified',
  notes text,
  verified boolean not null default false,
  unique (variation_id, chain_number)
);

create table public.chain_narrators (
  id bigint generated always as identity primary key,
  chain_id bigint not null references public.chains(id) on delete cascade,
  narrator_id bigint references public.narrators(id),
  position integer not null,
  raw_name text not null,
  transmission_word text,
  match_confidence numeric(5,4) check (match_confidence between 0 and 1),
  match_notes text,
  unique (chain_id, position)
);

create table public.scholars (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  arabic_name text,
  tradition text,
  birth_year_ah integer,
  death_year_ah integer,
  credentials text,
  methodology text
);

create table public.hadith_assessments (
  id bigint generated always as identity primary key,
  variation_id bigint not null references public.source_variations(id) on delete cascade,
  scholar_id bigint not null references public.scholars(id),
  original_grade text not null,
  normalized_grade text,
  explanation text,
  reference_book text,
  edition text,
  volume text,
  page text,
  source_url text,
  verified boolean not null default false
);

create table public.chain_assessments (
  id bigint generated always as identity primary key,
  chain_id bigint not null references public.chains(id) on delete cascade,
  scholar_id bigint references public.scholars(id),
  continuity_status text,
  quality_status text,
  explanation text,
  reference_book text,
  edition text,
  volume text,
  page text,
  source_url text,
  verified boolean not null default false
);

create table public.narrator_assessments (
  id bigint generated always as identity primary key,
  narrator_id bigint not null references public.narrators(id) on delete cascade,
  scholar_id bigint not null references public.scholars(id),
  original_term text not null,
  normalized_term text,
  explanation text,
  display_score smallint check (display_score between 0 and 100),
  mapping_method text,
  reference_book text,
  edition text,
  volume text,
  page text,
  source_url text,
  verified boolean not null default false
);

create table public.import_batches (
  id bigint generated always as identity primary key,
  provider text not null,
  source_url text,
  license text,
  permission_status text not null default 'unknown',
  retrieved_at timestamptz not null default now(),
  checksum text,
  notes text
);

create table public.raw_import_records (
  id bigint generated always as identity primary key,
  batch_id bigint not null references public.import_batches(id) on delete cascade,
  external_id text,
  raw_payload jsonb not null,
  processing_status text not null default 'pending',
  processing_error text,
  created_at timestamptz not null default now(),
  unique (batch_id, external_id)
);

create index source_variations_hadith_idx on public.source_variations(hadith_id);
create index chains_variation_idx on public.chains(variation_id);
create index chain_narrators_order_idx on public.chain_narrators(chain_id, position);
create index hadith_assessments_variation_idx on public.hadith_assessments(variation_id);
create index narrator_assessments_narrator_idx on public.narrator_assessments(narrator_id);
create index source_arabic_trgm_idx on public.source_variations using gin (arabic_text gin_trgm_ops);
create index source_english_trgm_idx on public.source_variations using gin (english_text gin_trgm_ops);
create index narrator_name_trgm_idx on public.narrators using gin (name gin_trgm_ops);

alter table public.books enable row level security;
alter table public.hadiths enable row level security;
alter table public.source_variations enable row level security;
alter table public.narrators enable row level security;
alter table public.chains enable row level security;
alter table public.chain_narrators enable row level security;
alter table public.scholars enable row level security;
alter table public.hadith_assessments enable row level security;
alter table public.chain_assessments enable row level security;
alter table public.narrator_assessments enable row level security;
alter table public.import_batches enable row level security;
alter table public.raw_import_records enable row level security;

create policy "Public books" on public.books for select using (true);
create policy "Published hadiths" on public.hadiths for select using (review_status = 'published');
create policy "Verified variations" on public.source_variations for select using (verified = true);
create policy "Public narrators" on public.narrators for select using (identity_status = 'verified');
create policy "Verified chains" on public.chains for select using (verified = true);
create policy "Nodes of verified chains" on public.chain_narrators for select using (
  exists (select 1 from public.chains c where c.id = chain_id and c.verified = true)
);
create policy "Public scholars" on public.scholars for select using (true);
create policy "Verified hadith assessments" on public.hadith_assessments for select using (verified = true);
create policy "Verified chain assessments" on public.chain_assessments for select using (verified = true);
create policy "Verified narrator assessments" on public.narrator_assessments for select using (verified = true);

-- No anonymous policies are created for import_batches or raw_import_records.
-- They remain private to the dashboard and service-role operations.
