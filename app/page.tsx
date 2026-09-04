import Link from "next/link";
import { FeaturedHadith } from "@/components/FeaturedHadith";
import { HadithCard } from "@/components/HadithCard";
import { HadithCollectionCard } from "@/components/HadithCollectionCard";
import { HeroSection } from "@/components/HeroSection";
import { EmptyState, ErrorState } from "@/components/States";
import { DailyHadithTable } from "@/components/DailyHadithTable";
import { DEMO_HADITHS, HOME_COLLECTIONS, HOME_REASONS, HOME_TOPICS } from "@/lib/content/home";
import { getBooks, getCorpusStats, getFeaturedHadiths } from "@/lib/queries";
import { runDailyHadithIngest } from "@/lib/cron/daily-ingest";

export const revalidate = 60;

export default async function HomePage() {
  const [stats, featured, books, dailyIngest] = await Promise.all([
    getCorpusStats(),
    getFeaturedHadiths(),
    getBooks(),
    runDailyHadithIngest({ topicSlug: "first-wahi", apply: false }),
  ]);

  const collections = books.length
    ? books.slice(0, 6).map((book) => ({ title: book.title, query: book.title, note: book.tradition }))
    : HOME_COLLECTIONS;

  return (
    <>
      <HeroSection />
      <section className="shell home-sections">
        <div className="stats">
          <div className="stat">
            <b>{stats.hadiths}</b>
            <span>Hadith clusters</span>
          </div>
          <div className="stat">
            <b>{stats.variations}</b>
            <span>Source variations</span>
          </div>
          <div className="stat">
            <b>{stats.chains}</b>
            <span>Recorded isnad chains</span>
          </div>
          <div className="stat">
            <b>{stats.narrators}</b>
            <span>Narrator profiles</span>
          </div>
        </div>

        <div className="section-head">
          <div>
            <div className="eyebrow">Featured hadith</div>
            <h2 className="title">A few reports to begin with</h2>
          </div>
          <p>Demo cards until published records are available</p>
        </div>
        <FeaturedHadith hadith={DEMO_HADITHS[0]} featured />
        <div className="cards" style={{ marginTop: 16 }}>
          {DEMO_HADITHS.slice(1).map((hadith) => (
            <FeaturedHadith key={hadith.id} hadith={hadith} />
          ))}
        </div>

        <div className="section-head">
          <div>
            <div className="eyebrow">Collections</div>
            <h2 className="title">Explore Hadith collections</h2>
          </div>
          <Link href="/collections">View all</Link>
        </div>
        <div className="cards">
          {collections.map((collection) => (
            <HadithCollectionCard
              key={collection.title}
              title={collection.title}
              note={collection.note}
              href={`/search?q=${encodeURIComponent(collection.query)}`}
            />
          ))}
        </div>

        <div className="section-head">
          <div>
            <div className="eyebrow">Topics</div>
            <h2 className="title">Browse by topic</h2>
          </div>
        </div>
        <div className="pills topic-row">
          {HOME_TOPICS.map((topic) => (
            <Link className="pill topic-pill" key={topic.query} href={`/search?q=${encodeURIComponent(topic.query)}`}>
              {topic.label}
            </Link>
          ))}
        </div>

        <div className="section-head">
          <div>
            <div className="eyebrow">Why this platform</div>
            <h2 className="title">Research without collapsing the evidence</h2>
          </div>
        </div>
        <div className="cards">
          {HOME_REASONS.map((reason) => (
            <div className="card" key={reason.title}>
              <h3>{reason.title}</h3>
              <p className="meta">{reason.text}</p>
            </div>
          ))}
        </div>

        {stats.error ? <ErrorState message={stats.error.message} /> : null}
        <div className="section-head">
          <div>
            <div className="eyebrow">Published clusters</div>
            <h2 className="title">Continue researching</h2>
          </div>
        </div>
        {featured.error ? <ErrorState message={featured.error} /> : null}
        {!featured.hadiths.length ? (
          <EmptyState message="No published hadith clusters are visible yet. After review, publish a pilot of 25 clusters." />
        ) : (
          <div className="cards" style={{ marginBottom: 40 }}>
            {featured.hadiths.map((hadith) => (
              <HadithCard key={hadith.id} hadith={hadith} variationCount={hadith.variation_count} />
            ))}
          </div>
        )}

        {/* Daily Hadith Section (Under Published Clusters) */}
        <div className="section-head" style={{ marginTop: 50 }}>
          <div>
            <div className="eyebrow">Daily Hadith</div>
            <h2 className="title">Daily 5 Hadith • First Wahi</h2>
          </div>
          <p>Auto-rotates daily from live collection candidates</p>
        </div>
        <DailyHadithTable
          topicTitle={dailyIngest?.topicTitle}
          dayNumber={dailyIngest?.dayNumber}
          runDate={dailyIngest?.runDate}
          remainingInPool={dailyIngest?.remainingInTopicPool}
          hadiths={dailyIngest?.shortlistedHadiths}
        />
      </section>
    </>
  );
}