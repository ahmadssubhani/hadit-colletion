# Data acquisition and ingestion

## Source strategy

No single provider supplies complete hadith text, translations, chains, narrator identities and cross-traditional scholarly assessments. Build a source ledger and combine licensed structured data with cited classical reference works.

## Recommended providers

### Sunnah.com

- URL: https://sunnah.com/developers
- Best for: structured Sunni collections, Arabic, English and references
- Action: request API access and confirm redistribution rights
- Caution: English translations and database formatting can have separate rights

### Thaqalayn

- URL: https://thaqalayn.net/
- Best for: structured Twelver Shia collections, Arabic and English
- Action: contact maintainers about bulk/API access, caching and attribution
- Caution: confirm rights per translation and collection

### HadeethEnc

- URL: https://hadeethenc.com/en/home
- Best for: multilingual translations, explanations and selected authentication labels
- Action: review its API/reuse terms before importing

### OpenITI

- URL: https://openiti.org/
- Releases: https://github.com/OpenITI/RELEASE
- Best for: machine-readable Arabic hadith, rijal, commentary and biographical works
- Caution: segmentation and edition quality vary; most material needs extraction

### Dorar al-Saniyyah

- URL: https://dorar.net/hadith
- Best for: Sunni variant discovery, source references and named grades
- Default use: manual research and verification
- Caution: do not scrape or redistribute at scale without permission

### Reference libraries

- Al-Islam.org: https://www.al-islam.org/
- Al-Maktaba al-Shamela: https://shamela.ws/
- Noor Digital Library
- Internet Archive and university repositories

Use these for locating and citing editions unless bulk reuse is explicitly permitted.

## Priority classical rijal works

### Sunni

- al-Jarh wa al-Ta'dil — Ibn Abi Hatim
- al-Tarikh al-Kabir — al-Bukhari
- Tahdhib al-Kamal — al-Mizzi
- Tahdhib al-Tahdhib and Taqrib al-Tahdhib — Ibn Hajar
- Mizan al-I'tidal — al-Dhahabi
- Lisan al-Mizan — Ibn Hajar

### Twelver Shia

- Rijal al-Kashshi
- Rijal al-Najashi
- Rijal al-Tusi
- Fihrist al-Tusi
- Khulasat al-Aqwal — al-Hilli
- Mu'jam Rijal al-Hadith — al-Khoei

Modern editions and translations may remain copyrighted even when the underlying classical work is public domain.

## Pilot corpus

Begin with:

```text
25 hadith clusters
100 source variations
150 isnad chains
300 narrators
500 attributed assessments
```

Select reports that have Sunni and Shia parallels, multiple chains, meaningful wording differences and well-documented narrators.

## Import pipeline

```text
Provider/API/edition
        ↓
Source and rights register
        ↓
Immutable raw_import_records
        ↓
Normalize text and references
        ↓
Propose chain segmentation
        ↓
Propose narrator matches
        ↓
Propose hadith clusters
        ↓
Human review
        ↓
Publish verified records
```

## Required rules

1. Preserve every provider payload unchanged in `raw_import_records`.
2. Record provider, retrieval date, license, permission and checksum.
3. Preserve exact Arabic separately from normalized search text.
4. Never force an uncertain chain name onto a narrator identity.
5. Never copy one source variation's grade onto the entire cluster.
6. Attach each assessment to a named scholar and exact citation.
7. Treat AI output as a candidate requiring review, not as published evidence.
8. Publish only records marked verified.

## Arabic normalization for search

Maintain the original text. Create a separate derived search representation that can:

- remove optional diacritics
- normalize alef forms
- normalize whitespace and punctuation
- optionally normalize ya/alif maqsura
- retain an audit trail of the normalization version

Do not overwrite the source transcription.

## Narrator matching

Use the following evidence together:

- Arabic name and aliases
- kunya and nisba
- dates
- region
- teachers and students
- generation
- location within the chain

Store a confidence value and review note. Leave `narrator_id` empty when identity is unresolved.

## Cluster matching

Software may propose clusters using:

- Arabic phrase overlap
- English semantic similarity
- shared Companion or Imam
- overlapping chains
- distinctive shared wording

The reviewer must choose one relationship:

```text
same hadith variation
partial parallel
quotation
same topic only
unrelated
```

Only genuine variants and partial parallels should appear in the main comparison view.

## Quality-control checklist

Before publishing a source variation, verify:

- book and edition
- hadith/chapter/volume/page reference
- Arabic text against the cited edition
- translation attribution and reuse permission
- chain order and raw names
- narrator identity matches
- hadith, chain and narration statuses
- every scholarly assessment citation
- tradition label is descriptive and neutral

## Scaling later

Start with Supabase CSV imports. Add local TypeScript scripts when repetitive work becomes expensive. Add a private review interface only after the table editor no longer supports the workflow efficiently.
