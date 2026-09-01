# Database setup

## 1. Create Supabase

Create a project at https://supabase.com and record:

- Project URL
- Public anonymous key
- Service-role key
- Direct or pooled database connection string

Never expose the service-role key in browser code or commit it to source control.

## 2. Create the schema

Open the Supabase SQL editor and run:

1. `database/schema.sql`
2. `database/seed_reference_data.sql`

Optionally run `database/migrations/002_search_helpers.sql` to store a derived Arabic search column. It never overwrites `arabic_text`.

The schema enables Row Level Security. Anonymous visitors can read only published/verified material:

- `hadiths.review_status = 'published'`
- `source_variations.verified = true`
- `chains.verified = true`
- `narrators.identity_status = 'verified'`
- assessments with `verified = true`
- books and scholars are publicly readable

Writes require the dashboard or service-role credentials. There is no public user authentication in version one; research browsing is anonymous.

## 3. Configure the application

Copy `.env.example` to `.env.local` and fill in the values.

`NEXT_PUBLIC_SUPABASE_URL` must be the project URL (`https://<project-ref>.supabase.co`). If a copied value ends with `/rest/v1/`, strip that suffix before using `@supabase/supabase-js`.

Only these variables may be exposed to the browser:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

The following must remain server-only:

```text
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
```

Authentication uses the anonymous key plus Supabase Auth cookies. Run `database/migrations/003_profiles.sql` if you want editable profile rows (`full_name`, `bio`, `avatar_url`). Research pages remain publicly readable under the original RLS policies.

Enable Email authentication in the Supabase dashboard (Authentication → Providers). Confirm the Site URL and redirect URLs include `http://localhost:3000/auth/callback` for local development.

## 4. Core relationships

```text
hadiths
  └── source_variations
        ├── chains
        │     └── chain_narrators
        │            └── narrators
        ├── hadith_assessments
        └── chain_assessments

narrators
  └── narrator_assessments

scholars
  └── all attributed assessments
```

## 5. Meaning of the three displayed statuses

### Hadith status

The overall named scholarly verdict on one exact source variation, such as `sahih`, `hasan`, `muwaththaq`, `daif`, or `not_graded`.

### Chain status

The condition of that variation's isnad: continuity such as `muttasil` or `mursal`, plus any chain-only quality assessment.

### Narration status

Transmission and attribution classifications such as `ahad`, `mutawatir`, `marfu`, `mawquf`, or `historical_khabar`.

A source variation can have several narration classifications simultaneously. Detailed judgments remain in the assessment tables; summary columns are only display conveniences.

## 6. Local application

```bash
npm install
npm run dev
```

Public pages query PostgreSQL through the anonymous key. Ingestion scripts use `SUPABASE_SERVICE_ROLE_KEY` and bypass RLS on the server only.

## 7. Backups and migrations

- Store every schema change as a numbered SQL migration in source control.
- Export a database backup before a large import.
- Never manually delete imported data without retaining its import-batch record.
- Test bulk imports in a separate Supabase project or database branch where practical.
