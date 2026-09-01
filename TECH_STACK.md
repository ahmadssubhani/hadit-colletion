# Tech stack recommendation

## Recommended stack

```text
Next.js + TypeScript
        ↓
Vercel
        ↓
Supabase PostgreSQL
```

Use `@supabase/supabase-js` directly for the first release. Do not add Prisma, Drizzle, a CMS, authentication, queues, a graph database, or a separate search service until there is a demonstrated need.

Public research browsing is anonymous. Ingestion uses the service-role key from local scripts, not a browser client.

## Why this stack

- Next.js keeps pages, server rendering, metadata and small server endpoints together.
- Vercel provides the lowest-friction Next.js deployment and preview URLs.
- Supabase offers PostgreSQL plus a visual table editor, CSV import, SQL editor, logs and backups.
- PostgreSQL can represent books, variants, chains, narrators and assessments relationally.
- PostgreSQL full-text search and `pg_trgm` are sufficient for the first corpus.

## Application structure

```text
app/
├── page.tsx                         Hadith discovery
├── hadiths/[slug]/page.tsx          Hadith cluster and variations
├── narrators/[slug]/page.tsx        Narrator and rijal profile
├── knowledge/page.tsx               Educational guide
└── api/search/route.ts               Search endpoint, if required

components/
├── SourceVariation.tsx
├── EvidenceStatuses.tsx
├── IsnadChain.tsx
├── NarratorCard.tsx
└── AssessmentCitation.tsx

lib/
├── supabase-server.ts
├── search.ts
└── normalization.ts

scripts/
├── import-source.ts
├── normalize-arabic.ts
├── match-narrators.ts
└── propose-clusters.ts
```

The running application uses `lib/supabase/server.ts` (anonymous, server) and `lib/supabase/admin.ts` (service-role, scripts only).

## Rendering strategy

- Render public hadith and narrator pages on the server.
- Cache published pages and revalidate after data changes.
- Keep database write credentials out of the browser.
- Use the public Supabase anonymous key only with read-only Row Level Security policies.
- Perform ingestion from local scripts using the service-role key.

## Search strategy

Start with PostgreSQL:

- exact book/hadith-number lookup
- trigram matching for narrator names and transliterations
- full-text search for English
- normalized Arabic search without optional diacritics

Add Typesense or Meilisearch only if database search becomes demonstrably inadequate.

## Deployment

1. Store the application in GitHub.
2. Import the repository into Vercel.
3. Add the Supabase URL and anonymous key as Vercel environment variables.
4. Deploy the production branch.
5. Keep the service-role key restricted to local ingestion or protected server jobs.

Official references:

- Next.js deployment: https://nextjs.org/docs/app/getting-started/deploying
- Vercel plans: https://vercel.com/pricing
- Supabase database: https://supabase.com/docs/guides/database
- Supabase plans: https://supabase.com/pricing

Free-tier limits and commercial-use conditions can change; verify them before launch.
