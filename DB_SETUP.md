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

The schema enables Row Level Security. Anonymous visitors can read only published/verified material. Writes require the dashboard or service-role credentials.

## 3. Configure the application

Copy `.env.example` to `.env.local` in the future Next.js project and fill in the values.

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

## 6. Backups and migrations

- Store every schema change as a numbered SQL migration in source control.
- Export a database backup before a large import.
- Never manually delete imported data without retaining its import-batch record.
- Test bulk imports in a separate Supabase project or database branch where practical.
