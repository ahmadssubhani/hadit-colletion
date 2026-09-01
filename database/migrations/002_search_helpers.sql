-- Optional search helpers. Run after schema.sql.
-- Does not change scholarly fields. Derived Arabic search text is stored separately.

alter table public.source_variations
  add column if not exists arabic_search_text text;

create or replace function public.refresh_arabic_search_text()
returns trigger
language plpgsql
as $$
begin
  new.arabic_search_text :=
    regexp_replace(
      regexp_replace(
        translate(coalesce(new.arabic_text, ''), 'إأآٱةى', 'ااااهي'),
        '[\u064B-\u065F\u0670]',
        '',
        'g'
      ),
      '\s+',
      ' ',
      'g'
    );
  return new;
end;
$$;

drop trigger if exists source_variations_arabic_search on public.source_variations;
create trigger source_variations_arabic_search
before insert or update of arabic_text on public.source_variations
for each row execute function public.refresh_arabic_search_text();

update public.source_variations
set arabic_text = arabic_text
where arabic_text is not null;

create index if not exists source_arabic_search_trgm_idx
  on public.source_variations using gin (arabic_search_text gin_trgm_ops);

create index if not exists hadiths_title_trgm_idx
  on public.hadiths using gin (title gin_trgm_ops);
