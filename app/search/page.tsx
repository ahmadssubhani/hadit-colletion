import { HadithCard } from "@/components/HadithCard";
import { FilterPanel } from "@/components/FilterPanel";
import { Pagination } from "@/components/Pagination";
import { EmptyState, ErrorState } from "@/components/States";
import { getBooks, getScholars, searchHadiths } from "@/lib/queries";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const filters = {
    q: first(params.q),
    bookId: first(params.bookId),
    hadithStatus: first(params.hadithStatus),
    chainStatus: first(params.chainStatus),
    narrationStatus: first(params.narrationStatus),
    scholarId: first(params.scholarId),
    assessment: first(params.assessment),
    page: Number(first(params.page) ?? "1") || 1,
  };

  const [books, scholars, result] = await Promise.all([getBooks(), getScholars(), searchHadiths(filters)]);

  const hrefFor = (page: number) => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "page" || !value) return;
      query.set(key, String(value));
    });
    query.set("page", String(page));
    return `/search?${query.toString()}`;
  };

  return (
    <section>
      <div className="pagehead">
        <div className="shell">
          <div className="eyebrow">Search</div>
          <h1 className="title">Find hadith clusters and source occurrences</h1>
          <p>Search runs against PostgreSQL. Results are published clusters only; unpublished drafts stay private.</p>
        </div>
      </div>
      <div className="shell">
        <FilterPanel books={books} scholars={scholars} values={filters} />
        {result.error ? <ErrorState message={result.error} /> : null}
        {!result.error && !result.hadiths.length ? (
          <EmptyState
            message={
              filters.q
                ? "No published records matched that query. Try another phrase, or confirm the cluster is published and its variations are verified."
                : "No published hadith clusters are available to browse yet."
            }
          />
        ) : null}
        {result.hadiths.length ? (
          <>
            <p className="meta">{result.total} cluster{result.total === 1 ? "" : "s"}</p>
            <div className="cards" style={{ marginBottom: 12 }}>
              {result.hadiths.map((hadith) => (
                <HadithCard key={hadith.id} hadith={hadith} variationCount={hadith.variation_count} />
              ))}
            </div>
            <Pagination page={result.page} pageSize={result.pageSize} total={result.total} hrefFor={hrefFor} />
          </>
        ) : null}
      </div>
    </section>
  );
}
