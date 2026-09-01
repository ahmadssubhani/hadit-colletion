import { HadithCollectionCard } from "@/components/HadithCollectionCard";
import { EmptyState } from "@/components/States";
import { HOME_COLLECTIONS } from "@/lib/content/home";
import { getBooks } from "@/lib/queries";

export const revalidate = 60;

export default async function CollectionsPage() {
  const books = await getBooks();
  const items = books.length
    ? books.map((book) => ({ title: book.title, query: book.title, note: [book.tradition, book.author].filter(Boolean).join(" · ") }))
    : HOME_COLLECTIONS;

  return (
    <section>
      <div className="pagehead">
        <div className="shell">
          <div className="eyebrow">Collections</div>
          <h1 className="title">Hadith collections</h1>
          <p>Search opens published occurrences from each named book. Names below are starting points, not a new canon.</p>
        </div>
      </div>
      <div className="shell" style={{ paddingBottom: 70 }}>
        {!items.length ? (
          <EmptyState message="No books are published yet." />
        ) : (
          <div className="cards">
            {items.map((item) => (
              <HadithCollectionCard
                key={item.title}
                title={item.title}
                note={item.note}
                href={`/search?q=${encodeURIComponent(item.query)}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
