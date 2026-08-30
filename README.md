# Relegious project kit

An English-first, source-neutral hadith research platform. This folder contains the interactive UI prototype and the documents needed to begin implementation.

## Contents

```text
relegious-prototype/
├── index.html                         Interactive standalone UI
├── TECH_STACK.md                     Recommended production architecture
├── DB_SETUP.md                       Supabase setup and operating guide
├── DATA_INGESTION.md                 Data acquisition and ingestion workflow
├── .env.example                      Environment variable template
├── database/
│   ├── schema.sql                    Initial PostgreSQL schema and security
│   └── seed_reference_data.sql       Starter controlled vocabulary
└── data-templates/
    ├── source-register.csv           Rights and provenance register
    ├── hadiths.csv                   Parent hadith clusters
    ├── source-variations.csv         Book occurrences
    ├── narrators.csv                 Narrator identities
    └── assessments.csv               Attributed scholarly judgments
```

## Open the prototype

Open `index.html` in any modern browser. It is self-contained; the optional Google fonts require an internet connection, but system fallbacks work offline.

## Recommended implementation order

1. Create a Supabase project.
2. Run `database/schema.sql` in its SQL editor.
3. Run `database/seed_reference_data.sql`.
4. Create a Next.js application and add the Supabase client.
5. Rebuild the prototype screens as Next.js routes/components.
6. Populate a reviewed pilot of 25 hadith clusters before attempting bulk imports.

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
