export function SearchBar({ compact = false, defaultValue = "" }: { compact?: boolean; defaultValue?: string }) {
  if (compact) {
    return (
      <form className="search" action="/search">
        ⌕
        <input name="q" aria-label="Search" placeholder="Search hadith, source, narrator…" defaultValue={defaultValue} />
      </form>
    );
  }

  return (
    <form className="hero-search" action="/search">
      <input
        name="q"
        aria-label="Research question"
        placeholder="Try a phrase, book title, hadith number, or narrator name"
        defaultValue={defaultValue}
      />
      <button className="primary" type="submit">
        Search hadiths
      </button>
    </form>
  );
}
