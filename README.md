# Relegious project kit

An English-first, source-neutral hadith research platform. This folder contains the Next.js application, the interactive UI prototype, and the documents needed to run and extend the system.

## Contents

```text
hadith-collection/
├── app/                               Next.js App Router
├── components/                        Shared UI
├── lib/                               Supabase, search, ingestion helpers
├── scripts/                           Local TypeScript ingestion tools
├── index.html                         Interactive standalone UI prototype
├── TECH_STACK.md                      Production architecture
├── DB_SETUP.md                        Supabase setup and operating guide
├── DATA_INGESTION.md                  Data acquisition and ingestion workflow
├── .env.example                       Environment variable template
├── database/
│   ├── schema.sql                     Initial PostgreSQL schema and security
│   ├── seed_reference_data.sql        Starter controlled vocabulary
│   └── migrations/                    Numbered follow-on SQL
└── data-templates/
    ├── source-register.csv            Rights and provenance register
    ├── hadiths.csv                    Parent hadith clusters
    ├── source-variations.csv          Book occurrences
    ├── narrators.csv                  Narrator identities
    ├── assessments.csv                Attributed scholarly judgments
    └── chains.csv                     Optional isnad node template
```

## Local development

1. Create a Supabase project and run `database/schema.sql`, then `database/seed_reference_data.sql`. Optionally run `database/migrations/002_search_helpers.sql`.
2. Copy `.env.example` to `.env.local` and fill in the values. Use the project base URL (`https://<ref>.supabase.co`), not `/rest/v1/`.
3. Install and start:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000

The standalone prototype remains at `index.html` and can still be opened in a browser.

## Recommended implementation order

1. Create a Supabase project.
2. Run `database/schema.sql` in its SQL editor.
3. Run `database/seed_reference_data.sql`.
4. Configure `.env.local` and start the Next.js app.
5. Populate a reviewed pilot of 25 hadith clusters before attempting bulk imports.

## Product boundary

Version one is about hadith only. Historical context may appear as metadata on a hadith occurrence, but historical events are not first-class records.

Every source variation retains its own:

- Arabic and English text
- source citation
- hadith status
- chain status
- narration status
- isnad chains
- attributed scholarly assessments

The platform must never manufacture a single consensus grade from conflicting scholarly judgments.
